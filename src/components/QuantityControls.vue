<template>
  <!-- Блок управления количеством товара -->
  <div class="product__quantity-controls">
    <!-- Кнопка уменьшения количества товара -->
    <button
      @click.prevent="$emit('decrement', item)"
      :disabled="itemQuantity <= 1"
      :class="[{ 'is-disabled': itemQuantity <= 1 }, 'quantity-button']">
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

<style lang="scss">
  .product {
    &__quantity {
      &-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* gap: 15px; */

        font-weight: 600;
        font-size: 16px;

        margin: auto 15px 15px;

        .quantity-value {
          flex-grow: 1;
          text-align: center;
          margin: 0 5px;
        }

        .quantity-button {
          display: flex;
          justify-content: center;
          align-items: center;

          background-color: #ffd8b4b8;
          color: #e58939;
          font-weight: 500;
          border-radius: 8px;

          height: 40px;
          width: 40px;

          font-size: 36px;
          cursor: pointer;

          svg {
            flex-shrink: 0;
          }
        }
      }
    }
  }
</style>
