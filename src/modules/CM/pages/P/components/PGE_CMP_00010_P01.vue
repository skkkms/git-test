<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_PORTL_ID')"
            />
          </div>
          <div class="col-xs-5 ">
            <div class="comm_label">
              {{ objPortal.portalId }}
            </div>
          </div>
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_PORTL_NM')"
              :required="true"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-text-field
            ref="textFieldPortalName"
            v-model="objPortal.portalName"
            maxlength="100"
            :trim="true"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_PORTL_BASE_URL')"
              :required="true"
            />
          </div>
          <div class="col-xs-11 ">
            <sui-text-field
            ref="textFieldPortalBaseUrl"
            v-model="objPortal.portalBaseUrl"
            maxlength="1000"
            :trim="true"
            />
          </div>
        </div>         
        <div class="row">
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_PORTL_URL')"
            />
          </div>
          <div class="col-xs-11 ">
            <div class="comm_label"
                 ref="textPortalUrl">
              {{ objPortal.portalBaseUrl+"/certification/"+this.portalId+"/simpleLogin.html" }}
            </div>
            <button
                type="button"
                class="-portalStudio-url-copy"
                :title="tooltipCopy"
                @click="onClickUrlCopy"
              />            
          </div>
        </div>        
        <div class="row">
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_USE_YN')"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-radio
              v-model="objPortal.useYn"
              value="Y"
            >
              {{ 'Yes' }}
            </sui-radio>
            <sui-radio
              v-model="objPortal.useYn"
              value="N"
            >
              {{ 'No' }}
            </sui-radio>
          </div>
          <div
            v-if="deviceApplyYn"
            class="col-xs-1 "
          >
            <sui-input-label
              :label="$t('MSG_TXT_DVC_TYPE')"
              :required="true"
            />
          </div>
          <div
            v-if="deviceApplyYn"
            class="col-xs-5 "
          >
            <sui-device-checkbox
              ref="deviceCheck"
              :value="objPortal.deviceTypeValue"
            />
          </div>
          <div
            v-if="!deviceApplyYn"
            class="col-xs-1 nodata"
          />
          <div
            v-if="!deviceApplyYn"
            class="col-xs-5 nodata"
          />
        </div>
        <div class="row">
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_PORTL_CNTN')"
            />
          </div>
          <div class="col-xs-11 ">
            <sui-text-field
              ref="textFieldPortalContent"
              v-model="objPortal.portalContent"
              maxlength="1000"
              :trim="true"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_BLCK')"
            />
          </div>
          <div class="col-xs-5 ">
            <sui-radio
              v-model="objPortal.blockYn"
              value="Y"
            >
              {{ 'Yes' }}
            </sui-radio>
            <sui-radio
              v-model="objPortal.blockYn"
              value="N"
            >
              {{ 'No' }}
            </sui-radio>
          </div>
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_BLCK_DTM')"
            />
          </div>
          <div class="col-xs-5 ">
          <!-- <sui-date-picker
            ref="DatePickerBlockStart"
            v-model="blockStartDate"
            :disabled="this.objPortal.blockYn==='N'"
          />
          <div class="comp_spacing" />          
          <sui-time-picker
            ref="TimePickerBlockStart"
            v-model="blockStartTime"
            format="HH:mm"
            :disabled="this.objPortal.blockYn==='N'"
          />
          <div class="comp_spacing" />
          ~
          <div class="comp_spacing" />
          <sui-date-picker
            ref="DatePickerBlockFinish"
            v-model="blockFinishDate"
            :disabled="this.objPortal.blockYn==='N'"
          />
          <div class="comp_spacing" />
          <sui-time-picker
            ref="TimePickerBlockFinish"
            v-model="blockFinishTime"
            format="HH:mm"
            :disabled="this.objPortal.blockYn==='N'"
          />           -->
          <ur-date-time-range-picker
            ref="DatePickerBlockPeriod"
            v-model="dateValue"
            init="today"
            one-input-mode
            :inputType=this.userDateFormat
            :modelType=this.userDateFormat
            :disabled="this.objPortal.blockYn==='N'"
          />          
        </div>
        </div>
        <div class="row">
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_BLCK_TTL')"
            />
          </div>
          <div class="col-xs-11 ">
            <sui-text-field
              ref="textFieldBlockTitle"
              v-model="objPortal.blockTitle"
              maxlength="100"
              :trim="true"
            />
          </div>        
        </div>
        <div class="row">
          <div class="col-xs-1 ">
            <sui-input-label
              :label="$t('MSG_TXT_BLCK_CNTN')"
            />
          </div>
          <div class="col-xs-11 ">
            <textarea
              ref="textFieldBlockContent"
              v-model="objPortal.blockContent"
              style="width:100%"
              maxlength="1000"
            />          
          </div>        
        </div>                  
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_RGST_USR')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <cmp-user-name-link
              :pageId="this.contextPageId"
              :displayType="'1'"
              :displayLanguageId="objPortal.firstRegistrationDisplayLanguageId"
              :userId="objPortal.firstRegistrationUserId"
              :loginId="objPortal.firstRegistrationLoginId"
              :knoxId="objPortal.firstRegistrationKnoxId"
              :userName="objPortal.firstRegistrationUserName"
              :userGlobalName="objPortal.firstRegistrationUserGlobalName"
              :departmentName="objPortal.firstRegistrationDepartmentName"
              :departmentEnglishName="objPortal.firstRegistrationDepartmentEnglishName"
              :type="'link'"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_RGST_DTM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ objPortal.firstRegistrationDTM | dateFormat  }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDFC_USR')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <cmp-user-name-link
              :pageId="this.contextPageId"
              :displayType="'1'"
              :displayLanguageId="objPortal.finalModificationDisplayLanguageId"
              :userId="objPortal.finalModificationUserId"
              :loginId="objPortal.finalModificationLoginId"
              :knoxId="objPortal.finalModificationKnoxId"
              :userName="objPortal.finalModificationUserName"
              :userGlobalName="objPortal.finalModificationUserGlobalName"
              :departmentName="objPortal.finalModificationDepartmentName"
              :departmentEnglishName="objPortal.finalModificationDepartmentEnglishName"
              :type="'link'"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDFC_DTM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ objPortal.finalModificationDTM | dateFormat  }}
            </div>
          </div>
        </div>
        <div class="mrB30" />
        <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onClickCancel"
        >
          {{ $t("MSG_BTN_CANCEL") }}
        </sui-button>
        <sui-button
          v-if="isDeleted"
          v-permission:create="contextPageId"
          type="button"
          class="comm_btn_border"
          @click="onClickRestore"
        >
          {{ $t('MSG_BTN_RESTORE') }}
        </sui-button>        
        <sui-button
          v-permission:delete="contextPageId"
          type="button"
          class="comm_btn_border"
          @click="onClickDelete"
        >
          {{ this.objPortal.deleteYn=="Y"?$t('MSG_BTN_DSCD'):$t('MSG_BTN_DEL') }}
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
    </div>
  </div>
</template>

<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMP_00010_P01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    portalId: {
      type: String,
      required: true,
      default() {
        return '';
      },
    },
  },
  filters: {
    dateFormat(date) {
      if (!date) return '';
      return utils.dateformatToClient(date);
    },
  },  
  data() {
    return {
      deviceApplyYn: true,
      blockStartDate: utils.now('YYYY-MM-DD'),
      blockStartTime: {HH: '12',mm: '00',},      
      blockFinishDate: utils.now('YYYY-MM-DD'),
      blockFinishTime: {HH: '12',mm: '00',},      
      objPortal: {
        tenantId: this.$store.getters.userInfo.tenantId,
        portalId: '',
        portalName: '',
        portalBaseUrl: window.location.origin+'/',
        portalContent: '',
        deviceTypeValue: 0,
        useYn: 'Y',
        blockYn: 'N',
        blockStartDTM: '',
        blockFinishDTM: '',
        blockTitle: '',
        blockContent: '',
        deleteYn: '',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        firstRegistrationProgramId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
        finalModificationProgramId: '',
        firstRegistrationLoginId: '',
        firstRegistrationKnoxId: '',
        firstRegistrationUserName: '',
        firstRegistrationUserGlobalName: '',
        firstRegistrationDepartmentName: '',
        firstRegistrationDepartmentEnglishName: '',
        firstRegistrationDisplayLanguageId: '',
        finalModificationLoginId: '',
        finalModificationKnoxId: '',
        finalModificationUserName: '',
        finalModificationUserGlobalName: '',
        finalModificationDepartmentName: '',
        finalModificationDepartmentEnglishName: '',
        finalModificationDisplayLanguageId: '',
      },
      isDeleted:false,
      tooltipCopy: this.$t('MSG_TXT_COPY'),
      dateValue:['',''],
      userDateFormat: this.$store.getters.userInfo.dateFormat+" HH:mm",
    };
  },
  mounted() {
    this.loadPortal();
  },
  methods: {
    loadPortal() {
      if(this.portalId) {
        const tenantId = this.objPortal.tenantId;
        const dataParams = {
          tenantId: tenantId,
        }
        if(!utils.isEmpty(this.portalId)) {
          http.request(this.contextPageId, 'DTS_CMP_00103', {
            path: {
              'portal-id': this.portalId,
            },
            query: dataParams,
          }).then(res => {
            this.objPortal = res.data;

            if (this.objPortal.blockStartDTM) {
              const sBlockStartDate = this.objPortal.blockStartDTM.substr(0, 8);
              this.blockStartDate = utils.dateformatToClient(sBlockStartDate);

              const sBlockStartTime = this.objPortal.blockStartDTM.substr(8, 8);
              this.blockStartTime = { HH: sBlockStartTime.substr(0, 2), mm: sBlockStartTime.substr(2, 2)};
            }else{
              this.blockStartDate = utils.dateformatToClient(utils.now());
              this.blockStartTime = {HH: '12',mm: '00',};
            }
            if (this.objPortal.blockFinishDTM) {
              const sBlockFinishDate = this.objPortal.blockFinishDTM.substr(0, 8);
              this.blockFinishDate = utils.dateformatToClient(sBlockFinishDate);

              const sBlockFinishTime = this.objPortal.blockFinishDTM.substr(8, 8);
              this.blockFinishTime = { HH: sBlockFinishTime.substr(0, 2), mm: sBlockFinishTime.substr(2, 2)};
            }else{
              this.blockStartDate = utils.dateformatToClient(utils.now());
              this.blockFinishTime = {HH: '12',mm: '00',};              
            }

            this.isNew = false;
            this.isDeleted = this.objPortal.deleteYn === 'Y';
            this.isIdDuplicationCheck = true;
            if(this.deviceApplyYn) {
              this.$refs.deviceCheck.setValue(this.objPortal.deviceTypeValue);
            }
            this.dateValue = [`${`${this.blockStartDate} ${`${this.blockStartTime.HH}:${this.blockStartTime.mm}`}`}`,
              `${`${this.blockFinishDate} ${`${this.blockFinishTime.HH}:${this.blockFinishTime.mm}`}`}`];
          });
        }
      }
    },
    research() {
      this.$emit('research');
    },
    onClickCancel() {
      this.$emit('close');
    },
    onClickDelete() {
      const portalId = this.objPortal.portalId;
      const dataParams = {
        tenantId : this.objPortal.tenantId
      }
      if(!utils.isEmpty(portalId) && this.objPortal.deleteYn === 'N') {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_DEL'), null, () => {
          http.request(this.contextPageId, 'DTS_CMP_00106', {
            path: {
              'portal-id': portalId,
            },
            query: dataParams,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_DELETED'));
            this.onClickCancel();
            this.research();
          });
        });
      } else if (!utils.isEmpty(portalId) && this.objPortal.deleteYn === 'Y') {
        utils.messageBox('confirm', this.$t('MSG_ALT_IS_DSCD_DATA'), null, () => {
          http.request(this.contextPageId, 'DTS_CMP_00138', {
            path: {
              'portal-id': portalId,
            },
            query: dataParams,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_DSCD_DATA'));
            this.onClickCancel();
            this.research();
          });
        });        
      } else {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    onClickRestore() {
      if (this.objPortal.deleteYn === 'N') {
        utils.messageBox('information', this.$t('MSG_ALT_IMPOSSIBLE_RESTORE')); // 삭제하지 않는 데이터는 복원할 수 없습니다.
      } else {
        utils.messageBox('confirm', this.$t('MSG_ALT_IS_RESTORE_DATA'), null,
          (/* ok */) => {
            const dataParams = {
              tenantId: this.objPortal.tenantId
            }
            http.request(this.contextPageId, 'DTS_CMP_00132', {
              path: {
                'portal-id': this.objPortal.portalId,
              },
              query: dataParams,
            }).then(() => {
              utils.messageBox('success', this.$t('MSG_ALT_RESTORE_DATA'), null, () => {
                this.onClickCancel();
                this.research();
              });
            }).catch(error => {
              console.log(error);
            });
          },
          (/* cancel */) => {});
      }
    },    
    onClickSave() {
      if (utils.isEmpty(this.objPortal.portalName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PORTL_NM')), null, () => {
          this.$refs.textFieldPortalName.setFocus();
        });
        return false;
      }
      if (utils.isEmpty(this.objPortal.portalBaseUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PORTL_BASE_URL')), null, () => {
          this.$refs.textFieldPortalBaseUrl.setFocus();
        });
        return false;
      }
      if(this.deviceApplyYn) {
        if (this.$refs.deviceCheck.getValue()<1) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_DVC_TYPE')), null, null);
          return false;
        }else{
          this.objPortal.deviceTypeValue = this.$refs.deviceCheck.getValue();
        }        
      }
      if(this.objPortal.blockYn==="Y"){
        this.blockDateValid();
        try{
          const [startValue, finishValue] = this.dateValue;
          let [tempDate, tempTime] = startValue.split(' ');
          this.blockStartDate = tempDate;
          [this.blockStartTime.HH, this.blockStartTime.mm] = tempTime.split(':');
          [tempDate, tempTime] = finishValue.split(' ');
          this.blockFinishDate = tempDate;
          [this.blockFinishTime.HH, this.blockFinishTime.mm] = tempTime.split(':');
        } catch (e) {
          utils.messageBox('warning', this.$t('MSG_ALT_CHK_DT'), null, null);
          return false;
        }
        if (this.blockStartDate !== null && this.blockStartTime !== '') {
          const paramBlockStartDate = utils.dateformatToServer(this.blockStartDate).substr(0, 8);
          const paramBlockStartTime = `${this.blockStartTime.HH}${this.blockStartTime.mm}00`;
          this.objPortal.blockStartDTM = `${paramBlockStartDate}${paramBlockStartTime}`;
        }
  
        if (this.blockFinishDate !== null && this.blockFinishTime !== '') {
          const paramBlockFinishDate = utils.dateformatToServer(this.blockFinishDate).substr(0, 8);
          const paramBlockFinishTime = `${this.blockFinishTime.HH}${this.blockFinishTime.mm}00`;
          this.objPortal.blockFinishDTM = `${paramBlockFinishDate}${paramBlockFinishTime}`;
        }
      }else{
        this.objPortal.blockStartDTM = 20200101000000;
        this.objPortal.blockFinishDTM = 99991231235959;
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        http.request(this.contextPageId, 'DTS_CMP_00105', {
          data: this.objPortal,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
          this.onClickCancel();
          this.research();
        });
      });
    },
    onClickUrlCopy(){
      utils.copyToClipboard(this.$refs.textPortalUrl.textContent);
      utils.toast(this.$t('MSG_ALT_COPY_TO_CLIPBOARD'));      
    },
    blockDateValid() {
      // date picker validation
      if (!this.$refs.DatePickerBlockPeriod.isValid()) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_DT'), null, null);
        return true;
      }
      return false;
    },  
  },
};
</script>

<style scoped>
</style>
