<template>
  <div>
    <div class="comm_popup_wrap_small">
      <sui-grid
        ref="listGrid"
        :hideHeader="false"
        :pageable="false"
        :dataset="'dsDeptSelPop'"
        :multiselect="false"
        :columns="gridColumns"
        :enabletooltips="true"
        :showDisplayCountControl="false"
        :initialPagesize="5"
        @rowdoubleclick="onRowdoubleclick"
      />
      <!-- <sui-jqx-grid
        :columns="gridColumns"
        :dataset="'dsDeptSelPop'"
        :multiselect="true"
        :enabletooltips="true"
        @rowdoubleclick="onRowdoubleclick"
      /> -->
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button
        type="button"
        class="comm_btn_solid"
        @click="onCancelClick"
      >
        {{ $t('MSG_BTN_CLOSE') }}
      </sui-button>
    </div>
  </div>
</template>
<script>
// import - libraries (node modules)
// import - local files (js, vue, ...)
export default {
  name: 'PGE_CMY_00004_P01', // eslint-disable-line vue/name-property-casing
  props: {
    selectedDeptInfo: {
      type: Object,
      default() {
        return {
          departmentName: '',
          departmentId: '',
        };
      },
    },
  },
  data() {
    return {
      deptInfo: this.selectedDeptInfo,
      pageTitle: this.$t('MSG_TIT_DEPT_SELT'), // eslint-disable-line vue/name-property-casing,
      showCheckIdModal: false,
      localdata0: [],
      gridColumns: [
        {
          text: this.$t('MSG_TXT_DEPT_NM'),
          datafield: 'departmentName',
        },
        {
          text: this.$t('MSG_TXT_DEPT'),
          datafield: 'departmentId',
          hidden: true,
        },
      ],
    };
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  datasets: [{
    id: 'dsDeptSelPop',
    type: 'local',
    data: 'localdata0',
    datafields: [
      { name: 'departmentName', type: 'string', map: 'departmentName' },
      { name: 'departmentId', type: 'string', map: 'departmentId' },
    ],
  }],
  mounted() {
  },
  methods: {
    // 내부 함수 기술
    // 이벤트 핸들러 기술, prefix on 적용
    onDatasetSelectionChanged(selections) {
      console.log(selections);
    },
    onClick() {},
    onRowdoubleclick() {
      const selectedData = this.dsDeptSelPop.getSelectedRows();
      if (selectedData.length > 0) {
        console.log(selectedData[0].departmentName, selectedData[0].departmentId);
        this.deptInfo.departmentName = selectedData[0].departmentName;
        this.deptInfo.departmentId = selectedData[0].departmentId;
        this.$emit('selected', this.deptInfo);
        // this.closePagePopup('');
      }
    },
    onCancelClick() {
      this.$emit('close');
    },
  },
};
</script>
<style scoped>
</style>
