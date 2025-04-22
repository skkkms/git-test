<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TAB_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model="frame1.searchFrame.tableSearchText"
              @keyup.enter="onClickSearch"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset "
            @click="onClickReset"
          >
            {{ $t("MSG_BTN_RESET") }}
          </sui-button>
          <sui-button
            type="button"
            class="comm_btn_Scr"
            @click="onClickSearch"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </sui-button>
        </div>
      </div>
      <div class="mrB10" />
      <sui-s-grid
        ref="grid"
        :headers="gridColumns2"
        :data-source="dsTableColumn"
        :options="options0"
        :showRowsPerPageControl="false"
      />
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onClickClose"
      >
        {{ $t('MSG_BTN_CANCEL') }}
      </sui-button>
      <sui-button
        type="button"
        class="comm_btn_solid"
        @click="onClickSelect"
      >
        {{ $t('MSG_TXT_SEL') }}
      </sui-button>
    </div>
  </div>
</template>

<script>
import { urDataSet } from 'uidev-component/index';
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMU_00016_P01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: null,
    },
    objectId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      frame1: {
        searchFrame: {
          tableSearchText: '',
        },
        objectColumnUid: '',
        objectId: this.objectId,
        tablePhysicalName: '',
        columnName: '',
        columnTypeCode: '',
        columnSizeValue: '',
        inputSizeValue: '0',
        primaryKeyYn: 'N',
        notNullYn: 'N',
        searchItemYn: 'N',
        codeId: '',
        objectColumnMultilanguageId: '',
        messageResourceValue: '',
      },
      gridColumns2: [],
      dsTableColumn: new urDataSet(),
      options0: {
        selectCheck: true,
        selectCheckOnly: true,
        multiSelect: true,
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.gridColumns2 = [{
      text: this.$t('MSG_TXT_TAB_NM'),
      value: 'tablePhysicalName',
    }, {
      text: this.$t('MSG_TXT_COL_NM'),
      value: 'columnName',
    }, {
      text: this.$t('MSG_TXT_MSG_RESO_VAL'),
      value: 'messageResourceValue',
    }, {
      text: this.$t('MSG_TXT_MSG_RESO_DEF_VAL'),
      value: 'defaultMessageResourceValue',
    }];
    this.localData2 = [];
  },
  mounted() {},

  methods: {
    onClickReset() {
      this.frame1.searchFrame.tableSearchText = '';
    },
    onClickSearch() {
      if (utils.isEmpty(utils.trim(this.frame1.searchFrame.tableSearchText))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_TAB_NM')));
        return false;
      }

      http.request(this.contextPageId, 'DTS_CMU_00076', {
        path: {
          'table-name': this.frame1.searchFrame.tableSearchText,
        },
      }).then(res => {
        if (utils.isEmpty(res.data)) {
          utils.messageBox('warning', this.$t('MSG_ALT_NO_INFO_SRCH'));
        }
        this.dsTableColumn.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
      return true;
    },
    onClickSelect() {
      const selectedData = this.dsTableColumn.getSelected();
      if (selectedData.length !== 0) {
        this.$emit('paramReturn', selectedData, 'tableColumnList');
        this.$emit('closePopup');
      } else {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    onClickClose() {
      this.$emit('closePopup');
    },
  },
};
</script>
<style scoped>
</style>
