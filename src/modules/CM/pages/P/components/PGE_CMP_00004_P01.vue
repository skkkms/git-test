<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
      <div class="mrB20" />
      <div class="comm_title_wrap">
        <h4>{{ $t("MSG_TXT_DEFAULT_INFO") }}</h4>
      </div>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_PORTL')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-custom-select
              ref="portal"
              :selected="fromPsYn?psInitPortal:inputData.selectedCodeValue.portalId"
              :option-list="portalList"
              :disabled="fromPsYn"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DOC_VER')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="policyVer"
              v-model.trim="inputData.persInfoProcPolicyVer"
              maxlength="15"
              @input="onKeyupInput"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_VALID_PERIOD')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <ur-range-picker
              ref="dp"
              v-model="rangeDateValue"
              oneInputMode
              :inputType=this.userDateFormat
              :modelType=this.userDateFormat
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DOC_TTL')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model.trim="inputData.policyDocumentTitle"
              maxlength="100"
            />
          </div>
        </div>
        <div
          v-if="updateFlag"
          class="row"
        >
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDFC_USR')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <cmp-user-name-link
              :pageId="pageId"
              :displayType="'1'"
              :displayLanguageId="inputData.dsplLngId"
              :knoxId="inputData.knoxId"
              :userName="inputData.userName"
              :userGlobalName="inputData.userGlobalName"
              :departmentName="inputData.departmentName"
              :departmentEnglishName="inputData.departmentEnglishName"
              :loginId="inputData.loginId"
              :userId="inputData.finalModificationUserId"
              type="link"
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
              {{ inputData.finalModificationDTM }}
            </div>
          </div>
        </div>
      </div>

      <div class="comm_title_wrap">
        <h4>{{ title }}</h4>
        <!-- <h4>{{ $t('MSG_TXT_PERS_INFO_PROC_POLI') }}</h4> -->
      </div>
      <sui-web-editor
        ref="tuiEditor"
        v-model="inputData.persInfoProcPolicyContent"
        :height="250"
        @loaded="editorLoaded"
      />
    </div>
    <div
      v-if="updateFlag"
      class="comm_btn_wrap mrR30"
    >
      <sui-button
        v-permission:read="pageId"
        type="button"
        class="comm_btn_border"
        @click="closePopup"
      >
        {{ $t("MSG_BTN_CANCEL") }}
      </sui-button>
      <sui-button
        v-permission:read="pageId"
        type="button"
        class="comm_btn_border"
        @click="onDelClick"
      >
        {{ $t("MSG_BTN_DEL") }}
      </sui-button>
      <sui-button
        v-permission:update="pageId"
        type="button"
        class="comm_btn_solid"
        @click="onSaveClick"
      >
        {{ $t("MSG_BTN_SAVE") }}
      </sui-button>
    </div>
    <div
      v-else
      class="comm_btn_wrap mrR30"
    >
      <sui-button
        v-permission:read="pageId"
        type="button"
        class="comm_btn_border"
        @click="closePopup"
      >
        {{ $t("MSG_BTN_CANCEL") }}
      </sui-button>
      <sui-button
        v-permission:update="pageId"
        type="button"
        class="comm_btn_solid"
        @click="onSaveClick"
      >
        {{ $t("MSG_BTN_SAVE") }}
      </sui-button>
    </div>
  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMP_00004_P01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: '',
    },
    updateFlag: {
      type: Boolean,
      default: false,
    },
    persInfoProcPolicyUid: {
      type: String,
      default: '',
    },
    policyTypeCode: {
      type: String,
      default: 'P',
    },
    title: {
      type: String,
      default: '',
    },
    psInitPortal: {
      type: Object,
      default() {
        return {};
      }
    },
    fromPsYn: {
      type: Boolean,
      default: false,      
    }    
  },
  data() {
    return {
      inputData: {
        selectedCodeValue: {
          portalId: {
            key: '',
            label: '',
          },
        },
        policyTypeCode: this.policyTypeCode,
        persInfoProcPolicyVer: '',
        policyDocumentTitle: '',
        persInfoProcPolicyContent: '',
        finalModificationUserId: '',
        finalModificationDTM: '',
        displayStartDT: '',
        displayFinishDT: '',
        userName: '',
        userGlobalName: '',
        knoxId: '',
        loginId: '',
        departmentName: '',
        departmentEnglishName: '',
        dsplLngId: '',
      },
      userDateFormat: this.$store.getters.userInfo.dateFormat,
      originalVer: '',
      validMessage: '',
      temp: {},
      portalList:[],
      rangeDateValue: ['', ''],
    };
  },
  computed: {},
  watch: {},
  datasets: [],
  mounted() {
    this.$nextTick(() => {
      this.loadPortalList().then(() => {
        if (!utils.isEmpty(this.persInfoProcPolicyUid)) {
          this.persInfoProcPolicyDataLoad(this.persInfoProcPolicyUid);
        }
      });
    });
  },

  methods: {
    loadPortalList() {
      return new Promise((resolve, reject) => {
        http
          .request(this.contextPageId, 'DTS_CMP_00004', {})
          .then(res => {
            this.portalList = [];
            if (res.data.length > 0) {
              utils.forEach(res.data, obj => {
                const portalInfo = {
                  key: obj.portalId,
                  label: obj.portalName,
                };
                this.portalList.push(portalInfo);
              });
            }
            if (utils.isEmpty(this.persInfoProcPolicyUid)) {
              this.inputData.selectedCodeValue.portalId = this.portalList[0];
            }
            resolve();
          })
          .catch(error => {
            console.log(error);
            reject();
          });
      });
    },
    makeSnapshot() {
      const data = {};
      utils.forEach(this.inputData, (value, key) => {
        if (utils.isEqual(key, 'selectedCodeValue')) {
          data.portalId = value.portalId.key;
        } else {
          data[key] = value;
        }
      });
      const input = this.$refs.tuiEditor.getText();
      data.persInfoProcPolicyContent = utils.isEmpty(input)
        ? ''
        : this.$refs.tuiEditor.getContent();
      data.rangeDateValue = this.rangeDateValue;
      return data;
    },
    persInfoProcPolicyDataLoad(uid) {
      http
        .request(this.pageId, 'DTS_CMP_00014', {
          path: {
            'pers-info-proc-policy-uid': uid,
          },
        })
        .then(res => {
          this.temp = utils.cloneDeep(res.data);
          this.$refs.tuiEditor.setHtml(res.data.persInfoProcPolicyContent);
          this.inputData.selectedCodeValue.portalId = {
            key: res.data.portalId,
            label: '',
          };
          res.data.finalModificationDTM = utils.dateformatToClient(
            res.data.finalModificationDTM,
          );
          this.rangeDateValue = [
            utils.dateformatToClient(res.data.displayStartDT, 'S'),
            utils.dateformatToClient(res.data.displayFinishDT, 'S'),
          ];
          utils.assign(res.data, res.data.finalModificationUserInfo);
          utils.forEach(res.data, (value, key) => {
            if (utils.has(this.inputData, key)) {
              if (utils.isEqual(key, 'persInfoProcPolicyVer')) {
                this.originalVer = value;
              }
              this.inputData[key] = value;
            }
          });
          this.saveSnapshot(this.makeSnapshot());
        })
        .catch(error => {
          console.log(error);
        });
    },
    // dataFormat(data) {
    //   const convert = {
    //     persInfoProcPolicyVer: data.persInfoProcPolicyVer,
    //     policyDocumentTitle: data.policyDocumentTitle,
    //     persInfoProcPolicyContent: data.persInfoProcPolicyContent,
    //     finalModificationUserId: data.finalModificationUserId,
    //   };

    //   return utils.assign(data, convert);
    // },
    editorLoaded() {
      this.$refs.tuiEditor.setHtml(this.inputData.persInfoProcPolicyContent);
      this.saveSnapshot(this.makeSnapshot());
    },
    closePopup() {
      utils.messageBox('confirm', this.$t('MSG_ALT_PRGS_CANCEL'), null, () => {
        this.$emit('onCloseClick');
      });
    },
    onDelClick() {
      utils.messageBox('confirm', this.$t('MSG_ALT_DEL'), null, () => {
        http
          .request(this.pageId, 'DTS_CMP_00139', {
            path: {
              'pers-info-proc-policy-uid': this.persInfoProcPolicyUid,
            },
          })
          .then(() => {
            utils.messageBox(
              'success',
              this.$t('MSG_ALT_DEL_DATA'),
              null,
              this.research,
            );
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    getSaveData() {
      const data = {
        persInfoProcPolicyUid: this.persInfoProcPolicyUid,
      };
      utils.forEach(this.inputData, (value, key) => {
        if (utils.isEqual(key, 'selectedCodeValue')) {
          utils.forEach(value, (codeValue, codekey) => {
            data[codekey] = codeValue.key;
          });
        } else if (utils.isEqual(key, 'displayStartDT')) {
          data[key] = utils.dateformatToServer(this.rangeDateValue[0], 'S');
        } else if (utils.isEqual(key, 'displayFinishDT')) {
          data[key] = utils.dateformatToServer(this.rangeDateValue[1], 'S');
        } else if (utils.isEqual(key, 'persInfoProcPolicyContent')) {
          const input = this.$refs.tuiEditor.getText();
          data[key] = utils.isEmpty(input)
            ? ''
            : this.$refs.tuiEditor.getContent();
        } else {
          data[key] = value;
        }
      });
      return data;
    },
    onSaveClick() {
      const saveData = this.getSaveData();
      // date picker validation
      if (this.onClickValidate()) return;

      // editor size check
      if (this.$refs.tuiEditor.isContentSizeExcceed()) return;

      if (this.validation(saveData)) {
        this.versionDuplicateCheck(saveData)
          .then(res => {
            if (
              res.data !== 0
              && this.changeVersion(saveData.persInfoProcPolicyVer)
            ) {
              utils.messageBox('warning', this.$t('MSG_ALT_EXIST_VER'));
            } else {
              this.saveAction(saveData);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        utils.messageBox('warning', this.validMessage);
      }
    },
    validation(saveData) {
      if (utils.isEmpty(saveData.persInfoProcPolicyVer)) {
        this.validMessage = utils.strFormat(
          this.$t('MSG_ALT_CHK_NCSR'),
          this.$t('MSG_TXT_DOC_VER'),
        );
        return false;
      }
      if (utils.isEmpty(Number(saveData.persInfoProcPolicyVer))) {
        this.validMessage = this.$t('MSG_TXT_DOC_VER_NOT_FLOAT');
        return false;
      }
      if (
        utils.isEmpty(saveData.displayStartDT)
        || utils.isEmpty(saveData.displayFinishDT)
      ) {
        this.validMessage = utils.strFormat(
          this.$t('MSG_ALT_CHK_SELECT'),
          this.$t('MSG_TXT_VALID_PERIOD'),
        );
        return false;
      }
      if (utils.isEmpty(saveData.policyDocumentTitle)) {
        this.validMessage = utils.strFormat(
          this.$t('MSG_ALT_CHK_NCSR'),
          this.$t('MSG_TXT_DOC_TTL'),
        );
        return false;
      }
      if (utils.isEmpty(saveData.persInfoProcPolicyContent)) {
        this.validMessage = utils.strFormat(
          this.$t('MSG_ALT_CHK_NCSR'),
          this.$t('MSG_TXT_PERS_INFO_PROC_POLI'),
        );
        return false;
      }
      if (this.updateFlag && !this.isSnapshotChanged()) {
        this.validMessage = this.$t('MSG_ALT_NO_CHG_CNTN');
        return false;
      }
      return true;
    },
    // changeCheck(data) {
    //   return (utils.isEqual(this.temp.persInfoProcPolicyVer, data.persInfoProcPolicyVer))
    //         && (utils.isEqual(this.temp.policyDocumentTitle, data.policyDocumentTitle))
    //         && (utils.isEqual(this.temp.persInfoProcPolicyContent, data.persInfoProcPolicyContent))
    //         && (utils.isEqual(this.temp.displayStartDT, data.displayStartDT))
    //         && (utils.isEqual(this.temp.displayFinishDT, data.displayFinishDT));
    // },
    changeVersion(changed) {
      // true시 변경 o -> 수정 화면에서 버전 변화 없을 때 UPDATE 작업
      return !(this.updateFlag && utils.isEqual(this.originalVer, changed));
    },
    saveAction(saveData) {
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        if (!this.changeVersion(saveData.persInfoProcPolicyVer)) {
          http
            .request(this.pageId, 'DTS_CMP_00016', {
              path: {
                'pers-info-proc-policy-uid': saveData.persInfoProcPolicyUid,
              },
              data: saveData,
            })
            .then(() => {
              utils.messageBox(
                'success',
                this.$t('MSG_ALT_SAVE_DATA'),
                null,
                this.research,
              );
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          http
            .request(this.pageId, 'DTS_CMP_00015', {
              data: saveData,
            })
            .then(() => {
              utils.messageBox(
                'success',
                this.$t('MSG_ALT_SAVE_DATA'),
                null,
                this.research,
              );
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    versionDuplicateCheck(checkData) {
      return new Promise((resolve, reject) => {
        http
          .request(this.pageId, 'DTS_CMP_00025', {
            query: {
              portalId: checkData.portalId,
              policyTypeCode: checkData.policyTypeCode,
              persInfoProcPolicyVer: checkData.persInfoProcPolicyVer,
            },
          })
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    research() {
      this.$emit('research');
    },
    /* 달력의 오류를 확인할 수 있는 validate 함수 */
    onClickValidate() {
      // date picker validation
      // if (this.onClickValidate()) return false;
      if (!this.$refs.dp.isValid()) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_DT'), null, null);
        return true;
      }
      return false;
    },
    onKeyupInput(value) {
      const versionInput = value;
      const regType = /^[0-9|.]*$/;
      if (!regType.test(versionInput)) {
        utils.messageBox('warning', '숫자/.만 입력 가능합니다.', null, () => {
          const saveData = this.getSaveData();
          this.$refs.policyVer.txtField = '';
          saveData.persInfoProcPolicyVer = '';
          this.$refs.policyVer.setFocus();
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
