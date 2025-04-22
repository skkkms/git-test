<template>
  <div class="-component-portal">
    <div
      v-show="showEventBlock"
      ref="eventBlocker"
      class="-component-portal__event-blocker"
      @mousedown="onMouseDown"
    />
    <div
      v-show="showComponentPortal"
      ref="componentContainer"
    >
      <!-- <sui-range-date-picker
        ref="range-date-picker"
        v-model="rangedate"        
        :disabled-dates="rangeDisabledDates"
        :is-popup="true"
      />
      <sui-date-picker
        ref="date-picker"
        v-model="date"
        class="-component-portal__date-picker"
        :is-popup="true"
      /> -->
      <sui-time-picker
        ref="time-picker"
        class="-component-portal__time-picker"
        :icon="false"
        :value="time"
        :hideInput="true"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuiComponentPortal',
  props: {
    showComponentPortal: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      rangedate: '',
      rangeDisabledDates: {
        from: '',
        to: '',
      },
      date: '',
      time: {},
      multiselectSelected: [],
      multiselectOptions: [],
      showEventBlock: false,
      userHandler: null,
    };
  },
  mounted() {
    utils.install('getComponentPortal', this.getComponentPortal);
    utils.install('getComponentPortalContainer', this.getComponentPortalContainer);
    utils.install('showEventBlocker', this.showEventBlocker);
    utils.install('hideEventBlocker', this.hideEventBlocker);
  },
  methods: {
    getComponentPortal(componentName) {
      return this.$refs[componentName];
    },
    getComponentPortalContainer() {
      return this.$refs.componentContainer;
    },
    showEventBlocker(handler) {
      if (this.showEventBlock) {
        return;
      }
      this.showEventBlock = true;
      this.userHandler = handler;
      return this.$refs.eventBlocker;
    },
    hideEventBlocker() {
      this.showEventBlock = false;
      if (this.userHandler) {
        const handler = this.userHandler;
        this.userHandler = null;
        handler();
      }
      return this.$refs.eventBlocker;
    },
    onMouseDown() {
      this.hideEventBlocker();
    },
  },
};
</script>

<style scoped>
</style>
