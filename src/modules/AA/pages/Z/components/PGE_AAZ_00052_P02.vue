<template>
  <div>
    <template slot="title">
      <div class="modal-title mb45">
        필터 검색
      </div>
    </template>
    <template>
      <div class="modal-body">
        <!-- ::S 콘텐츠1 -->
        <ur-form-box toggleable>
          <ur-form-item
            label="필터 ID"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            <ur-text-field
              value=""
              style="width: 100%;"
            />
          </ur-form-item>
          <ur-form-item
            label="필터 명"
            :label-align="'right'"
            style="width: 50%; height: auto;"
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
            <ur-button
              color="violet"
            >
              검색
            </ur-button>
          </div>
        </div>
        <!-- ::E 콘텐츠1 -->
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
      <div class="comm_btn_wrap bt1">
        <div class="right_box mt10">
          <ur-button @click="closeModal">
            닫기
          </ur-button>
          <ur-button color="violet">
            선택
          </ur-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'PGE_AAZ_00052_P02', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 테이블 옵션
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },

      // 팝업테이블
      columnsP1T1: [
        { text: '필터 ID', value: 'value1' },
        { text: '필터 명', value: 'value2' },
        { text: '등록일시', value: 'value3' },
        { text: '등록자', value: 'value4' },

      ],

      listP1T1: [
        {
          value1: '1002036992', value2: '2023-02-14 T1 입장객', value3: '2022-10-13 15:35:35', value4: 'BJ123',
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
