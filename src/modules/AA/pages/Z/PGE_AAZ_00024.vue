<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- ::S 기본 정보 -->
      <div class="comm_title_wrap">
        <h4 class="-grid__column__header__root-required">
          기본 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="콘텐츠 명"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value="어린이날"
            style="width: 100%; height: auto;"
          />
          <span class="subscript_txt">
            관리자 목록에만 표기 됩니다.
          </span>
        </ur-form-item>
        <ur-form-item
          label="노출 여부"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="R1"
            sm
            value="Radio 01"
          >
            Y
          </ur-radio>
          <ur-radio
            v-model="R1"
            sm
            value="Radio 02"
          >
            N
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="노출 순서"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value="3"
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="노출 위치"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD1"
            :items="itemsD1"
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="언어 구분"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
        >
          <ur-radio
            v-model="R3"
            value="Radio 01"
            sm
          >
            국문
          </ur-radio>
          <ur-radio
            v-model="R3"
            value="Radio 02"
            sm
          >
            영문
          </ur-radio>
        </ur-form-item>
      </ur-form-box>
      <!-- ::E 기본 정보 -->

      <!-- ::S 대상자 제어 -->
      <div class="comm_title_wrap mt45">
        <h4 class="-grid__column__header__root-required">
          대상자 제어
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="방문 횟수"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-checkbox
            v-model="valueC1"
            sm
          /><span
            class="check_label"
          >미지정</span>
          <ur-checkbox
            v-model="valueC2"
            sm
          /><span
            class="check_label"
          >0~1회</span><ur-checkbox
            v-model="valueC3"
            sm
          /><span
            class="check_label"
          >2~3회</span>
          <ur-checkbox
            v-model="valueC4"
            sm
          /><span
            class="check_label"
          >4회 이상</span>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="방문 상태"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-checkbox
            v-model="valueC5"
            sm
          /><span
            class="check_label"
          >미지정</span>
          <ur-checkbox
            v-model="valueC6"
            sm
          /><span
            class="check_label"
          >방문 전</span><ur-checkbox
            v-model="valueC7"
            sm
          /><span
            class="check_label"
          >방문 중</span>
          <ur-checkbox
            v-model="valueC8"
            sm
          /><span
            class="check_label"
          >방문 후</span>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="티어"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
        >
          <ur-checkbox
            v-model="valueC9"
            sm
          /><span
            class="check_label"
          >미지정</span>
          <ur-checkbox
            v-model="valueC10"
            sm
          /><span
            class="check_label"
          >T1</span><ur-checkbox
            v-model="valueC11"
            sm
          /><span
            class="check_label"
          >T2</span>
          <ur-checkbox
            v-model="valueC12"
            sm
          /><span
            class="check_label"
          >T3</span>
          <ur-checkbox
            v-model="valueC13"
            sm
          /><span
            class="check_label"
          >T4</span>
          <ur-checkbox
            v-model="valueC14"
            sm
          /><span
            class="check_label"
          >T5</span>
        </ur-form-item>
      </ur-form-box>
      <!-- ::E 대상자 제어 -->

      <!-- ::S 콘텐츠 관리 -->
      <div class="comm_title_wrap mt45">
        <h4 class="-grid__column__header__root-required">
          콘텐츠 관리
        </h4>
        <div class="title_compo">
          <ur-radio
            v-model="R2"
            value="Radio 01"
            sm
          >
            코스
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio 02"
            sm
          >
            시설
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio 03"
            sm
          >
            스마트 예약
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio 04"
            sm
          >
            이벤트
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio 05"
            sm
          >
            공지
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio 06"
            sm
          >
            URL
          </ur-radio>
          <span class="guid_txt">
            <!-- S::이용권,체험상품,편의상품 -->
            * 이미지 : 360 x 404 / 파일 규격 : 15MB 미만 jpg, png, gif
            <!-- E::이용권,체험상품,편의상품 -->
            <!-- S::추천코스,굿즈상품,이용꿀팁 -->
            <!-- * 이미지 : 624 x 792 / 파일 규격 : 15MB 미만 jpg, png, gif -->
            <!-- E::추천코스,굿즈상품,이용꿀팁 -->
          </span>
        </div>
      </div>
      <ur-data-grid
        ref="grid01"
        :headers="columnsT1"
        :options="options"
        :data-source="listT1"
        :data-set-options="{id: 'id'}"
      />
      <!-- ::S 콘텐츠 관리 -->

      <!-- ::S 퍼소나 등록 -->
      <div class="comm_title_wrap mt45">
        <h4 class="-grid__column__header__root-required">
          퍼소나 등록
        </h4>
        <div class="title_compo pl16">
          <ur-button color="violet">
            추가
          </ur-button>
          <ur-button color="violet">
            삭제
          </ur-button>
        </div>
      </div>
      <!-- ::S 퍼소나테이블 -->
      <ur-data-grid
        ref="grid02"
        :headers="columnsT4"
        :options="opts1"
        :data-source="listT4"
        :data-set-options="{id: 'id'}"
      />
      <!-- ::E 퍼소나테이블 -->

      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button>
              목록
            </ur-button>
          </div>
          <div class="right_box">
            <ur-button>
              삭제
            </ur-button>
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
  name: 'PGE_AAZ_00024', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 드롭다운
      valueD1: '1',

      // 라디오버튼
      R1: 'Radio 01',
      R2: 'Radio 01',
      R3: 'Radio 01',

      // 체크박스
      valueC1: ['미지정'],
      valueC2: ['0~1회'],
      valueC3: ['2~3회'],
      valueC4: ['4회 이상'],

      valueC5: ['미지정'],
      valueC6: ['방문 전'],
      valueC7: ['방문 중'],
      valueC8: ['방문 후'],

      valueC9: ['미지정'],
      valueC10: ['T1'],
      valueC11: ['T2'],
      valueC12: ['T3'],
      valueC13: ['T4'],
      valueC14: ['T5'],
      // 테이블 옵션
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
        rowHeight: 'auto',
      },
      // 테이블 옵션
      opts: { // 토탈 O
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
      },
      // 테이블 옵션
      opts1: { // 토탈 x 전체선택X 셀선택 o
        noInfo: true,
        multiSelect: false,
        selectCheck: true,
      },

      // 코스,시설테이블
      columnsT1: [
        { value: 'value1', text: 'No.', width: 100 },
        {
          value: 'value2',
          text: '노출 콘텐츠',
          required: true,
          component: {
            template: '<div><ur-text-field class="pr10" value="행복 100배 어린이날 코스" style="width:350px;"/><ur-icon-button icon="search" icon-type="line" color="primary"></div>',
          },
        },
        {
          value: 'value3',
          text: '썸네일',
          required: true,
          component: {
            template: '<div class="pdCol10" style="flex-direction: column;"><div style="display: flex; flex-direction: row; align-items: center;"><ur-text-field class="pr10"/><ur-button color="violet">파일 찾기</ur-button></div><img class="pdCol10" src="images/food/food_0.png" style="width: fit-content; height: 150px;"><ur-text-field value="ALT 태그를 입력하세요"/></div>',
          },
        },
        // width:num, type:'number','code'
      ],
      listT1: [
        { value1: '1', value2: '', value3: '' },
      ],

      // 퍼소나테이블
      columnsT4: [
        { value: 'value1', text: 'No.', width: 100 },
        {
          value: 'value2',
          text: '퍼소나 유형',
          required: true,
          component: {
            template: '<div><ur-text-field class="pr10" value="유유자적 사랑꾼 푸바오" style="width:350px;"/><ur-icon-button icon="search" icon-type="line" color="primary"></div>',
          },
        },
        { value: 'value3', text: '동반자' },
        { value: 'value4', text: '놀이유형' },
        // width:num, type:'number','code'
      ],
      listT4: [
        {
          value1: '1', value2: '', value3: '1~4세', value4: '여유와 힐링',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

    // 드랍다운
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '추천코스' })
      rtn.push({ value: '2', text: '굿즈 상품' })
      rtn.push({ value: '3', text: '이용권 상품' })
      rtn.push({ value: '4', text: '체험 상품' })
      rtn.push({ value: '5', text: '편의 상품' })
      rtn.push({ value: '6', text: '이용 꿀팁' })
      rtn.push({ value: '7', text: '시설' })
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
  },
}
</script>
<style scoped>
</style>
