<template>
  <!-- Компонент "Хлебные крошки" для навигации -->
  <nav class="breadcrumbs" ref="breadcrumbNav">
    <div class="container">
      <ul ref="breadcrumbList">
        <!-- Ссылка на главную страницу -->
        <li><router-link to="/">Main</router-link></li>

        <!-- Элемент хлебных крошек для страницы деталей продукта -->
        <li v-if="route.name === 'productDetails' && breadcrumb.title">
          {{ breadcrumb.title }}
        </li>

        <!-- Элемент хлебных крошек из метаданных маршрута -->
        <li v-else-if="route.name !== 'home' && route.meta.breadcrumb">
          {{ route.meta.breadcrumb }}
        </li>

        <!-- Элемент хлебных крошек из имени маршрута -->
        <li
          v-else-if="
            route.name !== 'home' &&
            !route.meta.breadcrumb &&
            !breadcrumb.isLoading
          ">
          {{ route.name }}
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
  // Импорт необходимых библиотек и хуков
  import { ref, watch, nextTick } from "vue";
  import { useBreadcrumb } from "@/stores";
  import { useRoute } from "vue-router";

  // Получение текущего маршрута и состояния хлебных крошек
  const route = useRoute();
  const breadcrumb = useBreadcrumb();
  const breadcrumbNav = ref(null);
  const breadcrumbList = ref(null);

  // Функция для проверки видимости хлебных крошек
  function checkBreadcrumbVisibility() {
    // Количество элементов хлебных крошек
    const itemCount = breadcrumbList.value.querySelectorAll("li").length;
    // Скрыть хлебные крошки, если элементов меньше 2
    breadcrumbNav.value.style.display = itemCount > 1 ? "" : "none";
  }

  // Отслеживание изменений маршрута и состояния хлебных крошек
  watch(
    [route, breadcrumb],
    () => {
      nextTick(checkBreadcrumbVisibility); // Проверка видимости хлебных крошек после обновления DOM
    },
    { immediate: true } // Немедленный вызов при инициализации
  );
</script>

<style scoped lang="scss">
  .breadcrumbs {
    padding: 10px 0;
    pointer-events: all;

    ul {
      list-style-type: none;
      margin: 0;
      padding-left: 0;
      display: flex;
      overflow: auto;
    }

    li {
      white-space: nowrap;

      &:last-child {
        pointer-events: none;
      }

      a {
        text-decoration: none;
        transition: color 0.3s;

        &:hover {
          color: #de6800;
        }
      }
    }

    // Разделитель между элементами хлебных крошек
    li + li:before {
      content: "/";
      margin: 0 8px;
    }
  }
</style>
