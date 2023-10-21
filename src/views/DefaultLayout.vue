<!-- Верхний уровень шаблона по умолчанию -->
<template>
  <!-- Компонент навигационной панели -->
  <navbar />
  <!-- Компонент "хлебных крошек" для навигации -->
  <breadcrumbs />
  <main>
    <!-- Область для отображения содержимого маршрута -->
    <router-view />
  </main>
</template>

<script setup>
  // Импорт компонентов Navbar и Breadcrumbs
  import Navbar from "@/components/Navbar.vue";
  import Breadcrumbs from "@/components/Breadcrumbs.vue";
</script>
