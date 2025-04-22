<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_CLSF')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-3">
            <sui-code-select
              ref="todoClassificationCode"
              :selected="searchFrame.todoClassificationCode"
              :pageId="contextPageId"
              codeId="COD_TODO_CLSF"
              defaultOption="all"
              :disabled="classificationDisabled"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_STT')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-3">
            <sui-code-select
              ref="todoStateCode"
              :selected="searchFrame.todoStateCode"
              :pageId="contextPageId"
              codeId="COD_TODO_STT"
            />
          </div>
          <div class="btn_wrap">
            <sui-button
              v-permission:read="contextPageId"
              type="button"
              class="comm_btn_Reset"
              @click="onResetClick"
            >
              {{ $t('MSG_BTN_RESET') }}
            </sui-button>
            <sui-button
              v-permission:read="contextPageId"
              type="button"
              class="comm_btn_Scr"
              @click="onSearchClick"
            >
              {{ $t('MSG_BTN_SEARCH') }}
            </sui-button>
          </div>
        </div>
      </div>

      <div class="mrB30" />
      <div class="comm_shut_wrap">
        <div
          class="inbox"
          style="flex:3"
        >
          <sui-s-grid
            ref="grid0"
            :initialRowsPerPage="10"
            width="100%"
            :headers="gridColumns0"
            :data-source="ds0"
            :showRowsPerPageControl="false"
            @grid:selected="onDetailClassificationClick"
          />
        </div>
        <div class="emptybox" />
        <div
          class="inbox"
          style="flex:7"
        >
          <sui-s-grid
            ref="grid1"
            :headers="gridColumns1"
            :initialRowsPerPage="10"
            :showCountControl="true"
            :options="options1"
            :showRowsPerPageControl="false"
            :data-source="ds1"
            @grid:selected="onRowClick"
          >
            <template #header>
              <ur-data-grid-header-row>
                <ur-data-grid-header-cell rowspan="2" />
                <ur-data-grid-header-cell rowspan="2" />
                <ur-data-grid-header-cell rowspan="2" />
                <ur-data-grid-header-cell rowspan="2" />
                <ur-data-grid-header-cell
                  colspan="2"
                  :text="$t('MSG_TXT_TODO_CNTN_1')" 
                  align="center"
                />
                <ur-data-grid-header-cell
                  colspan="2"
                  :text="$t('MSG_TXT_TODO_CNTN_2')"
                  align="center"
                />
                <ur-data-grid-header-cell rowspan="2" />
              </ur-data-grid-header-row>
              <ur-data-grid-header-row>
                <ur-data-grid-header-cell />
                <ur-data-grid-header-cell :expand-resizer="2" />
                <ur-data-grid-header-cell />
                <ur-data-grid-header-cell :expand-resizer="2" />
              </ur-data-grid-header-row>
            </template>
          </sui-s-grid>
        </div>
      </div>

      <div class="comm_btn_wrap">
        <sui-button
          v-permission:delete="contextPageId"
          type="button"
          class="comm_btn_border"
          @click="onDeleteClick"
        >
          {{ $t('MSG_BTN_DEL') }}
        </sui-button>
        <sui-button
          v-permission:create="contextPageId"
          type="button"
          class="comm_btn_border"
          @click="onRegistrationClick"
        >
          {{ $t('MSG_BTN_RGST') }}
        </sui-button>
        <sui-button
          v-permission:update="contextPageId"
          type="button"
          class="comm_btn_solid"
          @click="onProcessClick"
        >
          {{ $t('MSG_BTN_PROC') }}
        </sui-button>
      </div>
      <sui-popup
        v-model="isShownPopupDetail"
        :title="$t('MSG_TIT_DTL_INFO')"
      >
        <p01
          :pageId="contextPageId"
          :todoDetail="todoDetail"
          @onCloseClick="onDetailAndCancelClick"
        />
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index.js';
import p01 from './components/PGE_CMZ_00029_P01';
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMZ_00029', // eslint-disable-line vue/name-property-casing
  components: {
    p01,
  },
  extends: BasePage,
  data() {
    return {
      searchFrame: {
        todoClassificationCode: {
          key: '',
          label: '',
        },
        todoStateCode: {
          key: 'P',
          label: '',
        },
      },
      localdata0: [],
      gridColumns0: [{
        text: this.$t('MSG_TXT_CLSF'),
        value: 'todoClassificationName',
      }, {
        text: this.$t('MSG_TXT_DTL_CLSF'),
        value: 'todoDetailClassificationName',
      }, {
        text: this.$t('MSG_TXT_COUNT'),
        value: 'detailClassificationCount',
        cellsalign: 'right',
      }],
      localdata1: [],
      gridColumns1: [],
      classificationDisabled: false,
      currentTodoStateCode: 'P',
      isShownPopupDetail: false,
      todoDetail: [],
      ds0: new urDataSet(),
      ds1: new urDataSet(),
      options1: {
        headerHeight: '21',
      },
      selectedGridRowData0: {},
      selectedGridRowData1: {},
    };
  },
  computed: {},
  watch: {},
  created() {
    const that = this;
    this.gridColumns1 = [{
      text: this.$t('MSG_TXT_TODO_NM'),
      value: 'todoName',
    }, {
      text: this.$t('MSG_TXT_STT'),
      value: 'todoStateName',
    }, {
      text: this.$t('MSG_TXT_RGST_DTM'),
      value: 'firstRegistrationDTM',
      customValue(value) {
        return utils.dateformatToClient(value);
      },
      width: '150px',
    }, {
      text: this.$t('MSG_TXT_DDLN_DT'),
      value: 'todoProcessDeadlineDT',
      customValue(value) {
        return utils.dateformatToClient(value);
      },
      width: '90px',
    }, {
      text: this.$t('MSG_TXT_TITLE'),
      value: 'detailTitle1',
    }, {
      text: this.$t('MSG_TXT_VAL'),
      value: 'detailContent1',
    }, {
      text: this.$t('MSG_TXT_TITLE'),
      value: 'detailTitle2',
    }, {
      text: this.$t('MSG_TXT_VAL'),
      value: 'detailContent2',
    }, {
      text: this.$t('MSG_TXT_NOTE'),
      value: 'detailAll',
      component: {
        props: ['row', 'value'],
        template:
          `<sui-button
            v-if="row.detailList.length > 2"
            type="button"
            class="link"
            @click.stop="onDetailClick(row)"
          >
            view more
          </sui-button>`,
        methods: {
          onDetailClick(row) {
            that.onDetailAndCancelClick(row.detailList);
          },
        },
      },
    }];
  },
  mounted() {
    this.$nextTick(() => {
      this.load();
    });
  },

  methods: {
    load() {
      const clsfCd = utils.getParameter(this, 'clsfCd');
      this.classificationDisabled = !utils.isEmpty(clsfCd);

      if (this.classificationDisabled) {
        this.searchFrame.todoClassificationCode.key = clsfCd;
        this.searchAction(clsfCd, this.currentTodoStateCode);
      }
    },
    onResetClick() {
      if (!this.classificationDisabled) {
        this.$refs.todoClassificationCode.reset();
      }
      this.$refs.todoStateCode.reset();
    },
    onSearchClick() {
      const { todoClassificationCode, todoStateCode } = this.searchFrame;
      this.currentTodoStateCode = todoStateCode.key;
      this.searchAction(todoClassificationCode.key, todoStateCode.key);
    },
    searchAction(todoClassificationCode, todoStateCode) {
      this.ds0.setData([]);
      this.ds1.setData([]);

      http.request(this.contextPageId, 'DTS_CMZ_00104', {
        query: {
          todoClassificationCode,
          todoStateCode,
        },
      }).then(res => {
        this.ds0.setData(res.data);
      }).then(() => {
        if (this.ds0.data.length > 0) {
          const firstRow = this.ds0.data[0];
          this.ds0.setSelect(firstRow);
          this.onDetailClassificationClick(firstRow);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    onDetailClassificationClick(row) {
      if (row) {
        this.selectedGridRowData0 = row;
        const { todoClassificationCode, todoDetailClassificationCode } = row;
        this.todoListLoad(todoClassificationCode, todoDetailClassificationCode).then(res => {
          utils.forEach(res.data, data => {
            utils.assign(data, this.detailToString(data));
          });
          this.ds1.setData(res.data);
        });
      } else if (this.selectedGridRowData0) {
        this.ds0.setSelect(this.selectedGridRowData0);
      }
    },
    todoListLoad(todoClassificationCode, todoDetailClassificationCode) {
      return new Promise(resolve => {
        http.request(this.contextPageId, 'DTS_CMZ_00146', {
          path: {
            'classification-code': todoClassificationCode,
            'detail-classification-code': todoDetailClassificationCode,
          },
          query: { todoStateCode: this.currentTodoStateCode },
        }).then(res => {
          resolve(res);
        }).catch(error => {
          console.log(error);
        });
      });
    },
    detailToString(data) {
      const titleList = [];
      const contentList = [];
      // const detailAllList = [`* ${this.$t('MSG_TXT_DTL_INFO')}`];
      let count = 0;
      if (!utils.isEmpty(data.detailList)) {
        utils.forEach(data.detailList, (detail, index) => {
          const { todoDetailTitle, todoDetailContent } = detail;
          count = index + 1;
          titleList.push(todoDetailTitle);
          contentList.push(todoDetailContent);
          // detailAllList.push(`${todoDetailTitle} : ${todoDetailContent}`);
        });
      }
      return {
        detailTitle1: titleList[0],
        detailContent1: contentList[0],
        detailTitle2: titleList[1],
        detailContent2: contentList[1],
        // detailAll: {
        //   text: count > 2 ? this.$t('MSG_TXT_ATRB_VIEW') : '',
        //   tooltip: count > 2 ? utils.join(detailAllList, '\n') : '',
        // },
        detailAll: count > 2 ? this.$t('MSG_TXT_ATRB_VIEW') : '',
      };
    },
    onRegistrationClick() {
      this.openPopup();
    },
    openPopup(selected, process = false) {
      utils.openLayerPopup('PGE_CMZ_00030', this.onPopupClose, {
        pageInitialData: utils.isEmpty(selected) ? {} : selected,
        size: 'lg',
        title: process ? this.$t('MSG_TIT_TODO_PROC') : this.$t('MSG_TIT_TODO_RGST'),
      });
    },
    onPopupClose(research) {
      if (research) {
        this.research();
      }
    },
    onProcessClick() {
      const [selected] = this.ds1.getSelected();
      if (utils.isEmpty(selected)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else {
        const { pageId, todoProcessParamValue } = selected;
        if (utils.isEmpty(pageId)) {
          this.openPopup(selected, true);
        } else {
          // 페이지이동 -> 윈도우팝업 띄우기
          utils.openWindowPopup(pageId, todoProcessParamValue);
        }
      }
    },
    onDeleteClick() {
      const [selected] = this.ds1.getSelected();
      if (!utils.isEmpty(selected)) {
        utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
          http.request(this.contextPageId, 'DTS_CMZ_00107', {
            path: {
              'todo-uid': selected.todoUid,
            },
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_DEL_DATA'), null, this.research);
          }).catch(error => {
            console.log(error);
          });
        });
      } else {
        utils.messageBox('warning', this.$t('MSG_ALT_DEL_DATA_SELT'));
      }
    },
    research() {
      this.onSearchClick();
    },
    onGridSingleButtonClicked(value, dataRow) {
      this.onDetailAndCancelClick(dataRow.detailList);
    },
    onDetailAndCancelClick(list) {
      this.todoDetail = list;
      this.isShownPopupDetail = !this.isShownPopupDetail;
    },
    onRowClick(row) {
      if (row) {
        this.selectedGridRowData1 = row;
      } else if (this.selectedGridRowData1) {
        this.ds1.setSelect(this.selectedGridRowData1);
      }
    },
  },
};
</script>
<style scoped>
</style>
