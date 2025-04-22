<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <!-- 사랑단 이미지 관리 목록조회 -->
    <sui-page-contents>
      <ur-form-box toggleable>
        <!-- 사랑단 분류 -->
        <ur-form-item
          :label="$t('MSG_TXT_LOVGRP_KIND_CD')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-radio-wrapper
            v-model="search.lovgrpKindCd"
            sm
            :items="codes.COD_IA_LOVGRP_KIND"
            @input="inputLovgrpKindCd"
          />
        </ur-form-item>

        <!-- 멤버십 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_MEMSHP_CD')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-dropdown
            v-model="search.memshpClassCd"
            :items="search.COD_IA_LOVGRP_MEMSHP_CD"
            no-select
            :msg-no-select="$t('MSG_TXT_ALL')"
            @input="inputMemshpClassCd"
          />
        </ur-form-item>

        <!-- 레벨 -->
        <ur-form-item
          :label="$t('MSG_TXT_LEVEL')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-dropdown
            v-model="search.lvlCd"
            :items="search.COD_IA_LOVGRP_LV_CD"
            no-select
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <!-- 초기화 -->
          <ur-button
            v-permission:read="$options.name"
            @click="onClickReset()"
          >
            {{ $t('MSG_BTN_RESET') }}
          </ur-button>

          <!-- 검색 -->
          <ur-button
            v-permission:read="$options.name"
            color="violet"
            @click="onClickSearchBtn()"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </ur-button>
        </div>
      </div>

      <ur-data-grid
        ref="grid"
        class="mt35"
        :headers="columns"
        :data-source="dataList"
        :options="opts"
        :item-size="search.totalCount"
        :data-set-options="{id: 'id'}"
        @grid:paging="pagingChange"
      >
        <!-- 엑셀다운로드 -->
        <template #right-info>
          <ur-button
            v-permission:excel="$options.name"
            @click="onExcelDnLoad()"
          >
            <ur-icon
              icon="download"
              icon-type="line"
              size="small"
              spacing
            />
            {{ $t('MSG_TXT_EXCEL_DOWNLOAD') }}
          </ur-button>
        </template>
      </ur-data-grid>

      <!-- [하단: 버튼] -->
      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="right_box">
          <!-- 삭제 -->
          <ur-button
            v-permission:delete="$options.name"
            @click="onClickDelete()"
          >
            {{ $t("MSG_BTN_DEL") }}
          </ur-button>

          <!--신규 등록 -->
          <ur-button
            v-permission:create="$options.name"
            color="violet"
            @click="onClickRegist"
          >
            {{ $t("MSG_BTN_RGST_NEW") }}
          </ur-button>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { tsUndefinedKeyword } from '@babel/types'
import utils from '@/common/js/utils'
import CommonUtils from '@/modules/AA/js/common-utils'

export default {
  name: 'PGE_AAE_00042', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 공통코드
      codeKeyList: ['COD_IA_LOVGRP_KIND', 'COD_IA_LOVGRP_MEMSHP_CD', 'COD_IAA_LOVGRP_OPEN_YN', 'COD_IA_LOVGRP_LV_CD'],
      codes: {
        COD_IA_LOVGRP_KIND: [], COD_IA_LOVGRP_MEMSHP_CD: [], COD_IAA_LOVGRP_OPEN_YN: [], COD_IA_LOVGRP_LV_CD: [],
      },
      COD_IA_LOVGRP_LV_CD_ANIML: [],
      COD_IA_LOVGRP_LV_CD_PLANT: [],

      // 검색조건
      search: {
        lovgrpKindCd: '001',
        memshpClassCd: '',
        lvlCd: '',
        COD_IA_LOVGRP_MEMSHP_CD: [],
        COD_IA_LOVGRP_LV_CD: [],
        page: 1,
        rowsPerPage: 10,
      },
      searchParam: {},

      columns: [],
      opts: {
        noInfo: false,
        pagination: true,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        resizableColumn: true,
        infinityScroll: true,
        height: 430,
      },

      dataList: new this.$ur.grid.DataSet(),
      dsExcel: new this.$ur.grid.DataSet(),
    }
  },
  computed: {
    // 동물사랑단:true, 식물사랑단:false
    showMemshpYn() {
      return this.search.lovgrpKindCd
    },
  },
  watch: {
  },
  created() {
    const that = this
    const params = utils.getParameter(this, 'params')

    // 공통코드 셋팅 및 초기화
    http.mergeCodeList(this.$options.name, this.codeKeyList, this.codes).then(() => {
      this.COD_IA_LOVGRP_LV_CD_ANIML = this.codes.COD_IA_LOVGRP_LV_CD.slice(0, 6)// 시작 ~ 6개
      this.COD_IA_LOVGRP_LV_CD_PLANT = this.codes.COD_IA_LOVGRP_LV_CD.slice(6)// 6번째

      this.columns = [
        { text: 'No.', value: 'rowNum', width: 40 },
        {
          text: this.$t('MSG_TXT_LOVGRP_KIND_CD'), value: 'lovgrpKindCd', type: 'code', domain: this.codes.COD_IA_LOVGRP_KIND, width: 150,
        },
        {
          text: this.$t('MSG_TXT_MEM_SHP'), value: 'memshpClassCd', type: 'code', domain: this.codes.COD_IA_LOVGRP_MEMSHP_CD, width: 150,
        },
        {
          text: this.$t('MSG_TXT_LEVEL'), value: 'lvlCd', type: 'code', domain: this.codes.COD_IA_LOVGRP_LV_CD, width: 120,
        },
        {
          text: this.$t('MSG_TXT_LOV_ACTIVITY_YYYY'), value: 'activityGrpJoinYy', width: 110,
        },
        {
          text: this.$t('MSG_TXT_TITLE'),
          value: 'activitySubject',
          component: {
            props: ['row', 'value'],
            template: '<div><ur-button shape="hyperlink" @click.stop="clickCheck(row)">{{row.activitySubject}}</ur-button></div>',
            methods: {
              clickCheck(row) {
                that.fnGridRowClick(row)
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_ACTIVITY_DATE'),
          value: 'activityDate',
          width: 150,
          customValue(value) {
            return utils.dateformatToClient(value, 'S')
          },
        },
        {
          text: this.$t('MSG_TXT_ACTIVITY_PHOTO'),
          value: 'fileImagUrlCount',
          width: 150,
          customValue(value) {
            return `${that.$t('MSG_TXT_ACTIVITY_PHOTO')}(${value})`
          },
        },
        {
          text: this.$t('MSG_TXT_OPEN_YN'), value: 'openYn', type: 'code', domain: this.codes.COD_IAA_LOVGRP_OPEN_YN, width: 150,
        },
      ]

      if (params) {
        this.searchParam.lovgrpKindCd = params.lovgrpKindCd
        this.searchParam.memshpClassCd = params.memshpClassCd
        this.searchParam.lvlCd = params.lvlCd

        this.search.lovgrpKindCd = params.lovgrpKindCd
        this.inputLovgrpKindCd(this.search.lovgrpKindCd) // 사랑단분류 셋팅

        this.search.memshpClassCd = params.memshpClassCd
        this.inputMemshpClassCd(this.search.memshpClassCd) // 멤버쉽 셋팅

        this.search.lvlCd = params.lvlCd
        this.$refs.grid.setCurrentPage(_.toInteger(params.page))
      } else {
        this.onClickReset()
        this.inputLovgrpKindCd(this.search.lovgrpKindCd) // 사랑단분류 셋팅
        this.onClickSearchBtn()
      }
    }).catch(() => {})
  },
  mounted() {
  },
  methods: {

    pagingChange(paging) {
      this.search.rowsPerPage = paging.rowsPerPage
      this.search.page = paging.currentPage
      this.onClickSearch()
    },

    /** *************************************
     * INPUT 이벤트
     *************************************** */
    // 사랑단 분류 변경 시 멤버십 값 셋팅을 위한 함수
    inputLovgrpKindCd(data) {
      this.search.memshpClassCd = ''
      this.search.lvlCd = ''
      this.noSelect = true

      const promise = http.loadChildCode(this.pageId, 'COD_IA_LOVGRP_MEMSHP_CD', data)
      promise.then(res => {
        this.search.COD_IA_LOVGRP_MEMSHP_CD = res.data
        if (data === '002') {
          this.search.COD_IA_LOVGRP_LV_CD = this.COD_IA_LOVGRP_LV_CD_PLANT
        } else {
          this.search.COD_IA_LOVGRP_LV_CD = this.COD_IA_LOVGRP_LV_CD_ANIML
        }
      })
    },

    // 멤버십코드 변경시 레벨 셋팅을 위한 함수
    inputMemshpClassCd(data) {
      this.search.lvlCd = ''
      if (!_.isEmpty(data)) {
        const promise = http.loadChildCode(this.pageId, 'COD_IA_LOVGRP_LV_CD', data)
        promise.then(res => {
          this.search.COD_IA_LOVGRP_LV_CD = res.data
          if (res.data.length === 1) {
            this.noSelect = false
            this.search.lvlCd = this.search.COD_IA_LOVGRP_LV_CD[0].codeId
          } else {
            this.noSelect = true
          }
        })
      } else {
        this.search.COD_IA_LOVGRP_LV_CD = this.codes.COD_IA_LOVGRP_LV_CD
      }
    },

    // 검색버튼
    onClickSearchBtn() {
      // if(this.checkSearchValidataion()){
      this.searchParam = {
        lovgrpKindCd: this.search.lovgrpKindCd,
        memshpClassCd: this.search.memshpClassCd,
        lvlCd: this.search.lvlCd,
      }
      this.dataList = new this.$ur.grid.DataSet()
      this.onClickSearch()
      // }
    },

    // 초기화
    onClickReset() {
      this.search.lovgrpKindCd = '001'
      this.search.memshpClassCd = ''
      this.search.lvlCd = ''
      this.inputLovgrpKindCd(this.search.lovgrpKindCd)
    },

    // 검색조건 유효성체크
    checkSearchValidataion() {
      if (_.isEmpty(this.search.lovgrpKindCd)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_ID'), this.$t('MSG_TXT_LOVGRP_KIND_CD'))) // {사랑단 분류}(을)를 선택하세요.
        return false
      }
      if (_.isEmpty(this.search.memshpClassCd)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MEMSHP_CD'))) // {멤버십 구분} 을(를) 입력하세요.
        return false
      }
      return true
    },


    /** *************************************
     * 검색
     *************************************** */
    onClickSearch() {
      this.searchParam.page = this.search.page
      this.searchParam.rowsPerPage = this.$refs.grid.mx_pager.rowsPerPage // 가지고 올 데이터 수

      http.request(this.$options.name, 'DTS_AAE_00012', {
        query: this.searchParam,
      }).then(res => {
        this.dataList = res.data.list
        this.search.totalCount = res.data.totalCount
      }).catch(error => {
        console.log(error)
      })
    },

    /** *************************************
    * 상세조회
    **************************************** */
    fnGridRowClick(row) {
      const params = {
        ...this.search,
        activityId: row.activityId,
      }
      utils.goPage('PGE_AAE_00044', { params })
    },


    /** *************************************
     * 삭제
     *************************************** */
    onClickDelete() {
      const rows = this.$refs.grid.getSelected()
      if (rows.length < 1) {
        utils.messageBox('alert', this.$t('MSG_ALT_DEL_NO_DATA')) // 삭제할 데이터를 선택하세요.
        return
      }
      // 삭제 하시겠습니까?
      utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
        const queryParams = rows
        http.request(this.$options.name, 'DTS_AAE_00016', {
          data: queryParams,
        }).then(res => {
          utils.messageBox('alert', this.$t('MSG_ALT_DELETED')) // 삭제 되었습니다.
          this.onClickSearchBtn() // 재검색
        }).catch(error => {
          console.log(error)
        })
      })
    },

    /** *************************************
     * 신규등록
     *************************************** */
    onClickRegist() {
      const params = {
        ...this.search,
      }
      utils.goPage('PGE_AAE_00043', { params })
    },

    /** *************************************
     * 엑셀 다운로드
     *************************************** */
    onExcelDnLoad() {
      const queryParams = {
        lovgrpKindCd: this.search.lovgrpKindCd,
        memshpClassCd: this.search.memshpClassCd,
        excelYn: 'Y',
      }
      http.request(this.$options.name, 'DTS_AAE_00012', {
        query: queryParams,
      }).then(res => {
        const list = CommonUtils.mapCode(res.data.list, this.columns)
        this.dsExcel.setData(list) // 데이터 셋에 데이터를 넣는 함수

        const metaObj = {
          headerFontSize: 11,
          headerFontColor: 1,
          headerForegroundColor: 22,
          defaultFontSize: 10,
        }

        const sToday = utils.now('YYYYMMDDHHmmss')
        const meta = this.$store.getters.getPageMeta(this.$options.name)
        const pageTitle = utils.startsWith(meta.pageInfo.pageTitleMessageResourceId, 'MSG_', 0) ? this.$t(meta.pageInfo.pageTitleMessageResourceId) : meta.pageInfo.pageTitleMessageResourceId
        const sExcelName = `${pageTitle}_${sToday}.xlsx`

        utils.downloadGridToExcel(this.$options.name, this.columns, this.dsExcel, sExcelName, metaObj)
      }).catch(error => {
        console.log(error)
      })
    },


  },
}
</script>
<style scoped>
</style>
