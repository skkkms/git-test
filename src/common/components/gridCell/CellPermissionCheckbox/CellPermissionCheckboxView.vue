<template>
  <div v-show="true" class="sui-checkbox" :class="{ 'sui-checkbox--disabled' : disabled}">
    <div class="sui-checkbox__check-image" :class="{ 'sui-checkbox--check-on' : this.check1, 'sui-checkbox--check-off' : this.check1 === false, }" @click="onClick(1)"/>
    <div class="sui-checkbox__check-image" :class="{ 'sui-checkbox--check-on' : this.check2, 'sui-checkbox--check-off' : this.check2 === false, }" @click="onClick(2)"/>
    <div class="sui-checkbox__check-image" :class="{ 'sui-checkbox--check-on' : this.check3, 'sui-checkbox--check-off' : this.check3 === false, }" @click="onClick(3)"/>
    <div class="sui-checkbox__check-image" :class="{ 'sui-checkbox--check-on' : this.check4, 'sui-checkbox--check-off' : this.check4 === false, }" @click="onClick(4)"/>
    <div class="sui-checkbox__check-image" :class="{ 'sui-checkbox--check-on' : this.check5, 'sui-checkbox--check-off' : this.check5 === false, }" @click="onClick(5)"/>
    <div class="sui-checkbox__check-image" :class="{ 'sui-checkbox--check-on' : this.check6, 'sui-checkbox--check-off' : this.check6 === false, }" @click="onClick(6)"/>
  </div>
</template>

<script>

import BaseComponent from '../GridCellComponentBase';

export default {
  name: 'CellPermissionCheckbox',
  extends: BaseComponent,
  props: {
    value: {
      type: [Number, Boolean, String, Array],
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      permission: Number(this.value),
      // check1: false,
      // check2: false,
      // check3: false,
      // check4: false,
      // check5: false,
      // check6: false,

    }
  },
  computed: {

    check1() {
      if( (this.permission & 1) > 0) {
        return true;
      }
      else return false;
    },
    check2() {
      if( (this.permission & 2) > 0 ) {
        return true;
      }
      else return false;
    },
    check3() {
      if( (this.permission & 4) > 0) {
        return true;
      }
      else return false;
    },
    check4() {
      if( (this.permission & 8) > 0 ) {
        return true;
      }
      else return false;
    },
    check5() {
      if( (this.permission & 16) > 0 ) {
        return true;
      }
      else return false;
    },
    check6() {
      if( (this.permission & 32) > 0 ) {
        return true;
      }
      else return false;
    },

  },
  methods: {
    onClick (chckNum) {
      if (this.disabled) {
        event.stopPropagation();
        return;
      }
      let lcheck1 = this.check1;
      let lcheck2 = this.check2;
      let lcheck3 = this.check3;
      let lcheck4 = this.check4;
      let lcheck5 = this.check5;
      let lcheck6 = this.check6;

      if(chckNum == 1) {
        lcheck1 = !lcheck1;
      }
      else if(chckNum == 2) {
        lcheck2 = !lcheck2;
      }
      else if(chckNum == 3) {
        lcheck3 = !lcheck3;
      }
      else if(chckNum == 4) {
        lcheck4 = !lcheck4;
      }
      else if(chckNum == 5) {
        lcheck5 = !lcheck5;
      }
      else if(chckNum == 6) {
        lcheck6 = !lcheck6;
      }
      let bit = 0;
      if(lcheck1) bit = bit | 1;
      if(lcheck2) bit = bit | 2;
      if(lcheck3) bit = bit | 4;
      if(lcheck4) bit = bit | 8;
      if(lcheck5) bit = bit | 16;
      if(lcheck6) bit = bit | 32;
      this.permission = bit;
      this.$emit('changePermission', this.permission);
    },
    setValue(value) {
      this.permission = Number(value);
    }
  }
}
</script>

<style>
</style>
