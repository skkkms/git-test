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
        :data-source="dsUserData"
        :options="options"
        :showRowsPerPageControl="false"
        @grid:scroll-bottom="onAddList"
      >
        <template #right-info>
          <sui-button
            class="comm_btn_gridTop comm_ico_excel"
            @click="onExcelDowonLoad"
          >
            {{ $t('MSG_BTN_EXCEL_DOWN') }}
          </sui-button>
        </template>
      </sui-s-grid>
      <div class="btn_moreView">
        <p>
          {{ showMoreCount }}
        </p>
      </div>
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

    <sui-popup
      v-model="isShownPopup"
      :title="$t('MSG_TXT_MSG_RESO_BK_RGST')"
    >
      <p01
        :pageId="pageId"
        :userGroupId="userGroupId"
        @onClickCancel="onClickCancel"
      />
    </sui-popup>
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index.js'; // eslint-disable-line import/extensions
import p01 from './PGE_CMA_00003_P01';

export default {
  name: 'PGE_CMA_00003_T02', // eslint-disable-line vue/name-property-casing
  components: { p01 },
  props: {
    pageId: {
      type: String,
      default: null,
      required: true,
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
      isPageing: false,
      pageing: {
        pagePerCount: 5000,
        currentPage: 1,
        totalCount: 0,
        count: 0,
      },
      localdata: [],
      dsUserData: new urDataSet(), // eslint-disable-line new-cap
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      userGroupId: '',
      userGroupName: '',
      isShownPopup: false,
    };
  },
  computed: {
    showMoreCount() {
      return `${ utils.numberFormat(this.pageing.count)} / ${utils.numberFormat(this.pageing.totalCount)}`;
    },
  },
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
      // {
      //   text: this.$t('MSG_TXT_KNOX_ID'),
      //   value: 'knoxId',
      // },
      {
        text: this.$t('MSG_TXT_LOGIN_ID'),
        value: 'loginId',
      },
      {
        text: this.$t('MSG_TXT_EMPL_NM'),
        value: 'userName',
        width: 150,
      },
      {
        text: this.$t('MSG_TXT_DEPT_NM'),
        value: 'deptName',
        width: 250,
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
      this.dsUserData.setData(grpData);
    },
    selectDataFormInput(obj) {
      this.userGroupId = obj.userGroupId;
      this.userGroupName = obj.userGroupName;

      this.pageing.currentPage = 1;
      this.pageing.totalCount = 0;
      this.pageing.count = 0;

      this.dsUserData.setData([]);
      this.selectUserGroupUser();
    },
    selectUserGroupUser() {
      http.request(this.pageId, 'DTS_CMA_00010', {
        path: {
          'user-group-id': this.userGroupId,
        },
        query: {
          currentPage: this.pageing.currentPage,
        },
      }).then(res => {
        if (utils.isUndefined(res.data) === false && res.data.length === this.pageing.pagePerCount) {
          this.isPageing = true;
        } else {
          this.isPageing = false;
        }
        if (res.data) {
          const items = [];
          utils.forEach(res.data, item => {
            const { userName } = item;
            items.push({
              knoxId: item.knoxId,
              loginId: item.loginId,
              deptName: item.deptName,
              userName,
            });
          });
          this.dsUserData.appendData(items);
          this.pageing.count = this.dsUserData.data.length;
          if (res.data.length > 0) {
            this.pageing.totalCount = res.data[0].totalCount;
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    onClickCancel() {
      this.isShownPopup = false;
    },
    onClickPopupCall() {
      if (this.selectedGridRowData.userGroupId) {
        if (this.selectedGridRowData.bsicAuthYn !== 'Y') {
          this.$emit('onPopupCall', 'isShownPopupUser');
        } else {
          utils.messageBox('warning', this.$t('MSG_ALT_CANNOT_ADD_USER'));
        }
      } else {
        // this.conFirm('error', this.$t('MSG_ALT_NOT_SEL_ITEM'), null);
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    onClose() {
      console.log('onClose');
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
    onExcelDowonLoad() {
      // utils.downloadDataToExcel(this.$options.name, this.gridColumns, this.dsUserData.data, 'usergroup-user.xlsx');
      utils.downloadGridToExcel(this.contextPageId, this.gridColumns, this.dsUserData, 'usergroup-user.xlsx');
    },
    onAddList() {
      if (this.isPageing) {
        this.pageing.currentPage += 1;
        this.selectUserGroupUser();
      }
    },
  },

};
</script>
<style scoped>
</style>
