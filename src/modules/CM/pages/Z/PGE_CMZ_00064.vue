<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div
        ref="editorContainer" class="-editor__wrap"
      >
        <sui-web-editor
          v-if="isInitialized"
          ref="noticeViewer"
          :isViewer="true"
          :initial-value="noticeContent"
          :height="viewerHeight"
          class="width100"
        />
      </div>
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-checkbox
          v-model="checkNoNotice"
          @input="onInputCheckNoNotice"
        >
          {{ noticePopupTypeCode === 'D' ? noticeMessage1: noticeMessage2 }}
        </sui-checkbox>
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onClose"
        >
          {{ $t('MSG_BTN_CLOSE') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMZ_00064', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    closePagePopup: {
      type: Function,
      required: false,
      default: null,
    },
    pageInitialData: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      isInitialized: false,
      viewerHeight: 0,
      isPreview: false,
      noticeUid: '',
      noticeTitle: '',
      noticePopupShapeCode: '',
      noticePopupTypeCode: '',
      noticeContent: this.$t('MSG_TXT_NO_NTC'),
      checkNoNotice: false,
      noticeMessage1: this.$t('MSG_TXT_NOT_OPEN_TODY'),
      noticeMessage2: this.$t('MSG_TXT_NOT_OPEN'),
    };
  },
  mounted() {
    this.noticeUid = utils.getParameter(this, 'id');
    this.isPreview = utils.getParameter(this, 'isPreview') || false;
    this.getNoticeInfo().then(() => {
      this.isInitialized = true;
    }).catch(err => {
      this.isInitialized = true;
      console.log(err);
    });
  },
  methods: {
    onInputCheckNoNotice() {
      if (!this.isPreview) {
        if (this.checkNoNotice) {
          utils.setCookieNoNotice(this.noticeUid, this.noticePopupTypeCode);
        } else {
          utils.deleteCookieNoNotice(this.noticeUid);
        }
      }
    },
    getNoticeInfo() {
      return new Promise((resolve, reject) => {
        let queryParam = {};
        if (this.isPreview) {
          queryParam = {
            noticeApplySiteId: utils.getParameter(this, 'noticeApplySiteId'),
          };
        }
        http.request(this.$options.name, 'DTS_CMP_00055', {
          query: this.isPreview ? queryParam : {},
          path: {
            'notice-uid': this.noticeUid,
          },
        }).then(res => {
          let height = 400;
          this.noticeTitle = res.data.noticeTitle;
          this.noticePopupShapeCode = res.data.noticePopupShapeCode;
          this.noticePopupTypeCode = res.data.noticePopupTypeCode;
          this.noticeContent = res.data.noticeContent;
          if (this.pageInitialData.sizeCode === 'S') {
            height = 250;
          } else if (this.pageInitialData.sizeCode === 'M') {
            height = 450;
          } else if (this.pageInitialData.sizeCode === 'L') {
            height = 610;
          }
          this.viewerHeight = height;
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      });
    },
    onClose() {
      if (this.noticePopupShapeCode === 'W') {
        window.close();
      } else {
        this.closePagePopup('');
      }
    },
  },
};
</script>

<style scoped>
.-page-popup__contents .-page .-page-contents {
  max-height: 100%;
  overflow-y: hidden;
}

.-editor__wrap {
  /* border: 1px solid grey; */
  /* box-sizing: border-box; */
  height: 100%;
}
</style>
