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
        path: "/essssManage",
        name: "essssManage",
        component: () => import("@/components/putInStorage/EssssManage.vue")
      },
      {
        path: "/materialType",
        name: "materialType",
        component: () => import("@/components/putInStorage/MaterialType.vue")
      },
      {
        path: "/materialPackStyle",
        name: "materialPackStyle",
        component: () => import("@/components/putInStorage/MaterialPackStyle.vue")
      },
      {
        path: "/materialAttribute",
        name: "materialAttribute",
        component: () => import("@/components/putInStorage/MaterialAttribute.vue")
      },
      {
        path: "/materialEnter",
        name: "materialEnter",
        component: () => import("@/components/putInStorage/MaterialEnter.vue")
      },
      {
        path: "/materialEnterUpdate",
        name: "materialEnterUpdate",
        component: () => import("@/components/putInStorage/MaterialEnterUpdate.vue")
      },
      {
        path: "/materialAccept",
        name: "materialAccept",
        component: () => import("@/components/putInStorage/MaterialAccept.vue")
      },
      {
        path: "/entryList",
        name: "entryList",
        component: () => import("@/components/putInStorage/EntryList.vue")
      },
      {
        path: "/rfid",
        name: "rfid",
        component: () => import("@/components/putInStorage/RFID.vue")
      },
      {
        path: "/storage",
        name: "storage",
        component: () => import("@/components/purchaseInfo/Storage.vue")
      },
      {
        path: "/storeRoom",
        name: "storeroom",
        component: () => import("@/components/purchaseInfo/storeRoom.vue")
      },
      {
        path: "/spaceStore",
        name: "spaceStore",
        component: () => import("@/components/purchaseInfo/spaceStore.vue")
      },
      {
        path: "/userList",
        name: "userList",
        component: () => import("@/components/purchaseInfo/userList.vue")
      },
      {
        path: "/newProducter",
        name: "newProducter",
        component: () => import("@/components/purchaseInfo/newProducter.vue")
      },
      {
        path: "/producerList",
        name: "producerList",
        component: () => import("@/components/purchaseInfo/producerList.vue")
      },
      {
        path: "/storageMaterial",
        name: "storageMaterial",
        component: () => import("@/components/purchaseInfo/storageMaterial.vue")
      },
      {
        path: "/storageRoomMaterial",
        name: "storageRoomMaterial",
        component: () => import("@/components/purchaseInfo/storageRoomMaterial.vue")
      },
      {
        path: "/spaceMaterial",
        name: "spaceMaterial",
        component: () => import("@/components/purchaseInfo/spaceMaterial.vue")
      },
      {
        path: "/materialList",
        name: "materialList",
        component: () => import("@/components/purchaseInfo/materialList.vue")
      },
      {
        path: "/userOrderList",
        name: "userOrderList",
        component: () => import("@/components/purchaseInfo/userOrderList.vue")
      },
      {
        path: "/rootOrderList",
        name: "rootOrderList",
        component: () => import("@/components/purchaseInfo/rootOrderList.vue")
      },
      {
        path: "/checkOrder",
        name: "checkOrder",
        component: () => import("@/components/purchaseInfo/checkOrder.vue")
      },
      {
        path: "/storageMaterialOrder",
        name: "storageMaterialOrder",
        component: () => import("@/components/purchaseInfo/storageMaterialOrder.vue")
      },
      {
        path: "/newMaterialOrder",
        name: "newMaterialOrder",
        component: () => import("@/components/purchaseInfo/newMaterialOrder.vue")
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
  },
  {
    path: "/notoken",
    name: "notoken",
    component: () => import("@/pages/NoToken.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
