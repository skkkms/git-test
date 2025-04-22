<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-tab-box
        class="mt35"
        :default-idx="idx"
      >
        <ur-tab-content
          idx="1"
          :label="$t('MSG_TXT_IAA_EVT_JOIN_CURRENT')"
        >
          <T01 :page-id="this.$options.name">
          </T01>
        </ur-tab-content>
        <ur-tab-content
            idx="2"
            :label="$t('MSG_TXT_IAA_MEMBER_JOIN_CURRENT')"
        >
          <T02 :page-id="this.$options.name">
          </T02>
        </ur-tab-content>
      </ur-tab-box>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import T01 from './components/PGE_AAG_00001_T01.vue'
import T02 from './components/PGE_AAG_00001_T02.vue'
export default {
  name: 'PGE_AAG_00001', // eslint-disable-line vue/name-property-casing
  components: {
    T01,
    T02,
  },
  data() {
    return {
      idx: '1',
    }
  },
  methods: {
  },
  created() {
    const query = utils.getParameter(this, 'params')
    if (query && query.tabIndex) {
      this.idx = query.tabIndex
    }
  },
}
</script>
<style scoped>
</style>
