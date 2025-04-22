<template>
    <ur-modal
        ref="modal"
        xlarge
        dragable
        :title="$t('MSG_TXT_IAA_MISSION_ATTAIN_CURRENT')"
        @closed="closed"
    >
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
    </ur-modal>
</template>
<script>
export default {
  name: 'PGE_AAG_00003_P03', // eslint-disable-line vue/name-property-casing
  components: {
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
      // 미션 달성 현황 테이블
      columns: [
        { value: 'no', text: this.$t('MSG_TXT_NUMBER_ABBR') },
        { value: 'missionNo', text: this.$t('MSG_TXT_IAA_MISSION_NO') },
        { value: 'missionName', text: this.$t('MSG_TXT_MISSION_NAME') },
        {
          value: 'joinDtm',
          text: this.$t('MSG_TXT_ATTAIN_DTM'),
          customValue: (v, r) => {
            const customValue = moment(v, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')
            return customValue
          },
        },
        {
          text: this.$t('MSG_TXT_REWRD_CLASS'),
          width: 150,
          customValue: (v, r) => ((r.badgeSeq === null) ? this.$t('MSG_TXT_REWRD_NO_REWRD') : this.$t('MSG_TXT_REWRD_BADGE')),
        },
        { value: 'rewrdName', text: this.$t('MSG_TXT_IAA_EVT_RWRD_NAME') },
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
