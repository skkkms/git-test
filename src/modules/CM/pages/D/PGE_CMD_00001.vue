<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_MDLE')" />
          </div>
          <div class="col-xs-3">
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
            <sui-input-label :label="$t('MSG_TXT_SEARCH_COND')" />
          </div>
          <div class="col-xs-7">
            <sui-code-select
              ref="condType"
              :selected="frame0.selectData.COD_COND"
              codeId="COD_STD_FORM_SEARCH_COND"
              defaultOption="all"
              :initialSelectedIndex="0"
              class="width30"
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
      <div class="mrB10" />
      <sui-s-grid
        ref="grid"
        :headers="gridColumns0"
        :data-source="dsStandardForm"
        :initialRowsPerPage="10"
        :showRowsPerPageControl="false"
      />
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:delete="$options.name"
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
          @click="onClickPopupCall({},$t('MSG_TIT_STD_FORM_RGST'))"
        >
          {{ $t("MSG_BTN_RGST") }}
        </sui-button>
      </div>
    </sui-page-contents>

    <sui-popup
      v-model="isShownPopup"
      :title="popupTitle"
    >
      <p01
        :pageId="this.$options.name"
        :selectedGridRowData="selectedGridRowData"
        @onClickSearch="onClickSearch"
        @onClickClose="onClickClose('isShownPopup')"
      />
    </sui-popup>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index.js';
import p01 from './components/PGE_CMD_00001_P01';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

const dateFields = [
  'firstRegistrationDTM', 'finalModificationDTM', 'pageUsePriodStartDatetime', 'pageUsePriodFinishDatetime',
];

export default {
  name: 'PGE_CMD_00001', // eslint-disable-line vue/name-property-casing
  components: { p01 },
  extends: BasePage,
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
      gridColumns0: [],
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
      isShownPopup: false,
      popupTitle: '',
      selectedGridRowData: {},
      dsStandardForm: new urDataSet(),
    };
  },
  mounted() {
    const that = this;
    this.gridColumns0 = [{
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
      component: {
        props: ['row', 'value'],

        template: `
          <ur-button
            color="#60a3ef !important"
            hyperlink
            @click="onClick">
            {{value}}
          </ur-button>
        `,

        methods: {
          onClick() {
            that.onGridSingleButtonClicked(null, this.row);
          },
        },
      },
      width: '150px',
    }, {
      text: this.$t('MSG_TXT_STD_FORM_NM'),
      value: 'documentName',
    }, {
      text: this.$t('MSG_TXT_MDFC_USR'),
      value: 'finalModificationUserId',
      width: '200px',
      component: {
        props: ['row'],

        template:
          `<cmp-user-name-link
            
            :displayType="'1'"
            :displayLanguageId="row.displayLanguageId"
            :knoxId="row.knoxId"
            :userName="row.userName"
            :userGlobalName="row.userGlobalName"
            :departmentName="row.departmentName"
            :departmentEnglishName="row.departmentEnglishName"
            :type="'link'"
          />`,
      },
    }, {
      text: this.$t('MSG_TXT_MDFC_DTM'),
      value: 'finalModificationDTM',
      width: '170px',
    }];
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
        utils.dateformatToClientInArray(res.data, dateFields);
        this.dsStandardForm.setData(res.data); // 데이터 셋에 데이터를 넣는 함수
      });
    },
    /**
     * 삭제
     */
    onClickDelete() {
      const selectedRows = this.dsStandardForm.getSelected();
      const documentIdList = [];

      if (selectedRows.length < 1) {
        utils.messageBox('warning', this.$t('MSG_ALT_DEL_NO_DATA'));
        return false;
      }

      utils.forEach(selectedRows, selectedRow => {
        documentIdList.push(selectedRow.documentId);
      });

      utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), null, () => { // 삭제하시겠습니까?
        http.request(this.$options.name, 'DTS_CMD_00004', {
          query: {
            standardFormIdList: utils.join(documentIdList, '|'),
          },
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_DEL_DATA'), null, this.onClickSearch());
        });
      });

      return null;
    },
    /**
     * 검색조건 특수문자 입력 제한
     */
    onKeyUpInput() {
      const searchFieldNewText = this.frame0.searchText;

      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR_SRCH'), this.$t('MSG_ALT_SPECL_CHAR_LIST'), () => {
          this.frame0.searchText = this.searchFieldOldText;
          this.$refs.searchField.setFocus();
        });
      } else {
        this.searchFieldOldText = searchFieldNewText;
      }
    },
    /**
     * 표준양식 수정 팝업 호출
     */
    onGridSingleButtonClicked(value, dataRow) {
      this.onClickPopupCall(dataRow, this.$t('MSG_TIT_STD_FORM_MDFC'));
    },
    /**
     * 표준양식 등록/수정 팝업 호출
     */
    onClickPopupCall(selectedData, title) {
      this.selectedGridRowData = selectedData;
      this.popupTitle = title;
      this.isShownPopup = true;
    },
    /**
     * 팝업 닫기
     */
    onClickClose(key) {
      this[key] = false;
    },
  },
};
</script>
<style scoped>
</style>
