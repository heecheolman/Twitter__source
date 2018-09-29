<template>
  <div class="flex-container flex-center flex-column">
    <input-field
      v-for="(field, index) in inputList"
      :key="index"
      :type="field.type"
      :placeholder="field.placeholder"
      :data.sync="field.data"
      :event="field.inputEvent" />
  </div>
</template>
<script>
import InputField from './../../components/Input/InputField';

export default {
  name: 'InputArea',
  components: {
    InputField,
  },
  data() {
    return {
      inputList: [
        { placeholder: '이름',
          data: '',
          type: 'text',
          inputEvent: (e) => {
            const ele = this._data.inputList[0];
            ele.data = e.target.value;
            this.$store.commit('join/setName', ele.data);
            const holderType = this.$store.getters['join/getCheckName'];
            switch(holderType) {
              case 1: ele.placeholder = '유효한 형식입니다!'; break;
              case 2: ele.placeholder = '형식이 틀립니다!'; break;
              case 3: ele.placeholder = '이름'; break;
            }
          }},
        { placeholder: '닉네임',
          data: '',
          type: 'text',
          inputEvent: async (e) => {
            const ele = this._data.inputList[1];
            ele.data = e.target.value;
            this.$store.commit('join/setNickname', ele.data);
            const holderType = await this.$store.dispatch('join/hasNickname');
            switch(holderType) {
              case 1: ele.placeholder = '사용 가능합니다!'; break;
              case 2: ele.placeholder = '이미 있어요!'; break;
              case 3: ele.placeholder = '제대로 입력해주세요!'; break;
              default: ele.placeholder = '닉네임';
            }
        }},
        { placeholder: '휴대폰번호',
          data: '',
          type: 'text',
          inputEvent: async (e) => {
            const ele = this._data.inputList[2];
            ele.data = e.target.value;
            this.$store.commit('join/setPhone', ele.data);
            const holderType = await this.$store.dispatch('join/hasPhoneNumber');
            switch(holderType) {
              case 1: ele.placeholder = '사용 가능합니다!'; break;
              case 2: ele.placeholder = '이미 있어요!'; break;
              case 3: ele.placeholder = '제대로 입력해주세요!'; break;
              default: ele.placeholder = '휴대폰번호';
            }
        }},
        { placeholder: '패스워드',
          data: '',
          type: 'password',
          inputEvent: (e) => {
            const ele = this._data.inputList[3];
            ele.data = e.target.value;
            this.$store.commit('join/setPassword', ele.data);
        }},
        { placeholder: '패스워드확인',
          data: '',
          type: 'password',
          inputEvent: (e) => {
            const ele = this._data.inputList[4];
            ele.data = e.target.value;
            this.$store.commit('join/setPasswordCheck', ele.data);
        }},
      ],
    };
  },
  methods: {

  },
}
</script>
