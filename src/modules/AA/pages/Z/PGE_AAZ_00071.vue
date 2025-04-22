<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 개인티켓 오류등록 현황 탭-->
      <div class="comm_title_wrap mt20">
        <h4>
          등록 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="등록일자"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          2022-11-18
        </ur-form-item>
        <ur-form-item
          label="회원 UID"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          EVER30008221113
        </ur-form-item>
        <ur-form-item
          label="블럭 여부"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-radio
            v-model="R1"
            value="Radio 01"
            sm
          >
            N
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio 02"
            sm
          >
            Y
          </ur-radio>
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 개인티켓 오류등록 현황 탭-->

      <ur-data-grid
        ref="grid"
        class="mt45"
        :headers="columns"
        :data-source="list"
        :options="opts"
        :data-set-options="{id: 'id'}"
      >
        <template #left-info>
          <div class="comm_title_wrap">
            <h4>
              상세 내역
            </h4>
          </div>
        </template>
      </ur-data-grid>

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
  name: 'PGE_AAZ_00071', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {

      // 라디오 (블럭 여부)
      R1: 'Radio 02',

      // 테이블
      opts: { // 토탈o
        height: 300,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
      },

      columns: [
        {
          text: 'No.', value: 'value1', width: 100, align: 'center',
        },
        {
          text: '등록일시',
          value: 'value2',

        },
        {
          text: 'QR 코드',
          value: 'value3',

        },
        {
          text: '성공 여부',
          value: 'value4',
        },
      ],
      list: [
        {
          value1: '10', value2: '2022-11-18 13:35', value3: 'EL260N6LNF6X61N10101', value4: 'Y',
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
