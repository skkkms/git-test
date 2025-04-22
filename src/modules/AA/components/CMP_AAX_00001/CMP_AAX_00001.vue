<!-- eslint-disable vue/valid-template-root -->
<template>
  <div style="width:100%">
    <div :class="uploadDivClass">
      <div
        v-if="mode === 'UPLOAD'"
        class="col_item_img"
      >
        <ur-text-field
          ref="fileName"
          v-model="fileName"
          readonly
          :disabled="disabled"
          :style="textFieldStyle"
          :rules="fileRules"
          :lazy="lazy"
          @click="onClickFileName"
        />
        <ur-button
          v-if="!fileUrl"
          class="ml16"
          color="violet"
          :disabled="disabled"
          :style="buttonStyle"
          @click="onClickSearchFile"
        >
          {{ $t('MSG_BTN_SCH_FILE') }} <!-- 파일찾기 -->
        </ur-button>
        <ur-button
          v-if="fileUrl"
          class="ml16"
          color="violet"
          :style="buttonStyle"
          :disabled="disabled"
          @click="onClickDelete"
        >
          {{ $t('MSG_BTN_FILE_DEL') }} <!-- 파일삭제 -->
        </ur-button>
        <input
          v-show="false"
          ref="inputFile"
          type="file"
          :accept="accept"
          @change="onChangeFile"
        >
      </div>
      <div v-else>
        <span
          :style="{cursor : popupPreviewEnabled ? 'pointer' : 'default'}"
          @click="onClickFileName"
        >
          {{ fileName }}
        </span>
      </div>
    </div>
    <!-- UPLOAD GUIDANCE -->
    <div
      v-if="showGuidance"
      :class="guidanceDivClass"
    >
      <span class="guid_txt">
        {{ uploadGuidance }}
      </span>
    </div>
    <!-- BELOW PREVIEW -->
    <div
      v-if="belowPreviewEnabled"
      :class="previewDivClass"
    >
      <div
        v-if="contentType"
        class="col_item_img"
      >
        <img
          v-if="contentType.startsWith('image')"
          :src="accessUrl"
          style="width: fit-content; height: 150px;"
          loading="lazy"
        >
        <video
          v-else-if="contentType.startsWith('video')"
          style="width: fit-content; height: 150px;"
          preload="metadata"
          controls
          controlsList="nodownload"
        >
          <source
            :src="accessUrl"
            :type="contentType"
          >
        </video>
      </div>
    </div>
    <!-- slot -->
    <slot />
    <!-- POPUP PREVIEW -->
    <ur-modal
      ref="preview"
      :title="modal.title"
      :width="modal.width"
      :height="modal.height"
      no-foot
    >
      <div
        v-if="contentType"
        ref="previewDiv"
        :style="previewDivStyle"
      >
        <img
          v-if="contentType.startsWith('image')"
          :src="accessUrl"
          :style="previewStyle"
          loading="lazy"
          @load="setModalSizeByImage"
        >
        <video
          v-else-if="contentType.startsWith('video')"
          :style="previewStyle"
          preload="metadata"
          controls
          controlsList="nodownload"
          @loadedmetadata="setModalSizeByVideo"
        >
          <source
            :src="accessUrl"
            :type="contentType"
          >
        </video>
      </div>
    </ur-modal>
  </div>
</template>
<script>
import MimeTypes from 'mime-types'
import FileMixin from '~aa/pages/X/mixins/FileMixin'

export default {
  name: 'CmpSingleFileUploader',
  mixins: [FileMixin],
  props: {
    // Page ID
    pageId: {
      type: String,
      required: true,
      default: null,
    },
    // File URL(v-model)
    value: {
      type: String,
      required: false,
      default: null,
    },
    // Component Mode
    // (1) UPLOAD (default)
    // (2) SELECT
    mode: {
      type: String,
      required: false,
      default: 'UPLOAD',
    },
    // Upload Target
    // Reference 1 : COD_IA_S3_UPLOAD_TARGET
    // Reference 2 : FileUploadPathUtil.java
    uploadTarget: {
      type: String,
      required: false,
      default: null,
    },
    // Extentions that Accepts Upload
    // Example 1) jpg
    // Exampls 2) gif,png
    accepts: {
      type: String,
      required: false,
      default: null,
    },
    // Image Pixel Size for Upload
    // Example 1) 800
    // Example 2) 800*600
    pixels: {
      type: String,
      required: false,
      default: null,
    },
    // Maximum File Size for Upload
    // Example 1) 1000
    // Example 2) 20MB
    maxSize: {
      type: String,
      required: false,
      default: '15MB',
    },
    // Text Field Width
    textFieldWidth: {
      type: String,
      required: false,
      default: '50%',
    },
    // disabled
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    rules: {
      type: Array,
      required: false,
      default: () => [],
    },
    lazy: {
      type: Boolean,
      required: false,
      default: false,
    },
    // Preview Mode
    // (1) POPUP (default)
    // (2) BELOW
    previewMode: {
      type: String,
      required: false,
      default: 'POPUP',
    },
    // Show Guidance
    showGuidance: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      fileUrl: null,
      fileName: null,
      fileExtsName: null,
      fileSize: null,
      signedUrl: null,
      accessUrl: null,
      contentType: null,

      // Preview Modal
      modal: {
        title: this.$t('MSG_BTN_PRVW'), // 미리보기
        width: null,
        height: null,
      },
      div: {
        width: null,
        height: null,
        minWidth: 120,
        minHeight: 84,
        maxWidth: 800,
        maxHeight: 500,
      },
      image: {
        width: null,
        height: null,
      },
    }
  },
  computed: {
    uploadDivClass() {
      let divClass = 'col_img_wrap'
      if (this.showGuidance || this.belowPreviewEnabled) {
        divClass = divClass.concat(' pb4')
      }
      return divClass
    },
    guidanceDivClass() {
      let divClass = 'col_img_wrap'
      if (this.belowPreviewEnabled || !utils.isEmpty(this.$slots)) {
        divClass = divClass.concat(' pb4')
      }
      return divClass
    },
    previewDivClass() {
      return 'col_img_wrap pb4'
    },
    uploadGuidance() {
      let uploadGuidance = null
      let desc1 = null
      if (this.pixels) {
        const width = this.wPixel === 'auto' ? this.$t('MSG_TXT_VARIABLE') : this.wPixel
        const height = this.hPixel === 'auto' ? this.$t('MSG_TXT_VARIABLE') : this.hPixel
        desc1 = utils.strFormat(this.$t('MSG_TXT_UPLOAD_GUIDANCE_1'), width, height) // 이미지 : {0} x {1}
      }

      let sizeAndExts = utils.strFormat(this.$t('MSG_TXT_UNDER_A'), this.maxSize) // {0} 미만
      if (this.accepts) {
        sizeAndExts += ` ${this.accepts.split(',').join(', ')}`
      }

      let desc2 = null
      desc2 = utils.strFormat(this.$t('MSG_TXT_UPLOAD_GUIDANCE_2'), sizeAndExts) // 파일 규격 : {0}

      uploadGuidance = `* ${desc1 ? (`${desc1} / ${desc2}`) : desc2}`

      return uploadGuidance
    },
    textFieldStyle() {
      return { width: this.$_textFieldWidth }
    },
    buttonStyle() {
      const buttonStyle = {}
      buttonStyle['margin-left'] = '10px'
      return buttonStyle
    },
    accept() {
      return this.$_accept
    },
    fileRules() {
      return this.$_fileRules
    },
    wPixel() {
      return this.$_wPixel
    },
    hPixel() {
      return this.$_hPixel
    },
    $_textFieldWidth() {
      if (!this.textFieldWidth) return null
      if (/^[0-9\.]*$/.test(this.textFieldWidth)) { // eslint-disable-line no-useless-escape
        return `${parseFloat(this.textFieldWidth)}px`
      }
      return this.textFieldWidth
    },
    $_maxSize() {
      let size = null
      let square = null
      if (!this.maxSize) return null
      if (Number.isNaN(Number(this.maxSize))) {
        const units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        const regexp = new RegExp(utils.strFormat('^.*.({0})$', units.join('|')))
        if (regexp.test(this.maxSize)) {
          square = units.indexOf(this.maxSize.slice(-2).toUpperCase()) + 1
          size = this.maxSize.slice(0, -2)
        } else {
          return null
        }
      } else {
        size = this.maxSize
      }
      return (size * (1024 ** square).toFixed(2))
    },
    $_accept() {
      if (!this.accepts) return null
      let accept = null
      const items = this.accepts.split(',')
      items.forEach(item => {
        if (item) {
          const exts = `${accept ? ',' : ''}.${item.toLowerCase()}`
          accept = (accept || '').concat(exts)
        }
      })
      return accept
    },
    $_fileRules() {
      // Concatenate internal rules and props rules
      const intRules = []
      return (this.rules || []).concat(intRules)
    },
    $_wPixel() {
      if (!this.pixels) return null
      return this.pixels.toLowerCase().split('*')[0]
    },
    $_hPixel() {
      if (!this.pixels) return null
      return this.pixels.toLowerCase().split('*')[1] || 'auto'
    },
    previewDivStyle() {
      const previewDivStyle = {}
      previewDivStyle['text-align'] = 'center'
      previewDivStyle.overflow = 'auto'
      previewDivStyle.width = `${this.div.width}px`
      previewDivStyle.height = `${this.div.height}px`
      previewDivStyle.maxWidth = `${this.div.maxWidth}px`
      previewDivStyle.maxHeight = `${this.div.maxHeight}px`
      previewDivStyle.maxWidth = `${this.div.maxWidth}px`
      previewDivStyle.maxHeight = `${this.div.maxHeight}px`
      return previewDivStyle
    },
    previewStyle() {
      const previewStyle = {}
      previewStyle['inline-block'] = true
      return previewStyle
    },
    popupPreviewEnabled() {
      return this.previewMode === 'POPUP'
             && this.accessUrl
    },
    belowPreviewEnabled() {
      return this.previewMode === 'BELOW'
             && this.accessUrl
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.fileUrl = _.isEmpty(value) ? null : value
        if (this.fileUrl) {
          this.select()
        } else {
          this.setFileInfo(null)
        }
      },
    },
    fileUrl: {
      handler(value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    onClickSearchFile() {
      this.$refs.inputFile.value = null
      this.$refs.inputFile.click()
    },
    onClickFileName() {
      if (this.accessUrl && this.previewMode === 'POPUP') {
        this.$refs.preview.open()
      }
    },
    async onChangeFile(event) {
      if (!this.uploadTarget) {
        // 첨부파일 컴포넌트에 업로드 대상(uploadTarget)을 지정해야 합니다.
        // 대상 범위는 S3업로드대상(COD_IA_S3_UPLOAD_TARGET)을 참고하십시오.
        utils.messageBox('error', this.$t('MSG_ALT_S3_UPLOAD_TARGET_IS_NULL'))
        return
      }

      const { files } = event.target
      if (!_.isEmpty(files)) {
        const file = files[0]
        // Pixel Check는 Promise return이 필요하여 isValidFile과 분리
        if (this.isValidFile(file) && await this.isValidPixel(file)) {
          this.upload(file)
        }
      }
    },
    onClickDelete() {
      this.setFileInfo(null)
    },
    upload(file) {
      if (!this.uploadTarget) {
        // 첨부파일 컴포넌트에 업로드 대상(uploadTarget)을 지정해야 합니다.
        // 대상 범위는 S3업로드대상(COD_IA_S3_UPLOAD_TARGET)을 참고하십시오.
        utils.messageBox('error', this.$t('MSG_ALT_S3_UPLOAD_TARGET_IS_NULL'))
      }

      const formData = new FormData()
      formData.append('uploadTarget', this.uploadTarget)
      formData.append('file', file)

      http.request(this.pageId, 'DTS_AAX_00001', {
        data: formData,
      }).then(res => {
        this.setFileInfo(res.data)
      })
    },
    select() {
      const formData = new FormData()
      formData.append('fileUrl', this.fileUrl)

      http.request(this.pageId, 'DTS_AAX_00003', {
        data: formData,
      }).then(res => {
        this.setFileInfo(res.data)
      })
    },
    setFileInfo(data) {
      let fileInfo = data
      if (!fileInfo) fileInfo = {}
      this.fileUrl = fileInfo.fileUrl || null
      this.fileName = fileInfo.fileName || null
      this.fileExtsName = fileInfo.fileExtsName || null
      this.fileSize = fileInfo.fileSize || null
      this.signedUrl = fileInfo.signedUrl || null
      this.contentType = MimeTypes.contentType(fileInfo.fileExtsName) || null

      // SignedUrl
      this.accessUrl = this.signedUrl ? this.signedUrl : this.fileUrl
    },
    async isValidPixel(file) {
      if (!this.pixels) return true

      let pSize = null
      // Image
      if (this.isImageFile(file)) {
        pSize = await this.getImageWidthAndHeight(file)
      }
      // Video
      if (this.isVideoFile(file)) {
        pSize = await this.getVideoWidthAndHeight(file)
      }

      if ((this.wPixel !== 'auto' && this.wPixel !== String(pSize.width))
       || (this.hPixel !== 'auto' && this.hPixel !== String(pSize.height))) {
        if (this.wPixel === 'auto') {
          // 세로 {0}px의 파일을 추가하시기 바랍니다.
          utils.messageBox('warning',
            utils.strFormat(this.$t('MSG_ALT_FILE_HEIGHT_IS_INVALID'),
              utils.numberFormat(this.hPixel)))
          return false
        }

        if (this.hPixel === 'auto') {
          // 가로 {0}px의 파일을 추가하시기 바랍니다.
          utils.messageBox('warning',
            utils.strFormat(this.$t('MSG_ALT_FILE_WIDTH_IS_INVALID'),
              utils.numberFormat(this.wPixel)))
          return false
        }

        // 가로 {0}px, 세로 {1}px의 파일을 추가하시기 바랍니다.
        utils.messageBox('warning',
          utils.strFormat(this.$t('MSG_ALT_FILE_PIXEL_IS_INVALID'),
            utils.numberFormat(this.wPixel),
            utils.numberFormat(this.hPixel)))
        return false
      }

      // Other
      return true
    },
    isValidFile(file) {
      const fileName = file.name
      const exts = fileName.slice(fileName.lastIndexOf('.') + 1)
      if (!this.isValidExts(exts)) { // 확장자 확인
        // 허용 가능한 확장자("{0}")의 파일을 추가하시기 바랍니다.
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_ADD_NCELL_EXTS_FILE'), this.accepts.toLowerCase()))
        return false
      }

      const fileSize = file.size
      if (!this.isValidSize(fileSize)) { // 용량초과 확인
        // 허용 가능한 용량("{0}") 미만의 파일을 추가하시기 바랍니다.
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_TXT_ALT_ALLOWED_MAX_FILE_SIZE'), this.maxSize))
        return false
      }

      return true
    },
    isValidExts(exts) {
      if (!this.accepts) return true
      if (!exts) return false

      return !_.isEmpty(this.accepts.split(',').filter(item => item.toLowerCase() === exts.toLowerCase()))
    },
    isValidSize(size) {
      let result = true

      if (!this.$_maxSize) return true
      if (size > this.$_maxSize) {
        result = false
      }

      return result
    },
    getFileUrl() {
      return this.fileUrl
    },
    getFileName() {
      return this.fileName
    },
    getFileExtsName() {
      return this.fileExtsName
    },
    getFileSize() {
      return this.fileSize
    },
    getContentType() {
      return this.contentType
    },
    validate() {
      this.$refs.fileName.validate()
    },
    setModalSizeByImage(event) {
      const { width, height } = event.target
      this.setModalSize(width, height)
    },
    setModalSizeByVideo(event) {
      const width = event.target.videoWidth
      const height = event.target.videoHeight
      this.setModalSize(width, height)
    },
    setModalSize(width = 0, height = 0) {
      this.div.width = Math.min(Math.max(width, this.div.minWidth), this.div.maxWidth)
      // 스크롤 발생하여 height만 4px plus
      this.div.height = Math.min(Math.max(height + 4, this.div.minHeight), this.div.maxHeight)
      this.modal.width = this.div.width + 64
      this.modal.height = this.div.height + 116
    },
  },
}
</script>
