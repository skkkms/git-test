<template>
  <div>
    <!-- 키워드 관리 -->
    <div class="comm_title_wrap mt35">
      <h4 class="-grid__column__header__root-required pr10">
        {{ title }}
      </h4>
      <ur-button
        color="violet"
        @click="onAdd"
      >
        {{ $t('MSG_BTN_ADD') }} <!-- 추가 -->
      </ur-button>
      <ur-button
        color="violet"
        @click="onDelete"
      >
        {{ $t('MSG_BTN_DEL') }}  <!-- 삭제 -->
      </ur-button>
      <ur-button
        color="violet"
        @click="onReset"
      >
        {{ $t('MSG_BTN_INTL') }} <!-- 초기화 -->
      </ur-button>
    </div>
    <!-- GRID -->
    <ur-data-grid
      ref="grid"
      :headers="columns"
      :data-source="dataSet"
      :options="opts"
      height="300"
    />
  </div>
</template>
<script>
export default {
  name: 'PGE_AAB_00002_C02', // eslint-disable-line vue/name-property-casing
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
    }
  },
  computed: {
    grid() {
      return this.$refs.grid
    },
  },
  watch: {
  },
  created() {
  },
  mounted() {
    const that = this
    this.columns = [
      {
        value: '__idx', text: 'No.', width: 100, customValue: v => v + 1,
      },
      {
        value: 'keywordDescrt',
        text: '키워드 (국문)',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: '<div><ur-text-field v-model="value" maxlength="300" style="width: auto;" placeholder="" @input="onInput" /></div>',
          methods: {
            onInput(v) {
              that.dataSet.setRowValue(this.row, 'keywordDescrt', v)
              this.$nextTick(() => that.fetchData())
            },
          },
        },
      },
      {
        value: 'keywordDescrtEng',
        text: '키워드 (영문)',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: '<div><ur-text-field v-model="value" maxlength="300" style="width: auto;" placeholder="" @input="onInput" /></div>',
          methods: {
            onInput(v) {
              that.dataSet.setRowValue(this.row, 'keywordDescrtEng', v)
              this.$nextTick(() => that.fetchData())
            },
          },
        },
      },
    ]
    // 그리드 초기 값 세팅
    this.update(this.list)
  },
  methods: {
    closed() {},
    update(list) {
      this.dataSet.setData(list)
    },
    onAdd() {
      if (this.dataSet.dataSize > 4) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_MAX_ADD_CNT'), this.$t('MSG_TXT_KEYWORD'), 5)) // {키워드}은(는) 최대 {10}개까지 추가할 수 있습니다.
        return
      }
      this.dataSet.addRow({
        keywordDescrt: '',
        keywordDescrtEng: '',
      })
      this.$nextTick(() => this.fetchData())
    },
    add(row) {
      this.dataSet.addRow(row)
      this.$nextTick(() => this.fetchData())
    },
    onDelete() {
      const rows = this.grid.getSelected()
      if (utils.isEmpty(rows)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM')) // 선택된 항목이 없습니다.
        return
      }
      utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => { this.deleteRows(rows) }) // 삭제 하시겠습니까?
    },
    deleteRows(rows) {
      rows.forEach(row => this.grid.removeRow(row, false))
      this.$nextTick(() => this.fetchData())
    },
    onReset() {
      const value = []
      if (this.dataSet.getViewData()) {
        this.dataSet.getViewData().forEach(() => {
          const val = {
            keywordDescrt: '',
            keywordDescrtEng: '',
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
            seqNo: element.__idx + 1, // eslint-disable-line no-underscore-dangle
            keywordDescrt: element.keywordDescrt,
            keywordDescrtEng: element.keywordDescrtEng,
          }
          value.push(val)
        })
      }
      data.view = value
      this.$emit('update', data)
    },
  },
}
</script>
<style scoped>
</style>
