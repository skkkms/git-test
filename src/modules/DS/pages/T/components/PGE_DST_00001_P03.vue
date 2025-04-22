<template>
  <div>
    <div class="comm_popup_wrap_large">
      <div class="mrB10" />
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DOM_CLSF_NM')" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ this.domainClassificationName }}
            </div>
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DOMAIN_NAME')" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ this.domainName }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DOM_PHSC_NM')" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ this.domainPhysName }}
            </div>
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DT_TYP_NM')" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ this.domainDataTypeName }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_LEN')" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ this.length }}
            </div>
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DECM_LGHT')" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ this.decimalLength }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DOM_CNTN')"
              :required="true"
            />
          </div>
          <div class="col-xs-11">
            <textarea v-model="domainContent">Text</textarea>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_APPL_CNTN')"
              :required="true"
            />
          </div>
          <div class="col-xs-11">
            <textarea v-model="domainApplyContent">TextArea</textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onPopupCancelClicked"
      >
        {{ $t('MSG_BTN_CLOSE') }}
      </sui-button>
      <sui-button
        v-permission:create="'PGE_DST_00001'"
        type="button"
        class="comm_btn_solid"
        @click="submitRequest"
      >
        {{ $t('MSG_BTN_APPL') }}
      </sui-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PGE_DST_00001_P03', // eslint-disable-line vue/name-property-casing
  props: {
    parentPageId: String,
    biddingInformationParam: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      domainClassificationName: '',
      domainName: '',
      domainPhysName: '',
      length: '',
      decimalLength: '',
      domainContent: '',
      biddingAnnouncementInfo: '',
      applicantId: '',
      domainApplyContent: '',
      domainDataTypeName: '',
      domainDataTypeCode: '',
    };
  },
  computed: {},
  watch: {},
  datasets: [],
  mounted() {
    this.domainClassificationName = this.biddingInformationParam.domainClassificationName;
    this.domainName = this.biddingInformationParam.domainName;
    this.domainPhysName = this.biddingInformationParam.domainId;
    this.domainDataTypeName = this.biddingInformationParam.domainDataTypeName;
    this.domainDataTypeCode = this.biddingInformationParam.domainDataTypeCode;
    // console.log ("TEST + " +   this.domainDataTypeCode )
    this.length = this.biddingInformationParam.domainLength;
    this.decimalLength = this.biddingInformationParam.domainDataDecimalLength;
    this.domainContent = this.biddingInformationParam.domainContent;
    // this.applicantId = this.biddingInformationParam.applicantId;
    this.applicantId = this.$store.getters.userInfo.knoxId;
  },

  methods: {
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
    onClose() {
      console.log('onConfirm');
    },
    submitRequest(event) {
      // utils.isEmpty
      if (!this.domainApplyContent.trim()) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_APPL_CNTN'), null));
      } else if (!this.domainContent.trim()) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_DOM_DSCR'), null));
      } else {
        // utils.confirm(this.$t('MSG_ALT_WANT_APPY'), this.$t('MSG_TXT_YES'), this.$t('MSG_TXT_NO'), this.submitRequestApi, () => {});
        utils.messageBox('confirm',
          this.$t('MSG_ALT_WANT_APPY'),
          null,
          this.confirmRouter);
      }
    },
    confirmRouter() {
      if (utils.isEqual(utils.getConfigurationValue('CFG_DST_KNOX_APRV_YN'), 'Y')) {
        //this.personInChargeList();
      } else {
        this.submitRequestApi();
      }
    },
    submitRequestApi(approvalData) {
      const queryParams = {
        applicationUserId: this.applicantId,
        domainApplicationContent: this.domainApplyContent,
        domainClassificationName: this.domainClassificationName,
        domainContent: this.domainContent,
        domainDataDecimalLength: this.decimalLength,
        domainDataTypeCode: this.domainDataTypeCode,
        domainId: this.domainPhysName,
        domainLength: this.length,
        domainName: this.domainName,
        approvalData: null,
      };

      // 결재 상신 정보가 있으면 결재상신 정보 병합.
      if (!utils.isEmpty(approvalData)) {
        utils.assign(queryParams, { approvalData });
      }

      http.request('PGE_DST_00001', 'DTS_DST_00005', {
        path: {
          'domain-id': this.domainPhysName,
        },
        data: queryParams,
      }).then(res => {
        if (res.data.resultCode == '1') {
          this.conFirm('success', this.$t('MSG_ALT_PRGS_OK'), null);
          this.onPopupCancelClicked();
        } else {
          this.conFirm('warning', this.$t('MSG_ALT_IS_EXISTS_APPL'), null);
          this.onPopupCancelClicked();
        }
      }).catch(error => {
        console.log(error);
      });
    },
    onPopupCancelClicked() {
      this.$emit('exit', true);
    },
    /**
     * 결재 담당자 조회 및 생성
     */
    // personInChargeList() {
    //   http.request('PGE_DST_00001', 'DTS_CMZ_00136', {
    //     path: {
    //       'pic-type-id': 'PIC_DST_DATA_STD_APRV',
    //     },
    //     query: {
    //     },
    //   }).then(res => {
    //     const personInChargeListP03 = [];
    //     utils.forEach(res.data, obj => {
    //       const userInfo = {
    //         userId: obj.userId,
    //         aprvCode: obj.rightApprovalCode,
    //       };
    //       personInChargeListP03.push(userInfo);
    //     });
    //     this.onAprvClick(personInChargeListP03);
    //   });
    // },
    // /*
    //  * 결재 상신 팝업
    //  */
    // onAprvClick(personInChargeList) {
    //   const objTemplate = {
    //     // templateId: 'TMP_DST_APRV_DOC_DOM',
    //     templateId: 'TMP_DST_APRV_DOC_DOM',
    //     siteId: this.$store.getters.userInfo.siteId,
    //     langId: this.$store.getters.userInfo.langId,
    //     datatStdDivNm: this.$t('MSG_TXT_DOM'),
    //     datatStdApplDivNm: this.$t('MSG_TXT_MOD'),
    //     applUserNm: this.$store.getters.userInfo.userName,
    //     dataStdApplCntn: utils.isEmpty(this.domainApplyContent) ? '' : this.domainApplyContent,
    //     domClsfNm: utils.isEmpty(this.domainClassificationName) ? '' : this.domainClassificationName,
    //     dataStdNm: utils.isEmpty(this.domainPhysName) ? '' : this.domainPhysName,
    //     dataStdId: utils.isEmpty(this.domainPhysName) ? '' : this.domainPhysName,
    //     domDataTypeNm: utils.isEmpty(this.domainDataTypeName) ? '' : this.domainDataTypeName,
    //     domDataLght: utils.isNull(this.length) ? '' : this.length,
    //     domDataDecmLght: utils.isNull(this.decimalLength) ? '' : this.decimalLength,
    //     dataStdCntn: utils.isEmpty(this.domainContent) ? '' : this.domainContent,
    //     tcdmDqIfList: [],
    //   };

    //   utils.openLayerPopup('PGE_CMZ_00012', this.aprvPopupCallback, {
    //     pageInitialData: {
    //       // 필수: 업무코드, 업무결재Id
    //       taskId: 'TSK_CM006003',
    //       taskApprovalId: 'uid',

    //       // 결재 제목
    //       title: `${this.$t('MSG_TXT_DST_APRV_PRFX')} ${this.$t('MSG_TXT_DOM')} ${this.$t('MSG_TXT_MOD')} (${this.$t('MSG_TXT_STD_LGC_NM')} : ${this.domainPhysName})`,
    //       titleReadonly: true,

    //       // 결재 Route
    //       // 선택:담당자그룹Id로 결재자 조회시 사용
    //       // picGroupId: 'PIC_CMS_DATA_EXTC',
    //       aprvUsers: personInChargeList,
    //       popupRoutesModify: false,
    //       knoxRoutesModify: false,

    //       // 선택: 첨부파일 DocId
    //       // attachDocumentId: [],
    //       //* 결제에 첨부파일을 등록할경우 모듈 코드 값이 필수
    //       // moduleCode: 'CM',

    //       attachModify: false,
    //       // 결재본문
    //       objTemplate,
    //       contentsModify: false,

    //     },
    //     size: 'xlg',
    //   });
    // },

    // /*
    //  * 결재 상신 팝업 callback
    //  */
    // aprvPopupCallback(objAprv) {
    //   if (utils.isEmpty(objAprv) === false) {
    //     this.submitRequestApi(objAprv);
    //   }
    // },
  },
};
</script>

<style scoped>
</style>
