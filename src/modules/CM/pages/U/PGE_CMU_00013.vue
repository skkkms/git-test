<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <sui-s-grid
        ref="grid"
        :headers="gridColumns0"
        :data-source="dsManualFile"
        :options="option"
        :showRowsPerPageControl="false"
        :initialRowsPerPage="10"
      >
        <template #right-info>
          <div class="btn_wrapR">
            <div>
              <span style="line-height:24px;font-size:12px;color:#5a5a5a;padding-right:8px;">{{ $t('MSG_TXT_LANG') }}</span>
              <sui-lang-select
                ref="langCode"
                style="width: 120px;
                      margin-right: 0px !important;
                      border: 1px solid #ccc !important;
                      padding-left: 8px;"
                :selected="frame0.selectedCode.COD_LANG"
                @list-clicked="onClickSearch"
              />
            </div>
          </div>
        </template>
      </sui-s-grid>
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onClickClose"
        >
          {{ $t('MSG_BTN_CLOSE') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
// eslint-disable-next-line import/no-unresolved
import { urDataSet } from 'uidev-component/index';
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMU_00013', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    closePagePopup: {
      type: Function,
      default() {
        return null;
      },
    },
    pageInitialData: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      flag: '',
      manualId: '',
      pageId: '',
      type: '',
      moduleCode: '',
      option: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        resizableColumn: true,
      },
      langOption: [],
      localdata0: [],
      dsManualFile: new urDataSet(),
      frame0: {
        selectedCode: {
          COD_LANG: {
            key: '',
            label: '',
          },
        },
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.gridColumns0 = [
      {
        text: this.$t('MSG_TXT_MANU_NM'),
        value: 'documentName',
        width: '300px',
      }, {
        text: this.$t('MSG_TXT_LANG'),
        value: 'langName',
        width: '100px',
      }, {
        text: this.$t('MSG_TXT_FILE_NM'),
        value: 'fileName',
        align: 'left',
        component: {
          props: ['row', 'value'],
          template:
            `<sui-file-dn-button
                :pageId="'PGE_CMU_00013'"
                :fileName="this.row.fileName"
                :fileSize="parseInt(this.row.fileSize)"
                :type="this.row.fileExtensionName"
                :realityFilePath="this.row.realityFilePath"
              />`,
        },
      }];
  },
  mounted() {
    this.setSessionLangId();
  },
  methods: {
    /**
     *  매뉴얼 팝업 호출 시
     *  PROP으로 TYPE,정보 확인
     */
    setBasicData() {
      this.flag = true;

      if (utils.isUndefined(this.pageInitialData.type) || utils.isEmpty(this.pageInitialData.type)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_VAL'), 'type'));
        return false;
      }

      this.type = this.pageInitialData.type;

      switch (this.pageInitialData.type) {
        case 'page':
          if (utils.isUndefined(this.pageInitialData.pageId) || utils.isEmpty(this.pageInitialData.pageId)) {
            utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), 'pageId'));
            this.flag = false;
          }
          this.pageId = this.pageInitialData.pageId;
          break;
        case 'manual':
          if (utils.isUndefined(this.pageInitialData.manualId) || utils.isEmpty(this.pageInitialData.manualId)) {
            utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), 'manualId'));
            this.flag = false;
          }
          this.manualId = this.pageInitialData.manualId;
          break;
        case 'module':
          if (utils.isUndefined(this.pageInitialData.moduleCode) || utils.isEmpty(this.pageInitialData.moduleCode)) {
            utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), 'moduleCode'));
            this.flag = false;
          }
          this.moduleCode = this.pageInitialData.moduleCode;
          break;
        default:
          utils.messageBox('warning', this.$t('MSG_ALT_MANU_TYPE'));
          this.flag = false;
          break;
      }
      this.onClickSearch();
      return null;
    },
    /**
     *  언어 selectBox 항목 조회
     */
    langOptionList() {
      http.request(this.pageId, 'DTS_CMY_00001').then(res => {
        let rowNum = 0;
        _.forEach(res.data, lang => {
          res.data[rowNum].label = lang.langName;
          res.data[rowNum].key = lang.langId;

          rowNum += 1;
        });
        this.langOption = res.data;
      });
    },
    /**
     *  언어 기본 값
     *  세션 언어로 설정
     */
    setSessionLangId() {
      // 언어 설정 -> 세션설정 정보가 없을 경우 English(en)로 지정(임시)
      const { langId } = this.$store.getters.userInfo;
      this.frame0.selectedCode.COD_LANG.key = utils.isEmpty(langId) || utils.isUndefined(langId)
        ? 'en'
        : langId;

      this.setBasicData();
    },
    /**
     *  닫기
     */
    onClickClose() {
      this.closePagePopup('');
    },
    /**
     * 매뉴얼 목록 조회
     * type에 따른 매뉴얼 목록 조회
     */
    onClickSearch() {
      const queryParams = {
        langId: this.frame0.selectedCode.COD_LANG.key,
        type: this.type,
        pageId: this.pageId,
        moduleCode: this.moduleCode,
        manualId: this.manualId,
        siteId: this.$store.getters.userInfo.siteId,
      };

      if (!this.flag) return false;

      http.request(this.$options.name, 'DTS_CMU_00060', {
        query: queryParams,
      }).then(res => {
        this.dsManualFile.setData(res.data);
      });

      return null;
    },
  },
};
</script>
<style scoped>
</style>
