<template>
  <div>
    <div class="comm_popup_wrap_small">
      <div class="comm_title_wrap">
        <h4>{{ folderYn === 'Y' ? $t('MSG_ALT_INPUT_FLDR_NM') : $t('MSG_ALT_INPUT_BKMK_NM') }}</h4>
      </div>
      <sui-text-field
        ref="textFolderName"
        v-model="newFolderName"
        placeholder=""
        :disabled="false"
        :readonly="false"
        :trim="true"
      />
      <div class="mrB20" />
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onCancelClick"
      >
        {{ $t('MSG_BTN_CANCEL') }}
      </sui-button>
      <sui-button
        type="button"
        class="comm_btn_solid"
        @click="onConfirmClick"
      >
        {{ $t('MSG_BTN_CFRM') }}
      </sui-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PGE_CMP_00001_P01',
  props: {
    folderName: {
      type: String,
      default() {
        return '';
      },
    },
    folderPopupType: {
      type: String,
      default() {
        return 'new';
      },
    },
    folderYn: {
      type: String,
      default() {
        return 'Y';
      },
    },
    parentsBookmarkUid: {
      type: String,
      default() {
        return 'Y';
      },
    },
  },
  data() {
    return {
      newFolderName: this.folderName,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.textFolderName.setFocus();
    });
  },
  methods: {
    onCancelClick() {
      this.$emit('bookmark-popup-cancel');
    },
    onConfirmClick() {
      if (utils.isEmpty(this.newFolderName)) {
        utils.messageBox('warning',
          this.folderYn === 'Y' ? this.$t('MSG_ALT_INPUT_FLDR_NM') : this.$t('MSG_ALT_INPUT_BKMK_NM'), null,
          () => {
            this.$refs.textFolderName.setFocus();
          });
        return false;
      }
      this.$emit('bookmark-popup-save', this.newFolderName, this.folderPopupType, this.parentsBookmarkUid);
      return true;
    },
  },
};
</script>

<style scoped>
</style>
