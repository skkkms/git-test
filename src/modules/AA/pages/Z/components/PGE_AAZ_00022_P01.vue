<template>
  <div>
    <template slot="title">
      <div class="modal-title mb45">
        콘텐츠 관리-코스
      </div>
    </template>
    <template>
      <div class="modal-body">
        <!-- ::S 콘텐츠1 -->
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
            class="flex_wrap"
            label="게시 구분"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <ur-radio
              v-model="P1R1"
              value="Radio 01"
              sm
            >
              코스ID
            </ur-radio>
            <ur-radio
              v-model="P1R1"
              value="Radio 02"
              sm
            >
              코스명
            </ur-radio>
            <ur-text-field
              value=""
              style="width: 80%;"
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
          :options="opts"
          :data-set-options="{id: 'id'}"
        />
        <!-- ::E 콘텐츠2 -->
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
  name: 'PGE_AAZ_00022_P01', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 코스팝업드랍다운
      valueP1D1: '1',
      valueP1D2: '1',
      opts: { // 토탈 O
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
      },
      // 팝업라디오버튼
      P1R1: 'Radio 01',

      // 코스팝업테이블
      columnsP1T1: [
        { text: 'No.', value: 'value1', width: 40 },
        { text: '코스 명', value: 'value2', width: 150 },
        { text: '코스 ID', value: 'value3', width: 100 },
        { text: '동반인', value: 'value4', width: 100 },
        { text: '놀이유형', value: 'value5', width: 100 },
        { text: '포함 시설', value: 'value6' },
      ],

      listP1T1: [
        {
          value1: '1', value2: '어린이날 코스 1', value3: '123456', value4: '1~4세', value5: '여유와 힐링', value6: '롤링 엑스 트레인, T 익스프레스, Cafe 정글 캠프,...',
        },

      ],

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // 코스팝업 드랍다운 1
    itemsP1D1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '1~4세' })
      rtn.push({ value: '3', text: '유치원' })
      rtn.push({ value: '4', text: '초등저' })
      rtn.push({ value: '5', text: '초등고' })
      rtn.push({ value: '6', text: '중등이상' })
      rtn.push({ value: '7', text: '혼성친구 ' })
      rtn.push({ value: '8', text: '동성친구' })
      rtn.push({ value: '9', text: '연인(부부)' })
      return rtn
    },
    // 코스팝업 드랍다운 2
    itemsP1D2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '다양하게 풀코스' })
      rtn.push({ value: '3', text: '기다림없이 플렉스 하며' })
      rtn.push({ value: '4', text: '많은 놀이기구 타며' })
      rtn.push({ value: '5', text: '여유와 힐링' })
      rtn.push({ value: '6', text: '재미있게 공부하며' })
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
