<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap mt45">
        <h4>
          {{ $t("MSG_TXT_APP_VER_INFO") }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_OSKIND')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
        {{ data.osKindCdNm }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_VER')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
        {{ data.ver }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_FRCD_YN')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
        {{ data.coercReflYn }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_NOTE')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
        {{ data.memoDescrt }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_RGST_USR')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
        {{ data.fstRgstUsrId }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_RGST_DTM')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
        {{ data.fstRgstDtm | dateFormat }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_MDFC_USR')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
        {{ data.fnlMdfcUsrId }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_MDFC_DTM')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
        {{ data.fnlMdfcDtm | dateFormat }}
        </ur-form-item>
      </ur-form-box>
      <div class="bt1 mt10" />

      <!-- [하단: 버튼]-->
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
        </div>
      </sui-page-footer>

    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAE_00011',
  components: {
  },
  filters: {
    dateFormat(date) {
      if (!date) return '';
      return utils.dateformatToClient(date);
    },
  },
  data() {
    return {
      osKindCd : "",
      hstSeqNo : "",
      data : {
        osKindCd : ""
        , hstSeqNo: ""
        , ver: ""
        , coercReflYn: ""
        , memoDescrt: ""
        , tenantId: ""
        , delYn: ""
        , fstRgstDtm: ""
        , fstRgstUsrId: ""
        , fnlMdfcDtm: ""
        , fnlMdfcUsrId: ""
      }
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    const params = utils.getParameter(this, 'params')
    this.osKindCd = params.detailOsKindCd
    this.hstSeqNo = params.hstSeqNo   
  },
  mounted() {
    if(!utils.isEmpty(this.osKindCd) && !utils.isEmpty(this.hstSeqNo)){
      //상세조회
      this.fnSelectAppVerDetail();
    }else{
      //파람이 없을 경우 목록으로 이동
      this.onClickList();
    }
  },
  methods: {
    //검색
    fnSelectAppVerDetail(){
      const queryParams = {
                              osKindCd: this.osKindCd
                            , hstSeqNo: this.hstSeqNo
                          };

      http.request(this.$options.name, 'DTS_AAI_00004', {
        query: queryParams,
      }).then(res => {
        this.data = res.data;
      }).catch(error => {
        console.log(error);
      });
    },

    //앱버전 관리 목록으로 이동
    onClickList(){
      const params = utils.getParameter(this, 'params')
      delete params.detailOsKindCd
      delete params.hstSeqNo
      utils.goPage('PGE_AAE_00009', { params })
    }
    
  },
}
</script>
<style scoped>
</style>
