import axiosClient from "@/api/axiosClient.js";

// Эта функция теперь принимает `id`, `product` ref и `breadcrumb` store
export const getProduct = async (id, product, breadcrumb) => {
  // Ключ для сохранения данных продукта в localStorage
  const localStorageKey = `product_${id}`;
  // Попытка получить продукт из localStorage
  const cachedProduct = JSON.parse(localStorage.getItem(localStorageKey));

  // Если продукт есть в кеше (localStorage), используйте его
  if (cachedProduct) {
    product.value = cachedProduct; // Установка данных продукта
    breadcrumb.setTitle(cachedProduct.title); // Установка заголовка для хлебных крошек
    breadcrumb.setLoading(false); // Снятие флага загрузки
  } else {
    // Если продукта нет в кеше, делаем запрос на сервер
    try {
      const response = await axiosClient.get(`products/${id}`);
      product.value = response.data; // Установка полученных данных продукта
      breadcrumb.setTitle(response.data.title); // Установка заголовка для хлебных крошек
      breadcrumb.setLoading(false); // Снятие флага загрузки
      // Сохраняем продукт в localStorage для будущего использования
      localStorage.setItem(localStorageKey, JSON.stringify(response.data));
    } catch (error) {
      // В случае ошибки выводим её в консоль
      console.error("Failed to load product data:", error);
      breadcrumb.setLoading(false); // Снятие флага загрузки даже в случае ошибки
      throw error; // Перебрасываем ошибку дальше, чтобы она могла быть обработана в вызывающей функции
    }
  }
};

// axiosClient: Это экземпляр axios, который уже настроен для выполнения HTTP-запросов к определенному базовому URL. Это делает код чище, так как не нужно повторять настройку базового URL для каждого запроса.

// async функция getProduct: Это асинхронная функция, которая принимает три параметра: id продукта, product (который должен быть ref из Vue Composition API для реактивности) и breadcrumb (который является экземпляром Pinia store для управления хлебными крошками).

// localStorage: Используется для кэширования данных продукта, чтобы избежать лишних запросов к серверу. Ключ кэша формируется с помощью id продукта.

// Проверка кэша: Если в localStorage уже есть данные продукта, они используются сразу, без запроса к серверу.

// Запрос к серверу: Если данных в кэше нет, выполняется асинхронный запрос к серверу.

// Обработка ошибок: В случае ошибки при запросе к серверу, ошибка логируется и перебрасывается дальше, чтобы её можно было обработать в другой функции (loadProduct).

// Управление состоянием загрузки: breadcrumb.setLoading(false) указывает на то, что процесс загрузки завершен, независимо от того, был ли запрос успешным или нет.
