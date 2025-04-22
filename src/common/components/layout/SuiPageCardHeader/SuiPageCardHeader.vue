<template>
  <div>
    <div
      v-if="pageItem.homeCardTitleUseYn === 'Y'"
      class="portlet_tit"
    >
      <h3 class="tt_tit">
        {{ pageItem.homeCardName }}
      </h3>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SuiPageCardHeader',
  props: {
    pageItem: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style scoped>
.portlet_tit {height:66px}
.portlet_tit .tt_tit {
  margin:18px 28px 0 28px;
  font-size:16px;
  color: #333;
  font-weight:500;
  line-height:24px;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
