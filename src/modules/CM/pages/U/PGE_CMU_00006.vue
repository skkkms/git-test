<template>
  <sui-page>
    <sui-page-header
      :title="pageTitle"
    />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              width="140px"
              :label="$t('MSG_TXT_MDLE')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="moduleCode"
              codeId="COD_MDLE"
              defaultOption="all"
              :selected="frame0.selectedCodeValue.COD_MDLE"
              :pageId="this.$options.name"
              :initialSelectedIndex="0"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MSG_RESO_TYPE')"
              :required="false"
              :vertical="false"
              width="140px"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="messageResourcesTypeCode"
              :selected="frame0.selectedCodeValue.COD_MSG_RESO_TYPE"
              :pageId="this.$options.name"
              codeId="COD_MSG_RESO_TYPE"
              :customOpitonList="codes.COD_MSG_RESO_TYPE"
              :initialSelectedIndex="0"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEARCH_COND')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="messageResourcesSearchCond"
              :selected="frame0.selectedCodeValue.COD_MSG_RESO_SEARCH_COND"
              :pageId="this.$options.name"
              codeId="COD_MSG_RESO_SEARCH_COND"
              :customOpitonList="codes.COD_MSG_RESO_SEARCH_COND"
              :initialSelectedIndex="0"
              style="width:70%"
            />
            <div class="comp_spacing" />
            <sui-text-field
              ref="searchField"
              v-model="frame0.codMsgResoSearchText"
              maxlength="50"
              @keyup.enter="onSearchClick"
              @keyup="onKeyUpInput"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onResetClick"
          >
            {{ $t("MSG_BTN_RESET") }}
          </sui-button>
          <sui-button
            v-permission:read="$options.name"
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
         ref="grid0"
         :data-source="dsMessageResource"
         :headers="gridColumnsTab"
         :options="options"
         :showRowsPerPageControl="false"
      />
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onCancelClick"
        >
          {{ this.$t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onSelectClick"
        >
          {{ this.$t('MSG_TXT_SEL') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index.js';
export default {
  name: 'PGE_CMU_00006', // eslint-disable-line vue/name-property-casing
  props: {
    closePagePopup: {
      type: Function,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      pageTitle: this.$t('MSG_TXT_MSG_RESO_SELT'),
      codes: {
        COD_MSG_RESO_TYPE: [{ key: 'ALL', label: this.$t('MSG_TXT_ALL') }],
        COD_MSG_RESO_SEARCH_COND: [{ key: 'ALL', label: this.$t('MSG_TXT_ALL') }],
      },
      frame0: {
        selectedCodeValue: {
          COD_MDLE: {
            label: '',
            key: '',
          },
          COD_MSG_RESO_TYPE: {
            label: '',
            key: '',
          },
          COD_MSG_RESO_SEARCH_COND: {
            label: '',
            key: '',
          },
        },
        codMsgResoSearchText: '',
      },
      localdata: [],
      searchFieldOldText: '',
      dsMessageResource: new urDataSet(),
       options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        resizableColumn: true,
        multiSelect: true,
        selectCheck: true,
      },
    }
    },
    created(){
      this.gridColumnsTab= [
        {
          text: this.$t('MSG_TXT_MDLE'),
          value: 'moduleName',
          width: '100px',
        }, {
          text: this.$t('MSG_TXT_MSG_RESO_ID'),
          value: 'messageResourcesId',
        }, {
          text: this.$t('MSG_TXT_MSG_RESO_VAL'),
          value: 'multiLanguageContent',
        }, {
          text: this.$t('MSG_TXT_MSG_RESO_TYPE'),
          value: 'messageResourcesTypeName',
          width: '100px',
        }];
    },
  
  computed: {
    // 계산된 속성, property로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  mounted() {
    // DOM이 document에 append된 상태, 실제 element에 접근 가능 (this.$el or this.$refs)
    // 주로 데이터 패치 등을 함
  },
  methods: {
    /**
     *  선택
     */
    onSelectClick() {
      const selectedData = this.dsMessageResource.getSelected();
      if (selectedData.length !== 0) {
        this.closePagePopup(selectedData);
      } else {
        // 선택 안했을 때
        //utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_ID'), this.$t('MSG_TXT_MSG_RESO')));
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    /**
     *  닫기
     */
    onCancelClick() {
      this.closePagePopup('');
    },
    /**
     *  리셋
     */
    onResetClick() {
      this.frame0.codMsgResoSearchText = '';
      this.$refs.moduleCode.reset();
      this.$refs.messageResourcesTypeCode.reset();
      this.$refs.messageResourcesSearchCond.reset();
    },
    /**
     *  검색조건 특수문자 입력 제한
     */
    onKeyUpInput() {
      const searchFieldNewText = this.frame0.codMsgResoSearchText;

      if (utils.isExistSpecialChar(searchFieldNewText)) {
        // utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR_SRCH'), this.$t('MSG_ALT_SPECL_CHAR_LIST'), () => {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.frame0.codMsgResoSearchText = this.searchFieldOldText;
        });
      } else {
        this.searchFieldOldText = searchFieldNewText;
      }
    },
    /**
     *  검색
     *  메시지자원 목록 조회
     */
    onSearchClick() {
      const codeValue = this.frame0.selectedCodeValue;
      const queryParams = {
        moduleCode: utils.trim(codeValue.COD_MDLE.key) || '',
        messageResourcesTypeCode: utils.trim(codeValue.COD_MSG_RESO_TYPE.key) || '',
        searchMsgResoCond: utils.trim(codeValue.COD_MSG_RESO_SEARCH_COND.key) || '',
        searchMsgResoText: utils.trim(this.frame0.codMsgResoSearchText) || '',
        lngId: this.$store.getters.userInfo.langId,
      };

      if (this.validationCheck()) return false;

      http.request(this.$options.name, 'DTS_CMU_00012', {
        query: queryParams,
      }).then(res => {
        this.dsMessageResource.setData(res.data); // 데이터 셋에 데이터를 넣는 함수
      });

      return null;
    },
    /**
     * 조회 시 검색조건1개이상 필수 입력 체크
     */
    validationCheck() {
      const codeValue = this.frame0.selectedCodeValue;

      if (utils.isEqual(codeValue.COD_MDLE.key, 'ALL')
      && utils.isEqual(codeValue.COD_MSG_RESO_TYPE.key, 'ALL')
      && utils.isEmpty(this.frame0.codMsgResoSearchText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_MSG_SRCH'));
        return true;
      }
      return false;
    },
  },
};
</script>
<style scoped>
</style>
