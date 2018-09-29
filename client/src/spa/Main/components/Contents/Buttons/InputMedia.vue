<template>
  <div class="content__timeline__tweet-box__tweet-form__toolbar__left__media__container">
    <label for="media-file">
      <svg x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24">
        <path fill="none" d="M0,0h24v24H0V0z"/>
        <path fill="currentColor" d="M18,20H4V6h9V4H4C2.9,4,2,4.9,2,6v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-9h-2V20z"/>
        <polygon fill="currentColor" points="10.21,16.83 8.25,14.47 5.5,18 16.5,18 12.96,13.29 		"/>
        <path fill="currentColor" d="M20,4V1h-2v3h-3c0.01,0.01,0,2,0,2h3v2.99c0.01,0.01,2,0,2,0V6h3V4H20z"/>
      </svg>
    </label>
    <input
      type="file"
      id="media-file"
      name="userfile"
      multiple
      @change="inputFileUpdate" />
  </div>
</template>
<script>
export default {
  name: 'InputMedia',
  created() {
    this.fileIdCounter = 0;
  },
  data() {
    return {
      fileIdCounter: 0,
    };
  },
  methods: {
    createImage(file) {
      const fileReader = new FileReader();
      const image = new Image();
      fileReader.addEventListener('load', () => {
        image.title = file.name;
        image.style.width = 'auto';
        image.style.height = 'auto';
        image.style.overflow = 'hidden';
        image.style.cursor = 'pointer';
        image.src = fileReader.result;
      }, false);
      fileReader.readAsDataURL(file);
      return image;
    },
    createXButton(fileId) {
      const xButton = document.createElement('div');
      const inputDOM = document.querySelector('#media-file');
      xButton.style.width = '20px';
      xButton.style.height = '20px';
      xButton.style.marginLeft = '80px';
      xButton.style.marginTop = '5px';
      xButton.style.borderRadius = '50%';
      xButton.style.backgroundColor = 'black';
      xButton.style.color = 'white';
      xButton.style.fontSize = '14px';
      xButton.style.lineHeight = '16px';
      xButton.style.textAlign = 'center';
      xButton.style.fontWeight = 'lighter';
      xButton.style.position = 'absolute';
      xButton.style.cursor = 'pointer';
      xButton.fileId = fileId;
      xButton.userSelect = 'none';
      const x = document.createTextNode('x');
      xButton.appendChild(x);
      xButton.addEventListener('click', () => {
        const frame = xButton.parentElement;
        this.$store.commit('tweet/removeFormImageList', xButton.fileId);
        inputDOM.value = '';
        frame.remove();
      });
      return xButton;
    },
    createImageWrap() {
      const div = document.createElement('div');
      div.style.width = '113px';
      div.style.height = '113px';
      div.style.display = 'inline-block';
      div.style.overflow = 'hidden';
      div.style.borderRadius = '5px';
      div.style.border = '1px solid #d7d7d7';
      div.style.marginRight = '5px';
      return div;
    },
    inputFileUpdate() {
      const inputDOM = document.querySelector('#media-file');
      const filebox = document.querySelector('.content__timeline__tweet-box__tweet-form__tweet-container__file-box');
      // 파일이 하나라도 존재할 시에
      if(inputDOM.files.length !== 0) {
        for(let i = 0; i < inputDOM.files.length; i++) {
          this.fileIdCounter++;
          const file = inputDOM.files[i];
          const fileId = this.fileIdCounter;
          const imagePreview = this.createImage(file);
          const imageWrap = this.createImageWrap();
          const xButton = this.createXButton(fileId);
          this.$store.commit('tweet/addFormImageList', { fileId, file });
          imageWrap.appendChild(xButton);
          imageWrap.appendChild(imagePreview);
          filebox.appendChild(imageWrap);
        }
        // 파일이 존재하지만 취소를 눌렀을 시
      } else if(this.fileIdCounter === 0) {
        this.$store.commit('tweet/initFileBox');
        filebox.innerHTML = '';
      }
    },
  },

};
</script>
<style scoped>
  label {
    padding: 4px;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    width: 35px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    border-radius: 5px;
    color: #4AB3F4;
  }
  svg {
    width: 25px;
    height: 25px;
  }

  input[type=file] {
    position: absolute;
    opacity: 0;
    padding: 0;
    overflow: hidden;
    clip:rect(0,0,0,0);
    border: 0;
  }
  .content__timeline__tweet-box__tweet-form__toolbar__left__media__container {
    padding: 0;
    display: inline-block;
    width: 35px;
    height: 35px;
    border-radius: 5px;
    overflow: hidden;
    z-index: 1000;
  }
  .content__timeline__tweet-box__tweet-form__toolbar__left__media__container:hover {
    /*border: 1px solid rgba(74, 179, 244, 0.1);*/
    /*box-shadow: inset 0 0 1px rgba(22, 53, 72, 0.1);*/
    box-shadow: inset 0 0 1px #ccd6dd;
    background-color: rgba(74, 179, 244, 0.1);
  }
</style>
