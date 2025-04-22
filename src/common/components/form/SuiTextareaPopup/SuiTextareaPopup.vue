<template>
  <sui-page>
    <sui-page-contents>
    <sui-textarea class="cell-text-area-popup" v-model="inputValue" :readonly="readonly" :maxlength="maxlength" />
    <!-- <div class="cell-text-area-popup__readonly" v-show="readonly"> {{inputValue}} </div> -->
    </sui-page-contents>
    <sui-page-footer>      
      <div class="comm_btn_wrap">
        <button v-if="!readonly"
            type="button"
            class="comm_btn_border"
            @click="onCancel"
          >
            {{ negativeButtonText }}
        </button>
        <button
          type="button"
          class="comm_btn_solid"
          @click="onOk"
        >
          {{ positiveButtonText }}
        </button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>

<script>
export default {
  props: {
    pageInitialData: { type: Object, default() { return {} } },
    closePagePopup: { type: Function },
  },
  data() {
    return {      
      inputValue: this.pageInitialData.value? this.pageInitialData.value : '',
      readonly: this.pageInitialData.readonly,
      positiveButtonText: this.pageInitialData.positiveButtonText? this.pageInitialData.positiveButtonText : this.$t('MSG_TXT_YES'),
      negativeButtonText: this.pageInitialData.negativeButtonText? this.pageInitialData.negativeButtonText : this.$t('MSG_TXT_NO'),
      maxlength: this.pageInitialData.maxlength? this.pageInitialData.maxlength : 500,
    };
  },  
  mounted() {    
  },
  methods: {
    setValue(value) {    
    },
    refresh() {    
    },
    onCancel() {
      this.closePagePopup(null);
    },
    onOk() {
      this.closePagePopup(this.inputValue);
    }
  },
};
</script>

<style scoped>
/* .cell-text-area-popup {
  width: 100%;
  height:300px;
  overflow:auto
}

.cell-text-area-popup__readonly {
  border: 1px solid #ccc;
  padding: 20px;
  width: 100%;
  height: 564px;
  overflow-wrap: break-word;
  overflow-y: auto;
  white-space: pre;
} */
</style>
