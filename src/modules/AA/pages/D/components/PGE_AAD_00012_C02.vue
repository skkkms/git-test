<template>
  <ur-form-box toggleable>
    <!-- 카드 구분 -->
    <ur-form-item
      :label="$t('MSG_TXT_CARD_KIND')" 
      :label-align="'right'"
      :required = "editMode"
      style="width: 100%; height: auto;"
      class="flex_wrap"
    >
      <div v-if="!editMode">{{ this.getBnftKindCdNm }}</div>
      <ur-dropdown v-else v-model="inputData.bnftKindCd" :items="codes.COD_RS_CARD_KIND" :placeholder="$t('MSG_TXT_SEL')" :rules="$rules.getRules('not_empty')" fixed-message/>
    </ur-form-item>

    <!-- 제목(카드명) -->
    <ur-form-item
      :label="$t('MSG_TXT_SUBJT_CARD')"
      :label-align="'right'"
      :required = "editMode"
      style="width: 100%; height: auto;"
      class="flex_wrap"
    >
      <div v-if="!editMode">{{ inputData.publctSubject }}</div>
      <ur-text-field v-else v-model="inputData.publctSubject" style="width:100%; height:auto;" maxlength="100"/>
    </ur-form-item>

    <!-- 내용 -->
    <ur-form-item
      :label="$t('MSG_TXT_CNTN')"
      :label-align="'right'"
      :required = "editMode"
      style="width: 100%; height: auto;"
    >
      <sui-web-editor ref="C02Editor" :isViewer="!editMode" />
    </ur-form-item>

    <!-- 카드 이미지 -->
    <ur-form-item
      :label="$t('MSG_TXT_CARD_IMG')"
      :required = "editMode"
      :label-align="'right'"
      style="width: 100%; height: auto;"
      class="flex_wrap"
    >
    <cmp-single-file-uploader ref="thumbImagUrl" :mode="uploaderMode" :preview-mode="previewMode" upload-target="CNT002" accepts="jpg,png,gif" pixels="144*94" :show-guidance=editMode v-model="inputData.thumbImagUrl" :page-id="this.$options.name" >
      <template>
        <div class="col_img_wrap" v-if="editMode">
          <div class="col_item_img">
            <ur-text-field v-model="inputData.thumbImagAltDesc" style="width: 100%; height: auto;" :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"  maxlength="100"/>
          </div>
        </div>
      </template>
    </cmp-single-file-uploader>
    </ur-form-item>
  </ur-form-box>
</template>

<script>
import CommonUtils from "@/modules/AA/js/common-utils";

export default {
  name: 'PGE_AAD_00012_C02',
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
      codeKeyList: ['COD_RS_CARD_KIND'],
      codes: { COD_RS_CARD_KIND:[]},
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
      return CommonUtils.getCodeText(this.codes.COD_RS_CARD_KIND, this.inputData.bnftKindCd)
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
    }).catch(() => {});
  },
  mounted() {
  },
  methods: {
    isConpValidation(){

      //카드 구분
      if (utils.isEmpty(this.inputData.bnftKindCd)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_CARD_KIND')); //카드 구분은(는) 필수 항목입니다.
        utils.messageBox('warning', msg);
        return false;
      }

      //제목(카드명)
      if (utils.isEmpty(this.inputData.publctSubject)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_SUBJT_CARD')); //제목(카드명)은(는) 필수 항목입니다.
        utils.messageBox('warning', msg);
        return false;
      }

      //내용
      if (this.$refs.C02Editor.getContentSize() === 0) { 
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_CNTN')); //내용은(는) 필수 항목입니다.
        utils.messageBox('warning', msg);
        return false;
      }
      if (!this.$refs.C02Editor.checkIframeSrc()) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_IAA_IFRAME_CHK')))
        return false;
      }

      //카드 이미지
      if (utils.isEmpty(this.inputData.thumbImagUrl)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_CARD_IMG')); //카드 이미지은(는) 필수 항목입니다.
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
