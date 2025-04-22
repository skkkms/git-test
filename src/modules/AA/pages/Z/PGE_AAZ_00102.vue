<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- ::S 담당자 정보 -->
      <div class="comm_title_wrap">
        <h4>
          담당자 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="성명"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          안수민
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="파크구분"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          에버랜드
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="담당시설"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          어트랙션
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="등록자"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          7323577
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="등록일시"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          2018-05-18- 10:00:39
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="수정자"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          7323577
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="수정일시"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          2018-05-18- 10:00:39
        </ur-form-item>
        <!-- ::E 담당자 정보 -->
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
  name: 'PGE_AAZ_00102', // eslint-disable-line vue/name-property-casing
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
