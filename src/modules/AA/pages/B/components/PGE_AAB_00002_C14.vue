<template>
  <div>
    <!-- 제한사항 아이콘 관리 -->
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
    <!-- ALERT 모달 -->
    <ALERT ref="modalAlert" />
  </div>
</template>
<script>
import ALERT from './PGE_AAB_00001_P01.vue'

export default {
  name: 'PGE_AAB_00002_C14', // eslint-disable-line vue/name-property-casing
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
      CODE_KEYS: [
        'COD_IA_UPLOAD_KIND',
        'COD_IA_CB_LIMIT_ITEM',
        'COD_IA_CB_LIMIT_INHIBITION_ITEM',
        'COD_IA_CB_LIMIT_CAUTION_ITEM',
        'COD_IA_CB_LIMIT_INSTRUCTION_ITEM',
        'COD_IA_CB_LIMIT_DISABLED_ITEM',
      ],
      codes: {
        COD_IA_UPLOAD_KIND: [],
        COD_IA_CB_LIMIT_ITEM: [],
        COD_IA_CB_LIMIT_INHIBITION_ITEM: [],
        COD_IA_CB_LIMIT_CAUTION_ITEM: [],
        COD_IA_CB_LIMIT_INSTRUCTION_ITEM: [],
        COD_IA_CB_LIMIT_DISABLED_ITEM: [],
      },
      // 그리드
      opts: {
        noInfo: true,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
        rowHeight: 'auto', // 첨부가 포함된 그리드에 해당 옵션을 추가해주지 않으면 row가 상하로 늘어나지 않습니다.
      },
      columns: [],
      dataSet: new this.$ur.grid.DataSet(),
    }
  },
  computed: {
    contextPageId() {
      return this.$attrs['page-id']
    },
    grid() {
      return this.$refs.grid
    },
  },
  watch: {
  },
  created() {
    http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
  },
  mounted() {
    //console.log('[codes]', this.codes)
    let that = this
    this.columns = [
      {
        value: '__idx', text: 'No.', width: 100, customValue: v => v + 1,
      },
      {
        value: 'uploadKindCd',
        text: '업로드 구분',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          computed: {
            COD_IA_UPLOAD_KIND() {
              return that.codes.COD_IA_UPLOAD_KIND
            },
          },
          template: '<div><ur-radio-wrapper :items="COD_IA_UPLOAD_KIND" v-model="value" sm @input="onInput"/></div>',
          methods: {
            onInput(v) {
              that.dataSet.setRowValue(this.row, 'uploadKindCd', v)
              that.dataSet.setRowValue(this.row, 'limitItem1Cd', '')
              that.dataSet.setRowValue(this.row, 'limitItem2Cd', '')
              that.dataSet.setRowValue(this.row, 'iconImagUrl', '')
              this.$nextTick(() => that.fetchData())
            },
          },
        },
      },
      {
        value: 'limitItem1Cd',
        text: '제한사항',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          computed: {
            CONTEXT_PAGE_ID() {
              return that.contextPageId
            },
            COD_IA_LIMIT_ITEM() {
              return that.codes.COD_IA_CB_LIMIT_ITEM
            },
            COD_IA_LIMIT_INHIBITION_ITEM() {
              return that.codes.COD_IA_CB_LIMIT_INHIBITION_ITEM
            },
            COD_IA_LIMIT_CAUTION_ITEM() {
              return that.codes.COD_IA_CB_LIMIT_CAUTION_ITEM
            },
            COD_IA_LIMIT_INSTRUCTION_ITEM() {
              return that.codes.COD_IA_CB_LIMIT_INSTRUCTION_ITEM
            },
            COD_IA_LIMIT_DISABLED_ITEM() {
              return that.codes.COD_IA_CB_LIMIT_DISABLED_ITEM
            },
          },
          template: `<div class="pdCol10">
            <div v-if="this.row.uploadKindCd=='01'">
              <ur-dropdown v-model="row.limitItem1Cd" :items="COD_IA_LIMIT_ITEM" no-select="no-select" :msg-no-select="$t('MSG_TXT_SEL')" @input="onInput1" style="width:160px;"/>
              <ur-dropdown v-if="row.limitItem1Cd===''" v-model="row.limitItem2Cd" no-select="no-select" :msg-no-select="$t('MSG_TXT_SEL')" />
              <ur-dropdown v-if="row.limitItem1Cd==='01'" v-model="row.limitItem2Cd" :items="COD_IA_LIMIT_INHIBITION_ITEM" no-select="no-select" :msg-no-select="$t('MSG_TXT_SEL')" @input="onInput2" style="width:200px;"/>
              <ur-dropdown v-if="row.limitItem1Cd==='02'" v-model="row.limitItem2Cd" :items="COD_IA_LIMIT_CAUTION_ITEM" no-select="no-select" :msg-no-select="$t('MSG_TXT_SEL')" @input="onInput2" style="width:200px;"/>
              <ur-dropdown v-if="row.limitItem1Cd==='03'" v-model="row.limitItem2Cd" :items="COD_IA_LIMIT_INSTRUCTION_ITEM" no-select="no-select" :msg-no-select="$t('MSG_TXT_SEL')" @input="onInput2" style="width:200px;"/>
              <ur-dropdown v-if="row.limitItem1Cd==='04'" v-model="row.limitItem2Cd" :items="COD_IA_LIMIT_DISABLED_ITEM" no-select="no-select" :msg-no-select="$t('MSG_TXT_SEL')" @input="onInput2" style="width:200px;"/>
            </div>
            <div v-else> 
              <cmp-single-file-uploader
                v-model="row.iconImagUrl"
                mode="UPLOAD"
                upload-target="FAC000"
                accepts="jpg,png,gif"
                pixels="72*72"
                preview-mode="BELOW"
                show-guidance
                page-id="null"
                :rules="$rules.getRules('not_null')"
                @input="onInput3" 
              />
            </div>
          </div>`,
          methods: {
            onInput1(v) {
              that.dataSet.setRowValue(this.row, 'limitItem1Cd', v)
              that.dataSet.setRowValue(this.row, 'limitItem2Cd', '')
              that.dataSet.setRowValue(this.row, 'iconImagUrl', '')
              this.$nextTick(() => that.fetchData())
            },
            onInput2(v) {
              that.dataSet.setRowValue(this.row, 'limitItem2Cd', v)
              that.dataSet.setRowValue(this.row, 'iconImagUrl', '')

              console.log('REQ-LIMIT ICON')
              const serviceName = 'DTS_AAB_00045'
              http.request(that.contextPageId, serviceName, {
                query: {
                  parkKindCd: '02',
                  limitItem1Cd: this.row.limitItem1Cd,
                  limitItem2Cd: this.row.limitItem2Cd,
                },
                path: {},
                data: {},
              }).then(res => {
                console.log('RES-LIMIT ICON', res.data)
                that.dataSet.setRowValue(this.row, 'iconImagUrl', res.data.limitIconImagUrl)
              }).catch(error => {
                console.log(error)
              })

              this.$nextTick(() => that.fetchData())
            },
            onInput3(v) {
              that.dataSet.setRowValue(this.row, 'iconImagUrl', v)
              this.$nextTick(() => that.fetchData())
            },
          },
        },
      },
      {
        value: 'limitIconImagUrl',
        text: '아이콘 미리보기',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          computed: {
            CONTEXT_PAGE_ID() {
              return that.contextPageId
            },
          },
          template: `<div class="pdCol10">
            <div v-if="this.row.uploadKindCd==='01'">
              <div v-if="row.iconImagUrl==='' || row.iconImagUrl===null || row.iconImagUrl===undefined">-</div>
              <div v-else>
                <cmp-single-file-uploader
                  v-if="false"
                  :value="row.iconImagUrl"
                  mode="SELECT"
                  preview-mode="BELOW"
                  :page-id="CONTEXT_PAGE_ID"
                />
                <img :src="row.iconImagUrl"/>
              </div>
            </div>
            <div v-else>
              -
            </div>
          </div>`,
        },
      },
      //{ value: 'padding', text: '' },
    ]
    // 그리드 초기 값 세팅
    this.update(this.list)
  },
  methods: {
    alert(msg) {
      this.$refs.modalAlert.open(msg)
    },
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
    closed() {},
    onAdd() {
      if (this.dataSet.dataSize > 9) {
        this.alert('제한사항 아이콘은 최대 10개까지 추가할 수 있습니다.') // 제한사항 아이콘 최대 10개 제한
        return
      }
      this.dataSet.addRow({
        uploadKindCd: '01',
        limitItem1Cd: '',
        limitItem2Cd: '',
        iconImagUrl: '',
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
      if (this.dataSet.getViewData()) {
        this.dataSet.getViewData().forEach(element => {
          const val = {
            uploadKindCd: element.uploadKindCd,
            limitItem1Cd: '',
            limitItem2Cd: '',
            iconImagUrl: '',
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
      let value = []
      if (this.dataSet.getViewData()) {
        this.dataSet.getViewData().forEach(element => {
          let val = {
            seqNo: element.__idx+1,
            uploadKindCd: element.uploadKindCd,
            limitItem1Cd: element.limitItem1Cd,
            limitItem2Cd: element.limitItem2Cd,
            iconImagUrl: element.iconImagUrl,
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
