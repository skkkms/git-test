<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>
          사용자 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="회원번호"
          :label-align="'right'"
          style="width:50%; height:auto;"
          class="flex-wrap"
        >
          abcd12345678901
        </ur-form-item>
        <ur-form-item
          label="아이디"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          qwer123
        </ur-form-item>
        <ur-form-item
          label="이름"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          이은비
        </ur-form-item>
        <ur-form-item
          label="휴대폰 번호"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          010-1234-5678
        </ur-form-item>
        <ur-form-item
          label="회원등급"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          T1
        </ur-form-item>
        <ur-form-item
          label="가입일"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          2022-10-13
        </ur-form-item>
      </ur-form-box>
      <ur-tab-box
        default-idx="1"
        class="mt35"
      >
        <ur-tab-content
          idx="1"
          label="OX 퀴즈"
        >
          <div class="comm_title_wrap">
            <h4>
              이벤트 참여 정보
            </h4>
          </div>
          <ur-data-grid
            ref="grid"
            :headers="columnsT1"
            :data-source="listT1"
            :data-set-options="{id: 'id'}"
            :options="opts"
          />
        </ur-tab-content>
        <ur-tab-content
          idx="2"
          label="스탬프"
        >
          <div class="comm_title_wrap">
            <h4>
              이벤트 참여 정보
            </h4>
          </div>
          <ur-data-grid
            ref="grid"
            :headers="columnsT2"
            :data-source="listT2"
            :data-set-options="{id: 'id'}"
            :options="opts"
          />
          <!-- ::S 테이블 내 모달팝업버튼 개발완료시 삭제 요함 -->
          <div class="btn_wrap mt10">
            <div class="right_box">
              <ur-button @click="openModalP01">
                스탬프 달성 현황 팝업
              </ur-button>
            </div>
          </div>
          <!-- ::E 코스테이블 내 모달팝업버튼 개발완료시 삭제 요함 -->

          <!-- ::S PGE_AAZ_00075_P02 -->
          <ur-modal
            ref="modalP01"
            xlarge
            dragable
            title="스탬프 달성 현황"
            @closed="closed"
          >
            <P01
              :page-id="contextPageId"
            />
          </ur-modal>
          <!-- ::E PGE_AAZ_00075_P02 -->
        </ur-tab-content>
        <ur-tab-content
          idx="3"
          label="룰렛"
        >
          <div class="comm_title_wrap">
            <h4>
              이벤트 참여 정보
            </h4>
          </div>
          <ur-data-grid
            ref="grid"
            :headers="columnsT3"
            :data-source="listT3"
            :data-set-options="{id: 'id'}"
            :options="opts"
          />
        </ur-tab-content>
        <ur-tab-content
          idx="4"
          label="응모 이벤트"
        >
          <div class="comm_title_wrap">
            <h4>
              이벤트 참여 정보
            </h4>
          </div>
          <ur-data-grid
            ref="grid"
            :headers="columnsT4"
            :data-source="listT4"
            :data-set-options="{id: 'id'}"
            :options="opts"
          />
        </ur-tab-content>
        <ur-tab-content
          idx="5"
          label="출석체크"
        >
          <div class="comm_title_wrap">
            <h4>
              이벤트 참여 정보
            </h4>
          </div>
          <ur-data-grid
            ref="grid"
            :headers="columnsT5"
            :data-source="listT5"
            :data-set-options="{id: 'id'}"
            :options="opts"
          />
          <!-- ::S 테이블 내 모달팝업버튼 개발완료시 삭제 요함 -->
          <div class="btn_wrap mt10">
            <div class="right_box">
              <ur-button @click="openModalP02">
                출석체크 출석 현황 팝업
              </ur-button>
            </div>
          </div>
          <!-- ::E 코스테이블 내 모달팝업버튼 개발완료시 삭제 요함 -->

          <!-- ::S PGE_AAZ_00075_P03 -->
          <ur-modal
            ref="modalP02"
            xlarge
            dragable
            title="출석체크 출석 현황"
            @closed="closed"
          >
            <P02
              :page-id="contextPageId"
            />
          </ur-modal>
          <!-- ::E PGE_AAZ_00075_P03 -->
        </ur-tab-content>
        <ur-tab-content
          idx="6"
          label="미션"
        >
          <div class="comm_title_wrap">
            <h4>
              이벤트 참여 정보
            </h4>
          </div>
          <ur-data-grid
            ref="grid"
            :headers="columnsT6"
            :data-source="listT6"
            :data-set-options="{id: 'id'}"
            :options="opts"
          />
          <!-- ::S 테이블 내 모달팝업버튼 개발완료시 삭제 요함 -->
          <div class="btn_wrap mt10">
            <div class="right_box">
              <ur-button @click="openModalP03">
                미션 달성 현황 팝업
              </ur-button>
            </div>
          </div>
          <!-- ::E 코스테이블 내 모달팝업버튼 개발완료시 삭제 요함 -->

          <!-- ::S PGE_AAZ_00075_P04 -->
          <ur-modal
            ref="modalP03"
            xlarge
            dragable
            title="미션 달성 현황"
            @closed="closed"
          >
            <P03
              :page-id="contextPageId"
            />
          </ur-modal>
          <!-- ::E PGE_AAZ_00075_P04 -->
        </ur-tab-content>
        <ur-tab-content
          idx="7"
          label="미니게임"
        >
          <div class="comm_title_wrap">
            <h4>
              이벤트 참여 정보
            </h4>
          </div>
          <ur-data-grid
            ref="grid"
            :headers="columnsT7"
            :data-source="listT7"
            :options="opts"
            :data-set-options="{id: 'id'}"
          >
            <template #header>
              <ur-data-grid-header-row>
                <ur-data-grid-header-cell rowspan="2" />
                <ur-data-grid-header-cell rowspan="2" />
                <ur-data-grid-header-cell rowspan="2" />
                <ur-data-grid-header-cell
                  colspan="3"
                  text="결과"
                  align="center"
                  style="border-bottom: 1px solid #EAEAEA;"
                />
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
              </ur-data-grid-header-row>
            </template>
          </ur-data-grid>
        </ur-tab-content>
      </ur-tab-box>
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
import P01 from './components/PGE_AAZ_00075_P02.vue'
import P02 from './components/PGE_AAZ_00075_P03.vue'
import P03 from './components/PGE_AAZ_00075_P04.vue'


export default {
  name: 'PGE_AAZ_00124', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
    P02,
    P03,
  },
  data() {
    return {
      opts: {
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      // OX 퀴즈 테이블
      columnsT1: [
        { value: 'str1', text: '게시 구분' },
        { value: 'str2', text: '이벤트 명' },
        { value: 'str3', text: '이벤트 기간', width: 250 },
        { value: 'str4', text: '참여일시', width: 150 },
        { value: 'str5', text: '정답 개수' },
        { value: 'str6', text: '보상 수령 여부' },
        { value: 'str7', text: '경품 명' },
      ],
      listT1: [
        {
          str1: '에버랜드', str2: '1월 OX 퀴즈', str3: '2022-10-13 10:00 ~ 2022-11-13 22:00', str4: '2022-10-14 15:35:35', str5: '3', str6: 'Y', str7: '츄러스 쿠폰',
        },
      ],
      // 스탬프 테이블
      columnsT2: [
        { value: 'str1', text: '게시 구분' },
        { value: 'str2', text: '이벤트 명' },
        { value: 'str3', text: '이벤트 기간', width: 250 },
        {
          value: 'str4',
          text: '달성 개수',
          component: {
            template: '<div><ur-button hyperlink small style="padding: 0;" >3</ur-button></div>',
          },
        },
        { value: 'str5', text: '보상 수령 여부' },
        { value: 'str6', text: '경품 명' },
      ],
      listT2: [
        {
          str1: '에버랜드', str2: '1월 스탬프 이벤트', str3: '2022-10-13 10:00 ~ 2022-11-13 22:00', str4: '', str5: 'N', str6: '츄러스 쿠폰, 음료수 쿠폰',
        },
      ],
      // 룰렛 테이블
      columnsT3: [
        { value: 'str1', text: '게시 구분' },
        { value: 'str2', text: '이벤트 명' },
        { value: 'str3', text: '이벤트 기간', width: 250 },
        { value: 'str4', text: '참여일시', width: 150 },
        { value: 'str5', text: '룰렛 결과' },
      ],
      listT3: [
        {
          str1: '에버랜드', str2: '1월 룰렛 이벤트', str3: '2022-10-13 10:00 ~ 2022-11-13 22:00', str4: '2022-10-14 15:35:35', str5: '꽝',
        },
      ],
      // 응모 이벤트 테이블
      columnsT4: [
        { value: 'str1', text: '게시 구분' },
        { value: 'str2', text: '이벤트 명' },
        { value: 'str3', text: '이벤트 기간', width: 250 },
        { value: 'str4', text: '응모일시', width: 150 },
        { value: 'str5', text: '당첨 여부' },
        { value: 'str6', text: '경품 명' },
      ],
      listT4: [
        {
          str1: '에버랜드', str2: '1월 응모 이벤트', str3: '2022-10-13 10:00 ~ 2022-11-13 22:00', str4: '2022-10-14 15:35:35', str5: 'N', str6: '츄러스 쿠폰',
        },
      ],
      // 출석체크 테이블
      columnsT5: [
        { value: 'str1', text: '이벤트 명' },
        { value: 'str2', text: '이벤트 기간', width: 250 },
        {
          value: 'str3',
          text: '출석 횟수',
          component: {
            template: '<div><ur-button hyperlink small style="padding: 0;" >3</ur-button></div>',
          },

        },
        { value: 'str4', text: '보상 수령 여부' },
        { value: 'str5', text: '경품 명' },
      ],
      listT5: [
        {
          str1: '1월 출석체크', str2: '2022-10-13 10:00 ~ 2022-11-13 22:00', str3: '', str4: 'Y', str5: '츄러스 쿠폰',
        },
      ],
      // 미션 테이블
      columnsT6: [
        { value: 'str1', text: '이벤트 명' },
        { value: 'str2', text: '이벤트 기간', width: 250 },
        {
          value: 'str3',
          text: '달성 개수',
          component: {
            template: '<div><ur-button hyperlink small style="padding: 0;" >3</ur-button></div>',
          },
        },
        { value: 'str4', text: '뱃지 개수' },
      ],
      listT6: [
        {
          str1: '2022 미션', str2: '2022-10-13 10:00 ~ 2022-11-13 22:00', str3: '', str4: '1',
        },
      ],
      // 미니게임 테이블
      columnsT7: [
        { value: 'str1', text: '게임 명' },
        { value: 'str2', text: '이벤트 기간', width: 250 },
        { value: 'str3', text: '참여일시', width: 150 },
        { value: 'str4', text: '점수' },
        { value: 'str5', text: '등수' },
        { value: 'str6', text: '비율' },
        { value: 'str7', text: '보상 수령 여부' },
        { value: 'str8', text: '쿠폰 명' },
      ],
      listT7: [
        {
          str1: '미니게임1', str2: '2022-10-13 10:00 ~ 2022-11-13 22:00', str3: '2022-10-14 15:35:35', str4: '90점', str5: '3등', str6: '4%', str7: 'Y', str8: '츄러스 쿠폰',
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
    modalP03() {
      return this.$refs.modalP03
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
    openModalP02() { this.modalP02.open() },
    openModalP03() { this.modalP03.open() },
    closeModal() { this.modal.close() },
    closed() {},
  },
}
</script>
<style scoped>
</style>
