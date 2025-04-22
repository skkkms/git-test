<template>
  <div>
    <div class="comm_popup_wrap_medium">
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-2 ">
            <sui-input-label
              :label="$t('MSG_TXT_MBL_APP_ID')"
              :required="true"
            />
          </div>
          <div class="col-xs-10 ">
            <sui-input-label
              :label="mobileApplicationVersionRevisionDetails.mobileApplicationId"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2 ">
            <sui-input-label
              :label="$t('MSG_TXT_MBL_APP_VER_ID')"
              :required="true"
            />
          </div>
          <div class="col-xs-10 ">
            <sui-input-label
              :label="mobileApplicationVersionRevisionDetails.mobileApplicationVersionId"
            />
          </div>
          <div class="col-xs-2 ">
            <sui-input-label
              :label="$t('MSG_TXT_MBL_APP_VER_NM')"
              :required="true"
            />
          </div>
          <div class="col-xs-10 ">
            <sui-input-label
              :label="mobileApplicationVersionRevisionDetails.mobileApplicationVersionName"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2 ">
            <sui-input-label
              :label="$t('MSG_TXT_USR_ACTN')"
              :required="true"
            />
          </div>
          <div class="col-xs-10 ">
            <sui-input-label
              :label="mobileApplicationVersionRevisionDetails.userAction"
            />
          </div>
          <div class="col-xs-2 ">
            <sui-input-label
              :label="$t('MSG_TXT_USR_ACTN_CNTN')"
            />
          </div>
          <div class="col-xs-10 ">
            <textarea
              v-model="mobileApplicationVersionRevisionDetails.userActionContent"
              maxlength="10000"
            />
          </div>
        </div>
      </div>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onClickSave"
        >
          {{ $t("MSG_BTN_SAVE") }}
        </sui-button>
      </div>
    </div>
  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import draggable from 'vuedraggable';

export default {
  name: 'PGE_CMX_00013_P02', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  components: {
    draggable,
  },
  props: {  
    revisionHistoryUid: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      mobileApplicationVersionRevisionDetails: '',
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.onLoad();
    });
  },
  methods: {
    onLoad() {
      if (utils.isEmpty(this.revisionHistoryUid)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return;
      }
      http.request(this.contextPageId, 'DTS_CMX_00054', {
        path: {
            'revision-history-uid': this.revisionHistoryUid,
          },
      }).then(res => {
        this.mobileApplicationVersionRevisionDetails = res.data;
      });
    },
    onClickSave() {
      if (utils.isEmpty(this.revisionHistoryUid)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return;
      }
      const finalDetails = this.mobileApplicationVersionRevisionDetails;
      http.request(this.contextPageId, 'DTS_CMX_00056', {
        data: finalDetails,
      }).then(() => {
        utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
        this.$emit('close-pop-up');
      });
    },
  },
};
</script>

<style scoped>
</style>
