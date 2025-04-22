<template>
  <div>
    <div
      class="comm_popup_wrap_large"
      style="overflow: hidden"
    >
      <div class="mrB10" />
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DOM_CLSF_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-3">
            <sui-text-field
              v-model="domainClass"
              maxlength="100"
              placeholder
              name="wordName"
              @keyup.enter="searchWord"
            />
          </div>
          <div class="btn_wrap">
            <sui-button
              v-permission:read="'PGE_DST_00001'"
              type="button"
              class="comm_btn_Reset"
              @click="onReset()"
            >
              {{$t('MSG_BTN_RESET')}}
            </sui-button>
            <sui-button
              v-permission:read="'PGE_DST_00001'"
              type="button"
              class="comm_btn_Scr"
              @click="searchWord()"
            >
              {{ $t('MSG_BTN_SEARCH') }}
            </sui-button>
          </div>
        </div>
      </div>
      <div class="comm_title_wrap" />
      <div class="comm_gridTop_wrap" />
      <div class="inbox">
        <ur-tree-grid
          ref="grid"
          :headers="treeGridColumns01"
          :data-source="dataset0"
          :showRowsPerPageControl="false"
          :options="options"
          @grid:selected="rowClick"
        />
      </div>
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button type="button" class="comm_btn_border" v-permission:read="'PGE_DST_00001'" @click="onCancel">{{$t('MSG_BTN_CANCEL')}}</sui-button>
      <sui-button type="button" class="comm_btn_solid" v-permission:read="'PGE_DST_00001'" @click="onSelect">{{$t('MSG_BTN_SELT')}}</sui-button>
    </div>
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index.js';

export default {
  name: "PGE_DST_00001_P05", // eslint-disable-line vue/name-property-casing
  props: {
    pageId: {
      type: String,
      default: "PGE_DST_00001"
    },
    biddingInformationParam: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      selectedDomClassId: '',
      selectedDomClassName: '',
      selectedWordId: '',
      domainClass: '',
      dataset0: new urDataSet(),
      treeGridColumns01: [
        {
          text: this.$t('MSG_TXT_DOM_CLSF_ID'),
          value: 'domainClassificationID',
          width: 425,
        },
        {
          text: this.$t('MSG_TXT_DOM_CLSF_NM'),
          value: 'domainClassificationName',
          width: 425,
        },
      ],
      options: {
        infinityScroll: true,
        noInfo: true,
        resizableColumn: true,
      },
      stateData: [],
    };
  },
  mounted() {
    this.searchWord();
  },
  beforeDestroy() {},
  methods: {
    rowClick(event) {
      this.selectedDomClassId = event.domainClassificationID;
      this.selectedDomClassName = event.domainClassificationName;
      this.selectedWordId = event.wordId;
    },
    onReset() {
      this.domainClass = '';
    },
    onSelect() {
      if (this.selectedDomClassId !== '') {
        const dataToEmit = {
          domainClassificationName: this.selectedDomClassName,
          domainClassId: this.selectedDomClassId,
          wordId: this.selectedWordId,
        };
        this.$emit("wordPopulate", dataToEmit);
        this.onPopupCancelClicked();
      }
    },
    searchWord() {
      let queryParams;
      if (this.domainClass) {
        queryParams = { domainClassificationName: this.domainClass };
      }
      http
        .request("PGE_DST_00001", "DTS_DST_00046", { query: queryParams })
        .then(res => {
          const flatData = res.data;
          utils.forEach(flatData, item => {
            const objItem = item;
            objItem.id = item.domainClassificationID;
          });
          utils.forEach(flatData, item => {
            if (item.upperDomainClassificationID !== null) {
              const objItem = item;
              objItem.pId = item.upperDomainClassificationID;
            }
          });
          this.$refs.grid.setData(flatData, { dataType: 'json', id: 'id', parentField: 'pId' });
          this.$refs.grid.collapseAll();
        })
        .catch(error => {});
    },
    onClickSelectWord() {},
    onPopupCancelClicked() {
      this.$emit("exit", true);
    },
    onCancel() {
      this.$emit("exit", true);
    },
  },
};
</script>

<style scoped>
</style>
