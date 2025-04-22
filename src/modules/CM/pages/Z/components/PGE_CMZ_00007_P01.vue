<template>
  <div class="mr15">
    <h1 class="comm_tit01">{{ this.pageName }}</h1>
    <div class="mrT15">
      <sui-jqx-grid :dataSource="defaultGridData.dataSource" :columns="defaultGridData.columns" :columnsautoresize="true" :autoheight="true" width="100%" pageable="true" pagermode="simple" pagesizeoptions="['10', '20', '30']"></sui-jqx-grid>
      <div class="comm_btn_act_wrap">
        <sui-button type="button" class="comm_btn_act01">저장</sui-button>
        <sui-button type="button" class="comm_btn_act01">취소</sui-button>
      </div>
    </div>
  </div>
</template>
<script>
  // import - libraries (node modules)
  // import - local files (js, vue, ...)
  // 페이지 에서 사용하는 code 목록 기술
  export default {
    name: 'PGE_CMZ_00007_P01', // eslint-disable-line vue/name-property-casing
    data() {
      return {
        pageName: this.$t('MSG_TIT_MLNG_INP'),
        // 페이지 에서 사용하는 code 목록이 저장 될 field
        codes: {
          COD_CDST_TYPE: [{
            label: '',
            key: ''
          }],
          COD_CD_MGT_SEARCH: [{
            label: '',
            key: ''
          }]
        },
        defaultGridData: {
          dataSource: {
            localdata: [
            ['메세지자원', '한국어', 'MSG_CMU_TXT_PAGE_DTI_INFO', '페이지상세정보'],
            ['메세지자원', '한국어', 'MSG_CMU_TXT_PAGE_DTI_INFO', '페이지상세정보'],
            ['메세지자원', '한국어', 'MSG_CMU_TXT_PAGE_DTI_INFO', '페이지상세정보'],
            ['메세지자원', '한국어', 'MSG_CMU_TXT_PAGE_DTI_INFO', '페이지상세정보']
            ],
            datafields: [{
              name: 'cell01',
              type: 'string',
              map: '0'
            }, {
              name: 'cell02',
              type: 'string',
              map: '1'
            }, {
              name: 'cell03',
              type: 'string',
              map: '2'
            }, {
              name: 'cell04',
              type: 'string',
              map: '3'
          }, {}],
            datatype: 'array'
          },
          columns: [{
            text: '언어',
            datafield: 'cell01',
            align: 'center'
          }, {
            text: '다국어값',
            datafield: 'cell02',
            align: 'center'
          }, {
            text: '약어',
            datafield: 'cell03',
            align: 'center'
          }, {
            text: '일괄적용',
            datafield: 'cell04',
            align: 'center'
          }]
        },
        page: {
          totalPageCount: 8,
          totalDataCount: 80,
          currentPage: 1
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
