<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_USR')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-7">
            <cmp-user-select
              ref="userSelect"
              :selectedUser="selectedUser"
              :readonly="false"
              :checkboxMode="false"
              @selected="onSelectedUser"
            />
          </div>
          <div class="btn_wrap">
            <sui-button
              type="button"
              class="comm_btn_Reset"
              @click="onReset"
            >
              {{ $t('MSG_BTN_RESET') }}
            </sui-button>
            <sui-button
              type="button"
              class="comm_btn_Scr"
              @click="onSearch"
            >
              {{ $t('MSG_BTN_SEARCH') }}
            </sui-button>
          </div>
        </div>
      </div>
      <div class="mrT30" />
      <!-- <sui-tree-grid
        ref="grdAppMenu"
        :columns="treeGridColumns"
        :autoheight="true"
        :dataset="'dsTreeData'"
        :selectionMode="'singleRow'"
        :height="215"
      /> -->
       <ur-tree-grid
        ref="grdAppMenu"
        :headers="treeGridColumns"
        :autoheight="true"
        :options="options"
        :height="215"
      />
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button" 
          class="comm_btn_solid"
          @click="onCloseClick"
        >
          {{ $t("MSG_BTN_CLOSE") }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>

<script>
export default {
  name: 'PGE_CMA_00016', // eslint-disable-line vue/name-property-casing
  props: {
    closePagePopup: {
      type: Function,
      default() {
        return null;
      },
    },
    pageInitialData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      treeGridData: [],
      treeGridColumns: [
        { text: this.$t('MSG_TXT_MENU'), value: 'value' },
      ],
      selectedUser: { userName: '', epId: '' },
    };
  },
  computed: {},
  watch: {},
  mounted() {
    const userId = utils.getParameter(this, 'userId');
    if (userId) {
      this.selectedUser.epId = userId;
      this.getUserInfo(userId);
      this.onSearch();
    }

  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getUserInfo(userId) {
      http.request(this.$options.name, 'DTS_CMZ_00148', {
        query: { 'userId' : userId },
      }).then(res => {
        if (res.data) {
          const langId = this.$store.getters.userInfo.langId;
          const user = {
            userId: userId,
            userName: langId === 'ko' ? res.data.userName : res.data.userGlobalName,
            userGlobalName: res.data.userGlobalName,
            epId: res.data.epid,
            knoxId: res.data.knoxId,
            departmentId: res.data.departmentId,
            departmentName: langId === 'ko' ? res.data.departmentName : res.data.departmentEnglishName,
            departmentEnglishName: res.data.departmentEnglishName,
            dsplLngId: res.data.dsplLngId,
          };
          this.$refs.userSelect.setValue(user);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    onCloseClick() {
      this.closePagePopup('');
    },
    onSelectedUser(selectedData) {
      if (selectedData != null) {
        this.selectedUser.userName = selectedData.userName;
        this.selectedUser.epId = selectedData.epId;
      }
      else {
        this.selectedUser.userName = '';
        this.selectedUser.epId = '';
      }
    },
    onReset() {
      this.$refs.userSelect.reset();
    },
    onSearch() {
      if (utils.isEmpty(this.selectedUser.epId)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_VAL'), this.$t('MSG_TXT_USR'));
        utils.messageBox('error', msg);
        return;
      }
      http.request(this.$options.name, 'DTS_CMA_00058', {
        path: { 'user-id' : this.selectedUser.epId },
      }).then(res => {
        const treeData = [];
        utils.forEach(res.data, item => {
          treeData.push({
            id: item.menuId,
            parentId: item.parentId,
            level: item.menuLevel,
            value: item.menuName,
          });
        });
        // this.dsTreeData.setRawData(treeData);
        this.$refs.grdAppMenu.setData(treeData, { dataType: 'json', id: 'id', parentField: 'parentId' });
      }).catch(error => {
        console.log(error);
      });
    },
  },
  datasets: [
    // TreeGrid 데이타셋1
    {
      id: 'dsTreeData',
      componentType: 'tree-grid',
      data: 'treeGridData',
      hierarchy: {
        keyDataField: {
          name: 'id',
        },
        parentDataField: {
          name: 'parentId',
        },
      },
      datafields: [
        { name: 'id', type: 'string', map: 'id' },
        { name: 'parentId', type: 'string', map: 'parentId' },
        { name: 'level', type: 'string', map: 'level' },
        { name: 'value', type: 'string', map: 'value' },
        { name: 'dataset-row-id', type: 'string', map: 'dataset-row-id' },
      ],
    },
  ],
};
</script>

<style scoped>
</style>
