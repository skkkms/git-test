<template>
<div>
    <sui-text-field v-model="multipleVal.val1" @blur="$emit('myevent',multipleVal)" />
    <sui-text-field v-model="multipleVal.val2" @blur="$emit('myevent',multipleVal)" />
</div>
</template>
<script>
export default {
    name: "cmp-test",
    /*
    model: {
        prop: 'multipleVal',
        event: 'myevent',
    },
    */
    props: {
        multipleVal: {
            val1: "probval1",
            val2: "probval2",
        }
    },
    data() {
        return {
        }
    },
}
</script> 
<style scoped>
</style>