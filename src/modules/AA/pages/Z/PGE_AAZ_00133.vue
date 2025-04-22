<template>
  <div>
    <template slot="title">
      <div class="modal-title">
        품목 검색-상품 팝업
      </div>
    </template>
    <template>
      <div class="modal-body">
        <!-- ::S 콘텐츠1 -->
        <ur-form-box toggleable>
          <ur-form-item
            label="품목 구분"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            <ur-text-field
              value=""
              style="width: 100%;"
            />
          </ur-form-item>
          <ur-form-item
            label="사용 채널"
            :label-align="'right'"
            style="width: 50%; height: auto; border-top: 0;"
          >
            <ur-text-field
              value=""
              style="width: 100%;"
            />
          </ur-form-item>
          <ur-form-item
            label="품목 코드"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            <ur-text-field
              value=""
              style="width: 100%;"
            />
          </ur-form-item>
          <ur-form-item
            label="품목 명"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            <ur-text-field
              value=""
              style="width: 100%;"
            />
          </ur-form-item>
        </ur-form-box>
        <!-- ::E 콘텐츠1 -->
        <div class="comm_btn_wrap">
          <div class="right_box">
            <ur-button>
              초기화
            </ur-button>
            <ur-button color="violet">
              검색
            </ur-button>
          </div>
        </div>
        <!-- ::S 콘텐츠2 -->
        <ur-data-grid
          ref="grid"
          :headers="columnsP1T1"
          :data-source="listP1T1"
          :options="options"
          :data-set-options="{id: 'id'}"
        />
        <!-- ::E 콘텐츠2 -->
      </div>
    </template>
    <template>
      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="right_box">
            <ur-button @click="closeModal">
              닫기
            </ur-button>
            <ur-button color="violet">
              선택
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </template>
  </div>
</template>

<script>

export default {
  name: 'PGE_AAZ_00133', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },

      // 팝업테이블
      columnsP1T1: [
        { text: '품목코드', value: 'value1' },
        { text: '품목명칭', value: 'value2' },
        { text: '태분류명', value: 'value3' },
        { text: '대분류명', value: 'value4' },
        { text: '중분류명', value: 'value5' },
        { text: '소분류명', value: 'value6' },
        { text: '세분류명', value: 'value7' },
        { text: '과세구분', value: 'value8' },
        { text: '파크구분', value: 'value9' },
      ],

      listP1T1: [
        {
          value1: '1002036992', value2: 'P) 교보, 12색 빙글빙글 색연필, 여', value3: '상품', value4: '파크상품', value5: '잡화', value6: '문구잡화', value7: '문구세트', value8: '과세', value9: 'E/R',
        },

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
    closeModal() {},
  },
}
</script>
<style scoped>
</style>
