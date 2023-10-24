import axiosClient from "@/api/axiosClient.js";

export async function getProducts(products) {
  if (products.value.length === 0) {
    try {
      const { data } = await axiosClient.get("products/");
      products.value = data;
      localStorage.setItem("products", JSON.stringify(products.value));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
}
