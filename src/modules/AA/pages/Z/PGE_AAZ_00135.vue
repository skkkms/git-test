<template>
  <div>
    <template slot="title">
      <div class="modal-title">
        POS 정보 검색
      </div>
    </template>
    <template>
      <div class="modal-body">
        <ur-form-box toggleable>
          <ur-form-item
            label="파크 구분"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <ur-dropdown
              v-model="valueP1D1"
              :items="itemsP1D1"
            />
          </ur-form-item>
          <ur-form-item
            label="POS 구분"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <ur-dropdown
              v-model="valueP1D2"
              :items="itemsP1D2"
            />
          </ur-form-item>
          <ur-form-item
            label="부문 구분"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <ur-dropdown
              v-model="valueP1D3"
              :items="itemsP1D3"
            />
          </ur-form-item>
          <ur-form-item
            label="시설코드/위치"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <ur-text-field
              style="width: 90%;"
              value=""
              readonly
            />
            <ur-icon-button
              icon="search"
              icon-type="line"
              color="primary"
              @click="openModalP02"
            />
            <!-- S:: 시설 조회 popup modal-->
            <ur-modal
              ref="modalP02"
              title="시설 조회"
              large
              dragable
              @closed="closed"
            >
              <P02
                :page-id="contextPageId"
              />
            </ur-modal>
            <!-- E:: 시설 조회 popup modal-->
          </ur-form-item>
          <ur-form-item
            label="POS 종별"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <ur-dropdown
              v-model="valueP1D4"
              :items="itemsP1D4"
            />
          </ur-form-item>
        </ur-form-box>
        <div class="btn_wrap mt10">
          <div class="right_box">
            <ur-button>
              초기화
            </ur-button>
            <ur-button
              color="violet"
            >
              검색
            </ur-button>
          </div>
        </div>

        <ur-data-grid
          ref="grid"
          :headers="columnsP1T1"
          :options="options"
          :data-source="listP1T1"
          :data-set-options="{id: 'id'}"
        />
      </div>
    </template>
    <template>
      <div class="comm_btn_wrap bt1">
        <div class="right_box mt10">
          <ur-button @click="closeModal">
            닫기
          </ur-button>
          <ur-button color="violet">
            선택
          </ur-button>
        </div>
      </div>
    </template>
  </div>
  <!-- E:: POS 정보 검색 MODAL -->
</template>

<script>
import P02 from './PGE_AAZ_00134.vue'

export default {
  name: 'PGE_AAZ_00135', // eslint-disable-line vue/name-property-casing
  components: {
    P02,
  },
  data() {
    return {
      valueP1D1: '1',
      valueP1D2: '1',
      valueP1D3: '1',
      valueP1D4: '1',

      // 테이블 옵션
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
        height: 300,
      },

      // POS 정보 검색 MODAL POP-UP
      columnsP1T1: [
        { text: 'No.', value: 'id', width: 80 },
        { text: 'POS번호', value: 'str1', width: 150 },
        { text: 'POS 명', value: 'str2' },
      ],
      listP1T1: [
        { id: '1', str1: 'C100A180101', str2: '게임 어드벤처-01' },
        { id: '2', str1: 'C100A180101', str2: '게임 어드벤처-02' },
        { id: '3', str1: 'C100A180101', str2: '게임 어드벤처-03' },
        { id: '4', str1: 'C100A180101', str2: '게임 어드벤처-04' },
        { id: '5', str1: 'C100A180101', str2: '게임 어드벤처-05' },
        { id: '6', str1: 'C100A180101', str2: '게임 어드벤처-06' },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    modalP02() {
      return this.$refs.modalP02
    },
    itemsP1D1() {
      const rtn = []
      rtn.push({ value: '1', text: 'EL' })
      rtn.push({ value: '2', text: 'CB' })
      rtn.push({ value: '3', text: 'HB' })
      return rtn
    },
    itemsP1D2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '11 개인정문입장' })
      rtn.push({ value: '3', text: '12 개인서문입장' })
      rtn.push({ value: '4', text: '13 개인HB입장' })
      rtn.push({ value: '5', text: '16 개인원내이용' })
      rtn.push({ value: '6', text: '17 개인제휴자동입장' })
      rtn.push({ value: '7', text: '21 단체정문' })
      rtn.push({ value: '8', text: '23 단체HB' })
      rtn.push({ value: '9', text: '31 EL 회원정문' })
      rtn.push({ value: '10', text: '41 식음매장' })
      rtn.push({ value: '11', text: '42 상품매장' })
      rtn.push({ value: '12', text: '43 식음가판' })
      rtn.push({ value: '13', text: '44 상품부스' })
      rtn.push({ value: '14', text: '45 식음가판PDA' })
      rtn.push({ value: '15', text: '46 상품가판PDA' })
      rtn.push({ value: '16', text: '01 개인티켓' })
      rtn.push({ value: '17', text: '02 CB' })
      rtn.push({ value: '18', text: '03 단체티켓' })
      rtn.push({ value: '19', text: '04 정산소' })
      rtn.push({ value: '20', text: '05 상품POS' })
      rtn.push({ value: '21', text: '06 렌탈관리POS' })
      rtn.push({ value: '22', text: '07 식음POS' })
      return rtn
    },
    itemsP1D3() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '관리비' })
      rtn.push({ value: '3', text: '상품' })
      rtn.push({ value: '4', text: '식음' })
      rtn.push({ value: '5', text: '입장이용' })
      rtn.push({ value: '6', text: '캐빈' })
      rtn.push({ value: '7', text: '힐사이드' })
      return rtn
    },
    itemsP1D4() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '개인발권' })
      rtn.push({ value: '3', text: '단체발권' })
      rtn.push({ value: '4', text: '식음' })
      rtn.push({ value: '5', text: '상품' })
      rtn.push({ value: '6', text: '대여소' })
      rtn.push({ value: '7', text: '정산소' })
      rtn.push({ value: '8', text: '게이트' })
      rtn.push({ value: '9', text: '게이트(연동)' })
      rtn.push({ value: '10', text: '식음키오스크' })
      rtn.push({ value: '11', text: 'BC키오스크' })
      rtn.push({ value: '12', text: '티켓K[Capa형]' })
      rtn.push({ value: '13', text: '체어키오스크' })
      rtn.push({ value: '14', text: '정문키오스크' })
      rtn.push({ value: '15', text: '티켓K[일반]' })
      rtn.push({ value: '16', text: '티켓K[복합]' })
      rtn.push({ value: '17', text: '티켓K[무료]' })
      rtn.push({ value: '18', text: '연간회원키오스크' })
      return rtn
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
    closeModal() { this.modalP01.close() },
    closed() {},
  },
}
</script>
<style scoped>
</style>
