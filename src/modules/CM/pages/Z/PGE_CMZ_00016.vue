<template>
  <sui-page>
    <sui-page-header
      :pageId="this.$options.name"
    />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TZONE_DIV')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-3">
            <sui-code-select
              ref="selectTZoneDiv"
              :pageId="this.$options.name"
              :selected="frame0.selectData.COD_TZONE_DIV"
              codeId="COD_TZONE_DIV"
              :customOpitonList="codes.allOption"
              :initialSelectedIndex="0"
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
              ref="searchCondSelect"
              :pageId="this.$options.name"
              :selected="frame0.selectData.COD_TZONE_SRCH_COND"
              codeId="COD_TZONE_SRCH_COND"
              :initialSelectedIndex="0"
              class="width50"
            />
            <div class="comp_spacing" />
            <sui-text-field
              ref="codTzoneSearchText"
              v-model="frame0.codTzoneSearchText"
              maxlength="100"
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
            v-permission:read="'PGE_CMZ_00016'"
            type="button"
            class="comm_btn_Scr"
            @click="onSearchClick"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </sui-button>
        <!--<sui-button type="button" class="comm_btn_scr" @click="onTestClick">Test</sui-button>-->
        </div>
      </div>
      <div class="mrB30" />
      <!-- <sui-grid
        ref="listGrid"
        :dataset="'dsTZone'"
        :multiselect="false"
        :columns="gridColumns"
        :enabletooltips="true"
        :showDisplayCountControl="false"
      /> -->
      <sui-s-grid
        ref="listGrid"
        :data-source="dsTZone"
        :headers="gridColumns"
        :enabletooltips="true"
        :options="options"
        :showRowsPerPageControl="false"
        @grid:selected="onSelectGrid"
      />
      <div class="mrB30" />
      <div class="comm_title_wrap">
        <h4 class="comm_tit02">
          {{ $t("MSG_TXT_TZONE_DETAIL") }}
        </h4>
      </div>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TZONE_ID')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model.trim="tzoneId"
              maxlength="100"
              :disabled="true"
            />
            <!-- @keyup.enter="onClickDuplicationCheck"
            <sui-button
              type="button"
              class="btn_innerTbl_border"
              :disabled="tzonIdCheckFlag"
              @click="onClickDuplicationCheck"
            >
              {{ $t("MSG_BTN_DPCT_CHCK") }}
            </sui-button> -->
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TZONE_DIV')"
              :vertical="false"
              :required="true"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="selectDetailTZoneDiv"
              :pageId="this.$options.name"
              :selected="selectedCodeValue.COD_TZONE_DIV"
              :customOpitonList="codes.selOption"
              :initialSelectedIndex="0"
              codeId="COD_TZONE_DIV"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TZONE_VAL')"
              :vertical="false"
              :required="true"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="tZoneJoda"
              :pageId="this.$options.name"
              :selected="selectedCodeValue.COD_TZONE_JODA"
              :customOpitonList="codes.selOption"
              :initialSelectedIndex="0"
              codeId="COD_TZONE_JODA"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TZONE_NAME')"
              :vertical="false"
              :required="true"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model.trim="tzoneNm"
              maxlength="75"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_USE_YN')"
              :vertical="false"
              :required="false"
            />
          </div>
          <div class="col-xs-5">
            <!-- <sui-yn-select
              ref="comboUseYn"
              :selected="selectedCodeValue.COD_DTSVC_USE_YN"
              :customOpitonList="codes.selOption"
              :initialSelectedIndex="0"
            /> -->
            <sui-radio
              v-model="frame0.selectData.useYn"
              value="Y"
            >
              Yes
            </sui-radio>
            <sui-radio
              v-model="frame0.selectData.useYn"
              value="N"
            >
              No
            </sui-radio>
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TZONE_ENG_NAME')"
              :vertical="false"
              :required="true"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model.trim="tzoneEngNm"
              maxlength="75"
            />
          </div>
        </div>
      </div>
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:create="'PGE_CMZ_00016'"
          type="button"
          class="comm_btn_border"
          @click="onNewClick"
        >
          {{ $t("MSG_BTN_NEW") }}
        </sui-button>
        <sui-button
          v-permission:delete="'PGE_CMZ_00016'"
          type="button"
          class="comm_btn_border"
          @click="onDeleteClick"
        >
          {{ $t("MSG_BTN_DEL") }}
        </sui-button>
        <sui-button
          v-permission:update="'PGE_CMZ_00016'"
          type="button"
          class="comm_btn_solid"
          @click="onSaveClick"
        >
          {{ $t("MSG_BTN_SAVE") }}
        </sui-button>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage'; // eslint-disable-line import/no-unresolved
import { urDataSet } from 'uidev-component/index.js';
// import - libraries (node modules)
// import - local files (js, vue, ...)
export default {
  name: 'PGE_CMZ_00016', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  data() {
    return {
      pageName: 'PGE_CMZ_00016',
      codes: CommonConstants.selectOptions(),
      // codes: {
      //   allOption: [{ key: 'ALL', label: this.$t('MSG_TXT_ALL') }],
      //   selOption: [{ key: ' ', label: this.$t('MSG_TXT_SEL') }],
      // },
      // panel이 있다면 panel 단위로 구분
      frame0: {
        selectData: {
          COD_TZONE_SRCH_COND: {
            label: '',
            key: '',
          },
          COD_TZONE_DIV: {
            label: this.$t('MSG_TXT_ALL'),
            key: 'ALL',
          },
          useYn: 'Y',
        },
        codTzoneSearchText: '',
        codTzoneSearchOldText: '',
      },
      selectedCodeValue: {
        COD_TZONE_DIV: {
          label: '',
          key: '',
        },
        COD_TZONE_JODA: {
          label: '',
          key: '',
        },
        // COD_DTSVC_USE_YN: {
        //   label: '',
        //   key: '',
        // },
      },
      codTzoneSearchOldText: '',
      localdata0: [],
      // gridColumns: [
      //   // {
      //   //   text: this.$t('MSG_TXT_SEL'),
      //   //   datafield: 'chk',
      //   //   columntype: 'checkbox',
      //   //   width: 40,
      //   // },
      //   {
      //     text: this.$t('MSG_TXT_TZONE_DIV'),
      //     datafield: 'timezoneDivName',
      //     width: 100,
      //   }, {
      //     text: this.$t('MSG_TXT_TZONE_ID'),
      //     datafield: 'timezoneId',
      //     width: 100,
      //   }, {
      //     text: this.$t('MSG_TXT_TZONE_VAL'),
      //     datafield: 'timezoneValue',
      //   }, {
      //     text: this.$t('MSG_TXT_TZONE_NAME'),
      //     datafield: 'timezoneName',
      //   }, {
      //     text: this.$t('MSG_TXT_TZONE_ENG_NAME'),
      //     datafield: 'timezoneEnName',
      //   }, {
      //     text: this.$t('MSG_TXT_TZONE_CODE'),
      //     datafield: 'timezoneDivCode',
      //     hidden: true,
      //   }, {
      //     text: this.$t('MSG_TXT_USE_YN'),
      //     datafield: 'timezoneUseYn',
      //     hidden: true,
      //   },
      // ],
      dsTZone: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      tzoneId: '',
      tzoneVal: '',
      tzoneDiv: '',
      tzoneNm: '',
      tzoneEngNm: '',
      changedTzoneId: '',
      // tzonIdCheckFlag: false,
      validMessage: '',
      savedId: '',
    };
  },
  created() {
    this.localdata0 =[];
    this.gridColumns = [
      {
          text: this.$t('MSG_TXT_TZONE_DIV'),
          value: 'timezoneDivName',
          width: 100,
        }, {
          text: this.$t('MSG_TXT_TZONE_ID'),
          value: 'timezoneId',
          width: 100,
        }, {
          text: this.$t('MSG_TXT_TZONE_VAL'),
          value: 'timezoneValue',
        }, {
          text: this.$t('MSG_TXT_TZONE_NAME'),
          value: 'timezoneName',
        }, {
          text: this.$t('MSG_TXT_TZONE_ENG_NAME'),
          value: 'timezoneEnName',
        }, {
          text: this.$t('MSG_TXT_TZONE_CODE'),
          value: 'timezoneDivCode',
          hide: true,
        }, {
          text: this.$t('MSG_TXT_USE_YN'),
          value: 'timezoneUseYn',
          hide: true,
        },
    ];
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  // datasets: [{
  //   id: 'dsTZone',
  //   type: 'local',
  //   data: 'localdata0',
  //   datafields: [
  //     { name: 'timezoneDivName', type: 'string', map: 'timezoneDivName' },
  //     { name: 'timezoneId', type: 'string', map: 'timezoneId' },
  //     { name: 'timezoneValue', type: 'string', map: 'timezoneValue' },
  //     { name: 'timezoneName', type: 'string', map: 'timezoneName' },
  //     { name: 'timezoneEnName', type: 'string', map: 'timezoneEnName' },
  //     { name: 'timezoneDivCode', type: 'string', map: 'timezoneDivCode' },
  //     { name: 'timezoneUseYn', type: 'string', map: 'timezoneUseYn' },
  //   ],
  // }],
  mounted() {
    // this.loadData();
    // this.$nextTick(() => {
    // this.parentDataset = util.findDataset('datasetMain', this);
    // const dataset = util.findDataset('datasetMain');
    //this.dsTZone.$on(this.dsTZone.EVENTS.SELECTION_CHANGED, this.onSelectGrid);
    // });
    // const myDataset = this.dsTZone;
    // console.log(myDataset);
  },
  beforeDestroy() {
    // 이벤트 핸들러 및 사용한 서드 파티 라이브러리 자원 반환
    // if (this.dsTZone) {
    //   this.dsTZone.$off(this.dsTZone.EVENTS.SELECTION_CHANGED, this.onSelectGrid);
    // }
  },
  methods: {
    // 내부 함수 기술
    makeSnapshot() {
      let timeZoneParams = {};
      timeZoneParams = {
        timezoneId: this.tzoneId,
        timezoneDivCode: utils.trim(this.selectedCodeValue.COD_TZONE_DIV.key),
        timezoneValue: utils.trim(this.selectedCodeValue.COD_TZONE_JODA.key),
        timezoneName: this.tzoneNm,
        timezoneEnName: this.tzoneEngNm,
        // timezoneUseYn: utils.trim(this.selectedCodeValue.COD_DTSVC_USE_YN.key),
        timezoneUseYn: this.frame0.selectData.useYn,
      };
      return timeZoneParams;
    },
    onKeyUpInput() {
      const searchFieldNewText = this.frame0.codTzoneSearchText;

//    if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          utils.messageBox('confirm', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
            this.frame0.codTzoneSearchText = this.frame0.codTzoneSearchOldText;
            this.$refs.codTzoneSearchText.setFocus();
          });
        } else {
          this.frame0.codTzoneSearchOldText = searchFieldNewText;
        }
//    }
    },
    onResetClick() {
      this.$refs.selectTZoneDiv.reset();
      this.$refs.searchCondSelect.reset();

      this.frame0.codTzoneSearchText = '';
      // this.tzoneId = '';
      // this.tzoneVal = '';
      // this.tzoneNm = '';
      // this.tzoneEngNm = '';
      // this.$refs.selectDetailTZoneDiv.reset();
      // this.$refs.tZoneJoda.reset();
      // this.$refs.comboUseYn.reset();
      // this.frame0.selectData.useYn = '';
    },
    onSearchClick() {
      this.tzoneId = '';
      this.tzoneVal = '';
      this.tzoneNm = '';
      this.tzoneEngNm = '';
      this.$refs.selectDetailTZoneDiv.reset();
      this.$refs.tZoneJoda.reset();
      // this.$refs.comboUseYn.reset();
      this.frame0.selectData.useYn = 'Y';

      const codeValue = this.frame0.selectData;
      const queryParams = {
        searchCond: utils.trim(codeValue.COD_TZONE_SRCH_COND.key) || '',
        divCode: utils.trim(codeValue.COD_TZONE_DIV.key) || '',
        tzoneSearchText: utils.trim(this.frame0.codTzoneSearchText) || '',
      };

      http.request(this.$options.name, 'DTS_CMZ_00049', {
        query: queryParams,
      }).then(res => {
        this.localdata0 = res.data;
        this.dsTZone.setData(this.localdata0);
        if(!utils.isEmpty(this.savedId)){
          this.$refs.listGrid.setSelect({timezoneId: this.savedId});
          this.savedId = '';
        }
      }).catch(error => {
        console.log(error);
      });

      // tzonIdCheckFlag: true;
    },
    
    onSelectGrid() {
      if (!this.dsTZone.getSelected().length) {
        return;
      }
      // console.log( this.dsTZone.getSelected());
      const selectedIndexes = this.dsTZone.getSelected();
   
      this.tzoneId = this.dsTZone.data[selectedIndexes[0].__idx].timezoneId;
      // this.tzoneVal = this.dsTZone.data[selectedIndexes].timezoneValue;
      this.tzoneNm = this.dsTZone.data[selectedIndexes[0].__idx].timezoneName;
      this.tzoneEngNm = this.dsTZone.data[selectedIndexes[0].__idx].timezoneEnName;
      this.selectedCodeValue.COD_TZONE_DIV.key = this.dsTZone.data[selectedIndexes[0].__idx].timezoneDivCode;
      this.selectedCodeValue.COD_TZONE_JODA.key = this.dsTZone.data[selectedIndexes[0].__idx].timezoneValue;
      // this.selectedCodeValue.COD_DTSVC_USE_YN.key = this.dsTZone.data[selectedIndexes].timezoneUseYn;
      this.frame0.selectData.useYn = this.dsTZone.data[selectedIndexes[0].__idx].timezoneUseYn;
      // this.$loading.hide();

      this.saveSnapshot(this.makeSnapshot());
    },
    onNewClick() {
      // this.frame0.codTzoneSearchText = '';
      this.tzoneId = '';
      this.tzoneVal = '';
      this.tzoneNm = '';
      this.tzoneEngNm = '';
      this.$refs.selectDetailTZoneDiv.reset();
      this.$refs.tZoneJoda.reset();
      // this.$refs.comboUseYn.reset();
      this.frame0.selectData.useYn = 'Y';

      this.saveSnapshot(this.makeSnapshot());
      this.$refs.listGrid.resetSelect();
    },
    onDeleteClick() {
      if (!this.tzoneId) {
        //utils.messageBox('warning', this.$t('MSG_ALT_DEL_DATA_SELT'), null);
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else {
        utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), null, () => {
          http.request(this.$options.name, 'DTS_CMZ_00053', {
            path: {
              'timezone-id': this.tzoneId,
            },
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_DEL_DATA'), null, this.onSearchClick);
            this.onGridClear();
            this.onSearchClick();
          }).catch(error => {
            console.log(error);
          });
        });
      }
    },
    validation(data) {
      let validFlag = true;
      utils.forEach(data, (value, key) => {
        if (!(utils.isEqual(key, 'timezoneId'))) {
          if (utils.isEmpty(value)) {
            validFlag = false;
            switch (key) {
              // case 'timezoneId':
              //   this.validMessage = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_TZONE_ID'));
              //   return false;
              case 'timezoneDivCode':
                this.validMessage = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_TZONE_DIV'));
                return false;
              case 'timezoneValue':
                this.validMessage = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_TZONE_VAL'));
                return false;
              case 'timezoneName':
                this.validMessage = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_TZONE_NAME'));
                return false;
              case 'timezoneEnName':
                this.validMessage = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_TZONE_ENG_NAME'));
                return false;
              case 'timezoneUseYn':
                this.validMessage = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_USE_YN'));
                return false;
              default:
                this.validMessage = '';
            }
          }
        }
        return null;
      });
      return validFlag;
    },
    onSaveClick() {
      const dataParams = {
        timezoneId: this.tzoneId,
        timezoneDivCode: utils.trim(this.selectedCodeValue.COD_TZONE_DIV.key),
        timezoneValue: utils.trim(this.selectedCodeValue.COD_TZONE_JODA.key),
        timezoneName: this.tzoneNm,
        timezoneEnName: this.tzoneEngNm,
        // timezoneUseYn: utils.trim(this.selectedCodeValue.COD_DTSVC_USE_YN.key),
        timezoneUseYn: this.frame0.selectData.useYn,
      };

      if (this.validation(dataParams)) {
        this.onSave(dataParams);
      } else {
        utils.messageBox('warning', this.validMessage, null, this.positiveHandler);
      }
    },
    onSave(dataParams) {
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        if (!dataParams.timezoneId) {
          http.request(this.$options.name, 'DTS_CMZ_00051', {
            data: dataParams,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, this.research);
          }).catch(error => {
            console.log(error);
          });
        } else {
          http.request(this.$options.name, 'DTS_CMZ_00052', {
            path: {
              'timezone-id': dataParams.timezoneId,
            },
            data: dataParams,
          }).then(() => {
            this.savedId = dataParams.timezoneId;
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, this.research);
          }).catch(error => {
            console.log(error);
          });
        }
      });
    },
    research() {
      this.dsTZone.setSelect([]);
      this.onNewClick();
      this.onSearchClick();
    },
    onGridClear() {
      //this.$refs.listGrid.clearSelection();
      this.dsTZone.removeSelected();
      // this.tzonIdCheckFlag = false;
      this.tzoneId = '';
      this.tzoneVal = '';
      this.tzoneNm = '';
      this.tzoneEngNm = '';
      this.$refs.selectDetailTZoneDiv.reset();
      // this.$refs.comboUseYn.reset();
      this.frame0.selectData.useYn = 'Y';
    },
  },
};
</script>
<style scoped>
</style>
