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
      :headers="columnUserGroup"
      :data-source="dsUserGroup"
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
  name: 'PGE_CMA_00001_T02', // eslint-disable-line vue/name-property-casing
  pname: 'PGE_CMA_00001', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: null,
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
      dsUserGroup: new urDataSet(), // eslint-disable-line new-cap
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
    };
  },
  watch: {
    selectedGridRowData(selectObj) {
      if (!utils.isEmpty(selectObj)) {
        this.selectDataFormInput(selectObj);
      } else {
        this.initData();
      }
    },
    isDataNull(flag) {
      if (flag) {
        this.initData();
      }
    },
  },
  created() {
    this.columnUserGroup = [
      {
        value: 'portalId',
        text: this.$t('MSG_TXT_PORTL_ID'),
      },      
      {
        value: 'userGroupId',
        text: this.$t('MSG_TXT_USER_GRP_ID'),
      },
      {
        value: 'userGroupName',
        text: this.$t('MSG_TXT_USER_GRP_NAME'),
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
      const grpData = [];
      this.dsUserGroup.setData(grpData);
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
      this.$emit('onCallUserPopup', sendData);
    },
    selectDataFormInput(obj) {
      this.roleId = obj.roleId;
      this.roleName = obj.roleName;

      http.request(this.pageId, 'DTS_CMA_00007', {
        path: {
          'role-id': this.roleId,
        },
      }).then(res => {
        if (res.data) {
          this.dsUserGroup.setData(res.data);
        }
      }).catch(error => {
        console.log(error);
      });
    },
  },
};
</script>
<style scoped>
</style>
