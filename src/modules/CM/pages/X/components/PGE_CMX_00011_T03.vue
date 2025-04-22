<template>
  <div>
    <div class="mrB20" />
    <sui-s-grid
      ref="grid2"
      :headers="gridColumns2"
      :data-source="mobileAppCategoryRoleList"
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
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMX_00011_T03', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: '',
    },
    selectedGridRowData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      mobileAppCategoryRoleList: new urDataSet(),
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
      text: this.$t('MSG_TXT_ROLE_CATG'),
      value: 'roleCategoryName',
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
          roleObjectId: this.selectedGridRowData.mobileApplicationCategoryId,
          roleObjectTypeCode: this.roleObjectTypeCode,
        },
      }).then(res => {
        utils.forEach(res.data, item => {
          const { roleName } = item.roleInfo;
          utils.assign(item, {
            roleName,
          });
        });
        this.mobileAppCategoryRoleList.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    tabGridClear() {
      this.mobileAppCategoryRoleList.setData([]);
    },
    onModClick() {
      if (utils.isEmpty(this.selectedGridRowData)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else {
        utils.openLayerPopup('PGE_CMU_00015', this.onPopupClose, {
          pageInitialData: {
            roleObjectId: this.selectedGridRowData.mobileApplicationCategoryId,
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
