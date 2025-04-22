<template>
  <div>
    <template slot="title">
      <div class="modal-title mb45">
        콘텐츠 관리-시설
      </div>
    </template>
    <template>
      <div class="modal-body">
        <!-- ::S 콘텐츠1 -->
        <ur-form-box toggleable>
          <ur-form-item
            label="시설 카테고리"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            <ur-dropdown
              v-model="valueP2D1"
              :items="itemsP2D1"
            />
          </ur-form-item>
          <ur-form-item
            label="시설 명"
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
            <ur-button color="violet">
              검색
            </ur-button>
          </div>
        </div>
        <!-- ::E 콘텐츠1 -->
      </div>
    </template>
    <template>
      <!-- ::S 콘텐츠2 -->
      <ur-data-grid
        ref="grid"
        :headers="columnsP2T1"
        :data-source="listP2T1"
        :options="opts"
        :data-set-options="{id: 'id'}"
      />
      <!-- ::E 콘텐츠2 -->
    </template>
    <template>
      <div class="comm_btn_wrap bt1">
        <div class="right_box mt10">
          <ur-button @click="closeModalP02">
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
  name: 'PGE_AAZ_00022_P02', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 시설팝업드랍다운
      valueP2D1: '1',
      opts: { // 토탈 O
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
      },
      // 시설팝업테이블
      columnsP2T1: [
        { text: 'No.', value: 'value1' },
        { text: '시설 명', value: 'value2' },
        { text: '시설 카테고리', value: 'value3' },
        { text: 'Zone 구분', value: 'value4' },
        { text: '게시여부', value: 'value5' },
      ],

      listP2T1: [
        {
          value1: '1', value2: '어린이날 코스 1', value3: '랩터레인저', value4: '유러피언 어드벤처', value5: 'Y',
        },
        {
          value1: '2', value2: '어린이날 코스 2', value3: '팝콘 카트', value4: '글로벌페어', value5: 'N',
        },
      ],

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

    // 시설팝업 드랍다운 1
    itemsP2D1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '어트랙션' })
      rtn.push({ value: '3', text: '공연' })
      rtn.push({ value: '4', text: '주토피아' })
      rtn.push({ value: '5', text: '레스토랑' })
      rtn.push({ value: '6', text: '편의시설' })
      rtn.push({ value: '7', text: '굿즈샵' })
      rtn.push({ value: '8', text: '장소' })
      return rtn
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
    closeModalP02() {},
  },
}
</script>
<style scoped>
</style>
