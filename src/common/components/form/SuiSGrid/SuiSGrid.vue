<template>
  <div>
    <ur-data-grid
      :ref="gridRef"
      v-bind="{...$props, ...$attrs}"
      :options="mergedOptions"
      v-on="$listeners"
    >
      <template v-if="showLeftInfo" #left-info>
        <div class="comm_gridTop_wrap" style="margin-bottom: 0px;">
          <div class="btn_wrapL sui-grid__header__item__container">
            <div v-if="showRowsPerPageControl" class="sui-grid__header__item">
              <div class="comm_line_div" />
              <ur-dropdown
                v-model="rowsPerPage"
                class="ur-data-grid__info__per-page"
                :items="perPageItems"
                @input="onChangePageSize"
              />
            </div>
            <div v-if="showMoveControl" class="sui-grid__header__item">
              <div class="comm_line_div" />
              <div style="display: flex;">
                <button type="button" class="comm_btn_sort_top" @click="onClickMoveToTop" />
                <button type="button" class="comm_btn_sort_up" @click="onClickMoveToPrev" />
                <button type="button" class="comm_btn_sort_down" @click="onClickMoveToNext" />
                <button type="button" class="comm_btn_sort_bottom" @click="onClickMoveToBottom" />
              </div>
            </div>
          </div>
        </div>
      </template>

      <template
        v-for="(index, name) in $slots"
        v-slot:[name]
      >
        <slot :name="name" />
      </template>
      <template
        v-for="(index, name) in $scopedSlots"
        v-slot:[name]="data"
      >
        <slot
          :name="name"
          v-bind="data"
        />
      </template>
    </ur-data-grid>
  </div>
</template>
<script>

const DEFAULT_ROWS_PER_PAGE = 5;
const DEFAULT_ROW_HEIGHT = 36;
const DEFAULT_HEADER_HEIGHT = 36;

export default {
  name: 'SuiSGrid',
  props: {
    initialRowsPerPage: {
      type: Number,
      required: false,
      default() {
        return 5;
      },
    },
    options: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
    headers: {
      type: Array,
      default() {
        return [];
      },
    },
    dataSource: {
      type: Object,
      default() {
        return {};
      },
    },
    showRowsPerPageControl: {
      type: Boolean,
      required: false,
      default() {
        return true;
      },
    },
    showMoveControl: {
      type: Boolean,
      required: false,
      default() {
        return false;
      },
    },    
  },
  data() {
    return {
      mergedOptions: {
        rowEdit: true, // 넣지 않으면 화면에서 cellEdit: true 를 사용할 경우 렌더링 시점과 차이가 생겨 제대로 표시되지 않음
        // cellMode: false,
        // selectCheckOnly: false, // cellMode 값에 의존. cellMode 는 true 일 경우 selectCheckOnly 는 true 로 고정
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        height: DEFAULT_ROWS_PER_PAGE * DEFAULT_ROW_HEIGHT + DEFAULT_HEADER_HEIGHT + 6,
        multiSelect: false,
        resizableColumn: true,
        msgTotal: `${this.$t('MSG_TXT_COM_TOT')} #`,
        msgSelectedCnt: `${utils.strFormat(this.$t('MSG_TXT_CHK_SELT'), '#')}`,
        msgPerPage: `#${this.$t('MSG_TXT_EACH')}`,
        rowHeight: DEFAULT_ROW_HEIGHT,
        headerHeight: DEFAULT_HEADER_HEIGHT,
      },
      rowsPerPage: DEFAULT_ROWS_PER_PAGE,
      showLeftInfo:this.showRowsPerPageControl||this.showMoveControl,
    };
  },
  watch: {
    options: {
      deep: true,
      immediate: true,
      handler(newData) {
        Object.assign(this.mergedOptions, newData);
        this.mergedOptions.rowEdit = newData.rowEdit ? newData.rowEdit : false;
      },
    },
    //total dataFormat 처리..
    // dataSource: {
    //   deep: true,
    //   immediate: true,
    //   handler(newValue) {
    //     if (newValue.getRawData().length > 0) {
    //       this.$nextTick(() => {
    //         this.$refs[this.gridRef].$el.querySelector('.ur-data-grid__info__total>b').innerText = utils.numberFormat(this.$refs[this.gridRef].$el.querySelector('.ur-data-grid__info__total>b').innerText.replace(/,/g, ''));
    //       });
    //     }
    //   },
    // }
  },
  created() {
    this.perPageItems = [
      { value: 5, text: `5 ${this.$t('MSG_TXT_EACH')}` },
      { value: 10, text: `10 ${this.$t('MSG_TXT_EACH')}` },
      { value: 15, text: `15 ${this.$t('MSG_TXT_EACH')}` },
    ];
    this.gridRef = `gridRef${_.uniqueId()}`;
  },
  mounted() {
    // grid options 값 병합
    Object.assign(this.mergedOptions, this.options);
    this.mergedOptions.rowEdit = this.options.rowEdit ? this.options.rowEdit : false;

    // 초기 페이지당 row 수 check 후 적용
    if (this.showRowsPerPageControl) {
      this.rowsPerPage = DEFAULT_ROWS_PER_PAGE;
      if (this.initialRowsPerPage !== DEFAULT_ROWS_PER_PAGE && utils.isNumber(this.initialRowsPerPage) && utils.find(this.perPageItems, { value: this.initialRowsPerPage })) {
        this.rowsPerPage = this.initialRowsPerPage;
      }
    } else {
      this.rowsPerPage = this.initialRowsPerPage;
    }
    this.onChangePageSize(this.rowsPerPage);
    this.$emit('rows-per-page-changed');
    //this.showMoveControl = this.$attrs.showMoveControl;
  },
  methods: {
    getSelected() {
      return this.$refs[this.gridRef].getSelected();
    },
    setSelect(value) {
      const gridRawData = this.$refs[this.gridRef].getDataSet().getRawData();
      const foundIndex = gridRawData.findIndex(item => {
        return Object.keys(value).every(key => {
          return item[key] === value[key];
        });
      });
      if (foundIndex > -1) {
        this.$refs[this.gridRef].mx_setSelect(gridRawData[foundIndex]);
        setTimeout(() => {
          this.$refs[this.gridRef].mx_setScrollRow(foundIndex);
        }, 1);
      }
    },
    setSelectIndex(rowIndex) {
      const gridRawData = this.$refs[this.gridRef].getDataSet().getRawData();
      this.$refs[this.gridRef].mx_setSelect(gridRawData[rowIndex]);
      setTimeout(() => {
        this.$refs[this.gridRef].mx_setScrollRow(rowIndex);
      }, 1);
    },
    onClickNative(e) {
      this.$emit('native-click', e);
    },
    onClickNative2(e) {
      this.$emit('native-click2', e);
    },
    resetSelect() {
      return this.$refs[this.gridRef].resetSelect();
    },
    onChangePageSize(v) {
      this.$refs[this.gridRef].mx_pager.rowsPerPage = v;
      const gridHeight = v * DEFAULT_ROW_HEIGHT + DEFAULT_HEADER_HEIGHT + 6;
      if (this.options.height) {
        this.options.height = gridHeight;
      }
      this.mergedOptions.height = gridHeight;
      this.$nextTick(() => {
        this.$refs[this.gridRef].mx_buildViewData();
        if (this.$refs[this.gridRef].getViewData().length > 0) {
          this.$children[0].setScrollRow(0);
        }
      });
    },
    onClickMoveToTop() {
      const { dataSource } = this;
      const selection = dataSource.getSelected();
      if (!utils.isEmpty(selection)) {
        if (selection[0].__idx > 0) {
          dataSource.removeRows(selection);
          selection.forEach((item, index) => {
            item.__selected = false;
            dataSource.addRow(item, index);
          });
          dataSource.setSelect(selection[0]);
          this.$children[0].setScrollRow(0);
        }
      }
    },
    onClickMoveToPrev() {
      const { dataSource } = this;
      const selection = dataSource.getSelected();
      if (!utils.isEmpty(selection)) {
        if (selection[0].__idx > 0) {
          const insertRowIndex = selection[0].__idx - 1;
          dataSource.removeRows(selection);
          selection.forEach((item, index) => {
            item.__selected = false;
            dataSource.addRow(item, insertRowIndex + index);
          });
          dataSource.setSelect(selection[0]);
          this.$children[0].setScrollRow(insertRowIndex);
        }
      }
    },
    onClickMoveToNext() {
      const { dataSource } = this;
      const selection = dataSource.getSelected();
      const rawData = dataSource.getRawData();
      if (!utils.isEmpty(selection)) {
        if (selection[selection.length - 1].__idx < rawData.length - 1) {
          const insertRowIndex = selection[selection.length - 1].__idx + 1;
          dataSource.removeRows(selection);
          selection.forEach((item, index) => {
            item.__selected = false;
            dataSource.addRow(item, insertRowIndex + index);
          });
          dataSource.setSelect(selection[0]);
          this.$children[0].setScrollRow(insertRowIndex);
        }
      }
    },
    onClickMoveToBottom() {
      const { dataSource } = this;
      const selection = dataSource.getSelected();
      const rawData = dataSource.getRawData();
      if (!utils.isEmpty(selection)) {
        if (selection[selection.length - 1].__idx < rawData.length - 1) {
          const insertRowIndex = rawData.length - selection.length;
          dataSource.removeRows(selection);
          selection.forEach((item, index) => {
            item.__selected = false;
            dataSource.addRow(item, insertRowIndex + index);
          });
          dataSource.setSelect(selection[0]);
          this.$children[0].setScrollRow(insertRowIndex);
        }
      }
    },
    setScrollRow(rowIndex){
      this.$refs[this.gridRef].setScrollRow(rowIndex);
    },
    getChanged() {
      return this.$refs[this.gridRef].getChanged();
    },
    isChanged() {
      return this.$refs[this.gridRef].isChanged();
    },    
  },
};
</script>
<style>
.ur-data-grid__content__cell__value {
  max-width: calc(100% - 2px);
}
</style>
