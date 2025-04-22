<template>
  <div :class="['-page', classesPage]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SuiPage',

  data() {
    return {
      hasTitle: false,
      hasTab: false,
      hasNavigator: false,
      hasFooter: false,
    };
  },

  computed: {
    classesPage() {
      return [
        { '-page-show-title': this.hasTitle },
        { '-page-hide-title': !this.hasTitle },
        { '-page-has-tab': this.hasTab },
        { '-page-has-navigator': this.hasNavigator },
      ];
    },
  },

  methods: {
    toggleTitle(isShown = false) {
      this.hasTitle = isShown;
    },

    toggleTab(isShown = false) {
      this.hasTab = isShown;
    },

    toggleNavigator(isShown = false) {
      this.hasNavigator = isShown;
    },
  },
};
</script>

<style scoped>
</style>
