<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S:: 노출정보 -->
      <div class="comm_title_wrap">
        <h4>
          노출 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="이벤트 명"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          2023 미션
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="이벤트 기간"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          2022-10-13 10:00 ~ 2022-11-13 22:00
        </ur-form-item>
        <ur-form-item
          label="노출 여부"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          Y
        </ur-form-item>
        <ur-form-item
          label="미션 상세 배너 이미지"
          :label-align="'right'"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          미션_상세 배너 이미지.jpg
        </ur-form-item>
        <ur-form-item
          label="뱃지 상세 배너 이미지"
          :label-align="'right'"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          뱃지_상세 배너 이미지.jpg
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 노출정보 -->

      <!-- S:: 미션 정보 -->
      <div class="comm_title_wrap mt20">
        <h4>
          미션 정보
        </h4>
      </div>
      <ur-data-grid
        ref="grid01"
        :headers="columnsT1"
        :data-source="listT1"
        :options="opts1"
        :data-set-options="{id: 'id'}"
      />

      <!-- E:: 미션 정보 -->


      <!-- S:: 보상 정보(뱃지) -->
      <div class="comm_title_wrap mt20">
        <h4>
          보상 정보(뱃지)
        </h4>
      </div>
      <ur-data-grid
        ref="grid02"
        :headers="columnsT2"
        :data-source="listT2"
        :options="opts1"
        :data-set-options="{id: 'id'}"
        style="white-space:nowrap; overflow:hidden; text-overflow: :ellipsis;"
      />
      <!-- E:: 보상 정보(뱃지) -->

      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button>
              목록
            </ur-button>
          </div>
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

export default {
  name: 'PGE_AAZ_00082', // eslint-disable-line vue/name-property-casing
  data() {
    return {
      // 테이블 옵션
      opts1: { // 토탈 x 전체선택X 셀선택 o
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      // 라디오 버튼
      R1: null,

      // 미션정보 테이블 라디오 버튼
      T1R1: null,

      // 미션정보 테이블 드롭다운
      T1D1: null,
      T1D2: null,

      // 보상정보(뱃지) 테이블 드롭다운
      T2D1: null,

      // 미션 정보 테이블
      columnsT1: [
        {
          text: 'No.', value: 'value1', width: 60, align: 'center',
        },
        {
          text: '미션 분류 (1)',
          value: 'value2',
          width: 120,
        },
        {
          text: '미션 분류 (2)',
          value: 'value3',
          width: 120,
        },
        {
          text: '미션 명',
          value: 'value4',
          width: 200,
        },
        {
          text: '달성 조건',
          value: 'value5',
          width: 150,
        },
        {
          text: '사용 여부',
          value: 'value6',
        },
      ],
      listT1: [
        {
          value1: '1', value2: '입장/구매', value3: '입장', value4: '에버랜드 3회 입장', value5: '이용권 번호', value6: 'Y',
        },
        {
          value1: '2', value2: '입장/구매', value3: '음식', value4: '쿠치나마리오 이용하기', value5: '시설 이용', value6: 'Y',
        },
      ],

      // 보상 정보 (뱃지) 테이블
      columnsT2: [
        {
          text: 'No.',
          value: 'value1',
          width: 60,
          align: 'center',
        },
        {
          text: '뱃지 분류',
          value: 'value2',
          width: 120,
        },
        {
          text: '뱃지 명',
          value: 'value3',
          width: 120,
        },
        {
          text: '뱃지 설명',
          value: 'value4',
          width: 350,
        },
        {
          text: '벳지 비활성화 이미지',
          value: 'value5',
          width: 170,
        },
        {
          text: '뱃지 활성화 이미지',
          value: 'value6',
        },


      ],
      listT2: [
        {
          value1: '1', value2: '어트랙션 뿌시기', value3: '에버랜드 마스터', value4: '에버랜드 3회 입장한 당신은 즐거운 즐길 줄 아는 멋쟁이 !', value5: '뱃지_비활성화.jpg', value6: '뱃지_활성화.jpg',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

    // modalPopUp
    modalP01() {
      return this.$refs.modalP01
    },
    modalP02() {
      return this.$refs.modalP02
    },

    // 미션 정보 테이블 드랍다운
    itemsT1D1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '입장/구매' })
      rtn.push({ value: '3', text: 'App 이용' })
      rtn.push({ value: '4', text: '파크 이용' })
      return rtn
    },

    // 미션 정보 테이블 드랍다운
    itemsT1D2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '입장' })
      rtn.push({ value: '3', text: '음식' })
      rtn.push({ value: '4', text: 'md' })
      rtn.push({ value: '5', text: '체험' })
      return rtn
    },

    // 보상 정보 (뱃지) 테이블 드랍다운
    itemsT2D1() {
      const rtn = []
      rtn.push({ value: '1', text: '' })
      rtn.push({ value: '2', text: '' })
      rtn.push({ value: '3', text: '' })
      rtn.push({ value: '4', text: '' })
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
    openModalP01() { this.modalP01.open() },
    openModalP02() { this.modalP02.open() },
    closeModal() { this.modal.close() },
    closed() {},
  },
}
</script>
<style scoped>
</style>
