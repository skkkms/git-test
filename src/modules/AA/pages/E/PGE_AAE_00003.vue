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
          <!-- ::S PGE_AAZ_00022_P01 -->
          <ur-modal
            ref="modalP01"
            xlarge
            dragable
            :title="$t('MSG_TIT_IAA_H04')"
            @closed="closeModal"
          >
            <P01 ref="modal" />
            <!-- :page-id="contextPageId" -->
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
          <!-- ::S 사용자검색 팝업 -->

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
          {{userId}}
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_RGST_DTM')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{toDate}}
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_MDFC_USR')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{userId}}
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_MDFC_DTM')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{toDate}}
        </ur-form-item>
        <!-- ::E 담당자 정보 -->
      </ur-form-box>
      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button
              @click="list"
            >
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
  name: 'PGE_AAE_00003', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
  },
  data() {
    return {
      //담당자 아이디
      picUsrId: '',
      picUsrNm: '',
      // 드롭다운
      faciltCateKindCd: [],
      // 라디오 버튼
      parkKindCd: '',
      // 테이블 옵션
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      toDate: '',
      userId: '',

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
    this.toDate = this.getCurrentDate();
    this.userId = this.$store.getters.userInfo.userId;
    http.mergeCodeList(this.$options.name, this.faciltCateCbCodeList, this.faciltCateCbCodes);
    http.mergeCodeList(this.$options.name, this.faciltCateElCodeList, this.faciltCateElCodes);
  },
  mounted() {
    setTimeout(() => this.init(), 500);
    setTimeout(() => this.faciltCateElCodes = [], 500);
    
  },
  methods: {

    getCurrentDate()
    {
        var date = new Date();
        var year = date.getFullYear().toString();

        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month.toString() : month.toString();

        var day = date.getDate();
        day = day < 10 ? '0' + day.toString() : day.toString();

        var hour = date.getHours();
        hour = hour < 10 ? '0' + hour.toString() : hour.toString();

        var minites = date.getMinutes();
        minites = minites < 10 ? '0' + minites.toString() : minites.toString();

        var seconds = date.getSeconds();
        seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();

        return year + "-" + month + "-" + day + ' ' +hour+ ':' + minites + ':' + seconds;
    },

    init() {
      //this.faciltCateElCodes.COD_IA_FACILT_CATE_EL.shift();
      this.faciltCateElOriCodes.COD_IA_EL_FACILT_CATE_KIND = this.faciltCateElCodes.COD_IA_EL_FACILT_CATE_KIND;
      //this.faciltCateCbCodes.COD_IA_FACILT_CATE_CB_NEW.shift();
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
        faciltCateKindCdList : faciltCateKindItems
      };

      http.request(this.$options.name, 'DTS_AAE_00002', {
        data: param,
      }).then(res => {
        if (res.data.duplicatePk === 'true') {
          utils.messageBox("alert", this.$t('MSG_ALT_ALREADY_PIC_FACILT'));
        } else {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
          utils.goPage('PGE_AAE_00002', {parkKindCd: this.$route.params.parkKindCd, faciltCateKindCd: this.$route.params.faciltCateKindCd, picUsrNm: this.$route.params.picUsrNm});
        }
      }).catch(error => {
        console.log(error);
      });
    },

    list() {
      utils.goPage('PGE_AAE_00002', {parkKindCd: this.$route.params.parkKindCd, faciltCateKindCd: this.$route.params.faciltCateKindCdSearch, picUsrNm: this.$route.params.picUsrNm});
    },

    // userSelect(selectUser) {
    //   alert('ok');
    //   this.picUsrId = picUsrId;
    //   this.picUsrNm = picUsrNm;
    //   console.log('popupData : ', picUsrId+' ::: '+picUsrNm);
    // },

    parkKindChange() {
      if (this.parkKindCd === '01') {
        this.faciltCateElCodes.COD_IA_EL_FACILT_CATE_KIND = this.faciltCateElOriCodes.COD_IA_EL_FACILT_CATE_KIND;
        this.faciltCateKindCd = [];
      } else if (this.parkKindCd === '02') {
        this.faciltCateElCodes.COD_IA_EL_FACILT_CATE_KIND = this.faciltCateCbCodes.COD_IA_CB_FACILT_CATE_KIND;
        this.faciltCateKindCd = [];
      }      
    },
  },
}
</script>
<style scoped>
</style>