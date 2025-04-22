<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S:: 영상 슬롯 정보 -->
      <div class="comm_title_wrap">
        <h4>
          영상 슬롯 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="프리셋 구분(선택)"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          가나다라마바
        </ur-form-item>
        <ur-form-item
          label="슬롯명"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <span class="subscript_txt pr16">
            가나다라마바
          </span>
          <ur-text-field
            value="COMMON2021"
            style="width: 50%;"
          />
        </ur-form-item>
        <ur-form-item
          label="상영시작일"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          2022-11-01
        </ur-form-item>
        <ur-form-item
          label="상영종료일"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          2022-02-11
        </ur-form-item>
        <ur-form-item
          label="참여시작일"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          2022-12-01
        </ur-form-item>
        <ur-form-item
          label="참여종료일"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          2022-01-29
        </ur-form-item>
        <ur-form-item
          label="타임슬롯1"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          09:30~11:40, 15:30~17:00
        </ur-form-item>
        <ur-form-item
          label="CAPA1"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          1
        </ur-form-item>
        <ur-form-item
          label="타임슬롯2"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          11:00~12:00, 13:00~14:00
        </ur-form-item>
        <ur-form-item
          label="CAPA2"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          12
        </ur-form-item>
        <ur-form-item
          label="타임슬롯3"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          15:00~16:00
        </ur-form-item>
        <ur-form-item
          label="CAPA3"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          23
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 영상 슬롯 정보 -->

      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button>
              목록
            </ur-button>
          </div>
          <div class="right_box">
            <ur-button color="violet">
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
  name: 'PGE_AAZ_00097', // eslint-disable-line vue/name-property-casing
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
