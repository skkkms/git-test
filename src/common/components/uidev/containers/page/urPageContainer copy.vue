<template>
  <!-- .ur-page :: Background color & visible container -->
  <div class="ur-page" :class="pageClass">
    <!-- .ur-page__title-wrapper :: static title & bread crumb -->
    <div v-if="showTitle" class="ur-page__title-wrapper">
      <div ref="title" class="ur-page__title">
        <!--
                $ver: v0.1.0
                title 영역 입니다. 기본적으로 title 속성으로 전달된 문자열을 출력합니다.
                #title area. By default, the string passed to the title attribute is output.
                -->
        <span class="ur-page__title__text">
          <slot name="title">{{ title }}</slot>
        </span>
        <div v-if="!isPopupMode" class="ur-page__title__bread-crumb-box">
          <!--
                    $ver: v0.1.0
                    breadcrumb 설정을 할 수 있는 영역으로 title영역의 우측상단에 위치합니다.
                    #The breadcrumb setting area is located at the top right of the title area.
                    -->
          <slot name="breadcrumb">{{ breadcrumb }}</slot>
        </div>
        <div v-else class="ur-page__title__close">
          <ur-icon full class="ur-page__title__close-icon">close</ur-icon>
        </div>
      </div>
    </div>
    <!-- .ur-page__sticky-area :: sticky title & bread crumb -->
    <div v-if="showTitle" v-show="isSticky" class="ur-page__sticky-area">
      <div class="ur-page__title-wrapper">
        <div class="ur-page__title">
          <span class="ur-page__title__text">
            <!--$hide-->
            <slot name="title">{{ title }}</slot>
          </span>
          <div class="ur-page__title__bread-crumb-box">
            <!--$hide-->
            <slot name="breadcrumb">{{ breadcrumb }}</slot>
          </div>
        </div>
      </div>
    </div>
    <!-- .ur-page__contents-wrapper :: content area -->
    <div
      class="ur-page__contents-wrapper"
      ref="contWrapper"
      @scroll="contentScroll"
      :class="fixedHeight ? 'ur-scroll' : 'ur-scroll__content'"
    >
      <div
        class="ur-page__contents"
        :class="fixedHeight ? 'ur-scroll__content' : ''"
      >
        <!--
                $ver: v0.1.0
                ur-page의 content 영역 입니다.
                #The content area of ​​the ur-page.
                -->
        <slot />
      </div>
    </div>
    <!-- .ur-page__remain :: when using fixed height page, notify contents remain below -->
    <div v-if="fixedHeight && isRemain" class="ur-page__remain">
      <div class="ur-page__remain__shadow"></div>
    </div>
  </div>
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
    title: {
      type: String,
      default: 'New Page',
    },
    type: {
      type: String,
      validator: function(value) {
        return ['page', 'popup'].indexOf(value) !== -1;
      },
      default: 'page',
    },
    breadcrumb: {
      type: String,
      default: '',
    },
    showTitle: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      isRemain: false,
    };
  },
  computed: {
    isSticky() {
      if (typeof this.$_isSticky === 'function') return this.$_isSticky();
      else return this.$_isSticky;
    },
    isPopupMode() {
      return this.popupMode == undefined ? this.type === 'popup' : this.popupMode;
    },
    pageClass() {
    return {
        'ur-page--fixed-width': this.fixedWidth,
        'ur-page--fixed-height': this.fixedHeight,
        'ur-page--sticky-title': this.isSticky,
        'ur-page--popup': this.isPopupMode,
      };
    },
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