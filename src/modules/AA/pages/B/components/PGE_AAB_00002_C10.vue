<template>
  <div>
    <!-- 대표 메뉴 -->
    <div class="comm_title_wrap mt35">
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
  name: 'PGE_AAB_00002_C10', // eslint-disable-line vue/name-property-casing
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
        rowHeight: 'auto', // 첨부가 포함된 그리드에 해당 옵션을 추가해주지 않으면 row가 상하로 늘어나지 않습니다.
      },
      columns: [],
      dataSet: new this.$ur.grid.DataSet(),
      // 모달 메시지
      modalMsg: '',
    }
  },
  computed: {
    contextPageId() {
      return this.$attrs['page-id']
    },
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
    const that = this
    this.columns = [
      {
        value: '__idx', text: 'No.', width: 100, customValue: v => v + 1,
      },
      {
        value: 'menuDescrt',
        text: '메뉴 명 (국문)',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: '<div><ur-text-field v-model="value" maxlength="300" style="width: auto;" placeholder="" @input="onInput" /></div>',
          methods: {
            onInput(v) {
              that.dataSet.setRowValue(this.row, 'menuDescrt', v)
              this.$nextTick(() => that.fetchData())
            },
          },
        },
      },
      {
        value: 'menuDescrtEng',
        text: '메뉴 명 (영문)',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: '<div><ur-text-field v-model="value" maxlength="300" style="width: auto;" placeholder="" @input="onInput" /></div>',
          methods: {
            onInput(v) {
              that.dataSet.setRowValue(this.row, 'menuDescrtEng', v)
              this.$nextTick(() => that.fetchData())
            },
          },
        },
      },
      {
        value: 'menuPrice',
        text: '메뉴 가격',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: '<div><ur-text-field v-model="value" mask="number" maxlength="9" placeholder="" @input="onInput" /><div class="pdRow10" style="padding-top: 10px;">원</div></div>',
          methods: {
            onInput(v) {
              that.dataSet.setRowValue(this.row, 'menuPrice', v)
              this.$nextTick(() => that.fetchData())
            },
          },
        },
      },
      {
        value: 'menuImagUrl',
        text: '메뉴이미지',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          computed: {
            CONTEXT_PAGE_ID() {
              return that.contextPageId
            },
          },
          template: `<div class="pdCol10">
            <cmp-single-file-uploader
              v-model="value"
              mode="UPLOAD"
              upload-target="FAC000"
              accepts="jpg,png,gif"
              pixels="144*144"
              preview-mode="BELOW"
              show-guidance
              :page-id="CONTEXT_PAGE_ID"
              :rules="$rules.getRules('not_null')"
              @input="onInput" 
            />
          </div>`,
          methods: {
            onInput(v) {
              that.dataSet.setRowValue(this.row, 'menuImagUrl', v)
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
    openModal(msg) { this.modalMsg = msg; this.modal.open() },
    closeModal() { this.modalMsg = ''; this.modal.close() },
    closed() {},
    update(list) {
      // 그리드 업데이트
      this.dataSet.setData(list)
    },
    onAdd() {
      if (this.dataSet.dataSize > 9) {
        this.alert('대표 메뉴는 최대 10개까지 추가할 수 있습니다.') // 대표 메뉴 최대 10개 제한
        return
      }
      this.dataSet.addRow({
        menuDescrt: '',
        menuDescrtEng: '',
        menuPrice: '',
        menuImagUrl: '',
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
            menuDescrt: '',
            menuDescrtEng: '',
            menuPrice: '',
            menuImagUrl: '',
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
            menuDescrt: element.menuDescrt,
            menuDescrtEng: element.menuDescrtEng,
            menuPrice: element.menuPrice,
            menuImagUrl: element.menuImagUrl,
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
