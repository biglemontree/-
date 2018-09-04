/**
 * baseurl配置项，
 * 注意：第一个填入正式环境的url，
 * 以便作默认使用。
 */

const baseURLs = {
  "0": "https://apiyp-switch.fapiaoer.cn",
  "1": "https://api.sc.yewifi.com",
  "2": "https://apiyp.pre.yewifi.com",
  "3": "http://api.serviceclient",
  "4": "https://adminyp.fapiaoer.cn",
  "5": "https://adminyp.yewifi.com",
  "6": "https://adminyp-pre.fapiaoer.cn",
  mock: "http://localhost:3000"
};

const baseWSSURLs = [
  "wss://apiyp.fapiaoer.cn/ws/",
  //'ws://10.98.2.230:9501/ws/',
  "wss://api.sc.yewifi.com/ws"
];

const apis = {
  getLogin: "/v1/user/access-token", //登录
  postUserToLogin: "/small/user/new-login", //提交用户信息（用于获取uniid）
  getCityList: "/v1/areas/list", //获取全国省市区列表数据
  getMsgCode: "/v1/sms/get-message-code", //获取手机短信验证码
  // postSignFormData: '/v1/client/create',                  //注册上传商户信息
  postSignFormData: "/v2/client/create", //注册上传商户信息
  postVerifyMobileCode: "/v1/sms/verify-code", //1.4校验手机验证码
  getUpdate: "/v2/business-index/index", //获取最新的开票请求
  getQRCode: "/v2/business-index/qrcode", //获取带有装饰带开票二维码
  postCheckSign: "/v1/client/index", //查询商户是否已经注册
  postCheckShopSignup: "/v2/client/index", //查询商户是否已经注册

  //  开票记录
  postReject: "/v1/invoice-record/reject", // 拒绝开票
  postPass: "/v1/invoice-record/confirm", // 确认开票
  getGoodsClass: "/v1/invoice-record/get-project", // 税目类别信息
  getBillingRecords: "/v1/invoice-record/list", // 获取用户开票记录列表
  getOrderInfo: "/v1/invoice-record/info", // 获取发票订单详情
  getComponyInfo: "/v1/enterprise/info", //获取企业资料
  getBeforeInputData: "/v1/client/detail", // 获取曾经填写的资料
  getSaveComponyInfo: "/v1/enterprise/update", //保存公司信息
  cityConfirm: "/v1/invoice-record/hainan-confirm", // 先锋城市确认开票

  // 开票设置
  searchClassify: "/v1/invoice-setting/search", // 税目类别模糊查询
  // getSettingDetail: '/v1/invoice-setting/store-detail',     // 获取开票设置详情
  setInvoice: "/v1/invoice-setting/set", // 开票门店设置
  editStore: "/v1/invoice-setting/modify-store", // 修改门店名称
  setProject: "/v1/invoice-setting/project-set", // 开票项目的添加|修改
  // deleteProject: '/v1/invoice-setting/delete',              // 删除开票项目
  getTaxRate: "/v1/invoice-setting/get-tax-rate", // 获取可选择的税率
  getCommonProject: "/v1/invoice-setting/common-project", // 获取常用开票项目
  getRemainingCount: "/v2/invoice-statistics/remaining-count", // 获取剩余发票数
  getSettingList: "/v2/client-project/list", // 获取开票设置详情
  deleteProject: "/v2/client-project/delete", // 删除开票项目
  postSetdefaultitem: "/v2/client-project/set-default", //设置成默认开票项目
  getStatistics: "/v1/invoice-statistics/statistics", // 获取发票统计数据
  addProject: "/v2/client-project/create", // 新增商品编码
  editProject: "/v2/client-project/edit", // 编辑商品编码
  postShopRename: "/v2/client-store/edit", // 修改门店名称
  getShopInfo: "/v2/client-store/view", //获取门店信息
  getStoreInfo: "/v2/client-store/info", //获取门店详情 Abbie

  // 子账号管理
  getDrawerList: "/v1/drawer/list", // 获取子账号列表
  postDrawerCreate: "/v1/drawer/create", // 子账号新增
  postDrawerModify: "/v1/drawer/modify", // 修改子账号
  postDrawerBind: "/v1/drawer/bind", // 绑定子账号
  postDrawerDelete: "/v1/drawer/delete", // 删除子账号
  postDrawerInfo: "/v1/drawer/info", // 删除子账号

  // 门店管理
  getStoreList: "/v1/client-store/list", // 获取门店列表
  getRecordList: "/v1/invoice-record/store-list", //获取开票记录门店列表
  postStoreCreate: "/v1/client-store/create", // 门店新增
  postStoreModify: "/v1/client-store/edit", // 修改门店
  getStoreView: "/v1/client-store/view", // 查看门店
  getStoreDefaultView: "/v1/client-store/default-view", //获取默认门店信息
  getSubMachines:'/v1/client-store/sub-machines',//获取税盘分机号

  // 管理设置首页
  postModifyFocus: "/v1/manage-setting/modify-focus", // 修改通知开关
  getManageSetting: "/v1/manage-setting/index",
  getIsMannager: "/v2/business-index/is-manager", //是否是门店管理员
  getShopQrcode: "/v2/business-index/qrcode", //获取对应门店的开票码
  getSaveSelectStore: "/v2/business-index/select-store", //储存当前切换后的门店id

  // 绑定二维码
  getBindCode: "/v1/drawer/bypass-qrcode", // 绑定二维码
  getQA: "/v1/business-index/question", //常见问题
  getVersionNotice: "/v1/client/version-notice", //获取欢迎语
  getHomeData: "/v2/business-index/store-data", //首页三个接口合并
  postCreateInvoiceQrdode: "/v1/dynamic-code/generate-invoice-qr-code", //创建固定码
  postSetMaxAmount: "/v1/manage-setting/set-quota", //设置单张发票限额
  postBindMaterial: "/v1/client-store/material-bind", //绑定物料码
  postSchemeList: "/v2/client/scheme-list", //开票套餐列表
  getSchemeFormData: "/v2/client/user-scheme", //获取用户已经填写的套餐购买信息
  postSelectScheme: "/v2/client/select-scheme", //上传套餐
  getFixPDF: "/v1/invoice-record/get-pdf", //修复pdf可直接预览

  /*百旺插件新增接口*/
  postBWInfo: "/v2/client/get-business-info", //百望注册商户获取企业名称，税号
  postCheckBWStatus: "/v2/client/baiwang-bind-status", //扫码获取管理员和物料码绑定状态
  postBindShopBW: "/v1/user/bind-applet", //百望注册绑定微信

  postShowPayOrder: "/v1/pay-invoicing/save-pay-order", //开票体验支付数据
  getInvoiceRetry: "/v1/invoice-record/blue-retry-one", // 重试开票
  postFlushRed:'/v1/invoice-record/red',//红冲

  getBWGoodlist: "/v2/scheme/scheme-list", // 获取百旺套餐列表
  postBWShopState: "/v2/scheme/business-status", // 查询百旺商户状态
  postBWScheme: "/v2/scheme/select-scheme", // 提交百旺套餐
  postBWSchemePayState: "/v2/scheme/scheme-status" // 百旺套餐支付状态
};

export { apis, baseURLs, baseWSSURLs };
