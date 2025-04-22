<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- ::S 담당자 정보 -->
      <div class="comm_title_wrap ">
        <h4>
          {{$t('MSG_TXT_PIC_INFO')}}
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_EMPL_NM')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          {{picUsrNm}}
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_PARK_KIND')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{parkKindCdNm}}
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_PIC_FACILT')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{faciltCateKindCdNm}}
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_RGST_USR')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{fstRgstUsrId}}
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_RGST_DTM')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{fstRgstDtm}}
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_MDFC_USR')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{fnlMdfcUsrId}}
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_MDFC_DTM')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{fnlMdfcDtm}}
        </ur-form-item>
        <!-- ::E 담당자 정보 -->
      </ur-form-box>
      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button @click="list">
              {{$t('MSG_BTN_LIST')}}
            </ur-button>
          </div>
          <div class="right_box">
            <ur-button
              color="violet"
              @click="modifyForm"
            >
              {{$t('MSG_BTN_MOD')}}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: 'PGE_AAE_00004', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      picUsrId: '',
      picUsrNm: '',
      parkKindCd: '',
      faciltCateKindCd: '',
      fstRgstUsrId: '',
      fstRgstDtm: '',
      fnlMdfcUsrId: '',
      fnlMdfcDtm: '',
      parkKindCdNm: '',
      faciltCateKindCdNm: ''

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {

    const param = {          
      picUsrId: this.$route.params.picUsrId,
      faciltCateKindCd: this.$route.params.faciltCateKindCd,
      parkKindCdView: this.$route.params.parkKindCdView
    };

    // 상세
    http.request(this.$options.name, 'DTS_AAE_00003', {
      query: param,
    }).then(res => {
      this.picUsrId = res.data.picUsrId;
      this.picUsrNm = res.data.picUsrNm;
      this.parkKindCd = res.data.parkKindCd;
      this.faciltCateKindCd = res.data.faciltCateKindCd;
      this.parkKindCdNm = res.data.parkKindCdNm;
      this.faciltCateKindCdNm = res.data.faciltCateKindCdNm;
      this.fstRgstUsrId = res.data.fstRgstUsrId;
      this.fstRgstDtm = utils.dateformatToClient(res.data.fstRgstDtm);
      this.fnlMdfcUsrId = res.data.fnlMdfcUsrId;
      this.fnlMdfcDtm = utils.dateformatToClient(res.data.fnlMdfcDtm);
    
    }).catch(error => {
      console.log('error : ',error);
    });
  },
  methods: {

    list() {
      utils.goPage('PGE_AAE_00002', {parkKindCd: this.$route.params.parkKindCd, faciltCateKindCd: this.$route.params.faciltCateKindCdSearch, picUsrNm: this.$route.params.picUsrNm});
    },

    modifyForm() {
       utils.goPage('PGE_AAE_00005', {
          picUsrId: this.picUsrId, faciltCateKindCd: this.faciltCateKindCd, parkKindCdView: this.$route.params.parkKindCdView, parkKindCd: this.$route.params.parkKindCd,
          faciltCateKindCdSearch: this.$route.params.faciltCateKindCdSearch, picUsrNm: this.$route.params.picUsrNm
      });
    }
  },
}
</script>
<style scoped>
</style>