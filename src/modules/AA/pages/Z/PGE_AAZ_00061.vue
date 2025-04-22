<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>
          공지 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="사랑단 분류"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          동물사랑단
        </ur-form-item>
        <ur-form-item
          label="멤버십"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          동물사랑단
        </ur-form-item>
        <ur-form-item
          label="레벨"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          초급반
        </ur-form-item>
        <ur-form-item
          label="노출 여부"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          Y
        </ur-form-item>
        <ur-form-item
          label="앱 노출 기간"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          2022-11-13 10:00 ~ 2022-12-13 22:00
        </ur-form-item>
        <ur-form-item
          label="기간 표시 정보"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          2022-11-13 ~ 2022-12-13
        </ur-form-item>
      </ur-form-box>
      <!-- S :: 공지 상세 정보 -->
      <div class="comm_title_wrap mt20">
        <h4>
          공지 상세 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="제목"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          ★6월 27일 동물사진★
        </ur-form-item>
        <ur-form-item
          label="내용"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <img
            src="images/food/food_0.png"
            style="width: fit-content; height: 150px;"
          >
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 공지 상세 정보 -->
      <div class="bt1 mt10">
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
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAZ_00061', // eslint-disable-line vue/name-property-casing
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
