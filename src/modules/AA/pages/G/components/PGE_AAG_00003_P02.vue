<template>
  <ur-modal
    ref="modal"
    xlarge
    dragable
    :title="$t('MSG_TXT_IAA_ATTEND_CURRENT')"
    @closed="closed"
  >
    <div>
      <template>
        <div class="modal-body">
          <!-- ::S 콘텐츠1 -->
          <ur-data-grid
            ref="grid"
            :headers="columns"
            :data-source="list"
            :data-set-options="{id: 'id'}"
            :options="opts"
          />
          <!-- ::E 콘텐츠1 -->
        </div>
      </template>
      <template>
        <div class="comm_btn_wrap bt1">
          <div class="right_box mt10">
            <ur-button
              color="violet"
              @click="closeModal"
            >
              {{ $t('MSG_BTN_CLOSE') }}
            </ur-button>
          </div>
        </div>
      </template>
    </div>
  </ur-modal>
</template>
<script>
import CommonUtils from '~aa/js/common-utils'
export default {
  name: 'PGE_AAG00003_P02', // eslint-disable-line vue/name-property-casing
  components: {
  }, // eslint-disable-line vue/name-property-casing
  props: {
    codes: {
      type: Object,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      opts: {
        height: 522,
        resizableColumn: true,
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      // 출석체크 출석 현황 테이블
      columns: [
        {
          value: 'eventPartcpResult',
          text: this.$t('MSG_TXT_EVT_ATTEND_CNT_DAY'),
          customValue: (v, r) => {
            if (_.isEmpty(r.rewrdKindCd)) {
              return v
            }
            return `${r.rewrdDcnt + this.$t('MSG_TXT_DAY_OF_ATTEND_COUNT')} ${this.$t('MSG_TXT_IAA_REWRD')}`
          },
        },
        {
          value: 'joinDtm',
          text: this.$t('MSG_TXT_EVT_ATTEND_DTM'),
          customValue: (v, r) => {
            const customValue = moment(v, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')
            return customValue
          },
        },
        {
          value: 'rewrdKindCd',
          text: this.$t('MSG_TXT_IAA_REWRD'),
          type: 'code',
          domain: this.codes.COD_IA_EVENT_REWARD_KIND,
          customValue: (v, r) => {
            if (_.isEmpty(v)) {
              return '-'
            }
            return CommonUtils.getCodeText(
              this.codes.COD_IA_EVENT_REWARD_KIND, v,
            )
          },
        },
        { value: 'rewrdRecvYn', text: this.$t('MSG_TXT_REWRD_RECV_YN') },
        {
          value: 'rewrdName',
          text: this.$t('MSG_TXT_GVWY_NAME'),
          customValue: (v, r) => {
            if (_.isEmpty(v)) {
              return '-'
            }
            return v
          },
        },
      ],
      list: [],
    }
  },
  computed: {
    modal() {
      return this.$refs.modal
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
      this.modal.open()
    },
    closeModal() {
      this.modal.close()
    },
    closed() {
    },
    setData(data) {
      this.list = data
    },
  },
}
</script>
  <style scoped />
