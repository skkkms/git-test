<template>
  <div>
    <sui-button
      v-if="utilsTrim(knoxId) != '' || utilsTrim(userId) != '' || utilsTrim(loginId) != ''"
      :title="computedLabel"
      type="button"
      :class="[type == 'link' ? 'btn_txt_BL':'btn_txt_BL_line']"
      @click.self="onButtonClicked"
    >
      {{ computedLabel }}
    </sui-button>
    <span
      v-else
      :title="computedLabel"
    >
      {{ computedLabel }}
    </span>
  </div>
</template>
<script>
export default {
  name: 'CmpUserNameLink',
  props: {
    pageId: {
      type: String,
      default: '',
    },
    displayType: {
      type: String,
      default: '1',
    },
    displayLanguageId: {
      type: String,
      default: '',
    },
    loginId: {
      type: String,
      default: '',
    },
    knoxId: {
      type: String,
      default: '',
    },
    userId: {
      type: String,
      default: '',
    },
    userName: {
      type: String,
      default: '',
    },
    userGlobalName: {
      type: String,
      default: '',
    },
    departmentName: {
      type: String,
      default: '',
    },
    departmentEnglishName: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'link',
    },
    clickHandler: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      computedTitle: 'hello',
    };
  },
  computed: {
    computedLabel() {
      let _userName = '';
      let _deptName = '';
      const _arr = [];

      if (this.$store.getters.userInfo.langId === this.displayLanguageId) {
        _userName = this.userName || '';
        _deptName = this.departmentName || '';
      } else {
        _userName = this.userGlobalName || '';
        _deptName = this.departmentEnglishName || '';
      }

      if (_userName) {
        _arr.push(_userName);
      }

      // if (utils.getConfigurationValue('CFG_CMZ_USER_POPUP_USR_ID_TYPE') === 'KNOX') {
      //   if (this.knoxId) {
      //     _arr.push(this.knoxId);
      //   }
      // } else if (this.loginId && !utils.isEmpty(this.loginId)) {
      //   _arr.push(this.loginId);
      // } else if (this.userId && !utils.isEmpty(this.userId)) {
      //   _arr.push(this.userId);
      // }


      switch (this.displayType) {
        case '1':
          break;
        case '2':
          if (_deptName) {
            _arr.push(_deptName);
          }
          break;
        case '3':
          break;
        default:
      }
      return _arr.join(' / ');
    },
  },
  methods: {
    utilsTrim(value) {
      return utils.trim(value);
    },
    onButtonClicked(e) {
      this.$emit('clickclicked', e.eventPhase);
      if (this.clickHandler) {
        this.clickHandler({
          displayLanguageId: this.displayLanguageId,
          knoxId: this.knoxId,
          userName: this.userName,
          userGlobalName: this.userGlobalName,
          departmentName: this.departmentName,
          departmentEnglishName: this.departmentEnglishName,
        });
      } else {
        const that = this;
        utils.openLayerPopup('PGE_CMZ_00045', that.onPagePopupClose, {
          pageInitialData: {
            knoxId: that.knoxId,
            userId: that.userId,
            loginId: that.loginId,
            loginUserLandId: that.$store.getters.userInfo.langId,
          },
          size: 'lg',
        });
      }
    },
  },
};
</script>
<style scoped>

</style>
