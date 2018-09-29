<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}

</script>

<style>
  @import './assets/common.css';

  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #e6ecf0;
  }
  * {
    box-sizing: border-box;
  }
  #app {
    font-family: Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
</style>
