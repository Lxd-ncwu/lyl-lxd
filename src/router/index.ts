import { createRouter, createWebHashHistory } from "vue-router"
import App from "@/App.vue"
import Login from "@/pages/Login.vue"
const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/index",
    name: "app",
    component: App,
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("@/components/Dashboard.vue")
      },
      {
        path: "/formlayout",
        name: "formlayout",
        component: () => import("@/components/FormLayoutDemo.vue")
      },
      {
        path: "/input",
        name: "input",
        component: () => import("@/components/InputDemo.vue")
      },
      {
        path: "/invalidstate",
        name: "invalidstate",
        component: () => import("@/components/InvalidStateDemo.vue")
      },
      {
        path: "/button",
        name: "button",
        component: () => import("@/components/ButtonDemo.vue")
      },
      {
        path: "/table",
        name: "table",
        component: () => import("@/components/TableDemo.vue")
      },

      {
        path: "/chart",
        name: "chart",
        component: () => import("@/components/ChartDemo.vue")
      },
      {
        path: "/crud",
        name: "crud",
        component: () => import("@/pages/CrudDemo.vue")
      },
      {
        path: "/esManage",
        name: "esManage",
        component: () => import("@/components/putInStorage/EsManage.vue")
      },
      {
        path: "/essManage",
        name: "essManage",
        component: () => import("@/components/putInStorage/EssManage.vue")
      },
      {
        path: "/esssManage",
        name: "esssManage",
        component: () => import("@/components/putInStorage/EsssManage.vue")
      },
      {
        path: "/essssManage",
        name: "essssManage",
        component: () => import("@/components/putInStorage/EssssManage.vue")
      },
      {
        path: "/storage",
        name: "storage",
        component: () => import("@/components/purchaseStorage/Storage.vue")
      },
      {
        path: "/storeRoom",
        name: "storeroom",
        component: () => import("@/components/purchaseStorage/storeRoom.vue")
      },
      {
        path: "/spaceStore",
        name: "spaceStore",
        component: () => import("@/components/purchaseStorage/spaceStore.vue")
      },
      {
        path: "/documentation",
        name: "documentation",
        component: () => import("@/components/Documentation.vue")
      },
      {
        path: "/blocks",
        name: "blocks",
        component: () => import("@/components/BlocksDemo.vue")
      },
      {
        path: "/icons",
        name: "icons",
        component: () => import("@/components/IconsDemo.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/Login.vue")
  },
  {
    path: "/landing",
    name: "landing",
    component: () => import("@/pages/LandingDemo.vue")
  },
  {
    path: "/error",
    name: "error",
    component: () => import("@/pages/Error.vue")
  },
  {
    path: "/notfound",
    name: "notfound",
    component: () => import("@/pages/NotFound.vue")
  },
  {
    path: "/access",
    name: "access",
    component: () => import("@/pages/Access.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
