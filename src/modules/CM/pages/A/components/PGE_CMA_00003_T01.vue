<template>
  <div>
    <div class="mrB25" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_PORTL')"
          />
        </div>
        <div class="col-xs-10">
          <sui-custom-select
            ref="portalSelect"
            :selected="fromPsYn?psInitPortal:selectedCode.PORTAL"
            :option-list="portalList"
            :disabled="fromPsYn"
          />
        </div>
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_USR_GRP_CATG')"
            :required="true"
          />
        </div>
        <div class="col-xs-10">
          <sui-code-select
            ref="userGroupCategory"
            :selected="selectedCode.COD_USR_GRP_CATG"
            codeId="COD_USR_GRP_CATG"
            :initialSelectedIndex="0"
          />
        </div>
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_USER_GRP_ID')"
          />
        </div>
        <div class="col-xs-10">
           <div class="comm_label">{{userGroupId}}</div>
          <!-- <sui-input-label
            :label="userGroupId"
            :vertical="false"
            style="width:100%"
          /> -->
        </div>
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_USER_GRP_NAME')"
            :required="true"
          />
        </div>
        <div class="col-xs-10">
          <cmp-mlng-editor
            ref="mlngEditor"
            :pageId="pageId"
            :vertical="false"
            :editable="true"
            :multiLanguageId="userGroupId"
          />
        </div>
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_BASIC_AUTH')"
          />
        </div>
        <div class="col-xs-10">
          <sui-radio
            v-model="bsicAuthYn"
            value="Y"
          >
            {{ 'Yes' }}
          </sui-radio>
          <sui-radio
            v-model="bsicAuthYn"
            value="N"
          >
            {{ 'No' }}
          </sui-radio>
        </div>
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_EXPL')"
          />
        </div>
        <div class="col-xs-10">
          <textarea v-model="userGroupContent" maxlength="1000"/>
        </div>
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_USR')"
          />
        </div>
        <div class="col-xs-10">
          <cmp-user-name-link
            :pageId="this.pageId"
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
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_MDFC_DTM')"
          />
        </div>
        <div class="col-xs-10">
          <div class="comm_label">{{finalModificationDTM}}</div>
          <!-- <sui-input-label
            :label="finalModificationDTM"
          /> -->
        </div>
      </div>
    </div>
    <div class="comm_btn_wrap">
      <sui-button
        v-permission:create="'PGE_CMA_00003'"
        type="button"
        class="comm_btn_border"
        @click="onNew"
      >
        {{ $t('MSG_BTN_NEW') }}
      </sui-button>
      <sui-button
        v-permission:delete="'PGE_CMA_00003'"
        type="button"
        class="comm_btn_border"
        @click="onDelete"
      >
        {{ $t('MSG_BTN_DEL') }}
      </sui-button>
      <sui-button
        v-permission:update="'PGE_CMA_00003'"
        type="button"
        class="comm_btn_solid"
        @click="onSave"
      >
        {{ $t('MSG_BTN_SAVE') }}
      </sui-button>
    </div>
  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';
export default {
  name: 'PGE_CMA_00003_T01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: 'PGE_CMA_00003',
      required: true,
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
    psInitPortal: {
      type: Object,
      default() {
        return {};
      }
    },
    fromPsYn: {
      type: Boolean,
      default: false,      
    },
  },
  data() {
    return {
      originalModDTM: '',
      bsicAuthYn: 'N',
      displayLangId: '',
      displayKnoxId: '',
      displayUserId: '',
      displayUserName: '',
      displayUserGlobalName: '',
      displayDeptName: '',
      displayDeptEngName: '',
      displayLoginId: '',
      searchFieldOldText: '',
      userGroupId: 'UGR_',
      userGroupContent: '',
      userGroupConditionFormalValue: '',
      finalModificationUserId: '',
      finalModificationDTM: '',
      selected3rdBizCode: '',
      isNew: true,
      duplicationCheck: false,
      portalList : [],
      selectedCode : {
        PORTAL : {key : '', label : ''},
        COD_USR_GRP_CATG : {key : '', label : ''},
      },
      applyPageString: '',
      noticeRangeDate: '',
      pageApplyYn: false,
      pagePlaceholder: utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE')),
      popupShapeDisabled: false,
      locationDisabled: true,
      authApplyObjectYn: 'N',
    };
  },
  computed: {
  },
  watch: {
    selectedGridRowData(selectObj) {
      if (selectObj) {
        this.selectDataFormInput(selectObj);
      }
    },
    isDataNull(flag) {
      if (flag) {
        this.initData();
      }
    },
  },
  datasets: [],
  mounted() {
    this.Load();
  },

  methods: {
    Load() {
      // Load 정보 설정 부분
      this.isNew = true;

      http.request(this.pageId, 'DTS_CMP_00004', {
      }).then(res => {
        this.portalList = [];
        if (res.data.length > 0) {
          utils.forEach(res.data, obj => {
            const portalInfo = {
              key: obj.portalId,
              label: obj.portalName,
            };
            this.portalList.push(portalInfo);

          });

          //this.selectedCode.PORTAL.key = this.$store.getters.userInfo.portalId;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    initData() {
      this.originalModDTM = '';
      this.displayLangId = '';
      this.displayKnoxId = '';
      this.displayUserId = '';
      this.displayUserName = '';
      this.displayUserGlobalName = '';
      this.displayDeptName = '';
      this.displayDeptEngName = '';
      this.displayLoginId = '';
      this.userGroupId = 'UGR_';
      this.userGroupContent = '';
      this.userGroupConditionFormalValue = '';
      this.finalModificationUserId = '';
      this.finalModificationDTM = '';
      this.isNew = true;
      this.bsicAuthYn = 'N';
      this.$refs.mlngEditor.reset();
      if(!this.fromPsYn){
        this.$refs.portalSelect.reset();
      }
      if(this.$refs.userGroupCategory.optionList.length>0){
        this.$refs.userGroupCategory.reset();
      }
    },
    selectDataFormInput(obj) {
      if(obj.userGroupId) {
        this.selectedCode.PORTAL.key = obj.portalId;
        this.selectedCode.COD_USR_GRP_CATG.key = obj.userGroupCategoryCode;
        this.displayLangId = obj.dsplLangId;
        this.displayKnoxId = obj.knoxId;
        this.displayUserId = obj.finalModificationUserId;
        this.displayUserName = obj.userName;
        this.displayUserGlobalName = obj.userGlobalName;
        this.displayDeptName = obj.deptName;
        this.displayDeptEngName = obj.deptGlobalName;
        this.displayLoginId = obj.loginId;
        this.bsicAuthYn = obj.bsicAuthYn;
        this.originalModDTM = obj.finalModificationDTM;
        this.userGroupId = obj.userGroupId;
        this.userGroupContent = obj.userGroupContent;
        this.userGroupConditionFormalValue = obj.userGroupConditionFormalValue;
        this.finalModificationDTM = utils.dateformatToClient(obj.finalModificationDTM);
        this.duplicationCheck = true;
        this.isNew = false;
        this.authApplyObjectYn = obj.authApplyObjectYn;
      }
      else {
        this.initData();
      }
      setTimeout(() => {
        this.saveSnapshot(this.makeSnapshot());
      }, 500);

    },
    onKeyUpInput() {
      this.duplicationCheck = false;
      const searchFieldNewText = this.userGroupId;
      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isEngNum_(searchFieldNewText) === false) {
          this.conFirm('error', this.$t('MSG_ALT_ONLY_ENGLISH_NUMBER_UNDERBAR'), null);
          this.userGroupId = '';
        } else {
          this.searchFieldOldText = searchFieldNewText;
        }
      }
    },
    onNew() {
      //this.isNew = false;
      this.userGroupId = '';
      this.authApplyObjectYn = 'N';
      // this.$refs.mlngEditor.reset();
      this.$emit('onClearSelectionMainGrid');
      //this.initData();
      this.saveSnapshot(this.makeSnapshot());
    },
    onSave() {
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.localTxtFld.value)) === true) {
        this.conFirm('error', utils.strFormat(this.$t('MSG_ALT_INP_ID'), this.$t('MSG_TXT_USER_GRP_NAME')), null);
        return;
      }

      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.globalTxtFld.value))) {
        this.conFirm('error', utils.strFormat(this.$t('MSG_ALT_INP_ID'), this.$t('MSG_ALT_GLOBAL_ENM')), null);
        return;
      }

      // if (utils.isEmpty(this.userGroupContent) === true) {
      //   this.conFirm('error', utils.strFormat(this.$t('MSG_ALT_INP_ID'), this.$t('MSG_TXT_EXPL')), null);
      //   return;
      // }

      utils.messageBox('confirm', this.$t('MSG_ALT_IS_SAV_DATA'), null, this.onConfirmOk, this.onConfirmCancel);
    },
    onDelete() {
      // if (utils.isEmpty(this.userGroupId) === false) {
      if (this.userGroupId === 'UGR_') {
        // this.conFirm('error', this.$t('MSG_ALT_DEL_NO_DATA'), null);
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return;
      }
      utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), null, this.onConfirmOkDelete, this.onConfirmCancel);
    },
    onConfirmOkDelete() {
      http.request(this.pageId, 'DTS_CMA_00014', {
        path: {
          'user-group-id': this.userGroupId,
        },
      }).then(() => {
        this.conFirm('success', this.$t('MSG_ALT_DEL_DATA'), null);
        this.$emit('onSearchClick');
      }).catch(error => {
        console.log(error);
      });
    },
    makeSnapshot() {
      let ugId = '';
      if (!this.isNew) {
        // 수정인 경우
        ugId = this.userGroupId;
      }

      let orgModifyDTM = '';
      if (!this.isNew) {
        orgModifyDTM = this.originalModDTM;
      }

      const multiLanguageList = this.$refs.mlngEditor.getMlngEditingInfoFillEmptyWithGlobal();

      const dataParams = {
        userGroupId: ugId || '',
        multiLanguageList,
        userGroupCategoryCode: this.selectedCode.COD_USR_GRP_CATG.key || '',
        userGroupContent: this.userGroupContent || '',
        userGroupConditionFormalValue: this.userGroupConditionFormalValue || '',
        roleMlngId: this.userGroupId || '',
        bsicAuthYn: this.bsicAuthYn,
        deleteYn: 'N',
        originalFinalModificationDTM: orgModifyDTM,
        portalId: this.fromPsYn?this.psInitPortal.key:this.selectedCode.PORTAL.key,
        authApplyObjectYn: this.authApplyObjectYn,
      };

      return dataParams;
    },
    onConfirmOk() {
      // DTS_CMA_00012 신규, DTS_CMA_00013 수정
      const serviceName = this.isNew ? 'DTS_CMA_00012' : 'DTS_CMA_00013';
      const dataParams = this.makeSnapshot();

      http.request(this.pageId, serviceName, {
        path: {
          'user-group-id': this.userGroupId,
        },
        data: dataParams,
      }).then(() => {
        this.conFirm('success', this.$t('MSG_ALT_SAVE_DATA'), null, this.onNew);
        this.$emit('onSearchClick');
      }).catch(error => {
        console.log(error);
      });
    },
    onCheckDuplication() {
      //if (utils.isEmpty(this.userGroupId) === true) {
      if (this.userGroupId === 'UGR_') {
        this.conFirm('error', utils.strFormat(this.$t('MSG_ALT_INP_ID'), this.$t('MSG_TXT_USER_GRP_MGT')), null);
      } else {
        this.userGroupId = utils.toUpper(this.userGroupId);

        const queryParams = {
          userGroupId: `UGR_${utils.trim(this.userGroupId)}`,
        };

        http.request(this.pageId, 'DTS_CMA_00015', {
          query: queryParams,
        }).then(res => {
          if (res.data.resultCode === '0') {
            // TODO
            this.duplicationCheck = true;
            this.conFirm('success', this.$t('MSG_ALT_USE_PSBL_ID'), null);
          } else {
            this.conFirm('success', this.$t('MSG_ALT_IMG_RGST_ID'), null);
            this.duplicationCheck = false;
          }
        }).catch(error => {
          console.log(error);
          this.duplicationCheck = false;
        });
      }
    },
    onChangeBizCodes(optList) {
      this.selectedBizCode = optList;
    },
    onConfirmCancel() {
    },
    onClose() {
      console.log('onClose');
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
  },
};
</script>
<style scoped>
</style>
