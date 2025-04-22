<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_PORTL')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-custom-select
              ref="portalId"
              :selected="searchBox.portalId"
              :option-list="selectPortalList"
              :initialSelectedIndex="0"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TYPE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              :selected="searchBox.systemUseSearchConditionCode"
              codeId="COD_SYS_USE_SEARCH_COND"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :required="true"
              :label="$t('MSG_TXT_LOOKUP_PERIOD')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <ur-range-picker
              ref="datePicker"
              v-model="rangeDateValue"
              :value="rangeDateValue"
              one-input-mode
              init="today"
              :inputType=this.userDateFormat
              :modelType=this.userDateFormat                 
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onReset"
          >
            {{ $t("MSG_BTN_RESET") }}
          </sui-button>
          <sui-button
            v-permission:read="this.$options.name"
            type="button"
            class="comm_btn_Scr"
            @click="onSearch"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <div class="comm_shut_wrap">
        <div class="inbox">
          <div class="comm_title_wrap">
            <h4>{{ $t("MSG_TXT_APPLICATION") }}</h4>
          </div>
          <sui-s-grid
            ref="gridApplicationStats"
            :headers="gridColumns0"
            :data-source="dsApplicationStats"
            :options="options"
            :showRowsPerPageControl="false"
            :initialRowsPerPage="10"
            @grid:selected="onSelectionChangedByDsApplicationStats"
          >
            <template #right-info>
              <sui-button
                class="comm_btn_gridTop comm_ico_excel"
                @click="onDownloadExcelApplication"
              >
                {{ $t("MSG_BTN_EXCEL_DOWN") }}
              </sui-button>
            </template>          
          </sui-s-grid>
        </div>
        <div class="btnbox" />
        <div class="inbox">
          <div class="comm_title_wrap">
            <h4>{{ $t("MSG_TXT_MENU") }}</h4>
          </div>
          <ur-tree-grid
            ref="gridMenu"
            :headers="gridColumns1"
            :data-source="dsMenuStats"
            :showRowsPerPageControl="false"
            :initialRowsPerPage="10"
            :options="options"
            :data-set-options="dataSetOptions"
          >
          <template #right-info>
              <sui-button
                type="button"
                class="comm_btn_gridTop comm_ico_excel"
                @click="onDownloadExcelMenu"
              >
                {{ $t("MSG_BTN_EXCEL_DOWN") }}
              </sui-button>          
          </template>
          </ur-tree-grid>
        </div>
      </div>
    </sui-page-contents>
    <sui-popup
      v-model="isShownPopup"
      :title="$t('MSG_TIT_SYS_USE_STATS_DTL')"
    >
      <p01
        :pageId="this.$options.name"
        :searchBox="paramSearchBox"
        :selectedId="selectedId"
        :applicationName="applicationName"
        :popupType="popupType"
        @onClose="popOpenOrClose"
      />
    </sui-popup>
  </sui-page>
</template>

<script>
import p01 from './components/PGE_CMP_00014_P01';
import { urDataSet } from 'uidev-component/index.js';

export default {
  name: 'PGE_CMP_00014', // eslint-disable-line vue/name-property-casing
  components: {
    p01,
  },
  data() {
    return {
      rangeDateValue: [utils.now(this.$store.getters.userInfo.dateFormat), utils.now(this.$store.getters.userInfo.dateFormat)],
      rangeDate: {
        from: utils.now(this.$store.getters.userInfo.dateFormat),
        to: utils.now(this.$store.getters.userInfo.dateFormat),
      },
      userDateFormat: this.$store.getters.userInfo.dateFormat,      
      // searchBox portalOptionList
      selectPortalList: [],

      // Search Box
      searchBox: {
        systemUseSearchConditionCode: { key: '', label: '' },
        startDTM: '',
        endDTM: '',
        portalId: { key: '', label: '' },
      },

      localdata0: [],
      dsApplicationStats: new urDataSet(),
      dsMenuStats: new this.$ur.grid.DataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        resizableColumn: true,
      },
      localdata1: [],
      dataSetOptions: { childrenName: 'children', initCollapse: true, id: 'id' },
      // excel
      excelMenuGridColumns: [
        {
          text: this.$t('MSG_TXT_MENU_NM'),
          datafield: 'menuName',
        },
        { text: this.$t('MSG_TXT_TOT_CLICK_NUM'), datafield: 'totalConnectionNumber', width: 100 },
        {
          text: `${this.$t('MSG_TXT_USR_NUM')} / ${this.$t('MSG_TXT_DEPT_NUM')}`,
          datafield: 'connectionNumber',
          width: 120,
        },
      ],

      // popup
      isShownPopup: false,
      selectedId: '',
      applicationName: '',
      popupType: 'M',
      paramSearchBox: {},
    };
  },
  computed: {},
  created() {
    const that = this;
    this.gridColumns0 = [
      {
        text: this.$t('MSG_TXT_APPLICATION_NM'),
        value: 'applicationName',
      }, {
        text: this.$t('MSG_TXT_TOT_CLICK_NUM'),
        value: 'totalConnectionNumber',
        width: 100,
      }, {
        text: `${this.$t('MSG_TXT_USR_NUM')} / ${this.$t('MSG_TXT_DEPT_NUM')}`,
        value: 'connectionNumber',
        component: {
          props: ['row', 'value'],
          template:
            `<sui-button
              :title="row.connectionNumber"
              type="button"
              class="link"
              @click.stop="onDetailClick(value, row)"
            >
              {{row.connectionNumber}}
            </sui-button>`,
          methods: {
            onDetailClick(btn, selectedRawData) {
              that.popupType = 'A';
              that.selectedId = `${selectedRawData.applicationId}|${selectedRawData.portalId}`;
              that.applicationName = selectedRawData.applicationName;
              that.popOpenOrClose();
            },
          },
        },
        width: 150,
      },
    ];
    this.gridColumns1 = [
      {
        text: this.$t('MSG_TXT_MENU_NM'),
        value: 'menuName',
      }, {
        text: this.$t('MSG_TXT_TOT_CLICK_NUM'),
        value: 'totalConnectionNumber',
        width: 200,
      }, {
        text: `${this.$t('MSG_TXT_USR_NUM')} / ${this.$t('MSG_TXT_DEPT_NUM')}`,
        value: 'connectionNumber',
        width: 200,
        component: {
          props: ['row', 'value'],
          template:
            `<sui-button
              :title="row.connectionNumber"
              type="button"
              class="link"
              @click.stop="onDetailClick(value, row)"
            >
              {{row.connectionNumber}}
            </sui-button>`,
          methods: {
            onDetailClick(btn, selectedRawData) {
              // searchBox, popupType, selectedId
              that.popupType = 'M';
              that.selectedId = selectedRawData.menuLogObjectId;
              that.applicationName = selectedRawData.menuName;
              that.popOpenOrClose();
            },
          },
        },
      },
    ];
  },
  watch: {},
  mounted() {
    // portal list
    this.selectPortalList = [];
    http.request(this.$options.name, 'DTS_CMP_00004')
      .then(res => {
        utils.forEach(res.data, obj => {
          this.selectPortalList.push({
            key: obj.portalId,
            label: obj.portalName,
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  beforeDestroy() {
  },
  methods: {
    /** ***************************************************************************
        이벤트 영역
      ***************************************************************************** */
    onReset() {
      this.resetSearchBox();
    },
    onSearch() {
      this.ConvertArrayInObject();
      this.searchApplicationStatsList();
      this.paramSearchBox = utils.cloneDeep(this.searchBox);
      this.dsApplicationStats.setData([]);
      this.dsMenuStats.setRawData([]);
    },
    onSelectionChangedByDsApplicationStats(row) {
      const objData = row;
      if (objData.length === -1 || objData.length === 0) {
        return false;
      }
      this.searchMenuStatsList(objData.applicationId, objData.portalId);
      return true;
    },
    onGridStateClickedApplication(btn, selectedRawData) {
      // searchBox, popupType, selectedId
      this.popupType = 'A';
      this.selectedId = `${selectedRawData.applicationId}|${selectedRawData.portalId}`;
      this.applicationName = selectedRawData.applicationName;

      this.popOpenOrClose();
    },
    onGridStateClickedMenu(btn, selectedRawData) {
      // searchBox, popupType, selectedId
      this.popupType = 'M';
      this.selectedId = selectedRawData.menuLogObjectId;

      this.applicationName = selectedRawData.menuName;

      this.popOpenOrClose();
    },
    onDownloadExcelApplication() {
      const sPageId = this.$options.name;
      const objGridColumns = this.gridColumns0;
      const objGridDataset = this.dsApplicationStats;

      const sToday = utils.now('YYYYMMDDHHmmss');
      const sExcelName = `menuStatus_app_${sToday}.xlsx`;

      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName);
    },
    onDownloadExcelMenu() {
      const sPageId = this.$options.name;
      const objGridColumns = this.excelMenuGridColumns;
      const objGridDataset = this.dsMenuStats;

      const sToday = utils.now('YYYYMMDDHHmmss');
      const sExcelName = `menuStatus_menu_${sToday}.xlsx`;

      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName);
    },
    /** ***************************************************************************
        함수 영역
      ***************************************************************************** */
    popOpenOrClose() {
      this.isShownPopup = !this.isShownPopup;
    },
    setDatePickerToSearchBox() {
      if (this.rangeDate.from !== null && this.rangeDate.from !== '') {
        this.searchBox.startDTM = utils.dateformatToServer(this.rangeDate.from);
      }
      if (this.rangeDate.to !== null && this.rangeDate.to !== '') {
        this.searchBox.endDTM = `${utils.dateformatToServer(this.rangeDate.to).substring(0, 8)}235959`;
      }
    },
    resetSearchBox() {
      this.searchBox.systemUseSearchConditionCode.key = 'D';
      this.$refs.portalId.select(0);
      this.rangeDate = {
        from: utils.now('YYYY-MM-01'),
        to: utils.now('YYYY-MM-DD'),
      };
      this.rangeDateValue = [utils.now('YYYY-MM-01'), utils.now('YYYY-MM-DD')];
    },
    searchApplicationStatsList() {
      // datePicker 설정 값
      this.setDatePickerToSearchBox();

      // if (this.onClickValidate()) return false;
      if (this.validationCheck()) return false;

      // searchBox -> paramsObj변환 { key : value, key : value }
      const queryParams = utils.reduce(this.searchBox, (result, value, key) => {
        const objResult = utils.clone(result);
        if (utils.isUndefined(value) === false && value !== null) {
          objResult[key] = utils.isUndefined(value.key) ? utils.trim(value) : utils.trim(value.key);
        }
        return objResult;
      }, {});


      http.request(this.$options.name, 'DTS_CMP_00038', {
        query: queryParams,
      }).then(res => {
        this.dsApplicationStats.setData(res.data);
      }).catch(error => {
        console.log(error);
      });

      return true;
    },
    searchMenuStatsList(sApplicationId, sPortalId) {
      // 유효성 체크
      if (utils.isEmpty(sApplicationId)) {
        // utils.messageBox('warning', 'Application 을 선택 해주세요.');
        return false;
      }

      // searchBox -> paramsObj변환 { key : value, key : value }
      const queryParams = utils.reduce(this.searchBox, (result, value, key) => {
        const objResult = utils.clone(result);
        if (utils.isUndefined(value) === false && value !== null) {
          objResult[key] = utils.isUndefined(value.key) ? utils.trim(value) : utils.trim(value.key);
        }
        return objResult;
      }, {});

      // portalId
      utils.assign(queryParams, { portalId: utils.trim(sPortalId) });

      http.request(this.$options.name, 'DTS_CMP_00039', {
        path: {
          'application-id': utils.trim(sApplicationId),
        },
        query: queryParams,
      }).then(res => {
        const flatData = utils.convertTreedataToFlatdata(res.data, 'menuLogObjectId', 'parentsMenuUid');
        this.dsMenuStats.setData(flatData);
        const tempData = [];
        this.convertFormatGrid(flatData, tempData);
        this.$refs.gridMenu.setData(tempData, 'children', {dataType:'json',id :  "id", parentField: "pId"})
      }).catch(error => {
        console.log(error);
      });

      return true;
    },
    convertFormatGrid(flatData, tempData) {
      const mp = new Map();
      utils.forEach(flatData, item => {
        const objItem = item;
        objItem.id = item.__idx + 1;
      });
      for (let i = 0; i < flatData.length; i++) {
        if (flatData[i].children.length !== 0) {
          this.addParentMenu(flatData[i].children, flatData[i].id, mp);
        }
        if (mp.has(flatData[i].id)) {
          const temp = mp.get(flatData[i].id);
          flatData[i].pId = temp;
        }
      }
      for (let i = 0; i < flatData.length; i++) {
        if (!flatData[i].pId) {
          tempData.push(flatData[i]);
        }       
      }
    },
    addParentMenu(array, id, mp) {
      for (let i = 0; i < array.length; i++) {
        mp.set(array[i].id, id);
        if (array[i].children.length !== 0) {
          this.addParentMenu(array[i].children, array[i].id, mp);
        }
      }
      utils.forEach(array, item => {
        const objItem = item;
        objItem.pId = id;
      });
    },
    validationCheck() {
      if (!this.$refs.datePicker.isValid()) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_DT'), null, null);
        return true;
      }
      if (utils.isEmpty(this.$refs.datePicker.value[0]) || utils.isEmpty(this.$refs.datePicker.value[1])) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_LOOKUP_PERIOD')));
        return true;
      }
      return false;
    },
    ConvertArrayInObject() {
      this.rangeDate = {
        from: this.rangeDateValue[0],
        to: this.rangeDateValue[1],
      };
    },
  },
};
</script>
<style scoped>
</style>
