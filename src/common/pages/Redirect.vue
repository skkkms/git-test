<template>
  <div />
</template>
<script>
export default {
  name: 'Redirect', // eslint-disable-line vue/name-property-casing
  mounted() {
    const pageId = utils.getParameter(this, 'pageId');
    if (pageId) {
      this.$router.push(pageId);
    }
  },
};
</script>
