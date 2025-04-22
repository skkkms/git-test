<template>
  <div>
    <div class="comm_gridTop_wrap">
      <div class="btn_wrapL sui-grid__header__item__container">
        <div v-if="showCountControl" class="sui-grid__header__item">
          <div class="comm_line_div"></div>
          <div class="totalText" v-show="selectedCount === 0 || !multiselect" >{{ totalCountMessage }}</div>
          <div v-show="selectedCount && multiselect" class="sui-grid__header__num">{{ selectedMsg }}</div>
          <!-- <sui-checkbox v-show="selectedCount && multiselect" :checked="false" :disabled="false" class="sui-grid__header__num">{{ selectedCount}}개 선택</sui-checkbox> -->
        </div>
        <div v-if="showDisplayCountControl" class="sui-grid__header__item">
          <div class="comm_line_div"></div>
          <sui-custom-select ref="selectBox" v-show="showDisplayCountControl" :use-popup="false" :selected="selectedPageSize" :option-list="pageSizeOptionList" placeholder="줄보기" @list-clicked="onPageOptionSelected">
          </sui-custom-select>
        </div>
        <div v-if="showMoveControl" class="sui-grid__header__item">
          <div class="comm_line_div"></div>
          <div style="display:flex">
            <button type="button" class="comm_btn_sort_top" @click="onFrontClicked"/>
            <button type="button" class="comm_btn_sort_up" @click="onForwardClicked"/>
            <button type="button" class="comm_btn_sort_down" @click="onBackwardClicked"/>
            <button type="button" class="comm_btn_sort_bottom" @click="onBackClicked"/>
          </div>
        </div>
      </div>
      <slot>
      </slot>
      <slot name="columncontrol">
      </slot>
    </div>
  </div>
</template>
<script>

const GRID_COUNT = 11;
const HALF_GRID_COUNT = 5;

export default {
  name: 'SuiGridHeader',
  props: {
    pagesizeoptions: {
      type: [String, Array],
      default() {
        return [5, 10, 15];
      },
    },
    initialPagesize: {
      type: Number,
      default: 5,
    },
    multiselect: {
      type: Boolean,
      default: false,
    },
    autoHeight: {
      type: Boolean,
      default: false,
    },
    pageable: {
      type: Boolean,
      default: false,
    },
    showCountControl: {
      type: Boolean,
      default: false,
    },
    showDisplayCountControl: {
      type: Boolean,
      default: false,
    },
    showMoveControl: {
      type: Boolean,
      default: false,
    },
    showComlumsControl: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isPageable: false,
      totalCount: 0,
      selectedCount: 0,
      selectedMsg: '',
      pageSizeOptionList: [],
      pagesize: 5,
      selectedPageSize: {key: null},
      // ds: null,
      // grid: null,
      totalItemCount: 0,
      selectedItemsCount: 0,
      totalPageCount: 0,
      currentPageIndex: 1,
      pages: [],
      ellipsisFront: false,
      ellipsisRear: false,
      goToPageNum: '',
      isAutoHeight: false,
      gridMode: 'component',
    }
  },
  created() {
    // const newOptions = [];
    // const selectKey = null;
    // this.pagesizeoptions.forEach(size => {
    //   newOptions.push({'key': `${size}`, 'label': size});
    //   if (size === this.initialPagesize) {
    //     selectKey = `${size}`;
    //   }
    // });
    // this.pageSizeOptionList = newOptions;
    // if (selectKey) {
    //   this.$refs.selectBox.select(selectkey);
    // }
  },
  computed: {
    totalCountMessage() {
      return `${this.$t('MSG_TXT_COM_TOT')} ${this.totalCount}`;
    },
  },
  mounted() {
    // _.forEach(this.pagesizeoptions, option => {
    //   this.pageSizeOptionList.push({key: String(option), label: String(option)});
    // });
    // if (this.pagesizeoptions.length > 0) {
    //   this.pagesize = this.pagesizeoptions[0];
    //   this.selectedPageSize = {key: String(this.pagesize), label: String(this.pagesize)};
    // }

    const newOptions = [];
    let selectTarget = null;
    this.pagesizeoptions.forEach(size => {
      const item = {'key': `${size}`, 'label': `${size}${utils.getMessageById('MSG_TXT_EACH')}`};
      newOptions.push(item);
      if (size === this.initialPagesize) {
        selectTarget = _.clone(item);
      }
    });
    if (selectTarget) {
      this.selectedPageSize = selectTarget;
      this.onPageOptionSelected(selectTarget);
    }
    this.pageSizeOptionList = newOptions;

    this.$nextTick(() => {
      this.grid = this._findGrid();
      if (this.grid && this.grid.dataset) {
        this.ds = utils.findDataset(this.grid.dataset, this);
        this.isAutoHeight = this.grid.autoheight;
        this.isPageable = this.grid.pageable;
      }

      if (this.grid && this.ds) {
        this.bindEvents();
        this.refreshData();
      }
    });
  },
  methods: {
    bindEvents() {
      this.ds.$on(this.ds.EVENTS.RAW_DATA_CHANGED, this.onRawDataChanged);
      this.ds.$on(this.ds.EVENTS.DATA_CHANGED, this.onDataChanged);
      this.ds.$on(this.ds.EVENTS.INITIALIZED, this.onDataInitialized);
      this.ds.$on(this.ds.EVENTS.DATA_RESET, this.onRawDataChanged);
      this.ds.$on(this.ds.EVENTS.SELECTION_CHANGED, this.onDataSelectionChanged);

      // this.grid.$on('pagechanged', this.onPageChanged);

    },
    unbindEvents() {
      this.ds.$off(this.ds.EVENTS.RAW_DATA_CHANGED, this.onRawDataChanged);
      this.ds.$off(this.ds.EVENTS.DATA_CHANGED, this.onDataChanged);
      this.ds.$off(this.ds.EVENTS.INITIALIZED, this.onDataInitialized);
      this.ds.$off(this.ds.EVENTS.DATA_RESET, this.onRawDataChanged);
      this.ds.$off(this.ds.EVENTS.SELECTION_CHANGED, this.onDataSelectionChanged);
      // this.grid.$off('pagechanged', this.onPageChanged);
    },
    refreshData() {
      this.totalCount = utils.numberFormat(this.ds.getRawData().length);
      this.selectedCount = this.ds.getSelectedIndexes().length;
      this.selectedMsg = utils.strFormat(this.$t('MSG_TXT_CHK_SELT'), this.selectedCount);
    },
    onDataSelectionChanged() {
      this.selectedCount = this.ds.getSelectedIndexes().length;
      this.selectedMsg = utils.strFormat(this.$t('MSG_TXT_CHK_SELT'), this.selectedCount);
    },
    onRawDataChanged(event) {
      this.refreshData();
    },
    onDataChanged(event) {
      this.refreshData();
    },
    onDataInitialized(event) {
      this.refreshData(ds.getRawData().length);
    },
    _findGrid() {
      const siblings = this.$parent.$children;
      const index = siblings.indexOf(this);
      if (index >= 0) {
        return siblings[index + 1];
      }
      return null;
    },
    isSingleSelected() {
      if (this.ds.getSelectedIndexes().length === 1) {
        return true;
      }
      return false;
    },
    onFrontClicked() {
      const selection = this.ds.getSelectedIndexes();
      if (selection.length) {
        this.ds.moveRows(selection, 0);
        this.$emit('order-changed', this.ds);
      }
    },
    onForwardClicked() {
      const selection = this.ds.getSelectedIndexes();
      if (selection.length) {
        let minIndex = selection[0];
        _.forEach(selection, index => {
          if (minIndex > index) {
            minIndex = index;
          }
        });
        let refIndex = 0;
        if (minIndex > 0) {
          refIndex = minIndex - 1;
        }
        this.ds.moveRows(selection, refIndex);
        this.$emit('order-changed', this.ds);
      }
    },
    onBackwardClicked() {
      const selection = this.ds.getSelectedIndexes();
      if (selection.length) {
        let maxIndex = selection[0];
        _.forEach(selection, index => {
          if (maxIndex < index) {
            maxIndex = index;
          }
        });
        let refIndex = -1;
        if (maxIndex < (this.ds.data.length - 2)) {
          refIndex = maxIndex + 2;
        }
        this.ds.moveRows(selection, refIndex);
        this.$emit('order-changed', this.ds);
      }
    },
    onBackClicked() {
      const selection = this.ds.getSelectedIndexes();
      if (selection.length) {
        this.ds.moveRows(selection, -1);
        this.$emit('order-changed', this.ds);
      }
    },
    onPageOptionSelected(value) {
      const pagesize = parseInt(value.key);
      // if (this.grid.pagesize !== pagesize) {
      this.pagesize = pagesize;
      // this.grid.pagesize = pagesize;
      // this.grid._pagesize(pagesize);
      this.$emit('pagesize-changed', pagesize);
      // }
    },
    updateGridHeight() {
      // const rowHeight = 40;
      // const headerHeight = 37;
      // const height = this.pagesize * rowHeight + headerHeight;
      // this.grid._height(height);
    },
    getPageSize() {
      return this.pagesize;
    },
    // ensureVisible(index) {
    //   this.grid.ensurerowvisible(index);
    // },
    onClickMode() {
      if (this.gridMode === 'label') {
        this.gridMode = 'component';
      } else {
        this.gridMode = 'label';
      }
      this.$parent.setMode(this.gridMode);
    },

    onOpenColumnSelect() {
      this.columnOptions = [];
      this.selectedColumns = [];
    },
  },
}
</script>
<style scoped>

</style>
