<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S:: 노출정보 -->
      <div class="comm_title_wrap">
        <h4>
          노출 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="게시 구분"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          공통
        </ur-form-item>
        <ur-form-item
          label="이벤트 구분"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          혜택 이벤트
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="이벤트 분류"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          기타 이벤트
        </ur-form-item>
        <ur-form-item
          label="이벤트 명"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          LIVE 나비 체험관 이벤트
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="이벤트 기간"
          :label-align="'right'"
          style="width: 100%; height: auto;"
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
        <ur-form-item
          class="flex_wrap"
          label="노출 순서"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          3
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 노출정보 -->

      <!-- S:: 조건정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          조건 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="참여 조건"
          :label-align="'right'"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          -
        </ur-form-item>
        <ur-form-item
          label="발생 조건"
          :label-align="'right'"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          전체
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 조건정보 -->


      <!-- S:: 이벤트 이미지 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          이벤트 이미지 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="썸네일 이미지"
          :label-align="'right'"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          LIVE 나비 체험관 이벤트_썸네일 이미지.jpg
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 이벤트 이미지 정보 -->

      <!-- S:: 이벤트 상세 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          이벤트 상세 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="내용"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <img
            src="/images/food/food_0.png"
            style="width: fit-content; height: 150px;"
          >
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 이벤트 상세 정보 -->


      <div class="bt1 mt10" />
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
              저장
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAZ_00078', // eslint-disable-line vue/name-property-casing
  components: {

  },
  data() {
    return {
      // 테이블 옵션

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
