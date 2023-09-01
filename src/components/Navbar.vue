<template>
  <header class="header">
    <div class="container">
      <router-link :to="{ name: 'home' }" class="header__link">
        <img src="../assets/home.png" alt="home" width="20" height="20" />
        Home
      </router-link>
      <router-link :to="{ name: 'basket' }" class="header__link">
        Basket
        <img src="../assets/basket.png" alt="basket" width="20" height="20" />
      </router-link>
    </div>
  </header>
</template>
