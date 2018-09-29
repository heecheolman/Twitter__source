<template>
  <div class="wrap--common flex-container flex-center">
    <div class="join-body">
      <logo-area />
      <input-area/>
      <password-check-area />
      <button-area />
    </div>
    <alert-modal v-if="getModalType === 1" @close="closeModal">
      <h3 slot="header" class="modal-header--base modal-header--ok">
        축하드립니다! 🎉
      </h3>
      <p slot="body" class="modal-body--base">
        회원님의 회원가입을 진심으로 축하드립니다!<br/>
        로그인 후 이용 가능해요!
      </p>
      <button slot="button" @click="goLogin" class="modal-button--base">
        확인
      </button>
    </alert-modal>
    <alert-modal v-if="getModalType === 2" @close="closeModal">
      <h3 slot="header" class="modal-header--base modal-header--err">
        양식을 확인해보세요!
      </h3>
      <p slot="body" class="modal-body--base">
        양식이 어딘가 잘못됐어요!<br>
        다시 한 번 확인해주세요 : )
      </p>
      <button slot="button" @click="closeModal" class="modal-button--base">
        돌아가기
      </button>
    </alert-modal>
  </div>
</template>
<script>
import LogoArea from './../components/LogoArea';
import InputArea from './components/JoinInputArea';
import PasswordCheckArea from './components/PasswordCheckArea';
import ButtonArea from './components/ButtonArea';
import AlertModal from './../components/AlertModal';

export default {
  name: 'Join',
  components: {
    LogoArea,
    InputArea,
    PasswordCheckArea,
    ButtonArea,
    AlertModal,
  },
  computed: {
    getModalType() {
      return this.$store.getters['join/getModalType'];
    }
  },
  methods: {
    closeModal() {
      this.$store.commit('join/closeModal');
    },
    goLogin() {
      this.$store.commit('join/clearUserData');
      this.closeModal();
      this.$router.replace('login');
    }
  },
};
</script>
<style scoped>
  /* Mobile Device */
  @media screen and (max-width: 425px) {
    .wrap--common .join-body {
      width: 300px;
      height: auto;
    }
    .wrap--common .join-body .join-body__button-body {
      height: 120px;
    }
  }
  .join-body {
    width: 370px;
    height: auto;
    background-color: #fff;
    border-radius: 10px;
  }
  .modal-header--base {
    padding: 10px 0;
  }

  .modal-header--ok {
    color: #4AB3F4;
    border-bottom: 2px solid #4AB3F4;
  }
  .modal-header--err {
    color: #ff2128;
    border-bottom: 2px solid #ff2128;
  }

  .modal-body--base {
    line-height: 180%;
    text-align: center;
    font-size: 0.8rem;
    color: #737373;
  }

  .modal-button--base {
    width: 80px;
    height: 35px;
    outline: none;
    cursor: pointer;
    border: 1px solid #efefef;
    border-radius: 30px;
    font-size: 0.7rem;
    font-weight: 600;
    background-color: #fff;
    color: #737373;
    transition: 0.3s;
  }
  .modal-button--base:hover {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }
</style>
