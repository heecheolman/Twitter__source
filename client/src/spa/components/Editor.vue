<template>
  <transition name="editor">
    <div class="editor-mask">
      <div class="editor-wrapper">
        <div class="editor-container">

          <div class="editor-header">
            <slot name="header">

            </slot>
          </div>

          <div class="editor-body">
            <slot name="body">

            </slot>
            <slot name="edit-file-box">

            </slot>
            <slot name="edit-media">

            </slot>
          </div>
          <div class="flex-container flex-center flex-row button-box">
            <slot name="cancel">

            </slot>
            <slot name="edit">

            </slot>
            <slot name="loader">

            </slot>
            <slot name="remove">

            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Editor',
};
</script>
<style scoped>
  /* Moblie Device */
  @media screen and (max-width: 425px) {
    .content__timeline .timeline-list__list .tweet-content .editor-mask {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .content__timeline .timeline-list__list .tweet-content .editor-mask .editor-wrapper .editor-container {
      width: 90%;
    }
    .profile-wrap .editor-mask {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .profile-wrap .editor-mask .editor-wrapper .editor-container {
      width: 90%;
    }
  }
  .editor-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .9);
    display: table;
    transition: opacity .3s ease;
    cursor: default;
  }

  .editor-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .editor-container {
    width: 500px;
    margin: 0 auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .23);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .editor-body {
    width: 100%;
    height: auto;
    background-color: #fff;
    border: 1px solid #d7d7d7;
    border-radius: 5px;
    padding: 10px;
  }
  .button-box {
    width: 100%;
    height: 90px;
  }

  .editor-enter {
    opacity: 0;
  }

  .editor-leave-active {
    opacity: 0;
  }
  .editor-enter .editor-container,
  .editor-leave-active .editor-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .edit-file-box {
    width: 100%;
    /*height: 50px;*/
    background-color: red;
  }

  .loader-wrap {
    display: inline-block;
    width: 80px;
    height: 40px;
  }

</style>
