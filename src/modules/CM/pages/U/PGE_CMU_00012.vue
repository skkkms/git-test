<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDLE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-3">
            <sui-module-submodule-select
              ref="smComboFrame0"
              class="dp_flex"
              :pageId="this.$options.name"
              :selectedMd="frame0.selectData.COD_MDLE"
              :selectedSmd="frame0.selectData.COD_SMDLE"
              :defaultMdOption="'all'"
              :defaultSmdOption="'all'"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEARCH_COND')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-7">
            <sui-code-select
              ref="condType"
              :selected="frame0.selectData.COD_COND"
              codeId="COD_MANU_SEARCH_COND"
              defaultOption="all"
              :initialSelectedIndex="0"
              class="width60"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="frame0.searchWord"
              maxlength="50"
              :disabled="false"
              :readonly="false"
              @keyup="onKeyUpInput"
              @keyup.enter="onClickSearch"
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
            @click="onClickSearch"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
     
      <sui-s-grid
        ref="grid"
        :headers="gridColumns0"
        :data-source="dsManual"
        :options="options"
        :showDisplayCountControl="true"
        :showRowsPerPageControl="false"
      />

    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onClickCancel"
        >
          {{ $t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onClickSelect"
        >
          {{ $t('MSG_BTN_SELT') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';
import { urDataSet } from 'uidev-component/index.js';

const dateFields = [
  'firstRegistrationDTM', 'finalModificationDTM', 'pageUsePriodStartDatetime', 'pageUsePriodFinishDatetime',
];
export default {
  name: 'PGE_CMU_00012', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    closePagePopup: {
      type: Function,
      default() {
        return null;
      },
    },
    pageInitialData: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
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
          COD_COND: {
            label: '',
            key: '',
          },
        },
        searchWord: '',
      },
      localdata0: [],
      
      searchFieldOldText: '',
       dsManual: new urDataSet(),
       options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },
    };
  },
  computed: {},
  watch: {},
  created()
  {
      this.gridColumns0= [
        {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: '100',
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
        width: '100',
      }, {
        text: this.$t('MSG_TXT_MANU_ID'),
        value: 'documentId',
         component: {
          props: ['row', 'value'],
          template:
            `<sui-button
              :title="row.documentId"
              type="button"
              class="link"
              @click.stop="onGridSingleButtonClicked(value, row)"
            >
              {{row.documentId}}
            </sui-button>`,
          methods: {
            onGridSingleButtonClicked(value, dataRow) {
      utils.openLayerPopup('PGE_CMU_00013', null, {
        pageInitialData: {
          manualId: dataRow.documentId,
          type: 'manual',
        },
        size: 'lg',
      });
    },
          },
        },

        width: '150',
      }, {
        text: this.$t('MSG_TXT_MANU_NM'),
        value: 'documentName',
      }
      ];
  },

  mounted() {
  },

  methods: {
    /**
     *  초기화
     */
    onClickReset() {
      this.$refs.condType.reset();
      // this.$refs.smComboFrame0.reset();
      this.frame0.selectData.COD_MDLE.key = 'ALL';
      this.frame0.selectData.COD_SMDLE.key = 'ALL';
      this.frame0.searchWord = '';
    },
    /**
     *  검색
     *  매뉴얼 목록 조회
     */
    onClickSearch() {
      const queryParams = {
        moduleCode: this.frame0.selectData.COD_MDLE.key,
        subModuleCode: this.frame0.selectData.COD_SMDLE.key,
        searchWord: this.frame0.searchWord,
        searchCond: this.frame0.selectData.COD_COND.key,
      };

      http.request(this.$options.name, 'DTS_CMU_00055', {
        query: queryParams,
      }).then(res => {
        utils.dateformatToClientInArray(res.data, dateFields);
        this.dsManual.setData(res.data);
      });
    },
    /**
     *  닫기
     */
    onClickCancel() {
      this.closePagePopup('');
    },
    /**
     *  선택
     */
    onClickSelect() {
      const selectedData = this.dsManual.getSelected();
      if (selectedData.length !== 0) {
        this.closePagePopup(selectedData);
      } else {
        // 선택 안했을 때
        //utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));// 선택 된 항목이 없습니다.
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    /**
     *  매뉴얼 조회 공통 팝업 호출
     */
    onGridSingleButtonClicked(value, dataRow1) {
      utils.openLayerPopup('PGE_CMU_00013', null, {
        pageInitialData: {
          manualId: dataRow1.documentId,
          type: 'manual',
        },
        size: 'lg',
      });
    },
    onKeyUpInput() {
      // _ 제외 특수문자 입력제한
      const searchFieldNewText = this.frame0.searchWord;
      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.frame0.searchWord = this.searchFieldOldText;
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
