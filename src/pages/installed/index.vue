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
  </div>
</template>

<script>
import card from "@/components/card";
import {request} from '@/utils/net.js'
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
    }
  },

  created() {
    console.log(request)
    request({
        url: '/login'
    })
  }
};
</script>

<style scoped>

.installed {
  
}


</style>
