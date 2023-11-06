<template>
  <!-- Основной макет для вложенных маршрутов -->
  <router-view />
</template>

<script setup>
  // Импорт необходимых функций из Vue
  import { provide, reactive } from "vue";

  // Создание реактивного объекта для хранения состояния "хлебных крошек"
  const breadcrumbState = reactive({
    title: "", // Заголовок для "хлебных крошек"
  });

  // Предоставление реактивного объекта через provide/inject API Vue
  provide("breadcrumbState", breadcrumbState);
</script>
