<template>
  <div class="content">
    <div class="content__section">
      <dash-board-profile />
    </div>
    <div class="content__timeline">
      <tweet-box />
      <ol>
        <timeline-list
          v-for="(content, index) in getContentList"
          :key="index"
          :id="content.nickname"
          :content-serial="content.id"
          :content-user-id="content.user_id"
          :content-text="content.contents"
          :content-date="content.created_at"
          :content-filename-list="content.images" />
      </ol>
    </div>
    <div class="content__section">
    </div>
  </div>
</template>
<script>
import DashBoardProfile from './Contents/DashBoardProfile';
import TweetBox from './Contents/TweetBox';
import TimelineList from './Contents/TimelineList/TimelineList';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Main',
  components: {
    DashBoardProfile,
    TweetBox,
    TimelineList,
  },
  created() {
    this.$store.dispatch('tweet/getTimelines');
  },
  computed: {
    ...mapGetters({
      getContentList: 'tweet/getContentList',
    }),
  },
  methods: {
    ...mapActions({
      getTimelines: 'tweet/getTimelines',
    }),
  },
};
</script>
<style scoped>
  /* Mobile Device */
  @media screen and (max-width: 425px) {
    .main-wrap .content .content__section{
      display: none;
      visibility: hidden;
    }
    .main-wrap .content {
      width: 100%;
      margin: 0;
    }
    .main-wrap .content .content__timeline {
      width: 100%;
      margin-left: 0;
    }
  }

  /* Tablet Device */
  @media screen and (min-width: 426px) and (max-width: 1024px) {
    .main-wrap .content .content__section{
      display: none;
      visibility: hidden;
    }
    .main-wrap .content {
      width: 100%;
      margin: 0;
    }
    .main-wrap .content .content__timeline {
      width: 100%;
      margin-left: 0;
    }
  }

  /* Desktop Device */
  @media screen and (min-width: 1025px) {
    .main-wrap .content {
      width: 1190px;
      padding: 56px 20px 15px;
    }

    .main-wrap .content .content__timeline {
      margin: 0 10px;
    }
  }
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .content {
    position: relative;
    padding: 50px 0;
    height: 100%;
    width: 900px;
    margin: 0 auto;
    min-height: 0;
  }
  .content__section {
    float: left;
    width: 270px;
    height: 900px;
  }

  .content__timeline {
    float: left;
    margin-left: 25px;
    width: 590px;
    height: 900px;
  }
</style>
