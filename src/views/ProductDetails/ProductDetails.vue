<template>
  <!-- Корневой элемент страницы с деталями продукта -->
  <div :class="$style['product-page']">
    <div class="container">
      <h1 class="title">Product details</h1>

      <!-- Блок с информацией о продукте, отображается, если продукт загружен -->
      <div v-if="product && product.id" :class="$style['product-block']">
        <!-- Блок с изображением продукта -->
        <div :class="$style['product-img']">
          <img :src="product.image" :alt="product.title" />
        </div>
        <!-- Блок с информацией о продукте -->
        <div :class="$style['product-info']">
          <h2 :class="$style['product-title']">{{ product.title }}</h2>
          <div :class="$style['product-price']">
            Price:
            <span>{{ product.price }}$</span>
          </div>
          <p :class="$style['product-descr']">{{ product.description }}</p>
        </div>
      </div>

      <!-- Блок загрузки, отображается, если продукт не загружен -->
      <div v-else :class="$style['product-loading']">Loading...</div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  import {
    useRoute,
    onBeforeRouteUpdate,
    onBeforeRouteLeave,
  } from "vue-router";
  import { getProduct } from "@/api";
  import { usebreadcrumb } from "@/stores/breadcrumbs.js";

  const route = useRoute();
  const product = ref({});
  const breadcrumb = usebreadcrumb();
  const intervalId = ref(null);

  // Обработчик перед покиданием маршрута
  onBeforeRouteLeave(async (to, from, next) => {
    breadcrumb.resetTitle();
    next();
  });

  // Обработчик перед обновлением маршрута
  onBeforeRouteUpdate(async (to, from, next) => {
    await getProduct(to.params.id);
    next();
  });

  // Обработчик при монтировании компонента
  onMounted(async () => {
    const routeId = route.params.id;
    await getProduct(routeId, product, breadcrumb); // Первая попытка загрузки

    // Настроить повторные попытки каждые 2 секунд, если первая попытка не удалась
    intervalId.value = setInterval(async () => {
      await getProduct(routeId, product, breadcrumb);
    }, 2000);
  });

  // Обработчик при размонтировании компонента
  onUnmounted(() => {
    // Остановите интервал, когда компонент размонтируется, чтобы избежать утечек памяти
    if (intervalId.value) {
      clearInterval(intervalId.value);
    }
  });
</script>

<!-- Стили для страницы с деталями продукта -->
<style lang="scss" module>
  @import "ProductDetails.module.scss";
</style>
