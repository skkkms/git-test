<template>
  <div>
    <div class="mrB25" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_ROLE_CATG')"
            :required="true"
          />
        </div>
        <div class="col-xs-10">
          <sui-code-select
            ref="roleCategory"
            v-model="selectedRoleCategory"
            codeId="COD_ROLE_CATG"
            :initialSelectedIndex="0"
          />           
        </div>
      </div>
      <div class="row">
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_ROLE_ID')"
          />
        </div>
        <div class="col-xs-10">
          <div class="comm_label">{{roleId}}</div>
          <!-- <sui-input-label
            :label="roleId"
            :vertical="false"
            style="width:100%"
          /> -->         
        </div>
      </div>
      <div class="row">
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_ROLE_NAME')"
            :required="true"
          />
        </div>
        <div class="col-xs-10">
          <cmp-mlng-editor
            ref="mlngEditor"
            :pageId="pageId"
            :vertical="false"
            :editable="true"
            :multiLanguageId="roleMlngId"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_ROLE_ALIAS')"
          />
        </div>
        <div class="col-xs-10">
          <sui-text-field
            ref="roleAliasTextField"
            v-model="roleAlias"
            style="width:100%"
            maxlength="100"
            :readonly="!hasSystemAdminRole"
            @keyup.enter="onCheckDuplication"
            @keyup="onKeyUpInput"
          />
          <div class="comp_spacing" />
          <sui-button
            type="button"
            class="comm_btn_duplicate"
            :disabled="aliasDisable"
            @click="onCheckDuplication"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_EXPL')"
          />
        </div>
        <div class="col-xs-10">
          <textarea
            v-model="roleContent"
            style="width:100%"
            maxlength="1000"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_USR')"
          />
        </div>
        <div class="col-xs-10">
          <cmp-user-name-link
            :pageId="this.$options.name"
            :displayType="'1'"
            :displayLanguageId="displayLangId"
            :knoxId="displayKnoxId"
            :userId="displayUserId"
            :userName="displayUserName"
            :userGlobalName="displayUserGlobalName"
            :departmentName="displayDeptName"
            :departmentEnglishName="displayDeptEngName"
            :loginId="displayLoginId"
            :type="'link'"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_DTM')"
          />
        </div>
        <div class="col-xs-10">
          <div class="comm_label">
            {{ modifyDtm }}
          </div>
          <!-- <sui-input-label
            :label="modifyDtm"
          /> -->
        </div>
      </div>
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:create="'PGE_CMA_00001'"
          type="button"
          class="comm_btn_border"
          @click="onNew"
        >
          {{ $t('MSG_BTN_NEW') }}
        </sui-button>
        <sui-button
          v-permission:delete="'PGE_CMA_00001'"
          type="button"
          class="comm_btn_border"
          @click="onDelete"
        >
          {{ $t('MSG_BTN_DEL') }}
        </sui-button>
        <sui-button
          v-permission:update="'PGE_CMA_00001'"
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
import BasePage from '~cm/components/BasePage';
export default {
  name: 'PGE_CMA_00001_T01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: null,
    },
    selectedGridRowData: {
      type: Object,
      required: true,
    },
    isDataNull: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      aliasDisable: true,
      displayLangId: '',
      displayKnoxId: '',
      displayUserId: '',
      displayUserName: '',
      displayUserGlobalName: '',
      displayDeptName: '',
      displayDeptEngName: '',
      displayLoginId: '',
      searchFieldOldText: '',
      modSelDisabled: false,
      selectedRowCount: 0,
      duplicationCheck: false,
      roleMlngId: '',
      roleId: 'ROL_',
      roleAlias: '',
      roleContent: '',
      modifyDtm: '',
      originalModDTM: '',
      isNew: true,
      selectedRoleCategory : '',
      hasSystemAdminRole: utils.hasRoleNickName('SYS_ADMIN'),
    };
  },
  computed: {
  },
  watch: {
    selectedGridRowData(selectObj) {
      if (!utils.isEmpty(selectObj)) {
        this.selectDataFormInput(selectObj);
      } else {
        this.initData();
      }
    },
    isDataNull(flag) {
      if (flag) {
        this.initData();
      }
    },
  },
  mounted() {
    if (this.$props.selectedGridRowData && this.$props.selectedGridRowData.roleId) {
      this.$nextTick(() => {
        this.selectDataFormInput(this.$props.selectedGridRowData);
      });
    }
    this.Load();

    // Role Alias 에는 영문만 입력되도록 설정
    const el = this.$refs.roleAliasTextField.$el;
    const inputElem = el.querySelector('input');
    inputElem.style.imeMode = "disabled";
  },
  updated() {
    // data 변경후 DOM 정보가 필요한 경우
    console.log('updated');
  },
  methods: {
    Load() {
      // Load 정보 설정 부분
      this.isNew = true;
    },
    initData() {
      this.displayLangId = '';
      this.displayKnoxId = '';
      this.displayUserId = '';
      this.displayUserName = '';
      this.displayUserGlobalName = '';
      this.displayDeptName = '';
      this.displayDeptEngName = '';
      this.displayLoginId = '';
      this.roleId = 'ROL_';
      this.roleMlngId = '';
      this.roleAlias = '';
      this.roleContent = '';
      this.userName = '';
      this.modifyDtm = '';
      this.originalModDTM = '';
      this.isNew = true;
      this.duplicationCheck = false;
      this.roleMlngId = '';
      this.selectedRoleCategory = '';
      this.$refs.roleCategory.reset();
    },
    selectDataFormInput(obj) {
      if(obj.roleId) {
        this.selectedRoleCategory = obj.roleCategoryCode;
        this.roleId = utils.trim(obj.roleId);
        this.roleMlngId = obj.roleMlngId;
        this.roleAlias = obj.roleNickName;
        this.roleContent = obj.roleContent;
        this.displayLangId = obj.dsplLangId;
        this.displayKnoxId = obj.knoxId;
        this.displayUserId = obj.finalModificationUserId;
        this.displayUserName = obj.userName;
        this.displayUserGlobalName = obj.userGlobalName;
        this.displayDeptName = obj.deptName;
        this.displayDeptEngName = obj.deptGlobalName;
        this.displayLoginId = obj.loginId;

        this.modifyDtm = utils.dateformatToClient(obj.finalModificationDTM);
        this.originalModDTM = obj.finalModificationDTM;
        this.isNew = false;
        this.duplicationCheck = true;
      } else {
        this.initData();
      }
      setTimeout(() => {
        this.saveSnapshot(this.makeSnapshot());
      }, 500);
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
    onClose() {
      console.log('onClose');
    },
    onNew() {
      this.initData();
      this.$emit('onClearSelectionMainGrid');
      this.saveSnapshot(this.makeSnapshot());
    },
    onSave() {
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.localTxtFld.value)) === true) {
        this.conFirm('error', utils.strFormat(this.$t('MSG_ALT_INP_ID'), this.$t('MSG_TXT_ROLE_NAME')), null);
        return;
      }

      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.globalTxtFld.value))) {
        this.conFirm('error', utils.strFormat(this.$t('MSG_ALT_INP_ID'), this.$t('MSG_ALT_GLOBAL_ENM')), null);
        return;
      }

      if (this.roleAlias.length > 0) {
        if (!this.duplicationCheck) {
          this.conFirm('error', this.$t('MSG_ALT_SELT_DPCT_CHK'), null);
          return;
        }
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_IS_SAV_DATA'), null, this.onConfirmOk, this.onConfirmCancel);
    },
    makeSnapshot() {
      let roleIdInfo = '';
      if (!this.isNew) {
        // 수정인 경우
        roleIdInfo = this.roleId;
      }

      const multiLanguageList = this.$refs.mlngEditor.getMlngEditingInfoFillEmptyWithGlobal();

      let roleCategoryCode = this.selectedRoleCategory;
      let orgModifyDTM = '';
      if (!this.isNew) {
        orgModifyDTM = this.originalModDTM;
      }

      const dataParams = {
        roleId: roleIdInfo || '',
        multiLanguageList,
        roleCategoryCode: roleCategoryCode || '',
        roleContent: this.roleContent || '',
        roleNickName: this.roleAlias || '',
        roleMlngId: roleIdInfo || '',
        deleteYn: 'N',
        originalFinalModificationDTM: orgModifyDTM,
      };

      return dataParams;
    },
    onConfirmOk() {
      // DTS_CMA_00005 수정, DTS_CMA_00004 신규
      const serviceName = this.isNew ? 'DTS_CMA_00004' : 'DTS_CMA_00005';
      const dataParams = this.makeSnapshot();

      http.request(this.pageId, serviceName, {
        data: dataParams,
      }).then(() => {
        this.conFirm('success', this.$t('MSG_ALT_SAVE_DATA'), null);
        if(this.isNew){
          this.$emit('onSearchClick');
        }else{
          this.$emit('updateInfo', dataParams.roleId);
        }

      }).catch(error => {
        console.log(error);
      });
    },
    onConfirmCancel() {
      console.log('cancel');
    },
    onDelete() {
      if (this.roleId === 'ROL_') {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return;
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), null, this.onConfirmDelete, this.onConfirmCancel);
    },
    onCheckDuplication() {
      if (utils.isEmpty(this.roleAlias) === true) {
        this.conFirm('information', utils.strFormat(this.$t('MSG_ALT_INP_ID'), this.$t('MSG_TXT_ROLE_ALIAS')), null);
      } else if (this.roleAlias.length > 0 && utils.isEngNum_(this.roleAlias) === false) {
        this.conFirm('error', this.$t('MSG_ALT_ONLY_ENGLISH_NUMBER_UNDERBAR'), null);
      } else {
        this.roleAlias = utils.toUpper(this.roleAlias);

        const queryParams = {
          roleAlias: utils.trim(this.roleAlias) || '',
        };

        http.request(this.pageId, 'DTS_CMA_00003', {
          query: queryParams,
        }).then(res => {
          if (res.data.resultCode === '0') {
            // TODO
            this.duplicationCheck = true;
            this.conFirm('success', this.$t('MSG_ALT_USE_PSBL_ALIAS'), null);
          } else {
            this.conFirm('error', this.$t('MSG_ALT_ALREADY_RGST_ALIAS'), null);
            this.duplicationCheck = false;
          }
        }).catch(error => {
          console.log(error);
          this.duplicationCheck = false;
        });
      }
    },
    onKeyUpInput() {
      this.duplicationCheck = false;
      const searchFieldNewText = this.roleAlias;

      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isEngNum_(searchFieldNewText) === false) {
          this.conFirm('error', this.$t('MSG_ALT_ONLY_ENGLISH_NUMBER_UNDERBAR'), null);
          this.roleId = '';
        } else {
          this.searchFieldOldText = searchFieldNewText;
        }
      }

      if (this.roleAlias.length > 0) {
        this.aliasDisable = false;
      } else {
        this.aliasDisable = true;
      }
    },
    onChangeBizCodes(optList) {
      this.selectedBizCode = optList;
    },
    onConfirmDelete() {
      const roleId = utils.trim(this.roleId);
      const dataParams = {
        roleId: roleId || '',
        deleteYn: 'Y',
        roleMlngId: this.roleMlngId || '',
      };

      http.request(this.pageId, 'DTS_CMA_00005', {
        path: { 'role-id': utils.trim(this.roleId) },
        data: dataParams,
      }).then(() => {
        this.conFirm('success', this.$t('MSG_ALT_DEL_DATA'), null);
        this.$emit('onSearchClick');
      }).catch(error => {
        console.log(error);
      });
    },
  },
};
</script>
<style scoped>
</style>
