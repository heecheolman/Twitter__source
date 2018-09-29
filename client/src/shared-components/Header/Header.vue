<template>
  <div class="header">
    <div class="header__container">
      <div class="header__container__left-tooltip-container">
        <ul>
          <menu-tooltip
          v-for="(tooltip, index) in tooltipList"
          :key="index"
          :label="tooltip.label"
          :click-event="tooltip.clickEvent"/>
        </ul>
      </div>
      <div class="header__container__left-tooltip-container--mobile">
        <hamburger-menu
          :route="tooltipList"/>
      </div>
      <div class="header__container__logo-container">
        <h1 class="header__container__logo-container__logo">Twitter</h1>
      </div>
      <div class="header__container__right-tooltip-container">
        <div class="header__container__right-tooltip-container__search-bar-container">
          <search-bar/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MenuTooltip from './components/MenuTooltip';
import SearchBar from './components/SearchBar/SearchBar';
import HamburgerMenu from './components/Hamburger/HamburgerMenu';

export default {
  name: 'Header',
  components: {
    MenuTooltip,
    SearchBar,
    HamburgerMenu,
  },
  data() {
    return {
      tooltipList: [
        {
          label: '홈',
          clickEvent: async () => {
            this.$router.replace({ name: 'MainPage' });
            await this.$store.dispatch('tweet/getTimelines');
          },
        },
        {
          label: '프로필',
          clickEvent: async () => {
            this.$store.commit('main/bridgeDataUpdate', {
              id: this.$store.getters['main/getUserId'],
              nickname: this.$store.getters['main/getUserNickname'],
              following: this.$store.getters['main/getUserFollowing'],
              follower: this.$store.getters['main/getUserFollower'],
              descript:  this.$store.getters['main/getUserDescript'],
            });
            await this.$store.dispatch('main/filteringFollowingLists');
            await this.$store.dispatch('main/filteringFollowerLists');
            this.$router.replace(
              { name: 'ProfilePage',
                params: {
                  id: this.$store.getters['main/getUserId'],
                  nickname: this.$store.getters['main/getUserNickname'],
                  following: this.$store.getters['main/getBridgeFilteredFollowing'],
                  follower: this.$store.getters['main/getBridgeFilteredFollower'],
                  descript:  this.$store.getters['main/getBridgeDescript'],
                },
              },);
          },
        },
        {
          label: '로그아웃',
          clickEvent: async () => {
            this.$router.replace({ name: 'LoginPage' });
          },
        }
      ],
    };
  },
};
</script>
<style scoped>
  /* Mobile Device */
  @media screen and (max-width: 425px) {
    .main-wrap .header {
      width: 100%;
      min-width: 100%;
    }
    .main-wrap .header .header__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0;
    }
    .main-wrap .header .header__container .header__container__left-tooltip-container {
      display: none;
      visibility: hidden;
    }
    .main-wrap .header .header__container .header__container__left-tooltip-container--mobile {
      display: flex;
      visibility: visible;
    }
    .header .header__container .header__container__logo-container {
      display: none;
      visibility: hidden;
    }
    .header .header__container .header__container__logo-container .header__container__logo-container__logo {
      display: none;
      visibility: hidden;
    }
  }

  /* Tablet Device */
  @media screen and (min-width: 426px) and (max-width: 1024px) {
    .header .header__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 100%;
      padding: 0;
    }
    .header .header__container .header__container__left-tooltip-container {
      display: none;
      visibility: hidden;
    }
    .header .header__container .header__container__left-tooltip-container--mobile {
      display: flex;
      visibility: visible;
    }
  }

  /* Desktop Device */
  @media screen and (min-width: 1025px) {
    .header .header__container {
      max-width: 1190px;
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    float: left;
  }
  .header {
    position: fixed;
    z-index: 1000;
    background-color: #ffffff;
    width: 100%;
    height: 45px;
    border-bottom: 1px solid rgba(0,0,0,0.25);
  }
  .header__container {
    position: relative;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
    height: 100%;
  }
  .header__container__left-tooltip-container {
    float: left;
    display: inline-block;
    width: 200px;
    height: 100%;
  }
  .header__container__logo-container {
    position: relative;
    display: inline-block;
    width: auto;
    height: 100%;
    line-height: 44px;
  }
  .header__container__left-tooltip-container--mobile {
    display: none;
    visibility: hidden;
    justify-content: center;
    align-items: center;
    width: 44px;
    height: 44px;
  }
  .header__container__logo-container__logo {
    user-select: none;
    cursor: default;
    font-size: 1.2rem;
    color: #4AB3F4;
    margin: 0;
  }
  .header__container__right-tooltip-container {
    float: right;
    display: inline-flex;
    align-items: center;
    height: 100%;
  }

  .header__container__right-tooltip-container__search-bar-container {
    display: inline-block;
    height: 100%;
  }
</style>
