<template>
  <sui-page>
    <!-- Page Header -->
    <sui-page-header :pageId="this.$options.name" />

    <!-- Page Contents -->
    <sui-page-contents>
      <div class="module_msg_box">
        <textarea name="name" rows="5" v-model="downloadReason" :placeholder="$t('MSG_TXT_DO_DLOAD_RSN_INP')"></textarea>
      </div>
    </sui-page-contents>

    <!-- Page Footer -->
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onCancel"
        >
          {{ this.$t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onSelect"
        >
          {{ this.$t('MSG_BTN_APPLY') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
export default {
  name: 'PGE_CMZ_00041', // eslint-disable-line vue/name-property-casing
  props: {
    closePagePopup: {
      type: Function,
    },
  },
  data() {
    return {
        downloadReason: '',
    };
  },
  methods: {
    // 취소
    onCancel() {
      this.cancel();
    },
    onSelect(){
        if(utils.isEmpty(this.downloadReason.trim())){
            utils.messageBox("warning",this.$t('MSG_BTN_CFRM'),this.$t('MSG_TXT_DO_DLOAD_RSN_INP'));
        }
        else{
            this.closePagePopup(this.downloadReason.trim());
        }
    },
    // 취소
    cancel() {
      this.closePagePopup('');
    },
  },
};
</script>
<style scoped>
</style>