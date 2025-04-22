<template>
  <div>
    <div class="flexbox-parent">
      <div class="flexbox-item header">
        <h4>{{ noticeTitle }}</h4>
      </div>
      <div class="flexbox-item fill-area content flexbox-item-grow">
        <sui-web-editor
          v-if="isInitialized"
          ref="noticeViewer"
          :isViewer="true"
          :initial-value="noticeContent"
          :height="viewerHeight"
          class="width100"
        />
      </div>
      <div class="flexbox-item footer">
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
      </div>
    </div>
  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMZ_00023', // eslint-disable-line vue/name-property-casing
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
      checkNoNotice: false,
      noticeMessage1: this.$t('MSG_TXT_NOT_OPEN_TODY'),
      noticeMessage2: this.$t('MSG_TXT_NOT_OPEN'),
    };
  },
  created() {
    this.noticeContent = '';
  },
  mounted() {
    this.noticeUid = utils.getParameter(this, 'id');
    this.isPreview = utils.getParameter(this, 'isPreview') || false;
    this.getNoticeInfo().then(() => {
      this.isInitialized = true;
    }).catch(err => {
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
          const sizeCode = utils.getParameter(this, 'sizeCode');
          if (sizeCode === 'S') {
            height = 250;
          } else if (sizeCode === 'M') {
            height = 450;
          } else if (sizeCode === 'L') {
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
<style>
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.flexbox-parent {
  width: 100% !important;
  height: 100% !important;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* align items in Main Axis */
  align-items: stretch; /* align items in Cross Axis */
  align-content: stretch; /* Extra space in Cross Axis */
  padding:20px
}

.flexbox-item{ }
.flexbox-item-grow
{
    flex: 1; /* same as flex: 1 1 auto; */
}

.flexbox-item.header{font-size:20px; font-weight:bold;color:#333;margin-bottom: 10px;}

.flexbox-item.footer .comm_btn_wrap{ margin:20px 0 0 0 }
.flexbox-item.content{}

.fill-area {
   display: flex;
  flex-direction: row;
  justify-content: flex-start; /* align items in Main Axis */
  align-items: stretch; /* align items in Cross Axis */
  align-content: stretch; /* Extra space in Cross Axis */

}
.fill-area-content
{
    border:1px solid #ccc;
  background-color:#f7f7f7;

    /* Needed for when the area gets squished too far and there is content that can't be displayed */
    overflow: auto;
}
.-gnb--hide .body-container{top:0 !important}
.-page-root-container {height:100% !important}

.tui-editor-contents {padding:0 10px !important}
/* .notice_popup_wrap{
  margin:0 30px;
  max-height: 580px;
  overflow-y: auto;
}
.notice_list{
  padding: 8px;
  border:1px solid #ccc;
  background-color:#f7f7f7;
  height:250px;
  overflow-y:auto;
  max-height:250px;}
.notice_title_wrap { display:-webkit-flex; display:flex; position:relative;margin:20px 0 15px 0 }
.notice_title_wrap h4{ font-size:20px; font-weight:bold;color:#333;line-height:30px;} */
</style>
