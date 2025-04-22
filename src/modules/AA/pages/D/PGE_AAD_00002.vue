<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_FLTR_ID')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field v-model="search.filterId" style="width: 100%;" @enter="onClickSearch" maxlength="100"/>
        </ur-form-item>

        <ur-form-item
          :label="$t('MSG_TXT_FLTR_NM')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field v-model="search.filterName" style="width: 100%;" @enter="onClickSearch" maxlength="300" />
        </ur-form-item>

      </ur-form-box>

      <div class="btn_wrap mt10" ref="modal">
        <div class="right_box">
          <!-- 초기화 -->
          <ur-button v-permission:read="this.$options.name" 
          @click="onClickReset">
            {{$t('MSG_BTN_INTL')}}
          </ur-button>
          <!-- 검색 -->
          <ur-button v-permission:read="this.$options.name" 
            @click="onClickSearch" color="violet"  
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </ur-button>
        </div>
      </div>

      <ur-data-grid
        ref="grid"
        class="mt35"
        :headers="columnsT1"
        :data-source="dataList"
        :options="opts"
        :data-set-options="{id: 'id'}"
        @grid:row-dbl-click = "fnGridRowDblClick"
      />

      <div class="comm_btn_wrap mt10">
        <div class="right_box">
          <!-- 닫기 -->
          <ur-button 
          @click="onClickClose()">
            {{ $t("MSG_BTN_CLOSE") }}
          </ur-button>

          <!-- 선택 -->
          <ur-button color="violet"
          @click="onClickSelt()">
            {{ $t("MSG_BTN_SELT") }}
          </ur-button>
        </div>
      </div>
    </sui-page-contents>

    <sui-page-footer>
      <div class="comm_btn_wrap" />
    </sui-page-footer>

  </sui-page>
</template>

<script>

export default {
  name: 'PGE_AAD_00002',
  props: {
    closePagePopup: {
      type: Function,
      default() {
        return null;
      },
    },
  },
  components: {
  },
  data() {
    return {
      //검색조건
      search:{
        filterId:'',
        filterName: '',
      },

      // 그리드 옵션
      opts: { 
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },

      dataList: new this.$ur.grid.DataSet(),
    }
  },
  computed: {
    columnsT1(){
      return [
        { text: this.$t('MSG_TXT_FLTR_ID'), value: 'filterId'},
        { text: this.$t('MSG_TXT_FLTR_NM'), value: 'filterName'},
        { text: this.$t('MSG_TXT_RGST_DTM'), value: 'fstRgstDtm', type:'date', width: '160px',
          customValue(value){
            return utils.dateformatToClient(value);
          } 
        },
        { text: this.$t('MSG_TXT_RGST_USR'), value: 'fstRgstUsrId'},
      ]
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
    this.onClickSearch()
  },
  methods: {
    //초기화
    onClickReset(){
      this.search.filterId = '';
      this.search.filterName = '';
    },

    /***************************************
     * 조회
     ****************************************/
    onClickSearch(){
      var queryParams = {
                          filterId: this.search.filterId,
                          filterName: this.search.filterName,
                          };
      http.request(this.$options.name, 'DTS_AAD_00007', {
        query: queryParams,
      }).then(res => {
        this.dataList = res.data;
      }).catch(error => {
        console.log(error);
      });
    },

    //그리드 더블 클릭 시 
    fnGridRowDblClick(row, evemt){
      this.onClickSelt(row);
    },
    
    /***************************************
     * 선택
     ****************************************/
    onClickSelt(row) {
      var rows = {};
      if(row != null){
        rows = row
      }else{
        rows = this.$refs.grid.getSelected();
      }
      
      if(rows == null){
        utils.messageBox("alert", this.$t('MSG_ALT_NOT_SEL_ITEM')); //선택된 항목이 없습니다.
        return;
      }
      this.closePagePopup(rows);
    },
    
    //닫기
    onClickClose() {
      this.closePagePopup('Close');
    },
    
  },
}
</script>
<style scoped>
</style>
