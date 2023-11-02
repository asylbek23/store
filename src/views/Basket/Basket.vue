<template>
  <!-- Корневой контейнер корзины -->
  <div :class="$style['basket']">
    <div class="container">
      <h1>Basket</h1>

      <!-- Цикл для отображения элементов корзины -->
      <div
        v-for="item in cartStore.items"
        :key="item.id"
        :class="$style['product']">
        <!-- Ссылка на страницу деталей продукта -->
        <router-link
          :to="{ name: 'productDetails', params: { id: item.id } }"
          :class="$style['product__link']">
          <!-- Изображение продукта -->
          <img
            :src="item.image"
            :alt="item.title"
            :class="$style['product__img']" />
        </router-link>

        <!-- Контент продукта -->
        <div :class="$style['product__content']">
          <!-- Информация о продукте -->
          <div :class="$style['product__info']">
            <h2 :class="$style['product__title']">{{ item.title }}</h2>
            <div :class="$style['product__price']">
              Price:
              <span>{{ formatPrice(item.price) }}$</span>
            </div>
            <!-- Контролы для управления количеством товара -->
            <div :class="$style['product__amount']">
              <span>Amount:</span>
              <quantity-controls
                :item="item"
                :item-quantity="cartStore.itemQuantities[item.id]"
                @increment="() => cartStore.updateItemQuantity(item, 1)"
                @decrement="() => cartStore.updateItemQuantity(item, -1)" />
            </div>
          </div>

          <!-- Кнопка для удаления продукта из корзины -->
          <button
            :class="$style['remove-product']"
            @click="toggleItemInCart(item)">
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Футер корзины с итоговыми данными -->
    <div :class="$style['basket__footer']">
      <div :class="[$style['container'], 'container']">
        <!-- Итоговая информация о корзине -->
        <div :class="$style['basket__footer-info']">
          <div :class="$style['product-amount']">
            Product:
            <span>{{ cartStore.itemCount }}</span>
          </div>
          <div :class="$style['total-price']">
            Total price:
            <span>{{ formatPrice(cartStore.totalPrice) }}$</span>
          </div>
        </div>
        <!-- Кнопка для перехода к оформлению заказа -->
        <a href="" :class="$style['checkout']">Checkout</a>
      </div>
    </div>
  </div>
</template>

<script setup>
  // Импорт хранилища корзины и компонента для управления количеством товара
  import { useCartStore } from "@/stores";
  import QuantityControls from "@/components/QuantityControls.vue";

  // Инициализация хранилища корзины
  const cartStore = useCartStore();

  // Функция для переключения товара в корзине (добавление/удаление)
  const toggleItemInCart = cartStore.toggleItemInCart;

  // Функция для форматирования цены
  const formatPrice = (price) => price.toFixed(2);
</script>

<!-- Стили для компонента Basket -->
<style lang="scss" module>
  @import "Basket.module.scss";
</style>
