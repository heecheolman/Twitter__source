<template>
  <div class="button-wrap flex-container flex-center">
    <button class="button--base button--login" @click="login">
      로그인
    </button>
  </div>
</template>
<script>

export default {
  name: 'LoginButton',
  methods: {
    async login() {
      await this.$store.dispatch('login/checkId');
      await this.$store.dispatch('login/checkPassword');
      await this.$store.dispatch('login/login');
      if(this.$store.getters['login/getLogin']) {
        this.$router.replace({ name: 'MainPage', params: { phone: this.$store.getters['login/getPhone'] }});
      } else {
        this.$store.commit('login/setError');
      }
    }
}
}
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
  .button--login {
    background-color: #00aced;
    color: #ffffff;
  }
  .button--login:hover {
    background-color: #00b9ff;
  }
</style>
