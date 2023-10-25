// Импорт функционала для создания нового хранилища из библиотеки pinia
import { defineStore } from "pinia";

// Экспорт функции для работы с хранилищем хлебных крошек, используя defineStore
export const useBreadcrumb = defineStore({
  id: "breadcrumb", // Уникальный идентификатор хранилища

  // Инициализация начального состояния хранилища
  state: () => ({
    title: "", // Заголовок для хлебных крошек
    isLoading: true, // Свойство для отслеживания состояния загрузки
  }),

  // Действия (методы) для изменения состояния хранилища
  actions: {
    // Устанавливает новое значение для title в состоянии хранилища
    setTitle(title) {
      this.title = title;
    },

    // Устанавливает новое значение для isLoading в состоянии хранилища
    setLoading(isLoading) {
      this.isLoading = isLoading;
    },

    // Сбрасывает значение title и устанавливает isLoading в true
    resetTitle() {
      this.title = "";
      this.isLoading = true;
    },
  },
});
