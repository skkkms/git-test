<template>
  <div>
    <!-- 위치 관리 -->
    <div
      class="comm_btn_wrap mt35"
      style="margin-bottom: 10px;"
    >
      <div class="left_box">
        <div class="comm_title_wrap">
          <h4 class="pr10">
            {{ title }}
          </h4>
          <ur-button
            color="violet"
            @click="onAdd"
          >
            추가
          </ur-button>
          <ur-button
            color="violet"
            @click="onDelete"
          >
            삭제
          </ur-button>
          <ur-button
            color="violet"
            @click="onReset"
          >
            초기화
          </ur-button>
        </div>
      </div>
      <div class="right_box">
        <span class="subscript_txt">
          * 실내 시설의 경우 ‘위/경도’는 길찾기, ‘X/Y좌표’는 지도 위치 표기에 사용됩니다.
        </span>
      </div>
    </div>
    <!-- GRID -->
    <ur-data-grid
      ref="grid"
      :headers="columns"
      :data-source="dataSet"
      :options="opts"
      height="300"
    />
    <!-- 위치보기 팝업업 -->
    <P01 ref="positionPopup" />
    <!-- 모달 : Alert -->
    <ALERT ref="alertModal" />
  </div>
</template>
<script>
import ALERT from './PGE_AAB_00001_P01.vue' // ALERT 팝업
import P01 from './PGE_AAB_00002_P03.vue'
export default {
  name: 'PGE_AAB_00002_C13', // eslint-disable-line vue/name-property-casing
  components: {
    ALERT,
    P01,
  },
  props: {
    title: {
      type: String,
      required: false,
    },
    list: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      CODE_KEYS: [
        'COD_IA_INSIDE_YN',
        'COD_IA_INSIDE_FLOOR',
        'COD_IA_COORDINATE_TYPE',
      ],
      codes: {
        COD_IA_INSIDE_YN: [],
        COD_IA_INSIDE_FLOOR: [],
        COD_IA_COORDINATE_TYPE: [],
      },
      // 그리드
      opts: {
        noInfo: true,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },
      columns: [],
      dataSet: new this.$ur.grid.DataSet(),
      // 모달 메시지
      modalMsg: '',
    }
  },
  computed: {
    grid() {
      return this.$refs.grid
    },
    modal() {
      return this.$refs.modal
    },
  },
  created() {
    http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
  },
  mounted() {
    const that = this
    this.columns = [
      {
        value: '__idx', text: 'No.', width: 100, customValue: v => v + 1,
      },
      {
        value: 'insideYn',
        text: '실내/외 구분',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          computed: {
            COD_IA_INSIDE_YN() {
              return that.codes.COD_IA_INSIDE_YN
            },
          },
          template: `<div>
                      <ur-dropdown v-model="row.insideYn" :items="COD_IA_INSIDE_YN" no-select="no-select" :msg-no-select="$t('MSG_TXT_SEL')" @input="onInput"/>
                     </div>`,
          methods: {
            onInput(v) {
              that.dataSet.setRowValue(this.row, 'insideYn', v)
              if (v !== 'Y') {
                that.dataSet.setRowValue(this.row, 'insideFloor', '')
                that.dataSet.setRowValue(this.row, 'xCoordinate', '')
                that.dataSet.setRowValue(this.row, 'yCoordinate', '')
              }
              this.$nextTick(() => that.fetchData())
            },
          },
        },
      },
      {
        value: 'insideFloor',
        text: '실내층수',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          computed: {
            COD_IA_INSIDE_FLOOR() {
              return that.codes.COD_IA_INSIDE_FLOOR
            },
            IS_OUTSIDE() {
              return false
            },
          },
          template: `<div>
                      <ur-dropdown v-if="this.row.insideYn=='Y'" v-model="row.insideFloor" :items="COD_IA_INSIDE_FLOOR" no-select="no-select" :msg-no-select="$t('MSG_TXT_SEL')" @input="onInput"/>
                      <ur-dropdown v-if="this.row.insideYn!='Y'" disabled v-model="row.insideFloor" no-select="no-select" :msg-no-select="$t('MSG_TXT_SEL')" />
                     </div>`,
          methods: {
            onInput(v) {
              that.dataSet.setRowValue(this.row, 'insideFloor', v)
              this.$nextTick(() => that.fetchData())
            },
          },
        },
      },
      {
        value: 'latud',
        text: '위도',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: '<div><ur-text-field v-model="value" maxlength="10" mask="number" style="width: auto;" placeholder="" @input="onInput" /></div>',
          methods: {
            onInput(v) {
              that.dataSet.setRowValue(this.row, 'latud', v)
              this.$nextTick(() => that.fetchData())
            },
          },
        },
      },
      {
        value: 'lgtud',
        text: '경도',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: '<div><ur-text-field v-model="value" maxlength="10" mask="number" style="width: auto;" placeholder="" @input="onInput" /></div>',
          methods: {
            onInput(v) {
              that.dataSet.setRowValue(this.row, 'lgtud', v)
              this.$nextTick(() => that.fetchData())
            },
          },
        },
      },
      {
        value: 'xCoordinate',
        text: 'X좌표',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-text-field v-if="this.row.insideYn!='N'" v-model="value" maxlength="10" mask="number" style="width: auto;" placeholder="" @input="onInput" />
            <ur-text-field v-else v-model="value" disabled maxlength="10" mask="number" style="width: auto;" placeholder=""/>
          </div>`,
          methods: {
            onInput(v) {
              that.dataSet.setRowValue(this.row, 'xCoordinate', v)
              this.$nextTick(() => that.fetchData())
            },
          },
        },
      },
      {
        value: 'yCoordinate',
        text: 'Y좌표',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-text-field v-if="this.row.insideYn!='N'" v-model="value" maxlength="10" mask="number" style="width: auto;" placeholder="" @input="onInput" />
            <ur-text-field v-else v-model="value" disabled maxlength="10" mask="number" style="width: auto;" placeholder=""/>
          </div>`,
          methods: {
            onInput(v) {
              that.dataSet.setRowValue(this.row, 'yCoordinate', v)
              this.$nextTick(() => that.fetchData())
            },
          },
        },
      },
      {
        value: 'memoDescrt',
        text: '비고',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: '<div><ur-text-field v-model="value" placeholder="" @input="onInput" /></div>',
          methods: {
            onInput(v) {
              that.dataSet.setRowValue(this.row, 'memoDescrt', v)
              this.$nextTick(() => that.fetchData())
            },
          },
        },
      },
      {
        value: 'dummy',
        text: '',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: '<div><ur-button color="violet" @click="onOpenPositionPopup">위치보기</ur-button></div>',
          methods: {
            onOpenPositionPopup() {
              if (this.row.insideYn !== 'Y') {
                that.alert('실내 위치만 확인 가능 합니다.')
                return
              }

              if (this.row.insideYn === 'Y' && utils.isEmpty(this.row.insideFloor)) {
                that.alert('실내층수를 선택 하십시오.')
                return
              }

              if (utils.isEmpty(this.row.xCoordinate) || utils.isEmpty(this.row.yCoordinate)) {
                that.alert('X좌표, Y좌표를 입력해 주세요.')
                return
              }

              that.$refs.positionPopup.open({ caller: this.row })
            },
          },
        },
      },
    ]
    // 그리드 초기 값 세팅
    this.update(this.list)
  },
  methods: {
    openModal(msg) { this.modalMsg = msg; this.modal.open() },
    closeModal() { this.modalMsg = ''; this.modal.close() },
    closed() {},
    update(list) {
      // 그리드 업데이트
      /*
      if (!utils.isEmpty(list)) {
        list.forEach(element => {
          this.add(element)
        })
      }
      */
      this.dataSet.setData(list)
    },
    onAdd() {
      if (this.dataSet.dataSize >= 50) {
        this.alert('위치는 최대 50개까지 추가할 수 있습니다.') // 위치 최대 50개 제한
        return
      }
      this.dataSet.addRow({
        insideYn: '',
        insideFloor: '',
        latud: '',
        lgtud: '',
        xCoordinate: '',
        yCoordinate: '',
        memoDescrt: '',
      })
      this.$nextTick(() => this.fetchData())
    },
    add(row) {
      this.dataSet.addRow(row)
      this.$nextTick(() => this.fetchData())
    },
    onDelete() {
      const s = this.grid.getSelected()
      if (utils.isEmpty(s)) {
        utils.messageBox('warning', this.$t('선택 된 항목이 없습니다.'))
        return
      }
      utils.messageBox('confirm', this.$t('삭제하시겠습니까?'), null, () => { // 삭제하시겠습니까?
        // eslint-disable-next-line no-extra-boolean-cast
        if (!!s) {
          // eslint-disable-next-line no-underscore-dangle
          if (s.length === 1) this.grid.removeRow(s[0].__id, false) // 2nd arg : select next row
          else this.grid.removeRow(s)
        } else {
          this.alert('선택된 항목이 없습니다.')
        }
        this.$nextTick(() => this.fetchData())
      })
    },
    onReset() {
      const value = []
      if (this.dataSet.getViewData()) {
        this.dataSet.getViewData().forEach(() => {
          const val = {
            insideYn: '',
            insideFloor: '',
            latud: '',
            lgtud: '',
            xCoordinate: '',
            yCoordinate: '',
            memoDescrt: '',
          }
          value.push(val)
        })
      }
      this.dataSet.setData(value)
      const data = {
        view: value,
        created: [],
        updated: [],
        removed: [],
      }
      this.$emit('update', data)
    },
    fetchData() {
      const data = Object.assign({}, this.dataSet.getChanged())
      const value = []
      if (this.dataSet.getViewData()) {
        this.dataSet.getViewData().forEach(element => {
          const val = {
            // eslint-disable-next-line no-underscore-dangle
            seqNo: element.__idx + 1,
            insideYn: element.insideYn,
            insideFloor: element.insideFloor,
            latud: element.latud,
            lgtud: element.lgtud,
            xCoordinate: element.xCoordinate,
            yCoordinate: element.yCoordinate,
            memoDescrt: element.memoDescrt,
          }
          value.push(val)
        })
      }
      data.view = value
      this.$emit('update', data)
    },
    alert(msg) {
      this.$refs.alertModal.open(msg)
    },
  },
}
</script>
