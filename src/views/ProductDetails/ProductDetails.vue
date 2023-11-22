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
  import { useBreadcrumb } from "@/stores";

  // Используем хук для доступа к текущему маршруту
  const route = useRoute();
  // Состояние для хранения данных продукта
  const product = ref({});
  // Доступ к хранилищу для работы с хлебными крошками
  const breadcrumb = useBreadcrumb();
  // Состояние для хранения идентификатора интервала
  const intervalId = ref(null);

  // Функция загрузки продукта
  const loadProduct = async (id) => {
    try {
      await getProduct(id, product, breadcrumb);
      clearInterval(intervalId.value);
      return true;
    } catch (error) {
      console.error("Error from getting product:", error);
      return false;
    }
  };

  // Хук, срабатывающий перед тем, как покинуть текущий маршрут
  onBeforeRouteLeave(() => {
    // Сбрасываем заголовок хлебных крошек
    breadcrumb.resetTitle();
    // Останавливаем интервал, чтобы избежать утечек памяти
    clearInterval(intervalId.value);
  });

  // Хук, срабатывающий перед обновлением маршрута
  onBeforeRouteUpdate(async (to) => {
    // Загружаем продукт с новым ID из параметра маршрута
    await loadProduct(to.params.id);
  });

  // Хук, срабатывающий при монтировании компонента
  onMounted(async () => {
    // ID продукта из параметра маршрута
    const routeId = route.params.id;
    // Пытаемся загрузить продукт
    const wasSuccessful = await loadProduct(routeId, product, breadcrumb);

    // Если загрузка не удалась, настраиваем интервал для повторных попыток
    if (!wasSuccessful) {
      intervalId.value = setInterval(() => {
        loadProduct(routeId);
      }, 2000);
    }
  });

  // Хук, срабатывающий при размонтировании компонента
  onUnmounted(() => {
    // Очищаем интервал, чтобы избежать утечек памяти
    clearInterval(intervalId.value);
  });
</script>

<!-- Стили для страницы с деталями продукта -->
<style lang="scss" module>
  @import "ProductDetails.module.scss";
</style>
