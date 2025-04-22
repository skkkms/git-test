<template>
  <sui-page>
   <sui-page-header :title="wordHeaderName" :pageId="this.$options.name"></sui-page-header>
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_WRD_NM')"  :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field maxlength="100" placeholder="" v-model="wordName" name="wordName" @keyup.enter="searchWord"></sui-text-field>
          </div>
          <div class="btn_wrap">
          <sui-button type="button" class="comm_btn_Reset " @click= "onReset()">{{$t('MSG_BTN_RESET')}}</sui-button>
          <sui-button type="button" class="comm_btn_Scr" @click= "searchWord(wordName)" v-permission:read="this.$options.name" >{{$t('MSG_BTN_SEARCH')}}</sui-button>
        </div>
        </div>
        
      </div>
      <div class="mrT30"></div>
      <sui-s-grid ref="mainGrid"
      :headers="defaultGridData0.columns" :data-source="dataset0"
      :initialRowsPerPage="10"
      :showRowsPerPageControl="false"
      width="100%"
      @grid:row-click="onClickWordRow"
      />
     <div class="comm_btn_wrap">
      <sui-button type="button" class="comm_btn_border"  @click="onCancel">{{$t('MSG_BTN_CANCEL')}}</sui-button>
      <sui-button type="button" class="comm_btn_solid" @click="onClickSelectWord">{{$t('MSG_BTN_SELT')}}</sui-button>
    </div>
  </sui-page-contents>

</sui-page>
</template>
<script>
  import { urDataSet } from 'uidev-component/index.js';
 export default {
    name: 'PGE_DST_00017',
    props: {
      closePagePopup: {
        type: Function,
      },
      pageInitialData: {
        type: Object,
      },
    },
    data() {
       return {
      nameTitle:'',
      wordName:'',
      selectedWord:'',
      choiceData : '',
      wordId : '',
      wordHeaderName:'Word Retrieval',
      localdata1:[],
      dataset0: new urDataSet(),
       };
    },
    computed: {},
    watch: {}, 
    created() {
      this.localdata = [];
      this.defaultGridData0= {
        dataSource: {
          localdata: [],
          emptyArray:[],
          datatype: 'json',
          editable: true,
          selectionmode: 'singlecell',
          editmode: 'click',
        },
        altrows: true,
        showcolumnlines: false,
        showcolumnheaderlines: false,
        columns: [{
          text: this.$t('MSG_TXT_WRD_NM'),
          value: 'wordName'
        }, {
          text: this.$t('MSG_TXT_WRD_EN_NM'),
          value: 'wordEnglishName'
        }, {
          text: this.$t('MSG_TXT_WRD_CNTN'),
          value: 'wordContent'
        }],
      }
    },
    mounted() {
      console.log(this.$options.title)
    },
    methods: {
        searchWord() {
          if (utils.isExistSpecialChar(this.wordName) === true) {
            utils.messageBox(
              "warning",
              this.$t('MSG_ALT_PRHB_SPC_CHAR'),
              null
            );
            return;
          }
          let queryParams;
          let pageID = this.pageInitialData.content;
          this.nameTitle= this.pageInitialData.popTitle;
          if(this.wordName){
              queryParams = { "word" : this.wordName };
          }
          http.request(pageID, 'DTS_DST_00051', {
              query:queryParams
          }).then(res => {
              this.dataset0.setData(res.data);
          });
        },
        onReset() {
          this.wordName = '';
          this.wordId = '';
          let emptyArray=[];
           this.dataset0.setData(emptyArray)

        },
        onClickWordRow(row) {
          this.selectedWord = row.wordName;
          this.wordId = row.wordId;
          this.choiceData = row;
        },
         onClickSelectWord() {
           console.log(this.onPopupCancelClick);
           if(!this.selectedWord){
               utils.messageBox("information", this.$t('MSG_ALT_NO_DATA'), null, null);
           } else{
              this.closePagePopup(this.choiceData)
          }
       },
      onCancel(){
        console.log(this.onPopupCancelClick);
        this.onPopupCancelClick();
      },
      onPopupCancelClick() {
        this.closePagePopup();
      },
    },

  };
</script>
<style scoped>
</style>
