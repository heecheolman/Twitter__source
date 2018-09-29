<template>
  <div class="flex-container flex-center flex-column">
    <input-field
      v-for="(field, index) in inputList"
      :key="index"
      :type="field.type"
      :placeholder="field.placeholder"
      :data.sync="field.data"
      :event="field.inputEvent"/>
  </div>
</template>
<script>
import InputField from '../../components/Input/InputField';

export default {
  name: 'InputArea',
  components: {
    InputField,
  },
  data() {
    return {
      inputList: [
        { placeholder: '휴대폰번호',
          data: '',
          type: 'text',
          inputEvent: (dom) => {
            const ele = this._data.inputList[0];
            ele.data = dom.target.value;
            this.$store.commit('login/setPhone', ele.data);
            const holderType = this.$store.getters['login/placeholderType'];
            switch(holderType) {
              case 0: ele.placeholder = '휴대폰번호'; break;
              case 1: ele.placeholder = '유효한 형식입니다!'; break;
              case 2: ele.placeholder = '형식이 틀립니다!'; break;
            }
          }
        },
        { placeholder: '비밀번호',
          data: '',
          type: 'password',
          inputEvent: (dom) => {
            const ele = this._data.inputList[1];
            ele.data = dom.target.value;
            this.$store.commit('login/setPassword', ele.data);

          }
        },
      ],
    };
  },
}
</script>
<style scoped>

</style>
