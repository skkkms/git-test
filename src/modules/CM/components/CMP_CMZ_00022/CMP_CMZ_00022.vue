<template>
  <div class="dp_flex">
    <div class="box1">
      <template v-if="thumbnail.imgSrc">
        <img
          :src="thumbnail.imgSrc"
          style="cursor: pointer;"
          @click="onClickThumbnail"
        >
      </template>
      <template v-else>
        <a
          v-if="fileUid.trim() !==''"
          class="yespic"
          style="cursor: pointer;"
          @click="onClickNoThumbnail"
        >
          {{ noThumbnailText }}
        </a>
        <span v-else>
          <a class="nopic">
            </a>
        </span>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CmpSingleThumbnailViewer',
  props: {
    // 컴포넌트를 사용하는 페이지ID
    pageId: {
      type: String,
      required: true,
    },
    fileUid: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      thumbnail: {
        data: null,
        imgSrc: '',
      },
      noThumbnailText: '', // utils.getMessageById('MSG_TXT_NO_THUMBNAIL'),
      noFileUidText: 'No File',
    };
  },
  watch: {
    fileUid(value) {
      if(value.trim()) {
        this.downloadThumbnail();
      }
    },
  },
  methods: {
    /**
     * 썸네일 click event handler
     * real size 이미지를 다운받아서 사진보기 팝업을 띄우면서 초기값으로 담아준다.
     * @function onClickThumbnail
     * @param {None}
     * @returns {None}
     */
    onClickThumbnail() {
      this.downloadImage().then(file => {
        // PGE_CMZ_00040
        utils.openLayerPopup('PGE_CMZ_00014', () => {
        }, {
          pageInitialData: { file },
          size: 'lg',
        });
      });
    },
    onClickNoThumbnail() {
      this.onClickThumbnail();
    },
    /**
     * image thumbnail 다운로드하여 imgSrc 로 바인딩 함
     * @function downloadThumbnail
     * @param {None}
     * @returns {None}
     */
    downloadThumbnail() {
      const that = this;

      http.request(this.pageId, 'DTS_CMZ_00188', {
        path: {
          'target-path': 'storage',
        },
        query: {
          fileUid: this.fileUid,
        },
        responseType: 'arraybuffer',
      }).then(res => {
        const reader = new FileReader();
        const blob = new Blob([res.data], { type: res.headers['content-type'] });

        reader.onload = () => {
          this.thumbnail.imgSrc = reader.result;
          this.$emit('thumbnail-downloaded', utils.clone(that.thumbnail));
        };
        reader.onabort = () => {
          console.log(reader.error);
        };

        reader.readAsDataURL(new File([blob], 'not_required_exact_filename_so_here_make_dummy_filename'));
      }).catch(err => {
        this.thumbnail.imgSrc = '';
        console.error(err);
      });
    },
    /**
     * @function downloadImage
     * @param {None}
     * @returns {Promise}
     */
    downloadImage() {
      return new Promise((resolve, reject) => {
        http.request(this.pageId, 'DTS_CMZ_00068', {
          path: {
            'target-path': 'storage',
          },
          query: {
            serverFileName: this.fileUid,
            originalFileName: ' ',
          },
          responseType: 'arraybuffer',
        }).then(res => {
          const blob = new Blob([res.data], { type: res.headers['content-type'] });
          resolve(blob);
        }).catch(err => {
          reject(err);
        });
      });
    },
  },
};
</script>

<style scoped>
</style>