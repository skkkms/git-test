<template>
  <div>
    <div class="mrB20" />
    <sui-s-grid
        ref="grid2"
        :headers="gridColumns2"
        :data-source="mobilePortalRoleList"
        :multiselect="false"
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
// eslint-disable-next-line import/extensions
import { urDataSet } from 'uidev-component/index.js';
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMX_00010_T02', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
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
      mobilePortalRoleList: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      roleObjectTypeCode: 'X', // Mobile
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
      value: 'roleCategoryName',
      text: this.$t('MSG_TXT_ROLE_CATG'),
      width: 350,
    }, {
      text: this.$t('MSG_TXT_ROLE_ID'),
      value: 'roleId',
      width: 150,
    }, {
      text: this.$t('MSG_TXT_ROLE_NAME'),
      value: 'roleName',
    }];
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
      http.request(this.contextPageId, 'DTS_CMA_00040', {
        query: {
          roleObjectId: this.selectedGridRowData.versionId,
          roleObjectTypeCode: this.roleObjectTypeCode,
        },
      }).then(res => {
        console.log('res:');
        console.log(res);
        console.log('res.data:');
        console.log(res.data);
        
        utils.forEach(res.data, item => {
          const { roleName } = item.roleInfo;
          utils.assign(item, {
            roleName,
          });
        });
        this.mobilePortalRoleList.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    tabGridClear() {
      this.mobilePortalRoleList.setData([]);
    },
    onModClick() {
      if (utils.isEmpty(this.selectedGridRowData)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else {
        utils.openLayerPopup('PGE_CMU_00015', this.onPopupClose, {
          pageInitialData: {
            roleObjectId: this.selectedGridRowData.versionId,
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
