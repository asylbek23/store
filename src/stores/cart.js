// Импорт функционала для создания нового хранилища из библиотеки pinia
import { defineStore } from "pinia";
import { getLocalStorageItem } from "@/helpers";
import { localStorageMiddleware } from "@/helpers";

// Экспорт функции для работы с хранилищем корзины, используя defineStore
export const useCartStore = defineStore({
  id: "cart", // Уникальный идентификатор хранилища

  // Инициализация начального состояния хранилища из LocalStorage или значений по умолчанию
  state: () => ({
    items: getLocalStorageItem("cart-items", []),
    addedItems: getLocalStorageItem("cart-added-items", {}),
    itemQuantities: getLocalStorageItem("cart-item-quantities", {}),
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
      const newQuantity = (this.itemQuantities[product.id] || 0) + amount;
      if (newQuantity > 0) {
        this.itemQuantities[product.id] = newQuantity;
        if (!this.items.some((item) => item.id === product.id)) {
          this.items.push(product);
        }
      } else if (newQuantity === 0) {
        delete this.itemQuantities[product.id];
        const productIndex = this.items.findIndex(
          (item) => item.id === product.id
        );
        if (productIndex !== -1) {
          this.items.splice(productIndex, 1);
        }
      }
    },

    // Переключение наличия указанного товара в корзине
    toggleItemInCart(product) {
      const productIndex = this.items.findIndex(
        (item) => item.id === product.id
      );

      if (productIndex !== -1) {
        this.items.splice(productIndex, 1);
        this.addedItems[product.id] = false;
        delete this.itemQuantities[product.id];
      } else {
        this.items.push(product);
        this.addedItems[product.id] = true;
        this.itemQuantities[product.id] =
          (this.itemQuantities[product.id] || 0) + 1;
      }
    },

    // Очистка корзины
    clearCart() {
      this.items = [];
      this.addedItems = {};
    },
  },

  plugins: [localStorageMiddleware],
});
