<template>
  <div class="-page-footer">
    <sui-panel-sticky-button
      v-show="panelStickyItem"
      ref="stickyPanel"
      class="-page-footer__sticky-panel-wrapper"
    />
    <slot></slot>
  </div>
</template>

<script>
import SuiPanelStickyButton from '../SuiPanelStickyButton/SuiPanelStickyButton';

export default {
  name: 'SuiPageFooter',

  components: {
    SuiPanelStickyButton,
  },

  data() {
    return {
      panelStickyItem: '',
    };
  },

  methods: {
    register(buttonTitle, buttonRevealFunction) {
      this.panelStickyItem = {
        title: buttonTitle,
        reveal: buttonRevealFunction,
      };

      this.$refs.stickyPanel.register(buttonTitle, buttonRevealFunction);
    },
  },
};
</script>

<style scoped>
</style>
