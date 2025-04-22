<template>
  <div>
    <template slot="title">
      <div class="modal-title mb45">
        일별 시설 일괄 생성
      </div>
    </template>
    <template>
      <div class="modal-body">
        <!-- ::S 콘텐츠1 -->
        <ur-form-box
          toggleable
          class="mb10"
        >
          <ur-form-item
            label="기준일자"
            :label-align="'right'"
            style="width: 100%; height: auto;"
            required
          >
            <ur-date-picker
              v-model="dateValue1"
              auto-confirm
              md
              style="width:20% !important; height:auto"
            />
          </ur-form-item>
          <ur-form-item
            label="시설 카테고리"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <ur-dropdown
              v-model="valueP1D1"
              :items="itemsP1D1"
              style="width:60%"
            />
          </ur-form-item>
          <ur-form-item
            label="Zone 구분"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <ur-dropdown
              v-model="valueP1D2"
              :items="itemsP1D2"
              style="width:60%"
            />
          </ur-form-item>
          <ur-form-item
            label="Zone 구분 (제외)"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <ur-dropdown
              v-model="valueP1D3"
              :items="itemsP1D3"
              style="width:60%"
            />
          </ur-form-item>
          <ur-form-item
            label="시설"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <ur-dropdown
              v-model="valueP1D4"
              :items="itemsP1D4"
              style="width:60%"
            />
          </ur-form-item>
          <ur-form-item
            label="생성일자"
            :label-align="'right'"
            style="width: 100%; height: auto;"
            required
          >
            <ur-range-picker
              auto-confirm
              input-type="YYYY-MM-DD"
              init="day+30"
            />
          </ur-form-item>
        </ur-form-box>
        * 기준일자에 적용되어 있는 시설운영정보가 선택한 생성일자로 동일하게 생성됩니다.
        <div class="comm_btn_wrap bt1">
          <div class="right_box mt10">
            <ur-button>
              닫기
            </ur-button>
            <ur-button color="violet">
              저장
            </ur-button>
          </div>
        </div>
        <!-- ::E 콘텐츠1 -->
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'PGE_AAZ_00011_P02', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 시설 카테고리
      itemsP1D1: [
        { value: '1', text: '전체' },
        { value: '2', text: '어트랙션' },
        { value: '3', text: '공연' },
        { value: '4', text: '주토피아' },
        { value: '5', text: '레스토랑' },
        { value: '6', text: '편의시설' },
        { value: '7', text: '굿즈샵' },
        { value: '8', text: '장소' },
      ],

      // Zone 구분
      itemsP1D2: [
        { value: '1', text: '전체' },
        { value: '2', text: '글로벌페어' },
        { value: '3', text: '아메리칸 어드벤처' },
        { value: '4', text: '매직랜드' },
        { value: '5', text: '유러피안 어드벤처' },
        { value: '6', text: '주토피아' },
      ],

      // Zone 구분 (제외)
      itemsP1D3: [
        { value: '1', text: '전체' },
        { value: '2', text: '시설 카테고리' },
        { value: '3', text: 'Zone 구분에 해당하는 시설명' },
      ],

      // 시설
      itemsP1D4: [
        { value: '1', text: '전체' },
      ],

      // 일별 시설 일괄 생성 드랍다운
      valueP1D1: '1',
      valueP1D2: '1',
      valueP1D3: '1',
      valueP1D4: '1',

      // 기준일자 날짜 데이터
      dateValue1: '2022-10-13',

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
