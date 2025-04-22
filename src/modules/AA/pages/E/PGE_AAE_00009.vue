<template>
  <sui-page class="custom_page">
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
    <ur-form-box toggleable>
      <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_OSKIND')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
        <ur-checkbox-wrapper sm v-model="osKindCd" :items="codes.COD_IA_OS_KIND"/>    
      </ur-form-item>
    </ur-form-box>
    <div class="btn_wrap mt10" ref="modal">
        <div class="right_box">
          <!-- 초기화 -->
          <ur-button v-permission:read="this.$options.name" v-show="false">
            {{$t('MSG_BTN_INTL')}}
          </ur-button>
          <!-- 검색 -->
          <ur-button v-permission:read="this.$options.name" @click="onClickSearchBtn"
            color="violet"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </ur-button>
        </div>
      </div>

      <ur-data-grid
        ref="grid"
        class="custom_grid_pgeNav_None mt35"
        :headers="columnsT1"
        :data-source="dataList"
        :options="opts"
        :item-size="totalCount"
        :data-set-options="{id: 'id'}"
        @grid:scroll-bottom="onBottom"
      >
      <!-- 엑셀다운로드 -->
        <template #right-info>
          <ur-button v-permission:excel="this.$options.name" @click="onExcelDnLoad()">
            <ur-icon spacing size="small" icon="download" icon-type="line"/>
            {{ $t('MSG_TXT_EXCEL_DOWNLOAD')}}
          </ur-button>
        </template>
      </ur-data-grid>

      <!-- [하단: 버튼] -->
      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="right_box">
            <!-- 삭제 -->
            <ur-button  v-permission:delete="this.$options.name"  
            @click="onClickDelete()">
              {{ $t("MSG_BTN_DEL") }}
            </ur-button>
            <!--신규 등록 -->
            <ur-button v-permission:create="this.$options.name"
            @click="onClickRegist()"
              color="violet"
            >
            {{ $t("MSG_BTN_RGST_NEW") }}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAE_00009',
  components: {
  },
  data() {
    return {
      //공통코드
      codeKeyList: ['COD_IA_OS_KIND'],
      codes: { COD_IA_OS_KIND: []},

      // OS 구분
      osKindCd : '',
      currRows : 0, //현재 가지고 온 데이터 수

      // 테이블
      columnsT1:[],
      opts: {
        height: 450,
        noInfo: false,
        pagination: true,
        infinityScroll : true,
        resizableColumn: true,
      },
      totalCount: 0,
      dataList: new this.$ur.grid.DataSet(),
      dsExcel: new this.$ur.grid.DataSet(),
    };
  },
  created() {
    let that = this
    const params = utils.getParameter(this, 'params')

    //공통코드 셋팅 및 초기화
    http.mergeCodeList(this.$options.name, this.codeKeyList, this.codes).then(() => {
    this.columnsT1 = [
        {
          text: '',
          value: 'checked',
          width: '50px',
          component : {
            props: ['row','value','text', 'me'],
            template: `<div><ur-checkbox sm v-model="row.checked" :disabled="this.disableYn" @input="isSelect" /></div>`,
            computed: {
              disableYn(){
                return this.row.delYn=="Y"?true:false;
              },
            },
            methods:{
              isSelect(v){
                that.dataList.setRowValue(this.row, 'checked', v)
              }
            }
          },
        },
        { text: this.$t('MSG_TXT_OSKIND'), value: 'osKindCd', type:'code', domain:this.codes.COD_IA_OS_KIND},
        { text: this.$t('MSG_TXT_VER'), value: 'ver',
          component: {
            props: ['row', 'value'],
            template: '<div><ur-button shape="hyperlink" @click.stop="clickCheck(row)">{{row.ver}}</ur-button></div>',
            methods: {
              clickCheck(row) {
                that.fnGridRowClick(row)
              },
            },
          },
        },
        { text: this.$t('MSG_TXT_FRCD_YN'), value: 'coercReflYn',},
        { text: this.$t('MSG_TXT_NOTE'), value: 'memoDescrt', },
        { text: this.$t('MSG_TXT_RGST_DTM'), value: 'fstRgstDtm', type:'date',
          customValue(value){
            return utils.dateformatToClient(value);
          } 
        },
        { text: this.$t('MSG_TXT_RGST_USR'), width: '100px', value: 'fstRgstUsrId', },
        { text: this.$t('MSG_TXT_MDFC_DTM'),value: 'fnlMdfcDtm', type:'date',
          customValue(value){
            return utils.dateformatToClient(value);
          } 
        },
        { text: this.$t('MSG_TXT_MDFC_USR'), width: '100px', value: 'fnlMdfcUsrId', },
      ]

      //초기검색값 셋팅
        if (utils.isEmpty(params)) {
          this.onClickReset();
        }else{
          this.osKindCd      = params.osKindCd || ""
        }
        this.onClickSearch();
    }).catch(() => {});
    

  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    //검색버튼
    onClickSearchBtn(){
      if( utils.isEmpty(this.osKindCd) ){
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_OSKIND')); // OS구분 을(를) 선택하세요.
        utils.messageBox('warning', msg);
        return false;
      }else{
        this.dataList = new this.$ur.grid.DataSet();
        this.currRows = 0;  //가지고 온 데이터 초기화
        this.totalCount = 0;

        this.onClickSearch();
      }
    },
    //그리드 맨 마지막
    onBottom(){
      //가지고 온 데이터 수와 totalSize 가 같지 않을 경우만 재조회
      if(this.currRows != this.totalCount){
        this.onClickSearch();
      }
    },

    //초기화
    onClickReset() {
      this.osKindCd = '';

      let temp = [];
      this.codes.COD_IA_OS_KIND.forEach(function(code){
        temp.push(code.value);
      });
      this.osKindCd = temp;
    },

    //상세조회
    fnGridRowClick(row){
        const params = {
          osKindCd    : this.osKindCd,
          detailOsKindCd    : row.osKindCd,
          hstSeqNo      : row.hstSeqNo,
        }
        utils.goPage('PGE_AAE_00011', { params })
    },

    //검색
    onClickSearch(){
      const queryParams = {
                            osKindCdList: this.osKindCd.join(","),
                            currRows: this.currRows,  //현재 가지고 온 데이터 수 
                            rowsPerPage: this.$refs.grid.mx_pager.rowsPerPage  //가지고 올 데이터 수
                          };

      http.request(this.$options.name, 'DTS_AAI_00001', {
        query: queryParams,
      }).then(res => {
        this.dataList.appendData(res.data.list);
        this.currRows = this.dataList.totalSize;
        this.totalCount = res.data.totalCount;

      }).catch(error => {
        console.log(error);
      });
    },

    //삭제
    onClickDelete(){
      var allRows = this.$refs.grid.getViewData();
      var rows = [];
      allRows.forEach(function(row){
        if(row.checked){
          rows.push(row);
        }
      });

      if(rows.length < 1){
        utils.messageBox("alert", this.$t('MSG_ALT_DEL_NO_DATA')); //삭제할 데이터를 선택하세요.
        return;
      }

      for(var i = 0; i < rows.length; i++){
        if(rows[i].delYn == "Y"){
          utils.messageBox("alert", this.$t('MSG_ALT_INCLUD_FNL_VER')); //최신 버전은 삭제 할수 없습니다.
          return;
        }
      }

      //삭제 하시겠습니까?
      utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
        const queryParams = rows;
        http.request(this.$options.name, 'DTS_AAI_00003', {
          data: queryParams,
        }).then(res => {
          utils.messageBox("alert", this.$t('MSG_ALT_DELETED')); //삭제 되었습니다.
          this.onClickSearchBtn(); //재검색
        }).catch(error => {
          console.log(error);
        });
      });
    },

    // 엑셀 다운로드
    onExcelDnLoad() {
      this.dsExcel = new this.$ur.grid.DataSet();
      const metaObj = {
        headerFontSize: 11,
        headerFontColor: 1,
        headerForegroundColor: 22,
        defaultFontSize: 10,
      }
      const sToday = utils.now('YYYYMMDDHHmmss');
      const meta = this.$store.getters.getPageMeta(this.$options.name)
      const pageTitle = utils.startsWith(meta.pageInfo.pageTitleMessageResourceId, 'MSG_', 0) ? this.$t(meta.pageInfo.pageTitleMessageResourceId) : meta.pageInfo.pageTitleMessageResourceId
      const sExcelName = `${pageTitle}_${sToday}.xlsx`

      let columns = [
        { text: this.$t('MSG_TXT_OSKIND'), value: 'osKindCd', type:'code', domain:this.codes.COD_IA_OS_KIND},
        { text: this.$t('MSG_TXT_VER'), value: 'ver',
          component: {
            props: ['row', 'value'],
            template: '<div><ur-button shape="hyperlink">{{row.ver}}</ur-button></div>',
          },
        },
        { text: this.$t('MSG_TXT_FRCD_YN'), value: 'coercReflYn',},
        { text: this.$t('MSG_TXT_NOTE'), width: '350px', value: 'memoDescrt', },
        { text: this.$t('MSG_TXT_RGST_DTM'), width: '160px', value: 'fstRgstDtm', type:'date',
          customValue(value){
            return utils.dateformatToClient(value);
          } 
        },
        { text: this.$t('MSG_TXT_RGST_USR'), width: '100px', value: 'fstRgstUsrId', },
        { text: this.$t('MSG_TXT_MDFC_DTM'), width: '160px', value: 'fnlMdfcDtm', type:'date',
          customValue(value){
            return utils.dateformatToClient(value);
          } 
        },
        { text: this.$t('MSG_TXT_MDFC_USR'), width: '100px', value: 'fnlMdfcUsrId', },
      ];

      const list = this.mapCode(columns)
      this.dsExcel.setData(list) // 데이터 셋에 데이터를 넣는 함수

      utils.downloadGridToExcel(this.$options.name, columns , this.dsExcel, sExcelName, metaObj);
    },

    //컬럼의 도메인 값 강제로 변경 해주는 쿼리
    mapCode(columns) {
      const tmpList = []
      _.forEach(this.$refs.grid.getData(), (row) => {
        const tmpRow = row
        _.forEach(columns, (column) => {
          if (column.type === 'code' && column.domain) {
            _.forEach(column.domain, (domain) => {
              if(tmpRow[column.value] == domain.key ){
                tmpRow[column.value] = domain.text
              }
            })
          }
        })
        tmpList.push(tmpRow)
      })
      return tmpList
    },

    //신규등록 페이지 이동
    onClickRegist(){
      const params = {
        osKindCd      : this.osKindCd,
      }
      utils.goPage('PGE_AAE_00010', { params })
    },
  },
};
</script>
<style scoped>
</style>
