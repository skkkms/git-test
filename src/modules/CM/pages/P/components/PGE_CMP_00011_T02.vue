<template>
  <div>
    <div class="mrB20" />
    <sui-s-grid
      ref="grid2"
      :headers="gridColumns2"
      :data-source="dsAppRoleList"
      :multiselect="false"
      :showDisplayCountControl="false"
      :showRowsPerPageControl="false"
    />
    <div class="comm_btn_wrap">
      <sui-button
          v-permission:update="pageId"
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
// eslint-disable-next-line import/extensions
import { urDataSet } from 'uidev-component/index.js';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMP_00011_T02', // eslint-disable-line vue/name-property-casing
  props: {
    pageId: {
      type: String,
      default: '',
    },
    // dataServiceIdentification: {
    //   type: String,
    //   default: '',
    // },
    selectedGridRowData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dsAppRoleList: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      roleObjectTypeCode: 'A', // Application
    };
  },
  computed: {},
  watch: {
    selectedGridRowData(dataObj) {
      if (utils.isEmpty(dataObj)) {
        this.tabGridClear();
      } else {
        this.roleListLoad();
      }
    },
  },
  created() {
    this.gridColumns2 = [{
      text: this.$t('MSG_TXT_ROLE_ID'),
      value: 'roleId',
      width: 150,
    }, {
      text: this.$t('MSG_TXT_ROLE_NAME'),
      value: 'roleName',
    }, {
      text: this.$t('MSG_TXT_ROLE_ALIAS'),
      value: 'roleNickName',
      width: 350,
    }, {
        text: this.$t('MSG_TXT_ROLE_CATG'),
        value: 'roleCategoryName',
    },
    ];
  },
  mounted() {
    this.$nextTick(() => {
      if (!utils.isEmpty(this.selectedGridRowData)) {
        this.roleListLoad();
      }
    });
  },

  methods: {
    roleListLoad() {
      http.request(this.pageId, 'DTS_CMA_00040', {
        query: {
          roleObjectId: this.selectedGridRowData.applicationId,
          roleObjectTypeCode: this.roleObjectTypeCode,
        },
      }).then(res => {
        utils.forEach(res.data, item => {
          const { roleName, roleNickName } = item.roleInfo;
          utils.assign(item, {
            roleName,
            roleNickName,          
          });
        });
        this.dsAppRoleList.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    tabGridClear() {
      this.dsAppRoleList.setData([]);
    },
    onModClick() {
      if (utils.isEmpty(this.selectedGridRowData)) {
        // utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_APPLICATION')));
        // utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        // utils.messageBox('alert', utils.getConfigurationValue('CFG_CMP_SYSTEM_TITLE'), this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else {
        utils.openLayerPopup('PGE_CMU_00015', this.onPopupClose, {
          pageInitialData: {
            roleObjectId: this.selectedGridRowData.applicationId,
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
