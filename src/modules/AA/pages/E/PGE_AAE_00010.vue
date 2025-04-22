<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>
          {{ $t("MSG_TXT_APP_VER_INFO") }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_OSKIND')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          required
        >
        <ur-radio-wrapper :items="codes.COD_IA_OS_KIND" v-model="osKindCd"/>
        </ur-form-item>

        <ur-form-item
          :label="$t('MSG_TXT_VER')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
          required
        >
          <ur-text-field
            ref="ver" class="mb4"
            v-model="ver" 
            maxlength="11"
            :rules="$rules.getRules('not_empty', 'only_numeric_dot')" fixed-message
            style="width: 100%;" 
          />
        </ur-form-item>

        <ur-form-item
          :label="$t('MSG_TXT_FRCD_YN')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          required
        >
        <ur-radio-wrapper :items="useYn" v-model="coercReflYn"/>
        </ur-form-item>

        <ur-form-item
          :label="$t('MSG_TXT_NOTE')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            ref="memoDescrt"
            v-model="memoDescrt"
            maxlength="100"
            :rules="$rules.getRules('max_len(100)')" fixed-message
            style="width: 100%;"
          />
        </ur-form-item>

        <ur-form-item
          :label="$t('MSG_TXT_RGST_USR')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
        {{ userId }}
        </ur-form-item>

        <ur-form-item
          :label="$t('MSG_TXT_RGST_DTM')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{ toDate }}
        </ur-form-item>

        <ur-form-item
          :label="$t('MSG_TXT_MDFC_USR')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{ userId }}
        </ur-form-item>
        
        <ur-form-item
          :label="$t('MSG_TXT_MDFC_DTM')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{ toDate }}
        </ur-form-item>
      </ur-form-box>

      <div style="float:left;">
        <div class="comm_btn_wrap">
          <!-- [하단: 버튼] 목록 -->
          <ur-button
            v-permission:read="this.$options.name"
              type="button"
              class="comm_btn_solid"
              @click="onClickList"
            >
              {{ $t("MSG_BTN_LIST") }}
          </ur-button>
        </div>
      </div>

      <div class="comm_btn_wrap mrL30 mrR30">
        <!-- [하단: 버튼] 저장 -->
        <ur-button
          v-permission:update="this.$options.name"
          type="button"
          class="comm_btn_solid"
          @click="onClickSave"
        >
          {{ $t("MSG_BTN_SAVE") }}
        </ur-button>
      </div>

    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAE_00010',
  components: {
  },
  data() {
    return {
      //공통코드
      codeKeyList: ['COD_IA_OS_KIND'],
      codes:  { COD_IA_OS_KIND: []},

      useYn:[{ value: 'Y', text: 'Y' }, { value: 'N', text: 'N' }],

      //입력데이터
      userId : "",
      osKindCd : "",
      ver : "",
      coercReflYn : "Y", 
      memoDescrt : "",
    }
  },
  computed: {
    toDate() {
      return moment( new Date(),'YYYYMMDDHHmmss',).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    this.userId = this.$store.getters.userInfo.userId;

    //공통코드 셋팅
    http.mergeCodeList(this.$options.name, this.codeKeyList, this.codes);
  },
  mounted() {
  },
  methods: {
    //앱버전 관리 목록으로 이동
    onClickList(){
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAE_00009', { params })
    },

    //저장
    onClickSave(){
      //유효성 체크
      if(!this.isValidation()){ return;}

      const queryParams = {
        osKindCd: this.osKindCd,
        ver : this.ver,
        coercReflYn: this.coercReflYn,
        memoDescrt: this.memoDescrt
      };

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        http.request(this.$options.name, 'DTS_AAI_00002', {
          data: queryParams,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
          this.onClickList(); //목록으로 이동..
        });
      });
    },

    //유효성 체크
    isValidation(){
      
      //OS구분
      if (_.isEmpty(this.osKindCd)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_OSKIND')); //OS 구분은(는) 필수 항목입니다.
        utils.messageBox('warning', msg);
        return false;
      }

      //버전
      if (_.isEmpty(this.ver)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_VER')); //버전은(는) 필수 항목입니다.
        utils.messageBox('warning', msg);
        return false;
      }

      const split_ver = this.ver.split(".");
      const first_char = this.ver.charAt(0);
      const last_char = this.ver.charAt(this.ver.length-1);
      
      if(first_char == "0"){
        const msg = utils.strFormat(this.$t('MSG_ALT_DO_NOT_FIRST_0'), this.$t('MSG_TXT_VER')); //{버전}의 첫번째 자리는 0 이 올 수 없습니다.
        utils.messageBox('warning', msg);
        return false;
      }

      if(first_char == "." || last_char == "." ){
        const msg = utils.strFormat(this.$t('MSG_ALT_DO_NOT_FIRST_N_LAST_DOT'), this.$t('MSG_TXT_VER')); //{버전}의 첫번째 자리와 마지막 자리는 .이 올 수 없습니다.
        utils.messageBox('warning', msg);
        return false;
      }

      if(split_ver.length != 3){
        const msg = utils.strFormat(this.$t('MSG_ALT_APP_VER_FORMAT'), this.$t('MSG_TXT_VER')); //{버전}의 형식은 [숫자.숫자.숫자]입니다.
        utils.messageBox('warning', msg);
        return false;
      }

      let showM = false;
      for(var i = 0; i < split_ver.length; i++){  
        if(split_ver[i].length > 3){
          showM = true;
        }
      }
      if(showM){
        const msg = utils.strFormat(this.$t('MSG_ALT_MAX_NEMBER'), this.$t('MSG_TXT_VER'),3); //{버전}의 숫자는 최대 {3}자리만 가능합니다.
        utils.messageBox('warning', msg);
        return false;
      }

      //비고
      if (!this.$rules.validate(this.$refs.memoDescrt)) {
        return false;
      }

      return true;
    },
    
  },
}
</script>
<style scoped>
</style>
