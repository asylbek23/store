<template>
  <!-- Корневой элемент домашней страницы -->
  <div :class="$style['home']">
    <div class="container">
      <!-- Поле поиска продуктов -->
      <input
        type="text"
        :class="$style['search']"
        v-model="searchText"
        placeholder="Search products" />

      <!-- Компонент фильтрации продуктов по категориям -->
      <Filter
        :filtered-categories="filteredCategories"
        :selected-category="selectedCategory"
        @update-category="updateCategory" />

      <!-- Компонент списка продуктов -->
      <Products :products="filteredProducts" :show-modal="showModal" />

      <!-- Оверлей модального окна, отображается при выборе продукта -->
      <div
        v-if="selectedProduct"
        :class="$style['overlay']"
        @click="closeModal"></div>

      <!-- Модальное окно с деталями продукта -->
      <product-modal
        :product="selectedProduct"
        :close-modal="closeModal"
        v-if="selectedProduct" />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, watch, watchEffect } from "vue";
  import { getProducts } from "@/api";
  import Filter from "@/components/Filter/Filter.vue";
  import Products from "@/components/Products/Products.vue";
  import ProductModal from "@/components/ProductModal.vue";

  // Состояние компонента
  const products = ref(JSON.parse(localStorage.getItem("products")) || []);
  const searchText = ref("");
  const filteredProducts = ref([]);
  const filteredCategories = ref([]);
  const selectedCategory = ref(null);
  const selectedProduct = ref(null);

  // Обновление выбранной категории
  const updateCategory = (category) => {
    selectedCategory.value = category;
    searchText.value = "";
  };

  // Открытие и закрытие модального окна с деталями продукта
  function showModal(product) {
    selectedProduct.value = product;
    disableScroll();
  }

  function closeModal() {
    selectedProduct.value = null;
    enableScroll();
  }

  // Блокировка и разблокировка скролла страницы
  function disableScroll() {
    const scrollWidth = window.innerWidth - document.body.offsetWidth;
    document.body.style.paddingRight = `${scrollWidth}px`;
    document.body.style.overflow = "hidden";
  }

  function enableScroll() {
    document.body.style.paddingRight = "";
    document.body.style.overflow = "";
  }

  // Обработка событий клавиатуры для закрытия модального окна
  const onEsc = (event) => {
    if (event.key === "Escape" && selectedProduct.value) {
      closeModal();
    }
  };

  // Инициализация компонента
  onMounted(async () => {
    try {
      await getProducts(products);
      const categories = new Set(
        products.value.map((product) => product.category)
      );
      filteredCategories.value = Array.from(categories);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    document.addEventListener("keydown", onEsc);
  });

  // Очистка обработчика событий при уничтожении компонента
  onUnmounted(() => {
    document.removeEventListener("keydown", onEsc);
  });

  // Отслеживание изменений в тексте поиска и фильтрации продуктов
  watchEffect(() => {
    // Фильтрация продуктов по тексту поиска
    filteredProducts.value = products.value.filter((product) =>
      product.title.toLowerCase().includes(searchText.value.toLowerCase())
    );
  });

  // Отслеживание выбора категории и фильтрация продуктов по категории
  watch(selectedCategory, () => {
    if (selectedCategory.value === null) {
      filteredProducts.value = products.value;
    } else {
      filteredProducts.value = products.value.filter(
        (product) => product.category === selectedCategory.value
      );
    }
  });
</script>

<!-- Стили для компонента Home -->
<style lang="scss" module>
  @import "Home.module.scss";
</style>

<style lang="scss">
  .products {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 30px;
    margin-top: 30px;
    justify-content: center;

    position: relative;
  }

  .quick-view {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.3s linear;
    font-size: 18px;
  }

  .not-found {
    font-size: 20px;
    font-weight: 500;
    // text-align: center;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
