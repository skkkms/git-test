<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="조회일자"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-date-picker
            auto-confirm
            input-type="YYYY-MM-DD"
            init="day+30"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="조회시간"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD1"
            :items="itemsD1"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="호출 구분"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD2"
            :items="itemsD2"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="결과"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD3"
            :items="itemsD3"
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
      >
        <template #right-info>
          <ur-button>
            <ur-icon
              icon="download"
              icon-type="line"
            />
            엑셀다운로드
          </ur-button>
        </template>
        <template #empty-view>
          <div class="custom_grid_type1">
            <div class="empty_box">
              *등록된 데이터가 없습니다.
            </div>
          </div>
        </template>
      </ur-data-grid>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button>
            삭제
          </ur-button>
          <ur-button
            color="violet"
          >
            신규등록
          </ur-button>
        </div>
      </div>

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAZ_00107', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 드롭다운
      valueD1: '1',
      valueD2: '1',
      valueD3: '1',
      opts: { // 토탈o
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
      },

      columnsT1: [
        { text: '호출일시', value: 'value1' },
        { text: '호출구분', value: 'value2' },
        { text: '호출IP', value: 'value3' },
        { text: '호출URL', value: 'value4' },
        { text: 'Argument', value: 'value5' },
        { text: '결과메세지', value: 'value6' },
        { text: '결과코드', value: 'value7' },
        { text: '에러메세지', value: 'value8' },
        { text: '종료일시', value: 'value9' },
      ],

      listT1: [
        {
          value1: '2022-11-16 10:49:57:221', value2: '15 네이버 시설 동기화', value3: '71.26.9.120', value4: 'http://71.28.164.4:9120/rgif/naver/putFacilAll', value5: '{"reqCall":"naver","siteCd":"1"', value6: 'SUCCESS', value7: '200', value8: 'com.everland.resort.api.common.exception.BizExcept', value9: '2022-11-16 10:49:51',
        },

      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '01:00~01:59' })
      rtn.push({ value: '2', text: '02:00~02:59' })
      rtn.push({ value: '3', text: '03:00~03:59' })
      rtn.push({ value: '4', text: '04:00~04:59' })
      rtn.push({ value: '5', text: '05:00~05:59' })
      rtn.push({ value: '6', text: '06:00~06:59' })
      rtn.push({ value: '7', text: '07:00~07:59' })
      rtn.push({ value: '8', text: '08:00~08:59' })
      rtn.push({ value: '9', text: '09:00~09:59' })
      rtn.push({ value: '10', text: '10:00~10:59' })
      rtn.push({ value: '11', text: '11:00~11:59' })
      rtn.push({ value: '12', text: '12:00~12:59' })
      rtn.push({ value: '13', text: '13:00~13:59' })
      rtn.push({ value: '14', text: '14:00~14:59' })
      rtn.push({ value: '15', text: '15:00~15:59' })
      rtn.push({ value: '16', text: '16:00~16:59' })
      rtn.push({ value: '17', text: '17:00~17:59' })
      rtn.push({ value: '18', text: '18:00~18:59' })
      rtn.push({ value: '19', text: '19:00~19:59' })
      rtn.push({ value: '20', text: '20:00~20:59' })
      rtn.push({ value: '21', text: '21:00~21:59' })
      rtn.push({ value: '22', text: '22:00~22:59' })
      rtn.push({ value: '23', text: '23:00~23:59' })
      rtn.push({ value: '24', text: '00:00~00:59' })
      return rtn
    },
    itemsD2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '모바일 오더 API' })
      return rtn
    },
    itemsD3() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '정상' })
      rtn.push({ value: '2', text: '실패' })
      rtn.push({ value: '3', text: '에러' })
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
