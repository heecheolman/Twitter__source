<template>
  <div class="main-wrap">
    <header-section />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
import HeaderSection from './../../shared-components/Header/Header';
import axios from 'axios';

import mainUser from '../../vuex/modules/main';
import tweetUser from '../../vuex/modules/tweet';

export default {
  name: 'Main',
  components: {
    HeaderSection,
  },
  beforeRouteEnter(to, from, next) {
    if(!to.params.phone) {
      next({ name: 'LoginPage' });
    } else {
      const phone_number = to.params.phone.split('-').join('');
      axios.get(`/api/phone-numbers/${phone_number}/user-data`, {
        params: { phone_number },
      })
        .then((user) => {
          mainUser.state.user = user.data;
          tweetUser.state.user.id = user.data.id;
          tweetUser.state.user.nickname = user.data.nickname;
          next();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },

};
</script>
<style scoped>
  .main-wrap {
    width: 100vw;
  }
</style>
