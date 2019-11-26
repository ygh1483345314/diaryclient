// import Vue from 'vue'
import Router from 'vue-router'
import blog from './blog'
import admin from './admin'
import jwt_decode from 'jwt-decode'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


Vue.use(Router)
const routes = [
  ...blog,
  ...admin
]




export const router=new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

//路由守卫
router.beforeEach((to,from,next)=>{
  NProgress.start()
  //执行百度推送
  baidu_Push();
  next()
  if (to.meta.requireAuth) {
        // console.log(store.state.isAuthenticated)
       var token=localStorage.getItem("token");
       var isexp=false;
       if(token!=null){
         isexp=new Date().getTime()<jwt_decode(token).exp*1000;
       }
      const isLogin = isexp ? true : false
      if(to.path=='/adminLogin'){
        next();
      }else{
        isLogin ? next() : next('/adminLogin')
      }
  }else{
    next();
  }


})


router.afterEach(() => {
  NProgress.done()
})


// router.addRoutes([
//   {
//     path: '/test/*',
//     name: 'test',
//     component: () => import('../components/views/BlogDetail')
//   }
// ])

export default router
