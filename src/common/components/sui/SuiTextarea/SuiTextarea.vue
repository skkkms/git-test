<template>
  <textarea class="sui-textarea" :class="classes" :value="value" @input="onInput" :autofocus="autofocus" :rows="rows" :cols="cols" :dirname="dirname" :disabled="disabled" :readonly="readonly"
            :maxlength="maxlength" :name="name" :placeholder="placeholder" :required="required" :wrap="wrap" :style="styles" ref="targetTextarea">
  </textarea>
</template>

<script>
/**
 * 이름 : SuiTextArea
 * 설명 : Textarea 세로 자동확장
 *        Chrome과 IE 10 이상 지원 (9이하 backspace and delete keys @input 안되는 이슈)
 * 최종 수정 일시 : 2019 - 04 - 10
 */
export default {
  name: 'SuiTextarea',
  props: {
    value: {
      type: String,
      default: ''
    },
    extensible: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 1
    },
    cols: {
      type: Number,
      default: 50
    },
    dirname: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 500
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    wrap: {
      type: String,
      default: 'soft'
    },
    required: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: Number,
      default: 0
    },
    maxRows: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      styles: '',
      isScrolled: true,
      targetEl: null,
      lineHeight: 0
    }
  },
  computed: {
    classes () {
      return [
        {'sui-textarea__show-scroll-bar': this.isScrolled},
        {'sui-textarea__hide-scroll-bar': !this.isScrolled}
      ]
    },
    computedMaxHeight () {
      return this.maxRows ? this.maxRows * this.lineHeight : this.maxHeight
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.targetEl = this.$refs.targetTextarea
      this.lineHeight = this.getLineHeight()

      if (this.extensible) {
        this.styles = 'height:' + (this.targetEl.scrollHeight) + 'px;'
        this.isScrolled = false
      }
      if (this.autofocus) this.targetEl.focus()
    })
  },
  watch: {
    computedMaxHeight () {
      this.resize(this.targetEl)
    }
  },
  methods: {
    onInput (event) {
      if (this.extensible) this.resize(event.target)
      this.$emit('input', event.target.value)
    },
    resize (target) {
      if (!this.computedMaxHeight || target.scrollHeight <= this.computedMaxHeight) {
        target.style.height = 'auto'
        target.style.height = (target.scrollHeight) + 'px'
        this.isScrolled = false
      } else {
        target.style.height = 'auto'
        target.style.height = this.computedMaxHeight + 'px'

        if (target.scrollHeight > this.computedMaxHeight) {
          this.isScrolled = true
        } else {
          this.isScrolled = false
        }
      }
    },
    getLineHeight () {
      let lineHeightPx = ''
      if (window.getComputedStyle) {
        lineHeightPx = document.defaultView.getComputedStyle(this.targetEl, null).getPropertyValue('line-height')
      } else if (this.targetEl.currentStyle) {
        // IE 하위버전 대응
        lineHeightPx = this.targetEl.currentStyle['line-height']
      }

      if (lineHeightPx) {
        return Number(lineHeightPx.replace('px', ''))
      }
    },
    activate() {
      if (this.$refs.targetTextarea) {
        this.$refs.targetTextarea.focus();
      }
    },
    setFocus() {
      this.$refs.targetTextarea.focus();
    }
  }
}
</script>

<style>
</style>
