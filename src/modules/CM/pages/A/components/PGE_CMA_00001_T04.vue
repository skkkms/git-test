<template>
  <div>
    <div class="mrB25" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_ROLE_ID')"
          />
        </div>
        <div class="col-xs-5">
          <sui-label
            :label="roleId"
            class="comm_label"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_ROLE_NAME')"
          />
        </div>
        <div class="col-xs-5">
          <sui-label
            :label="roleName"
            class="comm_label"
          />
        </div>
      </div>
    </div>
    <div class="mrB30" />
    <sui-s-grid
      ref="grdList"
      :headers="gridColumns"
      :data-source="dsData"
      :options="options"
      :showRowsPerPageControl="false"
    />
    <div class="comm_btn_wrap">
      <sui-button
        v-permission:update="'PGE_CMA_00001'"
        type="button"
        class="comm_btn_solid"
        @click="onModify"
      >
        {{ $t('MSG_BTN_MDFC') }}
      </sui-button>
    </div>
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index.js'; // eslint-disable-line import/extensions
import BasePage from '~cm/components/BasePage'; // eslint-disable-line import/no-unresolved

export default {
  name: 'PGE_CMA_00001_T04', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: 'PGE_CMA_00001',
    },
    selectedGridRowData: {
      type: Object,
      required: true,
    },
    isDataNull: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      roleId: '',
      roleName: '',
      localdata: [],
      dsData: new urDataSet(), // eslint-disable-line new-cap
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
    };
  },
  computed: {},
  watch: {
    selectedGridRowData(selectObj) {
      if (selectObj) {
        this.selectDataFormInput(selectObj);
      }
    },
    isDataNull(flag) {
      if (flag) {
        this.initData();
      }
    },
  },
  created() {
    this.gridColumns = [
      {
        text: this.$t('MSG_TXT_DTSVC_ID'),
        value: 'roleObjectId',
        width: 150,
      }, {
        text: this.$t('MSG_TXT_DTSVC_NM'),
        value: 'roleObjectName',
      }, {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
        width: 100,
      },
    ];
  },
  mounted() {
    if (this.$props.selectedGridRowData && this.$props.selectedGridRowData.roleId) {
      this.$nextTick(() => {
        this.selectDataFormInput(this.$props.selectedGridRowData);
      });
    }
  },

  methods: {
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
    initData() {
      this.roleId = '';
      this.roleName = '';
      this.dsData.setData([]);
    },
    onClose() {
      console.log('onClose');
    },
    onModify() {
      if (utils.isEmpty(this.roleId) === true) {
        // this.conFirm('Error', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), 'Role'), null);
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return;
      }

      const sendData = [];
      sendData.push({ roleId: this.roleId });
      // sendData.push({ data: utils.clone(this.dsData.data) });
      this.$emit('onCallDtsvcPopup', sendData);
    },
    selectDataFormInput(obj) {
      this.roleId = obj.roleId;
      this.roleName = obj.roleName;

      http.request(this.pageId, 'DTS_CMA_00042', {
        path: {
          'role-id': this.roleId,
        },
      }).then(res => {
        if (res.data) {
          this.dsData.setData(res.data);
        }
      });
    },
  },
};
</script>

  <style scoped>
  </style>
