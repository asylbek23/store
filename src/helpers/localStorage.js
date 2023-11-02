// Функция для получения элемента из LocalStorage или возврата значения по умолчанию
export function getLocalStorageItem(key, defaultValue) {
  try {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
  } catch {
    return defaultValue;
  }
}
