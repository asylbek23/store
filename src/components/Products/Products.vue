<template>
  <div class="products">
    <!-- Цикл по продуктам -->
    <router-link
      :to="{ name: 'productDetails', params: { id: product.id } }"
      :class="$style['product']"
      v-for="product in products"
      :key="product.id">
      <!-- Область изображения продукта с возможностью быстрого просмотра -->
      <div :class="$style['product__img']" @click.prevent="showModal(product)">
        <img :src="product.image" :alt="product.title" />
        <div :class="$style['quick-view']">Quick view</div>
      </div>

      <!-- Информация о продукте -->
      <div :class="$style['product__info']">
        <p :class="$style['product__title']">
          {{ truncateText(product.title, 40) }}
        </p>
        <p :class="$style['product__price']">{{ product.price }}$</p>
        <p :class="$style['product__descr']">
          {{ truncateText(product.description, 70) }}
        </p>
      </div>

      <!-- Кнопка добавления товара в корзину, если товар уже не в корзине -->
      <button
        v-if="!cartStore.itemQuantities[product.id]"
        @click.prevent="cartStore.updateItemQuantity(product, 1)"
        :class="$style['product__button']">
        Add to basket
      </button>

      <!-- Контролы количества, если товар уже в корзине -->
      <div v-else class="product__quantity-controls">
        <div
          @click.prevent="cartStore.updateItemQuantity(product, -1)"
          class="quantity-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path
              fill="currentColor"
              d="M5 11a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2H5Z"></path>
          </svg>
        </div>

        <span class="quantity-value">
          {{ cartStore.itemQuantities[product.id] }}
        </span>

        <button
          @click.prevent="cartStore.updateItemQuantity(product, 1)"
          class="quantity-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path
              fill="currentColor"
              d="M12 4a1 1 0 0 0-1 1v6H5a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V5a1 1 0 0 0-1-1Z"></path>
          </svg>
        </button>
      </div>
    </router-link>

    <!-- Сообщение, если продукты не найдены -->
    <p v-if="products.length === 0" :class="$style['not-found']">
      Nothing found &#129335;&#8205;&#9794;&#65039;
    </p>
  </div>
</template>

<script setup>
  import { truncateText } from "@/helpers"; // Импорт утилиты для обрезки текста
  import { useCartStore } from "@/stores"; // Импорт хранилища корзины

  const props = defineProps(["products", "showModal"]); // Определение свойств компонента
  const cartStore = useCartStore(); // Инициализация хранилища корзины
</script>

<style lang="scss" module>
  @import "Products.module.scss"; // Импорт стилей
</style>
