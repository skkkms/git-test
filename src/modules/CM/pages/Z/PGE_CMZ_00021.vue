<template>
  <sui-page>
    <!-- Page Header -->
    <sui-page-header :pageId="this.$options.name" />

    <!-- Page Contents -->
    <sui-page-contents>
      <sui-grid
        ref="grdCodeList"
        :dataset="'dataset0'"
        :columns="gridColumns0"
        :multiselect="multiselect"
        :showDisplayCountControl="false"
      />
    </sui-page-contents>

    <!-- Page Footer -->
    <sui-page-footer>
      <div class="comm_btn_wrap mrR30">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onCancel"
        >
          {{ this.$t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onSelect"
        >
          {{ this.$t('MSG_BTN_APPLY') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMZ_00021', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    closePagePopup: {
      type: Function,
      default: () => {},
    },
    // 필수값 codeId
    pageInitialData: {
      type: Object,
      required: true,
      validator(obj) {
        const has = Object.prototype.hasOwnProperty;
        return has.call(obj, 'codeId');
      },
    },
  },
  data() {
    return {
      title: this.$t('MSG_TIT_CD_SELT'),
      multiselect: false,
      localdata0: [],
      gridColumns0: [{
        text: 'No.',
        datafield: 'dataset-row-id',
        width: '60px',
      }, {
        text: this.$t('MSG_TXT_CODE_NAME'),
        datafield: 'codeName',
      }, {
        text: this.$t('MSG_TXT_CODE_VALID_VAL'),
        datafield: 'codeValidityValue',
      }],
    };
  },
  computed: {},
  watch: {},
  datasets: [{
    id: 'dataset0',
    type: 'local',
    data: 'localdata0',
    datafields: [{
      name: 'dataset-row-id',
      type: 'string',
      map: 'dataset-row-id',
    }, {
      name: 'codeId',
      type: 'string',
      map: 'codeId',
    }, {
      name: 'codeName',
      type: 'string',
      map: 'codeName',
    }, {
      name: 'codeValidityValue',
      type: 'string',
      map: 'codeValidityValue',
    }],
  }],
  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      if (this.initValidate() === false) {
        return false;
      }

      if (this.pageInitialData.multiSelectYn === 'Y') {
        this.multiselect = true;
      } else {
        this.multiselect = false;
      }

      this.search(this.pageInitialData.codeId);
      return true;
    },
    /** ***************************************************************************
      이벤트 영역
      ***************************************************************************** */
    // 적용
    onSelect() {
      this.selectedCodeDetail();
    },
    // 취소
    onCancel() {
      this.cancel();
    },
    /** ***************************************************************************
      함수 영역 : 사용자 정의 함수
      ***************************************************************************** */
    initValidate() {
      if (this.pageInitialData == null) {
        const msgType = 'error';
        const msgText = utils.strFormat(this.$t('MSG_ALT_CHK_CONFIRM'), this.$t('MSG_TXT_CODE_ID'));
        const subMsg = null;
        const positiveHandler = this.cancel;
        const negativeHandler = null;

        utils.messageBox(msgType, msgText, subMsg, positiveHandler, negativeHandler);
        return false;
      }

      const has = Object.prototype.hasOwnProperty;
      if (has.call(this.pageInitialData, 'codeId') === false) {
        const msgType = 'error';
        const msgText = utils.strFormat(this.$t('MSG_ALT_CHK_CONFIRM'), this.$t('MSG_TXT_CODE_ID'));
        const subMsg = null;
        const positiveHandler = this.cancel;
        const negativeHandler = null;

        utils.messageBox(msgType, msgText, subMsg, positiveHandler, negativeHandler);
        return false;
      }

      // if (has.call(this.pageInitialData, 'multiSelectYn') == false) {
      //   utils.assign(this.pageInitialData, { multiSelectYn: 'N' });
      // }

      return true;
    },
    positiveHandler() {
      console.log('positive');
    },
    negativeHandler() {
      console.log('negative');
    },
    search(sCodeId) {
      this.searchCodeMaster(sCodeId);
      this.searchCodeDetail(sCodeId);
    },
    // 코드 마스터 조회
    searchCodeMaster(sCodeId) {
      http.request(this.$options.name, 'DTS_CMZ_00012', {
        path: {
          'code-id': sCodeId,
        },
      }).then(res => {
        this.title = `${this.$t('MSG_TIT_CD_SELT')}(${res.data.codeName})`;
        console.log(res);
      }).catch(error => {
        console.log(error);
      });
    },
    // 코드 상세 조회
    searchCodeDetail(sCodeId) {
      http.request(this.$options.name, 'DTS_CMZ_00003', {
        query: {
          codeId: sCodeId,
        },
      }).then(res => {
        this.dataset0.setRawData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },

    // 적용(코드 선택)
    selectedCodeDetail() {
      const selectedRawsData = this.dataset0.getSelectedRawData();
      if (selectedRawsData.length <= 0) {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'), null, this.positiveHandler);
        return false;
      }
      this.closePagePopup(selectedRawsData);
      return true;
    },
    // 취소
    cancel() {
      this.closePagePopup('');
    },
  },
};
</script>
<style scoped>
</style>
