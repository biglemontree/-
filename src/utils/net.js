/**
 * Created by aaron on 2018/6/4.
 */
import { apis, baseURLs } from './config';

/**
 * 错误上报
 * @param needShowError 是否需要thow Error
 * @param err,错误对象
 * @param arg，其他参数
 */
function errorHandel(needShowError, err, ...arg) {
  //console.log(arg);
  let data = '';
  if (err) {
    //获取错误信息
    data = err.message + data;
  }
  //获取其他信息
  arg.forEach(item => (data += ',' + JSON.stringify(item)));
  //获取手机系统信息
  data += ',启动参数launchOption:';
  data += JSON.stringify(getApp().globalData.launchOption);
  data += ',版本version:';
  data += JSON.stringify(getApp().globalData.version);
  data += JSON.stringify(getApp().globalData.systemInfo);

  if (needShowError) throw new Error(data);
}

//加载器
const load = {
  //加载状态
  isLoading: false,
  timer: 0, //延时器
  //开始加载
  loadStart: function() {
    clearTimeout(this.timer);

    wx.showLoading({
      title: '请稍等',
      mask: true
    });
    //标记加载状态
    this.isLoading = true;
  },
  //结束加载
  loadEnd: function() {
    //延迟执行，已适应连续的加载请求
    this.timer = setTimeout(() => {
      wx.hideLoading();
      this.isLoading = false;
    }, 600);
  }
};

/**
 * 发起网络请求
 * @param opts
 * url:String,接口地址
 * data:Object,请求数据
 * method:String,(GET),请求方法
 * needToken:Boolen,(true),本次请求是否携带token
 * token:String,制定本次请求携带的token
 * needShowLoading:Boolen,(true),是否显示加载动画
 * showError:是否使用默认的错误捕获
 * e:Int,(0),制定所使用的baseURL
 * isUploadFile:Boolen,(false),是否使用微信上传api
 * ext:{codes:[],handle:Function},自定义状态码捕获
 * unforeseen:Function,未知状态码捕获
 * @returns {Promise.<TResult>}
 * 用法：request({url:'abc',data:{x:1}}).then(res=>{}).catch(res=>{})
 */
function request(opts) {
  let defaultOpts = {
    url: '',
    data: {},
    method: 'GET',
    needToken: true,
    needShowError: true,
    token: '',
    needShowLoading: true,
    e: 0,
    isUploadFile: false,
    ext: {
      codes: [],
      handle: res => {}
    },
    unforeseen: data => {
      wx.showModal({
        content: String(data.message),
        title: '提示',
        showCancel: false,
        confirmColor: '#00A4FF'
      });
    }
  };

  //合并参数
  opts = { ...defaultOpts, ...opts };

  if (opts.needShowLoading) {
    load.loadStart();
  }

  const url = opts.url;
  return getToken().then(
    token =>
      new Promise((resolve, reject) => {
        (function handle(token, retry = false) {
          //...
          //拼接url
          const baseURL = getBaseURL(opts.e);
          const version = getApp().globalData.version;
          opts.url = `${baseURL}${url}?_v=${version}`;
          //判断是否需要携带token
          if (opts.needToken) {
            //使用传入的token
            token = opts.token || token;
            //将token拼接到url
            opts.url = `${opts.url}&token=${token}`;
          }

          const host = `(${opts.method})${opts.url}`;
          const formData = opts.isUploadFile ? opts.formData : opts.data;

          //请求失败回调
          opts.fail = res => {
            reject();
            wx.showModal({
              content: '网络错误，请稍后重试。',
              title: '提示',
              showCancel: false,
              confirmColor: '#00A4FF'
            });
          };
          //请求成功回调
          opts.success = res => {
            console.log(`😊请求完成：${host}`, res);

            if (res.statusCode == 200) {
              //网络正常返回
              let data = res.data;
              //
              //捕获字符串解析错误
              try {
                if (typeof data === 'string') {
                  data = JSON.parse(data);
                }
              } catch (err) {
                reject(res);
                errorHandel(
                  opts.needShowError,
                  null,
                  'response格式错误',
                  host,
                  'formdata:',
                  formData,
                  'response:',
                  res
                );
                return;
              }

              if (typeof data.code === 'undefined') {
                //返回格式错误，将上报
                reject(res);
                errorHandel(
                  opts.needShowError,
                  null,
                  'data.code错误',
                  host,
                  'formdata:',
                  formData,
                  'response:',
                  res
                );
                return;
              }

              if (
                opts.ext.codes &&
                opts.ext.codes.indexOf(String(data.code)) >= 0
              ) {
                //如果匹配到自定义的状态码，将执行对应的handle。
                opts.ext.handle(data);
                reject(res);
              } else if (
                opts.needToken &&
                String(data.code) === '401' &&
                retry
              ) {
                //当token必填且token无效且需要重试
                //重新获取token
                updateToken().then(handle);
              } else if (String(data.code) === '410') {
                // app版本过旧
                updateApp();
              } else if (String(data.code) === '0') {
                resolve(data.data);
              } else {
                //其他无法处理的状态码
                opts.unforeseen(data);
                reject(res);
              }
            } else {
              //网络返回非200
              reject(res);
              errorHandel(
                opts.needShowError,
                null,
                'statusCode非200',
                host,
                'formdata:',
                formData,
                'response:',
                res
              );
            }
          };

          opts.complete = () => {
            //请求结束
            if (opts.needShowLoading) {
              load.loadEnd();
            }
          };
          //是否是上传
          if (opts.isUploadFile) {
            wx.uploadFile(opts);
          } else {
            wx.request(opts);
          }
          console.log(`😣请求开始：${host}`, formData);
        })(token, true);
      })
  );
}

/**
 * 返回当前使用的baseurl,如果指定了e则使用所指定的e
 *
 * @returns {*}
 */
function getBaseURL(e) {
  //获取启动参数中的环境变量e
  e = e || getApp().globalData.launchOption.query.e;
  let url = baseURLs[e] || baseURLs['0'];
  return url;
}

/**
 * 从本地获取token
 * @returns {Promise}
 */
function getToken() {
  return new Promise(resolve => {
    wx.getStorage({
      key: 'token',
      success: res => {
        if (res.data) {
          //返回指定域名
          resolve(res.data);
        } else {
          //默认返回正式域名
          resolve('none');
        }
      },
      fail: () => {
        //默认返回正式域名
        resolve('none');
      }
    });
  });
}

/**
 * 登录并获取新的token
 * @returns {Promise}
 */
function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        resolve(res.code);
      },
      fail(res) {
        reject(res);
      }
    });
  });
}

/**
 * 保存token到本地
 * @param token
 * @returns {Promise}
 */
function setToken(token) {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key: 'token',
      data: token,
      complete: () => {
        resolve(token);
      }
    });
  });
}

/**
 * 更新token，设置或获取token到本地
 * @param token
 * @returns {Promise}
 */
function updateToken(token) {
  if (token) {
    return setToken(token);
  } else {
    return login()
      .then(code =>
        request({
          url: apis.getLogin,
          needToken: false,
          data: { code: code },
          ext: {
            codes: ['403'], //一个数组，包含请求成功的状态码，将取代invalidCodes，successCodes
            handle: res => {
              //前往授权页面登录
              wx.navigateTo({ url: '/pages/auth/index' });
            }
          }
        })
      )
      .then(res => setToken(res.token));
  }
}

/**
 * 升级app
 */
function updateApp() {
  const updateManager = wx.getUpdateManager();
  updateManager.onCheckForUpdate(function(res) {
    // 请求完新版本信息的回调
    console.log('是否有可用的新版:', res.hasUpdate);
  });

  updateManager.onUpdateReady(function() {
    wx.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success: function(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      }
    });
  });
  updateManager.onUpdateFailed(function() {
    // 新的版本下载失败
    console.log('新的版本下载失败');
  });
}
export default request;
export { request, getBaseURL, getToken, updateToken, setToken, login };
