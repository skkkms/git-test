<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- ::S 기본 정보 -->
      <div class="comm_title_wrap">
        <h4>기본 정보</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="콘텐츠 명"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          어린이날
        </ur-form-item>
        <ur-form-item
          label="노출 여부"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          Y
        </ur-form-item>
        <ur-form-item
          label="노출 순서"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          3
        </ur-form-item>
        <ur-form-item
          label="노출 위치"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          추천코스
        </ur-form-item>
        <ur-form-item
          label="언어구분"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          국문
        </ur-form-item>
      </ur-form-box>
      <!-- ::E 기본 정보 -->

      <!-- ::S 대상자 제어 -->
      <div class="comm_title_wrap mt45">
        <h4>대상자 제어</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="방문 횟수"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          0~1회/2~3회
        </ur-form-item>
        <ur-form-item
          label="방문 상태"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          방문 전/방문 후
        </ur-form-item>
        <ur-form-item
          label="티어"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          T1/T2/T3
        </ur-form-item>
      </ur-form-box>
      <!-- ::E 대상자 제어 -->

      <!-- ::S 콘텐츠 관리 -->
      <div class="comm_title_wrap mt45">
        <h4>콘텐츠 관리</h4>
        <div class="title_compo">
          <ur-radio
            v-model="R2"
            value="Radio 01"
            sm
            disabled
          >
            코스
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio 02"
            sm
            disabled
          >
            시설
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio 03"
            sm
            disabled
          >
            스마트 예약
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio 04"
            sm
            disabled
          >
            이벤트
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio 05"
            sm
            disabled
          >
            공지
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio 06"
            sm
            disabled
          >
            URL
          </ur-radio>
        </div>
      </div>
      <!-- ::S 코스팝업 -->
      <ur-data-grid
        ref="grid01"
        :headers="columnsT1"
        :options="options"
        :data-source="listT1"
        :data-set-options="{id: 'id'}"
      />

      <!-- ::S 퍼소나 등록 -->
      <div class="comm_title_wrap mt45">
        <h4>퍼소나 등록</h4>
      </div>
      <!-- ::S 퍼소나테이블 -->
      <ur-data-grid
        ref="grid02"
        :headers="columnsT4"
        :options="opts1"
        :data-source="listT4"
        :data-set-options="{id: 'id'}"
      />
      <!-- ::E 퍼소나테이블 -->

      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button>
              목록
            </ur-button>
          </div>
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
  name: 'PGE_AAZ_00023', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 라디오버튼
      R1: 'Radio 01',
      R2: '',

      // 테이블 옵션
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },

      // 테이블옵션
      opts: {
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
      },

      // 테이블 옵션
      opts1: { // 토탈 x 전체선택X 셀선택 o
        noInfo: true,
        multiSelect: false,
        selectCheck: true,
      },

      // 코스,시설테이블
      columnsT1: [
        { value: 'value1', text: 'No.', width: 100 },
        { value: 'value2', text: '노출 콘텐츠' },
        { value: 'value3', text: '썸네일' },
        // width:num, type:'number','code'
      ],
      listT1: [
        { value1: '1', value2: '행복 100배 어린이날 코스', value3: '코스 이미지 jpg' },
      ],

      // / 퍼소나 등록 테이블
      columnsT4: [
        { value: 'value1', text: 'No.', width: 100 },
        { value: 'value2', text: '퍼소나 유형' },
        { value: 'value3', text: '동반자' },
        { value: 'value4', text: '놀이유형' },
        // width:num, type:'number','code'
      ],
      listT4: [
        {
          value1: '1', value2: '유유자적 사랑꾼 푸바오', value3: '1~4세', value4: '여유와 힐링',
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
