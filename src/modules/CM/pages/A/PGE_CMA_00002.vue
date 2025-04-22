<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
    <div class="comm_scr_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_ROLE_CATG')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
            <sui-code-select
              ref="roleCategory"
              :selected="selectedValues.COD_ROLE_CATG"
              codeId="COD_ROLE_CATG"
              :defaultOption="'all'"
              @loaded="onRoleCategoryLoaded"
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
            :selected="selectedValues.COD_ROLE_SRCH_COND"
            codeId="COD_ROLE_SRCH_COND"
            :defaultOption="'all'"
            class="width50"
            @loaded="onCondTypeLoaded"
          />
          <div class="comp_spacing" />
          <sui-text-field
            v-model="condContent"
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
          {{ $t("MSG_BTN_RESET") }}
        </sui-button>
        <sui-button
          v-permission:read="'PGE_CMA_00002'"
          type="button"
          class="comm_btn_Scr"
          @click="onSearch"
        >
          {{ $t("MSG_BTN_SEARCH") }}
        </sui-button>
      </div>
    </div>
    <div class="mrB30" />
    <div class="mrB10" />
    <sui-s-grid
      ref="grdList"
      :headers="gridColumns"
      :options="options"
      width="100%"
      :data-source="dsData"
      :initialRowsPerPage="5"
      :showRowsPerPageControl="false"
      @grid:selected="onSelectGrid"
    />
    </sui-page-contents>
    <sui-page-footer>
    <div class="comm_btn_wrap">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onCancel"
      >
        {{ $t('MSG_BTN_CANCEL') }}
      </sui-button>
      <sui-button
        type="button"
        class="comm_btn_solid"
        @click="onSelect"
      >
        {{ $t('MSG_BTN_SELT') }}
      </sui-button>
    </div>
   </sui-page-footer>
  </sui-page>
</template>
<script>
// import - libraries (node modules)
// import - local files (js, vue, ...)
import { urDataSet } from 'uidev-component/index.js';
export default {
  name: 'PGE_CMA_00002', // eslint-disable-line vue/name-property-casing
  props: {
    closePagePopup: {
      type: Function,
      required: false,
      default() {
        return null;
      },
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
      searchFieldOldText: '',
      selectedGridRowData: {},
      oldRowIndex: -1,
      condTypeKey: '',
      selectedValues: {
        // form input 값등이 저장될 변수
        COD_ROLE_SRCH_COND: { key: '', label: '' },
        COD_ROLE_CATG: { key: '', label: '' },
      },
      condContent: '',
      selectedBizCode: [],
      localdata: [],
      dsData: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      roleCategoryKey: '',
    };
  },
  created() {
   this.localdata = [];
   this.gridColumns = [
        {
          text: this.$t('MSG_TXT_ROLE_ID'),
          value: 'roleId',
          width: 150,
        },
        {
          text: this.$t('MSG_TXT_ROLE_NAME'),
          value: 'roleName',
        },
        {
          text: this.$t('MSG_TXT_ROLE_ALIAS'),
          value: 'roleNickName',
          width: 150,
        },
        {
          text: this.$t('MSG_TXT_ROLE_CATG'),
          value: 'roleCategoryName',
          width: 250,
        },
   ];
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  mounted() {
   //this.dsData.$on(this.dsData.EVENTS.SELECTION_CHANGED, this.onSelectGrid);
  },
  beforeDestroy() {
   // 이벤트 핸들러 및 사용한 서드 파티 라이브러리 자원 반환
    // if (this.dsData) {
    //   this.dsData.$off(this.dsData.EVENTS.SELECTION_CHANGED, this.onSelectGrid);
    // }
  },
  methods: {
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
    onClose() {
      console.log('onConfirm');
    },
    onCondTypeLoaded(optionsList) {
      this.condTypeKey = optionsList[0].key;
    },
    onRoleCategoryLoaded(optionsList) {
      this.roleCategoryKey = optionsList[0].key;
      this.selectedValues.COD_ROLE_CATG.key = optionsList[0].key;
    },    
    onKeyUpInput() {
      const searchFieldNewText = this.condContent;
      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          this.conFirm('error', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
          this.condContent = this.searchFieldOldText;
        } else {
          this.searchFieldOldText = searchFieldNewText;
        }
      }
    },
    onReset() {
      this.$refs.condType.reset();
      this.selectedValues.COD_ROLE_SRCH_COND.key = this.condTypeKey;
      this.condContent = '';
      this.$refs.roleCategory.reset();
      this.selectedValues.COD_ROLE_CATG.key = this.roleCategoryKey;
    },
    onSearch() {
      const condTypeCode = this.selectedValues.COD_ROLE_SRCH_COND.key;
      const roleCategoryCode = utils.trim(this.selectedValues.COD_ROLE_CATG.key);

      const queryParams = {
        roleCategoryCode: roleCategoryCode || '',
        searchCond: condTypeCode || '',
        searchWord: this.condContent || '',
      };

      http.request(this.$options.name, 'DTS_CMA_00001', {
        query: queryParams,
      }).then(res => {
        if (res.data) {
          this.dsData.setData(res.data);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    onSelect() {
      this.closePagePopup(this.selectedGridRowData);
    },
    onCancel() {
      this.closePagePopup('');
    },
    onChangeBizCodes(optList) {
      this.selectedBizCode = optList;
    },
    onSelectGrid(row) {
      if (!utils.isEmpty(row)) {
        this.selectedGridRowData = row;
      } else {
        this.selectedGridRowData = {};
      }
    },
  },
};
</script>
<style scoped>
</style>
