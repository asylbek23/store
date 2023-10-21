import axios from "axios"; // Импорт библиотеки axios для HTTP-запросов

// Создание экземпляра axios с базовым URL, полученным из переменных окружения
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default axiosClient; // Экспорт экземпляра axios для использования в других частях приложения
