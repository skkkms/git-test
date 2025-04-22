<template>
  <div>
    <div class="comm_gridTop_wrap attach_top">
      <div class="btn_wrapL">
        <sui-checkbox
          v-show="showAddDeleteBtn && showUpDownArrowBtn && deletableOld"
          v-model="checkedAll"
          :disabled="!isExpand || disabled"
          @input="onCheckBoxAllInput($event)"
        />
        <div
          class="totalList"
          style="padding:3px 12px 0 0"
        >
          {{ $t("MSG_TXT_LST_CNT").replace('{0}', attachFileList.length) }}<!--총 7개-->
        </div>
        <sui-button
          v-show="showAddDeleteBtn && enableAdd && !disabled"
          type="button"
          class="comm_btn_gridTop"
          :disabled="!isExpand || disabled"
          @click="onSelectFile"
        >
          {{ $t('MSG_BTN_SCH_FILE') }}<!--파일찾기-->
        </sui-button>
        <sui-button
          v-show="showAddDeleteBtn && !disabled"
          type="button"
          class="comm_btn_gridTop"
          :disabled="!isExpand || disabled"
          @click="deleteSelectedFiles"
        >
          {{ $t('MSG_BTN_DEL') }}<!--삭제-->
        </sui-button>
        <sui-button
          v-show="showUpDownArrowBtn && !disabled"
          type="button"
          class="comm_btn_sort_top"
          :disabled="!isExpand || disabled"
          @click="moveTop"
        />
        <sui-button
          v-show="showUpDownArrowBtn && !disabled"
          type="button"
          class="comm_btn_sort_up"
          :disabled="!isExpand || disabled"
          @click="moveUp"
        />
        <sui-button
          v-show="showUpDownArrowBtn && !disabled"
          type="button"
          class="comm_btn_sort_down"
          :disabled="!isExpand || disabled"
          @click="moveDown"
        />
        <sui-button
          v-show="showUpDownArrowBtn && !disabled"
          type="button"
          class="comm_btn_sort_bottom"
          :disabled="!isExpand || disabled"
          @click="moveBottom"
        />
      </div>
      <div
        v-if="getConfigValue('CFG_CMD_ATTH_ID_DISP_YN') === 'Y'"
        class="hidden"
      >
        &nbsp;&nbsp;{{ ` ${attachGroupId}` }}
      </div>
      <div class="btn_wrapR">
        <sui-button
          v-if="downloadHistoryManagementYn === 'Y' && showDnHistoryBtn"
          type="button"
          class="comm_btn_gridTop"
          style="margin-top:2px;margin-right:5px;"
          :title="$t('MSG_BTN_DLOAD_HIS')"
          @click="onClickShowDnHistoryPopup"
        >
          {{ $t('MSG_BTN_DLOAD_HIS') }}
        </sui-button>
        <div
          v-tooltip-white="{ref: 'tooltipHtml'}"
          class="info_tooltip"
        />
        <div class="info">
          {{ totalSize | convertToFileSizeFormat }} / {{ attachRestrictionSize }} MB
        </div>
        <sui-button
          v-if="isExpand"
          type="button"
          class="btn_top_close"
          @click="onClickCollapse"
        >
          {{ $t('MSG_BTN_CLOSE') }}
        </sui-button>
        <sui-button
          v-else
          type="button"
          class="btn_top_open"
          @click="onClickExpand"
        >
          {{ $t('MSG_BTN_OPEN') }}
        </sui-button>
      </div>
    </div>

    <div
      v-show="isExpand"
      class="thumbnail_wrap"
      :class="{'imgbox-modal-drag':showModalImgBox}"
      @dragover="onDragOver"
    >
      <div
        v-show="attachFileList.length > 0"
        class="file_list"
        style="display: flex;width: 100%;"
      >
        <ul>
          <li
            v-for="(itm,index) in attachFileList"
            :key="index"
          >
            <sui-checkbox
              v-show="showAddDeleteBtn && showUpDownArrowBtn && (!itm.fileUid || deletableOld)"
              v-model="itm.checkBoxChecked"
              :disabled="disabled"
              @input="onCheckBoxInput"
            />
            <a
              v-if="itm.fileUid"
              href="#none"
              :class="getFileExtensionIconClass(itm.fileExtensionName)"
              @click.prevent="onClickFileName(itm)"
            >{{ itm.fileName }}</a>
            <p
              v-if="!itm.fileUid"
              :class="getFileExtensionIconClass(itm.fileExtensionName)"
            >
              {{ itm.fileName }}
            </p><p style="padding-left:5px">
              ({{ itm.fileSize | convertToFileSizeFormat }})
            </p>
            <sui-button
              v-show="showAddDeleteBtn && !disabled && (!itm.fileUid || deletableOld)"
              type="button"
              class="btn_list_del"
              :disabled="disabled"
              @click="onDeleteFile(itm)"
            >
              {{ $t('MSG_BTN_DEL') }}<!--삭제-->
            </sui-button>
          </li>
        </ul>
      </div>

      <!--UPLOAD-->
      <div
        v-show="isExpand && !disabled && showAddDeleteBtn && enableAdd && (showModalImgBox || attachFileList.length === 0)"
        ref="modalImgBox"
        class="imgbox-modal"
        style="z-index:100;left:0px;position:absolute !important;"
      >
        <input
          ref="inputFileType"
          type="file"
          multiple
          :disabled="disabled"
          accept="*"
          class="attach-file"
          title=""
          @change="onFilesChange($event.target.name, $event.target.files)"
          @drop="onDrop"
          @dragleave="onDragLeave"
        >
        <div
          v-show="!disabled && showAddDeleteBtn && enableAdd"
          class="imgbox-modal-text"
        >
          <h4>{{ $t('MSG_TXT_DROP_FILE_TO_ATTH') }}</h4><!-- 첨부할 파일을 여기에 놓아주세요. -->
        </div>
      </div>
    </div>
    <div
      ref="tooltipHtml"
      class="tooltip-content"
      style="border-style: none;"
    >
      <p>*{{ $t('MSG_TXT_PSBL_ATTH_FILE_EXTS') }}</p>
      <table>
        <tr>
          <th>{{ $t('MSG_TXT_ALL') }}</th><td>{{ getConfigValue('CFG_CMD_ATTH_PSBL_EXTS_ALL') }}</td>
        </tr>
        <tr>
          <th>{{ $t('MSG_TXT_DOC') }}</th><td>{{ getConfigValue('CFG_CMD_ATTH_PSBL_EXTS_PDF') }}</td>
        </tr>
        <tr>
          <th>{{ $t('MSG_TXT_IMG') }}</th><td>{{ getConfigValue('CFG_CMD_ATTH_PSBL_EXTS_IMG') }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CmpFileAttacher',
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
     * @function getFileExtensionIconClass
     * @param {String} fileExtension 파일확장자
     * @returns {String}
     */
    getFileExtensionIconClass(fileExtension) {
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
        return false;
      }
      if (!this.checkIsRightFileType(fileList)) {
        const extList = this.getFileExtWhiteList(this.attachGroupItemList[0].attachPossibilityExtensionCode);
        // 허용 가능한 확장자({0})의 파일을 추가하시기 바랍니다.
        // eslint-disable-next-line
        utils.messageBox('warning', `${this.$t('MSG_TXT_EXTS')} ${this.$t('MSG_BTN_CFRM')}`, utils.strFormat(this.$t('MSG_ALT_ADD_NCELL_EXTS_FILE'), extList.join(', ')));
        // 동일한 파일을 연속 선택시 change 이벤트가 발생하지 않는 문제 해결
        this.$refs.inputFileType.type = '';
        this.$refs.inputFileType.type = 'file';
        return false;
      }

      if (!this.checkIsUnderSizeLimit(fileList)) {
        // 선택한 파일(들) 용량을 합한 총 파일 용량이 제한 용량("{0}")을 초과했습니다.
        // eslint-disable-next-line
        utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), utils.strFormat(this.$t('MSG_ALT_ECXD_TTQTY_NCELL'), `${utils.numberFormat(this.attachRestrictionSize,2)} MB`));
        // 동일한 파일을 연속 선택시 change 이벤트가 발생하지 않는 문제 해결
        this.$refs.inputFileType.type = '';
        this.$refs.inputFileType.type = 'file';
        return false;
      }

      const that = this;
      // handle file changes
      for (let j = 0; j < fileList.length; j += 1) {
        let bDup = false;
        const _file = fileList[j];
        const _re = /^.+\.(\w*$)/;
        const _ext = _re.exec(_file.name);

        // 파일명 중복 확인
        for (let i = 0; i < that.attachFileList.length; i += 1) {
          if (_file.name === that.attachFileList[i].fileName) {
            bDup = true;
            that.attachFileList[i].fileName = _file.name;
            that.attachFileList[i].fileSize = _file.size;
            that.attachFileList[i].fileExtensionName = _ext.length > 1 ? _ext[1] : '';
            that.attachFileList[i].arrayalOrder = 'autoNumberingColumn';
            that.attachFileList[i].file = _file;
            that.attachFileList[i].realityFilePath = ''; // 명이 동일한 파일을 선택한 경우에 다시 올린다.
            that.attachFileList[i].fileUid = '';

            break;
          }
        }

        if (!bDup) {
          const emptyDataFieldsObj = that.getEmptyFileInfoObj();
          emptyDataFieldsObj.checkBoxChecked = false;
          emptyDataFieldsObj.fileName = _file.name;
          emptyDataFieldsObj.fileSize = _file.size;
          emptyDataFieldsObj.fileExtensionName = _ext.length > 1 ? _ext[1] : '';
          emptyDataFieldsObj.arrayalOrder = 'autoNumberingColumn';
          emptyDataFieldsObj.file = _file;
          emptyDataFieldsObj.fileUid = '';

          that.attachFileList.push(emptyDataFieldsObj);
          this.$forceUpdate();
        }
      }
      this.uploadFiles();

      // 동일한 파일을 연속 선택시 change 이벤트가 발생하지 않는 문제 해결
      // document.querySelector("input[type='file']").value = '';
      // document.querySelector(`input[name='${this.inputTypeFileName}']`).value = '';
      this.$refs.inputFileType.type = '';
      this.$refs.inputFileType.type = 'file';
    },
    getFileExtension(filename) {
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
     * @function checkIsRightFileType
     * @param {Array}
     * @returns {Boolean}
     */
    checkIsRightFileType(files) {
      let rtnVal = true;
      const _re = /^.+\.(\w*$)/; // 파일 확장자 추출용 정규표현식
      for (let i = 0; i < files.length; i += 1) {
        const reExec = _re.exec(files[i].name);
        if (utils.isEmpty(reExec)) {
          rtnVal = false;
          break;
        }
        const extList = this.getFileExtWhiteList(this.attachGroupItemList[0].attachPossibilityExtensionCode);
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
        console.error('첨부가능 확장자에 대한 config 를 찾을 수 없습니다.');
      }
      return configValue.replace(/\s+/g, '').toUpperCase().split(',');
    },
    /**
     * 첨부 최대 용량을 넘었는지 check 하여 boolean을 반환
     * @function checkIsUnderSizeLimit
     * @param {Array} files
     * @returns {Boolean}
     */
    checkIsUnderSizeLimit(files) {
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
    uploadFiles() {
      const _allFiles = this.attachFileList;
      // 업로드 대상 파일 배열
      const _targetFiles = [];
      _allFiles.forEach(curFile => {
        if (utils.isEmpty(curFile.realityFilePath)) {
          _targetFiles.push(utils.cloneDeep(curFile));
        }
      });

      if (_targetFiles.length === 0) {
        // "업로드 대상 파일이 없습니다."
        utils.messageBox('alert', this.$t('MSG_BTN_CFRM'), this.$t('MSG_TXT_NO_UPLOAD_FILE'));
        return false;
      }

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

        // TODO: 메시지리소스 등록해야 함
      }).catch(err => {
        // 파일전송 실패
        // 대상 파일들 삭제
        for (let i = _allFiles.length - 1; i >= 0; i--) {
          _allFiles.splice(i, 1);
        }
        utils.messageBox('error', this.$t('MSG_BTN_CFRM'), err.message);
      });
    },
    /**
     * 첨부그룹ID 와 첨부문서ID 에 해당하는 목록정보를 조회한 후 결과를 테이블에 표시한다.
     * @function searchAttachGroupItemList
     * @param {None}
     * @returns {None}
     */
    searchAttachGroupItemList() {
      if (utils.isEmpty(this.attachGroupId)) {
        console.log('필수값(attachGroupId)이 존재하지 않아 API 호출하지 않습니다.');
        // utils.messageBox("alert","확인","필수값이 존재하지 않습니다.");;
        return false;
      }

      if (!utils.isEmpty(this.initialAttachGroupItemList)) {
        console.log('초기 첨부항목 값이 존재하여 API 호출하지 않습니다.');
        // utils.messageBox("alert","확인","필수값이 존재하지 않습니다.");;
        return false;
      }
      // this.isSearching = true;

      // TODO: 삭제 대상
      console.log(`call searchAttachGroupItemList[${this.attachGroupId}, ${this.attachDocumentId}]`);

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

          // TODO: 삭제 대상
          console.log('return searchAttachGroupItemList', res.data);

          this.attachFileList.forEach(itm => {
            itm.checkBoxChecked = false;
            itm.arrayalOrder = 'autoNumberingColumn';
          });
        }
        // this.isSearching = false;
      }).catch(err => {
        // this.isSearching = false;
        console.log(err);
      });
    },
    searchAttachGroupItemListBy(attachGroupId = '', attachDocumentId = '') {
      if (utils.isEmpty(attachGroupId)) {
        console.log('필수값(attachGroupId)이 존재하지 않아 API 호출하지 않습니다.');
        return false;
      }

      if (!utils.isEmpty(this.initialAttachGroupItemList)) {
        console.log('초기 첨부항목 값이 존재하여 API 호출하지 않습니다.');
        return false;
      }

      http.request(this.pageId, 'DTS_CMZ_00086', {
        path: {
          'attach-group-id': attachGroupId,
        },
        query: {
          attachDocumentId: attachDocumentId,
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
          this.attachRestrictionSize = this.attachGroupItemList[0].attachRestrictionSize;
          this.imagePreviewApplyYn = this.attachGroupItemList[0].imagePreviewApplyYn;
          this.downloadReasonInputYn = this.attachGroupItemList[0].downloadReasonInputYn;
          this.downloadHistoryManagementYn = this.attachGroupItemList[0].downloadHistoryManagementYn;

          this.attachFileList.forEach(itm => {
            itm.checkBoxChecked = false;
            itm.arrayalOrder = 'autoNumberingColumn';
          });
        }
        // this.isSearching = false;
      }).catch(err => {
        // this.isSearching = false;
        console.log(err);
      });
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
    /**
     * 첨부파일 정보 조회 서비스 호출
     * @function searchAttachedFileInfoByDocId
     * @param {String} docId: 가져올 첨부파일 목록의 document id
     * @return {None} //TODO: 삭제대상
     */
    searchAttachedFileInfoByDocId() {
      utils.messageBox('information', 'attachGroupId 와 attachDocumentId 를 필수로 받는 구조로 변경되어 deprecated 됨');
    },
    /**
     * 현재 첨부그룹 항목 목록 정보를 반환한다.
     * attachFileList의 arrayalOrder 값을 매긴다.
     * @function getAttachGroupItemListInfo
     * @returns {Array} : 첨부그룹 항목 의 Object Array
     */
    getAttachGroupItemListInfo() {
      const _tmpFileListInfo = utils.cloneDeep(this.attachGroupItemList);
      _tmpFileListInfo.forEach(itm => {
        itm.attachFileList.forEach((file, index) => {
          file.arrayalOrder = index + 1; // eslint-disable-line
          file.attachGroupId = itm.attachGroupId; // eslint-disable-line
          file.attachItemId = itm.attachItemId; // eslint-disable-line
        });
      });
      return _tmpFileListInfo;
    },
    /**
     * 현재 파일목록 정보를 반환한다.
     * @function getAttachFileListInfo
     * @returns {Array} : 파일 정보 목록의 Object Array
     * TODO: 삭제
     */
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
     * @function getEmptyFileInfoObj
     * @return {Object}
     */
    getEmptyFileInfoObj() {
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
     * 목록에서 선택한 파일(들)을 제일 상단으로 이동
     * @function moveTop
     * @returns {none}
     */
    moveTop() {
      const _checkedIndices = [];
      this.attachFileList.forEach((itm, index) => {
        if (itm.checkBoxChecked) {
          _checkedIndices.push(index);
        }
      });
      const _removedRows = utils.pullAt(this.attachFileList, _checkedIndices);
      for (let i = _removedRows.length - 1; i >= 0; i--) {
        this.attachFileList.unshift(_removedRows[i]);
      }
    },
    /**
     * 선택한 파일들을 한단계 위로 이동
     * @function moveUp
     * @returns {none}
     */
    moveUp() {
      const _checkedIds = [];
      this.attachFileList.forEach((itm, index) => {
        if (itm.checkBoxChecked) {
          _checkedIds.push(itm.fileName);
        }
      });

      // 첫번째 row의 이동이 성공하면 나머지 이동
      if (this.moveUpSingle(_checkedIds[0])) {
        for (let i = 1; i < _checkedIds.length; i++) {
          this.moveUpSingle(_checkedIds[i]);
        }
      }
    },
    /**
     * 선택한 파일들을 한단계 아래로 이동
     * @function moveDown
     * @returns {none}
     */
    moveDown() {
      const _checkedIds = [];
      this.attachFileList.forEach((itm, index) => {
        if (itm.checkBoxChecked) {
          _checkedIds.push(itm.fileName);
        }
      });
      // 첫번째 row의 이동이 성공하면 나머지 이동
      if (this.moveDownSingle(_checkedIds[_checkedIds.length - 1])) {
        for (let i = _checkedIds.length - 2; i >= 0; i--) {
          this.moveDownSingle(_checkedIds[i]);
        }
      }
    },
    /**
     * 파일 하나 상단 한칸 이동 후 성공 여부 반환
     * @function moveUpSingle
     * @returns {Boolean}
     */
    moveUpSingle(fileName) {
      let _checkedIndex = 0;
      for (let i = 0; i < this.attachFileList.length; i++) {
        if (fileName == this.attachFileList[i].fileName) {
          _checkedIndex = i;
          break;
        }
      }
      if (_checkedIndex == 0) {
        return false;
      }

      const _removedRow = utils.pullAt(this.attachFileList, _checkedIndex);
      this.attachFileList.splice(_checkedIndex - 1, 0, _removedRow[0]);
      return true;
    },
    /**
     * 파일 하나 하단 한칸 이동 후 성공 여부 반환
     * @function moveDownSingle
     * @return {Boolean}
     */
    moveDownSingle(fileName) {
      let _checkedIndex = 0;
      for (let i = 0; i < this.attachFileList.length; i++) {
        if (fileName == this.attachFileList[i].fileName) {
          _checkedIndex = i;
          break;
        }
      }
      if (_checkedIndex == this.attachFileList.length - 1) {
        return false;
      }

      const _removedRow = utils.pullAt(this.attachFileList, _checkedIndex);
      this.attachFileList.splice(_checkedIndex + 1, 0, _removedRow[0]);
      return true;
    },
    /**
     * 선택한 파일들을 제일 하단으로 이동
     * @function moveBottom
     * @returns {none}
     */
    moveBottom() {
      const _checkedIndices = [];
      this.attachFileList.forEach((itm, index) => {
        if (itm.checkBoxChecked) {
          _checkedIndices.push(index);
        }
      });
      const _removedRows = utils.pullAt(this.attachFileList, _checkedIndices);
      for (let i = 0; i < _removedRows.length; i++) {
        this.attachFileList.push(_removedRows[i]);
      }
    },
    /**
     * 선택한 파일들을 삭제한다.
     * @function deleteSelectedFiles
     * @returns {none}
     */
    deleteSelectedFiles() {
      for (let i = this.attachFileList.length - 1; i >= 0; i--) {
        if (this.attachFileList[i].checkBoxChecked) {
          this.attachFileList.splice(i, 1);
        }
      }
    },
    onDragOver(e) {
      e.preventDefault();
      e.stopPropagation();
      this.showModalImgBox = true;
    },
    onDragLeave(e) {
      this.showModalImgBox = false;
    },
    onDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      // if (navigator.userAgent.indexOf('Trident') > -1) { // IE11 이면
      const fileList = e.dataTransfer.files;
      if (fileList) {
        this.onFilesChange('', fileList);
      }
      // }
      this.showModalImgBox = false;
    },
    /**
     * 선택한 파일을 삭제한다.
     * @function onDeleteFile
     * @param {Object} file: 선택한 파일 정보
     * @returns {None}
     */
    onDeleteFile(file) {
      for (let i = this.attachFileList.length - 1; i >= 0; i--) {
        if (this.attachFileList[i].fileName == file.fileName) {
          this.attachFileList.splice(i, 1);
          break;
        }
      }
    },
    /**
     * 파일명 click event handler
     * 다운로드사유 입력여부가 'Y'이면 다운로드 사유 입력창 띄움
     * @function onClickFileName
     * @param {Object} fileInfo
     * @returns
     */
    onClickFileName(fileInfo) {
      const that = this;
      if (!['N', 'n'].includes(this.downloadReasonInputYn)) {
        utils.openLayerPopup('PGE_CMZ_00041', result => {
          fileInfo.fileDownloadReasonContent = result;

          if (!utils.isEmpty(result)) {
            that.downloadSingleFile(fileInfo).then(() => {
              that.insertFileDownloadHistory(fileInfo);
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
        this.downloadSingleFile(fileInfo).then(() => {
          if (!['N', 'n'].includes(this.downloadHistoryManagementYn)) {
            this.insertFileDownloadHistory(fileInfo);
          }
        }).catch(err => {
          console.log(err);
          // utils.messageBox('error', this.$t('MSG_BTN_CFRM'), err);
        });
      }
    },
    /**
     * @function insertFileDownloadHistory
     * @param {Object} fileInfo
     * @returns {None}
     */
    insertFileDownloadHistory(fileInfo) {
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
     * @function downloadSingleFile
     * @param {Object}
     * @returns Promise
     */
    downloadSingleFile(rowData) {
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
    /**
     * @function onShowImageViewerPopup
     * @param {Object}
     * @returns None
     */
    onShowImageViewerPopup(file) {
      if (file.type.toUpperCase().startsWith('IMAGE')) {
        if (this.enableImageViewer) {
          utils.openLayerPopup('PGE_CMZ_00014', this.onPagePopupClose, {
            pageInitialData: { file },
            size: 'sm',
            title: 'Image Viewer',
          });
        }
      } else if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, file.name);
      } else {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(file);
        link.target = '_blank';
        if (file.name) link.download = file.name;
        link.click();
      }
    },
    /**
     * 첨부파일 용량 제한 확인 결과를 반환
     * @function checkAttachFileSizeLimit
     * @param {boolean} 제한사이즈에 걸릴 경우 messageBox 표시 flag - default 값은 true
     * @returns {Promise}
     */
    checkAttachFileSizeLimit(showMessage = true) {
      return new Promise((resolve, reject) => {
        if (this.attachRestrictionSize > 0) {
          // 첨부된 파일 사이즈 총용량
          let totalFileSize = 0;
          this.attachGroupItemList.forEach(itm => {
            itm.attachFileList.forEach(file => {
              totalFileSize += file.fileSize * 1;
            });
          });

          let errorMsg = '';
          if (totalFileSize > (this.attachRestrictionSize * 1024 * 1024)) {
            if (showMessage) {
              // 선택한 파일(들) 용량을 합한 총 파일 용량이 제한 용량({0})을 초과했습니다.
              // eslint-disable-next-line
              errorMsg = utils.strFormat(this.$t('MSG_ALT_ECXD_TTQTY_NCELL'), `${utils.numberFormat(this.attachRestrictionSize, 2)} MB`);
              utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), errorMsg, () => resolve(false));
            } else {
              resolve(false);
            }
          } else {
            resolve(true);
          }
        } else {
          resolve(true);
        }
      });
    },
    /**
     * 첨부파일 용량 제한 확인 결과를 true/false로 반환
     * @function isUnderAttachFileSizeLimit
     * @param {boolean} 제한사이즈에 걸릴 경우 messageBox 표시 flag - default 값은 true
     * @returns {boolean} true/false
     */
    isUnderAttachFileSizeLimit(showMessage = true) {
      let isUnderLimit = true;
      if (this.attachRestrictionSize > 0) {
        // 첨부된 파일 사이즈 총용량
        let totalFileSize = 0;
        this.attachGroupItemList.forEach(itm => {
          itm.attachFileList.forEach(file => {
            totalFileSize += file.fileSize * 1;
          });
        });

        if (totalFileSize > (this.attachRestrictionSize * 1024 * 1024)) {
          if (showMessage) {
            // 선택한 파일(들) 용량을 합한 총 파일 용량이 제한 용량({0})을 초과했습니다.
            // eslint-disable-next-line
            let errorMsg = utils.strFormat(this.$t('MSG_ALT_ECXD_TTQTY_NCELL'), `${utils.numberFormat(this.attachRestrictionSize, 2)} MB`);
            utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), errorMsg);
          }
          isUnderLimit = false;
        }
      }
      return isUnderLimit;
    },
    onClickShowDnHistoryPopup() {
      if (!utils.isEmpty(this.attachGroupId) && !utils.isEmpty(this.attachDocumentId)) {
        utils.openLayerPopup('PGE_CMZ_00070', () => {}, {
          pageInitialData: {
            attachGroupId: this.attachGroupId,
            attachDocumentId: this.attachDocumentId,
          },
          size: 'lg',
        });
      } else {
        console.log(`첨부그룹ID값(${this.attachGroupId})과 첨부문서ID(${this.attachDocumentId})값이 모두 존재해야 합니다.`);
      }
    },
  },
};

</script>
<style scoped>
</style>
