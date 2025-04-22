<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S:: 미디어 확인 -->
      <div class="comm_title_wrap">
        <h4>
          미디어 확인
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="슬롯 구분"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD1"
            :items="itemsD1"
          />
        </ur-form-item>
        <ur-form-item
          label="시간대별"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD2"
            :items="itemsD2"
          />
        </ur-form-item>
        <ur-form-item
          label="날짜검색"
          class="flex_wrap"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-date-picker
            auto-confirm
            input-type="YYYY-MM-DD"
            init="day+30"
          />
        </ur-form-item>
        <ur-form-item
          label="현재상태"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD3"
            :items="itemsD3"
          />
        </ur-form-item>
        <ur-form-item
          label="검색구분"
          class="flex_wrap"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD4"
            :items="itemsD4"
          />
          <ur-text-field
            value=""
            style="width: 100%;"
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
      <!-- E:: 미디어 확인 -->

      <ur-data-grid
        ref="grid"
        :headers="columnsT1"
        :data-source="listT1"
        :options="opts"
        :data-set-options="{id: 'id'}"
      />
      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="right_box">
            <ur-button>
              삭제
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: 'PGE_AAZ_00092', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 드롭다운
      valueD1: 1,
      valueD2: 1,
      valueD3: 1,
      valueD4: 1,

      // 테이블 옵션
      opts: { // 토탈 O
        rowHeight: 'auto',
        noInfo: false,
        multiSelect: false,
        selectCheck: true,
      },

      // 테이블
      columnsT1: [
        { text: 'No.', value: 'value1', width: 40 },
        { text: '코드', value: 'value2' },
        {
          text: '기간/시간대',
          value: 'value3',

          component: {
            template: '<div><ur-button shape="hyperlink" style="height: auto; text-align: left;">가나다라마바 <br>YYYY-MM-DD ~ YYYY-MM-DD <br>HH:MM ~ HH:MM</ur-button></div>',
          },
        },
        {
          text: '제목',
          value: 'value4',

          component: {
            template: '<div><span class="badge-sample-span">text</span><ur-badge class="badge-sample-badge pl16" color="default" text="이미지" shape="status" ></ur-badge></div>',
          },
        },
        { text: '신청자', value: 'value5' },
        { text: '작성일', value: 'value6' },
        { text: '현재상태', value: 'value7' },

      ],
      listT1: [
        {
          value1: '331', value2: 'COMMON2021', value3: '', value4: '', value5: '$신청자명$', value6: 'YYYY-MM-DD', value7: '심사중',
        },
        {
          value1: '331', value2: 'COMMON2021', value3: '', value4: '', value5: '$신청자명$', value6: 'YYYY-MM-DD', value7: '심사중',
        },
        {
          value1: '331', value2: 'COMMON2021', value3: '', value4: '', value5: '$신청자명$', value6: 'YYYY-MM-DD', value7: '심사중',
        },
        {
          value1: '331', value2: 'COMMON2021', value3: '', value4: '', value5: '$신청자명$', value6: 'YYYY-MM-DD', value7: '심사중',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

    // 드랍다운
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      return rtn
    },
    itemsD2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      return rtn
    },
    itemsD3() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '심사중' })
      rtn.push({ value: '3', text: '수락' })
      rtn.push({ value: '4', text: '취소신청' })
      rtn.push({ value: '5', text: '취소신청수락' })
      rtn.push({ value: '6', text: '심사전취소' })
      rtn.push({ value: '7', text: '거절' })
      return rtn
    },
    itemsD4() {
      const rtn = []
      rtn.push({ value: '1', text: '이름' })
      rtn.push({ value: '2', text: '아이디' })
      rtn.push({ value: '3', text: '연락처' })
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
