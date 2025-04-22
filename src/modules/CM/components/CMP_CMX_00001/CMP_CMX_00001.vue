<template>
  <!-- <div class="mr15"> -->
  <div style="width:100%;">
    <div v-if="attachFileList.length > 0" style="display:inline;"> 
      <a
        href="#none"
        style="color:#60a3ef;text-decoration: underline;"
        :class="getApkFileExtensionIconClass(attachFileList[0].fileExtensionName)"
        @click="onClickApkFileName(attachFileList[0])"
      >{{ attachFileList[0].fileName }}</a>
    </div>
    <div style="float:right;display:inline; width:auto;">
      <div class="info" style="padding-right:5px">
        ({{ totalSize | convertToFileSizeFormat }} / {{ attachRestrictionSize }} MB)
      </div>
      <input
        v-show="false"
        ref="inputFileType"
        type="file"
        accept="*"
        title=""
        :disabled="disabled"
        @change="onFilesChange($event.target.name, $event.target.files)"
      >
      <sui-button
        v-show="showAddDeleteBtn && enableAdd "
        type="button"
        class="btn_innerTbl_border"
        :disabled="disabled"
        @click="onSelectFile"
      >
        {{ $t('MSG_BTN_UPLOAD') }}
      </sui-button>
      <sui-button
        v-show="showAddDeleteBtn "
        type="button"
        class="btn_innerTbl_border"
        :disabled="disabled"
        @click="onDeleteFile"
      >
        {{ this.$t('MSG_BTN_DEL') }}
      </sui-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CmpUploadDwnldAttach',
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
    // 이 컴포넌트를 사용하는 페이지ID
    pageId: {
      type: String,
      required: true,
      default() {
        return '';
      },
    },
    // 첨부그룹ID
    attachGroupId: {
      type: String,
      required: true,
      default: '',
    },
    // 첨부문서ID
    attachDocumentId: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      },
    },
    // show or hide 추가/삭제 버튼
    showAddDeleteBtn: {
      type: Boolean,
      default() {
        return true;
      },
    },
    // show or hide  위/아래 화살표 버튼
    showUpDownArrowBtn: {
      type: Boolean,
      default() {
        return true;
      },
    },
    // 이미지 뷰어 실행 제어
    enableImageViewer: {
      type: Boolean,
      default() {
        return true;
      },
    },
    // 파일 신규추가 버튼 Vislble, Drag/Drop 기능 제어
    enableAdd: {
      type: Boolean,
      default() {
        return true;
      },
    },
    // 파일 찾기를 통해 입력되는 파일만 삭제 가능
    deletableOld: {
      type: Boolean,
      default() {
        return true;
      },
    },
    showDnHistoryBtn: {
      type: Boolean,
      default() {
        return false;
      },
    },
    myFileYn: {
      type: String,
      default() {
        return 'N';
      },
    },
    initialAttachGroupItemList: {
      type: Array,
      default() {
        return [];
      },
    },
    customAttachRestrictionSize: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      checkedAll: false, // 전체 checkbox
      attachFileList: [],
      attachRestrictionSize: 0, // 총 파일 사이즈 제한 크기
      originalAttachRestrictionSize: 0,
      downloadReasonInputYn: null, // 다운로드 사유 입력여부
      downloadHistoryManagementYn: null, // 다운로드 이력관리 여부
      attachGroupItemList: [], // 조회된 첨부그룹항목 목록에 대한 참조값 저장
      showModalImgBox: false,
      isSearching: false, // 조회 진행 중 flag
      isExpand: true,
    };
  },
  computed: {
    totalSize() {
      let sum = 0;
      utils.forEach(this.attachFileList, file => {
        sum += file.fileSize;
      });
      return sum;
    },
  },
  watch: {
    attachGroupId(value) {
      this.searchAttachGroupItemList();
    },
    attachDocumentId(value) {
      this.$nextTick(() => {
        this.searchAttachGroupItemList();
      });
    },
    customAttachRestrictionSize(value) {
      this.attachRestrictionSize = Math.min(this.originalAttachRestrictionSize, value); // 총 파일 사이즈 제한 크기
    },
  },
  mounted() {
    // this.reset();
    if (this.initialAttachGroupItemList.length > 0) {
      this.setAttachGroupItemList();
    } else {
      this.searchAttachGroupItemList();
    }
  },
  methods: {
    reset() {
      // reset form to initial state
      this.attachFileList = [];
      this.attachRestrictionSize = 0; // 총 파일 사이즈 제한 크기
      this.downloadReasonInputYn = null; // 다운로드 사유 입력여부
      this.downloadHistoryManagementYn = null; // 다운로드 이력관리 여부
      this.attachGroupItemList = []; // 조회된 첨부그룹항목 목록에 대한 참조값 저장
      this.showModalImgBox = false;
      this.isSearching = false; // 조회 진행 중 flag
    },
    /**
     * 파일 확장자를 인수로 받아 그에 맞는 icon에 연결된 class 를 반환한다.
     * @function getApkFileExtensionIconClass
     * @param {String} fileExtension 파일확장자
     * @returns {String}
     */
    getApkFileExtensionIconClass(fileExtension) {
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
    onClickCollapse() {
      this.isExpand = false;
    },
    onClickExpand() {
      this.isExpand = true;
    },
    /**
     * fdp-check 의 input event handler
     * 현재 용도는 전체 checkbox 의 checked 값을 결정하기 위한 용도
     * 넘어온 매개변수는 사용하지 않음
     * @function onCheckBoxInput
     * @param {None}
     * @returns {none}
     */
    onCheckBoxInput() {
      this.$forceUpdate();
      this.setCheckedAll();
    },
    /**
     * "전체" checkbox 의 input event handler
     * 업로드 파일이 없을 경우엔 전체 checkbox의 값이 false
     * 이외엔 "전체" checkbox의 checked 값에 따라 모든 파일 정보 check/uncheck
     * @function onCheckBoxAllInput
     * @param {Boolean} checked: 현재 check 상태 값
     * @returns {None}
     */
    onCheckBoxAllInput(checked) {
      if (this.attachFileList.length > 0) {
        this.attachFileList.forEach(itm => {
          itm.checkBoxChecked = checked;
        });
      } else {
        this.checkedAll = false;
      }
    },
    /**
     * "전체" checkbox의 checked 를 결정하는 함수
     * 개별 파일을 check/uncheck 할 때마다, 파일을 추가/삭제할 때마다 필요
     * @function setCheckedAll
     * @returns {None}
     */
    setCheckedAll() {
      if (this.attachFileList.length === 0) {
        this.checkedAll = false;
      } else {
        this.checkedAll = this.attachFileList.every(itm => itm.checkBoxChecked);
      }
    },
    /**
     * input type file의 click 이벤트를 발생시켜 file browser 창을 연다.
     *
     * @function onSelectFile
     * @return  none
     */
    onSelectFile() {
      this.$refs.inputFileType.click();
    },
    /**
     * input type file의 change 이벤트 핸들러
     * file browser 에서 파일을 선택한 순간 해당 파일 정보를 기존 파일 목록에 추가한다.
     *
     * @function onFilesChange
     * @param  {String} fileNm TODO : 이 파라미터는 삭제?
     * @param  {Array} fileList : 선택한 파일(들)
     * @return  {String}
     */
    onFilesChange(fileNm, fileList) {
      if (utils.isEmpty(this.attachGroupItemList)) {
        utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), `attachGroupId(${this.attachGroupId})로 정상적인 정보를 가져온 이후에 파일첨부가 가능합니다.`);
        // 동일한 파일을 연속 선택시 change 이벤트가 발생하지 않는 문제 해결
        this.$refs.inputFileType.type = '';
        this.$refs.inputFileType.type = 'file';
        //return false;
      }
      if (!this.checkIsRightApkFileType(fileList)) {
        const extList = this.getApkFileExtWhiteList(this.attachGroupItemList[0].attachPossibilityExtensionCode);
        // 허용 가능한 확장자({0})의 파일을 추가하시기 바랍니다.
        // eslint-disable-next-line
        utils.messageBox('warning', `${this.$t('MSG_TXT_EXTS')} ${this.$t('MSG_BTN_CFRM')}`, utils.strFormat(this.$t('MSG_ALT_ADD_NCELL_EXTS_FILE'), extList.join(', ')));
        // 동일한 파일을 연속 선택시 change 이벤트가 발생하지 않는 문제 해결
        this.$refs.inputFileType.type = '';
        this.$refs.inputFileType.type = 'file';
        //return false;
      }
      if (!this.checkIsUnderApkSizeLimit(fileList)) {
        // 선택한 파일(들) 용량을 합한 총 파일 용량이 제한 용량("{0}")을 초과했습니다.
        // eslint-disable-next-line
        utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), utils.strFormat(this.$t('MSG_ALT_ECXD_TTQTY_NCELL'), `${utils.numberFormat(this.attachRestrictionSize,2)} MB`));
        // 동일한 파일을 연속 선택시 change 이벤트가 발생하지 않는 문제 해결
        this.$refs.inputFileType.type = '';
        this.$refs.inputFileType.type = 'file';
        //return false;
      }
    
      const that = this;
      // handle file changes
      let bDup = false;
      const _file = fileList[0];
      const _re = /^.+\.(\w*$)/;
      const _ext = _re.exec(_file.name);
      if (!utils.isEmpty(that.attachFileList)) {
        if (_file.name === that.attachFileList[0].fileName) {
          bDup = true;
          that.attachFileList[0].fileName = _file.name;
          that.attachFileList[0].fileSize = _file.size;
          that.attachFileList[0].fileExtensionName = _ext.length > 1 ? _ext[1] : '';
          that.attachFileList[0].arrayalOrder = 'autoNumberingColumn';
          that.attachFileList[0].file = _file;
          that.attachFileList[0].realityFilePath = ''; // 명이 동일한 파일을 선택한 경우에 다시 올린다.
          that.attachFileList[0].fileUid = '';
        }
      }
      if (!bDup) {
        console.log('Test4');
        const emptyDataFieldsObj = that.getEmptyApkFileInfoObj();
        emptyDataFieldsObj.checkBoxChecked = false;
        emptyDataFieldsObj.fileName = _file.name;
        emptyDataFieldsObj.fileSize = _file.size;
        emptyDataFieldsObj.fileExtensionName = _ext.length > 1 ? _ext[1] : '';
        emptyDataFieldsObj.arrayalOrder = 'autoNumberingColumn';
        emptyDataFieldsObj.file = _file;
        emptyDataFieldsObj.fileUid = '';
        that.attachFileList = [];
        that.attachFileList.push(emptyDataFieldsObj);
        //that.attachFileList.push(emptyDataFieldsObj);
        this.$forceUpdate();
      }
      this.uploadApkFiles();

      // 동일한 파일을 연속 선택시 change 이벤트가 발생하지 않는 문제 해결
      // document.querySelector("input[type='file']").value = '';
      // document.querySelector(`input[name='${this.inputTypeFileName}']`).value = '';
      this.$refs.inputFileType.type = '';
      this.$refs.inputFileType.type = 'file';
    },
    getApkFileExtension(filename) {
      const _re = /^.+\.(\w*$)/; // 파일 확장자 추출용 정규표현식
      const reExec = _re.exec(filename);
      let retExt = '';
      if (reExec.test(filename)) {
        retExt = retExec[1];
      }
      return retExt;
    },
    /**
     * 파일 확장자가 적합한 확장자인지 검사
     * @function checkIsRightApkFileType
     * @param {Array}
     * @returns {Boolean}
     */
    checkIsRightApkFileType(files) {
      let rtnVal = true;
      const _re = /^.+\.(\w*$)/; // 파일 확장자 추출용 정규표현식
      for (let i = 0; i < files.length; i += 1) {
        const reExec = _re.exec(files[i].name);
        if (utils.isEmpty(reExec)) {
          rtnVal = false;
          break;
        }
        const extList = this.getApkFileExtWhiteList(this.attachGroupItemList[0].attachPossibilityExtensionCode);
        if (!extList.includes(reExec[1].toUpperCase())) {
          rtnVal = false;
          break;
        }
      }
      return rtnVal;
    },
    /**
     * 첨부할 파일의 허용가능한 확장자 목록을 반환
     * @function getApkFileExtWhiteList
     * @param {String} extCode: 첨부항목의 attachPossibilityExtensionCode
     * @returns {Array}
     */
    getApkFileExtWhiteList(extCode) {
      const configValue = utils.getConfigurationValue(`CFG_CMD_ATTH_PSBL_EXTS_${extCode}`);
      if (utils.isEmpty(configValue)) {
        console.error('첨부가능 확장자에 대한 config 를 찾을 수 없습니다.');
      }
      return configValue.replace(/\s+/g, '').toUpperCase().split(',');
    },
    /**
     * 첨부 최대 용량을 넘었는지 check 하여 boolean을 반환
     * @function checkIsUnderApkSizeLimit
     * @param {Array} files
     * @returns {Boolean}
     */
    checkIsUnderApkSizeLimit(files) {
      let preAttachSize = 0;
      utils.forEach(files, file => {
        preAttachSize += file.size;
      });
      // eslint-disable-next-line
      return this.attachRestrictionSize === 0 || ((this.totalSize + preAttachSize) < this.attachRestrictionSize * 1024 * 1024);
    },
    /**
     * 파일 업로드 실행
     * 위의 두가지 경우를 고려하여 파일전송시 이미 올라간 파일(realityFilePath 에 값이 있는 놈)을
     * 제외하고 아직 올라가지 않은 파일을 전송해야 함
     * @function uploadFiles
     * @return {Object} Promise? TODO:
     */
    uploadApkFiles() {
      const _allFiles = this.attachFileList;
      // 업로드 대상 파일 배열
      const _targetFiles = [];
      _allFiles.forEach(curFile => {
        if (utils.isEmpty(curFile.realityFilePath)) {
          _targetFiles.push(utils.cloneDeep(curFile));
        }
      });
      if (_targetFiles.length > 0) {
        // handle file changes
        const formData = new FormData();
        _targetFiles.forEach((fileInfo, index) => {
          formData.append('files', fileInfo.file);
        });

        const params = {
          path: {
            'target-path': 'temp', // 임시 디렉토리로 파일전송
          },
          data: formData,
        };

        // upload data to the server
        http.request(this.pageId, 'DTS_CMZ_00041', params).then(res => {
          // realityFilePath 맵핑
          res.data.forEach(rtnFile => {
            _allFiles.forEach(curFile => {
              if (rtnFile.originalFileName == curFile.fileName) {
                curFile.realityFilePath = rtnFile.serverFileName;
              }
            });
          });
          console.log('전송파일정보:', res.data);
          return true;
          // TODO: 메시지리소스 등록해야 함
        }).catch(err => {
          // 파일전송 실패
          // 대상 파일들 삭제
          for (let i = _allFiles.length - 1; i >= 0; i--) {
            _allFiles.splice(i, 1);
          }
          utils.messageBox('error', this.$t('MSG_BTN_CFRM'), err.message);
        });
      }
      // "업로드 대상 파일이 없습니다."
      utils.messageBox('alert', this.$t('MSG_BTN_CFRM'), this.$t('MSG_TXT_NO_UPLOAD_FILE'));
      return false;
    },
    /**
     * 첨부그룹ID 와 첨부문서ID 에 해당하는 목록정보를 조회한 후 결과를 테이블에 표시한다.
     * @function searchAttachGroupItemList
     * @param {None}
     * @returns {None}
     */
    searchAttachGroupItemList() {
      if(!utils.isEmpty(this.attachGroupId) || utils.isEmpty(this.initialAttachGroupItemList)) {
         http.request(this.pageId, 'DTS_CMZ_00086', {
          path: {
            'attach-group-id': this.attachGroupId,
          },
          query: {
            attachDocumentId: this.attachDocumentId,
          },
        }).then(res => {
          this.attachGroupItemList = [];
          this.attachFileList = [];
          this.attachRestrictionSize = 0;
          this.imagePreviewApplyYn = null;
          this.downloadReasonInputYn = null;
          this.downloadHistoryManagementYn = null;

          if (res.data.length > 0) {
            this.attachGroupItemList = res.data;
            this.attachFileList = this.attachGroupItemList[0].attachFileList;
            this.attachRestrictionSize = Math.min(this.attachGroupItemList[0].attachRestrictionSize, this.customAttachRestrictionSize);
            this.originalAttachRestrictionSize = this.attachGroupItemList[0].attachRestrictionSize;
            this.imagePreviewApplyYn = this.attachGroupItemList[0].imagePreviewApplyYn;
            this.downloadReasonInputYn = this.attachGroupItemList[0].downloadReasonInputYn;
            this.downloadHistoryManagementYn = this.attachGroupItemList[0].downloadHistoryManagementYn;
            this.attachFileList.forEach(itm => {
              itm.checkBoxChecked = false;
              itm.arrayalOrder = 'autoNumberingColumn';
            });
          }
          return true;
        // this.isSearching = false;
        }).catch(err => {
          // this.isSearching = false;
          console.log(err);
        });
      } else if (utils.isEmpty(this.attachGroupId)) {
        console.log('필수값(attachGroupId)이 존재하지 않아 API 호출하지 않습니다.');
        // utils.messageBox("alert","확인","필수값이 존재하지 않습니다.");;
      } else if (!utils.isEmpty(this.initialAttachGroupItemList)) {
        console.log('초기 첨부항목 값이 존재하여 API 호출하지 않습니다.');
        // utils.messageBox("alert","확인","필수값이 존재하지 않습니다.");;
      }
      // this.isSearching = true;
      return false;
    },
    /**
     * attachGroupItemList 을 set 한다.
     * 만약, searchAttachGroupItemList 가 진행중이라면 그 메소드 종료 이후 set을 해야 한다.
     * @function setAttachGroupItemList
     * @param {None}
     * @returns {None}
     */
    setAttachGroupItemList() {
      if (!utils.isEmpty(this.initialAttachGroupItemList)) {
        const that = this;
        that.reset();
        that.attachGroupItemList = utils.cloneDeep(that.initialAttachGroupItemList);
        that.attachFileList = that.attachGroupItemList[0].attachFileList;
        that.attachRestrictionSize = that.attachGroupItemList[0].attachRestrictionSize;
        that.imagePreviewApplyYn = that.attachGroupItemList[0].imagePreviewApplyYn;
        that.downloadReasonInputYn = that.attachGroupItemList[0].downloadReasonInputYn;
        that.downloadHistoryManagementYn = that.attachGroupItemList[0].downloadHistoryManagementYn;

        that.attachFileList.forEach(itm => {
          itm.checkBoxChecked = false;
          itm.arrayalOrder = 'autoNumberingColumn';
        });

        that.initialAttachGroupItemList.splice(0, that.initialAttachGroupItemList.length);
      }
    },
    getAttachFileListInfo() {
      const _tmpFileListInfo = utils.cloneDeep(this.attachFileList);
      _tmpFileListInfo.forEach((itm, index) => {
        itm.arrayalOrder = index + 1; // eslint-disable-line
        itm.attachGroupId = this.attachGroupItemList[0].attachGroupId; // eslint-disable-line
        itm.attachItemId = this.attachGroupItemList[0].attachItemId; // eslint-disable-line
      });
      return _tmpFileListInfo;
    },    
    /**
     * 비어있는 하나의 json object를 리턴한다.
     * dataFields 에 정의된 칼럼 정보 사용
     * @function getEmptyApkFileInfoObj
     * @return {Object}
     */
    getEmptyApkFileInfoObj() {
      return {
        checkBoxChecked: false,
        fileName: '',
        fileSize: '',
        fileExtensionName: '',
        arrayalOrder: 'autoNumberingColumn',
        file: '',
        fileUid: '',
      };
    },
    /**
     * 선택한 파일을 삭제한다.
     * @function onDeleteFile
     * @param {Object} file: 선택한 파일 정보
     * @returns {None}
     */
    onDeleteFile(file) {
      this.attachFileList = [];
    },
    /**
     * 파일명 click event handler
     * 다운로드사유 입력여부가 'Y'이면 다운로드 사유 입력창 띄움
     * @function onClickApkFileName
     * @param {Object} fileInfo
     * @returns
     */
    onClickApkFileName(fileInfo) {
      const that = this;
      if (!['N', 'n'].includes(this.downloadReasonInputYn)) {
        utils.openLayerPopup('PGE_CMZ_00041', result => {
          fileInfo.fileDownloadReasonContent = result;

          if (!utils.isEmpty(result)) {
            that.downloadSingleApkFile(fileInfo).then(() => {
              that.insertApkFileDownloadHistory(fileInfo);
            }).catch(err => {
              console.log(err);
              // utils.messageBox('error', that.$t('MSG_BTN_CFRM'), err);
            });
          }
        },
        {
          size: 'md',
        });
      } else {
        this.downloadSingleApkFile(fileInfo).then(() => {
          if (!['N', 'n'].includes(this.downloadHistoryManagementYn)) {
            this.insertApkFileDownloadHistory(fileInfo);
          }
        }).catch(err => {
          console.log(err);
          // utils.messageBox('error', this.$t('MSG_BTN_CFRM'), err);
        });
      }
    },
    /**
     * @function insertApkFileDownloadHistory
     * @param {Object} fileInfo
     * @returns {None}
     */
    insertApkFileDownloadHistory(fileInfo) {
      const _fileInfo = utils.clone(fileInfo);
      _fileInfo.imgSrc = '';
      _fileInfo.attachGroupId = this.attachGroupId;
      _fileInfo.attachDocumentId = this.attachDocumentId;

      http.request(this.pageId, 'DTS_CMZ_00103', {
        data: _fileInfo,
      }).then(res => {
        console.log(res);
        return Promise.resolve(res);
      }).catch(err => {
        console.log(err);
        Promise.reject(err);
        // utils.messageBox('error', this.$t('MSG_BTN_CFRM'), err.message, () => Promise.reject(err));
      });
    },
    /**
     * 파일 다운로드
     * @function downloadSingleApkFile
     * @param {Object}
     * @returns Promise
     */
    downloadSingleApkFile(rowData) {
      return new Promise((resolve, reject) => {
        http.request(this.pageId, 'DTS_CMZ_00068', {
          path: {
            'target-path': 'storage',
          },
          query: {
            serverFileName: rowData.realityFilePath,
            originalFileName: rowData.fileName,
            myFileYn: this.myFileYn,
          },
          responseType: 'arraybuffer',
        }).then(res => {
          const { fileName } = rowData;
          utils.downloadBlob(res, fileName);
          resolve(res);
        }).catch(err => {
          console.log(err);
          reject(err);
        });
      });
    },
  },
};

</script>
<style scoped>
</style>
