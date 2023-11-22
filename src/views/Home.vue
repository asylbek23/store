<template>
  <!-- Корневой элемент домашней страницы -->
  <div class="home">
    <div class="container">
      <!-- Поле поиска продуктов -->
      <input
        type="text"
        class="search"
        v-model="searchProduct"
        placeholder="Search products" />

      <!-- Компонент фильтрации продуктов по категориям -->
      <Filter
        :filtered-categories="filteredCategories"
        :selected-category="selectedCategory"
        @update-category="updateCategory" />

      <!-- Компонент списка продуктов -->
      <Products :products="filteredProducts" :show-modal="showModal" />

      <!-- Модальное окно с деталями продукта -->
      <product-modal
        v-if="selectedProduct"
        :product="selectedProduct"
        :close-modal="closeModal" />

      <!-- Оверлей модального окна, отображается при выборе продукта -->
      <div v-if="selectedProduct" @click="closeModal" class="overlay"></div>
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
  const searchProduct = ref("");
  const filteredProducts = ref([]);
  const filteredCategories = ref([]);
  const selectedCategory = ref(null);
  const selectedProduct = ref(null);
  const products = ref(JSON.parse(localStorage.getItem("products")) || []);
  const bodyStyle = document.body.style;

  // Обновление выбранной категории
  const updateCategory = (category) => {
    selectedCategory.value = category;
    searchProduct.value = "";
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

  // Функции для блокировки и разблокировки скролла
  function disableScroll() {
    const scrollWidth = window.innerWidth - document.body.offsetWidth;
    bodyStyle.paddingRight = `${scrollWidth}px`;
    bodyStyle.overflow = "hidden";
  }

  function enableScroll() {
    bodyStyle.paddingRight = "";
    bodyStyle.overflow = "";
  }

  // Обработчик событий клавиатуры для закрытия модального окна
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

  onUnmounted(() => {
    document.removeEventListener("keydown", onEsc);
  });

  // Отслеживание изменений в тексте поиска и фильтрации продуктов
  watchEffect(() => {
    // Фильтрация продуктов по тексту поиска
    filteredProducts.value = products.value.filter((product) =>
      product.title.toLowerCase().includes(searchProduct.value.toLowerCase())
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

<style lang="scss">
  .products {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 30px;
    margin-top: 30px;
    justify-content: center;

    position: relative;
  }

  .home {
    margin-top: 20px;
  }

  .search {
    width: 100%;
    padding: 10px 20px;
    font-size: 18px;

    @include sm-block() {
      font-size: 16px;
      padding: 5px 10px;
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 2;
  }
</style>
