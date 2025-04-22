<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S:: 신청내역 -->
      <div class="comm_title_wrap">
        <h4>
          신청내역
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="슬롯"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          가나다라마바 (05-01 ~ 12-31)
        </ur-form-item>
        <ur-form-item
          label="타임슬롯"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          09:30~11:40
        </ur-form-item>
        <ur-form-item
          label="제목"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          111111 111111
        </ur-form-item>
        <ur-form-item
          label="작성자"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          이민호/KT##30008221204/01052102692
        </ur-form-item>
        <ur-form-item
          label="일자"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          2022-06-13 18:15
        </ur-form-item>
        <ur-form-item
          label="내용"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          22132151213212321356213462132
        </ur-form-item>
        <ur-form-item
          label="다운로드 사유"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          -
        </ur-form-item>
        <ur-form-item
          label="미디어 정보"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="item_grid"
        >
          <ur-data-grid
            ref="grid"
            style="width: 100%;"
            :headers="columnsT1"
            :data-source="listT1"
            :options="options"
            :data-set-options="{id: 'id'}"
          />
        </ur-form-item>
        <ur-form-item
          label="미디어 미리보기"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <img
            src="/images/food/food_0.png"
            style="width: fit-content; height: 150px;"
            alt=""
          >
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 신청내역 -->
      <!-- S:: 처리하기 -->
      <div class="comm_title_wrap mt35">
        <h4>
          처리하기
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="문자발송"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          수락
        </ur-form-item>
        <ur-form-item
          label="현재상태"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          심사중
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 처리하기 -->


      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button>
              목록
            </ur-button>
          </div>
          <div class="right_box">
            <ur-button color="violet">
              수정
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: 'PGE_AAZ_00093', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },

      // 미디어정보 테이블
      columnsT1: [
        { value: 'value1', text: 'FileMeta' },
        { value: 'value2', text: 'FileSize' },
        { value: 'value3', text: 'Width' },
        { value: 'value4', text: 'Height' },
        { value: 'value5', text: 'Playtime' },
        { value: 'value6', text: 'FileName' },
      ],
      listT1: [
        {
          value1: 'image/jpen', value2: '1.82 MB', value3: '3264', value4: '2448', value5: '0', value6: '-',
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
  },
}
</script>
<style scoped>
</style>
