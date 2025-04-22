<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div>
        <template slot="title">
          <div class="modal-title mb45">
            시설 Capa 일괄 생성
          </div>
        </template>
        <template>
          <div class="modal-body">
            <ur-form-box
              toggleable
              class="mb10"
            >
              <ur-form-item
                label="기준일자"
                :label-align="'right'"
                style="width: 100%; height: auto;"
                required
                class="flex_wrap"
              >
                <ur-date-picker
                  v-model="params.salesDate"
                  input-type="YYYY-MM-DD"
                  model-type="YYYYMMDD"
                  md
                  style="width:20% !important; height:auto"
                  :confirm-label="$t('선택')"
                  :today-label="$t('오늘')"
                  :rules="$rules.getRules('not_null')"
                />
              </ur-form-item>
              <ur-form-item
                label="시설 카테고리"
                :label-align="'right'"
                style="width: 100%; height: auto;"
                class="flex_wrap"
              >
                <ur-dropdown
                  v-model="params.faciltCateKindCd"
                  :items="COD_IA_FACILT_CATE_KIND"
                  no-select="no-select"
                  :msg-no-select="$t('MSG_TXT_ALL')"
                  style="width:60%"
                  @input="getFaciltList"
                />
              </ur-form-item>
              <ur-form-item
                label="Zone 구분"
                :label-align="'right'"
                style="width: 100%; height: auto;"
                class="flex_wrap"
              >
                <ur-dropdown
                  v-model="params.zoneKindCd"
                  :items="COD_IA_ZONE_KIND"
                  no-select="no-select"
                  :msg-no-select="$t('MSG_TXT_ALL')"
                  style="width:60%"
                  @input="getFaciltList"
                />
              </ur-form-item>
              <ur-form-item
                label="Zone 구분 (제외)"
                :label-align="'right'"
                style="width: 100%; height: auto;"
                class="flex_wrap"
              >
                <ur-dropdown
                  v-model="params.zoneKindCdExcl"
                  :items="COD_IA_ZONE_KIND"
                  no-select="no-select"
                  :msg-no-select="$t('MSG_TXT_SELT')"
                  style="width:60%"
                  @input="getFaciltList"
                />
              </ur-form-item>
              <ur-form-item
                label="시설"
                :label-align="'right'"
                style="width: 100%; height: auto;"
                class="flex_wrap"
              >
                <ur-auto-dropdown
                  v-model="params.faciltId"
                  :items="FACILT_LIST"
                  no-select="no-select"
                  :msg-no-select="$t('MSG_TXT_ALL')"
                  :placeholder="$t('MSG_TXT_ALL')"
                  style="width:60%"
                />
              </ur-form-item>
              <ur-form-item
                label="생성일자"
                :label-align="'right'"
                style="width: 100%; height: auto;"
                required
              >
                <ur-range-picker
                  v-model="params.startEndDt"
                  input-type="YYYY-MM-DD"
                  model-type="YYYYMMDD"
                  :min-date="getToday('-')"
                  :confirm-label="$t('선택')"
                  :clear-label="$t('초기화')"
                  clearable
                  init="clear"
                  @input="onChangeStartEndDt"
                />
              </ur-form-item>
            </ur-form-box>
            * 기준일자에 적용되어 있는 가상대기 시설 Capa 상세정보가 선택한 생성일자로 동일하게 생성됩니다.
            <div class="comm_btn_wrap bt1">
              <div class="right_box mt10">
                <ur-button @click="onClose">
                  닫기
                </ur-button>
                <ur-button
                  v-permission:create="contextPageId"
                  color="violet"
                  @click="onSave"
                >
                  저장
                </ur-button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </sui-page-contents>
  </sui-page>
</template>

<script>
export default {
  name: 'PGE_AAB_00059', // eslint-disable-line vue/name-property-casing
  components: {
  },
  props: {
    pageInitialData: {
      type: Object,
      default() {
        return {}
      },
    },
    closePagePopup: {
      type: Function,
      default() {
        return null
      },
    },
  },
  data() {
    return {
      CODE_KEYS: [
        'COD_RS_PARK_KIND',
        'COD_IA_EL_ZONE_KIND',
        'COD_IA_CB_ZONE_KIND',
        'COD_IA_EL_FACILT_CATE_KIND',
        'COD_IA_CB_FACILT_CATE_KIND',
      ],
      codes: {
        COD_RS_PARK_KIND: [],
        COD_IA_EL_ZONE_KIND: [],
        COD_IA_CB_ZONE_KIND: [],
        COD_IA_EL_FACILT_CATE_KIND: [],
        COD_IA_CB_FACILT_CATE_KIND: [],
      },
      FACILT_LIST: [],
      params: {
        parkKindCd: '',
        faciltCateKindCd: '',
        zoneKindCd: '',
        zoneKindCdExcl: '',
        faciltId: '',
        startEndDt: ['', ''],
      },
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    contextPageId() {
      // return this.$attrs['page-id']
      return this.$options.name
    },
    COD_IA_FACILT_CATE_KIND() {
      if (this.params.parkKindCd === '02') return this.codes.COD_IA_CB_FACILT_CATE_KIND
      return this.codes.COD_IA_EL_FACILT_CATE_KIND
    },
    COD_IA_ZONE_KIND() {
      if (this.params.parkKindCd === '02') return this.codes.COD_IA_CB_ZONE_KIND // '02' 캐리비안베이
      return this.codes.COD_IA_EL_ZONE_KIND // 파크 구분 '01' 에버랜드
    },
    IS_EL_ON() {
      return (this.params.parkKindCd === '01')
    },
    IS_CB_ON() {
      return (this.params.parkKindCd === '02')
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
    http.mergeCodeList(this.contextPageId, this.CODE_KEYS, this.codes)
    console.log('CODES:', this.codes)

    this.params.parkKindCd = this.pageInitialData.parkKindCd
    this.params.salesDate = this.pageInitialData.salesDate

    this.getFaciltList()
  },
  methods: {
    getToday(delimiter) {
      const dt = new Date()
      let day = dt.getDate()
      let month = dt.getMonth() + 1
      const year = dt.getFullYear()
      if (day < 10) {
        day = `0${day}`
      }

      if (month < 10) {
        month = `0${month}`
      }

      return `${year}${delimiter}${month}${delimiter}${day}`
    },
    getFaciltList() {
      console.log('getFaciltList')

      const query = {
        parkKindCd: this.pageInitialData.parkKindCd,
        faciltCateKindCd: this.params.faciltCateKindCd,
        zoneKindCd: this.params.zoneKindCd,
        zoneKindCdExcl: this.params.zoneKindCdExcl,
      }
      console.log('REQ', query)
      const serviceName = 'DTS_AAB_00037'
      http.request(this.contextPageId, serviceName, {
        query,
        path: {},
        data: {},
      }).then(res => {
        console.log('RES', res.data)
        if (res.data && res.data.length > 0) {
          // utils.messageBox('warning', `신규로 등록 가능한 시설이 ${res.data.length}개 조회 되었습니다.`)
          this.FACILT_LIST = res.data
        } else {
          utils.messageBox('warning', this.$t('일괄생성 가능한 시설이 없습니다.'))
          this.FACILT_LIST = []
        }
      }).catch(error => {
        console.log(error)
      })
    },
    onSave() {
      console.log('onSave')
      this.$nextTick(() => {
        if (this.validated()) {
          utils.messageBox('confirm', this.$t('일괄생성을 진행 하시겠습니까?'), null, () => { // 일괄생성을 진행 하시겠습니까?
            const data = {
              parkKindCd: this.pageInitialData.parkKindCd,
              salesDate: this.params.salesDate,
              faciltId: this.params.faciltId,
              startSalesDate: this.params.startEndDt[0],
              endSalesDate: this.params.startEndDt[1],
              faciltCateKindCd: this.params.faciltCateKindCd,
              zoneKindCd: this.params.zoneKindCd,
              zoneKindCdExcl: this.params.zoneKindCdExcl,
            }
            console.log('REQ DATA:', data)
            const serviceName = 'DTS_AAB_00032'
            http.request(this.contextPageId, serviceName, {
              query: {},
              path: {},
              data,
            }).then(res => {
              console.log('RES', res.data)
              if (res.data.resultCode === '-1') { // -1 이면 서버 메시지를 그대로 표시한다.
                utils.messageBox('warning', res.data.msg)
              } else if (res.data.resultCode === '0') {
                utils.messageBox('warning', this.$t('일괄생성 할 일별 가상대기 Capa Slot 데이타가 존재하지 않습니다.'))
              } else {
                utils.messageBox('warning', this.$t('일별 가상대기 Capa 상세 데이타 일괄생성에 성공하였습니다.'))
                this.closePagePopup('REFRESH')
              }
            }).catch(error => {
              console.log(error)
            })
          })
        }
      })
    },
    validated() {
      // 필수항목
      if (!this.$rules.validate(this)) {
        utils.messageBox('warning', this.$t('필수 항목이 입력되지 않았습니다.'))
        return false
      }

      if (utils.isEmpty(this.params.startEndDt[0]) || utils.isEmpty(this.params.startEndDt[1])) {
        utils.messageBox('warning', this.$t('생성일자가 입력되지 않았습니다.'))
        return false
      }

      if (this.params.salesDate >= this.params.startEndDt[0] && this.params.salesDate <= this.params.startEndDt[1]) {
        utils.messageBox('warning', this.$t('생성일자에는 기준일자가 포함될 수 없습니다.'))
        return false
      }

      return true
    },
    onClose() {
      this.closePagePopup('Close')
    },
    onChangeStartEndDt(v) {
      console.log('onChangeStartEndDt', v)
      if (this.params.salesDate >= this.params.startEndDt[0] && this.params.salesDate <= this.params.startEndDt[1]) {
        utils.messageBox('warning', this.$t('생성일자에는 기준일자가 포함될 수 없습니다.'))
        return
      }
      if (this.params.startEndDt[0] > this.params.startEndDt[1]) {
        utils.messageBox('warning', this.$t('종료일은 시작일 이전으로 선택할 수 없습니다.'))
      }
    },
  },
}
</script>
<style scoped>
</style>
