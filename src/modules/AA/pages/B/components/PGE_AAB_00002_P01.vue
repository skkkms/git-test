<template>
  <ur-modal
    ref="modal"
    xlarge
    title="POS 정보 검색"
    draggable
  >
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
              v-model="params.parkFg"
              :items="codes.RSWEB_CODE_PARK_FG"
              @input="onChangeParkFg"
            />
          </ur-form-item>
          <ur-form-item
            label="POS 구분"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <ur-dropdown
              v-model="params.posFg"
              :items="codes.RSWEB_CODE_POS_FG"
              no-select="no-select"
              msg-no-select="전체"
            />
          </ur-form-item>
          <ur-form-item
            label="부문 구분"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <ur-dropdown
              v-model="params.divisionFg"
              :items="codes.RSWEB_CODE_DIVISION_FG"
              no-select="no-select"
              msg-no-select="전체"
            />
          </ur-form-item>
          <ur-form-item
            label="시설코드/위치"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <ur-text-field
              v-model="params.facilCdNm"
              readonly
              style="width: 90%;"
            />
            <ur-icon-button
              icon="search"
              icon-type="line"
              color="primary"
              @click="openFaciltNameCodePopup"
            />
          </ur-form-item>
          <ur-form-item
            label="POS 종별"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <ur-dropdown
              v-model="params.posKind"
              :items="codes.RSWEB_CODE_POS_KIND"
              no-select="no-select"
              msg-no-select="전체"
            />
          </ur-form-item>
        </ur-form-box>
        <div class="btn_wrap mt10">
          <div class="right_box">
            <ur-button
              @click="onReset"
            >
              초기화
            </ur-button>
            <ur-button
              v-permission:read="contextPageId"
              color="violet"
              @click="onSearch"
            >
              검색
            </ur-button>
          </div>
        </div>

        <ur-data-grid
          ref="grid"
          :headers="columns"
          :options="opts"
          :data-source="list"
          :data-set-options="{id: 'id'}"
          @grid:row-dbl-click="onDblClicked"
        />
      </div>
    </template>
    <template>
      <div class="comm_btn_wrap bt1">
        <div class="right_box mt10">
          <ur-button @click="close">
            닫기
          </ur-button>
          <ur-button color="violet" @click="onSelect">
            선택
          </ur-button>
        </div>
      </div>
    </template>
    <!-- 모달 : Alert -->
    <ALERT
      ref="alert"
    />
    <!-- S:: 시설명/코드 조회 POPUP -->
    <P02
      ref="faciltNameCodePopup"
      :page-id="contextPageId"
      @update="onUpdateFaciltNameCode"
    />
    <!-- E:: 시설명/코드 조회 POPUP -->
  </ur-modal>
</template>

<script>

import ALERT from './PGE_AAB_00001_P01.vue' // ALERT 팝업
import P02 from './PGE_AAB_00002_P02.vue' // 시설명/코드 조회 팝업
const PARK_FG_EL = 'B009'
const PARK_FG_CB = 'B008'
export default {
  name: 'PGE_AAB_00002_P01', // eslint-disable-line vue/name-property-casing
  components: {
    ALERT,
    P02,
  },
  data() {
    return {
      CODE_KEYS: [
        'RSWEB_CODE_MASTER',
        'RSWEB_CODE_PARK_FG',
        'RSWEB_CODE_POS_FG',
        'RSWEB_CODE_POS_FG_EL',
        'RSWEB_CODE_POS_FG_CB',
        'RSWEB_CODE_DIVISION_FG',
        'RSWEB_CODE_POS_KIND',
        'RSWEB_CODE_MASTER_CO_CD_CLASS',
      ],
      codes: {
        RSWEB_CODE_MASTER: [],
        RSWEB_CODE_PARK_FG: [],
        RSWEB_CODE_POS_FG: [],
        RSWEB_CODE_POS_FG_EL: [],
        RSWEB_CODE_POS_FG_CB: [],
        RSWEB_CODE_DIVISION_FG: [],
        RSWEB_CODE_POS_KIND: [],
        RSWEB_CODE_MASTER_CO_CD_CLASS: [
          'S058',  // PARK_FG , 파크구분
          '20011', // POS_FG , POS구분 EL
          '00014',  // DIVISION_FG , 부문구분
          '20023', // POS_KIND , POS종별
          '20010', // POS_FG , POS구분 CB
        ],
      },
      // 테이블 옵션
      opts: { // 토탈 X
        multiSelect: false,
        selectCheck: false,
        height: 300,
        noInfo: false,
      },
      caller: '',
      params: {
        parkFg: PARK_FG_EL,
        posFg: '',
        divisionFg: '',
        facilCd: '',
        facilNm: '',
        facilCdNm: '',
        posKind: '',
      },
      // POS 정보 검색 MODAL POP-UP
      columns: [
        {
          text: 'No.', value: '__idx', width: 100, customValue: (v) => v+1
        },
        { text: 'POS번호', value: 'posId', width: 150 },
        { text: 'POS 명', value: 'posNm' },
      ],
      list: [],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    contextPageId() {
      return this.$attrs['page-id']
    },
    modal() {
      return this.$refs.modal
    },
    grid() {
      return this.$refs.grid
    },
    faciltNameCodePopup() {
      return this.$refs.faciltNameCodePopup
    },
    /*
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
    */
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
  },
  methods: {
    open(params) {
      console.log('open')
      this.caller = params.caller
      if (!utils.isEmpty(params.parkKindCd) && params.parkKindCd === '02') {
        this.params.parkFg = PARK_FG_CB
      }
      if (
        utils.isEmpty(this.codes.RSWEB_CODE_PARK_FG)
        || utils.isEmpty(this.codes.RSWEB_CODE_POS_FG_EL)
        || utils.isEmpty(this.codes.RSWEB_CODE_POS_FG_CB)
        || utils.isEmpty(this.codes.RSWEB_CODE_DIVISION_FG)
        || utils.isEmpty(this.codes.RSWEB_CODE_POS_KIND)
      ) {
        this.getCodeMasterList()
      }
      this.modal.open()
    },
    close() {
      console.log('close')
      this.modal.close()
      this.onReset()
      this.onResetList()
    },
    opened() {
      console.log('opened')
    },
    closed() {},
    onReset() {
      this.params = {
        parkFg: PARK_FG_EL,
        posFg: '',
        divisionFg: '',
        posKind: '',
      }
    },
    onResetList() {
      this.list = []
    },
    onSearch() {
      console.log('REQ', this.params)
      const serviceName = 'DTS_AAB_00004'
      http.request(this.contextPageId, serviceName, {
        query: this.params,
        path: {},
        data: {},
      }).then(res => {
        console.log('RES', res.data)
        this.list = res.data
      }).catch(error => {
        console.log(error)
      })
    },
    getCodeMasterList() {
      console.log('REQ', this.params)
      const serviceName = 'DTS_AAB_00006'
      http.request(this.contextPageId, serviceName, {
        query: {
          coCdClassCds: this.codes.RSWEB_CODE_MASTER_CO_CD_CLASS.join(','), // 'S058,20011,S020,20023'
        },
        path: {},
        data: {},
      }).then(res => {
        console.log('RES', res.data)
        this.codes.RSWEB_CODE_MASTER = res.data

        this.codes.RSWEB_CODE_PARK_FG = this.codes.RSWEB_CODE_MASTER.filter(v => {
          return v.coCdClass === this.codes.RSWEB_CODE_MASTER_CO_CD_CLASS[0] && v.coCd !== 'AL' // 'S058'
        })
        this.codes.RSWEB_CODE_POS_FG_EL = this.codes.RSWEB_CODE_MASTER.filter(v => {
          return v.coCdClass === this.codes.RSWEB_CODE_MASTER_CO_CD_CLASS[1] // '20011'
        })
        this.codes.RSWEB_CODE_DIVISION_FG = this.codes.RSWEB_CODE_MASTER.filter(v => {
          return v.coCdClass === this.codes.RSWEB_CODE_MASTER_CO_CD_CLASS[2] // '00014'
        })
        this.codes.RSWEB_CODE_POS_KIND = this.codes.RSWEB_CODE_MASTER.filter(v => {
          return v.coCdClass === this.codes.RSWEB_CODE_MASTER_CO_CD_CLASS[3] // '20023'
        })
        this.codes.RSWEB_CODE_POS_FG_CB = this.codes.RSWEB_CODE_MASTER.filter(v => {
          return v.coCdClass === this.codes.RSWEB_CODE_MASTER_CO_CD_CLASS[4] // '20010'
        })

        // RSWEB_CODE_POS_FG_EL 및 RSWEB_CODE_POS_FG_CB 는 드롭박스 표시 값을 '코드값 코드네임' 형태로 바꿔준다.
        this.codes.RSWEB_CODE_POS_FG_EL.forEach(el => {
          el.text = `${el.value} ${el.text}`
        })
        this.codes.RSWEB_CODE_POS_FG_CB.forEach(el => {
          el.text = `${el.value} ${el.text}`
        })

        //POS 구분의 초기 세팅은 파크구분 정보에 따라 RSWEB_CODE_POS_FG_EL 또는 RSWEB_CODE_POS_FG_CB 로 한다!
        if (this.params.parkFg === PARK_FG_CB) this.codes.RSWEB_CODE_POS_FG = this.codes.RSWEB_CODE_POS_FG_CB
        else this.codes.RSWEB_CODE_POS_FG = this.codes.RSWEB_CODE_POS_FG_EL

        //console.log('RSWEB_CODE_PARK_FG', this.codes.RSWEB_CODE_PARK_FG)
        //console.log('RSWEB_CODE_POS_FG_EL', this.codes.RSWEB_CODE_POS_FG_EL)
        //console.log('RSWEB_CODE_POS_FG_CB', this.codes.RSWEB_CODE_POS_FG_CB)
        //console.log('RSWEB_CODE_DIVISION_FG', this.codes.RSWEB_CODE_DIVISION_FG)
        //console.log('RSWEB_CODE_POS_KIND', this.codes.RSWEB_CODE_POS_KIND)
      }).catch(error => {
        console.log(error)
      })
    },
    onSelect() {
      const selected = this.grid.getSelected()
      if (utils.isEmpty(selected)) {
        //utils.messageBox('warning', this.$t('선택 된 항목이 없습니다.'))
        this.alert('선택 된 항목이 없습니다.')
        return
      }
      this.doSelect(selected)
    },
    onDblClicked(selected) {
      this.doSelect(selected)
    },
    doSelect(selected) {
      const data = {
        caller: this.caller,
        posId: selected.posId,
        posNm: selected.posNm,
      }
      this.$emit('update', data)
      this.close()
    },
    alert(msg) {
      this.$refs.alert.open(msg)
    },
    openFaciltNameCodePopup() { this.faciltNameCodePopup.open({ caller: '' }) },
    onUpdateFaciltNameCode(val) {
      console.log(val)
      this.params.facilCd = val.facilCd
      this.params.facilNm = val.facilNm
      this.params.facilCdNm = val.facilCd + ' / ' + val.facilNm
      //val.facilCdNm = val.facilCd + ' / ' + val.facilNm
      //this.params = Object.assign({}, this.params, val)
    },
    onChangeParkFg(v) {
      console.log(v)
      if (v === 'B009') { // EL
        this.codes.RSWEB_CODE_POS_FG = this.codes.RSWEB_CODE_POS_FG_EL
      } else if (v === 'B008') { // CB
        this.codes.RSWEB_CODE_POS_FG = this.codes.RSWEB_CODE_POS_FG_CB
      } else {
        this.codes.RSWEB_CODE_POS_FG = []
      }
    },
  },
}
</script>
<style scoped>
</style>
