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
          <div class="col-xs-5">
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
          <div class="col-xs-5">
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
              ref="searchText"
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
        :initialRowsPerPage="10"
        :showRowsPerPageControl="false"
      />
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:delete="this.$options.name"
          type="button"
          class="comm_btn_border"
          @click="onClickDelete"
        >
          {{ $t("MSG_BTN_DEL") }}
        </sui-button>
        <sui-button
          v-permission:create="this.$options.name"
          type="button"
          class="comm_btn_solid"
          @click="onClickRegist"
        >
          {{ $t("MSG_BTN_RGST") }}
        </sui-button>
      </div>
    </sui-page-contents>
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
  name: 'PGE_CMU_00010', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
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
      searchFieldOldText: '',
      dsManual: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
    };
  },
  computed: {},
  watch: {},
 
  created() {
    this.gridColumns0 = [{
      text: this.$t('MSG_TXT_MDLE'),
      value: 'moduleName',
      width: '100px',
    }, {
      text: this.$t('MSG_TXT_SMDLE'),
      value: 'subModuleName',
      width: '100px',
    }, {
      text: this.$t('MSG_TXT_MANU_ID'),
      value: 'documentId',
      width: '150px',
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
              utils.openLayerPopup('PGE_CMU_00011', this.manualPopupCallback, {
                pageInitialData: {
                  manualId: dataRow.documentId,
                },
                size: 'lg',
                title: this.$t('MSG_TIT_MANU_MOD'),
              });
            },
          },
        }
    }, {
      text: this.$t('MSG_TXT_MANU_NM'),
      value: 'documentName',
    },

    {
      text: this.$t('MSG_TXT_MDFC_USR'),
      value: 'finalModificationUserName',
      width: '200px',
        component: {
          props: ['row'],

          template: `
            <cmp-user-name-link
              :displayType="'1'"
              :displayLanguageId="row.displayLanguageIdModification"
              :userId="row.finalModificationUserId"
              :loginId="row.loginIdModification"
              :knoxId="row.knoxIdModification"
              :userName="row.userNameModification"
              :userGlobalName="row.userGlobalNameModification"
              :departmentName="row.departmentNameModification"
              :departmentEnglishName="row.departmentEnglishNameModification"
              :type="'link'"
            />`,
        },
    }, {
      text: this.$t('MSG_TXT_MDFC_DTM'),
      value: 'finalModificationDTM',
      width: '170px',
    }];
    this.localdata0 = [];
  },
  mounted() {},

  methods: {
    /**
     *  초기화
     */
    onClickReset() {
      // this.$refs.smComboFrame0.reset();
      this.$refs.smComboFrame0.selectMd('ALL');
      this.$refs.condType.reset();

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
        let pageIdCount = '';

        utils.dateformatToClientInArray(res.data, dateFields);
        utils.forEach(res.data, (obj, key) => {
          if (obj.pageCount > 1) {
            pageIdCount = utils.strFormat(this.$t('MSG_TXT_EXID_CNT'), obj.pageId, obj.pageCount);
          } else {
            pageIdCount = obj.pageId;
          }

          res.data[key].pageIdCount = pageIdCount;
        });

        this.dsManual.setData(res.data);
      });
    },
    /**
     *  삭제
     */
    onClickDelete() {
     
    if (this.dsManual.getSelected()[0] === undefined) {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM')); // 선택 된 항목이 없습니다.
        return false;
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
        http.request(this.$options.name, 'DTS_CMU_00059', {
          data: this.dsManual.getSelected(),
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_DEL_DATA'), null, () => {
            this.onClickSearch();
          });
        });
      });

      return null;
    },
    /**
     *  매뉴얼 수정 팝업 호출
     */
    onGridSingleButtonClicked(value, dataRow1) {
      utils.openLayerPopup('PGE_CMU_00011', this.manualPopupCallback, {
        pageInitialData: {
          manualId: dataRow1.documentId,
        },
        size: 'lg',
        title: this.$t('MSG_TIT_MANU_MOD'),
      });
    },
    /**
     *  매뉴얼 등록 팝업 호출
     */
    onClickRegist() {
      utils.openLayerPopup('PGE_CMU_00011', this.manualPopupCallback, {
        pageInitialData: {},
        size: 'lg',
        title: this.$t('MSG_TIT_MANU_RGST'),
      });
    },
    /**
     *  매뉴얼 등록/수정 팝업 CALLBACK
     */
    manualPopupCallback() {
      this.onClickSearch();
    },
    onKeyUpInput() {
      // _ 제외 특수문자 입력제한
      const searchFieldNewText = this.frame0.searchWord;
      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.frame0.searchWord = this.searchFieldOldText;
          this.$refs.searchText.setFocus();
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
