<template>
  <div>
    <div class="mrB25" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_USER_GRP_ID')"
          />
        </div>
        <div class="col-xs-4">
          <sui-label
            :label="userGroupId"
            class="comm_label"
          />
        </div>
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_USER_GRP_NAME')"
          />
        </div>
        <div class="col-xs-4">
          <sui-label
            :label="userGroupName"
            class="comm_label"
          />
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="grdList"
        :headers="gridColumns"
        :data-source="dsRoleData"
        :options="options"
        :showRowsPerPageControl="false"
      />
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:update="'PGE_CMA_00003'"
          type="button"
          class="comm_btn_solid"
          @click="onClickPopupCall"
        >
          {{ $t('MSG_BTN_MDFC') }}
        </sui-button>
      </div>
    </div>
  </div>
</template>
<script>
import {urDataSet} from 'uidev-component/index.js';
export default {
  name: 'PGE_CMA_00003_T03', // eslint-disable-line vue/name-property-casing
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
      localdata: [],
      dsRoleData: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      userGroupId: '',
      userGroupName: '',
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
        text: this.$t('MSG_TXT_ROLE_ID'),
        value: 'roleId',
        width: 150,
      }, {
        text: this.$t('MSG_TXT_ROLE_NAME'),
        value: 'roleName',
      },
    ];
  },
  mounted() {
    if (this.$props.selectedGridRowData && this.$props.selectedGridRowData.userGroupId) {
      this.$nextTick(() => {
        this.selectDataFormInput(this.$props.selectedGridRowData);
      });
    }
    // this.selectedGridRowData = this.$parent.$parent.$parent.$parent.dsData.getSelectedRow();
  },

  methods: {
    initData() {
      this.userGroupId = '';
      this.userGroupName = '';
      const grpData = [];
      this.dsRoleData.setData(grpData);
    },
    selectDataFormInput(obj) {
      this.userGroupId = obj.userGroupId;
      this.userGroupName = obj.userGroupName;

      http.request(this.pageId, 'DTS_CMA_00011', {
        path: {
          'user-group-id': this.userGroupId,
        },
      }).then(res => {
        if (res.data) {
          this.dsRoleData.setData(res.data);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
    onClose() {
      console.log('onClose');
    },
    onClickPopupCall() {
      if (this.selectedGridRowData.userGroupId) {
        this.$emit('onPopupCall', 'isShownPopupRole');
      } else {
        // this.conFirm('error', this.$t('MSG_ALT_NOT_SEL_ITEM'), null);
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
  },
};
</script>
<style scoped>
</style>
