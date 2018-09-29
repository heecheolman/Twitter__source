<template>
  <div class="join-body__button-body flex-container flex-center flex-column">
    <join-button />
    <back-button />
  </div>
</template>
<script>
import JoinButton from './Buttons/JoinButton';
import BackButton from './Buttons/BackButton';

export default {
  name: 'ButtonArea',
  components: {
    JoinButton,
    BackButton,
  },
};
</script>
<style scoped>

</style>
