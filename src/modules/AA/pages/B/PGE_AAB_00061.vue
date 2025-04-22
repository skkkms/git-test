<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div>
        <template slot="title">
          <div class="modal-title mb45">
            가상대기 취소 안내
          </div>
        </template>
        <template>
          <div class="modal-body">
            <!-- ::S 콘텐츠1 -->
            <ur-form-box
              toggleable
              class="mb10"
            >
              <ur-form-item
                label="알림 Push 메세지"
                :label-align="'right'"
                style="width: 100%; height: auto;"
                required
              >
                <ur-dropdown
                  v-model="vlineWaitCnclPushMsgCd"
                  :items="codes.COD_IA_VLINE_WAIT_CNCL_PUSH_MSG"
                  style="width: 210px; height: auto;"
                  no-select="no-select"
                  :msg-no-select="$t('MSG_TXT_SELT')"
                />
              </ur-form-item>
              <ur-form-item
                label="지급 쿠폰"
                :label-align="'right'"
                style="width: 100%; height: auto;"
              >
                <ur-text-field
                  :value="couponName"
                  readonly
                />
                <ur-icon-button
                  icon="search"
                  icon-type="line"
                  color="primary"
                  @click="openCouponPopup"
                />
              </ur-form-item>
            </ur-form-box>
            <!-- ::E 콘텐츠1 -->
          </div>
          <div class="comm_btn_wrap bt1 mt45">
            <div class="right_box mt10">
              <ur-button
                @click="onClose"
              >
                {{ $t('MSG_BTN_CLOSE') }}
              </ur-button>
              <ur-button
                color="violet"
                @click="onSave"
              >
                {{ $t('MSG_BTN_SAVE') }}
              </ur-button>
            </div>
          </div>
        </template>
      </div>
    </sui-page-contents>
  </sui-page>
</template>

<script>

export default {
  name: 'PGE_AAB_00061', // eslint-disable-line vue/name-property-casing
  components: {
  },
  props: {
    pageInitialData: {
      type: Object,
      default() {
        return {}
      },
    },
    closePagePopup: {
      type: Function,
      default() {
        return null
      },
    },
  },
  data() {
    return {
      CODE_KEYS: [
        'COD_IA_VLINE_WAIT_CNCL_PUSH_MSG',
      ],
      codes: {
        COD_IA_VLINE_WAIT_CNCL_PUSH_MSG: [],
      },
      faciltId: '',
      vlineWaitCnclPushMsgCd: '',
      masterId: '',
      couponMasterNo: '',
      couponName: '',
      issueSeq: '',
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    contextPageId() {
      // return this.$attrs['page-id']
      return this.$options.name
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
    // [코드 조회]
    http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
  },
  methods: {
    openCouponPopup() {
      // 쿠폰 리셋
      this.masterId = ''
      this.couponMasterNo = ''
      this.couponName = ''
      this.issueSeq = ''

      //utils.openLayerPopup('PGE_AAB_00062', this.couponPopupCallback, {
      utils.openLayerPopup('PGE_AAX_00001', this.couponPopupCallback, {
        size: 'xlg',
      })
    },
    couponPopupCallback(returnData) {
      if (!utils.isEmpty(returnData)) {
        this.masterId = returnData.masterId
        this.couponMasterNo = returnData.couponMasterNo
        this.couponName = returnData.couponName
        this.issueSeq = returnData.issueSeq
      }
    },
    onSave() {
      console.log('onSave')
      const data = {
        vlineWaitCnclPushMsgCd: this.vlineWaitCnclPushMsgCd,
        masterId: this.masterId,
        couponMasterNo: this.couponMasterNo,
        couponName: this.couponName,
        issueSeq: this.issueSeq,
        faciltId: this.pageInitialData.faciltId,
        vlineWaitCancelList: [],
      }
      if (!utils.isEmpty(this.pageInitialData.vlineWaitCancelList) && this.pageInitialData.vlineWaitCancelList.length > 0) {
        data.vlineWaitCancelList = this.pageInitialData.vlineWaitCancelList
      }

      if (this.validated(data)) {
        utils.messageBox('confirm', this.$t(`총 ${data.vlineWaitCancelList.length}건의 가상대기 예약이 취소 됩니다. 계속하시겠습니까?`), null, () => { // 저장하시겠습니까?
          console.log('REQ DATA:', data)
          const serviceName = 'DTS_AAB_00041'
          http.request(this.contextPageId, serviceName, {
            query: {},
            path: {},
            data,
          }).then(res => {
            console.log('RES', res.data)
            if (res.data.resultCode === '-1') {  // -1 이면 서버 메시지를 그대로 표시한다.
              utils.messageBox('warning', res.data.msg)
            } else if (res.data.resultCode === '0') {
              utils.messageBox('warning', this.$t('가상대기를 취소하는데 실패하였습니다.'))
            } else {
              utils.messageBox('warning', this.$t('가상대기 취소에 성공하였습니다.'))
              this.closePagePopup('SAVE_SUCCESS')
            }
          }).catch(error => {
            console.log(error)
          })
        })
      }
    },
    validated(data) {
      // 필수항목
      if (!this.$rules.validate(this)) {
        utils.messageBox('warning', this.$t('필수 항목이 입력되지 않았습니다.'))
        return false
      }

      if (utils.isEmpty(data.vlineWaitCnclPushMsgCd)) {
        utils.messageBox('warning', this.$t('알림 Push 메시지가 선택되지 않았습니다.'))
        return false
      }

      /*
      if (utils.isEmpty(data.couponMasterNo)) {
        utils.messageBox('warning', this.$t('쿠폰이 선택되지 않았습니다.'))
        return false
      }
      */

      return true
    },
    onClose() {
      this.closePagePopup('Close')
    },
  },
}
</script>
<style scoped>
</style>
