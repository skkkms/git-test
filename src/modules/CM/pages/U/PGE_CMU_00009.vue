<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <sui-page-tab-box-type
        :tabItems="tabItems"
        :default-tab-index="defaultTabIndex"
        :setCurrentTabComponent="setCurrentTabComponent"
        @change-tab-idx="tabSelected"
      >
        <container
          :is="currentTabComponent"
          :pageId="this.$options.name"
        />
      </sui-page-tab-box-type>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import t01 from './components/PGE_CMU_00009_T01.vue';
import t02 from './components/PGE_CMU_00009_T02.vue';
import t03 from './components/PGE_CMU_00009_T03.vue';

export default {
  name: 'PGE_CMU_00009', // eslint-disable-line vue/name-property-casing
  components: {
    t01,
    t02,
    t03,
  },
  data() {
    return {
      // Codes
      defaultTabIndex: 0,
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_USR'),
          component: t01,
        },
        {
          tabTitle: this.$t('MSG_TXT_DEPT'),
          component: t02,
        },
        {
          tabTitle: this.$t('MSG_TXT_ALL'),
          component: t03,
        },
      ],
      currentTabComponent: t01,
    };
  },
  computed: {},
  watch: {},
  datasets: [],
  mounted() {},

  methods: {
    setCurrentTabComponent(component) {
      this.currentTabComponent = component;
    },
    tabSelected() {
    },
  },
};
</script>
<style scoped>
</style>
