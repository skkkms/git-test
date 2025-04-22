<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- tab -->
      <ur-tab-box
        class="mt35"
        :default-idx="idx"
      >
        <!-- tab : EL -->
        <ur-tab-content
          :idx="1"
          :label="$t('MSG_TXT_EB')"
        >
          <T01
            :page-id="contextPageId"
          />
        </ur-tab-content>
        <!-- tab : CB -->
        <ur-tab-content
          :idx="2"
          :label="$t('MSG_TXT_CB')"
        >
          <T02
            :page-id="contextPageId"
          />
        </ur-tab-content>
      </ur-tab-box>
      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

import BasePage from '~cm/components/BasePage'
import T01 from './components/PGE_AAB_00012_T01.vue'
import T02 from './components/PGE_AAB_00012_T02.vue'

export default {
  name: 'PGE_AAB_00012', // eslint-disable-line vue/name-property-casing
  components: {
    T01,
    T02,
  },
  extends: BasePage,
  data() {
    return {
      idx: 1,
    }
  },
  created() {
    const query = utils.getParameter(this, 'params')
    if (query.parkKindCd === '02') {
      this.idx = 2
    }
  },
}
</script>
<style scoped>
</style>
