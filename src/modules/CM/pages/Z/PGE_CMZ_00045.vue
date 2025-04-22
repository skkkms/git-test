<template>
  <sui-page>
    <!-- Page Header -->
    <sui-page-header :pageId="this.$options.name" />

    <!-- Page Contents -->
    <sui-page-contents>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label :label="$t('MSG_TXT_USR_ID')" />
          </div>
          <div class="col-xs-4">
            <div class="comm_label">
              {{ this.getConfigValue('CFG_CMZ_USER_POPUP_USR_ID_TYPE') == 'KNOX'? userInfo.knoxId:userInfo.loginId }}
            </div>
          </div>
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_USR_NM')"
            />
          </div>
          <div class="col-xs-4">
            <div class="comm_label">
              {{ loginUserLandId == userInfo.dsplLngId ? userInfo.userName: userInfo.userGlobalName }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_CPNY_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-4">
            <div class="comm_label">
              {{ loginUserLandId == userInfo.dsplLngId ? userInfo.companyName: userInfo.companyEnglishName }}
            </div>
          </div>
          <div class="col-xs-2">
            <sui-input-label :label="$t('MSG_TXT_DEPT_NM')" />
          </div>
          <div class="col-xs-4">
            <div class="comm_label">
              {{ loginUserLandId == userInfo.dsplLngId ? userInfo.departmentName: userInfo.departmentEnglishName }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              label="Email"
              :vertical="false"
            />
          </div>
          <div class="col-xs-4">
            <div class="comm_label">
              {{ userInfo.email }}
            </div>
          </div>
          <div class="col-xs-2">
            <sui-input-label
              v-if="getConfigValue('CFG_CMZ_USER_POPUP_TELNO_YN') === 'Y'"
              :label="$t('MSG_TXT_TEL')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-4">
            <div
              v-if="getConfigValue('CFG_CMZ_USER_POPUP_TELNO_YN') === 'Y'"
              class="comm_label">
              {{ userInfo.cellphone }}
            </div>
          </div>
        </div>
      </div>
    </sui-page-contents>

    <!-- Page Footer -->
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onSelect"
        >
          {{ this.$t('MSG_BTN_CLOSE') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
export default {
  name: 'PGE_CMZ_00045', // eslint-disable-line vue/name-property-casing
  props: {
    closePagePopup: {
      type: Function,
      default() {
        return null;
      },
    },
    pageInitialData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      userInfo: {},
      loginUserLandId: this.pageInitialData.loginUserLandId,
    };
  },
  mounted() {
    if (this.pageInitialData.userId) {
      this.getUserInfoByUserId();
    } else if (this.pageInitialData.knoxId) {
      this.getUserInfo();
    }
  },
  methods: {
    getConfigValue(config) {
      return utils.getConfigurationValue(config);
    },
    getUserInfo() {
      const queryParams = {
        searchEmplCond: 2,
        searchCodEmplText: this.pageInitialData.knoxId,
      };

      http.request(this.$options.name, 'DTS_CMY_00002', {
        query: queryParams,
      }).then(res => {
        if ( res.data.length > 0) {
          this.userInfo = res.data[0];
        } else {
          let that = this;
          utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), this.$t('MSG_ALT_NO_SEARCH_USR'), () => {
            that.cancel();
          });
        }
      }).catch(error => {
        console.log(error);
      });
    },
    getUserInfoByUserId() {
      const queryParams = {
        userId: this.pageInitialData.userId,
      };

      // /api/v1/common/users/user-id
      http.request(this.$options.name, 'DTS_CMZ_00148', {
        query: queryParams,
      }).then(res => {
        if (!utils.isEmpty(res.data)) {
          this.userInfo = res.data;
        } else {
          let that = this;
          utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), this.$t('MSG_ALT_NO_SEARCH_USR'), () => {
            that.cancel();
          });
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 취소
    onCancel() {
      this.cancel();
    },
    onSelect() {
      this.closePagePopup('');
    },
    // 취소
    cancel() {
      this.closePagePopup('');
    },
  },
};
</script>
<style scoped>
</style>