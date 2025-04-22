<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 어트랙션 예약현황 탭-->
      <ur-form-box toggleable>
        <ur-form-item
          label="영업일자"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-date-picker
            auto-confirm
            input-type="YYYY-MM-DD"
            init="day+30"
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
            style="width:100%; height:auto;"
            value=""
          />
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
      <!-- E :: 어트랙션 예약현황 탭-->

      <ur-data-grid
        ref="grid"
        class="mt35"
        :headers="columns"
        :data-source="list"
        :options="opts"
        :data-set-options="{id: 'id'}"
      >
        <template #right-info>
          <ur-button>
            <ur-icon
              icon="download"
              icon-type="line"
              size="small"
              spacing
            />
            엑셀다운로드
          </ur-button>
        </template>
      </ur-data-grid>
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

      valueD1: '1',
      valueD2: '1',

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
          text: '영업일자',
          value: 'value2',
          width: 100,
        },
        {
          text: '시설명',
          value: 'value3',
          width: 150,
          component: {
            template: '<div><ur-button text="크레이지 좀비 헌트2" style="padding-left:0;" shape="hyperlink"></ur-button></div>',
          },
        },
        { text: '홈페이지 시설코드', value: 'value4', width: 170 },
        { text: '시설 카테고리', value: 'value5', width: 220 },
        { text: 'Zone 구분', value: 'value6', width: 200 },
        { text: 'Slot 시간', value: 'value7', width: 150 },
        { text: '상태', value: 'value8', width: 100 },
        { text: '당첨예약수 (Capa/명)', value: 'value9', width: 150 },
        { text: '예약신청수 (명)', value: 'value10', width: 150 },
        { text: '예약완료수 (명)', value: 'value11', width: 150 },
        { text: '이용완료수 (명)', value: 'value12', width: 150 },
        { text: '이용취소수 (명)', value: 'value13', width: 150 },
        { text: '예약노쇼수 (명)', value: 'value14', width: 150 },
      ],
      list: [
        {
          value1: '9999', value2: '2022-11-14', value3: '', value4: '3022', value5: '어트랙션, 엔터테인먼트', value6: '유러피언 어드벤처', value7: '09:00 ~ 10:00', value8: '오픈', value9: '10', value10: '0', value11: '0', value12: '0', value13: '0', value14: '0',
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
