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
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-module-submodule-select
              ref="smComboFrame0"
              :pageId="this.$options.name"
              :selectedMd="frame0.selectData.COD_MDLE"
              :selectedSmd="frame0.selectData.COD_SMDLE"
              defaultMdOption="all"
              defaultSmdOption="all"
              class="dp_flex"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEARCH_COND')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="condType"
              :selected="frame0.selectData.COD_COND"
              codeId="COD_STD_FORM_SEARCH_COND"
              defaultOption="all"
              :initialSelectedIndex="0"
            />
            <div class="comp_spacing" />
            <sui-text-field
              ref="searchField"
              v-model.trim="frame0.searchText"
              :disabled="false"
              :readonly="false"
              maxlength="50"
              @keyup.enter="onClickSearch"
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
            :data-source="dsStandardForm"
            :options="options"
            :showRowsPerPageControl="false"
            :initialRowsPerPage="10"
            @grid:selected="onSelectGrid"
          />
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onClickCancel"
        >
          {{ $t("MSG_BTN_CANCEL") }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onClickSelect"
        >
          {{ $t("MSG_BTN_SELT") }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';
import { urDataSet } from 'uidev-component/index.js';

export default {
  name: 'PGE_CMD_00005', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    closePagePopup: {
      type: Function,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      selectedCodeValue: {
        COD_MDLE: {
          label: '',
          key: '',
        },
      },
      count: 0,
      localdata0: [],
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
        searchText: '',
      },
      dsStandardForm: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      gridColumns0: [{
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: '100px',
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
        width: '100px',
      }, {
        text: this.$t('MSG_TXT_STD_FORM_ID'),
        value: 'documentId',
        width: '150px',
        component: {
          props: ['row', 'value'],
          template:
            `<sui-button
              :title="row.documentId"
              type="button"
              class="link"
              @click.stop ="onGridSingleButtonClicked(value, row)"
            >
              {{row.documentId}}
            </sui-button>`,
            methods: {
                 onGridSingleButtonClicked(value, dataRow) {
                 utils.openLayerPopup('PGE_CMD_00008', () => {}, {
                 pageInitialData: {
                      standardFormId: value,
                      attachItemName: dataRow.documentName,
                    },
                  size: 'md',
                    });
                },
          },
          
        },
      }, {
        text: this.$t('MSG_TXT_STD_FORM_NM'),
        value: 'documentName',
      }],
    };
  },
  methods: {
    /**
     * 리셋
     */
    onClickReset() {
      utils.forEach(this.frame0, (value, key) => {
        if (utils.isEqual(key, 'selectData')) {
          // this.$refs.smComboFrame0.reset();
          this.frame0.selectData.COD_MDLE.key = 'ALL';
          this.frame0.selectData.COD_SMDLE.key = 'ALL';
          this.$refs.condType.reset();
        } else {
          this.frame0[key] = '';
        }
      });
    },
    /**
     * 표준양식 목록 조회
     */
    onClickSearch() {
      const queryParams = {
        moduleCode: this.frame0.selectData.COD_MDLE.key,
        subModuleCode: this.frame0.selectData.COD_SMDLE.key,
        searchCondition: this.frame0.selectData.COD_COND.key,
        standardFormId: this.frame0.searchText,
        standardFormName: this.frame0.searchText,
      };

      http.request(this.$options.name, 'DTS_CMD_00001', {
        query: queryParams,
      }).then(res => {
        this.dsStandardForm.setData(res.data); // 데이터 셋에 데이터를 넣는 함수
      });
    },
    /**
     * row 다중 선택 안되도록 설정
     */
    onRowselect(event) {
      // this.$refs.grid0.clearselection();
      if (typeof event.args.rowindex === 'object') {
        this.$refs.grid.getJqxGrid().clearselection();
      } else {
        utils.forEach(this.$refs.grid.getJqxGrid().getselectedrowindexes(), obj => {
          if (!utils.isEqual(event.args.rowindex, obj)) {
            this.$refs.grid.getJqxGrid().unselectrow(obj);
          }
        });
      }
    },
    /**
     * 선택
     */
    onClickSelect() {
      const selectedData = this.dsStandardForm.getSelected();
      if (selectedData.length !== 0) {
        this.closePagePopup(selectedData);
      } else {
        // 선택 안했을 때
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));// 선택 된 항목이 없습니다.
      }
    },
    /**
     * 닫기
     */
    onClickCancel() {
      this.closePagePopup();
    },
    /**
     * 검색조건 특수문자 입력제한
     */
    onKeyUpInput() {
      const searchFieldNewText = this.frame0.searchText;

      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.frame0.searchText = this.searchFieldOldText;
          this.$refs.searchField.setFocus();
        });
      } else {
        this.searchFieldOldText = searchFieldNewText;
      }
    },
    /**
     * 표준양식 조회 공통팝업
     */
    // onGridSingleButtonClicked(value, dataRow) {
    //   utils.openLayerPopup('PGE_CMD_00008', () => {}, {
    //     pageInitialData: {
    //       standardFormId: value,
    //       attachItemName: dataRow.documentName,
    //     },
    //     size: 'md',
    //   });
    // },
  },
};
</script>
<style scoped>
</style>
