<template>
  <div>
    <div class="comm_gridTop_wrap">
      <div
        class="totalList"
        style="padding:3px 12px 0 0"
      >
        {{ imgCountLabel }}
      </div>
      <div class="btn_wrapL">
        <sui-button
          type="button"
          class="comm_btn_gridTop"
          :disabled="disabled"
          @click="onOpenFiles"
        >
          {{ $t('MSG_BTN_SCH_FILE') }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_gridTop"
          :disabled="disabled"
          @click="onDelImgList"
        >
          {{ $t('MSG_BTN_DEL_ALL') }}
        </sui-button>
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
        <!--<div class="info">{{ totalSize }}KB / 20.00MB</div> -->
        <div class="info">
          {{ totalSize | convertToFileSizeFormat }} / {{ attachRestrictionSize }} MB
        </div>
      </div>
    </div>
    <div
      class="thumbnail_wrap"
      :class="{'imgbox-modal-drag':showModalImgBox}"
      @dragover="onDragOver"
    >
      <div v-show="imgList.length > 0">
        <sui-button
          type="button"
          style="top:40%;"
          class="btn_Pre"
          :disabled="disabled || prevBtnDisabled"
          @click="onPrev"
        >
          {{ $t('MSG_BTN_GO_PREV') }}
        </sui-button>
      </div>
      <draggable
        ref="imgBox"
        width="100%"
        :list="imgList"
        :disabled="disabled"
        ghost-class="ghost"
        :move="checkMove"
        class="imgbox-list-group myscroll"
        @start="dragging = true"
        @end="dragging = false"
      >
        <div
          v-for="(item, index) in imgList"
          :key="item.id"
          class="box1"
        >
          <div
            class="imgBox w150"
            :style="{ 'background-image': `url(${item.imgSrc})` }"
            @mouseover="onImgShow(index)"
            @mouseout="onImgHidden(index)"
            @click="onClickImage(item, index)"
          >
            <sui-button
              v-show="true"
              type="button"
              :class="item.representativeImageYn === 'Y' ? 'imgbox-btn-prps-y' : 'imgbox-btn-prps-n'"
              :disabled="disabled"
              @click="onClickRepresentaion(item.id, $event)"
            >
              {{ $t('MSG_BTN_RPRS') }}
            </sui-button>
            <sui-button
              v-show="!disabled"
              type="button"
              class="btn_list_del"
              :disabled="disabled"
              @click="onClickDelete(index, $event)"
            >
              {{ $t('MSG_BTN_DEL') }}
            </sui-button>
          </div>
          <div
            v-if="item.fileUid"
            class="file"
          >
            <a
              href="#none"
              @click.prevent="onClickImageName(item)"
            >{{ item.fileName }}</a>({{ getComma(item.fileSize / 1000) }}KB)
          </div>
          <div
            v-else
            class="file"
          >
            <span>{{ item.fileName }}</span>({{ getComma(item.fileSize / 1000) }}KB)
          </div>
        </div>
      </draggable>
      <div v-show="imgList.length > 0">
        <sui-button
          type="button"
          style="top:40%;"
          class="btn_Next"
          :disabled="nextBtnDisabled"
          @click="onNext"
        >
          {{ $t('MSG_BTN_GO_BACK') }}
        </sui-button>
      </div>

      <div
        v-show="!disabled && (showModalImgBox || imgCount == 0)"
        ref="modalImgBox"
        class="imgbox-modal"
      >
        <input
          ref="attachImg"
          type="file"
          multiple
          :accept="getInputAcceptString()"
          class="attach-file"
          title=""
          @change="onChange"
          @drop="onDrop"
          @dragleave="onDragLeave"
        >
        <div class="imgbox-modal-text">
          <h4>{{ $t('MSG_TXT_DROP_FILE_TO_ATTH') }}</h4>
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
          <th>{{ $t('MSG_TXT_IMG') }}</th>
          <td>{{ getConfigValue('CFG_CMD_ATTH_PSBL_EXTS_IMG') }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

import draggable from 'vuedraggable';

export default {
  name: 'CmpImageAttacher',
  components: {
    draggable,
  },
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
    },
    // 첨부그룹ID
    attachGroupId: {
      type: String,
      required: false,
      default() {
        return '';
      },
    },
    // 첨부문서ID
    attachDocumentId: {
      type: String,
      required: false,
      default() {
        return '';
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showDnHistoryBtn: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      start: 0,
      end: 4,
      showImgCount: 4,
      prevBtnDisabled: false,
      nextBtnDisabled: false,
      dragging: false,
      imgList: [],
      showModalImgBox: false,
      // totalFileSize: 0,
      scrollX: 170,
      attachRestrictionSize: 0, // 총 파일 사이즈 제한 크기
      imagePreviewApplyYn: null, // 사진미리보기 여부
      downloadReasonInputYn: null, // 다운로드 사유 입력여부
      downloadHistoryManagementYn: null, // 다운로드 이력관리 여부
      attachGroupItemList: [], // 조회된 첨부그룹항목 목록에 대한 참조값 저장
      isSearching: false,
    };
  },
  computed: {
    imgCount() {
      return this.imgList.length;
    },
    imgCountLabel() {
      return utils.strFormat(this.$t('MSG_TXT_LST_CNT'), this.imgList.length);
    },
    totalSize() {
      let sum = 0;
      if (!utils.isEmpty(this.imgList)) {
        utils.forEach(this.imgList, img => {
          sum += img.fileSize;
        });
      }
      return sum;
    },
  },
  watch: {
    attachGroupId(value) {
      this.searchAttachGroupItemList().then(res => {
        //
      }).catch(err => console.log(err));
    },
    attachDocumentId(value) {
      this.searchAttachGroupItemList().then(res => {
        //
      }).catch(err => console.log(err));
    },
  },
  mounted() {
    // 바인딩된 첨부항목ID 와 첨부문서ID 로 목록 조회
    this.searchAttachGroupItemList().then(res => {
      //
    }).catch(err => console.log(err));
  },
  methods: {
    reset() {
      this.attachGroupItemList = [];
      this.imgList = [];
      this.attachRestrictionSize = 0;
      this.imagePreviewApplyYn = null;
      this.downloadReasonInputYn = null;
      this.downloadHistoryManagementYn = null;
      this.attachRestrictionSize = 0; // 총 파일 사이즈 제한 크기
    },
    setAttachGroupItemList(attachGroupItemList) {
      const that = this;
      let callCnt = 0;
      const callId = setInterval(() => {
        callCnt += 1;
        if (callCnt > 1 && (callCnt > 25 || that.isSearching === false)) {
          clearInterval(callId);
          that.reset();
          that.attachGroupItemList = attachGroupItemList;
          that.attachRestrictionSize = that.attachGroupItemList[0].attachRestrictionSize;
          that.imagePreviewApplyYn = that.attachGroupItemList[0].imagePreviewApplyYn;
          that.downloadReasonInputYn = that.attachGroupItemList[0].downloadReasonInputYn;
          that.downloadHistoryManagementYn = that.attachGroupItemList[0].downloadHistoryManagementYn;
          that.imgList = that.attachGroupItemList[0].attachFileList;

          that.attachGroupItemList[0].attachFileList.forEach(file => {
            file.id = that.getImageId();
            file.show = true;
            if (utils.isEmpty(file.representativeImageYn)) {
              file.representativeImageYn = 'N';
            }
          });
        }
      }, 200);
    },
    /**
     * 스크립틀릿에서는 utils 를 사용할 수 없기 때문에 그것 대체용으로
     */
    getConfigValue(config) {
      return utils.getConfigurationValue(config);
    },
    /**
     * config에서 첨부가능한 확장자 목록을 가져와서 input type file의 accept 속성에서
     * 읽을 수 있는 포맷으로 변환한 문자열을 반환
     * @function getInputAcceptString
     * @returns {String} : '.jpg, .gif, .bmp, .png, .jpeg'
     */
    getInputAcceptString() {
      let retVal = utils.getConfigurationValue('CFG_CMD_ATTH_PSBL_EXTS_IMG');
      if (retVal) {
        retVal = retVal.replace(/(\w+)/g,(fileExt)=>{ return `.${fileExt}`;});
      }
      return retVal;
    },
    /**
     * 첨부그룹ID 와 첨부문서ID 에 해당하는 목록정보를 조회한 후 결과를 테이블에 표시한다.
     * @function searchAttachGroupItemList
     * @param {None}
     * @returns {Promise}
     */
    searchAttachGroupItemList() {
      this.attachGroupItemList = [];
      this.imgList = [];
      this.attachRestrictionSize = 0;
      this.imagePreviewApplyYn = null;
      this.downloadReasonInputYn = null;
      this.downloadHistoryManagementYn = null;
      this.isSearching = true;

      return new Promise((resolve, reject) => {
        if (utils.isEmpty(this.attachGroupId)) {
          // utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), `${this.$t('MSG_ALT_NCELL_REQUIRED_ITEM')}`.replace('{0}', 'attachItemId'));
          this.isSearching = false;
          return reject(`${this.$t('MSG_ALT_NCELL_REQUIRED_ITEM')}`.replace('{0}', 'attachGroupId'));
        }

        http.request(this.pageId, 'DTS_CMZ_00086', {
          path: {
            'attach-group-id': this.attachGroupId,
          },
          query: {
            attachDocumentId: this.attachDocumentId,
          },
        }).then(res => {
          if (res.data.length > 0) {
            const temp_attachGroupItemList = utils.cloneDeep(res.data);
            temp_attachGroupItemList[0].attachFileList.forEach(file => {
              file.id = this.getImageId();
              file.show = true;
              if (utils.isEmpty(file.representativeImageYn)) {
                file.representativeImageYn = 'N';
              }
            });

            const representativImageIndex = utils.findIndex(temp_attachGroupItemList[0].attachFileList, { representativeImageYn: 'Y' });
            if (representativImageIndex >= 0) {
              const retArr = utils.pullAt(temp_attachGroupItemList[0].attachFileList, representativImageIndex);
              if (retArr.length > 0) {
                temp_attachGroupItemList[0].attachFileList.unshift(retArr[0]);
              }
            }

            this.attachGroupItemList = temp_attachGroupItemList;
            this.attachRestrictionSize = this.attachGroupItemList[0].attachRestrictionSize;
            this.imagePreviewApplyYn = this.attachGroupItemList[0].imagePreviewApplyYn;
            this.downloadReasonInputYn = this.attachGroupItemList[0].downloadReasonInputYn;
            this.downloadHistoryManagementYn = this.attachGroupItemList[0].downloadHistoryManagementYn;
            this.imgList = this.attachGroupItemList[0].attachFileList;

            this.isSearching = false;
            resolve(res);
          } else {
            this.isSearching = false;
            utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), this.$t('MSG_ALT_NO_ATTH_GRP_DATA').replace(`\${0}`, this.attachGroupId));
            reject(res);
          }
        }).then(res => {
          // 이미지 파일들을 다운로드 받아 화면에 표시
          this.setImageFileSrc().then(res2 => {
            this.isSearching = false;
            resolve(res2);
          }, rej2 => {
            reject(rej2);
          });
        }).catch(err => {
          this.isSearching = false;
          reject(err);
        });
      });
    },
    /**
     * 첨부그룹ID 와 첨부문서ID 에 해당하는 목록정보를 조회한 후 결과를 테이블에 표시한다.
     * @function searchAttachGroupItemList
     * @param {String attachGroupId, String attachDocumentId}
     * @returns {Promise}
     */
    searchAttachGroupItemListBy(attachGroupId = '', attachDocumentId = '') {
      this.attachGroupItemList = [];
      this.imgList = [];
      this.attachRestrictionSize = 0;
      this.imagePreviewApplyYn = null;
      this.downloadReasonInputYn = null;
      this.downloadHistoryManagementYn = null;
      this.isSearching = true;

      return new Promise((resolve, reject) => {
        if (utils.isEmpty(attachGroupId)) {
          this.isSearching = false;
          return reject(`${this.$t('MSG_ALT_NCELL_REQUIRED_ITEM')}`.replace('{0}', 'attachGroupId'));
        }

        http.request(this.pageId, 'DTS_CMZ_00086', {
          path: {
            'attach-group-id': attachGroupId,
          },
          query: {
            attachDocumentId,
          },
        }).then(res => {
          if (res.data.length > 0) {
            const tempAttachGroupItemList = utils.cloneDeep(res.data);
            tempAttachGroupItemList[0].attachFileList.forEach(file => {
              file.id = this.getImageId();
              file.show = true;
              if (utils.isEmpty(file.representativeImageYn)) {
                file.representativeImageYn = 'N';
              }
            });

            const representativImageIndex = utils.findIndex(tempAttachGroupItemList[0].attachFileList, { representativeImageYn: 'Y' });
            if (representativImageIndex >= 0) {
              const retArr = utils.pullAt(tempAttachGroupItemList[0].attachFileList, representativImageIndex);
              if (retArr.length > 0) {
                tempAttachGroupItemList[0].attachFileList.unshift(retArr[0]);
              }
            }

            this.attachGroupItemList = tempAttachGroupItemList;
            this.attachRestrictionSize = this.attachGroupItemList[0].attachRestrictionSize;
            this.imagePreviewApplyYn = this.attachGroupItemList[0].imagePreviewApplyYn;
            this.downloadReasonInputYn = this.attachGroupItemList[0].downloadReasonInputYn;
            this.downloadHistoryManagementYn = this.attachGroupItemList[0].downloadHistoryManagementYn;
            this.imgList = this.attachGroupItemList[0].attachFileList;

            this.isSearching = false;
            resolve(res);
          } else {
            this.isSearching = false;
            utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), this.$t('MSG_ALT_NO_ATTH_GRP_DATA').replace(`\${0}`, attachGroupId));
            reject(res);
          }
        }).then(res => {
          // 이미지 파일들을 다운로드 받아 화면에 표시
          this.setImageFileSrc().then(res2 => {
            this.isSearching = false;
            resolve(res2);
          }, rej2 => {
            reject(rej2);
          });
        }).catch(err => {
          this.isSearching = false;
          reject(err);
        });
      });
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
    readFile(img, blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        // can't use like reader.readAsDataURL(new File([blob], file.fileName));
        // for ie - can't use File constructor function

        reader.onload = () => {
          img.imgSrc = reader.result; // eslint-disable-line
          resolve(reader.result);
        };

        reader.onabort = () => {
          reject(reader.error);
        };

        reader.readAsDataURL(blob);
        
      });
    },
    /**
     * 이미지 파일들을 서버에서 메모리로 다운받아 화면에 표시
     * @function setImageFileSrc
     * @returns {Promise}
     */
    setImageFileSrc() {
      const that = this;
      return new Promise((resolve, reject) => {
        const promises = [];

        that.imgList.forEach(file => {
          const imgFile = file;
          if (!utils.isEmpty(imgFile.realityFilePath)) {
            promises.push(
              new Promise((resolveSub, rejectSub) => {
                let blob = null;
                http.request(that.pageId, 'DTS_CMZ_00068', {
                  path: {
                    'target-path': 'storage',
                  },
                  query: {
                    serverFileName: imgFile.realityFilePath,
                    originalFileName: imgFile.fileName,
                  },
                  responseType: 'arraybuffer',
                }).then(res => {
                  blob = new Blob([res.data], { type: res.headers['content-type'] });
                  return that.readFile(imgFile, blob);
                }).then(() => {
                  resolveSub('');
                }).catch(err => {
                  const errStr = utils.arraybufferToString(err.data);
                  const errJson = JSON.parse(errStr);
                  // console.log(errJson);
                  rejectSub(errJson);
                });
              }).catch(successOrError => successOrError),
            );
          }
        });

        // promises 배열요소 중 하나에서 reject가 발생할 경우 즉시 나머지 promise가 끝나기 전에
        // 즉시 return 되므로 그것을 방지하기 위해 reject 된 promise 를 catch한 promise 를 배열요소로 집어넣었음
        // 따라서 reject 는 절대 발생할 수 없기 때문에 내용을 보고 error를 구분할 수 밖에 없음
        Promise.all(promises).then(results => {
          that.$forceUpdate();
          // console.log(results);
          resolve(results);
        });
      });
    },
    onImgShow(idx) {
      this.imgList[idx].show = true;
    },
    onImgHidden(idx) {
      this.imgList[idx].show = this.imgList[idx].representativeImageYn === 'Y';
    },
    /**
     * 이미지 click event handler
     * 이미지 미리보기 적용값이 'Y' 이면 사진보기 팝업을 띄운다.
     * @function onClickImage
     * @param {Object} item
     * @param {Number} index
     * @returns {None}
     */
    onClickImage(item, index) {
      //
      if (!['N', 'n'].includes(this.imagePreviewApplyYn)) {
        utils.openLayerPopup('PGE_CMZ_00040', () => {
        }, {
          pageInitialData: {
            index,
            attachGroupId: this.attachGroupId,
            attachDocumentId: this.attachDocumentId,
            downloadReasonInputYn: this.downloadReasonInputYn,
            downloadHistoryManagementYn: this.downloadHistoryManagementYn,
            imgList: this.imgList,
          },
          size: 'md',
        });
      }
    },
    /**
     * 대표 이미지 클릭 이벤트 핸들러
     * @function onClickRepresentaion
     * @param {String} id
     * @param {Object} event
     * @returns {None}
     */
    onClickRepresentaion(id, e) {
      e.stopPropagation();
      // TODO: 현재 아이템이 대표이면 패스
      utils.forEach(this.imgList, item => {
        item.representativeImageYn = item.id === id ? 'Y' : 'N';
        item.show = item.id === id;
      });
    },
    onClickDelete(index, e) {
      e.stopPropagation();
      this.imgList.splice(index, 1);
    },
    onDragOver(e) {
      e.preventDefault();
      e.stopPropagation();
      this.showModalImgBox = !this.dragging;
    },
    onDragLeave(e) {
      this.showModalImgBox = false;
    },
    onDrop(e) {
      e.stopPropagation();
      if (navigator.userAgent.indexOf('Trident') > -1) { // IE11 이면
        const fileList = e.dataTransfer.files;
        if (fileList) {
          this._handleFiles(fileList);
        }
      }
      this.showModalImgBox = false;
    },
    /**
     * input type file의 change 이벤트 핸들러
     * file browser 에서 파일을 선택한 순간 해당 파일 정보를 기존 파일 목록에 추가한다.
     *
     * @function onChange
     * @param  {Event} e : file change event object
     * @return  {none}
     */
    onChange(e) {
      e.stopPropagation();

      if (utils.isEmpty(this.attachGroupItemList)) {
        utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), this.$t('MSG_ALT_NO_ATTH_GRP_STRT').replace(`\${0}`, this.attachGroupId));
      } else {
        const fileList = e.target.files || e.dataTransfer.files;
        if (fileList) {
          this._handleFiles(fileList);
        }
      }
      // 동일한 파일을 연속 선택시 change 이벤트가 발생하지 않는 문제 해결
      // document.querySelector("input[type='file']").value = '';
      // document.querySelector(`input[name='${this.inputTypeFileName}']`).value = '';
      this.$refs.attachImg.type = '';
      this.$refs.attachImg.type = 'file';
    },
    _handleFiles(fileList) {
      const targetCount = fileList.length;
      let typeValid = true;
      let sizeValid = true;
      let dupFileName = ''; // 중복 파일명 check 용도

      typeValid = this.checkFileType(fileList);
      sizeValid = this.checkAttachSize(fileList);
      dupFileName = this.findDuplicateFileName(fileList);

      if (typeValid && sizeValid && utils.isEmpty(dupFileName)) {
        const _re = /^.+\.(\w*$)/; // 파일 확장자 추출용 정규표현식
        let fileCount = 0;

        utils.forEach(fileList, file => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          const _ext = _re.exec(file.name);

          reader.onload = () => {
            fileCount += 1;
            this.imgList.unshift({
              id: this.getImageId(),
              fileName: file.name,
              fileSize: file.size,
              imgSrc: reader.result,
              fileExtensionName: _ext.length > 1 ? _ext[1] : '',
              representativeImageYn: 'N',
              file,
            });

            reader.onabort = () => {
              console.log(reader.error);
            };

            // 새로 선택된 파일들의 전송은 onload가 모두 끝난 이후를 고려해야 함
            // 비동기 이므로 loop 밖으로 빼지 못하고 여기에서 실행 함
            if (fileCount === targetCount) {
              // 파일 전송
              this.uploadFiles();
            }
          };
        });
      } else if (!typeValid) {
        const extList = this.getFileExtWhiteList(this.attachGroupItemList[0].attachPossibilityExtensionCode);
        // 허용 가능한 확장자({0})의 파일을 추가하시기 바랍니다.
        // eslint-disable-next-line
        utils.messageBox('warning', `${this.$t('MSG_TXT_EXTS')} ${this.$t('MSG_BTN_CFRM')}`, utils.strFormat(this.$t('MSG_ALT_ADD_NCELL_EXTS_FILE'), extList.join(', ')));
      } else if (!sizeValid) {
        // 선택한 파일(들) 용량을 합한 총 파일 용량이 제한 용량("{0}")을 초과했습니다.
        // eslint-disable-next-line
        utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), utils.strFormat(this.$t('MSG_ALT_ECXD_TTQTY_NCELL'), `${this.getComma(this.attachRestrictionSize)} MB`));
      } else if (!utils.isEmpty(dupFileName)) {
        // 중복된 파일명({0})이 존재합니다.
        // eslint-disable-next-line
        utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), utils.strFormat(this.$t('MSG_ALT_DPCT_FILE_NAME'), `${dupFileName}`));
      }

      // 동일한 파일을 연속 선택시 change 이벤트가 발생하지 않는 문제 해결
      // document.querySelector("input[type='file']").value = '';
      // document.querySelector(`input[name='${this.inputTypeFileName}']`).value = '';
      this.$refs.attachImg.type = '';
      this.$refs.attachImg.type = 'file';
    },
    /**
     * 파일 업로드 실행
     * 위의 두가지 경우를 고려하여 파일전송시 이미 올라간 파일(realityFilePath 에 값이 있는 놈)을
     * 제외하고 아직 올라가지 않은 파일을 전송해야 함
     * @function uploadFiles
     * @return {Object} Promise? TODO:
     */
    uploadFiles() {
      const _currentFileList = this.attachGroupItemList[0].attachFileList;

      // 업로드 대상 파일 배열
      const _targetFiles = [];
      _currentFileList.forEach(curFile => {
        if (utils.isEmpty(curFile.realityFilePath)) {
          _targetFiles.push(utils.cloneDeep(curFile));
        }
      });

      // handle file changes
      const formData = new FormData();
      _targetFiles.forEach(fileInfo => {
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
          _currentFileList.forEach(curFile => {
            if (rtnFile.originalFileName == curFile.fileName) {
              curFile.realityFilePath = rtnFile.serverFileName;
            }
          });
        });
        //
        if (utils.findIndex(this.imgList, { representativeImageYn: 'Y' }) === -1) {
          if (this.imgList.length > 0) {
            this.imgList[0].representativeImageYn = 'Y';
          }
        }
      }, rej => {
        // 파일전송 실패
        // 대상 파일들 삭제
        for (let i = _targetFiles.length - 1; i >= 0; i -= 1) {
          for (let j = 0; _currentFileList.length > j; j += 1){
            if (_targetFiles[i].fileName === _currentFileList[j].fileName) {
              _currentFileList.splice(j, 1);
              break;
            }
          }
        }
      }).catch(err => {
        // 파일전송 실패
        // 대상 파일들 삭제
        for (let i = _targetFiles.length - 1; i >= 0; i -= 1) {
          for (let j = 0; _currentFileList.length > j; j += 1){
            if (_targetFiles[i].fileName === _currentFileList[j].fileName) {
              _currentFileList.splice(j, 1);
              break;
            }
          }
        }
      });
    },
    /**
     * 파일목록에서 구분하기 위한 key 값을 custom으로 생성해서 사용 함
     * 대표이미지 구분하기 위해서도 사용 함
     * @function getImageId
     * @returns {String}
     */
    getImageId() {
      return `id_${Math.round(1000 * Math.random())}_${Math.round(1000 * Math.random())}`;
    },
    /**
     * 이미지 파일명 click event handler
     * 다운로드사유 입력여부가 'Y'이면 다운로드 사유 입력창 띄움
     * @function onClickImageName
     * @param {Object} img
     * @returns
     */
    onClickImageName(img) {
      const that = this;
      if (!['N', 'n'].includes(this.downloadReasonInputYn)) {
        utils.openLayerPopup('PGE_CMZ_00041', result => {
          img.fileDownloadReasonContent = result;

          if (!utils.isEmpty(result)) {
            that.downloadSingleFile(img).then(() => {
              that.insertFileDownloadHistory(img);
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
        this.downloadSingleFile(img).then(() => {
          if (!['N', 'n'].includes(this.downloadHistoryManagementYn)) {
            this.insertFileDownloadHistory(img);
          }
        }).catch(err => {
          console.log(err);
          // utils.messageBox('error', this.$t('MSG_BTN_CFRM'), err);
        });
      }
    },
    /**
     * @function insertFileDownloadHistory
     * @param {Object} imgFileInfo
     * @returns {None}
     */
    insertFileDownloadHistory(imgFileInfo) {
      const _imgFileInfo = utils.clone(imgFileInfo);
      _imgFileInfo.imgSrc = '';
      _imgFileInfo.attachGroupId = this.attachGroupId;
      _imgFileInfo.attachDocumentId = this.attachDocumentId;

      http.request(this.pageId, 'DTS_CMZ_00103', {
        data: _imgFileInfo,
      }).then(res =>
        // console.log(res);
        Promise.resolve(res)).catch(err => {
        // utils.messageBox('error', this.$t('MSG_BTN_CFRM'), err.message, () => Promise.reject(err));
        Promise.reject(err);
      });
    },
    onOpenFiles() {
      this.$refs.attachImg.click();
    },
    checkMove(e) {
      this.showModalImgBox = false;

      // console.log(`Future index: ${e.draggedContext.futureIndex}`);
    },
    onDelImgList() {
      this.imgList.splice(0, this.imgList.length);
    },
    onPrev() {
      // this.$refs.imgBox.$el.scrollBy(-this.scrollX, 0); // can't use at IE
      this.$refs.imgBox.$el.scrollLeft = this.$refs.imgBox.$el.scrollLeft - this.scrollX;
    },
    onNext() {
      // this.$refs.imgBox.$el.scrollBy(this.scrollX, 0); // can't use at IE
      this.$refs.imgBox.$el.scrollLeft = this.$refs.imgBox.$el.scrollLeft + this.scrollX;
    },
    getComma(value) {
      return utils.numberFormat(value, 2);
    },
    checkFileType(files) {
      let rtnVal = true;
      const _re = /^.+\.(\w*$)/; // 파일 확장자 추출용 정규표현식
      for (let i = 0; i < files.length; i += 1) {
        const reExec = _re.exec(files[i].name);
        const extList = this.getFileExtWhiteList(this.attachGroupItemList[0].attachPossibilityExtensionCode);
        if (!extList.includes(reExec[1].toUpperCase())) {
          rtnVal = false;
          break;
        }
      }
      return rtnVal;
    },
    checkAttachSize(files) {
      let preAttachSize = 0;
      utils.forEach(files, file => {
        preAttachSize += file.size;
      });
      // eslint-disable-next-line
      return this.attachRestrictionSize === 0 || ((this.totalSize + preAttachSize) < this.attachRestrictionSize * 1024 * 1024);
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
    /**
     * 파일명이 동일한 놈이 있는지 확인하여 파일명을 반환하거나 빈값을 반환
     * @function findDuplicateFileName
     * @param {Array} files: 선택된 파일들
     * @returns {String} :
     */
    findDuplicateFileName(files) {
      let _dupFileName = '';
      for (let i = 0; i < this.imgList.length; i += 1) {
        for (let j = 0; j < files.length; j += 1) {
          if (files[j].name === this.imgList[i].fileName) {
            _dupFileName = files[j].name;
            break;
          }
        }
      }
      return _dupFileName;
    },
    /**
     * 대표이미지가 존재하지 않으면 경고창 띄우고 Promise 를 반환
     * @function alertNotExistRepresentativeImage
     * @param {None}
     * @returns {Promise}
     */
    alertNotExistRepresentativeImage() {
      return new Promise((resolve, reject) => {
        if (!this.checkRepresentativeImageExist()) {
          // 대표로 보여질 사진을 선택해주세요.
          utils.messageBox('alert', this.$t('MSG_BTN_CFRM'), this.$t('MSG_TXT_SELECT_RPRS_PHOTO'), () => {
            reject();
          });
        } else {
          resolve();
        }
      });
    },
    /**
     * 대표이미지가 존재한다면 true, 아니면 false 반환
     * 이미지 목록이 0 일 경우에도 저장은 확인해봐야 함 TODO:
     * @function checkRepresentativeImageExist
     * @param {None}
     * @returns {Boolean}
     */
    checkRepresentativeImageExist() {
      let retVal = false;

      if (this.imgList.length === 0) {
        retVal = true;
      } else {
        for (let i = 0; i < this.imgList.length; i += 1) {
          if (utils.isEqual(this.imgList[i].representativeImageYn, 'Y')) {
            retVal = true;
            break;
          }
        }
      }
      return retVal;
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
     * 이미지 파일 정보 목록을 반환한다.
     * @function getImageList
     * @param {None}
     * @returns {Array} : 이미지 파일 object list
     */
    getImageList() {
      const _imageList = utils.cloneDeep(this.attachGroupItemList[0].attachFileList);
      _imageList.forEach((img, index) => {
        img.arrayalOrder = index + 1; // eslint-disable-line
        img.attachGroupId = this.attachGroupItemList[0].attachGroupId; // eslint-disable-line
        img.attachItemId = this.attachGroupItemList[0].attachItemId; // eslint-disable-line
      });
      return _imageList;
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
