<template>
  <sui-page>
    <!-- Page Header -->
    <sui-page-header :pageId="this.$options.name" />

    <!-- Page Contents -->
    <sui-page-contents>
      <div class="comm_view_wrap">
        <cmp-file-attacher
          v-if="attachGroupId != ''"
          ref="fileAttacherPop"
          :pageId="this.$options.name"
          :attachGroupId="attachGroupId"
          :attachDocumentId="attachDocumentId"
          :initialAttachGroupItemList="initialAttachGroupItemList"
          :disabled="disabled"
          :showAddDeleteBtn="showAddDeleteBtn"
          :enableAdd="enableAdd"
          :deletableOld="deletableOld"
          :showDnHistoryBtn="showDnHistoryBtn"
        />
      </div>
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <!--
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onCancel"
        >
          {{ $t("MSG_BTN_CANCEL") }}
        </sui-button>
        -->
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onConfirm"
        >
          {{ $t("MSG_BTN_CFRM") }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>

<script>

export default {
  name: 'PGE_CMZ_00061', // eslint-disable-line vue/name-property-casing
  props: {
    closePagePopup: {
      type: Function,
    },
    pageInitialData: {
      type: Object,
    },
  },
  data() {
    return {
      attachGroupId: '',
      attachDocumentId: '',
      disabled: false,
      showAddDeleteBtn: true,
      enableAdd: true,
      deletableOld: true,
      showDnHistoryBtn: false,
      initialAttachGroupItemList: [],
    };
  },
  mounted() {
    this.attachGroupId = this.pageInitialData.attachGroupId || '';
    this.attachDocumentId = this.pageInitialData.attachDocumentId || '';
    this.disabled = typeof this.pageInitialData.disabled === 'boolean' ? this.pageInitialData.disabled : false;
    this.showAddDeleteBtn = typeof this.pageInitialData.showAddDeleteBtn === 'boolean' ? this.pageInitialData.showAddDeleteBtn : true;
    this.enableAdd = typeof this.pageInitialData.enableAdd === 'boolean' ? this.pageInitialData.enableAdd : true;
    this.deletableOld = typeof this.pageInitialData.deletableOld === 'boolean' ? this.pageInitialData.deletableOld : true;
    this.showDnHistoryBtn = typeof this.pageInitialData.showDnHistoryBtn === 'boolean' ? this.pageInitialData.showDnHistoryBtn : false;
    if (!utils.isEmpty(this.pageInitialData.itemList)) {
      this.initialAttachGroupItemList = this.pageInitialData.itemList;
    }
  },
  methods: {
    onClose() {
      // 입력한 내용을 삭제하고 작업을 종료합니다. 계속하시겠습니까?
      utils.messageBox('confirm', this.$t('MSG_BTN_CFRM'), this.$t('MSG_ALT_CFRM_CNTN_DEL'),
        () => {
          this.closePagePopup('');
        });
    },
    /**
     * 확인 버튼 click event handler
     * @function onConfirm
     * @returns {Array} : 다국어 Object Array
     */
    onConfirm() {
      // this.closePagePopup(this.$refs.fileAttacherPop.getAttachFileListInfo());
      this.closePagePopup(this.$refs.fileAttacherPop.getAttachGroupItemListInfo());
    },
    onCancel() {
      this.onClose();
    },
    /*
    setAttachGroupItemList(itemList) {
      this.$refs.fileAttacherPop.setAttachGroupItemList(itemList);
    },
    */
  },
};

</script>

<style lang="scss">
</style>
<style scoped>
</style>
