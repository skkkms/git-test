<template>
  <div
    v-show="isActive"
    class="sui-panel-sticky-button-wrapper"
    @click="onClickStickyBottomButton(item)"
  >
    <button
      v-if="item"
      class="sui-panel-sticky-button"
    >
      {{ item.title }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'SuiPanelStickyButton',

  data() {
    return {
      item: null,
      isActive: false,
    };
  },

  methods: {
    _toggleIsActive() {
      this.isActive = !this.isActive;
    },

    onClickStickyBottomButton(item) {
      item.reveal();
    },

    register(buttonTitle, buttonRevealFunction) {
      this.item = {
        title: buttonTitle,
        reveal: buttonRevealFunction,
      };
      this._toggleIsActive();
    },
  },
};
</script>

<style scoped>

</style>
