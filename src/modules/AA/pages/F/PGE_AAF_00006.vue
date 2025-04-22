<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-tab-box
        default-idx="1"
        class="mt35"
      >
        <ur-tab-content
          idx="1"
          :label="$t('MSG_TXT_EB')"
          ref="urTabContent"
        >
          <ur-form-box toggleable>
            <ur-form-item
              :label="$t('MSG_TXT_COS_NM')"
              :label-align="'right'"
              style="width:50%; height:auto;"
              class="flex_wrap"
            >
              <ur-text-field
                v-model="courseName"
                style="width: 100%;"
                 @keyup.enter="searchBtn"
                 maxlength="150"
              />
            </ur-form-item>
            <ur-form-item
              :label="$t('MSG_TXT_COS_ID')"
              :label-align="'right'"
              style="width:50%; height:auto;"
              class="flex_wrap"
            >
              <ur-text-field
                v-model="courseId"
                style="width: 100%;"
                @keyup.enter="searchBtn"
                maxlength="50"
              />
            </ur-form-item>
            <ur-form-item
              :label="$t('MSG_TXT_FST_RGST_DT')"
              :label-align="'right'"
              style="width:50%; height:auto;"
              class="flex_wrap"
            >
              <ur-date-picker
                :confirm-label="$t('MSG_TXT_SEL')"
                input-type="YYYY-MM-DD"               
                v-model="fstRgstDtm"            
                :today-label="$t('MSG_BTN_TODAY')"    
              />
            </ur-form-item>
            <ur-form-item
              :label="$t('MSG_TXT_EXPOSR_YN')"
              :label-align="'right'"
              style="width:50%; height:auto;"
              class="flex_wrap"
            >
              <ur-checkbox
                v-model="exposrYnYChk"
                sm
              />
              <span class="check_label">Y</span>

              <ur-checkbox
                v-model="exposrYnNChk"
                sm
              />
              <span class="check_label">N</span>
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
          <ur-data-grid
            ref="grid"
            :headers="columns"
            :data-source="list"
            :data-set-options="{id: 'id'}"
            :options="opts"
            class="custom_grid_pgeNav_None mt35"
            @grid:scroll-bottom="scrollBottom"
            :item-size="totalCount"
          />
        </ur-tab-content>
        <ur-tab-content
          idx="2"
          :label="$t('MSG_TXT_CB')"
        >
          <ur-form-box toggleable>
            <ur-form-item
              :label="$t('MSG_TXT_COS_NM')"
              :label-align="'right'"
              style="width:50%; height:auto;"
              class="flex_wrap"
            >
              <ur-text-field
                v-model="courseNameCb"
                style="width: 100%;"
                @keyup.enter="searchBtn"
                maxlength="150"
              />
            </ur-form-item>
            <ur-form-item
             :label="$t('MSG_TXT_COS_ID')"
              :label-align="'right'"
              style="width:50%; height:auto;"
             class="flex_wrap"
            >
              <ur-text-field
                v-model="courseIdCb"
                style="width: 100%;"
                @keyup.enter="searchBtn"
                maxlength="50"
              />
            </ur-form-item>
            <ur-form-item
              :label="$t('MSG_TXT_FST_RGST_DT')"
              :label-align="'right'"
              style="width:50%; height:auto;"
              class="flex_wrap"
            >
              <ur-date-picker
                auto-confirm
                input-type="YYYY-MM-DD"
                v-model="fstRgstDtmCb"
                :confirm-label="$t('MSG_TXT_SEL')"
                :today-label="$t('MSG_BTN_TODAY')"
              />
            </ur-form-item>
            <ur-form-item
              :label="$t('MSG_TXT_EXPOSR_YN')"
              :label-align="'right'"
              style="width:50%; height:auto;"
              class="flex_wrap"
            >
              <ur-checkbox
                v-model="exposrYnYChkCb"
                sm
              />
              <span class="check_label">Y</span>

              <ur-checkbox
                v-model="exposrYnNChkCb"
                sm
              />
              <span class="check_label">N</span>
            </ur-form-item>
          </ur-form-box>
          <div class="btn_wrap mt10">
            <div class="right_box">
              <ur-button v-permission:read="this.$options.name" @click="initCb">
                {{$t('MSG_BTN_INTL')}}
              </ur-button>
              <ur-button v-permission:read="this.$options.name" color="violet" @click="searchBtn()">
                {{$t('MSG_BTN_SEARCH')}}
              </ur-button>
            </div>
          </div>
          <ur-data-grid
            ref="gridCb"
            :headers="columnsCb"
            :data-source="listCb"
            :data-set-options="{id: 'id'}"
            :options="opts"
            class="custom_grid_pgeNav_None mt35"
            @grid:scroll-bottom="scrollBottom"
            :item-size="totalCountCb"
          />
        </ur-tab-content>
      </ur-tab-box>
      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="right_box">
            <ur-button v-permission:update="this.$options.name"
              color="violet"
              @click="save"
            >
              {{$t('MSG_BTN_SAVE')}}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAF_00006', // eslint-disable-line vue/name-property-casing
  components: {

  },
  data() {
    return {

      courseId : '',
      courseName : '',
      fstRgstDtm : '',
      exposrYnY : '',
      exposrYnN : '',
      exposrYnYCb : '',
      exposrYnNCb : '',
      exposrYnYChk : true,
      exposrYnNChk : true,
      parkKind : '',
      courseIdCb : '',
      courseNameCb : '',
      fstRgstDtmCb : '',
      exposrYnYChkCb : true,
      exposrYnNChkCb : true,
      
      // 테이블
      opts: {
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
        selectCheckOnly: true,
        resizableColumn: true,
        defaultPageSize: 30,
      },

      list: new this.$ur.grid.DataSet(),
      listCb: new this.$ur.grid.DataSet(),
      currRows : 0,
      totalCount: 0,
      rowsPerPage: 30,
      totalCountCb: 0,
      currRowsCb : 0,
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    columns() {
      let that = this;
      return[
        {
          text: 'No.', value: 'rowNum', width: 80, align: 'center',
        },
        {
          text: this.$t('MSG_TXT_COS_NM'),
          value: 'courseName',
          minWidth: 300,
        },
        {
          text: this.$t('MSG_TXT_COS_ID'),
          value: 'courseId',
          minwidth: 200,
        },
        {
          text: this.$t('MSG_TXT_GOOD_CNT'),
          value: 'likeCnt',
          minwidth: 80,
        },
        {
          text: this.$t('MSG_TXT_RGST_DTM'),
          value: 'fstRgstDtm',
          type:'date', customValue(value){ return utils.dateformatToClient(value).substring(0, 16);},
          minwidth: 200,
        },
        {
          text: this.$t('MSG_TXT_RGST_USR'),
          value: 'fstRgstUsrId',
          minwidth: 150,
        },
        {
          required: true,
          text: this.$t('MSG_TXT_EXPOSR_YN'),
          value: 'exposrYn',
          component: {
            props: ['row', 'value', 'text', 'me'], // provided by grid
            template: `<div>
              <ur-radio sm v-model="value" value="Y" @input="onInput">Y</ur-radio>
              <ur-radio sm v-model="value" value="N" @input="onInput">N</ur-radio>
            </div>`,
            methods: {
              onInput(v) {
                that.list.setRowValue(this.row, 'exposrYn', v)
              },
            },
          },
          minwidth: 10
        },
      ]},

      columnsCb() {
      let that = this;
      return[
        {
          text: 'No.', value: 'rowNum', width: 100, align: 'center',
        },
        {
          text: this.$t('MSG_TXT_COS_NM'),
          value: 'courseName',
          minwidth: 400,
        },
        {
          text: this.$t('MSG_TXT_COS_ID'),
          value: 'courseId',
          minwidth: 200,
        },
        {
          text: this.$t('MSG_TXT_GOOD_CNT'),
          value: 'likeCnt',
          minwidth: 150,
        },
        {
          text: this.$t('MSG_TXT_RGST_DTM'),
          value: 'fstRgstDtm',
          type:'date', customValue(value){ return utils.dateformatToClient(value).substring(0, 16);},
          minwidth: 200,
        },
        {
          text: this.$t('MSG_TXT_RGST_USR'),
          value: 'fstRgstUsrId',
          minwidth: 150,
        },
        {
          required: true,
          text: this.$t('MSG_TXT_EXPOSR_YN'),
          value: 'exposrYn',
          component: {
            props: ['row', 'value', 'text', 'me'], // provided by grid
            template: `<div>
              <ur-radio sm v-model="value" value="Y" @input="onInput">Y</ur-radio>
              <ur-radio sm v-model="value" value="N" @input="onInput">N</ur-radio>
            </div>`,
            methods: {
              onInput(v) {
                that.listCb.setRowValue(this.row, 'exposrYn', v)
              },
            },
          },
          minwidth: 10
        },
      ]}

  },

  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    
  },
  mounted() {this.search(); },

  methods: {
    init() {
      this.fstRgstDtm = '';
      this.courseId = '';
      this.courseName = '';
      this.exposrYnYChk = true;
      this.exposrYnNChk = true;
      
    },

    initCb() {
      this.fstRgstDtmCb = '';
      this.courseIdCb = '';
      this.courseNameCb = '';
      this.exposrYnYChkCb = true;
      this.exposrYnNChkCb = true;
    },

    searchBtn() {

      if (!this.exposrYnYChk && !this.exposrYnNChk) {
         utils.messageBox('alert', this.$t('MSG_ALT_EXPOSR_SELECT'));
         return;
      }

      if (!this.exposrYnYChkCb && !this.exposrYnNChkCb) {
         utils.messageBox('alert', this.$t('MSG_ALT_EXPOSR_SELECT'));
         return;
      }
      
      this.list = new this.$ur.grid.DataSet();
      this.listCb = new this.$ur.grid.DataSet();
      this.currRows = 0;
      this.totalCount = 0;
      this.currRowsCb = 0;
      this.totalCountCb = 0;
      this.search();
    },

    // 검색
    search() {      
    
    /*
      if(this.$refs.grid !== undefined) {
         this.rowsPerPage = this.$refs.grid.mx_pager.rowsPerPage;
      }
    */
      if (this.exposrYnYChk) {
        this.exposrYnY = 'Y'
      } else {
        this.exposrYnY = ''
      } 

      if (this.exposrYnNChk) {
        this.exposrYnN = 'N'
      } else {
        this.exposrYnN = ''
      }

      if (this.exposrYnYChkCb) {
        this.exposrYnYCb = 'Y'
      } else {
        this.exposrYnYCb = ''
      } 

      if (this.exposrYnNChkCb) {
        this.exposrYnNCb = 'N'
      } else {
        this.exposrYnNCb = ''
      }

      if (this.$refs.urTabContent.currIdx === '1') {
        this.parkKind = '01'
      } else {
        this.parkKind = '02'
      }

      const param = {
        courseId: encodeURI(this.courseId),
        courseName: encodeURI(this.courseName),
        fstRgstDtm: this.fstRgstDtm,
        exposrYnY: this.exposrYnY,
        exposrYnN: this.exposrYnN,
        parkKind: '01',
        currRows: this.currRows,  //현재 가지고 온 데이터 수 
        rowsPerPage: this.$refs.grid.mx_pager.rowsPerPage?this.$refs.grid.mx_pager.rowsPerPage:10 // 가지고 올 데이터 수
      };

      const paramCb = {
        courseId: encodeURI(this.courseIdCb),
        courseName: encodeURI(this.courseNameCb),
        fstRgstDtm: this.fstRgstDtmCb,
        exposrYnY: this.exposrYnYCb,
        exposrYnN: this.exposrYnNCb,
        parkKind: '02',
        currRows: this.currRowsCb,  //현재 가지고 온 데이터 수 
        rowsPerPage: this.$refs.gridCb.mx_pager.rowsPerPage?this.$refs.gridCb.mx_pager.rowsPerPage:10 // 가지고 올 데이터 수
      };

      http.request('PGE_AAF_00006', 'DTS_AAF_00009', {
        query: param,
      }).then(res => {
        this.list.appendData(res.data.list);
        this.currRows = this.list.totalSize;
        this.totalCount = res.data.totalCount;    
        
        http.request('PGE_AAF_00006', 'DTS_AAF_00009', {
          query: paramCb,
        }).then(res => {       
          this.listCb.appendData(res.data.list);
          this.currRowsCb = this.list.totalSize;
          this.totalCountCb = res.data.totalCount;     
        }).catch(error => {
          console.log(error);
        });

      }).catch(error => {
        console.log(error);
      });
    },

    scrollBottom() {      

      if (this.$refs.urTabContent.currIdx === '1') {
        if(this.currRows != this.totalCount && this.currRows < this.totalCount ){
          this.search();
        }
      } else {
        if(this.currRowsCb != this.totalCountCb && this.currRowsCb < this.totalCountCb ){
          this.search();
        }
      }
    },

    save() {

      if (this.$refs.urTabContent.currIdx === '1') {

        if (this.list.getChanged().updated.length < 1) {
          utils.messageBox('alert', this.$t('MSG_ALT_NOT_CHANGE'));
          return;
        }
      } else {
        if (this.listCb.getChanged().updated.length < 1) {
          utils.messageBox('alert', this.$t('MSG_ALT_NOT_CHANGE'));
          return;
        }
      }

      let data = ''

      if (this.$refs.urTabContent.currIdx === '1') {
        data = this.list.getChanged().updated
      } else {
        data = this.listCb.getChanged().updated
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_MDFC'), null, () => {
      
        http.request(this.$options.name, 'DTS_AAF_00010', {
          data: data,
        }).then(res => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
          this.searchBtn();
          
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
