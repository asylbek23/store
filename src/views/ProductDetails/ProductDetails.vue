<template>
  <div :class="$style['product-page']">
    <div class="container">
      <h1 class="title">Product details</h1>
      <div :class="$style.product">
        <img class="product-img" :src="product.image" :alt="product.title" />
        <h2 class="product-title">{{ product.title }}</h2>
        <div class="product-price">
          Price:
          <span>{{ product.price }}$</span>
        </div>
        <p class="product-descr">{{ product.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue"
  import { useRoute } from "vue-router"
  import axiosClient from "@/src/api/axiosClient.js"

  const route = useRoute()
  const product = ref({})

  onMounted(() => {
    axiosClient.get(`products/${route.params.id}`).then((data) => {
      product.value = data.data
    })
  })
</script>

<style lang="scss" module>
  @import "ProductDetails.module.scss";
</style>
