<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div>
        <div>
          <h4 class="mrB10">
            {{ noticeTitle }}
          </h4>
          <!-- <span style="line-height:1.5;">
            {{ noticeContent }}
          </span> -->
          <div ref="editorContainer" class="-editor__wrap">
            <sui-web-editor
              v-if="isInitialized"
              ref="webeditor"
              :initial-value="noticeContent"
              :height="viewerHeight"
              :isViewer="isViewer"
              class="width100"
            />
          </div>
        </div>
        <div class="mrB10" />
        <div
          style="line-height:30px; height:30px"
          class="posi_r"
        >
          <div
            class="posi_a"
            style="right:0;top:0;"
          >
            <sui-radio
              v-model="agreeA"
              value="Y"
            >
              {{ this.$t('MSG_TXT_AGRT') }}
            </sui-radio>
            <sui-radio
              v-model="agreeA"
              value="N"
            >
              {{ this.$t('MSG_TXT_NO_AGRT') }}
            </sui-radio>
          </div>
        </div>
      </div>
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_solid"
          :disabled="!allAgree || isPreview"
          @click="onConfirmClick"
        >
          {{ this.$t('MSG_BTN_CFRM') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMZ_00024', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    closePagePopup: {
      type: Function,
      default: () => {},
    },
    // 필수값 codeId
    pageInitialData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      isViewer: true,
      isInitialized: false,
      viewerHeight: 0,
      isPreview: false,
      noticeUid: '',
      noticeTitle: '',
      noticePopupShapeCode: '',
      noticePopupTypeCode: '',
      noticeContent: this.$t('MSG_TXT_NO_NTC'),
      agreeA: 'N',
    };
  },
  computed: {
    allAgree() {
      return utils.isEqual(this.agreeA, 'Y');
    },
    session() {
      return this.$store.getters.userInfo;
    },
    popupType() {
      // 팝업 유형 코드가 1회인 경우 로그 등록
      return utils.isEqual(this.noticePopupTypeCode, 'O');
    },
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

    /*
    if (utils.isEmpty(this.pageInitialData.previewData)) {
      this.onNoticeLoad();
    } else {
      this.previewFlag = true;
      const { previewData } = this.pageInitialData;
      this.noticeTitle = previewData.noticeTitle;
      this.viewerSetValue(previewData.noticeContent);
    }
    */
  },
  methods: {
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
          console.error(err);
          reject(err);
        });
      });
    },
    onConfirmClick() {
      if (this.popupType) {
        const saveData = {
          noticeUid: this.noticeUid,
          userId: this.$store.getters.userInfo.userId,
        };
        http.request(this.$options.name, 'DTS_CMZ_00134', {
          path: {
            'notice-uid': this.noticeUid,
          },
          data: saveData,
        }).then(() => {
          this.close();
          // this.closePagePopup();
        }).catch(error => {
          console.log(error);
        });
      } else {
        this.close();
        // this.closePagePopup();
      }
    },
    close() {
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
</style>
