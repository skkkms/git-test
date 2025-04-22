<template>
  <div>
    <template slot="title">
      <div class="modal-title mb45">
        공연시간
      </div>
    </template>
    <template>
      <div class="modal-body">
        <!-- ::S 콘텐츠2 -->
        <ur-data-grid
          ref="grid"
          :headers="columnsP1T1"
          :data-source="listP1T1"
          :options="options"
          :data-set-options="{id: 'id'}"
          height="300"
        >
          <template
            #left-info
          >
            <div>
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
          </template>
        </ur-data-grid>
        <!-- ::E 콘텐츠2 -->
        <div class="comm_btn_wrap bt1">
          <div class="right_box mt10">
            <ur-button>
              닫기
            </ur-button>
            <ur-button color="violet">
              저장
            </ur-button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'PGE_AAZ_00011_P03', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {

      // 공연상태 드랍다운 데이터
      itemsP1T1D1: [
        { value: '1', text: '정상' },
        { value: '2', text: '취소' },
      ],


      // 테이블
      options: { // 토탈o
        // msgTotal: false,
        noInfo: false,
        selectCheck: true,
        noBaseInfo: false,
      },

      // 일자별 Q-PASS Tier 관리 테이블
      columnsP1T1: [
        {
          text: '공연 시작시간',
          value: 'value1',
          width: 200,
          required: true,
          component: {
            template: '<div><ur-text-field style="width:80%;" mask="time" value="" placeholder="00:00"/></div>',
          },
        },
        {
          text: '공연상태',
          value: 'value2',
          required: true,
          width: 200,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown style="width:80%;" v-model="code1" :items="me.itemsP1T1D1"/></div>',
            data() {
              return {
                code1: this.value,
              }
            },
          },
        },
        {
          text: '등록일시',
          value: 'value3',
          width: 200,
        },
        {
          text: '등록자',
          value: 'value4',
          width: 100,
        },
        {
          text: '수정일시',
          value: 'value5',
          width: 200,
        },
        {
          text: '수정자',
          value: 'value6',
        },
      ],

      listP1T1: [
        {
          value1: '',
          value2: '1',
          value3: '2022-10-13 15:35:35',
          value4: 'BJ123',
          value5: '2022-10-13 15:35:35',
          value6: 'BJ123',
        },
        {
          value1: '',
          value2: '1',
          value3: '2022-10-13 15:35:35',
          value4: 'BJ123',
          value5: '2022-10-13 15:35:35',
          value6: 'BJ123',
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
