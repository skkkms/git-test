<template>
  <ur-form-box toggleable>

    <!-- 약관 구분 -->
    <ur-form-item
      :label="$t('MSG_TXT_TOC_KIND')"
      :label-align="'right'"
      :required = "editMode"
      style="width: 100%; height: auto; border: 0;"
      class="flex_wrap"
    >
    <div v-if="!editMode">{{ inputData.contntKindNm }}</div>
    <ur-dropdown v-else v-model="contntKind" @input="inputContntKind"
      :items="codes.COD_IA_OTHR_CONTENT_KIND"
      style="width:40%" :placeholder="$t('MSG_TXT_SEL')"/>
    </ur-form-item>

    <!-- 언어 구분 -->
    <ur-form-item v-show="showLang"
      :label="$t('MSG_TXT_LANG_DIV')"
      :label-align="'right'"
      :required="true"
      style="width: 100%; height: auto;"
    >
    <div v-if="!editMode">{{ inputData.langTypeCdNm }}</div>
    <ur-radio-wrapper v-else v-model="inputData.langTypeCd" :items="codes.COD_RS_LANG" sm />
    </ur-form-item>

    <!-- 제목 -->
    <ur-form-item
      :label="$t('MSG_TXT_TTL')"
      :label-align="'right'"
      :required = "editMode"
      style="width: 100%; height: auto;"
      class="flex_wrap"
    >
      <div v-if="!editMode">{{ inputData.subject }}</div>
      <ur-text-field v-else v-model="inputData.subject" style="width:100%; height:auto;" maxlength="100"/>
    </ur-form-item>

    <!-- 개정 정보 -->
    <ur-form-item
      :label="$t('MSG_TXT_REVISION_INFO')"
      :label-align="'right'"
      :required = "editMode"
      style="width: 100%; height: auto;"
      class="flex_wrap"
    > 
      <div v-if="!editMode">{{ inputData.contentExtra }}</div>
      <ur-text-field v-else v-model="contentExtra" style="width:100%; height:auto;" maxlength="4000" @input="inputContentExtra"/>
    </ur-form-item>

    <!--약관 내용 -->
    <ur-form-item
      :label="$t('MSG_TXT_TOC_DESC')"
      class="flex_wrap"
      :label-align="'right'"
      style="width: 100%; height: auto;"
      :required = "editMode"
    >
      <sui-web-editor ref="C03Editor" :isViewer="!editMode" />
    </ur-form-item>

  </ur-form-box> 
</template>


<script>
export default {
  name: 'PGE_AAD_00008_C03',
  props: {
    inputType:{
      type: String
    },
    inputData: {
      type: Object,
      required: false,
    }
  },
  components: {
  },
  data() {
    return {
      //공통코드
      codeKeyList: ['COD_RS_LANG'],
      codes: { COD_IA_OTHR_CONTENT_KIND: [], COD_RS_LANG:[] },
      contntKind : "028",
      contentExtra : "",
    }
  },
  computed: {
    editMode() {
      return this.inputType == 'detail' ? false : true;
    },
    showLang(){
      return (this.inputData.contntKind == '029' || this.inputData.contntKind == '030') ? true : false
    },
  },
  watch: {
  },
  created() {
    //공통코드 셋팅
    http.mergeCodeList(this.$options.name, this.codeKeyList, this.codes).then(() => {
    }).catch(() => {});
    this.fnLoadChildCode();
  },
  mounted() {
  },
  methods: {
    //공통코드 셋팅
    fnLoadChildCode(){
      const promise = http.loadChildCode(this.pageId, 'COD_IA_OTHR_CONTENT_KIND', '03')
      promise.then(res => {
        this.codes.COD_IA_OTHR_CONTENT_KIND = res.data
      })
    },

    //값 초기화
    init(){
      this.contntKind = "028"
      this.contentExtra = ""
      this.inputData.contntKind = "028"
      this.inputData.contentExtra = ""
    },

    //수정 진입 시 값 초기화
    detailInit(inputData){
      this.contntKind = inputData.contntKind
      this.contentExtra = inputData.contentExtra
    },

    inputContntKind(val){
      this.inputData.contntKind = val
    },

    inputContentExtra(val){
      this.inputData.contentExtra = val
    },

    isConpValidation(){
      if (utils.isEmpty(this.inputData.contntKind)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_TOC_KIND')); //약관구분은(는) 필수 항목입니다.
        utils.messageBox('warning', msg);
        return false;
      }
      if (utils.isEmpty(this.inputData.subject)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_TTL')); //제목은(는) 필수 항목입니다.
        utils.messageBox('warning', msg);
        return false;
      }
      if (utils.isEmpty(this.inputData.contentExtra)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_REVISION_INFO')); //개정정보은(는) 필수 항목입니다.
        utils.messageBox('warning', msg);
        return false;
      }
      if (this.$refs.C03Editor.getContentSize() === 0) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_TOC_DESC')); //약관내용은(는) 필수 항목입니다.
        utils.messageBox('warning', msg);
        return false;
      }
      if (!this.$refs.C03Editor.checkIframeSrc()) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_IAA_IFRAME_CHK')))
        return false;
      }
      return true;
    }
  }
}

</script>
<style scoped>
</style>
