<template>
  <div class="logo-area--common">
    <h1 class="logo-area__logo--common">Twitter</h1>
  </div>
</template>
<script>

export default {
  name: 'LogoArea',
};
</script>
<style scoped>
  /* Mobile Device */
  @media screen and (max-width: 425px) {
    .wrap--common .join-body .logo-area--common {
      line-height: 50px;
      height: 50px;
    }
  }
  .logo-area--common {
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .logo-area__logo--common {
    font-size: 2rem;
    user-select: none;
    cursor: default;
    color: #4AB3F4;
    margin: 0;
  }
</style>
