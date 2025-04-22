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
          required
          style="width: 100%; height: auto;"
        >
           <ur-text-field
            v-model="picUsrId"
            value=""
            style="width: 100%; height: auto;"
            :readonly=true
            v-show="false"
          />
          <ur-text-field
            v-model="picUsrNm"
            value=""
            style="float: right; margin-left: -1px; width: 100%; height: auto;"
            :readonly=true
          />
          <ur-icon-button
            icon="search"
            icon-type="line"
            color="primary"
            @click="openModal"
            style="margin-left: 10px"
          />

          <!-- ::S 사용자검색 팝업 -->
          <ur-modal
            ref="modalP01"
            class="modal-b1c6"
            xlarge
            dragable
            :title="$t('MSG_TIT_IAA_H04')"
            @closed="closed"
          >
            <template slot="title">
              <div class="modal-title mb45">
                {{$t('MSG_TIT_IAA_H04')}}
              </div>
            </template>
            <template>
              <div class="modal-body">
                <P01 ref="modal"/>
                <!-- ::E 콘텐츠2 -->
              </div>
            </template>
            <template
              slot="action"
            >
              <ur-button
                @click="closeModal"
              >
                {{$t('MSG_BTN_CLOSE')}}
              </ur-button>
              <ur-button
                color="violet"
                
              >
                {{$t('MSG_BTN_SELT')}}
              </ur-button>
            </template>
          </ur-modal>
          <!-- ::E 사용자검색 팝업-->
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_PARK_KIND')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="parkKindCd"
            value="01"
            sm
            @input="parkKindChange"
          >
            {{$t('MSG_TXT_EB')}}
          </ur-radio>
          <ur-radio
            v-model="parkKindCd"
            value="02"
            sm
            @input="parkKindChange"
            style="margin-right: 180px;"
          >
            {{$t('MSG_TXT_CB')}}
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_PIC_FACILT')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-multi-dropdown
            v-model="faciltCateKindCd"
            :items="faciltCateElCodes.COD_IA_EL_FACILT_CATE_KIND"
            style="width: 100%; height: auto;"
            placeholder="선택"
          />
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
              @click="save"
            >
              {{$t('MSG_BTN_SAVE')}}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import P01 from './PGE_AAE_00038.vue'
export default {
  name: 'PGE_AAE_00005', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
  },
  data() {
    return {
      picUsrId: '',
      picUsrNm: '',
      parkKindCd: '',
      faciltCateKindCd: [],
      fstRgstUsrId: '',
      fstRgstDtm: '',
      fnlMdfcUsrId: '',
      fnlMdfcDtm: '',
      parkKindCdOri: '',

      // 테이블 옵션
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
     
      faciltCateCbCodeList: ['COD_IA_CB_FACILT_CATE_KIND'],
      faciltCateCbCodes: { COD_IA_CB_FACILT_CATE_KIND: []},
      faciltCateElCodeList: ['COD_IA_EL_FACILT_CATE_KIND'],
      faciltCateElCodes: { COD_IA_EL_FACILT_CATE_KIND: []},
      faciltCateElOriCodeList: ['COD_IA_EL_FACILT_CATE_KIND'],
      faciltCateElOriCodes: { COD_IA_EL_FACILT_CATE_KIND: []}, 
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // modalPopUp
    modalP01() {
      return this.$refs.modalP01
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    http.mergeCodeList(this.$options.name, this.faciltCateCbCodeList, this.faciltCateCbCodes);
    http.mergeCodeList(this.$options.name, this.faciltCateElCodeList, this.faciltCateElCodes);
  },
  mounted() {
    const param = {          
      picUsrId: this.$route.params.picUsrId,
      faciltCateKindCd: this.$route.params.faciltCateKindCd,
      parkKindCdView: this.$route.params.parkKindCdView
    };

    
    console.log("param : "+param);

    // 상세
    http.request(this.$options.name, 'DTS_AAE_00003', {
      query: param,
    }).then(res => {
      this.picUsrId = res.data.picUsrId;
      this.picUsrNm = res.data.picUsrNm;
      this.parkKindCd = res.data.parkKindCd;
      this.parkKindCdOri = res.data.parkKindCd;

      this.init();

      this.fstRgstUsrId = res.data.fstRgstUsrId;
      this.fstRgstDtm = utils.dateformatToClient(res.data.fstRgstDtm);
      this.fnlMdfcUsrId = res.data.fnlMdfcUsrId;
      this.fnlMdfcDtm = utils.dateformatToClient(res.data.fnlMdfcDtm);

      let faciltCateKindItems = [];

      res.data.faciltCateKindCdList.forEach(element => {
        faciltCateKindItems.push({'value': element});
      });

      this.faciltCateKindCd = faciltCateKindItems;
    }).catch(error => {
      console.log('error : ',error);
    });
  },
  methods: {
    init() {      
      //this.faciltCateElCodes.COD_IA_FACILT_CATE_EL.shift();
      this.faciltCateElOriCodes.COD_IA_EL_FACILT_CATE_KIND = this.faciltCateElCodes.COD_IA_EL_FACILT_CATE_KIND;
      //this.faciltCateCbCodes.COD_IA_FACILT_CATE_CB.shift();
      
      if (this.parkKindCd === '01') {
          this.faciltCateElCodes.COD_IA_EL_FACILT_CATE_KIND = this.faciltCateElOriCodes.COD_IA_EL_FACILT_CATE_KIND
      } else if (this.parkKindCd === '02') {
        this.faciltCateElCodes.COD_IA_EL_FACILT_CATE_KIND = this.faciltCateCbCodes.COD_IA_CB_FACILT_CATE_KIND
      }
    },

    openModal() { 
      //this.modalP01.open() 
      utils.openLayerPopup('PGE_AAE_00038', result => {
          console.log('result : ', result)
          if(result !== '' && result !== null && result.length !==  0) {
             if(result[0] === undefined) {
              this.picUsrId = result.empId;
              this.picUsrNm = result.userNm;
            } else {
              this.picUsrId = result[0].empId;
              this.picUsrNm = result[0].userNm;
            }
          }
       }, {
        size: 'lg',
      });
    },
    closeModal() { this.modalP01.close() },
    closed() {},
    
    // 목록
    list() {
      utils.goPage('PGE_AAE_00002', {parkKindCd: this.$route.params.parkKindCd, faciltCateKindCd: this.$route.params.faciltCateKindCdSearch, picUsrNm: this.$route.params.picUsrNm});
    },

    // 저장
    save() {

      if (_.isEmpty(this.picUsrId)) {
        utils.messageBox('alert', this.$t('MSG_ALT_EMPTY_NM'));
        return;
      }

      if (_.isEmpty(this.parkKindCd)) {
        utils.messageBox('alert', this.$t('파크 구분을 선택해 주세요'));
        return;
      }

      if (_.isEmpty(this.faciltCateKindCd)) {
        utils.messageBox('alert', this.$t('MSG_ALT_EMPTY_FACILT'));
        return;
      }

      let faciltCateKindItems = [];

      this.faciltCateKindCd.forEach(element => {
        faciltCateKindItems.push(element.value);
      });

      const param = {
        picUsrId : this.picUsrId,
        picUsrNm : this.picUsrNm,
        parkKindCd : this.parkKindCd,
        parkKindCdOri : this.parkKindCdOri,
        faciltCateKindCdList : faciltCateKindItems,
        pkPicUsrId: this.$route.params.picUsrId,
        pkFaciltCateKindCdList: this.$route.params.faciltCateKindCd.split(',')
      };

      http.request(this.$options.name, 'DTS_AAE_00004', {
        data: param,
      }).then(res => {
        if (res.data.duplicatePk === 'true') {
          utils.messageBox("alert", this.$t('MSG_ALT_ALREADY_PIC_FACILT'));
        } else {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
          utils.goPage('PGE_AAE_00002', {parkKindCd: this.$route.params.parkKindCd, faciltCateKindCd: this.$route.params.faciltCateKindCdSearch, picUsrNm: this.$route.params.picUsrNm});
        }
      }).catch(error => {
        console.log(error);
      });
    },

    // userSelect() {
    //   this.picUsrId = this.$refs.modal.$refs.userSearchGrid.getSelected().empId;
    //   this.picUsrNm = this.$refs.modal.$refs.userSearchGrid.getSelected().userNm;
    //   this.closeModal();
    //   console.log('selectedRows : ', this.$refs.modal.$refs.userSearchGrid.getSelected());
    // },

    parkKindChange() {
      if (this.parkKindCd === '01') {
        this.faciltCateElCodes.COD_IA_EL_FACILT_CATE_KIND = this.faciltCateElOriCodes.COD_IA_EL_FACILT_CATE_KIND
        this.faciltCateKindCd = [];
      } else if (this.parkKindCd === '02') {
        this.faciltCateElCodes.COD_IA_EL_FACILT_CATE_KIND = this.faciltCateCbCodes.COD_IA_CB_FACILT_CATE_KIND
        this.faciltCateKindCd = [];
      }      
    },
  },
}
</script>
<style scoped>
</style>