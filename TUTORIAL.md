# Links
https://fakestoreapi.com/

# 1. Install
1. `yarn create vite` . (Vue, JavaScript)
2. `yarn add axios pinia pinia-plugin-persistedstate sass style-loader vue-content-loader vue-router smartgrid-fixed`

# 2. Create files and folders
[project/]
  1. `+.env`
  2. `+smartgrid.js`

  [src/]
    3. [+api/]
      `+axiosClient.js`
      `+getProduct.js`
      `+getProducts.js`
      `+index.js`

    4. [assets/]
      [+scss/]
        [+helpers/]
          `+_common.scss`
          `+_reset.scss`
          `+_smart-grid.scss`
        [+modules/]
          `+_header.scss`
        `+style.scss`
      `+basket.png`
      `+home.png`

    5. [components/]
      [+Filter/]
        `+Filter.module.scss`
        `+Filter.vue`
      [+Products/]
        `+Products.module.scss`
        `+Products.vue`
      `+Breadcrumbs.vue`
      `+Navbar.vue`
      `+ProductModal.vue`
      `+QuantityControls.vue`

    6. [+helpers/]
      `+index.js`
      `+textUtils.js`

    7. [+layout/]
      `+default.vue`

    8. [+router/]
      `+index.js`

    9. [+stores/]
      `+breadcrumbs.js`
      `+cart.js`
      `+index.js`

    10. [+views/]
      [+Basket/]
        `+Basket.module.scss`
        `+Basket.vue`
      [+ProductDetails/]
        `+ProductDetails.module.scss`
        `+ProductDetails.vue`
      `+Home.vue`
      `+NotFound.vue`

# 3. Copy code
[project/]
1. `smartgrid.js` > terminal: `node smartgrid.js`
2. `vite.config.js`

[src/]
2. [assets/scss] > style.scss, [scss/helpers,modules]
3. `main.js`
4. `App.vue`
5. router/`index.js`
6. `default.vue`
7. `Navbar.vue`
8. `Breadcrumbs.vue`
9.  stores/`breadcrumbs.js`, `index.js`
10. `Home.vue` > axiosClient.js, getProducts.js
12. `Products.vue` > textUtils.js, cart.js
13. `ProductModal.vue`
11. `Filter.vue`
12. `getProducts.js`
13. `ProductDetails.vue`
