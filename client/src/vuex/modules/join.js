import axios from 'axios';

const state = {
  name: '',
  nickname: '',
  phone: '',
  password: '',
  passwordCheck: '',
  validName: false,
  validNickname: false,
  validPhone: false,
  validPassword: false,
  guideMessage: false,
  modalType: 0,
};

const mutations = {
  setName(state, payload) {
    state.name = payload;
  },
  setNickname(state, payload) {
    state.nickname = payload;
  },
  setPhone(state, payload) {
    state.phone = payload;
  },
  setPassword(state, payload) {
    state.guideMessage = true;
    state.password = payload;
  },
  setPasswordCheck(state, payload) {
    state.guideMessage = true;
    state.passwordCheck = payload;
  },
  setValidName(state, payload) {
    state.validName = payload;
  },
  setValidPassword(state, payload) {
    state.validPassword = payload;
  },
  setDisableGuideMessage(state) {
    state.guideMessage = false;
  },
  closeModal(state) {
    state.modalType = 0;
  },
  clearUserData(state) {
    state.name = '';
    state.phone = '';
    state.nickname = '';
    state.passwordCheck = '';
    state.validName = false;
    state.validNickname = false;
    state.validPhone = false;
    state.validPassword = false;
    state.guideMessage = false;
    state.modalType = 0;
  },
  async join(state, payload) {
    await axios.post('/api/join', {
      phone_number: state.phone,
      user_password: state.password,
      real_name: state.name,
      nickname: state.nickname,
      following: [],
      follower: [],
      descript: '',
    });
  },
};

const getters = {
  getCheckName(state) {
    const isName = /^[가-힣]{2,4}$/;
    let type = 0;
    if(isName.test(state.name)) {
      state.validName = true;
      type = 1;
    } else {
      state.validName = false;
      type = 2;
    }
    if(state.name.length === 0) {
      state.validName = false;
      type = 3;
    }
    return type;
  },
  getNickname(state) {
    return state.nickname;
  },
  getPhone(state) {
    return state.phone;
  },
  getPassword(state) {
    return state.password;
  },
  getPasswordCheck(state) {
    return state.passwordCheck;
  },
  passwordCheck(state) {
    const isPassword = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
    let type = 0;
    if(state.password.length === 0 || state.password.length === 0) {
      state.validPassword = false;
      type = 1;
    } else if(isPassword.test(state.password)) {
      if(state.password === state.passwordCheck) {
        state.validPassword = true;
        type = 2;
      } else {
        state.validPassword = false;
        type = 3;
      }
    } else {
      state.validPassword = false;
      type = 4;
    }
    return type;
  },
  isPasswordSame(state) {
    return state.password === state.passwordCheck;
  },
  getValidPassword(state) {
    return state.validPassword;
  },
  getValidNickname(state) {
    return state.validNickname;
  },
  getGuideMessage(state) {
    return state.guideMessage;
  },
  getModalType(state) {
    return state.modalType;
  }
};

const actions = {
  hasNickname: async ({ commit, state }) => {
    const isNickname = /^[\wㄱ-ㅎㅏ-ㅣ가-힣]{2,12}$/;
    let type = 0;
    if(state.nickname.length !== 0 && isNickname.test(state.nickname)) {
      await axios.get('/api/nicknames/' + state.nickname, {
        params: { nickname: state.nickname },
      })
        .then((result) => {
          if(result.data.length === 0) {
            type = 1;
            state.validNickname = true;
          } else {
            type = 2;
            state.validNickname = false;
          }
        })
        .catch((err) => {
          state.validNickname = false;
          console.err(err);
        });
    } else if(state.nickname.length !== 0 && !isNickname.test(state.nickname)) {
      state.validNickname = false;
      type = 3;
    }
    if(state.nickname.length === 0) {
      state.validNickname = false;
      type = 0;
    }
    return type;
  },
  hasPhoneNumber: async ({ commit, state }) => {
    const isPhoneNumber = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    let type = 0;
    if(state.phone.length !== 0 && isPhoneNumber.test(state.phone)) {
      await axios.get(`/api/phone-numbers/${state.phone}`, {
        params: {phoneNumber: state.phone},
      })
        .then((result) => {
          if (result.data === 0) {
            type = 1;
            state.validPhone = true;
          } else {
            state.validPhone = false;
            type = 2;
          }
        })
        .catch((err) => {
          state.validPhone = false;
          console.error(err);
        });
    } else if (state.phone.length !== 0 && !isPhoneNumber.test(state.phone)) {
      state.validPhone = false;
      type = 3;
    }
    if(state.phone.length === 0) {
      state.validPhone = false;
      type = 0;
    }
    return type;
  },
  join: async ({ commit, state }) => {
    if(state.validName && state.validNickname && state.validPhone && state.validPassword) {
      await commit('join');
      state.modalType = 1;
    } else {
      state.modalType = 2;
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
