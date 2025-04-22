<template>
  <div>
    <div class="comm_popup_wrap_medium">
      <div class="comm_title_wrap">
        <h4>{{ applicationName }}</h4>
      </div>
      <sui-s-grid
        ref="grid"
        :headers="gridColumns0"
        :data-source="dsData0"
        :showDisplayCountControl="false"
        :options="options"
        :showRowsPerPageControl="false"
      >
        <template #right-info>
          <sui-button
            class="comm_btn_gridTop comm_ico_excel"
            @click="onDownloadExcel"
          >
            {{ $t("MSG_BTN_EXCEL_DOWN") }}
          </sui-button>
        </template>
      </sui-s-grid>
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button
        type="button"
        class="comm_btn_solid"
        @click="closePopup"
      >
        {{ $t("MSG_BTN_CFRM") }}
      </sui-button>
    </div>
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index';

export default {
  name: 'PGECMP00014P01', // eslint-disable-line vue/name-property-casing
  props: {
    pageId: {
      type: String,
      default: 'PGE_CMP_00014',
    },
    searchBox: {
      type: Object,
      default() {
        return {
          siteId: { key: '', label: '' },
          systemUseSearchConditionCode: { key: '', label: '' },
          startDTM: '',
          endDTM: '',
        };
      },
    },
    popupType: {
      type: String,
      default: null, // A: application, M: menu
    },
    selectedId: {
      type: String,
      required: true,
      validator(value) {
        return (utils.isEmpty(value) === false);
      },
    },
    applicationName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      localdata0: [],
      // excel
      excelGridColumnsUser: [{
        text: this.$t('MSG_TXT_USR_ID'),
        datafield: 'knoxId',
      }, {
        text: this.$t('MSG_TXT_USR_NM'),
        datafield: 'userName',
      }, {
        text: this.$t('MSG_TXT_ITCN_NUM'),
        datafield: 'connectionNumber',
        width: 100,
      }],

      excelGridColumnsDept: [{
        text: this.$t('MSG_TXT_DEPT_NM'),
        datafield: 'departmentDisplayName',
      }, {
        text: this.$t('MSG_TXT_ITCN_NUM'),
        datafield: 'connectionNumber',
        width: 100,
      }],

      dsData0: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
      },
    };
  },
  computed: {
    gridColumns0() {
      const userHeader = {
        text: this.$t('MSG_TXT_USR_NM'),
        value: 'userId',
        component: {
          props: ['row', 'value'],
          template:
            `<cmp-user-name-link            
              :displayType="'1'"
              :displayLanguageId="row.displayLanguageId"
              :userId="row.finalModificationUserId"
              :knoxId="row.knoxId"
              :loginId="row.loginId"
              :userName="row.userName+' / '+row.departmentName"
              :userGlobalName="row.userGlobalName"
              :departmentName="row.departmentName"
              :departmentEnglishName="row.departmentEnglishName"
              :type="'link'"
            />`,
        },

      };

      const deptHeader = {
        text: this.$t('MSG_TXT_DEPT_NM'),
        value: 'departmentDisplayName',
      };

      const connHeader = {
        text: this.$t('MSG_TXT_ITCN_NUM'),
        value: 'connectionNumber',
        width: '100px',
      };

      const { searchBox } = this.$props;
      const res = [];

      if (searchBox.systemUseSearchConditionCode.key === 'U') {
        res.push(userHeader);
      } else {
        res.push(deptHeader);
      }

      res.push(connHeader);
      return res;
    },
  },
  watch: {},
  created() {
  },
  mounted() {
    const { selectedId } = this.$props;
    const { popupType } = this.$props;

    if (popupType === 'A') {
      // applicationID|portalId
      if (utils.indexOf(selectedId, '|') !== -1) {
        const newValues = selectedId.split('|');

        const sApplicationId = newValues[0];
        const sPortalId = newValues[1];

        this.searchApplicationConnectionNumber(sApplicationId, sPortalId);
      }
    } else if (popupType === 'M') {
      const menuLogObjectId = selectedId;
      this.searchMenuConnectionNumber(menuLogObjectId);
    }
  },

  methods: {
    /** ***************************************************************************
      이벤트 영역
    ***************************************************************************** */
    onDownloadExcel() {
      const sPageId = this.$options.name;
      let objGridColumns = {};
      const objGridDataset = this.dsData0;

      const { searchBox } = this.$props;

      if (searchBox.systemUseSearchConditionCode.key === 'U') {
        objGridColumns = this.excelGridColumnsUser;
      } else if (searchBox.systemUseSearchConditionCode.key === 'D') {
        objGridColumns = this.excelGridColumnsDept;
      }

      const sToday = utils.now('YYYYMMDD');
      const sExcelName = `menuStatus_pop_${sToday}.xlsx`;

      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName);
    },

    /** ***************************************************************************
    함수 영역
    ***************************************************************************** */
    searchApplicationConnectionNumber(sApplicationId, sPortalId) {
      const { searchBox } = this.$props;

      // searchBox -> paramsObj변환 { key : value, key : value }
      const queryParams = utils.reduce(searchBox, (result, value, key) => {
        const objResult = utils.clone(result);
        if (utils.isUndefined(value) === false && value !== null) {
          objResult[key] = utils.isUndefined(value.key) ? utils.trim(value) : utils.trim(value.key);
        }
        return objResult;
      }, {});

      utils.assign(queryParams, { portalId: sPortalId });

      http.request(this.pageId, 'DTS_CMP_00042', {
        path: {
          'application-id': sApplicationId,
        },
        query: queryParams,
      }).then(res => {
        this.dsData0.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    searchMenuConnectionNumber(sMenuLogObjectId) {
      const { searchBox } = this.$props;

      // searchBox -> paramsObj변환 { key : value, key : value }
      const queryParams = utils.reduce(searchBox, (result, value, key) => {
        const objResult = utils.clone(result);
        if (utils.isUndefined(value) === false && value !== null) {
          objResult[key] = utils.isUndefined(value.key) ? utils.trim(value) : utils.trim(value.key);
        }
        return objResult;
      }, {});

      http.request(this.pageId, 'DTS_CMP_00043', {
        path: {
          'menu-log-object-id': sMenuLogObjectId,
        },
        query: queryParams,
      }).then(res => {
        this.dsData0.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    closePopup() {
      this.$emit('onClose');
    },
  },
};
</script>
<style scoped>
</style>
