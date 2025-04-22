<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- :: UX Writing 상세 -->
      <div class="comm_title_wrap mt45">
        <h4>
          {{ $t("MSG_TXT_EXPOSR_INFO") }}
        </h4>
        <span class="subscript_txt">
          {{$t('MSG_TXT_EXPOSR_INFO2')}}
        </span>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_KIND')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{ data.parkKindNm }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_VST_STTS')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{ data.visitStatusNm }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{ data.exposrYn }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_PERIOD')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{ data.exposrPeriodStartDtm }} ~ {{ data.exposrPeriodEndDtm }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_COND')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
        {{data.occrCondNm}}
          <ur-icon-button
            icon="search" class="ml16"
            icon-type="line"
            color="primary"
            @click="openCondInfoSettng"
          />
        </ur-form-item>

      </ur-form-box>
      <!-- ::E 노출 정보 01 -->

      <!-- ::S 노출 정보 02-->
      <div class="comm_title_wrap mt45">
        <h4>
          {{ $t("MSG_TXT_EXPOSR_INFO") }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_LANG_DIV')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          {{ data.langKindNm }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_TXT')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          {{ data.exposrDescrt }}
        </ur-form-item>
        
        <ur-form-item
          :label="$t('MSG_TXT_CONN_URL')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          {{ data.connUrl }}
        </ur-form-item>
      </ur-form-box>
      <!-- ::E 노출 정보 02 -->

      <div class="bt1 mt45">
        <sui-page-footer class="comm_btn_wrap">
          <div class="btn_wrap">
            <div class="left_box">
              <!-- 목록 -->
              <ur-button
              v-permission:read="this.$options.name"
              @click="onClickList">
                {{ $t("MSG_BTN_LIST") }}
              </ur-button>
            </div>
            <div class="right_box">
              <!-- 수정 -->
              <ur-button
                v-permission:update="this.$options.name"
                @click="onClickMdfc"
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
  name: 'PGE_AAB_00039',
  components: {
  },
  data() {
    return {
      publctId : "",
      data : {
        parkKindNm : ""
        , visitStatusNm: ""
        , langKindNm: ""
        , exposrDescrt: ""
        , exposrDescrt2: ""
        , exposrDescrt3: ""
        , exposrPeriodStartDtm:""
        , exposrPeriodEndDtm:""
        , exposrNm: ""
        , exposrOrder: 0
        , connUrl: ""
        , delYn: ""
        , fstRgstDtm: ""
        , fstRgstUsrId: ""
        , fnlMdfcDtm: ""
        , fnlMdfcUsrId: ""
        , selectCondCdList: []
      }
    }
  },
  computed: {
  
  },
  watch: {
  },
  created() {
    const params = utils.getParameter(this, 'params')
    this.publctId = params.publctId;
    if(!utils.isEmpty(this.publctId)){
      //상세조회
      this.fnSelectUxWritingDetail();
    }else{
      //파람이 없을 경우 목록으로 이동
      this.onClickList();
    }
  },
  mounted() {
  },
  methods: {
    /***************************************
     * 조건정보설정 팝업 띄우기
     ****************************************/
    openCondInfoSettng() {
      const selectOccrCond = this.data.selectCondCdList;
      utils.openLayerPopup('PGE_AAD_00001', this.onCondInfoSettngCallback, {
        pageInitialData: { 
          inputType : 'S',
          publctId : this.publctId,
          selectCondCdList: selectOccrCond
          },
        size: 'lg',
      });
    },
    //팝업 콜백
    onCondInfoSettngCallback(nodeData) {
    },

    /***************************************
     * 조회
     ****************************************/
    fnSelectUxWritingDetail(){
      const queryParams = {
                              publctId: this.publctId
                          };

      http.request(this.$options.name, 'DTS_AAD_00004', {
        query: queryParams,
      }).then(res => {
        this.data = res.data;
        this.data.exposrPeriodStartDtm = utils.toStringByFormat(this.data.exposrPeriodStartDtm, 'YYYY-MM-DD HH:mm');
        this.data.exposrPeriodEndDtm = utils.toStringByFormat(this.data.exposrPeriodEndDtm, 'YYYY-MM-DD HH:mm');
      }).catch(error => {
        console.log(error);
      });
    },


    //Ux Writing 관리 목록으로 이동
    onClickList(){
      const params = utils.getParameter(this, 'params')
      delete params.publctId
      utils.goPage('PGE_AAB_00029', { params })
    },

    //Ux Writing 수정으로 이동
    onClickMdfc(){
      const params = utils.getParameter(this, 'params')
      params.publctId = this.publctId
      utils.goPage('PGE_AAB_00040', { params })
    }
  },
}
</script>
<style scoped>
</style>
