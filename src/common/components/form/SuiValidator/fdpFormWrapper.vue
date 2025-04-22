<template>
  <div>
    <form @submit.prevent="validateBeforeSubmit" :data-vv-scope="scope" @keydown.13="preventAutoSubmitByEnterKey">
      <slot></slot>
    </form>
  </div>
</template>

<script>
/**
 * 이름 : fdpFormWrapper
 * 설명 : scope에 있는 validator를 전체 검증하기 위한 컴포넌트
 * 최종 수정 일시 : 2018 - 09 - 10
 */
export default {
  name: 'fdpFormWrapper',
  inject: ['$validator'],
  props: {
    scope: {
      type: String,
      required: true
    }
  },
  methods: {
    validateBeforeSubmit () {
      let _this = this
      this.$validator.validateAll(this.scope).then((result) => {
        _this.$emit('validate-all', result, _this.$validator)
      })
    },
    preventAutoSubmitByEnterKey (e) {
      // textarea는 enter를 허용해야 하기 때문에 제외
      if (e.srcElement.type !== 'textarea') {
        e.preventDefault();
        // return false
      }
    },
    errorClear () {
      this.errors.clear(this.scope)
    }
  }
}
</script>

<style>

</style>
