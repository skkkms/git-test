<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_MDLE')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-module-submodule-select
              ref="selectModule"
              :pageId="this.$options.name"
              :selectedMd="searchFrame.selectedCodeValue.moduleCode"
              :selectedSmd="searchFrame.selectedCodeValue.subModuleCode"
              defaultMdOption="all"
              defaultSmdOption="all"
              class="dp_flex"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_TYPE')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="selectSendTemplateType"
              :selected="searchFrame.selectedCodeValue.sendTemplateTypeCode"
              :pageId="this.$options.name"
              codeId="COD_SEND_TMPLT_TYPE"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEARCH_COND')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="selectSendTemplateSearchCond"
              :selected="searchFrame.selectedCodeValue.sendTemplateSearchCond"
              :pageId="this.$options.name"
              codeId="COD_SEND_TMPLT_SEARCH_COND"
              defaultOption="all"
              :initialSelectedIndex="0"
              style="width: 55%"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model.trim="searchFrame.sendTemplateSearchWords"
              maxlength="50"
              @keyup.enter="onSearchClick"
            />
          </div>
          <div class="col-xs-1 nodata" />
          <div class="col-xs-3" />
        </div>
        <div class="btn_wrap">
          <sui-button
            v-permission:read="this.$options.name"
            type="button"
            class="comm_btn_Reset"
            @click="onResetClick"
          >
            {{ $t("MSG_BTN_RESET") }}
          </sui-button>
          <sui-button
            v-permission:read="this.$options.name"
            type="button"
            class="comm_btn_Scr"
            @click="onSearchClick"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />

      <sui-s-grid
        :headers="gridColumns0"
        :data-source="ds0"
        :options="options"
        :showRowsPerPageControl="false"
        @grid:selected="onDatasetSelectionChanged"
      />

      <div class="mrB30" />
      <div class="comm_title_wrap">
        <h4>{{ $t("MSG_TXT_SEND_TMPLT_PRVW") }}</h4>
      </div>
      <div class="">
        <sui-web-editor
          v-show="sendTemplateTypeFlag"
          ref="viewer"
          :initial-value="viewerContent"
          :height="200"
          class="width100"
        />
        <textarea
          v-show="!sendTemplateTypeFlag"
          v-model="sendTemplateContent"
          rows="8"
          readonly
        />
      </div>
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap mrR30">
        <sui-button
          v-permission:read="this.$options.name"
          type="button"
          class="comm_btn_border"
          @click="closePagePopup"
        >
          {{ $t("MSG_BTN_CANCEL") }}
        </sui-button>
        <sui-button
          v-permission:read="this.$options.name"
          type="button"
          class="comm_btn_solid"
          @click="onSelectClick"
        >
          {{ $t("MSG_BTN_SELT") }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
import BasePage from "~cm/components/BasePage";
import { urDataSet } from "uidev-component/index.js";

export default {
  name: "PGE_CMZ_00042", // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    closePagePopup: {
      type: Function,
      default() {},
    },
  },
  data() {
    return {
      searchFrame: {
        selectedCodeValue: {
          moduleCode: {
            key: "",
            label: "",
          },
          subModuleCode: {
            key: "",
            label: "",
          },
          sendTemplateTypeCode: {
            label: "",
            key: "",
          },
          sendTemplateSearchCond: {
            label: "",
            key: "",
          },
          searchSiteId: {
            label: "",
            key: "",
          },
        },
        sendTemplateSearchWords: "",
      },
      viewerContent: "viewer",
      localdata0: [],
      ds0: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      
      sendTemplateContent: "",
      sendTemplateTypeCode: "",
    };
  },
  computed: {
    sendTemplateTypeFlag() {
      return utils.isEqual(this.sendTemplateTypeCode, "H");
    },
  },
  watch: {},
  created() {
    this.dataList = [];
    this.gridColumns0 = [
      {
        text: this.$t("MSG_TXT_MDLE"),
        value: "moduleName",
        width: "100px",
      },
      {
        text: this.$t("MSG_TXT_SMDLE"),
        value: "subModuleName",
        width: "100px",
      },
      {
        text: this.$t("MSG_TXT_TYPE"),
        value: "sendTemplateTypeName",
      },
      {
        text: this.$t("MSG_TXT_SITE"),
        value: "siteName",
      },
      {
        text: this.$t("MSG_TXT_SEND_TMPLT_ID"),
        value: "sendTemplateId",
      },
      {
        text: this.$t("MSG_TXT_SEND_TMPLT_NM"),
        value: "sendTemplateName",
      },
    ];
  },
  methods: {
    onDatasetSelectionChanged(selections) {
      if (!selections) {
        return;
      }
      const selected = selections[0];
      if (!utils.isUndefined(selected)) {
        this.sendTemplateTypeCode = selected.sendTemplateTypeCode;
        const { sendTemplateId, siteId } = selected;
        this.selectTemplate(sendTemplateId, siteId);
      } else {
        this.sendTemplateContent = "";
        this.sendTemplateTypeCode = "";
      }
    },
    onResetClick() {
      utils.forEach(this.$refs, (ref, key) => {
        if (utils.startsWith(key, "select")) {
          ref.reset();
        }
      });
      this.searchFrame.sendTemplateSearchWords = "";
      this.$refs.selectModule.selectMd("ALL");
    },
    getSearchData() {
      const data = {};
      utils.forEach(this.searchFrame, (value, key) => {
        if (utils.isEqual(key, "selectedCodeValue")) {
          utils.forEach(value, (codeValue, codekey) => {
            data[codekey] = codeValue.key;
          });
        } else {
          data[key] = value;
        }
      });
      return data;
    },
    onSearchClick() {
      const searchData = this.getSearchData();
      http
        .request(this.$options.name, "DTS_CMZ_00059", {
          query: searchData,
        })
        .then((res) => {
          this.ds0.setData(this.getSiteSendTemplateList(res.data));
        })
        .then(() => {
          this.ds0.setSelect(this.ds0.data[0], false);
          this.onDatasetSelectionChanged(this.ds0.getSelected());
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSiteSendTemplateList(list) {
      const siteList = [];
      utils.forEach(list, (data) => {
        utils.forEach(data.siteSendTemplateList, (siteData) => {
          const { siteId, siteName, sendTemplateContent } = siteData;
          siteList.push(
            utils.cloneDeep(
              utils.assign(data, { siteId, siteName, sendTemplateContent })
            )
          );
        });
      });
      return siteList;
    },
    onSelectClick() {
      const [selectedData] = this.ds0.getSelectedData();
      if (!utils.isUndefined(selectedData)) {
        const { sendTemplateId, sendTemplateName } = selectedData;
        this.closePagePopup({ sendTemplateId, sendTemplateName });
      } else {
        utils.messageBox(
          "warning",
          utils.strFormat(
            this.$t("MSG_ALT_CHK_SELECT"),
            this.$t("MSG_TXT_SEND_TMPLT")
          )
        );
      }
    },
    selectTemplate(sendTemplateId, siteId) {
      http
        .request(this.$options.name, "DTS_CMZ_00075", {
          path: {
            "template-id": sendTemplateId,
            "site-id": siteId,
          },
          data: {},
        })
        .then((res) => {
          if (!utils.isEmpty(res.data.sendTmpltCntn)) {
            this.sendTemplateContent = res.data.sendTmpltCntn;
            if (this.sendTemplateTypeFlag) {
              this.$refs.viewer.setHtml(this.sendTemplateContent);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
</style>
