<template>
  <li @click="clickEvent">
    <span class="menu-tooltip__tooltip">{{ label }}</span>
  </li>
</template>
<script>
export default {
  name: 'MenuTooltip',
  props: {
    label: {
      type: String,
    },
    aStyle: {
      type: String,
    },
    clickEvent: {
      type: Function,
    },
  },
};
</script>
<style scoped>
  li {
    width: 65px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    float: left;
    cursor: pointer;
  }
  .menu-tooltip__tooltip {
    font-size: 13px;
    font-weight: bold;
    display: block;
    color: #4AB3F4;
    transition: .1s ease-in-out;
  }
  .menu-tooltip__tooltip:hover {
    border-bottom: 2px solid #4AB3F4;
  }
  .menu-tooltip__tooltip:visited {
    color: #4AB3F4;
  }
</style>
