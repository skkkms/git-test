<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S:: 노출정보 -->
      <ur-form-box toggleable>
        <ur-form-item
          label="주차장명"
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
          <ur-button>초기화</ur-button>
          <ur-button color="violet">
            검색
          </ur-button>
        </div>
      </div>


      <template>
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
                size="small"
                spacing
              />
              엑셀다운로드
            </ur-button>
          </template>
        </ur-data-grid>
      </template>

      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="right_box">
            <ur-button>삭제</ur-button>
            <ur-button color="violet">
              신규 등록
            </ur-button>
            <ur-button color="violet">
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
  name: 'PGE_AAZ_00119', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 테이블 옵션
      opts: {
        pagination: true,
        multiSelect: false,
        selectCheck: true,
        noInfo: false,
      },
      // 테이블 드롭다운
      itemsT1D1: [
        { value: '1', text: '일반' },
        { value: '2', text: '정문' },
      ],
      itemsT1D2: [
        { value: '1', text: '자동' },
        { value: '2', text: '가능' },
        { value: '3', text: '만차' },
        { value: '4', text: '미운영' },
      ],
      columnsT1: [
        {
          text: '주차장명',
          value: 'value1',
          required: true,
          component: {
            template: '<div><ur-text-field value="" style="width: 100%;"/></div>',
          },
        },
        {
          text: '카테고리',
          value: 'value2',
          required: true,
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code1" :items="me.itemsT1D1"/></div>',
            data() {
              return {
                code1: this.value,
              }
            },
          },
        },
        {
          text: '구분',
          value: 'value3',
          component: {
            template: '<div><ur-text-field value="" style="width: 100%;"/></div>',
          },
        },
        {
          text: '주차 상태',
          value: 'value4',
          required: true,
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code2" :items="me.itemsT1D2"/></div>',
            data() {
              return {
                code2: this.value,
              }
            },
          },
        },
        {
          text: '위치정보 URL',
          value: 'value5',
          component: {
            template: '<div><ur-text-field value="" style="width: 100%;"/></div>',
          },
        },
        {
          text: '위도',
          value: 'value6',
          width: 110,
          component: {
            template: '<div><ur-text-field value="" style="width: 100%;"/></div>',
          },
        },
        {
          text: '경도',
          value: 'value7',
          width: 110,
          component: {
            template: '<div><ur-text-field value="" style="width: 100%;"/></div>',
          },
        },
        {
          text: 'I/F SEQ',
          value: 'value8',
          component: {
            template: '<div><ur-text-field value="" style="width: 100%;"/></div>',
          },
        },
        {
          text: '최종 인터페이스 일시',
          value: 'value9',
        },
        {
          text: '등록일시',
          value: 'value10',
        },
        {
          text: '등록자',
          value: 'value11',
        },
        {
          text: '수정일시',
          value: 'value12',
        },
        {
          text: '수정자',
          value: 'value13',
        },

      ],
      listT1: [
        {
          value1: '1',
          value2: '1',
          value3: '1',
          value4: '1',
          value5: '1',
          value6: '',
          value7: '',
          value8: '',
          value9: '2019-06-14 09:54:12',
          value10: '2022-10-13 15:35:35',
          value11: 'BJ123',
          value12: '2022-10-13 15:35:35',
          value13: 'BJ123',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능+
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
  },
  methods: {
    onToggle(isShown) {
      if (!isShown) {
        console.log(this.$refs.dropdown.getSelectedItem())
      }
    },
  },
}
</script>
<style scoped>
</style>
