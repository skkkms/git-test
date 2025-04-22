<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DOM_CLSF_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model="domainClass"
              maxlength="100"
              placeholder=""
              name="domainClass"
              @keyup.enter="searchDomainClass"
            />
          </div>
          <div class="btn_wrap">
            <sui-button
              type="button"
              class="comm_btn_Reset"
              @click="resetDomainClassField()"
            >
              {{ $t('MSG_BTN_RESET') }}
            </sui-button>
            <sui-button
              v-permission:read="this.$options.name"
              type="button"
              class="comm_btn_Scr"
              @click="searchDomainClass(domainClass)"
            >
              {{ $t('MSG_BTN_SEARCH') }}
            </sui-button>
          </div>
        </div>
      </div>
      <div class="comm_title_wrap" />
      <div class="comm_gridTop_wrap" />
      <div id="tableDisplay">
        <sui-s-grid
          ref="grdList"
          v-permission:download="this.$options.name"
          :headers="defaultGridData0.columns"
          :data-source="datasetInfo"
          :options="options"
          :showRowsPerPageControl="false"
        >
          <template #right-info>
            <sui-button
              type="button"
              class="comm_btn_gridTop comm_ico_excel"
              @click="onDownloadExcel"
            >
              {{ $t('MSG_BTN_EXCEL_DOWN') }}
            </sui-button>
          </template>
        </sui-s-grid>
      </div>
      <div class="comm_title_wrap">
        <span />
      </div>
      <div class="mrR30" />
      <div class="comm_shut_wrap">
        <div class="inbox">
          <div
            class="inbox brdG01"
            style="height:250px;overflow-y:auto"
          >
            <ur-tree
              ref="taskTree"
              v-model="treeData.data"
              class="brdG01 pd20"
              style="overflow:auto; width: 100%;"
              hideAdd
              @select-node="onItem"
            />
          </div>
        </div>
        <div class="emptybox" />
        <div class="inbox">
          <div class="comm_view_wrap">
            <div class="row">
              <div class="col-xs-2">
                <sui-input-label
                  :label="$t('MSG_TXT_UPP_DOM_CLSF_ID')"
                  :vertical="false"
                />
              </div>
              <div class="col-xs-10">
                <sui-text-field
                  v-model="upperDomainClassId"
                  maxlength="50"
                  placeholder=""
                  :readonly="true"
                />
                <div class="comp_spacing" />
                <sui-text-field
                  v-model="upperDomainClassificationName"
                  maxlength="50"
                  placeholder=""
                  :readonly="true"
                  fixed-icon
                  @click="onPopupUpDomClsfClick"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-2">
                <sui-input-label
                  :label="$t('MSG_TXT_DOM_CLSF_NM')"
                  :required="true"
                  :vertical="false"
                />
              </div>
              <div class="col-xs-10">
                <sui-text-field
                  v-model="domainClassName"
                  :disabled="false"
                  :clearable="true"
                  :readonly="true"
                  fixed-icon
                  @click="onPopupClick"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-2">
                <sui-input-label
                  :label="$t('MSG_TXT_DOM_CLSF_ID')"
                  :required="true"
                  :vertical="false"
                />
              </div>
              <div class="col-xs-10">
                <sui-text-field
                  v-model="domainClassId"
                  placeholder=""
                  maxlength="5"
                  @keyup="isNumber()"
                />
                <div class="comp_spacing" />
                <sui-button
                  type="button"
                  class="comm_btn_duplicate"
                  @click="onCheckDuplication"
                />
              </div>
            </div>
          </div>
        </div>
        <sui-popup
          v-model="showPopup"
          :title="$t('MSG_TIT_WRD_RTRV')"
        >
          <p01
            :parentPageId="this.$options.name"
            @exit="onPopupCancelClicked"
            @wordPopulate="wordPopulateMethod"
          />
        </sui-popup>
        <sui-popup
          v-model="showUpDomClsfPopup"
          :title="$t('MSG_TIT_UP_DOM_CLSF')"
        >
          <p02
            :parentPageId="this.$options.name"
            @exit="onPopupUpDomCancelClicked"
            @upDomClsf="selectUpDomClsf"
          />
        </sui-popup>
      </div>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          :disabled="!canBeHandle"
          @click="onNew()"
        >
          {{ $t('MSG_BTN_NEW') }}
        </sui-button>
        <sui-button
          v-permission:delete="this.$options.name"
          type="button"
          class="comm_btn_border"
          :disabled="!canBeHandle||domainClassId==''"
          @click="onDeleteData()"
        >
          {{ $t('MSG_BTN_DEL') }}
        </sui-button>
        <sui-button
          v-permission:update="this.$options.name"
          type="button"
          class="comm_btn_solid"
          :disabled="!canBeHandle||isSaveDisable&&domainClassId==''"
          @click="onRegisterData()"
        >
          {{ $t('MSG_BTN_SAVE') }}
        </sui-button>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index.js';
import p01 from './components/PGE_DST_00007_P01';
import p02 from './components/PGE_DST_00007_P02';

export default {
  name: 'PGE_DST_00007',
  components: {
    p01,
    p02,
  },
  data() {
    return {
      domainClass: '',
      domainExcel: '',
      domainClassEnglishName: '',
      upperDomainClassificationName: '',
      upperDomainClassId: '',
      domainClassName: '',
      domainClassId: '',
      domainClassLevel: '',
      wordId: '',
      isRowSelect: true,
      onNewClick: true,
      onEnableClick: true,
      isIcon: true,
      selectRow: '',
      duplicateCheckFlag: 100,
      isduplicateCheck: true,
      isNewButtonClicked: false,
      showRetrievePopup: false,
      showPopup: false,
      showUpDomClsfPopup: false,
      duplicateCheck: false,
      noRegisteredData: false,
      canBeHandle: true,
      isSaveDisable: true,
      localdata1: [],
      datasetInfo: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        resizableColumn: true,
      },
      defaultGridData0: {
        dataSource: {
          localdata: [],
          datatype: 'json',
          editable: true,
          selectionmode: 'singlecell',
          editmode: 'click',
        },
        altrows: true,
        showcolumnlines: false,
        showcolumnheaderlines: false,
        columns: [
          {
            text: this.$t('MSG_TXT_DOM_CLSF_ID'),
            value: 'domainClassificationID',
          },
          {
            text: this.$t('MSG_TXT_DOM_CLSF_NM'),
            value: 'domainClassificationName',
          },
          {
            text: this.$t('MSG_TXT_DOM_CLSF_ENM'),
            value: 'domainClassificationEnglishName',
          },
          {
            text: this.$t('MSG_TXT_UPP_DOM_CLSF_ID'),
            value: 'upperDomainClassificationID',
          },
        ],
      },
      selectedTreeData: {
        data: [],
      },
      treeData: {
        data: [],
      },
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getTreeData();
  },
  methods: {
    searchDomainClass(domainClass) {
      if (utils.isExistSpecialChar(domainClass) === true) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
        return;
      }
      let queryParams;
      if (domainClass) {
        queryParams = { domainClassificationName: this.domainClass };
      }
      http.request(this.$options.name, 'DTS_DST_00046', {
        query: queryParams,
      }).then(res => {
        this.localdata1 = res.data;
        this.defaultGridData0.dataSource.localdata = [];
        this.datasetInfo.setData(this.localdata1);
      });
    },
    // for new domain classfication
    onNew() {
      this.upperDomainClassificationName = '';
      this.upperDomainClassId = '';
      this.domainClassName = '';
      this.domainClassId = '';
      this.domainClassificationLevel = '';
      this.isSaveDisable = false;
      this.duplicateCheck = false;
      
      this.$refs.grdList.resetSelect();
      this.$refs.taskTree.resetSelect();
    },
    replaceChildValue(child) {
      for (let i = 0; i < child.length; i++) {
        if (child[i].children.length !== 0) {
          this.replaceChildValue(child[i].children);
        } else {
          child[i].treeInfo.hasChild = false;
          child[i].treeInfo.expanded = false;
        }
      }
    },
    setTreeData(data) {
      const rootNode = {
        id: 'root',
        parentId: null,
        level: 0,
        folderYn: 'Y',
        value: this.$t(''),
        text: this.$t(''),
        opened: true,
        contents: {},
        treeInfo: {
          name: 'Integrated Category',
          depth: 0,
          searched: false,
          selected: false,
          checked: false,
          hasChild: true,
          expanded: true,
          inlineEdit: false,
          draggable: false,
        },
        children: [],
      };
      rootNode.children = utils.getMakeUrTreeData({
        id: 'domainClassificationID',
        parentId: 'upperDomainClassificationID',
        level: 'hierarchyLevel',
        value: 'domainClassificationName',
        text: '{{domainClassificationName}} ({{domainClassificationID}})',
        wordId: 'wordId',
      }, data, true);
      this.treeData = { data: [rootNode] };
    },
    selectUpDomClsf(value) {
      this.upperDomainClassificationName = value.domainClassificationName;
      this.upperDomainClassId = '' + value.domainClassificationID;
      if (value.domainClassificationLevel == undefined) {
        this.domainClassLevel = '1';
      } else {
        this.domainClassLevel = parseInt(value.domainClassificationLevel) + 1;
      }
    },
    resetDomainClassField() {
      this.domainClass = '';
    },
    onDownloadExcel() {
      utils.downloadGridToExcel(this.$options.name, this.defaultGridData0.columns, this.datasetInfo, 'excel-export.xlsx');
      /*let queryParams = { "domainClassificationName" : this.domainClass };
        http.request('PGE_DST_00007', 'DTS_DST_00047', {
          path: {
          'page-id': 'PGE_DST_00007',
        },
          query: queryParams,
          responseType: 'arraybuffer'
        }).then((res) => {
          let fileName = "Domain_Classification_List.xlsx";
          utils.downloadBlob(res, fileName);
        })*/
    },
    onCheckDuplication() {
      if (this.domainClassId === '') {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_DOM_CLSF_ID'), null));
        return;
      }
      if (utils.isExistSpecialChar(this.domainClassId) === true) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
        return;
      }
      this.duplicateCheck = true;
      const queryParams = {
        domainClassificationID: this.domainClassId,
        domainClassificationName: this.domainClassName,
        domainClassificationLevel: this.domainClassLevel,
      }
      http.request(this.$options.name, 'DTS_DST_00050', {
        query: queryParams,
      }).then(res => {
        if (res.data.resultCode === '0') {
          console.log('Duplicate Dom Class ID Found');
          utils.messageBox('information', this.$t('MSG_ALT_IS_EXISTS'), null, null);
          this.duplicateCheck = false;
        } else if (res.data.resultCode === '2') {
          console.log('Duplicate Dom Class Name Found');
          utils.messageBox('information', this.$t('MSG_ALT_DUP_ID_LVL'), null, null);
          this.duplicateCheck = false;
        } else {
          this.noRegisteredData = true;
          utils.messageBox('information', this.$t('MSG_ALT_DATA_NOT_FOUND'), null, null);
        }
      });
    },
    /* @description: This function registers the selected row data
       */
    onRegisterData() {
      if (!this.domainClassName) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_DOM_CLSF_NM'), null));
      }
      else if (!this.domainClassId) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_DOM_CLSF_ID'), null));
      }
      else if (this.duplicateCheck) {
        // utils.confirm(
        // "Do you really want to save it ?",
        // "YES",
        // "NO",
        // this.onSaveData,
        // () => {}
        // );
        utils.messageBox('confirm', this.$t('MSG_ALT_IS_SAV_DATA'), null, this.onSaveData);
      }
      else if (!this.duplicateCheck) {
        utils.messageBox('information', this.$t('MSG_ALT_SELT_DPCT_CHK'), null, null);
      }
    },
    onSaveData() {
      const queryParams = {
        domainClassificationName: this.domainClassName,
        domainClassificationID: this.domainClassId,
        domainClassificationEnglishName: this.domainClassEnglishName,
        upperDomainClassificationID: this.upperDomainClassId,
        domainClassificationLevel: this.domainClassLevel,
        wordId: this.wordId,
      };
      http.request(this.$options.name, 'DTS_DST_00076', {
        query: queryParams,
      }).then(res => {
        if (res.data.resultCode === '2') {
          console.log('Duplicate Dom Class Name Found while registering/updating');
          utils.messageBox('information', this.$t('MSG_ALT_DUP_ID_LVL'), null, null);
          this.duplicateCheck = false;
        } else if (res.data.resultCode == '1') {
          utils.messageBox('information', this.$t('MSG_ALT_SAVE_DATA'), null, null);
          this.getTreeData();
        } else {
          utils.messageBox('information', this.$t('MSG_ALT_IS_EXISTS'), null, null);
        }
      });
    },

    onDeleteData() {
      utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), null, this.deleteDetail);
    },
    deleteDetail() {
      const pathParams = {
        'domain-classification-id': this.domainClassId,
      };
      http.request(this.$options.name, 'DTS_DST_00049', {
        path: pathParams,
      }).then(res => {
        if (res.data.msg == 'OK') {
          utils.messageBox('information', this.$t('MSG_ALT_DEL_DATA'), null, null);
          this.domainClassId = '';
          this.domainClassName = '';
          this.domainClassEnglishName = '';
          this.upperDomainClassId = '';
          this.upperDomainClassificationName = '';
          this.domainClassificationLevel = '';
          this.getTreeData();
        } else {
          utils.messageBox('information', res.data.msg, null, null);
        }
      });
    },
    onPopupClick() {
      this.showPopup = true;
    },
    onPopupUpDomClsfClick() {
      this.showUpDomClsfPopup = true;
    },
    onPopupCancelClicked() {
      this.showPopup = false;
    },
    onPopupUpDomCancelClicked() {
      this.showUpDomClsfPopup = false;
    },
    onItem(node) {
      this.duplicateCheck = true;
      this.selectedTreeData.data = node;
      this.setUpperDomainClsf(this.selectedTreeData);
    },
    setUpperDomainClsf(e) {
      let upDomClasfNm = '';
      if (e.data.domainClassificationLevel > 1) {
        upDomClasfNm = e.data.upperDomainClassificationName;
        if (!upDomClasfNm) upDomClasfNm = this.$t('MSG_TXT_ITGR_CLSF');
        this.upperDomainClassificationName = upDomClasfNm ;
        this.upperDomainClassId = e.data.upperDomainClassificationID;
        this.domainClassName = e.data.domainClassificationName;
        this.domainClassId = e.data.domainClassificationID;
        this.domainClassLevel = e.data.domainClassificationLevel;
        this.domainClassificationLevel = e.data.domainClassificationLevel;
        this.canBeHandle = true;
      }
      else if (e.data.domainClassificationLevel == 0 || e.data.domainClassificationLevel == undefined) {
        upDomClasfNm = '';
        this.upperDomainClassificationName = upDomClasfNm ;
        this.upperDomainClassId = ' ';
        this.domainClassName =  this.$t('MSG_TXT_ITGR_CLSF');
        this.domainClassId = '0';
        this.domainClassLevel = 0;
        this.domainClassificationLevel = '0';
        this.canBeHandle = false;
      }
      else {
        upDomClasfNm = e.data.upperDomainClassificationName;
        if (!upDomClasfNm && e.data.domainClassificationLevel == 1 ) upDomClasfNm = this.$t('MSG_TXT_ITGR_CLSF');
        this.upperDomainClassificationName = upDomClasfNm ;
        this.upperDomainClassId = e.data.upperDomainClassificationID;
        this.domainClassName = e.data.domainClassificationName;
        this.domainClassId = e.data.domainClassificationID;
        this.domainClassLevel = e.data.domainClassificationLevel;
        this.domainClassificationLevel = e.data.domainClassificationLevel;
        this.canBeHandle = true;
      }
    },
    wordPopulateMethod(value) {
      if (utils.isExistSpecialChar(value) === true) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
        return;
      }
      this.domainClassName = value.wordName;
      this.wordId = value.wordId;

      this.onPopupCancelClicked();
    },
    alpha() {
      const wsRegex = /^\s*\s*$/; // Change this line
      this.domainClassId = this.domainClassId.replace(wsRegex, '');
      this.duplicateCheck = false;
    },
    isNumber() {
      this.duplicateCheck = false;
      const alpharegex = /[^0-9.]/g;
      if (alpharegex.test(this.domainClassId) ) {
        utils.messageBox('warning', this.$t('MSG_ALT_ONLY_NUMBER'), null);}
      this.domainClassId = this.domainClassId.replace(/[^0-9.]/g, '');
    },
    getTreeData() {
      http.request(this.$options.name, 'DTS_DST_00048').then(res => {
        this.setTreeData(res.data);
        this.treeData.data.forEach(child => {
          child.children.forEach(item_lv1 => {
            item_lv1.opened = false;
          });
          for (let i = 0; i < this.treeData.data.length; i++) {
            if (this.treeData.data[i].children.length != 0) {
              this.replaceChildValue(this.treeData.data[i].children);
            }
          }
        });
      }).catch(err => {
      });
    },

  },

};
</script>
<style scoped>
</style>
