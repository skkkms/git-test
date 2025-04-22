<template>                
  <div v-show="activated" class="quicklink_box">
    <div class="quicklink_header">
      <div class="tit">Quick Link</div>
      <div class="close" @click="onClose"></div>
    </div>
    <div class="quicklink_list">
      <quicklink-item v-for="item in items" v-show="showMore || (item.applicationId === applicationId)" :key="item.title" :item="item" @item-clicked="onItemClicked" />
    </div>
    <div v-if="!showMore" class="quicklink_more">
      <p @click="onMoreClick"> {{ buttonText }}</p>
    </div>
  </div>      
</template>

<script>
import QuicklinkItem from '../SuiQuickLinkItem/SuiQuickLinkItem';

export default {
  name: 'SuiQuicklink',
  components: {
    QuicklinkItem,
  },  
  data() {
    return {
      showMore: false,
      activated: false,
      applicationId: null,
      items: [],
      buttonText: utils.getMessageById('MSG_BTN_ALL_VIEW'),
    }
  },  
  methods: {
    onMoreClick() {
      this.showMore = true;      
    },
    onItemClicked(item) {
      this.$emit('selected', item);
    },
    activate(items, applicationId) {
      this.items = items;
      this.applicationId = applicationId;
      if (!this.applicationId) {
        this.showMore = true;
      } else {
        this.showMore = false;
      }
      this.activated = true;
    },
    deactivate() {
      this.activated = false;
    },
    onClose() {
      this.deactivate();
      this.$emit('close');
    },    
  }
};
</script>

<style scoped>
</style>
