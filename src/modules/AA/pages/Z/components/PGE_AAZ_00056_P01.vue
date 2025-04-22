<template>
  <div>
    <template slot="title">
      <div class="modal-title mb45">
        클래스(반) 설정
      </div>
    </template>
    <template>
      <div class="modal-body">
        <!-- ::S 콘텐츠1 -->
        <ur-data-grid
          ref="grid"
          :headers="columnsP1T1"
          :data-source="listP1T1"
          :options="options"
          :data-set-options="{id: 'id'}"
        >
          <template #empty-view>
            <div class="empty_box">
              *등록된 데이터가 없습니다.
            </div>
          </template>
          <template #center-info>
            <ur-button
              color="violet"
              class="ml16"
            >
              추가
            </ur-button>
            <ur-button
              color="violet"
            >
              삭제
            </ur-button>
            <ur-button
              color="violet"
            >
              초기화
            </ur-button>
          </template>
        </ur-data-grid>

        <!-- ::E 콘텐츠1 -->
      </div>
    </template>
    <template>
      <div class="bt1 mt45">
        <sui-page-footer class="comm_btn_wrap">
          <div class="btn_wrap">
            <div class="left_box" />
            <div class="right_box">
              <ur-button>
                닫기
              </ur-button>
              <ur-button
                color="violet"
              >
                저장
              </ur-button>
            </div>
          </div>
        </sui-page-footer>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'PGE_AAZ_00056_P01', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
    // 드롭다운
      valueD1: '1',

      // 테이블 옵션
      options: { // 토탈 X
        noInfo: false,
        multiSelect: false,
        selectCheck: true,
      },

      // 사용자검색팝업테이블
      columnsP1T1: [
        { text: '멤버십', value: 'value1' },
        { text: '레벨', value: 'value2' },
        {
          text: '클래스',
          value: 'value3',
          required: true,
          component: {
            template: '<div><ur-text-field value="사하라"/></div>',
          },
        },
      ],

      listP1T1: [
        {
          value1: '동물사랑단', value2: '초급반', value3: '',
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
    closeModalP01() { this.modal.close() },
    closed() {},
  },
}
</script>
  <style scoped />
