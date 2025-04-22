<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>
          노출 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="블리스 명"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          2023 블리스
        </ur-form-item>
        <ur-form-item
          label="이벤트 기간"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          2022-10-13 10:00 ~ 2022-11-13 22:00
        </ur-form-item>
      </ur-form-box>
      <div class="comm_title_wrap mt45">
        <h4>
          블리스 정보 (등급)
        </h4>
      </div>
      <ur-data-grid
        ref="grid"
        class="custom_grid_pgeNav_None"
        :headers="columnsT1"
        :data-source="listT1"
        :options="opts"
        :data-set-options="{id: 'id'}"
      />
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
  name: 'PGE_AAZ_00129', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 테이블 옵션
      opts: { // 토탈 O
        noInfo: true,
        pagination: true,
        multiSelect: false,
        selectCheck: false,
      },

      columnsT1: [
        {
          text: '등급',
          value: 'value1',
        },
        {
          text: '블리스 등급 명',
          value: 'value2',
        },
        {
          text: '블리스 등급 이미지',
          value: 'value3',
        },
        {
          text: '등급 점수',
          value: 'value4',
        },
      ],
      listT1: [
        {
          value1: '1', value2: '씨앗', value3: '씨앗.jpg', value4: '절대, 500점 이상',
        },
        {
          value1: '2', value2: '새싹', value3: '새싹.jpg', value4: '상대, 상위10% 이내',
        },
        {
          value1: '3', value2: '꽃', value3: '꽃.jpg', value4: '상대, 200등 이내',
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
