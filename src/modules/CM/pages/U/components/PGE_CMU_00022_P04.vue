<template>
  <div>
    <div
      class="comm_popup_wrap_xlarge"
      style="overflow-y: hidden"
    >
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MSG_RESO')"
              :required="false"
              :vertical="false"
              width="140px"
            />
          </div>
          <div class="col-xs-11">
            <sui-code-select
              ref="messageResourcesTypeCode"
              :selected="frame0.selectedCodeValue.COD_MSG_RESO_TYPE"
              :pageId="this.$options.name"
              codeId="COD_MSG_RESO_TYPE"
              :initialSelectedIndex="0"
              style="width: 140px"
            />
            <div class="comp_spacing" />
            <ur-autocomplete
              v-model="frame0.codMsgResoSearchText"
              :value="frame0.codMsgResoSearchText"
              :item-list="list"
              style="width: 100%"
              @selected="onSelected"
              @input="OnAutoClick"
            />
          </div>
        </div>
        <div class="mrB30" />
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDLE')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="moduleSelect"
              codeId="COD_MDLE"
              defaultOption="select"
              :disabled="isDisableSave"
              :selected="frame0.selectedCodeValue.COD_MDLE"
              :pageId="this.$options.name"
              :initialSelectedIndex="0"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MSG_RESO_ID')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-input-label
              ref="msgResoLabel"
              :class="readonlyFlag ? 'comm_label' : 'comm_label_1'"
              :label="preMessageResourcesId"
              :vertical="false"
              style="letter-spacing: -1px; width: 20%"
            />
            <sui-text-field
              v-if="!readonlyFlag"
              ref="msgResoID"
              v-model="frame0.selectedMsgResoID"
              :disabled="isDisableSave"
              :readonly="readonlyFlag"
              style="width: 100%"
              @input="onKeyUpInput"
            />
            <div class="comp_spacing" />
            <sui-button
              v-if="!readonlyFlag"
              type="button"
              :disabled="isDisableSave"
              class="comm_btn_duplicate"
              @click="onClickDuplicationCheck"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MSG_RESO_VAL')"
              :required="true"
            />
          </div>
          <div class="col-xs-11">
            <cmp-mlng-editor
              ref="mlngEditor"
              :pageId="this.$options.name"
              :vertical="false"
              :disabled="isDisableSave"
              :multiLanguageId="frame0.messageResourcesMultiLanguageId"
            />
          </div>
        </div>
      </div>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onClickClose"
        >
          {{ $t("MSG_BTN_CLOSE") }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_border"
          :disabled="isDisableSave"
          @click="onClickSave"
        >
          {{ $t("MSG_BTN_SAVE") }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_solid"
          :disabled="isDisableApply"
          @click="onClickApply"
        >
          {{ $t("MSG_BTN_APPLY") }}
        </sui-button>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  // eslint-disable-next-line vue/name-property-casing
  name: 'PGE_CMU_00022',
  extends: BasePage,
  props: {
    parentPageId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      alertFlag: true,
      isDisableSave: false,
      isDisableApply: true,
      localdata: [],
      list: [],
      frame0: {
        selectedCodeValue: {
          COD_MDLE: {
            label: '',
            key: '',
          },
          COD_MSG_RESO_TYPE: {
            label: '',
            key: '',
          },
        },
        messageResourcesMultiLanguageId: '',
        codMsgResoSearchText: '',
        messageResourcesId: '',
        selectedMsgResoID: '',
      },
      multiLanguageId: '',
      inputMessageResourceId: '',
      cacheMessageResourceId: '',
      readonlyFlag: false,
      isIdDuplicationCheck: false,
    };
  },
  computed: {
    preMessageResourcesId() {
      if (this.frame0.messageResourcesId) {
        return this.frame0.messageResourcesId;
      }
      if (utils.trim(this.frame0.selectedCodeValue.COD_MSG_RESO_TYPE.key)) {
        return `MSG_${this.frame0.selectedCodeValue.COD_MSG_RESO_TYPE.key}_`;
      }
      return 'MSG_';
    },
    messageReourcesIdChanged() {
      return !utils.isEqual(this.frame0.selectedMsgResoID, this.cacheMessageResourceId);
    },
  },
  methods: {
    onSelected(value) {
      if (utils.isEqual(value, this.list[0])) // create new message resource
      // eslint-disable-next-line brace-style
      {
        this.isDisableSave = false;
        this.onReset();
    
      } else {
        this.isDisableSave = true;
        this.isDisableApply = false;
        this.selectDataFormInput(value);
      }
    },
    selectDataFormInput(value) {
      utils.forEach(this.localdata, obj => {
        const temp = `[${obj.moduleCode}] ${obj.multiLanguageContent}`;
        if (utils.isEqual(value, temp)) {
          utils.forEach(this.frame0, (value, key) => {
            if (utils.isEqual(key, 'selectedMsgResoID')) {
              this.frame0[key] = obj.messageResourcesId.substr(8, obj.messageResourcesId.length); // 메시지자원 ID
            } else if (utils.isEqual(key, 'selectedCodeValue')) {
              this.frame0[key].COD_MDLE.key = obj.moduleCode;
              this.frame0[key].COD_MSG_RESO_TYPE.key = obj.messageResourcesTypeCode;
            } else if (utils.isEqual(key, 'messageResourcesMultiLanguageId')) {
              this.frame0[key] = obj.messageResourcesMultiLanguageId;
            } else  if (utils.isEqual(key, 'messageResourcesId')) {
              this.frame0[key] = obj.messageResourcesId.substr(0,8); // 메시지자원 ID
            }
          });
        }
      });
    },
    onReset() {
      // eslint-disable-next-line quotes
      // this.frame0.selectedCodeValue.COD_MDLE.key = "select";
      this.frame0.selectedMsgResoID = '';
      this.$refs.mlngEditor.reset();
      utils.forEach(this.frame0, (value, key) => {
        if (!utils.isEqual(key, 'selectedCodeValue')) {
          this.frame0[key] = '';
        }
      });

      this.frame0.messageResourcesMultiLanguageId = '';
    },
    OnAutoClick() {
      if (this.frame0.codMsgResoSearchText.length < 1) return;
      // eslint-disable-next-line no-useless-escape
      const re = /(?![\[A-Z\]]).+/gm;
      const searchMessage = utils.trim(this.frame0.codMsgResoSearchText.match(re));
      const queryParams = {
        messageResourcesTypeCode: utils.trim(this.frame0.selectedCodeValue.COD_MSG_RESO_TYPE.key),
        searchMsgResoText: searchMessage,
        langId: this.$store.getters.userInfo.langId,
        searchMsgResoCond: 'ALL',
      };
      http.request(this.$options.name, 'DTS_CMU_00012', {
        query: queryParams,
      }).then(res => {
        this.localdata = res.data;
        const temp = `Create a new one with "${this.frame0.codMsgResoSearchText}"`;
        const orgData = [`${temp}`];
        utils.forEach(res.data, obj => {
          const objData = `[${obj.moduleCode}] ${obj.multiLanguageContent}`;
          orgData.push(objData);
        });
        this.list = orgData;
      });
    },
    onClickApply() {
      this.$emit('apply', this.frame0.messageResourcesMultiLanguageId);
    },
    onClickClose() {
      this.$emit('exit');
    },
    onClickSave() {
      const multiLanguageList = this.$refs.mlngEditor.getMlngEditingInfoFillEmptyWithGlobal();
      let msgResoNewId = `MSG_${this.frame0.selectedCodeValue.COD_MSG_RESO_TYPE.key}`;
      msgResoNewId += `_${this.frame0.selectedMsgResoID}`;
      const messageResourcesId = utils.isEmpty(this.frame0.messageResourcesId)
        ? msgResoNewId
        : this.frame0.selectedMsgResoID;
      const dataParams = {
        pageId: this.$props.parentPageId,
        pageBasicsYn: 'N',
        deleteYn: 'N',
        multiLanguageId: messageResourcesId,
        messageResourcesId,
        moduleCode: this.frame0.selectedCodeValue.COD_MDLE.key,
        messageResourcesMultiLanguageList: multiLanguageList,
        messageResourcesTypeCode: this.frame0.selectedCodeValue.COD_MSG_RESO_TYPE.key || '',
      };
      if (!this.fn_validCheck()) return false; // null 값 체크

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        this.saveMessageResource(dataParams);
      });
      return null;
    },
    fn_validCheck() {
      if (utils.isEmpty(utils.trim(this.frame0.selectedCodeValue.COD_MDLE.key))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_MDLE')));
        return false;
      }
      if (utils.isEmpty(utils.trim(this.frame0.selectedCodeValue.COD_MSG_RESO_TYPE.key))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_MSG_RESO_TYPE')));
        return false;
      }
      if (utils.isEmpty(utils.trim(this.frame0.selectedMsgResoID))) {
        utils.messageBox('warning',
          utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MSG_RESO_ID')),
          null,
          () => {
            this.$refs.msgResoID.setFocus();
          });
        return false;
      }
      if (this.messageReourcesIdChanged && utils.isEmpty(this.frame0.messageResourcesId)) {
        utils.messageBox('warning', this.$t('MSG_ALT_SELT_DPCT_CHK'));
        return false;
      }
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.localTxtFld.value))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_LOCAL_LNG')),
          null,
          () => {
            this.$refs.mlngEditor.setFocusLocalTxtFld();
          });

        return false;
      }
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.globalTxtFld.value))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_GLOBAL_LNG')),
          null,
          () => {
            this.$refs.mlngEditor.setFocusGlobalTxtFld();
          });

        return false;
      }
      return true;
    },
    saveMessageResource(dataParams) {
      http.request(this.$options.name, 'DTS_CMU_00016', {
        data: dataParams,
      }).then(() => {
        utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
        this.isDisableApply = false;
        this.isDisableSave = true;
        
        this.frame0.messageResourcesMultiLanguageId = dataParams.messageResourcesId;
      });
    },
    onKeyUpInput(value) {
      const searchFieldNewText = value;

      if (utils.isEngNum_(searchFieldNewText) || utils.isEmpty(searchFieldNewText)) {
        this.searchFieldOldText = searchFieldNewText;
      } else if (this.alertFlag) {
        this.alertFlag = false;
        utils.messageBox('warning', this.$t('MSG_ALT_ONLY_ENGLISH_NUMBER'), null, () => {
          this.alertFlag = true;
          this.$refs.msgResoID.txtField = this.searchFieldOldText;
          this.$refs.msgResoID.setFocus();
        });
      }
    },
    onClickDuplicationCheck() {
      let msgResoNewId = this.preMessageResourcesId; // "MSG_"+this.frame0.selectedCodeValue.COD_MSG_RESO_TYPE.key;
      msgResoNewId += this.frame0.selectedMsgResoID;
      this.inputMessageResourceId = msgResoNewId;
      const dataParams = {
        messageResourcesId: msgResoNewId,
      };
      if (utils.isEmpty(this.frame0.selectedMsgResoID)) {
        utils.messageBox(
          'warning',
          utils.strFormat(
            this.$t('MSG_ALT_CHK_NCSR'),
            this.$t('MSG_TXT_MSG_RESO_ID'),
          ),
          null,
          () => {
            this.$refs.msgResoID.setFocus();
          },
        );
        return false;
      }

      http
        .request(this.$options.name, 'DTS_CMU_00021', {
          query: dataParams,
        })
        .then(res => {
          if (res.data > 0) {
            this.isIdDuplicationCheck = false;
            utils.messageBox(
              'error',
              this.$t('MSG_ALT_IMG_RGST_ID'),
              null,
              () => {
                this.$refs.msgResoID.setFocus();
              },
            );
          } else {
            this.cacheMessageResourceId = utils.clone(
              this.frame0.selectedMsgResoID,
            );
            utils.messageBox('success', this.$t('MSG_ALT_USE_PSBL_ID')); // 사용 가능한 ID입니다.
          }
        });
      return null;
    },
  },
};
</script>

<style scoped>
</style>
