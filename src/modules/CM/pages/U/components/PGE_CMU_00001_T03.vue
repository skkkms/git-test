<template>
  <div>
    <!-- <div class="comm_title_wrap">
        <h4 class="comm_tit02">{{ $t('MSG_TXT_MSG_RESO_SEARCH') }}</h4>
      </div> -->
    <div class="mrB20" />

    <sui-s-grid
      ref="grid1"
      :headers="gridData1.columns"
      :data-source="ds0"
      :options="options"

      :showRowsPerPageControl="false"
    >
      <template #left-info>
        <div class="comp_spacing" />
        <div class="btn_wrapL">
          <ur-button
            v-permission:create="pageId"
            type="button"
            class="comm_btn_gridTop"
            small
            @click="onNewClick"
          >
            {{ $t('MSG_BTN_ADD') }}
          </ur-button>
          <ur-button
            v-permission:delete="pageId"
            type="button"
            class="comm_btn_gridTop"
            style="margin-left:8px"
            small
            @click="onDeleteClick"
          >
            {{ $t('MSG_BTN_DEL') }}
          </ur-button>
        </div>
      </template>
    </sui-s-grid>
    <div class="comm_btn_wrap">
      <sui-button
        v-permission:update="pageId"
        type="button"
        class="comm_btn_solid"
        :disabled="checkMetaSave"
        @click="onSaveClick"
      >
        {{ $t("MSG_BTN_SAVE") }}
      </sui-button>
    </div>
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index';
import BasePage from '~cm/components/BasePage';
export default {
  name: 'PGE_CMU_00001_T02', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: '',
    },
    selectedPageId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      ds0: new urDataSet(),
      // localdata: [],
      gridMsgResoRegList: [],
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        resizableColumn: true,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },

      gridData1: {
        dataSource: {
          
          localdata: [],
          // datatype: 'array',
          datatype: 'json',
        },
        columns: [{
          text: this.$t('MSG_TXT_MDLE'),
          value: 'moduleName',
          width: 100,
        },
        {
          text: this.$t('MSG_TXT_TYPE'),
          value: 'messageResourcesTypeName',
          width: 100,
        },
        {
          text: this.$t('MSG_TXT_MSG_RESO_ID'),
          value: 'messageResourcesId',
        },
        {
          text: this.$t('MSG_TXT_LANG'),
          value: 'langId',
          width: 100,
        },
        {
          text: this.$t('MSG_TXT_MSG_RESO_VAL'),
          value: 'multiLanguageContent',
        },
        ],
      },
      localdata0: [],
      checkMetaSave: utils.checkMetaSave(),
    };
  },
  watch: {
    selectedPageId(pageId) {
      if (!utils.isEmpty(pageId)) {
        this.getMsgResoRegList(pageId);
      } else {
        this.resetTab();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getMsgResoRegList(this.$props.selectedPageId);
    });
  },
  methods: {
    onNewClick() {
      if (utils.isEmpty(this.selectedPageId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE')));
        return false;
      }      
      utils.openLayerPopup('PGE_CMU_00006', this.onPagePopupCallback, {
        pageInitialData: { },
        size: 'lg',
      });
    },
    onPagePopupCallback(nodeData) {
      if (nodeData) {
        const newMessages = [];
        nodeData.forEach(node => {
          if (utils.findIndex(this.ds0.data, { messageResourcesId: node.messageResourcesId }) === -1) {
            newMessages.push(node);
          }
        });
        const addNewRowsList = [];
        for(var i=0;i<newMessages.length;i++){
        const addmessage={
          moduleName:nodeData[i].moduleName,
          messageResourcesTypeName:nodeData[i].messageResourcesTypeName,
          messageResourcesId:nodeData[i].messageResourcesId,
          langId:nodeData[i].langId,
          multiLanguageContent:nodeData[i].multiLanguageContent
        };
        addNewRowsList.push(addmessage);
        }
        if (newMessages.length) {
          for(var k=0;k<addNewRowsList.length;k++){
            this.ds0.addRow(addNewRowsList[k]);
          }
          
        }
      }
    },
    onDeleteClick() {
      if (utils.isEmpty(this.selectedPageId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE')));
        return false;
      }       
      const chkArr = this.ds0.getSelected();
      if (chkArr.length) {
        // utils.confirm(this.$t('MSG_ALT_IS_DEL_DATA'), this.$t('MSG_TXT_YES'), this.$t('MSG_TXT_NO'),
        // delArr not used further
        // const delArr = [];
        // for (const i in chkArr) {
        //   if (typeof chkArr[i] !== 'number') { continue; }
        //   delArr.push(chkArr[i]);
        // }
        // utils.forEach(chkArr, index => {
        //   if (typeof index === 'number') {
        //     delArr.push(index);
        //   }
        // });
        this.ds0.removeRows(chkArr);
      } else {
        // utils.alert(this.$t('MSG_ALT_DEL_NO_DATA'), this.$t('MSG_BTN_CFRM'), () => false);
        //utils.messageBox('information', this.$t('MSG_ALT_DEL_NO_DATA'), null, () => false);
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },

    onSaveClick() {
      if (utils.isEmpty(this.selectedPageId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE')));
        return false;
      }
      const msgResoList = this.ds0.data;
      // if (msgResoList.length === 0) {
      //   // window.$toast.makeToast('저장할 데이터가 없습니다.');
      //   utils.alert(this.$t('MSG_ALT_SAV_NO_DATA'), this.$t('MSG_BTN_CFRM'));
      //   return false;
      // }
      // utils.confirm(this.$t('MSG_ALT_IS_SAV_DATA'), this.$t('MSG_TXT_YES'), this.$t('MSG_TXT_NO'),
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null,
        (/* ok */) => {
          const dataParams = [];
          // for (const i in msgResoList) {
          //   dataParams.push({
          //     pageId: this.$props.selectedPageId,
          //     messageResourcesId: msgResoList[i].messageResourcesId,
          //   });
          // }
          utils.forEach(msgResoList, data => {
            dataParams.push({
              pageId: this.$props.selectedPageId,
              messageResourcesId: data.messageResourcesId,
            });
          });
          http.request(this.pageId, 'DTS_CMU_00020', { // dataservices reg.
            path: {
              'page-id': this.selectedPageId,
            },
            data: dataParams,
          }).then(() => {
            // window.$toast.makeToast(this.$t('MSG_ALT_SVE_DATA'));
            // utils.alert(this.$t('MSG_ALT_SVE_DATA'), this.$t('MSG_BTN_CFRM'));
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
            this.ds0.submit();
          }).catch(error => {
            console.log(error);
          });
        },
        (/* cancel */) => {});
    },
    getMsgResoRegList(pageId) {
      if (!pageId) return;
      http.request(this.pageId, 'DTS_CMU_00019', { // message resources list in page
        path: {
          'page-id': pageId,
        },
        // query: {
        //   langId: 'ko'
        // }
      }).then(res => {
        // this.gridData1.dataSource.localdata = [];
        this.gridMsgResoRegList = utils.cloneDeep(res.data);
        this.localdata0 = res.data;
        this.ds0.setData(this.localdata0);
      }).catch(error => {
        console.log(error);
      });
    },
    resetTab() {
      this.ds0.setData([]);
    },
  }, // methods
};
</script>
<style scoped>
</style>
