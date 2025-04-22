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
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            value="2023 미션"
            style="width:100%; height:auto"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="이벤트 기간"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-date-time-range-picker
            v-model="dateValue1"
            init="today"
          />
        </ur-form-item>
        <ur-form-item
          label="노출 여부"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-radio
            v-model="R1"
            value="Radio01"
            sm
          >
            Y
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio02"
            sm
          >
            N
          </ur-radio>
        </ur-form-item>
        <!-- S:: ALT태그 추가 -->
        <ur-form-item
          label="미션 상세 배너 이미지"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="compo_col_wrap"
        >
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <ur-text-field
                value="미션_상세 배너 이미지.jpg"
                style="width: 50%;"
              />
              <ur-button color="violet">
                파일 찾기
              </ur-button>
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <span class="guid_txt">
              * 이미지 : 624 x 224 / 파일 규격 : 15MB 미만 jpg, png, gif
            </span>
          </div>
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <img
                src="images/food/food_0.png"
                style="width: fit-content; height: 150px;"
              >
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <ur-text-field
                value=""
                style="width: 100%; height: auto;"
                placeholder="ALT 태그를 입력하세요"
              />
            </div>
          </div>
        </ur-form-item>
        <!-- E:: ALT태그 추가 -->
        <!-- S:: ALT태그 추가 -->
        <ur-form-item
          label="뱃지 상세 배너 이미지"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="compo_col_wrap"
        >
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <ur-text-field
                value="뱃지_상세 배너 이미지.jpg"
                style="width: 50%;"
              />
              <ur-button color="violet">
                파일 찾기
              </ur-button>
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <span class="guid_txt">
              * 이미지 : 624 x 224 / 파일 규격 : 15MB 미만 jpg, png, gif
            </span>
          </div>
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <img
                src="images/food/food_0.png"
                style="width: fit-content; height: 150px;"
              >
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <ur-text-field
                value=""
                style="width: 100%; height: auto;"
                placeholder="ALT 태그를 입력하세요"
              />
            </div>
          </div>
        </ur-form-item>
        <!-- E:: ALT태그 추가 -->
      </ur-form-box>
      <!-- E:: 노출정보 -->

      <!-- S:: 미션 정보 -->
      <!-- S:: 타이틀 버튼 양쪽 -->
      <div class="comm_btn_wrap ">
        <div class="comm_title_wrap">
          <h4>
            미션 정보
          </h4>
        </div>
        <div class="left_box pl16">
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
        <div class="right_box">
          <span class="guid_txt mr16">
            *파일 용량 : 5MB 미만
          </span>
          <ur-button>
            <ur-icon
              icon="download"
              icon-type="line"
              size="small"
              spacing
            />
            엑셀 양식 다운로드
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
        </div>
      </div>
      <!-- E:: 타이틀 버튼 양쪽 -->
      <ur-data-grid
        ref="grid01"
        :headers="columnsT1"
        :data-source="listT1"
        :options="opts1"
        :data-set-options="{id: 'id'}"
      />

      <div class="btn_wrap mt10">
        <div class="right_box">
          <!-- ::S 미션 정보 테이블 내 조건 정보 설정 모달팝업버튼 개발완료시 삭제 요함 -->
          <ur-button
            color="violet"
            @click="openModalP01"
          >
            <ur-modal
              ref="modalP01"
              class="modal-b1c6"
              xlarge
              title="조건 정보 설정"
              @closed="closed"
            >
              <P01 />
              <!-- :page-id="contextPageId" -->
            </ur-modal>
            조건정보설정팝업
          </ur-button>
          <!-- ::E 미션 정보 테이블 내 조건 정보 설정 모달팝업버튼 개발완료시 삭제 요함 -->
        </div>
      </div>
      <!-- E:: 미션 정보 -->


      <!-- S:: 보상 정보(뱃지) -->
      <!-- S:: 타이틀 버튼 양쪽 -->
      <div class="comm_btn_wrap ">
        <div class="comm_title_wrap">
          <h4>
            보상 정보(뱃지)
          </h4>
        </div>
        <div class="left_box pl16">
          <ur-button color="violet">
            추가
          </ur-button>
          <ur-button color="violet">
            삭제
          </ur-button>
          <ur-button color="violet">
            초기화
          </ur-button>
          <span class="guid_txt">
            * 이미지 : 176 x 176 / 파일 규격 : 15MB 미만 jpg, png, gif
          </span>
        </div>
        <div class="right_box">
          <span class="guid_txt mr16">
            *파일 용량 : 5MB 미만
          </span>
          <ur-button>
            <ur-icon
              icon="download"
              icon-type="line"
              size="small"
              spacing
            />
            엑셀 양식 다운로드
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
        </div>
      </div>
      <!-- E:: 타이틀 버튼 양쪽 -->
      <ur-data-grid
        ref="grid02"
        :headers="columnsT2"
        :data-source="listT2"
        :options="opts"
        :data-set-options="{id: 'id'}"
      />
      <!-- E:: 보상 정보(뱃지) -->
      <div class="btn_wrap mt10">
        <div class="right_box">
          <!-- ::S 발행쿠폰검색 내 모달팝업버튼 개발완료시 삭제 요함 -->
          <ur-button
            color="violet"
            @click="openModalP02"
          >
            <ur-modal
              ref="modalP02"
              class="modal-b1c6"
              xlarge
              title="발행쿠폰검색"
              @closed="closed"
            >
              <P02 />
              <!-- :page-id="contextPageId" -->
            </ur-modal>
            발행쿠폰검색팝업
          </ur-button>
          <!-- ::E 발행쿠폰검색 내 모달팝업버튼 개발완료시 삭제 요함 -->
        </div>
      </div>

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
import P01 from './components/PGE_AAZ_00081_P01.vue'
import P02 from './components/PGE_AAZ_00081_P02.vue'

export default {
  name: 'PGE_AAZ_00083', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
    P02,
  },
  data() {
    return {
      // 테이블 옵션
      opts1: { // 토탈 x 전체선택X 셀선택 o
        noInfo: true,
        multiSelect: false,
        selectCheck: true,
      },
      opts: {
        noInfo: true,
        multiSelect: false,
        selectCheck: true,
        rowHeight: 'auto',
      },
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      // 날짜 버튼
      Y1: ['2022-10-13', '2022-11-13'],

      // 라디오 버튼
      R1: 'Radio01',

      // 미션정보 테이블 라디오 버튼
      T1R1: null,

      // 미션정보 테이블 드롭다운
      T1D1: null,
      T1D2: null,

      // 보상정보(뱃지) 테이블 드롭다운
      T2D1: null,

      // 미션 정보 테이블
      columnsT1: [
        { text: 'No.', value: 'value1', width: 120 },
        {
          text: '미션 분류 (1)',
          value: 'value2',
          required: true,
          width: 200,
          component: {
            template: '<div><ur-dropdown v-model="T1D1" :items="itemsT1D1"/></div>',
          },
        },
        {
          text: '미션 분류 (2)',
          value: 'value3',
          required: true,
          width: 200,
          component: {
            template: '<div><ur-dropdown v-model="T1D2" :items="itemsT1D2"/></div>',
          },
        },
        {
          text: '미션 명',
          value: 'value4',
          required: true,
          component: {
            template: '<div><ur-text-field value="에버랜드 3회 입장" style="width:100%; height:auto;"/></div>',
          },
        },
        {
          text: '달성 조건',
          value: 'value5',
          required: true,
          component: {
            template: '<div><ur-text-field value="이용권 번호" style="width:90%; height:auto;" class="pr10"/><ur-icon-button icon="search" icon-type="line" color="primary"/></div>',
          },
        },
        {
          text: '사용 여부',
          value: 'value6',
          required: true,
          width: 150,
          component: {
            template: '<div><ur-radio v-model="T1R1" value="Radio01" sm> Y </ur-radio> <ur-radio v-model="T1R1" value="Radio02" sm> N </ur-radio></div>',
          },
        },
      ],
      listT1: [
        {
          value1: '1', value2: '', value3: '', value4: '', value5: '', value6: 'Radio01',
        },
        {
          value1: '2', value2: '', value3: '', value4: '', value5: '', value6: 'Radio01',
        },
      ],

      // 보상 정보 (뱃지) 테이블
      columnsT2: [
        {
          text: 'No.',
          value: 'value1',
          width: 120,
          required: true,
          component: {
            template: '<div><ur-text-field value="1" style="width:100%; height:auto; text-align:center;" mask="number"/></div>',
          },
        },
        {
          text: '뱃지 분류',
          value: 'value2',
          required: true,
          component: {
            template: '<div><ur-dropdown style="width:100%;" v-model="valueT2D1" :items="itemsT2D1"/></div>',
          },
        },
        {
          text: '뱃지 명',
          value: 'value3',
          required: true,
          component: {
            template: '<div><ur-text-field value="에버랜드 마스터" style="width: 100%;"/></div>',
          },
        },
        {
          text: '뱃지 설명',
          value: 'value4',
          required: true,
          component: {
            template: '<div><ur-text-field value="에버랜드 3회 입장한 당신은 즐길줄 아" style="width: 100%;"/></div>',
          },
        },
        {
          text: '벳지 비활성화 이미지',
          value: 'value5',
          required: true,
          component: {
            template: '<div class="pdCol10" style="flex-direction: column;"><div style="display: flex; flex-direction: row; align-items: center;"><ur-text-field class="pr10"/><ur-button color="violet">파일 찾기</ur-button></div><img class="pdCol10" src="images/food/food_0.png" style="width: fit-content; height: 150px;"><ur-text-field value="ALT 태그를 입력하세요"/></div>',
          },
        },
        {
          text: '뱃지 활성화 이미지',
          value: 'value6',
          required: true,
          component: {
            template: '<div class="pdCol10" style="flex-direction: column;"><div style="display: flex; flex-direction: row; align-items: center;"><ur-text-field class="pr10"/><ur-button color="violet">파일 찾기</ur-button></div><img class="pdCol10" src="images/food/food_0.png" style="width: fit-content; height: 150px;"><ur-text-field value="ALT 태그를 입력하세요"/></div>',
          },
        },


      ],
      listT2: [
        {
          value1: '1', value2: '', value3: '', value4: '', value5: '', value6: '',
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
