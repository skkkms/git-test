<template>
  <span :class="textClazz">
    <slot />
  </span>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      validator: function(value) {
        return (
          [
            'xs',
            'sm',
            'base',
            'lg',
            'xl',
            '2xl',
            '3xl',
            '4xl',
            '5xl',
            '6xl',
          ].indexOf(value) !== -1
        );
      },
      default: 'base',
    },
    weight: {
      type: String,
      validator: function(value) {
        return (
          [
            'hairline',
            'thin',
            'light',
            'normal',
            'medium',
            'semibold',
            'bold',
            'extrabold',
            'black',
          ].indexOf(value) !== -1
        );
      },
      default: 'normal',
    },
    spacing: {
      type: String,
      validator: function(value) {
        return (
          ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'].indexOf(
            value,
          ) !== -1
        );
      },
      default: 'normal',
    },
    lineHeight: {
      type: String,
      validator: function(value) {
        return (
          ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'].indexOf(
            value,
          ) !== -1
        );
      },
      default: 'normal',
    },
    align: {
      type: String,
      validator: function(value) {
        return ['left', 'center', 'right', 'justify'].indexOf(value) !== -1;
      },
      default: 'left',
    },
    ellipsis: {
      type: Boolean,
      default: false,
    },
    italic: {
      type: Boolean,
      default: false,
    },
    decoration: {
      type: String,
      validator: function(value) {
        return ['underline', 'line-through', 'none'].indexOf(value) !== -1;
      },
      default: 'none',
    },
    transform: {
      type: String,
      validator: function(value) {
        return (
          ['uppercase', 'lowercase', 'capitalize', 'none'].indexOf(value) !== -1
        );
      },
      default: 'none',
    },
  },
  computed: {
    textClazz() {
      const clazz = [];

      clazz.push('max-w-full');
      clazz.push(`text-${this.size}`);
      clazz.push(`font-${this.weight}`);
      clazz.push(`tracking-${this.spacing}`);
      clazz.push(`leading-${this.lineHeight}`);
      clazz.push(`text-${this.align}`);
      if (this.ellipsis) clazz.push(`truncate`);
      if (this.italic) clazz.push(`italic`);
      if (this.decoration !== 'none') clazz.push(this.decoration);
      if (this.transform !== 'none') clazz.push(this.transform);

      return clazz;
    },
  },
};
</script>
