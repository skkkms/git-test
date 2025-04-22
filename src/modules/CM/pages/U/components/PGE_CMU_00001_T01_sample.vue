<template>
  <div>
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label v-bind:label="$t('MSG_TXT_MDLE')" :required="true" :vertical="false" />
        </div>
        <div class="col-xs-5">
          <sui-module-submodule-select ref="smCombotab1"
                                   mdDataset="datasetMain.moduleCode"
                                   smdDataset="datasetMain.subModuleCode"
                                   :pageId="this.pageId"
                                   :selectedMd="frame0.selectData.COD_MDLE"
                                   :selectedSmd="frame0.selectData.COD_SMDLE"
                                   :customMdList="codes.allOption"
                                   :customSmdList="codes.emptyOption"
                                   :disabled="modSelDisabled"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label v-bind:label="$t('MSG_TXT_PAGE_TYPE')" :required="true" :vertical="false" />
        </div>
        <div class="col-xs-1">
          <sui-code-select :selected="frame0.selectData.COD_PAGE_TYPE"
                       :pageId="this.$options.name"
                       codeId="COD_PAGE_TYPE"
                       dataset="datasetMain.pageTypeCode"
                       />
        </div>
        <div class="col-xs-1"></div>
        <div class="col-xs-1">
          <sui-input-label label="용도" :required="true" :vertical="false" />
        </div>
        <div class="col-xs-1">
          <sui-code-select :selected="frame0.selectData.COD_PAGE_UE"
                       :pageId="this.pageId"
                       codeId="COD_PAGE_UE"
                       dataset="datasetMain.pageUseCode"
                       />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label v-bind:label="$t('MSG_TXT_PAGE_ID')" :required="true" :vertical="false" :readonly="true" />
        </div>
        <div class="col-xs-5">
          <sui-text-field placeholder="PGE_CMU" v-model="frame0.pageIdPrefix" :readonly="true" />
        </div>
        <div class="col-xs-1">
          <sui-input-label v-bind:label="$t('MSG_TXT_PAGE_NM')" :required="false" :vertical="false" />
        </div>
        <div class="col-xs-5">
          <sui-text-field dataset="datasetMain.pageName" v-model="frame0.data.pageName" max-length="400" style="width: 100%;" />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label v-bind:label="$t('MSG_TXT_PAGE_FILE')" :required="false" :vertical="false" />
        </div>
        <div class="col-xs-5">
          <sui-text-field placeholder="PGE_CMU" :readonly="true" v-model="frame0.data.pageDestinationValue" dataset="datasetMain.pageDestinationValue" style="width: 100%;" />
        </div>
        <div class="col-xs-1">
          <sui-input-label v-bind:label="$t('MSG_TXT_MSG_RESO')" :required="true" :vertical="false" />
        </div>
        <div class="col-xs-5">
          <sui-text-field dataset="datasetMain.pageTitleMessageResourceId" v-model="frame0.data.pageTitleMessageResourceId" max-length="400" style="width: 100%;" />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label v-bind:label="$t('MSG_TXT_PRD_YN')" :required="true" :vertical="false" />
        </div>
        <div class="col-xs-5">
          <sui-yn-select dataset="datasetMain.pageUsePriodYn" :selected="frame0.selectData.COD_PAGE_USE_PRIOD_YN" placeholder />
        </div>
        <div class="col-xs-1">
          <sui-input-label v-bind:label="$t('MSG_TXT_STT')" :required="true" :vertical="false" />
        </div>
        <div class="col-xs-5">
          <sui-code-select :selected="frame0.selectData.COD_PAGE_STT"
                       :pageId="this.pageId"
                       codeId="COD_PAGE_STT"
                       dataset="datasetMain.pageStatusCode"
                       />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label v-bind:label="$t('MSG_TXT_USE_PRD')" :required="true" :vertical="false" />
        </div>
        <div class="col-xs-5">
          <sui-date-picker dataset="datasetMain.pageUsePriodStartDatetime" v-model="frame0.data.pageUsePriodStartDatetime"  :disabled-dates="disabledStartDate" :disabled="false" sticky />
          <sui-input-label label="~" width="140px" :vertical="false" style="width: 20px;" />
          <sui-date-picker dataset="datasetMain.pageUsePriodFinishDatetime" v-model="frame0.data.pageUsePriodFinishDatetime"  :disabled-dates="disabledEndDate" :disabled="false" sticky />
        </div>
        <div class="col-xs-1">
          <sui-input-label v-bind:label="$t('MSG_TXT_BLCK_MSG')" :required="true" :vertical="false" />
        </div>
        <div class="col-xs-5">
          <sui-text-field dataset="datasetMain.pageBlockContent" v-model="frame0.data.pageBlockContent" max-length="400" style="width: 100%;" />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label v-bind:label="$t('MSG_TXT_POPU_YN')" :required="true" :vertical="false" />
        </div>
        <div class="col-xs-5">
          <sui-radio dataset="datasetMain.pagePopupYn" v-model="frame0.data.pagePopupYn" value="Y">
            Yes
          </sui-radio>
          <sui-radio dataset="datasetMain.pagePopupYn" v-model="frame0.data.pagePopupYn" value="N">
            No
          </sui-radio>
        </div>
        <div class="col-xs-1">
          <sui-input-label v-bind:label="$t('MSG_TXT_USE_YN')" :required="true" :vertical="false" />
        </div>
        <div class="col-xs-5">
          <sui-yn-select :selected="frame0.selectData.COD_PAGE_USE_YN" placeholder />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label v-bind:label="$t('MSG_TXT_POPU_OPTN')" :vertical="false" />
        </div>
        <div class="col-xs-5">
          <sui-text-field v-model="frame0.data.pagePopupOptionValue" style="width: 100%;" />
        </div>
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_EXPL')" :vertical="false" />
        </div>
        <div class="col-xs-5">
          <sui-text-field v-model="frame0.data.pageContent" style="width: 100%;" />
        </div>
      </div>
      <div v-show="selectedRowCount" class="row">
        <div class="col-xs-1">
          <sui-input-label v-bind:label="$t('MSG_TXT_RGST_DTM')" :required="true" :vertical="false" />
        </div>
        <div class="col-xs-2">
          <sui-text-field v-model="frame0.data.firstRegistrationDTM" :readonly="true" />
        </div>
        <div class="col-xs-1">
          <sui-input-label v-bind:label="$t('MSG_TXT_RGST_USR_ID')" :required="true" :vertical="false" />
        </div>
        <div class="col-xs-2">
          <sui-text-field v-model="frame0.data.firstRegistrationUserId" :readonly="true" />
        </div>
        <div class="col-xs-1">
          <sui-input-label v-bind:label="$t('MSG_TXT_MDFC_DTM')" :required="true" :vertical="false" />
        </div>
        <div class="col-xs-2">
          <sui-text-field v-model="frame0.data.finalModificationDTM" :readonly="true" />
        </div>
        <div class="col-xs-1">
          <sui-input-label v-bind:label="$t('MSG_TXT_MDFC_USR_ID')" :required="true" :vertical="false" />
        </div>
        <div class="col-xs-2">
          <sui-text-field v-model="frame0.data.finalModificationUserId" :readonly="true" />
        </div>
      </div>
    </div>
    <div class="comm_btn_wrap">
      <sui-button type="button" class="comm_btn_act01">
        {{ $t("MSG_BTN_NEW") }}
      </sui-button>
      <sui-button type="button" class="comm_btn_act01">
        {{ $t("MSG_BTN_DEL") }}
      </sui-button>
      <sui-button type="button" class="comm_btn_act01" @click="onSaveClick">
        {{ $t("MSG_BTN_SAVE") }}
      </sui-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PGE_CMU_00001_T01',
  props: {
    pageId: {
      type: String,
      default: null,
    },
    refreshGrid: {
      type: Function,
    },
  },
  data() {
    return {
      // formMode: '',
      modSelDisabled: false,
      selectedRowCount: 0,

      codes: {
        allOption: [{ key: ' ', label: this.$t('MSG_TXT_ALL') }],
        emptyOption: [{ key: '', label: '' }],
      },

      frmInit: {
        moduleCode: '',
        subModuleCode: '',
        pageId: '',
        pageDestinationValue: '',
        pageName: '',
        pageTitleMessageResourceId: '',
        pageTypeCode: '',
        pageUseCode: '',
        pageBlockContent: '',
        pageUsePriodStartDatetime: '',
        pageUsePriodFinishDatetime: '',
        pagePopupYn: '',
        pagePopupOptionValue: '',
        pageContent: '',
        deleteYn: 'N',
        firstRegistrationDTM: '',
        firstRegistUserId: '',
        firstRegistProgramId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
        finalModificationProgramId: '',
      },

      frame0: {
        selectData: {
          COD_MDLE: {
            label: '',
            key: '',
          },
          COD_SMDLE: {
            label: '',
            key: '',
          },
          COD_PAGE_TYPE: {
            label: '',
            key: '',
          },
          COD_PAGE_UE: {
            label: '',
            key: '',
          },
          COD_PAGE_STT: {
            label: '',
            key: '',
          },
          COD_PAGE_SEARCH_COND: {
            label: '',
            key: '',
          },
          COD_PAGE_USE_YN: {
            label: '',
            key: '',
          },
          COD_PAGE_USE_PRIOD_YN: {
            label: '',
            key: '',
          },
        },
        data: {}, // 선택 시 데이터
        selectedPageID: '',
        pageIdPrefix: '',
        pageIdNum: '',
        styleVisible: {
          visibility: 'visible' /* visible, hidden */
        },
      },
    };
  },
  computed: {
    isShowDetail() {
      return (this.selectedRowCount > 0);
    },
    disabledStartDate() {
      return {
        from: new Date(this.frmInit.pageUsePriodFinishDatetime),
        to: null,
      };
    },
    disabledEndDate() {
      return {
        from: null,
        to: new Date(this.frmInit.pageUsePriodStartDatetime),
      };
    },
  },
  watch: {
  },
  mounted() {
    this.$nextTick(() => {
      const dataset = util.findDataset('datasetMain', this);
      if (dataset) {
        console.log(dataset);
        this.parentDataset = dataset;
        dataset.$on(dataset.EVENTS.SELECTION_CHANGED, this.onDatasetSelectionChanged);
      }
    });
  },
  beforeUpdate() {
    // data 변경전 DOM 정보가 필요한 경우
  },
  updated() {
    // data 변경후 DOM 정보가 필요한 경우
  },
  beforeDestroy() {
    // 이벤트 핸들러 및 사용한 서드 파티 라이브러리 자원 반환
  },
  destroyed() {
    // 남아 있는 자원 반환
  },
  methods: {
    onSaveClick() {
      util.openConfirm('저장하시겠습니까?', this.$t('MSG_TXT_YES'), this.$t('MSG_TXT_NO'),
        this.onConfirmOk,
        this.onConfirmCancel);
    },
    onConfirmOk() {
      this.$emit('saved');
    },
    onConfirmCancel() {
      this.refreshGrid();
    },
    onDatasetSelectionChanged(selection) {
      this.selectedRowCount = selection.newSelections.length;
      if (selection.newSelections.length) {
        console.log(this.parentDataset.data[selection.newSelections[0]]);
      }
    },
  },
};
</script>
<style scoped>
</style>
