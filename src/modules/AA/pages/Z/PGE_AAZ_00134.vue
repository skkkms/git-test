<template>
  <div>
    <template slot="title">
      <div class="modal-title">
        시설 조회
      </div>
    </template>
    <template>
      <div class="modal-body">
        <ur-form-box toggleable>
          <ur-form-item
            label="시설코드"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            <ur-text-field
              value=""
              style="width: 100%;"
            />
          </ur-form-item>
          <ur-form-item
            label="시설명"
            :label-align="'right'"
            style="width: 50%; height: auto; border-top: 0;"
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

        <ur-data-grid
          ref="grid"
          :headers="columnsP2T1"
          :options="opts1"
          :data-source="listP2T1"
          :data-set-options="{id: 'id'}"
        />
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
  name: 'PGE_AAZ_00134', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      opts1: {
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
        height: 300,
      },
      columnsP2T1: [
        { text: '시설코드', value: 'value1' },
        { text: '시설명', value: 'value2' },
        { text: '대표 시설코드', value: 'value3' },
        { text: '대표 시설명', value: 'value4' },
      ],
      listP2T1: [
        {
          value1: 'C100A2201', value2: '쥬빌리카니발', value3: 'C100A22', value4: '쥬빌리카니발',
        },
        {
          value1: 'C105V0201', value2: '구슬(몽키밸리)', value3: 'C105V02', value4: '정문 동학식품',
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
    closeModal() { this.modal.close() },
    closed() {},
  },
}
</script>
<style scoped>
</style>
