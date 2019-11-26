
import router from './router'
// import Vue from 'vue';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
// import animated from 'animate.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from "./http";
import store from './store'
import hljs from 'highlight.js' // 引入JS
// import 'highlight.js/styles/googlecode.css' //样式文件
import photoPreview from './components/photoPreview'


import Clipboard from 'v-clipboard'

Vue.use(Clipboard)
Vue.prototype.$axios = axios;

Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})


Vue.use(mavonEditor)
// Vue.use(animated)
Vue.config.productionTip = false
// Vue.use(ElementUI)
Vue.use(photoPreview)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
