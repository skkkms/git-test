<template>
  <ur-form-box toggleable>
    <!-- 제목 -->
    <ur-form-item
      :label="$t('MSG_TXT_TTL')"
      label-align="right"
      :required="editMode"
      style="width: 100%; height: auto;"
      class="flex_wrap"
    >
      <div v-if="!editMode">
        {{ inputData.publctSubject }}
      </div>
      <ur-text-field
        v-else
        v-model="inputData.publctSubject"
        style="width:100%; height:auto;"
        maxlength="100"
      />
    </ur-form-item>
    <!-- 내용 -->
    <ur-form-item
      :label="$t('MSG_TXT_CNTN')"
      label-align="right"
      :required="editMode"
      style="width: 100%; height: auto;"
    >
      <sui-web-editor
        ref="C04Editor"
        :is-viewer="!editMode"
      />
    </ur-form-item>
    <!-- 썸네일 이미지 -->
    <ur-form-item
      :label="$t('MSG_TXT_THUMBNAIL_IMAG')"
      :required="editMode"
      label-align="right"
      style="width: 100%; height: auto;"
      class="flex_wrap"
    >
      <cmp-single-file-uploader
        ref="thumbImagUrl"
        v-model="inputData.thumbImagUrl"
        :mode="uploaderMode"
        :preview-mode="previewMode"
        upload-target="CNT002"
        accepts="jpg,png,gif"
        :pixels="pixels"
        :show-guidance="editMode"
        :page-id="this.$options.name"
      >
        <template>
          <div
            v-if="editMode"
            class="col_img_wrap"
          >
            <div class="col_item_img">
              <ur-text-field
                v-model="inputData.thumbImagAltDesc"
                :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"
                style="width: 100%; height: auto;"
                maxlength="100"
              />
            </div>
          </div>
        </template>
      </cmp-single-file-uploader>
    </ur-form-item>
  </ur-form-box>
</template>
<script>
export default {
  name: 'PGE_AAD_00012_C04', // eslint-disable-line vue/name-property-casing
  props: {
    inputType: {
      type: String,
      default: '',
    },
    inputData: {
      type: Object,
      required: false,
    },
  },
  computed: {
    editMode() {
      return this.inputType !== 'detail'
    },
    uploaderMode() {
      return this.inputType === 'detail' ? 'SELECT' : 'UPLOAD'
    },
    previewMode() {
      return this.inputType === 'detail' ? 'POPUP' : 'BELOW'
    },
    pixels() {
      let pixels = null
      if (this.inputData.bnftClassCd === '04') { // 정기권 제휴혜택
        pixels = '144*144'
      }
      if (this.inputData.bnftClassCd === '05') { // 드림투어
        pixels = '624*320'
      }
      return pixels
    },
  },
  watch: {
    'inputData.bnftClassCd': {
      handler(value) {
        console.log(`PGE_AAD_00012_C04: ${value}`)
      },
    },
  },
  methods: {
    isConpValidation() {
      // 제목
      if (utils.isEmpty(this.inputData.publctSubject)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_TTL')) // 제목은(는) 필수 항목입니다.
        utils.messageBox('warning', msg)
        return false
      }

      // 내용
      if (this.$refs.C04Editor.getContentSize() === 0) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_CNTN')) // 내용은(는) 필수 항목입니다.
        utils.messageBox('warning', msg)
        return false
      }
      if (!this.$refs.C04Editor.checkIframeSrc()) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_IAA_IFRAME_CHK')))
        return false
      }

      // 썸네일 이미지
      if (utils.isEmpty(this.inputData.thumbImagUrl)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_THUMBNAIL_IMAG')) // 썸네일 이미지은(는) 필수 항목입니다.
        utils.messageBox('warning', msg)
        return false
      }

      return true
    },
  },
}
</script>
