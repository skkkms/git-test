<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 이벤트 정보-->
      <div class="comm_title_wrap flex_wrap">
        <h4>이벤트 정보</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="게시구분"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          공통
        </ur-form-item>
        <ur-form-item
          label="게임 명"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          미니게임1
        </ur-form-item>
        <ur-form-item
          label="노출 여부"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          Y
        </ur-form-item>
        <ur-form-item
          label="이벤트 기간"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          2022-10-13 10:00 ~ 2022-11-13 22:00
        </ur-form-item>
        <ur-form-item
          label="게임 코드"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          GAME123
        </ur-form-item>
        <ur-form-item
          label="연결 URL"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          https://www.everland.com/web/everland/now/news/1223964_10436.html
        </ur-form-item>
        <ur-form-item
          label="썸네일 이미지"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          미니게임1_썸네일 이미지.jpg
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 이벤트 정보-->

      <!-- S :: 조건 정보 -->
      <div class="comm_title_wrap flex_wrap mt20">
        <h4 class="pr10">
          조건 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="참여 조건"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          멤버십 등급
        </ur-form-item>
        <ur-form-item
          label="노출 조건"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          전체
        </ur-form-item>
        <ur-form-item
          label="소진 솜"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          10포인트
        </ur-form-item>
        <ur-form-item
          label="참여 기회"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          일 단위, 1회
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 조건 정보 -->

      <!-- S :: 보상 정보 -->
      <div class="comm_title_wrap mt20">
        <h4>
          보상 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="지급 쿠폰"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          츄러스 쿠폰
        </ur-form-item>
        <ur-form-item
          label="쿠폰 수량"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          100
        </ur-form-item>
        <ur-form-item
          label="보상 구분"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          등수
        </ur-form-item>
        <ur-form-item
          label="보상 조건"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          10등 까지
        </ur-form-item>
        <ur-form-item
          label="반복 여부"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          Y
        </ur-form-item>
        <ur-form-item
          label="결산 일시"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          일 단위, 13:00
        </ur-form-item>
      </ur-form-box>
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
  name: 'PGE_AAZ_00089', // eslint-disable-line vue/name-property-casing
  components: {

  },
  data() {
    return {
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    modalP01() {
      return this.$refs.modalP01
    },
    modalP02() {
      return this.$refs.modalP02
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
    openModalP01() { this.modalP01.open() },
    openModalP02() { this.modalP02.open() },
    closed() {},
  },
}
</script>
<style scoped>
</style>
