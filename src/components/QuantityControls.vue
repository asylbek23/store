<template>
  <!-- Блок управления количеством товара -->
  <div class="product__quantity-controls">
    <!-- Кнопка уменьшения количества товара -->
    <button
      @click.prevent="$emit('decrement', item)"
      :class="[{ 'is-disabled': itemQuantity <= 1 }, 'quantity-button']"
      :disabled="itemQuantity <= 1">
      <!-- Иконка минус -->
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path
          fill="currentColor"
          d="M5 11a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2H5Z"></path>
      </svg>
    </button>

    <!-- Отображение текущего количества товара -->
    <span class="quantity-value">
      {{ itemQuantity }}
    </span>

    <!-- Кнопка увеличения количества товара -->
    <button @click.prevent="$emit('increment', item)" class="quantity-button">
      <!-- Иконка плюс -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        preserveAspectRatio="xMidYMid meet">
        <path
          fill="currentColor"
          d="M12 4a1 1 0 0 0-1 1v6H5a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V5a1 1 0 0 0-1-1Z"></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
  // Определение свойств компонента: item и itemQuantity
  const props = defineProps(["item", "itemQuantity"]);
</script>
