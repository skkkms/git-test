<template>
  <sui-page>
    <!-- Page Header -->
    <sui-page-header :pageId="this.$options.name" />
    <!-- Page Contents -->
    <sui-page-contents>
      <div class="comm_infowrap">
        <!--저장할 위치를 선택해 주세요.-->
        <p>{{ $t('MSG_ALT_SEL_SAV_LOC') }}</p>
      </div>
      <div class="menutree brdG01 pd20">
        <sui-menu-tree
          ref="bookmarkTree"
          :data="treedata"
          draggable
          style="height:250px; overflow-y:auto"
          @item-click="itemClick"
          @item-drop-before="itemDropBefore"
          @item-drop="itemDrop"
        />
      </div>
    </sui-page-contents>

    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
        >
          {{ $t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_solid"
        >
          {{ $t('MSG_BTN_SAVE') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
export default {
  name: 'PGE_CMP_00002', // eslint-disable-line vue/name-property-casing
  data() {
    return {
      localdata1: [],
      treedata: [{ children: [] }],
      rootTmpl: {
        text: this.$t('MSG_TXT_BKMK'),
        // id: '',
        bookmarkUid: '',
        bookmarkLevel: -1,
        icon: '',
        children: [],
        folderYn: 'Y',
        opened: true,
        dragDisabled: true,
        disabled: true,
      },
    };
  },
  mounted() {
    this.getBookmarkList();
  },
  methods: {
    getBookmarkList() {
      http.request(this.$options.name, 'DTS_CMP_00131', { // Bookmark list

      }).then(res => {
        this.localdata1 = res.data;
        this._setTreeData(this.localdata1);
      }).catch(error => {
        console.log(error);
      });
    },
    itemClick() {

    },
    itemDropBefore() {

    },
    itemDrop() {

    },
    _setTreeData(data) {
      const treeMap = {};
      const rootNode = utils.cloneDeep(this.rootTmpl);
      rootNode.disabled = false;

      utils.forEach(data, item => {
        const treeNode = {
          text: item.bookmarkName,
          children: [],
          // id: utils.trim(item.bookmarkUid),
          parentId: utils.trim(item.parentsBookmarkUid),
          order: item.arrayalOrder,
          level: item.bookmarkLevel,
          icon: item.folderYn === 'N' ? 'fa fa-file icon-state-default' : '',

          bookmarkUid: item.bookmarkUid,
          // userId: item.userId,
          applicationId: item.applicationId,
          bookmarkName: item.bookmarkName,
          pageId: item.pageId,
          bookmarkLevel: item.bookmarkLevel,
          arrayalOrder: item.arrayalOrder,
          parentsBookmarkUid: item.parentsBookmarkUid,
          folderYn: item.folderYn,
          opened: (item.folderYn === 'Y'),
        };

        treeMap[treeNode.bookmarkUid] = treeNode;
      });

      utils.forEach(treeMap, (value, key) => {
        const treeNode = value;
        if (treeMap[treeNode.parentsBookmarkUid]) {
          treeMap[treeNode.parentsBookmarkUid].children.push(treeNode);
        } else {
          rootNode.children.push(treeNode);
        }
      });

      this.treedata = [rootNode];

      // tree data로 변환
      this.$refs.bookmarkTree.initializeData(this.treedata);
    },
  },
};
</script>
<style scoped>
</style>
