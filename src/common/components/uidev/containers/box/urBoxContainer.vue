<template>
  <div
    class="ur-box-container"
    :class="containerAlignClazz"
  >
    <slot />
  </div>
</template>

<script>
import { ContainerAlignMixin } from '../mixins';

export default {
  mixins: [ContainerAlignMixin],
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
