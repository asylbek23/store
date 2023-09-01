<template>
  <div>
    <div
      class="filter__item"
      :class="{ 'is-active': selectedCategory === null }"
      @click="filterProductsByCategory(null)">
      Все
    </div>
    <div
      class="filter__item"
      v-for="category in filteredCategories"
      :key="category"
      @click="filterProductsByCategory(category)"
      :class="{ 'is-active': category === selectedCategory }">
      {{ category }}
    </div>

    <div class="products">
      <a
        href="#"
        class="product"
        v-for="product in filteredProducts"
        :key="product.id">
        <!-- Ваш код для отображения продукта -->
      </a>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue"

  const products = ref([])
  const filteredCategories = ref([])
  const selectedCategory = ref(null)

  onMounted(async () => {
    await fetchData()
    filterCategories()
  })

  async function fetchData() {
    try {
      const response = await fetch("https://fakestoreapi.com/products/")
      const data = await response.json()
      products.value = data
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error)
    }
  }

  function filterCategories() {
    const categories = new Set()
    products.value.forEach((product) => {
      categories.add(product.category)
    })
    filteredCategories.value = Array.from(categories)
  }

  function filterProductsByCategory(category) {
    // Если выбрана уже активная категория, сбросить фильтр
    if (category === selectedCategory.value) {
      selectedCategory.value = null
    } else {
      selectedCategory.value = category
    }
  }

  const filteredProducts = ref([])

  // Обновление filteredProducts при изменении selectedCategory
  import { watch } from "vue"
  watch(selectedCategory, () => {
    if (selectedCategory.value === null) {
      filteredProducts.value = products.value
    } else {
      filteredProducts.value = products.value.filter(
        (product) => product.category === selectedCategory.value
      )
    }
  })
</script>
