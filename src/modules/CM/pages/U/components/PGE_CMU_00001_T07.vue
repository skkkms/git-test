<template>
  <div>
    <div class="mrB20" />
    <sui-s-grid
      ref="grid1"
      :headers="gridColumns0"
      :data-source="ds0"
      :initialRowsPerPage="5"
      :showRowsPerPageControl="false"
      :options="options"
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
import { urDataSet } from 'uidev-component/index.js';
import BasePage from '~cm/components/BasePage';
export default {
  name: 'PGE_CMU_00001_T07', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: '',
    },
    selectedPageId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      localdata0: [],
      ds0: new urDataSet(),
      options: {
      infinityScroll: true,
      noBaseInfo: false,
      internalPaging: false,
      },
    };
  },
  created() {
  this.localdata0 = [];
  this.gridColumns0 = [
      {
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
      }, {
        text: this.$t('MSG_TXT_PRMSN_LVL'),
        value: 'permissionText',
        width: 350,
      }
    ];
      this.permissionList = [{
        key: 32,
        label: this.$t('MSG_TXT_PRNT'),
      }, {
        key: 16,
        label: this.$t('MSG_TXT_FILE_DOWNLOAD'),
      }, {
        key: 8,
        label: this.$t('MSG_TXT_DEL'),
      }, {
        key: 4,
        label: this.$t('MSG_TXT_MOD'),
      }, {
        key: 2,
        label: this.$t('MSG_TXT_WRITE'),
      }, {
        key: 1,
        label: this.$t('MSG_TXT_READ'),
      },
   ];
  },
  computed: {},
  watch: {
    selectedPageId(data) {
      if (utils.isEmpty(data)) {
        this.tabGridClear();
      } else {
        this.rolePageListLoad();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (!utils.isEmpty(this.selectedPageId)) {
        this.rolePageListLoad();
      }
    });
  },

  methods: {
    rolePageListLoad() {
      http.request(this.pageId, 'DTS_CMA_00040', {
        query: {
          roleObjectId: this.selectedPageId,
          roleObjectTypeCode: 'P',
        },
      }).then(res => {
        utils.forEach(res.data, data => {
          const { roleName, roleNickName } = data.roleInfo;
          utils.assign(data, {
            roleName,
            roleNickName,
            permissionText: this.getPermissionText(data.permissionLevel),
          });
        });
        this.ds0.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    getPermissionText(level) {
      const textList = [];
      let tempLevel = level;
      utils.forEach(this.permissionList, data => {
        if (tempLevel >= data.key) {
          tempLevel -= data.key;
          textList.push(data.label);
        }
      });
      return textList.length > 0 ? utils.join(utils.reverse(textList), ', ') : '-';
    },
    tabGridClear() {
      this.ds0.setData([]);
    },
    onModClick() {
      if (utils.isEmpty(this.selectedPageId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE')));
      } else {
        utils.openLayerPopup('PGE_CMU_00014', this.onPopupClose, {
          pageInitialData: {
            selectedPageId: this.selectedPageId,
          },
          size: 'xlg',
        });
      }
    },
    onPopupClose(saved) {
      if (saved) {
        this.rolePageListLoad();
      }
    },
  },
};
</script>
<style scoped>
</style>
