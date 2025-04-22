<template>
<div class="-lnb-menu__item" >
  <div class="-lnb-menu__item__header" @click="onClickHeader">
    <span class="-lnb-menu__item__header__title">{{item.menuName}}</span>
    <button v-show="item.children.length" class="-lnb-menu__item__header__button" :class="buttonClass"></button>
  </div>
  <div v-if="item.children.length" v-show="isOpened" class="-lnb-menu__item__body">
    <sui-lnb-tree ref="tree" :data="item.children" :textFieldName="'menuName'" style="overflow-y:auto; width: 100%" @item-click="onItemClick"></sui-lnb-tree>
  </div>
</div>
</template>

<script>
export default {
  name: 'SuiLnbMenuItem',
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      isOpened: this.item.opened,
    };
  },
  computed: {
    buttonClass() {
      if (!this.isOpened) {
        return '-lnb-menu__item__header__button_close';
      }
      return '';
    },
  },
  watch: {
    item: {
      handler(val, oldVal) {
        this.isOpened = val.opened;
      },
      deep: true,
    }
  },
  mounted() {
  },
  methods: {
    onItemClick(item) {
      this.$router.push(item.data.pageId);
      this.$emit('item-click', this);
    },
    onClickHeader() {
      if (this.item.children.length) {
        if (this.item.opened) {
          this.isOpened = this.item.opened = false;
        } else {
          this.isOpened = this.item.opened = true;
        }
      } else {
        this.$router.push(this.item.pageId);
        this.$emit('item-click', this);
      }
    },
    collapse() {
      this.isOpened = this.item.opened = false;
    },
    expand() {
      this.isOpened = this.item.opened = true;
    },
    deselectAll() {
      if (this.$refs.tree) {
        this.$refs.tree.deselectAll();
      }
    }
  },
};
</script>

<style scoped>
/* 
.-lnb-menu__item {
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
.-lnb-menu__item__header:hover {background-color:#f7f7f7}
.-lnb-menu__item__header__title {
  font-size:15px;
  color:#333;
  margin-left:20px;
  line-height:40px;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
  padding: 8px 16px;
  border-top:1px solid #eaeaea;
  border-bottom:1px solid #eaeaea;
} */
</style>
