<template>
    
</template>

<script>
import Constants from '~system/Constants';

export default {
  props: {
    enableAppNotice: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      noticePool: [],
      showPopup: false,
    };
  },
  mounted() {
    if (this.enableAppNotice) {
      this.processNoticeList();
    }
    utils.install('showNotices', this.showNotices);
  },
  methods: {
    showNotices(noticeList) {
      if (!this.enableAppNotice) {
        return;
      }
      const notices = this.getNotices(noticeList);
      this.processWindowNoticeList(notices.window);

      if (notices.layer.length) {
        notices.layer.forEach(notice => {
          this.noticePool.push(notice);
        });
        if (!this.showPopup) {
          this.processNoticePool();
        }
      }
      if (utils.isEmpty(this.$store.getters.userInfo.departmentId)) {
        this.personalInfoRegister();
      }
    },

    getNotices(noticeList) {
      const layerNoticeList = [];
      const windowNoticeList = [];
      _.forEach(noticeList, notice => {
        const id = notice.noticeUid;
        const typeCode = notice.noticePopupTypeCode;
        const cookie = utils.getCookieNoNotice(id);
        let enabled = false;
        if (cookie === '') { // cookie 값이 없음
          enabled = true;
        } else if (cookie !== typeCode) { // cookie값이 있음 cookie값은 noticePopupTypeCode가 저장됨
          enabled = true;
          utils.deleteCookieNoNotice(id);
        }
        if (enabled) {
          if (notice.noticePopupShapeCode === 'W') {
            windowNoticeList.push(notice);
          } else {
            layerNoticeList.push(notice);
          }
        }
      });
      return {
        layer: layerNoticeList,
        window: windowNoticeList,
      };
    },

    processNoticeList() {
      const noticeList = this.$store.getters.appNoticeList;
      const notices = this.getNotices(noticeList);
      this.processWindowNoticeList(notices.window);
      this.noticePool = notices.layer;
      this.processNoticePool();
    },

    onAgreementPopupClose(data, pageInitialData) {
      this.showPopup = false;
      const { noticePool } = pageInitialData;
      if (data === null) {
        this.noticePool = [];
        utils.goEmpty();
      } else {
        this.processNoticePool(noticePool);
      }
    },

    onNoticePopupClose(data, pageInitialData) {
      this.showPopup = false;
      const { noticePool } = pageInitialData;
      this.processNoticePool(noticePool);
    },

    processWindowNoticeList(noticePool) {
      let width = null;
      let height = null;
      let left = 0;
      let top = 0;
      const delta = 50;
      _.forEach(noticePool, notice => {
        const title = notice.noticeTitle;
        const id = notice.noticeUid;
        const sizeCode = notice.noticePopupSizeCode;

        if (sizeCode === 'S') {
          width = '470px';
          height = '400px';
        } else if (sizeCode === 'M') {
          width = '700px';
          height = '600px';
        } else if (sizeCode === 'L') {
          width = '940px';
          height = '760px';
        }

        const popupPageId = Constants.PAGE_ID_NOTICE_WINDOW;

        const options = {
          width,
          height,
          left,
          top,
          resizable: false,
        };

        utils.openWindowPopup(popupPageId, {
          title,
          id,
          sizeCode,
        }, title, options);

        left += delta;
        top += delta;
      });
    },

    processNoticePool() {
      if (this.noticePool.length) {
        const notice = this.noticePool.shift();
        let size = '';
        const title = notice.noticeTitle;
        const id = notice.noticeUid;

        const typeCode = notice.noticeTypeCode;
        const sizeCode = notice.noticePopupSizeCode;

        if (sizeCode === 'S') {
          size = 'sm';
        } else if (sizeCode === 'M') {
          size = 'md';
        } else if (sizeCode === 'L') {
          size = 'lg';
        }

        let popupPageId = null;
        if (typeCode === 'N') {
          popupPageId = Constants.PAGE_ID_NOTICE_LAYER;
        } else if (typeCode === 'A') {
          popupPageId = Constants.PAGE_ID_AGREEMENT;
        }

        utils.openLayerPopup(
          popupPageId,
          (typeCode === 'N') ? this.onNoticePopupClose : this.onAgreementPopupClose,
          {
            size,
            pageInitialData: {
              notice,
              title,
              id,
              sizeCode,
            },
          },
        );
        this.showPopup = true;
      }
    },
    personalInfoRegister() {
      utils.openLayerPopup('PGE_CMP_00020',
        this.onClosePagePopup,
        {
          pageInitialData: {
          },
          size: 'xlg',
        });
    },
  },
};

</script>
