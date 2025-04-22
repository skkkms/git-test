<template>
  <div>
    <div class="comm_popup_wrap_small">
      <sui-s-grid
        ref="grid"
        :headers="gridColumns0"
        :data-source="ds0"
        :options="options"
        :showRowsPerPageControl= false
      />

      <div class="comm_btn_wrap mrB30">
        <sui-button
          v-permission:read="pageId"
          type="button"
          class="comm_btn_solid"
          @click="onConfirmClick"
        >
          {{ $t('MSG_BTN_CFRM') }}
        </sui-button>
      </div>
    </div>
  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import {urDataSet} from 'uidev-component/index.js';

export default {
  name: 'PGE_CMZ_00029_P01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: '',
    },
    todoDetail: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      ds0: new urDataSet(),
      options: {
        height: 360,
      },

      localdata0: [],
      gridColumns0: [{
        text: this.$t('MSG_TXT_ITEM'),
        value: 'item',
      }, {
        text: this.$t('MSG_TXT_TITLE'),
        value: 'todoDetailTitle',
      }, {
        text: this.$t('MSG_TXT_CNFG_VAL'),
        value: 'todoDetailContent',
      }],
    };
  },
  computed: {
    detailList() {
      return this.todoDetail;
    },
  },
  watch: {},
  mounted() {
    this.setDataset();
  },

  methods: {
    setDataset() {
      if (!utils.isEmpty(this.detailList)) {
        utils.forEach(this.detailList, (data, index) => {
          utils.set(data, 'item', this.$t(`MSG_TXT_TODO_CNTN_${index + 1}`));
        });

        this.ds0.setData(utils.clone(this.detailList));
      }
    },
    onConfirmClick() {
      this.$emit('onCloseClick');
    },
  },
};
</script>
<style scoped>
</style>
