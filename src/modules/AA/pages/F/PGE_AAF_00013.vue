<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 어트랙션 예약현황 -->
      <ur-form-box toggleable>
        <!-- [검색조건] 영업일자 -->
        <ur-form-item
          :label="$t('MSG_TXT_MEMSHP_UID')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          required
        >
          <ur-text-field
            v-model="params.memshpUid"
            style="height:auto;"
          />
          <ur-button color="violet"
            @click="searchMemshpUid"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </ur-button>
        </ur-form-item>
        <!-- [검색조건] 시설 카테고리 -->
        <ur-form-item
          :label="$t('MSG_TXT_HOME_ID')"
          :label-align="'right'"
          display="grid"
          :span="1"
          style="width: 100%;height: auto;"
          required
        >
          <ur-text-field
            v-for="item in userIdList"
            :key="item.usrId"
            :value="item.usrId"
            v-model="item.usrId"
            style="height: auto;"
            readonly
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_LOGIN_ID')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          required
        >
          <ur-text-field
            v-model="params.loginId"
            style="height:auto;"
          />
          <ur-button
            @click="checkLoginId"
            color="primary"
            :disabled="checkBtnShowFlag"
          >
            {{ $t('MSG_BTN_DUPLICATE_CHECK') }}
          </ur-button>
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_PW')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          required
        >
          <ur-text-field
            v-model="params.passWord"
            style="height:auto;"
            placeholder="everland2024"
            readonly
          />
          <ur-button
            @click="onSave" color="violet"
            :disabled="saveBtnShowFlag"
          >
            {{ $t('MSG_BTN_IAM_SAVE') }}
          </ur-button>
        </ur-form-item>
        <sui-page-footer>
          <div class="comm_btn_wrap" />
        </sui-page-footer>
      </ur-form-box>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: 'PGE_AAF_00013', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      checkBtnShowFlag: true,
      saveBtnShowFlag: true,
      userIdList: [],
      params: {
        memshpUid: '',
        homeId: '',
        loginId: '',
        passWord: '',
      },
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
  },
  methods: {
    searchMemshpUid() {
      this.params.loginId = ''
      if (utils.isEmpty(this.params.memshpUid)) {
        utils.messageBox('warning', this.$t('MSG_ALT_MEMSHP_UID_IS_EMPTY'))
        return
      }
      const queryParams = {
        memshpUid: this.params.memshpUid,
      }
      http.request(this.$options.name, 'DTS_AAF_00025', {
        query: queryParams,
      }).then(res => {
        this.userIdList = res.data
        if (!utils.isEmpty(this.userIdList)) {
          if(this.userIdList.length>1){
            this.checkBtnShowFlag = true
            this.saveBtnShowFlag = true
          }else{
            for (var i = 0; i < this.userIdList.length; i++) {
              if (this.userIdList[i].usrId.substring(0, 4) == 'FB##') {
                this.checkBtnShowFlag = false
                break;
              } else {
                this.checkBtnShowFlag = true
                this.saveBtnShowFlag = true
              }
            }
          }
        }else{
          this.checkBtnShowFlag = true
        }
      }).catch(error => {
        console.log(error)
      })
    },
    checkLoginId() {
      this.saveBtnShowFlag = true
      if (utils.isEmpty(this.params.loginId)) {
        utils.messageBox('warning', this.$t('MSG_ALT_LGOIN_ID_IS_EMPTY'))
        return
      }
      if (utils.isEmpty(this.params.memshpUid)) {
        utils.messageBox('warning', this.$t('MSG_ALT_MEMSHP_UID_IS_EMPTY'))
        return
      }
      const queryParams = {
        loginId: this.params.loginId,
        memshpUid: this.params.memshpUid,
      }
      http.request(this.$options.name, 'DTS_AAF_00026', {
        query: queryParams,
      }).then(res => {
        console.log(res)
        if(res.data){//count>0
          utils.messageBox('warning', this.$t('로그인 ID가 이미 존재되어 있습니다.'))
          this.saveBtnShowFlag = true
        }else{
          this.saveBtnShowFlag = false
        }
      }).catch(error => {
        console.log(error)
      })
    },
    onSave() {
      const queryParams = {
        loginId: this.params.loginId,
        memshpUid: this.params.memshpUid,
      }
      utils.messageBox("confirm", this.$t("MSG_ALT_IS_SAV_DATA"), null, () => {
        http.request(this.$options.name, 'DTS_AAF_00027', {
          query: queryParams,
        }).then(res => {
          utils.messageBox('alert', this.$t('MSG_ALT_SAVE_DATA'))
          this.params.loginId = ''
          this.params.memshpUid = ''
          this.userIdList = ''
          this.saveBtnShowFlag = true
          this.checkBtnShowFlag = true
        }).catch(error => {
          console.log(error)
        })
      })
    },
  },
}
</script>
<style scoped>
</style>
