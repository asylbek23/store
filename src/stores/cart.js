// Импорт функционала для создания нового хранилища из библиотеки pinia
import { defineStore } from "pinia";

// Экспорт функции для работы с хранилищем корзины, используя defineStore
export const useCartStore = defineStore({
  id: "cart", // Уникальный идентификатор хранилища
  persist: true, // Это включает сохранение состояния для этого хранилища

  // Инициализация начального состояния хранилища из LocalStorage или значений по умолчанию
  state: () => ({
    items: [],
    addedItems: {},
    itemQuantities: {},
  }),

  // Геттеры для получения производных значений из состояния
  getters: {
    // Подсчет общего количества товаров в корзине
    itemCount: (state) => {
      return Object.values(state.itemQuantities).reduce(
        (total, quantity) => total + quantity,
        0
      );
    },

    // Подсчет общей стоимости товаров в корзине
    totalPrice: (state) => {
      const total = state.items.reduce(
        (sum, item) => sum + item.price * (state.itemQuantities[item.id] || 0),
        0
      );
      return parseFloat(total.toFixed(2));
    },
  },

  // Действия (методы) для изменения состояния хранилища
  actions: {
    updateItemQuantity(product, amount) {
      this.$patch((state) => {
        const currentQuantity = state.itemQuantities[product.id] || 0;
        const newQuantity = currentQuantity + amount;

        if (newQuantity > 0) {
          state.itemQuantities[product.id] = newQuantity;
        } else {
          delete state.itemQuantities[product.id];
        }

        const itemIndex = state.items.findIndex(
          (item) => item.id === product.id
        );

        if (itemIndex === -1 && newQuantity > 0) {
          state.items.push(product);
        } else if (newQuantity <= 0 && itemIndex !== -1) {
          state.items.splice(itemIndex, 1);
        }
      });
    },

    // Переключение наличия указанного товара в корзине
    toggleItemInCart(product) {
      this.$patch((state) => {
        const productIndex = state.items.findIndex(
          (item) => item.id === product.id
        );

        if (productIndex !== -1) {
          state.items.splice(productIndex, 1);
          state.addedItems[product.id] = false;
          delete state.itemQuantities[product.id];
        } else {
          state.items.push(product);
          state.addedItems[product.id] = true;
          state.itemQuantities[product.id] =
            (state.itemQuantities[product.id] || 0) + 1;
        }
      });
    },

    // Очистка корзины
    clearCart() {
      this.$patch((state) => {
        state.items = [];
        state.addedItems = {};
        state.itemQuantities = {};
      });
    },
  },
});
