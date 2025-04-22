<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- tab -->
      <ur-tab-box
        ref="tabRoot"
        class="mt35"
        :default-idx="idx"
        @tab-change="tabChange"
      >
        <!-- tab : EL -->
        <ur-tab-content
          :idx="1"
          :label="$t('에버랜드')"
        >
          <T01
            ref="tabEL"
            :page-id="contextPageId"
            :cur-idx="curIdx"
          />
        </ur-tab-content>
        <!-- tab : CB -->
        <ur-tab-content
          :idx="2"
          :label="$t('캐리비안베이')"
        >
          <T02
            ref="tabCB"
            :page-id="contextPageId"
            :cur-idx="curIdx"
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
import T01 from './components/PGE_AAB_00009_T01.vue'
import T02 from './components/PGE_AAB_00009_T02.vue'

export default {
  name: 'PGE_AAB_00009', // eslint-disable-line vue/name-property-casing
  components: {
    T01,
    T02,
  },
  extends: BasePage,
  data() {
    return {
      idx: 1,
      curIdx: 1,
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    const query = utils.getParameter(this, 'params')
    if (query.parkKindCd === '02') {
      this.idx = 2
      this.curIdx = 2
    }
  },
  mounted() {
  },
  methods: {
    tabChange() {
      this.curIdx = this.$refs.tabRoot.currIdx
      if (this.curIdx === 1) this.$refs.tabEL.onTabChanged()
      else if (this.curIdx === 2) this.$refs.tabCB.onTabChanged()
    },
  },
}
</script>
<style scoped>
</style>
