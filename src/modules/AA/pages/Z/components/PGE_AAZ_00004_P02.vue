<template>
  <div>
    <template slot="title">
      <div class="modal-title">
        시설명/코드 조회
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
            />
          </ur-form-item>
          <ur-form-item
            label="시설명"
            :label-align="'right'"
            style="width: 50%; height: auto; border-top: 0;"
          >
            <ur-text-field
              value=""
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
  name: 'PGE_AAZ_00004_P02', // eslint-disable-line vue/name-property-casing
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
        { text: '시설코드', value: 'id' },
        { text: '시설명', value: 'str1' },
        { text: '대표 시설코드', value: 'str2' },
        { text: '대표 시설명', value: 'str3' },
      ],
      listP2T1: [
        {
          id: 'CV100V89', str1: '원내시설 매출(슈팅고스트)', str2: 'C100V89', str3: '원내시설 매출(슈팅고스트)',
        },
        {
          id: 'CV100V89', str1: '원내시설 매출(로테이팅)', str2: 'C100V90', str3: '원내시설 매출(로테이팅)',
        },
        {
          id: 'CV100V89', str1: '원내시설 매출(아마존)', str2: 'C100V63', str3: '원내시설 매출(아마존)',
        },
        {
          id: 'CV100V89', str1: '동물사랑단 매출(원내)', str2: 'C100V55', str3: '원내시설 매출(원내)',
        },
        {
          id: 'CV100V89', str1: '알프스샵 매출', str2: 'C100V21', str3: '원내시설 매출(알프스샵 매출)',
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
