<template>
  <li
    class="tree-node"
    :data-id="node.id"
    :class="nodeClass"
    @mousedown.stop="handleMouseDown"
  >
    <div
      class="tree-content"
      :class="contentClass"
      :style="[options.direction == 'ltr' ? {'padding-left': padding} : {'padding-right': padding}]"
      @click.stop="select"
      @mouseover="isHover=true"
      @mouseout="onMouseout"
    >
      <i
        v-if="node.depth"
        class="tree-arrow"
        :class="[{'expanded': node.states.expanded, 'has-child': node.children.length || node.isBatch}, options.direction]"
        @click.stop="toggleExpand"
      />

      <i
        v-if="options.checkbox"
        class="tree-checkbox"
        :class="{'checked': node.states.checked, 'indeterminate': node.states.indeterminate}"
        @click.stop="check"
      />

      <span
        ref="anchor"
        class="tree-anchor"
        tabindex="-1"
        @focus="onNodeFocus"
        @dblclick="tree.$emit('node:dblclick', node)"
      >
        <node-content :node="node" />
        <span
          v-if="node.data.iconclass"
          :class="node.data.iconclass"
          @click.stop="tree.$emit('usericon-click', node)"
        />
      </span>

      <i
        v-if="!node.depth"
        class="tree-arrow"
        :class="[{'expanded': node.states.expanded, 'has-child': node.children.length || node.isBatch}, options.direction]"
        @click.stop="toggleExpand"
      />

      <button
        v-show="isHover && !node.children.length && !node.data.iconclass && node.data.folderYn !== 'Y'"
        class="tree-anchor-more-button"
        @click.stop="onMoreClick(node)"
      />
    </div>

    <transition name="l-fade">
      <ul
        v-if="hasChildren() && node.states.expanded"
        class="tree-children"
        :class="treeChildrenClass"
      >
        <node
          v-for="child in node.children"
          v-if="child && child.visible()"

          :key="child.id"
          :node="child"
          :options="options"
        />
      </ul>
    </transition>
  </li>
</template>

<script>
import NodeContent from './NodeContent';

const TreeNode = {
  name: 'Node',
  inject: ['tree'],
  props: ['node', 'options'],

  components: {
    NodeContent,
  },

  watch: {
    node() {
      this.node.vm = this;
    },
  },

  data() {
    this.node.vm = this;

    return {
      loading: false,
      isHover: false,
    };
  },

  computed: {
    padding() {
      return `${this.node.depth * (this.options.paddingLeft ? this.options.paddingLeft : this.options.nodeIndent)}px`;
    },

    nodeClass() {
      const state = this.node.states;
      const hasChildren = this.hasChildren();
      const classes = {
        'has-child': hasChildren,
        expanded: hasChildren && state.expanded,
        selected: state.selected,
        disabled: state.disabled,
        matched: state.matched,
        dragging: state.dragging,
        loading: this.loading,
        draggable: state.draggable,
      };

      if (this.options.checkbox) {
        classes.checked = state.checked;
        classes.indeterminate = state.indeterminate;
      }

      return classes;
    },

    contentClass() {
      if (this.node.depth === 0) {
        return 'tree-content__root';
      }
      return '';
    },

    treeChildrenClass() {
      if (this.node.depth === 0) {
        return 'tree-children__root';
      }
      return '';
    },
  },

  methods: {
    onNodeFocus() {
      this.tree.activeElement = this.node;
    },

    focus() {
      this.$refs.anchor.focus();
      this.node.select();
    },

    check() {
      if (this.node.checked()) {
        this.node.uncheck();
      } else {
        this.node.check();
      }
    },

    select({ ctrlKey } = evnt) {
      const opts = this.options;
      const { tree } = this;
      const { node } = this;

      tree.$emit('node:clicked', node);

      if (opts.editing && node.isEditing) {
        return;
      }

      if (opts.editing && node.editable()) {
        return this.startEditing();
      }

      if (opts.checkbox && opts.checkOnSelect) {
        if (!opts.parentSelect && this.hasChildren()) {
          return this.toggleExpand();
        }

        return this.check(ctrlKey);
      }

      // 'parentSelect' behaviour.
      // For nodes which has a children list we have to expand/collapse
      if (!opts.parentSelect && this.hasChildren()) {
        this.toggleExpand();
      }

      if (opts.multiple) {
        if (!node.selected()) {
          node.select(ctrlKey);
        } else if (ctrlKey) {
          node.unselect();
        } else if (this.tree.selectedNodes.length != 1) {
          tree.unselectAll();
          node.select();
        }
      } else if (node.selected() && ctrlKey) {
        node.unselect();
      } else {
        node.select();
      }
    },

    toggleExpand() {
      if (this.hasChildren()) {
        this.node.toggleExpand();
      }
    },

    hasChildren() {
      return this.node.hasChildren();
    },

    startEditing() {
      if (this.tree._editingNode) {
        this.tree._editingNode.stopEditing();
      }

      this.node.startEditing();
    },

    stopEditing() {
      this.node.stopEditing();
    },

    handleMouseDown(event) {
      if (!this.options.dnd) {
        return;
      }

      this.tree.vm.startDragging(this.node, event);
    },

    handleClickOutside() {
      if (this.portal) {
        this.portal.deactivate();
        this.isHover = false;
        this.moreActivate = false;
      }
    },

    onMoreClick(node) {
      this.moreActivate = true;

      const tooltipMenuList = [
        // { key: 'favorites', label: this.$t('MSG_TIT_BKMK') },
        { key: 'menual', label: this.$t('MSG_TIT_MANU_SRCH') },
        { key: 'new-window', label: this.$t('MSG_TXT_NEW_WINDOW') },
      ];

      const btnEl = node.vm.$el.querySelector('.tree-anchor-more-button');
      const bounds = btnEl.getBoundingClientRect();
      const left = bounds.right;
      const { top } = bounds;
      const { bottom } = bounds;
      if (!this.portal) {
        const propsData = {
          menuList: tooltipMenuList,
          showButton: false,
        };
        this.portal = utils.createPortalComponent('sui-tooltip-menu', propsData);
        if (this.portal) {
          this.portal.$el.classList.add('lnb-tooltip-menu');
          this.portal.$on('input', event => {
            if (event === 'favorites') {
              http.toggleFavorites(node.data.pageId).then(result => {
                this.$root.$emit('favorite-changed', result);
              }).catch(() => {});
            } else if (event === 'new-window') {
              if (['PGE_CML_00007'].indexOf(node.data.pageId) >= 0) {
                let wnd = null;
                wnd = utils.openWindowPopup(node.data.pageId, null, null, { resizable: 'yes' });
                wnd.addEventListener('beforeunload', e => {
                  if (wnd.CLOSE_SILIENTLY) {
                    // the absence of a returnValue property on the event will guarantee the browser unload happens
                    delete e.returnValue;
                    this.$router.push({ path: '/PGE_CML_00001', query: { refresh: true } });
                  } else {
                    // 닫기 방지
                    e.preventDefault();
                    e.returnValue = 'do not close siliently';
                  }
                });
              } else {
                utils.openWindowPopup(node.data.pageId, null, null, { resizable: 'yes' });
              }
            } else if (event === 'menual') {
              utils.showMenual(node.data.pageId);
            }
            utils.hideEventBlocker();
          });
        }
      }
      const component = this.portal;
      if (component) {
        const contentsHeight = component.getContentsHeight();
        const itemHeight = 20;
        if (bottom + contentsHeight > component.$el.ownerDocument.body.clientHeight) {
          component.$el.style.transform = `translateX(${left}px) translateY(${parseInt(bottom - contentsHeight)}px)`;
        } else {
          component.$el.style.transform = `translateX(${left}px) translateY(${parseInt(top)}px)`;
        }
        component.activate();
      }
      utils.showEventBlocker(this.handleClickOutside);
    },

    onMouseout() {
      if (this.moreActivate) {
        return;
      }
      this.isHover = false;
    },

  },

  beforeDestroy() {
    if (this.portal) {
      const el = this.portal.$el;
      this.portal.$destroy();
      if (el && el.parentElement) {
        el.parentElement.removeChild(el);
      }
    }
  },
};

export default TreeNode;
</script>

<style>
</style>
