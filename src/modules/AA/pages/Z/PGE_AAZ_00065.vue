<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 시설 시간대별 대기시간 현황 탭-->
      <ur-form-box toggleable>
        <ur-form-item
          label="영업일자"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-date-picker
            v-model="dateValue1"
            auto-confirm
            style="height: auto;"
            init="today"
          />
        </ur-form-item>
        <ur-form-item
          label="시설 카테고리"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD1"
            :items="itemsD1"
          />
        </ur-form-item>
        <ur-form-item
          label="Zone 구분"
          class="flex_wrap"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD2"
            :items="itemsD2"
          />
        </ur-form-item>
        <ur-form-item
          label="시설"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            value=""
            style="width:100%; height:auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="구분"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="R1"
            value="Radio 01"
            sm
          >
            EL
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio 02"
            sm
          >
            CB
          </ur-radio>
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
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
      <!-- E :: 시설 시간대별 대기시간 현황 탭-->

      <ur-data-grid
        ref="grid"
        class="mt35"
        :headers="columns"
        :data-source="list"
        :options="opts"
        :data-set-options="{id: 'id'}"
      />
      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAZ_00088', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {

      // 시설 카테고리, Zone 구분 드랍다운
      valueD1: '1',
      valueD2: '1',

      // 구분 라디오
      R1: 'Radio 01',

      // 테이블
      opts: { // 토탈o
        height: 450,
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
          text: '구분',
          value: 'value2',
          width: 100,
        },
        {
          text: '영업일자',
          value: 'value3',
          width: 150,
        },
        { text: '시설명', value: 'value4', width: 170 },
        { text: '홈페이지 시설코드', value: 'value5', width: 200 },
        { text: '시설 카테고리', value: 'value6', width: 200 },
        { text: 'Zone 구분', value: 'value7', width: 150 },
        { text: '08 ~ 09시', value: 'value8', width: 100 },
        { text: '09 ~ 10시', value: 'value9', width: 100 },
        { text: '10 ~ 11시', value: 'value10', width: 100 },
        { text: '11시 ~ 12시', value: 'value11', width: 100 },
        { text: '12시 ~ 13시', value: 'value12', width: 100 },
        { text: '13시 ~ 14시', value: 'value13', width: 100 },
        { text: '14시 ~ 15시', value: 'value14', width: 100 },
        { text: '15시 ~ 16시', value: 'value15', width: 100 },
        { text: '16시 ~ 17시', value: 'value16', width: 100 },
        { text: '17시 ~ 18시', value: 'value17', width: 100 },
        { text: '18시 ~ 19시', value: 'value18', width: 100 },
        { text: '19시 ~ 20시', value: 'value19', width: 100 },
      ],
      list: [
        {
          value1: '10000', value2: 'EL', value3: '2022-11-14', value4: '크레이지 좀비 헌트2', value5: '3022', value6: '어트랙션,엔터테인먼트', value7: '유러피언 어드벤처', value8: '29', value9: '30', value10: '10', value11: '10', value12: '10', value13: '10', value14: '10', value15: '10', value16: '10', value17: '10', value18: '10', value19: '-',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

    // 시설 카테고리 드랍다운
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '어트랙션' })
      rtn.push({ value: '3', text: '공연' })
      rtn.push({ value: '4', text: '주토피아' })
      rtn.push({ value: '5', text: '레스토랑' })
      rtn.push({ value: '6', text: '편의시설' })
      rtn.push({ value: '7', text: '기프트샵' })
      rtn.push({ value: '8', text: '포토샵' })
      return rtn
    },

    // Zone 구분 드랍다운
    itemsD2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '글로벌페어' })
      rtn.push({ value: '3', text: '아메리칸 어드벤처' })
      rtn.push({ value: '4', text: '매직랜드' })
      rtn.push({ value: '5', text: '이솝빌리지' })
      rtn.push({ value: '6', text: '유러피언 어드벤처' })
      rtn.push({ value: '7', text: '주토피아' })
      return rtn
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
  },
}
</script>
<style scoped>
</style>
