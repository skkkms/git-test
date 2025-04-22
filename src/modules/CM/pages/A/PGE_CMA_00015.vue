<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_USER_GRP_NAME')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ userGroupName }}
            </div>
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_USR_GRP_CATG')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ userGroupCategoryName }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_EXPL')"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ userGroupContent }}
            </div>
          </div>
          <div class="col-xs-1 nodata" />
          <div class="col-xs-5" />
        </div>
      </div>
      <div class="mrT30" />
      <ur-tree-grid
        ref="grdAppMenu"
        :headers="treeGridColumns"
        :options="options"
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
  name: 'PGE_CMA_00015', // eslint-disable-line vue/name-property-casing
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
      options: {
        height: 215,
        autoheight: true,
      },
      userGroupId: '',
      userGroupName: '',
      userGroupContent: '',
      userGroupCategoryName: '',
      treeGridData: [],
      // TreeGrid 컬럼 정의
      treeGridColumns: [
        { text: this.$t('MSG_TXT_MENU'), value: 'value' },
      ],
    };
  },
  computed: {},
  watch: {},
  // datasets: [],
  mounted() {
    this.userGroupId = utils.getParameter(this, 'userGroupId');
    this.$nextTick(() => {
      if (this.userGroupId) {
        this.getUserGroupInfo();
        this.searchMenu();
      }
    });
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getUserGroupInfo() {
      http.request(this.$options.name, 'DTS_CMA_00009', {
        path: { 'user-group-id': this.userGroupId },
      }).then(res => {
        if (res.data) {
          this.userGroupName = res.data.userGroupName;
          this.userGroupCategoryName = res.data.userGroupCategoryName;
          this.userGroupContent = res.data.userGroupContent;
        }
      });
    },
    searchMenu() {
      http.request(this.$options.name, 'DTS_CMA_00048', {
        path: { 'user-group-id': this.userGroupId },
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
        this.$refs.grdAppMenu.setData(treeData, { dataType: 'json', id: 'id', parentField: 'parentId' });
      }).catch(error => {
        console.log(error);
      });
    },
    onCloseClick() {
      this.closePagePopup('');
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
