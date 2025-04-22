<template>
  <div>
    <template slot="title">
      <div class="modal-title">
        퍼소나 유형
      </div>
    </template>
    <template>
      <div class="modal-body">
        <ur-form-box toggleable>
          <ur-form-item
            label="동반인"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            <ur-dropdown
              v-model="valueP1D1"
              :items="itemsP1D1"
            />
          </ur-form-item>
          <ur-form-item
            label="방문 유형"
            :label-align="'right'"
            style="width: 50%; height: auto; border-top: 0;"
          >
            <ur-checkbox
              v-model="valueP1C1"
              sm
            /><span
              class="check_label"
            >첫방문</span>
            <ur-checkbox
              v-model="valueP1C2"
              sm
            /><span
              class="check_label"
            >재방문</span>
          </ur-form-item>
          <ur-form-item
            label="놀이 유형"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            <ur-dropdown
              v-model="valueP1D2"
              :items="itemsP1D2"
            />
          </ur-form-item>
          <ur-form-item
            label="퍼소나 코드"
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
          :headers="columnsP1T1"
          :options="opts"
          :data-source="listP1T1"
          :data-set-options="{id: 'id'}"
        />
      </div>
    </template>
    <template>
      <div class="comm_btn_wrap bt1">
        <div class="right_box mt10">
          <ur-button @click="closeModal">
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

export default {
  name: 'PGE_AAZ_00021_P01', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 팝업드롭다운
      valueP1D1: '1',
      valueP1D2: '1',
      // 테이블 옵션
      opts: { // 토탈 O
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
        height: 280,
      },

      // 퍼소나 팝업 테이블
      columnsP1T1: [
        { text: 'No.', value: 'id', width: 40 },
        { text: '방문 유형', value: 'str1', width: 80 },
        { text: '동반인', value: 'str2', width: 80 },
        { text: '놀이 유형', value: 'str3', width: 240 },
        { text: '퍼소나 유형', value: 'str4' },
        { text: '퍼소나 코드', value: 'str5' },
      ],
      listP1T1: [
        {
          id: '1', str1: '첫방문', str2: '1~4세', str3: '다양하게 풀코스', str4: '하나도 놓치지 않는 초보부모 강산이', str5: '-',
        },
        {
          id: '2', str1: '첫방문', str2: '1~4세', str3: '여유와 힐링', str4: '유유자적 여유를 즐기는 초보부모 푸바오', str5: '-',
        },
        {
          id: '3', str1: '첫방문', str2: '1~4세', str3: '놀면서 배우자', str4: '공부와 재미 모두 잡는 초보부모 랄라', str5: '-',
        },
        {
          id: '4', str1: '첫방문', str2: '유치원생', str3: '다양하게 풀코스', str4: '하나도 놓치지 않는 유치한 부모 강산이', str5: '-',
        },
        {
          id: '5', str1: '첫방문', str2: '유치원생', str3: '기다리는게 제일 싫어', str4: '모든걸 빨리빨리! 참지 않는 유치한 부모 네로', str5: '-',
        },
        {
          id: '5', str1: '-', str2: '-', str3: '-', str4: '미선택', str5: '-',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // 팝업드롭다운
    itemsP1D1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '1~4세' })
      rtn.push({ value: '3', text: '유치원' })
      rtn.push({ value: '4', text: '초등저' })
      rtn.push({ value: '5', text: '초등고' })
      rtn.push({ value: '6', text: '중등이상' })
      rtn.push({ value: '7', text: '부모님' })
      rtn.push({ value: '8', text: '이성친구포함' })
      rtn.push({ value: '9', text: '동성친구' })
      rtn.push({ value: '10', text: '연인(부부)' })
      return rtn
    },
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
    closeModal() {},
  },
}
</script>
<style scoped>
</style>
