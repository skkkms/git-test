<template>
  <div>
    <template slot="title">
      <div class="modal-title mb45">
        사용자검색
      </div>
    </template>
    <template>
      <div class="modal-body">
        <!-- ::S 콘텐츠1 -->
        <ur-form-box toggleable>
          <ur-form-item
            label="ID/성명"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <ur-text-field
              value=""
              style="width: 100%; height: auto;"
            />
          </ur-form-item>
        </ur-form-box>
        <div class="btn_wrap mt10">
          <div class="right_box">
            <ur-button color="violet">
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
      <div class="comm_btn_wrap">
        <div class="right_box">
          <ur-button @click="closeModalP01">
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
  name: 'PGE_AAZ_00101_P01', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
    // 드롭다운
      valueD1: '1',

      // 테이블 옵션
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },

      // 사용자검색팝업테이블
      columnsP1T1: [
        { text: '성명', value: 'value1' },
        { text: '싱글ID', value: 'value2' },
        { text: '부서', value: 'value3' },
        { text: '직급', value: 'value4' },
      ],

      listP1T1: [
        {
          value1: '안수민', value2: 'sm76.kim', value3: '리조트 B2B 그룹 오퍼링', value4: '프로',
        },

      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

    // 드랍다운
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '어트렉션' })
      rtn.push({ value: '3', text: '엔터테인먼트' })
      rtn.push({ value: '4', text: '플랜토피아' })
      rtn.push({ value: '5', text: '쥬토피아' })
      rtn.push({ value: '6', text: '레스토랑' })
      rtn.push({ value: '7', text: '선물숍' })
      rtn.push({ value: '8', text: '편의시설' })
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
    closeModalP01() { this.modal.close() },
    closed() {},
  },
}
</script>
  <style scoped />
