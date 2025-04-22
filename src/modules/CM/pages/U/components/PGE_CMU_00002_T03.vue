<template>
  <div>
    <div class="mrB20" />
    <sui-s-grid
      ref="grid2"
      :headers="gridColumns2"
      :data-source="ds0"
      :showRowsPerPageControl="false"
      @grid:row-click="handleClick"
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
import { urDataSet } from 'uidev-component/index';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMU_00002_T03', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: '',
    },
    dataServiceIdentification: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      localdata2: [],
      ds0: new urDataSet(),
      gridColumns2: [{
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
      }, {
        text: this.$t('MSG_TXT_ROLE_ALIAS'),
        value: 'roleNickName',
        width: 200,
      }],
    };
  },
  computed: {},
  watch: {
    dataServiceIdentification(data) {
      if (utils.isEmpty(data)) {
        this.tabGridClear();
      } else {
        this.roleDataServiceListLoad();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (!utils.isEmpty(this.dataServiceIdentification)) {
        this.roleDataServiceListLoad();
      }
    });
  },

  methods: {
    roleDataServiceListLoad() {
      http.request(this.pageId, 'DTS_CMA_00040', {
        query: {
          roleObjectId: this.dataServiceIdentification,
          roleObjectTypeCode: 'D',
        },
      }).then(res => {
        utils.forEach(res.data, data => {
          const { roleName, roleNickName } = data.roleInfo;
          utils.assign(data, {
            roleName,
            roleNickName,
          });
        });
        this.ds0.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    tabGridClear() {
      this.ds0.setData([]);
    },
    onModClick() {
      if (utils.isEmpty(this.dataServiceIdentification)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else {
        utils.openLayerPopup('PGE_CMU_00015', this.onPopupClose, {
          pageInitialData: {
            roleObjectId: this.dataServiceIdentification,
            roleObjectTypeCode: 'D',
          },
          size: 'xlg',
        });
      }
    },
    onPopupClose(saved) {
      if (saved) {
        this.roleDataServiceListLoad();
      }
    },
    handleClick(data) {
      if (this.ds0.getSelected().length === 0) {
        this.ds0.setSelect(data, false);
      }
    },
  },
};
</script>
<style scoped>
</style>
