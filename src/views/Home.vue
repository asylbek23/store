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
        <a
          href="#"
          class="product"
          v-for="product in filteredProducts"
          :key="product.id">
          <div class="product__img">
            <!-- <p class="product__category">{{ product.category }}</p> -->
            <img :src="product.image" :alt="product.title" :img="true" />
          </div>
          <div class="product__info">
            <p class="product__name">{{ truncateText(product.title, 45) }}</p>
            <p class="product__price">{{ product.price }}$</p>
            <p class="product__descr">
              {{ truncateText(product.description, 100) }}
            </p>
          </div>
        </a>

        <p v-if="filteredProducts.length === 0" class="not-found">
          Nothing found &#129335;&#8205;&#9794;&#65039;
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watchEffect, onMounted, watch } from "vue"
  import axios from "axios"
  import { truncateText } from "../helpers/textUtils"

  const searchText = ref("")
  const products = ref([])
  const filteredProducts = ref([])
  const filteredCategories = ref([])
  const selectedCategory = ref(null)

  async function getProduct() {
    await axios
      .get("https://fakestoreapi.com/products/")
      .then((data) => {
        // console.log(data)
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

  // 1. Создается новый объект Set с именем categories. Объект Set представляет собой коллекцию уникальных значений, то есть он хранит только уникальные элементы.

  // 2. Затем функция выполняет итерацию по массиву products, который содержит информацию о продуктах. Это делается с помощью метода forEach.

  // 3. Внутри цикла для каждого продукта из массива products извлекается значение свойства category продукта (предположительно, это строка, указывающая на категорию продукта).

  // 4. Значение category добавляется в объект Set categories. Поскольку объект Set хранит только уникальные значения, он автоматически отфильтровывает повторяющиеся категории, и в результате в categories остаются только уникальные категории продуктов.

  // 5. Наконец, функция преобразует объект Set в массив с помощью Array.from(categories) и присваивает результат этой операции переменной filteredCategories.value. Теперь filteredCategories будет содержать массив уникальных категорий, извлеченных из продуктов.

  // P.S. Этот код полезен, когда вам нужно получить список уникальных значений из массива данных, как в случае с категориями продуктов. Он гарантирует, что каждая категория учитывается только один раз в итоговом списке filteredCategories.

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
    // Поиск
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
