<template>
  <sui-page>
    <!-- Page Header -->
    <sui-page-header :pageId="this.$options.name" />

    <!-- Page Contents -->
    <sui-page-contents>
      <pehs-file-attacher
        :pageId="this.$options.name"
        ref="pehsFileAttacher"
        :showDDRegion="false"
      />
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button type="button" class="comm_btn_border" @click="onCancel">{{ $t("MSG_BTN_CANCEL") }}</sui-button>
        <sui-button type="button" class="comm_btn_solid" @click="onConfirm">{{ $t("MSG_BTN_CFRM") }}</sui-button>
      </div>
    </sui-page-footer>
  </sui-page>

</template>

<script>

export default {
  props: {
    closePagePopup : {
      type: Function,
    },
    pageInitialData: {
      type: Object,
    },
  },
  name: 'PGE_CMZ_00011',
  computed: {
  },
  data() {
    return {};
  },
  mounted() {
    // 첨부문서ID가 존재하면 해당 ID 로 조회
    if( !utils.isEmpty(this.pageInitialData.attachDocumentId)){
      this.$refs.pehsFileAttacher.searchAttachedFileInfoByDocId(this.pageInitialData.attachDocumentId)
    }
  },
  beforeDestroy() {
    // 이벤트 핸들러 및 사용한 서드 파티 라이브러리 자원 반환
  },
  methods: {
    onClose() {
      // 입력한 내용을 삭제하고 작업을 종료합니다. 계속하시겠습니까?
      utils.messageBox("confirm",this.$t('MSG_BTN_CFRM'),this.$t('MSG_ALT_CFRM_CNTN_DEL'),
        () => {
          this.closePagePopup('');
        }
      );
    },
    /**
     * 확인 버튼 click event handler
     * @function onConfirm
     * @returns {Array} : 다국어 Object Array
     */
    onConfirm(){
      this.closePagePopup(this.$refs.pehsFileAttacher.getGridFileListInfo());
    },
    onCancel(){
      this.onClose();
    }
  },
};

</script>

<style lang="scss">
</style>
<style scoped>
</style>
