<template>
  <div>
    <template slot="title">
      <div class="modal-title mb45">
        콘텐츠관리-공지
      </div>
    </template>
    <template>
      <div class="modal-body">
        <!-- ::S 콘텐츠1 -->
        <ur-form-box toggleable>
          <ur-form-item
            label="노출 기간"
            :label-align="'right'"
            required
            style="width: 100%; height: auto;"
          >
            <ur-range-picker
              auto-confirm
              input-type="YYYY-MM-DD"
              init="day+30"
            />
          </ur-form-item>
          <ur-form-item
            label="제목"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <ur-text-field
              value=""
              style="width: 100%;"
            />
          </ur-form-item>
        </ur-form-box>
        <div class="btn_wrap mt10">
          <div class="right_box">
            <ur-button>
              초기화
            </ur-button>
            <ur-button color="violet">
              검색
            </ur-button>
          </div>
        </div>
        <!-- ::E 콘텐츠1 -->

        <!-- ::S 콘텐츠2 -->
        <ur-data-grid
          ref="grid"
          :headers="columnsP5T1"
          :data-source="listP5T1"
          :options="opts"
          :data-set-options="{id: 'id'}"
        />
        <!-- ::E 콘텐츠2 -->
      </div>
    </template>
    <template>
      <div class="comm_btn_wrap bt1">
        <div class="right_box mt10">
          <ur-button @click="closeModalP05">
            닫기
          </ur-button>
          <ur-button color="violet">
            저장
          </ur-button>
        </div>
      </div>
    </template>
  </div>
</template>
<script>

export default {
  name: 'PGE_AAZ_00022_P05', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 공지팝업테이블
      columnsP5T1: [
        { text: 'No.', value: 'value1', width: 40 },
        { text: '노출여부', value: 'value2', width: 100 },
        { text: '제목', value: 'value3' },
      ],
      opts: { // 토탈 O
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
      },
      listP5T1: [
        { value1: '1', value2: 'Y', value3: '[공지] 동계 시즌 어트랙션 운영 안내' },
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
    closeModalP05() {},
  },
}
</script>
<style scoped>
</style>
