<template>
  <div>
    <div class="comm_shut_wrap">
        <div class="inbox" style="flex:1;">
          <div class="comm_tree_wrap">
            <sui-tree v-bind="fdpTree00"></sui-tree>
          </div>
        </div>
        <div class="emptybox"></div>
        <div class="inbox" style="flex:5;">
         <div class="comm_scr_wrap">
          <div class="row">
             <div class="col-xs-1">
              <sui-input-label label="Upper Domain Classification"></sui-input-label>
             </div>
             <div class="col-xs-11">
              <sui-text-field placeholder="" default value :disabled="true" :clearable="true" :readonly="false"></sui-text-field>
              <div class="comp_spacing"></div>
              <sui-text-field placeholder="" default value :disabled="true" :clearable="true" :readonly="false"></sui-text-field>
             </div>
          </div>
          <div class="row">
             <div class="col-xs-1">
              <sui-input-label label="Domain Classification name"></sui-input-label>
             </div>
             <div class="col-xs-11">
              <sui-text-field placeholder="" default value :disabled="true" :clearable="true" :readonly="false"></sui-text-field>
             </div>
          </div>
           <div class="row">
             <div class="col-xs-1">
              <sui-input-label label="Domain Classification Code"></sui-input-label>
             </div>
             <div class="col-xs-11">
              <sui-text-field placeholder="" default value :disabled="true" :clearable="true" :readonly="false"></sui-text-field>
            </div>
          </div>
          <div class="row">
             <div class="col-xs-1">
              <sui-input-label label="Domain ID"></sui-input-label>
             </div>
             <div class="col-xs-11">
              <sui-text-field placeholder="" default value :disabled="true" :clearable="true" :readonly="false"></sui-text-field>
            </div>
          </div>
           <div class="row">
             <div class="col-xs-1">
              <sui-input-label label="Domain name"></sui-input-label>
             </div>
             <div class="col-xs-11">
              <sui-text-field placeholder="" default value :disabled="true" :clearable="true" :readonly="false"></sui-text-field>
            </div>
           </div>
         </div>
       </div>
      </div>
      <div class="comm_btn_wrap">
        <sui-button type="button" class="comm_btn_border">cancel</sui-button>
        <sui-button type="button" class="comm_btn_solid">choice</sui-button>
      </div>
    </div>
</template>
<script>
  export default {
    name: "PGE_CMZ_00002_P04", // eslint-disable-line vue/name-property-casing
    data() {
      return {
        // Page Header
        fdpTree00: {
          data: [{
            text: 'Code',
            opened: true,
            children: [{
              text: 'integrated Code',
              opened: true,
              children: [{
                text: 'integrated CodeCH10'
              }, {
                text: 'integrated CodeCH11'
              }, {
                text: 'integrated CodeCH12'
              }]
            }, {
              text: 'isolated Code',
              opened: false,
              children: [{
                text: '0'
              }, {
                text: '1'
              }]
            }, {
              text: 'divided Code',
              opened: false,
              children: [{
                text: '0'
              }, {
                text: '1'
              }]
            }]
          }]
        },
      };
    },
    computed: {},
    watch: {},
    methods: {}
  };
</script>
<style scoped>
</style>
