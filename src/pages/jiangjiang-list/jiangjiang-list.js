// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '../../assets/css/reset.css'

Vue.config.productionTip = false

/* axios */
import axios from '../../axios'
Vue.prototype.$http = axios

/* wechat sdk */
import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)
console.log(Vue.wechat)

Vue.wechat.config({
  debug: false,  // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: window.wx_appId,  //  必填，公众号的唯一标识
  timestamp: window.wx_timestamp, // 必填，生成签名的时间戳
  nonceStr: window.wx_nonceStr, // 必填，生成签名的随机串
  signature: window.wx_signature, // 必填，签名，见附录1
  jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
