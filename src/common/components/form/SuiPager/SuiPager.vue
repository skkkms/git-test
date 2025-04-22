<template>
  <div class="pagerWrap">
    <nav class="pagination">
      <button type="button" class="btn_Pre" @click="goToPrev" :disabled="prevBtnDisabled">Previous Page</button>
      <ul class="pagination__items" :class="itemContainerClasses">
        <li v-for="page in pages" :class="itemClasses(page)">
          <a @click="onPageClick(page)">{{ page }}</a>
        </li>
      </ul>
      <button type="button" class="btn_Next" @click="goToNext" :disabled="nextBtnDisabled">Next Page</button>
    </nav>
    <div class="goPage_wrap">
      <div>
        <sui-text-field v-model="goToPageNum" :number="true" :max-length="100" @keyup.enter="onInputEnter"/>
      </div>
      <button type="button" @click="onGoBtnClick">GO</button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'SuiPager',
  props: {
    totalPageCount: {
      type: Number,
      default: 1,
    },
    autoHide: {
      type: Boolean,
      default: true,
    },
    pagerLength: {
      type: Number,
      default: 11,
    },
  },
  data() {
    return {
      currentComponent: null,
      totalItemCount: 0,
      selectedItemsCount: 0,
      currentPageIndex: 1,
      goToPageNum: '',
    };
  },
  computed: {
    halfPagerLength() {
      return parseInt(this.pagerLength / 2, 10);
    },
    itemContainerClasses() {
      return [
        this.ellipsisFront ? 'pagination__items__ellipsis-front': '',
        this.ellipsisRear ? 'pagination__items__ellipsis-rear' : '',
      ];
    },
    prevBtnDisabled() {
      return (this.currentPageIndex === 1);
    },
    nextBtnDisabled() {
      return (this.currentPageIndex === this.totalPageCount);
    },
    ellipsisFront() {
      if (this.totalPageCount > this.pagerLength && (this.currentPageIndex > (this.halfPagerLength + 1))) {
        return true;
      }
      return false;
    },
    ellipsisRear() {
      if (this.totalPageCount > this.pagerLength && (this.currentPageIndex + this.halfPagerLength < this.totalPageCount)) {
        return true;
      }
      return false;
    },
    pages() {
      const newPages = [];
      let ellipsisCount = 0;
      let startEndCount = 2;
      let startIndex;
      let endIndex;
      if (this.ellipsisFront && this.ellipsisRear) {
        ellipsisCount = 2;
        startIndex = this.currentPageIndex - (this.halfPagerLength - startEndCount);
        endIndex = startIndex + (this.pagerLength - 1 -ellipsisCount - startEndCount);
      } else if (this.ellipsisFront) {
        ellipsisCount = 1;
        endIndex = this.totalPageCount - 1;
        startIndex = endIndex - (this.pagerLength - ellipsisCount -startEndCount -1);
      } else if (this.ellipsisRear) {
        ellipsisCount = 1;
        startIndex = 2;
        endIndex = startIndex + (this.pagerLength - ellipsisCount - startEndCount - 1);
      }

      if (ellipsisCount) {
        newPages.push(1);
        for (let i = startIndex; i <= endIndex; i++) {
          newPages.push(i);
        }
        newPages.push(this.totalPageCount);
      } else {
        for (let i = 1; i <= this.totalPageCount; i++) {
          newPages.push(i);
        }
      }
      return newPages;
    },
  },
  watch: {
    totalPageCount() {
      this.resetData();
    },
  },
  methods: {
    resetData() {
      this.currentPageIndex = 1;
      // this.goToPageNum = '1';
    },
    setCurrentPage(index) {
      if (index >= 1 && index <= this.totalPageCount) {
        if (this.currentPageIndex !== index) {
          this.currentPageIndex = index;
          this.$emit("page-changed", this.currentPageIndex);
        }
        // this.goToPageNum = `${index}`;
      }
    },
    onPageClick(page) {
      this.setCurrentPage(page);
    },
    itemClasses(page) {
      return [
        this.currentPageIndex === page ? 'pagination__items--active' : '',
      ];
    },
    goToPrev() {
      this.setCurrentPage(this.currentPageIndex - 1);
    },
    goToNext() {
      this.setCurrentPage(this.currentPageIndex + 1);
    },
    onGoBtnClick() {
      const goToPageNum = parseInt(this.goToPageNum);
      if (goToPageNum > this.totalPageCount) {
        this.setCurrentPage(this.totalPageCount);
      } else if (goToPageNum < 1) {
        this.setCurrentPage(1);
      } else {
        this.setCurrentPage(goToPageNum);
      }
      this.goToPageNum = '';
    },
    onInputEnter() {
      this.onGoBtnClick();
    },
  },
};
</script>
