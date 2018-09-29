<template>
  <div class="notfound-wrap flex-container flex-center flex-column">
    <span class="notfound-wrap--text">Page Not Found</span>
    <button class="notfound-wrap--goback" @click.stop="goBack">go back</button>
  </div>
</template>
<script>
export default {
  name: 'NotFound',
  methods: {
    goBack() {
      this.$router.replace({ name: 'LoginPage' })
    },
  },
};
</script>
<style scoped>
  .notfound-wrap {
    width: 100vw;
    height: 100vh;
    background: #1DA1F2;
  }
  .notfound-wrap--text {
    text-align: center;
    width: 100%;
    height: 130px;
    line-height: 130px;
    font-size: 35px;
    font-weight: bold;
    color: #fff;
    user-select: none;
  }
  .notfound-wrap--goback {
    color: #657786;
    font-size: 14px;
    outline: none;
    border: none;
    width: 100px;
    height: 40px;
    border-radius: 22px;
    background-color: #fff;
    cursor: pointer;
  }
  .notfound-wrap--goback:hover {
    text-decoration: underline;
  }
</style>
