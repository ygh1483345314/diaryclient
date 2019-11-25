// import adminHome from '@/components/admin/AdminHome'
// import adminIndex from '@/components/admin/AdminIndex'
// import AdminNew from '@/components/admin/AdminNew'
// import  AdminArticles from '@/components/admin/AdminArticles'
// import  AdminPages from '@/components/admin/AdminPages'
// import  AdminPagesNew from '@/components/admin/AdminPagesNew'
// import  AdminLogin from '@/components/admin/AdminLogin'
// import  AdminTag from '@/components/admin/AdminTag'
// import  AdminUpload from '@/components/admin/adminUpload'

export default [
  {
    path: '/admin',
    name: 'adminHome',
    redirect: '/adminIndex',
    component:resolve => require(['@/components/admin/AdminHome'],resolve),
    meta: {
      requireAuth: true
    },
    children: [
      { path: '/adminIndex',   component:resolve => require(['@/components/admin/adminIndex'],resolve),name:"仪表盘" ,
        meta: {
          requireAuth: true
        }
        },
      { path: '/AdminNew',   component:resolve => require(['@/components/admin/AdminNew'],resolve),name:"发布文章",
        meta: {
          requireAuth: true
        }},
      { path: '/AdminArticles',  component:resolve => require(['@/components/admin/AdminArticles'],resolve),name:"文章管理" ,
        meta: {
          requireAuth: true
        }},
      {path:"/AdminPages",  component:resolve => require(['@/components/admin/AdminPages'],resolve),name:"页面管理",
        meta: {
          requireAuth: true
        }},
      {path:"/AdminPagesNew",  component:resolve => require(['@/components/admin/AdminPagesNew'],resolve),name:"新增页面",
        meta: {
          requireAuth: true
        }},
      {path:"/AdminFile",  component:resolve => require(['@/components/admin/AdminUpload'],resolve),name:"文件管理",
        meta: {
          requireAuth: true
        }},
      {path:"/AdminTag",  component:resolve => require(['@/components/admin/AdminTag'],resolve),name:"分类/标签",
        meta: {
          auth: true
        }},
      {path:"/AdminComments",  component:resolve => require(['@/components/admin/AdminPages'],resolve),name:"评论",
        meta: {
          requireAuth: true
        }},
      {path:"/AdminSeting",  component:resolve => require(['@/components/admin/AdminPages'],resolve),name:"系统设置",
        meta: {
          requireAuth: true
        }},
      // {path:"/AdminOther",component:AdminArticles,name:"其他",},
    ]
  },

  { path: '/adminLogin',   component:resolve => require(['@/components/admin/adminLogin'],resolve),name:"管理员登录" },
  // { path: '/admin', component: adminHome,name:"管理员登录" },

]

