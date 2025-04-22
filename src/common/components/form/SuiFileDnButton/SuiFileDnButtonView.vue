<template>
  <div class="file_wrap">
    <div class="name" >
      <button
        v-if="realityFilePath"
        :class="fileNameClasses()"
        :title="fileName"
        @click="onButtonClicked"
      >
        {{ fileName }}
      </button>
      <div
        v-if="fileName"
        class="info"
      >
        ({{ fileSize | convertToFileSizeFormat }})
      </div>
      <span
        v-else
        style="vertical-align:-20%"
        :title="fileName"
      >
        {{ fileName }}
        <div
          v-if="fileName"
          class="info"
        >
          ({{ fileSize | convertToFileSizeFormat }})
        </div>
      </span>
    </div>
    <div class="button">
      <button
        v-if="realityFilePath"
        class="-button__item"
        :title="msgBtnDload"
        @click="onButtonClicked"
      >
        {{ msgBtnDload }}
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SuiFileDnButton',
  filters: {
    /**
     * 파일 사이즈를 KB, MB 단위로 계산해서 단위와 함께 반환함
     * @function convertToFileSizeFormat
     * @param {Number} size: 변환대상 숫자
     * @returns {String} "123.45 KB" or "6.78 MB"
     */
    convertToFileSizeFormat(value) {
      let unit = ''; // 'KB' or 'MB'
      let resultVal = 0;

      if (value === 0) {
        resultVal = 0;
        unit = 'KB';
      } else if (value < 1024) {
        // 1024 byte 이하이면 항상 1 KB
        resultVal = 1;
        unit = 'KB';
      } else if (value > 1024 * 1024) {
        resultVal = value / (1024 * 1024);
        unit = 'MB';
      } else {
        resultVal = value / (1024);
        unit = 'KB';
      }
      return `${utils.numberFormat(resultVal, 2)} ${unit}`;
    },
  },
  props: {
    // 컴포넌트를 사용하는 페이지ID
    pageId: {
      type: String,
      required: true,
    },
    // 다운로드 대상 파일명
    fileName: {
      type: String,
      default: '',
    },
    // 다운로드 대상 파일사이즈
    fileSize: {
      type: Number,
      default: 0,
    },
    // 다운로드 파일의 서버경로
    realityFilePath: {
      type: String,
      default: '',
    },
    // 파일명 링크 타입(link, sublink)
    type: {
      type: String,
      default: 'link',
    },
    /*
    handler: {
      type: Function,
      default: null,
    },
    */
  },
  data() {
    return {
      msgBtnDload: utils.getMessageById('MSG_BTN_DLOAD'),
    };
  },
  methods: {
    /**
     * 
     * @function fileNameClasses
     * @param {None}
     * @returns {String}
     */
    fileNameClasses() {
      let retClass = '';
      if (utils.isEmpty(this.realityFilePath)) {
        retClass = '';
      } else {
        retClass = '-link__item -link__item-sublink';
      }
      return retClass;
      /*
      if (this.type) {
        return `-button__item-${this.type}`;
      }
      return '';
      */
    },
    onButtonClicked() {
      if (!utils.isEmpty(this.realityFilePath)) {
        this.downloadSingleFile();
      }
    },
    setValue(valueObj) {
      this.fileName = valueObj.fileName;
      this.fileSize = valueObj.fileSize;
      this.realityFilePath = valueObj.realityFilePath;
    },
    /**
     * 파일 다운로드
     * @function downloadSingleFile
     * @returns None
     */
    downloadSingleFile() {
      http.request(this.pageId, 'DTS_CMZ_00068', {
        path: {
          'target-path': 'storage',
        },
        query: {
          serverFileName: this.realityFilePath,
          originalFileName: this.fileName,
        },
        responseType: 'arraybuffer',
      }).then(res => {
        utils.downloadBlob(res, this.fileName);
      });
    },

  },
};
</script>

<style scoped>
</style>
