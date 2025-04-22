<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="pageId" />
    <sui-page-contents>
      <!-- 주차장명 -->
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_PARKNG_NAME')"
          label-align="right"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            v-model="search.parkngName"
            style="width: 100%;"
            maxlength="150"
            @enter="onClickSearchBtn()"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <!-- 초기화 -->
          <ur-button
            v-permission:read="pageId"
            @click="search.parkngName=''"
          >
            {{ $t('MSG_BTN_RESET') }}
          </ur-button>
          <!-- 검색 -->
          <ur-button
            v-permission:read="pageId"
            color="violet"
            @click="onClickSearchBtn()"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </ur-button>
        </div>
      </div>

      <template>
        <ur-data-grid
          ref="grid"
          class="custom_grid_pgeNav_None mt35"
          :headers="columnsT1"
          :data-source="dataList"
          :item-size="search.totalCount"
          :options="opts"
          :data-set-options="{id: 'id'}"
        >
          <template #right-info>
            <ur-button
              v-permission:excel="pageId"
              @click="onExcelDnLoad()"
            >
              <ur-icon
                icon="download"
                icon-type="line"
                size="small"
                spacing
              />
              {{ $t('MSG_TXT_EXCEL_DOWNLOAD') }} <!-- 엑셀다운로드 -->
            </ur-button>
          </template>
        </ur-data-grid>
      </template>

      <!-- [하단: 버튼] -->
      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="right_box">
            <!-- 삭제 -->
            <ur-button
              v-permission:delete="pageId"
              @click="onClickDelete()"
            >
              {{ $t("MSG_BTN_DEL") }}
            </ur-button>
            <ur-button
              v-permission:create="pageId"
              color="violet"
              @click="onClickRowAdd()"
            >
              {{ $t("MSG_BTN_RGST_NEW") }} <!-- 신규 등록 -->
            </ur-button>
            <ur-button
              v-permission:update="pageId"
              color="violet"
              @click="onClickSave()"
            >
              {{ $t("MSG_BTN_SAVE") }} <!-- 저장 -->
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import utils from '@/common/js/utils'
import CommonUtils from '@/modules/AA/js/common-utils'

export default {
  name: 'PGE_AAJ_00001', // eslint-disable-line vue/name-property-casing
  data() {
    return {
      // 공통코드
      codeKeyList: ['COD_IA_PARKNG_CATE_KIND', 'COD_IA_PARKNG_STATUS'],
      codes: { COD_IA_PARKNG_CATE_KIND: [], COD_IA_PARKNG_STATUS: [] },

      // 검색조건
      search: {
        parkngName: '',
        currRows: 0, // 가지고 온 데이터 수
        totalCount: 0,
      },

      // 테이블
      columnsT1: [],
      opts: {
        height: 450,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        noInfo: false,
        resizableColumn: true,
        // infinityScroll 사용안함.
        infinityScroll: false,
      },
      dataList: new this.$ur.grid.DataSet(),
      dsExcel: new this.$ur.grid.DataSet(),
      inputData: {
        parkngName: '',
        cateKindCd: '',
        parkngKindName: '',
        parkngStatusCd: '',
        locInfoUrl: '',
        parkngAvailCnt: 0,
        latud: null,
        lgtud: null,
      },
    }
  },
  computed: {
    pageId() { return this.$options.name },
  },
  created() {
    const that = this

    // 공통코드 셋팅 및 초기화
    http.mergeCodeList(this.pageId, this.codeKeyList, this.codes).then(() => {
      this.columnsT1 = [
        // 주차장명
        {
          text: this.$t('MSG_TXT_PARKNG_NAME'),
          value: 'parkngName',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-text-field
                  ref="parkngName"
                  v-model="row.parkngName"
                  maxlength="100"
                  :rules="$rules.getRules('not_empty')"
                  fixed-message
                  style="width: 100%;"
                  @input="input"
                />
              </div>`,
            methods: {
              input(v) {
                that.dataList.setRowValue(this.row, 'parkngName', v)
                this.$nextTick()
              },
            },
          },
        },
        // 카테고리
        {
          text: this.$t('MSG_TXT_CATG'),
          value: 'cateKindCd',
          type: 'code',
          domain: this.codes.COD_IA_PARKNG_CATE_KIND,
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-dropdown
                  ref="cateKindCd"
                  v-model="row.cateKindCd"
                  :items="COD_IA_PARKNG_CATE_KIND"
                  @input="isSelect"
                  no-select
                  :msg-no-select="$t('MSG_TXT_SEL')"
                />
              </div>`,
            computed: {
              COD_IA_PARKNG_CATE_KIND() {
                return that.codes.COD_IA_PARKNG_CATE_KIND
              },
            },
            methods: {
              isSelect(v) {
                that.dataList.setRowValue(this.row, 'cateKindCd', v)
                this.$nextTick()
              },
            },
          },
        },
        // 구분
        {
          text: this.$t('MSG_TXT_DIV'),
          value: 'parkngKindName',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-text-field
                  ref="parkngKindName"
                  v-model="row.parkngKindName"
                  maxlength="33"
                  fixed-message
                  style="width: 100%;"
                  @input="input"
                />
              </div>`,
            methods: {
              input(v) {
                that.dataList.setRowValue(this.row, 'parkngKindName', v)
                this.$nextTick()
              },
            },
          },
        },
        // 주차상태
        {
          text: this.$t('MSG_TXT_PARKNG_STATUS'),
          value: 'parkngStatusCd',
          required: true,
          type: 'code',
          domain: this.codes.COD_IA_PARKNG_STATUS, // (타입이랑 코드값이 있어야 엑셀에서 코드명이 나옴)
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-dropdown
                  ref="parkngStatusCd"
                  v-model="row.parkngStatusCd"
                  :items="COD_IA_PARKNG_STATUS"
                  @input="isSelect"
                  no-select
                  :msg-no-select="$t('MSG_TXT_SEL')"
                />
              </div>`,
            computed: {
              COD_IA_PARKNG_STATUS() {
                return that.codes.COD_IA_PARKNG_STATUS
              },
            },
            methods: {
              isSelect(v) {
                that.dataList.setRowValue(this.row, 'parkngStatusCd', v)
                this.$nextTick()
              },
            },
          },
        },
        // 위치정보URL
        {
          text: this.$t('MSG_TXT_LOC_INFO_URL'),
          value: 'locInfoUrl',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-text-field
                  ref="locInfoUrl"
                  v-model="row.locInfoUrl"
                  maxlength="100"
                  style="width: 100%;"
                  @input="input"
                />
              </div>`,
            methods: {
              input(v) {
                that.dataList.setRowValue(this.row, 'locInfoUrl', v)
                this.$nextTick()
              },
            },
          },
        },
        // 위도
        {
          text: this.$t('MSG_TXT_LATUD'),
          value: 'latud',
          width: 110,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-text-field
                  ref="latud"
                  v-model="row.latud"
                  maxlength="20"
                  :rules="$rules.getRules('only_numeric_dot')"
                  fixed-message
                  style="width: 100%;"
                  @input="input"
                />
              </div>`,
            methods: {
              input(v) {
                that.dataList.setRowValue(this.row, 'latud', v)
                this.$nextTick()
              },
            },
          },
        },
        // 경도
        {
          text: this.$t('MSG_TXT_LGTUD'),
          value: 'lgtud',
          width: 110,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-text-field
                  ref="lgtud"
                  v-model="row.lgtud"
                  maxlength="20"
                  :rules="$rules.getRules('only_numeric_dot')"
                  fixed-message
                  style="width: 100%;"
                  @input="input"
                />
              </div>`,
            methods: {
              input(v) {
                that.dataList.setRowValue(this.row, 'lgtud', v)
                this.$nextTick()
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_RGST_DTM'),
          value: 'fstRgstDtm',
          type: 'date',
          width: 150,
          customValue(value) {
            return utils.dateformatToClient(value)
          },
        },
        { text: this.$t('MSG_TXT_RGST_USR'), value: 'fstRgstUsrId', width: 100 },
        {
          text: this.$t('MSG_TXT_MDFC_DTM'),
          value: 'fnlMdfcDtm',
          type: 'date',
          width: 150,
          customValue(value) {
            return utils.dateformatToClient(value)
          },
        },
        { text: this.$t('MSG_TXT_MDFC_USR'), value: 'fnlMdfcUsrId', width: 100 },
      ]

      this.onClickSearch()
    }).catch(() => {})
  },
  mounted() {
  },
  methods: {
    onClickRowAdd() {
      this.addRowtoDs().then(() => {
        const maxRownum = this.dataList.data.length + 1
        this.$refs.grid.setScrollRow(maxRownum)
      })
    },

    addRowtoDs() {
      const that = this
      return new Promise(resolve => {
        that.dataList.addRow(that.inputData)
        resolve()
      })
    },

    // 검색버튼
    onClickSearchBtn() {
      this.dataList = new this.$ur.grid.DataSet()
      this.search.currRows = 0
      this.search.totalCount = 0
      this.onClickSearch()
    },
    // 조회
    onClickSearch() {
      const queryParams = {
        parkngName: encodeURI(this.search.parkngName),
        currRows: this.search.currRows, // 현재 가지고 온 데이터 수
        rowsPerPage: this.$refs.grid.mx_pager.rowsPerPage, // 가지고 올 데이터 수
      }
      http.request(this.pageId, 'DTS_AAJ_00001', {
        query: queryParams,
      }).then(res => {
        this.dataList.appendData(res.data.list)
        this.search.currRows = this.dataList.totalSize
        this.search.totalCount = res.data.totalCount
      }).catch(error => {
        console.log(error)
      })
    },
    // 삭제
    onClickDelete() {
      const rows = this.$refs.grid.getSelected()
      if (rows === null || rows.length < 1) {
        utils.messageBox('warning', this.$t('MSG_ALT_DEL_NO_DATA')) // 삭제할 데이터를 선택하세요.
        return
      }
      const deleteParkngList = []

      // 저장되지 않은 row 를 삭제할 수도 있기 때문에 데이터 정비
      for (let i = 0; i < rows.length; i += 1) {
        if (utils.isEmpty(rows[i].parkngId)) {
          // eslint-disable-next-line no-underscore-dangle
          this.$refs.grid.removeRow(rows[i].__id, false)
        } else {
          deleteParkngList.push(rows[i])
        }
      }

      // 삭제 하시겠습니까?
      if (deleteParkngList.length > 0) {
        utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
          const queryParams = {
            // eslint-disable-next-line object-shorthand
            deleteParkngList: deleteParkngList,
          }
          http.request(this.pageId, 'DTS_AAJ_00003', {
            data: queryParams,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_DELETED')) // 삭제 되었습니다.
            this.onClickSearchBtn() // 재검색
          }).catch(error => {
            console.log(error)
          })
        })
      }
    },
    // 저장
    onClickSave() {
      const chagnedData = this.dataList.getChanged()
      // 유효성 체크
      if (!this.isValidation()) { return }

      // 저장 하시겠습니까?
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        // 파람데이터 만들기
        const inputParam = {
          updateParkngList: chagnedData.updated,
          insertParkngList: chagnedData.created,
        }
        http.request(this.pageId, 'DTS_AAJ_00002', {
          data: inputParam,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
          this.onClickSearchBtn() // 재조회
        })
      })
    },

    // 유효성 체크
    isValidation() {
      let reVal = true
      const inputData = this.dataList.data

      for (let i = 0; i < inputData.length; i += 1) {
        // 주차장명(NOT Null)
        if (!utils.trim(inputData[i].parkngName)) {
          const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PARKNG_NAME'))
          utils.messageBox('warning', msg)
          reVal = false
          break
        }
        // 카테고리(NOT Null)
        if (!utils.trim(inputData[i].cateKindCd)) {
          const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_CATG'))
          utils.messageBox('warning', msg)
          reVal = false
          break
        }
        // 주차상태(NOT Null)
        if (!utils.trim(inputData[i].parkngStatusCd)) {
          const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PARKNG_STATUS'))
          utils.messageBox('warning', msg)
          reVal = false
          break
        }

        // 위도(숫자랑 (.) 만 가능)
        if (!CommonUtils.isNumDot(inputData[i].latud)) {
          const msg = utils.strFormat(this.$t('MSG_ALT_CHK_ONLY_NUMBER_DOT'), this.$t('MSG_TXT_LATUD'))
          utils.messageBox('warning', msg)
          reVal = false
          break
        }

        // 경도(숫자랑 (.) 만 가능)
        if (!CommonUtils.isNumDot(inputData[i].lgtud)) {
          const msg = utils.strFormat(this.$t('MSG_ALT_CHK_ONLY_NUMBER_DOT'), this.$t('MSG_TXT_LGTUD'))
          utils.messageBox('warning', msg)
          reVal = false
          break
        }
      }

      return reVal
    },

    // 엑셀 다운로드
    onExcelDnLoad() {
      this.dsExcel = new this.$ur.grid.DataSet()
      const metaObj = {
        headerFontSize: 11,
        headerFontColor: 1,
        headerForegroundColor: 22,
        defaultFontSize: 10,
      }
      const sToday = utils.now('YYYYMMDDHHmmss')
      const meta = this.$store.getters.getPageMeta(this.pageId)
      const pageTitle = utils.startsWith(meta.pageInfo.pageTitleMessageResourceId, 'MSG_', 0) ? this.$t(meta.pageInfo.pageTitleMessageResourceId) : meta.pageInfo.pageTitleMessageResourceId
      const sExcelName = `${pageTitle}_${sToday}.xlsx`

      // 화면에 보여지는 대로 엑셀 출력
      const list = CommonUtils.mapCode(this.$refs.grid.getViewData(), this.columnsT1)
      this.dsExcel.setData(list) // 데이터 셋에 데이터를 넣는 함수

      utils.downloadGridToExcel(
        this.pageId,
        this.columnsT1,
        this.dsExcel,
        sExcelName,
        metaObj,
      )
    },

    // 그리드 맨 마지막(사용안함)
    onBottom() {
      // 가지고 온 데이터 수와 totalSize 가 같지 않을 경우만 재조회
      if (this.search.currRows !== this.search.totalCount) {
        this.onClickSearch()
      }
    },
  },
}
</script>
