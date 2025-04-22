<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDLE')"
              :required="false"
              :vertical="false"
              optional
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="moduleCode"
              defaultOption="all"
              codeId="COD_MDLE"
              :pageId="this.$options.name"
              :selected="frame0.selectedCodeValue.COD_MDLE"
              :initialSelectedIndex="0"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MSG_RESO_TYPE')"
              :required="false"
              :vertical="false"
              style="letter-spacing: -1px;"
              optional
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="messageResourcesTypeCode"
              :pageId="this.$options.name"
              defaultOption="all"
              :selected="frame0.selectedCodeValue.COD_MSG_RESO_TYPE"
              codeId="COD_MSG_RESO_TYPE"
              :initialSelectedIndex="0"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <wbr>
            <sui-input-label
              :label="$t('MSG_TXT_LANG')"
              :required="false"
              :vertical="false"
              class="ls"
            />
          </div>
          <div class="col-xs-5">
            <sui-lang-select
              ref="langCode"
              :selected="frame0.selectedCodeValue.COD_LANG"
              :pageId="this.$options.name"
              defaultOption="all"
              :initialSelectedIndex="0"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEARCH_COND')"
              :required="false"
              :vertical="false"
              optional
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="searchCond"
              :pageId="this.$options.name"
              codeId="COD_MSG_RESO_SEARCH_COND"
              :selected="frame0.selectedCodeValue.COD_MSG_RESO_SEARCH_COND"
              defaultOption="all"
              :initialSelectedIndex="0"
              style="width:58%"
            />
            <div class="comp_spacing" />
            <sui-text-field
              ref="searchField"
              v-model="frame0.codMsgResoSearchText"
              maxlength="50"
              @keyup.enter="onClickSearch('button')"
              @keyup="onKeyUpInput"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onClickReset"
          >
            {{ $t("MSG_BTN_RESET") }}
          </sui-button>
          <sui-button
            v-permission:read="$options.name"
            type="button"
            class="comm_btn_Scr"
            @click="onClickSearch('button')"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="grid"
        :data-source="dsMessageResource"
        :headers="columns"
        :showRowsPerPageControl="false"
        @grid:row-click="datasetSelectionChanged"
        @grid:scroll-bottom="onAddList"
      />
      <div
        class="btn_moreView"  
      >
        <p>
          {{ showMoreCount }}
        </p>
      </div>
      <div class="mrB30" />
      <sui-page-tab-box-type
        :defaultTabIndex="defaultTabIndex"
        :tab-items="tabItems"
        @change-tab-idx="onChangeTabIdx"
      >
        <container
          :is="currentTabComponent"
          :massdataList="massdata"
          :messageResourcesId="messageResourcesId"
          :langId="langId"
          :messageResourcesMultiLanguageId="messageResourcesMultiLanguageId"
          :pageId="$options.name"
          :selectedData="selectedRowData"
          @deleted-message-resource="onDeletedMessageResource"
          @saved-message-resource="onSavedMessageResource"
          @onClickNew="onClickNew"
          @onPopupCall="onPopupCall"
          @page-deactivate="handleChildDeactivated"
          @page-activate="handleChildActivated"
        />
      </sui-page-tab-box-type>
      <sui-popup
        v-model="isShownPopupMasteNew"
        :title="$t('MSG_TXT_MSG_RESO_BK_RGST')"
      >
        <p01
          :pageId="this.$options.pname"
          @onClickCheck="onClickCheck"
          @onClickCancel="onClickCancel"
        />
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index';
import tab01 from './components/PGE_CMU_00003_T01';
import tab02 from './components/PGE_CMU_00003_T02';
import tab04 from './components/PGE_CMU_00003_T04';
import tab03 from './components/PGE_CMU_00003_T03';
import p01 from './components/PGE_CMU_00003_P01';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

const dateFields = [
  'firstRegistrationDTM', 'finalModificationDTM', 'pageUsePriodStartDatetime', 'pageUsePriodFinishDatetime',
];

export default {
  name: 'PGE_CMU_00003', // eslint-disable-line vue/name-property-casing
  components: {
    tab01, tab02, tab04, tab03, p01,
  },
  extends: BasePage,
  data() {
    return {
      paramData: null,
      multiTenancy: utils.getConfigurationValue('YML_MULTI_TENANCY_YN') === 'Y',
      isPaging: false,
      paging: {
        pagePerCount: 5000,
        currentPage: 1,
        totalCount: 0,
        count: 0,
      },
      pageTitle: this.$t('MSG_TXT_MSG_RESO'),
      tabItems: [
        { tabTitle: (this.$t('MSG_TXT_MSG_RESO')), tabComponent: 'tab01' },
        { tabTitle: (this.$t('MSG_TXT_PAGE')), tabComponent: 'tab02', ShowTab: utils.getConfigurationValue('YML_UIFRAMEWORK_MESSAGE_RESOURCE_YN') === 'false'? false : true, },
        { tabTitle: (this.$t('MSG_TXT_CMPNT')), tabComponent: 'tab04', ShowTab: utils.getConfigurationValue('YML_UIFRAMEWORK_MESSAGE_RESOURCE_YN') === 'false'? false : true, },
        { tabTitle: (this.$t('MSG_TXT_BK_RGST')), tabComponent: 'tab03' },
      ],
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
          COD_MSG_RESO_SEARCH_COND: {
            label: '',
            key: '',
          },
          COD_LANG: {
            label: '',
            key: '',
          },
          useYnValue: {},
        },
        selectedRowData: [],
        codMsgResoSearchText: '',
      },
      selectedRowData: {},
      massdata: '',
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      isShownPopupMasteNew: false,
      messageResourcesId: '',
      langId: '',
      messageResourcesMultiLanguageId: '',
      // eslint-disable-next-line new-cap
      dsMessageResource: new urDataSet(),
    };
  },
  computed: {
    // 계산된 속성, property로 사용가능
    showMoreCount() {
      return `${ utils.numberFormat(this.paging.count)} / ${utils.numberFormat(this.paging.totalCount)}`;
    },
  },
  created() {
    this.localdata = [];
    this.columns = [{
      text: this.$t('MSG_TXT_MDLE'),
      value: 'moduleName',
      width: '100px',
    }, {
      text: this.$t('MSG_TXT_MSG_RESO_TYPE'),
      value: 'messageResourcesTypeName',
      width: '120px',
    }, {
      text: this.$t('MSG_TXT_MSG_RESO_ID'),
      value: 'messageResourcesId',
    }, {
      text: this.$t('MSG_TXT_LNG_ID'),
      value: 'langId',
      width: '80px',
    }, {
      text: this.$t('MSG_TXT_MSG_RESO_VAL'),
      value: 'multiLanguageContent',
    }, {
      text: this.$t('MSG_TXT_MSG_RESO_DEF_VAL'),
      value: 'defaultMultiLanguageContent',
      hidden: !this.multiTenancy,
    }, {
      text: this.$t('MSG_TXT_MDFC_USR'),
      value: 'finalModificationUserId',
      width: '200px',
    }, {
      text: this.$t('MSG_TXT_MDFC_DTM'),
      value: 'finalModificationDTM',
      width: '170px',
    }];
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    /**
     * tab event
     */
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].tabComponent;
    },
    /**
     * 초기화
     */
    onClickReset() {
      const selectBoxRefs = ['moduleCode', 'messageResourcesTypeCode', 'searchCond', 'langCode'];
      utils.forEach(selectBoxRefs, values => {
        this.$refs[values].reset();
      });
      this.$refs.langCode.select('ALL');
      this.frame0.codMsgResoSearchText = '';
    },
    /**
     * 더보기
     */
    onAddList() {
      if (this.isPaging) {
        this.paging.currentPage += 1;
        this.selectMessageResources();
      }
    },
    /**
     * 검색
     */
    onClickSearch(key) {
      if (this.validationCheck()) return false;
      const codeValue = this.frame0.selectedCodeValue;
      const queryParams = {
        moduleCode: utils.trim(codeValue.COD_MDLE.key) || '',
        messageResourcesTypeCode: utils.trim(codeValue.COD_MSG_RESO_TYPE.key) || '',
        searchMsgResoCond: utils.trim(codeValue.COD_MSG_RESO_SEARCH_COND.key) || '',
        searchMsgResoText: utils.trim(this.frame0.codMsgResoSearchText) || '',
        lngId: utils.trim(codeValue.COD_LANG.key) || '',
      };

      this.queryParams = utils.clone(queryParams);

      this.paging.currentPage = 1;
      this.paging.totalCount = 0;
      this.paging.count = 0;

      this.dsMessageResource.setData([], { preventBackup: true });
      this.selectMessageResources(key);

      return null;
    },
    selectMessageResources(key) {
      utils.assign(this.queryParams, { currentPage: this.paging.currentPage, pagePerCount: this.paging.pagePerCount });
      http.request(this.$options.name, 'DTS_CMU_00067', {
        query: this.queryParams,
      }).then(res => {
        if (res.data.length > 0) {
          this.paging.totalCount = res.data[0].totalCount;
        }
        // 실제 사용하는 데이터만 필터링
        utils.dateformatToClientInArray(res.data, dateFields);
        const { data } = this.dsMessageResource;
        // 기본 가이드
        const newData = [];
        utils.forEach(data, row => newData.push(row));
        utils.forEach(res.data, row => newData.push(row));
        this.dsMessageResource.setData(newData, { preventBackup: true });
      }).then(() => {
        this.paging.count = this.dsMessageResource.data.length;
        if (this.dsMessageResource.data.length !== 0 && this.paging.count < this.paging.totalCount) {
          this.isPaging = true;
        } else {
          this.isPaging = false;
        }
        if (this.dsMessageResource.data.length > 0 && utils.isEqual(this.paging.currentPage, 1)
          && utils.isEqual(key, 'button')) {
          const firstRow = this.dsMessageResource.data[0];
          this.dsMessageResource.setSelect(firstRow);
          this.datasetSelectionChanged(firstRow);
        } else if (this.paramData != null) {
          this.$refs.grid.setSelect(this.paramData);
          this.paramData = null;
        }
      });
    },
    /**
     * 조회 시 검색조건1개이상 필수 입력 체크
     */
    validationCheck() {
      const codeValue = this.frame0.selectedCodeValue;

      if (utils.isEqual(codeValue.COD_MDLE.key, 'ALL')
      && utils.isEqual(codeValue.COD_MSG_RESO_TYPE.key, 'ALL')
      && utils.isEmpty(this.frame0.codMsgResoSearchText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_MSG_SRCH'));
        return true;
      }
      return false;
    },
    /**
     * 신규
     */
    onClickNew() {
      
      this.$refs.grid.resetSelect();
      this.selectedRowData = {};
      this.langId = '';
      this.messageResourcesId = '';
    },
    /**
     * 삭제 후 처리
     */
    onDeletedMessageResource() {
      this.onClickSearch();
    },
    /**
     * 수정 후 처리
     */
    onSavedMessageResource(paramData) {
      if (paramData != null) {
        this.paramData = paramData;
      }
      this.onClickSearch();
    },
    /**
     * 팝업 Event
     */
    onPopupCall() {
      this.isShownPopupMasteNew = true;
    },
    onClickCheck(value) {
      const valueSplitList = value.split('|');

      if (valueSplitList.length > 30) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_MAX_SEARCH_CNT'), '30'));
        return false;
      }
      this.massdata = value;
      this.isShownPopupMasteNew = false;

      return true;
    },
    onClickCancel() {
      this.isShownPopupMasteNew = false;
    },
    /**
     * grid selected event
     */
    datasetSelectionChanged(data) {
      if (this.dsMessageResource.getSelected().length === 0) {
        this.dsMessageResource.setSelect(data, false);
      }
      if (!utils.isEmpty(data)) {
        this.selectedRowData = data;
        this.langId = data.langId;
        this.messageResourcesId = data.messageResourcesId;
      }
    },
    /**
     * 검색조건 특수문자 입력 제한
     */
    onKeyUpInput() {
      const searchFieldNewText = this.frame0.codMsgResoSearchText;

      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.frame0.codMsgResoSearchText = this.searchFieldOldText;
          this.$refs.searchField.setFocus();
        });
      } else {
        this.searchFieldOldText = searchFieldNewText;
      }
    },
  },
};
</script>
<style scoped>
</style>
