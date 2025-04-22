<template>
  <div>
    <!-- 시설 카테고리 관리 -->
    <div class="comm_title_wrap mt35">
      <h4 class="-grid__column__header__root-required pr10">
        {{title}}
      </h4>
      <ur-button color="violet" @click="onAdd">
        추가
      </ur-button>
      <ur-button color="violet" @click="onDelete">
        삭제
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
  </div>
</template>
<script>
export default {
  name: 'PGE_AAB_00002_C12', // eslint-disable-line vue/name-property-casing
  props: {
    title: {
      type: String,
      required: false,
    },
    items: {
      type: Array,
      required: false,
    },
    list: {
      type: Array,
      required: false,
    },
  },
  components: {
  },
  data() {
    return {
      // 그리드
      opts: {
        noInfo: true,
        multiSelect: true,
        selectCheck: true,
        //blockSelectToggle: true,
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
    // 그리드 컬럼 세팅
    let that = this;
    this.columns = [
      {
        value: '__idx', text: 'No.', width: 50, customValue: (v) => v+1
      },
      {
        value: 'code',
        text: '시설카테고리',
        width: 300,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          components: {},
          computed: {
            items() {
              return that.items
            },
          },
          template: '<div><ur-dropdown ref="dropdown" v-model="value" :items="items" @input="onInput"/></div>',
          methods: {
            onInput(v) {
              that.dataSet.setRowValue(this.row, 'code', v)
              this.$nextTick(() => that.fetchData())
            },
          },
        },
      },
      { value: 'padding', text: '' },
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
      if (!utils.isEmpty(list)) {
        this.list.forEach(element => {
          const row = {
            code: element.faciltCateKindCd,
          }
          this.add(row)
        })
      }
    },
    onAdd() {
      const row = {
        code: this.items[0].value,
      }
      this.add(row)
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
    fetchData() {
      const data = Object.assign({}, this.dataSet.getChanged())
      let value = []
      if(this.dataSet.getViewData()) {
        this.dataSet.getViewData().forEach(element => {
          value.push({
            seqNo: element.__idx+1,
            faciltCateKindCd: element.code,
          })
        });
      }
      data.view = value
      this.$emit('update', data)
    },
  },
}
</script>
<style scoped>
</style>
