import axiosClient from "@/api/axiosClient.js";

export const getProduct = async (id, product, breadcrumb) => {
  const localStorageKey = `product_${id}`;
  const cachedProduct = JSON.parse(localStorage.getItem(localStorageKey));

  if (cachedProduct) {
    // Если продукт найден в localStorage, используйте его
    product.value = cachedProduct;
    breadcrumb.setTitle(cachedProduct.title);
    breadcrumb.setLoading(false);
  } else {
    try {
      const response = await axiosClient.get(`products/${id}`);
      product.value = response.data;
      breadcrumb.setTitle(product.value.title);
      breadcrumb.setLoading(false); // устанавливаем isLoading в false после загрузки данных

      // Сохраните продукт в localStorage для будущего использования
      localStorage.setItem(localStorageKey, JSON.stringify(response.data));
    } catch (error) {
      console.error("Failed to load product data:", error);
    }
  }
};
