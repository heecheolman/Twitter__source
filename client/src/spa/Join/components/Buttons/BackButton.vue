<template>
  <div class="button-wrap flex-container flex-center">
    <button class="button--base button--go-back" @click="goBack">
      뒤로가기
    </button>
  </div>
</template>
<script>
  export default {
    name: 'BackButton',
    methods: {
      goBack() {
        this.$store.commit('join/clearUserData');
        this.$router.replace('/login');
      },
    }
  };
</script>
<style scoped>
  .button-wrap {
    width: 100%;
    height: 70px;
  }
  .button--base {
    width: 150px;
    height: 40px;
    outline: none;
    cursor: pointer;
    border: 0;
    border-radius: 30px;
    font-size: 0.9rem;
    font-weight: 400;
    transition: 0.3s;
  }
  .button--go-back {
    border: 1px solid #ececec;
    color: #737373;
  }
  .button--go-back:hover {
    border: 1px solid transparent;
    background-color: #ececec;
  }
</style>
