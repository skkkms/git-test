<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- ::S 온라인 관리 -->
      <div class="comm_title_wrap">
        <h4>
          온라인 관리
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="시설 카테고리"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          어트랙션
        </ur-form-item>
        <ur-form-item
          label="Zone 구분"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          베이 슬라이드
        </ur-form-item>
        <ur-form-item
          label="게시 여부"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          Y
        </ur-form-item>
        <ur-form-item
          label="게시 위치"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          App, 모바일웹, PC
        </ur-form-item>
        <ur-form-item
          label="노출 순서"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          100
        </ur-form-item>
        <ur-form-item
          label="시설명 (국문)"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          메가스톰
        </ur-form-item>
        <ur-form-item
          label="시설명 (영문)"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          Mega Storm
        </ur-form-item>
        <ur-form-item
          label="시설 설명 (국문)"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          국내 최고 6인승 자기부상 부스터, 18m 토네이도에서의 무중력 체험을 할 수 있는 최장 복합형 슬라이드!
        </ur-form-item>
        <ur-form-item
          label="시설 설명 (영문)"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          The longest complex type slide where you can experience weightlessness in a 18m tornado!
        </ur-form-item>
        <ur-form-item
          label="이용조건 설명 (국문)"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          100cm 미만 보호자 동반
        </ur-form-item>
        <ur-form-item
          label="이용조건 설명 (영문)"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          Children under 100cm accompanied by a guardian
        </ur-form-item>
        <ur-form-item
          label="보호자 탑승 유무"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          Y
        </ur-form-item>
        <ur-form-item
          label="신장 제한"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <span class="number">120</span>cm 이상 ~ <span class="number">180</span>cm 이하
        </ur-form-item>
        <!-- <ur-form-item
          label="체중제한"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="시설수심"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%; height: auto;"
          />
        </ur-form-item> -->
        <ur-form-item
          label="사용 구분"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          기프트카드 사용
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="썸네일 이미지"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          메가스톰_썸네일_이미지.jpg
        </ur-form-item>
      </ur-form-box>
      <!-- ::E 온라인 관리 -->

      <!-- ::S 제한사항 아이콘 관리 -->
      <div class="comm_title_wrap mt20">
        <h4 class="pr16">
          제한사항 아이콘 관리
        </h4>
      </div>
      <ur-data-grid
        ref="grid01"
        :headers="columns01"
        :data-source="list01"
        :data-set-options="{id: 'id'}"
        :options="options"
        height="300"
      />
      <!-- ::E 제한사항 아이콘 관리 -->

      <!-- ::S 키워드 관리 -->
      <div class="comm_title_wrap mt20">
        <h4 class="pr16">
          키워드 관리
        </h4>
      </div>
      <ur-data-grid
        ref="grid02"
        :headers="columns02"
        :data-source="list02"
        :data-set-options="{id: 'id'}"
        :options="options"
        height="300"
      />
      <!-- ::E 키워드 관리 -->

      <!-- ::S 이용 안내 -->
      <div class="comm_title_wrap mt20">
        <h4 class="pr16">
          이용 안내
        </h4>
      </div>
      <ur-data-grid
        ref="grid03"
        :headers="columns03"
        :data-source="list03"
        :data-set-options="{id: 'id'}"
        :options="options"
        height="300"
      />
      <!-- ::E 이용 안내 -->

      <!-- ::S 연관 콘텐츠 관리 -->
      <div class="comm_title_wrap mt20">
        <h4 class="pr16">
          연관 콘텐츠 관리
        </h4>
      </div>
      <ur-data-grid
        ref="grid04"
        :headers="columns04"
        :data-source="list04"
        :data-set-options="{id: 'id'}"
        :options="options"
        height="300"
      />
      <!-- ::E 연관 콘텐츠 관리 -->

      <!-- ::S 연관 상품 관리 -->
      <div class="comm_title_wrap mt20">
        <h4 class="pr16">
          연관 상품 관리
        </h4>
      </div>
      <ur-data-grid
        ref="grid05"
        :headers="columns05"
        :data-source="list05"
        :data-set-options="{id: 'id'}"
        :options="options"
        height="300"
      />
      <!-- ::E 연관 상품 관리 -->

      <!-- ::S 유의 사항 -->
      <div class="comm_title_wrap mt20">
        <h4 class="pr16">
          유의 사항
        </h4>
      </div>
      <ur-data-grid
        ref="grid06"
        :headers="columns06"
        :data-source="list06"
        :data-set-options="{id: 'id'}"
        :options="options"
        height="300"
      />
      <!-- ::E 유의 사항 -->

      <!-- ::S 배너 이미지 관리 -->
      <div class="comm_title_wrap mt20">
        <h4 class="pr16">
          배너 이미지 관리
        </h4>
      </div>
      <ur-data-grid
        ref="grid07"
        :headers="columns07"
        :data-source="list07"
        :data-set-options="{id: 'id'}"
        :options="options"
        height="300"
      />
      <!-- ::E 배너 이미지 관리 -->

      <!-- ::S 위치 관리 -->
      <div class="comm_title_wrap mt20">
        <h4 class="pr16">
          위치 관리
        </h4>
      </div>
      <ur-data-grid
        ref="grid08"
        :headers="columns08"
        :data-source="list08"
        :data-set-options="{id: 'id'}"
        :options="options"
        height="300"
      />
      <!-- ::E 위치 관리 -->

      <!-- S::오프라인 관리 -->
      <div class="comm_title_wrap mt45">
        <h4>오프라인 관리</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="가상대기여부"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          미지정
        </ur-form-item>
        <ur-form-item
          label="가상대기그룹"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          A
        </ur-form-item>
        <ur-form-item
          label="공연 입장 가능"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          15 분 전부터 입장 가능   <span>※ 수정 시, 익일 반영됩니다.</span>
        </ur-form-item>
        <ur-form-item
          label="입장 유효 간격"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          입장 시작
          15
          분 전부터
          입장종료
          15
          분 후까지
        </ur-form-item>
        <ur-form-item
          label="가상대기 설정 값"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="compo_col_wrap"
        >
          <div class="col_item_txt pr10 pb4">
            <div class="col_item_txtL">
              <span>사전 알림 기분 (탑승시간확정)</span>
            </div>
            <div class="col_item_txtR">
              15
              분
            </div>
          </div>
          <div class="col_item_txt pr10 pb4">
            <div class="col_item_txtL">
              탑승시간간격
            </div>
            <div class="col_item_txtR">
              10
              분
            </div>
          </div>
          <div class="col_item_txt pr10 pb4">
            <div class="col_item_txtL">
              기준 OHRC
            </div>
            <div class="col_item_txtR">
              5
              명
            </div>
          </div>
        </ur-form-item>
        <ur-form-item
          label="키오스크 페이지"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          10
        </ur-form-item>
        <ur-form-item
          label="키오스크 스캔코드"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          5
        </ur-form-item>
        <ur-form-item
          label="공연소요시간"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          110 분
        </ur-form-item>
        <ur-form-item
          label="D/S 노출 여부"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          Y
        </ur-form-item>
        <ur-form-item
          label="대기시단 POPS 시설"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          시설코드
          [Q]유모차 매출-01
          시설명
          C100V980108
        </ur-form-item>
        <ur-form-item
          label="Q-PASS 전광판 시설"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          시설코드
          [Q]유모차 매출-02
          시설명
          C100V980108
        </ur-form-item>
      </ur-form-box>
      <!-- E::오프라인 관리 -->

      <!-- S::시설 사용 POS 관리 -->
      <div class="comm_title_wrap mt35">
        <h4 class="pr10">
          시설 사용 POS 관리
        </h4>
      </div>
      <ur-data-grid
        ref="grid09"
        :headers="columns6"
        :data-source="list6"
        :data-set-options="{id: 'id'}"
        :options="options"
      />

      <!-- E::시설 사용 POS 관리 -->
      <!-- S::POS 시설 코드 관리 -->
      <div class="comm_title_wrap mt35">
        <h4 class="pr10">
          POS 시설 코드 관리
        </h4>
      </div>
      <ur-data-grid
        ref="grid10"
        :headers="columns7"
        :data-source="list7"
        :data-set-options="{id: 'id'}"
        :options="options"
      />

      <!-- E::POS 시설 코드 관리 -->

      <div class="bt1 mt45">
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
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
// import P01 from './components/PGE_AAZ_00008_P01.vue'

export default {
  name: 'PGE_AAZ_00009', // eslint-disable-line vue/name-property-casing
  data() {
    return {
      // 라디오버튼
      R1: 'Radio 01',
      R2: 'Radio 01',
      R3: 'Radio 01',
      R4: null,

      // 체크박스
      valueC1: ['App'],
      valueC2: ['모바일웹'],
      valueC3: ['PC'],

      // 시설 카테고리 value
      valueT1: '어트랙션',
      valueT2: '레스토랑',
      valueT3: '빌리지',
      valueT4: '렌탈/편의시설',
      valueT5: '기프트샵',

      // 테이블 옵션
      options: { // 토탈x 체크x
        noInfo: true,
        // multiSelect: true,
        // selectCheck: true,
      },

      // 유튜브 콘텐츠 관리
      columns01:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '업로드 구분',
            width: 250,
          },
          {
            value: 'value3',
            text: '제한 사항',
          },
          {
            value: 'value4',
            text: '아이콘 미리보기',
            component: {
              template: '<div><ur-icon medium>emoticon</ur-icon></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list01:
        [
          { value1: '1', value2: '선택 업로드', value3: '이용제한 / 노약자 이용금지' },
          { value1: '2', value2: '직접 업로드', value3: '신장 100cm 미만 보호자 동반.jpg' },
        ],

      // 키워드 관리
      columns02:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '키워드 (국문)',
          },
          {
            value: 'value3',
            text: '키워드 (영문)',
          },

          // width:num, type:'number','code'
        ],
      list02:
        [
          { value1: '1', value2: '토네이도', value3: 'Tornado' },
          // { value1: '2', value2: '', value3: '' },
        ],

      // 이용 안내
      columns03:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '이용 안내 (국문)',
          },
          {
            value: 'value3',
            text: '이용 안내 (영문)',
          },

          // width:num, type:'number','code'
        ],
      list03:
        [
          { value1: '1', value2: '한 튜브 당 480kg까지 탑승 가능', value3: 'Each tube can carry up to 480kg' },
          // { value1: '2', value2: '', value3: '' },
        ],

      // 연관 콘텐츠 관리
      columns04:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '제목 (국문)',
          },
          {
            value: 'value3',
            text: '제목 (영문)',
          },
          {
            value: 'value4',
            text: '콘텐츠 URL',
          },
          {
            value: 'value5',
            text: '연관 콘텐츠 썸네일 이미지',
          },

          // width:num, type:'number','code'
        ],
      list04:
        [
          {
            value1: '1', value2: '캐리비안베이 맞춤 코스', value3: 'Caribbean Bay Customized Course', value4: 'https://www.everland.com/', value5: '콘텐츠 썸네일1.jpg',
          },
          // { value1: '2', value2: '', value3: '' },
        ],

      // 연관 상품 관리
      columns05:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '제목 (국문)',
          },
          {
            value: 'value3',
            text: '제목 (영문)',
          },
          {
            value: 'value4',
            text: '콘텐츠 URL',
          },
          {
            value: 'value5',
            text: '연관 상품 썸네일 이미지',
            disabled: true,
          },

          // width:num, type:'number','code'
        ],
      list05:
        [
          {
            value1: '1', value2: '윈터 SPA 가족 PKG', value3: 'Winter SPA Family PKG', value4: 'https://www.everland.com/', value5: '상품 썸네일1.jpg',
          },
          // { value1: '2', value2: '', value3: '' },
        ],

      // 유의 사항
      columns06:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '유의 사항 (국문)',
          },
          {
            value: 'value3',
            text: '유의 사항 (영문)',
          },

          // width:num, type:'number','code'
        ],
      list06:
        [
          { value1: '1', value2: '손님의 부주의로 인한 과실은 책임지지 않습니다.', value3: "We are not responsible for any negligence caused by the customer's negligence." },
          // { value1: '2', value2: '', value3: '' },
        ],

      // 배너 이미지 관리
      columns07:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '배너 이미지',
          },

          // width:num, type:'number','code'
        ],
      list07:
        [
          {
            value1: '1', value2: '배너 이미지1.jpg',
          },
          // { value1: '2', value2: '', value3: '' },
        ],

      // 위치 관리
      columns08:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '실내/외 구분',
          },
          {
            value: 'value3',
            text: '실내 층수',
          },
          {
            value: 'value4',
            text: '위도',
          },
          {
            value: 'value5',
            text: '경도',
          },
          {
            value: 'value6',
            text: 'X 좌표',
          },
          {
            value: 'value7',
            text: 'Y 좌표',
          },
          {
            value: 'value8',
            text: '비고',
          },

          // width:num, type:'number','code'
        ],
      list08:
        [
          {
            value1: '1', value2: '실외', value3: '-', value4: '181', value5: '191', value6: '-', value7: '-', value8: '메가스톰 위치',
          },
        ],
      // 시설 사용 POS 관리
      columns6:
        [
          { value: 'value1', text: 'No.', width: 100 },
          { value: 'value2', text: '시설 사용 POS ID' },
          { value: 'value3', text: '시설 사용 POS 명' },
        ],
      list6:
        [
          { value1: '1', value2: 'C100V980108', value3: '[Q]유모차 매출-01' },
        ],
      // POS 시설 코드 관리
      columns7:
        [
          { value: 'value1', text: 'No.', width: 100 },
          { value: 'value2', text: 'POS 시설 코드' },
          { value: 'value3', text: 'POS 시설 코드 명' },
        ],
      list7:
        [
          { value1: '1', value2: 'C100A1801', value3: '게임 어드벤처' },
        ],

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

    // modalPopUp
    // modalP01() {
    //   return this.$refs.modalP01
    // },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
  },
  methods: {
    // openModalP01() { this.modalP01.open() },
    // closed() {},
  },
}
</script>
<style scoped>
</style>
