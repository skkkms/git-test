<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-tab-box class="mt35">
        <ur-tab-content
          :idx="1"
          label="에버랜드"
        >
          <template>
            <ur-form-box toggleable>
              <ur-form-item
                label="퍼소나 유형"
                :label-align="'right'"
                style="width: 50%; height: auto;"
                class="flex_wrap"
              >
                <ur-text-field
                  value=""
                  style="width: 50%;"
                />
                <ur-icon-button
                  icon="search"
                  icon-type="line"
                  color="primary"
                  @click="openModalP01"
                />
                <!-- S:: 퍼소나 유형 MODAL -->
                <ur-modal
                  ref="modal"
                  class="modal-b1c6"
                  large
                  title="퍼소나 유형"
                  @closed="closed"
                >
                  <P01 />
                </ur-modal>
                <!-- E:: 퍼소나 유형 MODAL -->
              </ur-form-item>
              <ur-form-item
                label="콘텐츠 명"
                :label-align="'right'"
                style="width: 50%; height: auto;"
                class="flex_wrap"
              >
                <ur-text-field
                  style="width: 100%;"
                  value=""
                />
              </ur-form-item>
              <ur-form-item
                label="노출여부"
                :label-align="'right'"
                style="width: 50%; height: auto;"
                class="flex_wrap"
              >
                <ur-checkbox
                  v-model="valueC1"
                  sm
                /><span
                  class="check_label"
                >Y</span>
                <ur-checkbox
                  v-model="valueC2"
                  sm
                /><span
                  class="check_label"
                >N</span>
              </ur-form-item>
              <ur-form-item
                label="방문상태"
                :label-align="'right'"
                style="width: 50%; height: auto;"
                class="flex_wrap"
              >
                <ur-checkbox
                  v-model="valueC3"
                  sm
                /><span
                  class="check_label"
                >방문 전</span>
                <ur-checkbox
                  v-model="valueC4"
                  sm
                /><span
                  class="check_label"
                >방문 중</span>
                <ur-checkbox
                  v-model="valueC5"
                  sm
                /><span
                  class="check_label"
                >방문 후</span>
              </ur-form-item>
              <ur-form-item
                label="노출 위치"
                :label-align="'right'"
                style="width: 50%; height: auto;"
              >
                <ur-dropdown
                  v-model="valueD1"
                  :items="itemsD1"
                />
              </ur-form-item>
              <ur-form-item
                label="언어구분"
                :label-align="'right'"
                style="width: 50%; height: auto;"
                class="flex_wrap"
              >
                <ur-checkbox
                  v-model="valueC6"
                  sm
                /><span
                  class="check_label"
                >국문</span>
                <ur-checkbox
                  v-model="valueC7"
                  sm
                /><span
                  class="check_label"
                >영문</span>
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
              :headers="columns"
              :data-source="list"
              :options="opts"
              :data-set-options="{id: 'id'}"
            >
              <template #right-info>
                <span class="guid_txt mr16">
                  *파일 용량 : 5MB 미만
                </span>
                <ur-button
                  color="violet"
                >
                  동기화
                </ur-button>
                <ur-button>
                  <ur-icon
                    icon="download"
                    icon-type="line"
                    size="small"
                    spacing
                  />
                  엑셀다운로드
                </ur-button>
                <ur-button>
                  <ur-icon
                    icon="upload"
                    icon-type="line"
                    size="small"
                    spacing
                  />
                  엑셀업로드
                </ur-button>
              </template>
            </ur-data-grid>
          </template>
        </ur-tab-content>
        <ur-tab-content
          :idx="2"
          label="캐리비안베이"
        >
          <h4>캐리비안베이</h4>
        </ur-tab-content>
      </ur-tab-box>
      <sui-page-footer>
        <div class="comm_btn_wrap" />
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
import P01 from './components/PGE_AAZ_00021_P01.vue'

export default {
  name: 'PGE_AAZ_00021', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
  },
  data() {
    return {
      // 드롭다운
      valueD1: '1',


      // 체크박스
      valueC1: ['Y'],
      valueC2: ['N'],
      valueC3: ['방문 전'],
      valueC4: ['방문 중'],
      valueC5: ['방문 후'],
      valueC6: ['국문'],
      valueC7: ['영문'],
      valuePC1: ['첫방문'],
      valuePC2: ['재방문'],


      opts: { // 토탈o
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: true,
      },


      columns: [
        { text: 'No.', value: 'value1', width: 40 },
        {
          text: '콘텐츠 명',
          value: 'value2',
          component: {
            template: '<div><ur-button shape="hyperlink">어린이날</ur-button></div>',
          },
        },
        { text: '언어 구분', value: 'value11' },
        { text: '노출 여부', value: 'value3' },
        { text: '노출 순서', value: 'value4' },
        { text: '노출 위치', value: 'value5' },
        { text: '콘텐츠 관리', value: 'value6' },
        { text: '퍼소나 코드', value: 'value10' },
        { text: '퍼소나 유형', value: 'value7' },
        { text: '방문 상태', value: 'value8' },
        { text: '멤버십 등급', value: 'value9' },
      ],
      list: [
        {
          value1: '999', value2: '', value3: 'Y', value4: '1', value5: '추천코스', value6: '코스', value7: '1~4세, 여유와 힐링 / 부모님, 여유와 힐링', value8: '전 / 중', value9: 'T1 / T2 / T3 / T4 / T5', value10: '1', value11: '국문',
        },
      ],


    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // 드롭다운
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '추천코스' })
      rtn.push({ value: '3', text: '기본 상품' })
      rtn.push({ value: '4', text: '이용권 상품' })
      rtn.push({ value: '5', text: '체험 상품' })
      rtn.push({ value: '6', text: '편의 상품' })
      rtn.push({ value: '7', text: '이용 꿀팁' })
      rtn.push({ value: '8', text: '이달의 혜택' })
      rtn.push({ value: '9', text: '시설' })
      return rtn
    },


    // modalpopup
    modalP01() {
      return this.$refs.modal
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
    openModalP01() { this.modalP01.open() },
    closeModal() { this.modalP01.close() },
    closed() {},
  },
}
</script>
<style scoped>
</style>
