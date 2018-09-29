<template>
  <div class="tweet-button-container">
    <clip-loader :loading="loading" :color="'#1DA1F2'" :size="spinnerSize"/>
    <button class="tweet-button-container__button--tweet" v-show="!loading" @click="tweet">
      트윗하기
    </button>
  </div>
</template>
<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'TweetButton',
  components: {
    ClipLoader,
  },
  computed: {
    spinnerSize() {
      return '20px';
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    loadingSpinnerOn() {
      this.loading = true;
    },
    loadingSpinnerOff() {
      this.loading = false;
    },
    async tweet() {
      this.loadingSpinnerOn();
      const serverTimeout = 500;
      this.$store.dispatch('tweet/uploadFile');
      setTimeout(async () => {
        const input = document.querySelector('#media-file');
        const filebox = document.querySelector('.content__timeline__tweet-box__tweet-form__tweet-container__file-box');
        await this.$store.dispatch('tweet/uploadText');
        await this.$store.dispatch('tweet/getTimelines');
        this.$store.commit('tweet/clearContents');
        input.value = '';
        filebox.innerHTML = '';
        this.loadingSpinnerOff();
      }, serverTimeout);
    },
  }
};

</script>
<style scoped>
  .tweet-button-container {
    margin-left: 16px;
    float: left;
  }
  .tweet-button-container__button--tweet {
    border: none;
    outline: none;
    background-color: #4AB3F4;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
    line-height: 20px;
    padding: 6px 16px;
    border-radius: 100px;
    transition: .1s;
  }

  .tweet-button-container__button--tweet:focus {
    border-color: #1da1f2;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #71c9f8;
    color: #fff;
  }

  .tweet-button-container__button--tweet:hover {
    background-color: #1DA1F2;
    border-color: #1DA1F2;
  }
</style>
