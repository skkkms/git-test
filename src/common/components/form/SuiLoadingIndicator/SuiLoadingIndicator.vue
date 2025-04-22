<template>
  <div
    v-show="httpReqCount"
    ref="loadingIndicator"
    class="sui-locaing-indicator"
    style="width: 100%; height: 100%;"
  >
    <div class="mid">
      <span class="load" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      styleTimeoutId: null,
    }
  },
  computed: {
    httpReqCount() {
      return this.$store.getters.httpReqCount
    },
  },
  watch: {
    httpReqCount: {
      handler(value, prevValue) {
        // Case 1: zero or positive number → positive number
        if (prevValue >= 0 && value > 0) {
          this.styleTimeoutId = this.setStyleTimeout(2000, this.styleTimeoutId)
        }

        // Case 2: positive number → zero
        if (prevValue > 0 && value === 0) {
          this.clearStyleTimeout()
        }
      },
    },
  },
  methods: {
    setIndicatorWidthAndHeight() {
      this.$refs.loadingIndicator.style.setProperty('width', '100%')
      this.$refs.loadingIndicator.style.setProperty('height', '100%')
    },
    removeIndicatorWidthAndHeight() {
      this.$refs.loadingIndicator.style.removeProperty('width')
      this.$refs.loadingIndicator.style.removeProperty('height')
    },
    setStyleTimeout(delay, oldTimeoutId = null) {
      const newTimeoutId = setTimeout(() => {
        this.removeIndicatorWidthAndHeight()
      }, delay)

      if (oldTimeoutId) {
        clearTimeout(oldTimeoutId)
      }
      return newTimeoutId
    },
    clearStyleTimeout() {
      if (this.styleTimeoutId) {
        clearTimeout(this.styleTimeoutId)
      }
      this.styleTimeoutId = null
      this.setIndicatorWidthAndHeight()
    },
  },
}
</script>

<style scoped lang="scss">
.sui-locaing-indicator {
  z-index:1000000;
  // position: fixed;
  // width: 100%;
  // height: 100%;
}

$color: #3b80da;
$size: 60px;
$time1: 1s;
$time2: 1s;
$delay: -0.3s;
$num: 5; //edit also html
$thickness: 4px;
@mixin del ($items, $delay) {
  @for $i from 1 through ($items) {
    &-#{$i} {
      animation-delay: $delay*$i;
    }
  }
}
* {
  box-sizing: border-box;
  margin: 0;
}

.mid {
  z-index:10000000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50% );
}

.load {
  display: inline-block;
  width: $size;
  height: $size;
  border-radius: 50%;
  border: $thickness solid transparent;
  border-left: $thickness solid $color;
  border-top: $thickness solid $color;
  border-bottom: $thickness solid $color;
  animation: rotate $time1 linear infinite;
}

@keyframes scale {
  0% {transform: scale(1);}
  100% {transform: scale(0.1);}
}

@keyframes rotate {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}
</style>
