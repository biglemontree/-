<template>
  <div class="installed" >

    <van-button type="default" @click="showNotify">测试Notify</van-button>
    <van-notify id="van-notify" />
    <van-badge-group :active="active" bind:change="onChange">
        <van-badge title="标签名称" />
        <van-badge title="标签名称" info="8" />
    </van-badge-group>
    <van-loading />
    <van-loading color="#fff" />
    <van-card
        title="标题"
        desc="描述"  
        num="2"
        price="2.00"
        thumb="https://img.yzcdn.cn/vant-weapp/qrcode-201808101114.jpg"
    >
      
      <view slot="footer">
          <van-button size="mini">按钮</van-button>
          <van-button size="mini">按钮</van-button>
      </view>
    </van-card>
    <button open-type="getUserInfo" @getuserinfo="getUserInfo"> 授权登录 </button>
    <picker mode="date" :value="date" start="2015-09-01" end="2017-09-01" @change="bindDateChange">
        <view class="picker">
          当前选择: {{date}}
        </view>
    </picker>
  </div>
</template>

<script>
import card from "@/components/card";
import {request, login} from '@/utils/net.js'
import {apis} from '@/utils/apis'
import Notify from "../../../static/vant/notify/notify";
export default {
  data() {
    return {
      motto: "Hello World",
      userInfo: {}
    };
  },

  components: {
    card
  },

  methods: {
    showNotify() {
      console.info("showNotify");
      // console.info(Notify);
      Notify("测试文案...");
      console.log("notify", Notify);
    },

    
    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    },

    getUserInfo: function(e) {
    console.log(e)
    // this.setData({
    //     userInfo: e.detail.userInfo,
    //     hasUserInfo: true
    // })
    // login()获取code-> 请求微信接口->获取session_key 和 openId

    return login().then((code) => {
      console.log("code=" + code)
        return getUserInfo(code)
    }).then(({code, res}) => {
            console.log({code, res});
            debugger
            return request({
              url: apis.postLogin,
                method: 'post',
                data: {
                    code,
                    iv: res.iv,
                    encryptedData: res.encryptedData,
                }
            }).then(data => {
                this.setData({
                    openid: data.openId,
                    unionId: data.unionId
                })
                setToken(data.token)
                return data;
            });
        }).then((user) => {
          console.log(user);
          // request({
          //   url: apis.routers,
          //   method: 'get',
          //   header: {
          //     ksuser: user.token,
          //   }
          // }).then(data => {
          //   this.setData({
          //     deviceName: data[0].name
          //   })
          // })
        });
  }
  },

  created() {
  }
};
</script>

<style scoped>

.installed {
  
}


</style>
