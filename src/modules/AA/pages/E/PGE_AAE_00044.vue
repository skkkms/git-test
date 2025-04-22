<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="$options.name" />
    <!-- 사랑단 이미지 관리 상세 -->
    <sui-page-contents>
      <!-- 사랑단 이미지 정보 -->
      <div class="comm_title_wrap">
        <h4>
          {{$t('MSG_TXT_LOV_IMG_INFO')}}
        </h4>
      </div>
      <ur-form-box toggleable>
        <!-- 사랑단 분류 -->
        <ur-form-item
          :label="$t('MSG_TXT_LOVGRP_KIND_CD')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          {{detailData.lovgrpKindCdNm}}
        </ur-form-item>

        <!-- 활동일 -->
        <ur-form-item
          :label="$t('MSG_TXT_ACTIVITY_DATE')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
        {{detailData.activityDate}}
        </ur-form-item>

        <!-- 활동제목 -->
        <ur-form-item
          :label="$t('MSG_TXT_ACTIVITY_TITLE')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
        {{detailData.activitySubject}}
        </ur-form-item>

        <!-- 멤버십-->
        <ur-form-item
          :label="$t('MSG_TXT_MEM_SHP')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
        {{detailData.memshpClassCdNm}}
        </ur-form-item>

        <!-- 오픈여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_OPEN_YN')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
        {{detailData.openYnNm}}
        </ur-form-item>

        <!-- 레벨 -->
        <ur-form-item
          :label="$t('MSG_TXT_LEVEL')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
        {{detailData.lvlCdNm}}
        </ur-form-item>

        <!-- 프로젝트 -->
        <ur-form-item
          :label="$t('MSG_TXT_LOV_PROJECT')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
        {{detailData.pjtYn}}
        </ur-form-item>

        <!-- 활동반가입년도 -->
        <ur-form-item
          :label="$t('MSG_TXT_LOV_ACTIVITY_YYYY')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
        {{detailData.activityGrpJoinYy}}
        </ur-form-item>

        <!-- 활동 사진 -->
      </ur-form-box>
      <div class="comm_title_wrap mt35">
        <div class="comm_title_wrap">
          <h4>
            {{$t('MSG_TXT_ACTIVITY_PHOTO')}}
          </h4>
        </div>
        <!-- 클래스(반)-->
        <div class="left_box pl16">
          <ur-dropdown v-model="classGrpId" :items="inputChips" style="width:350px;" class="pr10" @input="setGridFilter()" no-select="no-select" :msg-no-select="$t('MSG_TXT_SEL')"/>
        </div>
      </div>

      <ur-data-grid
        ref="grid"
        :headers="columns"
        :data-source="gridData"
        :options="opts"
        :data-set-options="{id: 'id'}"
      />

      <div class="bt1 mt45">
        <sui-page-footer class="comm_btn_wrap">
          <div class="btn_wrap">
            <div class="left_box">
              <!-- 목록 -->
              <ur-button v-permission:read="$options.name" @click="onClickList">
                {{ $t("MSG_BTN_LIST") }}
              </ur-button>
            </div>
            <div class="right_box">
              <!-- 수정 -->
              <ur-button v-permission:update="$options.name" @click="onClickMdfc"
                color="violet"
              >
              {{ $t("MSG_BTN_MDFC") }}
              </ur-button>
            </div>
          </div>
        </sui-page-footer>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAE_00044',
  components: {
  },
  data() {
    return {
      //공통코드
      codeKeyList: ['COD_IAA_LOVGRP_OPEN_YN'],
      codes: { COD_IAA_LOVGRP_OPEN_YN:[]},
      opts: {
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
        resizableColumn: true,
        rowHeight: 'auto', 
        
      },
      detailData: {
                    lovgrpKindCd: ''
                  , activityDate: ''
                  , activitySubject: ''
                  , memshpClassCd: ''
                  , openYn: ''
                  , lvlCd: ''
                  , pjtYn: ''
                  , classGrp: ''
                  , activityGrpJoinYy: ''
      },
      gridData: [],
      classGrpId: '',
      inputChips: [],
    }
  },
  computed: {
    columns() {
      const that = this
      const columns = [
      {
          text: 'No.',
          value: 'rowNum',
          width: 50,
        },
        {
          text: this.$t('MSG_TXT_FILE_NM'),
          value: 'fileImagUrl',
          component: {
            props: ['row','value','text', 'me'],
            template: `<div class="pdCol10" style="flex-direction: column;">
                          <div style="display: flex; flex-direction: row; align-items: center;">
                            <cmp-single-file-uploader mode="SELECT" v-model="row.fileImagUrl" :page-id="pageId" accepts="jpg,png,gif" pixels="176*176" text-field-width="calc(100% - 96px)"/>
                          </div>
                        </div>`,
            computed: {
              pageId() {
                return that.$options.name
              },
            },
          },
        },
        {
          text: '',
          value: 'altTag',
        },
        {
          text: this.$t('MSG_TXT_OPEN_YN'), value: 'exposrYn', type:'code', domain:this.codes.COD_IAA_LOVGRP_OPEN_YN
        },
        { hide: true, value: 'classGrpId' }, // 클래스(반)
      ]
      return columns
    }
    
  },
  watch: {
  },
  created() {
    const params = utils.getParameter(this, 'params')
    this.activityId = params.activityId;

    //공통코드 셋팅 및 초기화
    http.mergeCodeList(this.$options.name, this.codeKeyList, this.codes).then(() => {
      //상세조회
      this.fnSelectDetail();
    }).catch(() => {});
  },
  mounted() {
  },
  methods: {

    /***************************************
     * 상세조회
     ****************************************/
     fnSelectDetail(){
      http.request(this.$options.name, 'DTS_AAE_00014', {
        path: {
          'activity-id': this.activityId,
        },
      }).then(res => {
        this.detailData = res.data;
        this.detailData.activityDate = utils.toStringByFormat(this.detailData.activityDate, 'YYYY-MM-DD');
        this.gridData = res.data.selectImgList;
        this.makeInputChip(res.data.classBanInfoList); //클래스(반) 셋팅
      }).catch(error => {
        console.log(error);
      });
    },

    /***************************************
     * Chips 관련
     ****************************************/
    makeInputChip(bansList){
      if(bansList != null && bansList.length>0){
        bansList.forEach(ban => {
          this.inputChips.push({'text':ban.classGrpName, 'value':ban.classGrpId})
        })
        this.classGrpId =this.inputChips[0].value
      }
      this.setGridFilter() //그리드 필터 적용
    },

    /***************************************
     * 그리드 필터 적용
    ****************************************/
    setGridFilter(){
      this.$refs.grid.filter({classGrpId:this.classGrpId});
    },

    //사랑단 이미지 관리 목록으로 이동
    onClickList(){
      const params = utils.getParameter(this, 'params')
      delete params.activityId
      utils.goPage('PGE_AAE_00042', { params })
    },

    //사랑단 이미지 관리 수정으로 이동
    onClickMdfc(){
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAE_00043', { params })
    }

  },
}
</script>
<style scoped>
</style>
