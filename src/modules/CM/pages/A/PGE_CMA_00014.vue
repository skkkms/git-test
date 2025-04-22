<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_USR_GRP_CATG')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
                ref="userGroupCategory"
                :selected="selectedValues.COD_USR_GRP_CATG"
                codeId="COD_USR_GRP_CATG"
                :initialSelectedIndex="0"
                :defaultOption="'all'"
                @loaded="onUserGroupCategoryLoaded"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEARCH_COND')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="condType"
              :selected="selectedValues.COD_USER_GRP_SRCH_COND"
              codeId="COD_USER_GRP_SRCH_COND"
              :initialSelectedIndex="0"
              :defaultOption="'all'"
              @loaded="onCondTypeLoaded"
            />
            <div class="comp_spacing" />
            <sui-text-field
              ref="condContent"
              v-model="condContent"
              default
              value
              maxlength="50"
              @keyup.enter="onSearch"
              @keyup="onKeyUpInput"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onReset"
          >
            {{ $t('MSG_BTN_RESET') }}
          </sui-button>
          <sui-button
            v-permission:read="'PGE_CMA_00014'"
            type="button"
            class="comm_btn_Scr"
            @click="onSearch"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="grdList"
        :headers="gridColumns"
        width="100%"
        :data-source="dsData"
        :initialRowsPerPage="10"
        :showRowsPerPageControl="false"
        :options="options"
      />
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onClickCancel"
        >
          {{ $t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onClickSelect"
        >
          {{ $t('MSG_BTN_SELT') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
// eslint-disable-next-line import/extensions
import { urDataSet } from 'uidev-component/index.js';

export default {
  name: 'PGE_CMA_00014', // eslint-disable-line vue/name-property-casing
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
      selectedValues: {
        COD_USER_GRP_SRCH_COND: { key: '', label: '' },
        COD_USR_GRP_CATG: { key: '', label: '' },
      },

      condContent: '',
      localdata: [],
      // eslint-disable-next-line new-cap
      dsData: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      selectionmode: '',
      userGroupCategoryKey: '',
      condTypeKey: '',
    };
  },
  computed: {},
  watch: {},
  
  created() {
    this.dataList = [];
    this.gridColumns = [
      {
        text: this.$t('MSG_TXT_PORTL'),
        value: 'portalId',
      },
      {
        text: this.$t('MSG_TXT_USER_GRP_ID'),
        value: 'userGroupId',
        width: 150,
      },
      {
        text: this.$t('MSG_TXT_USER_GRP_NAME'),
        value: 'userGroupName',
      },
      {
        text: this.$t('MSG_TXT_USR_GRP_CATG'),
        value: 'userGroupCategoryName',
      },
    ];
  },

  mounted() {
    if (this.pageInitialData !== null) {
      if (this.pageInitialData.userPopupMode === true) {
        this.selectionmode = true;
      } else {
        this.selectionmode = false;
      }
    }
  },

  methods: {
    onReset() {
      this.$refs.condType.reset();
      this.$refs.userGroupCategory.reset();
      this.condContent = '';
    },
    onSearch() {
      const condTypeCode = this.selectedValues.COD_USER_GRP_SRCH_COND.key;
      const userGroupCategoryCode = this.selectedValues.COD_USR_GRP_CATG.key;
      const queryParams = {
        userGroupCategoryCode: userGroupCategoryCode || '',
        searchCond: condTypeCode || '',
        searchWord: this.condContent || '',
      };

      http.request(this.$options.name, 'DTS_CMA_00008', {
        query: queryParams,
      }).then(res => {
        if (res.data) {
          if (res.data.length > 0) {
            this.dsData.setData(res.data);
          } else {
            this.dsData.setData([]);
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    onKeyUpInput() {
      const searchFieldNewText = this.condContent;

//    if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          utils.messageBox('confirm', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
            this.condContent = this.searchFieldOldText;
            this.$refs.condContent.setFocus();
          });
        } else {
          this.searchFieldOldText = searchFieldNewText;
        }
//    }
    },
    onChangeBizCodes(optList) {
      this.selectedBizCode = optList;
    },
    onCondTypeLoaded(optionsList) {
      this.condTypeKey = optionsList[0].key;
    },
    onUserGroupCategoryLoaded(optionsList) {
      this.userGroupCategoryKey = optionsList[0].key;
    },
    /**
     *  닫기
     */
    onClickCancel() {
      this.closePagePopup('');
    },
    /**
     *  선택
     */
    onClickSelect() {
      const selectedData = this.dsData.getSelected();
      if (selectedData.length !== 0) {
        this.closePagePopup(selectedData);
      } else {
        // 선택 안했을 때
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));// 선택 된 항목이 없습니다.
      }
    },
  },
};
</script>
<style scoped>
</style>
