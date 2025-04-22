<template>
  <sui-page>
    <sui-page-header :pageId="$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDLE')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-module-submodule-select
              ref="smComboFrame0"
              :pageId="this.$options.name"
              :selectedMd="frame0.selectData.COD_MDLE"
              :selectedSmd="frame0.selectData.COD_SMDLE"
              defaultMdOption="all"
              defaultSmdOption="all"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MGT_YN')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-yn-select
              ref="mgtYnSelect"
              defaultOption="all"
              :selected="frame0.selectData.COD_MGT_YN"
              :initialSelectedIndex="0"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_IMG_YN')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-yn-select
              ref="imgYnSelect"
              defaultOption="all"
              :selected="frame0.selectData.COD_IMG_YN"
              :initialSelectedIndex="0"
            />
          </div>       
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEARCH_COND')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="condType"
              :selected="frame0.selectData.COD_COND"
              codeId="COD_ATTH_GRP_SEARCH_COND"
              defaultOption="all"
              :initialSelectedIndex="0"
              style="width:58.5%"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="frame0.attachGroupSearchText"
              maxlength="50"
              @keyup.enter="onClickSearch('button')"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onClickReset"
          >
            {{ $t("MSG_BTN_RESET") }}
          </sui-button>
          <sui-button
            v-permission:read="$options.name"
            type="button"
            class="comm_btn_Scr"
            @click="onClickSearch('button')"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </sui-button>
        </div>
      </div>
      <div class="mrB05" />
      <div class="comm_shut_wrap">
        <div class="inbox">
          <div class="comm_title_wrap">
            <h4>{{ $t('MSG_TXT_ATTH_GRP_LIST') }}</h4>
          </div>
          <sui-s-grid
            ref="grid"
            :headers="gridColumns0"
            :data-source="dsAttachGroup"
            :showRowsPerPageControl="false"
            :initialRowsPerPage="10"
            width="100%"
            :options="options"
            :columnsautoresize="true"
            :columnsresize="true"
            @grid:row-click="datasetSelectionChanged"
          />
          <!-- <sui-grid
            ref="grid"
            :columns="gridColumns0"
            :columnsautoresize="true"
            width="100%"
            :columnsresize="true"
            :showDisplayCountControl="false"
            :dataset="'dsAttachGroup'"
            :initial-pagesize="10"
          /> -->
        </div>
        <div class="emptybox" />
        <div class="inbox">
          <div class="comm_title_wrap">
            <h4>{{ $t('MSG_TXT_ATTH_GRP_ITEM') }}</h4>
          </div>
          <sui-s-grid
            ref="grid1"
            :headers="gridColumns1"
            :data-source="dsAttachItem"
            :showRowsPerPageControl="false"
            :initialRowsPerPage="10"
            width="100%"
            :options="options"
            :columnsautoresize="true"
            :columnsresize="true"
          />
          <!-- <sui-grid
            ref="grid1"
            :columns="gridColumns1"
            :columnsautoresize="true"
            width="100%"
            :columnsresize="true"
            :showDisplayCountControl="false"
            :dataset="'dsAttachItem'"
            :initial-pagesize="10"
          /> -->
        </div>
      </div>
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:update="this.$options.name"
          type="button"
          class="comm_btn_border"
          @click="onClickMod(0)"
        >
          {{ $t('MSG_BTN_MDFC') }}
        </sui-button>
        <sui-button
          v-permission:delete="$options.name"
          type="button"
          class="comm_btn_border"
          @click="onClickDel"
        >
          {{ $t('MSG_BTN_DEL') }}
        </sui-button>
        <sui-button
          v-permission:create="this.$options.name"
          type="button"
          class="comm_btn_solid"
          @click="onClickRgst"
        >
          {{ $t('MSG_BTN_RGST') }}
        </sui-button>
      </div>
    </sui-page-contents>

    <sui-popup
      v-model="isShownPopup"
      :title="$t('MSG_TIT_ATTAH_GROUP_RGST')"
    >
      <p01
        :pageId="this.$options.name"
        :attachGroupId="attachGroupId"
        :selectedGridRowData="selectedGridRowData"
        :popupOpenDefaultTab="popupOpenDefaultTab"
        @onClickClose="onClickClose"
        @onClickSearch="onClickSearch"
      />
    </sui-popup>
  </sui-page>
</template>
<script>
// import - libraries (node modules)
// import - local files (js, vue, ...)
import { urDataSet } from 'uidev-component/index';
import p01 from './components/PGE_CMD_00003_P01';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

const dateFields = [
  'firstRegistrationDTM', 'finalModificationDTM', 'pageUsePriodStartDatetime', 'pageUsePriodFinishDatetime',
];

export default {
  name: 'PGE_CMD_00003', // eslint-disable-line vue/name-property-casing
  components: { p01 },
  extends: BasePage,
  data() {
    return {
      popupOpenDefaultTab: 0,
      pageName: this.$t('MSG_TIT_ATTAH_GROUP_MGT'),
      codes: CommonConstants.selectOptions(),
      selectedGridRowData: {},
      attachGroupId: '',
      isShownPopup: false,
      frame0: {
        selectData: {
          COD_MDLE: {
            label: '',
            key: '',
          },
          COD_SMDLE: {
            label: '',
            key: '',
          },
          COD_MGT_YN: {
            label: '',
            key: '',
          },
          COD_IMG_YN: {
            label: '',
            key: '',
          },
          COD_COND: {
            label: '',
            key: '',
          },
        },
        attachGroupSearchText: '',
      },
      localdata0: [],
      localdata1: [],
      gridColumns0: [],
      gridColumns1: [],
      dsAttachGroup: new urDataSet(),
      dsAttachItem: new urDataSet(),
      options: {
        resizableColumn: true,
        resizeFullWidth: true,
      },
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    // DOM이 document에 append된 상태, 실제 element에 접근 가능 (this.$el or this.$refs)
    // 주로 데이터 패치 등을 함
    // this.dsAttachGroup.$on(this.dsAttachGroup.EVENTS.SELECTION_CHANGED, this.datasetSelectionChanged);
    const that = this;
    this.gridColumns0 = [{
      text: this.$t('MSG_TXT_MDLE'),
      value: 'moduleName',
      width: '80px',
    }, {
      text: this.$t('MSG_TXT_SMDLE'),
      value: 'subModuleName',
      width: '80px',
    }, {
      text: this.$t('MSG_TXT_ATTH_GRP_ID'),
      value: 'attachGroupId',
    }, {
      text: this.$t('MSG_TXT_ATTH_GRP_NM'),
      value: 'attachGroupName',
    }, {
      text: this.$t('MSG_TXT_MGT_YN'),
      value: 'attachItemManagementYn',
      width: '60px',
    }, {
      text: this.$t('MSG_TXT_IMG'),
      value: 'imagePreviewApplyYn',
      width: '60px',
    }, {
      text: this.$t('MSG_TXT_DTRM_YN'),
      value: 'attachGroupDeterminYn',
      width: '60px',
    }];

    this.gridColumns1 = [{
      text: this.$t('MSG_TXT_ITEM_ID'),
      value: 'attachItemId',
      component: {
        props: ['row', 'value'],
        template:
        `<sui-button
          type="button"
          :title="null"
          class="link"
          @click="parentMethodCall"
        >
          {{row.attachGroupId}}
        </sui-button>`,
        methods: {
          parentMethodCall() {
            that.onClickPopupCall(this.row);
          },
        },
      },
    }, {
      text: this.$t('MSG_TXT_ITEM_NM'),
      value: 'attachItemName',
      component: {
        props: ['row', 'value'],
        template:
        `<sui-button
          type="button"
          :title="null"
          class="link"
          @click="parentMethodCall"
        >
          {{row.attachItemName}}
        </sui-button>`,
        methods: {
          parentMethodCall() {
            that.onClickPopupCall(this.row);
          },
        },
      },
    }, {
      text: this.$t('MSG_TXT_HDQT_CNTL_YN'),
      value: 'headquarterControlYn',
      width: '90px',
    }, {
      text: this.$t('MSG_TXT_HDQT_NCSR_YN'),
      value: 'headquarterEssentialName',
      width: '90px',
    }, {
      text: this.$t('MSG_TXT_ARRAY_ORDER'),
      value: 'arrayalOrder',
      width: '80px',
    }, {
      text: this.$t('MSG_TXT_EXTS'),
      value: 'attachPossibilityExtensionCode',
      width: '80px',
    }];
  },
  destroyed() {
    // 남아 있는 자원 반환
    // this.dsAttachGroup.$off(this.dsAttachGroup.EVENTS.SELECTION_CHANGED, this.datasetSelectionChanged);
  },
  methods: {
    /**
     * 첨부그룹 목록 조회
     */
    onClickSearch(type) {
      const queryParams = {
        moduleCode: this.frame0.selectData.COD_MDLE.key,
        subModuleCode: this.frame0.selectData.COD_SMDLE.key,
        attachItemManagementYn: this.frame0.selectData.COD_MGT_YN.key,
        imagePreviewApplyYn: this.frame0.selectData.COD_IMG_YN.key,
        searchCondition: this.frame0.selectData.COD_COND.key,
        attachGroupId: this.frame0.attachGroupSearchText,
        attachGroupName: this.frame0.attachGroupSearchText,
      };

      http.request(this.$options.name, 'DTS_CMD_00007', {
        query: queryParams,
      }).then(res => {
        utils.dateformatToClientInArray(res.data, dateFields);// 컴포넌트가 사용하는 date 값으로 변환
        this.dsAttachGroup.setData(res.data); // 데이터 셋에 데이터를 넣는 함수
      }).then(() => {
        if (this.dsAttachGroup.data.length > 0) {
          if (utils.isEqual(type, 'button')) {
            const firstRow = this.dsAttachGroup.data[0];
            this.dsAttachGroup.setSelect(firstRow, false);
            this.datasetSelectionChanged(firstRow);
          }
        } else {
          this.dsAttachItem.setData([]);
        }
      });
    },
    /**
     * 첨부그룹 grid 목록 선택 event
     */
    datasetSelectionChanged(rowData) {
      if (this.dsAttachGroup.getSelected().length === 0) {
        this.dsAttachGroup.setSelect(rowData, false);
      }

      this.selectedGridRowData = this.dsAttachGroup.selected.at(0);
      if (this.selectedGridRowData !== undefined) {
        this.attachGroupId = this.selectedGridRowData.attachGroupId;
        this.itemListSearch(this.attachGroupId);
      }
    },
    /**
     * 첨부그룹 첨부항목 목록 조회
     */
    itemListSearch(attachGroupId) {
      http.request(this.$options.name, 'DTS_CMD_00008', {
        path: {
          'attach-group-id': attachGroupId,
        },
      }).then(res => {
        this.dsAttachItem.setData(res.data); // 데이터 셋에 데이터를 넣는 함수
      });
    },
    /**
     * 리셋
     */
    onClickReset() {
      utils.forEach(this.frame0, (value, key) => {
        if (utils.isEqual(key, 'selectData')) {
          // this.$refs.smComboFrame0.reset();
          this.frame0.selectData.COD_MDLE.key = 'ALL';
          this.frame0.selectData.COD_SMDLE.key = 'ALL';
          this.$refs.mgtYnSelect.reset();
          this.$refs.imgYnSelect.reset();
          this.$refs.condType.reset();
        } else {
          this.frame0[key] = '';
        }
      });
    },
    /**
     * 팝업 호출
     */
    onClickPopupCall() {
      this.isShownPopup = true;
    },
    /**
     * 팝업 닫기
     */
    onClickClose(key) {
      if (key) this.onClickSearch();
      this.isShownPopup = false;
    },
    /**
     * 삭제
     */
    onClickDel() {
      const selectedIndexes = [this.dsAttachGroup.getSelected().at(0).__idx];

      if (selectedIndexes.length < 1) {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), null, () => { // 삭제하시겠습니까?
        http.request(this.$options.name, 'DTS_CMD_00012', {
          path: {
            'attach-group-id': this.dsAttachGroup.data[selectedIndexes[0]].attachGroupId,
          },
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_DEL_DATA'), null, () => { // 삭제되었습니다.
            this.onClickSearch();
          });
        });
      });

      return null;
    },
    /**
     * 수정
     */
    onClickMod(defaultTab) {
      const selectedIndexes = this.dsAttachGroup.getSelected();

      if (selectedIndexes.length < 1) {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }

      console.log(this.dsAttachGroup.data, selectedIndexes);

      this.attachGroupId = this.dsAttachGroup.getSelected().at(0).attachGroupId;
      this.selectedGridRowData = this.dsAttachGroup.getSelected().at(0);


      this.popupOpenDefaultTab = defaultTab;
      this.onClickPopupCall();

      return null;
    },
    /**
     * 등록
     */
    onClickRgst() {
      this.attachGroupId = '';
      this.selectedGridRowData = {};

      this.popupOpenDefaultTab = 0;

      this.onClickPopupCall();
    },
    /**
     * 첨부그룹 별 항목 버튼
     * EVENT
     */
    onGridButtonClick() {
      this.onClickMod(2);
    },
  },
};
</script>
<style scoped>
</style>
