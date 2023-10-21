<template>
  <!-- Модальное окно для отображения деталей продукта -->
  <div v-if="product" class="product-show-modal">
    <!-- Кнопка закрытия модального окна -->
    <button @click="closeModal" class="close-button">✖</button>

    <!-- Изображение продукта -->
    <img :src="product.image" :alt="product.title" />

    <!-- Описание продукта -->
    <div class="product-show-modal__descr">
      <!-- Название продукта -->
      <h2>{{ product.title }}</h2>

      <!-- Цена продукта -->
      <span>{{ product.price }}$</span>

      <!-- Подробное описание продукта -->
      <p>{{ product.description }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    // Пропсы для передачи данных продукта и функции закрытия модального окна
    props: {
      product: Object,
      closeModal: Function,
    },
  };
</script>

<style scoped lang="scss">
  /* Стили для модального окна */
  .product-show-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;

    text-align: center;
    padding: 30px 20px;

    width: calc(100% - 30px);
    max-width: 700px;

    background-color: #fff;

    /* Стили для изображения продукта в модальном окне */
    img {
      height: 400px;
      object-fit: contain;
      padding: 20px;

      @include sm-block() {
        height: 300px;
      }
    }

    /* Стили для описания продукта в модальном окне */
    &__descr {
      h2 {
        font-size: 24px;
        font-weight: 600;
      }

      span {
        display: inline-block;
        color: #de6800;
        font-size: 20px;
        font-weight: 700;
        margin: 10px 0;
      }
    }
  }

  /* Стили для кнопки закрытия модального окна */
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    outline: none;
    border: none;
    background-color: transparent;
    font-size: 30px;
    cursor: pointer;
    color: #de6800;
  }
</style>
