<template>
  <div class="-grid-cell-component">
    <div
      class="-grid-cell-text-area"
      style="width: 100%"
    >
      <div class="-grid-cell-text-area__label-container">
        <!-- 업로드 완료된 파일이라면 다운로드 링크가 보이도록 -->
        <div
          v-if="isUploadedFile()"
          class="-button"
        >
          <button 
            :class="['-button__item', '-button__item-link', getFileExtensionIconClass(fileInfo.fileExtensionName)]"
            @click="downloadSingleFile"
          >
            {{ fileInfo.fileName }}({{ fileSizeFormat(fileInfo.fileSize) }})
          </button>
        </div>
        <!-- 업로드 완료되지 않은 파일에 대한 처리 -->
        <template
          v-else
        >
          <!-- 첨부파일이 존재하면 파일명과 파일사이즈 표시 -->
          <sui-input-label
            v-if="fileInfo.fileName"
            :class="[getFileExtensionIconClass(fileInfo.fileExtensionName)]"
            :label="fileInfo.fileName + '(' + fileSizeFormat(fileInfo.fileSize) + ')'"
            :vertical="false"
            style="width:100%; height: 100%"
          />
          <!-- 첨부파일이 없을 경우 - {0}을 첨부해 주세요. -->
          <span
            v-else
            class="preview"
          >
            <!--eslint-disable-next-line-->
            {{ attachPossibilityExtensionCode|convertFileExtCodeMessage }}
          </span>
        </template>
      </div>
      <button
        class="-grid-cell-text-area__button"
        :disabled="disabled"
        @click="onButtonClicked"
      >
        {{ buttonLabel }}
      </button>
    </div>

    <input
      v-show="false"
      ref="inputFileType"
      type="file"
      accept="*"
      class="input-file"
      title=" "
      @change="onFilesChange($event.target.files)"
    >
  </div>
</template>

<script>

export default {
  name: 'cell-attach-file-button', // eslint-disable-line vue/name-property-casing
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
    convertFileExtCodeMessage(value) {
      let _message = utils.getMessageById('MSG_ALT_ATTH_FILE');
      switch (value) {
        case 'ALL':
          _message = _message.replace('{0}', '');
          break;
        case 'PDF':
          _message = _message.replace('{0}', utils.getMessageById('MSG_TXT_DOC'));
          break;
        case 'IMG':
          _message = _message.replace('{0}', utils.getMessageById('MSG_TXT_IMG'));
          break;
        default:
          _message = _message.replace('{0}', '');
          break;
      }
      return _message;
    },
  },
  props: {
    // 컴포넌트를 사용하는 페이지ID
    pageId: {
      type: String,
      required: true,
      default() {
        return '';
      },
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      },
    },
    readonly: {
      type: Boolean,
      default() {
        return false;
      },
    },
    attachPossibilityExtensionCode: {
      type: String,
      // required: true,
      default() {
        return '';
      },
    },
  },
  data() {
    return {
      fileInfo: {},
    };
  },
  computed: {
    buttonLabel() {
      let retStr = '';

      if (!utils.isEmpty(this.fileInfo.realityFilePath) && this.fileInfo.file == null) {
        retStr = utils.getMessageById('MSG_BTN_DEL');
      } else if (utils.isEmpty(this.fileInfo.fileName)) {
        retStr = utils.getMessageById('MSG_BTN_SCH_FILE');
      } else {
        retStr = utils.getMessageById('MSG_BTN_DEL');
      }
      return retStr;
    },
  },
  methods: {
    buttonClasses() {
      if (this.isUploadedFile()) {
        return '-button__item-link';
      }
      return '';
    },
    resetFileInfo() {
      this.fileInfo = {
        fileName: '',
        fileSize: '',
        fileExtensionName: '',
        arrayalOrder: 1,
        file: null,
        realityFilePath: '',
      };
    },
    isUploadedFile() {
      let retVal = false;
      if (!utils.isEmpty(this.fileInfo.realityFilePath) && this.fileInfo.file == null) {
        retVal = true;
      }
      return retVal;
    },
    onButtonClicked() {
      if (this.isUploadedFile()) {
        this.resetFileInfo();
      } else if (utils.isEmpty(this.fileInfo.fileName)) {
        this.selectFile();
      } else {
        this.resetFileInfo();
      }
      this.$emit('fileChanged', this.fileInfo);
    },
    /**
     * input type file의 click 이벤트를 발생시켜 file browser 창을 연다.
     *
     * @function selectFile
     * @param {None}
     * @return {None}
     */
    selectFile() {
      this.$refs.inputFileType.click();
    },
    /**
     * input type file의 change 이벤트 핸들러
     * 서버의 temp까지 전송한다.
     * @function onFilesChange
     * @param  {Array} realFile : 선택한 파일
     * @return  {String} :
     */
    onFilesChange(realFile) {

      if (!this.checkFileType(realFile)) {
        const extList = this.getFileExtWhiteList(this.attachPossibilityExtensionCode);
        // 허용 가능한 확장자({0})의 파일을 추가하시기 바랍니다.
        // eslint-disable-next-line
        utils.messageBox('warning', `${utils.getMessageById('MSG_TXT_EXTS')} ${utils.getMessageById('MSG_BTN_CFRM')}`, utils.strFormat(utils.getMessageById('MSG_ALT_ADD_NCELL_EXTS_FILE'), extList.join(', ')));

        // 동일한 파일을 연속 선택시 change 이벤트가 발생하지 않는 문제 해결
        this.$refs.inputFileType.type = '';
        this.$refs.inputFileType.type = 'file';

        realFile.preventDefault();
        // return false;
      }

      const _re = /^.+\.(\w*$)/;
      const _ext = _re.exec(realFile[0].name);

      this.fileInfo.fileName = realFile[0].name;
      this.fileInfo.fileSize = realFile[0].size;
      this.fileInfo.fileExtensionName = _ext.length > 1 ? _ext[1] : '';
      this.fileInfo.arrayalOrder = 1;
      this.fileInfo.file = realFile[0];
      this.fileInfo.realityFilePath = '';

      // 파일 선택하자마자 바로 전송
      this.uploadFile();

      // 동일한 파일을 연속 선택시 change 이벤트가 발생하지 않는 문제 해결
      this.$refs.inputFileType.type = '';
      this.$refs.inputFileType.type = 'file';
      // document.querySelector(`input[name='${this.inputTypeFileName}']`).value = '';
    },
    /**
     * 파일 업로드 실행
     * @function uploadFiles
     * @return {Object} Promise? TODO:
     */
    uploadFile() {
      const formData = new FormData();
      formData.append('files', this.fileInfo.file);

      const params = {
        path: {
          'target-path': 'temp', // 임시 디렉토리로 파일전송
        },
        data: formData,
      };

      // upload data to the server

      http.request(this.pageId, 'DTS_CMZ_00041', params).then(res => {
        // realityFilePath 맵핑
        this.fileInfo.realityFilePath = res.data[0].serverFileName;
      }).catch(err => {
        // 에러 발생시 공통 팝업이 뜨게 되므로 아래 팝업은 주석처리
        // utils.messageBox('error', err.message);
        this.resetFileInfo();
        console.log('cellAttachFileButton.vue.uploadFile.catch.err=');
        console.log(err);
      });
    },
    checkFileType(files) {
      let rtnVal = true;
      const _re = /^.+\.(\w*$)/; // 파일 확장자 추출용 정규표현식
      for (let i = 0; i < files.length; i += 1) {
        const reExec = _re.exec(files[i].name);
        const extList = this.getFileExtWhiteList(this.attachPossibilityExtensionCode);
        if (!extList.includes(reExec[1].toUpperCase())) {
          rtnVal = false;
          break;
        }
      }
      return rtnVal;
    },
    /**
     * 첨부할 파일의 허용가능한 확장자 목록을 반환
     * @function getFileExtWhiteList
     * @param {String} extCode: 첨부항목의 attachPossibilityExtensionCode
     * @returns {Array}
     */
    getFileExtWhiteList(extCode) {
      const configValue = utils.getConfigurationValue(`CFG_CMD_ATTH_PSBL_EXTS_${extCode}`);
      if (utils.isEmpty(configValue)) {
        console.log('첨부가능 확장자에 대한 config 를 찾을 수 없습니다.');
      }
      return configValue.replace(/\s+/g, '').toUpperCase().split(',');
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
          serverFileName: this.fileInfo.realityFilePath,
          originalFileName: this.fileInfo.fileName,
        },
        responseType: 'arraybuffer',
      }).then(res => {
        utils.downloadBlob(res, this.fileInfo.fileName);
      });
    },
    setValue(valueObj) {
      if (utils.isEmpty(valueObj)) {
        this.resetFileInfo();
      } else {
        this.fileInfo = valueObj;
      }
    },
    /**
     * 파일 사이즈를 KB, MB 단위로 계산해서 단위와 함께 반환함
     * @function fileSizeFormat
     * @param {Number} size: 변환대상 숫자
     * @returns {String} "123.45 KB" or "6.78 MB"
     */
    fileSizeFormat(value) {
      let _unit = 'KB';
      let _value = 0;

      if (utils.isNumber(value * 1)) {
        _value = value * 1 / 1024;

        if (_value >= 1000) {
          _value = _value * 1 / 1024;
          _unit = 'MB';
        }
      }
      return `${utils.numberFormat(_value, 2)} ${_unit}`;
    },
    /**
     * 파일 확장자를 인수로 받아 그에 맞는 icon에 연결된 class 를 반환한다.
     * @function getFileExtensionIconClass
     * @param {String} fileExtension 파일확장자
     * @returns {String}
     */
    getFileExtensionIconClass(fileExtension) {
      if (utils.isEmpty(fileExtension)) {
        return '';
      }
      const fileExt = fileExtension.toUpperCase();
      const imageExtArr = utils.getConfigurationValue('CFG_CMD_ATTH_PSBL_EXTS_IMG').replace(/\s/g, '').toUpperCase().split(',');
      let retVal = '';
      if (utils.indexOf(['XLSX', 'XLSM', 'XLTX', 'XLTM', 'XLS', 'XLT'], fileExt) >= 0) {
        retVal = 'excel';
      } else if (utils.indexOf(imageExtArr, fileExt) >= 0) {
        retVal = 'image';
      } else if (utils.indexOf(['PPTX', 'PPTM', 'PPT'], fileExt) >= 0) {
        retVal = 'ppt';
      } else if (utils.indexOf(['DOC', 'DOCX', 'DOCM'], fileExt) >= 0) {
        retVal = 'word';
      } else if (utils.indexOf(['PDF'], fileExt) >= 0) {
        retVal = 'pdf';
      } else {
        retVal = 'etc';
      }
      return retVal;
    },
    /**
     * 스크립틀릿에서는 utils 를 사용할 수 없기 때문에 그것 대체용으로
     */
    getConfigValue(config) {
      return utils.getConfigurationValue(config);
    },
  },
};
</script>

<style scoped>
</style>
