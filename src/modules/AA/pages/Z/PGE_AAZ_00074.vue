<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-tab-box
        default-idx="1"
        class="mt35"
      >
        <ur-tab-content
          idx="1"
          label="이벤트 참여 현황"
        >
          <ur-form-box toggleable>
            <ur-form-item
              label="게시구분"
              :label-align="'right'"
              style="width:50%; height:auto;"
              class="flex-wrap"
            >
              <ur-dropdown
                v-model="valueD1"
                :items="itemsD1"
              />
            </ur-form-item>
            <ur-form-item
              label="이벤트 분류"
              :label-align="'right'"
              style="width:50%; height:auto;"
            >
              <ur-dropdown
                v-model="valueD2"
                :items="itemsD2"
              />
            </ur-form-item>
            <ur-form-item
              label="이벤트 명"
              :label-align="'right'"
              style="width:50%; height:auto;"
            >
              <ur-text-field
                value=""
                style="width: 100%; height: auto;"
              />
            </ur-form-item>
            <ur-form-item
              label="이벤트 기간"
              :label-align="'right'"
              style="width:50%; height:auto;"
            >
              <ur-range-picker
                v-model="dateValue2"
                auto-confirm
                input-type="YYYY-MM-DD"
                init="today"
              />
            </ur-form-item>
          </ur-form-box>
          <div class="btn_wrap mt10">
            <div class="right_box">
              <ur-button>
                초기화
              </ur-button>
              <ur-button color="violet">
                검색
              </ur-button>
            </div>
          </div>
          <template>
            <ur-data-grid
              ref="grid"
              :headers="columnsT1"
              :data-source="listT1"
              :data-set-options="{id: 'id'}"
              :options="opts"
              class="custom_grid_pgeNav_None mt35"
            />
          </template>
        </ur-tab-content>
        <ur-tab-content
          idx="2"
          label="사용자 참여 현황"
        >
          <h4>사용자 참여 현황</h4>
        </ur-tab-content>
      </ur-tab-box>
      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAZ_00074', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      valueD1: '1',
      valueD2: '1',

      opts: {
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
      },

      columnsT1: [
        { value: 'str1', text: '게시구분' },
        { value: 'str2', text: '이벤트 분류' },
        {
          value: 'str3',
          text: '이벤트 명',
          component: {
            template: '<div><ur-button hyperlink small style="padding: 0;" >1월 OX 퀴즈</ur-button></div>',
          },
        },
        { value: 'str4', text: '노출 여부' },
        { value: 'str5', text: '이벤트 기간', width: 250 },
        { value: 'str6', text: '등록일시', width: 150 },
        { value: 'str7', text: '등록자' },
        { value: 'str8', text: '수정일시', width: 150 },
        { value: 'str9', text: '수정자' },
      ],
      listT1: [
        {
          str1: '에버랜드', str2: 'OX 퀴즈', str3: '', str4: 'Y', str5: '2022-10-13 10:00 ~ 2022-11-13 22:00', str6: '2022-10-13 15:35:35', str7: 'BJ123', str8: '2022-10-13 15:35:35', str9: 'BJ123',
        },
      ],

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

    // 게시구분 드랍다운
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '에버랜드' })
      rtn.push({ value: '3', text: '캐리비안베이' })
      rtn.push({ value: '4', text: '공통' })
      return rtn
    },

    // 이벤트 분류 드랍다운
    itemsD2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: 'OX 퀴즈' })
      rtn.push({ value: '3', text: '스탬프' })
      rtn.push({ value: '4', text: '룰렛' })
      rtn.push({ value: '5', text: '응모 이벤트' })
      rtn.push({ value: '6', text: '기타 이벤트' })
      rtn.push({ value: '6', text: '미션' })
      rtn.push({ value: '6', text: '미니게임' })
      rtn.push({ value: '6', text: '출석체크' })
      return rtn
    },
  },

  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() { },
  methods: {
  },
}
</script>
<style scoped>
</style>
