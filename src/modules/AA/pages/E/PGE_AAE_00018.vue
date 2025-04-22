<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>

    </sui-page-contents>
  </sui-page>
</template>
<script>
import BasePage from '~aa/components/BasePage';

export default {
  name: 'PGE_CMA_00001', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  components: {
  },
  data() {
    return {
    };
  },
  created() {
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  mounted() {
  },
  methods: {
  },
};
</script>
<style scoped>
</style>
