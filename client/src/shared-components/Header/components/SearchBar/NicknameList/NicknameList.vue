<template>
  <li class="searched-list-wrap" @click.stop="linkToProfile">
    <div class="searched-list-wrap__nickname-wrap">
      <span class="searched-list-wrap__nickname-wrap__nickname-text">
        {{ nickname }}
      </span>
    </div>
  </li>
</template>

<script>
export default {
  name: 'NicknameList',
  props: {
    id: {
      type: Number,
    },
    nickname: {
      type: String,
    },
    following: {
      type: Array,
    },
    follower: {
      type: Array,
    },
    descript: {
      type: String,
    },
  },
  methods: {
    async linkToProfile() {
      if(this.$store.getters['main/getUserId'] === this.id) {
        await this.$store.commit('main/bridgeDataUpdate', {
          id: this.$store.getters['main/getUserId'],
          nickname: this.$store.getters['main/getUserNickname'],
          following: this.$store.getters['main/getUserFollowing'],
          follower: this.$store.getters['main/getUserFollower'],
          descript: this.$store.getters['main/getUserDescript'],
        });
      } else {
        await this.$store.commit('main/bridgeDataUpdate', {
          id: this.id,
          nickname: this.nickname,
          following: this.following,
          follower: this.follower,
          descript: this.descript,
        });
      }
      await this.$store.dispatch('main/filteringFollowingLists');
      await this.$store.dispatch('main/filteringFollowerLists');
      this.$router.replace({
        name: 'ProfilePage',
        params: {
          id: this.$store.getters['main/getBridgeId'],
          nickname: this.$store.getters['main/getBridgeNickname'],
          following: this.$store.getters['main/getBridgeFilteredFollowing'],
          follower: this.$store.getters['main/getBridgeFilteredFollower'],
          descript: this.$store.getters['main/getBridgeDescript'],
        },
      });
    },
  },
};
</script>
<style scoped>
  .searched-list-wrap {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-bottom: 1px solid #e2e2e2;
    cursor: pointer;
  }
  .searched-list-wrap:hover {
    background-color: rgba(101, 119, 134, 0.04);
  }

  .searched-list-wrap__nickname-wrap__nickname-text {
    font-size: 0.8rem;
    color: #657786;
    font-weight: 400;
  }
  .searched-list-wrap:hover .searched-list-wrap__nickname-wrap__nickname-text {
    text-decoration: underline;
  }

  .searched-list-wrap__nickname-wrap {
    display: inline-block;
    width: 50%;
    height: 100%;
  }
</style>
