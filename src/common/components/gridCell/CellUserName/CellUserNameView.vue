<template>
  <div class="-button">
    <button
      v-if="utilsTrim(knoxId) != '' || utilsTrim(userId) != '' || utilsTrim(loginId) != ''"
      :title="formattedUserName"
      :class="buttonClasses()"
      @click="onButtonClicked"
    >
      {{ formattedUserName }}
    </button>
    <span
      v-else
      :title="formattedUserName"
    >
      {{ formattedUserName }}
    </span>
  </div>
</template>

<script>
// import Vue from 'vue';
import store from '~system/vuex';

export default {
  name: 'CellUserName',
  props: {
    value: {
      type: String,
      default: '',
    },
    displayType: {
      type: String,
      default: '1',
    },
    type: {
      type: String,
      default: 'sublink',
    },
    handler: {
      type: Function,
      default: null,
    },
    datafieldMap: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      formattedUserName: '',
      formattedFullName: '',
      knoxId: '',
      userId: '',
      loginId: '',
    };
  },
  methods: {
    buttonClasses() {
      let retClass = '';
      if (utils.isEmpty(this.knoxId) && utils.isEmpty(this.userId) && utils.isEmpty(this.loginId)) {
        retClass = '';
      } else {
        retClass = '-button__item -button__item-sublink';
      }
      return retClass;
      /*
      if (this.type) {
        // return `-button__item-${this.type}`;
        return `-button__item-sublink`;
      }
      return '';
      */
    },
    utilsTrim(value) {
      return utils.trim(value);
    },
    /**
     * click event handler
     * 사용자가 handler를 지정했다면 UserNameButtonEditor 에서 이미 handler 실행을 하기 때문에
     * 여기에서는 이벤트만 발생시킴
     * 사용자가 handler를 지정하지 않았다면 사용자상세정보 팝업을 띄움
     * @function onButtonClicked
     */
    onButtonClicked() {
      if (!utils.isEmpty(this.formattedUserName)) {
        if (this.handler) {
          this.$emit('clicked', this.formattedUserName);
        } else if (!utils.isEmpty(this.knoxId) || !utils.isEmpty(this.userId) || !utils.isEmpty(this.loginId)) {
          utils.openLayerPopup('PGE_CMZ_00045', this.onPagePopupClose, {
            pageInitialData: {
              knoxId: this.knoxId,
              userId: this.userId,
              loginId: this.loginId,
              loginUserLandId: store.getters.userInfo.langId,
            },
            size: 'lg',
          });
        } else {
          console.log('knoxId 와 userId, loginId 값이 존재하지 않아서 사용자 정보를 조회할 수 없습니다.');
        }
      }
    },
    onPagePopupClose(result) {
      // console.log(result);
    },
    setValue(formattedUserName, formattedFullName, knoxId, userId, loginId) {
      this.formattedUserName = formattedUserName;
      this.formattedFullName = formattedFullName;
      this.knoxId = utils.trim(knoxId);
      this.userId = utils.trim(userId);
      this.loginId = utils.trim(loginId);
    },
  },
};
</script>

<style scoped>
</style>
