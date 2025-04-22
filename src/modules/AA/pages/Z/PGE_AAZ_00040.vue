<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 노출 정보 -->
      <div class="comm_title_wrap">
        <h4>
          노출 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="게시판 분류"
          :label-align="'right'"
          required="true"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD1"
            :items="itemsD1"
            style="width:40%"
          />
        </ur-form-item>
        <ur-form-item
          label="노출 여부"
          :label-align="'right'"
          required="true"
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="R1"
            value="Radio 01"
            sm
          >
            Y
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio 02"
            sm
          >
            N
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="노출 순서"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          required="true"
        >
          <ur-text-field
            value=""
            style="width:100%; height:auto"
          />
        </ur-form-item>
        <ur-form-item
          label="앱 노출 기간"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
          required="true"
        >
          <ur-date-time-range-picker
            v-model="dateValue1"
            input-type="YYYY-MM-DD 09:00"
            init="today"
          />
        </ur-form-item>
        <ur-form-item
          label="기간 표시 정보"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
          required="true"
        >
          <ur-range-picker
            v-model="dateValue2"
            auto-confirm
            input-type="YYYY-MM-DD"
            style="height:auto"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 노출 정보 -->

      <!-- S :: 게시 상세 정보 -->
      <div class="comm_title_wrap mt20">
        <h4>
          게시 상세 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="콘텐츠 구분"
          :label-align="'right'"
          required="true"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD2"
            :items="itemsD2"
            style="width:40%"
          />
        </ur-form-item>
        <ur-form-item
          label="약관 구분"
          :label-align="'right'"
          required="true"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD3"
            :items="itemsD3"
            style="width:40%"
          />
        </ur-form-item>
        <ur-form-item
          label="언어 구분"
          :label-align="'right'"
          required="true"
          style="width: 100%; height: auto;"
        >
          <ur-radio
            v-model="R2"
            value="Radio 01"
            sm
          >
            국문
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio 02"
            sm
          >
            영문
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="시즌"
          :label-align="'right'"
          required="true"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD4"
            :items="itemsD4"
            style="width:40%"
          />
        </ur-form-item>
        <ur-form-item
          label="제목"
          :label-align="'right'"
          required="true"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            style="width:100%; height:auto;"
            value=""
          />
        </ur-form-item>
        <ur-form-item
          label="개정 정보"
          :label-align="'right'"
          required="true"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            style="width:100%; height:auto;"
            value=""
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="내용"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          required="true"
        >
          <sui-web-editor
            ref="approvalWebEditor"
            :is-viewer="isEditorViewerMode"
            :initialized-callback="editorInitCallback"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="약관 내용"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          required="true"
        >
          <sui-web-editor
            ref="approvalWebEditor"
            :is-viewer="isEditorViewerMode"
            :initialized-callback="editorInitCallback"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="가사 내용"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          required="true"
        >
          <textarea
            rows="8"
          />
        </ur-form-item>
        <!-- S:: ALT태그 추가 -->
        <ur-form-item
          label="썸네일 이미지"
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
              * 이미지 : 480 x 320 / 파일 규격 : 15MB 미만 jpg, png, gif
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
        <ur-form-item
          label="음악"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
          required="true"
        >
          <ur-text-field
            style="width:40%; height:auto"
            value=""
          />
          <ur-button color="violet">
            파일 찾기
          </ur-button>
          <div class="col_img_wrap">
            <span class="guid_txt">
              * 파일 규격 : 100MB 미만 mp3, wav
            </span>
          </div>
        </ur-form-item>
        <ur-form-item
          label="URL 설정"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          https://www.everland.com/editorspick/
          <ur-text-field
            value=""
            style="width:70%; height:auto"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 게시 상세 정보 -->

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
  name: 'PGE_AAZ_00040', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 드롭다운
      valueD1: null,
      valueD2: null,
      valueD3: null,
      valueD4: null,

      // 라디오
      R1: 'Radio 01',
      R2: 'Radio 01',

      // 날짜 범위(date-picker)
      dateValue1: ['', ''],
      dateValue2: ['2022-11-13', ''],

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

    // 드랍다운 (게시판 분류)
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: "Editor's Pick" })
      rtn.push({ value: '2', text: 'FAQ' })
      rtn.push({ value: '3', text: '개인정보 처리방침' })
      rtn.push({ value: '4', text: '영상정보 처리기기' })
      rtn.push({ value: '5', text: '방침 개정 안내' })
      rtn.push({ value: '6', text: '이용약관' })
      rtn.push({ value: '7', text: '입찰공고' })
      rtn.push({ value: '8', text: '에버랜드 테마뮤직' })
      rtn.push({ value: '9', text: '기타' })
      return rtn
    },

    // 드랍다운 (콘텐츠 구분)
    itemsD2() {
      const rtn = []
      rtn.push({ value: '1', text: 'Festival' })
      rtn.push({ value: '2', text: 'Animals' })
      rtn.push({ value: '3', text: 'Tip' })
      rtn.push({ value: '4', text: 'MD' })
      rtn.push({ value: '5', text: 'Art' })
      rtn.push({ value: '6', text: 'Food' })
      rtn.push({ value: '7', text: 'Kids' })
      rtn.push({ value: '8', text: 'Exciting' })
      return rtn
    },

    // 드랍다운 (이용약관 구분)
    itemsD5() {
      const rtn = []
      rtn.push({ value: '1', text: '개인정보 처리방침' })
      rtn.push({ value: '2', text: '(가입) 개인정보 수집 및 활용 동의' })
      rtn.push({ value: '3', text: '(가입) 프로모션 안내 수신' })
      rtn.push({ value: '4', text: '(가입 만 14세 아동의 개인정보 처리 동의)' })
      return rtn
    },
    // 드랍다운 (개인정보처리방침 약관 구분)
    itemsD3() {
      const rtn = []
      rtn.push({ value: '1', text: '홈페이지' })
      rtn.push({ value: '2', text: '에버랜드' })
      rtn.push({ value: '3', text: '캐리비안베이' })
      rtn.push({ value: '4', text: '홈브릿지' })
      rtn.push({ value: '5', text: '연간이용권' })
      rtn.push({ value: '6', text: '동물사랑단&키즈 동물사랑단' })
      rtn.push({ value: '7', text: '식물사랑단&키즈 식물사랑단' })
      rtn.push({ value: '8', text: '전자상거래 이용약관' })
      rtn.push({ value: '9', text: '기프트 카드' })
      return rtn
    },

    // 드랍다운 (시즌)
    itemsD4() {
      const rtn = []
      rtn.push({ value: '1', text: '1' })
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
