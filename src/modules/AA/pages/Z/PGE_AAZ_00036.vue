<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 노출 정보 탭 메뉴-->
      <div class="comm_title_wrap">
        <h4>
          노출 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="게시 구분"
          :label-align="'right'"
          style="width:50%; height:auto;"
          required
        >
          <ur-radio
            v-model="R1"
            value="Radio 01"
            sm
          >
            에버랜드
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio 02"
            sm
          >
            캐리비안베이
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="혜택 분류"
          :label-align="'right'"
          style="width:50%; height:auto;"
          required
        >
          <ur-dropdown
            v-model="valueD1"
            :items="itemsD1"
          />
        </ur-form-item>
        <ur-form-item
          label="노출 여부"
          :label-align="'right'"
          style="width:50%; height:auto;"
          required
        >
          <ur-radio
            v-model="R2"
            value="Radio 01"
            sm
          >
            Y
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio 02"
            sm
          >
            N
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="노출 순서"
          :label-align="'right'"
          style="width:50%; height:auto;"
          class="flex_wrap"
          required
        >
          <ur-text-field
            value=""
            style="width:100%; height:auto"
          />
        </ur-form-item>
        <ur-form-item
          label="앱 노출 기간"
          :label-align="'right'"
          style="width:50%; height:auto;"
          class="flex_wrap"
          required
        >
          <ur-date-time-range-picker
            v-model="dateValue1"
            auto-confirm
            input-type="YYYY-MM-DD 09:00"
            init="today"
          />
        </ur-form-item>
        <ur-form-item
          label="기간 표시 정보"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
          required
        >
          <ur-range-picker
            v-model="dateValue2"
            auto-confirm
            input-type="YYYY-MM-DD"
            init="today"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 노출 정보 탭 메뉴-->

      <!-- S :: 혜택 상세 정보 -->
      <div class="comm_title_wrap mt20">
        <h4>
          혜택 상세 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="정보 구분"
          :label-align="'right'"
          required="true"
          style="width: 100%; height: auto;"
        >
          <ur-radio
            v-model="R3"
            value="Radio 01"
            sm
          >
            추천할인
          </ur-radio>
          <ur-radio
            v-model="R3"
            value="Radio 02"
            sm
          >
            제휴할인
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="카드 구분"
          :label-align="'right'"
          required="true"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD2"
            :items="itemsD2"
          />
        </ur-form-item>
        <ur-form-item
          label="패키지 구분"
          :label-align="'right'"
          required="true"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-checkbox
            v-model="valueC1"
            sm
          />
          <span class="check_label">키즈동반</span>

          <ur-checkbox
            v-model="valueC2"
            sm
          />
          <span class="check_label">중/고/대학생</span>

          <ur-checkbox
            v-model="valueC3"
            sm
          />
          <span class="check_label">콘텐츠PKG</span>

          <ur-checkbox
            v-model="valueC4"
            sm
          />
          <span class="check_label">일반</span>

          <ur-checkbox
            v-model="valueC5"
            sm
          />
          <span class="check_label">기타</span>
        </ur-form-item>
        <ur-form-item
          label="제목"
          :label-align="'right'"
          required="true"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width:100%; height:auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="제목(카드명)"
          :label-align="'right'"
          required="true"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width:100%; height:auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="소제목"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width:100%; height:auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="대상"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width:100%; height:auto;"
          />
        </ur-form-item>
        <!-- 제휴카드 내용 required="false" -->
        <ur-form-item
          label="내용"
          :label-align="'right'"
          required="true"
          style="width: 100%; height: auto;"
        >
          <sui-web-editor
            ref="approvalWebEditor"
            :is-viewer="isEditorViewerMode"
            :initialized-callback="editorInitCallback"
          />
        </ur-form-item>
        <!-- S:: ALT태그 추가 -->
        <ur-form-item
          label="썸네일 이미지"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="compo_col_wrap"
        >
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <ur-text-field
                value=""
                style="width: 88%; height: auto;"
              />
              <ur-button color="violet">
                파일 찾기
              </ur-button>
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <span class="guid_txt">
              <!-- S:: 추천할인 -->
              * 이미지 : 624 x 744 / 파일 규격 : 15MB 미만 jpg, png, gif
              <!-- E:: 추천할인 -->
              <!-- S:: 제휴할인 -->
              <!-- * 이미지 : 360 x 472 / 파일 규격 : 15MB 미만 jpg, png, gif -->
              <!-- E:: 제휴할인 -->
              <!-- S:: 스페셜 패키지 추천할인 썸네일 이미지 -->
              <!-- * 이미지 : 624 x 692 / 파일 규격 : 15MB 미만 jpg, png, gif -->
              <!-- E:: 스페셜 패키지 추천할인 썸네일 이미지 -->
              <!-- S:: 스페셜 패키지 일반할인 썸네일 이미지 -->
              <!-- * 이미지 : 624 x 306 / 파일 규격 : 15MB 미만 jpg, png, gif -->
              <!-- E:: 스페셜 패키지 일반할인 썸네일 이미지 -->
              <!-- S:: 드림투어 썸네일 이미지 -->
              <!-- * 이미지 : 624 x 320 / 파일 규격 : 15MB 미만 jpg, png, gif -->
              <!-- E:: 드림투어 썸네일 이미지 -->
              <!-- S:: 체험프로그램 썸네일 이미지-->
              <!-- * 이미지 : 624 x 320 / 파일 규격 : 15MB 미만 jpg, png, gif -->
              <!-- E:: 체험프로그램 썸네일 이미지-->

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
          label="카드 이미지"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="compo_col_wrap"
        >
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <ur-text-field
                value=""
                style="width: 88%; height: auto;"
              />
              <ur-button color="violet">
                파일 찾기
              </ur-button>
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <span class="guid_txt">
              * 이미지 : 144 x 94 / 파일 규격 : 15MB 미만 jpg, png, gif
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
      <!-- E :: 공지 상세 정보 -->


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
  name: 'PGE_AAZ_00036', // eslint-disable-line vue/name-property-casing
  components: {

  },
  data() {
    return {

      // 라디오 버튼 초기값
      R1: '',
      R2: 'Radio 01',
      R3: '',

      // 드랍다운
      valueD1: '1',
      valueD2: '1',

      // 체크박스
      valueC1: ['키즈동반'],
      valueC2: ['중/고/대학생'],
      valueC3: ['콘텐츠PKG'],
      valueC4: ['일반'],
      valueC5: ['기타'],


    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

    // 혜택 분류 드랍다운 데이터
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '선택' })
      rtn.push({ value: '2', text: '할인정보' })
      rtn.push({ value: '3', text: '제휴카드' })
      rtn.push({ value: '4', text: '스페셜 패키지' })
      rtn.push({ value: '5', text: '정기권 제휴 혜택' })
      rtn.push({ value: '6', text: '드림투어' })
      rtn.push({ value: '7', text: '체험프로그램' })
      return rtn
    },

    // 혜택 상세 정보 > 카드 구분 드랍다운 데이터
    itemsD2() {
      const rtn = []
      rtn.push({ value: '1', text: '선택' })
      rtn.push({ value: '2', text: '삼성카드' })
      rtn.push({ value: '3', text: 'BC카드' })
      rtn.push({ value: '4', text: '하나카드(구.외환)' })
      rtn.push({ value: '5', text: 'KB국민카드' })
      rtn.push({ value: '6', text: '하나카드(구.하나SK)' })
      rtn.push({ value: '7', text: '현대카드' })
      rtn.push({ value: '8', text: '신한카드' })
      rtn.push({ value: '9', text: 'NH농협카드' })
      rtn.push({ value: '10', text: '씨티카드' })
      rtn.push({ value: '11', text: '우리카드' })
      return rtn
    },
  },

  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() { },
  methods: {

  },
}
</script>
<style scoped>
</style>
