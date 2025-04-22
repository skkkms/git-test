<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- ::S 노출 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          {{$t('MSG_TXT_EXPOSR_INFO')}}
        </h4>
        <span class="subscript_txt">
          {{$t('MSG_TXT_EXPOSR_INFO2')}}
        </span>
      </div>
      <ur-form-box toggleable>
         <!-- 게시 정보 -->
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_KIND')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-checkbox-wrapper v-model="inputData.parkKindCd" :items="codes.COD_RS_PARK_KIND" sm/>
        </ur-form-item>

        <!-- 방문 상태 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_VST_STTS')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-checkbox-wrapper v-model="inputData.visitStatusCd" :items="codes.COD_IA_VISIT_STATUS" sm/>
        </ur-form-item>

        <!-- 노출 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-radio-wrapper sm :items="codes.COD_RS_USE" v-model="inputData.exposrYn"/>
        </ur-form-item>

        <!-- 노출 기간 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_PERIOD')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-date-time-range-picker
            ref = "exposrPeriod"
            v-model="inputData.exposrPeriod"
            @input="exposrPeriodInput"
            :rules="exposrPeriodRule"
            :confirm-label="$t('MSG_TXT_SELT')"
            :clear-label="$t('MSG_BTN_INTL')"
            fixed-message
          />
        </ur-form-item>

        <!-- 노출 조건 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_COND')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            v-model="inputData.occrCondNm"
            style="width: 90%;"
            disabled
          />
          <ur-icon-button
            icon="search"
            icon-type="line"
            color="primary"
            @click="openCondInfoSettng"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- ::E 노출 정보 -->

      <!-- ::S UX Writing 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          {{$t('MSG_TXT_UX_INFO')}}
        </h4>
      </div>
      <ur-form-box toggleable>
        
        <!-- 언어 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_LANG_DIV')"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-checkbox-wrapper v-model="inputData.langKindCd" :items="codes.COD_RS_LANG" sm/>
        </ur-form-item>

        <!-- 노출 문구(300자)-->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_TXT')"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            ref="exposrDescrt"
            v-model="inputData.exposrDescrt"
            style="width: 100%; height: auto;"
            maxlength="300"
            :rules="$rules.getRules('not_null')" fixed-message
          />
        </ur-form-item>
        <!-- 노출 문구-->

        

        <!-- 연결 URL-->
        <ur-form-item
          :label="$t('MSG_TXT_CONN_URL')" 
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            v-model="inputData.connUrl"
            style="width: 45%; height: auto;"
            maxlength="300"
          />
        </ur-form-item>
        <!-- 연결 URL-->
      </ur-form-box>
      <!-- ::E UX Writing 정보 -->

      <div class="bt1 mt45">
        <sui-page-footer class="comm_btn_wrap">
          <div class="btn_wrap">

            <!-- 목록 -->
            <div class="left_box">
              <ur-button v-permission:read="this.$options.name" @click="onClickList">
                {{ $t("MSG_BTN_LIST") }}
              </ur-button>
            </div>
            
            <!-- 저장 -->
            <div class="right_box">
              <ur-button v-permission:update="this.$options.name"
                color="violet" @click="onClickSave"
              >
                {{ $t("MSG_BTN_SAVE") }}
              </ur-button>
            </div>
          </div>
        </sui-page-footer>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAB_00038',
  components: {
  },
  data() {
    return {
      //공통코드
      codeKeyList: ['COD_RS_PARK_KIND','COD_IA_VISIT_STATUS', 'COD_RS_LANG','COD_RS_USE'],
      codes: { COD_RS_PARK_KIND: [], COD_IA_VISIT_STATUS: [], COD_RS_LANG: [], COD_RS_USE: []},

      //입력데이터
      inputData:{
        parkKindCd: [],
        visitStatusCd: [],
        langKindCd: ['KO'],
        exposrYn: '',
        exposrDescrt : '',
        exposrDescrt2 : '',
        exposrDescrt3 : '',
        exposrPeriod  : [`${utils.now('YYYY-MM-DD')} 00:00`, ''],
        exposrPeriodStartDtm: '',
        exposrPeriodEndDtm: '',
        connUrl: '',
        occrCondNm:'',
        insertCondCdList: [],
      },

      exposrPeriodRule:[
        (v) =>  {
          return !!v && Array.isArray(v) && v.length === 2 && !!v[0] && !!v[1] || this.$t('MSG_ALT_RULES_NOT_NULL');
        },
      ]

    }
  },
  computed: {
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    //공통코드 셋팅 및 초기화
    http.mergeCodeList(this.$options.name, this.codeKeyList, this.codes).then(() => {
      this.codes.COD_RS_PARK_KIND.splice(-1,1)
    }).catch(() => {});
  },
  mounted() {
  },
  methods: {
    //날짜 입력 시 값 셋팅
    exposrPeriodInput(val){
      if (val.at(1) && val.at(1).slice(-5) === '00:00') {
        this.inputData.exposrPeriod = [val.at(0), val.at(1).substring(0, 11).concat('23:59')]
        return
      }
      this.inputData.exposrPeriodStartDtm = utils.dateformatToServer(val[0] + '00');
      this.inputData.exposrPeriodEndDtm = utils.dateformatToServer(val[1] + '59');
    },
    /***************************************
     * 저장
     ****************************************/
    onClickSave(){
      //유효성 체크
      if(!this.isValidation()){ return;}

      const confirm = () => {
        //저장 하시겠습니까?
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
          //파람데이터 만들기
          let inputParam =  {
            parkKindCd    : this.inputData.parkKindCd.toString(),
            visitStatusCd : this.inputData.visitStatusCd.toString(),
            langKindCd    : this.inputData.langKindCd.toString(),
            exposrYn      : this.inputData.exposrYn,
            exposrOrder   : 0,
            exposrDescrt  : this.inputData.exposrDescrt,
            exposrDescrt2 : this.inputData.exposrDescrt2,
            exposrDescrt3 : this.inputData.exposrDescrt3,
            exposrPeriodStartDtm  : this.inputData.exposrPeriodStartDtm,
            exposrPeriodEndDtm    : this.inputData.exposrPeriodEndDtm,
            connUrl               : this.inputData.connUrl,
            insertCondCdList      : this.inputData.insertCondCdList,
          }
      
          http.request(this.$options.name, 'DTS_AAD_00003', {
            data: inputParam,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
            this.onClickList(); //목록으로 이동..
          })
        })
      }

      if (this.inputData.connUrl.startsWith('http://')) {
        // HTTP로 등록시 보안상 이슈가 발생할 수 있으니, 확인 후 등록 바랍니다.
        utils.messageBox('warning', this.$t('MSG_TXT_IAA_HTTP_WARNING'), null, () => {
          confirm()
        })
      } else {
        confirm()
      }
    },

    //유효성 체크
    isValidation(){
      var reVal = true;

      //게시구분
      if (!utils.trim(this.inputData.parkKindCd)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PUBLCT_KIND')); //{0}은(는) 필수 항목입니다.
        utils.messageBox('warning', msg);
        return false;
      }

      //방문상태
      if (!utils.trim(this.inputData.visitStatusCd)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_VST_STTS'));
        utils.messageBox('warning', msg);
        return false;
      }

      //노출여부
      if (!utils.trim(this.inputData.exposrYn)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EXPOSR_YN'));
        utils.messageBox('warning', msg);
        return false;
      }
      
      //노출기간
      if (!this.$refs["exposrPeriod"].isValid()) {
        return false;
      }
      if (moment(this.inputData.exposrPeriod[0]).isBefore(utils.now())) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT'))) //과거일자는 선택할 수 없습니다.
        return false;
      }

      //언어구분
      if (!utils.trim(this.inputData.langKindCd)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_LANG_DIV'));
        utils.messageBox('warning', msg);
        return false;
      }

      //노출문구
      if (!this.$rules.validate(this.$refs.exposrDescrt)) {
        return
      }
      if (!utils.trim(this.inputData.exposrDescrt)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EXPOSR_TXT'));
        utils.messageBox('warning', msg);
        return false;
      }

      return reVal;
    },

    /***************************************
     * 조건정보설정 팝업 띄우기
     ****************************************/
    openCondInfoSettng() {
      //게시구분에 따라 조건정보설정 팝업 ui가 달라지기 때문
      if(utils.isEmpty (this.inputData.parkKindCd)){
        const msg = utils.strFormat(this.$t('MSG_ALT_SELT'), this.$t('MSG_TXT_PUBLCT_KIND')); //게시구분을 선택하세요.
        utils.messageBox('warning', msg);
        return false;
      }

      utils.openLayerPopup('PGE_AAD_00001', this.onCondInfoSettngCallback, {
        pageInitialData: { 
          inputType : 'I',
          parkKindCd : this.inputData.parkKindCd,
          initData : utils.cloneDeep(this.inputData.insertCondCdList),
        },
        size: 'lg',
      });
    },
    onCondInfoSettngCallback(nodeData) {
      //창닫음(X버튼 or 닫기 클릭시)
      if(nodeData == null|| nodeData == "Close"){
      }
      //저장 버튼을 통해 들어오는 경우
      else{
        this.inputData.insertCondCdList = nodeData.data;
  
        //단건입력
        if(nodeData.data.length==1){
          this.inputData.occrCondNm = nodeData.data[0].condNm
        }
        //다건입력
        else if(nodeData.data.length > 1){
          this.inputData.occrCondNm =  nodeData.data[0].condNm + " 외 " + (nodeData.data.length-1) + "건"
        }
        //아무것도 입력 안하고 저장
        else{
          this.inputData.occrCondNm = ""
        }
      }
    },

    //UX Writing 목록으로 이동
    onClickList(){
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAB_00029', { params })
    },
  },
}
</script>
<style scoped>
</style>
