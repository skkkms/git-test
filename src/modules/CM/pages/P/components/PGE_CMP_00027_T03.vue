<template>
  <div>
    <div class="mrB20" />
    <sui-s-grid
      ref="gridLinkRole"
      :headers="columnLinkRole"
      :data-source="dsLinkRole"
      :showRowsPerPageControl="false"
    />
    <div class="comm_btn_wrap">
      <sui-button
        v-permission:update="contextPageId"
        type="button"
        class="comm_btn_solid"
        @click="onModClick"
      >
        {{ $t('MSG_BTN_MOD') }}
      </sui-button>
    </div>
  </div>
</template>
<script>
import {urDataSet} from 'uidev-component/index.js';
import BasePage from '~cm/components/BasePage';

const DEFAULT_ROWS_PER_PAGE = 5;
const DEFAULT_ROW_HEIGHT = 55;

/* eslint max-len: ["error", { "code": 200 }] */
export default {
  name: 'PGE_CMP_00027_T03', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    selectedGridRowData: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      dsLinkRole: new urDataSet(),
      roleObjectTypeCode: 'L', // Application
    };
  },
  computed: {},
  watch: {
    selectedGridRowData(selectObj) {
      if (utils.isEmpty(selectObj)) {
        this.tabGridClear();
      } else {
        this.roleListLoad();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.roleListLoad();
    });
  },

  created() {
    this.columnLinkRole = [
      {
        value: 'roleCategoryName',
        text: this.$t('MSG_TXT_ROLE_CATG'),
        width: 350,
      },
      {
        value: 'roleId',
        text: this.$t('MSG_TXT_ROLE_ID'),  
        rules: undefined,
        width: 150,
      },
      {
        value: 'roleName',
        text: this.$t('MSG_TXT_ROLE_NAME'),
        rules: undefined,
      },
    ];
  },
  methods: {
    roleListLoad() {
      if (!utils.isEmpty(this.selectedGridRowData)) {
        http.request(this.contextPageId, 'DTS_CMA_00040', {
          query: {
            roleObjectId: this.selectedGridRowData.linkId,
            roleObjectTypeCode: this.roleObjectTypeCode,
          },
        }).then(res => {
          utils.forEach(res.data, item => {
            const { roleName} = item.roleInfo;
            utils.assign(item, {
              roleName,
            });
          });
          this.dsLinkRole.setData(res.data);
        }).catch(error => {
          console.log(error);
        });
      }
    },
    tabGridClear() {
      //this.$refs.gridLinkRole.gridLinkParam();
      this.dsLinkRole.setData([]);
    },
    onModClick() {
      if (utils.isEmpty(this.selectedGridRowData)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_LINK')));
      } else {
        utils.openLayerPopup('PGE_CMU_00015', this.onPopupClose, {
          pageInitialData: {
            roleObjectId: this.selectedGridRowData.linkId,
            roleObjectTypeCode: this.roleObjectTypeCode,
          },
          size: 'xlg',
        });
      }
    },
    onPopupClose(saved) {
      if (saved) {
        this.roleListLoad();
      }
    },
  },
};
</script>
<style scoped>
</style>
