<template>
  <div class="comm_scrInput_wrap">
    <div>
      <sui-text-field
        v-show="!focused"
        ref="userInfo"
        :value="displayName"
        style="width:100%;"
        :readonly="readonly"
        fixedIcon
        :maxlength="maxlength"
        :placeholder="placeholder"
        @focus="onDisplayNameFocus"
        @clear-input="reset"
      />
      <sui-text-field
        v-show="focused"
        ref="inputField"
        v-model="editName"
        style="width:100%;"
        :readonly="readonly"
        fixedIcon
        :maxlength="maxlength"
        :placeholder="placeholder"
        @blur="onInputBlur"
        @keyup.enter="onUserClick"
        @clear-input="resetEditName"
      />
    </div>
    <sui-button
      type="button"
      class="comm_btn_InputScr"
      @click="onUserClick"
    />
  </div>
</template>
<script>

/* eslint max-len: ["error", { "code": 200 }] */
export default {
  name: 'CmpUserSelect',
  props: {
    selectedUser: {
      type: Object,
      default: null,
    },
    placeholder: {
      type: String,
      default() {
        return '';
      },
    },
    readonly: {
      type: Boolean,
      default() {
        return false;
      },
    },
    checkboxMode: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: String,
      default: '100',
    },
    emailUser: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      user: this.selectedUser,
      mode: this.checkboxMode,
      email: this.emailUser,
      editName: this.selectedUser ? this.selectedUser.userName : '',
      focused: false,
      opened: false,
    };
  },
  computed: {
    displayName() {
      // if (this.selectedUser && this.selectedUser.userName) {
      if (this.user && this.user.userName) {
        if (this.email) {
          this.resetDisplayName();
          return '';
        }
        if (this.user.dsplLngId === this.$store.getters.userInfo.langId) {
          return `${this.user.userName}/${this.user.departmentName}`;
        }
        return `${this.user.userGlobalName}/${this.user.departmentEnglishName}`;
      }
      this.resetDisplayName();
      return '';
    },
  },
  methods: {
    onUserClick() {
      const userPopupMode = this.checkboxMode;
      const iptUserName = this.editName;

      this.opened = true;
      utils.openLayerPopup('PGE_CMY_00001', this.onUserPopupCallback, {
        // pageInitialData: { iptUserName: iptUserName, userPopupMode: userPopupMode },
        pageInitialData: { iptUserName, userPopupMode },
        size: 'lg',
      });
    },
    onUserPopupCallback(nodeData) {
      // console.log(this.$store.getters.userInfo);

      if (nodeData && nodeData.length === 1) {
        const selected = nodeData[0];
        const user = {
          userName: selected.userName,
          userGlobalName: selected.userGlobalName,
          epId: selected.userId,
          siteName: selected.siteName,
          employeeIDNumber: selected.employeeIDNumber,
          companyName: selected.companyName,
          companyEnglishName: selected.companyEnglishName,
          departmentName: selected.departmentName,
          departmentEnglishName: selected.departmentEnglishName,
          departmentId: selected.departmentId,
          careerLevelCode: selected.careerLevelCode,
          careerLevelName: selected.careerLevelName,
          careerLevelEnName: selected.careerLevelEnName,
          knoxId: selected.knoxId,
          servedStateCode: selected.servedStateCode,
          userId: selected.userId,
          email: selected.email,
          dsplLngId: selected.dsplLngId,
        };
        this.setValue(user);
        this.$emit('selected', this.user);
      }
      this.opened = false;

      if (utils.isExistSpecialChar(this.editName)) {
        this.editName = '';
      }
    },
    setValue(user) {
      this.focused = false;
      if (user === null) {
        this.user = {
          userName: '',
          userGlobalName: '',
          epId: '',
          siteName: '',
          employeeIDNumber: '',
          companyName: '',
          companyEnglishName: '',
          departmentName: '',
          departmentEnglishName: '',
          departmentId: '',
          careerLevelCode: '',
          careerLevelName: '',
          careerLevelEnName: '',
          knoxId: '',
          servedStateCode: '',
          userId: '',
          email: '',
          dsplLngId: '',
        };
      } else {
        this.user = user;
      }
    },
    getValue() {
      return this.user;
    },
    onDisplayNameFocus() {
      this.focused = true;
      if (this.user) {
        this.editName = this.user.userName;
      } else {
        this.editName = '';
      }
      this.$nextTick(() => { this.$refs.inputField.setFocus(); });
    },
    onInputBlur() {
      // this.focused = false;
    },
    isPopupOpened() {
      return this.opened;
    },
    reset() {
      this.setValue('');
      this.$emit('selected', this.user);
    },
    resetDisplayName() {
      this.setValue(null);
      this.editName = '';
    },
    resetEditName() {
      this.editName = '';
    },
  },
};
</script>
<style scoped>
</style>
