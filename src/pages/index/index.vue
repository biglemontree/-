<template>
  <div class="container" >
    <van-popup
      :show="!authed"
      :overlay="false"
      :close="onClose"
    >
      <button open-type="getUserInfo" @getuserinfo="getUserInfo"> 授权登录 </button>
    </van-popup>

  </div>
</template>

<script>
import {request, login, getUserInfo, setToken} from '@/utils/net.js'
import { apis } from '@/utils/config.js'
import card from '@/components/card'
import Notify from '../../../static/vant/notify/notify'
export default {
  data () {
    return {
      authed: false,
      devices: []
    }
  },

  components: {
    card
  },

  methods: {
    getUserInfo () {
      return login().then((code) => {
      console.log("code=" + code)
        return getUserInfo(code)
    }).then(({code, res}) => {
            console.log({code, res, apis});
            return request({
              url: apis.postUnionId,
              method: 'post',
              data:{
                code:code,
                iv:res.iv,
                encryptedData:res.encryptedData
              }
            }).then(data => {
                setToken(data.token)
                // this.authed = true

                return data;
            });
        }).then(this.getrouters);
    },
    getrouters(user) {
      console.log(apis);
        request({
          url: apis.getrouters,
          header: {
            ksuser: user.token,
          }
        }).then(data => {
          this.setData({
            deviceName: data[0].name
          })
        })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    wx.getSetting({
        success(res) {
            if (!res.authSetting['scope.userInfo']) {
              this.authed = false
            } else {
            }
        }
    })
  }
}
</script>

<style scoped>

</style>
