<template>
  <div class="dp_flex">
    <div class="box1">
      <template v-if="thumbnail.imgSrc">
        <img
          v-bind:style="imageStyle"
          :src="thumbnail.imgSrc"
        >
      </template>
      <template v-else>
        <a
          v-if="filePath.trim() !==''"
          class="noimg"
        >
          {{ noThumbnailText }}
        </a>
        <span v-else>
          {{ noFileUidText }}
        </span>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CmpImageViewer',
  props: {
    // 컴포넌트를 사용하는 페이지ID
    pageId: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: false,
      default: '',
    },
    restrictThumbnailSize: {
      type: Boolean,
      required: false,
      default: false,
    },
    dimensions: {
      type: Object,
      required: false,
      default() {
        return {
          maxHeight: '100px',
          maxWidth: '200px',
        };
      },
    },
  },
  data() {
    return {
      thumbnail: {
        data: null,
        imgSrc: '',
      },
      noThumbnailText: '',
      noFileUidText: 'No File',
    };
  },
  computed: {
    imageStyle() {
      if (this.restrictThumbnailSize) return `max-width:${this.dimensions.maxWidth};max-height:${this.dimensions.maxHeight}; width: auto; height: auto;`;
      return '';
    },
  },
  watch: {
    filePath(value) {
      if (value.trim()) {
        this.downloadThumbnail();
      }
      else {
        this.thumbnail.imgSrc = '';
      }
    },
  },
  mounted() {
      if(this.filePath.trim()) {
        this.downloadThumbnail();
      }
  },  
  methods: {
    /**
     * image thumbnail 다운로드하여 imgSrc 로 바인딩 함
     * @function downloadThumbnail
     * @param {None}
     * @returns {None}
     */
    downloadThumbnail() {
      const that = this;

      http.request(this.pageId, 'DTS_CMZ_00068', {
        path: {
          'target-path': 'storage',
        },
        query: {
          serverFileName: this.filePath,
          originalFileName: ' ',
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
  },
};
</script>

<style scoped>
</style>
