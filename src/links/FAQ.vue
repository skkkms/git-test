<template>
  <ur-page-container title="FAQ Bulletin Board" :showTitle="true" type="page" breadcrumb="Level 1 > Level 2 > Level 3">
    <ur-box-container direction="row" alignV="start">
      <ur-box-container alignV="start" class="w-12/12 comm_scr_wrap" componentid="ur_box_container_001" direction="row">
        <ur-box-container alignV="start" class="row" componentid="ur_box_container_014" direction="row">
          <ur-box-container alignV="start" class="col-xs-1" componentid="ur_box_container_005" direction="column">
            <sui-input-label componentid="sui_input_label_001" label="Title" />
          </ur-box-container>
          <ur-box-container alignV="start" class="col-xs-5" componentid="ur_box_container_006" direction="column">
            <sui-text-field componentid="sui_text_field_001" v-model="sui_text_field_001__txtField" :type="sui_text_field_001__inputType" :placeholder="sui_text_field_001__placeholder" :maxlength="sui_text_field_001__maxlength" />
          </ur-box-container>
          <ur-box-container alignV="start" class="col-xs-1" componentid="ur_box_container_007" direction="column">
            <sui-input-label componentid="sui_input_label_003" label="Registered on" />
          </ur-box-container>
          <ur-box-container alignV="start" class="col-xs-5" componentid="ur_box_container_008" direction="column">
            <ur-range-picker class="ur-date-picker-ide" componentid="ur_range_picker_001" v-model="ur_range_picker_001__value" init="none" inputType="YYYY-MM-DD" modelType="YYYY-MM-DD" size="medium" one-input-mode />
          </ur-box-container>
        </ur-box-container>
        <ur-box-container alignV="start" componentid="ur_box_container_015" direction="row" class="row">
          <ur-box-container alignV="start" class="col-xs-1" componentid="ur_box_container_009" direction="column">
            <sui-input-label componentid="sui_input_label_002" label="Category Group Item" />
          </ur-box-container>
          <ur-box-container alignV="start" class="col-xs-5" componentid="ur_box_container_010" direction="column">
            <sui-code-select componentid="sui_code_select_001" :selected="sui_code_select_001__SELECTED" codeId="COD_SAMPLE" :defaultOption="'all'" />
          </ur-box-container>
        </ur-box-container>
        <ur-box-container alignV="start" class="mrB30 btn_wrap" componentid="ur_box_container_002" direction="row" align-h="end">
          <sui-button componentid="sui_button_001" class="comm_btn_Reset">Reset</sui-button>
          <sui-button componentid="sui_button_002" class="comm_btn_Scr">Search</sui-button>
        </ur-box-container>
      </ur-box-container>
      <ur-box-container alignV="start" class="w-12/12" componentid="ur_box_container_004" direction="column">
        <sui-s-grid componentid="sui_s_grid_001" ref="sui_s_grid_001" :headers="sui_s_grid_001__gridColumns" :data-source="sui_s_grid_001__dsData" :options="sui_s_grid_001__options" class="w-full" @grid:selected="onSelectGrid"
          :show-rows-per-page-control="true" initial-rows-per-page="10" />
      </ur-box-container>
      <ur-box-container alignV="start" class="w-12/12 comm_btn_wrap" componentid="ur_box_container_013" direction="column" align-h="end">
        <sui-button componentid="sui_button_003" class="comm_btn_solid">Register</sui-button>
      </ur-box-container>
    </ur-box-container>
  </ur-page-container>
</template>
<script>
  export default {
    data() {
      return {
        sui_code_select_001__SELECTED: {},
        sui_s_grid_001__dsData: [{
          id: 'A001',
          name: 'Bill',
          addr: 'm ipsum dolor sit amet, consectetur',
          age: 23,
          bal: 48936,
          code: 'Cherry'
        }, {
          id: 'A002',
          name: 'Yona',
          addr: 'm ipsum dolor sit amet, consectetur',
          age: 15,
          bal: 234879,
          code: 'Cherry'
        }, {
          id: 'A003',
          name: 'Smith',
          addr: 'm ipsum dolor sit amet, consectetur',
          age: 25,
          bal: 644234,
          code: 'Eggfruit'
        }, {
          id: 'A004',
          name: 'Kim',
          addr: 'm ipsum dolor sit amet, consectetur',
          age: 41,
          bal: 872323,
          code: 'Eggfruit'
        }],
        sui_s_grid_001__options: {
          resizableColumn: true,
          noInfo: false,
          multiSelect: false,
          selectCheck: false
        },
        sui_s_grid_001__flag: true,
        sui_s_grid_001__rowCount: '',
        sui_s_grid_001__gridColumns: [{
          value: 'id',
          text: 'ID',
          width: 80,
          type: 'string'
        }, {
          value: 'name',
          text: 'Name',
          width: 150,
          type: 'string'
        }, {
          value: 'addr',
          text: 'Address',
          type: 'string'
        }, {
          value: 'age',
          text: 'Age',
          width: 100,
          type: 'number'
        }, {
          value: 'bal',
          text: 'Balance',
          width: 150,
          type: 'number'
        }, {
          value: 'code',
          text: 'Furite',
          width: 120,
          type: 'string'
        }],
        ur_range_picker_001__value: ['', ''],
        sui_text_field_001__txtField: '',
        sui_text_field_001__inputType: '',
        sui_text_field_001__placeholder: '',
        sui_text_field_001__disabled: '',
        sui_text_field_001__computeReadonly: '',
        sui_text_field_001__maxlength: '',
        sui_text_field_001__showTooltip: ''
      };
    },
    computed: {},
    methods: {}
  };
</script>
<style scoped>
</style>