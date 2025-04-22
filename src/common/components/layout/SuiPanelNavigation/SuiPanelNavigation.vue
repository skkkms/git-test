<template>
  <div class="sui-panel-navigation">
    <button
      v-for="(item, index) in buttonList"
      v-show="item.isShow"
      :key="index"
      :title="item.title"
      :class="['sui-panel-navigation__button', {
        'sui-panel-navigation__button-activated': isSelectedItem(item),
        'sui-panel-navigation__panel-box-type-red': item.panelBoxType === 'red',
        'sui-panel-navigation__panel-box-type-black': item.panelBoxType === 'black',
        'sui-panel-navigation__button-show': item.isShow === true,
        'sui-panel-navigation__button-last': isLastShowedItem(item),
      }]"
      @click="onClickNavigationButton(item)"
    >
      {{ item.title }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'SuiPanelNavigation',

  data() {
    return {
      buttonList: [],
      selected: null,
    };
  },

  methods: {
    isLastShowedItem(item) {
      for (let i = this.buttonList.length -1; i >= 0; i -=1) {
        if (this.buttonList[i].isShow) {
          if (this.buttonList[i] === item) {
            return true;
          }
          break;
        }
      }
      return false;
    },

    isSelectedItem(item) {
      return item === this.selected;
    },

    register(buttonTitle, panelBoxType = '', buttonRevealFunction, isShow) {
      this.buttonList.push({
        panelBoxType,
        title: buttonTitle,
        reveal: buttonRevealFunction,
        isShow,
      });

      if (_.isEmpty(this.selected)) {
        [this.selected] = this.buttonList;
      }
    },

    show(revealFunction) {
      for (let i = 0; i < this.buttonList.length; i += 1) {
        const item = this.buttonList[i];
        if (item.reveal === revealFunction) {
          if (!item.isShow) {
            item.isShow = true;
            this.buttonList.splice(i, 1, item);
          }
          break;
        }
      }
    },

    hide(revealFunction) {
      for (let i = 0; i < this.buttonList.length; i += 1) {
        const item = this.buttonList[i];
        if (item.reveal === revealFunction) {
          if (item.isShow) {
            item.isShow = false;
            this.buttonList.splice(i, 1, item);
          }
          break;
        }
      }
    },

    onClickNavigationButton(item) {
      this.selected = item;
      item.reveal();
    },
  },
};
</script>

<style scoped>

</style>
