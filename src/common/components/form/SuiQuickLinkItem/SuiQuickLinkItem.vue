<template>
  <div class="quicklink_item">
    <div class="tit">{{item.title}}</div>
    <ul class="sublist">
        <li v-for="child in item.children" :key="child.quickLinkUid" @click="onClick(child)">{{child.quickLinkMultiLanguageName}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SuiQuicklinkItem',
  props: {
    item: {
      type: Object,
      default: null,
    }
  },
  methods: {
    onClick(item) {
      this.$emit('item-clicked', item);
    }
  },
  mounted() {
    console.log(this.item);
  }
};
</script>

<style scoped>
</style>
