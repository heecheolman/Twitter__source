<template>
  <div class="profile-wrap">
    <div class="profile-wrap__top-section">
      <div class="profile-wrap__top-section__profile-card">
        <div class="profile-wrap__top-section__profile-card--top">
          <div class="profile-wrap__top-section__profile-card--top__header">
            <span class="profile-wrap__top-section__profile-card--top__header--nickname">
              {{ getBridgeNickname }}
            </span>
          </div>
          <div class="profile-wrap__top-section__profile-card--top__contents">
            <div class="profile-wrap__top-section__profile-card--top__contents__edit">
              <span v-if="$route.params.id === $store.state.main.user.id" class="edit-descript" @click.self="initEditModal">수정</span>
            </div>
            <div class="profile-wrap__top-section__profile-card--top__contents__desc">
              <p class="profile-desc">{{ getBridgeDescript }}</p>
            </div>
          </div>
        </div>
        <div class="profile-wrap__top-section__profile-card--bottom">
          <div class="profile-wrap__top-section__profile-card--bottom__follow-wrap">
            <div class="profile-wrap__top-section__profile-card--bottom__follow-wrap__header">Following<span class="data-count"> ({{ getBridgeFilteredFollowing.length }}) </span></div>
            <div class="profile-wrap__top-section__profile-card--bottom__follow-wrap__list">
              <ul>
                <nickname-list
                  v-for="(user, index) in getBridgeFilteredFollowing"
                  :key="index"
                  :nickname="user.nickname"
                  :following="user.following"
                  :follower="user.follower"
                  :id="user.id"
                  :descript="user.descript"
                  :active="user.active"
                  :seen-button="false" />

              </ul>
            </div>
          </div>
          <div class="profile-wrap__top-section__profile-card--bottom__follow-wrap">
            <div class="profile-wrap__top-section__profile-card--bottom__follow-wrap__header">Follower<span class="data-count"> ({{ getBridgeFilteredFollower.length }}) </span></div>
            <ul>
              <nickname-list
                v-for="(user, index) in getBridgeFilteredFollower"
                :key="index"
                :nickname="user.nickname"
                :following="user.following"
                :follower="user.follower"
                :id="user.id"
                :descript="user.descript"
                :active="user.active"
                :seen-button="false" />
            </ul>
          </div>
        </div>
        <div class="profile-wrap__top-section__profile-card--bottom__follow-button-wrap" v-if="$route.params.id !== $store.state.main.user.id">
          <button v-if="buttonType" class="profile-wrap__top-section__profile-card--bottom__follow-button--base follow-button" @click.stop="follow">팔로우</button>
          <button v-else class="profile-wrap__top-section__profile-card--bottom__follow-button--base unfollow-button" @click.stop="unfollow">팔로잉</button>
        </div>
      </div>
    </div>
    <div class="profile-wrap__bottom-section">
      <div class="profile-wrap__bottom-section__timeline">
        <ol>
          <timeline-list
            v-for="(content, index) in getContentListOnlyUser"
            :key="index"
            :id="content.nickname"
            :content-serial="content.id"
            :content-user-id="content.user_id"
            :content-text="content.contents"
            :content-date="content.created_at"
            :content-filename-list="content.images" />
        </ol>
      </div>
    </div>
    <editor v-if="showEditor" @close="showEditor = false">
      <h3 slot="header" class="edit-header">자기소개 수정</h3>
      <textarea slot="body" class="edit-textarea" placeholder="자기소개는 100자내로 해주세요!" maxlength="100" v-model="descript">{{ getBridgeDescript }}</textarea>
      <button slot="cancel" @click="showEditor = false" class="button button--cancel">취소</button>
      <button slot="edit" v-if="!editLoading" @click.stop="editDesc" class="button button--edit">수정</button>
      <clip-loader slot="loader" :color="'#1DA1F2'" v-else/>
    </editor>
  </div>
</template>
<script>
import ProfileImg from './../../../assets/img/default_profile.png';
import NicknameList from '../../../shared-components/Header/components/SearchBar/NicknameList/NicknameList';
import TimelineList from './Contents/TimelineList/TimelineList';
import Editor from './../../components/Editor';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Profile',
  components: {
    NicknameList,
    TimelineList,
    Editor,
    ClipLoader,
  },
  updated() {
    this.$store.commit('tweet/setTarget', { target: this.$route.params.id });
  },
  created() {
    this.$store.commit('tweet/setTarget', { target: this.$route.params.id });
    this.$store.dispatch('tweet/getTimelines');
  },
  computed: {
    ...mapGetters({
      getBridgeFilteredFollowing: 'main/getBridgeFilteredFollowing',
      getBridgeFilteredFollower: 'main/getBridgeFilteredFollower',
      getBridgeNickname: 'main/getBridgeNickname',
      getBridgeDescript: 'main/getBridgeDescript',
      getContentListOnlyUser: 'tweet/getContentListOnlyUser',
    }),
    buttonType() {
      return this.$store.getters['main/getUserFollowing'].indexOf(this.$route.params.id) === -1;
    },
  },
  data() {
    return {
      imgPath: ProfileImg,
      showEditor: false,
      descript: '',
      editLoading: false,
    };
  },
  methods: {
    ...mapActions({
      getTimelines: 'tweet/getTimelines',
    }),
    async follow() {
      this.$store.commit('main/setNicknameData', this.$store.getters['main/getBridgeNickname']);
      await this.$store.dispatch('main/follow');
    },
    async unfollow() {
      this.$store.commit('main/setNicknameData', this.$store.getters['main/getBridgeNickname']);
      await this.$store.dispatch('main/unfollow');
    },
    initEditModal() {
      this.descript = this.$store.getters['main/getUserDescript'];
      this.showEditor = true;
    },
    editDesc() {
      this.editLoading = true;
      let loadingTimeoutId = setTimeout(async () => {
        await this.$store.commit('main/setBridgeDescript', this.descript);
        await this.$store.commit('main/setUserDescript', this.descript);
        await this.$store.dispatch('main/editDescript');
        this.editLoading = false;
        this.showEditor = false;
      }, 500);
      loadingTimeoutId = null;
    },
  }
};
</script>
<style scoped>
  /* Mobile Device */
  @media screen and (max-width: 425px) {
    .main-wrap .profile-wrap {
      width: 100%;
    }
    .main-wrap .profile-wrap .profile-wrap__top-section {
      width: 100%;
      height: 100%;
    }
    .main-wrap .profile-wrap .profile-wrap__top-section .profile-wrap__top-section__profile-card--bottom {
      width: 100%;
      height: 100%;
      flex-direction: column;
    }
    .main-wrap .profile-wrap .profile-wrap__bottom-section {
      width: 100%;
      height: auto;
    }
    .main-wrap .profile-wrap .profile-wrap__bottom-section .profile-wrap__bottom-section__timeline {
      width: 100%;
      height: auto;
    }
  }

  /* Tablet Device */
  @media screen and (min-width: 426px) and (max-width: 1024px) {
    .main-wrap .profile-wrap {
      width: 100%;
      margin: 0;
    }
    .main-wrap .profile-wrap .profile-wrap__top-section {
      width: 100%;
    }
    .main-wrap .profile-wrap .profile-wrap__bottom-section {
      width: 100%;
      height: auto;
    }
    .main-wrap .profile-wrap .profile-wrap__bottom-section .profile-wrap__bottom-section__timeline {
      width: 100%;
      height: auto;
    }
  }

  /* Desktop Device */
  @media screen and (min-width: 1025px) {
    .main-wrap .profile-wrap {
      width: 1190px;
      padding: 56px 20px 15px;
    }
  }

  ul, ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .profile-wrap {
    position: relative;
    padding: 50px 0;
    height: 100%;
    width: 900px;
    margin: 0 auto;
    min-height: 0;
  }
  .profile-wrap__top-section {
    box-sizing: border-box;
    margin: 0 auto;
    width: 590px;
    height: 100%;
  }
  .profile-wrap__top-section__profile-card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: auto;
    background: #fff;
  }

  .profile-wrap__top-section__profile-card--top {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 300px;
  }
  .profile-wrap__top-section__profile-card--bottom {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    width: 400px;
    height: 200px;
  }
  .profile-wrap__top-section__profile-card--top__header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
  }
  .profile-wrap__top-section__profile-card--top__header--nickname {
    font-size: 18px;
    font-weight: bold;
    color: #657786;
  }
  .profile-wrap__top-section__profile-card--top__contents {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 130px;
  }
  .profile-wrap__top-section__profile-card--top__contents__edit {
    width: 100%;
    height: 20px;
    text-align: right;
  }
  .edit-descript {
    font-size: 10px;
    color: #1DA1F2;
    cursor: pointer;
  }
  .edit-descript:hover {
    text-decoration: underline;
  }
  .profile-wrap__top-section__profile-card--top__contents__desc {
    width: 100%;
    height: 100px;
  }
  .profile-desc {
    padding: 0 10px;
    line-height: 150%;
    text-align: center;
    color: #657786;
    font-size: 14px;
    word-break: break-word;
    white-space: pre-wrap;
  }
  .profile-wrap__top-section__profile-card--bottom__follow-wrap {
    width: 150px;
    height: 200px;
  }
  .profile-wrap__top-section__profile-card--bottom__follow-wrap__header {
    color: #657786;
    font-size: 13px;
    font-weight: bold;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-bottom: 1px solid rgba(101, 119, 134, 0.2);
  }
  .profile-wrap__top-section__profile-card--bottom__follow-wrap__list {
    width: 100%;
    height: 170px;
    overflow-y: scroll;
  }

  .profile-wrap__top-section__profile-card--bottom__follow-button-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
  }
  .profile-wrap__top-section__profile-card--bottom__follow-button--base {
    outline: none;
    border: none;
    border-radius: 20px;
    width: 100%;
    height: 28px;
    text-align: center;
    line-height: 28px;
    background-color: transparent;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s;
  }
  .follow-button {
    color: #1DA1F2;
  }
  .follow-button:hover {
    background-color: rgba(29, 161, 242, 0.1);
  }
  .unfollow-button {
    color: #657786;
  }
  .unfollow-button:hover {
    background-color: rgba(101, 119, 134, 0.1);
  }

  .profile-wrap__bottom-section {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 10px 0;
    height: 100%;
    width: 900px;
    margin: 0 auto;
    min-height: 0;
  }
  .profile-wrap__bottom-section__timeline {
    width: 590px;
    height: 900px;
  }

  /***** Modal *****/
  .edit-header {
    color: #1da1f2;
    text-align: center;
    font-weight: 600;
    font-size: 20px;
  }

  .button {
    outline: none;
    width: 80px;
    height: 40px;
    border-radius: 50px;
    cursor: pointer;
    transition: .2s;
    margin: 5px;
    border: 1px solid #d7d7d7;
    color: #666666;
    background-color: #fff;
  }

  .button:hover {
    transform: translateY(-3px);
  }
  .button--cancel:hover {
    color: #ff3c38;
  }

  .button--edit:hover {
    color: #1da1f2;
  }

  .edit-textarea {
    resize: none;
    outline: none;
    border: none;
    width: 100%;
    min-height: 100px;
  }
</style>
