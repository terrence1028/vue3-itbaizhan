import { createRouter, createWebHistory } from 'vue-router'
import Layout from "../views/Layout.vue"
import HomeView from '../views/Homeview/index.vue'
import TableLayout from 'element-plus/es/components/table/src/table-layout'
import LoginInfo from "../views/LoginInfo/index.vue"
import { useLoginStore } from "../stores/loginStore.js"
import { useMenuStore } from "../stores/menuStore.js";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Layout",
      component: Layout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
          meta: {
            requiresAuth: true,
            key: "首頁"
          }
        },
        {
          path: "/project",
          name: "project",
          component: () => import("../views/ProjectInfo/index.vue"),
          meta: {
            requiresAuth: true,
            key: "項目基礎信息"
          }
        },
        {
          path: "/tunnel",
          name: "tunnel",
          component: () => import("../views/Tunnelinfo/index.vue"),
          meta: {
            requiresAuth: true,
            key: "隧道基礎信息"
          }
        },
        {
          path: "/build",
          name: "build",
          component: () => import("../views/BuildManage/index.vue"),
          meta: {
            requiresAuth: true,
            key: "施工監控撿測",
          }
        },
        {
          path: "/Geological",
          name: "Geological",
          component: () => import("../views/Geologicalinfo/index.vue"),
          meta: {
            requiresAuth: true,
            key: "超前地質預報報"
          }
        },
        {
          path: "/system",
          name: "system",
          component: () => import("../views/SystemManage/index.vue"),
          meta: {
            requiresAuth: true,
            key: "系統信息管理"
          }
        },
        {
          path: "/ucenter",
          name: "ucenter",
          component: () => import("../views/UserCenter/index.vue"),
          meta: {
            requiresAuth: true,
            key: "個人中心"
          }
        },
        {
          path: "/plan",
          name: "撿測計劃",
          component: () => import("../views/BuildManage/PlanTest/index.vue"),
          meta: {
            requiresAuth: true,
            key: "撿測計劃"
          }
        },
        {
          path: "/section",
          name: "切面撿測",
          component: () => import("../views/BuildManage/SectionTest/index.vue"),
          meta: {
            requiresAuth: true,
            key: "切面撿測"
          }
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: LoginInfo
    }, ,
    {
      path: "/pdf/:id",
      name: "pdf",
      component: () => import("../views/Tunnelinfo/PDFPreview/index.vue")
    },

    //404器路徑匹配規則
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("../views/not found/index.vue")
    }
  ]
})

//路由權限
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    //需要驗證登錄
    const loginStore = useLoginStore()
    if (!loginStore.token) {
      next({
        path: "/login"
      })
    } else {
      next()
    }
  } else
    next()
})

router.afterEach((to, from) => {
  console.log(to);
  //存儲路徑
  localStorage.setItem("active", to.path)
  if (to.meta.key) {
    //存儲key信息
    const menuStore = useMenuStore()
    menuStore.breadcumb = to.meta.key
  }
})



export default router
