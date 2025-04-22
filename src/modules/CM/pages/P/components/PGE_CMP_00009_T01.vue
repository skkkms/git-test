<template>
  <div>
    <div class="mrB20" />
    <div class="comm_scr_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDLE')"
            :required="false"
            :vertical="false" />
        </div>
        <div class="col-xs-11">
          <sui-module-submodule-select
            ref="comboModule"
            class="dp_flex"
            :pageId="contextPageId"
            :selectedMd="frame0.pageData.COD_MDLE"
            :selectedSmd="frame0.pageData.COD_SMDLE"
            :defaultMdOption="'all'"
            :defaultSmdOption="'all'"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_SEARCH_COND')"
            :required="false"
            :vertical="false" />
        </div>
        <div class="col-xs-11">
          <sui-code-select
            ref="comboSearchCond"
            :selected="frame0.pageData.COD_PAGE_SEARCH_COND"
            :pagedId="contextPageId"
            codeId="COD_PAGE_SEARCH_COND"
            :defaultOption="'all'"
            :initialSelectedIndex="0"
          />
          <div class="comp_spacing" />
          <sui-text-field
            ref="searchText"
            placeholder=""
            v-model="frame0.pageData.searchTextPage"
            :disabled="false"
            :readonly="false"
            maxlength="50"
            @keyup.enter="onPageSearchClick"
            @keyup="onKeyUpInput"
          />
        </div>
      </div>
      <div class="btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_Reset"
          @click="onResetPageSearchClick"
        >
          {{ $t('MSG_BTN_RESET') }}
        </sui-button>
        <sui-button
          v-permission:read="contextPageId"
          type="button"
          class="comm_btn_Scr"
          @click="onPageSearchClick"
        >
          {{ $t('MSG_BTN_SEARCH') }}
        </sui-button>
      </div>
    </div>
    <div class="mrB30" />
    <div class="comm_gridTop_wrap">
      <div
        class="btn_wrapL"
        style="height:24px;">
        <div
          v-show="selectedPageCount === 0"
          class="totalList"
        >
          {{ totalCntPage }}
        </div>
        <sui-checkbox
          v-show="selectedPageCount"
          :checked="true"
          :disabled="false"
          class="num"
        >
          {{ selectedCountMsg }}
        </sui-checkbox>
      </div>
    </div>
    <table class="table table-fixed">
      <thead>
        <tr>
          <th style="width:30px;" />
          <th style="width:60px">
            {{ $t('MSG_TXT_NUMBER_ROW') }}
          </th>
          <th style="width:100px">
            {{ $t('MSG_TXT_MDLE') }}
          </th>
          <th style="width:100px">
            {{ $t('MSG_TXT_SMDLE') }}
          </th>
          <th style="width:150px">
            {{ $t('MSG_TXT_PAGE_ID') }}
          </th>
          <th class="col-xs">
            {{ $t('MSG_TXT_PAGE_NM') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <draggable
          ref="pageDrag"
          :list="localdata0"
          :sort="false"
          ghost-class="ghost"
          draggable=".dragitem"
          @start="onDragStart($event)"
          @end="onDragEnd($event)"
        >
          <tr
            v-for="(item, index) in localdata0"
            :key="item.pageId"
            :class="{ dragitem: item.check }">
            <td style="width:30px;">
              <sui-checkbox
                :checked="item.check"
                :value="item.check"
                style="width:30px; margin-top:8px;"
                @input="onCheckBoxClick(index)"
              />
            </td>
            <td style="width:60px">
              {{ index+1 }}
            </td>
            <td style="width:100px">
              {{ item.moduleName }}
            </td>
            <td style="width:100px">
              {{ item.subModuleName }}
            </td>
            <td style="width:150px">
              {{ item.pageId }}
            </td>
            <td class="col-xs">
              {{ item.pageName }}
            </td>
          </tr>
        </draggable>
      </tbody>
    </table>
  </div>
</template>
<script>
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

import BasePage from '~cm/components/BasePage';
import { eventBus } from '../PGE_CMP_00009.vue';
import draggable from 'vuedraggable';

export default {
  name: 'PGE_CMP_00009_T01', // eslint-disable-line vue/name-property-casing
  components: {
    draggable,
  },
  extends: BasePage,
  props: {
  },
  data() {
    return {
      buff: [],
      dragging: false,
      frame0: {
        pageData: {
          COD_MDLE: {
            label: '',
            key: '',
          },
          COD_SMDLE: {
            label: '',
            key: '',
          },
          COD_PAGE_SEARCH_COND: {
            label: this.$t('MSG_TXT_ALL'),
            key: 'ALL',
          },
          searchTextPage: '',
        },
      },
      localdata0: [],
      selectedPageCount: 0,
      selectedCountMsg: '',
      readonlyMenu: false,
      searchFieldOldText: '',
    };
  },
  computed: {
    totalCntPage() {
      return utils.strFormat(this.$t('MSG_TXT_LST_CNT'), utils.size(this.localdata0));
    },
  },
  watch: {
    selectedPageCount(newData) {
      this.selectedCountMsg = utils.strFormat(this.$t('MSG_TXT_CHK_SELT'), this.selectedPageCount);
    },
  },
  created() {
    eventBus.$on('uncheckAllPages', this.uncheckAllPages);
  },
  mounted() {},
  beforeDestroy() {
    eventBus.$off('uncheckAllPages', this.uncheckAllPages);
  },
  methods: {
    onCheckBoxClick(idx) {
      const tmp = this.localdata0[idx];
      tmp.check = !tmp.check;
      tmp.menuTypeCode = 'P';
      this.localdata0.splice(idx, 1, tmp);
      this.selectedPageCount = utils.size(utils.filter(this.localdata0, { check: true }));
      this.$emit('itemChecked', {
        menuTypeCode: tmp.menuTypeCode,
        itemChecked: utils.filter(this.localdata0, { check: true }),
      });
    },
    onPageSearchClick() {
      this.$emit('itemChecked', {
        menuTypeCode: 'P',
        itemChecked: [],
      });

      const frm = this.frame0.pageData;
      const queryParams = {
        moduleCode: utils.trim(frm.COD_MDLE.key) || '',
        subModuleCode: utils.trim(frm.COD_SMDLE.key) || '',
        searchPageCond: utils.trim(frm.COD_PAGE_SEARCH_COND.key) || '',
        searchPageText: utils.toUpper(utils.trim(frm.searchTextPage)) || '',
      };
      http.request(this.contextPageId, 'DTS_CMU_00002', {
        query: queryParams,
      }).then(res => {
        this.localdata0 = res.data;
        // checkbox add
        utils.forEach(this.localdata0, item => {
          utils.assign(item, { check: false });
        });
        this.selectedPageCount = utils.size(utils.filter(this.localdata0, { check: true }));
      }).catch(error => {
        console.log(error);
      });
    },
    onResetPageSearchClick() {
      this.frame0.pageData.COD_MDLE.key = 'ALL';
      this.frame0.pageData.COD_SMDLE.key = 'ALL';
      this.$refs.comboSearchCond.reset();
      this.frame0.pageData.searchTextPage = '';
    },
    onDragStart(e) {
      if (this.readonlyMenu) return false;
      this.dragging = true;
      this.buff = utils.filter(this.localdata0, { check: true });
    },
    onDragEnd(e) {
      if (this.readonlyMenu) return false;
      this.dragging = false;
    },
    uncheckAllPages() {
      utils.forEach(this.localdata0, (item, index) => {
        const tmp = item;
        tmp.check = false;
        this.localdata0.splice(index, 1, tmp);
      });
      this.selectedPageCount = utils.size(utils.filter(this.localdata0, { check: true }));
    },
    // draggable
    // onDropPage() {
    //   this.$refs.pageDrag._sortable._onDrop();
    // },
    onKeyUpInput() {
      const searchFieldNewText = this.frame0.pageData.searchTextPage;

      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          this.conFirm('error', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
          this.frame0.pageData.searchTextPage = this.searchFieldOldText;
        } else {
          this.searchFieldOldText = searchFieldNewText;
        }
      }
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },

  },
};
</script>

<style scoped>
  .table-fixed tbody {
    height: 400px;
    border-bottom: 1px solid #ccc;
  }
  .table-fixed tr:hover {
    cursor: default;
  }
  .dragitem {
    background-color: #e9ecf7;
    cursor: move !important;
  }
</style>
