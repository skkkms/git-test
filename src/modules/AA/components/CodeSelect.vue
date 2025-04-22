<template>
  <span>
    {{ this.codeText }}
  </span>
</template>

<script>
export default {
  name: 'CodeSelect',
  props: {
    codeList: {
      default: () => [],
    },
    codeValue: {
      default: '',
    },
    codeKey: {
      default: 'value',
    },
    codeName: {
      default: 'text',
    },
  },
  computed: {
    codeText() {
      let ret = ''
      // eslint-disable-next-line consistent-return
      _.forEach(this.codeList, item => {
        if (item[this.codeKey] === this.codeValue) {
          ret = item[this.codeName]
        }
      })
      return ret
    },
  },
}
</script>

<style scoped>

</style>
