<template>
  <div class="-page-card-container">
    <sui-page-card
      v-for="page in pageList"
      :key="page.id"
      :pageId="page.pageId"
      :pageItem="page.pageItem"
      :pageType="page.type"
      @onHomeRefresh="onHomeRefresh"
    />
  </div>
</template>

<script>
export default {
  name: 'SuiPageCardContainer',
  props: {
    pageList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onHomeRefresh() {
      this.$emit('onHomeRefresh');
    },
  },
};
</script>

<style scoped>
.-page-card-container {
  display:flex;

  flex-direction:row;
  padding-bottom:20px;
  flex-wrap:wrap;
  min-width:1300px;
  top:165px;
}
</style>
