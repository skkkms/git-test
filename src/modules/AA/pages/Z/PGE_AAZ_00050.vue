<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- ::S 노출 정보 -->
      <div class="comm_title_wrap">
        <h4>
          노출 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="배너 구분"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
        >
          <ur-radio
            v-model="R1"
            value="Radio 01"
            sm
          >
            메인 배너
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio 02"
            sm
          >
            메인 팝업
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio 03"
            sm
          >
            기타 배너
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="게시 구분"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
        >
          <ur-radio
            v-model="R2"
            value="Radio 01"
            sm
          >
            에버랜드
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio 02"
            sm
          >
            캐리비안베이
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio 03"
            sm
          >
            기타
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="게시 기간"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
        >
          <ur-date-time-range-picker
            v-model="dateValue1"
            init="today"
          />
        </ur-form-item>
        <ur-form-item
          label="노출 여부"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="R3"
            value="Radio 01"
            sm
          >
            Y
          </ur-radio>
          <ur-radio
            v-model="R3"
            value="Radio 02"
            sm
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
      </ur-form-box>
      <!-- ::E 노출 정보 -->

      <!-- ::S 배너 상세 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          배너 상세 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="언어 구분"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
        >
          <ur-radio
            v-model="R1"
            value="Radio 01"
            sm
          >
            국문
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio 02"
            sm
          >
            영문
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="배너 코드"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD1"
            :items="itemsD1"
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="제목"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            value="출석체크 하단 배너"
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <!-- S:: ALT태그 추가 -->
        <ur-form-item
          label="배너 이미지"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="compo_col_wrap"
        >
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <ur-text-field
                value=""
                style="width: 50%;"
              />
              <ur-button color="violet">
                파일 찾기
              </ur-button>
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <span class="guid_txt">
              <!-- S:: 메인배너 상단배너 -->
              * 이미지 : 720 x 1200 / 파일 규격 : 15MB 미만 jpg, png, gif, mp4, svg
              <!-- E:: 메인배너 상단배너 -->
              <!-- S:: 메인배너 마케팅배너 -->
              <!-- * 이미지 : 548 x 548 / 파일 규격 : 15MB 미만 jpg, png, gif -->
              <!-- E:: 메인배너 마케팅배너 -->
              <!-- S:: 메인배너 Editor's Clip -->
              <!-- * 이미지 : 548 x 548 / 파일 규격 : 15MB 미만 jpg, png, gif -->
              <!-- * 이미지 : 480 x 320 / 파일 규격 : 15MB 미만 jpg, png, gif -->
              <!-- E:: 메인배너 Editor's Clip -->
              <!-- S:: 메인배너 공지사항 -->
              <!-- * 이미지 : 480 x 724 / 파일 규격 : 15MB 미만 jpg, png, gif -->
              <!-- E:: 메인배너 공지사항 -->
              <!-- S:: 기타배너 출석체크 -->
              <!-- * 이미지 : 720 x 가변 / 파일 규격 : 15MB 미만 jpg, png, gif -->
              <!-- E:: 기타배너 출석체크 -->
              <!-- S:: 기타배너 전자영수증 -->
              <!-- * 이미지 : 624 x 226 / 파일 규격 : 15MB 미만 jpg, png, gif -->
              <!-- E:: 기타배너 전자영수증 -->
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
          label="팝업 이미지"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="compo_col_wrap"
        >
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <ur-text-field
                value=""
                style="width: 50%;"
              />
              <ur-button color="violet">
                파일 찾기
              </ur-button>
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <span class="guid_txt">
              <!-- S:: 메인팝업 배너 이미지 -->
              * 이미지 : 624 x 330 / 파일 규격 : 15MB 미만 jpg, png, gif
              <!-- E:: 메인팝업 배너 이미지 -->
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
          label="연결 URL"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            value="https://www.everland.com/web/everland/now/news/122"
            style="width: 88%; height: auto;"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- ::E 배너 상세 정보 -->

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
  name: 'PGE_AAZ_00050', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 라디오버튼
      R1: '',
      R2: '',
      R3: '',
      R4: '',

      // 체크박스
      valueC1: ['App'],
      valueC2: ['모바일웹'],
      valueC3: ['PC'],

      // 드롭다운
      valueD1: '4',
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // 드랍다운
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '상단 배너' })
      rtn.push({ value: '2', text: '마케팅 배너' })
      rtn.push({ value: '3', text: "Editor's Clip" })
      rtn.push({ value: '4', text: '출석체크' })
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
