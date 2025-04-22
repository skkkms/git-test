<template>
  <ur-modal ref="modal" title="알림" @closed="closed" draggable>
    <template>
      {{msg}}
    </template>
    <template slot="action">
      <ur-button @click="close" main>확인</ur-button>
    </template>
  </ur-modal>
<!---->
<!--
  <ur-modal
    ref="modal"
    xlarge
    title="알림"
    draggable
    @opened="opened"
  >
    <template slot="title">
      <div class="modal-title mb45">
        ALERT
      </div>
    </template>
    <template>
      <div class="modal-body">
        {{msg}}
      </div>
    </template>
    <template>
      <div class="comm_btn_wrap bt1">
        <div class="right_box mt10">
          <ur-button @click="close">
            닫기
          </ur-button>
        </div>
      </div>
    </template>
  </ur-modal>
  -->
</template>
<script>
export default {
  name: 'PGE_AAB_00001_P01', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      msg: 'fdadf',
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
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
    open(msg) {
      this.msg = msg
      this.modal.open()
    },
    close() {
      this.modal.close()
    },
    opened() {},
    closed() {},
  },
}
</script>
<style scoped>
</style>
