<script>
import { MAX_COLUMN } from '../constant';

export default {
  props: {
    column: {
      type: [String, Number],
    },
    columnLg: {
      type: [String, Number],
    },
    columnMd: {
      type: [String, Number],
    },
    columnSm: {
      type: [String, Number],
    },
    width: {
      type: [String, Number],
    },
    height: {
      type: [String, Number],
    },
  },
  computed: {
    $_column() {
      return parseInt(this.column) || MAX_COLUMN;
    },
    containerSizeStyle() {
      let style = {};

      if (parseInt(this.width)) {
        style['width'] = parseInt(this.width) + 'px';
      } else {
        style['width'] = (100 / MAX_COLUMN) * this.$_column + '%';
      }

      if (parseInt(this.height)) {
        style['height'] = parseInt(this.height) + 'px';
        style['overflow'] = 'auto';
      }

      return style;
    },
    containerSizeClazz() {
      let clazz = [];
      const [columnLg, columnMd, columnSm] = [parseInt(this.columnLg), parseInt(this.columnMd), parseInt(this.columnSm)];

      if (columnLg) clazz.push(this.getAdaptiveSizeClassName('lg', columnLg));
      if (columnMd) clazz.push(this.getAdaptiveSizeClassName('md', columnMd));
      if (columnSm) clazz.push(this.getAdaptiveSizeClassName('sm', columnSm));

      return clazz;
    }
  },
  methods: {
    getAdaptiveSizeClassName(size, column) {
      return `w-${size}-${column}/${MAX_COLUMN}`;
    }
  },
};
</script>
