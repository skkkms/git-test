<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name"></sui-page-header>
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DOM_CLSF_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field v-model="domainClssificationName" :disabled="false" :clearable="true" :readonly="true" />
            <sui-button type="button" class="comm_btn_InputScr" @click="showRetrieveCall" />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DOMAIN_NAME')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field placeholder="" @input="specialChar(domainName ,'domainName')" maxlength="400" default value="" v-model="domainName" :disabled="false" :clearable="true" :readonly="false" @keyup.enter="searchDomain">
            </sui-text-field>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DOM_PHSC_NM')" :vertical="false"  />
          </div>
          <div class="col-xs-5">
            <sui-text-field placeholder="" @input="specialChar(domainPhysicalName , 'physicalName') " maxlength="100" default value="" v-model="domainPhysicalName" :disabled="false" :clearable="true" :readonly="false"  @keyup.enter="searchDomain">
            </sui-text-field>
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button type="button" class="comm_btn_Reset" v-on:click="resetFields">{{$t('MSG_BTN_RESET')}}</sui-button>
          <sui-button type="button" class="comm_btn_Scr" v-on:click="searchDomain" v-permission:read="this.$options.name" >{{$t('MSG_BTN_SEARCH')}}</sui-button>
        </div>
        <!-- <span v-if="ajaxRequest">Please wait... </span> -->
      </div>

      <div class="mrB30" />
      <div id="tableDisplay">

    <sui-s-grid
            ref="grdList"
            :headers="gridColumns"
            :data-source="dsData"
            :options="options"
            :showRowsPerPageControl="false"
            :initialRowsPerPage="5"
             @grid:selected="onSelectRow"
           >
        <template #right-info>
          <sui-button
            class="comm_btn_gridTop comm_ico_excel"
           @click="onDownloadExcel"
          >
            {{ $t("MSG_BTN_EXCEL_DOWN") }}
          </sui-button>          
        </template>
          
                 
      </sui-s-grid>






      </div>

      <div class="comm_btn_wrap">
        <sui-button type="button" class="comm_btn_border"  @click="modificationCall" v-permission:update="this.$options.name">{{$t('MSG_BTN_MOD')}}</sui-button>
        <sui-button type="button" class="comm_btn_border"  @click="deletionCall" v-permission:delete="this.$options.name" >{{$t('MSG_BTN_DEL')}}</sui-button>
        <sui-button type="button" class="comm_btn_solid" @click="newRegistertionCall" v-permission:create="this.$options.name" >{{$t('MSG_BTN_RGST')}}</sui-button>
      </div>

      <!--<div class="comm_title_wrap">
        <h4>{{$t('MSG_TXT_LIST_RLTD_TRM')}}</h4>
      </div>
      <sui-grid ref="mainGrid"
          :dataset="'datasetInfo'"
          :columns="defaultGridData0.columns"
          :enabletooltips="true"
          :initialPagesize="5"
          :showDisplayCountControl="false"
          />-->
      <div class="mrT10"></div>
      <sui-popup v-model="showRetrievePopup" :title="$t('MSG_TXT_RTV_STD_DOM')">
        <p05 @save="onPopupSaveClicked" @exit="onPopupCancelClicked" :parentPageId="this.$options.name" @wordPopulate="wordPopulateMethod"/>
      </sui-popup>
      <sui-popup v-model="showInformationPopup" :title="$t('MSG_TIT_STD_DOM_DTL')">
        <p02 :biddingInformationParam = "biddingInformationParam" @save="onPopupSaveClicked" @exit="onPopupCancelClicked" :parentPageId="this.$options.name"/>
      </sui-popup>
      <sui-popup v-model="showRegistrationPopup" :title="$t('MSG_TIT_NEW_DOM_APPL')">
        <p01 @save="onPopupSaveClicked" @exit="onPopupCancelClicked" :parentPageId="this.$options.name" />
      </sui-popup>
      <sui-popup v-model="modificationPopup" :title="$t('MSG_TIT_MOD_DOM_APPL')">
        <p03 :biddingInformationParam = "biddingInformationParam" @save="onPopupSaveClicked" @exit="onPopupCancelClicked" :parentPageId="this.$options.name"/>
      </sui-popup>
      <sui-popup v-model="deletionPopup" :title="$t('MSG_TIT_DEL_DOM_APPL')">
        <p04 :biddingInformationParam = "biddingInformationParam" @save="onPopupSaveClicked" @exit="onPopupCancelClicked" :parentPageId="this.$options.name"/>
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
  import p01 from './components/PGE_DST_00001_P01';
  import p02 from './components/PGE_DST_00001_P02';
  import p03 from './components/PGE_DST_00001_P03';
  import p04 from './components/PGE_DST_00001_P04';
  import p05 from './components/PGE_DST_00001_P05';
  import tab01 from './components/PGE_DST_00001_T01';
  import tab02 from './components/PGE_DST_00001_T02';
  import {urDataSet} from 'uidev-component/index.js';
  const dateTypeFields = ['finalModificationDTM'];
  export default {
    name: 'PGE_DST_00001',
    components: {
        p01,
        p02,
        p03,
        p04,
        p05,
        tab01,
        tab02
    },
    data() {
      return {
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
        domainClssificationName : '',
        domainClassificationID: '',
        wordId : '',
        domainCheck : true,
        domainName : '',
        domainPhysicalName : '',
        showRetrievePopup: false,
        showInformationPopup: false,
        showRegistrationPopup : false,
        selectedPageId : '',
        modificationPopup : false,
        deletionPopup : false,
        biddingInformationParam : {},
        selectedCodeValue: {
          COD_MDLE: {
            label: '',
            key: ''
          }
        },
        selectedGridRowData: {},
        selectedDomainId:null,
        localdata : [],
        localdata1: [],
        localdata2: [],
        dsData: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      
       
        defaultSelectedTab: 0,
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
              text: this.$t('MSG_TXT_TRM_NM'),
              datafield: 'termsName',
            },
            {
              text: this.$t('MSG_TXT_TRM_PHSC_NM'),
              datafield: 'termsId',
              width: 200,
            },
            {
              text: this.$t('MSG_TXT_TRM_CNTN'),
              datafield: 'termsContent',
            },
            {
              text: this.$t('MSG_TXT_DOMAIN_NAME'),
              datafield: 'domainName',
              width: 200,
            },
            {
              text: this.$t('MSG_TXT_DT_TYP_NM'),
              datafield: 'domainDataTypeName',
              width: 100,
            },
            {
              text: this.$t('MSG_TXT_LEN'),
              datafield: 'domainLength',
              width: 80,
            },
            {
              text: this.$t('MSG_TXT_DECM_LGHT'),
              datafield: 'domainDataDecimalLength',
              width: 100,
            },
          ],
        },
      }
    },
   
    computed: {},
    watch: {},

    created()
    {
       const that = this;
       this.gridColumns= [
          {
            text: this.$t('MSG_TXT_UPDOM_CLSF_NM'),
            value: 'upperDomainClassificationID',
            width: 150,
          },
          {
            text: this.$t('MSG_TXT_DOM_CLSF_NM'),
            value: 'domainClassificationName',
            width: 150,
          },
          {
            text: this.$t('MSG_TXT_DOMAIN_NAME'),
            value: 'domainName',
            width: 200,
          },
          {
            text: this.$t('MSG_TXT_DOM_PHSC_NM'),
            value: 'domainId',
           
            width: 120,
          component: {
          props: ['row', 'value'],
          template: `
          <ur-button
            color="#60a3ef !important"
            style="justify-content: left"
            hyperlink
            @click="onButtonClick">
            {{value}}
          </ur-button>`,
          methods: {
            onButtonClick() {
              that.onClickGrid(null, this.row);
            },
          },
        },
          },
          {
            text: this.$t('MSG_TXT_DOM_DSCR'),
            value: 'domainContent',
          },
          {
            text: this.$t('MSG_TXT_DT_TYP'),
            value: 'domainDataTypeName',
            width: 100,
          },
          {
            text: this.$t('MSG_TXT_LEN'),
            value: 'domainLength',
            width: 80,
            cellsalign: 'right',
          },
          {
            text: this.$t('MSG_TXT_DECM_LGHT'),
            value: 'domainDataDecimalLength',
            width: 100,
            cellsalign: 'right',
          },
          {
            text: this.$t('MSG_TXT_MDFC_DTM'),
             value: 'finalModificationDTM',
            customValue(value)
            {
              return utils.dateformatToServer(value).replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
                     "$1/$2/$3 $4:$5:$6"); 
            },
            width: 150,
          },
        ];

    },

    mounted() {
    },
    methods: {
      searchDomain: function(event){
        this.onSearchClick()
      },
      onClearSelectionMainGrid() {
      this.selectedPageID = '';
      },
      onChangeTabIdx(idx) {
        this.currentTabComponent = this.tabItems[idx].tabComponent;
        setTimeout(() => {
            this.$refs.tabPage.getDataByDomainId(this.selectedDomainId);  
        }, 500);
      },
      setCurrentTabComponent(component) {
        this.currentTabComponent = component;
      },
      specialChar(value , name) {
        if (utils.isExistSpecialChar(value) === true) {
          utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null,()=>{
        if(name === 'domainName')
        {
          this.domainName='';
        }
        else {
          this.domainPhysicalName='';
        }
          });
        }
      },
      onDownloadExcel() {
       
        utils.downloadGridToExcel(this.$options.name, this.gridColumns, this.dsData, "excel-export.xlsx");
      },
      onSearchClick(){
        const queryParams = {};
        if(this.domainClssificationName)
        {
         queryParams.domainClassificationName = this.domainClssificationName;
         queryParams.domainClassificationID = this.domainClassificationID;
       }
        if(this.domainName){ queryParams.domainName = this.domainName }
        if(this.domainPhysicalName){ queryParams.domainPhysicalName = this.domainPhysicalName }
        http.request(this.$options.name, 'DTS_DST_00001', {
          query: queryParams,
        }).then(res => {

          utils.dateformatToClientInArray(res.data, dateTypeFields);
          this.dsData.setData(res.data);
          this.domainCheck = true;
          // on click of domain search reset tabs data.
          this.selectedDomainId = null;
          this.$refs.tabPage.getDataByDomainId(null);
        }).catch(error => {
          this.conFirm(1, error);
        });
      },
      domainInformationGet(domainId, value){
          http.request(this.$options.name, 'DTS_DST_00003', {
            path: {
              'domain-id':  domainId
            },
          }).then(res => {
            let response = res.data
            //console.log(response)
            this.biddingInformationParam = response;
            if(value){
              this.showInformationPopup = true;
            }
          }).catch(error => {
            this.conFirm(1, error);
          });
      },
      onClickGrid(btn, dataRow){
        this.domainInformationGet(dataRow.domainId , true)
      },
      onSelectRow(row){
        this.domainCheck = false;
        this.selectedDomainId = row.domainId;
        this.$refs.tabPage.getDataByDomainId(this.selectedDomainId);
        this.biddingInformationParam = row;
      },
      onPopupCancelClicked(event) {
        this.showRetrievePopup = false;
        this.showRegistrationPopup = false;
        this.modificationPopup = false;
        this.deletionPopup = false;
        this.showInformationPopup = false
      },
      onPopupSaveClicked(){
        console.log('Pop is close.')
      },
      showRetrieveCall(){
        this.showRetrievePopup = true;
      },
      newRegistertionCall(){
        this.showRegistrationPopup = true;
      },
      modificationCall(){
        this.modificationPopup = true;
      },
      deletionCall(){
        this.deletionPopup = true;
      },
      wordPopulateMethod(value){
        this.domainClssificationName = value.domainClassificationName;
        this.domainClassificationID = value.domainClassId
        this.wordId = value.wordId;
      },
      resetFields(){
        this.domainClssificationName = '';
        this.domainName = '';
        this.domainPhysicalName = '';
      },
    },
  };
</script>
