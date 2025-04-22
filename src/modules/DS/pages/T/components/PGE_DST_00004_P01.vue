<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TRM_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-3">
            <sui-text-field
              v-model="searchWord"
              placeholder=""
              :disabled="false"
              :readonly="false"
              @keyup.enter="retrievalList"
            />
          </div>
          <div class="btn_wrap">
            <sui-button
              v-permission:read="'PGE_DST_00004'"
              type="button"
              class="comm_btn_Reset"
              @click="resetSearch()"
            >
              {{ $t('MSG_BTN_RESET') }}
            </sui-button>
            <sui-button
              v-permission:read="'PGE_DST_00004'"
              type="button"
              class="comm_btn_Scr"
              @click="retrievalList()"
            >
              {{ $t('MSG_BTN_SRCH') }}
            </sui-button>
          </div>
        </div>
      </div>
      <div class="comm_shut_wrap">
        <div class="inbox">
          <div class="comm_title_wrap">
            <h4>{{ $t('MSG_TIT_WRD_QRY_LIST') }}</h4>
          </div>
          <div class="mrB10" />
          <sui-s-grid
            ref="grid"
            :headers="gridColumns0"
            :data-source="dataset0"
            :hideHeader="false"
            :autoheight="false"
            :multiselect="true"
            :pageable="false"
            :options="options"
            :showCountControl="true"
            :showRowsPerPageControl="false"
          />
        </div>
        <div class="emptybox" />
        <div class="inbox">
          <div class="comm_title_wrap">
            <h4>{{ $t('MSG_TXT_DOMAIN_NAME') }}</h4>
          </div>
          <div class="mrB10" />
          <sui-s-grid
            ref="grid1"
            :headers="gridColumns1"
            :data-source="dataset1"
            :showRowsPerPageControl="false"
            @grid:row-click="onSelectDomainRow"
          >
            <template
              #right-info
              class="btn_wrapR"
            >
              <ur-button
                type="button"
                class="comm_btn_gridTop"
                :style="customStyle"
                small
                :disabled="isNewRegistrtion"
                @click="combinationTerm()"
              >
                {{ $t('MSG_TXT_CMBNT_TRM') }}
              </ur-button>
            </template>
          </sui-s-grid>
        </div>
      </div>
      <div class="comm_title_wrap">
        <h4>{{ $t('MSG_TIT_APPL_TRM') }}</h4>
      </div>
      <sui-s-grid
        ref="grid2"
        :headers="gridColumns2"
        :data-source="dataset2"
        :hideHeader="false"
        :autoheight="false"
        :multiselect="false"
        :pageable="false"
        :showCountControl="true"
        :showRowsPerPageControl="false"
        :initialRowsPerPage="2"
        :pagesizeoptions="[2]"
        @grid:row-click="onSelectTermsRow"
      />
      <div class="mrB30" />
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDLE')"
              :style="'position:relative'"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-module-submodule-select
              ref="moduleTypeOptions"
              :page-id="this.$options.name"
              :selected-md="selectData.moduleCode"
              :selected-smd="selectData.subModuleCode"
              :defaultMdOption="'all'"
              :defaultSmdOption="'all'"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SRC_TRM_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model="sourceTerm"
              placeholder=""
              default
              value
              :disabled="true"
              :clearable="true"
              :readonly="false"
              fixed-icon
              @click="sourceTermClick()"
            />
            <div class="comp_spacing" />
            <sui-button
              v-permission:update="'PGE_DST_00004'"
              type="button"
              class="btn_innerTbl_border"
              @click="excludeClick"
            >
              {{ $t('MSG_BTN_EXLD') }}
            </sui-button>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_CODE_NAME')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model="codeTerm"
              placeholder=""
              default
              value
              :disabled="true"
              :clearable="true"
              :readonly="false"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="codeName"
              placeholder=""
              default
              value
              :disabled="true"
              :clearable="true"
              :readonly="false"
              fixed-icon
              @click="codeIdFunction()"
            />
            <div class="comp_spacing" />
            <sui-button
              v-permission:read="'PGE_DST_00004'"
              type="button"
              class="comm_btn_Reset"
              :disabled="codeStatus"
              @click="onClickCodeRegist()"
            >
              {{ $t('MSG_BTN_CODE_RGST') }}
            </sui-button>
          </div>
          <div class="col-xs-6" />
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TRM_DSCR')"
              :style="'position:relative'"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            <textarea v-model="termContent" />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TRM_EN_DSCR')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            <textarea v-model="termContentEn" />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_APPL_CNTN')"
              :style="'position:relative'"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            <textarea v-model="termApplyContent" />
          </div>
        </div>
      </div>
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onPopupCancelClicked"
      >
        {{ $t('MSG_BTN_CLOSE') }}
      </sui-button>
      <sui-button
        v-permission:read="'PGE_DST_00004'"
        type="button"
        class="comm_btn_border"
        @click="resetFunction"
      >
        {{ $t('MSG_BTN_RESET') }}
      </sui-button>
      <sui-button
        v-permission:create="'PGE_DST_00004'"
        type="button"
        class="comm_btn_solid"
        @click="applyFunction"
      >
        {{ $t('MSG_BTN_APPL') }}
      </sui-button>
    </div>
    <sui-popup
      v-model="showSourcePopup"
      :title="$t('MSG_TIT_REF_TRM_LIST')"
    >
      <p05
        @exit="onChildPopClicked()"
        @sourceTermPopulate="sourceTermPopulateMethod"
      />
    </sui-popup>
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index';
import p05 from './PGE_DST_00004_P05';

export default {
  // eslint-disable-next-line vue/name-property-casing
  name: 'PGE_DST_00004_P01',
  components: {
    p05,
  },
  props: {
    parentPageId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      searchWord: '',
      termName: '',
      isNewRegistrtion: true,
      duplicateCheckValue: false,
      codeTerm: '',
      codeTypeName: '',
      codeName: '',
      codeStatus: true,
      sourceTerm: '',
      sourceTermID: '',
      termPhysicalName: '',
      domainDetails: '',
      codeSturctureTypeCode: '',
      codeValidValue: '',
      showMetauserBtn: false,
      biddingInformationParam: {},
      wordDeleteArray: true,
      showSourcePopup: false,
      termApplyContent: '',
      termContentEn: '',
      termContent: '',
      radioStrValue: '',
      arrayalOrder: '',
      dataWithSynonym: [],
      wordListDisplay: [],
      domainList: [],
      selectData: {
        moduleCode: { key: '', label: '' },
        subModuleCode: { key: '', label: '' },
      },
      localdata0: [],
      options: {
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },
      // eslint-disable-next-line new-cap
      dataset0: new urDataSet(),
      // eslint-disable-next-line new-cap
      dataset1: new urDataSet(),
      // eslint-disable-next-line new-cap
      dataset2: new urDataSet(),
      gridColumns0: [],
      localdata1: [],
      gridColumns1: [{
        text: this.$t('MSG_TXT_DOMAIN_NAME'),
        value: 'domainName',
      }, {
        text: this.$t('MSG_TXT_DT_TYP'),
        value: 'domainDataTypeName',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_DOM_CNTN'),
        value: 'domainContent',
      },
      ],
      localdata2: [],
    };
  },
  computed: {
    customStyle() {
      const disabled = `
        border: 1px solid #eaeaea;
        color: #dbdbdb;
        cursor: default;
      `;
      const active = `
        border: 1px solid #ccc;
        color: #5a5a5a;
        font-weight: 500;
      `;
      return this.isNewRegistrtion ? disabled : active;
    },
  },
  watch: {},
  created() {
    const that = this;
    this.gridColumns0 = [{
      text: this.$t('MSG_TXT_WRD_NM'),
      value: 'wordName',
      width: 100,
    }, {
      text: this.$t('MSG_TXT_WRD_PHSC_NM'),
      value: 'wordId',
    }, {
      text: this.$t('MSG_TXT_WRD_TYP_NM'),
      value: 'wordTypeName',
      width: 100,
    }, {
      text: this.$t('MSG_TXT_STT'),
      value: '',
      component: {
        props: ['row', 'value'],
        template:
              `<div class="-button" style="padding-right: 5px;">
                <sui-button v-if="renderButton"
                    class="-button__item -button__item-button"
                    small
                    type="button"
                    @click="handleClick($event, row)"
                  >
                  {{ $t('MSG_TXT_WRD_RGST') }}
                  </sui-button>
                </div>`,
        computed: {
          renderButton() {
            if (this.row.wordStatus !== 'EXIST') {
              return true;
            }
            return false;
          },
        },
        methods: {
          handleClick(event, row) {
            that.onGridButtonClicked(event, row);
          },
        },
      },
      width: 100,
    }];

    this.gridColumns2 = [{
      text: this.$t('MSG_TXT_TRM_NM'),
      value: 'termName',
    }, {
      text: this.$t('MSG_TXT_TRM_PHSC_NM'),
      value: 'termId',
    }, {
      text: this.$t('MSG_TXT_TRM_DSCR'),
      value: 'termContent',
    }, {
      text: this.$t('MSG_TXT_TRM_EN_DSCR'),
      value: 'termContentEn',
    }, {
      text: this.$t('MSG_TXT_DOMAIN_NAME'),
      value: 'domainName',
    }, {
      text: this.$t('MSG_TXT_DT_TYP'),
      value: 'dataType',
      width: 100,
    }, {
      text: this.$t('MSG_TXT_LEN'),
      value: 'length',
      width: 80,
    }, {
      text: this.$t('MSG_TXT_DECM_LGHT'),
      value: 'pointLength',
      width: 100,
    }, {
      text: this.$t('MSG_BTN_DPCT_CHK'),
      value: 'duplicatecheck',
      component: {
        props: ['row', 'value'],
        template:
            `<sui-button
                type="button"
                class="-button__item"
                @click="onDetailClick(value, row)"
            >
            {{ value }}
            </sui-button>`,
        mounted() {
        },
        methods: {
          onDetailClick() {
            that.onClickDuplicate();
          },
        },
      },
    }];
  },
  mounted() {
    this.getSession();
  },
  methods: {
    resetSearch() {
      this.searchWord = '';
      const emptyArray = [];
      this.dataset0.setData(emptyArray);
      this.dataset1.setData(emptyArray);
      this.dataset2.setData(emptyArray);
    },
    sourceTermClick() {
      this.showSourcePopup = true;
    },
    isSynonymWord(data) {
      // eslint-disable-next-line no-unused-vars
      let isSynonym = 1;
      data.forEach(element => {
        if (element.wordStatus === 'Not Exists') {
          http.request('PGE_DST_00004', 'DTS_DST_00090', {
            path: {
              synonym: element.wordName,
            },
          })
            .then(res => {
              // eslint-disable-next-line no-plusplus
              isSynonym++;
              if (res.data.length > 0) {
                // eslint-disable-next-line no-param-reassign
                element.wordName = res.data[0].wordName;
                // eslint-disable-next-line no-param-reassign
                element.wordId = res.data[0].wordId;
                // eslint-disable-next-line no-param-reassign
                element.wordTypeName = res.data[0].wordTypeName;
                // eslint-disable-next-line no-param-reassign
                element.wordStatus = 'EXIST';
                this.wordListDisplay = data;
                this.dataWithSynonym.push(element);
                this.dataset0.setData(data);
              } else {
                this.dataWithSynonym.push(element);
              }
            });
        }
      });
      setTimeout(() => { this.dataset0.setData(data); }, 200);
      this.wordListDisplay = data;
    },
    // Term API
    retrievalList() {
      this.dataset0.setData([]);
      this.dataset2.setData([]);
      // let counter = 0;
      this.isNewRegistrtion = true;
      http.request('PGE_DST_00004', 'DTS_DST_00032', {
        query: {
          termName: this.searchWord,
        },
      }).then(res => {
        this.wordListDisplay = res.data;
        if (res.data.length > 1) {
          this.isSynonymWord(res.data);
          this.isClassificationWord(res.data);
        } else {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CMBNT_WRD_CNT'), null));
        }
      });
    },
    // check domain type is classification word or not
    isClassificationWord(data) {
      let unregisteredCount = 0;
      const lastData = data.length - 1;
      // enabling code id if last word is code
      if (data[lastData].wordName.toUpperCase() === 'CODE' || data[lastData].wordName.toUpperCase() === '코드') {
        this.codeStatus = false;
      } else { this.codeStatus = true; }
      // condition classification word last word
      if (data[lastData].wordTypeCode === '1') {
        http.request('PGE_DST_00004', 'DTS_DST_00086', {
          path: {
            'word-id': data[lastData].wordId,
          },
        }).then(res => {
          this.dataset1.setData(res.data);
        });
      } else {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_FNL_WRD_CLSF'), null));
        this.dataset0.setData([]);
      }
      // validation for combination button
      this.wordListDisplay.forEach(element => {
        if (element.wordStatus !== 'EXIST') {
          // eslint-disable-next-line no-plusplus
          unregisteredCount++;
        }
      });
      if (unregisteredCount > 0) {
        this.isNewRegistrtion = true;
      } else {
        this.isNewRegistrtion = false;
      }
    },
    // get session
    getSession() {
    },
    // duplicate check
    onClickDuplicate() {
      const queryParams = {
        termId: this.termPhysicalName,
        termName: this.termName,
      };
      http.request('PGE_DST_00004', 'DTS_DST_00027', {
        query: queryParams,
      }).then(res => {
        if (res.data === 0) {
          this.duplicateCheckValue = true;
          const msg = utils.strFormat(this.$t('MSG_ALT_BE_RGST_OK'), this.$t('MSG_TXT_TRM_NM'));
          utils.messageBox('information', msg);
        } else {
          utils.messageBox('warning', this.$t('MSG_ALT_IS_EXISTS'), null, null);
        }
      });
    },
    // exclude button
    excludeClick() {
      this.sourceTerm = '';
    },
    // on select row
    onSelectRow() {
    },
    // on unselect row
    onUnselectRow() {
    },
    // domain row selection
    onSelectDomainRow(target) {
      if (this.dataset1.getSelected().length === 0) {
        this.dataset1.setSelect(target, false);
      }
      this.isNewRegistrtion = false;
      this.wordListDisplay.forEach(element => {
        if (element.wordStatus !== 'EXIST') {
          this.isNewRegistrtion = true;
        }
      });
    },
    onSelectTermsRow(target) {
      if (this.dataset2.getSelected().length === 0) {
        this.dataset2.setSelect(target, false);
      }
    },
    onChildPopClicked() {
      this.showSourcePopup = false;
    },
    // combition of term
    combinationTerm() {
      // eslint-disable-next-line prefer-destructuring
      this.domainDetails = this.dataset1.getSelected()[0];
      if (!this.domainDetails) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_DOMAIN_NAME')));
      } else {
        let termWordName = '';
        let termPhysicalName = '';
        // eslint-disable-next-line no-unused-vars
        let termPhysicalCheck = true;
        this.wordListDisplay.forEach(element => {
          if (element.wordName) {
            if (termWordName) {
              termWordName += element.wordName;
            } else {
              termWordName = element.wordName;
            }
          }
          if (element.wordId) {
            if (termPhysicalName) {
              termPhysicalName = `${termPhysicalName}_${element.wordId}`;
              if (String(termPhysicalName).length > 27) {
                utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_TRM_LEN_CHK'), null));
                termPhysicalCheck = false;
              }
            } else {
              termPhysicalName = element.wordId;
            }
          }
        });
        this.termName = termWordName;
        this.termPhysicalName = termPhysicalName;
        const combinationTermList = [{
          termName: this.termName,
          termId: this.termPhysicalName,
          termContent: this.termContent,
          termEnContent: this.termContentEn,
          domainName: this.domainDetails.domainName,
          dataType: this.domainDetails.domainDataTypeName,
          length: this.domainDetails.domainLength,
          pointLength: this.domainDetails.domainDataDecimalLength,
          duplicatecheck: this.$t('MSG_BTN_DPCT_CHK'),
        }];
        this.dataset2.setData(combinationTermList);
      }
    },
    // delete row
    deleteRow() {
      const selectedIndexes = this.dataset0.getSelected();
      this.dataset0.removeRows(selectedIndexes);
    },
    // on click row function
    onGridButtonClicked(event, row) {
      utils.openLayerPopup('PGE_DST_00003', this.onNewWordClicked, {
        pageInitialData: { content: 'PGE_DST_00004', value: true, wordName: row.wordName },
        size: 'xlg',
      });
    },
    resetFunction() {
      this.searchWord = '';
      this.termName = '';
      this.sourceTerm = '';
      this.sourceTermID = '';
      this.termContent = '';
      this.termContentEn = '';
      this.selectData.moduleCode.key = 'ALL';
      this.selectData.subModuleCode.key = 'ALL';
      this.termApplyContent = '';
      this.codeTerm = '';
      this.codeName = '';
      const emptyArray = [];
      this.dataset0.setData(emptyArray);
      this.dataset1.setData(emptyArray);
      this.dataset2.setData(emptyArray);
    },
    // code Id Function
    codeIdFunction() {
      if (!this.isAllowCode()) return;
      utils.openLayerPopup('PGE_CMZ_00003', this.onPagePopupCallback, {
        pageInitialData: {
          content: this.$options.name,
          value: true,
          wordName: this.wordName,
        },
        size: 'lg',
      });
    },
    isAllowCode() {
      let wflag = false;
      const wordList = this.dataset0.data;
      if (wordList.length <= 0) return wflag;
      const wordLastRow = wordList.length - 1;
      if (wordList[wordLastRow].wordId === 'CD') {
        wflag = true;
        return wflag;
      }
      return wflag;
    },
    onClickCodeRegist() {
      let url = '';
      const pageId = 'PGE_CMZ_00001';
      url = `${window.location.origin}${window.location.pathname}#/${pageId}`;
      const win = window.open();
      win.location = url;
    },
    onPagePopupCallback(value) {
      if (value) {
        this.codeTerm = value[0].codeId;
        this.codeValidValue = value[0].codePhyName;
        this.codeName = value[0].codeName;
      }
    },
    applyFunction() {
      if (!this.duplicateCheckValue) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_DUP'), null, null));
      } else if (this.codeStatus !== true && this.codeTerm === '') {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_CODE_NAME'), null));
      } else if (!this.termContent.trim()) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_TRM_DSCR'), null));
      } else if (!this.termApplyContent.trim()) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_APPL_CNTN'), null));
      } else if (this.selectData.moduleCode.key === 'ALL') {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_MDLE'), null));
      } else if (this.selectData.subModuleCode.key === 'ALL') {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_SMDLE'), null));
      } else {
        utils.messageBox('confirm', this.$t('MSG_ALT_REQ_PRCD'), null, this.confirmRouter);
      }
    },
    confirmRouter() {
      if (utils.isEqual(utils.getConfigurationValue('CFG_DST_KNOX_APRV_YN'), 'Y')) {
        this.personInChargeList();
      } else {
        this.submitRequestApi();
      }
    },
    submitRequestApi(approvalData) {
      const wordRelationData = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(this.wordListDisplay)) {
        // eslint-disable-next-line no-plusplus
        this.arrayalOrder++;
        const data = {
          arrayalOrder: this.arrayalOrder,
          termsId: this.termPhysicalName,
          wordId: this.wordListDisplay[key].wordId,
        };
        wordRelationData.push(data);
      }

      const queryParams = {
        applicantID: this.$store.getters.userInfo.knoxId,
        codeId: this.codeTerm,
        codeValidValue: this.codeValidValue,
        domainDataDecimalLength: this.domainDetails.domainDataDecimalLength,
        domainDataTypeCode: '0',
        domainDecription: this.domainDetails.domainContent,
        domainLength: this.domainDetails.domainLength,
        domainName: this.domainDetails.domainName,
        domainPhysicalName: this.domainDetails.domainId,
        moduleCode: this.$refs.moduleTypeOptions.selected.md.codeId || '',
        subModuleCode: this.$refs.moduleTypeOptions.selected.smd.codeId || '',
        sourceTerm: this.sourceTerm,
        sourceTermID: this.sourceTermID,
        termsApplicationContent: this.termApplyContent,
        termsContent: this.termContent,
        termsContentEn: this.termContentEn,
        termsId: this.termPhysicalName,
        termsName: this.termName,
        wordRelationList: wordRelationData,
        approvalData: null,
      };

      // 결재 상신 정보가 있으면 결재상신 정보 병합.
      if (!utils.isEmpty(approvalData)) {
        utils.assign(queryParams, { approvalData });
      }
      http.request('PGE_DST_00004', 'DTS_DST_00020', {
        data: queryParams,
      }).then(res => {
        if (res.data.resultCode === '1') {
          this.conFirm('success', this.$t('MSG_ALT_PRGS_OK'), null);
        } else {
          this.conFirm('warning', this.$t('MSG_ALT_IS_EXISTS_APPL'), null);
        }
        this.onPopupCancelClicked();
      });
    },
    onPopupCancelClicked() {
      this.$emit('exit', true);
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
    sourceTermPopulateMethod(value) {
      const sourceTermName = value.termName;
      const combinationTermList = [{
        termName: this.termName,
        termId: this.termPhysicalName,
        domainName: value.domainName,
        dataType: value.domainDataTypeName,
        length: value.domainLength,
        pointLength: value.domainDataDecimalLength,
        duplicatecheck: this.$t('MSG_BTN_DPCT_CHK'),
      }];

      this.domainDetails.domainName = combinationTermList[0].domainName;
      this.domainDetails.domainDataTypeName = combinationTermList[0].dataType;
      this.domainDetails.domainLength = combinationTermList[0].length;
      this.domainDetails.domainDataDecimalLength = combinationTermList[0].pointLength;
      this.dataset2.setData(combinationTermList);
      this.sourceTerm = sourceTermName;
      this.sourceTermID = value.termId;
    },
    /**
     * 결재 담당자 조회 및 생성
     */
    personInChargeList() {
      http.request('PGE_DST_00004', 'DTS_CMZ_00136', {
        path: {
          'pic-type-id': 'PIC_DST_DATA_STD_APRV',
        },
        query: {
        },
      }).then(res => {
        const personInChargeListP01 = [];
        utils.forEach(res.data, obj => {
          const userInfo = {
            userId: obj.userId,
            aprvCode: obj.rightApprovalCode,
          };
          personInChargeListP01.push(userInfo);
        });
        this.onAprvClick(personInChargeListP01);
      });
    },
    /*
     * 결재 상신 팝업
     */
    onAprvClick(personInChargeList) {
      const objTemplate = {
        templateId: 'TMP_DST_APRV_DOC_TRM',
        siteId: this.$store.getters.userInfo.siteId,
        langId: this.$store.getters.userInfo.langId,
        datatStdDivNm: this.$t('MSG_TXT_TRM'),
        datatStdApplDivNm: this.$t('MSG_TXT_NEW'),
        applUserNm: this.$store.getters.userInfo.userName,
        dataStdApplCntn: this.termApplyContent,
        dataStdNm: this.termName,
        dataStdId: this.termPhysicalName,
        domNm: this.domainDetails.domainName,
        domDataTypeNm: this.domainDetails.domainDataTypeName,
        domDataLght: this.domainDetails.domainLength,
        domDataDecmLght: this.domainDetails.domainDataDecimalLength,
        mdleNm: this.$refs.moduleTypeOptions.selected.md.label,
        smdleNm: this.$refs.moduleTypeOptions.selected.smd.label,
        refTrmNm: this.sourceTerm,
        cdNm: this.codeName,
        dataStdCntn: this.termContent,
        dataStdEnNm: this.termContentEn,
        tcdmDqIfList: [],
      };

      utils.openLayerPopup('PGE_CMZ_00012', this.aprvPopupCallback, {
        pageInitialData: {
          // 필수: 업무코드, 업무결재Id
          taskId: 'TSK_CM006003',
          taskApprovalId: 'uid',

          // 결재 제목
          // eslint-disable-next-line max-len
          title: `${this.$t('MSG_TXT_DST_APRV_PRFX')} ${this.$t('MSG_TXT_TRM')} ${this.$t('MSG_TXT_NEW')} (${this.$t('MSG_TXT_STD_LGC_NM')} : ${this.termName})`,
          titleReadonly: true,

          // 결재 Route
          // 선택:담당자그룹Id로 결재자 조회시 사용
          // picGroupId: 'PIC_CMS_DATA_EXTC',
          aprvUsers: personInChargeList,
          popupRoutesModify: false,
          knoxRoutesModify: false,

          // 선택: 첨부파일 DocId
          // attachDocumentId: [],
          //* 결제에 첨부파일을 등록할경우 모듈 코드 값이 필수
          // moduleCode: 'CM',

          attachModify: false,
          // 결재본문
          objTemplate,
          contentsModify: false,

        },
        size: 'xlg',
      });
    },
    /*
     * 결재 상신 팝업 callback
     */
    aprvPopupCallback(objAprv) {
      if (utils.isEmpty(objAprv) === false) {
        this.submitRequestApi(objAprv);
      }
    },
  },
};
</script>
<style scoped>
</style>
