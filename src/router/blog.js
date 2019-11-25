// import Home from '@/components/Home'
// import  Taglist from '@/components/views/Taglist'
// import  Archives from  '@/components/views/Archives'
// // import  BlogAll from  '@/components/BlogAll'
import  BlogDetail from  '@/components/views/BlogDetail'
// import  BlogPage from  '@/components/views/BlogPage'


export default [
  {
    path: "/",
    redirect: '/Home',
  },
  {
    path: '',
    name: 'BlogAll',
    // component: BlogAll,
    component:resolve => require(['@/components/BlogAll'],resolve),
    children:
      // getMenu()
    [
      { path: '/Home',component:resolve => require(['@/components/Home'],resolve)},
      { path: '/Archives',component:resolve => require(['@/components/views/Archives'],resolve) },
      { path: '/Taglist', component:resolve => require(['@/components/views/Taglist'],resolve) },
      { path: '/BlogDetail/*', component:resolve => require(['@/components/views/BlogDetail'],resolve) },
      { path: '/BlogPage/*', component:resolve => require(['@/components/views/BlogPage'],resolve) },
    ]
  },
  // { path: '*', component: BlogAll },
]


// function getMenu(){
//
//  // var  BlogDetail=BlogDetail;
//   axios.get('/api/blog/menu',null)
//     .then(res=>{
//       var children=[
//         { path: '/Home', component: Home },
//         { path: '/Archives', component: Archives },
//         { path: '/Taglist', component: Taglist },
//         { path: '/BlogDetail/*', component: BlogDetail },
//       ]
//       var meunList=res.data.data;
//       console.log(meunList)
//       for(var i=0;i<meunList.length;i++){
//         var url="/test/*"
//         if(meunList[i].url!=""){
//           url="/"+meunList[i].url
//         }
//        var  obj={};
//         obj.path=url;
//         obj.component=BlogDetail;
//         children.push(obj)
//       }
//       console.log(children)
//       return children;
//     })
//
//
//
// }
