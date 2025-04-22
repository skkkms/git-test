<template>
  <ur-modal
      ref="modal"
      xlarge
      dragable
      :title="$t('MSG_TIT_DLOAD_RSN')"
      @closed="closed"
  >
    <div>
      <template slot="title">
        <div class="modal-title mb45">
          {{this.$t('MSG_TIT_DLOAD_RSN')}}
        </div>
      </template>
      <template>
        <div class="modal-body">
          <!-- ::S 콘텐츠1 -->
          <ur-form-box toggleable>
            <ur-form-item
              :label="$t('MSG_TXT_FST_RGST_USR')"
              :label-align="'right'"
              style="width: 50%; height: auto;"
            >
              {{userId}}
            </ur-form-item>
            <ur-form-item
              :label="$t('MSG_TXT_FST_RGST_DTM')"
              :label-align="'right'"
              style="width: 50%; height: auto;"
            >
              {{toDate}}
            </ur-form-item>
            <ur-form-item
              :label="$t('MSG_TXT_CNTN')"
              :label-align="'right'"
              required
              style="width: 100%; height: auto;"
              class="flex_wrap"
            >
              <div style="width: 100%">
                <ur-text-area
                  v-model="reason"
                  rows="4"
                  style="width:100%"
                  max-byte="1000"
                  :rules="$rules.getRules('not_null')"
                />
                <span class="subscript_txt ">
                  {{this.$t('MSG_TXT_EXCEL_DOWN_RSN_DETAIL')}}
                </span>
              </div>
            </ur-form-item>
          </ur-form-box>
        </div>
      </template>
      <template>
        <div class="comm_btn_wrap bt1">
          <div class="right_box mt10">
            <ur-button @click="closeModal">
              {{this.$t('MSG_BTN_CLOSE')}}
            </ur-button>
            <ur-button color="violet" @click="save">
              {{this.$t('MSG_BTN_SAVE')}}
            </ur-button>
          </div>
        </div>
      </template>
    </div>
  </ur-modal>
</template>



<script>
import ALERT from '~aa/pages/B/components/PGE_AAB_00001_P01.vue' // ALERT 팝업

export default {
  name: 'PGE_AAF_00009_P01', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      reason: '',
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    modal() {
      return this.$refs.modal
    },
    userId() {
      return this.$store.getters.userInfo.userId
    },
    toDate() {
      return utils.now('YYYY-MM-DD HH:mm:ss')
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
  },
  methods: {
    open() {
      this.reason = ''
      this.modal.open()
    },
    closeModal() {
      this.modal.close()
    },
    closed() {
    },
    save() {
      if (!this.$rules.validate(this)) {
        return
      }
      this.$emit('onExcelDnLoadReason', this.reason)
      this.closeModal()
    },
  },
}
</script>
  <style scoped />
