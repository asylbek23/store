<template>
  <!-- Шапка сайта -->
  <header class="header">
    <div class="container">
      <!-- Ссылка на главную страницу с логотипом -->
      <router-link :to="{ name: 'home' }" class="header__link">
        Logo
      </router-link>

      <!-- Ссылка на корзину с иконкой и количеством товаров -->
      <router-link :to="{ name: 'basket' }" class="header__link">
        Basket
        <!-- Иконка корзины -->
        <img src="../assets/basket.png" alt="basket" width="20" height="20" />
        <!-- Количество товаров в корзине (отображается только если товары есть) -->
        <div v-if="cartStore.itemCount > 0" class="basket-product-amount">
          {{ cartStore.itemCount }}
        </div>
      </router-link>
    </div>
  </header>
</template>

<script setup>
  // Импорт хранилища корзины и получение его инстанса
  import { useCartStore } from "@/stores";
  const cartStore = useCartStore();
</script>
