<template>
  <div>
    <template slot="title">
      <div class="modal-title">
        콘텐츠 관리-코스
      </div>
    </template>
    <template>
      <div class="modal-body">
        <!-- ::S 콘텐츠1 -->
        <ur-form-box toggleable>
          <ur-form-item
            label="미션 코드"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            <ur-text-field
              value=""
              style="width: 100%;"
            />
          </ur-form-item>
          <ur-form-item
            label="미션 명"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            <ur-text-field
              value=""
              style="width: 100%;"
            />
          </ur-form-item>
        </ur-form-box>
        <!-- ::E 콘텐츠1 -->
        <div class="comm_btn_wrap">
          <div class="right_box">
            <ur-button>
              초기화
            </ur-button>
            <ur-button color="violet">
              검색
            </ur-button>
          </div>
        </div>
        <!-- ::S 콘텐츠2 -->
        <ur-data-grid
          ref="grid"
          :headers="columnsP1T1"
          :data-source="listP1T1"
          :options="options"
          :data-set-options="{id: 'id'}"
        />
        <!-- ::E 콘텐츠2 -->
      </div>
    </template>
    <template>
      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="right_box">
            <ur-button @click="closeModal">
              닫기
            </ur-button>
            <ur-button color="violet">
              선택
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </template>
  </div>
</template>

<script>

export default {
  name: 'PGE_AAZ_00081_P01', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 코스팝업드랍다운
      valueT1D1: '1',
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      // 팝업라디오버튼
      P1R1: null,
      P1R2: null,

      // 코스팝업테이블
      columnsP1T1: [
        { text: '미션 코드', value: 'value1' },
        { text: '미션 명', value: 'value2' },
        { text: '등록일시', value: 'value3' },
        { text: '등록자', value: 'value4' },
      ],

      listP1T1: [
        {
          value1: '1002036992', value2: '에버랜드 입장', value3: '2022-10-13 15:35:35', value4: 'BJ123',
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
    closeModal() {},
  },
}
</script>
<style scoped>
</style>
