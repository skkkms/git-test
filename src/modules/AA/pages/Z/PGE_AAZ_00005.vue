<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S::온라인 관리 -->
      <div class="comm_title_wrap">
        <h4>온라인 관리</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="시설 카테고리 (1)"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          어트랙션
        </ur-form-item>
        <ur-form-item
          label="시설 카테고리 (2)"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          쥬토피아
        </ur-form-item>
        <ur-form-item
          label="Zone 구분"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          쥬토피아
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
          21
        </ur-form-item>
        <ur-form-item
          label="시설명 (국문)"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          로스트밸리
        </ur-form-item>
        <ur-form-item
          label="시설명 (영문)"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          Lost Velley
        </ur-form-item>
        <ur-form-item
          label="시설 설명 (국문)"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          20종 150여 머리 동물 친구들이 함께 살아가는 대자연 로스트 밸리!
        </ur-form-item>
        <ur-form-item
          label="시설 설명 (영문)"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          Mother Nature Lost Valley, where 150 animals with 20 kinds of hair live together!
        </ur-form-item>
        <ur-form-item
          label="이용조건 설명 (국문)"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          스마트줄서기로 운영되는 시설로 운영 상황에 따라 현장 줄서기로 전환될 수 있습니다.
        </ur-form-item>
        <ur-form-item
          label="이용조건 설명 (영문)"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          Customers under 100cm are operated by a smart queue with their guardians
        </ur-form-item>
        <ur-form-item
          label="보호자 탑승 유무"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          사용
        </ur-form-item>
        <ur-form-item
          label="신장제한"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          135cm~이상 195cm이하 동반
        </ur-form-item>
        <ur-form-item
          label="사용 구분"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          기프트 카드 사용
        </ur-form-item>
        <ur-form-item
          label="썸네일 이미지"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          T 익스프레스_배너 이미지_01.png
        </ur-form-item>
      </ur-form-box>
      <!-- E::온라인 관리 -->
      <!-- S::제한사항 아이콘 관리 -->
      <div class="comm_title_wrap mt35">
        <h4 class="pr10">
          제한사항 아이콘 관리
        </h4>
      </div>
      <ur-data-grid
        ref="grid01"
        :headers="columnsT1"
        :data-source="listT1"
        :data-set-options="{id: 'id'}"
        :options="options"
      />
      <!-- E::제한사항 아이콘 관리 -->
      <!-- S::키워드 관리 -->
      <div class="comm_title_wrap mt35">
        <h4 class="pr10">
          키워드 관리
        </h4>
      </div>
      <ur-data-grid
        ref="grid02"
        :headers="columnsT2"
        :data-source="listT2"
        :data-set-options="{id: 'id'}"
        :options="options"
      />
      <!-- E::키워드 관리 -->
      <!-- S::이용 안내 -->
      <div class="comm_title_wrap mt35">
        <h4 class="pr10">
          이용 안내
        </h4>
      </div>
      <ur-data-grid
        ref="grid03"
        :headers="columnsT3"
        :data-source="listT3"
        :data-set-options="{id: 'id'}"
        :options="options"
      />
      <!-- E::이용 안내 -->
      <!-- S::연관 콘텐츠 관리 -->
      <div class="comm_title_wrap mt35">
        <h4 class="pr10">
          연관 콘텐츠 관리
        </h4>
      </div>
      <ur-data-grid
        ref="grid04"
        :headers="columnsT4"
        :data-source="listT4"
        :data-set-options="{id: 'id'}"
        :options="options"
      />
      <!-- E::연관 콘텐츠 관리 -->
      <!-- S::연관 상품 관리 -->
      <div class="comm_title_wrap mt35">
        <h4 class="pr10">
          연관 상품 관리
        </h4>
      </div>
      <ur-data-grid
        ref="grid05"
        :headers="columnsT5"
        :data-source="listT5"
        :data-set-options="{id: 'id'}"
        :options="options"
      />
      <!-- E::연관 상품 관리 -->
      <!-- S::유의사항 -->
      <div class="comm_title_wrap mt35">
        <h4 class="pr10">
          유의사항
        </h4>
      </div>
      <ur-data-grid
        ref="grid06"
        :headers="columnsT6"
        :data-source="listT6"
        :data-set-options="{id: 'id'}"
        :options="options"
      />
      <!-- E::유의사항 -->

      <!-- S::배너 이미지 관리 -->
      <div class="comm_title_wrap mt35">
        <h4 class="pr10">
          배너 이미지 관리
        </h4>
      </div>
      <ur-data-grid
        ref="grid07"
        :headers="columns3"
        :data-source="list3"
        :data-set-options="{id: 'id'}"
        :options="options"
      />
      <!-- E::배너 이미지 관리 -->
      <!-- S::위치 관리 -->
      <div class="comm_title_wrap mt45">
        <h4>위치 관리</h4>
      </div>
      <ur-data-grid
        ref="grid08"
        :headers="columns4"
        :data-source="list4"
        :data-set-options="{id: 'id'}"
        :options="options"
      />
      <!-- E::위치 관리 -->


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
      <div class="bt1 mt45" />
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
              수정
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGEAAB00005',
  components: {
  }, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      // 테이블
      options: {
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      // 연관 콘텐츠 관리
      columnsT4:
        [
          { value: 'value1', text: 'No.', width: 100 },
          { value: 'value2', text: '제목 (국문)' },
          { value: 'value3', text: '제목 (영문)' },
          { value: 'value4', text: '콘텐츠 URL' },
          { value: 'value5', text: '연관 콘텐츠 썸네일 이미지' },
        ],
      listT4:
        [
          {
            value1: '1', value2: '에버랜드 로스트 밸리', value3: 'Lost Velley', value4: 'http://www.everland.com', value5: '연관 콘텐츠_이미지_01.png',
          },
        ],
      // 연관 상품 관리
      columnsT5:
        [
          { value: 'value1', text: 'No.', width: 100 },
          { value: 'value2', text: '제목 (국문)' },
          { value: 'value3', text: '제목 (영문)' },
          { value: 'value4', text: '콘텐츠 URL' },
          { value: 'value5', text: '연관 상품 썸네일 이미지' },
        ],
      listT5:
        [
          {
            value1: '1', value2: '에버랜드 로스트 밸리', value3: 'Lost Velley', value4: 'http://www.everland.com', value5: '연관 상품_이미지_01.png',
          },
        ],
      // 유의사항
      columnsT6:
        [
          { value: 'value1', text: 'No.', width: 100 },
          { value: 'value2', text: '유의사항 (국문)' },
          { value: 'value3', text: '유의사항 (영문)' },
        ],
      listT6:
        [
          {
            value1: '1', value2: '스마트줄서기로 운영되는 시설로 운영 상황에 따라 현장 줄서기', value3: 'Customers under 100cm are operated by a smart',
          },
        ],

      // 배너 이미지 관리
      columns3:
        [
          { value: 'value1', text: 'No.', width: 100 },
          { value: 'value2', text: '첨부 파일' },

        ],
      list3:
        [
          { value1: '1', value2: 'T 익스프레스_배너 이미지_01.png', value3: '' },
        ],

      // 위치 관리
      columns4:
        [
          { value: 'value1', text: 'No.', width: 100 },
          { value: 'value2', text: '위도' },
          { value: 'value3', text: '경도' },
          { value: 'value4', text: '비고' },

          // width:num, type:'number','code'
        ],
      list4:
        [
          {
            value1: '1', value2: '127.20373', value3: '127.20373', value4: '판다월드 위치',
          },
        ],

      // 제한사항 아이콘 관리
      columnsT1:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '업로드 구분',

          },
          {
            value: 'value3',
            text: '제한사항',

          },
          {
            value: 'value4',
            text: '아이콘 미리보기',

          },

        ],
      listT1:
        [
          {
            value1: '1', value2: '선택 업로드', value3: '금지 표시/음주자 탑승금지', value4: '-',
          },
        ],
      // 키워드 관리
      columnsT2:
        [
          { value: 'value1', text: 'No.', width: 100 },
          { value: 'value2', text: '키워드 (국문)' },
          { value: 'value3', text: '키워드 (영문)' },
        ],
      listT2:
        [
          { value1: '1', value2: '#귀여운, #동물체험', value3: '#Cute' },
        ],
      // 이용 안내
      columnsT3:
        [
          { value: 'value1', text: 'No.', width: 100 },
          { value: 'value2', text: '이용안내 (국문)' },
          { value: 'value3', text: '이용안내 (영문)' },
        ],
      listT3:
        [
          { value1: '1', value2: '스마트줄서기로 운영되는 시설로 운영 상황에 따라 현장 줄서기', value3: 'Customers under 100cm are operated by a smart' },
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
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
  },
  methods: {
  },
}
</script>
<style scoped>
</style>
