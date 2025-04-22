<template>
  <div>
    <div class="comm_popup_wrap_medium">
      <sui-grid ref="grid" :columns="gridColumns0" :dataset="'dataset0'"
            :hideHeader="false"
            :autoheight= "false"
            :multiselect="false"
            :pageable="false"
            :showCountControl="true"
            :showDisplayCountControl="false"
            >
            <div class="comp_spacing" />
            <div class="btn_wrapL">
              <sui-button type="button" class="comm_btn_gridTop">row add</sui-button>
              <sui-button type="button" class="comm_btn_gridTop">row delete</sui-button>
            </div>
      </sui-grid>
    </div>
    <div class="comm_btn_wrap mrR30">
     <sui-button type="button" class="comm_btn_border">{{$t('MSG_BTN_SELT')}}</sui-button>
     <sui-button type="button" class="comm_btn_solid">{{$t('MSG_BTN_CANCEL')}}</sui-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'PGE_DST_00004_P07',
    data() {
      return {
        selectedCodeValue: {
          COD_MDLE: {
            label: '',
            key: ''
          }
        },
        localdata0: [
          ['COM', 'COM_M', 'MALE'],
          ['COM', 'COM_M', 'MALE'],
          ['COM', 'COM_M', 'MALE'],
          ['COM', 'COM_M', 'MALE'],
          ['COM', 'COM_M', 'MALE']
        ],
        gridColumns0: [{
          text: 'Upper CodeID',
          datafield: 'datafield0'
        }, {
          text: 'Upper Code Value',
          datafield: 'datafield1'
        }, {
          text: 'Code Value',
          datafield: 'datafield2'
        }],
      };
    },
    computed: {},
    watch: {},
    mounted() {},
    methods: {},
    datasets: [{
      id: 'dataset0',
      type: 'local',
      data: 'localdata0',
      datafields: [{
        name: 'datafield0',
        type: 'string',
        map: '0'
      }, {
        name: 'datafield1',
        type: 'string',
        map: '1'
      }, {
        name: 'datafield2',
        type: 'string',
        map: '2'
      }]
    }],
  };
</script>
<style scoped>
</style>
