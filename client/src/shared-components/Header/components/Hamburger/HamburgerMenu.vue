<template>
  <div class="hamburger-menu-box" @click="showHamburgerMenu">
    <div class="arrow-box" v-show="clicked">
      <div class="outer"></div>
      <div class="inner"></div>
    </div>
    <div class="hamburger--base hamburger--item1"></div>
    <div class="hamburger--base hamburger--item2"></div>
    <div class="hamburger--base hamburger--item3"></div>
    <div class="mobile-menu" v-show="clicked">
      <ul>
        <li class="mobile-menu__list" @click="goHome">홈</li>
        <li class="mobile-menu__list" @click="goProfile">프로필</li>
        <li class="mobile-menu__list" @click="logout">로그아웃</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HamburgerMenu',
  props: {
    route: {
      type: Array,
    }
  },
  data() {
    return {
      clicked: false,
    }
  },
  methods: {
    showHamburgerMenu() {
      this.clicked = !this.clicked;
    },
    goHome() {
      this.route[0].clickEvent();
    },
    goProfile() {
      this.route[1].clickEvent();
    },
    logout() {
      this.route[2].clickEvent();
    },
  }
};
</script>
<style scoped>
  /* Mobile Device */
  @media screen and (max-width: 425px) {
    .header__container__left-tooltip-container--mobile .hamburger-menu-box {
      display: flex;
      visibility: visible;
    }
  }
  /* Tablet Device */
  @media screen and (min-width: 426px) and (max-width: 1024px) {
    .header__container__left-tooltip-container--mobile .hamburger-menu-box {
      display: flex;
      visibility: visible;
    }
    .header__container__left-tooltip-container--mobile .hamburger-menu-box .mobile-menu{
      width: 200px;
      height: auto;
    }
    .header__container__left-tooltip-container--mobile .hamburger-menu-box .mobile-menu .mobile-menu__list {
      width: 100%;
      height: 50px;
      line-height: 50px;
    }
  }
  .hamburger-menu-box {
    display: none;
    visibility: hidden;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 25px;
    height: 23px;
  }

  .hamburger-menu-box .hamburger--base {
    width: 90%;
    height: 3px;
    /*border-radius: 5px;*/
    background: #1da1f2;
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

  .mobile-menu {
    z-index: 3;
    width: 120px;
    height: auto;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,0,0,0.25);
    border-radius: 3px;
    position: absolute;
    top: 49px;
    left: 10px;
  }
  .mobile-menu ul {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .mobile-menu__list {
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 12px;
    /*color: #14171a;*/
    color: #657786;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    cursor: pointer;
  }
  .mobile-menu__list:hover {
    background-color: #f5f8fa;
  }
</style>
