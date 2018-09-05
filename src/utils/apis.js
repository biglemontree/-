/**
 * baseurl配置项，
 * 注意：第一个填入正式环境的url，
 * 以便作默认使用。
 */

const baseURL = 'https://service.ddnsto.com';

const baseWSSURLs = [
  "wss://apiyp.fapiaoer.cn/ws/",
  //'ws://10.98.2.230:9501/ws/',
  "wss://api.sc.yewifi.com/ws"
];

const apis = {
  'postLogin': '/wechat/littleapp/login',
  'getrouters': '/littleapp/routers',

};

export { apis, baseURL, baseWSSURLs };
