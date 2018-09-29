<template>
  <div class="content__timeline__tweet-box">
    <div class="content__timeline__tweet-box__profile-button">
      <img :src="imagePath" class="content__timeline__tweet-box__profile-button__profile-img">
    </div>
    <form action="localhost:8080" class="content__timeline__tweet-box__tweet-form" enctype="multipart/form-data">
      <div class="content__timeline__tweet-box__tweet-form__tweet-container">
        <textarea
          cols="30"
          rows="1"
          placeholder="무슨 일이 일어나고있나요?"
          v-model="textContent"
          @blur="textContentEmpty"
          @keydown="autoSizing"></textarea>
        <div class="content__timeline__tweet-box__tweet-form__tweet-container__file-box" :class="fileBoxStatus"></div>
      </div>
      <div class="content__timeline__tweet-box__tweet-form__toolbar">
        <div class="content__timeline__tweet-box__tweet-form__toolbar__left">
          <input-media />
        </div>
        <div class="content__timeline__tweet-box__tweet-form__toolbar__right">
          <tweet-button />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import ProfileImage from './../../../../assets/img/default_profile.png';

import InputMedia from './Buttons/InputMedia';
import TweetButton from './Buttons/TweetButton';

export default {
  name: 'TweetBox',
  components: {
    InputMedia,
    TweetButton,
  },
  computed: {
    fileBoxStatus() {
      return {
        'file-box--extend': this.$store.getters['tweet/getHasFile'],
        'file-file-box--reduce': !this.$store.getters['tweet/getHasFile'],
      };
    },
    textContent: {
      get(){ return this.$store.getters['tweet/getTextContent']; },
      set(v){ this.$store.commit('tweet/setTextContent', v);}
    },
  },
  data() {
    return {
      imagePath: ProfileImage,
    };
  },
  methods: {
    initTextArea() {
      const textarea = document.querySelector('textarea');
      textarea.value = '';
      textarea.style.height = 'auto';
    },
    textContentEmpty() {
      const content = this.textContent.replace(/(\s*)/g, "");
      const textarea = document.querySelector('textarea');
      if(content.length === 0) {
        this.textContent = '';
        textarea.style.height = '100%';
      } else {
        textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px';
      }
    },
    autoSizing() {
      const textarea = document.querySelector('textarea');
      setTimeout(() => {
        textarea.style.cssText = 'height: auto; padding: 8px 31px 8px 8px';
        textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px';
      }, 0);
    },
  }
};
</script>
<style scoped>
  textarea {
    white-space: pre-wrap;
    display: block;
    margin: 0;
    padding: 8px 31px 8px 8px;
    width: 100%;
    height: auto;
    resize: none;
    overflow-y: hidden;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 14px;
  }
  textarea::placeholder {
    color: #1DA1F2;
    font-weight: 400;
    font-size: 14px;
  }

  textarea:focus::placeholder {
    color: #a9a9a9;
  }

  .content__timeline__tweet-box {
    width: 100%;
    padding: 10px 12px;
    background-color: #E8F5FD;
  }
  .content__timeline__tweet-box__profile-button {
    margin-top: 2px;
    float: left;
  }
  .content__timeline__tweet-box__profile-button__profile-img {
    margin-left: 10px;
    width: 40px;
    height: 40px;
    display: block;
    border-radius: 50%;
    cursor: pointer;
  }
  .content__timeline__tweet-box__tweet-form {
    margin-left: 56px;
    border-radius: 8px;
  }
  .content__timeline__tweet-box__tweet-form:focus {
    box-shadow: 0 0 0 1px #A4D9F9;
  }
  .content__timeline__tweet-box__tweet-form__tweet-container {
    overflow-y: auto;
    position: relative;
    background: #fff;
    border: 1px solid #C6E7FB;
    border-radius: 8px;
    height: 100%;
  }
  .content__timeline__tweet-box__tweet-form__tweet-container__file-box {
    display: none;
    float: left;
    padding: 8px 16px;
    position: relative;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    border-top: 1px solid #ccd6dd;
    width: 100%;
    background-color: #f5f8fa;
  }
  .content__timeline__tweet-box__tweet-form__toolbar {
    display: flex;
    align-items: center;
    margin-top: 10px;
    width: 100%;
    height: 37px;
  }
  .content__timeline__tweet-box__tweet-form__toolbar__left {
    width: 208px;
    height: 100%;
  }
  .content__timeline__tweet-box__tweet-form__toolbar__right {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    width: 128px;
    height: 100%;
  }

  .file-box--extend {
    display: block !important;
    height: 100%;
  }
  .file-box--reduce {
    display: none !important;
    /*height: 100%;*/
  }

</style>
