<template>
  <div>
    <template slot="title">
      <div class="modal-title mb45" />
    </template>
    <template>
      <div class="modal-body">
        <!-- ::S 콘텐츠1 -->
        <ur-data-grid
          ref="grid"
          :headers="columnsP1T1"
          :data-source="listP1T1"
          :data-set-options="{id: 'id'}"
          :options="opts"
        />
        <!-- ::E 콘텐츠1 -->
      </div>
    </template>
    <template>
      <div class="comm_btn_wrap bt1">
        <div class="right_box mt10">
          <ur-button
            color="violet"
            @click="closeModalP02"
          >
            닫기
          </ur-button>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'PGE_AAZ_00075_P03', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      opts: {
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      // 출석체크 출석 현황 테이블
      columnsP1T1: [
        { value: 'str1', text: '출석일수' },
        { value: 'str2', text: '출석일시' },
        { value: 'str3', text: '보상' },
        { value: 'str4', text: '보상 수령 여부' },
        { value: 'str5', text: '경품 명' },
      ],
      listP1T1: [
        {
          str1: '3일차', str2: '2022-10-14 15:35:35', str3: '쿠폰', str4: 'Y', str5: '츄러스 쿠폰',
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
    closeModalP02() { this.modal.close() },
    closed() {},
  },
}
</script>
  <style scoped />
