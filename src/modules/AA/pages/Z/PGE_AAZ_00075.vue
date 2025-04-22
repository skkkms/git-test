<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>이벤트 정보</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="게시 구분"
          :label-align="'right'"
          style="width:100%; height: auto;"
        >
          에버랜드
        </ur-form-item>
        <ur-form-item
          label="이벤트 구분"
          :label-align="'right'"
          style="width:50%; height: auto;"
        >
          온라인 이벤트
        </ur-form-item>
        <ur-form-item
          label="이벤트 분류"
          :label-align="'right'"
          style="width:50%; height: auto;"
        >
          OX 퀴즈
        </ur-form-item>
        <ur-form-item
          label="노출 여부"
          :label-align="'right'"
          style="width:50%; height: auto;"
        >
          Y
        </ur-form-item>
        <ur-form-item
          label="이벤트 기간"
          :label-align="'right'"
          style="width:50%; height: auto;"
        >
          2022-10-13 10:00~2022-11-13 22:00
        </ur-form-item>
        <ur-form-item
          label="이벤트 명"
          :label-align="'right'"
          style="width:100%; height: auto;"
        >
          1월 OX 퀴즈
        </ur-form-item>
      </ur-form-box>
      <div class="comm_title_wrap mt45">
        <h4>보상 정보</h4>
      </div>
      <!-- ::S OX 퀴즈 보상정보 테이블 -->
      <ur-data-grid
        ref="grid01"
        :headers="columnsT1_6"
        :data-source="listT1_6"
        :data-set-options="{id: 'id'}"
        :options="opts"
      />
      <!-- ::E OX 퀴즈 보상정보 테이블 -->

      <!-- ::S 미션 보상정보 -->
      <div class="comm_title_wrap mt45">
        <h4>보상 정보</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="구분"
          required
          :label-align="'right'"
          style="width:50%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD1_6"
            :items="itemsD1_6"
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="항목 명"
          required
          :label-align="'right'"
          style="width:50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- ::D 미션 보상정보 -->
      <div class="comm_title_wrap mt45">
        <h4>참여자 정보</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="구분"
          required
          :label-align="'right'"
          style="width:50%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD1_1"
            :items="itemsD1_1"
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="항목 명"
          required
          :label-align="'right'"
          style="width:50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- ::S 미션 참여자 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>참여자 정보</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="회원번호"
          :label-align="'right'"
          style="width:50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="미션 명"
          :label-align="'right'"
          style="width:50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="미션 분류 (1)"
          :label-align="'right'"
          style="width:50%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD2_1"
            :items="itemsD2_1"
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="미션 분류 (2)"
          :label-align="'right'"
          style="width:50%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD3_1"
            :items="itemsD3_1"
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="달성일시"
          :label-align="'right'"
          style="width:50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="보상 종류"
          :label-align="'right'"
          style="width:50%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD4_1"
            :items="itemsD4_1"
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- ::E 미션 참여자 정보 -->
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
      <ur-data-grid
        ref="grid02"
        :headers="columnsT2_1"
        :data-source="listT2_1"
        :data-set-options="{id: 'id'}"
        :options="opts1"
        class="custom_grid_pgeNav_None mt35"
      >
        <template
          #right-info
        >
          <ur-button
            @click="openModalP01"
          >
            <!-- 다운로드 사유 모달 -->
            <ur-modal
              ref="modalP01"
              xlarge
              dragable
              title="다운로드 사유"
              @closed="closed"
            >
              <P01 />
            <!-- :page-id="contextPageId" -->
            </ur-modal>
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
      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button>
              목록
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import P01 from './components/PGE_AAZ_00075_P01.vue'
export default {
  name: 'PGE_AAZ_00075', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
  },
  data() {
    return {
      // 드롭다운
      valueD1_1: '',
      valueD1_2: '',
      valueD1_3: '',
      valueD1_4: '',
      valueD1_5: '',
      valueD1_6: '',
      valueD2_1: '',
      valueD3_1: '',
      valueD3_2: '',
      valueD3_3: '',
      valueD4_1: '',
      valueD1_7: '',

      // 테이블
      opts: {
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      opts1: {
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
      },

      // OX퀴즈 보상정보 테이블
      columnsT1_1: [
        {
          text: '구분', value: 'value1',
        },
        {
          text: '경품 명',
          value: 'value2',
        },
        {
          text: '쿠폰 명',
          value: 'value3',
        },
        {
          text: '발급 건수',
          value: 'value4',
        },
        {
          text: '지급 건수',
          value: 'value5',
        },
      ],
      listT1_1: [
        {
          value1: '쿠폰', value2: '츄러스 쿠폰', value3: '츄러스 쿠폰', value4: '100', value5: '50',
        },
      ],
      // 스탬프 보상정보 테이블
      columnsT1_2: [
        {
          text: 'No.', value: 'value1',
        },
        {
          text: '구분',
          value: 'value2',
        },
        {
          text: '경품 명',
          value: 'value3',
        },
        {
          text: '쿠폰 명',
          value: 'value4',
        },
        {
          text: '발급 건수',
          value: 'value5',
        },
        {
          text: '지급 건수',
          value: 'value6',
        },
        {
          text: '보상 조건',
          value: 'value7',
        },
      ],
      listT1_2: [
        {
          value1: '1', value2: '쿠폰', value3: '츄러스 쿠폰', value4: '츄러스 쿠폰', value5: '100', value6: '50', value7: '3개 달성',
        },
      ],
      // 룰렛 보상정보 테이블
      columnsT1_3: [
        {
          text: 'No.', value: 'value1',
        },
        {
          text: '구분',
          value: 'value2',
        },
        {
          text: '경품 명',
          value: 'value3',
        },
        {
          text: '쿠폰 명',
          value: 'value4',
        },
        {
          text: '발급 건수',
          value: 'value5',
        },
        {
          text: '지급 건수',
          value: 'value6',
        },
      ],
      listT1_3: [
        {
          value1: '1', value2: '쿠폰', value3: '츄러스 쿠폰', value4: '츄러스 쿠폰', value5: '100', value6: '50',
        },
      ],
      // 응모 이벤트 보상정보 테이블
      columnsT1_4: [
        {
          text: 'No.', value: 'value1',
        },
        {
          text: '구분',
          value: 'value2',
        },
        {
          text: '경품 명',
          value: 'value3',
        },
        {
          text: '쿠폰 명',
          value: 'value4',
        },
        {
          text: '발급 건수',
          value: 'value5',
        },
        {
          text: '지급 건수',
          value: 'value6',
        },
      ],
      listT1_4: [
        {
          value1: '1', value2: '쿠폰', value3: '츄러스 쿠폰', value4: '츄러스 쿠폰', value5: '100', value6: '50',
        },
      ],
      // 출석체크 보상정보 테이블
      columnsT1_5: [
        {
          text: 'No.', value: 'value1',
        },
        {
          text: '구분',
          value: 'value2',
        },
        {
          text: '경품 명',
          value: 'value3',
        },
        {
          text: '쿠폰 명',
          value: 'value4',
        },
        {
          text: '발급 건수',
          value: 'value5',
        },
        {
          text: '지급 건수',
          value: 'value6',
        },
        {
          text: '보상 일자',
          value: 'value7',
        },
      ],
      listT1_5: [
        {
          value1: '1', value2: '쿠폰', value3: '츄러스 쿠폰', value4: '츄러스 쿠폰', value5: '100', value6: '100', value7: '7일 차',
        },
      ],
      // 미션 보상정보 테이블
      // 04/28 벨류 값, 텍스트 수정
      columnsT1_6: [
        {
          text: 'No.', value: 'value1',
        },
        {
          text: '미션 분류 (1)',
          value: 'value2',
        },
        {
          text: '미션 분류 (2)',
          value: 'value3',
        },
        {
          text: '미션 명',
          value: 'value4',
        },
        {
          text: '보상 종류',
          value: 'value5',
        },
        {
          text: '뱃지 명',
          value: 'value6',
        },
        {
          text: '노출 여부',
          value: 'value7',
        },

      ],
      listT1_6: [
        {
          value1: '1', value2: '입장/구매', value3: '입장', value4: '에버랜드 3회 입장하기', value5: '뱃지', value6: '에버랜드 마스터', value7: 'Y',
        },
      ],
      // 미니게임 보상정보 테이블
      columnsT1_7: [
        {
          text: 'No.', value: 'value1',
        },
        {
          text: '쿠폰 명',
          value: 'value2',
        },
        {
          text: '발급 건수',
          value: 'value3',
        },
        {
          text: '지급 건수',
          value: 'value4',
        },
      ],
      listT1_7: [
        {
          value1: '1', value2: '츄러스 쿠폰', value3: '100', value4: '100',
        },
      ],
      // OX퀴즈 참여자정보 테이블
      columnsT2_1: [
        {
          text: 'No.',
          value: 'value1',
        },
        {
          text: '회원번호',
          value: 'value2',
        },
        {
          text: '정답 개수',
          value: 'value3',
        },
        {
          text: '참여일시',
          value: 'value4',
        },
      ],
      listT2_1: [
        {
          value1: '150', value2: 'abcd12345678901', value3: '2', value4: '2022-10-13 15:35:35',
        },
      ],
      // 스탬프 참여자정보 테이블
      columnsT2_2: [
        {
          text: 'No.',
          value: 'value1',
        },
        {
          text: '회원번호',
          value: 'value2',
        },
        {
          text: '달성 항목',
          value: 'value3',
        },
        {
          text: '달성일시',
          value: 'value4',
        },
      ],
      listT2_2: [
        {
          value1: '150', value2: 'abcd12345678901', value3: '어트랙션 3개 타기', value4: '2022-10-13 15:35:35',
        },
      ],
      // 룰렛 참여자정보 테이블
      columnsT2_3: [
        {
          text: 'No.',
          value: 'value1',
        },
        {
          text: '회원번호',
          value: 'value2',
        },
        {
          text: '룰렛 결과',
          value: 'value3',
        },
        {
          text: '참여일시',
          value: 'value4',
        },
      ],
      listT2_3: [
        {
          value1: '150', value2: 'abcd12345678901', value3: '츄러스 쿠폰', value4: '2022-10-13 15:35:35',
        },
      ],
      // 응모 이벤트 참여자정보 테이블
      columnsT2_4: [
        {
          text: 'No.',
          value: 'value1',
        },
        {
          text: '회원번호',
          value: 'value2',
        },
        {
          text: '응모일시',
          value: 'value3',
        },
        {
          text: '당첨여부',
          value: 'value4',
        },
      ],
      listT2_4: [
        {
          value1: '150', value2: 'abcd12345678901', value3: '2022-10-13 15:35:35', value4: 'Y',
        },
      ],
      // 출석체크 참여자정보 테이블
      columnsT2_5: [
        {
          text: 'No.',
          value: 'value1',
        },
        {
          text: '회원번호',
          value: 'value2',
        },
        {
          text: '출석 수',
          value: 'value3',
        },
        {
          text: '출석일시',
          value: 'value4',
        },
      ],
      listT2_5: [
        {
          value1: '150', value2: 'abcd12345678901', value3: '1일 차', value4: '2022-10-13 15:35:35',
        },
      ],
      // 미션 참여자정보 테이블
      columnsT2_6: [
        {
          text: 'No.',
          value: 'value1',
        },
        {
          text: '회원번호',
          value: 'value2',
        },
        {
          text: '미션 분류 (1)',
          value: 'value3',
        },
        {
          text: '미션 분류 (2)',
          value: 'value4',
        },
        {
          text: '미션 명',
          value: 'value5',
        },
        {
          text: '달성일시',
          value: 'value6',
        },
        {
          text: '보상 종류',
          value: 'value7',
        },
        {
          text: '보상 명',
          value: 'value8',
        },
      ],
      listT2_6: [
        {
          value1: '150', value2: 'abcd12345678901', value3: '입장/구매', value4: '입장', value5: '에버랜드 3회 입장하기', value6: '2022-10-13 15:35:35', value7: '쿠폰', value8: '츄러스 쿠폰',
        },
      ],
      // 미니게임 참여자정보 테이블
      columnsT2_7: [
        {
          text: 'No.',
          value: 'value1',
        },
        {
          text: '회원번호',
          value: 'value2',
        },
        {
          text: '점수',
          value: 'value3',
        },
        {
          text: '참여일시',
          value: 'value4',
        },
      ],
      listT2_7: [
        {
          value1: '150', value2: 'abcd12345678901', value3: '90', value4: '2022-10-13 15:35:35',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // OX 퀴즈 참여자정보 드랍다운
    itemsD1_1() {
      const rtn = []
      rtn.push({ value: '1', text: '회원번호' })
      rtn.push({ value: '2', text: '정답 개수' })
      rtn.push({ value: '3', text: '참여일자' })
      return rtn
    },
    // 스탬프 참여자정보 드랍다운
    itemsD1_2() {
      const rtn = []
      rtn.push({ value: '1', text: '회원번호' })
      rtn.push({ value: '2', text: '달성 항목' })
      rtn.push({ value: '3', text: '달성일시' })
      return rtn
    },
    // 룰렛 참여자정보 드랍다운
    itemsD1_3() {
      const rtn = []
      rtn.push({ value: '1', text: '회원번호' })
      rtn.push({ value: '2', text: '룰렛 결과' })
      rtn.push({ value: '3', text: '참여일시' })
      return rtn
    },
    // 응모 이벤트 참여자정보 드랍다운
    itemsD1_4() {
      const rtn = []
      rtn.push({ value: '1', text: '회원번호' })
      rtn.push({ value: '2', text: '응모일시' })
      rtn.push({ value: '3', text: '당첨여부' })
      return rtn
    },
    // 출석체크 참여자정보 드랍다운
    itemsD1_5() {
      const rtn = []
      rtn.push({ value: '1', text: '회원번호' })
      rtn.push({ value: '2', text: '출석 수' })
      rtn.push({ value: '3', text: '출석일시' })
      return rtn
    },
    // 미션 참여자정보 드랍다운
    itemsD1_6() {
      const rtn = []
      rtn.push({ value: '1', text: '미션 분류 (1)' })
      rtn.push({ value: '2', text: '미션 분류 (2)' })
      rtn.push({ value: '3', text: '미션 명' })
      rtn.push({ value: '4', text: '보상 종류' })
      rtn.push({ value: '5', text: '쿠폰(뱃지)명' })
      return rtn
    },
    // 미션 참여자정보 미션분류1 드랍다운
    itemsD2_1() {
      const rtn = []
      rtn.push({ value: '1', text: '입장/구매' })
      rtn.push({ value: '2', text: 'App 이용' })
      rtn.push({ value: '3', text: '파크 이용' })
      return rtn
    },
    // 미션 참여자정보 미션분류2 드랍다운
    itemsD3_1() {
      const rtn = []
      rtn.push({ value: '1', text: '입장' })
      rtn.push({ value: '2', text: '음식' })
      rtn.push({ value: '3', text: 'md' })
      rtn.push({ value: '4', text: '체험' })
      return rtn
    },
    itemsD3_2() {
      const rtn = []
      rtn.push({ value: '1', text: '멤버십/포인트' })
      rtn.push({ value: '2', text: '이벤트 참여' })
      rtn.push({ value: '3', text: '서브클럽' })
      rtn.push({ value: '4', text: '코스' })
      return rtn
    },
    itemsD3_3() {
      const rtn = []
      rtn.push({ value: '1', text: '어트랙션' })
      rtn.push({ value: '2', text: '동물' })
      rtn.push({ value: '3', text: '공연' })
      rtn.push({ value: '4', text: '축제' })
      return rtn
    },
    // 미션 참여자정보 보상 종류 드랍다운
    // 04/28 벨류 값 수정
    itemsD4_1() {
      const rtn = []
      rtn.push({ value: '1', text: '뱃지' })
      rtn.push({ value: '2', text: '보상 없음' })
      return rtn
    },
    // 미니게임 보상정보 드랍다운
    itemsD1_7() {
      const rtn = []
      rtn.push({ value: '1', text: '회원번호' })
      rtn.push({ value: '2', text: '점수' })
      rtn.push({ value: '3', text: '참여일시' })
      return rtn
    },

    // modalPopUp
    modalP01() {
      return this.$refs.modalP01
    },
  },

  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  mounted() { },
  methods: {
    openModalP01() {
      this.modalP01.open()
    },
    closeModal() { this.modalP01.close() },
    closed() {},
  },
}
</script>
<style scoped>
</style>
