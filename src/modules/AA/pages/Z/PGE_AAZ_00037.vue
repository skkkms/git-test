<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 노출 정보 탭 메뉴-->
      <div class="comm_title_wrap">
        <h4>
          노출 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="게시 구분"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          에버랜드
        </ur-form-item>
        <ur-form-item
          label="혜택 분류"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          체험프로그램
        </ur-form-item>
        <ur-form-item
          label="노출 여부"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          Y
        </ur-form-item>
        <ur-form-item
          label="노출 순서"
          :label-align="'right'"
          style="width:50%; height:auto;"
          class="flex_wrap"
        >
          3
        </ur-form-item>
        <ur-form-item
          label="앱 노출 기간"
          :label-align="'right'"
          style="width:50%; height:auto;"
          class="flex_wrap"
        >
          2022-11-13 10:00 ~ 2022-12-13 22:00
        </ur-form-item>
        <ur-form-item
          label="기간 표시 정보"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          2022-11-13 ~ 2022-12-13
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 노출 정보 탭 메뉴-->

      <!-- S :: 혜택 상세 정보 -->
      <div class="comm_title_wrap mt20">
        <h4>
          혜택 상세 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="제목"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          로스트밸리 스페셜 투어
        </ur-form-item>
        <ur-form-item
          label="소제목"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          소형 수륙양용차를 타고 전문 사육사와 함께 "나쿠펜다!"를 외치며 동물에 대한 사랑을 배워 보아요!
        </ur-form-item>
        <ur-form-item
          label="내용"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <img
            src="/images/food/food_1.png"
            alt=""
          >
        </ur-form-item>
        <ur-form-item
          label="썸네일 이미지"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          로스트밸리 스페셜 투어_썸네일 이미지.jpg
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 공지 상세 정보 -->


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
  name: 'PGE_AAZ_00037', // eslint-disable-line vue/name-property-casing
  components: {

  },
  data() {
    return {
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
  mounted() { },
  methods: {

  },
}
</script>
<style scoped>
</style>
