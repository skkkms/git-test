<template>
  <div
    v-if="!editable"
    class="-grid-cell-component"
  >
    <div class="-grid-cell-component__textfield-container">
      <sui-text-field
        ref="userName"
        :value="displayName"
        :showTooltip="true"
        :readonly="true"
        :placeholder="placeholder"
        style="width:100%;"
      />
    </div>
  </div>
  <div
    v-else
    class="comm_scrInput_wrap"
  >
    <div>
      <sui-text-field
        v-show="!focused"
        ref="userName"
        :value="displayName"
        :disabled="disabled"
        :placeholder="placeholder"
        style="width:100%;"
        @keyup.enter="onUserClick"
        @focus="onDisplayNameFocus"
        @clear-input="reset"
      />
      <sui-text-field
        v-show="focused"
        ref="inputField"
        v-model="searchName"
        style="width:100%;"
        :readonly="readonly"
        :disabled="disabled"
        :maxlength="maxlength"
        :placeholder="placeholder"
        @blur="onInputBlur"
        @keyup.enter="onUserClick"
      />
    </div>
    <sui-button
      type="button"
      class="comm_btn_InputScr"
      :disabled="buttonDisabled"
      @click="onUserClick"
    />
  </div>
</template>
<script>
// import BaseComponent from '../../../../common/components/GridCellComponents/CellComponentBase';
import BaseComponent from '~common/components/gridCell/GridCellComponentBase';

export default {
  name: 'CmpUserGridSelect',
  extends: BaseComponent,
  props: {
    selectedUser: {
      type: Array,
      default() {
        return [{
          siteName: '',
          employeeIDNumber: '',
          userName: '',
          companyName: '',
          departmentName: '',
          knoxId: '',
          servedStateCode: '',
          userId: '',
          epid: '',
          email: '',
        }];
      },
    },
    maxlength: {
      type: String,
      default: '100',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    buttonDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      user: this.selectedUser,
      searchName: '',
      focused: false,
    };
  },
  computed: {
    userIdList() {
      return utils.map(this.user, 'userId');
    },
    displayName() {
      const [first] = this.user;
      if (!utils.isEmpty(first) && !utils.isEmpty(first.userName)) {
        return utils.join(utils.map(this.user, 'userName'), ', ');
      }
      return '';
    },
  },
  methods: {
    onUserClick() {
      const { userIdList, searchName } = this;
      utils.openLayerPopup('PGE_CMY_00006', this.onUserPopupCallback, {
        pageInitialData: { userIdList, searchName },
        size: 'xlg',
      });
    },
    onUserPopupCallback(nodeData) {
      if (nodeData) {
        this.user = nodeData;
        this.searchName = '';

        this.$emit('selected', this.user);
      }
    },
    reset() {
      this.user = [];
      this.$emit('selected', this.user);
    },
    setValue(user) {
      this.user = user;
    },
    getValue() {
      return this.user;
    },
    onDisplayNameFocus() {
      this.focused = true;
      this.searchName = '';
      this.$nextTick(() => { this.$refs.inputField.setFocus(); });
    },
    onInputBlur() {
      this.focused = false;
    },
    setFocus() {
      this.onDisplayNameFocus();
    },
  },
};
</script>
<style scoped>
</style>
