<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name"></sui-page-header>
    <sui-page-contents>
      <div class="comm_gridTop_wrap">
        <div class="btn_wrapL">
          <sui-button type="button" class="comm_btn_sort_top" @click="onMoveTree('top')">Top</sui-button>
          <sui-button type="button" class="comm_btn_sort_up" @click="onMoveTree('up')">Up</sui-button>
          <sui-button type="button" class="comm_btn_sort_down" @click="onMoveTree('down')">Down</sui-button>
          <sui-button type="button" class="comm_btn_sort_bottom" @click="onMoveTree('bottom')">Bottom</sui-button>
        </div>
        <div class="btn_wrapR">
          <sui-button type="button" class="comm_btn_gridTop" @click="onCreateFolder" :disabled="btnStatus.addFolder">
            {{ $t('MSG_BTN_FLDR_ADD') }}
          </sui-button>
          <sui-button type="button" class="comm_btn_gridTop" @click="onRenameFolder" :disabled="btnStatus.rename">
            {{ $t('MSG_BTN_MOD') }}
          </sui-button>
          <sui-button type="button" class="comm_btn_gridTop" @click="onDelete" :disabled="btnStatus.delete">
            {{ $t('MSG_BTN_DEL') }}
          </sui-button>
          <!--<sui-button type="button" class="comm_btn_gridTop" @click="onSaveClick">저장테스트</sui-button>-->
        </div>
      </div>
      <div class="menutree brdG01 pd20">
        <sui-menu-tree
          ref="bookmarkTree"
          :data="treedata"
          draggable
          @item-click="itemClick"
          @item-drop-before="itemDropBefore"
          @item-drop="itemDrop"
        />
      </div>
    </sui-page-contents>
    <!--<page-bottom>-->
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button type="button" class="comm_btn_border" @click="onCancelClick">{{ $t('MSG_BTN_CANCEL') }}</sui-button>
        <sui-button type="button" class="comm_btn_solid" @click="onSaveClick">{{ $t('MSG_BTN_SAVE') }}</sui-button>
      </div>
    <!--</sui-page-bottom>-->
    </sui-page-footer>
    <sui-popup
        v-model="showPopup"
        :title="popupTitle"
    >
      <p01
          :pageId="this.$options.name"
          :folderName="folderName"
          :folderPopupType="folderPopupType"
          :folderYn="folderYn"
          :parentsBookmarkUid="parentsBookmarkUid"
          @bookmark-popup-cancel="onPopupCancel"
          @bookmark-popup-save="onPopupConfirm"
      />
    </sui-popup>
  </sui-page>
</template>

<script>
import p01 from './components/PGE_CMP_00001_P01';

export default {
  name: 'PGE_CMP_00001', // eslint-disable-line vue/name-property-casing
  components: {
    p01,
  },
  props: {
    closePagePopup: {
      type: Function,
    },
    pageInitialData: {
    },
  },
  data() {
    return {
      btnStatus: {
        addFolder: true,
        rename: true,
        delete: true,
      },
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
      editingItem: {},
      editingNode: null,
      flatdata: [],
      treedata: [{ children: [] }],
      localdata1: [],
      showPopup: false,
      popupTitle: this.$t('MSG_TXT_FLDR_ADD'),
      folderName: '',
      folderPopupType: 'new',
      folderYn: 'Y',
      parentsBookmarkUid: '',
    };
  },
  computed: {},
  watch: {},
  datasets: [],
  mounted() {
    this.onLoad();
  },

  methods: {
    onLoad() {
      http.request(this.$options.name, 'DTS_CMP_00131', { // Bookmark list

      }).then(res => {
        this.localdata1 = res.data;
        this._setTreeData(this.localdata1);
      }).catch(error => {
        console.log(error);
      });
    },
    onMoveTree(move) {
      if (!this.editingNode) {
        utils.messageBox('warning', this.$t('MSG_ALT_MOVE_ITEM_SEL'));
        return false;
      }
      if (this.editingItem.menuUid === '') return false;

      const { parentItem } = this.editingNode;
      const idx = parentItem.indexOf(this.editingItem);

      switch (move) {
        case 'top':
          if (idx > 0 && idx < parentItem.length) {
            const tmp = parentItem.splice(idx, 1)[0];
            parentItem.unshift(tmp);
          }
          break;
        case 'up':
          if (idx > 0 && idx < parentItem.length) {
            const newIndex = idx - 1;
            const tmp = parentItem.splice(idx, 1)[0];
            parentItem.splice(newIndex, 0, tmp);
          }
          break;
        case 'down':
          if (idx > -1 && idx < parentItem.length - 1) {
            const newIndex = idx < parentItem.length - 1 ? idx + 1 : parentItem.length - 1;
            const tmp = parentItem.splice(idx, 1)[0];
            parentItem.splice(newIndex, 0, tmp);
          }
          break;
        case 'bottom':
          if (idx > -1 && idx < parentItem.length) {
            const tmp = parentItem.splice(idx, 1)[0];
            parentItem.push(tmp);
          }
          break;
        default:
          break;
      }
      this._reordering(parentItem);
    },
    onCreateFolder() {
      this.popupTitle = this.$t('MSG_TXT_FLDR_ADD');
      this.folderName = '';
      this.folderPopupType = 'new';
      this.folderYn = 'Y';
      this.parentsBookmarkUid = this.editingItem.bookmarkUid;
      this.showPopup = true;
    },
    onRenameFolder() {
      this.popupTitle = this.$t('MSG_TXT_MOD');
      this.folderName = this.editingItem.bookmarkName;
      this.folderPopupType = 'rename';
      this.folderYn = this.editingItem.folderYn;
      this.showPopup = true;
    },
    onDelete() {
      if (this.editingItem.bookmarkUid !== undefined) {
        const index = this.editingNode.parentItem.indexOf(this.editingItem);
        this.editingNode.parentItem.splice(index, 1);
        this.btnStatus.delete = true;
        this.btnStatus.rename = true;
      }
    },
    onCancelClick() {
      this.closePagePopup('');
    },
    onSaveClick() {
      this.flatdata = [];
      this._makeFlatData(this.treedata[0], this.flatdata);

      const dataParams = [];
      utils.forEach(this.flatdata, item => {
        dataParams.push({
          bookmarkUid: item.bookmarkUid,
          bookmarkName: item.bookmarkName,
          pageId: utils.trim(item.pageId),
          bookmarkLevel: item.bookmarkLevel,
          parentsBookmarkUid: item.parentsBookmarkUid,
          arrayalOrder: item.arrayalOrder,
          folderYn: item.folderYn,
        });
      });

      let tmpBookmarkNames = '';
      tmpBookmarkNames = utils.map(dataParams, 'bookmarkName');
      if (dataParams.length !== utils.uniq(tmpBookmarkNames).length) {
        utils.messageBox('confirm', this.$t('MSG_ALT_DUP_NM_ITEM_SAVE'), null, () => {
          this.bookmarkSave(dataParams);
        });
      }

      if (dataParams.length === utils.uniq(tmpBookmarkNames).length) {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
          this.bookmarkSave(dataParams);
        });
      }
    },
    bookmarkSave(dataParams) {
      http.request(this.$options.name, 'DTS_CMP_00035', { // Menu List insert
        data: dataParams,
      }).then(() => {
        utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null,
          (/* ok */) => {
            this.closePagePopup('save');
          },
          (/* cancel */) => {});
      }).catch(error => {
        console.log(error);
      });
    },
    itemDropBefore() {

    },
    itemDrop(node, item, draggedItem, e) {

      draggedItem = utils.assign(draggedItem, {
        parentsBookmarkUid: item.folderYn === 'Y' ? item.bookmarkUid : item.parentsBookmarkUid,
      });

      this._reordering(node.parentItem);

      this.$refs.bookmarkTree.handleRecursionNodeChildren(draggedItem, childrenItem => {
        childrenItem.selected = item.selected;
      });
    },
    itemClick(node, item, e) {
      this.editingNode = node;
      this.editingItem = node.model;

      this.btnStatus.addFolder = !(this.editingItem.folderYn === 'Y');
      // this.btnStatus.rename = !(this.editingItem.folderYn === 'Y' && this.editingItem.bookmarkUid);
      this.btnStatus.rename = !(this.editingItem.bookmarkUid); // All rename
      this.btnStatus.delete = !(this.editingItem.bookmarkUid);
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
    _reordering(itemArr) {
      utils.forEach(itemArr, (item, index) => {
        item.order = index;
        item.arrayalOrder = index;
      });
    },
    _makeFlatData(sourceData, targetData) { // 계층구조 데이터 => 목록구조 데이터
      utils.forEach(sourceData.children, (item, index) => {
        if (item.bookmarkUid) {
          // 데이터 보정
          item = utils.assign(item, {
            order: index,
            arrayalOrder: index,
            bookmarkLevel: sourceData.bookmarkLevel + 1,
          });
          targetData.push(item);
        }
        if (item.children) {
          this._makeFlatData(item, targetData);
        }
      });
    },
    onPopupCancel() {
      this.showPopup = false;
    },
    onPopupConfirm(folderName, folderPopupType, parentsBookmarkUid) {
      this.showPopup = false;

      if (folderPopupType === 'new') {
        const newBookmarkUId = utils.guid('BMK');
        const tmpObj = {
          text: folderName,
          value: folderName,
          folderYn: 'Y',
          icon: '',
          order: this.editingItem.order,
          bookmarkUid: newBookmarkUId,
          parentsBookmarkUid: parentsBookmarkUid !== '' ? parentsBookmarkUid : this.editingItem.menuUid,
          // userId: this.userId,
          pageId: '',
          arrayalOrder: this.editingItem.arrayalOrder,
          bookmarkLevel: this.editingItem.bookmarkLevel + 1,
          defaultYn: 'N',
          bookmarkName: folderName,
        };
        this.editingItem.addChild(tmpObj);
      } else {
        this.editingItem.bookmarkName = folderName;
        this.editingItem.text = folderName;
      }
    },
  },
};
</script>

<style scoped>
  .menutree {
    height: 250px;
    overflow: auto;
  }
</style>
