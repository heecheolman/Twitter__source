import axios from 'axios';

const state = {
  login: false,
  phone: '',
  password: '',
  validPhone: false,
  validPassword: false,
  errorModal: false,
};

const mutations = {
  setPhone(state, payload) {
    state.phone = payload;
  },
  setPassword(state, payload) {
    state.password = payload;
  },
  closeModal(state) {
    state.errorModal = false;
  },
  clearUserData() {
    state.login = false;
    state.phone = '';
    state.password = '';
    state.validPhone = false;
    state.validPassword = false;
    state.errorModal = false;
  },
  setError() {
    state.errorModal = true;
  },
};

const getters = {
  placeholderType(state) {
    const isPhone = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    let type = 0;
    if(isPhone.test(state.phone)) {
      state.validPhone = true;
      type = 1;
    } else {
      state.validPhone = false;
      type = 2;
    }
    if(state.phone.length === 0) {
      state.validPhone = false;
      type = 0;
    }
    return type;
  },
  getLoginStatus: state => state.login,
  getPhone: state => state.phone,
  getLogin: state => state.login,
  getErrorModal: state => state.errorModal,
};

const actions = {
  async checkId() {
    if(state.validPhone) {
      await axios.get(`/api/phone-numbers/${state.phone}`, {
        params: {
          phoneNumber: state.phone,
        },
      })
        .then((result) => {
          state.validPhone = result.data !== 0;
        })
        .catch(() => {
          state.validPhone = false;
          state.errorModal = true;
          state.login = false;
        });
    }
  },
  async checkPassword() {
    if(state.validPhone && state.password.length >= 8) {
      await axios.get(`api/password/${state.phone}/${state.password}`, {
        params: {
          phoneNumber: state.phone,
          userPassword: state.password,
        },
      })
        .then((result) => {
          state.validPassword = result.data;
        })
        .catch(() => {
          state.login = false;
          state.validPassword = false;
          state.errorModal = true;
        });
    }
  },
  async login() {
    if(state.validPhone && state.validPassword) {
      state.login = true;
    } else {
      state.login = false;
      state.errorModal = true;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
