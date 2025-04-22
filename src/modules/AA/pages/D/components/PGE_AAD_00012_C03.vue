<template>
  <ur-form-box toggleable>
    <!-- 정보 구분 -->
    <ur-form-item
      :label="$t('MSG_TXT_INFO_KIND')" 
      :label-align="'right'"
      :required = "editMode"
      style="width: 100%; height: auto;"
    >
      <div v-if="!editMode">{{ this.getBnftKindCdNm }}</div>
      <ur-radio-wrapper v-else sm v-model="inputData.bnftKindCd" :items="codes.COD_IA_BENEFIT_KIND2" @input="inputBnftKindCd"/>
    </ur-form-item>

    <!-- 패키지 구분 -->
    <ur-form-item
      :label="$t('MSG_TXT_PACKGE_KIND')" 
      :label-align="'right'"
      :required = "editMode"
      style="width: 100%; height: auto;" class="flex_wrap"
    >
      <ur-checkbox-wrapper ref="packgeKindCdList" :disabled="!editMode"  sm v-model="packgeKindCdList" :items="codes.COD_IA_PKG_KIND"/>
    </ur-form-item>

    <!-- 제목 -->
    <ur-form-item
      :label="$t('MSG_TXT_TTL')"
      :label-align="'right'"
      :required = "editMode"
      style="width: 100%; height: auto;"
      class="flex_wrap"
    >
      <div v-if="!editMode">{{ inputData.publctSubject }}</div>
      <ur-text-field v-else v-model="inputData.publctSubject" style="width:100%; height:auto;" maxlength="100"/>
    </ur-form-item>

    <!-- 대상 -->
    <ur-form-item
      :label="$t('MSG_TXT_OBJ')"
      :label-align="'right'"
      style="width: 100%; height: auto;"
      class="flex_wrap"
    >
      <div v-if="!editMode">{{ inputData.targetDescrt }}</div>
      <ur-text-field v-else v-model="inputData.targetDescrt" style="width:100%; height:auto;" maxlength="100"/>
    </ur-form-item>

    <!-- 내용 -->
    <ur-form-item
      :label="$t('MSG_TXT_CNTN')"
      :label-align="'right'"
      :required = "editMode"
      style="width: 100%; height: auto;"
    >
      <sui-web-editor ref="C03Editor" :isViewer="!editMode" />
    </ur-form-item>

    <!-- 썸네일 이미지 -->
    <ur-form-item
      :label="$t('MSG_TXT_THUMBNAIL_IMAG')"
      :required = "editMode"
      :label-align="'right'"
      style="width: 100%; height: auto;"
      class="flex_wrap"
    >
    <cmp-single-file-uploader v-if="inputData.bnftKindCd=='01'" ref="thumbImagUrl" 
    :mode="uploaderMode" :preview-mode="previewMode" upload-target="CNT002" accepts="jpg,png,gif" pixels="624*692" :show-guidance=editMode
    v-model="inputData.thumbImagUrl" :page-id="this.$options.name">
        <template>
          <div class="col_img_wrap" v-if="editMode">
            <div class="col_item_img">
              <ur-text-field v-model="inputData.thumbImagAltDesc" style="width: 100%; height: auto;" :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"  maxlength="100"/>
            </div>
          </div>
        </template>
    </cmp-single-file-uploader>

    <cmp-single-file-uploader v-else-if="inputData.bnftKindCd=='02'" ref="thumbImagUrl1" 
    :mode="uploaderMode" :preview-mode="previewMode" upload-target="CNT002" accepts="jpg,png,gif" pixels="624*306" :show-guidance=editMode
    v-model="inputData.thumbImagUrl" :page-id="this.$options.name">
        <template>
          <div class="col_img_wrap" v-if="editMode">
            <div class="col_item_img">
              <ur-text-field v-model="inputData.thumbImagAltDesc" style="width: 100%; height: auto;" :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"  maxlength="100"/>
            </div>
          </div>
        </template>
    </cmp-single-file-uploader>

    <cmp-single-file-uploader v-else ref="thumbImagUrl2" :mode="'SELECT'" upload-target="CNT002" accepts="jpg,png,gif" v-model="inputData.thumbImagUrl" :page-id="this.$options.name"/>

    </ur-form-item>
  </ur-form-box>
</template>

<script>
import CommonUtils from "@/modules/AA/js/common-utils";

export default {
  name: 'PGE_AAD_00012_C03',
  props: {
    inputType:{
      type: String,
      default : ""
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
      codeKeyList: ['COD_IA_BENEFIT_KIND2','COD_IA_PKG_KIND'],
      codes: {COD_IA_BENEFIT_KIND2:[], COD_IA_PKG_KIND: []},

      packgeKindCdList:[],
      bnftKindCdOld : '',

    }
  },
  computed: {
    editMode() {
      return this.inputType == 'detail' ? false : true;
    },
    uploaderMode() {
      return this.inputType == 'detail' ? "SELECT" : "UPLOAD";
    },
    getBnftKindCdNm(){
      return CommonUtils.getCodeText(this.codes.COD_IA_BENEFIT_KIND2, this.inputData.bnftKindCd)
    },
    previewMode() {
      return this.inputType == 'detail' ? "POPUP" : "BELOW";
    },
  },
  watch: {
  },
  created() {
    //공통코드 셋팅 및 초기화
    http.mergeCodeList(this.$options.name, this.codeKeyList, this.codes).then(() => {
      this.bnftKindCdOld = this.inputData.bnftKindCd
    }).catch(() => {});
  },
  mounted() {
  },
  methods: {
    //정보구분
    inputBnftKindCd(){
      if(utils.isEmpty(this.inputData.thumbImagUrl)) return;
      if(this.inputData.bnftKindCd != this.bnftKindCdOld){
        //{정보구분} 변경 시 {썸네일 이미지}가 초기화 됩니다. 변경하시겠습니까?
        // messagebox(type, message, subMessage, handlerPositive, handlerNegative, customButtons);
        utils.messageBox('confirm'
        , utils.strFormat(this.$t('MSG_ALT_CHK_CHG_INIT'), this.$t('MSG_TXT_INFO_KIND'), this.$t('MSG_TXT_THUMBNAIL_IMAG'))
        , null
        ,() => {
          //확인 시 썸네일 이미지 초기화
          if(!_.isEmpty(this.$refs.thumbImagUrl)) this.$refs.thumbImagUrl.onClickDelete();
          if(!_.isEmpty(this.$refs.thumbImagUrl1)) this.$refs.thumbImagUrl1.onClickDelete();
          if(!_.isEmpty(this.$refs.thumbImagUrl2)) this.$refs.thumbImagUrl2.onClickDelete();
          this.inputData.thumbImagUrl = ''
          this.inputData.thumbImagAltDesc = ''
          this.bnftKindCdOld = this.inputData.bnftKindCd
        }
        ,() => {
          //취소 시 이전 값으로 돌림.
          this.inputData.bnftKindCd = this.bnftKindCdOld
        },null 
        );
      }
    },

    isConpValidation(){

      //정보 구분
      if (utils.isEmpty(this.inputData.bnftKindCd)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_INFO_KIND')); //정보 구분은(는) 필수 항목입니다.
        utils.messageBox('warning', msg);
        return false;
      }

      //패키지 구분
      if (utils.isEmpty(this.packgeKindCdList)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PACKGE_KIND')); //패키지 구분은(는) 필수 항목입니다.
        utils.messageBox('warning', msg);
        return false;
      }

      //제목
      if (utils.isEmpty(this.inputData.publctSubject)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_TTL')); //제목은(는) 필수 항목입니다.
        utils.messageBox('warning', msg);
        return false;
      }

      //내용
      if (this.$refs.C03Editor.getContentSize() === 0) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_CNTN')); //내용은(는) 필수 항목입니다.
        utils.messageBox('warning', msg);
        return false;
      }
      if (!this.$refs.C03Editor.checkIframeSrc()) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_IAA_IFRAME_CHK')))
        return false;
      }

      //썸네일 이미지
      if (utils.isEmpty(this.inputData.thumbImagUrl)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_THUMBNAIL_IMAG')); //썸네일 이미지은(는) 필수 항목입니다.
        utils.messageBox('warning', msg);
        return false;
      }


      return true;
    }
  }
}

</script>
<style scoped>
</style>
