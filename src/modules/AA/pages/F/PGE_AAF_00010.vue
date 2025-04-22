<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: QR 통합 조회 -->
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_QR_CODE01')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
          required
        >
          <ur-text-field
            ref="textFieldEngNum"
            v-model="params.qrCd"
            style="width:30%; height:auto;"
            maxlength="50"
            @input="onKeyUpInputEl"
            @keyup.enter="onSearch"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="onReset">
            {{ $t('MSG_BTN_RESET') }}
          </ur-button>
          <ur-button
            v-permission:excel="$options.name"
            color="violet"
            @click="onSearch"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </ur-button>
        </div>
      </div>
      <!-- S :: Stock -->
      <div class="comm_btn_wrap mt45 mb0">
        <div class="left_box">
          <div class="comm_title_wrap">
            <h4>
              {{ $t('MSG_TXT_STOCK') }}
            </h4>
          </div>
        </div>
      </div>
      <ur-data-grid
        :headers="columns01"
        :data-source="list01"
        :options="opts"
        :data-set-options="{id: 'id'}"
        class="custom_grid_pgeNav_None"
      />
      <!-- E :: Stock -->

      <!-- S :: Valid -->
      <div class="comm_btn_wrap mt45 mb0">
        <div class="left_box">
          <div class="comm_title_wrap">
            <h4>
              {{ $t('MSG_TXT_VAILD') }}
            </h4>
          </div>
        </div>
      </div>
      <ur-data-grid
        :headers="columns02"
        :data-source="list02"
        :options="opts"
        :data-set-options="{id: 'id'}"
        class="custom_grid_pgeNav_None"
      />
      <!-- E :: Valid -->

      <!-- S :: Valid Item -->
      <div class="comm_btn_wrap mt45 mb0">
        <div class="left_box">
          <div class="comm_title_wrap">
            <h4>
              {{ $t('MSG_TXT_VAILD_ITEM') }}
            </h4>
          </div>
        </div>
      </div>
      <ur-data-grid
        :headers="columns03"
        :data-source="list03"
        :options="opts"
        :data-set-options="{id: 'id'}"
        class="custom_grid_pgeNav_None"
      />
      <!-- E :: Valid Item -->

      <!-- S :: Valid Event -->
      <div class="comm_btn_wrap mt45 mb0">
        <div class="left_box">
          <div class="comm_title_wrap">
            <h4>
              {{ $t('MSG_TXT_VAILD_EVENT') }}
            </h4>
          </div>
        </div>
      </div>
      <ur-data-grid
        :headers="columns06"
        :data-source="list06"
        :options="opts"
        :data-set-options="{id: 'id'}"
        class="custom_grid_pgeNav_None"
      />
      <!-- E :: Valid Event -->

      <!-- S :: Active -->
      <div class="comm_btn_wrap mt45 mb0">
        <div class="left_box">
          <div class="comm_title_wrap">
            <h4>
              {{ $t('MSG_TXT_OBJ01') }}
            </h4>
          </div>
        </div>
      </div>
      <ur-data-grid
        :headers="columns04"
        :data-source="list04"
        :options="opts"
        :data-set-options="{id: 'id'}"
        class="custom_grid_pgeNav_None"
      />
      <!-- E :: Active -->

      <!-- S :: Active Event-->
      <div class="comm_btn_wrap mt45 mb0">
        <div class="left_box">
          <div class="comm_title_wrap">
            <h4>
              {{ $t('MSG_TXT_ACTIVE_EVENT') }}
            </h4>
          </div>
        </div>
      </div>
      <ur-data-grid
        :headers="columns07"
        :data-source="list07"
        :options="opts"
        :data-set-options="{id: 'id'}"
        class="custom_grid_pgeNav_None"
      />
      <!-- E :: Active Event-->

      <!-- S :: Active Proc-->
      <div class="comm_btn_wrap mt45 mb0">
        <div class="left_box">
          <div class="comm_title_wrap">
            <h4>
              {{ $t('MSG_TXT_OBJ_PRO') }}
            </h4>
          </div>
        </div>
      </div>
      <ur-data-grid
        :headers="columns05"
        :data-source="list05"
        :options="opts"
        :data-set-options="{id: 'id'}"
        class="custom_grid_pgeNav_None"
      />
      <!-- E :: Active Proc-->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAF_00010', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      dataSet: new this.$ur.grid.DataSet(),
      alertFlag: true,
      params: {
        qrCd: '',
      },

      // 테이블
      opts: { // 토탈o
        height: 195,
        noInfo: true,
        selectCheckOnly: true,
        resizableColumn: true,
      },

      CODE_KEYS: [
        'COD_RS_USE',
        'COD_IA_ACTIVE_PROC_SAL_PROC_FG',
        'COD_POPS_M0001',
      ],
      codes: {
        COD_RS_USE: [],
        COD_IA_ACTIVE_PROC_SAL_PROC_FG: [],
        COD_POPS_M0001: [],
      },

      // Stock 테이블
      columns01: [
        { text: this.$t('MSG_TXT_NUMBER_ROW'), customValue: (v, r) => r.__idx + 1, width: 50 }, // No.
        {
          text: this.$t('MSG_TXT_QR_CODE01'), value: 'qrCd', width: 150, customValue: v => (v || '-'),
        }, // QR Code
        {
          text: this.$t('MSG_TXT_PTICKET_ID_01'), value: 'sticketId', width: 150, customValue: v => (v || '-'),
        }, // 통합티켓 Id
        {
          text: this.$t('MSG_TXT_TICKET_KIND'), value: 'ticketFgNm', width: 100, customValue: v => (v || '-'),
        }, // 티켓구분
        {
          text: this.$t('MSG_TXT_STOCKKIND'), value: 'stockFgNm', width: 100, customValue: v => (v || '-'),
        }, // Stock구분
        {
          text: this.$t('MSG_TXT_AGE_KIND'), value: 'ageFgCdNm', width: 100, customValue: v => (v || '-'),
        }, // 연령구분
        {
          text: this.$t('MSG_TXT_ENTRANCE_PASS'), value: 'useFgNm', width: 120, customValue: v => (v || '-'),
        }, // 입장이용구분
        // 발행일자
        {
          text: this.$t('MSG_TXT_PBL_DT'),
          value: 'issueDt',
          width: 100,
          customValue: v => {
            v = utils.dateformatToClient(v)
            return v || '-'
          },
        },
        {
          text: this.$t('MSG_TXT_DTST_USE_YN'),
          value: 'useYn',
          width: 100,
          customValue: (value, row) => {
            const code = this.codes.COD_RS_USE.find(v => v.codeId === value)
            const v = code ? code.codeName : ''
            return v || '-'
          },
        }, // 사용여부
        // 사용일자
        {
          text: this.$t('MSG_TXT_USING_DT'),
          value: 'validDt',
          width: 100,
          customValue: v => {
            v = utils.dateformatToClient(v)
            return v || '-'
          },
        },
        {
          text: this.$t('MSG_TXT_USING_TM'),
          value: 'validTm',
          width: 100,
          customValue: HHMMSS => {
            if (utils.isEmpty(HHMMSS)) return ''
            const HH = HHMMSS.substr(0, 2)
            const MM = HHMMSS.substr(2, 2)
            const SS = HHMMSS.substr(4, 2)

            return utils.isEmpty(HH) || utils.isEmpty(MM) || utils.isEmpty(SS) ? '' : `${HH}:${MM}:${SS}`
          },
        }, // 사용시간
        {
          text: this.$t('MSG_TXT_KRY'), value: 'refKey', width: 100, customValue: v => (v || '-'),
        }, // 연결Key값
        {
          text: this.$t('MSG_TXT_FST_RGST_USR'), value: 'regEmpId', width: 90, customValue: v => (v || '-'),
        }, // 등록자
        {
          text: this.$t('MSG_TXT_FST_RGST_DTM'), value: 'regDtm', width: 100, customValue: v => (v || '-'),
        }, // 등록일시
        {
          text: this.$t('MSG_TIT_MDFC_USR'), value: 'mdfEmpId', width: 120, customValue: v => (v || '-'),
        }, // 수정자
        { text: this.$t('MSG_TXT_FNL_MDFC_DTM'), value: 'mdfDtm', width: 150, customValue: v => (v || '-') }, // 수정일시
      ],

      // Stock 테이블 data
      list01: [
      ],


      // Valid 테이블 data
      list02: [
      ],

      // Valid Item 테이블
      columns03: [
        { text: this.$t('MSG_TXT_NUMBER_ROW'), customValue: (v, r) => r.__idx + 1, width: 50 }, // No.
        {
          text: this.$t('MSG_TXT_VAILD_SN'), value: 'validSeq', width: 100, customValue: v => (v || '-'),
        }, // Valid 순번
        {
          text: this.$t('MSG_TXT_ITEM_SN'), value: 'itemSeq', width: 100, customValue: v => (v || '-'),
        }, // Item 순번
        {
          text: this.$t('MSG_TXT_PRDT_CODE'), value: 'itemCd', width: 120, customValue: v => (v || '-'),
        }, // 상품코드
        {
          text: this.$t('MSG_TXT_PRDT_NM'), value: 'itemNm', width: 200, customValue: v => (v || '-'),
        }, // 상품명
        {
          text: this.$t('MSG_TXT_PACKAGE_PRDT_CODE'), value: 'ppackNm', width: 200, customValue: v => (v || '-'),
        }, // 패키지상품명
        {
          text: this.$t('MSG_TXT_AGE_KIND_CODE'), value: 'ageFgCd', width: 150, customValue: v => (v || '-'),
        }, // 연령구분코드
        {
          text: this.$t('MSG_TXT_USE_KIND_CODE'), value: 'useFgCd', width: 120, customValue: v => (v || '-'),
        }, // 이용구분코드
        {
          text: this.$t('MSG_TXT_SALE_AMT'), value: 'salesAmt', width: 100, customValue: v => (v ? utils.numberFormat(v) : '-'),
        }, // 판매금액
        {
          text: this.$t('MSG_TXT_EP_OBJ_YN'), value: 'ticketEpYn', width: 120, customValue: v => (v || '-'),
        }, // EP대상여부
        {
          text: this.$t('MSG_TXT_IAM_ENTRANCE_ONCE_PERSONS'), value: 'realEnterCnt', width: 120, customValue: v => (v || '-'),
        }, // 1회입장인원수
        {
          text: this.$t('MSG_TXT_FST_RGST_USR'), value: 'regEmpId', width: 120, customValue: v => (v || '-'),
        }, // 등록자
        {
          text: this.$t('MSG_TXT_FST_RGST_DTM'), value: 'regDtm', width: 150, customValue: v => (v || '-'),
        }, // 등록일시
        {
          text: this.$t('MSG_TIT_MDFC_USR'), value: 'mdfEmpId', width: 120, customValue: v => (v || '-'),
        }, // 수정자
        {
          text: this.$t('MSG_TXT_MDFC_DTM'), value: 'mdfDtm', width: 150, customValue: v => (v || '-'),
        }, // 수정일시
      ],

      // Valid Item 테이블 data
      list03: [
      ],

      // Active 테이블
      columns04: [
        { text: this.$t('MSG_TXT_NUMBER_ROW'), customValue: (v, r) => r.__idx + 1, width: 50 }, // No.
        {
          text: this.$t('MSG_TXT_QR_CODE01'), value: 'qrCd', width: 150, customValue: v => (v || '-'),
        }, // QR Code
        {
          text: this.$t('MSG_TXT_ACTIVE_SN'), value: 'activeSeq', width: 100, customValue: v => (v || '-'),
        }, // Activw 순번
        {
          text: this.$t('MSG_TXT_VAILD_SN'), value: 'validSeq', width: 100, customValue: v => (v || '-'),
        }, // vaild 순번
        // 입장일자
        {
          text: this.$t('MSG_TXT_ENTR_D'),
          value: 'enterDt',
          width: 120,
          customValue: v => {
            v = utils.dateformatToClient(v)
            return v || '-'
          },
        },
        // 입장시간  EL1001PZMNN42I0U
        {
          text: this.$t('MSG_TXT_ENTR_TIME'),
          value: 'enterTm',
          width: 120,
          customValue: (val, row) => {
            let ev = val ?? ''
            if (ev.length === 6) {
              ev = `${ev.substring(0, 2)}:${ev.substring(2, 4)}:${ev.substring(4, 6)}`
            }
            return ev || '-'
          },
        },
        {
          text: this.$t('MSG_TXT_ENTRANCE_GATE_NUMBER'), value: 'enterGateNo', width: 120, customValue: v => (v || '-'),
        }, // 입장게이트번호
        {
          text: this.$t('MSG_TXT_ENTRANCE_CANCEL_YN'), value: 'enterCnclYn', width: 100, customValue: v => (v || '-'),
        }, // 입장취소여부
        {
          text: this.$t('MSG_TXT_BCJB_REFLECTION_YN'), value: 'ifYn', width: 100, customValue: v => (v || '-'),
        }, // 배치반영여부
        // 배치반영일시
        {
          text: this.$t('MSG_TXT_BCJB_REFLECTION_DT'),
          value: 'ifDtm',
          width: 150,
          customValue: v => {
            v = utils.dateformatToClient(v)
            return v || '-'
          },
        },
        {
          text: this.$t('MSG_TXT_BCJB_REFLECTION_MSG'), value: 'ifMsg', width: 120, customValue: v => (v || '-'),
        }, // 배치반영메세지
        {
          text: this.$t('MSG_TXT_AGE_KIND'), value: 'ageFgCd', width: 100, customValue: v => (v || '-'),
        }, // 연령구분
        {
          text: this.$t('MSG_TXT_SALE_AMT'), value: 'salesAmt', width: 100, customValue: v => (v || '-'),
        }, // 판매금액
        {
          text: this.$t('MSG_TXT_ENTERED_PARK_FG'), value: 'enteredParkFg', width: 130, customValue: v => (v || '-'),
        }, // 입장파크구분
        {
          text: this.$t('MSG_TXT_MEMBERSHIP_UID'), value: 'memshpUid', width: 130, customValue: v => (v || '-'),
        }, // 멤버십 ID
        {
          text: this.$t('MSG_TXT_FST_RGST_USR'), value: 'regEmpId', width: 120, customValue: v => (v || '-'),
        }, // 등록자
        {
          text: this.$t('MSG_TXT_FST_RGST_DTM'), value: 'regDtm', width: 150, customValue: v => (v || '-'),
        }, // 등록일시
        {
          text: this.$t('MSG_TIT_MDFC_USR'), value: 'mdfEmpId', width: 120, customValue: v => (v || '-'),
        }, // 수정자
        {
          text: this.$t('MSG_TXT_MDFC_DTM'), value: 'mdfDtm', width: 150, customValue: v => (v || '-'),
        }, // 수정일시

      ],

      // Active 테이블 data
      list04: [
      ],

      // Active Proc 테이블 data
      list05: [
      ],

      // Active Event 테이블 data
      list06: [
      ],

      // Active Event 테이블 data
      list07: [
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // Valid 테이블
    columns02() {
      return [
        { text: this.$t('MSG_TXT_NUMBER_ROW'), customValue: (v, r) => r.__idx + 1, width: 50 }, // No.
        {
          text: this.$t('MSG_TXT_QR_CODE01'), value: 'qrCd', width: 150, customValue: v => (v || '-'),
        }, // QR Code
        {
          text: this.$t('MSG_TXT_SN'), value: 'validSeq', width: 80, customValue: v => (v || '-'),
        }, // 순번
        {
          text: this.$t('MSG_TXT_PTICKET_ID_01'), value: 'sticketId', width: 200, customValue: v => (v || '-'),
        }, // 통합티켓 ID
        {
          text: this.$t('MSG_TXT_APP_EXPOSR_PRDT_NM'), value: 'prodShtNm', width: 200, customValue: v => (v || '-'),
        }, // 앱노출상품요약상품명
        {
          text: this.$t('MSG_TXT_REFUND_YN'), value: 'cnclYn', width: 100, customValue: v => (v || '-'),
        }, // 환불여부
        {
          text: this.$t('MSG_TXT_SALES_PROC_YN'),
          value: 'salProcTgtYn',
          width: 150,
          type: 'code',
          domain: this.codes.COD_IA_ACTIVE_PROC_SAL_PROC_FG,
        }, // 매출처리대상여부
        {
          text: this.$t('MSG_TXT_SLE_CHENAL_DGH'),
          value: 'channelFg',
          width: 120,
          type: 'code',
          domain: this.codes.COD_POPS_M0001,
        }, // 판매채널구분
        {
          text: this.$t('MSG_TXT_ENTR_T_COD'), value: 'enterTmCd', width: 100, customValue: v => (v || '-'),
        }, // 입장시간코드
        {
          text: this.$t('MSG_TXT_CONTIU_USE_DCNT'), value: 'useDay', width: 120, customValue: v => (v || '-'),
        }, // 연속사용일수
        {
          text: this.$t('MSG_TXT_KRY'), value: 'refKey', width: 200, customValue: v => (v || '-'),
        }, // 연결Key값
        /* 20230922 홈페이지 ID 삭제 처리
      {
        text: this.$t('MSG_TXT_HOMEPAGE_ID'), value: 'hpgId', width: 130, customValue: v => (v || '-'),
      }, // 홈페이지 ID
      */
        // 유효시작일자
        {
          text: this.$t('MSG_TXT_VALID_START_DTM'),
          value: 'validFromDt',
          width: 120,
          customValue: v => {
            v = utils.dateformatToClient(v)
            return v || '-'
          },
        },
        // 유효종료일자
        {
          text: this.$t('MSG_TXT_VALID_END_DTM'),
          value: 'validToDt',
          width: 120,
          customValue: v => {
            v = utils.dateformatToClient(v)
            return v || '-'
          },
        },
        // 비유효시작일자1
        {
          text: this.$t('MSG_TXT_NOVALID_START_DTM1'),
          value: 'notinFromDt1',
          width: 120,
          customValue: v => {
            v = utils.dateformatToClient(v)
            return v || '-'
          },
        },
        // 비유효종료일자1
        {
          text: this.$t('MSG_TXT_NOVALID_END_DTM1'),
          value: 'notinToDt1',
          width: 120,
          customValue: v => {
            v = utils.dateformatToClient(v)
            return v || '-'
          },
        },
        // 비유효시작일자2
        {
          text: this.$t('MSG_TXT_NOVALID_START_DTM2'),
          value: 'notinFromDt2',
          width: 120,
          customValue: v => {
            v = utils.dateformatToClient(v)
            return v || '-'
          },
        },
        // 비유효종료일자2
        {
          text: this.$t('MSG_TXT_NOVALID_END_DTM2'),
          value: 'notinToDt2',
          width: 120,
          customValue: v => {
            v = utils.dateformatToClient(v)
            return v || '-'
          },
        },
        {
          text: this.$t('MSG_TXT_ACTIVE_YN'), value: 'activeTgtYn', width: 200, customValue: v => (v || '-'),
        }, // ACTIVE처리대상여부
        {
          text: this.$t('MSG_TXT_WKD_TMOH_KIND'), value: 'weekFg', width: 120, customValue: v => (v || '-'),
        }, // 주중/주말구분
        {
          text: this.$t('MSG_TXT_PROMOTION_YN'), value: 'prmoYn', width: 120, customValue: v => (v || '-'),
        }, // 프로모션여부
        {
          text: this.$t('MSG_TXT_MEMBERSHIP_UID'), value: 'memshpUid', width: 130, customValue: v => (v || '-'),
        }, // 멤버십 ID
        {
          text: this.$t('MSG_TXT_BASE_GRADE'), value: 'gradeTypeCd', width: 130, customValue: v => (v || '-'),
        }, // 기준 Grade
        {
          text: this.$t('IF_YN'), value: 'ifYn', width: 120, customValue: v => (v || '-'),
        }, // IF_YN
        {
          text: this.$t('IF_DTM'), value: 'ifDtm', width: 120, customValue: v => (v || '-'),
        }, // IF_DTM
        {
          text: this.$t('IF_MSG'), value: 'ifMsg', width: 120, customValue: v => (v || '-'),
        }, // IF_MSG
        {
          text: this.$t('MSG_TXT_FST_RGST_USR'), value: 'regEmpId', width: 120, customValue: v => (v || '-'),
        }, // 등록자
        {
          text: this.$t('MSG_TXT_FST_RGST_DTM'), value: 'regDtm', width: 150, customValue: v => (v || '-'),
        }, // 등록일시
        {
          text: this.$t('MSG_TIT_MDFC_USR'), value: 'mdfEmpId', width: 120, customValue: v => (v || '-'),
        }, // 수정자
        {
          text: this.$t('MSG_TXT_MDFC_DTM'), value: 'mdfDtm', width: 150, customValue: v => (v || '-'),
        }, // 수정일시
      ]
    },
    // Active Proc 테이블
    columns05() {
      return [
        { text: this.$t('MSG_TXT_NUMBER_ROW'), customValue: (v, r) => r.__idx + 1, width: 50 }, // No.
        {
          text: this.$t('MSG_TXT_QR_CODE01'), value: 'qrCd', width: 150, customValue: v => (v || '-'),
        }, // QR Code
        {
          text: this.$t('MSG_TXT_SN'), value: 'activeSeq', width: 80, customValue: v => (v || '-'),
        }, // 순번
        {
          text: this.$t('MSG_TXT_SALES_PROC_KIND'),
          value: 'salProcFg',
          width: 100,
          type: 'code',
          domain: this.codes.COD_IA_ACTIVE_PROC_SAL_PROC_FG,
        }, // 매출처리구분
        {
          text: this.$t('MSG_TXT_SLE_KIND'), value: 'channelFgNm', width: 100, customValue: v => (v || '-'),
        }, // 판매처리구분
        { text: this.$t('MSG_TXT_KRY'), value: 'refKey', width: 200 }, // 연결key값
        {
          text: this.$t('MSG_TXT_SALES_PROC_DTM'), value: 'salProcDtm', width: 200, customValue: v => (v || '-'),
        }, // 매출처리일시
        {
          text: this.$t('MSG_TXT_ERROR_MSG'), value: 'errMsg', width: 300, customValue: v => (v || '-'),
        }, // 에러메세지
        {
          text: this.$t('MSG_TXT_FST_RGST_USR'), value: 'regEmpId', width: 120, customValue: v => (v || '-'),
        }, // 등록자
        {
          text: this.$t('MSG_TXT_FST_RGST_DTM'), value: 'regDtm', width: 150, customValue: v => (v || '-'),
        }, // 등록일시
        {
          text: this.$t('MSG_TIT_MDFC_USR'), value: 'mdfEmpId', width: 120, customValue: v => (v || '-'),
        }, // 수정자
        {
          text: this.$t('MSG_TXT_MDFC_DTM'), value: 'mdfDtm', width: 150, customValue: v => (v || '-'),
        }, // 수정일시
      ]
    },

    // Valid Event 테이블
    columns06() {
      return [
        { text: this.$t('MSG_TXT_NUMBER_ROW'), customValue: (v, r) => r.__idx + 1, width: 50 }, // No.
        {
          text: this.$t('MSG_TXT_QR_CODE01'), value: 'qrCd', width: 150, customValue: v => (v || '-'),
        }, // QR Code
        {
          text: this.$t('MSG_TXT_SN'), value: 'validSeq', width: 80, customValue: v => (v || '-'),
        }, // 순번

        {
          text: this.$t('MSG_TXT_PTICKET_ID_01'), value: 'sticketId', width: 150, customValue: v => (v || '-'),
        }, // 통합티켓 Id

        {
          text: this.$t('MSG_TXT_APP_EXPOSR_PRDT_NM'), value: 'prodShtNm', width: 200, customValue: v => (v || '-'),
        }, // 앱노출상품요약상품명
        {
          text: this.$t('MSG_TXT_REFUND_YN'), value: 'cnclYn', width: 100, customValue: v => (v || '-'),
        }, // 환불여부
        {
          text: this.$t('MSG_TXT_SALES_PROC_YN'),
          value: 'salProcTgtYn',
          width: 150,
          type: 'code',
          domain: this.codes.COD_IA_ACTIVE_PROC_SAL_PROC_FG,
        }, // 매출처리대상여부
        {
          text: this.$t('MSG_TXT_SLE_CHENAL_DGH'),
          value: 'channelFg',
          width: 120,
          type: 'code',
          domain: this.codes.COD_POPS_M0001,
        }, // 판매채널구분
        {
          text: this.$t('MSG_TXT_ENTR_T_COD'), value: 'enterTmCd', width: 100, customValue: v => (v || '-'),
        }, // 입장시간코드
        {
          text: this.$t('MSG_TXT_CONTIU_USE_DCNT'), value: 'useDay', width: 120, customValue: v => (v || '-'),
        }, // 연속사용일수
        {
          text: this.$t('MSG_TXT_KRY'), value: 'refKey', width: 250, customValue: v => (v || '-'),
        }, // 연결Key값

        {
          text: this.$t('MSG_TXT_VALID_START_DTM'),
          value: 'validFromDt',
          width: 120,
          customValue: v => {
            v = utils.dateformatToClient(v)
            return v || '-'
          },
        }, // 유효시작일자
        {
          text: this.$t('MSG_TXT_VALID_END_DTM'),
          value: 'validToDt',
          width: 120,
          customValue: v => {
            v = utils.dateformatToClient(v)
            return v || '-'
          },
        }, // 유효종료일자
        {
          text: this.$t('MSG_TXT_ACTIVE_YN'), value: 'activeTgtYn', width: 150, customValue: v => (v || '-'),
        }, // ACTIVE처리대상여부
        {
          text: this.$t('MSG_TXT_MEMBERSHIP_UID'), value: 'memshpUid', width: 130, customValue: v => (v || '-'),
        }, // 멤버십 ID
        {
          text: this.$t('IF_YN'), value: 'ifYn', width: 120, customValue: v => (v || '-'),
        }, // IF_YN
        {
          text: this.$t('IF_DTM'), value: 'ifDtm', width: 120, customValue: v => (v || '-'),
        }, // IF_DTM
        {
          text: this.$t('IF_MSG'), value: 'ifMsg', width: 120, customValue: v => (v || '-'),
        }, // IF_MSG
        {
          text: this.$t('MSG_TXT_FST_RGST_USR'), value: 'regEmpId', width: 120, customValue: v => (v || '-'),
        }, // 등록자
        {
          text: this.$t('MSG_TXT_FST_RGST_DTM'), value: 'regDtm', width: 150, customValue: v => (v || '-'),
        }, // 등록일시
        {
          text: this.$t('MSG_TIT_MDFC_USR'), value: 'mdfEmpId', width: 120, customValue: v => (v || '-'),
        }, // 수정자
        {
          text: this.$t('MSG_TXT_MDFC_DTM'), value: 'mdfDtm', width: 150, customValue: v => (v || '-'),
        }, // 수정일시
      ]
    },
    // Active Event 테이블
    columns07() {
      return [
        { text: this.$t('MSG_TXT_NUMBER_ROW'), customValue: (v, r) => r.__idx + 1, width: 50 }, // No.
        {
          text: this.$t('MSG_TXT_QR_CODE01'), value: 'qrCd', width: 150, customValue: v => (v || '-'),
        }, // QR Code
        {
          text: this.$t('MSG_TXT_ACTIVE_SN'), value: 'activeSeq', width: 100, customValue: v => (v || '-'),
        }, // Activw 순번
        {
          text: this.$t('MSG_TXT_VAILD_SN'), value: 'validSeq', width: 100, customValue: v => (v || '-'),
        }, // vaild 순번
        // 입장일자
        {
          text: this.$t('MSG_TXT_ENTR_D'),
          value: 'enterDt',
          width: 120,
          customValue: v => {
            v = utils.dateformatToClient(v)
            return v || '-'
          },
        },
        // 입장시간  EL1001PZMNN42I0U
        {
          text: this.$t('MSG_TXT_ENTR_TIME'),
          value: 'enterTm',
          width: 120,
          customValue: (val, row) => {
            let ev = val ?? ''
            if (ev.length === 6) {
              ev = `${ev.substring(0, 2)}:${ev.substring(2, 4)}:${ev.substring(4, 6)}`
            }
            return ev || '-'
          },
        },
        {
          text: this.$t('MSG_TXT_ENTRANCE_GATE_NUMBER'), value: 'enterGateNo', width: 120, customValue: v => (v || '-'),
        }, // 입장게이트번호
        {
          text: this.$t('MSG_TXT_ENTRANCE_CANCEL_YN'), value: 'enterCnclYn', width: 100, customValue: v => (v || '-'),
        }, // 입장취소여부
        {
          text: this.$t('MSG_TXT_MEMBERSHIP_UID'), value: 'memshpUid', width: 130, customValue: v => (v || '-'),
        }, // 멤버십 ID
        {
          text: this.$t('MSG_TXT_BCJB_REFLECTION_YN'), value: 'ifYn', width: 100, customValue: v => (v || '-'),
        }, // 배치반영여부
        // 배치반영일시
        {
          text: this.$t('MSG_TXT_BCJB_REFLECTION_DT'),
          value: 'ifDtm',
          width: 150,
          customValue: v => {
            v = utils.dateformatToClient(v)
            return v || '-'
          },
        },
        {
          text: this.$t('MSG_TXT_BCJB_REFLECTION_MSG'), value: 'ifMsg', width: 120, customValue: v => (v || '-'),
        }, // 배치반영메세지
        {
          text: this.$t('MSG_TXT_FST_RGST_USR'), value: 'regEmpId', width: 120, customValue: v => (v || '-'),
        }, // 등록자
        {
          text: this.$t('MSG_TXT_FST_RGST_DTM'), value: 'regDtm', width: 150, customValue: v => (v || '-'),
        }, // 등록일시
        {
          text: this.$t('MSG_TIT_MDFC_USR'), value: 'mdfEmpId', width: 120, customValue: v => (v || '-'),
        }, // 수정자
        {
          text: this.$t('MSG_TXT_MDFC_DTM'), value: 'mdfDtm', width: 150, customValue: v => (v || '-'),
        }, // 수정일시
      ]
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
    http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)

    const params = utils.getParameter(this, 'params')
    this.params.qrCd = params.qrCd ?? ''
  },
  methods: {
    onReset() {
      this.params.qrCd = ''
    },

    onSearch() {
      const query = Object.assign({}, this.params)

      if (utils.isEmpty(this.params.qrCd)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_QR_CODE01')))
        return
      }

      http.request(this.$options.name, 'DTS_AAF_00008', {
        query,
        path: {},
        data: {},
      }).then(res => {
        this.list01 = res.data.stock
        this.list02 = res.data.valid
        this.list03 = res.data.validItem
        this.list04 = res.data.active
        this.list05 = res.data.activeProc
        this.list06 = res.data.validEvt
        this.list07 = res.data.activeEvt
      })
    },

    onKeyUpInputEl(value) { // 영문 / 숫자 입력제한
      const searchFieldNewText = value
      if (utils.isEngNum_(searchFieldNewText) || utils.isEmpty(searchFieldNewText)) {
        this.searchFieldOldText = searchFieldNewText
      } else if (this.alertFlag) {
        this.alertFlag = false
        utils.messageBox('warning', this.$t('영문/숫자만 입력 가능합니다.'), null, () => {
          this.alertFlag = true
          this.params.qrCd = this.searchFieldOldText
          this.$refs.textFieldEngNum.focus()
        })
      }
    },
  },
}
</script>
<style scoped>
</style>
