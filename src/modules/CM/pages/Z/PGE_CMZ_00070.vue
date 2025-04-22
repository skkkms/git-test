<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_ATTH_ITEM_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-4">
            <sui-text-field
              ref="attachItemNm"
              v-model.trim="attachItemNm"
              :disabled="false"
              :readonly="false"
              maxlength="50"
              @keyup.enter="onSearch"
              @keyup="onKeyUpInput($event, 'attachItemNm')"
            />
          </div>
          <div class="col-xs-2">
            <sui-input-label :label="$t('MSG_TXT_FILE_NM')" :vertical="false" />
          </div>
          <div class="col-xs-4">
            <sui-text-field
              ref="attachFileNm"
              v-model.trim="attachFileNm"
              :disabled="false"
              :readonly="false"
              maxlength="30"
              @keyup.enter="onSearch"
              @keyup="onKeyUpInput($event, 'attachFileNm')"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label :label="$t('MSG_TXT_USR_NM')" :vertical="false" />
          </div>
          <div class="col-xs-4">
            <sui-text-field
              ref="dnloadUserNm"
              v-model.trim="dnloadUserNm"
              :disabled="false"
              :readonly="false"
              maxlength="20"
              @keyup.enter="onSearch"
              @keyup="onKeyUpInput($event, 'dnloadUserNm')"
            />
          </div>
          <div class="col-xs-2">
            <sui-input-label :label="$t('MSG_TXT_PRD')" :vertical="false" />
          </div>
          <div class="col-xs-4">
            <ur-range-picker
              ref="rangeDate"
              v-model="range"
              one-input-mode
              init="week-1"
              :inputType=this.userDateFormat
              :modelType=this.userDateFormat
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button type="button" class="comm_btn_Reset" @click="onReset">
            {{ $t("MSG_BTN_RESET") }}
          </sui-button>
          <sui-button
            v-permission:read="$options.name"
            type="button"
            class="comm_btn_Scr"
            @click="onSearch"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="grid"
        :multiselect="false"
        :data-source="dsDownloadHist"
        :headers="gridColumns0"
        :initial-pagesize="10"
      /> 
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button type="button" class="comm_btn_solid" @click="onClose">
          {{ $t("MSG_BTN_CLOSE") }}
        </sui-button>
      </div>
    </sui-page-footer>
    <sui-popup v-model="isShownPopup" :title="$t('MSG_TIT_DLOAD_RSN')">
      <p01
        :pageId="this.$options.name"
        :fileDownloadReasonContent="fileDownloadReasonContent"
        @onClickClose="onClickClose('isShownPopup')"
      />
    </sui-popup>
  </sui-page>
</template>

<script>
// eslint-disable-next-line import/extensions
import p01 from './components/PGE_CMZ_00070_P01';
import { urDataSet } from "uidev-component/index.js";

const dateFields = [
  "firstRegistrationDTM",
  "finalModificationDTM",
  "pageUsePriodStartDatetime",
  "pageUsePriodFinishDatetime",
  "fileDownloadDTM",
];

export default {
  name: "PGE_CMZ_00070", // eslint-disable-line vue/name-property-casing
  components: { p01 },
  props: {
    closePagePopup: {
      type: Function,
      required: false,
      default: null,
    },
    pageInitialData: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      attachItemNm: "", // 첨부항목명
      attachFileNm: "", // 첨부파일명
      dnloadUserNm: "", // 다운로드 사용자명
      range: [],
      isShownPopup: false,
      fileDownloadReasonContent: "",
      localdata0: [],
      userDateFormat: this.$store.getters.userInfo.dateFormat,
      // eslint-disable-next-line new-cap
      dsDownloadHist: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
    };
  },
  mounted() {
    if (
      utils.isEmpty(this.pageInitialData.attachGroupId) ||
      utils.isEmpty(this.pageInitialData.attachDocumentId)
    ) {
      // eslint-disable-next-line max-len
        console.log(`첨부그룹ID값(${this.pageInitialData.attachGroupId}) 과 첨부문서ID값(${this.pageInitialData.attachDocumentId})은 존재해야 합니다.`);
    } else {
      this.onSearch();
    }
  },

  created() {
    const that = this;
    this.dataList = [];
    this.gridColumns0 = [
      {
        text: this.$t("MSG_TXT_ATTH_ITEM_NM"),
        value: "attachItemName",
      },
      {
        text: this.$t("MSG_TXT_FILE_NM"),
        value: "fileName",
      },
      {
        text: this.$t("MSG_TXT_DOWN_USER"),
        value: "fileDownloadUserId",
        width: "200px",
        component: {
          props: ["row", "value"],
          template: `<cmp-user-name-link
              :pageId="'${this.$options.name}'"
              :displayType="'1'"
              :displayLanguageId="row.displayLanguageId"
              :userId="row.fileDownloadUserId"
              :userName="row.userName"
              :departmentName="row.departmentName"
              :type="'link'"
            />
            `,
        },
      },
      {
        text: this.$t("MSG_TXT_DOWN_DTM"),
        value: "fileDownloadDTM",
        width: "150px",
      },
      {
        text: this.$t("MSG_TXT_RSN"),
        value: "buttonList",
        width: "80px",
        component: {
          props: ["row", "value"],

          template: `
                <ur-button
                  type="button"
                  class="link"
                  style="text-align:left;"
                  @click ="handlingClick"
                >
                  {{row.buttonList[0].label}}
                
                </ur-button>`
              ,
          methods: {
            handlingClick() {
              that.onGridButtonClicked(this.value);
            },
          },
        },
      },
    ];
  },

  methods: {
    /**
     * 다운로드 이력 목록 조회
     */
    onSearch() {
      if (this.onClickValidate()) return false;
      const toDate = utils.dateformatToServer(this.range[1]);
      const fromDate = utils.dateformatToServer(this.range[0]);
      const queryParams = {
        attachItemName: this.attachItemNm,
        fileName: this.attachFileNm,
        userName: this.dnloadUserNm,
        fileDownloadToDTM: toDate,
        fileDownloadFromDTM: fromDate,
      };
      // /api/v1/common/download-history/{attach-group-id}/{attach-document-id}
      http
        .request(this.$options.name, "DTS_CMZ_00154", {
          path: {
            "attach-group-id": this.pageInitialData.attachGroupId,
            "attach-document-id": this.pageInitialData.attachDocumentId,
          },
          query: queryParams,
        })
        .then((res) => {
          utils.dateformatToClientInArray(res.data, dateFields);
          utils.forEach(res.data, (obj, key) => {
            // row 이력 조회 버튼 정보 생성g
            res.data[key].buttonList = [
              {
                label: this.$t("MSG_BTN_SRCH"),
                key: obj.fileDownloadReasonContent,
                type: "positive",
              },
            ];
            // 엑셀다운로드용 수정자 컬럼 생성
            const userName = utils.isEqual(
              this.$store.getters.userInfo.langId,
              "ko"
            )
              ? obj.userName
              : obj.userGlobalName;
            res.data[key].excelFileDownUserName = `${userName}/${obj.knoxId}`;
          });
          this.dsDownloadHist.setData(res.data); // 데이터 셋에 데이터를 넣는 함수
        });

      return null;
    },
    /**
     * 리셋
     */
    onReset() {
      this.attachItemNm = "";
      this.attachFileNm = "";
      this.dnloadUserNm = "";
      const dToday = utils.now('YYYY-MM-DD');
      this.range = [utils.dateformatToClient(utils.addDay(dToday, -6), 'S'),utils.dateformatToClient(dToday)];
    },
    /**
     * 다운로드 사유 조회
     */
    onGridButtonClicked(event) {
      this.fileDownloadReasonContent = event.key;
      this.isShownPopup = true;
    },
    onClickClose(key) {
      this[key] = false;
    },
    /**
     * rangeDate Picker 유효성 체크
     */
    validCheck() {
      const toIsNull = utils.isUndefined(this.$refs.rangeDate.range.to);
      const fromIsNull = utils.isUndefined(this.$refs.rangeDate.range.from);

      if (!utils.isEqual(toIsNull, fromIsNull)) {
        utils.messageBox("warning", this.$t("MSG_ALT_DATE_NOT_VAL"));
        return false;
      }

      return true;
    },
    /**
     * 검색조건 특수문자 입력제한
     */
    onKeyUpInput(event, name) {
      const searchFieldNewText = this[name];

      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox(
          "warning",
          this.$t("MSG_ALT_NO_SPECL_CHAR"),
          null,
          () => {
            this[name] = "";
            this.$refs[name].setFocus();
          }
        );
      } else {
        this[name] = searchFieldNewText;
      }
    },
    /* 달력의 오류를 확인할 수 있는 validate 함수 */
    onClickValidate() {
      if (utils.isEmpty(this.range[1]) || utils.isEmpty(this.range[0])) {
        utils.messageBox(
          "warning",
          utils.strFormat(this.$t("MSG_ALT_CHK_NCSR"), this.$t("MSG_TXT_PRD")),
          null,
          null
        );
        return true;
      }
      if (!this.$refs.rangeDate.isValid()) {
        utils.messageBox("warning", this.$t("MSG_ALT_CHK_DT"), null, null);
        return true;
      }
      return false;
    },
    onClose() {
      this.closePagePopup("");
    },
  },
};
</script>

<style scoped>
.-page-popup__contents .-page .-page-contents {
  max-height: 100%;
  overflow-y: hidden;
}
</style>
