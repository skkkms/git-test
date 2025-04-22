<template>
  <sui-page>
    <!-- Page Header -->
    <sui-page-header :pageId="this.$options.name" />
    <!-- Page Contents -->
    <sui-page-contents>
      <!-- Contents - Search Bar -->
      <div class="comm_title_wrap">
        <h4>{{ $t("MSG_TXT_STD_FORM_NM") }} : {{ documentName }}  ({{ pageInitialData.standardFormId }})</h4>
      </div>
      <sui-s-grid
        ref="grid"
        :headers="gridColumns0"
        :data-source="dsStandardForm"
        :options="options"
        :showRowsPerPageControl="false"
        :initialRowsPerPage="10"
      />
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onClickClose"
        >
          {{ $t("MSG_BTN_CLOSE") }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
// eslint-disable-next-line import/no-unresolved
import { urDataSet } from 'uidev-component/index';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMD_00008', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    closePagePopup: {
      type: Function,
      default() {
        return null;
      },
    },
    pageInitialData: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      selectedCodeValue: {
        COD_MDLE: {
          label: '',
          key: '',
        },
      },
      documentName: '',
      localdata0: [],
      // eslint-disable-next-line new-cap
      dsStandardForm: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        resizableColumn: true,
      },
    };
  },
  created() {
    this.gridColumns0 = [
      {
        text: this.$t('MSG_TXT_LANG_DIV'),
        value: 'langId',
        width: '100px',
        rowspan: this.rowSpan,
        cellClassName: 'line_R',
      }, {
        text: this.$t('MSG_TXT_FILE_NM'),
        value: 'fileName',
        width: '400px',
        align: 'left',
        component: {
          props: ['row', 'value'],
          template:
            `<sui-file-dn-button
                :pageId="'PGE_CMD_00008'"
                :fileName="this.row.fileName"
                :fileSize="this.row.fileSize"
                :type="this.row.fileExtensionName"
                :realityFilePath="this.row.realityFilePath"
              />`,
        },
      }, {
        text: this.$t('MSG_TXT_NOTE'),
        value: 'attachItemContent',
      }];
  },
  mounted() {
    this.$nextTick(() => {
      this.selectDataFormInput();
    });
  },
  methods: {
    onClickClose() {
      this.closePagePopup('');
    },
    selectDataFormInput() {
      http.request(this.$options.name, 'DTS_CMD_00005', {
        path: {
          'standard-form-id': this.pageInitialData.standardFormId,
        },
      }).then(res => {
        this.dsStandardForm.setData(res.data); // 데이터 셋에 데이터를 넣는 함수
        this.documentName = res.data[0].documentName; // 데이터 셋에 데이터를 넣는 함수
      });
    },
    rowSpan(row, col, value) {
      const topLangId = row > 0 ? this.dsStandardForm.data[row - 1].langId : '';

      if (!utils.isEqual(topLangId, value)) {
        return this.dsStandardForm.data[row].count;
      }
      return 1;
    },
  },
};
</script>
<style scoped>
</style>
