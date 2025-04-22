<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <template>
        <div class="comm_title_wrap">
          <h4>
            이벤트 정보
          </h4>
        </div>
        <ur-form-box toggleable>
          <ur-form-item
            label="이벤트 명"
            :label-align="'right'"
            style="width: 100%; height: auto;"
            required
          >
            <ur-text-field
              value=""
              style="width: 100%;"
            />
          </ur-form-item>
          <ur-form-item
            label="이벤트 기간"
            :label-align="'right'"
            style="width: 50%; height: auto;"
            required
            class="flex_wrap"
          >
            <ur-date-time-range-picker
              v-model="dateValue1"
              init="today"
            />
          </ur-form-item>
          <ur-form-item
            label="노출 여부"
            :label-align="'right'"
            style="width: 50%; height: auto;"
            required
            class="flex_wrap"
          >
            <ur-radio
              v-model="R1"
              value="Radio01"
              sm
            >
              Y
            </ur-radio>
            <ur-radio
              v-model="R1"
              value="Radio02"
              sm
            >
              N
            </ur-radio>
          </ur-form-item>
        </ur-form-box>
        <div class="comm_title_wrap mt35">
          <h4>
            이벤트 이미지 정보
          </h4>
        </div>
        <ur-form-box toggleable>
          <!-- S:: ALT태그 추가 -->
          <ur-form-item
            label="상세 배너 이미지"
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
                * 이미지 : 720 x 가변 / 파일 규격 : 15MB 미만 jpg, png, gif
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
            label="스탬프 배경 이미지"
            :label-align="'right'"
            style="width: 100%; height: auto;"
            class="compo_col_wrap no_repuired"
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
                * 이미지 : 720 x 1328 / 파일 규격 : 15MB 미만 jpg, png, gif
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
            label="스탬프 비활성화 이미지"
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
                * 이미지 : 140 x 168 / 파일 규격 : 15MB 미만 jpg, png, gif
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
            label="스탬프 활성화 이미지"
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
                * 이미지 : 140 x 168 / 파일 규격 : 15MB 미만 jpg, png, gif
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
            label="스페셜 스탬프 비활성화 이미지"
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
                * 이미지 : 140 x 168 / 파일 규격 : 15MB 미만 jpg, png, gif
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
            label="스페셜 스탬프 활성화 이미지"
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
                * 이미지 : 140 x 168 / 파일 규격 : 15MB 미만 jpg, png, gif
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
        <div class="comm_btn_wrap mt35">
          <div class="comm_title_wrap">
            <h4>
              보상 정보
            </h4>
          </div>
          <div class="left_box pl16">
            <ur-button color="violet">
              추가
            </ur-button>
            <ur-button color="violet">
              삭제
            </ur-button>
            <ur-button color="violet">
              초기화
            </ur-button>
          </div>
        </div>
        <ur-data-grid
          ref="grid"
          class="custom_grid_pgeNav_None"
          :headers="columnsT1"
          :data-source="listT1"
          :options="opts"
          :data-set-options="{id: 'id'}"
        />
        <!-- ::S 발행쿠폰검색 내 모달팝업버튼 개발완료시 삭제 요함 -->
        <div class="btn_wrap mt10">
          <div class="right_box">
            <ur-button
              color="violet"
              @click="openModalP01"
            >
              <ur-modal
                ref="modalP01"
                class="modal-b1c6"
                xlarge
                title="발행쿠폰검색"
                @closed="closed"
              >
                <P01 />
              <!-- :page-id="contextPageId" -->
              </ur-modal>
              발행쿠폰검색팝업
            </ur-button>
          </div>
        </div>
        <!-- ::E 발행쿠폰검색 내 모달팝업버튼 개발완료시 삭제 요함 -->
      </template>
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
import P01 from './components/PGE_AAZ_00085_P01.vue'

export default {
  name: 'PGE_AAZ_00085', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
  },
  data() {
    return {
      // 라디오 버튼
      R1: null,

      // 테이블 옵션
      opts: { // 토탈 O
        noInfo: true,
        pagination: true,
        multiSelect: false,
        selectCheck: true,
      },


      columnsT1: [
        {
          text: 'No.',
          value: 'value1',
          width: 40,
        },
        {
          text: '스페셜 스탬프 여부',
          value: 'value2',
          required: true,
          component: {
            template: '<div><ur-radio v-model="T1R1" value="Radio01" sm> Y </ur-radio> <ur-radio v-model="T1R1" value="Radio02" sm> N </ur-radio></div>',
          },
        },
        {
          text: '구분',
          value: 'value3',
          required: true,
          component: {
            template: '<div><ur-dropdown v-model="valueT1D1" :items="itemsT1D1"/></div>',
          },
        },
        {
          text: '경품명',
          value: 'value4',
          required: true,
          component: {
            template: '<div><ur-text-field value="" style="width: 100%;"/></div>',
          },
        },
        {
          text: '지급쿠폰',
          value: 'value5',
          component: {
            template: '<div><ur-text-field value="" class="pr10" style="width: 100%;"/><ur-icon-button icon="search" icon-type="line" color="primary" /></div>',
          },
        },
        {
          text: '수량',
          value: 'value6',
          required: true,
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div style="align-items: center;"><ur-dropdown class="pr10" v-model="code1" :items="me.itemsT1D1"/><ur-text-field value="" style="width: 100%;"/><span>개</span></div>',
            data() {
              return {
                code1: this.value,
              }
            },
          },
        },
        {
          text: '보상일자',
          value: 'value7',
          required: true,
          component: {
            template: '<div style="align-items: center;"><ur-text-field value="" style="width: 100%;"/><span> 일 차</span></div>',
          },
        },
      ],
      listT1: [
        {
          value1: '1', value2: '', value3: '', value4: '', value5: '', value6: '', value7: '',
        },

      ],


    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

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
    closeModal() { this.modal.close() },
    closed() {},
  },
}
</script>
<style scoped>
</style>
