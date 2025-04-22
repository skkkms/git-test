<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 노출 정보 -->
      <div class="comm_title_wrap">
        <h4>
          노출 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="게시 구분"
          :label-align="'right'"
          style="width: 100%; height: auto; border: 0;"
        >
          홈브리지
        </ur-form-item>
        <ur-form-item
          label="게시 위치"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          App, 모바일웹, PC
        </ur-form-item>
        <ur-form-item
          label="앱 노출 기간"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          2022-11-13 10:00 ~ 2022-12-13 22:00
        </ur-form-item>
        <ur-form-item
          label="노출 여부"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          Y
        </ur-form-item>
        <ur-form-item
          label="기간 표시 정보"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          2022-11-13 ~ 2022-12-13
        </ur-form-item>
        <ur-form-item
          label="노출 순서"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          3
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 노출 정보 -->

      <!-- S :: 공지 상세 정보 -->
      <div class="comm_title_wrap mt20">
        <h4>
          공지 상세 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="언어 구분"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          국문
        </ur-form-item>
        <ur-form-item
          label="제목"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          [공지] 홈브리지 위약금 규정 변경 안내
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
  name: 'PGE_AAZ_00033', // eslint-disable-line vue/name-property-casing
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
  mounted() {
  },
  methods: {
  },
}
</script>
<style scoped>
</style>
