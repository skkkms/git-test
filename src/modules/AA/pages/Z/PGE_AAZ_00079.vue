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
          label="게시 구분"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-radio
            v-model="R1"
            value="Radio01"
            sm
          >
            공통
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio02"
            sm
          >
            에버랜드
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio03"
            sm
          >
            캐리비안베이
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="구분"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-radio
            v-model="R2"
            value="Radio01"
            sm
          >
            온라인 이벤트
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio02"
            sm
          >
            파크 이벤트
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio03"
            sm
          >
            PICK 이벤트
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="이벤트 분류"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD1"
            :items="itemsD1"
          />
        </ur-form-item>
        <ur-form-item
          label="이벤트 명"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            value="LIVE 나비 체험관 이벤트"
            style="width: 100%;"
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
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="R3"
            value="Radio01"
            sm
          >
            Y
          </ur-radio>
          <ur-radio
            v-model="R3"
            value="Radio02"
            sm
          >
            N
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="노출 순서"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%;"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 노출정보 -->

      <!-- S:: 조건정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          조건 정보
        </h4>
        <span class="subscript_txt">
          * 참여 조건 미 설정 시, 전체 대상으로 설정됩니다.
        </span>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="참여 조건"
          :label-align="'right'"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 90%;"
          />
          <ur-icon-button
            icon="search"
            icon-type="line"
            color="primary"
            @click="openModalP01"
          />
          <ur-modal
            ref="modalP01"
            class="modal-b1c6"
            xlarge
            title="참여 조건 정보 설정"
            @closed="closed"
          >
            <P01 />
            <!-- :page-id="contextPageId" -->
          </ur-modal>
        </ur-form-item>
        <ur-form-item
          label="발생 조건"
          :label-align="'right'"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="R4"
            value="Radio01"
            sm
          >
            전체
          </ur-radio>
          <ur-radio
            v-model="R4"
            value="Radio02"
            sm
          >
            참여자 대상
          </ur-radio>
          <ur-radio
            v-model="R4"
            value="Radio03"
            sm
          >
            필터 대상
          </ur-radio>
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 조건정보 -->
      <!-- S:: 이벤트 이미지 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          이벤트 이미지 정보
        </h4>
      </div>
      <ur-form-box toggleable>
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
                style="width: 50%;"
              />
              <ur-button color="violet">
                파일 찾기
              </ur-button>
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <span class="guid_txt">
              * 이미지 : 624 x 320 / 파일 규격 : 15MB 미만 jpg, png, gif
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
      <!-- E:: 이벤트 이미지 정보 -->
      <!-- S:: 이벤트 상세 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          이벤트 상세 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="내용"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <img
            src="/images/food/food_1.png"
            style="width: fit-content; height: 150px;"
            alt=""
          >
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 이벤트 상세 정보 -->

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
import P01 from './components/PGE_AAZ_00077_P01.vue'

export default {
  name: 'PGE_AAZ_00079', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
  },
  data() {
    return {
      // 라디오 버튼
      R1: null,
      R2: null,
      R3: null,
      R4: null,
      // 드롭다운
      valueD1: null,
      // 보상정보 테이블
      valueT2D1: null,
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

    // modalPopUp
    modalP01() {
      return this.$refs.modalP01
    },

    // 드랍다운
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: 'OX 퀴즈' })
      rtn.push({ value: '2', text: '스탬프' })
      rtn.push({ value: '3', text: '룰렛' })
      rtn.push({ value: '4', text: '응모 이벤트' })
      rtn.push({ value: '5', text: '기타 이벤트' })
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
    closeModal() { this.modal.close() },
    closed() {},
  },
}
</script>
<style scoped>
</style>
