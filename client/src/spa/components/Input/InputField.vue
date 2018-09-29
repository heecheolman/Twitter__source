<template>
  <div class="input-wrap">
    <label
      :class="isTypedLabel"
      class="label--base">{{ placeholder }}</label>
    <input
      class="input--info"
      :type="type"
      required
      :value="data" @input="event"/>
  </div>
</template>
<script>
export default {
  name: 'InputField',
  props: {
    placeholder: {
      type: String,
    },
    type: {
      type: String,
    },
    data: {
      type: String,
    },
    event: {
      type: Function,
    },
  },
  computed: {
    isTypedLabel() {
      return {
        'typed-label': this.data.length !== 0,

        'valid': this.placeholder === '사용 가능합니다!'||
          this.placeholder === '유효한 형식입니다!' ||
          this.placeholder === '유효한 형식입니다!',

        'not-valid': this.placeholder === '이미 있어요!' ||
          this.placeholder === '형식이 틀립니다!' ||
          this.placeholder === '제대로 입력해주세요!' ||
          this.placeholder === '형식이 틀립니다!',
      };
    },
  },
};
</script>
<style scoped>
  .input-wrap {
    width: 250px;
    height: 70px;
    position: relative;
  }
  .label--base {
    color: #999;
    height: 50px;
    line-height: 50px;
    white-space: nowrap;
    font-size:  12px;
    left: 11px;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    user-select: none;
    pointer-events: none;
    transition: transform ease-out .1s, -webkit-transform ease-out .1s;
  }
  .input--info {
    box-sizing: border-box;
    outline: none;
    border: 1px solid #d7d7d7;
    border-radius: 10px;
    padding-left: 10px;
    width: 250px;
    height: 50px;
    transition: 0.5s;
  }

  .input--info:hover {
    border: 1px solid #00aced;
    box-shadow: 0 2px 4px rgba(0, 172, 237, 0.63), 0 3px 6px rgba(0, 172, 237, 0.08);
  }
  .input--info:focus {
    border: 1px solid #00aced;
    box-shadow: 0 2px 4px rgba(0, 172, 237, 0.35), 0 3px 6px rgba(0, 172, 237, 0.08);
  }

  .typed-label {
    transform: scale(.7333) translateX(-20%) translateY(-17px);
  }

  .valid { color: #1DA1F2 !important; }
  .not-valid { color: #ff2128 !important; }
  .error { color: #ff2128 !important; }
</style>
