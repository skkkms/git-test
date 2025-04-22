<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- ::S 노출 정보 -->
      <div class="comm_title_wrap">
        <h4>
          노출 정보
        </h4>
        <span class="subscript_txt">
          * 노출 조건 미 설정 시, 전체 대상으로 설정됩니다.
        </span>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="게시 구분"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-radio-wrapper
            v-model="valueR1"
            :items="itemsR1"
            sm
          />
        </ur-form-item>
        <ur-form-item
          label="방문 상태"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-checkbox-wrapper
            v-model="valueC1"
            :items="itemsC1"
            sm
          />
        </ur-form-item>
        <ur-form-item
          label="노출 여부"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-radio-wrapper
            v-model="valueR2"
            :items="itemsR2"
            sm
          />
        </ur-form-item>
        <ur-form-item
          label="노출 순서"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <!-- START : 노출 순서 input 숫자만-->
          <ur-text-field
            mask="#"
            value=""
            style="width: 100%; height: auto;"
          />
          <!-- END : 노출 순서 input 숫자만-->
        </ur-form-item>
        <ur-form-item
          label="노출 기간"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-date-time-range-picker
            v-model="dateValue1"
            input-type="YYYY-MM-DD 09:00"
            init="today"
          />
        </ur-form-item>
        <ur-form-item
          label="노출 조건"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
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
            title="노출 조건 정보 설정"
            @closed="closed"
          >
            <P01 />
            <!-- :page-id="contextPageId" -->
          </ur-modal>
        </ur-form-item>
      </ur-form-box>
      <!-- ::E 노출 정보 -->

      <!-- ::S UX Writing 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          UX Writing 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <!-- START : 언어 구분 -->
        <ur-form-item
          label="언어 구분"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-radio-wrapper
            v-model="valueR3"
            :items="itemsR3"
            sm
          />
        </ur-form-item>
        <!-- END : 언어 구분 -->
        <!-- START : 노출 문구 -->
        <ur-form-item
          label="노출 문구"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <!-- END : 노출 문구-->
        <!-- START : URL-->
        <ur-form-item
          label="연결 URL"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            value=""
            style="width: 45%; height: auto;"
          />
        </ur-form-item>
        <!-- END : URL-->
      </ur-form-box>
      <!-- ::E UX Writing 정보 -->

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
import P01 from './components/PGE_AAZ_00052_P01.vue'

export default {
  name: 'PGE_AAZ_00052', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
  },
  data() {
    return {
      // 라디오 warpper
      valueR1: '',
      valueR2: '',
      valueR3: '',


      // 체크박스
      valueC1: '',
      valueC2: ['모바일웹'],
      valueC3: ['PC'],

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // modalPopUp
    modalP01() {
      return this.$refs.modalP01
    },

    // 라디오 warpper
    itemsR1() {
      const rtn = []
      rtn.push({ value: '1', text: '에버랜드' })
      rtn.push({ value: '2', text: '캐리비안베이' })
      return rtn
    },
    itemsR2() {
      const rtn = []
      rtn.push({ value: '1', text: 'Y' })
      rtn.push({ value: '2', text: 'N' })
      return rtn
    },
    itemsR3() {
      const rtn = []
      rtn.push({ value: '1', text: '국문' })
      rtn.push({ value: '2', text: '영문' })
      return rtn
    },

    // 체크박스 Wrapper 아이템 test
    itemsC1() {
      const rtn = []
      rtn.push({ value: '1', text: '방문 전' })
      rtn.push({ value: '2', text: '방문 중' })
      rtn.push({ value: '3', text: '방문 후' })
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
    closed() {},
  },
}
</script>
<style scoped>
</style>
