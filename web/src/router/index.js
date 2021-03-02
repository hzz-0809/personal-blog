import Vue from 'vue'
import VueRouter from 'vue-router'

//用户界面
//view
const UserIndex = () => import("@/views/user/UserIndex");
const Userlogin = () => import("@/views/user/UserLogin");
const UserRegister = () => import("@/views/user/UserRegister");
const UserFindPass = () => import("@/views/user/UserFindPass");
const UserHome = () => import("@/views/user/UserHome");
const UserArticle = () => import("@/views/user/UserArticle");
const UserAccount = () => import("@/views/user/UserAccount");
const UserInfo = () => import("@/components/user/UserInfo");
const UserPass = () => import("@/components/user/UserPass");
const UserAvatar = () => import("@/components/user/UserAvatar")
//管理员界面
//view
const AdminIndex = () => import("@/views/admin/AdminIndex")
const AdminHome = () => import("@/views/admin/AdminHome")
const AdminPublish = () => import("@/views/admin/AdminPublish")
const AdminLogin = () => import("@/views/admin/AdminLogin")
//blog
const BlogHome = () => import("@/views/blog/BlogHome")


Vue.use(VueRouter)

const routes = [
  //user 
  {
    path: '/',
    component: UserIndex,
    children: [
      {
        path: "/",
        name: "UserHome",
        component: UserHome
      },
      {
        path: "article",
        name: "UserArticle",
        component: UserArticle
      },
      {
        path: "account",
        component: UserAccount,
        children: [
          {
            path: "/",
            redirect: "info"
          },
          {
            path: "info",
            name: "UserInfo",
            component: UserInfo
          },
          {
            path: "avatar",
            name: "UserAvatar",
            component: UserAvatar
          },
          {
            path: "pass",
            name: "UserPass",
            component: UserPass
          }
        ]
      }
    ],
    meta: {
      title: "Evan Zhao"
    }
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: Userlogin,
    meta: {
      title: "登录"
    }
  },
  {
    path: '/register',
    name: 'UserRegister',
    component: UserRegister,
    meta: {
      title: "注册"
    }
  },
  {
    path: '/findPass/:email',
    name: 'UserFindPass',
    component: UserFindPass,
    meta: {
      title: "找回密码"
    }
  },
  //blog content
  {
    path: "/blog",
    name: "BlogHome",
    component: BlogHome,
    meta: {
      title: "EvanZhao博文"
    }
  },
  //admin
  {
    path: "/hzz",
    component: AdminIndex,
    meta: {
      title: "EvanZhao博客后台"
    },
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("adminToken")) next("/hzz/login");
      else next();
    },
    children: [
      {
        path: "/",
        component: AdminHome,
        children: [
          {
            path: "/",
            redirect: "add"
          },
          {
            path: "add",
            name: "AdminPublish",
            component: AdminPublish
          }
        ]
      }
    ]
  },
  {
    path: "/hzz/login",
    component: AdminLogin,
    meta: {
      title: "EvanZhao本尊登录"
    },
  }
]

const router = new VueRouter({
  "mode": "history",
  routes
})

router.beforeEach((to, from, next) => {
  //修改title
  document.title = to.matched[0].meta.title;
  next();
})

export default router
