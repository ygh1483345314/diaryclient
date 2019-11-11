import adminHome from '@/components/admin/AdminHome'
import adminIndex from '@/components/admin/AdminIndex'
import AdminNew from '@/components/admin/AdminNew'
import  AdminArticles from '@/components/admin/AdminArticles'
import  AdminPages from '@/components/admin/AdminPages'
import  AdminPagesNew from '@/components/admin/AdminPagesNew'
import  AdminLogin from '@/components/admin/AdminLogin'
import  AdminTag from '@/components/admin/AdminTag'
import  AdminUpload from '@/components/admin/adminUpload'

export default [
  {
    path: '/admin',
    name: 'adminHome',
    redirect: '/adminIndex',
    component: adminHome,
    meta: {
      requireAuth: true
    },
    children: [
      { path: '/adminIndex', component: adminIndex,name:"仪表盘" ,
        meta: {
          requireAuth: true
        }
        },
      { path: '/AdminNew', component: AdminNew ,name:"发布文章",
        meta: {
          requireAuth: true
        }},
      { path: '/AdminArticles', component: AdminArticles,name:"文章管理" ,
        meta: {
          requireAuth: true
        }},
      {path:"/AdminPages",component:AdminPages,name:"页面管理",
        meta: {
          requireAuth: true
        }},
      {path:"/AdminPagesNew",component:AdminPagesNew,name:"新增页面",
        meta: {
          requireAuth: true
        }},
      {path:"/AdminFile",component:AdminUpload,name:"文件管理",
        meta: {
          requireAuth: true
        }},
      {path:"/AdminTag",component:AdminTag,name:"分类/标签",
        meta: {
          auth: true
        }},
      {path:"/AdminComments",component:AdminArticles,name:"评论",
        meta: {
          requireAuth: true
        }},
      {path:"/AdminSeting",component:AdminArticles,name:"系统设置",
        meta: {
          requireAuth: true
        }},
      // {path:"/AdminOther",component:AdminArticles,name:"其他",},
    ]
  },

  { path: '/adminLogin', component: AdminLogin,name:"管理员登录" },
  // { path: '/admin', component: adminHome,name:"管理员登录" },

]

