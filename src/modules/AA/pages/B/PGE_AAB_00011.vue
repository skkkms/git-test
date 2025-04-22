<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-tab-box
        default-idx="1"
        class="mt35"
        @tab-change="tabChange"
      >
        <ur-tab-content
          idx="1"
          :label="$t('MSG_TXT_EB')"
          ref="urTabContent"
          
        >
          <ur-form-box toggleable>
            <ur-form-item
              :label="$t('MSG_TXT_REVIEW_DT')"
              :label-align="'right'"
              style="width:100%; height:auto;"
              class="flex-wrap"
            >
              <ur-range-picker
                v-model="fstRgstDtm"
                input-type="YYYY-MM-DD"
                init="day-30"
                :confirm-label="$t('MSG_TXT_SEL')"
                
              />
            </ur-form-item>
            <ur-form-item
              :label="$t('MSG_TXT_FACILT_CATEGORY')"
              :label-align="'right'"
              style="width:50%; height:auto;"
              class="flex_wrap"
            >
              <ur-dropdown
                v-model="faciltKindCd"
                :items="faciltCateElCodes.COD_IA_EL_FACILT_CATE_KIND"
                no-select="no-select"
                :msg-no-select="$t('MSG_TXT_ALL')"
              />
            </ur-form-item>
            <ur-form-item
              :label="$t('MSG_TXT_FACILT_NM')"
              :label-align="'right'"
              style="width:50%; height:auto;"
              class="flex_wrap"
            >
              <ur-text-field
                v-model="faciltNm"
                style="width:100%; height:auto;"
                @keyup.enter="searchBtn"
                maxlength="150"
              />
            </ur-form-item>
          </ur-form-box>
          <div class="btn_wrap mt10">
            <div class="right_box">
              <ur-button v-permission:read="this.$options.name" @click="init">
                {{$t('MSG_BTN_INTL')}}
              </ur-button>
              <ur-button v-permission:read="this.$options.name" color="violet" @click="searchBtn()">
                {{$t('MSG_BTN_SEARCH')}}
              </ur-button>
            </div>
          </div>
          <template>
            <ur-data-grid
              ref="grid"
              :headers="columnsEl"
              :data-source="listEl"
              :data-set-options="{id: 'id'}"
              :options="opts"
              class="custom_grid_pgeNav_None mt35"
              :item-size="totalCountEl"
              @grid:scroll-bottom="scrollBottom"
            />
          </template>
        </ur-tab-content>
        <ur-tab-content
          idx="2"
          :label="$t('MSG_TXT_CB')"
          ref="urTabContent2"
        >

          <ur-form-box toggleable>
            <ur-form-item
              :label="$t('MSG_TXT_REVIEW_DT')"
              :label-align="'right'"
              style="width:100%; height:auto;"
              class="flex-wrap"
            >
              <ur-range-picker
                v-model="fstRgstDtmCb"
                input-type="YYYY-MM-DD"
                init="day-30"
                :confirm-label="$t('MSG_TXT_SEL')"                
              />
            </ur-form-item>
            <ur-form-item
              :label="$t('MSG_TXT_FACILT_CATEGORY')"
              :label-align="'right'"
              style="width:50%; height:auto;"
              class="flex_wrap"
            >
              <ur-dropdown
                v-model="faciltKindCdCb"
                :items="faciltCateCbCodes.COD_IA_CB_FACILT_CATE_KIND"
                no-select="no-select"
                :msg-no-select="$t('MSG_TXT_ALL')"
              />
            </ur-form-item>
            <ur-form-item
              :label="$t('MSG_TXT_FACILT_NM')"
              :label-align="'right'"
              style="width:50%; height:auto;"
              class="flex_wrap"
            >
              <ur-text-field
                v-model="faciltNmCb"
                style="width:100%; height:auto;"
                @keyup.enter="searchBtn"
                maxlength="150"
              />
            </ur-form-item>
          </ur-form-box>
          <div class="btn_wrap mt10">
            <div class="right_box">
              <ur-button v-permission:read="this.$options.name" @click="initCb" >
                {{$t('MSG_BTN_INTL')}}
              </ur-button>
              <ur-button v-permission:read="this.$options.name" color="violet" @click="searchBtn()">
                {{$t('MSG_BTN_SEARCH')}}
              </ur-button>
            </div>
          </div>
          <template>
            <ur-data-grid
              ref="grid2"
              :headers="columnsCb"
              :data-source="listCb"
              :data-set-options="{id: 'id'}"
              :options="opts"
              class="custom_grid_pgeNav_None mt35"
              :item-size="totalCountCb"
              @grid:scroll-bottom="scrollBottom"
            />
          </template>
        </ur-tab-content>
      </ur-tab-box>
      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAB_00011', // eslint-disable-line vue/name-property-casing
  components: {

  },
  data() {
    return {

      // 시설 카테고리 드랍다운
      
      parkKindCd: '',
      fstRgstDtm: [],
      faciltKindCd: '',
      faciltNm: '',

      fstRgstDtmCb: [],
      faciltKindCdCb: '',
      faciltNmCb: '',

      currRows : 0,
      totalCountEl: 0,
      rowsPerPage: 10,
      totalCountCb: 0,
      pageLoadCount: 0,
      tabIdx: '',

      listEl: new this.$ur.grid.DataSet(),
      listCb: new this.$ur.grid.DataSet(),

      dataSet: new this.$ur.grid.DataSet(),
      opts: {
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
        selectCheckOnly: true,
        resizableColumn: true
      },

      faciltCateCbCodeList: ['COD_IA_CB_FACILT_CATE_KIND'],
      faciltCateCbCodes: { COD_IA_CB_FACILT_CATE_KIND: []},
      faciltCateElCodeList: ['COD_IA_EL_FACILT_CATE_KIND'],
      faciltCateElCodes: { COD_IA_EL_FACILT_CATE_KIND: []},
     
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

     columnsEl() {
      let that = this;
      return[
        { text: this.$t('MSG_TXT_REVIEW_DAY'), value: 'fstRgstDtm', minWdth: 200, type:'date', customValue(value){ return utils.dateformatToClient(value);} },
        { text: this.$t('MSG_TXT_FACILT_CATEGORY'), value: 'faciltCateKindNm', minWdth: 300 },
        { text: this.$t('MSG_TXT_FACILT_NM'), value: 'faciltName', minWdth: 300 },
        { text: this.$t('MSG_TXT_MSG_TXT_REVIEW_CONT'), value: 'reviwNm', minWdth: 400 },
        { text: this.$t('MSG_TXT_REVIEW_CNT'), value: 'reviwCnt' },
      ]},

      columnsCb() {
      let that = this;
      return[
         { text: this.$t('MSG_TXT_REVIEW_DAY'), value: 'fstRgstDtm', minWdth: 200, type:'date', customValue(value){ return utils.dateformatToClient(value);} },
        { text: this.$t('MSG_TXT_FACILT_CATEGORY'), value: 'faciltCateKindNm', minWdth: 300 },
        { text: this.$t('MSG_TXT_FACILT_NM'), value: 'faciltName', minWdth: 300 },
        { text: this.$t('MSG_TXT_MSG_TXT_REVIEW_CONT'), value: 'reviwNm', minWdth: 400 },
        { text: this.$t('MSG_TXT_REVIEW_CNT'), value: 'reviwCnt' },
      ]},

  },

  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
    
  },
  created() {
    http.mergeCodeList(this.$options.name, this.faciltCateCbCodeList, this.faciltCateCbCodes);
    http.mergeCodeList(this.$options.name, this.faciltCateElCodeList, this.faciltCateElCodes);

  },
  mounted() { 
    this.tabIdx = this.$refs.urTabContent.currIdx;
    this.search(); 
  },
  methods: {
    init() {
      this.fstRgstDtm = [moment(utils.now('YYYY-MM-DD')).add(-30, 'days').format('YYYY-MM-DD'), utils.now('YYYY-MM-DD')],
      this.faciltKindCd = '';
      this.faciltNm = '';
    },

    initCb() {
      this.fstRgstDtmCb = [moment(utils.now('YYYY-MM-DD')).add(-30, 'days').format('YYYY-MM-DD'), utils.now('YYYY-MM-DD')],
      this.faciltKindCdCb = '';
      this.faciltNmCb = '';
    },

    searchBtn() {

      
      if (this.fstRgstDtm[0] === '') {
        utils.messageBox("alert", this.$t('MSG_ALT_REVIEW_DATE_INPUT'));
        return false;
      }

      if (this.fstRgstDtm[1] === '') {
        utils.messageBox("alert", this.$t('MSG_ALT_REVIEW_DATE_INPUT'));
        return false;
      }

      if (this.fstRgstDtmCb[0] === '') {
        utils.messageBox("alert", this.$t('MSG_ALT_REVIEW_DATE_INPUT'));
        return false;
      }

      if (this.fstRgstDtmCb[1] === '') {
        utils.messageBox("alert", this.$t('MSG_ALT_REVIEW_DATE_INPUT'));
        return false;
      }

      if (this.$refs.urTabContent.currIdx === '1') {
        this.listEl = new this.$ur.grid.DataSet();
      } else if (this.$refs.urTabContent2.currIdx === '2') {
        this.listCb = new this.$ur.grid.DataSet();
      }
      
      this.currRowsEl = 0;
      this.currRowsCb = 0;
      this.totalCount = 0;
      this.search();
    },

    // 검색
    search(SKIP_TOTAL_COUNT_YN) {
      /*
      if (this.$refs.urTabContent.currIdx === '1') {
      
        if(this.$refs.grid !== undefined) {
          this.rowsPerPage = this.$refs.grid.mx_pager.rowsPerPage;
        }
      } else {
        if(this.$refs.grid2 !== undefined) {
          this.rowsPerPage = this.$refs.grid2.mx_pager.rowsPerPage;
        }
      }
      */

      const param = {
        searchStartDate: this.fstRgstDtm[0].replaceAll('-', ''),
        searchEndDate: this.fstRgstDtm[1].replaceAll('-', ''),
        parkKindCd: '01',
        faciltCateKindCd: this.faciltKindCd,
        faciltNm: this.faciltNm,
        currRows: this.currRowsEl, // 현재 가지고 온 데이터 수
        rowsPerPage: this.$refs.grid.mx_pager.rowsPerPage?this.$refs.grid.mx_pager.rowsPerPage:10, // 가지고 올 데이터 수
        skipTotalCountYn: SKIP_TOTAL_COUNT_YN === 'Y' ? 'Y' : 'N',
      };

      const paramCb = {
        searchStartDate: this.fstRgstDtmCb[0].replaceAll('-', ''),
        searchEndDate: this.fstRgstDtmCb[1].replaceAll('-', ''),
        parkKindCd: '02',
        faciltCateKindCd: this.faciltKindCdCb,
        faciltNm: this.faciltNmCb,
        currRows: this.currRowsCb, // 현재 가지고 온 데이터 수
        rowsPerPage: this.$refs.grid2.mx_pager.rowsPerPage?this.$refs.grid2.mx_pager.rowsPerPage:10, // 가지고 올 데이터 수
        skipTotalCountYn: SKIP_TOTAL_COUNT_YN === 'Y' ? 'Y' : 'N',
      };

      if (this.$refs.urTabContent.currIdx === '1') {
        http.request('PGE_AAB_00011', 'DTS_AAB_00038', {
          query: param,
        }).then(res => {
          this.listEl.appendData(res.data.list);
          this.currRowsEl = this.listEl.totalSize;
          if (SKIP_TOTAL_COUNT_YN !== 'Y') {
            this.totalCountEl = res.data.totalCount;
          }
        }).catch(error => {
          console.log(error);
        });
      }
      
      if (this.$refs.urTabContent2.currIdx === '2') {
        http.request('PGE_AAB_00011', 'DTS_AAB_00038', {
          query: paramCb,
        }).then(res => { 
          this.listCb.appendData(res.data.list);
          this.currRowsCb = this.listCb.totalSize;
          if (SKIP_TOTAL_COUNT_YN !== 'Y') {
            this.totalCountCb = res.data.totalCount;
          }
        }).catch(error => {
          console.log(error);
        });
      }

      //this.pageLoadCount++;
    },

    scrollBottom() {
      if (this.$refs.urTabContent.currIdx === '1') {
        if (this.currRowsEl !== this.totalCountEl && this.currRowsEl < this.totalCountEl) {
          const SKIP_TOTAL_COUNT_YN = 'Y'
          this.search(SKIP_TOTAL_COUNT_YN);
        }
      } else {
        if (this.currRowsCb !== this.totalCountCb && this.currRowsCb < this.totalCountCb) {
          const SKIP_TOTAL_COUNT_YN = 'Y'
          this.search(SKIP_TOTAL_COUNT_YN);
        }
      }
    },

    tabChange() {
      if (this.$refs.urTabContent.currIdx === '1') {
        this.searchBtn();
      } else if (this.$refs.urTabContent2.currIdx === '2') {
        this.searchBtn();
      }
    },

  },
  
}
</script>
<style scoped>
</style>
