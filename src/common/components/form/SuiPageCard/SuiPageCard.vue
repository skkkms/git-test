<template>
  <div>
    <div class="-page-card-item">
      <sui-page-card-header
        :pageItem="pageItem"
      />
      <container
        :is="currentComponent"
        :pageItem="pageItem"
        :_params="params"
        @onHomeRefresh="onHomeRefresh"
      />
      <sui-page-card-footer
        :pageItem="pageItem"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuiPageCard',
  props: {
    pageId: {
      type: String,
      default: null,
    },
    pageItem: {
      type: Object,
      default: () => {},
    },
    pageType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentComponent: null,
      params: {},
    };
  },
  mounted() {
    if (this.pageId) {
      let targetPageId = this.pageId;
      if (this.$props.pageType !== 'todo') {
        const linkPage = this.$store.getters.linkPageMap[this.pageId];
        if (linkPage) {
          targetPageId = linkPage.linkPageId;
          this.params = linkPage.params;
        }
      }

      const component = utils.getPageComponentById(targetPageId);
      if (component) {
        utils.loadPageMeta(this.pageId).then(() => {
          this.currentComponent = component;
        }).catch(error => {
          // do nothing;
          console.log(error);
        });
      }
    }
  },
  methods: {
    onHomeRefresh() {
      this.$emit('onHomeRefresh');
    },
  },
};
</script>

<style scoped>
.-page-card-item:last-child{margin-right:0}
.-page-card-item {
  background-color:#fff;
  border:solid 1px #d8dfe8;
  width:312px;
  height:300px;
  /*margin-right:12px;*/
  /*margin-bottom: 12px;*/
  margin: 8px 6px;
  margin-top:0;
  overflow:hidden;
  position:relative;
}
.-page-card-item:hover{
  cursor:pointer;
  border:1px solid #b2bfd6;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
}
</style>
