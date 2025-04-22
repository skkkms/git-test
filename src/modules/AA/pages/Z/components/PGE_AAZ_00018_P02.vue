<template>
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
              v-model="valueP2D1"
              :items="itemsP2D1"
            />
          </ur-form-item>
          <ur-form-item
            label="지급 쿠폰"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <ur-text-field
              style="width:75%; height:auto; padding-right:10px;"
              value=""
            /><ur-icon-button
              icon="search"
              icon-type="line"
              color="primary"
              @click="openModalP03"
            />
            <ur-modal
              ref="modalP03"
              class="modal-b1c6"
              xlarge
              title="발행 쿠폰 검색"
              draggable
              @closed="closed"
            >
              <P03 />
            </ur-modal>
          </ur-form-item>
        </ur-form-box>
        <!-- ::E 콘텐츠1 -->
      </div>
      <div class="comm_btn_wrap bt1 mt45">
        <div class="btn_wrap">
          <div class="right_box mt10">
            <ur-button>
              닫기
            </ur-button>
            <ur-button
              color="violet"
            >
              저장
            </ur-button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import P03 from './PGE_AAZ_00018_P03.vue'

export default {
  name: 'PGE_AAZ_00018_P02', // eslint-disable-line vue/name-property-casing
  components: {
    P03,
  },
  data() {
    return {

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    modalP03() {
      return this.$refs.modalP03
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
    openModalP03() { this.modalP03.open() },
    closeModalP03() { this.modalP03.close() },
  },
}
</script>
<style scoped>
</style>
