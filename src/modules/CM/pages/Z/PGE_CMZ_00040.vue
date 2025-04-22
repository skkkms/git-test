<template>
  <sui-page>
    <!-- Page Header -->
    <sui-page-header :pageId="this.$options.name" />

    <!-- Page Contents -->
    <sui-page-contents>
      <div
        class="thumbnail_wrap"
      >
        <div>
          <sui-button
            type="button"
            class="btn_Pre"
            :disabled="imageIndex === 0"
            @click="onClickPrevBtn"
          >
            {{ $t('MSG_BTN_GO_PREV') }}
          </sui-button>
        </div>
        <div
          class="box1"
        >
          <div
            v-if="imageIndex >= 0"
            class="imgBox"
            :style="{ 'background-image': `url(${imageList[imageIndex].imgSrc})` }"
            @click="toggleImgSize"
          >
            <sui-button
              v-show="true"
              type="button"
              :class="imageList[imageIndex].representativeImageYn === 'Y' ? 'imgbox-btn-prps-y' : 'imgbox-btn-prps-n'"
            >
              {{ $t('MSG_BTN_RPRS') }}
            </sui-button>
          </div>
        </div>
        <div>
          <sui-button
            type="button"
            class="btn_Next"
            :disabled="(imageList.length - 1) === imageIndex"
            @click="onClickNextBtn"
          >
            {{ $t('MSG_BTN_GO_BACK') }}
          </sui-button>
        </div>
      </div>
      <div class="comm_title_wrap">
        <div
          v-if="imageIndex >= 0"
          class="file"
        >
          <span>{{ imageList[imageIndex].fileName }}</span>({{ imageList[imageIndex].fileSize | convertToFileSizeFormat }})
        </div>
        <div class="btn_wrap dp_inflex">
          <sui-button
            type="button"
            class="comm_sbtn_border"
            :disabled="imageIndex < 0 || !imageList[imageIndex].fileUid"
            @click="onClickDownload"
          >
            {{ this.$t('MSG_BTN_DLOAD') }}
          </sui-button>
        </div>
      </div>
    </sui-page-contents>

    <!-- Page Footer -->
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onSelect"
        >
          {{ this.$t('MSG_BTN_CFRM') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
export default {
  name: 'PGE_CMZ_00040', // eslint-disable-line vue/name-property-casing
  props: {
    closePagePopup: {
      type: Function,
      default: null,
    },
    pageInitialData: {
      type: Object,
      default() {
        return {
          file: {},
        };
      },
    },
  },
  data() {
    return {
      imageIndex: -1,
      imageList: [],
      attachGroupId: '',
      attachDocumentId: '',
      downloadReasonInputYn: '',
      downloadHistoryManagementYn: '',
      imgPreviewRate: '90%',
    };
  },
  mounted() {
    if (this.pageInitialData.imgList && this.pageInitialData.index >= 0) {
      this.imageIndex = this.pageInitialData.index;
      this.imageList = this.pageInitialData.imgList;
      this.attachGroupId = this.pageInitialData.attachGroupId;
      this.attachDocumentId = this.pageInitialData.attachDocumentId;
      this.downloadReasonInputYn = this.pageInitialData.downloadReasonInputYn;
      this.downloadHistoryManagementYn = this.pageInitialData.downloadHistoryManagementYn;
    }
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

      // 1024 byte 이하이면 항상 1 KB
      if (value < 1024) {
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
  methods: {
    getComma(value) {
      return utils.numberFormat(value, 2);
    },
    onClickName() {

    },
    onClickPrevBtn() {
      this.imageIndex -= 1;
    },
    onClickNextBtn() {
      this.imageIndex += 1;
    },
    // 취소
    onCancel() {
      this.cancel();
    },
    onSelect() {
      this.closePagePopup('');
    },
    // 취소
    cancel() {
      this.closePagePopup('');
    },
    /**
     * 이미지 사이즈를 original 과 미리보기 사이즈 사이에서 toggle
     * @function toggleImgSize
     * @param {Object} event
     * @returns {None}
     */
    toggleImgSize(e) {
      const _img = e.srcElement;
      if (_img.getAttribute('width')) {
        _img.removeAttribute('width');
        _img.removeAttribute('height');
      } else {
        _img.setAttribute('width', this.imgPreviewRate);
        _img.setAttribute('height', this.imgPreviewRate);
      }
    },
    /**
     *
     * @function onImgLoad
     * @param {Object} event
     * @returns {None}
     */
    onImgLoad(e) {
      const _img = e.srcElement;
      _img.setAttribute('width', this.imgPreviewRate);
      _img.setAttribute('height', this.imgPreviewRate);
    },
    /**
     * 이미지 파일명 click event handler
     * 다운로드사유 입력여부가 'Y'이면 다운로드 사유 입력창 띄움
     * @function onClickDownload
     * @param {None}
     * @returns {None}
     */
    onClickDownload() {
      const that = this;
      const curImage = this.imageList[this.imageIndex];

      if (!['N', 'n'].includes(this.downloadReasonInputYn)) {
        utils.openLayerPopup('PGE_CMZ_00041', result => {
          // TODO: 다운로드 사유 입력 경로 미정의됨
          curImage.fileDownloadReasonContent = result;

          if (!utils.isEmpty(result)) {
            that.downloadSingleFile(curImage).then(() => {
              that.insertFileDownloadHistory(curImage);
            }).catch(err => {
              console.log(err);
              utils.messageBox('error', that.$t('MSG_BTN_CFRM'), err);
            });
          }
        },
        {
          size: 'md',
        });
      } else {
        this.downloadSingleFile(curImage).then(() => {
          if (!['N', 'n'].includes(this.downloadHistoryManagementYn)) {
            this.insertFileDownloadHistory(curImage);
          }
        }).catch(err => {
          console.log(err);
          utils.messageBox('error', this.$t('MSG_BTN_CFRM'), err);
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

      http.request(this.$options.name, 'DTS_CMZ_00103', {
        data: _imgFileInfo,
      }).then(res => {
        console.log(res);
        return Promise.resolve(res);
        // this.downloadSingleFile(_imgFileInfo);
      }).catch(err => {
        utils.messageBox('error', this.$t('MSG_BTN_CFRM'), err.message, () => Promise.reject(err));
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
        http.request(this.$options.name, 'DTS_CMZ_00068', {
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
  },
};
</script>
<style scoped>
.-page-popup__wrapper .thumbnail_wrap {height:300px;border:none}
.-page-popup__wrapper .thumbnail_wrap .box1 {width:88%}
.-page-popup__wrapper .thumbnail_wrap .box1 .imgBox { height:300px;}


.-page-popup__wrapper .thumbnail_wrap .btn_Pre {top:0}
.-page-popup__wrapper .thumbnail_wrap .btn_Next {top:0}
.comm_title_wrap { 
  width: 553px;
  margin-top: 8px !important;
  margin-left: 40px;
}
.comm_title_wrap .file {font-size:13px;color:#767676}

.comm_sbtn_border {
    font-size: 13px;
    padding: 0 10px;
    margin-left: 0;
    color: #5a5a5a;
    background-color: #fff;
    height: 30px;
    border: 1px solid #ccc;
    white-space: nowrap;
}
.comm_sbtn_border:hover {
    background-color: #f5f5f5;
}
.comm_sbtn_border:focus {
    background-color: #eaeaea;
}
.comm_sbtn_border:disabled {
    color: #dbdbdb;
    background-color: #fff;
    border: solid 1px #eaeaea;
    cursor: default;
}
.imgbox-modal {
    width: 100%;
    /*width: 830px;*/
    height: 100%;
    /* position: absolute; */
    display: table;
}
.imgbox-modal-text {
    display: table-cell;
    text-align: center;
    vertical-align: middle;

}
.imgbox-modal-text h4 {
    display: inline-block;
    font-size: 13px;
    color: #959595;
    background-image:url('../../../../assets/images/ic_imgSample.png');
    background-repeat: no-repeat;
    background-position: 0 2px;
    padding-left: 23px;
    font-weight:normal;
}
.attach-file {
    border: 1px solid red;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: absolute;
}
.imgbox-list-group {
    display: flex;
    width: 100%;
}
.imgbox-btn-prps-n {
    font-size: 12px;
    padding: 0 12px;
    color: #666;
    background-color: #fff;
    height:20px;
    border:1px solid #ccc;
    min-width:44px;
    margin:4px;
    border-radius:20px
}
.imgbox-btn-prps-y {
    font-size: 12px;
    padding: 0 12px;
    color:#fff;
    background-color:#536dc2;
    height:20px;
    border:none;
    min-width:44px;
    margin:4px;
    border-radius:20px
}
.thumbnail_wrap .box .imgBox:before {
    z-index: initial;
}
.myscroll {
    overflow-x: auto;
    /*width: 830px;*/
    width: 100%;
}
.myscroll::-webkit-scrollbar {
    width: 7px;
    height: 7px;
    border-radius: 3.5px;
    background: #dfdfdf;
}
.myscroll::-webkit-scrollbar-track {
    border-radius: 3.5px;
    background-color: #dfdfdf;
}
.myscroll::-webkit-scrollbar-thumb {
    border-radius: 3.5px;
    background-color: rgba(0, 0, 0, 0.2);
}
.w150 {
    width: 160px;
}
.thumbnail_wrap .box1{position: relative;margin:0 8px; width: 150px;display:table}
.thumbnail_wrap .box1 .imgBox{
    position:relative;
    border:1px solid #dbdbdb;
    background-color: #eaeaea;
    height: 112px;
    /*background-size:100% 100%;*/
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
.thumbnail_wrap .box1 .imgBox .btn_list_del {
    /*z-index:8;*/
    top: 4px;
    right: 5px;
    opacity:0;
    /*transition:all 0.6s;*/
    position:absolute;
    width:20px;
    height:30px;
    float: right;
    background: url('../../../../assets/images/btn_img_del.png') right 3px no-repeat ;
    text-indent:-9999px;
}
.thumbnail_wrap .box1 .imgBox:hover .btn_list_del {
    opacity:1;
}
.thumbnail_wrap .box1 .file{
    display:inline-block;
    font-size:13px;
    color:#767676;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    width: 160px;
    overflow: hidden;
}
.thumbnail_wrap .box1 .file a{
    color:#60a3ef;
    text-decoration:underline;
}
</style>
