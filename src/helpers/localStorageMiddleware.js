export const localStorageMiddleware = (store) => {
  store.$onAction(({ after }) => {
    after((result, actionContext) => {
      // Сохраните состояние в LocalStorage после каждого действия
      localStorage.setItem(
        "cart-items",
        JSON.stringify(actionContext.state.items)
      );
      localStorage.setItem(
        "cart-added-items",
        JSON.stringify(actionContext.state.addedItems)
      );
      localStorage.setItem(
        "cart-item-quantities",
        JSON.stringify(actionContext.state.itemQuantities)
      );
    });
  });
};
