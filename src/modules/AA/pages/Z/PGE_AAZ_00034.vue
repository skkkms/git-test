<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 노출 정보 -->
      <div class="comm_title_wrap">
        <h4>
          노출 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="게시 구분"
          :label-align="'right'"
          required="true"
          style="width: 100%; height: auto; border: 0;"
        >
          <ur-dropdown
            v-model="valueD1"
            :items="itemsD1"
            style="width:40%"
          />
        </ur-form-item>
        <ur-form-item
          label="게시 위치"
          :label-align="'right'"
          required="true"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-checkbox
            v-model="valueC1"
            sm
          /><span
            class="check_label"
          >App</span><ur-checkbox
            v-model="valueC2"
            sm
          /><span
            class="check_label"
          >모바일웹</span><ur-checkbox
            v-model="valueC3"
            sm
          /><span
            class="check_label"
          >PC</span>
        </ur-form-item>
        <ur-form-item
          label="앱 노출 기간"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
          required="true"
        >
          <ur-date-time-range-picker
            v-model="dateValue1"
            auto-confirm
            input-type="YYYY-MM-DD HH:mm"
            init="day+30"
          />
        </ur-form-item>
        <ur-form-item
          label="노출 여부"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          required="true"
        >
          <ur-radio
            v-model="R1"
            value="Radio 01"
            sm
          >
            Y
          </ur-radio>
          <ur-radio
            v-model="R1"
            class="Radio 02"
            sm
          >
            N
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="기간 표시 정보"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
          required="true"
        >
          <ur-range-picker
            v-model="dateValue2"
            auto-confirm
            input-type="YYYY-MM-DD"
            init="day+30"
          />
        </ur-form-item>
        <ur-form-item
          label="노출 순서"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          required="true"
        >
          <ur-text-field
            style="width:100%; height:auto;"
            value="3"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 노출 정보 -->

      <!-- S :: 게시 상세 정보 -->
      <div class="comm_title_wrap mt20">
        <h4>
          공지 상세 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="언어 구분"
          :label-align="'right'"
          required="true"
          style="width: 100%; height: auto;"
        >
          <ur-radio
            v-model="R3"
            value="Radio 01"
            sm
          >
            국문
          </ur-radio>
          <ur-radio
            v-model="R3"
            class="Radio 02"
            sm
          >
            영문
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="제목"
          :label-align="'right'"
          required="true"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            value="[공지] 홈브리지 위약금 규정 변경 안내"
            style="width:100%; height:auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="내용"
          :label-align="'right'"
          required="true"
          style="width: 100%; height: auto;"
        >
          <img
            src="/images/food/food_1.png"
            alt=""
          >
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 게시 상세 정보 -->

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
  name: 'PGE_AAZ_00034', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 드롭다운 (게시 구분)
      valueD1: '3',

      // 체크박스 (게시 위치)
      valueC1: ['App'],
      valueC2: ['모바일웹'],
      valueC3: ['PC'],

      // 라디오
      R1: 'Radio 01',
      R2: 'Radio 01',
      R3: 'Radio 01',

      // 날짜 범위(date-picker)
      dateValue1: ['', ''],
      dateValue2: ['', ''],

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

    // 드랍다운 (게시 구분)
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '에버랜드' })
      rtn.push({ value: '2', text: '캐리비안베이' })
      rtn.push({ value: '3', text: '홈브리지' })
      rtn.push({ value: '4', text: '스피드웨이' })
      rtn.push({ value: '5', text: '채용' })
      rtn.push({ value: '6', text: '정기권' })
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
