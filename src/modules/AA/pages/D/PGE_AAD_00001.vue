<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />

    <sui-page-contents v-show="!isModify">
      <!-- ::상세조회 시 보여지는 UI -->
      <div class="comm_title_wrap mt45">
        <h4>
          {{ $t("MSG_TXT_COND_INFO") }}
        </h4>
      </div>

      <ur-data-grid
        ref="grid"
        :headers="selectColumns"
        :data-source="selectList"
        :options="selectOpt"
        :data-set-options="{id: 'selectId'}"
      />

      <div class="comm_btn_wrap mt10">
        <div class="right_box">
          <!-- 닫기 -->
          <ur-button 
          @click="onClickClose()">
            {{ $t("MSG_BTN_CLOSE") }}
          </ur-button>
        </div>
      </div>
    </sui-page-contents>


    <sui-page-contents v-show="isModify">
      <!-- :: 수정 및 신규등록 시 보여지는 UI -->
      <div class="comm_title_wrap mt45">
        <h4>
          {{ $t("MSG_TXT_COND_INFO") }}
        </h4>
        <div class="title_compo pl16">
          <!-- 추가 -->
          <ur-button color="violet"
          @click="onClickRowAdd">
            {{ $t("MSG_BTN_ADD") }}
          </ur-button>
          <!-- 삭제 -->
          <ur-button color="violet"
          @click="onClickRowDelete">
            {{ $t("MSG_BTN_DEL") }} 
          </ur-button>
          <!-- 초기화 -->
          <ur-button color="violet"
          @click="onClickReset">
            {{ $t("MSG_BTN_INTL") }}
          </ur-button>
        </div>
      </div>

      <ur-data-grid
        ref="grid"
        :headers="columns"
        :data-source="inputList"
        :options="opt"
        :data-set-options="{id: 'id'}"
      />

      <sui-page-footer>
        <div class="comm_btn_wrap mt10">
          <div class="right_box">
            <!-- 닫기 -->
            <ur-button 
            @click="onClickClose()">
              {{ $t("MSG_BTN_CLOSE") }}
            </ur-button>

            <!-- 저장 -->
            <ur-button color="violet"
            @click="onClickSave()">
              {{ $t("MSG_BTN_SAVE") }}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>

<script>

import CommonUtils from "@/modules/AA/js/common-utils";

export default {
  name: 'PGE_AAD_00001',
  props: {
    pageInitialData: {
      type: Object,
      default: null,
    },
    closePagePopup: {
      type: Function,
      default() {
        return null;
      },
    },
  },
  components: {
  },
  data() {
    return {
        //공통코드
        codeKeyList: ['COD_IA_COND_KIND', 'COD_IA_COND','COD_IA_COND_WEATHER','COD_IA_COND_FACILITY','COD_IA_COND_COUPON'],
        codes: { COD_IA_COND_KIND:[],  COD_IA_COND:[], COD_IA_COND_WEATHER:[], COD_IA_COND_FACILITY:[], COD_IA_COND_COUPON:[] },
        
        useYn:[{ value: 'Y', text: 'Y' }, { value: 'N', text: 'N' }],
        oriData : {},

        //수정 및 등록 그리드 셋팅
        columns:[],
        inputList: new this.$ur.grid.DataSet(),
        addRow: {
            condKindCd : "01",
            condCd : "",
            condNm : "",
            condValue : ""
        },

        //상세조회 시 그리드 셋팅
        selectList: new this.$ur.grid.DataSet(),
        selectOpt: {
          noInfo      : false,
        },
        selectColumns: [
          //분류
          { text: this.$t('MSG_TXT_CLSF'), value: 'condKindNm'},
          //항목
          { text: this.$t('MSG_TXT_ITEM'), value: 'condNm'},
          //선택값
          { text: this.$t('MSG_TXT_SELT_VALUE'), value: 'condValueNm'},
        ]
    }
  },
  computed: {
    isModify(){
      var rtn =  true;
      if(this.pageInitialData.inputType == 'S'){
        rtn =  false  
      }
      return rtn;
    },
    opt(){
      return {
        multiSelect : true,
        selectCheck : true,
        selectCheckOnly: true,
        noInfo      : true,
      }
    }
  },
  watch: {
  },
  created() {
    let that = this

    //공통코드 셋팅 및 초기화
    http.mergeCodeList(this.$options.name, this.codeKeyList, this.codes).then(() => {

        this.columns = [
            {text:this.$t('MSG_TXT_NUMBER_ROW'), value:'__idx', width: 50, type:'number',
              component: {
                props: ['row','value','text', 'me'],
                template: '<div>{{ rowNum }}</div>',
                computed: {
                  rowNum(){
                    return this.value + 1;
                  },
                },
              }
            },
            //분류
            {
            text: this.$t('MSG_TXT_CLSF'),
            value: 'condKindCd',
            required: true,
            component: {
                props: ['row','value','text', 'me'],
                template: '<div><ur-radio-wrapper :items="COD_IA_COND_KIND" v-model="row.condKindCd" @input="isSelect"/></div>',
                computed: {
                    COD_IA_COND_KIND(){
                        return that.codes.COD_IA_COND_KIND
                    }
                },
                methods:{
                  isSelect(v){
                    that.inputList.setRowValue(this.row, 'condKindCd', v)
                    that.inputList.setRowValue(this.row, 'condCd', "")
                    that.inputList.setRowValue(this.row, 'condNm', "")
                    this.$nextTick();
                  }
                }
              },
            },
            //항목
            {
            text: this.$t('MSG_TXT_ITEM'),
            value: 'condCd',
            required: true,
            component: {
              props: ['row','value','text', 'me'],
              data() {
                return {
                }
              },
              template: `<div v-if="this.row.condKindCd=='01'?true:false"> 
                            <ur-text-field  style="width: 90%;" v-model = "row.condNm" readonly/> 
                            <ur-icon-button class="ml16" icon="search" icon-type="line" color="primary" @click="iconClick" /> 
                        </div>
                        <div v-else><ur-dropdown ref="condCdDropdown"  v-model="row.condCd" :items="COD_IA_COND" no-select="no-select" :msg-no-select="$t('MSG_TXT_SEL')" @input="isSelect"/></div>
                        `,
              computed: {
                COD_IA_COND(){
                    return that.codes.COD_IA_COND
                },
                condKindNm(){
                  return this.row.condNm
                }
              },
              methods:{
                //필터검색
                iconClick(){
                  utils.openLayerPopup('PGE_AAD_00002', this.onFilterSearchCallback, {
                    pageInitialData: {
                      inputType : 'U',
                  },
                    size: 'lg',
                  });
                },
                //필터 검색 값 셋팅
                onFilterSearchCallback(nodeData){
                  if(nodeData == null|| nodeData == "Close"){
                  }
                  else{
                    that.inputList.setRowValue(this.row, 'condCd', nodeData.filterId)
                    that.inputList.setRowValue(this.row, 'condNm', nodeData.filterName)
                    that.inputList.setRowValue(this.row, 'condValue', "")
                    //this.condKindNm = nodeData.filterName
                    this.$nextTick();
                  }
                },
                isSelect(v){
                  that.inputList.setRowValue(this.row, 'condCd', v)
                  //선택값 초기화
                  that.inputList.setRowValue(this.row, 'condValue', "")
                  this.$nextTick();
                }
              }
            },
            },
            //선택값
            {
            text: this.$t('MSG_TXT_SELT_VALUE'),
            value: 'condValue',
            required: true,
            component: {
              props: ['row','value','text', 'me'],
              data() {
                return {
                  checkValue: []
                }
              },
              mounted() {
                if(this.row.condValue!=""){
                  this.checkValue = this.row.condValue
                }
              },
              template: `
                        <div v-if="this.row.condKindCd=='01'">-</div>
                        <div v-else>
                          <div      v-if="this.row.condCd=='01'" ><ur-dropdown v-model="row.condValue" style="width: 255px;" :items="COD_IA_COND_WEATHER" @input="onClick(row.condValue)"/></div>
                          <div v-else-if="this.row.condCd=='02' && parkKindCd" ><ur-radio-wrapper v-model="row.condValue" :items="COD_IA_COND_FACILITY" sm @input="onClick(row.condValue)"/></div>
                          <div v-else-if="this.row.condCd=='02' && !parkKindCd" >-</div>
                          <div v-else-if="this.row.condCd=='07'" ><ur-radio-wrapper v-model="row.condValue" :items="COD_IA_COND_COUPON" sm @input="onClick(row.condValue)"/></div>
                          <div v-else><ur-radio-wrapper v-model="row.condValue" :items="useYn" sm @input="onClick(row.condValue)" /></div>
                        </div>
                        `,
              computed: {
                //날씨(01)
                COD_IA_COND_WEATHER(){
                    return that.codes.COD_IA_COND_WEATHER
                },
                //시설운영시간(02)
                COD_IA_COND_FACILITY(){
                    return that.codes.COD_IA_COND_FACILITY
                },
                //쿠폰사용(07)
                COD_IA_COND_COUPON(){
                    return that.codes.COD_IA_COND_COUPON
                },
                //여부(그외)
                useYn(){
                    return that.useYn
                },
                //파크구분
                parkKindCd(){
                  return that.pageInitialData.parkKindCd == "01" ? true : false;
                }
              },
              methods:{
                onClick(v){
                  that.inputList.setRowValue(this.row, 'condValue', v)
                  this.$nextTick();
                }
              }
            },
            },
        ]
    }).catch(() => {});

  },
  mounted() {
    //등록일 경우 
    if(this.pageInitialData.inputType == "I"){
      //넘어 온 값 셋팅 하기
      if(this.pageInitialData.initData != null && this.pageInitialData.initData.length > 0){
        this.oriData = utils.cloneDeep(this.pageInitialData.initData)
        this.$refs.grid.setData(this.oriData);
      }else{
         this.$refs.grid.setData();
         this.onClickRowAdd();
      }
    }
    //상세조회일 경우
    else if(this.pageInitialData.inputType == "S"){
      this.selectOccrCond();
    }
    //수정일 경우
    else{
      if( this.pageInitialData.selectCondCdList.length > 0){
        this.oriData = utils.cloneDeep(this.pageInitialData.selectCondCdList)
        this.$refs.grid.setData(this.oriData);
      }
    }
    
  },
  methods: {

   /***************************************
     * 초기화
     * : 메인 페이지로 부터 받은 데이터 상태로 돌아가는 기능임
     ****************************************/
    onClickReset(){
      if(this.pageInitialData.inputType == "I"){
        this.oriData = utils.cloneDeep(this.pageInitialData.initData)
        this.$refs.grid.setData(this.oriData);
      }
      else{
        if( this.pageInitialData.selectCondCdList.length > 0){
          this.oriData = utils.cloneDeep(this.pageInitialData.selectCondCdList)
          this.$refs.grid.setData(this.oriData);
        }
        else{
          this.inputList = new this.$ur.grid.DataSet();
        }
      }
      this.$nextTick();
      this.resetSelect(); //셀렉트 초기화
    },

    //그리드 
    resetSelect(){
      var temp = this.$refs.grid.getDataSet()
      this.inputList.selected = [];
      temp.data.forEach(row => {
        row.__selected = false
      })
    },

    /***************************************
     * 상세조회
     ****************************************/
    selectOccrCond(){
      //상세조회 해오기
      const queryParams = {
                              publctId: this.pageInitialData.publctId
                          };
      http.request(this.$options.name, 'DTS_AAD_00006', {
        query: queryParams,
      }).then(res => {
        this.selectList.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },

    //row 추가
    onClickRowAdd(){
      //10개이상 row 추가 안됨.
      if(this.inputList.data.length >= 10){
        const msg = utils.strFormat(this.$t('MSG_ALT_MAX10_LENGTH')); //최대 10개까지 가능합니다
        utils.messageBox('warning', msg);
        return false;
      }
      const newRow = this.addRow;
      this.inputList.addRow(newRow);
    },

    //row 삭제
    onClickRowDelete(){
      let delRows = this.$refs.grid.getSelected();
      for(var i = 0;  i < delRows.length; i++){
        this.$refs.grid.removeRow(delRows[i].__id, false);
      }
    },

    /***************************************
     * 저장
     ****************************************/
    onClickSave(){
      //유효성 체크
      if(!this.isValidation()){ return;}
      //ur이 text 값을 가지고 있지 않아 억지로 셋팅

      if(this.inputList.data.length > 0 && this.inputList.data[0].condKindCd != "01"){
        this.inputList.data[0].condNm = CommonUtils.getCodeText(this.codes.COD_IA_COND, this.inputList.data[0].condCd)
      }
      this.closePagePopup(this.inputList);
    },

    //유효성 체크
    isValidation(){
      var rtn = true;

      for(var i = 0; i < this.inputList.dataSize ; i++){
        this.inputList.data[i].__selected = false; //셀렉트 초기화

        //같은 항목은 중복될 수 없음.
        for(var j = 0;  j < this.inputList.dataSize; j++){
          if (i!=j && this.inputList.data[i].condCd == this.inputList.data[j].condCd) {
            const msg = utils.strFormat(this.$t('MSG_ALT_ITEM_REDND')); //항목은 중복 설정할 수 없습니다.
            utils.messageBox('warning', msg);
            return false;
          }
        }

        //분류
        if (!utils.trim(this.inputList.data[i].condKindCd)) {
          const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_CLSF')); //{0}은(는) 필수 항목입니다.
          utils.messageBox('warning', msg);
          return false;
        }
        //항목
        if (!utils.trim(this.inputList.data[i].condCd)) {
          const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_ITEM')); //{0}은(는) 필수 항목입니다.
          utils.messageBox('warning', msg);
          return false;
        }
        //선택값
        if ( this.inputList.data[i].condKindCd!='01' && utils.isEmpty(this.inputList.data[i].condValue)) {
          //케비+시설운영시간의 경우 선택값이 없음.
          if(this.pageInitialData.parkKindCd == "CB" ||  this.inputList.data[i].condCd=='02'){
            this.inputList.data[i].condValue = ""
          }else{
            const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_SELT_VALUE')); //{0}은(는) 필수 항목입니다.
            utils.messageBox('warning', msg);
            return false;
          }
          
        }
      }
      return rtn;
    },

    //닫기
    onClickClose(){
      //닫을 때 inputList 에 값이 있으면 condValue 값 변경(checkBox 형태의 값이 없어서 사용안함.)
      // this.chgTxtCode();
      this.closePagePopup('Close');
    },

    //checkBox값을 text(,) 형태로 변환(checkBox 형태의 값이 없어서 사용안함.)
    chgTxtCode(){
      for(var i = 0; i < this.inputList.data.length ; i++){
        if(Array.isArray(this.inputList.data[i].condValue)){
          this.inputList.data[i].condValue = this.inputList.data[i].condValue.join(",");
        }
      }
    },

    //checkBox에 맞게 배열 형태로 code 변환(checkBox 가 없어서 사용 X)
    chgCode(list){
      let tmpRow = [];
      list.forEach(row => {
        tmpRow = [];
        //닫히면서 text로 변환이 안된경우 화면에 뜨면서 에러남.
        if(row.condCd == "04" && !Array.isArray(row.condValue)){
          tmpRow = row.condValue.split(",");
          row.condValue = tmpRow;
        }
      })
      return list
    },
    
  },
}
</script>
<style scoped>
</style>
