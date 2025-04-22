<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          label="사랑단 분류"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="R1"
            value="Radio01"
            sm
          >
            동물사랑단
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio02"
            sm
          >
            식물사랑단
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="제목"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
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
      <ur-data-grid
        ref="grid"
        class="custom_grid_pgeNav_None mt35"
        :headers="columnsT1"
        :data-source="listT1"
        :options="opts"
        :data-set-options="{id: 'id'}"
      />
      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="right_box">
          <ur-button>
            삭제
          </ur-button>
          <ur-button
            color="violet"
          >
            신규 등록
          </ur-button>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAZ_00059', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 라디오 버튼
      R1: null,

      opts: { // 토탈 x 전체선택X 셀선택 o
        noInfo: false,
        pagination: true,
        multiSelect: false,
        selectCheck: true,
        height: 300,
      },

      columnsT1: [
        {
          text: '사랑단 분류',
          value: 'value1',
        },
        {
          text: '멤버십',
          value: 'value2',
        },
        {
          text: '레벨',
          value: 'value3',
        },
        {
          text: '제목',
          value: 'value4',
          width: 300,
          component: {
            template: '<div><ur-button hyperlink small style="padding: 0;" >22년 12월 체험학습-주제 안내</ur-button></div>',
          },
        },
        {
          text: '앱 노출 기간',
          value: 'value5',
          width: 250,
        },
        {
          text: '등록일시',
          value: 'value6',
          width: 150,
        },
        {
          text: '등록자',
          value: 'value7',
        },
        {
          text: '수정일시',
          value: 'value8',
          width: 150,
        },
        {
          text: '수정자',
          value: 'value9',
        },
      ],
      listT1: [
        {
          value1: '동물사랑단', value2: '동물사랑단', value3: '키즈반', value4: '', value5: '2022-10-13 10:00 ~ 2022-11-13 22:00', value6: '2022-10-13 15:35:35', value7: 'BJ123', value8: '2022-10-13 15:35:35', value9: 'BJ123',
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
      rtn.push({ value: '2', text: '동물사랑단' })
      rtn.push({ value: '3', text: '키즈 동물사랑단' })
      rtn.push({ value: '4', text: '야생동물탐험대' })
      return rtn
    },
    itemsD2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '식물 사랑단' })
      rtn.push({ value: '3', text: '키즈 식물사랑단' })
      rtn.push({ value: '4', text: '야생동물탐험대' })
      rtn.push({ value: '5', text: '식물사랑단 주니어스타' })
      return rtn
    },
    itemsD3() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '동물사랑단(초급반,고급반,전문반)' })
      rtn.push({ value: '3', text: '키즈 동물사랑단(키즈반)' })
      rtn.push({ value: '4', text: '야생동물탐험대(일요일반,토요일반)' })
      return rtn
    },
    itemsD4() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '식물사랑단(주니어 초급,주니어 고급)' })
      rtn.push({ value: '3', text: '키즈 식물사랑단(키즈)' })
      rtn.push({ value: '4', text: '야생동물탐험대(토요일반,일요일반)' })
      rtn.push({ value: '5', text: '식물사랑단 주니어스타(주니어 스타)' })
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
