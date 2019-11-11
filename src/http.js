/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import { Loading, Message } from 'element-ui'
import  utils from './utils'

// 超时时间
axios.defaults.timeout = 20000
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
  // element ui Loading方法
  loadinginstace = Loading.service({ fullscreen: true })
  //  loadinginstace = Loading.service({
  //   text: '请稍等',
  //   target: document.querySelector('.loadingtext'),
  //
  //  });
  var token=localStorage.getItem("token");
  if(token){
     config.headers.Authorization=token;
  }
  return config
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})


// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
    var value = data.data;
    if(value!=null&&value!=""&&value.msg!="") {
      Message({
        message: value.msg,
        type: value.status
      });
    }
    if(value.code==401){
      utils.AdminLogOut();
    }

    var authorization=data.headers.authorization;
    if(authorization!=null&&authorization!=""){
        localStorage.setItem("token",authorization);
    }
  loadinginstace.close()
   return data
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载失败'
  })
  return Promise.reject(error)
})

export default axios


