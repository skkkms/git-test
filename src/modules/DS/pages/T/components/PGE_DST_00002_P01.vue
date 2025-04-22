<template>
  <div>
    <div class="comm_popup_wrap_large">
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label :label="$t('MSG_TXT_WRD_NM')" :vertical="false" />
          </div>
          <div class="col-xs-4">
            <div class="comm_label">{{this.wordName}}</div>
          </div>
          <div class="col-xs-2">
            <sui-input-label :label="$t('MSG_TXT_WRD_PHSC_NM')" :vertical="false" />
          </div>
          <div class="col-xs-4">
            <div class="comm_label">{{this.wordPhysicalName}}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label :label="$t('MSG_TXT_WRD_EN_NM')" :vertical="false" />
          </div>
          <div class="col-xs-10">
            <div class="comm_label">{{this.wordNameEn}}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label :label="$t('MSG_TXT_WRD_TYP_NM')" :vertical="false" />
          </div>
          <div class="col-xs-4">
            <div class="comm_label">{{this.wordTypeName}}</div>
          </div>
          <div class="col-xs-2">
            <sui-input-label :label="$t('MSG_TXT_DOM_CTGR_CON')" :vertical="false" />
          </div>
          <div class="col-xs-4">
            <div class="comm_label">{{this.domainClassificationName}}  {{this.domainName}}</div>
          </div>
        </div>
        <div class="row">
          
          <div class="col-xs-2">
            <sui-input-label :label="$t('MSG_TXT_CHIN')" :vertical="false" />
          </div>
          <div class="col-xs-10">
            <div class="comm_label">{{this.chineseCharacterWord}}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label :label="$t('MSG_TXT_WRD_SRC')" :vertical="false" />
          </div>
          <div class="col-xs-10">
            <textarea :disabled="true" v-model="originWord"></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label :label="$t('MSG_TXT_WRD_DSCR')" :vertical="false" />
          </div>
          <div class="col-xs-10">
            <textarea :disabled="true" v-model="wordsContent"></textarea>
          </div>
        </div>
    </div>     
    <div class="mrT10"></div>
    <div class="comm_title_wrap">
      <h4><sui-input-label :label="$t('MSG_TIT_SYNO_LIST')" :vertical="false" /></h4>
    </div>
    <!-- <sui-grid ref="gridListRelatedTerms"
      :dataset="'dataset0'"
      :columns="gridColumns0"
      :enabletooltips="false"
      :columnsresize="true"
      :columnsautoresize="false"
      :autowidth="true"
      :initialPagesize="5"
      :showDisplayCountControl="false"
      width="100%"
      > -->

      <sui-s-grid ref="gridListRelatedTerms"
      :data-source="dataset0"
      :headers="gridColumns0"
      :enabletooltips="false"
      :columnsresize="true"
      :columnsautoresize="false"
      :autowidth="true"
      :showRowsPerPageControl="false"
      width="100%"
      >

    </sui-s-grid>
  </div>
  <div class="comm_btn_wrap mrR30">
     <sui-button type="button" class="comm_btn_border" @click="onPopupCancelClicked">{{$t('MSG_BTN_CLOSE')}}</sui-button>
  </div>
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index';

 export default {
    name: 'PGE_DST_00002_P01',
    props: {
      biddingInformationParam: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    data() {
       return {
         dataset0: new urDataSet(),
        wordName : '',
        wordPhysicalName : '',
        wordNameEn : '',
        domainClassificationId : '',
        applicationUserId: this.$store.getters.userInfo.knoxId,
        chineseCharacterWord: '',
        originWord: '',
        wordsContent: '',
        domainClassificationName: '',
        wordTypeName:'',
        domainName:'',
        // Data already given
        selectData: {
          COD_WRD_TYPE_DIV: { label: '', key: '' }
        },
        selectedGridRowData: {},
        gridColumns0: [
          {
            text: this.$t('MSG_TXT_WRD_NM'),
            value: 'similarityWordName',
          },
          {
            text: this.$t('MSG_TXT_WRD_DSCR'),
            value: 'similarityWordContent',
          }
        ],
      };
    },
   
    computed: {},
    watch: {},
    mounted() {
      this.setData();
    },
    methods: {
      setData(){
        this.wordName = this.biddingInformationParam.wordName;
        this.wordTypeName = this.biddingInformationParam.wordTypeName;
        this.wordPhysicalName = this.biddingInformationParam.wordId;
        this.wordNameEn = this.biddingInformationParam.wordEnglishName;
        this.selectData.COD_WRD_TYPE_DIV.key  = this.biddingInformationParam.wordEnglishName.wordType;
        this.domainClassificationId = this.biddingInformationParam.domainClassificationID;
        this.domainClassificationName = this.biddingInformationParam.domainClassificationName;
        this.domainName = this.biddingInformationParam.domainName;
        this.applicationUserId= this.$store.getters.userInfo.knoxId;
        this.chineseCharacterWord= this.biddingInformationParam.wordChineseCharacters;
        this.originWord= this.biddingInformationParam.wordSource;
        this.wordsContent= this.biddingInformationParam.wordContent;
        this.synonymList(this.biddingInformationParam.wordName);
      },
      // display similar word list 
      synonymList(word) {
        let queryParams = { 'word-name': word};
        http.request('PGE_DST_00002', 'DTS_DST_00089', {
          query: queryParams
          })
          .then(res => {
            this.dataset0.setData(res.data);
            // this.dataset0.data=res.data;
          })
          .catch(error => {
            console.log("error occured during search click");
          });
      },
      onPopupCancelClicked() {
        this.$emit('exit',true);
      },
    },
  };
</script>
<style scoped>
</style>
