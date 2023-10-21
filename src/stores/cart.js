// Импорт функционала для создания нового хранилища из библиотеки pinia
import { defineStore } from "pinia";

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
    // Увеличение количества указанного товара в корзине
    incrementItemQuantity(product) {
      if (!this.itemQuantities[product.id]) {
        this.itemQuantities[product.id] = 1;
        this.items.push(product);
      } else {
        this.itemQuantities[product.id]++;
      }
      this.saveStateToLocalStorage();
    },

    // Уменьшение количества указанного товара в корзине
    decrementItemQuantity(product) {
      if (
        this.itemQuantities[product.id] &&
        this.itemQuantities[product.id] > 1
      ) {
        this.itemQuantities[product.id] -= 1;
      } else if (this.itemQuantities[product.id] === 1) {
        delete this.itemQuantities[product.id];
        const productIndex = this.items.findIndex(
          (item) => item.id === product.id
        );
        if (productIndex !== -1) {
          this.items.splice(productIndex, 1);
        }
      }
      this.saveStateToLocalStorage();
    },

    // Уменьшение количества указанного товара в корзине (специфично для корзины)
    decrementItemQuantityInBasket(product) {
      if (
        this.itemQuantities[product.id] &&
        this.itemQuantities[product.id] > 1
      ) {
        this.itemQuantities[product.id]--;
        this.saveStateToLocalStorage();
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
        if (!this.itemQuantities[product.id]) {
          this.itemQuantities[product.id] = 1;
        } else {
          this.itemQuantities[product.id]++;
        }
      }

      this.saveStateToLocalStorage();
    },

    // Очистка корзины
    clearCart() {
      this.items = [];
      this.addedItems = {};
      this.saveStateToLocalStorage();
    },

    // Сохранение текущего состояния хранилища в LocalStorage
    saveStateToLocalStorage() {
      updateLocalStorage("cart-items", this.items);
      updateLocalStorage("cart-item-quantities", this.itemQuantities);
    },
  },
});

// Функция для получения элемента из LocalStorage или возврата значения по умолчанию
function getLocalStorageItem(key, defaultValue) {
  try {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
  } catch {
    return defaultValue;
  }
}

// Функция для обновления элемента в LocalStorage
function updateLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
