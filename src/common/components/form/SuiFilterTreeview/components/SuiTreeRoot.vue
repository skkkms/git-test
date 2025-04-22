<template>
  <component :is="tag" role="tree" :class="{'tree': true, 'tree-loading': this.loading, 'tree--draggable' : !!this.draggableNode}">
    <template v-if="filter && matches.length == 0" >
      <div class="tree-filter-empty" v-html="opts.filter.emptyText"></div>
    </template>
    <template v-else>
      <ul class="tree-root" @dragstart="onDragStart">
        <template v-if="opts.filter.plainList && matches.length > 0">
          <TreeNode
            v-for="node in matches"
            v-if="node.visible()"

            :key="node.id"
            :node="node"
            :options="opts"
          />
        </template>
        <template v-else>
          <TreeNode
            v-for="node in model"
            v-if="node && node.visible()"

            :key="node.id"
            :node="node"
            :options="opts"
          />
        </template>
      </ul>
    </template>

    <DraggableNode v-if="draggableNode" :target="draggableNode" />
  </component>
</template>

<script>
  import TreeNode from './SuiTreeNode'
  import DraggableNode from './SuiDraggableNode'
  import TreeMixin from '../mixins/TreeMixin'
  import TreeDnd from '../mixins/DndMixin'
  import Tree from '../lib/Tree'

  const defaults = {
    direction: 'ltr',
    multiple: true,
    checkbox: false,
    checkOnSelect: false,
    autoCheckChildren: true,
    autoDisableChildren: true,
    checkDisabledChildren: true,
    parentSelect: false,
    keyboardNavigation: true,
    nodeIndent:24,
    minFetchDelay: 0,
    fetchData: null,
    propertyNames: null,
    deletion: false,
    dnd: false,
    editing: false,
    onFetchError: function(err) { throw err }
  }

  const filterDefaults = {
    emptyText: '',
    matcher(query, node) {

      // if (node.hasChildren()) { // Add for EHS : leaf만 필터 대상
      //   return false;
      // }
      const isMatched = new RegExp(query, 'i').test(node.text)

      if (isMatched) {
        if (node.parent && new RegExp(query, 'i').test(node.parent.text)) {
          return false
        }
      }

      return isMatched
    },
    plainList: false,
    showChildren: true
  }

  export default {
    name: 'Tree',
    components: {
      TreeNode,
      DraggableNode
    },

    mixins: [TreeMixin, TreeDnd],

    provide: _ => ({
      tree: null
    }),

    props: {
      data: {},

      options: {
        type: Object,
        default: _ => ({})
      },

      filter: String,

      tag: {
        type: String,
        default: 'div'
      }
    },

    watch: {
      filter (term) {
        this.tree.filter(term)
      },

      data() {
        this.setModel(this.data);
      }
    },

    data () {
      // we should not mutating a prop directly...
      // that's why we have to create a new object
      // TODO: add method for changing options
      let opts = Object.assign({}, defaults, this.options)

      opts.filter = Object.assign(
        {},
        filterDefaults,
        opts.filter
      )

      return {
        model: null,
        tree: null,
        loading: false,
        opts,
        matches: [],
        draggableNode: null
      }
    }
  }
</script>

<style>
</style>