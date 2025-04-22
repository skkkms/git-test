<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name"></sui-page-header>
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_RPST_WRD_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              placeholder=""
              maxlength="100"
              v-model.trim="vm_wordName"
              @keyup.enter="onSearchClick"
              default
              value
              :disabled="false"
              :clearable="true"
              :readonly="false"
            ></sui-text-field>
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_RPST_WRD_PHSC_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              placeholder=""
              maxlength="100"
              v-model.trim="vm_wordId"
              @keyup.enter="onSearchClick"
              default
              value
              :disabled="false"
              :clearable="true"
              :readonly="false"
            ></sui-text-field>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_SYNO_WRD_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              placeholder=""
              maxlength="100"
              v-model.trim="vm_smlWordName"
              @keyup.enter="onSearchClick"
              default
              value
              :disabled="false"
              :clearable="true"
              :readonly="false"
            ></sui-text-field>
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button type="button" class="comm_btn_Reset" @click="resetFields()">{{$t('MSG_BTN_RESET')}}</sui-button>
          <sui-button type="button" class="comm_btn_Scr" @click="onSearchSynonym()" v-permission:read="this.$options.name" >{{$t('MSG_BTN_SEARCH')}}</sui-button>
        </div>
      </div>
      <div class="mrB30"></div>    
      <sui-s-grid
        ref="gridListRelatedTerms"
        :data-source="dataset0"
        :headers="gridColumns0"
        :initialRowsPerPage="10"
        :showRowsPerPageControl="false"
        @grid:selected="onSelectRow"
      >
        <template #right-info>
          <div class="btn_wrapR">
            <ur-button
              v-permission:download="'PGE_DST_00008'"
              type="button"
              class="comm_btn_gridTop comm_ico_excel"
              small
              @click="onDownloadExcel"
            >
              {{ $t('MSG_BTN_EXCEL_DOWN') }}
            </ur-button>
          </div>
        </template>
      </sui-s-grid>
      <div class="mrT15"></div>
      
      <br />
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label  :label="$t('MSG_TXT_RPST_WRD_NM')"  :required="true" :vertical="false" />
          </div>
          <div class="col-xs-5">           
            <sui-text-field
              v-model.trim="repLogicalNameGrid"
              @click="onRetrieval"
              :disabled="false" :clearable="true" :readonly="true"
             
            required fixed-icon />
               <!--<sui-button
                type="button"
                class="comm_btn_InputScr"
                @click="onRetrieval"
                :disabled="isIcon"
              />-->
      
          </div>
          <div class="col-xs-1">
            <sui-input-label  :label="$t('MSG_TXT_SYNO_WRD_NM')"  :required="true" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              placeholder=""
              v-model.trim="synonymGrid"
              default
              value
              :disabled="onEnableClick"
              :clearable="true"
              :readonly="false"
              @keyup="onKeyUpInput"
            required></sui-text-field>
            <div class="comp_spacing"/>
            <sui-button
              type="button"
              class="comm_btn_duplicate"
              :disabled ="onNewClick"
              @click="checkDuplicateSynonym(synonymGrid,repLogicalNameGrid)"
            ></sui-button>
          </div>      
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label  :label="$t('MSG_TXT_DESC')" :required="true" :vertical="false" />
          </div>
          <div class="col-xs-11">
            <textarea v-model.trim="descriptionGrid" required>TextArea</textarea>
          </div>
        </div>
        
      </div>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onNewWordConfirm()"
          
        >{{$t('MSG_BTN_NEW')}}</sui-button>
        <sui-button
          type="button"
          class="comm_btn_border"
          :disabled="isDeleteDisabled"
          @click="onDeleteData()"
         v-permission:delete="this.$options.name" >{{$t('MSG_BTN_DEL')}}</sui-button>
        <sui-button
          type="button"
          class="comm_btn_solid"
          :disabled="isRowSelect"
          @click="onSaveConfirm()"
          v-permission:update="this.$options.name" 
        >{{$t('MSG_BTN_SAVE')}}</sui-button>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index';
import p01 from "./PGE_DST_00017";

export default {
  name: "PGE_DST_00008",
  components: {
    p01
  },
  data() {
    return {
      repLogicalName: "",
      repPhysicalName: "",
      synonym: "",
      domainName: "",
      isRowSelect: true,
      onNewClick: true,
      onEnableClick:true,
      isIcon:true,
      synonymGrid: "",
      selectRow:"",
      oldSynonymGrid: "",
      descriptionGrid: "",
      duplicateCheckFlag: 100,
      isduplicateCheck: true, 
      isNewButtonClicked: false,
      showRetrievePopup: false,
      isDeleteDisabled: true,
      repLogicalNameGrid: "",
      pageId1: "",
      vm_wordName: "",
      vm_wordId: "",
      vm_smlWordName: "",
      selectedCodeValue: {
        COD_MDLE: {
          label: "",
          key: ""
        }
      },
      localdata0: [],
      gridColumns0: [
        {
          text: this.$t('MSG_TXT_SYNO_WRD_NM'),
          value: 'similarityWordName',
          width: 250,
        },
        {
          text: this.$t('MSG_TXT_RPST_WRD_NM'),
          value: 'wordName',
          width: 250,
        },
        {
          text: this.$t('MSG_TXT_RPST_WRD_PHSC_NM'),
          value: 'wordId',
          width: 250,
        },
        {
          text: this.$t('MSG_TXT_DESC'),
          value: 'similarityWordContent',
        }
      ],
      dataset0: new urDataSet(),
    };
  },
  computed: {},
  watch: {},
  mounted() {},

  methods: {

    /*  @description : Resets all the input fields.
     */
    resetFields: function() {
      this.vm_wordName = "";
      this.vm_wordId = "";
      this.vm_smlWordName = "";
      let emptyArray=[];
       this.dataset0.setData(emptyArray)
    },
   

    /*  @description: Search the fields value on basis of special Character
    */
    onSearchSynonym: function() {
      if(this.specialChar(this.vm_wordName, this.vm_wordId, this.vm_smlWordName)!=true){
        this.onSearchClick();
      }
    },
    /* @description: Special Character function started
     */
    specialChar(value1, value2, value3) {
      let isSpecialCharacter= false;
      if (
        utils.isExistSpecialChar(value1) == true || 
        utils.isExistSpecialChar(value2) == true ||
        utils.isExistSpecialChar(value3) == true
      ) {
        isSpecialCharacter =true;
        utils.messageBox(
          "warning",
         this.$t('MSG_ALT_NO_SPECL_CHAR'),
          null
        );
      }
      
      return isSpecialCharacter;
    },
    /*  @description: Search the value based on the search condition 
     */
    onSearchClick() {
      const queryParams = {};
      let fieldArray = {
        wordId: this.vm_wordId,

        wordName: this.vm_wordName,
        similarityWordName: this.vm_smlWordName,
      };
      for (let key in fieldArray) {
        if (fieldArray[key]) {
         queryParams[key] = fieldArray[key];
        }
      }
      http.request(this.$options.name, "DTS_DST_00052", {
          query: queryParams
        })
        .then(res => {
        this.dataset0.setData(res.data);
        this.isRowSelect=true;
        this.isDeleteDisabled=true;
        this.repLogicalNameGrid = "";
        this.repPhysicalName = "";
        this.descriptionGrid = "";
        this.synonymGrid = "";
        })
        .catch(error => {
          console.log("error occured during search click");
        });
    },
    /*  @description: This function download the excel file 
     */
    onDownloadExcel() {
      const queryParams = {};
      let fieldArray = {
        wordId: this.vm_wordId,
        wordName: this.vm_wordName,
        similarityWordName: this.vm_smlWordName,
      };
      for (let key in fieldArray) {
        if (fieldArray[key]) {
         queryParams[key] = fieldArray[key];
        }
      }
      http 
        .request("PGE_DST_00008", "DTS_DST_00053", {
          path: {
            "page-id": "PGE_DST_00008"
          },
          query: queryParams,
          responseType: "arraybuffer"
        })
        .then(res => {
          let fileName = "Export-Excel.xlsx";
          utils.downloadBlob(res, fileName);
        });
    },
    /* @description: This  function select the row and populate the value in grid
     */
    onSelectRow(selectedRow) {
      this.isRowSelect = false;
      this.isDeleteDisabled = false;
      this.onEnableClick = true;
      this.isIcon = true;
      this.onNewClick = true;
      this.isNewButtonClicked = false;
      if (selectedRow) {
        this.selectRow = selectedRow.__idx;
        this.repLogicalNameGrid = selectedRow.wordName;
        this.repPhysicalName = selectedRow.wordId;
        this.oldSynonymGrid = selectedRow.similarityWordName;
        this.synonymGrid = selectedRow.similarityWordName;
        this.descriptionGrid = selectedRow.similarityWordContent;
      }
    },
    /* @description: This function show the popup information
     */
    onRetrieval: function(value) {
      utils.openLayerPopup('PGE_DST_00017',this.onPagePopupCallback,  {
          pageInitialData: { content: this.$options.name, popTitle: 'Word Retrieval'},
          size: 'lg',
      });
    },
    /* @description: This function check for the Duplicate functionality
     */
    checkDuplicateSynonym(smlWordName, repLogicalNm) {
      if (utils.isExistSpecialChar(smlWordName) === true ||
        utils.isExistSpecialChar(repLogicalNm) === true) {
        utils.messageBox(
          "warning",
          this.$t('MSG_ALT_NO_SPECL_CHAR'),
          null
        );
        return;
      }
      if(!this.repLogicalNameGrid) {
        const msg = utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_RPST_WRD_NM'));
        utils.messageBox('error', msg);
        return;
      }
      else if(!this.synonymGrid){
        const msg = utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_SYNO_WRD_NM'));
        utils.messageBox('error', msg);
        return;
      }
      else {
        this.isduplicateCheck = true;
        const queryParams = {
          'word-id': smlWordName,
          'repLogicalName': repLogicalNm
      };
      http.request("PGE_DST_00008", "DTS_DST_00081", {
          query: queryParams
        })
        .then(res => {
          console.log(res);
          if (res.data.resultCode == 0) {
            this.duplicateCheckFlag = 300;
            const msg = utils.strFormat(this.$t('MSG_ALT_BE_RGST_OK'), this.$t('MSG_TXT_SYNO_WRD_NM'));
            utils.messageBox('information', msg);
            this.isduplicateCheck = false;
            return;
          } else {
            this.duplicateCheckFlag = 200;
            utils.messageBox(
              "information",
              this.$t('MSG_ALT_DUP_VALUE'),
              null,
              null
            );
            return;
          }
        });
      }
    },

    /*  @Description: This Function Restrict the field value for underscore and spaces
     */
    onKeyUpInput(){
      let wsRegex = /[\s+_]/g; 
      this.synonymGrid = this.synonymGrid.replace(wsRegex, '');
      if (utils.isExistSpecialChar(this.synonymGrid) === true
        || utils.isExistSpecialChar(this.descriptionGrid) == true) {
        utils.messageBox('warning',  this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
        return;
      }
    },
    /* @description: This function reset the field value
     */
    onNewWordConfirm() {
      this.$refs.gridListRelatedTerms.resetSelect();
        this.registerNewSynonym()
    },
    registerNewSynonym(){
        this.isNewButtonClicked = true;
        this.isRowSelect = false;
        this.isDeleteDisabled=true;
        this.isduplicateCheck = true;
        this.onEnableClick = false;
        this.isIcon= false;
        this.repLogicalNameGrid = "";
        this.repPhysicalName = "";
        this.descriptionGrid = "";
        this.synonymGrid = "";
        this.onNewClick=false;
    },
    /*  @description: This function performs the save functionality
     */
    onSaveConfirm() {
       if(!this.repLogicalNameGrid){
        const msg = utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_RPST_WRD_NM'));
        utils.messageBox('error', msg);
        return;
        }
        else if(!this.synonymGrid){
        const msg = utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_SYNO_WRD_NM'));
        utils.messageBox('error', msg);
        return;
        }
        else if(!this.descriptionGrid){
          const msg = utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_EXPL'));
        utils.messageBox('error', msg);
        return;
        }
      if(this.isNewButtonClicked){
        console.log("inside save",this.isduplicateCheck);
        if(this.isduplicateCheck){

        utils.messageBox("information", this.$t('MSG_ALT_CHK_DUP'), null, null );
        return;
      } else{
      //  utils.confirm(
      //   this.$t('MSG_ALT_RGST'),
      //   this.$t('MSG_TXT_YES'), this.$t('MSG_TXT_NO'),
      //   this.onNewDataClicked,
      //   () => {} 
      //   );
      utils.messageBox('confirm', this.$t('MSG_ALT_RGST'), null, this.onNewDataClicked);
      }
      }
      else {
          // utils.confirm(
          //    this.$t('MSG_ALT_MDFC'),
          //  this.$t('MSG_TXT_YES'), this.$t('MSG_TXT_NO'),
        
          //   this.onModifyClicked,
          //   () => {}
          // );
          utils.messageBox('confirm', this.$t('MSG_ALT_MDFC'), null, this.onModifyClicked);
         }
  },
    /* @description: This function add up the new data 
     */
    onNewDataClicked() {
        let queryParams = { 
        'wordName': this.repLogicalNameGrid,
        'word-id': this.repPhysicalName,
        'similarityWordContent': this.descriptionGrid,
        'similarityWordName': this.synonymGrid
        };
     http.request("PGE_DST_00008", "DTS_DST_00054", {
          query: queryParams
         })
         .then(res => {
          if (res.data.resultCode == 0) {
          utils.messageBox("information", this.$t('MSG_ALT_NO_DATA'), null, null);
         } else if (res.data.resultCode == 1) {
         utils.messageBox("information", this.$t('MSG_ALT_SAVE_DATA'), null, null);
           }
          this.isNewButtonClicked = false;
          this.onEnableClick = true;
          this.isIcon= true;
          this.onNewClick=true;

          this.onSearchClick();
          this.repLogicalNameGrid = '';
          this.repPhysicalName= '';
          this.descriptionGrid= '';
          this.synonymGrid = '';
          })
       .catch(error => {
            console.log("errrSave");
         });       
 },
    /* @description: This function modify data based on the condition
     */
    onModifyClicked(){
      let queryParams = { 
        'wordName': this.repLogicalNameGrid,
        'word-id': this.repPhysicalName,
        'similarityWordContent': this.descriptionGrid,
        'similarityWordName': this.synonymGrid
      };
      http.request("PGE_DST_00008", "DTS_DST_00055", {
          path: {
            'word-id': this.synonymGrid,
          },
          query: queryParams
        })
        .then(res => {
          if (res.data.resultCode == 0) {
            utils.messageBox("information",  this.$t('MSG_ALT_NO_DATA'), null, null);
          } else if (res.data.resultCode == 1) {
            utils.messageBox("information", this.$t('MSG_ALT_SAVE_DATA'), null, null);
          }
          this.onSearchClick();
          this.repLogicalNameGrid = "";
          this.descriptionGrid = "";
          this.synonymGrid = "";
        })
        .catch(error => {
          console.log("error Save");
        });
    },         
      /* @description: This function delete the selected row data 
       */
      onDeleteData() {
    //   utils.confirm(
    //  this.$t('MSG_ALT_DEL'),
    //  this.$t('MSG_TXT_YES'), this.$t('MSG_TXT_NO'),
    //   this.onDeletion,
    //  () => {}
    //  );
      utils.messageBox('confirm', this.$t('MSG_ALT_DEL'), null, this.onDeletion);
    },
    onDeletion() {
      const pathParams = {
        'word-id': this.oldSynonymGrid
      };
      http.request("PGE_DST_00008", "DTS_DST_00056", {
          path: pathParams
        })
        .then(res => {
           if (res.data.resultCode == 1) {
            utils.messageBox("information", this.$t('MSG_ALT_PRGS_OK'), null, null);
            this.onSearchClick();
            this.repLogicalNameGrid = "";
            this.descriptionGrid = "";
            this.synonymGrid = "";
            }
        })
        .catch(error => {
          console.log("deletion error");
        });
    },
    /* @description: This function closes the popup button 
     */
    onPopupCancelClicked() {
      this.$emit('exit',true);
    },
    /* @description: This function help us to callback popup data 
     */
    onPagePopupCallback: function(value){
      if(value){
        this.repPhysicalName = value.wordId; 
        this.repLogicalNameGrid= value.wordName;
      }
      this.onPopupCancelClicked();
    },
    /* @descriprtion: This function populate the data to the parent page 
     */
    wordPopulateMethod(value) {
      this.repPhysicalName = value.wordId; 
      this.repLogicalNameGrid= value.wordName;
      this.onPopupCancelClicked();
    }
  }
  
};
</script>

<style scoped>
</style>
