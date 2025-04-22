<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="예약번호"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%;"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="QR"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%;"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="주문일자"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-date-picker
            auto-confirm
            input-type="YYYY-MM-DD"
            init="day+30"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="주문접수일자"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-date-picker
            auto-confirm
            input-type="YYYY-MM-DD"
            init="day+30"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="취소일자"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-date-picker
            auto-confirm
            input-type="YYYY-MM-DD"
            init="day+30"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="주문상태"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD1"
            :items="itemsD1"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="전송상태"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD2"
            :items="itemsD2"
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
      <div class="comm_btn_wrap mt35">
        <div class="comm_title_wrap">
          <h4>
            모바일 오더
          </h4>
        </div>
        <div class="right_box">
          <ur-button>
            <ur-icon
              icon="download"
              icon-type="line"
            />
            엑셀다운로드
          </ur-button>
        </div>
      </div>
      <ur-data-grid
        ref="grid01"
        :headers="columnsT1"
        :data-source="listT1"
        :options="opts"
        :data-set-options="{id: 'id'}"
      />
      <div class="comm_title_wrap mt35">
        <h4>
          모바일 오더 상세
        </h4>
      </div>
      <ur-data-grid
        ref="grid02"
        :headers="columnsT2"
        :data-source="listT2"
        :options="opts"
        :data-set-options="{id: 'id'}"
      />
      <div class="comm_title_wrap mt35">
        <h4>
          모바일 오더 재전송 이력
        </h4>
      </div>
      <ur-data-grid
        ref="grid03"
        :headers="columnsT3"
        :data-source="listT3"
        :options="opts1"
        :data-set-options="{id: 'id'}"
      >
        <template #empty-view>
          <div class="custom_grid_type1">
            <div
              class="empty_box"
            >
              * 여러 파일을 선택하여 여기로 드래그 해주세요.
            </div>
          </div>
        </template>
      </ur-data-grid>
      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="right_box">
          <ur-button>
            삭제
          </ur-button>
          <ur-button
            color="violet"
          >
            신규등록
          </ur-button>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAZ_00105', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 드롭다운
      valueD1: '1',
      valueD2: '1',
      valueD3: '1',

      opts: { // 토탈o
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
        height: 300,
      },

      opts1: { // 토탈o
        noInfo: true,
        multiSelect: false,
        selectCheck: true,
        height: 300,
      },

      columnsT1: [
        { text: '매장', value: 'value1' },
        { text: '매장명', value: 'value2' },
        { text: '포스ID', value: 'value3' },
        { text: '포스IP', value: 'value4' },
        { text: '포스명', value: 'value5' },
        { text: '전송상태', value: 'value6' },
        { text: 'ID', value: 'value7' },
        { text: '예약번호', value: 'value8' },
        { text: 'QR', value: 'value9' },
        { text: '주문일자', value: 'value10' },
        { text: '주문시간', value: 'value11' },
        { text: '주문상태', value: 'value12' },
        { text: '주문접수일자', value: 'value13' },
        { text: '주문접수일시', value: 'value14' },
        { text: '주문POS', value: 'value15' },
        {
          text: '주문영수증번호',
          value: 'value16',
          component: {
            template: '<div><ur-button text="20221022C105A23010100072" style="padding-left:0;" shape="hyperlink"></ur-button></div>',
          },
        },
        { text: '주문유형', value: 'value17' },
        { text: '취소일자', value: 'value18' },
        { text: '취소시간', value: 'value19' },
        { text: '취소요청자', value: 'value20' },
        { text: '취소사유', value: 'value21' },
        { text: '취소영수증번호', value: 'value22' },
        { text: '테이블번호', value: 'value23' },
        { text: '예상소요시간', value: 'value24' },
        { text: '연간회원카드번호', value: 'value25' },
        { text: '전송일시', value: 'value26' },
        { text: '비고', value: 'value27' },
        { text: '등록자', value: 'value28' },
        { text: '등록일시', value: 'value29' },
        { text: '수정자', value: 'value30' },
        { text: '수정일시', value: 'value31' },
      ],

      listT1: [
        {
          value1: 'C105A2301',
          value2: '아마존 스낵',
          value3: 'C105A230101',
          value4: '71.16.40.88',
          value5: '아마존 스낵-01',
          value6: '전송완료',
          value7: 'KT##300109289746',
          value8: '2227092236',
          value9: 'EL1001R7029NWXL5',
          value10: '2022-10-22',
          value11: '12:15:31',
          value12: '준비완료',
          value13: '2022-10-22',
          value14: '12:15:35',
          value15: 'C105A230101',
          value16: '',
          value17: '테이블오더',
          value18: '-',
          value19: '-',
          value20: '-',
          value21: '-',
          value22: '-',
          value23: '-',
          value24: '20',
          value25: '20',
          value26: '2022-10-22 12:15:30',
          value27: '-',
          value28: 'KT##30019289746',
          value29: '2022-10-22 12:15:31',
          value30: 'mobile_order_API',
          value31: '2022-10-22 12:32:16',
        },

      ],
      columnsT2: [
        { text: '예약번호', value: 'value1' },
        { text: '메뉴코드', value: 'value2' },
        { text: '메뉴명', value: 'value3' },
        { text: '코너정보', value: 'value4' },
        { text: '수량', value: 'value5' },
        { text: '주문번호', value: 'value6' },
        { text: '등록자', value: 'value7' },
        { text: '등록일시', value: 'value8' },
        { text: '수정자', value: 'value9' },
        { text: '수정일시', value: 'value10' },
      ],

      listT2: [
        {
          value1: '2227092236',
          value2: '1002057749',
          value3: '별난핫DOG/HIT스낵',
          value4: '01',
          value5: '1',
          value6: '9008',
          value7: 'KT##300109289746',
          value8: '2022-10-22 12:15:31',
          value9: 'mobile_order_API',
          value10: '2022-10-22 12:32:16',
        },

      ],
      columnsT3: [
        { text: '예약번호', value: 'value1' },
        { text: 'QR', value: 'value2' },
        { text: '전송상태', value: 'value3' },
        { text: '전송일시', value: 'value4' },
        { text: '등록일시', value: 'value5' },
      ],

      // listT3: [
      //   {
      //     value1: '1',
      //     value2: '1',
      //     value3: '1',
      //     value4: '1',
      //     value5: '1',
      //   },

      // ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '주문접수' })
      rtn.push({ value: '3', text: '사용자주문취소' })
      rtn.push({ value: '3', text: '준비완료' })
      rtn.push({ value: '3', text: '현장주문취소' })
      rtn.push({ value: '3', text: '주문대기' })
      return rtn
    },
    itemsD2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '전송전' })
      rtn.push({ value: '3', text: '전송진행중' })
      rtn.push({ value: '3', text: '전송완료' })
      rtn.push({ value: '3', text: '에러' })
      return rtn
    },
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
