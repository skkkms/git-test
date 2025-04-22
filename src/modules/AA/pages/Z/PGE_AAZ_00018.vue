<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 시설 정보 탭 메뉴-->
      <div class="comm_title_wrap">
        <h4>
          시설 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="영업일자"
          :label-align="'right'"
          style="width:50%; height:auto;"
          class="flex_wrap"
        >
          2022-10-13
        </ur-form-item>
        <ur-form-item
          label="시설명"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          랩터레인저
        </ur-form-item>
        <ur-form-item
          label="시설 카테고리"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          어트랙션, 엔터테이먼트
        </ur-form-item>
        <ur-form-item
          label="Zone 구분"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          유러피언 어드벤처
        </ur-form-item>
        <ur-form-item
          label="가상대기 여부"
          :label-align="'right'"
          style="width:100%; height:auto;"
        >
          일반형
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 시설 정보 탭 메뉴-->

      <!-- S :: 세부 예약 현황 테이블-->
      <div class="comm_title_wrap mt20">
        <h4>
          세부 예약 현황
        </h4>
        <div class="left_box pl16">
          <ur-button
            color="violet"
            @click="openModalP01"
          >
            대기라인 관리
          </ur-button>
          <ur-modal
            ref="modalP01"
            class="modal-b1c6"
            xlarge
            title="가상대기 취소"
            draggable
            @closed="closed"
          >
            <P01 />
          </ur-modal>
        </div>
      </div>
      <template>
        <ur-data-grid
          ref="grid"
          :headers="columns"
          :data-source="list"
          :data-set-options="{id: 'id'}"
          :options="opts"
          class="custom_grid_pgeNav_None"
        />
      </template>
      <!-- E :: 세부 예약 현황 테이블-->


      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import P01 from './components/PGE_AAZ_00018_P01.vue'

export default {
  name: 'PGE_AAZ_00018', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
  },
  data() {
    return {
      dataSet: new this.$ur.grid.DataSet(),
      opts: {
        height: 450,
        pagination: false,
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },

      columns: [
        {
          value: 'value1', text: 'No.', width: 100, align: 'center',
        },
        {
          value: 'value2',
          text: '예약번호',
          width: 300,
        },
        { value: 'value3', text: '신청기간', width: 100 },
        { value: 'value4', text: '예약구분', width: 100 },
        {
          value: 'value5',
          text: '최초예약 탑승기간',
          width: 100,
        },
        {
          value: 'value6',
          text: '대기인원',
          width: 100,
        },
        {
          value: 'value7',
          text: '슬롯인원',
          width: 100,
        },
        {
          value: 'value8',
          text: '대기순서',
          width: 100,
        },
        {
          value: 'value9',
          text: '확정여부',
          width: 100,
        },
        {
          value: 'value10',
          text: 'PUSH 여부',
          width: 100,
        },
        {
          value: 'value11',
          text: '확정예약 탑승기간',
          width: 150,
        },
        {
          value: 'value12', text: 'ID', width: 100,
        },
        {
          value: 'value13', text: 'QR CD', width: 150,
        },
        {
          value: 'value14', text: '개인 Ticket', width: 150,
        },
        {
          value: 'value15', text: '예약상태', width: 150,
        },
      ],

      list: [
        {
          value1: '1', value2: 'ff794375e-bf77-49bc-8f46-a7871a167ef9', value3: '11:35', value4: 'rline', value5: '12:15', value6: '0', value7: '0', value8: '0', value9: 'Y', value10: 'Y', value11: '12:15', value12: 'test123', value13: 'EL26016NHD6P6JGG', value14: 'EL26016NHD6P6JGG', value15: 'NONE',
        },
      ],

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    modalP01() {
      return this.$refs.modalP01
    },

    // 시설 카테고리 드랍다운 데이터
    items1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '어트렉션' })
      rtn.push({ value: '3', text: '공연' })
      rtn.push({ value: '4', text: '주토피아' })
      rtn.push({ value: '5', text: '레스토랑' })
      rtn.push({ value: '6', text: '편의시설' })
      rtn.push({ value: '7', text: '기프트샵' })
      rtn.push({ value: '8', text: '포토존' })
      return rtn
    },

    // Zone 구분 드랍다운 데이터
    items2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '글로벌페어' })
      rtn.push({ value: '3', text: '아메리칸 어드벤처' })
      rtn.push({ value: '4', text: '매직랜드' })
      rtn.push({ value: '5', text: '유러피안 어드벤처' })
      rtn.push({ value: '6', text: '주토피아' })
      return rtn
    },


  },

  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() { },
  methods: {
    openModalP01() { this.modalP01.open() },
    closeModalP01() { this.modalP01.close() },
  },
}
</script>
<style scoped>
</style>
