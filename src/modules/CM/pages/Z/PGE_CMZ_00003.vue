<template>
  <sui-page>
    <!-- Page Header -->
    <sui-page-header :pageId="this.$options.name" />

    <!-- Page Contents -->
    <sui-page-contents>
      <!-- Contents - Search Bar -->
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDLE')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-module-submodule-select
              ref="smComboFrame0"
              :page-id="this.$options.name"
              :selected-md="frame0.selectedCodeValue.COD_MDLE"
              :selected-smd="frame0.selectedCodeValue.COD_SMDLE"
              :defaultMdOption="'all'"
              :defaultSmdOption="'all'"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_TYPE')" />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              codeId="COD_CDST_TYPE"
              :page-id="this.$options.name"
              :selected="frame0.selectedCodeValue.COD_CDST_TYPE"
              :defaultOption="'all'"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_LANG')" />
          </div>
          <div class="col-xs-5">
            <sui-lang-select
              :selected="frame0.selectedCodeValue.COD_ITGR_LNG"
              :pageId="this.$options.name"
              :disabled="!condCodeId"
            />
          </div>

          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_SEARCH_COND')" />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              codeId="COD_CD_MGT_SEARCH"
              :page-id="this.$options.name"
              :selected="frame0.selectedCodeValue.COD_CD_MGT_SEARCH"
              :defaultOption="'all'"
              style="width:55%"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="codCnfgSearchText"
              maxlength="50"
              @keyup="onKeyUpInput"
              @keyup.enter="onSearchClick"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onResetClick"
          >
            {{ $t("MSG_BTN_RESET") }}
          </sui-button>
          <sui-button
            type="button"
            class="comm_btn_Scr"
            @click="onSearchClick"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </sui-button>
        </div>
      </div>

      <div class="mrB30" />
      <sui-s-grid
        ref="tabGrid"
        :data-source="dsData"
        :headers="defaultGridData"
        :showDisplayCountControl="false"
        :options="options"
        @grid:selected="onClickGrpRow"
      />
    </sui-page-contents>

    <!-- Page Footer -->
    <sui-page-footer>
      <div class="comm_btn_wrap">
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
          @click="onSelectClick"
        >
          {{ $t('MSG_BTN_SELT') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>

<script>
// eslint-disable-next-line import/extensions
import { urDataSet } from 'uidev-component/index.js';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';


export default {
  name: 'PGE_CMZ_00003', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    closePagePopup: {
      type: Function,
      default: () => {},
    },

    pageInitialData: {
      type: Object,
      required: true,
    },

  },
  data() {
    return {
      // eslint-disable-next-line new-cap
      dsData: new urDataSet(),
      options: {
        infinityScroll: true,
        resizableColumn: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      rowSelect: null,
      multiselect: false,
      localdata1: [],
      // 이하 data field는 자유롭게
      frame0: {
        selectedCodeValue: {
          COD_MDLE: {
            label: '',
            key: '',
          },
          COD_SMDLE: {
            label: '',
            key: '',
          },
          COD_CDST_TYPE: {
            label: '',
            key: '',
          },
          COD_CD_MGT_SEARCH: {
            label: '',
            key: '',
          },
          searchWord: {
            label: '',
            key: '',
          },
          COD_ITGR_LNG: {
            label: '',
            key: '',
          },
        },
      },
      selectedData: {},
      codCnfgSearchText: '',
      count: 0,
      defaultGridData: {
        // grid data
        localdata: [],

        // selected data
        selectedData: {},

        // data fields
        dataFields: [],
      },
    };
  },
  computed: {
    // 계산된 속성, property로 사용가능
    condCodeId() {
      if (this.frame0.selectedCodeValue.COD_CD_MGT_SEARCH.key === 'CODE_NM') {
        return true;
      }
      return false;
    },
  },


  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
    count() {
      console.log('count increased');
    },
  },

  created() {
    this.defaultGridData = [{
      text: this.$t('MSG_TXT_MDLE'),
      value: 'moduleCodeName',
      width: 100,
    },
    {
      text: this.$t('MSG_TXT_SMDLE'),
      value: 'subModuleCodeName',
      width: 100,
    },
    {
      text: this.$t('MSG_TXT_CODE_ID'),
      value: 'codeId',
    },
    {
      text: this.$t('MSG_TXT_CODE_NAME'),
      value: 'codeName',
    },
    {
      text: this.$t('MSG_TXT_TYPE'),
      value: 'cdstTypeCode',
    },
    ];
  },
  mounted() {
    // DOM이 document에 append된 상태, 실제 element에 접근 가능 (this.$el or this.$refs)
    // 주로 데이터 패치 등을 함
    // this.loadCode().then(() => {
    this.loadData();
    // });
  },
  methods: {
    loadCode() {},
    loadData() {
      if (this.pageInitialData.multiSelect) {
        this.multiselect = true;
      } else {
        this.multiselect = false;
      }

      // get contents data, grid etc..
      this.defaultValues = utils.clone(this.frame0.selectedCodeValue);

      this.onResetClick();
    },
    onKeyUpInput() {
      const searchFieldNewText = this.codCnfgSearchText;

      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          utils.messageBox('error', this.$t('MSG_ALT_NO_SPECL_CHAR'));
          this.codCnfgSearchText = this.codCnfgSearchOldText;
        } else {
          this.codCnfgSearchOldText = searchFieldNewText;
        }
      }
    },
    onResetClick() {
      const codeValues = this.frame0.selectedCodeValue;
      utils.forEach(this.defaultValues, (values, key) => {
        codeValues[key] = {
          key: '',
          label: '',
        };
      });

      this.codCnfgSearchText = '';

      const { langId } = this.$store.getters.userInfo;
      this.frame0.selectedCodeValue.COD_ITGR_LNG.key = utils.isEmpty(langId) || utils.isUndefined(langId)
        ? 'en'
        : langId;

      this.frame0.selectedCodeValue.COD_MDLE.key = 'ALL';
      this.frame0.selectedCodeValue.COD_SMDLE.key = 'ALL';
      this.frame0.selectedCodeValue.COD_CDST_TYPE.key = 'ALL';
      this.frame0.selectedCodeValue.COD_CD_MGT_SEARCH.key = 'ALL';
    },
    onSearchClick() {
      const codeValue = this.frame0.selectedCodeValue;
      this.dsData.setData([]);

      const mdleCode = codeValue.COD_MDLE.key;
      const smdleCode = codeValue.COD_SMDLE.key;
      const cdstType = codeValue.COD_CDST_TYPE.key;
      const langId = codeValue.COD_ITGR_LNG.key;
      let searchCond = '';
      let searchContents = '';

      if (this.codCnfgSearchText) {
        searchCond = codeValue.COD_CD_MGT_SEARCH.key;
        searchContents = this.codCnfgSearchText;
      }

      const queryParams = {
        moduleCode: mdleCode || '',
        subModuleCode: smdleCode || '',
        codeStructureTypeCode: cdstType || '',
        codeUseYn: '',
        delYN: 'N',
        searchCondition: searchCond || '',
        searchWord: searchContents || '',
        langId: langId || '',
      };
      http
        .request(this.$options.name, 'DTS_CMZ_00002', {
          query: queryParams,
        })
        .then(res => {
          // utils.dateformatToClientInArray(res.data, dateFields); // 컴포넌트가 사용하는 date 값으로 변환
          this.dsData.setData(res.data); // 데이터 셋에 데이터를 넣는 함수
        })
        .catch(error => {
          console.log(error);
        });
    },
    onClickGrpRow(row) {
      this.rowSelect = row;
      // console.log(row);
    },
    onSelectClick() {
      const selectedRawsData = [];
      selectedRawsData.push(this.rowSelect);
      // if (selectedRawsData.length <= 0) {
      //   // utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_DEFAULT_INFO')));
      //   utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      //   return false;
      // }
      if (selectedRawsData[0] == null) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }
      this.closePagePopup(selectedRawsData);
      return true;
    },
    onCancelClick() {
      this.closePagePopup('');
    },
  },
};
</script>
<style scoped>
</style>
