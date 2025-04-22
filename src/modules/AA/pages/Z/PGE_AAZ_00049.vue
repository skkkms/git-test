<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- ::S 노출 정보 -->
      <div class="comm_title_wrap">
        <h4>
          노출 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="배너 구분"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          기타 배너
        </ur-form-item>
        <ur-form-item
          label="게시 구분"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          기타
        </ur-form-item>
        <ur-form-item
          label="게시 기간"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          2022-10-16 10:00~2022-11-13 22:00
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
      </ur-form-box>
      <!-- ::E 노출 정보 -->

      <!-- ::S 배너 상세 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          배너 상세 정보
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
          label="배너 코드"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          출석체크
        </ur-form-item>
        <ur-form-item
          label="제목"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          출석체크 하단 배너
        </ur-form-item>
        <ur-form-item
          label="배너 이미지"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          출석체크_하단_배너.jpg
        </ur-form-item>
        <ur-form-item
          label="연결 URL"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          https://www.everland.com/web/everland/now/news/122
        </ur-form-item>
      </ur-form-box>
      <!-- ::E 배너 상세 정보 -->

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
  name: 'PGE_AAZ_00049', // eslint-disable-line vue/name-property-casing
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
