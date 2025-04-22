<template>
  <div>
    <div class="portlet_bottom">
      <div
        v-if="pageItem.homeCardId === 'HCD_00001'"
        class="left"
      >
        <sui-button
          type="button"
          class="btn_txt_GR_arrow"
          @click="onMoreView"
        >
          {{ this.$t('MSG_TXT_SHOW_MORE') }}
        </sui-button>
      </div>
      <!-- <div class="left">
        <sui-button type="button" class="btn_txt_GR_arrow">상세보기</sui-button>
      </div> -->
      <div class="right">
        <span :class="pageItem.homeCardTypeCode === 'D' ? 'ico_dashboard' : 'ico_notice'">
          {{ pageItem.homeCardTypeName }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
// import BasePage from '~cm/components/BasePage';

export default {
  name: 'SuiPageCardFooter',
  // extends: BasePage,
  props: {
    pageItem: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    bbsId() {
      return utils.getParameter(this, 'bbsId');
    },
  },
  methods: {
    onMoreView() {
      const pageId = 'PGE_CMB_00001';
      const queryString = `bbsId=${this.bbsId}`;
      // const url = `${window.location.origin}/#/${pageId}?${queryString}`;
      if (!utils.isEmpty(this.bbsId)) {
        utils.openWindowPopup(pageId, queryString);
      }
      // window.open(url);
    },
  },
};
</script>
<style scoped>
.portlet_bottom {
  display:inline-flex;
  margin-top: auto;
  width:100%;
  line-height:40px;
  position: absolute;
  bottom: 0;
  background-color: #ffffff;
}
.portlet_bottom .left{justify-content: flex-start;margin-left:28px;}
.portlet_bottom .right {justify-content: flex-end;margin-left:auto;margin-right:28px}
.btn_txt_GR_arrow  {
  font-size: 12px;
  color:#333;
  font-weight:normal;
  padding-right:10px;
  background:url('../../../../assets/images/ic_hyperling_blue_disable.png') no-repeat right 7px}
.portlet_bottom .right .ico_todo {
  font-size:10px;
  color:#a5a5a5;
  padding-right:20px;
  width:16px;
  height:16px;
  background:url('../../../../assets/images/ic_todo_tag_off.png') no-repeat 98% 2px;
}
.portlet_bottom .right .ico_dashboard {
  font-size:10px;
  color:#a5a5a5;
  padding-right:20px;
  width:16px;
  height:16px;
  background:url('../../../../assets/images/ic_dashboard_tag_off.png') no-repeat 98% 2px;
}
.portlet_bottom .right .ico_notice {
  font-size:10px;
  color:#a5a5a5;
  padding-right:20px;
  width:16px;
  height:16px;
  background:url('../../../../assets/images/ic_notice_tag_off.png') no-repeat 98% 2px;
}
</style>