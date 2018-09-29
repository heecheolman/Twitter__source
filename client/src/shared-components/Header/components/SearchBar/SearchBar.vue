<template>
  <form action="" class="search-form">
    <input class="search-form__search" type="text" placeholder="트위터 검색하기" v-model="searchToken">
    <div class="search-form__icon">
      <button class="search-form__icon--search">
        <svg x="0px" y="0px" viewBox="0 0 451 451" class="icon--search">
          <path d="M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3   s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4   C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3   s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z" fill="#66757f"/>
        </svg>
      </button>
    </div>
    <div v-if="doSearching" class="search-form__drop-down">
      <div class="arrow-box" v-if="getNicknameList.length !== 0">
        <div class="outer"></div>
        <div class="inner"></div>
      </div>
      <div class="search-form__drop-down__searched-box" v-if="getNicknameList.length !== 0">
        <ul>
          <nickname-list
            v-for="(user, index) in getNicknameList"
            :key="index"
            :id="user.id"
            :following="user.following"
            :follower="user.follower"
            :nickname="user.nickname"
            :descript="user.descript" />
        </ul>
      </div>
    </div>
  </form>
</template>
<script>
import NicknameList from './NicknameList/NicknameList';
import { mapGetters } from 'vuex';

export default {
  name: 'SearchBar',
  components: {
    NicknameList,
  },
  watch: {
    searchToken: function() {
      this.$store.commit('main/setSearchToken', this.searchToken);
      this.$store.dispatch('main/searchNicknameList');
    },
  },
  computed: {
    ...mapGetters({
      getNicknameList: 'main/getSearchedNicknameList',
    }),
    doSearching() {
      return this.searchToken.length !== 0;
    },
  },
  data() {
    return {
      searchToken: '',
    };
  },
};
</script>
<style scoped>
  svg {
    width: inherit;
    height: inherit;
  }

  .search-form {
    display: block;
    position: relative;
    float: left;
    height: 33px;
    margin: 5px 15px 0 0;
    font-size: 12px;
    width: 221px;
  }
  .search-form__icon {
    display: block;
    position: absolute;
    right: 10px;
    top: 9px;
  }
  .search-form__icon--search {
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
  }
  .icon--search {
    width: 14px;
    height: 14px;
  }
  .search-form__search {
    background-color: #f5f8fa;
    border-radius: 21px;
    border: 1px solid #e6ecf0;
    height: 32px;
    width: 100%;
    margin: 0;
    outline: 0;
    padding: 8px 32px 8px 12px;
    transition: .2s ease-in-out;
  }
  .search-form__search:focus {
    background-color: #fff;
    border: 2px solid #4AB3F4;
  }
  .search-form__drop-down__searched-box {
    margin-top: 17px;
    width: 100%;
    border-radius: 4px;
    background-color: #fff;
    background-clip: padding-box;
    z-index: 999;
    box-shadow: 0 1px 4px rgba(0,0,0,0.25);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .arrow-box {
    position: absolute;
    display: block;
    z-index: 999;
    top: 39px;
    left: 18px;
    width: 18px;
    height: 10px;
    float: left;
  }
  .outer {
    border-bottom: 10px solid #657786;
    border-bottom-color: rgba(0,0,0,0.1);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    height: auto;
    left: 0;
    top: 0;
    width: auto;
  }
  .inner {
    position: absolute;
    top: 1px;
    left: 1px;
    width: auto;
    height: auto;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 9px solid #fff;
  }
</style>
