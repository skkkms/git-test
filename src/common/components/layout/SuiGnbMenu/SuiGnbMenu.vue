<template>
  <nav class="gnb">
    <div ref="scrollContainer" class="-gnb-menu__container" >
      <ul ref="scrollContent" class="-gnb-menu__content" :style="translateXStyle">
        <li v-for="item in menuItems" :key="item.text" class="-gnb-menu__item" :class="itemClass(item)">
          <a href="#" :title="getTitle(item)" @click="tnbClicked(item)">{{ item.text }}</a>
        </li>
      </ul>
    </div>
    <sui-tab-navigator ref="navigator"
      v-model="translateX"
      :containerWidth="containerWidth"
      :contentWidth="contentWidth"
      :contentElement="contentElement"
      :controllerWidth="controllerWidth"
    >
      <div v-show="containerWidth < contentWidth" class="-gnb-menu__controller">
        <button class="-gnb-menu__controller__left" @click="onPrevClick"> L </button>
        <button class="-gnb-menu__controller__right" @click="onNextClick"> R </button>
      </div>
    </sui-tab-navigator>
  </nav>
</template>

<script>

export default {
  name: 'SuiGnbMenu',
  props: {
    menuItems: {
      type: Array,
      default() {
        return [];
      },
    }
  },
  data() {
    return {
      selectedItem: null,
      translateX: 0,
      containerWidth: 1,
      contentWidth: 1,
      contentElement: null,
      controllerWidth: 60,
    };
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$refs.navigator.init();
    // });
    this.refresh();
    this.$root.$on('frame-resize', this.refresh);
    this.contentElement = this.$refs.scrollContent;
  },
  computed: {
    translateXStyle() {
      return `transform: translateX(${this.translateX}px)`;
    },
    applicationId() {
      return this.$store.getters.applicationId;
    },
  },
  watch: {
    menuItems() {
      this.$nextTick(()=>{this.$refs.navigator.calculateSizeInfo();});
    },
  },
  methods: {
    select(item) {
      this.selectedItem = item;
      // this.$refs.navigator.reveal(this.menuItems.indexOf(item));
      this.$emit('menu-selected', item);
    },
    tnbClicked(item) {
      this.select(item);
    },
    itemClass(item) {
      if (item.applicationId === this.applicationId) {
        return '-gnb__item--selected';
      }
      return '';
    },
    refresh() {
      this.$nextTick(() => {
        if (this.$refs.scrollContainer) {
          this.containerWidth = parseInt(this.$refs.scrollContainer.getBoundingClientRect().width, 10);
          this.contentWidth = parseInt(this.$refs.scrollContent.getBoundingClientRect().width, 10);
        }
      });
    },
    onPrevClick() {
      this.$refs.navigator.prev();
    },
    onNextClick() {
      this.$refs.navigator.next();
    },
    getTitle(item) {
      return item.text;
    },
  },
  beforeDestroy() {
    this.$root.$off('frame-resize', this.refresh);
  },
};
</script>

<style scoped>
</style>
