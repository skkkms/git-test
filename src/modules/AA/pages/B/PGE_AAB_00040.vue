<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- :: UX Writing 수정 -->
      <div class="comm_title_wrap mt45">
        <h4>
          {{ $t("MSG_TXT_EXPOSR_INFO") }}
        </h4>
        <span class="subscript_txt">
          {{ $t('MSG_TXT_EXPOSR_INFO2') }}
        </span>
      </div>
      <ur-form-box toggleable>
        <!-- 게시 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_KIND')"
          label-align="right"
          required
          style="width: 50%; height: auto;"
        >
          <ur-checkbox-wrapper
            v-model="inputData.parkKindCd"
            :items="codes.COD_RS_PARK_KIND"
            sm
          />
        </ur-form-item>

        <!-- 방문 상태 -->
        <ur-form-item
          :label="$t('MSG_TXT_VST_STTS')"
          label-align="right"
          required
          style="width: 50%; height: auto;"
        >
          <ur-checkbox-wrapper
            v-model="inputData.visitStatusCd"
            :items="codes.COD_IA_VISIT_STATUS"
            sm
          />
        </ur-form-item>

        <!-- 노출 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          label-align="right"
          required
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="inputData.exposrYn"
            value="Y"
            sm
          >
            Y
          </ur-radio>
          <ur-radio
            v-model="inputData.exposrYn"
            value="N"
            sm
          >
            N
          </ur-radio>
        </ur-form-item>

        <!-- 노출 기간 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_PERIOD')"
          label-align="right"
          required
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-date-time-range-picker
            ref="exposrPeriod"
            v-model="inputData.exposrPeriod"
            :confirm-label="$t('MSG_TXT_SELT')"
            :rules="exposrPeriodRule"
            init="today"
            fixed-message
            @input="exposrPeriodInput"
          />
        </ur-form-item>

        <!-- 노출 조건 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_COND')"
          label-align="right"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            v-model="inputData.occrCondNm"
            style="width: 90%;"
            disabled
          />
          <!-- 발생 조건 search 아이콘-->
          <ur-icon-button
            icon="search"
            icon-type="line"
            color="primary"
            @click="openCondInfoSettng"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- ::E 노출 정보 -->

      <!-- ::S UX Writing 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          {{ $t('MSG_TXT_UX_INFO') }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <!-- 언어 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_LANG_DIV')"
          label-align="right"
          required
          style="width: 100%; height: auto;"
        >
          <ur-checkbox-wrapper
            v-model="inputData.langKindCd"
            :items="codes.COD_RS_LANG"
          />
        </ur-form-item>

        <!-- 노출 문구(300자)-->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_TXT')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
          required
        >
          <ur-text-field
            ref="exposrDescrt"
            v-model="inputData.exposrDescrt"
            :rules="$rules.getRules('not_null')"
            style="width: 100%; height: auto;"
            maxlength="300"
            fixed-message
          />
        </ur-form-item>
        <!-- 연결 URL-->
        <ur-form-item
          :label="$t('MSG_TXT_CONN_URL')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            v-model="inputData.connUrl"
            style="width: 88%; height: auto;"
            maxlength="300"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- ::E UX Writing 정보 -->

      <div class="bt1 mt45">
        <sui-page-footer class="comm_btn_wrap">
          <div class="btn_wrap">
            <div class="left_box">
              <!-- 목록 -->
              <ur-button
                v-permission:read="this.$options.name"
                @click="onClickList"
              >
                {{ $t("MSG_BTN_LIST") }}
              </ur-button>
            </div>
            <div class="right_box">
              <ur-button
                v-permission:update="this.$options.name"
                color="violet"
                @click="onClickSave"
              >
                {{ $t("MSG_BTN_SAVE") }}
              </ur-button>
            </div>
          </div>
        </sui-page-footer>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import utils from '@/common/js/utils'

export default {
  name: 'PGE_AAB_00040', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 공통코드
      codeKeyList: [
        'COD_RS_PARK_KIND',
        'COD_IA_VISIT_STATUS',
        'COD_RS_LANG'],
      codes: {
        COD_RS_PARK_KIND: [],
        COD_IA_VISIT_STATUS: [],
        COD_RS_LANG: [],
      },

      publctId: '',

      inputData: {
        parkKindCd: [],
        visitStatusCd: [],
        langKindCd: [],
        exposrDescrt: '',
        exposrDescrt2: '',
        exposrDescrt3: '',
        exposrPeriod: [],
        exposrPeriodStartDtm: '',
        exposrPeriodEndDtm: '',
        occrCondNm: '',
        exposrYn: '',
        connUrl: '',
        selectCondCdList: [],
        insertCondCdList: [],
        updateCondCdList: [],
        deleteCondCdList: [],
      },
      exposrPeriodRule: [
        v => {
          const rule = !!v && Array.isArray(v) && v.length === 2 && !!v[0] && !!v[1]
          return rule || this.$t('MSG_ALT_RULES_NOT_NULL')
        },
      ],
    }
  },
  created() {
    // 공통코드 셋팅 및 초기화
    http.mergeCodeList(this.$options.name, this.codeKeyList, this.codes).then(() => {
      this.codes.COD_RS_PARK_KIND.splice(-1, 1)
    }).catch(() => {})

    // 파라미터 셋팅
    const params = utils.getParameter(this, 'params')
    this.publctId = params.publctId

    // 상세조회
    this.fnSelectUxWritingDetail()
  },
  methods: {

    /**
     * 상세내역조회
     */
    fnSelectUxWritingDetail() {
      const queryParams = {
        publctId: this.publctId,
      }

      http.request(this.$options.name, 'DTS_AAD_00004', {
        query: queryParams,
      }).then(res => {
        this.inputData = res.data
        this.inputData.parkKindCd = res.data.parkKindCd.split(',')
        this.inputData.langKindCd = res.data.langKindCd.split(',')
        this.inputData.visitStatusCd = res.data.visitStatusCd.split(',')
        this.inputData.ori = res.data
        this.inputData.exposrPeriod = [
          utils.toStringByFormat(res.data.exposrPeriodStartDtm, 'YYYY-MM-DD HH:mm'),
          utils.toStringByFormat(res.data.exposrPeriodEndDtm, 'YYYY-MM-DD HH:mm'),
        ]
        this.inputData.exposrPeriodOld = this.inputData.exposrPeriod // 수정시 날짜 비교를 위해
      }).catch(error => {
        console.log(error)
      })
    },

    // 날짜 입력 시 값 셋팅
    exposrPeriodInput(val) {
      if (val.at(1) && val.at(1).slice(-5) === '00:00') {
        this.inputData.exposrPeriod = [val.at(0), val.at(1).substring(0, 11).concat('23:59')]
        return
      }
      this.inputData.exposrPeriodStartDtm = val.at(0) ? utils.dateformatToServer(`${val[0]}00`) : null
      this.inputData.exposrPeriodEndDtm = val.at(1) ? utils.dateformatToServer(`${val[1]}59`) : null
    },

    /**
     * 조건정보설정 팝업 띄우기
     */
    async openCondInfoSettng() {
      // 게시구분에 따라 조건정보설정 팝업 ui가 달라지기 때문
      if (utils.isEmpty(this.inputData.parkKindCd)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_SELT'), this.$t('MSG_TXT_PUBLCT_KIND')) // 게시구분을 선택하세요.
        utils.messageBox('warning', msg)
        return
      }
      const updateOccrCond = utils.cloneDeep(this.inputData.selectCondCdList)
      utils.openLayerPopup('PGE_AAD_00001', this.onCondInfoSettngCallback, {
        pageInitialData: {
          inputType: 'U',
          publctId: this.publctId,
          parkKindCd: this.inputData.parkKindCd,
          selectCondCdList: updateOccrCond,
        },
        size: 'lg',
      })
    },
    // 콜백
    onCondInfoSettngCallback(nodeData = null) {
      // 창닫음(X버튼 or 닫기 클릭시)
      if (nodeData && nodeData !== 'Close') {
        // 저장 버튼을 통해 들어오는 경우
        this.inputData.selectCondCdList = nodeData.data
        const chagnedData = nodeData.changed

        // 그리드 추가
        if (chagnedData.created.length > 0) {
          const insertDataList = []
          chagnedData.created.forEach(insertData => {
            let temp = true
            // 신규 추가 된 데이터는 무조건 create 로 들어오기 때문에 삭제된 데이터는 걸러주는 작업이 필요함.
            chagnedData.removed.forEach(deleteData => {
              if (deleteData.__id === insertData.__id) { // eslint-disable-line no-underscore-dangle
                temp = false
              }
            })
            if (temp) {
              insertDataList.push(insertData)
            }
          })
          this.inputData.insertCondCdList = insertDataList
        }
        // 그리드 수정
        if (chagnedData.updated.length > 0) {
          const updateDataList = []
          chagnedData.updated.forEach(updateData => {
            updateDataList.push(updateData)
          })
          this.inputData.updateCondCdList = updateDataList
        }
        // 그리드 삭제
        if (chagnedData.removed.length > 0) {
          const deleteDataList = []

          // 그리드의 모든 행위가 저장된 데이터 배열 만들기
          const arrRemove = Object.entries(nodeData.dataMap).map(arr => ({
            key: arr[0],
            data: arr[1],
          }))

          chagnedData.removed.forEach(deleteData => {
            arrRemove.forEach(ar => {
              // 실제 DB에 저장되어있는 조건정보설정 값만 삭제
              if (typeof ar.data.condSeq !== 'undefined' && ar.key === deleteData.__id) { // eslint-disable-line no-underscore-dangle
                deleteDataList.push(ar.data)
              }
            })
          })
          this.inputData.deleteCondCdList = deleteDataList
        }

        if (nodeData.data.length === 1) {
          // 단건입력
          this.inputData.occrCondNm = nodeData.data[0].condNm
        } else if (nodeData.data.length > 1) {
          // 다건입력
          this.inputData.occrCondNm = `${nodeData.data[0].condNm} 외 ${nodeData.data.length - 1}건`
        } else {
          // 아무것도 입력 안하고 저장
          this.inputData.occrCondNm = ''
        }
      }
    },

    // condValue 배열형태의 값을 text(,) 형태로 변환(checkBox 형태의 값이 없어서 사용 안함.)
    chgTxtCode(obj) {
      const condValueList = obj.condValue
      // condValue 형태가 array형태이면
      if (Array.isArray(condValueList)) {
        for (let i = 0; i < condValueList.length; i += 1) {
          if (obj.condCd === '04') {
            // eslint-disable-next-line no-param-reassign
            obj.condValue = condValueList.join(',')
          }
        }
      }
      return obj
    },

    // Ux Writing 관리 목록으로 이동
    onClickList() {
      const params = utils.getParameter(this, 'params')
      delete params.publctId
      utils.goPage('PGE_AAB_00029', { params })
    },

    /**
     * 저장
     */
    onClickSave() {
      // 유효성 체크
      if (!this.isValidation()) {
        return
      }
      const confirm = () => {
        // 수정하시겠습니까?
        utils.messageBox('confirm', this.$t('MSG_ALT_MDFC'), null, () => {
          // 파람데이터 만들기
          const inputParam = {
            publctId: this.publctId,
            parkKindCd: this.inputData.parkKindCd.toString(),
            visitStatusCd: this.inputData.visitStatusCd.toString(),
            langKindCd: this.inputData.langKindCd.toString(),
            exposrYn: this.inputData.exposrYn,
            exposrDescrt: this.inputData.exposrDescrt,
            exposrDescrt2: this.inputData.exposrDescrt2,
            exposrDescrt3: this.inputData.exposrDescrt3,
            exposrPeriodStartDtm: this.inputData.exposrPeriodStartDtm,
            exposrPeriodEndDtm: this.inputData.exposrPeriodEndDtm,
            connUrl: this.inputData.connUrl,
            insertCondCdList: this.inputData.insertCondCdList,
            updateCondCdList: this.inputData.updateCondCdList,
            deleteCondCdList: this.inputData.deleteCondCdList,
          }
          http.request(this.$options.name, 'DTS_AAD_00005', {
            data: inputParam,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
            this.onClickList() // 목록으로 이동..
          })
        })
      }

      if (this.inputData.connUrl.startsWith('http://')) {
        // HTTP로 등록시 보안상 이슈가 발생할 수 있으니, 확인 후 등록 바랍니다.
        utils.messageBox('warning', this.$t('MSG_TXT_IAA_HTTP_WARNING'), null, () => {
          confirm()
        })
      } else {
        confirm()
      }
    },

    // 유효성 체크
    isValidation() {
      const reVal = true

      // 게시구분
      if (utils.isEmpty(this.inputData.parkKindCd)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PUBLCT_KIND'))
        utils.messageBox('warning', msg)
        return false
      }

      // 방문상태
      if (utils.isEmpty(this.inputData.visitStatusCd)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_VST_STTS'))
        utils.messageBox('warning', msg)
        return false
      }

      // 노출여부
      if (utils.isEmpty(this.inputData.exposrYn)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EXPOSR_YN'))
        utils.messageBox('warning', msg)
        return false
      }

      // 노출기간
      const { exposrPeriod, exposrPeriodOld } = this.inputData
      if (!this.$refs.exposrPeriod.isValid()) {
        return false
      }
      if (utils.isEmpty(this.publctId)
       && moment(exposrPeriod[0]).isBefore(utils.now())) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_EXPOSR_PERIOD')) // 노출기간의의 과거일자는 선택할 수 없습니다.
        utils.messageBox('warning', msg)
        return false
      }
      if (utils.getDayOffset(exposrPeriodOld[0], exposrPeriod[0]) !== 0
       && moment(exposrPeriod[0]).isBefore(utils.now())
      ) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_EXPOSR_PERIOD')) // 노출기간의의 과거일자는 선택할 수 없습니다.
        utils.messageBox('warning', msg)
        return false
      }
      if (utils.getDayOffset(exposrPeriodOld[1], exposrPeriod[1]) !== 0
       && moment(exposrPeriod[1]).isBefore(utils.now())
      ) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_EXPOSR_PERIOD')) // 노출기간의의 과거일자는 선택할 수 없습니다.
        utils.messageBox('warning', msg)
        return false
      }

      // 언어구분
      if (utils.isEmpty(this.inputData.langKindCd)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_LANG_DIV'))
        utils.messageBox('warning', msg)
        return false
      }

      // 노출문구
      if (!this.$rules.validate(this.$refs.exposrDescrt)) {
        return false
      }
      if (utils.isEmpty(this.inputData.exposrDescrt)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EXPOSR_TXT'))
        utils.messageBox('warning', msg)
        return false
      }

      return reVal
    },
  },
}
</script>
<style scoped>
</style>
