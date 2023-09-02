import { createRouter, createWebHistory } from "vue-router"
import DefaultLayout from "../components/DefaultLayout.vue"
import Home from "../views/Home/Home.vue"
import Basket from "../views/Basket.vue"
import ProductDetails from "../views/ProductDetails/ProductDetails.vue"

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: "/basket",
        name: "basket",
        component: Basket,
      },
      {
        path: "/product/:id",
        name: "productDetails",
        component: ProductDetails,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
