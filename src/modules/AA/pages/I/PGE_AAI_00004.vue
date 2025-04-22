<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 호출명-->
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_CALL_NM')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            style="width:100%; height:auto"
            v-model="callName"
            v-on:keyup.enter="searchBtn"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button v-permission:read="this.$options.name" @click="init">
            {{ $t('MSG_BTN_INTL') }}
          </ur-button>
          <ur-button v-permission:read="this.$options.name"
            color="violet"
            @click="searchBtn"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </ur-button>
        </div>
      </div>
      <!-- E :: 호출명-->

      <ur-data-grid
        ref="grid"
        class="custom_grid_pgeNav_None mt35"
        :headers="columns"
        :data-source="list"
        :options="opts"
        :item-size="totalCount"
        :data-set-options="{id: 'id'}"
        @grid:scroll-bottom="scrollBottom"
      >
        <template #right-info>
          <ur-button v-permission:excel="this.$options.name" @click="excelDownload">
            <ur-icon
              icon="download"
              icon-type="line"
              size="small"
              spacing
            />
            {{ $t('MSG_BTN_EXCEL_DOWNLOAD') }}
          </ur-button>
        </template>
      </ur-data-grid>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button v-permission:delete="this.$options.name" @click="remove">
            {{ $t("MSG_BTN_DEL") }}
          </ur-button>
          <ur-button v-permission:create="this.$options.name"
            color="violet" @click="insertForm"
          >
            {{ $t('MSG_BTN_FACILT_ADD') }}
          </ur-button>
        </div>
      </div>
      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import CommonUtils from "@/modules/AA/js/common-utils";
export default {
  name: 'PGE_AAI_00004', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 테이블
      opts: { // 토탈o
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        resizableColumn: true
      },

      callName: '',
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
        { text: this.$t('MSG_TXT_CALL_KIND'), value: 'callKind', minWidth: 60 },
        {
          text: this.$t('MSG_TXT_CALL_NM'),
          value: 'callName',
          minWidth: 180,
          component: {
            props: ['row', 'value'],
            template: '<div><ur-button shape="hyperlink" @click="view(row.callKind)">{{row.callName}}</ur-button></div>',
            methods: {
          
              view(callKind) {
                utils.goPage('PGE_AAI_00006', {callKind: callKind, callName: that.callName});
              },
            },
          },
        },
        { text: this.$t('MSG_TXT_CALL_DESCR'), value: 'callDescrt', minWidth: 260 },
        { text: this.$t('MSG_TXT_DTST_USE_YN'), value: 'useYn', minWidth: 60 },
        { text: this.$t('MSG_TXT_RGST_DTM'), value: 'fstRgstDtm', minWidth: 150, type:'date', customValue(value){ return utils.dateformatToClient(value);} },
        { text: this.$t('MSG_TXT_RGST_USR'), value: 'fstRgstUsrId', minWidth: 100 },
        { text: this.$t('MSG_TXT_MDFC_DTM'), value: 'fnlMdfcDtm', minWidth: 150, type:'date', customValue(value){ return utils.dateformatToClient(value);} },
        { text: this.$t('MSG_TXT_MDFC_USR'), value: 'fnlMdfcUsrId' },
    ]},

  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    this.search();
  },
  mounted() {
  },
  methods: {

    init() {
      this.callName = '';
    },

    searchBtn() {
      this.list = new this.$ur.grid.DataSet();
      this.currRows = 0;
      this.totalCount = 0;
      this.search();
    },

    search() {
      if(this.$refs.grid !== undefined) {
         this.rowsPerPage = this.$refs.grid.mx_pager.rowsPerPage;
      }

      const param = {
        callName: encodeURI(this.callName),
        currRows: this.currRows,  //현재 가지고 온 데이터 수 
        rowsPerPage: this.rowsPerPage // 가지고 올 데이터 수
      };

      if (this.$route.params.callName) {
        param.callName = this.$route.params.callName;
        this.callName = this.$route.params.callName;
        this.$route.params.callName = '';
      }
      
      http.request(this.$options.name, 'DTS_AAI_00030', {
        query: param,
      }).then(res => {
        console.log(res.data.list)
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

    insertForm() {
       utils.goPage('PGE_AAI_00005', {callName: this.callName});
    },

    excelDownload() {

      const param = {
        callName: encodeURI(this.callName),
        currRows: this.currRows,  //현재 가지고 온 데이터 수 
        rowsPerPage: this.rowsPerPage, // 가지고 올 데이터 수
        excelYn: 'Y'
      };

      http.request(this.$options.name, 'DTS_AAI_00030', {
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

    remove() {
      if(this.list.getSelected().length < 1){
        utils.messageBox("alert", this.$t('MSG_ALT_DEL_NO_DATA'));
        return;
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
        http.request(this.$options.name, 'DTS_AAI_00034', {
          data: this.list.getSelected(),
        }).then(res => {
          if (res.data.count > 0) {
            utils.messageBox("alert", this.$t('MSG_ALT_DELETED'));
            this.searchBtn();
          }
        }).catch(error => {
          console.log(error);
        });
      });
    },
  },
}
</script>
<style scoped>
</style>
