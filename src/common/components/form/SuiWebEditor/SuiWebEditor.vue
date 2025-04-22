<template>
  <div style="width:100%">
    <textarea
      :id="editorId"
    />
  </div>
</template>
<script>
import suneditor from 'suneditor/src/suneditor'
import plugins from 'suneditor/src/plugins'
// import image from 'suneditor/src/plugins/dialog/link';
// import list from 'suneditor/src/plugins/submenu/list';
// import font from 'suneditor/src/plugins/submenu/font';
// import video from 'suneditor/src/plugins/dialog/video';
import lang from 'suneditor/src/lang'
// import {ko} from './SunEditor/lang';
// import de from './SunEditor/lang/de';

// editor.setOptions 는 load 이벤트를 발생시킴
// props 에 정의된 기본 값으로 mounted hook 에서 editor.create 를 하고
// 이후 watch 에서 editor.setOptions 를 실행

export default {
  name: 'SuiWebEditor',
  components: {
    suneditor,
  },
  props: {
    /*
    // TODO:
    // cafeEditor probs
    viewer: {
      type: Boolean,
      default: false,
    },
    // cafeEditor probs
    defaultFontSize: {
      type: [String, Number],
      default: '10',
    },
    // cafeEditor probs
    defaultLineHeight: {
      type: String,
      default: '1.2',
    },
    */
    // 웹에디터 height
    height: {
      type: [String, Number],
      default: '100%',
    },
    // 웹에디터 초기화 이벤트 핸들러
    // @created 이벤트
    initializedCallback: {
      type: Function,
      default() {
        return null
      },
    },
    // 초기화값
    initialValue: {
      type: String,
      default: '',
    },
    // viewer 설정: true(읽기만 가능), false(default - 편집도 가능)
    isViewer: {
      type: Boolean,
      required: false,
      default: false,
    },
    // 웹에디터 표시언어
    language: {
      type: String,
      default: 'en',
    },
    // 입력가능한 최대 글자수
    maxCharCount: {
      type: [Number, String],
      required: false,
      default() {
        return isNaN(utils.getConfigurationValue('CFG_CMU_EDITOR_CONT_LIMIT_SIZE') * 1) ? 0 : utils.getConfigurationValue('CFG_CMU_EDITOR_CONT_LIMIT_SIZE') * 1
      },
    },
    // cafeEditor probs
    /*
    resizable: {
      type: Boolean,
      default: false,
    },
    */
  },
  data() {
    return {
      editor: null,
      editorId: _.uniqueId('editor'),
    }
  },
  computed: {
    linkProtocol() {
      let linkProtocolUrl = ''

      switch (process.env.VUE_APP_WAS_ENV) {
      case 'local':
      case 'dev':
        linkProtocolUrl = 'https://dev-mobile.everland.com/'
        break
      case 'qa':
        linkProtocolUrl = 'https://qa-www.everland.com/'
        break
      default:
        linkProtocolUrl = 'https://www.everland.com/'
        break
      }
      return linkProtocolUrl
    },
    imageUrlPath() {
      // let linkProtocolUrl = ''
      //
      // switch (process.env.VUE_APP_WAS_ENV) {
      // case 'local':
      // case 'dev':
      //   break
      // case 'qa':
      //   linkProtocolUrl = 'https://qa-www.everland.com/'
      //   break
      // default:
      //   linkProtocolUrl = 'https://www.everland.com/'
      //   break
      // }
      // return linkProtocolUrl
      const linkProtocolUrl = '/api/v1/iaa/common/files/upload-editor'
      return linkProtocolUrl
    },
  },
  watch: {
    height() {
      this.setHeight(this.height)
    },
    isViewer(val) {
      if (this.editor) {
        if (typeof val === 'boolean' && val === true) {
          this.setReadonly()
        } else {
          this.setEditable()
        }
      }
    },
    language() {
      this.setLanguage(this.language)
    },
    // 입력가능 글자수
    maxCharCount(val) {
      this.setMaxCharCount(val)
    },
  },
  mounted() {
    const re = /^\/(.+)\//
    let publicPath = ''
    if (re.test(window.location.pathname)) {
      publicPath = re.exec(window.location.pathname)[1]
    }

    this.editor = suneditor.create(this.editorId, {
      iframe: false,
      fullPage: false,
      iframeCSSFileName: [`${window.location.protocol}//${window.location.host}${publicPath === '' ? '' : `/${publicPath}`}/webeditor/suneditor-contents.css`, `${window.location.protocol}//${window.location.host}${publicPath === '' ? '' : `/${publicPath}`}/webeditor/suneditor.css`],
      addTagsWhitelist: 'html|head|header|body|style|button|map|area|//',
      pasteTagsWhitelist: 'html|head|header|body|style|button|map|area|//',
      attributesWhitelist: {
        all: 'style',
        button: 'value',
        img: '*',
        map: '*',
        area: '*',
      },
      allowedClassNames: '.*',
      plugins,
      // font: [
      //   'Noto Sans KR',
      //   'Arial', 'Comic Sans MS', 'Courier New', 'Impact',
      //   'Georgia','tahoma', 'Trebuchet MS', 'Verdana',
      // ],
      font: [
        'Pretendard', '굴림', '궁서', '돋움', '맑은 고딕', '바탕',
      ],
      /*
      plugins: [font, video, image, list],
      */
      buttonList: [
        ['undo', 'redo'],
        ['font', 'fontSize'],
        // ['formatBlock'],
        // ['paragraphStyle'],
        // ['bold', 'underline', 'italic', 'strike', 'fontColor', 'hiliteColor', 'textStyle'],
        ['bold', 'underline', 'strike', 'fontColor', 'hiliteColor', 'textStyle'],
        // ['subscript', 'superscript'],
        // ['removeFormat'],
        // '/', // Line break
        ['outdent', 'indent'],
        // ['align', 'horizontalRule', 'list', 'lineHeight'],
        ['align', 'lineHeight'],
        ['table', 'link', 'image', 'video'],
        // ['table', 'image'],
        ['fullScreen', 'showBlocks', 'codeView'],
        ['preview'],
        // ['print'],
        // ['save', 'template'],
      ],
      charCounter: true,
      height: this.height,
      lang: lang[this.language],
      maxCharCount: this.maxCharCount,
      showPathLabel: false,
      width: '100%',
      // defaultStyle: 'font-family:굴림;font-size:14px;format:p;'
      defaultStyle: 'font-family:Pretendard;font-weight:400;font-size:16px;letter-spacing: -0.02em;word-wrap: break-word;word-break: keep-all;line-height: 1.15;',
      linkProtocol: this.linkProtocol,
      imageUploadHeader: {
        'X-PortalId': this.$store.getters.userInfo ? this.$store.getters.userInfo.portalId : '',
        'X-TenantId': this.$store.getters.userInfo ? this.$store.getters.userInfo.tenantId : '',
        'X-PageId': this.$route.name,
        'X-DataServiceId': 'DTS_AAX_00016',
        Authorization: `Bearer ${localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : ''}`,
      },
      imageUploadUrl: this.imageUrlPath,
    })

    if (this.editor !== null && this.editor) {
      // this.frameDocument = this.editor.util.getIframeDocument(this.editor.getContext().element.wysiwygFrame)

      if (this.initializedCallback) {
        this.initializedCallback()
      }
      if (this.initialValue) {
        this.setContent(this.initialValue)
      }
      if (this.isViewer) {
        this.setReadonly()
      } else {
        this.setEditable()
      }
      this.$emit('created')

      // register onload event handler
      this.editor.onload = (core, reload) => {
        this.onLoaded(core, reload)
      }

      const { editor } = this
      editor.core._setCharCount = function () { // eslint-disable-line func-names
        if (editor.getContext().element.charCounter) {
          const charSize = editor.core.functions.getCharCount('char')
          let imageSize = 0
          editor.core.functions.getImagesInfo().forEach(img => {
            imageSize += Number(img.size)
          })
          editor.core._w.setTimeout(() => { editor.getContext().element.charCounter.textContent = charSize + imageSize })
        }
      }
    }
  },
  destroyed() {
    if (this.editor) {
      this.editor.destroy()
    }
  },
  methods: {
    /**
     * @description 웹에디터의 현재 내용을 html 형식으로 반환- getHtml과 동일
     * @function getContent
     * @param {None}
     * @returns {String}
     */
    getContent() {
      let contents = ''
      if (this.editor) {
        this.editor.save()
        contents = this.editor.getContents()
      }
      return contents
    },
    /**
     * @description 웹에디터의 현재 내용을 html 형식으로 반환 - getContent 와 동일
     * @function getHtml
     * @param {None}
     * @returns {String}
     */
    getHtml() {
      return this.getContent()
    },
    getVideosInfo() {
      if (this.editor && this.editor.getContext()) {
        const context = this.editor.getContext()
        // eslint-disable-next-line no-underscore-dangle
        return context.video ? context.video._infoList : []
      }
      return []
    },
    getImagesInfo() {
      if (this.editor) {
        return this.editor.getImagesInfo()
      }
      return null
    },
    /**
     * @description 웹에디터 내용 중 html 태그, 이미지 등을 제외한 텍스트만 반환하는데 줄넘김도 포함
     * @function getInnerText
     * @param {None}
     * @returns {String}
     */
    getInnerText() {
      let innerText = ''
      if (this.editor) {
        ({ innerText } = this.editor.getContext().element.wysiwyg)
      }
      return innerText
    },
    /**
     * @description 웹에디터에 설정된 maxCharCount를 반환
     * @function getMaxCharCount
     * @param {None}
     * @returns {String}
     */
    getMaxCharCount() {
      return this.maxCharCount
    },
    /**
     * @description 웹에디터 내용 중 html 태그, 이미지 등을 제외한 텍스트만 반환
     * @function getText
     * @param {None}
     * @returns {String}
     */
    getText() {
      let textContent = ''
      if (this.editor) {
        ({ textContent } = this.editor.getContext().element.wysiwyg)
      }
      return textContent
    },
    /**
     * @description 웹에디터 내용 중 text 내용을 byte 로 계산한 결과 값 반환
     * @function getTextSize
     * @param {None}
     * @returns {String}
     */
    getTextSize() {
      return utils.getByte(this.getText())
    },
    /**
     * @description 웹에디터 내용 중 text 와 이미지 용량을 byte 로 계산한 결과 값 반환
     * @function getContentSize
     * @param {None}
     * @returns {Number}
     */
    getContentSize() {
      let imgSize = 0
      utils.forEach(this.getImagesInfo(), img => {
        imgSize += Number(img.size)
      })
      const videoSize = this.getVideosInfo().length

      return utils.getByte(this.getText()) + imgSize + videoSize
    },
    /**
     * @description 웹에디터 내용 중 iframe의 src를 확인한다. (https://www.youtube.com, https://www.everland.com만 허용)
     * @function checkIframeSrc
     * @param {None}
     * @returns {boolean}
     */
    checkIframeSrc() {
      const list = this.editor.getContext().element.wysiwyg.getElementsByTagName('iframe')
      
      if (list) {
        // reger =  https://*.everland.com
        let regEver = /^(https)\:\/\/[a-zA-Z0-9\-]*\.+everland\.com/
        
        for (let idx = 0; idx < list.length; idx += 1) {
          const iframe = list[idx]
          if (!( regEver.test(iframe.src)       //  old version : iframe.src.startsWith('https://www.everland.com')
              || iframe.src.startsWith('https://www.youtube.com'))
          ) {
            return false
          }
        }
      }
      return true
    },
    /**
     * @description 웹에디터 내용 중 text 값의 byte 수가 props 에 지정한 제한 크기를 초과했는지 check 하고 true/false를 리턴
     *              제한 크기를 초과했을 경우 메시지를 표시 함
     * @function isContentSizeExcceed
     * @param {None}
     * @returns {Boolean}
     */
    isContentSizeExcceed() {
      const bytes = this.getTextSize()
      if (this.maxCharCount < bytes) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_SIZE_LIMIT_EXCEEDED'), this.maxCharCount))
        return true
      }
      return false
    },
    /**
     * @description 웹에디터 loaded 이벤트 핸들러 && onLoaded 이벤트를 emit
     * @function onLoaded
     * @param {Object} core: 웹에디터의 core Object
     * @param {Boolean} reload: When reloaded with the "setOptions" method, the value of the this argument is true.
     * @returns {None}
     */
    onLoaded(core, reload) {
      this.$emit('loaded')
    },
    /**
     * @description 웹에디터에 내용을 html 형식으로 설정 - setHtml과 동일
     * @function setContent
     * @param {String}
     * @returns {None}
     */
    setContent(val = '') {
      if (this.editor) {
        this.editor.setContents(val)
      }
    },
    /**
     * @description set editor editable
     * @function setEditable
     * @param {None}
     * @returns {None}
     */
    setEditable() {
      this.editor.enabled()
      this.editor.toolbar.enabled()
      this.editor.toolbar.show()
      this.editor.getContext().element.resizingBar.style.display = 'none'
    },
    /**
     * @description set editor's height
     * @function setHeight
     * @param {Number}
     * @returns {None}
     */
    setHeight(val) {
      this.editor.setOptions({ height: val })
    },
    /**
     * @description set editor's language
     * @function setLanguage
     * @param {String}
     * @returns {None}
     */
    setLanguage(val) {
      if (lang && lang[val]) {
        this.editor.setOptions({ lang: lang[val] })
      }
    },
    /**
     * @description set editor's maxCharCount
     * @function setMaxCharCount
     * @param {Number}
     * @returns {None}
     */
    setMaxCharCount(val = '') {
      let realMaxCharCount = 0
      if (utils.isNumber(val * 1)) {
        realMaxCharCount = val * 1
      }
      if (this.editor) {
        this.editor.setOptions({ maxCharCount: realMaxCharCount })
      }
    },
    /**
     * @description set editor readonly
     * @function setReadonly
     * @param {None}
     * @returns {None}
     */
    setReadonly() {
      this.editor.disabled()
      this.editor.toolbar.disabled()
      this.editor.toolbar.hide()
      this.editor.getContext().element.resizingBar.style.display = 'none'
      this.editor.getContext().element.wysiwyg.setAttribute('contenteditable', false)
    },
    /**
     * @description 웹에디터에 내용을 html 형식으로 설정 - setContent과 동일
     * @function setHtml
     * @param {String}
     * @returns {None}
     */
    setHtml(val = '') {
      this.setContent(val)
    },
  },
}
</script>
<style>
</style>
