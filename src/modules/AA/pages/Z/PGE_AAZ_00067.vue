<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: QR 통합 조회 탭-->
      <ur-form-box toggleable>
        <ur-form-item
          label="QR Code"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            value="EL50011035C6A01383"
            style="width:100%; height:auto;"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button>
            초기화
          </ur-button>
          <ur-button
            color="violet"
          >
            검색
          </ur-button>
        </div>
      </div>
      <!-- E :: QR 통합 조회 탭-->

      <!-- S :: Stock -->
      <div class="comm_btn_wrap mt45">
        <div class="comm_title_wrap">
          <h4>
            Stock
          </h4>
        </div>
        <div class="right_box">
          <span class="subscript_txt mr16 mt10">
            *엑셀다운로드 시 목록에 있는 데이터가 하나의 엑셀로 다운로드 됩니다.
          </span>
          <ur-button>
            <ur-icon
              icon="download"
              icon-type="line"
              size="small"
              spacing
            />
            엑셀다운로드
          </ur-button>
        </div>
      </div>
      <ur-data-grid
        ref="grid01"
        :headers="columns01"
        :data-source="list01"
        :options="opts"
        :data-set-options="{id: 'id'}"
        class="custom_grid_pgeNav_None"
      />
      <!-- E :: Stock -->

      <!-- S :: Vaild -->
      <div class="comm_btn_wrap mt45">
        <div class="left_box">
          <div class="comm_title_wrap">
            <h4>
              Vaild
            </h4>
          </div>
        </div>
      </div>
      <ur-data-grid
        ref="grid02"
        :headers="columns02"
        :data-source="list02"
        :options="opts"
        :data-set-options="{id: 'id'}"
        class="custom_grid_pgeNav_None"
      />
      <!-- E :: Vaild -->

      <!-- S :: Vaild Item -->
      <div class="comm_btn_wrap mt45">
        <div class="left_box">
          <div class="comm_title_wrap">
            <h4>
              Vaild Item
            </h4>
          </div>
        </div>
      </div>
      <ur-data-grid
        ref="grid03"
        :headers="columns03"
        :data-source="list03"
        :options="opts"
        :data-set-options="{id: 'id'}"
        class="custom_grid_pgeNav_None"
      />
      <!-- E :: Vaild Item -->

      <!-- S :: Active -->
      <div class="comm_btn_wrap mt45">
        <div class="left_box">
          <div class="comm_title_wrap">
            <h4>
              Active
            </h4>
          </div>
        </div>
      </div>
      <ur-data-grid
        ref="grid04"
        :headers="columns04"
        :data-source="list04"
        :options="opts"
        :data-set-options="{id: 'id'}"
        class="custom_grid_pgeNav_None"
      />
      <!-- E :: Active -->

      <!-- S :: Active Proc-->
      <div class="comm_btn_wrap mt45">
        <div class="left_box">
          <div class="comm_title_wrap">
            <h4>
              Active Proc
            </h4>
          </div>
        </div>
      </div>
      <ur-data-grid
        ref="grid05"
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
  name: 'PGE_AAZ_00067', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {

      // 테이블
      opts: { // 토탈o
        height: 110,
        pagination: true,
        noInfo: true,
      },

      // Stock 테이블
      columns01: [
        {
          text: 'No.', value: 'value1', width: 60, align: 'center',
        },
        {
          text: 'QR Code',
          value: 'value2',
          width: 150,
        },
        {
          text: '통합티켓 ID',
          value: 'value3',
          width: 150,

        },
        {
          text: '티켓구분',
          value: 'value4',
          width: 120,
        },
        { text: 'Stock구분', value: 'value5', width: 100 },
        {
          text: '연령구분', value: 'value6', width: 100,
        },
        {
          text: '입장이용구분', value: 'value7', width: 150,
        },
        {
          text: '발행일자', value: 'value8', width: 100,
        },
        {
          text: '사용여부', value: 'value9', width: 100,
        },
        {
          text: '사용일자', value: 'value10', width: 100,
        },
        {
          text: '사용시간', value: 'value11', width: 100,
        },
        {
          text: '연결Key값', value: 'value12', width: 100,
        },
        {
          text: '등록자', value: 'value13', width: 90,
        },
        {
          text: '등록일시', value: 'value14', width: 100,
        },
        {
          text: '수정자', value: 'value15', width: 120,
        },
        {
          text: '수정일시', value: 'value16',
        },
      ],

      // Stock 테이블 data
      list01: [

      ],


      // Vaild 테이블
      columns02: [
        {
          text: 'No.', value: 'value1', width: 60, align: 'center',
        },
        {
          text: 'QR Code',
          value: 'value2',
          width: 150,
        },
        {
          text: '순번',
          value: 'value3',
          width: 80,

        },
        {
          text: '통합티켓 ID',
          value: 'value4',
          width: 200,
        },
        { text: '앱노출상품요약상품명', value: 'value5', width: 200 },
        {
          text: '환불여부', value: 'value6', width: 100,
        },
        {
          text: '매출처리대상여부', value: 'value7', width: 150,
        },
        {
          text: '판매채널구분', value: 'value8', width: 120,
        },
        {
          text: '입장시간코드', value: 'value9', width: 100,
        },
        {
          text: '연속사용일수', value: 'value10', width: 120,
        },
        {
          text: '연결Key값', value: 'value11', width: 250,
        },
        {
          text: '홈페이지 ID', value: 'value12', width: 130,
        },
        {
          text: '유효시작일자', value: 'value13', width: 120,
        },
        {
          text: '유효종료일자', value: 'value14', width: 120,
        },
        {
          text: '비유효시작일자1', value: 'value15', width: 120,
        },
        {
          text: '비유효종료일자1', value: 'value16', width: 120,
        },
        {
          text: '비유효시작일자2', value: 'value17', width: 120,
        },
        {
          text: '비유효종료일자2', value: 'value18', width: 120,
        },
        {
          text: 'ACTIVE처리대상여부', value: 'value19', width: 200,
        },
        {
          text: '주중/주말구분', value: 'value20', width: 120,
        },
        {
          text: '프로모션여부', value: 'value21', width: 120,
        },
        {
          text: 'IF_YN', value: 'value22', width: 120,
        },
        {
          text: 'IF_DTM', value: 'value23', width: 120,
        },
        {
          text: 'IF_MSG', value: 'value24', width: 120,
        },
        {
          text: '등록자', value: 'value25', width: 120,
        },
        {
          text: '등록일시', value: 'value26', width: 150,
        },
        {
          text: '수정자', value: 'value27', width: 120,
        },
        {
          text: '수정일시', value: 'value28', width: 150,
        },
      ],

      // Vaild 테이블 data
      list02: [
        {
          value1: '1', value2: 'EL50011035C6A01383', value3: '1', value4: 'EL50011035C6A01383', value5: 'E/L선물용종일(~22/12/31)', value6: 'N', value7: '대상', value8: '모바일특판', value9: 'A000', value10: '1', value11: '20221118C100Y060100001', value12: '-', value13: '20221118', value14: '20221118', value15: '-', value16: '-', value17: '-', value18: '-', value19: 'N', value20: 'WA', value21: 'N', value22: 'Y', value23: '-', value24: '-', value25: 'TRN_0289', value26: '2022-11-18 08:16:02', value27: 'TRN_0289', value28: '2022-11-18 08:16:02',
        },
      ],


      // Vaild Item 테이블
      columns03: [
        {
          text: 'No.', value: 'value1', width: 60, align: 'center',
        },
        {
          text: 'Vaild 순번',
          value: 'value2',
          width: 100,
        },
        {
          text: 'Item 순번',
          value: 'value3',
          width: 100,

        },
        {
          text: '상품코드',
          value: 'value4',
          width: 120,
        },
        { text: '상품명', value: 'value5', width: 250 },
        {
          text: '패키지상품명', value: 'value6', width: 200,
        },
        {
          text: '연령구분코드', value: 'value7', width: 150,
        },
        {
          text: '이용구분코드', value: 'value8', width: 120,
        },
        {
          text: '판매금액', value: 'value9', width: 100,
        },
        {
          text: 'EP대상여부', value: 'value10', width: 120,
        },
        {
          text: '1회입장인원수', value: 'value11', width: 120,
        },
        {
          text: '등록자', value: 'value12', width: 120,
        },
        {
          text: '등록일시', value: 'value13', width: 150,
        },
        {
          text: '수정자', value: 'value14', width: 120,
        },
        {
          text: '수정일시', value: 'value15', width: 150,
        },
      ],

      // Vaild Item 테이블 data
      list03: [
        {
          value1: '1', value2: '1', value3: '1', value4: '1002071475', value5: 'E/L 이용관_변동가격 제외 1,대인,종일', value6: 'E/L선물용종일(~22/12/31)', value7: 'B000', value8: '01', value9: '39,000', value10: 'Y', value11: '1', value12: 'TRN_0289', value13: '2022-11-18 08:16:02', value14: 'TRN_0289', value15: '2022-11-18 08:16:02',
        },
      ],

      // Active 테이블
      columns04: [
        {
          text: 'No.', value: 'value1', width: 60, align: 'center',
        },
        {
          text: '입장일자',
          value: 'value2',
          width: 100,
        },
        {
          text: 'QR Code',
          value: 'value3',
          width: 200,

        },
        {
          text: 'Active 순번',
          value: 'value4',
          width: 100,
        },
        { text: 'Vaild 순번', value: 'value5', width: 100 },
        {
          text: '입장일자', value: 'value6', width: 120,
        },
        {
          text: '입장시간', value: 'value7', width: 120,
        },
        {
          text: '입장게이트번호', value: 'value8', width: 120,
        },
        {
          text: '입장취소여부', value: 'value9', width: 100,
        },
        {
          text: '배치반영여부', value: 'value10', width: 100,
        },
        {
          text: '배치반영일시', value: 'value11', width: 150,
        },
        {
          text: '배치반영메세지', value: 'value12', width: 120,
        },
        {
          text: '연령구분', value: 'value13', width: 100,
        },
        {
          text: '판매금액', value: 'value14', width: 100,
        },
        {
          text: '등록자', value: 'value15', width: 120,
        },
        {
          text: '등록일시', value: 'value16', width: 150,
        },
        {
          text: '수정자', value: 'value17', width: 120,
        },
        {
          text: '수정일시', value: 'value18', width: 150,
        },

      ],

      // Active 테이블 data
      list04: [
        {
          value1: '1', value2: '2022-11-27', value3: 'EL50011154019BF4D3', value4: '1', value5: '1', value6: '2022-11-27', value7: '10:03:53', value8: 'C100V220122', value9: 'N', value10: 'Y', value11: '2022-11-27 10:03:55', value12: '-', value13: '-', value14: '-', value15: 'TRN_0289', value16: '2022-11-18 08:16:02', value17: 'TRN_0289', value18: '2022-11-18 08:16:02',
        },
      ],


      // Active Proc 테이블
      columns05: [
        {
          text: 'No.', value: 'value1', width: 60, align: 'center',
        },
        {
          text: 'QR Code',
          value: 'value2',
          width: 150,
        },
        {
          text: '순번',
          value: 'value3',
          width: 80,

        },
        {
          text: '매출처리구분',
          value: 'value4',
          width: 100,
        },
        {
          text: '판매처리구분',
          value: 'value5',
          width: 100,
        },
        {
          text: '연결Key값',
          value: 'value6',
          width: 250,
          component: {
            template: '<div><ur-button text="20221127C100V22012200049" style="padding-left:0" shape="hyperlink"></ur-button></div>',
          },
        },
        {
          text: '매출처리일시', value: 'value7', width: 200,
        },
        {
          text: '에러메세지', value: 'value8', width: 300,
        },
        {
          text: '등록자', value: 'value9', width: 120,
        },
        {
          text: '등록일시', value: 'value10', width: 150,
        },
        {
          text: '수정자', value: 'value11', width: 120,
        },
        {
          text: '수정일시', value: 'value12', width: 150,
        },

      ],

      // Active Proc 테이블 data
      list05: [
        {
          value1: '1', value2: 'EL50011154019BF4D3', value3: '1', value4: '대상', value5: '모바일특판', value6: '', value7: '2022-11-27 10:03:57', value8: '-', value9: 'TRN_0289', value10: '2022-11-18 08:16:02', value11: 'TRN_0289', value12: '2022-11-18 08:16:02',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
  },
  methods: {
  },
}
</script>
<style scoped>
</style>
