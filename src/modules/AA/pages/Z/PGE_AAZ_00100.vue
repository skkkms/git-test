<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="파크 구분 "
          :label-align="'right'"
          style="width: 50%; height: auto; border: 0;"
        >
          <ur-dropdown
            v-model="valueD1"
            :items="itemsD1"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="시설 카테고리"
          :label-align="'right'"
          style="width: 50%; height: auto; border: 0;"
        >
          <ur-dropdown
            v-model="valueD2"
            :items="itemsD2"
          />
        </ur-form-item>
        <ur-form-item
          label="담당자"
          :label-align="'right'"
          style="width: 100%; height: auto;"
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
import { fa } from '@/common/components/form/SuiDatePicker/vuejs-date-picker/locale'

export default {
  name: 'PGE_AAZ_00100', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 드롭다운
      valueD1: '1',
      valueD2: '1',
      opts: { // 토탈o
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: true,
      },

      columnsT1: [
        {
          text: '성명',
          value: 'value1',
          component: {
            template: '<div><ur-button shape="hyperlink">안수민</ur-button></div>',
          },
        },
        { text: '파크 구분', value: 'value2' },
        { text: '담당시설', value: 'value3' },
        { text: '등록자', value: 'value4' },
        { text: '등록일시', value: 'value5' },
        { text: '수정자', value: 'value6' },
        { text: '수정일시', value: 'value7' },
      ],

      listT1: [
        {
          value1: '', value2: '에버랜드', value3: '어트랙션', value4: 'BJ268', value5: '2021-11-04 14:04:11', value6: 'BJ268', value7: '2021-11-04 14:04:11',
        },

      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '에버랜드' })
      rtn.push({ value: '3', text: '캐리비안베이' })
      return rtn
    },
    itemsD2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '어트렉션' })
      rtn.push({ value: '3', text: '공연' })
      rtn.push({ value: '4', text: '주토피아' })
      rtn.push({ value: '5', text: '레스토랑' })
      rtn.push({ value: '6', text: '편의시설' })
      rtn.push({ value: '7', text: '굿즈샵' })
      rtn.push({ value: '8', text: '장소' })
      rtn.push({ value: '9', text: '빌리지' })
      rtn.push({ value: '10', text: '비치체어' })
      rtn.push({ value: '11', text: '렌탈/편의시설' })
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
