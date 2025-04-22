<template>
  <div ref="box" class="ur-box-container ur-list-container" :style="boxStyle" @scroll="boxScroll">
    <div ref="board" class="ur-list-container__board" :style="boardStyle" />
    <div ref="container" class="ur-box-container" :class="containerAlignClazz" :style="containerStyle">
      <slot v-for="item in renderItems" :item="item" />
    </div>
  </div>
</template>

<script>
import { ContainerAlignMixin } from '../mixins';
export default {
  mixins: [ContainerAlignMixin],
  props: {
    items: {
      type: Array,
      default: () => [{}],
    },
  },
  data() {
    return {
      isLoading: true,
      renderingInterval: null,
      unitHeight: 0,
      unitSize: 0,
      unitCount: 1,
      unitLength: 1,
      renderIndex: 0,
      renderLength: 1,
      scrollPos: 0,
    }
  },
  computed: {
    isHorizontalDirection() {
      return (this.direction === 'row');
    },
    renderItems() {
      const startIndex = Math.min(this.renderIndex, Math.max(this.unitLength - this.renderLength, 0)) * this.unitCount;
      const endIndex = Math.min(this.items.length - 1, startIndex + (this.renderLength * this.unitCount) - 1);
      const renderItems = [];

      for (let i = startIndex; i <= endIndex; i++) {
        renderItems.push(this.items[i]);
      }
      return renderItems;
    },
    boxStyle() {
      let style = {};
      if (this.isHorizontalDirection) {
        style['overflow-x'] = 'hidden';
      } else {
        let marginForScroll = 0;
        const box = this.$refs['box'];
        if (box) {
          const boxSize = box.getBoundingClientRect().width;
          const boardSize = this.unitSize * this.unitLength;

          if (boardSize > boxSize) marginForScroll = 16;
        }
        style['min-height'] = this.unitHeight + marginForScroll + 'px';
        style['overflow-y'] = 'hidden';
      }
      return style;
    },
    boardStyle() {
      let style = {};
      const boardSize = this.unitSize * this.unitLength + 'px';
      if (this.isHorizontalDirection) {
        style['width'] = '100%';
        style['height'] = boardSize;
        style['position'] = 'relative';
      } else {
        style['height'] = '100%';
        style['width'] = boardSize;
        style['position'] = 'absolute';
      }
      return style;
    },
    containerStyle() {
      let style = {};
      const dummySize = this.unitSize * this.renderIndex + 'px';
      if (this.isHorizontalDirection) {
        style['top'] = dummySize;
        style['left'] = '0px';
        style['right'] = '0px';
      } else {
        style['top'] = '0px';
        style['bottom'] = '0px';
        style['left'] = dummySize;
      }
      if (this.isLoading) style['opacity'] = '0';
      return style;
    },
  },
  methods: {
    defineRenderItemCount() {
      if (this.renderItems.length > 0) {
        const box = this.$refs['box'];
        const container = this.$refs['container'];
        const item = container.firstChild;

        const boxRect = box.getBoundingClientRect();
        const boxWidth = boxRect.right - boxRect.left;
        const boxHeight = boxRect.bottom - boxRect.top;

        const itemRect = item.getBoundingClientRect();
        const itemWidth = itemRect.right - itemRect.left;
        const itemHeight = itemRect.bottom - itemRect.top;

        const boxSizeX = this.isHorizontalDirection ? boxWidth : boxHeight;
        const boxSizeY = this.isHorizontalDirection ? boxHeight : boxWidth;

        const itemSizeX = this.isHorizontalDirection ? itemWidth : itemHeight;
        const itemSizeY = this.isHorizontalDirection ? itemHeight : itemWidth;

        this.unitSize = itemSizeY;
        this.unitHeight = itemHeight;

        this.unitCount = itemSizeX !== 0 ? Math.floor(Math.max(boxSizeX, itemSizeX) / itemSizeX) : 1;
        this.unitLength = this.unitCount !== 0 ? Math.ceil(this.items.length / this.unitCount) : 1;
        this.renderLength = itemSizeY !== 0 ? Math.min(Math.floor(boxSizeY / itemSizeY) + 2, this.unitLength) : 1;
      }
    },
    defineRenderPosition() {
      if (this.renderItems.length > 0) {
        const box = this.$refs['box'];
        const scrollPos = this.isHorizontalDirection ? box.scrollTop : box.scrollLeft;
        this.renderIndex = this.unitSize !== 0 ? Math.min(Math.floor(scrollPos / this.unitSize), Math.max(this.unitLength - this.renderLength, 0)) : 0;
      }
    },
    boxScroll(event) {
      const scrollSize = this.isHorizontalDirection ? event.target.scrollHeight : event.target.scrollWidth;
      const scrollPos = this.isHorizontalDirection ? event.target.scrollTop : event.target.scrollLeft;
      const boxSize = this.isHorizontalDirection ? event.target.offsetHeight : event.target.offsetWidth;

      if (scrollPos === 0) this.$emit('scroll-start');
      else if (scrollSize <= scrollPos + boxSize) this.$emit('scroll-end');
    }
  },
  mounted() {
    const renderFunction = () => {
      this.defineRenderItemCount();
      this.defineRenderPosition();
    }
    const startRendering = () => {
      renderFunction();
      this.isLoading = false;
      return setInterval(renderFunction, 67);
    }
    this.renderingInterval = startRendering();
  },
  beforeDestroy() {
    clearInterval(this.renderingInterval);
  }
}
</script>
