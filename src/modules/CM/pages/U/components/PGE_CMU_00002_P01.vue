<template>
  <div class="mr15">
    <h4 class="comm_tit02">담당자 유형 기본정보</h4>
    <div class="comm_scr_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label label="모듈" width="140px"></sui-input-label>
        </div>
        <div class="col-xs-5">
          <sui-module-submodule-select :selectedMd="selectedModuleValue" :selectedSmd="selectedSubModuleVale" :customMdList="customMdList" :customSmdList="customSmbList" />
        </div>
        <div class="col-xs-1">
          <sui-input-label label="유형" width="140px"></sui-input-label>
        </div>
        <div class="col-xs-5">
          <sui-select-box  v-model="codes.COD_DTSVC_TYPE" :option-list="codes.COD_DTSVC_TYPE">
          </sui-select-box>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label label="검색조건 " width="140px"></sui-input-label>
        </div>
        <div class="col-xs-11">
          <sui-select-box  v-model="codes.COD_DTSVC_SEARCH_COND" :option-list="codes.COD_DTSVC_SEARCH_COND">
          </sui-select-box>
          <sui-text-field maxlength="50" default value class="width50"></sui-text-field>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 ta_r">
          <sui-button type="button" class="comm_btn_scr" @click="onReset">{{ $t("MSG_CM_BTN_RESET") }}</sui-button>
          <sui-button type="button" class="comm_btn_scr" @click="onSearch">{{ $t("MSG_CM_BTN_SEARCH") }}</sui-button>
        </div>
      </div>
    </div>
    <div class="mrB15">
      <h4 class="comm_tit02">담당자 그룹</h4>
      <sui-jqx-grid :dataSource="defaultGridData.dataSource" :columns="defaultGridData.columns" :columnsautoresize="true" :autoheight="true" width="100%" pageable="true" pagermode="simple" pagesizeoptions="['10', '20', '30']" adaptive="width50">
      </sui-jqx-grid>
    </div>
    <div class="comm_btn_act_wrap">
      <sui-button type="button" class="comm_btn_act01">저장</sui-button>
      <sui-button type="button" class="comm_btn_act01">취소</sui-button>
    </div>
  </div>
</template>
<script>
  // import - libraries (node modules)
  // import - local files (js, vue, ...)
  // 페이지 에서 사용하는 code 목록 기술
  const CODE_KEYS = ['COD_DTSVC_TYPE', 'COD_DTSVC_SEARCH_COND'];
  export default {
    name: 'PGE_CMU_00002_P01', // eslint-disable-line vue/name-property-casing
    data() {
      return {
        pageName: "데이타 서비스 선택",
        // 페이지 에서 사용하는 code 목록이 저장 될 field
        codes: {
          selectedModuleValue: {
            key: '',
            value: ''
          },
          selectedSubModuleVale: {
            key: '',
            value: ''
          },
          COD_DTSVC_TYPE: [{
            label: '',
            key: ''
          }],
          COD_DTSVC_SEARCH_COND: [{
            label: '',
            key: ''
          }],
          useYn: [{
              key: 'Y',
              label: 'Yes',
            },
            {
              key: 'N',
              label: 'No',
            },
          ]
        },
        defaultGridData: {
          dataSource: {
            localdata: [
              ['모듈', '서브모듈', 'ID', '명', '유형', 'URL', '허용'],
              ['모듈', '서브모듈', 'ID', '명', '유형', 'URL', '허용'],
              ['모듈', '서브모듈', 'ID', '명', '유형', 'URL', '허용'],
              ['모듈', '서브모듈', 'ID', '명', '유형', 'URL', '허용']
            ],
            datafields: [{
              name: '모듈',
              type: 'string',
              map: '0'
            }, {
              name: '서브모듈',
              type: 'string',
              map: '1'
            }, {
              name: 'ID',
              type: 'string',
              map: '2'
            }, {
              name: '명',
              type: 'string',
              map: '3'
            }, {
              name: '유형',
              type: 'string',
              map: '4'
            }, {
              name: 'URL',
              type: 'string',
              map: '5'
            }, {
              name: '허용',
              type: 'string',
              map: '6'
            }],
            datatype: 'array'
          },
          columns: [{
            text: '',
            columntype: 'checkbox',
            datafield: 'chk',
            align: 'center',
            width: '40',
            renderer: function(elem) {
              return '<div id="checkbox" style="z-index: 999; margin-top: 8px; margin-left:8px" @click="selectAll"></div>';
            },
            rendered: function(element, align, height) {
              element.jqxCheckBox();
            }
          }, {
            text: '모듈',
            datafield: '모듈',
            align: 'center'
          }, {
            text: '서브모듈',
            datafield: '서브모듈',
            align: 'center'
          }, {
            text: 'ID',
            datafield: 'ID',
            align: 'center'
          }, {
            text: '명',
            datafield: '명',
            align: 'center'
          }, {
            text: '유형',
            datafield: '유형',
            align: 'center'
          }, {
            text: 'URL',
            datafield: 'URL',
            align: 'center'
          }, {
            text: '허용',
            datafield: '허용',
            align: 'center'
          }]
        }
      };
    },
    computed: {
      // 계산된 속성, property로 사용가능
    },
    watch: {
      // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
      count() {
        console.log('count increased');
      }
    },
    mounted() {
      // DOM이 document에 append된 상태, 실제 element에 접근 가능 (this.$el or this.$refs)
      // 주로 데이터 패치 등을 함
      this.loadCode().then(() => {
        this.loadData();
      });
    },
    methods: {
      loadCode() {
        return http.mergeCodeList(this.$options.name, CODE_KEYS, this.codes);
      },
      loadData() {
        // get contents data, grid etc..
      }
    }
  };
</script>
<style scoped>
</style>
