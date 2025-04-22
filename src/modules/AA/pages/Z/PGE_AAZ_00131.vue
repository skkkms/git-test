<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>이용문의</h4>
      </div>

      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="openPopup1">
            팝업1
          </ur-button>
        </div>
      </div>
    </sui-page-contents>
  </sui-page>
</template>

<script>
export default {
  name: 'PGEAAZ00131',
  components: {
  },
  data() {
    return {
      // 입력데이터
      inputData: {
        parkKindCd: '',
        visitStatusCd: '',
        langKindCd: 'KO',
        exposrYn: '',
        exposrOrder: '',
        exposrDescrt: '',
        exposrDescrt2: '',
        exposrDescrt3: '',
        exposrPeriod: [],
        exposrPeriodStartDtm: '',
        exposrPeriodEndDtm: '',
        connUrl: '',
        occrCondNm: '',
        insertCondCdList: [],
      },
    }
  },
  computed: {
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    this.searchList({})
  },
  mounted() {
  },
  methods: {
    openPopup1() {
      utils.openLayerPopup('PGE_AAD_00001', this.onCondInfoSettngCallback, {
        pageInitialData: {
          inputType: 'I',
          parkKindCd: this.inputData.parkKindCd,
          initData: this.inputData.insertCondCdList,
        },
        size: 'xlg',
      })
    },
  },
}
</script>
<style lang="scss">
</style>
