import { createApp } from "vue"; // Импорт функции создания приложения Vue
import { createPinia } from "pinia"; // Импорт функции создания Pinia (стейт-менеджмент)
import App from "./App.vue"; // Импорт главного компонента приложения
import router from "./router"; // Импорт роутера
import "@/scss/style.scss"; // Импорт глобальных стилей SCSS

const app = createApp(App); // Создание экземпляра приложения Vue

app.use(createPinia()); // Инициализация Pinia для управления состоянием приложения

app.use(router); // Регистрация роутера в приложении Vue
app.mount("#app"); // Монтирование приложения Vue в DOM
