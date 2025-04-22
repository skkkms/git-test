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
              :required="true"
            />
          </div>
          <div class="col-xs-11">
            <sui-text-field
              v-model.trim="approvalData.approvalTitle"
              max-length="30"
              default
              :clearable="true"
              style="width: 100%"
              :readonly="isTitleReadonly"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_APRV_USR')"
              width="140px"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            <div
              class="width100"
              style="flex-direction:row"
            >
              <cmp-emp-select
                ref="user"
                :selectedKnoxUser="selectedUser"
                :checkboxMode="false"
                class="mrB05 width100"
                @selected="onSelectedUser"
              />

              <cmp-approval-list-manager
                ref="approvalManager"
                :pageId="this.$options.name"
                :emailFieldName="'approvalUserEmail'"
                :approverDispFormat="approverDispFormat"
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

              :attachGroupId="approvalAttachGroupId"
              class="width100"
              :deletableOld="isTransFileModify"
              :disabled="isfileDisabled"
            />
            <!-- :attachDocumentId="approvalData.newAttachDocumentId" -->
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
              ref="approvalWebEditor"
              :isViewer="isEditorViewerMode"
              :initializedCallback="editorInitCallback"
              class="width100"
            />
          </div>
        </div>
      </div>
      <div class="mrB30" />
    </sui-page-contents>

    <!-- Page Footer -->
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
          {{ $t("MSG_BTN_APRV_SUBM") }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMZ_00012', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    closePagePopup: {
      type: Function,
      default: null,
    },
    // 필수값: taskId, taskApprovalId
    // 선택값: moduleCode, picGroupId
    pageInitialData: {
      type: Object,
      required: true,
      validator(obj) {
        const has = Object.prototype.hasOwnProperty;
        return has.call(obj, 'taskId')
         && has.call(obj, 'taskApprovalId');
      },
    },
  },
  data() {
    return {
      maxContentsSize: 0,
      maxAtchFileSize: 10,
      isEditorViewerMode: false,
      isfileDisabled: false,
      isTransFileModify: false,
      isTitleReadonly: false,
      isRouteDisabled: false,
      apprvalUserTypeCode: [{ key: '', label: '' }],
      isWebEditorContentsHtml: false,

      approvalAttachGroupId: '',

      // approverDispFormat:'${userName}/${title}/${deptNm}/${email}',
      approverDispFormat: `\${approvalUserName}/\${title}/\${departmentName}/\${approvalUserEmail}`, // eslint-disable-line

      paramAprvUsers: [],
      paramAprvUserCnt: -1,

      localdata1: [],
      localdata2: [],

      resultDate: {},
      submOpini: '',

      approvalData: {
        approvalId: '',
        connectionApprovalId: '',
        approvalTypeCode: '',
        approvalProgressStateCode: '',
        approvalProgressStateName: '',
        approvalTitle: '',
        approvalContent: '',
        knoxBaseDivisionCode: '',
        approvalAfterProcessName: '',
        approvalAfterProcessSuccessYn: '',
        approvalCompletionDTM: '',
        approvalSubmissionUserId: '',
        picGroupId: '',
        knoxApprovalVersion: '',
        rightApprovalChangePossibilityYn: 'N',
        attachDocumentId: '',
        newAttachDocumentId: '',

        taskApprovalId: '',
        taskId: '',
        moduleCode: '',

        approvalUserList: {},
        attachFileList: {},
      },

      selectedUser: {
        userName: '',
        departmentName: '',
        userId: '',
        email: '',
      },
    };
  },
  computed: {
    // 계산된 속성, property로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  mounted() {
    // this.loadData();
  },

  datasets: [{
    id: 'dsFileData',
    type: 'local',
    data: 'localdata2',
    datafields: [
      { name: 'path', type: 'string', map: '0' },
    ],
  }],

  methods: {
    editorInitCallback() {
      this.loadData();
    },
    loadData() {
      const has = Object.prototype.hasOwnProperty
      // get contents data, grid etc..
      // 필수값 체크
      this.$refs.fileAttacher.attachRestrictionSize = this.maxAtchFileSize;

      if (this.loadDataValidation()) {
        return false
      }

      this.approvalData.taskApprovalId = this.pageInitialData.taskApprovalId;
      this.approvalData.taskId = this.pageInitialData.taskId;
      this.approvalData.moduleCode = this.pageInitialData.moduleCode;
      this.approvalData.picGroupId = this.pageInitialData.picGroupId;


      const userObj = {
        rightApprovalTypeCode: '0',
        epId: this.$store.getters.userInfo.userId,
        userName: this.$store.getters.userInfo.userName,
        deptNm: this.$store.getters.userInfo.departmentName,
        email: this.$store.getters.userInfo.email,
        title: this.$store.getters.userInfo.careerLevelCode, // TODO 직급명 확인중
      };
      this.addAprvGroupUser(userObj);

      // 결재 제목
      if (has.call(this.pageInitialData, 'title')) {
        this.approvalData.approvalTitle = this.pageInitialData.title;
      }

      // 결재 제목
      this.isTitleReadonly = this.loadIsTitleReadonly()

      // 결재자(담당자Group)
      /* Deprecated */
      if (utils.isEmpty(this.approvalData.picGroupId) === false) {
        this.searchPicGroupUsers(this.approvalData.picGroupId);
      }
      /* Deprecated */

      // 결재자(param)
      if (has.call(this.pageInitialData, 'aprvUsers')) {
        this.paramAprvUsers = utils.clone(this.pageInitialData.aprvUsers);
        this.paramAprvUserCnt = this.pageInitialData.aprvUsers.length;

        utils.forEach(this.paramAprvUsers, item => {
          utils.assign(item, { active: false });
        });

        utils.forEach(this.pageInitialData.aprvUsers, objUser => {
          this.searchKnoxUser(objUser);
        });
      }

      // 결재선 변경 가능여부  (디폴트 : 변경불가, Null인 경우 디폴트 값으로 셋팅)
      // 2019/10/28 결재선 컴포턴트 : Readonly 모드  프로퍼티 및 기능 없음.
      this.isRouteDisabled = this.loadIsRouteDisabled()


      // Knox에서 결재선 변경 가능여부  (디폴트 : 변경불가, Null인 경우 디폴트 값으로 셋팅)
      this.approvalData.rightApprovalChangePossibilityYn = this.loadRightApprovalChangePossibilityYn()

      // 결재첨부 편집가능여부 : 없음
      this.isfileDisabled = this.loadIsFileDisabled()

      // Doc ID를 통한 파일첨부 세팅시 해당 파일 수정가능여부 .
      this.isTransFileModify = this.loadIsTransFileModify()

      // template(velocity 처리)
      if (has.call(this.pageInitialData, 'objTemplate')) {
        const { objTemplate } = this.pageInitialData;

        if (has.call(objTemplate, 'templateId') === false
        || utils.isEmpty(objTemplate.templateId)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_CONFIRM'), 'templateId'));
          return false;
        }

        if (has.call(objTemplate, 'siteId') === false
        || utils.isEmpty(objTemplate.siteId)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_CONFIRM'), 'siteId'));
          return false;
        }

        this.approvalData.sendTemplateId = objTemplate.templateId;
        this.approvalData.siteId = objTemplate.siteId;
        this.selectTemplate(objTemplate);
      }


      // 본문수정가능여부 (디폴트 : 변경불가, Null인 경우 디폴트 값으로 셋팅)
      // 2019/10/28 Editor Component에 프로퍼티 혹은 Method를 통한 Readonly 처리 기능 없음.
      // 2019/11/08 기능 구현 완료.
      this.isEditorViewerMode = this.loadIsEditorViewerMode()

      // 첨부파일
      if (has.call(this.pageInitialData, 'attachDocumentId')) {
        if (this.pageInitialData.moduleCode === null || utils.isEmpty(this.pageInitialData.moduleCode)) {
          this.approvalAttachGroupId = 'ATG_CMZ_APRV_COMMON';
          utils.messageBox('error', utils.strFormat(this.$t('MSG_ALT_CHK_CONFIRM'), this.$t('MSG_TXT_MDLE')));
        } else {
          const attachParam = {
            // attachDocumentId : '',
            attachGroupId: 'ATG_CMZ_APRV_COMMON',
            attachItemId: 'ATG_CMZ_APRV_COMMON_00001',
            attachDocumentTypeCode: 'N',
            moduleCode: this.pageInitialData.moduleCode,
            attachDocumentIdList: this.pageInitialData.attachDocumentId,
          };
          this.copyAttachFile(attachParam);
        }
      } else {
        this.approvalAttachGroupId = 'ATG_CMZ_APRV_COMMON';
      }

      return true;
    },
    /** ***************************************************************************
        이벤트 영역
    ***************************************************************************** */
    positiveHandler() {
      console.log('positive');
    },
    negativeHandler() {
      console.log('negative');
    },
    // 상신
    onSend() {
      // 상신
      this.save();
    },
    // 취소
    onCancel() {
      this.closePagePopup('');
    },
    // 사용자 검색
    onSelectedUser(objUser) {
      if (objUser && objUser.epId !== null && objUser.epId !== '') {
        this.addAprvGroupUser(objUser);
        this.$refs.user.reset();
      }
    },

    onApprovalConfirm(sText) {
      this.submOpini = sText;
      if (sText !== null && sText !== undefined) {
        if (sText.length > 300) {
          utils.messageBox('warning',
            utils.strFormat(this.$t('MSG_ALT_NCELL_IS_WITHIN_NCELL'),
              this.$t('MSG_TXT_SUBM_OPINI'), '300'));
          return true;
        }
        const { approvalUserList } = this.resultDate;

        // 기안자에 상신의견 세팅
        if (approvalUserList.length > 0) {
          utils.forEach(approvalUserList, approvalUser => {
            if (approvalUser.rightApprovalTypeCode !== null
                && approvalUser.rightApprovalTypeCode !== undefined
                && approvalUser.rightApprovalTypeCode === '0') {
              const objApprovalUser = approvalUser;
              objApprovalUser.approvalOpinionContent = sText;
            }
          });
        }
        this.closePagePopup(this.resultDate);
        return true;
      }
      return false;
    },

    /** ***************************************************************************
    함수 영역 : 공통
    ***************************************************************************** */
    // 결재자 그리드 관련 함수

    // addAprvGroupUser 선택된 값에 따라 구분값 변경
    addAprvGroupUser(objUser) {
      const user = {
        rightApprovalTypeCode: objUser.rightApprovalTypeCode !== undefined ? objUser.rightApprovalTypeCode : '',
        approvalUserId: objUser.epId !== undefined ? objUser.epId : '',
        approvalUserName: objUser.userName !== undefined ? objUser.userName : '',
        departmentName: objUser.deptNm !== undefined ? objUser.deptNm : '',
        approvalUserEmail: objUser.email !== undefined ? objUser.email : '',
        title: objUser.title !== undefined ? objUser.title : '',
      };

      if (user.rightApprovalTypeCode === '0') {
        this.$refs.approvalManager.addDrafter(user);
      } else {
        this.$refs.approvalManager.addApprover(user);
      }
    },

    // 필수 값 체크
    // 그룹 결재자 리스트 조회
    searchPicGroupUsers(sPicGroupId) {
      http.request(this.$options.name, 'DTS_CMZ_00028', {
        path: {
          'pic-group-id': sPicGroupId,
        },
      }).then(res => {
        utils.forEach(res.data, item => {
          const resData = {
            rightApprovalTypeCode: item.rightApprovalCode,
            approvalUserId: item.picUserId,
            approvalUserName: item.picUserName,
            departmentName: item.picDepartmentName,
            approvalUserEmail: item.email,
            disFlag: this.isRouteDisabled,
            title: item.title,
          };

          this.$refs.approvalManager.addApprover(resData);
          // set aprvcode (item.email, item.rightApprovalCode);
          this.$refs.approvalManager.setApprovalTypeBy(item.picUserId, item.rightApprovalCode);
        });
      }).catch(error => {
        console.log(error);
      });
    },
    searchKnoxUser(objUser) {
      http.request(this.$options.name, 'DTS_CMY_00010', {
        path: {
          'ep-id': objUser.userId,
        },
      }).then(res => {
        utils.forEach(res.data, item => {
          const index = utils.findIndex(this.paramAprvUsers, { userId: item.epid, aprvCode: objUser.aprvCode, active: false });

          const resData = {
            rightApprovalTypeCode: objUser.aprvCode,
            approvalUserId: item.epid,
            approvalUserName: item.cn,
            departmentName: item.department,
            approvalUserEmail: item.mail,
            disFlag: this.isRouteDisabled,
            title: item.title,
            active: true,
          };

          if (index > -1) {
            this.paramAprvUsers[index] = resData;
          }

          this.paramAprvUserCnt -= 1;

          if (this.paramAprvUserCnt === 0) {
            this.setApprovalUserList(this.paramAprvUsers);
          }
        });
      }).catch(error => {
        console.log(error);
      });
    },
    copyAttachFile(objParams) {
      http.request(this.$options.name, 'DTS_CMZ_00085', {
        data: objParams,
      }).then(res => {
        this.approvalData.newAttachDocumentId = res.data.attachDocumentId;
        this.$refs.fileAttacher.searchAttachGroupItemListBy('ATG_CMZ_APRV_COMMON', res.data.attachDocumentId);
      }).catch(error => {
        console.log(error);
      });
    },
    setContent(sContent) {
      this.isWebEditorContentsHtml = true;
      // console.log(sContent);
      this.$refs.approvalWebEditor.setHtml(sContent);
    },
    save() {
      this.resultDate = {};

      if (this.isWebEditorContentsHtml) {
        this.approvalData.approvalContent = this.$refs.approvalWebEditor.getHtml();
      } else {
        this.approvalData.approvalContent = this.$refs.approvalWebEditor.getContent();
      }

      // 결재상신시 본문내용 사이즈 제한.
      this.maxContentsSize = utils.getConfigurationValue('CFG_CMZ_APRV_CONT_LIMIT_SIZE');
      if (utils.getByte(this.approvalData.approvalContent) > this.maxContentsSize) {
        utils.messageBox('warning', this.$t('MSG_ALT_SIZE_LIMIT_EXCEEDED'), this.maxContentsSize);
        return false;
      }

      // 결재 데이터
      const dataParams = utils.reduce(this.approvalData, (result, value, key) => {
        const objResult = utils.clone(result);
        if (utils.isUndefined(value) === false && value !== null) {
          objResult[key] = utils.isUndefined(value.key) ? utils.trim(value) : utils.trim(value.key);
        }
        return objResult;
      }, {});

      // User 데이터
      utils.assign(dataParams, { approvalUserList: this.$refs.approvalManager.getApprovalPathList() });

      // 첨부파일 관련 데이터
      utils.assign(dataParams, { attachFileList: this.$refs.fileAttacher.getAttachFileListInfo() });


      // validation // 첨부 파일리스트가 있을경우는 moduleCode가 필수임
      if (!this.formValidate(dataParams)) {
        return false;
      }

      this.resultDate = dataParams;
      // utils.messageBox('confirm', this.$t('MSG_ALT_SUBM'), null, this.onApprovalConfirm);

      utils.openTextAreaEditor(
        this.onApprovalConfirm,
        {
          title: this.$t('MSG_TXT_SUBM_OPINI'),
          size: 'sm',
          pageInitialData: {
            readonly: false,
            value: this.submOpini,
            positiveButtonText: this.$t('MSG_BTN_SUBM'),
            negativeButtonText: this.$t('MSG_BTN_CANCEL'),
            maxlength: 300,
          },
        },
      );

      return false;
    },
    setApprovalUserList(userList) {
      utils.forEach(userList, item => {
        if (item.approvalUserId) {
          const result = this.$refs.approvalManager.addApprover(item);
          if (result != false) {
            this.$refs.approvalManager.setApprovalTypeBy(item.approvalUserId, item.rightApprovalTypeCode);
          }
        }
      });
    },

    formValidate(formData) {
      let isVaildate = true;

      const objMsgList = [
        { approvalTitle: this.$t('MSG_TXT_TITLE') },
        { approvalContent: this.$t('MSG_TXT_CNTN') },
        { taskId: 'taskId' },
        { taskApprovalId: 'taskApprovalId' },
      ];

      //  const isSelectType = ['moduleCode'];
      utils.forEach(formData, (value, key) => {
        if (utils.findIndex(objMsgList, key) !== -1 && utils.isEmpty(formData[key])) {
          const objMsg = utils.find(objMsgList, key);
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), objMsg[key]));
          isVaildate = false;
          // TODO break;
          return false;
        }
        return true;
      });

      if (isVaildate === false) {
        return false;
      }

      let checkApprov = false;
      // 결재자 체크( 결재 1, 합의 2, 병렬7 존재 체크)
      utils.forEach(formData.approvalUserList, user => {
        const sRightApprovalTypeCode = `${user.rightApprovalTypeCode}`;

        if (sRightApprovalTypeCode === '1'
            || sRightApprovalTypeCode === '2'
            || sRightApprovalTypeCode === '7') {
          checkApprov = true;
        }
      });

      if (checkApprov === false) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_APRV'));
        isVaildate = false;
        return false;
      }

      // 첨부 파일이 존재 할경우만 체크
      if (formData.attachFileList.length > 0 && utils.isEmpty(formData.moduleCode)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_CONFIRM'), this.$t('MSG_TXT_MDLE')));
        isVaildate = false;
        return false;
      }
      // 결재 상신시 첨부파일 용량 사이즈 체크.
      if (this.$refs.fileAttacher.isUnderAttachFileSizeLimit(true) === false) {
        return false;
      }

      if (formData.attachFileList.length > 10) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_ATCH_MAX_CNT'), '10'));
        isVaildate = false;
        return false;
      }

      return isVaildate;
    },

    /** ***************************************************************************
        함수 영역 : CallBack
        ***************************************************************************** */

    /** ***************************************************************************
        기타:
    ***************************************************************************** */
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
          this.setContent(res.data.sendTmpltCntn);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    loadIsTitleReadonly() {
      const has = Object.prototype.hasOwnProperty
      if (has.call(this.pageInitialData, 'titleReadonly')) {
        // 제목 수정가능여부 값이 null 인경우 - 기본적으로 수정가능.
        if (this.pageInitialData.titleReadonly == null || !this.pageInitialData.titleReadonly) {
          return false
        } else if (this.pageInitialData.titleReadonly == true) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    loadIsRouteDisabled() {
      const has = Object.prototype.hasOwnProperty
      if (has.call(this.pageInitialData, 'popupRoutesModify')) {
        // 본문수정가능여부 값이 null 인경우

        if (this.pageInitialData.popupRoutesModify == null || !this.pageInitialData.popupRoutesModify) return true
        else if (this.pageInitialData.popupRoutesModify == true) return false
        else return true
      } else {
        return true
      }
    },
    loadRightApprovalChangePossibilityYn() {
      const has = Object.prototype.hasOwnProperty
      if (has.call(this.pageInitialData, 'knoxRoutesModify')) {
        // 본문수정가능여부 값이 null 인경우
        if (this.pageInitialData.knoxRoutesModify === false) return 'N'
        else if (this.pageInitialData.knoxRoutesModify === true) return 'Y'
        else return 'N'
      } else {
        return 'N'
      }
    },
    loadIsFileDisabled() {
      const has = Object.prototype.hasOwnProperty
      if (has.call(this.pageInitialData, 'attachModify')) {
        // 첨부파일 수정가능여부Default : false
        if (this.pageInitialData.attachModify === null || !this.pageInitialData.attachModify) {
          return true
        } else if (this.pageInitialData.attachModify === true) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    },
    loadIsTransFileModify() {
      const has = Object.prototype.hasOwnProperty
      if (has.call(this.pageInitialData, 'transFileModify')) {
        // 본문수정가능여부 값이 null 인경우
        if (this.pageInitialData.transFileModify === null || !this.pageInitialData.transFileModify) {
          return true
        } else if (this.pageInitialData.transFileModify === true) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    },
    loadIsEditorViewerMode() {
      const has = Object.prototype.hasOwnProperty
      if (has.call(this.pageInitialData, 'contentsModify')) {
        // 본문수정가능여부 값이 null 인경우
        if (this.pageInitialData.contentsModify === null || !this.pageInitialData.contentsModify) return true
        else if (this.pageInitialData.contentsModify === true) return false
        else return true
      } else {
        return false
      }
    },
    loadDataValidation() {
      const has = Object.prototype.hasOwnProperty
      const msgType = 'error';
      let msgText = '';
      const subMsg = null;
      const positiveHandler = this.closePagePopup;
      const negativeHandler = null;

      if (this.pageInitialData === null) {
        msgText = utils.strFormat(this.$t('MSG_ALT_CHK_CONFIRM'), 'taskApprovalId');
        utils.messageBox(msgType, msgText, subMsg, positiveHandler, negativeHandler);
        return false;
      }

      if (has.call(this.pageInitialData, 'taskApprovalId') === false
          || utils.isEmpty(this.pageInitialData.taskApprovalId)) {
        msgText = utils.strFormat(this.$t('MSG_ALT_CHK_CONFIRM'), 'taskApprovalId');
        utils.messageBox(msgType, msgText, subMsg, positiveHandler, negativeHandler);
        return false;
      }

      if (has.call(this.pageInitialData, 'taskId') === false
          || utils.isEmpty(this.pageInitialData.taskId)) {
        msgText = utils.strFormat(this.$t('MSG_ALT_CHK_CONFIRM'), 'taskId');

        utils.messageBox(msgType, msgText, subMsg, positiveHandler, negativeHandler);
        return false;
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
