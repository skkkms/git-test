<template>
  <sui-page>
    <sui-page-header :title="$t('MSG_TIT_WRD_MAIN')" :pageId="this.$options.name"></sui-page-header>
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_WRD_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field placeholder="" ref="wordName" maxlength="100" v-model="wordName" @keyup.enter="onSearchClick" default value :disabled="false" :clearable="true" :readonly="false"></sui-text-field>
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_WRD_PHSC_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field placeholder=""  ref="wordPhysicalName" maxlength="100" v-model="wordPhysicalName" @keyup.enter="onSearchClick"  default value :disabled="false" :clearable="true" :readonly="false"></sui-text-field>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_WRD_EN_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field placeholder="" ref="wordEnglishName" maxlength="100" v-model="wordEnglishName" @keyup.enter="onSearchClick"  default value :disabled="false" :clearable="true" :readonly="false"></sui-text-field>
          </div>      
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_WRD_TYP_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-code-select ref="wordTypeCombo"
              :selected="selectData.COD_WRD_TYPE_DIV"
              :pageId="this.$options.name"
              codeId="COD_WRD_TYPE_DIV"
              :disabled="false"
			      	:defaultOption="'all'"
              />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_WRD_DSCR')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field placeholder="" maxlength="100" v-model="wordContent" @keyup.enter="onSearchClick" default value :disabled="false" :clearable="true" :readonly="false"></sui-text-field>
          </div>
       </div>
        <div class="btn_wrap">
          <sui-button type="button" class="comm_btn_Reset" @click="resetFields">{{$t('MSG_BTN_RESET')}}</sui-button>
          <sui-button type="button" class="comm_btn_Scr" @click="searchWordList" v-permission:read="this.$options.name" >{{$t('MSG_BTN_SEARCH')}}</sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <div id="tableDisplay">
        <!-- <sui-grid ref="gridList"
            :dataset="'dsData'"
            :columns="gridColumns"
            :enabletooltips="true"
            :initialPagesize="5"
            :showDisplayCountControl="false"
            @rowselect="onSelectRow">
            <div class="btn_wrapR">
              <sui-button type="button" class="comm_btn_gridTop comm_ico_excel" @click="downloadExcel" v-permission:download="this.$options.name" >{{$t('MSG_BTN_EXCEL_DOWN')}}</sui-button>
            </div>
        </sui-grid> -->

        <sui-s-grid 
          ref="gridList"
          :data-source="dsData"
          :headers="gridColumns"
          :enabletooltips="true"
          :initialPagesize="5"
          :showDisplayCountControl="false"
          @grid:selected="onSelectRow"
        >
          <template
            #right-info
            class="btn_wrapR"
          >
            <sui-button type="button" class="comm_btn_gridTop comm_ico_excel" @click="downloadExcel">
              {{$t('MSG_BTN_EXCEL_DOWN')}}
            </sui-button>
          </template>
        </sui-s-grid>
      </div>
      <div class="comm_btn_wrap">
        <sui-button type="button" class="comm_btn_border" :disabled= "wordCheck" @click="modificationCall" v-permission:update="this.$options.name" >{{$t('MSG_BTN_MDFC')}}</sui-button>
        <sui-button type="button" class="comm_btn_border" :disabled= "wordCheck" @click="deletionCall" v-permission:delete="this.$options.name" >{{$t('MSG_BTN_DEL')}}</sui-button>
        <sui-button type="button" class="comm_btn_solid" @click="newRegistertionCall" v-permission:create="this.$options.name" >{{$t('MSG_BTN_RGST')}}</sui-button>
      </div>
      <div class="mrB10"></div>
      <div class="mrB10"></div>
      <sui-popup v-model="showRetrievePopup" :title="$t('MSG_TIT_WRD_MAIN')">
        <p01 :biddingInformationParam="biddingInformationParam" @save="onPopupSaveClicked" @exit="onPopupCancelClicked" :parentPageId="this.$options.name" />
      </sui-popup>
      <sui-popup v-model="modificationPopup" :title="$t('MSG_TIT_WRD_MOD_MAIN')">
        <p02 :biddingInformationParam="biddingInformationParam" @save="onPopupSaveClicked" @exit="onPopupCancelClicked" :parentPageId="this.$options.name" />
      </sui-popup>
      <sui-popup v-model="deletionPopup" :title="$t('MSG_TIT_WRD_DEL_MAIN')">
        <p03 :biddingInformationParam="biddingInformationParam" @save="onPopupSaveClicked" @exit="onPopupCancelClicked" :parentPageId="this.$options.name" />
      </sui-popup>
      <sui-page-tab-box-type
        :tabItems="tabItems"
        :defaultTabIndex="defaultTabIndex"
        :setCurrentTabComponent="setCurrentTabComponent"
        @change-tab-idx="onChangeTabIdx"
      >
        <container
          :is="currentTabComponent"
          ref="tabPage"
          :pageId="this.$options.name"
          :selectedPageId="selectedPageID"
          @onClearSelectionMainGrid="onClearSelectionMainGrid"
          @onSearchClick="onSearchClick"
        />
      </sui-page-tab-box-type>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index';
import p01 from './components/PGE_DST_00002_P01';
import p02 from './components/PGE_DST_00002_P02';
import p03 from './components/PGE_DST_00002_P03';
//import p04 from './PGE_DST_00003';
import tab01 from './components/PGE_DST_00002_T01';
import tab02 from './components/PGE_DST_00002_T02';

const dateTypeFields = ['finalModificationDTM'];

export default {
  name: 'PGE_DST_00002',
  components: {
    p01,
    p02,
    p03,
    //p04
    tab01,
    tab02,
  },
  data() {
    return {
      selectedWordId:null,
      selectedPageID: '',
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_LIST_RLTD_TRM'),
          tabComponent: tab01,
        },
        {
          tabTitle: this.$t('MSG_TXT_REQ_HIST'),
          tabComponent: tab02,
        },
      ],
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      wordName: '',
      wordPhysicalName: '',
      wordEnglishName:'',
      wordContent:'',
      showRetrievePopup: false,
      modificationPopup : false,
      deletionPopup : false,
      wordCheck : true,
      biddingInformationParam : {},
      // Codes
      selectData: {
        COD_WRD_TYPE_DIV: { label: '', key: '' }
      },
      selectedGridRowData: {},
      localdata : [],
      dsData: new urDataSet(),
      localRelatedTerms : [],
      gridColumns: [],
    };
  },
  computed: {},
  watch: {
    wordName: function(value){
      this.isCheckSpecialCharacter(value,'wordName');
    },
    wordEnglishName: function(value){
    
      this.isCheckSpecialCharacter(value,'wordEnglishName');

    },
    wordPhysicalName: function(value){
         
      this.isCheckSpecialCharacter(value, 'wordPhysicalName');
    }
  },
  mounted() {
    const that = this;
    this.gridColumns = [{
      text: this.$t('MSG_TXT_WRD_NM'),
      value: 'wordName',
    },
    {
      text: this.$t('MSG_TXT_WRD_PHSC_NM'),
      value: 'wordId',
      component: {
        props: ['row', 'value'],
        template: `
          <ur-button
            color="#60a3ef !important"
            style="justify-content: left"
            shape="hyperlink"
            @click="onButtonClick">
            {{value}}
          </ur-button>`,
        methods: {
          onButtonClick() {
            that.onClickGrid(null, this.row);
          },
        },
      },
      width: 150,
    },
    {
      text: this.$t('MSG_TXT_WRD_EN_NM'),
      value: 'wordEnglishName',
    },
    {
      text: this.$t('MSG_TXT_WRD_DSCR'),
      value: 'wordContent',
    },
    {
      text: this.$t('MSG_TXT_WRD_TYP_NM'),
      value: 'wordTypeName',
      width: 100,
    },
    {
      text: this.$t('MSG_TXT_DOM_CLSF_NM'),
      value: 'domainClassificationName',
      width: 100,
    },
    {
      text: this.$t('MSG_TXT_REV_DT'),
      value: 'finalModificationDTM',
      customValue(value) {
        return moment(value).format('YYYY-MM-DD HH:mm:ss');
      },
      width: 150,
    }];
  },
  methods: {
    onClearSelectionMainGrid() {
      this.selectedPageID = '';
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].tabComponent;
      this.$nextTick(() => {
        this.$refs.tabPage.getData(this.selectedWordId);
      });
    },
    setCurrentTabComponent(component) {
      this.currentTabComponent = component;
    },
    searchWordList(event) {
      this.onSearchClick();
    },
    onSearchClick() {
      let wordTypeCodeValue = this.selectData.COD_WRD_TYPE_DIV.key;
      if (this.selectData.COD_WRD_TYPE_DIV.key == 'ALL') {
        wordTypeCodeValue = '';
      }
  
      const queryParams = {};
      let fieldArray = {
        "wordId" : this.wordPhysicalName,
        "wordName" : this.wordName,
        "wordEnglishName" : this.wordEnglishName,
        "wordContent" : this.wordContent,
        "wordTypeCode" : wordTypeCodeValue
      }
      for(const key in fieldArray){
        if(fieldArray[key]){
          queryParams[key] = fieldArray[key]
        }
      }
      http.request(this.$options.name, 'DTS_DST_00009', {
        query: queryParams,
      }).then(res => {
        
        utils.dateformatToClientInArray(res.data, dateTypeFields);
        this.dsData.setData(res.data);
        // on click of domain search reset tabs data.
        this.selectedWordId = null;
        this.$refs.tabPage.getData(null);
      }).catch(error => {
        console.log(error);
      });
    },
    
    // Reset Function
    resetFields: function(event){
      const data = [];
      this.wordName= '';
      this.wordPhysicalName= '';
      this.wordEnglishName= '';
      this.wordContent= '';
      this.wordId='';
      this.wordCheck = true;
      this.$refs.wordTypeCombo.reset();
      this.dsDataRelatedTerms.data = [];
    },
    onPopupSaveClicked: function(event){
      console.log('onPopupSaveClicked')
    },
    onPopupCancelClicked: function(event){
      this.showRetrievePopup = false;
      this.modificationPopup = false;
      this.deletionPopup = false;
    },
    //Excel Download
    downloadExcel(){
      utils.downloadGridToExcel(this.$options.name, this.gridColumns, this.dsData, "excel-export.xlsx");
    },
    // Retrival popup
    wordInformationGet(wordId, value) {
      http.request(this.$options.name, 'DTS_DST_00013', {
        path: {
          'word-id':  wordId
        },
      }).then(res => {
        this.biddingInformationParam = res.data;
        if(value){
          this.showRetrievePopup = true;
        } else{
          this.wordCheck = false;
        }
      }).catch(error => {
        console.log("Get Information Error");
      });
    },
    // On Cell Click
    onClickGrid(btn, dataRow){
      this.wordInformationGet(dataRow.wordId , true)

    },
    onSelectRow(target) {
      if (target !== undefined) {
        // const wordId = target.args.row.wordId;
      this.wordId = target.wordId;
      this.selectedWordId = target.wordId;
      this.wordInformationGet(target.wordId , false);
      this.$refs.tabPage.getData(this.wordId);
      };
    },
    // New Registration
    newRegistertionCall: function(event){
      utils.openLayerPopup('PGE_DST_00003',this.onPagePopupCallback,{size: 'lg'})
    },
    // Modify Registration
    modificationCall: function(event){
      this.modificationPopup = true;
    },
    // Deletion Registration
    deletionCall: function(event){
      this.deletionPopup = true;
    },
    /* @Description: special Charcter function */ 
    isCheckSpecialCharacter:function(value, name){
      if (utils.isExistSpecialChar(value)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          let regex= /(?!\w|\s)./g;
          value=value.replace(regex,'');
          this[name] = value;
        });
      } 
    },
     
  },
};
</script>
<style scoped>
</style>
