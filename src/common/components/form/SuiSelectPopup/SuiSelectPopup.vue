<template>
  <div class="comm_scrInput_wrap">
    <sui-text-field
      v-model="displayText"
      style="width:100%;"
      fixedIcon
      :readonly="true"
    />
    <sui-button
      type="button"
      class="comm_btn_InputScr"
      @click="onClickPopup"
    />
  </div>
</template>

<script>

export default {
  name: 'SuiSelectionPopup',
  props: {
    value: {
      type: String,
      required: true,
    },
    pageId: { // 공통 선택팝업 페이지ID
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
      default: '',
    },
    popupSize: {
      type: String,
      required: false,
      default: 'xlg',
    },
    multiSelect: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      displayText: '',
    };
  },
  watch: {
    displayText(obj) {
      if (!obj) {
        this.$emit('input', '');
      }
    },
    value(obj) {
      if (!obj) {
        this.displayText = '';
      } else if (this.$store.getters.getCacheMap[obj]) {
        this.displayText = this.$store.getters.getCacheMap[obj];
      }
    },
  },
  mounted() {
    this.displayText = this.text;
  },
  created() {
  },
  methods: {
    setText(text) {
      this.displayText = text;
    },
    setData(data) {
      this.displayText = data.text;
      this.$store.commit('setCacheMap', { key: data.id, value: data.text });
    },
    onClickPopup() {
      // select application bagic pageId
      utils.openLayerPopup(this.pageId, rowData => {
        this.$emit('select', rowData);
      }, {
        pageInitialData: {
          multiSelect: this.multiSelect,
        },
        size: this.popupSize,
      });
    },

  },
};
</script>
