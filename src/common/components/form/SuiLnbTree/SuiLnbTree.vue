<template>
  <div :class="classes" role="tree" onselectstart="return false">
    <ul :class="containerClasses" role="group">
      <tree-item v-for="(child, index) in data"
                 :key="child.id"
                 :data="child"
                 :text-field-name="textFieldName"
                 :value-field-name="valueFieldName"
                 :whole-row="wholeRow"
                 :show-checkbox="showCheckbox"
                 :height="sizeHight"
                 :parent-item="data"
                 :draggable="draggable"
                 :on-item-click="onItemClick"
                 :on-item-toggle="onItemToggle"
                 :on-item-drag-start="onItemDragStart"
                 :on-item-drag-end="onItemDragEnd"
                 :on-item-drop="onItemDrop"
                 :on-item-content-changed="onItemContentChanged"
                 :on-item-double-click="onItemDoubleClick"
                 :editable="contentEditable"
                 :klass="index === data.length-1?'tree-last':''"/>
    </ul>
  </div>
</template>
<script>
/**
 * 이름 : fdpTree
 * 설명 : 트리구조 컴포넌트
 * 최종 수정 일시 : 2018 - 09 - 10
 */
import TreeItem from '../SuiLnbTreeItem/SuiLnbTreeItem.vue';

let ITEM_ID = 0
let ITEM_HEIGHT_SMALL = 30
let ITEM_HEIGHT_DEFAULT = 24
let ITEM_HEIGHT_LARGE = 32

export default {
  name: 'SuiLnbTree',
  components: {
    TreeItem,
  },
  props: {
    data: {type: Array, required: true}, // 트리 소스 데이터
    size: {type: String, validator: value => ['large', 'small', ''].indexOf(value) > -1, default: 'small'}, // 사이즈 large or small
    showCheckbox: {type: Boolean, default: false}, // 체크박스 표시 여부
    wholeRow: {type: Boolean, default: false}, // 체크된 item 줄 전체 표시
    noDots: {type: Boolean, default: false}, // 가이드라인삭제 여부
    multiple: {type: Boolean, default: false}, // 다중선택 가능 여부
    allowBatch: {type: Boolean, default: true}, // 다중선택 시, 부모 선택하면 자식 모두 선택 여부
    textFieldName: {type: String, default: 'text'},
    valueFieldName: {type: String, default: 'value'},
    async: {type: Function, default: null},
    loadingText: {type: String, default: 'Loading...'},
    draggable: {type: Boolean, default: false}, // 드래그 가능 여부
    klass: {type: String, default: ''},
    editable: {type: Boolean, default: true},
  },
  data () {
    return {
      draggedItem: null,
      draggedElm: null,
      rootTreeNode: {},
      contentEditable: this.editable === true ? true : false,
    }
  },
  computed: {
    classes () {
      return [
        {'lnb-tree': true},
        // {'tree': true},
        {'tree-default': !this.size},
        {[`tree-default-${this.size}`]: !!this.size},
        {'tree-checkbox-selection': !!this.showCheckbox},
        {[this.klass]: !!this.klass}
      ]
    },
    containerClasses () {
      return [
        {'tree-container-ul': true},
        {'tree-children': true},
        {'tree-wholerow-ul': !!this.wholeRow},
        {'tree-no-dots': !!this.noDots}
      ]
    },
    sizeHight () {
      switch (this.size) {
        case 'large':
          return ITEM_HEIGHT_LARGE
        case 'small':
          return ITEM_HEIGHT_SMALL
        default:
          return ITEM_HEIGHT_DEFAULT
      }
    }
  },
  watch: {
    data () {
      ITEM_ID = 0
      this.initializeData(this.data)
    }
  },
  created () {
    ITEM_ID = 0
    this.initializeData(this.data)
  },
  mounted () {
    if (this.async) {
      this.$set(this.data, 0, this.initializeLoading())
      this.handleAsyncLoad(this.data, this)
    }
  },
  beforeDestroy() {

  },
  methods: {
    initializeData (items) {
      if (items && items.length > 0) {
        for (let i in items) {
          var dataItem = this.initializeDataItem(items[i])
          if (dataItem.id === 0 || i == 0) {
            this.rootTreeNode = dataItem
          }
          items[i] = dataItem
          this.initializeData(items[i].children)
        }
      }
    },
    initializeDataItem (item) {
      function Model (item, textFieldName, valueFieldName) {
        this.id = item.id || ITEM_ID++
        this[textFieldName] = item[textFieldName] || ''
        this[valueFieldName] = item[valueFieldName] || item[textFieldName]
        this.icon = item.icon || ''
        this.opened = item.opened || false
        this.selected = item.selected || false
        this.disabled = item.disabled || false
        this.loading = item.loading || false
        this.children = item.children || []
      }
      let node = Object.assign(new Model(item, this.textFieldName, this.valueFieldName), item)
      let self = this
      node.addBefore = function (data, selectedNode) {
        let newItem = self.initializeDataItem(data)
        let index = selectedNode.parentItem.indexOf(node)
        selectedNode.parentItem.splice(index, 0, newItem)
      }
      node.addAfter = function (data, selectedNode) {
        let newItem = self.initializeDataItem(data)
        let index = selectedNode.parentItem.indexOf(node) + 1
        selectedNode.parentItem.splice(index, 0, newItem)
      }
      node.addChild = function (data) {
        let newItem = self.initializeDataItem(data)
        node.children.push(newItem)
      }
      node.openChildren = function () {
        node.opened = true
        self.handleRecursionNodeChildren(node, node => {
          node.opened = true
        })
      }
      node.closeChildren = function () {
        node.opened = false
        self.handleRecursionNodeChildren(node, node => {
          node.opened = false
        })
      }
      return node
    },
    initializeLoading () {
      var item = {}
      item[this.textFieldName] = this.loadingText
      item.disabled = true
      item.loading = true
      return this.initializeDataItem(item)
    },
    handleRecursionNodeChildren (node, func) {
      if (node.children && node.children.length > 0) {
        for (let childNode of node.children) {
          func(childNode)
          this.handleRecursionNodeChildren(childNode, func)
        }
      }
    },
    onItemClick (oriNode, oriItem) {
      if (this.multiple) {
        if (this.allowBatch && oriNode.selectable()) {
          this.handleBatchSelectItems(oriNode, oriItem)
        }
      } else {
        this.handleSingleSelectItems(oriNode, oriItem)
      }
      if( !utils.isEmpty(oriItem.pageId)){
        this.addMenuLog(oriItem);
        this.saveMenuPath(oriItem);
      }
      this.$emit('item-click', oriNode, oriItem)
    },
    addMenuLog(oriItem){
      http.request('LNBTree', 'DTS_CMP_00030', {
        data: {
          'menuLogTypeCode' : 'MENU',
          'menuLogObjectId' : oriItem.menuUid,
          'menuName': oriItem.menuName,
          'pageId' : oriItem.pageId,
          'appId' : oriItem.applicationId,
        }
      }).then(res => {
      }).catch(err => {
        console.log(err);
      });
    },
    saveMenuPath(oriItem){
      let menuPath = []
      menuPath.push({
        'menuName': oriItem.menuName,
        'menuUid': oriItem.menuUid,
        'applicationId': oriItem.applicationId,
        'portalId': oriItem.portalId,
        'pageId': oriItem.pageId,
      });
      let parent = oriItem._parent || '';
      while( parent){
          menuPath.splice(0,0,{
            'menuName': parent.menuName,
            'menuUid': parent.menuUid,
            'applicationId': parent.applicationId,
            'portalId': parent.portalId,
            'pageId': '',
        });
        parent = parent._parent || '';
      }
      this.$store.commit('setMenuPath', menuPath);
    },
    onItemContentChanged (node) {
      this.$emit('item-content-changed', node);
    },
    handleSingleSelectItems (oriNode, oriItem) {
      if (!oriNode.selectable()) {
        return;
      }
      this.handleRecursionNodeChilds(this, node => {
        node.model.selected = false
      })
      oriNode.model.selected = true
    },
    handleBatchSelectItems (oriNode, oriItem) {
      this.handleRecursionNodeChilds(oriNode, node => {
        if (node.model.disabled) return
        node.model.selected = oriNode.model.selected
      })
    },
    handleRecursionNodeChilds (node, func) {
      if (node.$children && node.$children.length > 0) {
        for (let childNode of node.$children) {
          if (!childNode.disabled) {
            func(childNode)
            this.handleRecursionNodeChilds(childNode, func)
          }
        }
      }
    },
    onItemToggle (oriNode, oriItem) {
      if (oriNode.model.opened) {
        this.handleAsyncLoad(oriNode.model.children, oriNode, oriItem)
      }
      this.$emit('item-toggle', oriNode, oriItem)
    },
    handleAsyncLoad (oriParent, oriNode, oriItem) {
      var self = this
      if (this.async) {
        if (oriParent[0].loading) {
          this.async(oriNode, (data) => {
            if (data.length > 0) {
              for (let i in data) {
                data[i].children = [self.initializeLoading()]
                var dataItem = self.initializeDataItem(data[i])
                self.$set(oriParent, i, dataItem)
              }
            } else {
              oriNode.model.children = []
            }
          })
        }
      }
    },
    onItemDragStart (e, oriNode, oriItem) {
      if (!this.draggable) { return false }
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text', '')
      this.draggedElm = e.target
      this.draggedItem = {
        item: oriItem,
        parentItem: oriNode.parentItem,
        index: oriNode.parentItem.indexOf(oriItem)
      }
    },
    onItemDragEnd (e, oriNode, oriItem) {
      if (!this.draggable) { return false }
      this.draggedItem = null
    },
    onItemDrop (e, oriNode, oriItem) {
      if (!this.draggable) { return false }
      if (this.draggedElm === e.target || this.draggedElm.contains(e.target)) {
        return
      }
      if (this.draggedItem) {
        if (this.draggedItem.parentItem === oriItem.children ||
            this.draggedItem.item === oriItem ||
            (oriItem.children && oriItem.children.indexOf(this.draggedItem.item) !== -1)) {
          return
        }
        oriItem.children = oriItem.children ? oriItem.children.concat(this.draggedItem.item) : [this.draggedItem.item]
        var draggedItem = this.draggedItem
        this.$nextTick(() => {
          draggedItem.parentItem.splice(draggedItem.index, 1)
        })
      }
    },
    openAllNodes () {
      // if (!_.isEmpty(this.rootTreeNode)) {
      if (this.rootTreeNode !== null && !!Object.keys(this.rootTreeNode).length) {
        this.rootTreeNode.openChildren()
      }
    },
    closeAllNodes () {
      if (this.rootTreeNode !== null && !!Object.keys(this.rootTreeNode).length) {
        this.rootTreeNode.closeChildren()
      }
    },
    addRootNode (param) {
      if (this.rootTreeNode !== null && !!Object.keys(this.rootTreeNode).length) {
        this.rootTreeNode.addChild(param)
      }
    },
    onBlur() {

    },
    getNodeById(id) {
      const items = [...this.data];
      // const items = [this.rootTreeNode];
      let node = null;
      while(items.length && !node) {
        const currentNode = items.shift();
        items.push(...currentNode.children);
        if (currentNode.id === id) {
          node = currentNode;
        }
      }
      return node;
    },
    getTreeItemById(id) {
      const items = [...this.$children];
      let treeItem = null;
      while(items.length && !treeItem) {
        const currentNode = items.shift();
        items.push(...currentNode.$children);
        if (currentNode.model.id === id) {
          treeItem = currentNode;
        }
      }
      return treeItem;
    },
    revealNode(id) {
      const vNode = this.getTreeItemById(id);
      if (vNode && vNode.$el) {
        const nodeBounds = vNode.$el.getBoundingClientRect();
        const treeBounds = this.$el.getBoundingClientRect();
        this.$el.scrollTop = nodeBounds.y - treeBounds.y;
      }
    },
    deselect(node) {
      let target = node;
      if (typeof node === 'string' || typeof node === 'number') {
        target = this.getNodeById(node);
      }
      if (!target || target.disabled) {
        return;
      }
      target.selected = false;
    },
    deselectAll() {
      const items = [...this.data];
      while(items.length) {
        const currentNode = items.shift();
        items.push(...currentNode.children);
        if (currentNode.selected) {
          currentNode.selected = false;
        }
      }
    },
    select(node) {
      let target = node;
      if (typeof node === 'string' || typeof node === 'number') {
        target = this.getNodeById(node);
      }
      if (!target || target.disabled) {
        return;
      }

      if (!this.multiple) {
        this.deselectAll();
      } else {
        // this.handleSingleSelectItems(oriNode, oriItem)
      }
      target.selected = true;
    },
    getSelection() {
      const selection = [];
      const items = [...this.data];
      while(items.length) {
        const node = items.shift();
        items.push(...node.children);
        if (node.selected) {
          selection.push(node);
        }
      }
      return selection;
    },
    onItemDoubleClick(oriNode, oriItem) {
      this.$emit('item-double-click', oriNode, oriItem);
    },
  }
};
</script>
