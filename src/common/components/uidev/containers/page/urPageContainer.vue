<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" :title="title"/>
    <sui-page-contents>
      <!--
              $ver: v0.1.0
              ur-page의 content 영역 입니다.
              #The content area of ​​the ur-page.
              -->
      <slot />
    </sui-page-contents>
  </sui-page>
</template>

<script>
export default {
  name: 'urPage',
  inject: {
    fixedWidth: {
      default: false,
    },
    stickyTitle: {
      default: false,
    },
    fixedHeight: {
      default: false,
    },
    $_isSticky: {
      default: false,
    },
    popupMode: {
      type: String,
      default: undefined,
    }
  },
  props: {
    // $ver: v0.1.0
    // title 영역에 임의의 문자열을 넣을 수 있습니다.
    // #You can put any string in the title area.
    contextPageId: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: 'New Page',
    },
    // type: {
    //   type: String,
    //   validator: function(value) {
    //     return ['page', 'popup'].indexOf(value) !== -1;
    //   },
    //   default: 'page',
    // },
    // breadcrumb: {
    //   type: String,
    //   default: '',
    // },
    // showTitle: {
    //   type: Boolean,
    //   default: true,
    // }
  },
  data() {
    return {
      isRemain: false,
    };
  },
  computed: {
    // isSticky() {
    //   if (typeof this.$_isSticky === 'function') return this.$_isSticky();
    //   else return this.$_isSticky;
    // },
    // isPopupMode() {
    //   return this.popupMode == undefined ? this.type === 'popup' : this.popupMode;
    // },
    // pageClass() {
    // return {
    //     'ur-page--fixed-width': this.fixedWidth,
    //     'ur-page--fixed-height': this.fixedHeight,
    //     'ur-page--sticky-title': this.isSticky,
    //     'ur-page--popup': this.isPopupMode,
    //   };
    // },
  },
  mounted() {
    this.contentScroll({ target: this.$refs.contWrapper });
  },
  methods: {
    contentScroll(e) {
      if (this.fixedHeight) {
        this.isRemain =
          e.target.scrollTop + e.target.offsetHeight < e.target.scrollHeight;
      }
      // $ver: v0.1.1
      // $arg: native event object
      // fixed-height props가 true 경우 내부에 생기는 scroll event
      // #Internal scroll event when fixed-height props is true
      this.$emit('contents-scroll', e);
    },
  },
};
</script>