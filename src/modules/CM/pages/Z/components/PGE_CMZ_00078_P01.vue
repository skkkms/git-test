<template>
  <div>
    <div class="comm_popup_wrap_medium">
      <div class="comm_view_wrap">
        <div class="row">
          <div
            class="col-xs-3"
            style="background-color:#F6F7F9;"
          >
            <sui-input-label
              :label="$t('MSG_TXT_GRP_NM')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-9">
            <cmp-mlng-editor
              ref="groupMlngEditor"
              :pageId="contextPageId"
              :multiLanguageId="targetMultiLanguageId"
              :disabled="false"
              :readonly="false"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="comm_btn_wrap mrR30">
      <div class="btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onCancel"
        >
          {{ $t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onSave"
        >
          {{ $t('MSG_BTN_SAVE') }}
        </sui-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PGE_CMZ_00078_P01', // eslint-disable-line vue/name-property-casing
  props: {
    targetMultiLanguageId: {
      type: String,
      required: true,
    },
    contextPageId: {
      type: String,
      default: () => '',
    },
    popupAction: {
      type: String,
      default: () => 'new',
    },
    selectedGridRowDataGroup: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    onSave() {
      if (utils.isEmpty(utils.trim(this.$refs.groupMlngEditor.getLocalLangValue()))) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_LOCAL_LNG'));
        utils.messageBox('warning', msg);
      } else if (utils.isEmpty(utils.trim(this.$refs.groupMlngEditor.getGlobalLangValue()))) {
        // global 언어를 입력해주세요
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_GLOBAL_LNG'));
        utils.messageBox('warning', msg);
      } else {
        const paramData = this.popupAction === 'new' ? {
          data: {
            configurationName: this.$refs.groupMlngEditor.getLocalLangValue(),
            moduleCode: 'CM',
            subModuleCode: 'CMZ',
            configurationApplyCode: '',
            configurationTypeCode: '',
            configurationDefaultValue: '',
            configurationContent: '',
            portalApplyYn:'N',
            hierarchyLevel: 1,
            arrayalOrder: 1,
            parentsConfigurationId: '',
            folderYn: 'Y',
            firstRegistrationProgramId: this.contextPageId,
            finalModificationProgramId: this.contextPageId,
            multiLanguageList: this.$refs.groupMlngEditor.getMlngEditingInfoFillEmptyWithGlobal(), // 다국어
          },
        } : {
          data: {
            configurationId: this.selectedGridRowDataGroup.configurationId,
            configurationMultiLanguageId: this.selectedGridRowDataGroup.configurationMultiLanguageId,
            configurationName: this.$refs.groupMlngEditor.getLocalLangValue(),
            moduleCode: this.selectedGridRowDataGroup.moduleCode,
            subModuleCode: this.selectedGridRowDataGroup.subModuleCode,
            configurationApplyCode: this.selectedGridRowDataGroup.configurationApplyCode,
            configurationTypeCode: this.selectedGridRowDataGroup.configurationTypeCode,
            configurationDefaultValue: this.selectedGridRowDataGroup.configurationDefaultValue,
            configurationContent: this.selectedGridRowDataGroup.configurationContent,
            portalApplyYn:'N',            
            hierarchyLevel: this.selectedGridRowDataGroup.hierarchyLevel,
            arrayalOrder: this.selectedGridRowDataGroup.arrayalOrder,
            parentsConfigurationId: this.selectedGridRowDataGroup.parentsConfigurationId,
            folderYn: this.selectedGridRowDataGroup.folderYn,
            firstRegistrationProgramId: this.contextPageId,
            finalModificationProgramId: this.contextPageId,
            multiLanguageList: this.$refs.groupMlngEditor.getMlngEditingInfoFillEmptyWithGlobal(), // 다국어
          },
        };
        http.request(this.contextPageId, this.popupAction === 'new' ? 'DTS_CMP_00086' : 'DTS_CMP_00088', paramData)
          .then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
              this.$emit('saved-config-group-popup');
            });
          });
      }
    },
    onCancel() {
      this.$emit('cancel-config-group-popup');
    },
  },
};
</script>
<style scoped>
</style>
