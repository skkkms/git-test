<template>
  <div class="-lnb-menu" style="background-color:red">
    <div ref="menulist" class="menu_list">
      <lnb-menu-item
        v-for="item in menuItems"
        :key="item.key"
        :item="item"
        :focusedTree="focusedTree"
        @header-click="onTreeHeaderClick(item)"
        @item-click="onTreeItemClick"
      />
    </div>
  </div>
</template>

<script>
import lnbMenuItem from '../SuiLnbMenuItem/SuiLnbMenuItem';

export default {
  name: 'SuiLnbMenu',
  components: {
    lnbMenuItem,
  },
  props: {
    menuItems: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      focusedTree: null,
    };
  },
  computed: {
    lnbItemsCollapsed() {
      return this.$store.getters.lnbItemsCollapsed;
    },
  },
  watch: {
    lnbItemsCollapsed(value) {
      if (value) {
        this.collapseAll();
      } else {
        this.expandAll();
      }
    },
  },
  mounted() {
    if (this.lnbItemsCollapsed) {
      this.collapseAll();
    } else {
      this.expandAll();
    }
  },
  methods: {
    onTreeItemClick(tree) {
      if (this.focusedTree !== tree) {
        _.forEach(this.$children, child => {
          if (child !== tree) {
            child.deselectAll();
          }
        });
      }
      this.focusedTree = tree;
    },
    onTreeHeaderClick(item) {
      this.$set(item, 'opened', !item.opened);
    },
    expandAll() {
      this.$children.forEach(child => { child.expand(); });
    },
    collapseAll() {
      this.$children.forEach(child => { child.collapse(); });
    },
  },
};
</script>

<style scoped>

/* .-lnb-menu__item {
  width: 100%;
  height: auto;
  align-items: center;
  background-color: #FFF;
  cursor: pointer;
}

.-lnb-menu__item__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.-lnb-menu__item__header:hover{
  background-color: #f7f7f7
}
.-lnb-menu__item__header__title {
  font-size:15px;
  color:#333;
  margin-left:20px;
  line-height:40px;
}

.-lnb-menu__item__header__button {
  background: url("../../../../assets/images/ic_lnb_open1_normal.png") no-repeat center;
  width: 16px;
  height: 16px;
  margin-right:14px;
}
.-lnb-menu__item__header__button:hover{background: url("../../../../assets/images/ic_lnb_open1_hover.png") no-repeat center;}

.-lnb-menu__item__header__button_close {
  background: url("../../../../assets/images/ic_lnb_close1_normal.png") no-repeat center;
  width: 16px;
  height: 16px;
  margin-right:14px;
}
.-lnb-menu__item__header__button_close:hover{background: url("../../../../assets/images/ic_lnb_close1_hover.png") no-repeat center;}


.-lnb-menu__item__body  {
  padding: 8px 20px;
  border-top:1px solid #eaeaea;
  border-bottom:1px solid #eaeaea;
} */
</style>
