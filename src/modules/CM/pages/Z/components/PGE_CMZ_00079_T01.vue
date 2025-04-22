<template>
  <div>
    <div class="mrB20" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_MDLE')" />
        </div>
        <div class="col-xs-5">
          <sui-label :label="moduleName" class="comm_label" />
        </div>
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_CNFG_NM')" />
        </div>
        <div class="col-xs-5">
          <sui-label :label="configurationName" class="comm_label" />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_CNFG_ID')" />
        </div>
        <div class="col-xs-5">
          <sui-label :label="configurationId" class="comm_label" />
        </div>
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_APPY_PORTL')" />
        </div>
        <div class="col-xs-5">
          <div class="comm_label" />{{ portalApplyYn === 'Y' ? (this.fromPsYn? this.psInitPortal.key:this.$store.getters.userInfo.portalId) : $t('MSG_TXT_ALL') }}
        </div>
      </div>
      <div class="row">
        <!-- <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_APPY_SCP')" />
        </div>
        <div class="col-xs-5">
          <sui-label :label="configurationApplyCodeName" class="comm_label" />
        </div> -->
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_EXPL')" />
        </div>
        <div class="col-xs-11">
          <sui-label :label="configurationContent" class="scr_box_nobrd" />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_CNFG_DEFAULT_VAL')" />
        </div>
        <div class="col-xs-5">
          <sui-label :label="configurationDefaultValue" class="comm_label" />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_CNFG_VAL')"
            required
          />
        </div>
        <div class="col-xs-5">
          <!-- exclusive visibility unit 1 -->
          <sui-text-field
            v-show="configurationTypeCode == 'T' && configurationApplyCode == 'A'"
            v-model="configurationValue"
            maxlength="1000"
            :disabled="disabled"
          />
          <sui-text-field
            v-show="configurationTypeCode == 'T' && configurationApplyCode != 'A'"
            v-model="configurationValue"
            maxlength="1000"
            disabled
          />
          <!-- exclusive visibility group 2 -->
          <div
            v-show="configurationTypeCode == 'C' && configurationApplyCode == 'A'"
            class="dp_flex"
          >
            <sui-text-field
              :value="configurationApplyCodeName + '(' + configurationApplyCodeId + ')'"
              readonly
            />
            <sui-button
              type="button"
              class="comm_btn_InputScr"
              @click="onClickCodeId"
            />
          </div>
          <sui-custom-select
            v-show="configurationTypeCode == 'C' && configurationApplyCode == 'A'"
            v-model="configurationValue"
            :option-list="configTypeCustomOptions"
          />
          <sui-custom-select
            v-show="configurationTypeCode == 'C' && configurationApplyCode != 'A'"
            v-model="configurationValue"
            :option-list="configTypeCustomOptions"
            disabled
          />
          <!-- exclusive visibility group 2 -->
          <sui-radio
            v-if="configurationTypeCode == 'F' && configurationApplyCode == 'A'"
            v-model="configurationValue"
            value="Y"
          >
            {{ $t('MSG_TXT_YES') }}
          </sui-radio>
          <sui-radio
            v-if="configurationTypeCode == 'F' && configurationApplyCode == 'A'"
            v-model="configurationValue"
            value="N"
          >
            {{ $t('MSG_TXT_NO') }}
          </sui-radio>
          <sui-radio
            v-if="configurationTypeCode == 'F' && configurationApplyCode != 'A'"
            v-model="configurationValue"
            value="Y"
            disabled
          >
            {{ $t('MSG_TXT_YES') }}
          </sui-radio>
          <sui-radio
            v-if="configurationTypeCode == 'F' && configurationApplyCode != 'A'"
            v-model="configurationValue"
            value="N"
            disabled
          >
            {{ $t('MSG_TXT_NO') }}
          </sui-radio>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_FST_RGST_USR')" />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ firstRegistrationUserId }}
          </div>
        </div>
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_RGST_DTM')" />
        </div>
        <div class="col-xs-5">
          <div class="comm_label" />{{ firstRegistrationDTM }}
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_MDFC_USR')" />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            {{ finalModificationUserId }}
          </div>
        </div>
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_MDFC_DTM')" />
        </div>
        <div class="col-xs-5">
          <div class="comm_label" />{{ finalModificationDTM }}
        </div>
      </div>
    </div>
    <div class="mrB30" />
    <div class="comm_btn_wrap">
      <sui-button
        v-permission:create="contextPageId"
        type="button"
        class="comm_btn_solid"
        :disabled="btnStatus.save"
        @click="onSaveClick"
      >
        {{ $t("MSG_BTN_SAVE") }}
      </sui-button>
    </div>
  </div>
</template>

<script>
import BasePage from '~cm/components/BasePage';

/* eslint max-len: ["error", { "code": 200 }] */
export default {
  name: 'PGE_CMZ_00079_T01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    selectedGridRowData: {
      type: Object,
      required: false,
      default() {
        return {
        };
      },
    },
    psInitPortal: {
      type: Object,
      default() {
        return {};
      }
    },
    fromPsYn: {
      type: Boolean,
      default: false,      
    }    
  },
  data() {
    return {
      btnStatus: { save: true },
      isNew: true,
      configurationUseYn: '',
      configurationId: '',
      configurationName: '',
      configurationMultiLanguageId: '',
      configurationApplyPortalId: '',
      portalApplyYn: '',
      moduleCode: '',
      moduleName: '',
      subModuleCode: '',
      subModuleName: '',
      configurationApplyCode: '',
      configurationApplyCodeName: '',
      configurationTypeCode: '',
      configurationApplyCodeId: '',
      configurationDefaultValue: '',
      configurationValue: '',
      configurationContent: '',
      hierarchyLevel: '',
      arrayalOrder: '',
      parentsConfigurationId: '',
      folderYn: '',
      configurationScreenApplyYn: '',
      deleteYn: '',
      firstRegistrationDTM: '',
      firstRegistrationLoginId: '',
      firstRegistrationKnoxId: '',
      firstRegistrationUserId: '',
      firstRegistrationProgramId: '',
      firstRegistrationUserName: '',
      firstRegistrationUserGlobalName: '',
      firstRegistrationDepartmentName: '',
      firstRegistrationDepartmentEnglishName: '',
      firstRegistrationDisplayLanguageId: '',
      finalModificationDTM: '',
      finalModificationLoginId: '',
      finalModificationKnoxId: '',
      finalModificationUserId: '',
      finalModificationProgramId: '',
      finalModificationUserName: '',
      finalModificationUserGlobalName: '',
      finalModificationDepartmentName: '',
      finalModificationDepartmentEnglishName: '',
      finalModificationDisplayLanguageId: '',
      configTypeCustomOptions: [],
    };
  },
  computed: {
    disabled() {
      return !this.isNew && utils.isEmpty(this.selectedGridRowData);
    },
  },
  watch: {
    selectedGridRowData(selectObj) {
      this.loadConfigMgt();
    },
  },
  created() {},
  mounted() {},

  methods: {
    loadConfigMgt() {
      if (this.selectedGridRowData) {
        const configurationId = this.selectedGridRowData.configurationId;

        if (this.selectedGridRowData.configurationApplyCode !== 'A') {
          this.isNew = true;
          this.btnStatus.save = true;
        } else {
          this.isNew = false;
          this.btnStatus.save = false;
        }

        if (!utils.isEmpty(configurationId)) {
          http.request(this.contextPageId, 'DTS_CMP_00080', {
            path: {
              'configuration-id': configurationId,
            },
            query: {
              portalId: this.fromPsYn? this.psInitPortal.key:this.$store.getters.userInfo.portalId,
            },              
          }).then(res => {
            // this.objConfigMgt = res.data;

            if (res.data) {
              this.configurationId = res.data.configurationId;
              this.configurationName = res.data.configurationName;
              this.configurationMultiLanguageId = res.data.configurationMultiLanguageId;
              this.configurationApplyPortalId = res.data.configurationApplyPortalId;
              this.moduleCode = res.data.moduleCode;
              this.moduleName = `${res.data.moduleName} / ${res.data.subModuleName}`;
              this.subModuleCode = res.data.subModuleCode;
              this.configurationApplyCode = res.data.configurationApplyCode;
              this.configurationApplyCodeName = res.data.configurationApplyCodeName;
              this.configurationTypeCode = res.data.configurationTypeCode;
              this.configurationApplyCodeId = res.data.configurationApplyCodeId;
              this.configurationDefaultValue = res.data.configurationDefaultValue;
              this.configurationValue = res.data.configurationValue;
              this.configurationContent = res.data.configurationContent;
              this.portalApplyYn = res.data.portalApplyYn;
              this.hierarchyLevel = res.data.hierarchyLevel;
              this.arrayalOrder = res.data.arrayalOrder;
              this.parentsConfigurationId = res.data.parentsConfigurationId;
              this.folderYn = res.data.folderYn;
              this.configurationScreenApplyYn = res.data.configurationScreenApplyYn;
              this.deleteYn = res.data.deleteYn;
              this.firstRegistrationDTM = utils.dateformatToClient(res.data.firstRegistrationDTM);
              this.finalModificationDTM = utils.dateformatToClient(res.data.finalModificationDTM);

              this.firstRegistrationLoginId = res.data.firstRegistrationLoginId;
              this.firstRegistrationKnoxId = res.data.firstRegistrationKnoxId;
              this.firstRegistrationUserId = res.data.firstRegistrationUserId;
              this.firstRegistrationProgramId = res.data.firstRegistrationProgramId;
              this.firstRegistrationUserName = res.data.firstRegistrationUserName;
              this.firstRegistrationDisplayLanguageId = res.data.firstRegistrationDisplayLanguageId;
              this.firstRegistrationUserGlobalName = res.data.firstRegistrationUserGlobalName;
              this.firstRegistrationDepartmentName = res.data.firstRegistrationDepartmentName;
              this.firstRegistrationDepartmentEnglishName = res.data.firstRegistrationDepartmentEnglishName;

              this.finalModificationLoginId = res.data.finalModificationLoginId;
              this.finalModificationKnoxId = res.data.finalModificationKnoxId;
              this.finalModificationUserId = res.data.finalModificationUserId;
              this.finalModificationProgramId = res.data.finalModificationProgramId;
              this.finalModificationUserName = res.data.finalModificationUserName;
              this.finalModificationDisplayLanguageId = res.data.finalModificationDisplayLanguageId;
              this.finalModificationUserGlobalName = res.data.finalModificationUserGlobalName;
              this.finalModificationDepartmentName = res.data.finalModificationDepartmentName;
              this.finalModificationDepartmentEnglishName = res.data.finalModificationDepartmentEnglishName;

              this.isNew = false;
            }

            // 환경설정유형 코드값이 'C'이면 코드 조회를 해서 select 에 뿌려줘야 함
            if (this.configurationTypeCode === 'C' && this.configurationApplyCodeId !== '' && this.configurationDefaultValue !== '') {
              http.request(this.contextPageId, 'DTS_CMZ_00003', {
                query: {
                  codeId: this.configurationApplyCodeId,
                },
              }).then(res => {
                const items = [];
                utils.forEach(res.data, obj => {
                  items.push({ label: obj.codeName, key: obj.codeValidityValue });
                });
                // this.configTypeCustomSelectedKey = this.configDefaultValue;
                this.configTypeCustomOptions = items;
              }).catch(error => {
                console.log(error);
              });
            }
          });
        }
      }
    },
    onClickCodeId() {
      utils.openLayerPopup('PGE_CMZ_00003', this.onPagePopupClose, {
        pageInitialData: {},
        size: 'lg',
      });
    },
    onPagePopupClose(objMaster) {
      if (objMaster !== 'undefined') {
        if (objMaster) {
          if (utils.isEqual(objMaster[0].codeId, 'COD_MDLE') === false) {
            this.codeId = objMaster[0].codeId;
            this.codeDisplayValue = `${objMaster[0].codeName} (${objMaster[0].codeId})`;

            http.request(this.$options.name, 'DTS_CMZ_00003', {
              query: {
                codeId: this.codeId,
              },
            })
              .then(res => {
                const items = [];
                utils.forEach(res.data, obj => {
                  items.push({ label: obj.codeName, key: obj.codeValidityValue });
                });

                if (items.length > 0) {
                  this.selectCustomData.key = items[0].key;
                }

                this.customData = items;
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_SMDLE'));
            utils.messageBox('warning', msg, null);
          }
        }
      }
    },
    getConfigurationCheck() {
      return new Promise((resolve, reject) => {
        http.request(this.contextPageId, 'DTS_CMP_00084', {
          path: {
            'configuration-id': utils.trim(this.configurationId),
          },
          query: {
            portalId: this.fromPsYn? this.psInitPortal.key:this.$store.getters.userInfo.portalId,
          },          
        }).then(res => {
          resolve(res.data);
        }).catch(error => {
          console.log(error);
          reject(error);
        });
      });
    },
    onSaveClick() {
      if (utils.isEmpty(this.configurationValue)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CNFG_VAL')));
        return;
      }

      this.getConfigurationCheck().then(data => {
        this.configurationUseYn = data.configurationUseYn;
        const setDataServiceId = this.configurationUseYn === 'Y' ? 'DTS_CMP_00082' : 'DTS_CMP_00083';
        const dataParams = {
          configurationId: utils.trim(this.configurationId),
          configurationValue: utils.trim(this.configurationValue),
          configurationApplyCode: utils.trim(this.configurationApplyCode),
          configurationTypeCode: utils.trim(this.configurationTypeCode),
          configurationUseYn: this.configurationUseYn,
          configurationApplyPortalId: this.portalApplyYn === 'Y' ? (this.fromPsYn? this.psInitPortal.key:this.$store.getters.userInfo.portalId) : '01',
        };

        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
          http.request(this.contextPageId, setDataServiceId, {
            data: dataParams,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
          }).catch(error => {
            console.log(error);
          });
        });
      });
    },
  },
};
</script>

<style scoped>
</style>
