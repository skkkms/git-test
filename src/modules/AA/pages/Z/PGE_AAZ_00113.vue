<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>
          공통코드 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="공통코드 구분"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          M0001
        </ur-form-item>
        <ur-form-item
          label="공통코드 구분명"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          통합티켓구분
        </ur-form-item>
        <ur-form-item
          label="사용여부"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          사용
        </ur-form-item>
        <ur-form-item
          label="코드설명"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          통합티켓ID의 분류구분
        </ur-form-item>
      </ur-form-box>
      <div class="comm_title_wrap mt20">
        <h4>
          하위 공통코드 정보
        </h4>
      </div>
      <ur-data-grid
        ref="grid"
        :headers="columnsT1"
        :data-source="listT1"
        :options="options"
        :data-set-options="{id: 'id'}"
        height="300"
      >
        <div class="bt1 mt10" />
        <sui-page-footer class="comm_btn_wrap">
          <div class="btn_wrap">
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
          </div>
        </sui-page-footer>
      </ur-data-grid>
      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="right_box">
            <ur-button
              color="violet"
            >
              수정
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAZ_00112', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 라디오 버튼
      R1: 'Radio 01',

      // 하위 공통코드 정보 테이블 드롭다운
      T1D1: null,
      T1d2: null,

      // 테이블
      options: { // 토탈X 체크X
        noInfo: true,
      },

      columnsT1: [
        {
          text: 'No.',
          value: 'value1',
          width: 60,
        },
        {
          text: '공통코드 구분',
          value: 'value2',
          width: 130,
        },
        {
          text: '공통코드',
          width: 100,
          value: 'value3',
        },
        {
          text: '공통코드명',
          value: 'value4',
          width: 120,
        },
        {
          text: '언어코드',
          value: 'value5',
          width: 120,
        },
        {
          text: '사용여부',
          value: 'value6',
          width: 120,
        },
        {
          text: '정렬순서',
          value: 'value7',
          width: 100,
        },
        {
          text: '코드설명',
          value: 'value8',
        },
        {
          text: '속성1',
          value: 'value9',
        },
        {
          text: '속성2',
          value: 'value10',
        },
        {
          text: '속성3',
          value: 'value11',
        },
        {
          text: '속성4',
          value: 'value12',
        },
        {
          text: '속성5',
          value: 'value13',
        },
      ],
      listT1: [
        {
          value1: '999', value2: 'M0016', value3: '1', value4: '스마트예약', value5: '국문', value6: '사용', value7: '1', value8: 'EXAPI -> POS', value9: '-', value10: '-', value11: '-', value12: '-', value13: '-',
        },
        {
          value1: '999', value2: 'M0016', value3: '1', value4: '스마트예약', value5: '국문', value6: '사용', value7: '1', value8: 'EXAPI -> POS', value9: '-', value10: '-', value11: '-', value12: '-', value13: '-',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    itemT1D1() {
      const rtn = []
      rtn.push({ value: '1', text: '국문' })
      rtn.push({ value: '2', text: '영문' })
      rtn.push({ value: '3', text: '중문(간체)' })
      rtn.push({ value: '4', text: '중문(번체)' })
      return rtn
    },

    itemT1D2() {
      const rtn = []
      rtn.push({ value: '1', text: '사용' })
      rtn.push({ value: '2', text: '미사용' })
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
