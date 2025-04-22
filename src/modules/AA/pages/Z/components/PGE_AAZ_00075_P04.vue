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
            @click="closeModalP03"
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
  name: 'PGE_AAZ_00075_P04', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      opts: {
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      // 미션 달성 현황 테이블
      columnsP1T1: [
        { value: 'str1', text: 'No.' },
        { value: 'str2', text: '미션 번호' },
        { value: 'str3', text: '미션 명' },
        { value: 'str4', text: '달성일시' },
        { value: 'str5', text: '보상종류' },
        { value: 'str6', text: '보상 명' },
      ],
      listP1T1: [
        {
          str1: '3', str2: '1', str3: '에버랜드 3회 입장하기', str4: '2022-10-14 15:35:35', str5: '쿠폰', str6: '츄러스 쿠폰',
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
    closeModalP03() { this.modal.close() },
    closed() {},
  },
}
</script>
  <style scoped />
