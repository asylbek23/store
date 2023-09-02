<template>
  <div>
    <div class="container">
      <input
        type="text"
        class="search"
        v-model="searchText"
        placeholder="Search products" />

      <div class="filter">
        <h3>Filter:</h3>
        <div class="filter__items">
          <div
            :class="{ 'is-active': selectedCategory === null }"
            @click="filterProductsByCategory(null)"
            class="filter__item">
            All
          </div>
          <div
            v-for="category in filteredCategories"
            :key="category"
            @click="filterProductsByCategory(category)"
            :class="{ 'is-active': category === selectedCategory }"
            class="filter__item">
            {{ category }}
          </div>
        </div>
      </div>

      <div class="products">
        <div
          class="product"
          v-for="product in filteredProducts"
          :key="product.id">
          <router-link
            :to="{ name: 'productDetails', params: { id: product.id } }">
            <div class="product__img">
              <img :src="product.image" :alt="product.title" :img="true" />
            </div>
          </router-link>
          <div class="product__info">
            <p class="product__name">{{ truncateText(product.title, 45) }}</p>
            <p class="product__price">{{ product.price }}$</p>
            <p class="product__descr">
              {{ truncateText(product.description, 100) }}
            </p>
          </div>
        </div>

        <p v-if="filteredProducts.length === 0" class="not-found">
          Nothing found &#129335;&#8205;&#9794;&#65039;
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watchEffect, onMounted, watch } from "vue"
  import axiosClient from "../../api/axiosClient"
  import { truncateText } from "../../helpers/textUtils"

  const searchText = ref("")
  const products = ref([])
  const filteredProducts = ref([])
  const filteredCategories = ref([])
  const selectedCategory = ref(null)

  async function getProduct() {
    await axiosClient
      .get("products/")
      .then((data) => {
        products.value = data.data
      })
      .catch((error) => {
        console.log("Ошибка при загрузке данных:", error)
      })
  }

  function filterCategories() {
    const categories = new Set()
    products.value.forEach((product) => {
      categories.add(product.category)
    })
    filteredCategories.value = Array.from(categories)
  }

  function filterProductsByCategory(category) {
    if (category === selectedCategory.value) {
      selectedCategory.value = null
    } else {
      selectedCategory.value = category
    }
  }

  onMounted(async () => {
    await getProduct() // Загрузка данных с сервера
    filterCategories() // Фильтрация уникальных категорий
  })

  watchEffect(() => {
    // Поиск продуктов
    filteredProducts.value = products.value.filter((product) =>
      product.title.toLowerCase().includes(searchText.value.toLowerCase())
    )
  })

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

<style lang="scss" module>
  @import "Home.module.scss";
</style>
