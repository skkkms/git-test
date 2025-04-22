<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 외부 API 정보-->
      <div class="comm_title_wrap">
        <h4>{{ $t('MSG_TIT_EX_API_INFO') }}</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_CALL_KIND')"
          :label-align="'right'"
          style="width: 100%; height:auto;"
          :required="true"
          class="flex_wrap"
        >
          <ur-text-field
            style="width:50%; height:auto"
            value=""
            v-model="callKind"
            ref="callKind"
            :rules="$rules.getRules('not_empty')"
            readonly="true"
            fixed-message
            maxlength="2"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_CALL_NM')"
          :label-align="'right'"
          style="width: 100%; height:auto;"
          :required="true"
          class="flex_wrap"
        >
          <ur-text-field
            style="width:50%; height:auto"
            value=""
            v-model="callName"
            ref="callName"
            :rules="$rules.getRules('not_empty')"
            fixed-message
            maxlength="150"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_CALL_DESCR')"
          :label-align="'right'"
          style="width: 100%; height:auto;"
          :required="true"
          class="flex_wrap"
        >
          <ur-text-field
            style="width:100%; height:auto"
            value=""
            v-model="callDescrt"
            ref="callDescrt"
            :rules="$rules.getRules('not_empty')"
            fixed-message
            maxlength="2000"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_DTST_USE_YN')"
          :label-align="'right'"
          style="width: 100%; "
          :required="true"
        >
          <ur-radio
            v-model="useYn"
            sm
            value="Y"          
          >
            {{ $t('MSG_TXT_USE') }}
          </ur-radio>
          <ur-radio
            v-model="useYn"           
            sm
            value="N"           
          >
            {{ $t('MSG_TXT_NOT_USE') }}
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_RGST_USR')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{fstRgstUsrId}}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_RGST_DTM')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{fstRgstDtm}}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_MDFC_USR')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{fnlMdfcUsrId}}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_MDFC_DTM')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{fnlMdfcDtm}}
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 외부 API 정보-->

      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap ">
          <div class="left_box">
            <ur-button v-permission:read="this.$options.name"
              color="violet"
              @click="list"
            >
              {{ $t('MSG_BTN_LIST') }}
            </ur-button>
          </div>
          <div class="right_box">
            <ur-button v-permission:update="this.$options.name"
              color="violet"
              @click="save"
            >
              {{ $t('MSG_BTN_SAVE') }}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAI_00007', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      callKind: '',
      callName: '',
      callDescrt: '',
      useYn: '',
      toDate: '',
      userId: '',
      fstRgstUsrId: '',
      fstRgstDtm: '',
      fnlMdfcUsrId: '',
      fnlMdfcDtm: ''
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
      callKind: this.$route.params.callKind,
    };

    http.request(this.$options.name, 'DTS_AAI_00031', {
      query: param,
    }).then(res => {
      this.callKind = res.data.callKind;
      this.callName = res.data.callName;
      this.callDescrt = res.data.callDescrt;
      this.useYn = res.data.useYn;
      this.fstRgstUsrId = res.data.fstRgstUsrId;
      this.fstRgstDtm = utils.dateformatToClient(res.data.fstRgstDtm);
      this.fnlMdfcUsrId = res.data.fnlMdfcUsrId;
      this.fnlMdfcDtm = utils.dateformatToClient(res.data.fnlMdfcDtm);
    
    }).catch(error => {
      console.log('error : ',error);
    });
  },
  methods: {
    // 목록
    list() {
      utils.goPage('PGE_AAI_00004', {callName: this.$route.params.callName});
    },

    // 저장
    save() {

      if (!this.$rules.validate(this.$refs.callKind)) {
        utils.messageBox("alert", this.$t('MSG_ALT_CALL_KIND_INPUT'));
        return;
      }

      if (!this.$rules.validate(this.$refs.callName)) {
        utils.messageBox("alert", this.$t('MSG_ALT_CALL_NM_INPUT'));
        return;
      }

      if (!this.$rules.validate(this.$refs.callDescrt)) {
        utils.messageBox("alert", this.$t('MSG_ALT_CALL_DESCR_INPUT'));
        return;
      }

      const param = {
        callKind : this.callKind,
        callName : this.callName,
        callDescrt : this.callDescrt,
        useYn : this.useYn
      };

      http.request(this.$options.name, 'DTS_AAI_00033', {
        data: param,
      }).then(res => {
        utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
        utils.goPage('PGE_AAI_00004', {callName: this.$route.params.callName});
       
      }).catch(error => {
        console.log('error : ',error);
      });
    },
  },
}
</script>
<style scoped>
</style>
