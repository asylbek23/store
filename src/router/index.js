// Импорт функционала для создания роутера и веб-истории из библиотеки vue-router
import { createRouter, createWebHistory } from "vue-router";

// Импорт компонентов страниц, которые будут использоваться в роутинге
import DefaultLayout from "@/layout/default.vue";
import Home from "@/views/Home.vue";
import Basket from "@/views/Basket/Basket.vue";
import ProductDetails from "@/views/ProductDetails/ProductDetails.vue";
import NotFound from "@/views/NotFound.vue";

// Определение маршрутов приложения
const routes = [
  {
    path: "/", // Путь для корневого маршрута
    component: DefaultLayout, // Компонент, который будет отображаться для корневого маршрута
    children: [
      // Дочерние маршруты корневого маршрута
      {
        path: "/", // Путь для главной страницы
        name: "home", // Имя маршрута для главной страницы
        component: Home, // Компонент, который будет отображаться для главной страницы
        meta: { breadcrumb: "Logo" }, // Мета-информация для маршрута главной страницы
      },
      {
        path: "/basket", // Путь для страницы корзины
        name: "basket", // Имя маршрута для страницы корзины
        component: Basket, // Компонент, который будет отображаться для страницы корзины
        meta: { breadcrumb: "Basket" }, // Мета-информация для маршрута страницы корзины
      },
      {
        path: "/product/:id", // Путь для страницы деталей продукта, :id - параметр маршрута
        name: "productDetails", // Имя маршрута для страницы деталей продукта
        component: ProductDetails, // Компонент, который будет отображаться для страницы деталей продукта
        meta: { isProductRoute: true }, // Мета-информация для маршрута страницы деталей продукта
      },
      {
        path: "/:pathMatch(.*)*", // Правило для обработки всех необработанных выше путей
        name: "NotFound", // Имя маршрута для несуществующих страниц
        component: NotFound, // Компонент, который будет отображаться для несуществующих страниц
      },
    ],
  },
];

// Создание экземпляра роутера с использованием истории браузера и заданными маршрутами
const router = createRouter({
  history: createWebHistory(), // Использование веб-истории браузера для роутинга
  routes, // Применение определенных выше маршрутов
});

// Экспорт экземпляра роутера для использования во Vue приложении
export default router;
