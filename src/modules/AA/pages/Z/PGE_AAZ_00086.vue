<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <template>
        <div class="comm_title_wrap">
          <h4>
            이벤트 정보
          </h4>
        </div>
        <ur-form-box toggleable>
          <ur-form-item
            label="이벤트 명"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            1월 출석체크
          </ur-form-item>
          <ur-form-item
            label="이벤트 기간"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            2022-10-13 10:00 ~ 2022-11-13 22:00
          </ur-form-item>
          <ur-form-item
            label="노출 여부"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            Y
          </ur-form-item>
        </ur-form-box>
        <div class="comm_title_wrap mt35">
          <h4>
            이벤트 이미지 정보
          </h4>
        </div>
        <ur-form-box toggleable>
          <ur-form-item
            label="상세 배너 이미지"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            1월 출석체크_상세 배너_이미지.jpg
          </ur-form-item>
          <ur-form-item
            label="스탬프 배경 이미지"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            1월 출석체크_스탬프 배경_이미지.jpg
          </ur-form-item>
          <ur-form-item
            label="스탬프 비활성화 이미지"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            1월 출석체크_스탬프_이미지.jpg
          </ur-form-item>
          <ur-form-item
            label="스탬프 활성화 이미지"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            1월 출석체크_스탬프_이미지.jpg
          </ur-form-item>
          <ur-form-item
            label="스페셜 스탬프 비활성화 이미지"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            1월 출석체크_스페셜 스탬프_이미지.jpg
          </ur-form-item>
          <ur-form-item
            label="스페셜 스탬프 활성화 이미지"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            1월 출석체크_스페셜 스탬프_이미지.jpg
          </ur-form-item>
        </ur-form-box>
        <div class="comm_title_wrap mt35">
          <h4>
            보상 정보
          </h4>
        </div>
        <ur-data-grid
          ref="grid"
          :headers="columnsT1"
          :data-source="listT1"
          :options="opts"
          :data-set-options="{id: 'id'}"
        />
      </template>
      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
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
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: 'PGE_AAZ_00086', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 테이블 옵션
      opts: { // 토탈 O
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },


      columnsT1: [
        {
          text: 'No.',
          value: 'value1',
        },
        {
          text: '스페셜 스탬프 여부',
          value: 'value2',
        },
        {
          text: '구분',
          value: 'value3',
        },
        {
          text: '경품명',
          value: 'value4',
        },
        {
          text: '지급쿠폰',
          value: 'value5',
        },
        {
          text: '수량',
          value: 'value6',
        },
        {
          text: '보상일자',
          value: 'value7',
        },
      ],
      listT1: [
        {
          value1: '1', value2: 'Y', value3: '쿠폰', value4: '츄러스 쿠폰', value5: '츄러스 쿠폰', value6: '100', value7: '7일차',
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
