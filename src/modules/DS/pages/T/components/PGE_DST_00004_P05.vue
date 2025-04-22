<template>
  <div>
    <div style="overflow: hidden;" class="comm_popup_wrap_large">
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_TRM_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field placeholder="" v-model= "frame0.termName" 
            @keyup="onKeyUpInput($event,'termName')"
              @keyup.enter="sourceTermList"
              default value :disabled="false" :clearable="true" :readonly="false"></sui-text-field>
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_TRM_PHSC_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field placeholder="" v-model= "frame0.termPhyName"
            @keyup="onKeyUpInput($event,'termPhyName')"
              @keyup.enter="sourceTermList"
               default value :disabled="false" :clearable="true" :readonly="false"></sui-text-field>
          </div>
       </div>
        <div class="btn_wrap">
          <sui-button type="button" class="comm_btn_Reset" @click="onReset()" v-permission:read="'PGE_DST_00004'">{{$t('MSG_BTN_RESET')}}</sui-button>
          <sui-button type="button" class="comm_btn_Scr" @click="sourceTermList()" v-permission:read="'PGE_DST_00004'" >{{$t('MSG_BTN_SEARCH')}}</sui-button>
        </div>
      </div>
      <div class="mrB30"></div>
      <sui-s-grid
        ref="grid"
        :headers="gridColumns0"
        :data-source="dataset0"
        :options="options"
        :initialRowsPerPage="10"
        :showRowsPerPageControl="false"
        @grid:selected="onClickWordRow()"
      />
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button type="button" class="comm_btn_border"  @click="onCancel()">{{$t('MSG_BTN_CANCEL')}}</sui-button>
      <sui-button type="button" class="comm_btn_solid" @click="selectSourceTerm()" v-permission:read="'PGE_DST_00004'">{{$t('MSG_BTN_SELT')}}</sui-button>
    </div>
  </div>
</template>


<script>
import { urDataSet } from 'uidev-component/index';

export default {
  name: 'PGE_DST_00004_P05',
  data() {
    return {
      selectedCodeValue: {
        COD_MDLE: {
          label: '',
          key: ''
        }
      },
      dataset0: new urDataSet(),
      options:{
        infinityScroll: true,
        noBaseInfo: false,
        height: 600,
        multiSelect: false,
      },
      frame0 :{
      termName:'',
      termPhyName:'',
      },
      selectedSourceTerm:'',
      localdata0: [],
      
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    this.gridColumns0 = [{
        text: this.$t('MSG_TXT_TRM_NM'),
        value: 'termsName'
      }, {
        text: this.$t('MSG_TXT_TRM_PHSC_NM'),
        value: 'termsId',
        width: 200,
      }, {
        text: this.$t('MSG_TXT_TRM_DSCR'),
        value: 'termsContent'
      }, {
        text: this.$t('MSG_TXT_DOMAIN_NAME'),
        value: 'domainName',
        width: 180,
      }];
  },
  methods: {
    sourceTermList() {
      const queryParams = {
      termName: this.termName || '',
      termId: this.termPhyName || '',
    };
    http.request('PGE_DST_00004', 'DTS_DST_00033', {
      query: queryParams,
    }).then(res => {
      console.log(res)
        this.dataset0.setData(res.data);
    });
    },
    onCancel() {
      this.$emit('exit', true);
    },
    onReset() {
      this.frame0.termName = '';
      this.frame0.termPhyName = '';
    },
      onKeyUpInput(event, name) {
    const searchFieldNewText = this.frame0[name];
    if (utils.isExistSpecialChar(searchFieldNewText)) {
      utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
        this.frame0[name] = this[name];
        //this.$refs[name].setFocus();
      });
    } else {
      this[name] = searchFieldNewText;
    }
  },
    onClickWordRow() {
      // console.log(this.dataset0);
      const selectedData = this.dataset0.getSelected();
      console.log(selectedData[0]);

        this.selectedSourceTerm = {
          'termName' : selectedData[0].termsName,
          'termId' : selectedData[0].termsId,
          'termsContent': selectedData[0].termsContent,
          'domainDesc' : selectedData[0].domainDecription,
          'domainName' : selectedData[0].domainName,
          'domainLength': selectedData[0].domainLength,
          'domainDataDecimalLength' : selectedData[0].domainDataDecimalLength,
          'domainDataTypeName' : selectedData[0].domainDataTypeName,
        }

        console.log("selectedSources >> ", this.selectedSourceTerm);
    },
    selectSourceTerm() {
      this.$emit('sourceTermPopulate',this.selectedSourceTerm);
      this.onCancel();
    },
  },
};
</script>
<style scoped>
</style>
