<template>
  <div>
    <template slot="title">
      <div class="modal-title mb45">
        일자별 Q-PASS Tier 관리
      </div>
    </template>
    <template>
      <div class="modal-body">
        <!-- ::S 콘텐츠1 -->
        <ur-form-box toggleable>
          <ur-form-item
            label="시설명"
            :label-align="'right'"
            style="width: 100%; height: auto;"
            required
          >
            <ur-dropdown
              v-model="valueP1D1"
              :items="itemsP1D1"
              style="width: 50%;"
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
        <!-- ::E 콘텐츠1 -->
        <!-- ::S 콘텐츠2 -->
        <ur-data-grid
          ref="grid"
          :headers="columnsP1T1"
          :data-source="listP1T1"
          :options="options"
          :data-set-options="{id: 'id'}"
          height="300"
        >
          <template
            #left-info
          >
            <div>
              <ur-button color="violet">
                추가
              </ur-button>
              <ur-button color="violet">
                삭제
              </ur-button>
              <ur-button color="violet">
                초기화
              </ur-button>
            </div>
          </template>
        </ur-data-grid>
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
        <!-- ::E 콘텐츠2 -->
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'PGE_AAZ_00011_P01', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 일자별 Q-PASS Tier 관리 시설 명 드랍다운 데이터
      itemsP1D1: [
        { value: '1', text: 'T익스프레스' },
        { value: '2', text: '판다월드' },
        { value: '3', text: '오리엔탈 누들 레스토랑' },
        { value: '4', text: '아마존 스낵' },
        { value: '5', text: '카니발 판타지 퍼레이드' },
        { value: '6', text: '슈퍼윙즈 애니멀톡' },
        { value: '7', text: '모나미 컨셉 스토어' },
        { value: '8', text: '데블스 락' },
        { value: '9', text: 'VR 어드벤처' },
        { value: '10', text: '베네치아 피자' },
      ],

      // 일자별 Q-PASS Tier 관리 테이블 내 드랍다운 데이터
      itemsP1T1D1: [
        { value: '1', text: '미사용' },
        { value: '2', text: 'Tier 1' },
        { value: '3', text: 'Tier 2' },
      ],

      // 일자별 Q-PASS Tier 관리 시설 명 드랍다운
      valueP1D1: '1',

      // 일자별 Q-PASS Tier 테이블 내 Q-PASS 그룹 드랍다운
      valueP1T1D1: '1',

      // 테이블
      options: { // 토탈o
        // msgTotal: false,
        noInfo: false,
        selectCheck: true,
        noBaseInfo: false,
      },

      // 일자별 Q-PASS Tier 관리 테이블
      columnsP1T1: [
        {
          text: '시작날짜',
          value: 'value1',
          width: 350,
          required: true,
          component: {
            template: '<div><ur-date-picker style="padding-right:20px; width:50% !important;" v-model="dateValue1" auto-confirm/></div>',
          },
        },
        {
          text: '종료날짜',
          value: 'value2',
          required: true,
          width: 350,
          component: {
            template: '<div><ur-date-picker style="padding-right:20px; width:50% !important;" v-model="dateValue2" auto-confirm/></div>',
          },
        },
        {
          text: 'Q-PASS 그룹',
          value: 'value3',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown style="width:60%;" v-model="code1" :items="me.itemsP1T1D1" /></div>',
            data() {
              return {
                code1: this.value,
              }
            },
          },
        },
      ],

      listP1T1: [
        {
          value1: '',
          value2: '',
          value3: '',
        },
        {
          value1: '',
          value2: '',
          value3: '',
        },
      ],
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
