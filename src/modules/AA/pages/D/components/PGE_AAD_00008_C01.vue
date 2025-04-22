<template>
  <ur-form-box toggleable>
    <!-- 콘텐츠 구분 -->
    <ur-form-item
      :label="$t('MSG_TXT_CNT_GB')"
      :label-align="'right'"
      :required = "editMode"
      style="width: 100%; height: auto; border: 0;"
      class="flex_wrap"
    >
    <div v-if="!editMode">{{ inputData.contntKindNm }}</div>
    <ur-dropdown v-else v-model="inputData.contntKind" 
      :items="codes.COD_IA_OTHR_CONTENT_KIND" 
      style="width:40%" :placeholder="$t('MSG_TXT_SEL')"/>
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
      <ur-text-field v-else v-model="inputData.subject" style="width:100%; height:auto;" maxlength="100" />
    </ur-form-item>

    <!-- 내용 -->
    <ur-form-item
      :label="$t('MSG_TXT_CNTN')"
      class="flex_wrap"
      :label-align="'right'"
      style="width: 100%; height: auto;"
      :required = "editMode"
    >
      <sui-web-editor ref="C01Editor" :isViewer="!editMode" />
    </ur-form-item>

    <!-- 썸네일 이미지 -->
    <ur-form-item
      :label="$t('MSG_TXT_THUMBNAIL_IMAG')"
      :label-align="'right'"
      style="width: 100%; height: auto;"
      class="flex_wrap"
      :required = "editMode"
    >
      <cmp-single-file-uploader ref="fileUrl" :mode="uploaderMode" :preview-mode="previewMode" upload-target="CNT003" accepts="jpg,png,gif" pixels="480*320" :show-guidance=editMode
      v-model="inputData.fileUrl" :page-id="this.$options.name" >
        <template>
          <div class="col_img_wrap" v-if="editMode">
            <div class="col_item_img">
              <ur-text-field v-model="inputData.fileAltDesc" style="width: 100%; height: auto;" :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"  maxlength="100"/>
            </div>
          </div>
        </template>
      </cmp-single-file-uploader>
    </ur-form-item>

    <!-- URL 설정 -->
    <ur-form-item
      :label="$t('MSG_TXT_URL_SET')"
      :label-align="'right'"
      style="width: 100%; height: auto;"
      class="flex_wrap"
    >
      {{ prePix }}
      <div v-if="!editMode">{{ inputData.url }}</div>
      <ur-text-field v-else v-model="inputData.url" style="width:70%; height:auto" maxlength="50" />
    </ur-form-item>
    
  </ur-form-box>
</template>

<script>
export default {
  name: 'PGE_AAD_00008_C01',
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
      codes: { COD_IA_OTHR_CONTENT_KIND: []},

      prePix : " https://www.everland.com/editorspick/",
    }
  },
  computed: {
    editMode() {
      return this.inputType == 'detail' ? false : true;
    },
    uploaderMode() {
      return this.inputType == 'detail' ? "SELECT" : "UPLOAD";
    },
    previewMode() {
      return this.inputType == 'detail' ? "POPUP" : "BELOW";
    },
  },
  watch: {
  },
  created() {
    //공통코드 셋팅
    this.fnLoadChildCode();
  },
  mounted() {
  },
  methods: {

    //공통코드 셋팅
    fnLoadChildCode(){
      const promise = http.loadChildCode(this.pageId, 'COD_IA_OTHR_CONTENT_KIND', '01')
      promise.then(res => {
        this.codes.COD_IA_OTHR_CONTENT_KIND = res.data
      })
    },
    
    isConpValidation(){
      if (utils.isEmpty(this.inputData.contntKind)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_CNT_GB')); //콘텐츠 구분은(는) 필수 항목입니다.
        utils.messageBox('warning', msg);
        return false;

      }
      if (utils.isEmpty(this.inputData.subject)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_TTL')); //제목은(는) 필수 항목입니다.
        utils.messageBox('warning', msg);
        return false;
      }
      if (this.$refs.C01Editor.getContentSize() === 0) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_CNTN')); //내용은(는) 필수 항목입니다.
        utils.messageBox('warning', msg);
        return false;
      }
      if (!this.$refs.C01Editor.checkIframeSrc()) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_IAA_IFRAME_CHK')))
        return false;
      }

      if (utils.isEmpty(this.inputData.fileUrl)) {
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
