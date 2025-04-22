<template>
  <div>
    <div class="mrB20" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_DEPT_ID')"
            required
          />
        </div>
        <div class="col-xs-10">
          <sui-text-field
            v-model="frame0.frms.departmentId"
            :disabled="true"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_UPP_DEPT_ID')"
            required
          />
        </div>
        <div class="col-xs-10">
          <sui-text-field
            v-model="frame0.frms.upDepartmentId"
            :disabled="true"
          />
        </div>
      </div>      
      <div class="row">
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_DEPT_NM')"
            required
          />
        </div>
        <div class="col-xs-10">
          <sui-text-field
            v-model="frame0.frms.departmentName"
            maxlength="100"
            :trim="true"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_DEPT_EN_NM')"
            required
          />
        </div>
        <div class="col-xs-10">
          <sui-text-field
            v-model="frame0.frms.departmentEnglishName"
            maxlength="100"
            :trim="true"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_USE_YN')"
          />
        </div>
        <div class="col-xs-10">
          <sui-radio
            v-model="frame0.frms.infoUseYn"
            value="Y"
          >
            Yes
          </sui-radio>
          <sui-radio
            v-model="frame0.frms.infoUseYn"
            value="N"
          >
            No
          </sui-radio>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_ARRAY_ORDER')"
            required
          />
        </div>
        <div class="col-xs-10">
          <sui-text-field
            v-model="frame0.frms.departmentOrder"
            :disabled="false"
            :readonly="false"
            maxlength="4"
            mask="number"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_HOTD_USR_ID')"
          />
        </div>
        <div class="col-xs-10">
          <sui-text-field
            v-model="frame0.frms.headOfDepartmentUserId"
            maxlength="20"
            :trim="true"
          />
        </div>
      </div>
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:update="'PGE_CMY_00051'"
          type="button"
          class="comm_btn_solid"
          :disabled="disableSaveButton"
          @click="onSave"
        >
          {{ $t("MSG_BTN_SAVE") }}
        </sui-button>
      </div>
    </div>
  </div>
</template>

<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMY_00051_T01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: null,
    },
    selectedTreeData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      frame0: {
        frms: {
          departmentId: '',
          upDepartmentId: '',
          departmentName: '',
          oldDepartmentName: '',
          departmentEnglishName: '',
          departmentOrder: '',
          headOfDepartmentUserId: '',
          infoUseYn: 'Y',
          departmentLevel: '',
        },
      },
    };
  },

  computed: {
    disableSaveButton() {
      const id = this.frame0.frms.departmentId;
      if (id.length === 0) {
        return true;
      }
      return false;
    },
  },

  watch: {
    selectedTreeData(selectObj) {
      if (selectObj) {
        const frm = this.frame0.frms;
        frm.departmentId = selectObj.departmentId;
        frm.upDepartmentId = selectObj.upDepartmentId;
        frm.infoUseYn = selectObj.infoUseYn;
        frm.departmentOrder = utils.toCharNum(selectObj.departmentOrder);
        frm.departmentName = selectObj.departmentName;
        frm.oldDepartmentName = selectObj.departmentName;
        frm.departmentEnglishName = selectObj.departmentEnglishName;
        frm.headOfDepartmentUserId = selectObj.headOfDepartmentUserId;
        frm.departmentLevel = utils.toCharNum(selectObj.departmentLevel);
        this.saveSnapshot(this.makeSnapshot());
      }
    },
  },

  methods: {
    makeSnapshot() {
      return utils.assign({}, this.frame0.frms);
    },

    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
    onSave() {
      

      if (utils.isEmpty(utils.trim(this.frame0.frms.departmentId)) === true) {
        this.conFirm('error', utils.strFormat(this.$t('MSG_ALT_INP_ID'), this.$t('MSG_TXT_DEPT_ID')), null);
        return;
      }

      if (utils.isEmpty(this.frame0.frms.departmentOrder) === true) {
        this.conFirm('error', utils.strFormat(this.$t('MSG_ALT_INP_ID'), this.$t('MSG_TXT_ARRAY_ORDER')), null);
        return;
      }

      const dataParams = {
        departmentId: this.frame0.frms.departmentId,
        departmentName: this.frame0.frms.departmentName,
        departmentEnglishName: this.frame0.frms.departmentEnglishName,
        departmentOrder: this.frame0.frms.departmentOrder,
        headOfDepartmentUserId: this.frame0.frms.headOfDepartmentUserId,
        infoUseYn: this.frame0.frms.infoUseYn,
        departmentLevel: this.frame0.frms.departmentLevel,
      };

      if (utils.trim(this.frame0.frms.oldDepartmentName) !== utils.trim(this.frame0.frms.departmentName)) {
        http.request(this.pageId, 'DTS_CMY_00095', {
          query: dataParams,
        }).then(res => {
          if (!res.data) {
            utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
              this.deptSave(dataParams);
            });
          } else {
            utils.messageBox('confirm', this.$t('MSG_ALT_DUP_NM_ITEM_SAVE'), null, () => {
              this.deptSave(dataParams);
            });
          }
        }).catch(error => {
          console.log(error);
        });
      } else {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
          this.deptSave(dataParams);
        });
      }
      /*
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        http.request(thisVue.pageId, 'DTS_CMY_00091', {
          data: dataParams,
        }).then(() => {
          utils.messageBox('success', thisVue.$t('MSG_ALT_SAVE_DATA'), null);
          thisVue.$emit('onSearchClick', thisVue.frame0.frms.departmentId);
        }).catch(error => {
          console.log(error);
        });
      });
        */
    },
    deptSave(dataParams) {
      const thisVue = this;
      http.request(thisVue.pageId, 'DTS_CMY_00091', {
        data: dataParams,
      }).then(() => {
        utils.messageBox('success', thisVue.$t('MSG_ALT_SAVE_DATA'), null);
        thisVue.$emit('onSearchClick', thisVue.frame0.frms.departmentId);
      }).catch(error => {
        console.log(error);
      });
    },
  },
};
</script>
<style scoped>
</style>
