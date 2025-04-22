<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TITLE')"
              width="140px"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            <sui-text-field
              v-model="emailTitle"
              max-length="100"
              default
              style="width: 100%"
              :readonly="isTitleReadonly"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_RCPT_USR')"
              width="140px"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            <div
              class="width100"
              style="flex-direction:row"
            >
              <div class="dp_flex mrB05">
                <cmp-emp-select
                  :selectedKnoxUser="selectedKnoxUser"
                  :checkboxMode="true"
                  @selected="onSelectedKnox"
                />
                <div class="comp_spacing" />
                <sui-checkbox
                  v-model="writeTomeCheck"
                  width="200px"
                  @input="onCheck"
                >
                  {{ $t('MSG_TXT_WRITE_TO_ME') }}
                </sui-checkbox>
              </div>
              <cmp-email-recipients-list
                ref="emailRecipients"
                :pageId="this.$options.name"
                :recptDispFormat="no10_recptDispFormat"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_ATTH_FILE')"
              width="140px"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            <cmp-file-attacher
              ref="fileAttacher"
              :pageId="this.$options.name"
              :showDDRegion="false"
              :attachGroupId="attachGroupId"
              :attachDocumentId="attachDocumentId"
              class="width100"
              :deletableOld="isTransFileModify"
              :disabled="isfileDisabled"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_CNTN')"
              width="140px"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            <sui-web-editor
              :isViewer="isEditorViewerMode"
              ref="tuiEditor"            
              :initializedCallback="editorInitCallback"
              class="width100"
            />
          </div>
        </div>
      </div>
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onCancel"
        >
          {{ $t("MSG_BTN_CANCEL") }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onSend"
        >
          {{ $t("MSG_TXT_SEND") }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
const codeKeys = ['COD_EMAIL_RECP_USR_TYPE'];
export default {
  name: 'PGE_CMZ_00010', // eslint-disable-line vue/name-property-casing
  props: {
    closePagePopup: {
      type: Function,
      required: true,
    },
    pageInitialData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      maxContentsSize:0,
      isEditorViewerMode: false,
      isfileDisabled: false,
      isTransFileModify: false,
      isTitleReadonly: false,
      isReceiverDisabled: 'false',
      attachGroupId: 'ATG_CMZ_MAIL_COMMON',
      attachDocumentId: '',
      selectedKnoxUser: {
        userName: '',
        epId: '',
        epNo: '',
        email: '',
        cpnyCd: '',
        cpnyNm: '',
        deptId: '',
        deptNm: '',
        deptEnNm: '',
        usrGlblNm: '',
        crlvCd: '',
        setListYn: '',
      },
      codes: {
        COD_EMAIL_RECP_USR_TYPE: [{ label: '', key: '' }],
      },
      // eslint-disable-next-line no-template-curly-in-string
      no10_recptDispFormat: `${userName}/${deptNm}/${cpnyNm} [${email}]`,
      emailTitle: '',
      writeTomeCheck: false,
      isWebEditorContentsHtml: false,
      newDococumentId: '',
    };
  },
  computed: {
    // 계산된 속성, property로 사용가능
    // isEditor() {
    //   return this.pageInitialData.Editor;
    // },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  mounted() {

  },
  methods: {
    editorInitCallback() {
      // DOM이 document에 append된 상태, 실제 element에 접근 가능 (this.$el or this.$refs)
      // 주로 데이터 패치 등을 함
      this.loadCode().then(() => {
        this.loadData();
      });
    },
    loadCode() {
      return http.mergeCodeList(this.$options.name, codeKeys, this.codes).then(() => {
      }).catch(error => {
        console.log(error);
      });
    },
    loadData() {
      if (this.pageInitialData !== null) {
        const has = Object.prototype.hasOwnProperty;

        this.emailTitle = this.pageInitialData.mailTitle;
        // 제목 수정여부 세팅
        this.isTitleReadonly = this.loadIsTitleReadonly()

        // 수신자 변경 가능여부  (디폴트 : 변경불가, Null인 경우 디폴트 값으로 셋팅)
        this.isReceiverDisabled = this.loadIsReceiverDisabled()

        // 수신자 세팅.
        this.pageInitialData.mailList.forEach(data => {
          utils.set(data, 'disFlag', this.isReceiverDisabled);
          this.$refs.emailRecipients.addRecipient(data);
        });

        if (has.call(this.pageInitialData, 'attachDocumentId')) {
          if (this.pageInitialData.moduleCode !== null
             || !utils.isEmpty(this.pageInitialData.moduleCode)) {
            const attachParam = {
              attachGroupId: 'ATG_CMZ_MAIL_COMMON',
              attachItemId: 'ATG_CMZ_MAIL_COMMON_00001',
              attachDocumentTypeCode: 'N',
              moduleCode: this.pageInitialData.moduleCode,
              attachDocumentIdList: this.pageInitialData.attachDocumentId,
            };
            this.copyAttachFile(attachParam);
          }
        }

        // 메일첨부 편집가능여부 : 없음
        this.isfileDisabled = this.loadIsFileDisabled()

        // Doc ID를 통한 파일첨부 세팅시 해당 파일 수정가능여부 .
        this.isTransFileModify = this.loadIsTransFileModify()

        if (has.call(this.pageInitialData, 'objTemplate')) {
          const { objTemplate } = this.pageInitialData;
          this.selectTemplate(objTemplate);
        } else if (utils.isEmpty(this.pageInitialData.mailContents) === false) {
          if (utils.isEqual(this.pageInitialData.Editor, 'Y') === true) {
            this.$refs.tuiEditor.setContent(this.pageInitialData.mailContents);
          } else {
            this.$refs.tuiViewer.editorViewer.setValue(this.pageInitialData.mailContents);
          }
        }
        // 본문수정가능여부 (디폴트 : 변경불가, Null인 경우 디폴트 값으로 셋팅)
        this.isEditorViewerMode = this.loadIsEditorViewerMode()
      }
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
    setParamList(count, gubunCode, email, userId) {
      let receiptTypeCode = '';
      if (gubunCode > 0) {
        receiptTypeCode = this.codes.COD_EMAIL_RECP_USR_TYPE[gubunCode].key;
      }

      let dataParams = '';
      dataParams = {
        emailUid: '',
        receiptUserEmail: email || '',
        emailReceiptUserOrder: _.toNumber(count),
        emailReceiptUserTypeCode: receiptTypeCode || '',
        emailReceiptUserId: userId || '',
        emailReceiptStatusCode: '',
      };
      return dataParams;
    },
    copyAttachFile(objParams) {
      http.request(this.$options.name, 'DTS_CMZ_00085', {
        data: objParams,
      }).then(res => {
        this.newDococumentId = res.data.attachDocumentId;
        // this.$refs.fileAttacher.searchAttachedFileInfoByDocId(res.data.attachDocumentId);
        this.attachDocumentId = res.data.attachDocumentId;
      }).catch(error => {
        console.log(error);
      });
    },
    selectTemplate(objTemplate) {
      http.request(this.$options.name, 'DTS_CMZ_00075', {
        path: {
          'template-id': objTemplate.templateId,
          'site-id': objTemplate.siteId,
        },
        data: objTemplate,
      }).then(res => {
        // set WebEditorContents
        if (utils.isEmpty(res.data.sendTmpltCntn) === false) {
          this.isWebEditorContentsHtml = true;
          let tempContent = '';
          if (utils.isEmpty(this.pageInitialData.mailContents) === false) {
            tempContent = `${this.pageInitialData.mailContents}\r\n`
              + `<br><br>\r\n${
                res.data.sendTmpltCntn}`;
          } else {
            tempContent = res.data.sendTmpltCntn;
          }
          if (utils.isEqual(this.pageInitialData.Editor, 'Y') === true) {
            this.$refs.tuiEditor.setHtml(tempContent);
          } else {
            this.$refs.tuiViewer.editorViewer.setHtml(tempContent);
          }
        } else if (utils.isEmpty(this.pageInitialData.mailContents) === false) {
          if (utils.isEqual(this.pageInitialData.Editor, 'Y') === true) {
            this.$refs.tuiEditor.setContent(this.pageInitialData.mailContents);
          } else {
            this.$refs.tuiViewer.editorViewer.setValue(this.pageInitialData.mailContents);
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    onClose() {
      console.log('onConfirm');
    },
    onSelectedKnox() {
      if (this.selectedKnoxUser !== 'undefined'
        && this.selectedKnoxUser !== ''
        && this.selectedKnoxUser !== null) {
        this.$refs.emailRecipients.addRecipient(this.selectedKnoxUser);
      }
    },
    onSend() {
      if (utils.isEmpty(this.emailTitle) === true) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_TITLE'));
        this.conFirm('error', msg, null);
        return;
      }

      // const fileAttachList = this.$refs.fileAttacher.getGridFileListInfo();
      const fileAttachList = this.$refs.fileAttacher.getAttachFileListInfo();

      let sendEpId = '';
      if (this.$store.getters.userInfo.epid !== null) {
        sendEpId = utils.trim(this.$store.getters.userInfo.epid);
      } else {
        sendEpId = utils.trim(this.$store.getters.userInfo.userId);
      }

      let dataParams = {};
      let count = 0;
      const mailDetailList = [];
      utils.forEach(this.$refs.emailRecipients.getRecptList(), data => {
        const mailData = this.setParamList(count,
          data.recipientType,
          data.email,
          data.epId);
        mailDetailList.push(mailData);
        count += 1;
      });

      let mContents = '';
      if (this.isWebEditorContentsHtml) {
        if (utils.isEqual(this.pageInitialData.Editor, 'Y') === true) {
          mContents = this.$refs.tuiEditor.getHtml();
        } else {
          mContents = this.$refs.tuiViewer.editorViewer.getHtml();
        }
      } else if (utils.isEqual(this.pageInitialData.Editor, 'Y') === true) {
        mContents = this.$refs.tuiEditor.getContent();
      } else {
        mContents = this.$refs.tuiViewer.editorViewer.getValue();
      }
      //결재상신시 본문내용 사이즈 제한.
      this.maxContentsSize = utils.getConfigurationValue('CFG_CMZ_MAIL_CONT_LIMIT_SIZE');
      if(utils.getByte(mContents) > this.maxContentsSize){
        utils.messageBox('warning', this.$t('MSG_ALT_SIZE_LIMIT_EXCEEDED'),this.maxContentsSize); 
        return false;
      }

      if (mailDetailList.length > 0) {
        dataParams = {
          emailUid: '',
          connectionEmailId: '',
          emailTypeCode: 'PERSONAL',
          emailTitle: this.emailTitle || '',
          emailContent: mContents || '',
          epId: sendEpId || '',
          emailSendStatusCode: '0',
          attachDocId: this.newDococumentId || '',
          emailReceiptUsers: mailDetailList,
          attachFiles: fileAttachList,
          sendTemplateId: this.pageInitialData.objTemplate.templateId,
        };
      } else {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_RCPT_USR'));
        this.conFirm('error', msg, null);
        return;
      }

      if (dataParams.epId) {
        http.request(this.$options.name, 'DTS_CMZ_00043', {
          data: dataParams,
        }).then(res => {
          if (utils.isEqual(res.data.resultCode, '1') === true) {
            this.closePagePopup('ok');
          } else {
            this.conFirm('error', this.$t('MSG_ALT_SEND_MAIL_ERROR'), null);
          }
        }).catch(error => {
          console.log(error);
        });
      } else {
        this.conFirm('error', this.$t('MSG_ALT_SAV_NO_DATA'), null);
      }
    },
    onCancel() {
      this.closePagePopup('');
    },
    onCheck() {
      if (this.writeTomeCheck === true) {
        const uName = utils.trim(this.$store.getters.userInfo.userName);
        const mail = utils.trim(this.$store.getters.userInfo.email);
        const copanyName = utils.trim(this.$store.getters.userInfo.companyName);
        const deptName = utils.trim(this.$store.getters.userInfo.departmentName);
        const userId = utils.trim(this.$store.getters.userInfo.userId);
        const userData = {
          userName: uName || '',
          email: mail || '',
          cpnyNm: copanyName || '',
          deptNm: deptName || '',
          epId: userId || '',
        };
        this.$refs.emailRecipients.addRecipient(userData);
      }
    },
    loadIsTitleReadonly() {
      const has = Object.prototype.hasOwnProperty
      if (has.call(this.pageInitialData, 'titleReadonly')) {
        // 제목 수정가능여부 값이 null 인경우 - 기본적으로 수정가능.
        if (this.pageInitialData.titleReadonly === null || utils.isEmpty(this.pageInitialData.titleReadonly)) {
          return false;
        } else if (this.pageInitialData.titleReadonly === true) {
          return true;
        } else {
          return false;
        }
      }else {
        return false;
      }
    },
    loadIsReceiverDisabled() {
      const has = Object.prototype.hasOwnProperty
      if (has.call(this.pageInitialData, 'receiverModify')) {
        if (this.pageInitialData.receiverModify === null || utils.isEmpty(this.pageInitialData.receiverModify)) return 'false'
        else if (this.pageInitialData.receiverModify === true) return 'false'
        else return 'true'
      }else {
        return 'true'
      }
    },
    loadIsFileDisabled() {
      const has = Object.prototype.hasOwnProperty
      if (has.call(this.pageInitialData, 'attachModify')) {
        // 본문수정가능여부 값이 null 인경우
        if (this.pageInitialData.attachModify === null || utils.isEmpty(this.pageInitialData.attachModify)) {
          return true
        } else if (this.pageInitialData.attachModify === true) {
          return false
        } else {
          return true
        }
      }else {
        return false
      }
    },
    loadIsTransFileModify() {
      const has = Object.prototype.hasOwnProperty
      if (has.call(this.pageInitialData, 'transFileModify')) {
        // 본문수정가능여부 값이 null 인경우
        if (this.pageInitialData.transFileModify === null || utils.isEmpty(this.pageInitialData.transFileModify)) {
          return true
        } else if (this.pageInitialData.transFileModify === true) {
          return false
        } else {
          return true
        }
      }else {
        return true
      }
    },
    loadIsEditorViewerMode() {
      const has = Object.prototype.hasOwnProperty
      if (has.call(this.pageInitialData, 'contentsModify')) {
        // 본문수정가능여부 값이 null 인경우
        if (this.pageInitialData.contentsModify === null || utils.isEmpty(this.pageInitialData.contentsModify)) return true
        else if (this.pageInitialData.contentsModify === true) return false
        else return true
      } else {
        return true
      }
    },
  },
};
</script>
<style scoped>
.comm_scr_wrap .row{background-color:#fff}
.col-xs, .col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6,
.col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12{border:none}
.comm_scrInput_wrap { width: 80%;}
.comm_scr_wrap div.row:first-child { border-top: 0 !important;}
</style>
