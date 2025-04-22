<template>
  <div>
    <template slot="title">
      <div class="modal-title mb45">
        콘텐츠관리-이벤트
      </div>
    </template>
    <template>
      <div class="modal-body">
        <!-- ::S 콘텐츠1 -->
        <ur-form-box toggleable>
          <ur-form-item
            label="이벤트 유형"
            :label-align="'right'"
            required
            style="width: 50%; height: auto;"
          >
            <ur-dropdown
              v-model="valueP4D1"
              :items="itemsP4D1"
            />
          </ur-form-item>
          <ur-form-item
            label="제목"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            <ur-text-field
              value=""
              style="width: 100%;"
            />
          </ur-form-item>
          <ur-form-item
            label="이벤트 기간"
            :label-align="'right'"
            required
            style="width: 100%; height: auto;"
          >
            <ur-range-picker
              auto-confirm
              input-type="YYYY-MM-DD"
              init="day+30"
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
          :headers="columnsP4T1"
          :data-source="listP4T1"
          :options="opts"
          :data-set-options="{id: 'id'}"
        />
        <!-- ::E 콘텐츠2 -->
      </div>
    </template>
    <template>
      <div class="comm_btn_wrap bt1">
        <div class="right_box mt10">
          <ur-button @click="closeModalP04">
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
  name: 'PGE_AAZ_00022_P04', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 이벤트팝업드랍다운
      valueP4D1: '1',
      opts: { // 토탈 O
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
      },
      // 이벤트팝업테이블
      columnsP4T1: [
        { text: 'No.', value: 'value1', width: 40 },
        { text: '유형', value: 'value2', width: 100 },
        { text: '노출여부', value: 'value3', width: 100 },
        { text: '제목', value: 'value4' },
      ],

      listP4T1: [
        {
          value1: '1', value2: '응모 이벤트', value3: 'Y', value4: '[공지] 동계 시즌 어트랙션 운영 안내',
        },
        {
          value1: '2', value2: '응모 이벤트', value3: 'Y', value4: '[공지] 코로나 바이러스 감염증-19 관련 안내',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // 이벤트팝업 드랍다운 1
    itemsP4D1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: 'OX퀴즈' })
      rtn.push({ value: '3', text: '출석체크 이벤트' })
      rtn.push({ value: '4', text: '룰렛 이벤트' })
      rtn.push({ value: '5', text: '스탬프 이벤트' })
      rtn.push({ value: '6', text: '응모 이벤트' })
      rtn.push({ value: '7', text: '파크 이벤트' })
      rtn.push({ value: '8', text: '전광판 이벤트' })
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
    closeModalP04() {},
  },
}
</script>
<style scoped>
</style>
