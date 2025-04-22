<template>
  <li
    v-if="$props.data.isInvalid == null || !$props.data.isInvalid"
    :class="classes"
    :draggable="draggable"
    role="treeitem"
    @dragstart.stop="onItemDragStart($event, _self, _self.model)"
    @dragenter.stop.prevent="isDragEnter = true"
    @dragover.stop.prevent="onPreventDefault($event)"
    @dragleave.stop.prevent="isDragEnter = false"
    @drop.stop.prevent="handleItemDrop($event, _self, _self.model)"
    @dragend.stop.prevent="onItemDragEnd($event, _self, _self.model)"
  >
    <div
      v-if="isWholeRow"
      :class="wholeRowClasses"
      role="presentation"
    >&nbsp;</div>
    <i
      class="tree-icon tree-ocl"
      role="presentation"
      @click="handleItemToggle"
    />
    <div
      :class="anchorClasses"
      @click="handleItemClick"
      @mouseover="isHover=true"
      @mouseout="isHover=false"
    >
      <i
        v-if="isShowCheckbox && !model.loading"
        ref="checkbox"
        class="tree-icon tree-checkbox"
        role="presentation"
      />
      <!-- <i v-if="!model.loading" :class="themeIconClasses" role="presentation" /> -->
      <span
        ref="contents"
        class="tree-item-text"
        @blur="onBlur"
      >{{ model[textFieldName] }}</span>
    </div>
    <ul
      v-if="isFolder"
      ref="group"
      role="group"
      class="tree-children"
    >
      <tree-item
        v-for="(child, index) in model.children"
        :key="index"
        :data="child"
        :text-field-name="textFieldName"
        :value-field-name="valueFieldName"
        :whole-row="wholeRow"
        :show-checkbox="showCheckbox"
        :height="height"
        :parent-item="model.children"
        :on-item-click="onItemClick"
        :on-item-toggle="onItemToggle"
        :on-item-drag-start="onItemDragStart"
        :on-item-drag-end="onItemDragEnd"
        :on-item-drop="onItemDrop"
        :on-item-content-changed="onItemContentChanged"
        :on-item-double-click="onItemDoubleClick"
        :editable="editable"
      />
    </ul>
  </li>
</template>
<script>

import _ from 'lodash';

const KEY_CODE = {
  TAB: 9,
  ENTER: 13,
  ESC: 27,
};

const TICK_DBCLICK = 300;

export default {
  name: 'TreeItem',
  props: {
    data: {
      type: Object,
      required: true,
    },
    textFieldName: {
      type: String,
      default: '',
    },
    valueFieldName: {
      type: String,
      default: '',
    },
    wholeRow: {
      type: Boolean,
      default: false,
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
      default: 24,
    },
    parentItem: {
      type: Array,
      default: null,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    onItemClick: {
      type: Function,
      default: () => false,
    },
    onItemToggle: {
      type: Function,
      default: () => false,
    },
    onItemDragStart: {
      type: Function,
      default: () => false,
    },
    onItemDragEnd: {
      type: Function,
      default: () => false,
    },
    onItemDrop: {
      type: Function,
      default: () => false,
    },
    onItemContentChanged: {
      type: Function,
      default: () => false,
    },
    onItemDoubleClick: {
      type: Function,
      default: () => false,
    },
    klass: {
      type: String,
      default: '',
    },
    editable: {
      type: [Boolean, String],
      default: true,
    },
    leafSelectable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isHover: false,
      isDragEnter: false,
      model: this.data,
    };
  },
  computed: {
    isSelectable() {
      if (this.model.hasOwnProperty('selectable')) {
        return this.model.selectable;
      }
      return true;
    },
    isShowCheckbox() {
      return this.showCheckbox && this.isSelectable;
    },
    isFolder() {
      return this.model.children && this.model.children.length;
    },
    classes() {
      return [{
        'tree-node': true,
      },
      {
        'tree-open': this.model.opened,
      },
      {
        'tree-closed': !this.model.opened,
      },
      {
        'tree-leaf': !this.isFolder,
      },
      {
        'tree-loading': !!this.model.loading,
      },
      {
        'tree-drag-enter': this.isDragEnter,
      },
      {
        [this.klass]: !!this.klass,
      },
      ];
    },
    anchorClasses() {
      return [{
        'tree-anchor': true,
      },
      {
        'tree-disabled': this.model.disabled,
      },
      {
        'tree-selected': this.model.selected,
      },
      {
        'tree-hovered': this.isHover,
      },
      ];
    },
    wholeRowClasses() {
      return [{
        'tree-wholerow': true,
      },
      {
        'tree-wholerow-clicked': this.model.selected,
      },
      {
        'tree-wholerow-hovered': this.isHover,
      },
      ];
    },
    // themeIconClasses () {
    //   return [
    //     {'tree-icon': true},
    //     {'tree-themeicon': true},
    //     {[this.model.icon]: !!this.model.icon},
    //     {'tree-themeicon-custom': !!this.model.icon}
    //   ]
    // },
    isWholeRow() {
      if (this.wholeRow) {
        if (this.$parent.model === undefined) {
          return true;
        } else if (this.$parent.model.opened === true) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  watch: {
    isDragEnter(newValue) {
      if (newValue) {
        this.$el.style.backgroundColor = '#C9FDC9';
      } else {
        this.$el.style.backgroundColor = 'inherit';
      }
    },
    data(newValue) {
      this.model = newValue;
    },
    'model.opened': {
      handler: function(val, oldVal) {
        this.onItemToggle(this, this.model);
        this.handleSetGroupMaxHeight();
      },
      deep: true,
    },
  },
  mounted() {
    this.handleSetGroupMaxHeight();
  },
  methods: {
    handleRecursionNodeParents(node, func) {
      if (node.$parent) {
        func(node.$parent);
        this.handleRecursionNodeParents(node.$parent, func);
      }
    },
    handleItemToggle() {
      if (this.isFolder) {
        this.model.opened = !this.model.opened;
        this.onItemToggle(this, this.model);
        this.handleSetGroupMaxHeight();
      }
    },
    handleGroupMaxHeight() {
      let length = 0;
      let childHeight = 0;
      if (this.model.opened) {
        length = this.$children.length;
        for (let children of this.$children) {
          childHeight += children.handleGroupMaxHeight();
        }
      }
      return length * this.height + childHeight;
    },
    handleSetGroupMaxHeight() {
      if (this.$refs.group) {
        this.$refs.group.style.maxHeight = this.handleGroupMaxHeight() + 'px';
      }
      var self = this;
      this.$nextTick(() => {
        this.handleRecursionNodeParents(self, node => {
          if (node.$refs.group) {
            node.$refs.group.style.maxHeight = node.handleGroupMaxHeight() + 'px';
          }
        });
      });
    },
    createContentEditor() {
      if (this.editing) {
        return;
      }
      this.editing = true;
      const contents = this.$refs.contents;
      const newNode = contents.cloneNode(true);
      newNode.contentEditable = true;
      contents.parentElement.appendChild(newNode);
      this.$nextTick(() => {
        this.canceled = false;
        contents.style.display = 'none';
        newNode.focus();
        newNode.addEventListener('blur', (event) => {
          if (!this.canceled) {
            this.model[this.textFieldName] = event.srcElement.innerHTML;
            this.onItemContentChanged(this);
          }
          newNode.remove();
          contents.style.display = '';
          this.editing = false;
        });
        newNode.addEventListener('keydown', (event) => {
          if (event.keyCode === KEY_CODE.TAB ||
            event.keyCode === KEY_CODE.ESC ||
            event.keyCode === KEY_CODE.ENTER
          ) {
            if (event.keyCode === KEY_CODE.ESC) {
              this.canceled = true;
            }
            newNode.blur();
          }
        });
      });
    },
    isTextContentElement(element) {
      return _.some(element.classList, className => {
        return className === 'tree-item-text';
      });
    },
    handleItemClick(event) {
      if (this.model.disabled) return;
      if (this.isSelectable) {
        this.model.selected = !this.model.selected;
      }
      this.onItemClick(this, this.model);

      const currentDate = new Date().getTime();
      if (!this.lastClickedDate) {
        this.lastClickedDate = currentDate;
        return;
      }

      if ((currentDate - this.lastClickedDate) <= TICK_DBCLICK) {
        if (this.editable && this.isTextContentElement(event.srcElement)) {
          this.createContentEditor();
        }
        this.onItemDoubleClick(this, this.model);
      }
      this.lastClickedDate = currentDate;
    },
    handleItemDrop(e, oriNode, oriItem) {
      this.$el.style.backgroundColor = 'inherit';
      this.onItemDrop(e, oriNode, oriItem);
    },
    onBlur(event) {
      console.log(event);
    },
    onDbclick(event) {
      if (this.editable) {
        this.createContentEditor();
      }
    },
    select() {
      this.model.selected = true;
    },
    deselect() {
      this.model.selected = false;
    },
    selectable() {
      return this.isSelectable;
    },
    onPreventDefault(e) {
      return e.preventDefault();
    },
  },
};
</script>
