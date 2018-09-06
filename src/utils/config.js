/**
 * baseurl配置项，
 * 注意：第一个填入正式环境的url，
 * 以便作默认使用。
 */

const baseURLs = {
    "0": "https://service.ddnsto.com",
  "1": "https://api.sc.yewifi.com",
  mock: "http://localhost:3000"
};

const baseWSSURLs = [
  "wss://apiyp.fapiaoer.cn/ws/",
  //'ws://10.98.2.230:9501/ws/',
  "wss://api.sc.yewifi.com/ws"
];

const apis = {
    postUnionId: '/wechat/littleapp/login', //登录
    routers: '/littleapp/routers/'
};

export { apis, baseURLs, baseWSSURLs };
