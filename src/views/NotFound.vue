<template>
  <div class="not-found">
    <div class="container">
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .not-found {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    /* background-color: #ccc; */

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    pointer-events: none;

    z-index: -1;

    p {
      font-size: 20px;
      margin: 30px 0;
    }
  }
</style>
