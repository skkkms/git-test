<template>
  <div>
    <template slot="title">
      <div class="modal-title mb45">
        가상대기 취소
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
            label="예약시간"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <ur-time-picker
              v-model="valuetime1"
              mode="dropdown"
              style="width: 20%;"
              class="pr10"
              term="60"
            />
            ~
            <ur-time-picker
              v-model="valuetime2"
              mode="dropdown"
              style="width: 20%;"
              term="60"
            />
          </ur-form-item>
        </ur-form-box>
        <div class="btn_wrap mt10">
          <div class="right_box">
            <ur-button>
              초기화
            </ur-button>
            <ur-button color="violet">
              검색
            </ur-button>
          </div>
        </div>
        <!-- ::E 콘텐츠1 -->

        <!-- ::S 콘텐츠2 -->
        <template>
          <ur-data-grid
            ref="grid"
            :headers="columns01"
            :data-source="list01"
            :data-set-options="{id: 'id'}"
            :options="opts"
            class="custom_grid_pgeNav_None"
          />
        </template>
        <!-- ::E 콘텐츠2 -->
      </div>
      <div class="comm_btn_wrap bt1 mt45">
        <div class="btn_wrap">
          <div class="right_box mt10">
            <ur-button>
              닫기
            </ur-button>
            <ur-button
              color="violet"
              @click="openModalP02"
            >
              예약 취소
            </ur-button>
            <ur-modal
              ref="modalP02"
              class="modal-b1c6"
              xlarge
              title="가상대기 취소 안내"
              draggable
              @closed="closed"
            >
              <P02 />
            </ur-modal>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import P02 from './PGE_AAZ_00018_P02.vue'

export default {
  name: 'PGE_AAZ_00018_P01', // eslint-disable-line vue/name-property-casing
  components: {
    P02,
  },
  data() {
    return {

      columns01: [
        { value: 'value1', text: 'No.', width: 120 },
        {
          value: 'value2',
          text: '예약번호',
          width: 300,
        },
        { value: 'value3', text: '신청시간', width: 200 },
        { value: 'value4', text: '예약구분' },
        { value: 'value5', text: '확정예약 탑승시간', width: 200 },
      ],

      list01: [
        {
          value1: '1', value2: 'ff794375e-bf77-49bc-8f46-a7871a167ef9', value3: '11:35', value4: 'rline', value5: '12:15',
        },
      ],

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    modalP02() {
      return this.$refs.modalP02
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
    openModalP02() { this.modalP02.open() },
    closeModalP02() { this.modalP02.close() },
  },
}
</script>
<style scoped>
</style>
