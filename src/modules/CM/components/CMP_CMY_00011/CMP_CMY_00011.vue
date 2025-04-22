<template>
  <div class="comm_scrInput_wrap">
    <div>
      <sui-text-field
        ref="inputField"
        v-model="bqmsCompany.connectionCompanyNumber"
        :maxlength="maxlength"
        :readonly="readonly"
        :placeholder="placeholder"
        :disabled="!buttonDisable"
        style="width:100%;"
        fixedIcon
      />
    </div>
    <sui-button
      v-show="buttonDisable"
      type="button"
      class="comm_btn_InputScr"
      @click="onSearchClick"
    />
  </div>
</template>
<script>
export default {
  name: 'bqms-vendor-select', // eslint-disable-line vue/name-property-casing
  props: {
    selected: {
      type: Object,
      default() {
        return {
          connectionCompanyNumber: '',
        };
      },
    },
    placeholder: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: true,
    },
    maxlength: {
      type: Number,
      default: 100,
    },
    buttonDisable: {
      type: Boolean,
      default: false,
    },

  },
  data() {
    return {
      bqmsCompany: this.selected,
    };
  },
  methods: {
    onSearchClick() {
      utils.openLayerPopup('PGE_CMY_00024', this.onPopupClose, {
        pageInitialData: {},
        size: 'xlg',
      });
    },
    onPopupClose(eprCode) {
      if (!utils.isEmpty(eprCode)) {
        this.bqmsCompany.connectionCompanyNumber = eprCode;
        this.$emit('selected', this.bqmsCompany);
      }
    },
    focus() {
      this.$refs.inputField.setFocus();
    },
    reset() {
      this.bqmsCompany.connectionCompanyNumber = '';
      this.$emit('selected', this.bqmsCompany);
    },
  },
};
</script>
<style scoped>
</style>
