<template>
  <ur-modal
    ref="modal"
    xlarge
    dragable
    :title="$t('MSG_TXT_IAA_STMP_ATTAIN_CURRENT')"
    @closed="closed"
    >
<!--    <template slot="title">-->
<!--      <div class="modal-title mb45" />-->
<!--      </div>-->
<!--    </template>-->
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
  name: 'PGE_AAG_00003_P01', // eslint-disable-line vue/name-property-casing
  components: {
  },
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
      // 스탬프 달성 현황 테이블
      columns: [
        { value: 'no', text: this.$t('MSG_TXT_NUMBER_ABBR') },
        { value: 'seq', text: this.$t('MSG_TXT_IAA_ITEM_NO') },
        { value: 'name', text: this.$t('MSG_TXT_ITEM_NAME') },
        {
          value: 'joinDtm',
          text: this.$t('MSG_TXT_ATTAIN_DTM'),
          customValue: (v, r) => {
            const customValue = moment(v, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')
            return customValue
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
