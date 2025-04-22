<template>
  <div>
    <template slot="title">
      <div class="modal-title">
        참여 조건 정보 설정
      </div>
    </template>
    <template>
      <div class="modal-body">
        <!-- ::S 콘텐츠1 -->
        <div class="comm_title_wrap">
          <h4>
            조건 정보
          </h4>
          <div class="title_compo">
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
        </div>
        <ur-data-grid
          ref="grid01"
          :headers="columnsP1T1"
          :data-source="listP1T1"
          :options="options"
          :data-set-options="{id: 'id'}"
        />
        <!-- ::S 필터 검색 내 모달팝업버튼 개발완료시 삭제 요함 -->
        <div class="btn_wrap">
          <div class="right_box">
            <ur-button
              color="violet"
              @click="openModalP03"
            >
              <ur-modal
                ref="modalP03"
                class="modal-b1c6"
                xlarge
                title="필터 검색"
                @closed="closed"
              >
                <P03 />
                <!-- :page-id="contextPageId" -->
              </ur-modal>
              필터 검색팝업
            </ur-button>
          </div>
        </div>
        <!-- ::E 필터 검색 내 모달팝업버튼 개발완료시 삭제 요함 -->
        <!-- 추가기준 -->
        <ur-data-grid
          ref="grid02"
          :headers="columnsP1T2"
          :data-source="listP1T2"
          :options="options"
          :data-set-options="{id: 'id'}"
        />
        <!-- 멤버십등급 -->
        <ur-data-grid
          ref="grid03"
          :headers="columnsP1T3"
          :data-source="listP1T3"
          :options="options"
          :data-set-options="{id: 'id'}"
        />
        <!-- ::E 콘텐츠1 -->
      </div>
    </template>
    <template>
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
    </template>
  </div>
</template>

<script>
import P03 from './PGE_AAZ_00077_P03.vue'


export default {
  name: 'PGE_AAZ_00077_P01', // eslint-disable-line vue/name-property-casing
  components: {
    P03,
  },
  data() {
    return {
      itemsT2D1: [
        { value: '1', text: '입장 여부' },
        { value: '2', text: '정기권 여부' },
        { value: '3', text: '마케팅 수신 동의 여부' },
        { value: '4', text: '멤버십 등급' },
      ],
      // 코스팝업드랍다운
      valueT1D1: '1',
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: true,
      },
      // 팝업라디오버튼
      P1R1: null,
      P1R2: null,

      // 코스팝업테이블
      columnsP1T1: [
        { text: 'No.', value: 'value1', width: 40 },
        {
          text: '분류',
          value: 'value2',
          required: true,
          component: {
            template: '<div><ur-radio v-model="P1R1" value="Radio01" sm>필터</ur-radio><ur-radio v-model="P1R1" value="Radio02" sm>추가 기준</ur-radio></div>',
          },
        },
        {
          text: '항목',
          value: 'value3',
          required: true,
          component: {
            template: '<div><ur-text-field value="" /><ur-icon-button class="ml16" icon="search" icon-type="line" color="primary" @click="" /></div>',
          },
        },
        {
          text: '선택 값',
          value: 'value4',
          required: true,
        },
      ],
      listP1T1: [
        {
          value1: '1', value2: '', value3: '', value4: '-',
        },
      ],
      // 추가기준
      columnsP1T2: [
        { text: 'No.', value: 'value1', width: 40 },
        {
          text: '분류',
          value: 'value2',
          required: true,
          component: {
            template: '<div><ur-radio v-model="P1R1" value="Radio01" sm>필터</ur-radio><ur-radio v-model="P1R1" value="Radio02" sm>추가 기준</ur-radio></div>',
          },
        },
        {
          text: '항목',
          value: 'value3',
          required: true,
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code1" :items="me.itemsT2D1"/></div>',
            data() {
              return {
                code1: this.value,
              }
            },
          },
        },
        {
          text: '선택 값',
          value: 'value4',
          required: true,
          component: {
            template: '<div><ur-radio v-model="P1R2" value="Radio01" sm>Y</ur-radio><ur-radio v-model="P1R2" value="Radio02" sm>N</ur-radio></div>',
          },
        },
      ],
      listP1T2: [
        {
          value1: '2', value2: '', value3: '', value4: '',
        },
      ],
      // 멤버십 등급
      columnsP1T3: [
        { text: 'No.', value: 'value1', width: 40 },
        {
          text: '분류',
          value: 'value2',
          required: true,
          component: {
            template: '<div><ur-radio v-model="P1R1" value="Radio01" sm>필터</ur-radio><ur-radio v-model="P1R1" value="Radio02" sm>추가 기준</ur-radio></div>',
          },
        },
        {
          text: '항목',
          value: 'value3',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code1" :items="me.itemsT2D1"/></div>',
            data() {
              return {
                code1: this.value,
              }
            },
          },
        },
        {
          text: '선택 값',
          value: 'value4',
          required: true,
          component: {
            template: '<div><ur-checkbox v-model="valueP1C1" sm/><span class="check_label" >T1</span><ur-checkbox v-model="valueP1C2" sm/><span class="check_label" >T2</span><ur-checkbox v-model="valueP1C3" sm/><span class="check_label" >T3</span><ur-checkbox v-model="valueP1C4" sm/><span class="check_label" >T4</span><ur-checkbox v-model="valueP1C5" sm/><span class="check_label" >T5</span></div>',
          },
        },
      ],
      listP1T3: [
        {
          value1: '3', value2: '', value3: '', value4: '',
        },
      ],

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    modalP03() {
      return this.$refs.modalP03
    },
    // 코스팝업 드랍다운 1
    itemsP1D1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '1~4세' })
      rtn.push({ value: '3', text: '유치원' })
      rtn.push({ value: '4', text: '초등저' })
      rtn.push({ value: '5', text: '초등고' })
      rtn.push({ value: '6', text: '중등이상' })
      rtn.push({ value: '7', text: '이성친구 포함' })
      rtn.push({ value: '8', text: '동성친구' })
      rtn.push({ value: '9', text: '연인(부부)' })
      return rtn
    },
    // 코스팝업 드랍다운 2
    itemsP1D2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '다양하게 풀코스' })
      rtn.push({ value: '3', text: '기다리는게 제일 싫어' })
      rtn.push({ value: '4', text: '놀이기구 홀릭' })
      rtn.push({ value: '5', text: '여유와 힐링' })
      rtn.push({ value: '6', text: '놀면서 배우자' })
      rtn.push({ value: '7', text: '새로운게 좋아' })
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
    openModalP03() { this.modalP03.open() },
    closeModal() {},
    closed() {},
  },
}
</script>
<style scoped>
</style>
