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
          label="에버랜드"
        >
          <!-- S :: 일별 가상대기 capa 관리 탭-->
          <ur-form-box toggleable>
            <ur-form-item
              label="영업일자"
              :label-align="'right'"
              style="width:50%; height:auto;"
              class="flex_wrap"
            >
              <ur-date-picker
                auto-confirm
                input-type="YYYY-MM-DD"
                init="today"
              />
            </ur-form-item>
            <ur-form-item
              label="시설명"
              :label-align="'right'"
              style="width:50%; height:auto;"
            >
              <ur-text-field
                value=""
                style="width: 100%;"
              />
            </ur-form-item>
            <ur-form-item
              label="시설 카테고리"
              :label-align="'right'"
              style="width:50%; height:auto;"
            >
              <ur-dropdown
                v-model="valueD1"
                :items="items1"
              />
            </ur-form-item>
            <ur-form-item
              label="Zone 구분"
              :label-align="'right'"
              style="width:50%; height:auto;"
            >
              <ur-dropdown
                v-model="valueD2"
                :items="items2"
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
          <!-- E :: 일별 가상대기 capa 관리 탭-->

          <!-- S :: 일별 가상대기 capa 관리 테이블-->
          <template>
            <ur-data-grid
              ref="grid"
              :headers="columns"
              :data-source="list"
              :data-set-options="{id: 'id'}"
              :options="opts"
              class="custom_grid_pgeNav_None mt35"
            >
              <template
                #right-info
              >
                <ur-button
                  color="violet"
                  @click="openModalP01"
                >
                  시설 Capa 일괄생성
                </ur-button>
                <ur-modal
                  ref="modalP01"
                  class="modal-b1c6"
                  xlarge
                  title="시설 Capa 일괄생성"
                  draggable
                  @closed="closed"
                >
                  <P01 />
                </ur-modal>
              </template>
              <template #header>
                <ur-data-grid-header-row>
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell
                    colspan="2"
                    text="예약 설정"
                    align="center"
                  />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                </ur-data-grid-header-row>
                <ur-data-grid-header-row>
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                </ur-data-grid-header-row>
              </template>
            </ur-data-grid>
          </template>
          <!-- E :: 일별 가상대기 capa 관리 테이블-->
        </ur-tab-content>
        <ur-tab-content
          idx="2"
          label="캐리비안베이"
        >
          <h4>캐리비안베이</h4>
        </ur-tab-content>
      </ur-tab-box>
      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
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

import P01 from './components/PGE_AAZ_00015_P01.vue'

export default {
  name: 'PGE_AAZ_00015', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
  },
  data() {
    return {

      // 시설 카테고리, Zone 구분 드랍다운
      valueD1: '1',
      valueD2: '1',


      // 영업일자 날짜 데이터
      dateValue1: '',

      dataSet: new this.$ur.grid.DataSet(),
      opts: {
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
      },

      columns: [
        { value: 'value1', text: '영업일자', width: 120 },
        {
          value: 'value2',
          text: '시설명',
          width: 180,
          component: {
            template: '<div><ur-button hyperlink small style="padding: 0;" >랩터레인저</ur-button></div>',
          },
        },
        { value: 'value3', text: '시설 카테고리', width: 200 },
        { value: 'value4', text: 'Zone 구분', width: 200 },
        { value: 'value16', text: '가상대기 여부', width: 200 },
        {
          value: 'value5',
          text: '오픈 시간',
          width: 120,
        },
        {
          value: 'value6',
          text: '종료 시간',
          width: 120,
        },
        {
          value: 'value7',
          text: '대기시간(분)',
          width: 120,
        },
        {
          value: 'value8',
          text: '운영 상태',
          width: 150,
        },
        {
          value: 'value9',
          text: '탑승시간간격',
          width: 120,
        },
        {
          value: 'value10',
          text: '기준 OHRC',
          width: 120,
        },
        {
          value: 'value11',
          text: '현장 줄서기 전환 시간',
          width: 200,
          component: {
            template: '<div><ur-text-field mark="time" value="14:00" style="width:100%; height:auto;"/></div>',
          },
        },
        {
          value: 'value12', text: '등록일시', width: 150,
        },
        {
          value: 'value13', text: '등록자', width: 100,
        },
        {
          value: 'value14', text: '수정일시', width: 150,
        },
        {
          value: 'value15', text: '수정자', width: 100,
        },
      ],

      list: [
        {
          value1: '2022-10-13', value2: '', value3: '어트랙션, 엔터테이먼트', value4: '유러피안 어드벤처', value5: '10:00', value6: '21:00', value7: '-', value8: '금일종료', value9: '30', value10: '1,200', value11: '', value12: '2022-10-13 15:31:31', value13: 'BJ123', value14: '2022-10-13 15:31:31', value15: 'BJ123', value16: '일반형',
        },
      ],

    }
  },
  computed: {
    modalP01() {
      return this.$refs.modalP01
    },
    // 계산된 속성, date pickproperty로 사용가능

    // 시설 카테고리 드랍다운 데이터
    items1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '어트렉션' })
      rtn.push({ value: '3', text: '공연' })
      rtn.push({ value: '4', text: '주토피아' })
      rtn.push({ value: '5', text: '레스토랑' })
      rtn.push({ value: '6', text: '편의시설' })
      rtn.push({ value: '7', text: '기프트샵' })
      rtn.push({ value: '8', text: '포토존' })
      return rtn
    },

    // Zone 구분 드랍다운 데이터
    items2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '글로벌페어' })
      rtn.push({ value: '3', text: '아메리칸 어드벤처' })
      rtn.push({ value: '4', text: '매직랜드' })
      rtn.push({ value: '5', text: '유러피안 어드벤처' })
      rtn.push({ value: '6', text: '주토피아' })
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
    openModalP01() { this.modalP01.open() },
    closeModalP01() { this.modalP01.close() },
  },
}
</script>
<style scoped>
</style>
