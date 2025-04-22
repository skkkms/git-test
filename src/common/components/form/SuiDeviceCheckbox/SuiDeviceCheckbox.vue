<template>
  <div>
    <sui-checkbox
      v-for="item in deviceTypeList"
      :key="item.key"
      :value="item.key"
      :disabled="disabled"
      v-model="checkedList"
    >
      {{ item.label }}
    </sui-checkbox>
  </div>
</template>

<script>
import DatasetBase from '~common/components/form/SuiDatasetBase/SuiDatasetBase';

export default {
  name: 'SuiDeviceCheckbox',
  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
    pageId: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  extends: DatasetBase,
  data () {
    return {
      deviceTypeList: [],
      checkedList:[],
    }
  },
  mounted() {
    http.getCodeList(this.pageId, ['COD_DVC_TYPE'], '').then(res => {
      this.deviceTypeList = res['COD_DVC_TYPE'];
      this.setValue(Number(this.value));
    }).catch(err => {
      console.log(err);
    });
  },
  methods: {
    getValue() {
      let ret = 0;
      utils.forEach(this.checkedList, value => {
        ret += Number(value);
      });
      return ret;
    },
    setValue(value) {
      this.checkedList = [];
      utils.forEach(this.deviceTypeList, (val, idx) => {
        if( (value & (1 << idx) ) > 0 ) {
          this.checkedList.push(val.key);
        }
      });
    },
  }
}
</script>
<style>
</style>
