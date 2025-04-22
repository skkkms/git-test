<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 외부 API 정보-->
      <div class="comm_title_wrap">
        <h4>외부 API 정보</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="호출구분"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          required="true"
        >
          <ur-text-field
            style="width:50%; height:auto"
            value="1"
          />
        </ur-form-item>
        <ur-form-item
          label="호출명"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          required="true"
        >
          <ur-text-field
            style="width:50%; height:auto"
            value="시설동기화(전체)"
          />
        </ur-form-item>
        <ur-form-item
          label="호출설명"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          required="true"
        >
          <ur-text-field
            style="width:100%; height:auto"
            value="EMS-시설마스터조회에서 홈페이지 시설 동기화 버튼을 통해 호출되는 API로 EMS의 시설정보, 시설카테고리, 시설위치정보들을 API 시설 정보로 동기화한다."
          />
        </ur-form-item>
        <ur-form-item
          label="호출구분"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          required="true"
        >
          <ur-radio
            v-model="R1"
            value="Radio 01"
            sm
          >
            사용
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio 02"
            sm
          >
            미사용
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="등록자"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          BIXBY
        </ur-form-item>
        <ur-form-item
          label="등록일시"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          2019-01-01 00:00:00
        </ur-form-item>
        <ur-form-item
          label="수정자"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          BIXBY
        </ur-form-item>
        <ur-form-item
          label="수정일시"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          2019-01-01 00:00:00
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 외부 API 정보-->

      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap ">
          <div class="left_box">
            <ur-button
              color="violet"
            >
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
  name: 'PGE_AAZ_00115', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      R1: 'Radio 01',

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
