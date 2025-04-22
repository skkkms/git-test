<template>
  <div>
    <div class="comm_popup_wrap_large">
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_WRD_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-4">
            <div class="comm_label">
              {{ this.wordName }}
            </div>
          </div>
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_WRD_PHSC_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-4">
            <div class="comm_label">
              {{ this.wordPhysicalName }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_WRD_EN_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <div class="comm_label">
              {{ this.wordNameEn }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_WRD_TYP_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-4">
            <div class="comm_label">
              {{ this.wordTypeName }}
            </div>
          </div>
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_DOM_CTGR_CON')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-4">
            <div class="comm_label">
              {{ this.domainClassificationName }}
            </div>
            <div class="comm_label">
              {{ this.domainName }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_CHIN')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <div class="comm_label">
              {{ this.chineseCharacterWord }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_WRD_SRC')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <textarea
              v-model="originWord"
              :disabled="true"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_WRD_DSCR')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <textarea
              v-model="wordsContent"
              :disabled="true"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_APPL_CNTN')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <textarea v-model="leavingWordsApp" />
          </div>
        </div>
      </div>
      <div class="mrT10" />
      <h4>
        <sui-input-label
          :label="$t('MSG_TIT_SYNO_LIST')"
          :vertical="false"
        />
      </h4>
      <div class="mrT10" />
      <sui-s-grid
        ref="gridListRelatedTerms"
        :data-source="dataset0"
        :headers="gridColumns0"
        :options="options"
        :showRowsPerPageControl="false"
        width="100%"
      />
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onPopupCancelClicked"
      >
        {{ $t('MSG_BTN_CANCEL') }}
      </sui-button>
      <sui-button
        v-permission:create="'PGE_DST_00002'"
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
// eslint-disable-next-line import/extensions
import { urDataSet } from 'uidev-component/index.js';

export default {
  name: 'PGEDST00002P02',
  props: {
    parentPageId: {
      type: String,
      default: '',
    },
    biddingInformationParam: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      wordName: '',
      wordTypeName: '',
      wordPhysicalName: '',
      wordNameEn: '',
      domainClassificationId: '',
      domainName: '',
      domainId: '',
      applicationUserId: this.$store.getters.userInfo.knoxId,
      chineseCharacterWord: '',
      originWord: '',
      wordsContent: '',
      domainClassificationName: '',
      leavingWordsApp: '',
      wordTermData: [],
      selectData: {
        COD_WRD_TYPE_DIV: { label: '', key: '' },
      },
      // eslint-disable-next-line new-cap
      dataset0: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.gridColumns0 = [
      {
        text: this.$t('MSG_TXT_WRD_NM'),
        value: 'similarityWordName',
      },
      {
        text: this.$t('MSG_TXT_WRD_DSCR'),
        value: 'similarityWordContent',
      },
    ];
  },
  mounted() {
    this.setData();
    this.getTermRelation(this.biddingInformationParam.wordId);
  },
  methods: {
    setData() {
      this.selectData.COD_WRD_TYPE_DIV.key = this.biddingInformationParam.wordTypeCode;
      this.selectData.COD_WRD_TYPE_DIV.label = this.biddingInformationParam.wordTypeName;

      // this.selectData.COD_WRD_TYPE_DIV.key  = this.biddingInformationParam.wordTypeCode;
      this.domainName = this.biddingInformationParam.domainName;
      this.domainId = this.biddingInformationParam.domainId;
      this.wordName = this.biddingInformationParam.wordName;
      this.wordPhysicalName = this.biddingInformationParam.wordId;
      this.wordNameEn = this.biddingInformationParam.wordEnglishName;
      this.domainClassificationId = this.biddingInformationParam.domainClassificationID;
      this.domainClassificationName = this.biddingInformationParam.domainClassificationName;
      this.applicationUserId = this.$store.getters.userInfo.knoxId;
      this.chineseCharacterWord = this.biddingInformationParam.wordChineseCharacters;
      this.originWord = this.biddingInformationParam.wordSource;
      // this.wordsContent= this.biddingInformationParam.wordDescription;
      this.wordsContent = this.biddingInformationParam.wordContent;
      this.wordTypeName = this.biddingInformationParam.wordTypeName;
      this.synonymList(this.biddingInformationParam.wordName);
      console.log(this.dataset0);
    },
    // display similar word list
    synonymList(word) {
      const queryParams = { 'word-name': word };
      http.request('PGE_DST_00002', 'DTS_DST_00089', {
        query: queryParams,
      })
        .then(res => {
          this.dataset0.setData(res.data);
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          console.log('error occured during search click');
        });
    },
    // eslint-disable-next-line no-unused-vars
    showRetrieveCall(event) {
      console.log('Call popup');
    },
    submitRequest(event) {
      if (this.wordTermData.length > 0) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_RLT_TRM_EXISTS'), null));
      // eslint-disable-next-line brace-style
      }
      // utils.isEmpty
      else if (this.leavingWordsApp.trim()) {
        // utils.confirm(this.$t('MSG_ALT_IS_DEL_DATA'), this.$t('MSG_TXT_YES'), this.$t('MSG_TXT_NO'), this.submitRequestApi, () => {});
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_APPY'), null, this.confirmRouter);
      } else {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_APPL_CNTN'), null));
        return false;
      }
      return true;
    },
    confirmRouter() {
      if (utils.isEqual(utils.getConfigurationValue('CFG_DST_KNOX_APRV_YN'), 'Y')) {
        // this.personInChargeList();
      } else {
        this.submitRequestApi();
      }
    },
    submitRequestApi(approvalData) {
      const queryParams = {
        domainClassificationID: this.domainClassificationId,
        domainClassificationName: this.domainClassificationName,
        domainName: this.domainName,
        domainId: this.domainId,
        wordChineseCharacters: this.chineseCharacterWord,
        wordApplicationContent: this.leavingWordsApp,
        wordEnglishName: this.wordNameEn,
        wordId: this.wordPhysicalName,
        wordName: this.wordName,
        wordSource: this.wordSource,
        wordTypeCode: this.selectData.COD_WRD_TYPE_DIV.key,
        wordContent: this.wordsContent,
        approvalData: null,
      };

      // 결재 상신 정보가 있으면 결재상신 정보 병합.
      if (!utils.isEmpty(approvalData)) {
        utils.assign(queryParams, { approvalData });
      }

      http.request('PGE_DST_00002', 'DTS_DST_00014', {
        path: {
          'word-id': this.wordPhysicalName,
        },
        data: queryParams,
      }).then(res => {
        if (res.data.resultCode == '1') {
          this.conFirm('success', this.$t('MSG_ALT_PRGS_OK'), null);
        } else {
          this.conFirm('warning', this.$t('MSG_ALT_IS_EXISTS_APPL'), null);
        }
        this.onPopupCancelClicked();
      }).catch(error => {
        console.log(error);
      });
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
    onPopupCancelClicked() {
      this.$emit('exit', true);
    },
    getTermRelation(id) {
      if (id === null) {
        // this.datasetInfo.setRawData([]);
      } else {
        http
          .request('PGE_DST_00002', 'DTS_DST_00077', {
            path: {
              'word-id': id,
            },
          })
          .then(res => {
            this.wordTermData = res.data;
          })
          .catch(error => {
            console.log('On Row Select Error');
          });
      }
    },
    /**
     * 결재 담당자 조회 및 생성
     */
    // personInChargeList() {
    //   http.request('PGE_DST_00002', 'DTS_CMZ_00136', {
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
    //     templateId: 'TMP_DST_APRV_DOC_WRD',
    //     siteId: this.$store.getters.userInfo.siteId,
    //     langId: this.$store.getters.userInfo.langId,
    //     datatStdDivNm: this.$t('MSG_TXT_WRD'),
    //     datatStdApplDivNm: this.$t('MSG_TXT_DEL'),
    //     applUserNm: this.$store.getters.userInfo.userName,
    //     dataStdApplCntn: utils.isEmpty(this.leavingWordsApp) ? '' : this.leavingWordsApp,
    //     dataStdNm: utils.isEmpty(this.wordName) ? '' : this.wordName,
    //     dataStdId: utils.isEmpty(this.wordPhysicalName) ? '' : this.wordPhysicalName,
    //     dataStdEnNm: utils.isEmpty(this.wordNameEn) ? '' : this.wordNameEn,
    //     wrdTypeDivNm: utils.isEmpty(this.selectData.COD_WRD_TYPE_DIV.label) ? '' : this.selectData.COD_WRD_TYPE_DIV.label,
    //     domClsfNm: utils.isEmpty(this.domainClassificationName) ? '' : this.domainClassificationName,
    //     domNm: utils.isEmpty(this.domainName) ? '' : this.domainName,
    //     stdWrdChinCntn: utils.isEmpty(this.chineseCharacterWord) ? '' : this.chineseCharacterWord,
    //     stdSrcCntn: utils.isEmpty(this.originWord) ? '' : this.originWord,
    //     dataStdCntn: utils.isEmpty(this.wordsContent) ? '' : this.wordsContent,
    //     tcdmDqIfList: [],
    //   };

    //   utils.openLayerPopup('PGE_CMZ_00012', this.aprvPopupCallback, {
    //     pageInitialData: {
    //       // 필수: 업무코드, 업무결재Id
    //       taskId: 'TSK_CM006003',
    //       taskApprovalId: 'uid',

    //       // 결재 제목
    //       title: `${this.$t('MSG_TXT_DST_APRV_PRFX')} ${this.$t('MSG_TXT_WRD')} ${this.$t('MSG_TXT_DEL')} (${this.$t('MSG_TXT_STD_LGC_NM')} : ${this.wordName})`,
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
