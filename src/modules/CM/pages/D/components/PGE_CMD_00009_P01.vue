<template>
  <div>
    <div class="comm_popup_wrap_medium">
      <div class="module_msg_box">
        <textarea
          v-text="fileDownloadReasonContent"
          name="name"
          rows="10"
          :disabled="false"
          :readonly="true"
        />
      </div>
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button
        type="button"
        class="comm_btn_solid"
        @click="onClickClose"
      >
        {{ $t('MSG_BTN_CLOSE') }}
      </sui-button>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMD_00009_P01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: null,
    },
    fileDownloadReasonContent: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
    };
  },
  methods: {
    onClickClose() {
      this.$emit('onClickClose');
    },
  },
};
</script>
<style scoped>
</style>
