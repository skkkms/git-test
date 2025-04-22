<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 이벤트 정보-->
      <div class="comm_title_wrap flex_wrap">
        <h4>이벤트 정보</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="게시구분"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          required="true"
        >
          <ur-radio
            v-model="R1"
            value="Radio 01"
            sm
          >
            공통
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio 02"
            sm
          >
            에버랜드
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio 03"
            sm
          >
            캐리비안베이
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="게임 명"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          required="true"
        >
          <ur-text-field
            style="width:100%; height:auto"
            value="미니게임1"
          />
        </ur-form-item>
        <ur-form-item
          label="노출 여부"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          required="true"
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
          label="이벤트 기간"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
          required="true"
        >
          <ur-date-time-range-picker
            v-model="dateValue1"
            auto-confirm
          />
        </ur-form-item>
        <ur-form-item
          label="게임 코드"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          required="true"
        >
          <ur-text-field
            style="width:100%; height: auto;"
            value="GAME123"
          />
        </ur-form-item>
        <ur-form-item
          label="연결 URL"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
          required="true"
        >
          <ur-text-field
            style="width:100%; height: auto;"
            value="https://www.everland.com/web/everland/now/news/1223964_10436.html"
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
                value="미니게임1_썸네일 이미지.jpg"
                style="width: 50%;"
              />
              <ur-button color="violet">
                파일 찾기
              </ur-button>
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <span class="guid_txt">
              * 이미지 : 198 x 198 / 파일 규격 : 15MB 미만 jpg, png, gif
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
      <!-- E :: 이벤트 정보-->

      <!-- S :: 조건 정보 -->
      <div class="comm_title_wrap flex_wrap mt20">
        <h4 class="pr10">
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
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            value="멤버십 등급"
            style="width: 100%;"
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
            title="참여 조건 정보 설정"
            large
            dragable
            @closed="closed"
          >
            <P01 />
          </ur-modal>
        </ur-form-item>
        <ur-form-item
          label="발생 조건"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="R3"
            value="Radio 01"
            sm
          >
            전체
          </ur-radio>
          <ur-radio
            v-model="R3"
            value="Radio 02"
            sm
          >
            필터 대상
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="소진 솜"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          required
          class="flex_wrap"
        >
          <ur-text-field
            style="width:100%; height:auto;"
            value="10"
          />
        </ur-form-item>
        <ur-form-item
          label="참여 기회"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          required
          class="flex_wrap"
        >
          <ur-dropdown
            v-model="valueD1"
            :items="itemsD1"
          />
          <ur-text-field
            style="width:50%; height:auto;"
            value=""
            class="pr10"
          />
          회
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 조건 정보 -->

      <!-- S :: 보상 정보 -->
      <div class="comm_title_wrap mt20">
        <h4>
          보상 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="지급 쿠폰"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            value=""
            style="width: 100%;"
          />
          <ur-icon-button
            icon="search"
            icon-type="line"
            color="primary"
            @click="openModalP02"
          />
          <ur-modal
            ref="modalP02"
            class="modal-b1c6"
            title="발행 쿠폰 검색"
            large
            dragable
            @closed="closed"
          >
            <P02 />
          </ur-modal>
        </ur-form-item>
        <ur-form-item
          label="쿠폰 수량"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            style="width:100%; height:auto;"
            value=""
          />
        </ur-form-item>
        <ur-form-item
          label="보상 구분"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-radio-wrapper
            v-model="valueR4"
            :items="itemsR4"
            sm
          />
        </ur-form-item>
        <ur-form-item
          label="보상 조건"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            style="width:50%; height:auto;"
            value=""
            class="pr10"
          />
          등 까지
        </ur-form-item>
        <ur-form-item
          label="반복 여부"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-radio-wrapper
            v-model="valueR5"
            :items="itemsR5"
            sm
          />
        </ur-form-item>
        <ur-form-item
          label="결산 일시"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          required
          class="flex_wrap"
        >
          <ur-dropdown
            v-model="valueD2"
            :items="itemsD2"
          />
          <ur-time-picker
            v-model="valuetime1"
            one-input-mode
            mode="dropdown"
            style="width: 20%;"
            term="60"
          />
          <ur-dropdown
            v-model="valueD3"
            :items="itemsD3"
          />
          <ur-text-field
            style="height:auto;"
            value=""
          />
          <ur-date-time-range-picker
            v-model="dateValue1"
            auto-confirm
            one-input-mode
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 보상 정보 -->
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
import P01 from './components/PGE_AAZ_00089_P01.vue'
import P02 from './components/PGE_AAZ_00089_P02.vue'

export default {
  name: 'PGE_AAZ_00089', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
    P02,
  },
  data() {
    return {
      // 드롭다운
      valueD1: '1',
      valueD2: '',
      valueD3: '',

      // 라디오
      R1: 'Radio 01',
      R2: 'Radio 01',
      R3: 'Radio 01',

      valueR4: '',
      valueR5: '',
      // 이벤트 기간 date-picker
      dateValue1: ['2022-10-13 10:00', '2022-11-13 22:00'],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // 드랍다운
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '일 단위' })
      rtn.push({ value: '3', text: '주 단위' })
      rtn.push({ value: '4', text: '월 단위' })
      return rtn
    },
    itemsD2() {
      const rtn = []
      rtn.push({ value: '1', text: '일 단위' })
      rtn.push({ value: '2', text: '주 단위' })
      rtn.push({ value: '3', text: '월 단위' })
      return rtn
    },
    itemsD3() {
      const rtn = []
      rtn.push({ value: '1', text: '월' })
      rtn.push({ value: '2', text: '화' })
      rtn.push({ value: '3', text: '수' })
      rtn.push({ value: '4', text: '목' })
      rtn.push({ value: '5', text: '금' })
      rtn.push({ value: '6', text: '토' })
      rtn.push({ value: '7', text: '일' })
      return rtn
    },

    // 라디오 warpper
    itemsR4() {
      const rtn = []
      rtn.push({ value: '1', text: '등수' })
      rtn.push({ value: '2', text: '점수' })
      rtn.push({ value: '3', text: '비율(%)' })
      return rtn
    },
    itemsR5() {
      const rtn = []
      rtn.push({ value: '1', text: 'Y' })
      rtn.push({ value: '2', text: 'N' })
      return rtn
    },
    modalP01() {
      return this.$refs.modalP01
    },
    modalP02() {
      return this.$refs.modalP02
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
    closed() {},
  },
}
</script>
<style scoped>
</style>
