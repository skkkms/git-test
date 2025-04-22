<script>
export default {
  props: {
    direction: {
      type: String,
      validator: function(value) {
        return ['row', 'column'].indexOf(value) !== -1;
      },
      default: 'column',
    },
    nowrap: {
      type: Boolean,
      default: false,
    },
    alignH: {
      type: String,
      validator: function(value) {
        return ['start', 'center', 'end', 'between'].indexOf(value) !== -1;
      },
      default: 'start',
    },
    alignV: {
      type: String,
      validator: function(value) {
        return ['start', 'center', 'end', 'between', 'stretch'].indexOf(value) !== -1;
      },
      default: 'start',
    },
  },
  computed: {
    containerAlignClazz() {
      return [
        `ur-box__direction--${this.direction}`,
        { 'ur-box__wrap': !this.nowrap },
        `ur-box__h-align--${this.alignH}`,
        `ur-box__v-align--${this.alignV}`,
      ];
    },
  },
};
</script>
