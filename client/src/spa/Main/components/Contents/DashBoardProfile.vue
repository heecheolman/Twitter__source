<template>
  <div class="dashboard__profile">
    <div class="dashboard__profile--bg">
    </div>
    <div class="dashboard__profile--content">
      <div class="dashboard__profile--content__profile-button">
          <img :src="imagePath" class="dashboard__profile--content__profile-button__profile-img">
      </div>
      <div class="dashboard__profile--content__profile-nickname">
        <div class="dashboard__profile--content__profile-nickname--nickname">
          {{ getUserNickname }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProfileImage from '../../../../assets/img/default_profile.png';
import { mapGetters } from 'vuex';

export default {
  name: 'DashBoardProfile',
  computed: {
    ...mapGetters({
      getUserNickname: 'main/getUserNickname',
    }),
  },
  data() {
    return {
      imagePath: ProfileImage,
    }
  }
};
</script>
<style scoped>
  * {
    box-sizing: border-box;
  }
  img {
    border: 0;
  }
  .dashboard__profile {
    border: 1px solid #e6ecf0;
    background: #fff;
    position: relative;
    margin-bottom: 10px;
  }
  .dashboard__profile--bg {
    background-size: 100%;
    height: 95px;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    background-position: 0 50%;
    background-color: #1DA1F2 !important;
    width: 100%;
    padding: 0;
  }
  .dashboard__profile--content {
    padding: 15px;
  }
  .dashboard__profile--content__profile-button {
    margin-top: 2px;
    float: left;
  }
  .dashboard__profile--content__profile-button__profile-img {
    margin-left: 10px;
    width: 40px;
    height: 40px;
    display: block;
    border-radius: 50%;
    cursor: pointer;
  }
  .dashboard__profile--content__profile-nickname {
    margin-left: 70px;
    width: 185px;
    height: 44px;
    line-height: 44px;
  }
  .dashboard__profile--content__profile-nickname--nickname {
    font-weight: bold;
    font-size: 18px;
    color: #14171a;
  }
  .dashboard__profile--content__profile-nickname--nickname:visited {
    color: #14171a;
  }
  .dashboard__profile--content__profile-nickname--nickname:hover {
    cursor: pointer;
    text-decoration: underline;
  }
</style>
