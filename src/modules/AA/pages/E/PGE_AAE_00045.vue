<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap mt45">
        <div class="title_compo pl16">
          <!-- 추가 -->
          <ur-button color="violet"
          @click="onClickRowAdd">
            {{ $t("MSG_BTN_ADD") }}
          </ur-button>
          <!-- 삭제 -->
          <ur-button color="violet"
          @click="onClickRowDelete">
            {{ $t("MSG_BTN_DEL") }} 
          </ur-button>
          <!-- 초기화 -->
          <ur-button color="violet"
          @click="onClickReset">
            {{ $t("MSG_BTN_INTL") }}
          </ur-button>
          <!-- 저장 -->
          <ur-button color="violet"
          @click="onClickSave()">
            {{ $t("MSG_BTN_SAVE") }}
          </ur-button>
        </div>
      </div>

      <ur-data-grid
        ref="grid"
        :headers="columns"
        :data-source="dataList"
        :options="opts"
        :data-set-options="{id: 'id'}"
      />

      <sui-page-footer>
      <div class="comm_btn_wrap mt10">
        <div class="right_box">
          <!-- 닫기 -->
          <ur-button 
          @click="onClickClose()">
            {{ $t("MSG_BTN_CLOSE") }}
          </ur-button>

          <!-- 선택 -->
          <ur-button color="violet"
          @click="onClickSelect()">
            {{ $t("MSG_BTN_SELT") }}
          </ur-button>
        </div>
      </div>
    </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component'

export default {
  name: 'PGE_AAE_00045',
  components: {
  },
  props: {
    pageInitialData : {
      lovgrpKindCd: { type: String, default: null },
      memshpClassCd:{ type: String, default: null },
      lvlCd:{ type: String, default: null },
      chips:{ type: Object, default: {}}
    },
    
    closePagePopup: {
      type: Function,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      codeKeyList: ['COD_IA_LOVGRP_MEMSHP_CD', 'COD_IA_LOVGRP_LV_CD'],
      codes: { COD_IA_LOVGRP_MEMSHP_CD: [], COD_IA_LOVGRP_LV_CD: []},

      // 테이블 옵션
      opts: { 
        noInfo: false,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
      },
      columns:[],
      dataList: new urDataSet(),
      updateYN : false,
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    let that = this
    //공통코드 셋팅 및 초기화
    http.mergeCodeList(this.$options.name, this.codeKeyList, this.codes).then(() => {

      this.columns =  [
        //멤버십
        { text: this.$t('MSG_TXT_MEM_SHP'), value: 'memshpClassCd', type:'code', domain:this.codes.COD_IA_LOVGRP_MEMSHP_CD, },
        //레벨
        { text: this.$t('MSG_TXT_LEVEL'), value: 'lvlCd', type:'code', domain:this.codes.COD_IA_LOVGRP_LV_CD, },
        //클래스
        {
          text: this.$t('MSG_TXT_CLASS'),
          value: 'classGrpName',
          required: true,
          component: {
            props: ['row','value','text', 'me'],
            template: '<div><ur-text-field v-model="row.classGrpName" @input="inputClassGrpName"/></div>',
            methods:{
              inputClassGrpName(v){
                that.dataList.setRowValue(this.row, 'classGrpName', v)
                if(this.row.oldClassGrpName != v){
                  that.updateYN = true;
                }
              }
            }
          },
        },
      ]
      this.selectClassBanList();
    }).catch(() => {});
  },
  mounted() {
  },
  methods: {

    /***************************************
     * 클래스 반 목록 조회
     ****************************************/
    selectClassBanList(){
      if(this.pageInitialData.lovgrpKindCd == '' && this.pageInitialData.memshpClassCd == '' && this.pageInitialData.lvlCd == '') return;
      //검색조건
      var queryParams = {
                            lovgrpKindCd: this.pageInitialData.lovgrpKindCd,
                            memshpClassCd: this.pageInitialData.memshpClassCd,
                            lvlCd: this.pageInitialData.lvlCd,
                          };
      http.request(this.$options.name, 'DTS_AAE_00017', {
        query: queryParams,
      }).then(res => {
        this.$refs.grid.setData(res.data.selectList);
        this.updateYN = false;
        this.checkChip();
      }).catch(error => {
        console.log(error);
      });
    },

    //파람으로 받은 클래스(반) 목록으로 그리드에 체크박스 하는 로직
    checkChip(){
      const list = this.$refs.grid.getData();
      if(this.pageInitialData.chips.length > 0){
        for(var i = 0; i < this.pageInitialData.chips.length ; i++){
          list.forEach(ele => {
            if(ele.classGrpId == this.pageInitialData.chips[i].value){
              this.$refs.grid.selectRow(ele, true);
            }
          });
        }
      }
    },

    //row 추가
    onClickRowAdd(){
      const newRow = this.makeRow()
      this.$refs.grid.addRow(newRow,'TOP')
      this.updateYN = true;
    },

    // 추가 할 row 값 셋팅
    makeRow(){
      return { lovgrpKindCd : this.pageInitialData.lovgrpKindCd,
                memshpClassCd :this.pageInitialData.memshpClassCd,
                lvlCd : this.pageInitialData.lvlCd,
                classGrpName : ""
              }
    },

    //row 삭제
    onClickRowDelete(){
      let delRows = this.$refs.grid.getSelected();
      for(var i = 0;  i < delRows.length; i++){
        this.$refs.grid.removeRow(delRows[i], false);
      }
      this.updateYN = true;
    },

    /***************************************
     * 저장
     ****************************************/
    onClickSave(){
      //유효성 체크
      if(this.isValidation()){
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => { // 저장하시겠습니까?
          http.request(this.$options.name, 'DTS_AAE_00018', {
            data: this.getParam(),
          }).then(res => {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA')); //저장되었습니다.
            this.selectClassBanList();
          });
        });
      }
    },

    //유효성 체크
    isValidation(){
      const list = this.dataList.data
      for (let i = 0; i < list.length; i++) {
        if (utils.isEmpty(list[i].classGrpName)) {
          const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'),this.$t('MSG_TXT_CLASS')) // {클래스}은(는) 필수 항목입니다.
          utils.messageBox('warning', msg)
          return false
        }
      }
      return true;
    },

    //저장 데이터 셋팅
    getParam(){
      const { data } = this.dataList
      const { updated, removed } = this.dataList.getChanged()
      const insertList = data.filter(item => utils.isEmpty(item.classGrpId))
      const deleteList = removed.filter(item => !utils.isEmpty(item.classGrpId))
      const updateList = updated.filter(item => {
          const map = deleteList.map(d => d.classGrpId)
          return !map.includes(item.classGrpId)
        })
      const saveData = {}
      saveData.insertList = insertList
      saveData.deleteList = deleteList
      saveData.updateList = updateList
      return saveData;
    },

    /***************************************
    * 초기화
    ****************************************/
    onClickReset(){
      this.dataList = new this.$ur.grid.DataSet()
      this.$refs.grid.setData(this.dataList);
      this.updateYN = true;
    },

    /***************************************
    * 닫기
    ****************************************/
    onClickClose(){
      this.closePagePopup('Close');
    },

    //사랑단 이미지 관리 메인으로 이동하기
    onClickSelect(){
      if(this.updateYN){
        utils.messageBox('warning', this.$t('MSG_ALT_MOD_USABLE')) //수정 된 데이터가 존재합니다. 저장 후 선택 가능합니다.
        return;
      }

      let chips = this.$refs.grid.getSelected();
      if(chips.length < 1){
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM')) //선택된 항목이 없습니다.
        return;
      }
      this.closePagePopup(chips);
    },


  },
}
</script>
  <style scoped />
