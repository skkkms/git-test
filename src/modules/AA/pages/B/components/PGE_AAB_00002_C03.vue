<template>
  <div>
    <!-- 이용안내 -->
    <div class="comm_title_wrap mt35">
      <h4 class="pr10">
        {{title}}
      </h4>
      <ur-button color="violet" @click="onAdd">
        추가
      </ur-button>
      <ur-button color="violet" @click="onDelete">
        삭제
      </ur-button>
      <ur-button color="violet" @click="onReset">
        초기화
      </ur-button>
      <!--
      <ur-button color="violet" @click="fetchData">
        업데이트
      </ur-button>
      -->
    </div>
    <!-- GRID -->
    <ur-data-grid
      ref="grid"
      :headers="columns"
      :data-source="dataSet"
      :options="opts"
      height="300"
    />
    <!-- 모달 : Alert -->
    <ALERT ref="alertModal" />
  </div>
</template>
<script>
import ALERT from './PGE_AAB_00001_P01.vue' // ALERT 팝업
export default {
  name: 'PGE_AAB_00002_C03', // eslint-disable-line vue/name-property-casing
  components: {
    ALERT,
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
  watch: {
  },
  created() {
  },
  mounted() {
    let that = this;
    this.columns = [
      {
        value: '__idx', text: 'No.', width: 100, customValue: (v) => v+1
      },
      {
        value: 'useGuidDescrt',
        text: '이용 안내 (국문)',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: '<div><ur-text-field v-model="value" maxlength="300" style="width: auto;" placeholder="" @input="onInput" /></div>',
          methods: {
            onInput(v) {
              that.dataSet.setRowValue(this.row, 'useGuidDescrt', v)
              this.$nextTick(() => that.fetchData())
            },
          },
        },
      },
      {
        value: 'useGuidDescrtEng',
        text: '이용 안내 (영문)',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: '<div><ur-text-field v-model="value" maxlength="300" style="width: auto;" placeholder="" @input="onInput" /></div>',
          methods: {
            onInput(v) {
              that.dataSet.setRowValue(this.row, 'useGuidDescrtEng', v)
              this.$nextTick(() => that.fetchData())
            },
          },
        },
      },
      //{ value: 'padding', text: '' },
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
      if (this.dataSet.dataSize > 9) {
        this.alert('이용안내는 최대 10개까지 추가할 수 있습니다.') // 이용안내 최대 10개 제한
        return
      }
      this.dataSet.addRow({
        useGuidDescrt: '',
        useGuidDescrtEng: '',
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
        if (!!s) {
          if(s.length === 1) this.grid.removeRow(s[0].__id, false) // 2nd arg : select next row
          else this.grid.removeRow(s)
        } else {
          this.alert('선택된 항목이 없습니다.')
        }
        this.$nextTick(() => this.fetchData())
      })
    },
    onReset() {
      let value = []
      if(this.dataSet.getViewData()) {
        this.dataSet.getViewData().forEach(element => {
          let val = {
            useGuidDescrt: '',
            useGuidDescrtEng: '',
          }
          value.push(val)
        });
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
      let value = []
      if(this.dataSet.getViewData()) {
        this.dataSet.getViewData().forEach(element => {
          let val = {
            seqNo: element.__idx+1,
            useGuidDescrt: element.useGuidDescrt,
            useGuidDescrtEng: element.useGuidDescrtEng,
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
<style scoped>
</style>
