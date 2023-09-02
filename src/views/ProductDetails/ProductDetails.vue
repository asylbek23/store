<template>
  <div :class="$style.product">
    <div class="container">
      <h1>Product details</h1>
      <div class="product-details__content">
        <img :src="product.image" :alt="product.title" />
        <h2 class="title">{{ product.title }}</h2>
        <div class="price">{{ product.price }}</div>
        <p class="descr">{{ product.description }}</p>
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
