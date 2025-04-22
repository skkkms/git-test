<template>
<div>
  <div 
    class="comm_popup_wrap_medium"
    style="overflow:hidden;"
  >
    <div class="mrB10"/>
    <div class="comm_scr_wrap">
    <div class="row">
        <div class="col-xs-2">
            <sui-input-label :label="$t('MSG_TXT_WRD_NM')" :vertical="false" />
        </div>
        <div class="col-xs-5">
            <sui-text-field maxlength="100" placeholder="" v-model="wordName" name="wordName" @keyup.enter="searchWord"/>
        </div>

        <div class="btn_wrap">
          <sui-button type="button" class="comm_btn_Reset" @click= "onReset()" v-permission:read="'PGE_DST_00007'">{{$t('MSG_BTN_RESET')}}</sui-button>
          <sui-button type="button" class="comm_btn_Scr" @click= "searchWord()" v-permission:read="'PGE_DST_00007'" >{{$t('MSG_BTN_SEARCH')}}</sui-button>
        </div>
    </div>
  </div>
    <div class="mr15"></div>
    <sui-s-grid
      ref="mainGrid"
      :headers="defaultGridData0.columns"
      :data-source="defaultGridData0.dataset0"
      :initialRowsPerPage="10"
      :showRowsPerPageControl="false"
      width="100%"
      @grid:selected="onClickWordRow"
    />
  </div>
    <div class="comm_btn_wrap mrR30">
       <sui-button type="button" class="comm_btn_border" @click="onCancel">{{$t('MSG_BTN_CANCEL')}}</sui-button>
       <sui-button type="button" class="comm_btn_solid" @click="onClickSelectWord" v-permission:read="'PGE_DST_00007'">{{$t('MSG_BTN_SELT')}}</sui-button>
     </div>
</div>
</template>
<script>
import { urDataSet } from 'uidev-component/index';

export default {
  name: 'PGE_DST_00007_P01',
  data() {
    return {
      wordName: '',
      wordId: '',
      selectedWord: '',
      localdata1: [],
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
        columns: [{
          text: this.$t('MSG_TXT_WRD_NM'),
          value: 'wordName',
        }, {
          text: this.$t('MSG_TXT_WRD_EN_NM'),
          value: 'wordEnglishName',
        }, {
          text: this.$t('MSG_TXT_WRD_DSCR'),
          value: 'wordContent',
        }],
        dataset0: new urDataSet(),
      },
    };
  },
    methods: {
        searchWord() {

          if (utils.isExistSpecialChar(this.wordName) === true) {
            utils.messageBox(
              "warning",
              this.$t('MSG_ALT_CHK_SPECL_CHAR'),
              null
            );
            return;
          }
          let queryParams;
          if(this.wordName){
              queryParams = { "word" : this.wordName };
          }
          http.request('PGE_DST_00007', 'DTS_DST_00051', {
              query:queryParams
          }).then(res => {
              console.log(res.data);
              this.localdata1 = res.data;
              this.defaultGridData0.dataSource.localdata = [];
              this.defaultGridData0.dataset0.setData(this.localdata1);
          });
        },
        onReset() {
          this.wordName = '';
        },
        onClickWordRow(selectedRow) {
          this.selectedWord = selectedRow;
          //this.selectedWordId = e.args.row.wordId;
          //this.$emit('wordPopulate',e.args.row.wordName);
        },
        onClickSelectWord() {
            this.$emit('wordPopulate',this.selectedWord);
        //this.domainClassName = '10 years';
      },
      onCancel() {
        this.$emit('exit',true);
      }
    }
  };
</script>
<style scoped>
</style>
