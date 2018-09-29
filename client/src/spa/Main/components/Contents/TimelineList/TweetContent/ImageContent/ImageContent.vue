<template>
  <div class="img-wrap">
    <img
      class="img-wrap__img--default-size"
      :src="srcPathFinder ">
  </div>
</template>

<script>
export default {
  name: 'ImageContent',
  props: {
    filename: {
      type: String,
    },
  },
  computed: {
    srcPathFinder() {
      this.src = './../../../../../../../../../static/images/' + this.filename;
      return this.src;
    },
  },
  data() {
    return {
      src: '',
    };
  },
};
</script>

<style scoped>
  .img-wrap {
    padding: 15px 0;
  }

  .img-wrap__img--default-size {
    width: 100%;
    height: auto;
    border: 1px solid #e2e2e2;
    border-radius: 5px;
  }
</style>
