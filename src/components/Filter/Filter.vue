<template>
  <div :class="$style['filter']">
    <h3>Filter:</h3>

    <div :class="$style['filter__items']">
      <!-- Элемент фильтра для показа всех продуктов -->
      <div
        :class="[
          $style['filter__item'],
          { 'is-active': selectedCategory === null },
        ]"
        @click="filterProductsByCategory(null)">
        All
      </div>

      <!-- Перебор и отображение доступных категорий продуктов -->
      <div
        v-for="category in filteredCategories"
        :key="category"
        @click="filterProductsByCategory(category)"
        :class="[
          $style['filter__item'],
          { 'is-active': category === selectedCategory },
        ]">
        {{ category }}
      </div>
    </div>
  </div>
</template>

<script setup>
  // Объявление пропсов для компонента
  const props = defineProps(["filteredCategories", "selectedCategory"]);

  // Объявление пользовательского события для обновления выбранной категории
  const emit = defineEmits(["update-category"]);

  // Функция для фильтрации продуктов по выбранной категории
  const filterProductsByCategory = (category) => {
    if (category === props.selectedCategory) {
      emit("update-category", null); // Сброс выбранной категории, если она была выбрана повторно
    } else {
      emit("update-category", category); // Обновление выбранной категории
    }
  };
</script>

<style lang="scss" module>
  @import "Filter.module.scss"; // Импорт стилей для компонента
</style>
