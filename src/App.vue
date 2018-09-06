
<script>
export default {
    data() {
      return {
        authed: true,
        motto: "Hello World",
        userInfo: {}
      };
    },
  created () {
    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
.page {
    background: #fff;
    min-height: 100vh;
}
</style>
