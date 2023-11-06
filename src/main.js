import { createApp } from "vue"; // Импорт функции создания приложения Vue
import { createPinia } from "pinia"; // Импорт функции создания Pinia (стейт-менеджмент)
// import { localStorageMiddleware } from "@/helpers"; // Импорт нашего middleware
import piniaPersistedState from "pinia-plugin-persistedstate";

import App from "./App.vue"; // Импорт главного компонента приложения
import router from "./router"; // Импорт роутера
import "@/assets/scss/style.scss"; // Импорт глобальных стилей SCSS

const pinia = createPinia(); // Создание экземпляра Pinia
pinia.use(piniaPersistedState); // Подключение middleware к Pinia

const app = createApp(App); // Создание экземпляра приложения Vue
app.use(pinia); // Инициализация Pinia для управления состоянием приложения
app.use(router); // Регистрация роутера в приложении Vue
app.mount("#app"); // Монтирование приложения Vue в DOM
