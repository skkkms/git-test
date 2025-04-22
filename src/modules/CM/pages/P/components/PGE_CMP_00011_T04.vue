<template>
  <div>
    <div class="mrB20" />
    <div class="comm_scr_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_SEARCH_COND')" :required="false" :vertical="false" />
        </div>
        <div class="col-xs-11">
          <sui-code-select
            ref="codeSelectSearchCondition"
            v-model="queryData.searchCondition"
            :pagedId="contextPageId"
            codeId="COD_LINK_SEARCH_COND"
            :defaultOption="'all'"
          />
          <div class="comp_spacing"></div>
          <sui-text-field
            ref="searchWord"
            v-model="queryData.searchWord"
            @keyup.enter="onClickSearchLink"
            @keyup="onKeyUpInput"
          />
        </div>
      </div>
      <div class="btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_Reset"
          @click="onClickResetLink"
        >
          {{ $t('MSG_BTN_RESET') }}
        </sui-button>
        <sui-button
          v-permission:read="contextPageId"
          type="button"
          class="comm_btn_Scr"
          @click="onClickSearchLink"
        >
          {{ $t('MSG_BTN_SEARCH') }}
        </sui-button>
      </div>
    </div>
    <div class="mrB30"></div>
    <div class="comm_gridTop_wrap">
      <div class="btn_wrapL" style="height:24px;">
        <div class="totalList" v-show="selectedCount === 0">{{ totalCntPage }}</div>
        <sui-checkbox v-show="selectedCount" :checked="true" :disabled="false" class="num">{{ selectedCountMsg }}</sui-checkbox>
      </div>
    </div>
    <table class="table table-fixed">
      <thead>
      <tr>
        <th style="width:30px;" />
        <th style="width:60px"> {{ $t('MSG_TXT_NUMBER_ROW') }} </th>
        <th class="col-xs"> {{ $t('MSG_TXT_LINK_NM') }} </th>
        <th class="col-xs"> {{ $t('MSG_TXT_LINK_URL') }} </th>
      </tr>
      </thead>
      <tbody>
      <draggable
        ref="linkDrag"
        :list="dsLink"
        :sort="false"
        ghost-class="ghost"
        draggable=".dragitem"
        @start="onDragStart($event)"
        @end="onDragEnd($event)"
      >
        <tr v-for="(item, index) in dsLink" :key="item.linkUid" :class="{ dragitem: item.check }">
          <td style="width:30px;">
            <sui-checkbox
              :checked="item.check"
              :value="item.check"
              style="width:30px; margin-top:8px;"
              @input="onCheckBoxClick(index)"
            />
          </td>
          <td style="width:60px"> {{ index+1 }} </td>
          <td class="col-xs"> {{ item.linkName }} </td>
          <td class="col-xs"> {{ item.linkUrl }} </td>
        </tr>
      </draggable>
      </tbody>
    </table>
  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import {eventBus} from './PGE_CMP_00011_P02.vue'
import draggable from 'vuedraggable';

export default {
  name: 'PGE_CMP_00011_T04', // eslint-disable-line vue/name-property-casing
  components: {
    draggable,
  },
  extends: BasePage,
  props: {},
  data() {
    return {
      buff: [],
      dragging: false,
      queryData: {
        searchCondition: '',
        searchWord: '',
      },
      dsLink: [],
      selectedCount: 0,
      selectedCountMsg: '',
      readonlyMenu: false,
      searchFieldOldText: '',
    };
  },
  computed: {
    totalCntPage() {
      return utils.strFormat(this.$t('MSG_TXT_LST_CNT'), utils.size(this.dsLink));
    },
  },
  watch: {
    selectedCount(newData) {
      this.selectedCountMsg = utils.strFormat(this.$t('MSG_TXT_CHK_SELT'), this.selectedCount);
    },
  },
  created() {
    eventBus.$on('uncheckAllLinks', this.uncheckAllLinks);
  },  
  mounted() {},
  beforeDestroy() {
    eventBus.$off('uncheckAllLinks', this.uncheckAllLinks);
  },
  methods: {
    onCheckBoxClick(idx) {
      const tmp = this.dsLink[idx];
      tmp.check = !tmp.check;
      tmp.menuTypeCode = 'L';
      this.dsLink.splice(idx, 1, tmp);
      this.selectedCount = utils.size(utils.filter(this.dsLink, { check: true }));
      this.$emit('itemChecked', this.dsLink);
    },
    onClickSearchLink() {
      const dataParams = {
        linkStateCode: '',
        linkUseYn: 'Y',
        searchCondition: this.queryData.searchCondition,
        searchWord: this.queryData.searchWord,
        deviceTypeBit: 0,
      };
      http.request(this.contextPageId, 'DTS_CMP_00109', {
        query: dataParams,
      }).then(res => {
        this.dsLink = res.data;
        // checkbox add
        utils.forEach(this.dsLink, item => {
          utils.assign(item, { check: false });
        });
        this.selectedCount = utils.size(utils.filter(this.dsLink, { check: true }));
      }).catch(error => {
        console.log(error);
      });
    },
    onClickResetLink() {
      this.$refs.codeSelectSearchCondition.reset();
      this.queryData.searchWord = '';
    },
    onDragStart(e) {
      if (this.readonlyMenu) return false;
      this.dragging = true;
      this.buff = utils.filter(this.dsLink, { check: true });
    },
    onDragEnd(e) {
      if (this.readonlyMenu) return false;
      this.dragging = false;
    },
    uncheckAllLinks() {
      utils.forEach(this.dsLink, (item, index) => {
        const tmp = item;
        tmp.check = false;
        this.dsLink.splice(index, 1, tmp);
      });
      this.selectedCount = utils.size(utils.filter(this.dsLink, { check: true }));
    },
    onKeyUpInput() {
      const searchFieldNewText = this.queryData.searchWord;

      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          this.conFirm('error', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
          this.queryData.searchWord = this.searchFieldOldText;
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
