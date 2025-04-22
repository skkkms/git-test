<template>
  <div>
    <div class="mrB20" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_USR_ID')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldUserId"
            v-model="objMobileAppHomeScreenMgmt.userId"
            maxlength="100"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_ID')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldMobileApplicationId"
            v-model="objMobileAppHomeScreenMgmt.mobileApplicationId"
            maxlength="100"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_BNDL_ID')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldMobileApplicationModuleId"
            v-model="objMobileAppHomeScreenMgmt.mobileApplicationModuleId"
            maxlength="100"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_VER_ID')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldMobileApplicationVersionId"
            v-model="objMobileAppHomeScreenMgmt.mobileApplicationVersionId"
            maxlength="100"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_DSTN_URL')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldMobileApplicationDestinationUrl"
            v-model="objMobileAppHomeScreenMgmt.mobileApplicationDestinationUrl"
            maxlength="1000"
          />
        </div>
        <div class="col-xs-1 nodata">
        </div>
        <div class="col-xs-5 nodata">
        </div>
      </div>
    </div>    
    <div class="mrB30" />
    <div class="comm_btn_wrap">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onClickNew"
      >
        {{ $t("MSG_BTN_NEW") }}
      </sui-button>
      <sui-button
        v-permission:delete="contextPageId"
        type="button"
        class="comm_btn_border"
        @click="onClickDelete"
      >
        {{ $t("MSG_BTN_DEL") }}
      </sui-button>
      <sui-button
        v-permission:create="contextPageId"
        type="button"
        class="comm_btn_solid"
        @click="onClickSave"
      >
        {{ $t("MSG_BTN_SAVE") }}
      </sui-button>  
    </div>
  </div>
</template>

<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMX_00014_T01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    selectedGridRowData: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      isNew : true,
      objMobileAppHomeScreenMgmt: {
        userId: '',
        mobileApplicationId: '',
        mobileApplicationName: '',
        imageFilePath: '',
        mobileApplicationModuleId: '',
        mobileApplicationVersionId: '',
        mobileApplicationDestinationUrl: '',
      },
    };
  },
  computed: {},
  watch: {
    selectedGridRowData(selectObj) {
      if (!utils.isEmpty(selectObj)) {
        this.loadMobileAppHomeScreenMgmt();
      } else {
        this.resetTab();
      }
    },
  },
  created() {
    this.customOptions = {
    };
  },  
  mounted() {},

  methods: {
    loadMobileAppHomeScreenMgmt() {
      if(this.selectedGridRowData) {
        const userId = this.selectedGridRowData.userId;
        if(  !utils.isEmpty(userId)) {
          http.request(this.contextPageId, 'DTS_CMX_00057', {  
            path: {
              'user-id': userId,
            },
          }).then(res => {
            this.objMobileAppHomeScreenMgmt = res.data;
            this.isNew = false;
          });
        }
      }
    },
    resetTab() {
      this.objMobileAppHomeScreenMgmt.userId = '';
      this.objMobileAppHomeScreenMgmt.mobileApplicationId = '';
      this.objMobileAppHomeScreenMgmt.mobileApplicationName = '';
      this.objMobileAppHomeScreenMgmt.imageFilePath = '';
      this.objMobileAppHomeScreenMgmt.mobileApplicationModuleId = '';
      this.objMobileAppHomeScreenMgmt.mobileApplicationVersionId = '';
      this.objMobileAppHomeScreenMgmt.mobileApplicationDestinationUrl = '';    

      this.isNew = true;
    },
    onClickNew() {
      this.resetTab();
      this.$emit('onClearSelectionMainGrid');
    },
    onClickDelete() {
      
      const userId = this.objMobileAppHomeScreenMgmt.userId;    
      if(  !utils.isEmpty(userId)) {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_DEL'), null, () => {
          http.request(this.contextPageId, 'DTS_CMX_00058', {
            path: {
              'user-id': userId,
            },
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_DELETED'));
            this.$emit('onClickSearch');
            this.onClickNew();
          });
        });
      } else {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    onClickSave() {
      
      if (utils.isEmpty(this.objMobileAppHomeScreenMgmt.userId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_USR_ID')), null, () => {
          this.$refs.textFieldUserId.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objMobileAppHomeScreenMgmt.mobileApplicationId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_ID')), null, () => {
          this.$refs.textFieldMobileApplicationId.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objMobileAppHomeScreenMgmt.mobileApplicationModuleId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_BNDL_ID')), null, () => {
          this.$refs.textFieldMobileApplicationModuleId.setFocus();
        });
        return false;
      }
      
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        //const dataServiceId = this.isNew ? 'DTS_XXX_XXXXX' : 'DTS_XXX_XXXXX';
        http.request(this.contextPageId, (this.isNew ?'DTS_CMX_00060':'DTS_CMX_00059'), {
          data: this.objMobileAppHomeScreenMgmt,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
          this.$emit('onClickSearch');
          this.onClickNew();
        });
      });
    },
    
  },
};
</script>

<style scoped>
</style>
