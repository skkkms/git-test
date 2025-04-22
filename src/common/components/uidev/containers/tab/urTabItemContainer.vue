<template>
  <div class="ur-tab-item ur-box-container" :class="containerAlignClazz">
    <slot />
  </div>
</template>

<script>
import { ContainerAlignMixin } from '../mixins';

export default {
  mixins: [ContainerAlignMixin],
  props: {
    tabId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    titleIcon: {
      type: String,
    },
    titleIconType: {
      type: String,
      validator: function(value) {
        return ['picto', 'line'].indexOf(value) !== -1;
      },
    },
  },
};
</script>
