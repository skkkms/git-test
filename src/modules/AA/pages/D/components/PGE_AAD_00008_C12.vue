<template>
  <ur-form-box toggleable>
    <ur-form-item :label="$t('MSG_TXT_CNT_GB')" :label-align="'right'" :required="editMode"
      style="width: 100%; height: auto; border: 0;" class="flex_wrap">
      <div v-if="!editMode">{{ inputData.contntKindNm }}</div>
      <ur-dropdown v-else v-model="inputData.contntKind" :items="codes.COD_IA_OTHR_CONTENT_KIND" style="width:40%"
        :placeholder="$t('MSG_TXT_SEL')" />
    </ur-form-item>

    <!-- 제목 -->
    <ur-form-item :label="$t('MSG_TXT_TTL')" :label-align="'right'" :required="editMode"
      style="width: 100%; height: auto;" class="flex_wrap">
      <div v-if="!editMode">{{ inputData.subject }}</div>
      <ur-text-field v-else v-model="inputData.subject" style="width:100%; height:auto;" maxlength="100" />
    </ur-form-item>

    <!-- 가사 내용 -->
    <ur-form-item :label="$t('MSG_TXT_MUSIC_CNTN')" class="flex_wrap" :label-align="'right'"
      style="width: 100%; height: auto;" :required="editMode">
      <textarea rows="8" v-model="inputData.contentDesc" :readonly="!editMode" maxlength="4000" />
    </ur-form-item>

    <!-- 음악 -->
    <ur-form-item :label="$t('MSG_TXT_MUSIC')" :label-align="'right'" style="width: 100%; height: auto;" class="flex_wrap"
      :required="editMode">
      <cmp-single-file-uploader ref="fileUrl" :mode="uploaderMode" upload-target="CNT003" accepts="mp3,wav"
        max-size="100MB" v-model="inputData.fileUrl" :page-id="this.$options.name">
        <template>
          <div class="col_img_wrap" v-if="editMode">
            <!-- * 파일 규격 : 100MB 미만 mp3, wav -->
            <span class="guid_txt">
              {{ $t('MSG_TXT_FILE_LIMIT_100MB') }}
            </span>
          </div>
        </template>
      </cmp-single-file-uploader>
    </ur-form-item>
  </ur-form-box>
</template>


<script>
export default {
  name: 'PGE_AAD_00008_C12',
  props: {
    inputType: {
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
      codes: { COD_IA_OTHR_CONTENT_KIND: [] },
    }
  },
  computed: {
    editMode() {
      return this.inputType == 'detail' ? false : true;
    },
    uploaderMode() {
      return this.inputType == 'detail' ? "SELECT" : "UPLOAD";
    },
  },
  watch: {
  },
  created() {
    this.fnLoadCode();
  },
  mounted() {
  },
  methods: {
    fnLoadCode() {
      let promise = http.loadChildCode(this.pageId, 'COD_IA_OTHR_CONTENT_KIND', '12')

      promise.then(res => {
        this.codes.COD_IA_OTHR_CONTENT_KIND = res.data
      })
    },
    isConpValidation() {
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
      if (utils.isEmpty(this.inputData.contentDesc)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_MUSIC_CNTN')); //가사내용은(는) 필수 항목입니다.
        utils.messageBox('warning', msg);
        return false;
      }
      if (utils.isEmpty(this.inputData.fileUrl)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_MUSIC')); //음악은(는) 필수 항목입니다.
        utils.messageBox('warning', msg);
        return false;
      }
      return true;
    }
  }
}

</script>
<style scoped></style>
