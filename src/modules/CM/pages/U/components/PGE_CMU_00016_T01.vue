<template>
  <div>
    <div class="mrB20" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDLE')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-module-submodule-select
            ref="selectModule"
            :pageId="contextPageId"
            :selectedMd="frame0.selectedCodeValue.moduleCode"
            :selectedSmd="frame0.selectedCodeValue.subModuleCode"
            mdDataset="dataset0.moduleCode"
            smdDataset="dataset0.subModuleCode"
            :disabled="disabled"
            class="dp_flex"
            @module-selected="moduleSelected"
            @submodule-selected="subModuleSelected"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_OBJ_ID')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            v-model="frame0.objectId"
            :disabled="false"
            :readonly="true"
            :placeholder="objectIdPrefix"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_OBJ_NM')"
            :required="true"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            v-model="frame0.objectName"
            :disabled="false"
            :readonly="false"
          />
        </div>
        <div class="col-xs-1 nodata" />
        <div class="col-xs-5 nodata" />
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_USR')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <cmp-user-name-link
            :pageId="contextPageId"
            :displayType="'1'"
            :displayLanguageId="frame0.firstRegistrationDisplayLanguageId"
            :userId="frame0.firstRegistrationUserId"
            :loginId="frame0.firstRegistrationLoginId"
            :knoxId="frame0.firstRegistrationKnoxId"
            :userName="frame0.firstRegistrationUserName"
            :userGlobalName="frame0.firstRegistrationUserGlobalName"
            :departmentName="frame0.firstRegistrationDepartmentName"
            :departmentEnglishName="frame0.firstRegistrationDepartmentEnglishName"
            type="link"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_DTM')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          {{ frame0.firstRegistrationDTM }}
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_USR')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <cmp-user-name-link
            :pageId="contextPageId"
            :displayType="'1'"
            :displayLanguageId="frame0.finalModificationDisplayLanguageId"
            :userId="frame0.finalModificationUserId"
            :loginId="frame0.finalModificationLoginId"
            :knoxId="frame0.finalModificationKnoxId"
            :userName="frame0.finalModificationUserName"
            :userGlobalName="frame0.finalModificationUserGlobalName"
            :departmentName="frame0.finalModificationDepartmentName"
            :departmentEnglishName="frame0.finalModificationDepartmentEnglishName"
            type="link"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_DTM')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          {{ frame0.finalModificationDTM }}
        </div>
      </div>
    </div>
    <div class="mrB30" />
    <div class="comm_btn_wrap">
      <sui-button
        v-permission:create="contextPageId"
        type="button"
        class="comm_btn_border"
        @click="onClickNew"
      >
        {{ $t('MSG_BTN_NEW') }}
      </sui-button>
      <sui-button
        v-permission:delete="contextPageId"
        type="button"
        class="comm_btn_border"
        @click="onClickDelete"
      >
        {{ $t('MSG_BTN_DEL') }}
      </sui-button>
      <sui-button
        v-permission:update="contextPageId"
        type="button"
        class="comm_btn_solid"
        @click="onClickSave"
      >
        {{ $t('MSG_BTN_SAVE') }}
      </sui-button>
    </div>
  </div>
</template>

<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMU_00016_T01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: '',
    },
    objectId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      frame0: {
        selectedCodeValue: {
          moduleCode: {
            key: '',
            label: '',
          },
          subModuleCode: {
            key: '',
            label: '',
          },
        },
        objectId: '',
        objectName: '',
        firstRegistrationDTM: '',
        finalModificationDTM: '',
        firstRegistrationDisplayLanguageId: '',
        firstRegistrationUserId: '',
        firstRegistrationLoginId: '',
        firstRegistrationKnoxId: '',
        firstRegistrationUserName: '',
        firstRegistrationUserGlobalName: '',
        firstRegistrationDepartmentName: '',
        firstRegistrationDepartmentEnglishName: '',
        finalModificationDisplayLanguageId: '',
        finalModificationUserId: '',
        finalModificationLoginId: '',
        finalModificationKnoxId: '',
        finalModificationUserName: '',
        finalModificationUserGlobalName: '',
        finalModificationDepartmentName: '',
        finalModificationDepartmentEnglishName: '',
      },
      objectIdPrefix: '',
      disabled: false,
    };
  },
  computed: {},
  watch: {
    objectId(data) {
      if (data) {
//        this.setObjectData();
          const selected = this.parentDataset.getSelected()[0];
          const { moduleCode, subModuleCode,moduleName,subModuleName } = selected;
          utils.forEach(this.frame0, (value, key) => {
            if (utils.isEqual(key, 'selectedCodeValue')) {
              this.frame0[key].moduleCode.key = moduleCode;
              this.frame0[key].moduleCode.label = moduleName;
              this.frame0[key].subModuleCode.key = subModuleCode;
              this.frame0[key].subModuleCode.label = subModuleName;
            } else {
              this.frame0[key] = selected[key] || '';
            }
          });
        this.disabled = true;
      } else {
        this.onClickNew();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.parentDataset = utils.findDataset('dataset0', this);
    });
  },

  methods: {
    setObjectData() {
      const selected = this.parentDataset.getSelected()[0];
      const { moduleCode, subModuleCode,moduleName,subModuleName } = selected;
      utils.forEach(this.frame0, (value, key) => {
        if (utils.isEqual(key, 'selectedCodeValue')) {
          this.frame0[key].moduleCode.key = moduleCode;
          this.frame0[key].moduleCode.label = moduleName;
          this.frame0[key].subModuleCode.key = subModuleCode;
          this.frame0[key].subModuleCode.label = subModuleName;
        } else {
          this.frame0[key] = selected[key] || '';
        }
      });

     },
    initObjectData() {
      utils.forEach(this.frame0, (value, key) => {
        if (utils.isEqual(key, 'selectedCodeValue')) {
          this.$refs.selectModule.selectMd('CM');
        } else {
          this.frame0[key] = '';
        }
      });
    },
    research() {
      this.onClickNew();
      this.$emit('research');
    },
    validateObjectData() {
      if (utils.isEmpty(utils.trim(this.frame0.selectedCodeValue.moduleCode.key))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_MDLE')));
        return false;
      }
      if (utils.isEmpty(utils.trim(this.frame0.selectedCodeValue.subModuleCode.key))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_SMDLE')));
        return false;
      }
      if (utils.isEmpty(utils.trim(this.frame0.objectName)))  {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_OBJ_NM'));
        utils.messageBox('warning', msg);
        return false;
      }
      return true;
    },
    moduleSelected(value) {
      this.setObjectIdPrefix(value.key);
    },
    subModuleSelected(value) {
      if (!utils.isEmpty(utils.trim(value.key))) {
        this.setObjectIdPrefix(value.key);
      } else {
        this.objectIdPrefix = `OBJ_${this.frame0.selectedCodeValue.moduleCode.key}_`;
      }
    },
    setObjectIdPrefix(key) {
      this.objectIdPrefix = utils.isEmpty(utils.trim(key)) ? '' : `OBJ_${key}_`;
    },
    onClickNew() {
      this.disabled = false;
      this.initObjectData();
      this.$emit('clearGrid');
    },
    onClickDelete() {
      if (utils.isEmpty(this.objectId)) {
        utils.messageBox('warning', this.$t('MSG_ALT_DEL_DATA_SELT'));
      } else {
        utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
          http.request(this.contextPageId, 'DTS_CMU_00072', {
            path: {
              'object-id': this.objectId,
            },
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_DEL_DATA'), null, this.research);
          }).catch(error => {
            console.log(error);
          });
        });
      }
    },
    onClickSave() {
      if (!this.validateObjectData()) return false;

      const dataServiceId = utils.isEmpty(this.objectId) ? 'DTS_CMU_00070' : 'DTS_CMU_00071';
      const dataParams = {
        objectId: this.objectId || '',
        moduleCode: this.frame0.selectedCodeValue.moduleCode.key,
        subModuleCode: this.frame0.selectedCodeValue.subModuleCode.key,
        objectName: this.frame0.objectName,
      };

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        http.request(this.contextPageId, dataServiceId, {
          data: dataParams,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
            if(utils.isEmpty(this.objectId)){
              this.research();
            }else{
              this.$emit('updatedInfo', this.objectId);
            }
          });          
        }).catch(error => {
          console.log(error);
        });
      });
      return true;
    },
  },
};
</script>

<style scoped>
</style>
