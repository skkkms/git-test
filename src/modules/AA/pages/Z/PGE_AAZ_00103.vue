<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- ::S 담당자 정보 -->
      <div class="comm_title_wrap">
        <h4>
          담당자 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="성명"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%; height: auto;"
          />
          <ur-icon-button
            icon="search"
            icon-type="line"
            color="primary"
            @click="openModalP01"
          />

          <!-- ::S 사용자검색 팝업 -->
          <ur-modal
            ref="modalP01"
            class="modal-b1c6"
            xlarge
            dragable
            title="사용자 검색"
            @closed="closed"
          >
            <template slot="title">
              <div class="modal-title mb45">
                사용자검색
              </div>
            </template>
            <template>
              <div class="modal-body">
                <P01
                  :page-id="contextPageId"
                />
                <!-- ::E 콘텐츠2 -->
              </div>
            </template>
          </ur-modal>
          <!-- ::E 사용자검색 팝업-->
        </ur-form-item>
        <ur-form-item
          label="파크 구분"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="v1"
            value="Radio01"
            sm
          >
            에버랜드
          </ur-radio>
          <ur-radio
            v-model="v1"
            value="Radio02"
            sm
          >
            캐리비안베이
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="담당시설"
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
          class="flex_wrap"
          label="등록자"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          7323577
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="등록일시"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          2018-05-18- 10:00:39
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="수정자"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          7323577
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="수정일시"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          2018-05-18- 10:00:39
        </ur-form-item>
        <!-- ::E 담당자 정보 -->
      </ur-form-box>
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
import P01 from './components/PGE_AAZ_00101_P01.vue'


export default {
  name: 'PGE_AAZ_00103', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
  },
  data() {
    return {
      // 드롭다운
      valueD1: '1',
      // 라디오 버튼
      v1: null,
      // 테이블 옵션
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },

      // 사용자검색팝업테이블
      columnsP1T1: [
        { text: '성명', value: 'value1' },
        { text: '싱글ID', value: 'value2' },
        { text: '부서', value: 'value3' },
        { text: '직급', value: 'value4' },
      ],

      listP1T1: [
        {
          value1: '안수민', value2: 'sm76.kim', value3: '리조트 B2B 그룹 오퍼링', value4: '프로',
        },

      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

    // 드랍다운
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '어트렉션' })
      rtn.push({ value: '3', text: '엔터테인먼트' })
      rtn.push({ value: '4', text: '플랜토피아' })
      rtn.push({ value: '5', text: '쥬토피아' })
      rtn.push({ value: '6', text: '레스토랑' })
      rtn.push({ value: '7', text: '선물숍' })
      rtn.push({ value: '8', text: '편의시설' })
      return rtn
    },

    // modalPopUp
    modalP01() {
      return this.$refs.modalP01
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
    closeModal() { this.modalP01.close() },
    closed() {},
  },
}
</script>
<style scoped>
</style>
