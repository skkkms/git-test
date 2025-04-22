<template>
  <div>
    <div class="mrB20" />
    <div class="comm_title_wrap">
      <h4>{{ $t('MSG_TXT_STORE_DTLS') }}</h4>
    </div>
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_NM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldMobileApplicationName"
            v-model="objMobileAppStore.mobileApplicationName"
            maxlength="400"
            :disabled="!(flags.isDevelop || flags.isRejected || flags.isApproved || flags.isUnpublished)"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_EN_NM')"
            :required="true"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldMobileApplicationEnglishName"
            v-model="objMobileAppStore.mobileApplicationEnglishName"
            maxlength="400"
            :disabled="!(flags.isDevelop || flags.isRejected || flags.isApproved || flags.isUnpublished)"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_MNGR_EMAIL')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-text-field
            ref="textFieldMobileApplicationManagerEmail"
            v-model="objMobileAppStore.mobileApplicationManagerEmail"
            maxlength="100"
            :disabled="!(flags.isDevelop || flags.isRejected || flags.isApproved || flags.isUnpublished)"
          />
        </div>
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_CATG')"
          />
        </div>
        <div class="col-xs-5 ">
          <sui-custom-select
            ref="textFieldMobileApplicationCatagoryName"
            v-model="mobileApplicationCategory"
            :optionList="optionList"
            :disabled="true"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_SDESC')"
          />
        </div>
        <div class="col-xs-11 ">
          <sui-text-field
            class="text_area"
            ref="textFieldMobileApplicationshortDescriptionContent"
            v-model="objMobileAppStore.mobileApplicationshortDescriptionContent"
            maxlength="1000"
            :disabled="!(flags.isDevelop || flags.isRejected || flags.isApproved || flags.isUnpublished)"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1 ">
          <sui-input-label
            :label="$t('MSG_TXT_MBL_APP_DESC')"
          />
        </div>
        <div class="col-xs-11 ">
          <textarea
            class="text_area"
            ref="textFieldMobileApplicationDescriptionContent"
            v-model="objMobileAppStore.mobileApplicationDescriptionContent"
            maxlength="2000"
            :disabled="!(flags.isDevelop || flags.isRejected || flags.isApproved || flags.isUnpublished)"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_SCRN_SHOT')"
          />
        </div>
        <div class="col-xs-11">
          <cmp-image-attacher
            ref="fileAttacherAttachDocumentId"
            style="width:100%"
            :pageId="contextPageId"
            :attachDocumentId="attachDocumentId"
            :attachGroupId="'ATG_CMX_MBL_APP_STORE'"
            :disabled="!(flags.isDevelop || flags.isRejected || flags.isApproved || flags.isUnpublished)"
          />
        </div>
      </div>
    </div>    
    <div class="mrB30" />
    <div class="comm_btn_wrap">
      <sui-button
        v-if="flags.isPortalManager || flags.isApplicationManager"
        type="button"
        class="comm_btn_border"
        @click="onClickNew"
      >
        {{ $t("MSG_BTN_NEW") }}
      </sui-button>
      <sui-button
        v-if="(flags.isPortalManager || flags.isApplicationManager) && flags.followApprovalPath"
        type="button"
        class="comm_btn_border"
        :disabled="!(flags.isDevelop)"
        @click="onClickRequest"
      >
        {{ $t("MSG_BTN_RQS") }}
      </sui-button>
      <sui-button
        v-if="flags.isPortalManager && flags.followApprovalPath"
        type="button"
        class="comm_btn_border"
        :disabled="!(flags.isReview)"
        @click="onClickApprove"
      >
        {{ $t("MSG_TXT_APPR") }}
      </sui-button>
      <sui-button
        v-if="flags.followApprovalPath && flags.isPortalManager"
        type="button"
        class="comm_btn_border"
        :disabled="!(flags.isReview)"
        @click="onClickReject"
      >
        {{ $t("MSG_BTN_RJT") }}
      </sui-button>
      <sui-button
        v-if="flags.isPortalManager || flags.isApplicationManager"
        type="button"
        class="comm_btn_border"
        :disabled="!((flags.isApproved && flags.followApprovalPath) || (!flags.followApprovalPath && flags.isDevelop))"
        @click="onClickPublish"
      >
        {{ $t("MSG_BTN_PBLS") }}
      </sui-button>
      <sui-button
        v-if="flags.isPortalManager || flags.isApplicationManager"
        type="button"
        class="comm_btn_border"
        @click="onClickDelete"
      >
        {{ $t("MSG_BTN_DEL") }}
      </sui-button>
      <sui-button
        v-if="flags.isPortalManager || flags.isApplicationManager"
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
  name: 'PGE_CMX_00013_T02', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    selectedGridRowMobileAppMgmtData: {
      type: Object,
      required: false,
    },
    selectedGridRowMobileAppVersionData: {
      type: Object,
      required: false,
    },
    flags: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      isNew : true,
      attachDocumentId: '',
      objMobileAppStore: {
        mobileApplicationId: '',
        mobileApplicationVersionId: '',
        mobileApplicationName: '',
        mobileApplicationEnglishName: '',
        mobileApplicationManagerEmail: '',
        mobileApplicationshortDescriptionContent: '',
        mobileApplicationDescriptionContent: '',
        mobileApplicationImageAttachmentId: '',
        deleteYn: '',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        firstRegistrationProgramId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
        finalModificationProgramId: '',
      },
      mobileApplicationCategory: '',
    };
  },
  computed: {
    optionList() {
      if (!utils.isEmpty(this.selectedGridRowMobileAppMgmtData)) {
        const list = [];
        const obj = { key: '', label: '' };
        obj.key = this.selectedGridRowMobileAppMgmtData.mobileApplicationCategoryId;
        this.mobileApplicationCategory = this.selectedGridRowMobileAppMgmtData.mobileApplicationCategoryId;
        obj.label =  this.selectedGridRowMobileAppMgmtData.mobileApplicationCategoryName;
        list.push(obj);
        return list;
      }
      return [];
    }
  },
  watch: {
    // selectedGridRowMobileAppMgmtData(selectObj) {
    //   if (!utils.isEmpty(selectObj)) {
    //     this.mobileApplicationCategory[0].key = this.selectedGridRowMobileAppMgmtData.mobileApplicationCategoryId;
    //     this.mobileApplicationCategory[0].label = this.selectedGridRowMobileAppMgmtData.mobileApplicationCategoryName;
    //     //console.log(this.mobileApplicationCategory[0]);
    //   } else {
    //     this.resetTab();
    //   }
      //console.log('watch prop data');},
    
    selectedGridRowMobileAppVersionData(selectObj) {
      if (!utils.isEmpty(selectObj)) {
        this.loadMobileAppStore();
      } else {
        this.resetTab();
      }
    },
  },
  created() {
    this.customOptions = {
    };
  },  
  mounted() {
    this.$nextTick(() => {
      if (!utils.isEmpty(this.selectedGridRowMobileAppVersionData)) {
        this.loadMobileAppStore();
      }
    });
  },

  methods: {
    loadMobileAppStore() {
      if (!utils.isEmpty(this.selectedGridRowMobileAppVersionData)) {
        const mobileApplicationId = this.selectedGridRowMobileAppVersionData.mobileApplicationId;
        const mobileApplicationVersionId = this.selectedGridRowMobileAppVersionData.mobileApplicationVersionId;
        http.request(this.contextPageId, 'DTS_CMX_00046', {  
          query: {
            mobileApplicationId: mobileApplicationId,
            mobileApplicationVersionId: mobileApplicationVersionId,
          },
        }).then(res => {
          if (res.data <= 0) {
            this.resetTab();
          } 
          else {
            this.mobileApplicationCategoryName = this.selectedGridRowMobileAppMgmtData.mobileApplicationCategoryName;
            this.objMobileAppStore.mobileApplicationVersionId = this.selectedGridRowMobileAppVersionData.mobileApplicationVersionId;
            this.objMobileAppStore.mobileApplicationId = this.selectedGridRowMobileAppVersionData.mobileApplicationId;
            if( !utils.isEmpty(mobileApplicationId || !utils.isEmpty(mobileApplicationVersionId))) {
              http.request(this.contextPageId, 'DTS_CMX_00045', {  
                path: {
                  'mobile-application-id': mobileApplicationId,
                  'mobile-application-version-id': mobileApplicationVersionId,
                },
              }).then(res1 => {
                this.objMobileAppStore = res1.data;
                this.attachDocumentId = this.objMobileAppStore.mobileApplicationImageAttachmentId;
                this.isNew = false;
              });
            }
          }
        });
      }
    },
    resetTab() {
      this.objMobileAppStore.mobileApplicationId = '';
      this.objMobileAppStore.mobileApplicationVersionId = '';
      this.objMobileAppStore.mobileApplicationName = '';
      this.objMobileAppStore.mobileApplicationEnglishName = '';
      this.objMobileAppStore.mobileApplicationManagerEmail = '';
      this.objMobileAppStore.mobileApplicationshortDescriptionContent = '';
      this.objMobileAppStore.mobileApplicationDescriptionContent = '';
      this.objMobileAppStore.mobileApplicationImageAttachmentId = '';
      this.mobileApplicationCategoryName = '';
      this.attachDocumentId = '';
      this.isNew = true;
    },
    onClickNew() {
      this.resetTab();
      this.$emit('on-click-search');
    },
    onClickDelete() {
      this.$emit('on-click-delete');
    },
    onClickRequest() {
      this.$emit('on-click-request');
    },
    onClickApprove() {
      this.$emit('on-click-approve');
    },
    onClickReject() {
      this.$emit('on-click-reject');
    },
    onClickPublish() {
      this.$emit('on-click-publish');
    },
    saveAll() {
      if (utils.isEmpty(this.selectedGridRowMobileAppMgmtData)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }
      if (utils.isEmpty(this.selectedGridRowMobileAppVersionData)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }
      this.objMobileAppStore.mobileApplicationId = this.selectedGridRowMobileAppVersionData.mobileApplicationId;
      this.objMobileAppStore.mobileApplicationVersionId = this.selectedGridRowMobileAppVersionData.mobileApplicationVersionId;
    
      if (utils.isEmpty(this.objMobileAppStore.mobileApplicationName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_NM')), null, () => {
          this.$refs.textFieldMobileApplicationName.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objMobileAppStore.mobileApplicationEnglishName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MBL_APP_EN_NM')), null, () => {
          this.$refs.textFieldMobileApplicationEnglishName.setFocus();
        });
        return false;
      }
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        const dataServiceId = this.isNew ? 'DTS_CMX_00043' : 'DTS_CMX_00044';
        const mobileApplicationId = this.objMobileAppStore.mobileApplicationId;
        http.request(this.contextPageId, dataServiceId, {
          path: {
            'mobile-application-id': mobileApplicationId,
          },
          data: this.objMobileAppStore,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
          this.onClickNew();
        });
      });
      
    },
    onClickSave() {
      if (utils.isEmpty(this.selectedGridRowMobileAppMgmtData)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }
      if (utils.isEmpty(this.selectedGridRowMobileAppVersionData)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }
      console.log('test');
      console.log(this.$refs.fileAttacherAttachDocumentId.getImageList());
      console.log(this.attachDocumentId);
      const itemList = this.$refs.fileAttacherAttachDocumentId.getAttachGroupItemListInfo();
      let _attachFileList = [];
      itemList.forEach(itm => {
        if (itm.attachFileList && itm.attachFileList.length > 0) {
          _attachFileList = utils.concat(_attachFileList, itm.attachFileList);
        }
      });
      http.request(this.contextPageId, 'DTS_CMZ_00175', { 
        data: {
          attachDocumentId: this.attachDocumentId,
          attachGroupId: 'ATG_CMX_MBL_APP_STORE',
          attachItemId: 'ATG_CMX_MBL_APP_STORE_00001',
          attachDocumentTypeCode: 'N',
          moduleCode: 'CM',
          attachFileList: _attachFileList,
        },
      }).then(res => {
        console.log('success2');
        this.objMobileAppStore.mobileApplicationImageAttachmentId = res.data.attachDocumentId;
        this.attachDocumentId = res.data.attachDocumentId;
        console.log('success');
        this.saveAll();
        resolve(res);
      }).catch(err => {
        console.log(err);
      });      
    },
  },
};
</script>

<style scoped>
</style>
