<template>
  <div>
    <template slot="title">
      <div class="modal-title mb45">
        발행 쿠폰 검색
      </div>
    </template>
    <template>
      <div class="modal-body">
        <!-- ::S 콘텐츠1 -->
        <ur-form-box toggleable>
          <ur-form-item
            label="쿠폰 마스터 번호"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            <ur-text-field
              value=""
              style="width: 100%;"
            />
          </ur-form-item>
          <ur-form-item
            label="쿠폰명"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            <ur-text-field
              value=""
              style="width: 100%;"
            />
          </ur-form-item>
          <ur-form-item
            label="발행 확정 일자"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <ur-range-picker
              auto-confirm
              input-type="YYYY-MM-DD"
              init="day+30"
            />
          </ur-form-item>
        </ur-form-box>
        <div class="comm_btn_wrap">
          <div class="btn_wrap">
            <div class="right_box">
              <ur-button>
                초기화
              </ur-button>
              <ur-button
                color="violet"
              >
                검색
              </ur-button>
            </div>
          </div>
        </div>
        <!-- ::E 콘텐츠1 -->
        <!-- ::S 콘텐츠2 -->

        <ur-data-grid
          ref="grid"
          :headers="columnsP1T1"
          :data-source="listP1T1"
          :options="options"
          :data-set-options="{id: 'id'}"
        >
          <template #header>
            <ur-data-grid-header-row>
              <ur-data-grid-header-cell rowspan="2" />
              <ur-data-grid-header-cell rowspan="2" />
              <ur-data-grid-header-cell rowspan="2" />
              <ur-data-grid-header-cell rowspan="2" />
              <ur-data-grid-header-cell rowspan="2" />
              <ur-data-grid-header-cell
                colspan="2"
                text="유효기간"
                align="center"
              />
            </ur-data-grid-header-row>
            <ur-data-grid-header-row>
              <ur-data-grid-header-cell :expand-resizer="2" />
              <ur-data-grid-header-cell :expand-resizer="2" />
              <ur-data-grid-header-cell :expand-resizer="2" />
              <ur-data-grid-header-cell :expand-resizer="2" />
              <ur-data-grid-header-cell :expand-resizer="2" />
              <ur-data-grid-header-cell :expand-resizer="2" />
              <ur-data-grid-header-cell :expand-resizer="2" />
            </ur-data-grid-header-row>
          </template>
        </ur-data-grid>
        <!-- ::E 콘텐츠2 -->
      </div>
    </template>
    <template>
      <div class="comm_btn_wrap bt1">
        <div class="right_box mt10">
          <ur-button @click="closeModal">
            닫기
          </ur-button>
          <ur-button color="violet">
            선택
          </ur-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'PGE_AAZ_00081_P02', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 테이블 옵션
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      // 코스팝업드랍다운
      valueT1D1: '1',
      // 팝업라디오버튼
      P1R1: null,
      P1R2: null,

      // 코스팝업테이블
      columnsP1T1: [
        { text: '쿠폰 마스터 번호', value: 'value1' },
        { text: '쿠폰명', value: 'value2' },
        { text: '발행차수', value: 'value3' },
        { text: '쿠폰구분', value: 'value6' },
        { text: '발행 확정일시', value: 'value7' },
        { text: '시작일자', value: 'value8' },
        { text: '종료일자', value: 'value9' },
      ],

      listP1T1: [
        {
          value1: '1002036992', value2: '큐패스,대조본', value3: '7', value6: 'Q-Pass', value7: '2022-10-07 12:46:01', value8: '2022-10-06', value9: '2022-10-12',
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
    closeModal() {},
  },
}
</script>
<style scoped>
</style>
