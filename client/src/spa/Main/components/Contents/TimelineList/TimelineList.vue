<template>
  <li class="timeline-list__list">
    <div class="timeline-list__list__profile-button">
      <img :src="imagePath" class="timeline-list__list__profile-button__profile-img">
    </div>
    <tweet-content
      :id="id"
      :content-serial="contentSerial"
      :content-user-id="contentUserId"
      :content-text="contentText"
      :content-date="stringifyDate"
      :content-filename-list="contentFilenameList" />
  </li>
</template>

<script>
import ProfileImage from '../../../../../assets/img/default_profile.png';
import DateCalculator from '../../../../../lib/DateCalculator';
import TweetContent from './TweetContent/TweetContent';

export default {
  name: 'TimelineList',
  components: {
    TweetContent,
  },
  props: {
    id: {
      type: String,
    },
    contentSerial: {
      type: Number,
    },
    contentUserId: {
      type: Number,
    },
    contentText: {
      type: String,
    },
    contentDate: {
      type: String,
    },
    contentFilenameList: {
      type: Array,
    },
  },
  mounted() {
    this.updateTimelineId = this.updateTimelineDate();
  },
  destroyed() {
    clearInterval(this.updateTimelineId);
  },
  computed: {
    stringifyDate() {
      this.date = '• ' + DateCalculator(this.contentDate);
      return this.date;
    },
  },
  data() {
    return {
      imagePath: ProfileImage,
      date: '',
    };
  },
  methods: {
    updateTimelineDate() {
      setInterval(() => {
        this.date = '• ' + DateCalculator(this.contentDate);
      }, 30000);
    },
  }
};
</script>

<style scoped>
  /* Mobile Device */
  @media screen and (max-width: 425px) {
    .main-wrap .content .content__timeline .timeline-list__list,
    .main-wrap .profile-wrap .profile-wrap__bottom-section .profile-wrap__bottom-section__timeline .timeline-list__list {
      width: 100%;
      height: auto;
    }
    .main-wrap .content .content__timeline .timeline-list__list .timeline-list__list__profile-button,
    .main-wrap .profile-wrap .profile-wrap__bottom-section .profile-wrap__bottom-section__timeline .timeline-list__list__profile-button {
      display: none;
      visibility: hidden;
    }
    .main-wrap .content .content__timeline .timeline-list__list .timeline-list__list__profile-button .timeline-list__list__profile-button__profile-img,
    .main-wrap .profile-wrap .profile-wrap__bottom-section .profile-wrap__bottom-section__timeline .timeline-list__list__profile-button .timeline-list__list__profile-button__profile-img {
      display: none;
      visibility: hidden;
    }

  }
  /* Desktop Device */
  @media screen and (min-width: 426px) and (max-width: 1024px) {
    .main-wrap .content .content__timeline .timeline-list__list {
      width: 100%;
      height: auto;
    }
  }
  .timeline-list__list {
    width: 100%;
    position: relative;
    padding: 9px 12px;
    min-height: 51px;
    border-bottom: 1px solid #e6ecf0;
    cursor: pointer;
    background-color: #fff;
  }

  .timeline-list__list:hover {
    background-color: #f5f8fa;
  }

  .timeline-list__list__profile-button {
    margin-top: 2px;
    float: left;
  }
  .timeline-list__list__profile-button__profile-img {
    margin-left: 10px;
    width: 40px;
    height: 40px;
    display: block;
    border-radius: 50%;
    cursor: pointer;
  }
</style>
