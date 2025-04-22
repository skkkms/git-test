<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
         :label="$t('MSG_TXT_INQ_DT')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-date-picker
            v-model="fstRgstDtm"
            input-type="YYYY-MM-DD"
            :today-label="$t('MSG_BTN_TODAY')"
            :confirm-label="$t('MSG_TXT_SEL')"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_INQ_TIME')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="viewTime"
            :items="viewTimeCodes.COD_IA_VIEW_TIME"
            no-select="no-select"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_CALL_KIND')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="callKind"
            :items="excapiCallNm"
             no-select="no-select"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_RSULT')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="result"
            :items="resultCodes.COD_IA_EXAPI_RESULT"
             no-select="no-select"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button v-permission:read="$options.name" @click="init">
            {{$t('MSG_BTN_INTL')}}
          </ur-button>
          <ur-button v-permission:read="$options.name"
            color="violet"
            @click="searchBtn"
          >
             {{$t('MSG_BTN_SEARCH')}}
          </ur-button>
        </div>
      </div>
      <ur-data-grid
        ref="grid"
        class="custom_grid_pgeNav_None mt35"
        :headers="columns"
        :data-source="list"
        :options="opts"
        :data-set-options="{id: 'id'}"
      >
        <template #right-info>
          <ur-button v-permission:excel="$options.name" @click="excelDownload">
            <ur-icon
              icon="download"
              icon-type="line"
            />
            {{$t('MSG_TXT_EXCEL_DOWNLOAD')}}
          </ur-button>
        </template>
        <!--
        <template #empty-view>
          <div class="custom_grid_type1">
            <div class="empty_box">
              {{$t('MSG_TXT_EMPTY_DATA')}}
            </div>
          </div>
        </template>
        -->
      </ur-data-grid>
      <!--
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button>
            삭제
          </ur-button>
          <ur-button
            color="violet"
          >
            신규등록
          </ur-button>
        </div>
      </div>
      -->
      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import CommonUtils from "@/modules/AA/js/common-utils";
export default {
  name: 'PGE_AAI_00008', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 드롭다운
      viewTime: '',
      callKind: '',
      result: '',

      viewTimeCodeList: ['COD_IA_VIEW_TIME'],
      viewTimeCodes: { COD_IA_VIEW_TIME: []},
      excapiCallNm: [],
      resultCodeList: ['COD_IA_EXAPI_RESULT'],
      resultCodes: { COD_IA_EXAPI_RESULT: []},

      opts: { // 토탈o
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
        selectCheckOnly: true,
        resizableColumn: true
      },

      fstRgstDtm : utils.now('YYYY-MM-DD'),
      list: new this.$ur.grid.DataSet(),
      dsExcel: new this.$ur.grid.DataSet(),
      currRows : 0,
      totalCount: 0,
      rowsPerPage: 10,
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
     columns() {
      let that = this;
      return[
        { text: this.$t('MSG_TXT_CALL_DT'), value: 'callDtm', minWidth:250,
        customValue(value) {
        value =  utils.dateformatToClient(value) +'.'+ value.substring(14, 17);
        return value;
      },

        },
        { text: this.$t('MSG_TXT_CALL_KIND'), value: 'callKindNm' },
        { text: this.$t('MSG_TXT_CALL_IP'), value: 'reqIp' },
        { text: this.$t('MSG_TXT_CALL_URL'), value: 'reqUrl' },
        { text: this.$t('MSG_TXT_ARG'), value: 'reqArg' },
        { text: this.$t('MSG_TXT_RESULT_MSG'), value: 'result' },
        { text: this.$t('MSG_TXT_RESULT_CODE'), value: 'status' },
        { text: this.$t('MSG_TXT_ERROR_MSG'), value: 'errorMsg' },
        { text: this.$t('MSG_TXT_END_DT'), value: 'endDtm',
          customValue(value) {
            return utils.dateformatToClient(value);
          },
        }
      ]},

  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    http.mergeCodeList(this.$options.name, this.viewTimeCodeList, this.viewTimeCodes);
    http.mergeCodeList(this.$options.name, this.resultCodeList, this.resultCodes);
    this.search();
  },
  mounted() {
      const param = {
        fstRgstDtm: utils.now('YYYY-MM-DD')
      };

      http.request(this.$options.name, 'DTS_AAI_00036', {
        query: param,
      }).then(res => {
        console.dir(res.data.exapiNmList);        
        for (let i=0; i<res.data.exapiNmList.length; i++) {          
          this.excapiCallNm.push({value: res.data.exapiNmList[i].callKind, text: res.data.exapiNmList[i].callName});
        }      
      }).catch(error => {
        console.log(error);
      });
  },
  methods: {
     init() {
      this.fstRgstDtm = utils.now('YYYY-MM-DD');
      this.viewTime = '';
      this.callKind = '';
      this.result = '';
    },

    searchBtn() {
      this.list = new this.$ur.grid.DataSet();
      this.currRows = 0;
      this.totalCount = 0;
      this.search();
    },

    // 검색
    search() {      
    
      if(this.$refs.grid !== undefined) {
         this.rowsPerPage = this.$refs.grid.mx_pager.rowsPerPage;
      }

      const param = {
        fstRgstDtm: this.fstRgstDtm,
        viewTime: this.viewTime,
        callKind: this.callKind,
        result: this.result,
        currRows: this.currRows,  //현재 가지고 온 데이터 수 
        rowsPerPage: this.rowsPerPage // 가지고 올 데이터 수
      };

      http.request(this.$options.name, 'DTS_AAI_00036', {
        query: param,
      }).then(res => {
        this.list.appendData(res.data.list);
        this.currRows = this.list.totalSize;
        this.totalCount = res.data.totalCount;     
      }).catch(error => {
        console.log(error);
      });
    },

    scrollBottom() {      
      if(this.currRows != this.totalCount && this.currRows < this.totalCount ){
        this.search();
      }
    },

    excelDownload() {

      const param = {
        fstRgstDtm: this.fstRgstDtm,
        viewTime: this.viewTime,
        currRows: this.currRows,  //현재 가지고 온 데이터 수 
        rowsPerPage: this.rowsPerPage, // 가지고 올 데이터 수
        excelYn: 'Y'
      };

      http.request(this.$options.name, 'DTS_AAI_00036', {
        query: param,
      }).then(res => {
        const list = CommonUtils.mapCode(res.data.list, this.columns)

        this.dsExcel.setData(list) // 데이터 셋에 데이터를 넣는 함수

        const metaObj = {
          headerFontSize: 11,
          headerFontColor: 1,
          headerForegroundColor: 22,
          defaultFontSize: 10,
        }

        const sPageId = this.$options.name;
        const objGridColumns = this.columns;
        const objGridDataset = this.dsExcel;

        const sToday = utils.now('YYYYMMDDHHmmss')
        const meta = this.$store.getters.getPageMeta(this.$options.name);
        const pageTitle = utils.startsWith(meta.pageInfo.pageTitleMessageResourceId, 'MSG_', 0) ? this.$t(meta.pageInfo.pageTitleMessageResourceId) : meta.pageInfo.pageTitleMessageResourceId;
        const sExcelName = `${pageTitle}_${sToday}.xlsx`;

        utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, metaObj)
      }).catch(error => {
        console.log(error)
      })
    },
  },
}
</script>
<style scoped>
</style>
