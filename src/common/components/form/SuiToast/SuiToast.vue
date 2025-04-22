<template>
  <transition name="sui-toast-item-fade">
    <div v-show="visible" class="sui-toast-item">
      <div class="sui-toast-item__content">
        <p >{{ message }}</p>
        <div class="btn_close">
            <button @click="onClose">{{ buttonText }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SuiToast',
  props: {
    message: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 3000,
    },
    queue: {
      type: Boolean,
      default: undefined
    }
  },
  data () {
    return {
      visible: false,
      parentDiv: null,
      timer: null,
      typeName: 'toast',
      position: 'is-bottom',
      buttonText: utils.getMessageById('MSG_BTN_CLOSE'),
    }
  },
  beforeMount () {
    this.setupContainer()
  },
  mounted () {
    this.addToast()
  },
  methods: {
    setupContainer () {
      this.parentDiv = document.querySelector('.' + this.typeName + '.' + this.position)

      if (this.parentDiv) {
        return
      } else {
        this.parentDiv = document.createElement('div')
        this.parentDiv.className = this.typeName + ' ' + this.position
      }

      const container = document.body
      container.appendChild(this.parentDiv)
    },
    addToast () {
      this.parentDiv.insertAdjacentElement('afterbegin', this.$el)
      this.showToast()
    },
    showToast () {
      if (this.shouldQueue()) {
        setTimeout(() => this.showToast(), 250)
        return
      }

      this.visible = true

      this.timer = setTimeout(() => {
        this.close()
      }, this.duration)
    },
    shouldQueue () {
      const queue = this.queue !== undefined ? this.queue : true
      if (!queue) return false
      let targetIndex = this.position === 'is-bottom' ? this.parentDiv.childElementCount - 1 : 0
      return this.parentDiv.childElementCount >= 2 && this.parentDiv.children[targetIndex] !== this.$el
    },
    close () {
      clearTimeout(this.timer)
      this.visible = false

      setTimeout(() => {
        this.$destroy()
        this.removeElement(this.$el)
      }, 150)
    },
    removeElement (el) {
      if (typeof el.remove !== 'undefined') {
        el.remove()
      } else if (typeof el.parentNode !== 'undefined') {
        el.parentNode.removeChild(el)
      }
    },
    onClose() {
      this.close();
    },
  }
}
</script>

<style>

</style>
