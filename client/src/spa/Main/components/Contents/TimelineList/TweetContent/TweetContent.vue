<template>
  <div class="tweet-content">
    <div class="tweet-content__header">
      <span class="tweet-content__header--nickname">{{ id }}</span>
      <span class="tweet-content__header--date">{{ contentDate }}</span>
      <span v-if="isMe" @click="initEditModal">
        <span class="tweet-content__header--edit">수정</span>
      </span>
    </div>
    <div class="tweet-content__body">
      <image-content
        v-for="(img, index) in contentFilenameList"
        :key="index"
        :filename="img.filename" />
      <p class="tweet-content__body--p--base tweet-content__body--p--content">{{ contentText }}</p>
    </div>
    <div class="tweet-content__action">
      <div class="tweet-content__action__list">
        <button class="button--svg"><svg class="button--svg--common" x="0px" y="0px" viewBox="0 0 30.333 30.333">
          <path d="M0,26.75V11.908c0-4.59,3.735-8.325,8.325-8.325h13.681c4.591,0,8.327,3.735,8.327,8.325v2.56
                      c0,4.59-3.735,8.325-8.325,8.325H8.518L0,26.75z M8.325,5.439c-3.567,0-6.469,2.902-6.469,6.469v11.933l6.253-2.905h13.899
                      c3.567,0,6.469-2.902,6.469-6.469v-2.56c0-3.567-2.903-6.469-6.471-6.469H8.325V5.439z M8.937,11.767
                      c0.975,0,1.765,0.79,1.765,1.765s-0.79,1.765-1.765,1.765s-1.765-0.79-1.765-1.765S7.962,11.767,8.937,11.767z M21.395,11.767
                      c0.975,0,1.765,0.79,1.765,1.765s-0.79,1.765-1.765,1.765s-1.765-0.79-1.765-1.765S20.42,11.767,21.395,11.767z M15.165,11.767
                      c0.975,0,1.765,0.79,1.765,1.765s-0.79,1.765-1.765,1.765s-1.765-0.79-1.765-1.765S14.19,11.767,15.165,11.767z"/>
        </svg></button>
        <button class="button--svg"><svg class="button--svg--common" width="18px" height="18px" viewBox="0 0 64 64">
          <path d="m15.486,25.515c0.398,0.454 0.952,0.687 1.507,0.687 0.478,0 0.958-0.172 1.345-0.518 0.832-0.75 0.906-2.043 0.165-2.887l-7.488-8.528c-0.014-0.015-0.032-0.021-0.046-0.034-0.029-0.031-0.057-0.06-0.088-0.088-0.016-0.015-0.02-0.033-0.035-0.047-0.073-0.066-0.163-0.09-0.241-0.144-0.093-0.062-0.177-0.142-0.275-0.187-0.037-0.018-0.075-0.027-0.112-0.041-0.108-0.041-0.219-0.052-0.331-0.074-0.108-0.021-0.211-0.057-0.323-0.06-0.021-0.001-0.038-0.012-0.058-0.012s-0.037,0.011-0.058,0.012c-0.112,0.003-0.217,0.038-0.327,0.06-0.112,0.022-0.221,0.033-0.327,0.074-0.037,0.014-0.074,0.023-0.11,0.041-0.101,0.045-0.184,0.124-0.278,0.187-0.08,0.054-0.171,0.078-0.244,0.144-0.016,0.015-0.02,0.034-0.035,0.049-0.03,0.027-0.058,0.056-0.085,0.086-0.014,0.014-0.031,0.02-0.046,0.034l-7.486,8.528c-0.741,0.844-0.666,2.137 0.168,2.887 0.385,0.346 0.863,0.518 1.34,0.518 0.557,0 1.11-0.232 1.509-0.687l3.96-4.511v23.445c0,3.383 2.717,6.134 6.058,6.134h29.14c1.115,0 2.019-0.915 2.019-2.044 0-1.13-0.903-2.045-2.019-2.045h-29.14c-1.115,0-2.02-0.918-2.02-2.045v-23.445l3.961,4.511z"/>
          <path d="m60.473,38.652l-3.959,4.51v-23.445c0-3.383-2.718-6.134-6.058-6.134h-28.415c-1.117,0-2.02,0.915-2.02,2.044 0,1.13 0.902,2.045 2.02,2.045h28.415c1.115,0 2.02,0.918 2.02,2.045v23.445l-3.962-4.51c-0.742-0.844-2.016-0.92-2.852-0.168-0.832,0.75-0.906,2.043-0.166,2.886l7.489,8.527c0.012,0.015 0.032,0.019 0.044,0.032 0.029,0.032 0.059,0.062 0.09,0.092 0.014,0.013 0.02,0.031 0.035,0.045 0.095,0.084 0.206,0.125 0.309,0.189 0.033,0.021 0.062,0.048 0.1,0.066 0.047,0.025 0.085,0.07 0.134,0.092 0.018,0.008 0.037,0.01 0.055,0.018 0.241,0.096 0.49,0.151 0.744,0.151 0.251,0 0.504-0.055 0.743-0.151 0.018-0.008 0.037-0.01 0.056-0.018 0.049-0.021 0.086-0.065 0.131-0.09 0.033-0.019 0.059-0.044 0.091-0.062 0.109-0.064 0.226-0.109 0.321-0.195 0.016-0.015 0.02-0.034 0.035-0.049 0.03-0.028 0.058-0.058 0.087-0.088 0.012-0.014 0.031-0.018 0.043-0.032l7.488-8.527c0.74-0.843 0.665-2.136-0.169-2.886-0.835-0.752-2.11-0.675-2.849,0.168z"/>
        </svg></button>
        <button class="button--svg"><svg class="button--svg--common" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 979.494 979.494">
          <path d="M964.616,227.519c-15.63-44.595-43.082-84.824-79.389-116.338c-36.341-31.543-80.051-53.048-126.404-62.188
                      c-17.464-3.444-35.421-5.19-53.371-5.19c-52.371,0-103.306,14.809-147.296,42.827c-26.482,16.867-49.745,38.022-68.908,62.484
                      c-19.158-24.415-42.405-45.53-68.859-62.364C376.42,58.773,325.52,43.985,273.189,43.985c-0.003,0,0.001,0-0.001,0
                      c-43.604,0-87.367,10.77-126.546,31.143c-39.15,20.358-73.104,49.978-98.188,85.658C22.752,197.343,7.096,238.278,1.92,282.453
                      c-4.532,38.687-1.032,80.217,10.405,123.436c22.656,85.615,72.803,163.707,110.882,214.142
                      c82.795,109.659,196.636,209.196,348.028,304.301l18.085,11.36l18.086-11.36C693.624,807.35,823.602,683.842,904.764,546.749
                      c46.678-78.844,70.994-149.084,74.343-214.733C980.972,295.429,976.096,260.271,964.616,227.519z M489.322,855.248
                      c-135.253-87.096-237.398-177.586-311.846-276.192c-34.407-45.571-79.583-115.623-99.414-190.562
                      c-9.245-34.937-12.14-67.951-8.604-98.128c3.846-32.824,15.494-63.262,34.623-90.47c18.844-26.803,44.41-49.085,73.932-64.436
                      c29.533-15.357,62.444-23.474,95.176-23.474c39.377,0,77.654,11.113,110.692,32.136c32.204,20.492,58.094,49.399,74.868,83.596
                      l30.559,62.292l30.505-62.318c16.759-34.238,42.648-63.183,74.872-83.705c33.057-21.054,71.358-32.182,110.767-32.182
                      c13.544,0,27.074,1.314,40.216,3.905c34.739,6.85,67.585,23.042,94.986,46.826c27.39,23.774,48.064,54.023,59.79,87.476
                      c8.547,24.385,12.164,50.811,10.75,78.542c-2.772,54.379-24.017,114.42-64.944,183.553
                      C773.338,635.262,656.457,747.659,489.322,855.248z"/>
        </svg></button>
      </div>
    </div>
    <editor v-if="showEditor" @close="showEditor = false">
      <h3 slot="header" class="edit-header">게시글 수정</h3>
      <textarea slot="body" class="edit-textarea" v-model="editTextContent">{{ editTextContent }}</textarea>
      <div class="edit-file-box" slot="edit-file-box"></div>
      <div class="media__container" slot="edit-media">
        <label for="edit-media-file"><svg v-html="inputSvg"></svg></label>
        <input type="file" id="edit-media-file" name="userfile" multiple @change="updateFile" />
      </div>
      <button slot="cancel" @click="showEditor = false" class="button button--cancel">취소</button>
      <button slot="edit" v-if="!editLoading" @click.stop="edit" class="button button--edit">수정</button>
      <clip-loader slot="loader" :color="'#1DA1F2'" v-else/>
      <button slot="remove" v-if="!removeLoading" @click.stop="remove" class="button button--remove">삭제</button>
      <clip-loader slot="loader" :color="'#1DA1F2'" v-else/>
    </editor>
  </div>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import ImageContent from './ImageContent/ImageContent';
import Editor from '../../../../../components/Editor';

import axios from 'axios';

export default {
  name: 'TweetContent',
  components: {
    ClipLoader,
    ImageContent,
    Editor,
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
  computed: {
    isMe() {
      return this.$store.getters['tweet/getUserId'] === this.contentUserId;
    }
  },
  data() {
    return {
      showEditor: false,
      inputSvg: `<svg x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24">
<path fill="none" d="M0,0h24v24H0V0z"/>
  <path fill="currentColor" d="M18,20H4V6h9V4H4C2.9,4,2,4.9,2,6v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-9h-2V20z"/>
  <polygon fill="currentColor" points="10.21,16.83 8.25,14.47 5.5,18 16.5,18 12.96,13.29 		"/>
  <path fill="currentColor" d="M20,4V1h-2v3h-3c0.01,0.01,0,2,0,2h3v2.99c0.01,0.01,2,0,2,0V6h3V4H20z"/>
</svg>`,
      originFileIdCounter: 0,
      newFileIdCounter: 0,
      originFileList: [],
      newFileList: [],
      editTextContent: '',
      editLoading: false,
      removeLoading: false,
    };
  },
  methods: {
    initEditModal() {
      this.showEditor = true;
      this.newFileIdCounter = 0;
      this.originFileIdCounter = 0;
      this.editTextContent = this.contentText;
      if(this.contentFilenameList.length !== 0) {
        this.originFileList = this.contentFilenameList.slice();
        this.loadFile();
      }
    },
    loadFile() {
      this.$nextTick(function() {
        const editFileBox = document.querySelector('.edit-file-box');
        this.extendBox();
        for(let i = 0; i < this.contentFilenameList.length; i++) {
          const image = this.createOriginImage(this.contentFilenameList[i].filename);
          const wrap = this.createImageWrap();
          const fileId = this.originFileIdCounter++;
          this.contentFilenameList[i].id = fileId;
          const x = this.createXButton(fileId, true);
          wrap.appendChild(x);
          wrap.appendChild(image);
          editFileBox.appendChild(wrap);
        }
      });
    },
    createOriginImage(filename) {
      const defaultPath = './../../../../../../../../static/images/';
      const image = new Image();
      image.title = filename;
      image.style.width = 'auto';
      image.style.height = 'auto';
      image.style.overflow = 'hidden';
      image.style.cursor = 'pointer';
      image.src = defaultPath + filename;
      return image;
    },
    whichDevice() {
      const viewSize = document.querySelector('body').clientWidth;
      let device = '';
      if(viewSize < 426) {
        device = 'mobile';
      } else if(viewSize < 1025) {
        device = 'tablet';
      } else {
        device = 'desktop';
      }
      return device;
    },
    createImageWrap() {
      const div = document.createElement('div');
      let imageWrapStyle = {
        width: '',
        height: '',
      };
      switch(this.whichDevice()) {
        case 'mobile':
          imageWrapStyle.width = '50px';
          imageWrapStyle.height = '50px';
          break;
        case 'tablet':
          imageWrapStyle.width = '80px';
          imageWrapStyle.height = '80px';
          break;
        case 'desktop':
          imageWrapStyle.width = '113px';
          imageWrapStyle.height = '113px';
          break;
      }
      div.style.width = imageWrapStyle.width;
      div.style.height = imageWrapStyle.height;
      div.style.display = 'inline-block';
      div.style.overflow = 'hidden';
      div.style.borderRadius = '5px';
      div.style.border = '1px solid #d7d7d7';
      div.style.marginRight = '5px';
      return div;
    },
    createXButton(fileId, isOrigin) {
      const xButton = document.createElement('div');
      let xButtonStyle = {
        width: '20px',
        height: '20px',
        marginLeft: '',
        marginTop: '5px',
      };
      switch(this.whichDevice()) {
        case 'mobile':
          xButtonStyle.marginLeft = '20px';
          break;
        case 'tablet':
          xButtonStyle.marginLeft = '50px';
          break;
        case 'desktop':
          xButtonStyle.marginLeft = '80px';
          break;
      }
      xButton.style.width = xButtonStyle.width;
      xButton.style.height = xButtonStyle.height;
      xButton.style.marginLeft = xButtonStyle.marginLeft;
      xButton.style.marginTop = xButtonStyle.marginTop;

      xButton.style.borderRadius = '50%';
      xButton.style.backgroundColor = 'black';
      xButton.style.color = 'white';
      xButton.style.fontSize = '14px';
      xButton.style.lineHeight = '16px';
      xButton.style.textAlign = 'center';
      xButton.style.fontWeight = 'lighter';
      xButton.style.position = 'absolute';
      xButton.style.cursor = 'pointer';
      xButton.userSelect = 'none';
      xButton.fileId = fileId;
      const x = document.createTextNode('x');
      xButton.appendChild(x);
      xButton.addEventListener('click', () => {
        const frame = xButton.parentElement;
        if(isOrigin) {
          this.originFileList = this.originFileList.filter((ele) => {
            return ele.id !== xButton.fileId;
          });
        } else {
          this.newFileList = this.newFileList.filter((ele) => {
            return ele.id !== xButton.fileId;
          });
        }
        if(this.originFileList.length === 0 && this.newFileList.length === 0) {
          this.reduceBox();
        }
        frame.remove();
      });
      return xButton;
    },
    createNewImage(file) {
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
    // 추가하려는 파일이 존재하면 붙여준다.
    updateFile() {
      const inputDOM = document.querySelector('#edit-media-file');
      const editFileBox = document.querySelector('.edit-file-box');
      this.extendBox();
      if(inputDOM.files.length !== 0) {
        for(let i = 0; i < inputDOM.files.length; i++) {
          const file = inputDOM.files[i];
          const fileId = this.newFileIdCounter++;
          const image = this.createNewImage(file);
          const imageWrap = this.createImageWrap();
          const xButton = this.createXButton(fileId, false);
          this.addNewFileList(fileId, file);
          imageWrap.appendChild(xButton);
          imageWrap.appendChild(image);
          editFileBox.appendChild(imageWrap);
        }
      } else {
        this.reduceBox();
      }
    },
    addNewFileList(fileId, file) {
      this.newFileList.push({
        id: fileId,
        file: file,
      });
    },
    extendBox() {
      const editFileBox = document.querySelector('.edit-file-box');
      const textarea = document.querySelector('.edit-textarea');
      editFileBox.style.display = 'block';
      editFileBox.style.visibility = 'visible';
      textarea.style.borderBottomWidth = '1px';
      textarea.style.borderBottomStyle = 'solid';
      textarea.style.borderBottomColor = 'transparent';
    },
    reduceBox() {
      const editFileBox = document.querySelector('.edit-file-box');
      const textarea = document.querySelector('.edit-textarea');
      editFileBox.style.display = 'none';
      editFileBox.style.visibility = 'hidden';
      textarea.style.borderBottomWidth = '1px';
      textarea.style.borderBottomStyle = 'solid';
      textarea.style.borderBottomColor = '#d7d7d7';
    },
    async edit() {
      this.editLoading = true;
      let   filenameList = [];
      const inputDOM              = document.querySelector('#edit-media-file');
      const isTextModified        = this.contentText !== this.editTextContent;
      const isOriginImageModified = this.originFileList.length !== this.contentFilenameList.length;
      const isImageAdded          = this.newFileList.length !== 0;
      let   isImageListUpdated    = false;

      let loadingTimeoutId = setTimeout(async () => {
        if(isTextModified) {
          await axios.put(`/api/posts/${this.contentSerial}/contents`, {
            params: {
              id: this.contentSerial,
            },
            data: {
              contents: this.editTextContent,
            },
          });
        }
        if(isOriginImageModified) {
          isImageListUpdated = true;
        }
        this.originFileList.forEach((ele) => {
          filenameList.push({ filename: ele.filename });
        });
        if(isImageAdded) {
          let formData = new FormData();
          this.newFileList.forEach((ele) => {
            filenameList.push({ filename: ele.file.name });
            formData.append(inputDOM.name, ele.file);
          });
          try {
            await axios.post('/api/upload',
              formData, {
                timeout: 5000,
              });
          } catch (err) {
            console.error(err);
          }
          isImageListUpdated = true;
        }
        if(isImageListUpdated) {
          await axios.put(`/api/posts/${this.contentSerial}/images`, {
            params: {
              id: this.contentSerial,
            },
            data: {
              images: filenameList,
            }
          });
        }
        await this.$store.dispatch('tweet/getTimelines');
        this.editLoading = false;
        this.showEditor = false;
        this.newFileList = [];
      }, 500);
      loadingTimeoutId = null;
    },
    async remove() {
      this.removeLoading = true;
      let loadingTimeout = setTimeout(async () => {
        await axios.delete(`/api/posts/${this.contentSerial}`, {
          params: {
            id: this.contentSerial,
          },
        });
        await this.$store.dispatch('tweet/getTimelines');
        this.removeLoading = false;
        this.showEditor = false;
      }, 500);
      loadingTimeout = null;
    }
  },
}
</script>
<style scoped>
  /* Mobile Device */
  @media screen and (max-width: 425px) {
    .main-wrap .content .content__timeline .timeline-list__list .tweet-content,
    .main-wrap .profile-wrap .profile-wrap__bottom-section .profile-wrap__bottom-section__timeline .timeline-list__list .tweet-content {
      width: 100%;
      margin: 0;
    }
    .main-wrap .content .content__timeline .timeline-list__list .tweet-content .tweet-content__header,
    .main-wrap .profile-wrap .profile-wrap__bottom-section .profile-wrap__bottom-section__timeline .timeline-list__list .tweet-content .tweet-content__header {
      width: 100%;
    }
    .main-wrap .content .content__timeline .timeline-list__list .tweet-content .tweet-content__action .tweet-content__action__list,
    .main-wrap .profile-wrap .profile-wrap__bottom-section .profile-wrap__bottom-section__timeline .timeline-list__list .tweet-content .tweet-content__action__list {
      padding: 0;
    }
  }
  /* Table Device */
  @media screen and (min-width: 426px) and (max-width: 1024px) {
    .main-wrap .content .content__timeline .timeline-list__list .tweet-content {
      width: 90%;
    }
    .main-wrap .profile-wrap .profile-wrap__bottom-section .profile-wrap__bottom-section__timeline .timeline-list__list .tweet-content {
      width: 90%;
    }
    .main-wrap .content .content__timeline .timeline-list__list .tweet-content .tweet-content__header {
      width: 100%;
    }
    .main-wrap .content .content__timeline .timeline-list__list .tweet-content .tweet-content__action .tweet-content__action__list {
      padding: 0;
    }
  }
  .tweet-content {
    width: 506px;
    height: auto;
    margin-left: 58px;
  }
  .tweet-content__header--nickname {
    font-weight: bold;
    font-size: 14px;
    color: #14171a;
  }
  .tweet-content__header--date {
    font-size: 14px;
    color: #657786;
  }
  .tweet-content__header--edit {
    font-size: 12px;
    font-weight: normal;
    color: #657786;
    float: right;
  }
  .tweet-content__header--edit:hover {
    text-decoration: underline;
  }
  .tweet-content__body {
    width: 100%;
  }
  .tweet-content__body--p--base {
    margin: 0;
    width: 100%;
    word-wrap: break-word;
  }

  .tweet-content__body--p--content {
    white-space: pre-wrap;
    color: #14171a;
    font-size: 14px;
    line-height: 20px;
  }
  .button--svg {
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
  }
  .button--svg--common {
    width: 18px;
    height: 18px;
    fill: #657786;
  }
  .button--svg--common:hover {
    fill: #1da1fe
  }
  .tweet-content__action {
    padding-top: 1px;
    width: 100%;
    height: 30px;
  }
  .tweet-content__action__list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 300px;
    font-size: 0;
    height: 18px;
    line-height: 1;
    margin-bottom: 2px;
    margin-top: 10px;
  }

  .edit-header {
    /*color: #1da1f2;*/
    color: #666666;
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
  .button--cancel:hover, .button--remove:hover {
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
    min-height: 200px;
    border-bottom: 1px solid #d7d7d7;
  }

  /* input media */
  .media__container {
    padding: 0;
    display: inline-block;
    width: 35px;
    height: 35px;
    border-radius: 5px;
    overflow: hidden;
    z-index: 1000;
  }
  .media__container:hover {
    box-shadow: inset 0 0 1px #ccd6dd;
    background-color: rgba(210, 202, 214, 0.1);
  }

  .edit-file-box {
    display: none;
    visibility: hidden;
    background-color: #fff;
    border: 1px solid #d7d7d7;
    border-radius: 5px;
    width: 100%;
    height: auto;
    margin-bottom: 5px;
    padding: 10px;
    box-sizing: border-box;
  }

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
    color: #a9a6ac;
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
</style>
