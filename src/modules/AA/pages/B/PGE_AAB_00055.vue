<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div>
        <template slot="title">
          <div class="modal-title mb45">
            공연시간
          </div>
        </template>
        <template>
          <div class="modal-body">
            <!-- ::S 콘텐츠2 -->
            <ur-data-grid
              ref="grid"
              :headers="columns"
              :data-source="dataSet"
              :options="opts"
              height="300"
            >
              <template
                #left-info
              >
                <div class="mb10">
                  <ur-button
                    color="violet"
                    sm
                    @click="onAdd"
                  >
                    추가
                  </ur-button>
                  <ur-button
                    color="violet"
                    sm
                    @click="onDelete"
                  >
                    삭제
                  </ur-button>
                  <ur-button
                    color="violet"
                    sm
                    @click="onResetGrid"
                  >
                    초기화
                  </ur-button>
                </div>
              </template>
            </ur-data-grid>
      
            <div v-if="false">{{dataSetChangedData}}</div>
            <div v-if="false">{{dataSetRawData}}</div>
            <ur-table v-if="false" :items="dataSetRawData" :headers="columnsD" no-control title="RAW"/>
            <div v-if="false">{{dataSetChangedData}}</div>
            <ur-table v-if="false" :items="dataSetChangedData" :headers="columnsD" no-control title="CRU"/>

            <div class="comm_btn_wrap bt1">
              <div class="right_box mt10">
                <ur-button @click="onClose">
                  닫기
                </ur-button>
                <ur-button
                  v-permission:create="contextPageId"
                  color="violet"
                  @click="onSave"
                >
                  저장
                </ur-button>
              </div>
            </div>
            <!-- ::E 콘텐츠2 -->
          </div>
        </template>
      </div>
    </sui-page-contents>
  </sui-page>
</template>

<script>
export default {
  name: 'PGE_AAB_00055', // eslint-disable-line vue/name-property-casing
  components: {
  },
  props: {
    pageInitialData: {
      type: Object,
      default() {
        return {}
      },
    },
    closePagePopup: {
      type: Function,
      default() {
        return null
      },
    },
  },
  data() {
    return {
      CODE_KEYS: [
        'COD_RS_PARK_KIND',
        'COD_IA_PERFRM_STATUS',
      ],
      codes: {
        COD_RS_PARK_KIND: [],
        COD_IA_PERFRM_STATUS: [],
      },
      // 일자별 Q-PASS Tier 관리 시설 명 드랍다운 데이터
      FACILT_LIST: [],
      params: {
        faciltId: '',
        salesDate: '',
      },
      dataSet: new this.$ur.grid.DataSet(),
      dataSetRawData: [],
      dataSetChangedData: [],
      // 일자별 Q-PASS Tier 관리 테이블
      columns: [],
      // 테이블
      opts: { // 토탈o
        // msgTotal: false,
        noInfo: false,
        noBaseInfo: false,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        /*
        styleBordered: false,
        resizableColumn: true,
        headerHeight: 36,
        resizeFullWidth: false,
        noInfo: false,
        height: 570,
        pagination: true,
        defaultPageSize: 10,
        */
      },
      columnsD: [
        { value: 'seqNo', text: 'seqNo', width: 100, customValue: v => v ? v : '-' },
        { value: '__dirty', text: '__dirty', width: 100, customValue: v => v ? v : '-' },
        { value: '__id', text: '__id', width: 100, customValue: v => v ? v : '-' },
        { value: 'faciltId', text: 'faciltId', width: 100, customValue: v => v ? v : '-' },
        { value: 'salesDate', text: 'salesDate', width: 100, customValue: v => v ? v : '-' },
        { value: 'perfrmStartTime', text: 'perfrmStartTime', width: 100, customValue: v => v ? v : '-' },
        { value: 'perfrmStartTimeOrg', text: 'perfrmStartTimeOrg', width: 100, customValue: v => v ? v : '-' },
        { value: 'perfrmStatusCd', text: 'perfrmStatusCd', width: 100, customValue: v => v ? v : '-' },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    contextPageId() {
      // return this.$attrs['page-id']
      return this.$options.name
    },
    grid() {
      return this.$refs.grid
    },
    initData() {
      return this.pageInitialData
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
    http.mergeCodeList(this.contextPageId, this.CODE_KEYS, this.codes)
    console.log('CODES:', this.codes)

    const THAT = this
    this.columns = [
      {
        value: 'perfrmStartTime',
        text: '공연 시작시간',
        width: 120,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-text-field
              :value="value"
              mask="time"
              :rules="$rules.getRules('not_null','min_len(4)','max_int(2400)')"
              style="width:90%; height:auto;"
              @input="onInput"
            />
          </div>`,
          methods: {
            onInput(v) {
              console.log('onInput', v)
              THAT.dataSet.setRowValue(this.row, 'perfrmStartTime', v)
              THAT.fetchData()
            },
          },
        },
      },
      {
        text: '공연상태',
        value: 'perfrmStatusCd',
        required: true,
        component: {
          props: ['row', 'value', 'text', 'me'],
          computed: {
            COD_IA_PERFRM_STATUS() {
              return THAT.codes.COD_IA_PERFRM_STATUS
            },
          },
          template: `<div>
            <ur-dropdown
              style="width:70%;"
              :value="value"
              :items="COD_IA_PERFRM_STATUS"
              :rules="$rules.getRules('not_null')"
              @input="onInput"
            />
          </div>`,
          methods: {
            onInput(v) {
              console.log('onInput', v)
              THAT.dataSet.setRowValue(this.row, 'perfrmStatusCd', v)
              THAT.fetchData()
            },
          },
        },
      },
      {
        value: 'fstRgstDtm',
        text: '등록일시',
        width: 200,
        customValue: v => {
          v = utils.dateformatToClient(v)
          return v ? v : '-'
        },
      },
      {
        value: 'fstRgstUsrId', text: '등록자',
      },
      {
        value: 'fnlMdfcDtm',
        text: '수정일시',
        width: 200,
        customValue: v => {
          v = utils.dateformatToClient(v)
          return v ? v : '-'
        },
      },
      {
        value: 'fnlMdfcUsrId', text: '수정자',
      },
    ]

    this.onSearch()
  },
  methods: {
    clearGrid() {
      console.log('clearGrid')
      this.dataSet.setData([])
      this.dataSetRawData = []
    },
    onResetGrid() {
      console.log('onResetGrid')
      /*
      const d = this.grid.getData()
      if (!!d) {
        d.forEach(r => {
          this.grid.setRow(r.__id, {
            perfrmStartTime: '', // 공연시작시간
            perfrmStatusCd: 'OPEN', // 공연상태
          })
        })
      }
      */
      this.onSearch()
    },
    onSearch() {
      console.log('onSearch')

      this.params.faciltId = this.pageInitialData.faciltId
      this.params.salesDate = this.pageInitialData.salesDate

      console.log('REQ DATA:', this.params)
      const serviceName = 'DTS_AAB_00022'
      http.request(this.contextPageId, serviceName, {
        query: this.params,
        path: {},
        data: {},
      }).then(res => {
        console.log('RES', res.data)
        this.dataSet.setData(res.data)
        this.dataSetRawData = res.data
      }).catch(error => {
        console.log(error)
      })
    },
    onDelete() {
      console.log('onDelete')
      const s = this.grid.getSelected()

      if (utils.isEmpty(s)) {
        utils.messageBox('warning', this.$t('선택 된 항목이 없습니다.'))
        return
      }

      utils.messageBox('confirm', this.$t('삭제하시겠습니까?'), null, () => { // 삭제하시겠습니까?
        if (!!s) {
          if (s.length === 1) {
            this.grid.removeRow(s[0].__id, false) // 2nd arg : select next row
          } else {
            this.grid.removeRow(s)
          }

          this.fetchData()
        } else {
          utils.messageBox('warning', this.$t('선택 된 항목이 없습니다.'))
        }
      })
    },
    onAdd() {
      console.log('onAdd')
      if (this.dataSet.dataSize > 8) {
        utils.messageBox('warning', this.$t('공연시간은 최대 9개까지 추가할 수 있습니다.'))
        return
      }
      this.addNewRow()
      this.fetchData()
    },
    addNewRow() {
      this.add({
        faciltId: this.params.faciltId, // 시설ID
        salesDate: this.params.salesDate, // 영업일
        perfrmStartTime: '', // 공연시작시간
        perfrmStatusCd: 'OPEN', // 공연상태
      })
    },
    add(row) {
      console.log('add')
      this.dataSet.addRow(row)
    },
    getGridChangedData() {
      console.log('getGridChangedData')
      const ch = Object.assign({}, this.dataSet.getChanged())
      const rawData = this.dataSetRawData

      // changed.removed 중에서 오리지널 리스트에 존재하던 것만 추려낸다.
      const removed = []
      ch.removed.forEach(removedElement => {
        const foundFromRaw = rawData.find(el => el.__id === removedElement.__id)
        if (!utils.isEmpty(foundFromRaw)) {
          removed.push(foundFromRaw)
        }
      })

      // changed.created 중에서 changed.removed 에 존재하는 것은 제외한다.
      const created = []
      ch.created.forEach(createdElement => {
        const found = ch.removed.find(el => el.__id === createdElement.__id)
        if (utils.isEmpty(found)) {
          created.push(createdElement)
        }
      })

      // changed.updated 중에서 changed.removed 에 존재하는 것은 제외한다.
      const updated = []
      ch.updated.forEach(updatedElement => {
        const found = ch.removed.find(el => el.__id === updatedElement.__id)
        if (utils.isEmpty(found)) {
          updated.push(updatedElement)
        }
      })
      return {
        created,
        removed,
        updated,
      }
    },
    onSave() {
      console.log('onSave')
      this.$nextTick(() => {
        const ch = this.getGridChangedData()
        console.log('REMOVED', ch.removed)
        console.log('CREATED', ch.created)
        console.log('UPDATED', ch.updated)
        if (this.validated(ch.removed, ch.created, ch.updated)) {
          utils.messageBox('confirm', this.$t('저장하시겠습니까?'), null, () => { // 저장하시겠습니까?
            console.log('REQ DATA:', ch)
            const serviceName = 'DTS_AAB_00023'
            http.request(this.contextPageId, serviceName, {
              query: {},
              path: {},
              data: {
                faciltId: this.params.faciltId,
                perfrmTimeListCreated: [...ch.created],
                perfrmTimeListUpdated: [...ch.updated],
                perfrmTimeListRemoved: [...ch.removed],
              },
            }).then(res => {
              console.log('RES', res.data)
              if (res.data.resultCode === '-1') { // -1 이면 서버 메시지를 그대로 표시한다.
                utils.messageBox('warning', res.data.msg)
              } else if (res.data.resultCode === '0') {
                utils.messageBox('warning', this.$t('공연시간 정보를 변경하는데 실패하였습니다.'))
              } else {
                utils.messageBox('warning', this.$t('공연시간 정보가 변경 되었습니다.'))
                //this.onSearch()
                this.closePagePopup()
              }
            }).catch(error => {
              console.log(error)
            })
          })
        }
      })
    },
    validated(pRemoved, pCreated, pUpdated) {
      const removed = pRemoved ?? []
      const created = pCreated ?? []
      const updated = pUpdated ?? []

      if ((created.length + updated.length + removed.length) === 0) {
        utils.messageBox('warning', this.$t('변경된 사항이 없습니다.'))
        return false
      }

      // 필수항목
      if (!this.$rules.validate(this)) {
        utils.messageBox('warning', this.$t('필수 항목이 입력되지 않았습니다.'))
        return false
      }

      const CR = [...created, ...updated]
      // 신규 및 수정항목 입력값 perfrmStartTime 에서 분값이 60을 초과하는지 확인
      const found = CR.find(v => {
        if (v.perfrmStartTime.substr(2, 1) >= '6') return true
        return false
      })
      if (!utils.isEmpty(found)) {
        utils.messageBox('warning', this.$t(`공연시간 '${found.perfrmStartTime.substr(0, 2)}:${found.perfrmStartTime.substr(2, 2)}'이 올바르지 않습니다. (60분 단위 초과)`))
        return false
      }

      // [공연시간] 중복 데이터 확인
      if (CR.filter(element => {
        const TIME = element.perfrmStartTime

        if (!utils.isEmpty(TIME)) {
          if (CR.filter(el => {
            if (el.perfrmStartTime === TIME) {
              return true
            }
            return false
          }).length > 1) {
            return true
          }
        }

        return false
      }).length > 0) {
        utils.messageBox('warning', this.$t('공연시간이 중복 입력되었습니다.'))
        return false
      }

      return true
    },
    fetchData() {
      console.log('fetchData')
      this.$nextTick(() => {
        const CRUData = []
        const ch = this.getGridChangedData()
        ch.created.forEach(element => {
          CRUData.push({
            seqNo: element.__idx+1,
            __dirty: element.__dirty,
            __id: element.__id,

            faciltId: element.faciltId, // 시설ID
            salesDate: element.salesDate, // 영업일자
            perfrmStartTime: element.perfrmStartTime, // 공연시작시간
            perfrmStartTimeOrg: element.perfrmStartTimeOrg, // 공연시작시간 (조회 시점의 perfrmStartTime 값)
            perfrmStatusCd: element.perfrmStatusCd, // 공연상태
          })
        })
        ch.removed.forEach(element => {
          CRUData.push({
            seqNo: element.__idx+1,
            __dirty: element.__dirty,
            __id: element.__id,

            faciltId: element.faciltId, // 시설ID
            salesDate: element.salesDate, // 영업일자
            perfrmStartTime: element.perfrmStartTime, // 공연시작시간
            perfrmStartTimeOrg: element.perfrmStartTimeOrg, // 공연시작시간 (조회 시점의 perfrmStartTime 값)
            perfrmStatusCd: element.perfrmStatusCd, // 공연상태
          })
        })
        ch.updated.forEach(element => {
          CRUData.push({
            seqNo: element.__idx+1,
            __dirty: element.__dirty,
            __id: element.__id,

            faciltId: element.faciltId, // 시설ID
            salesDate: element.salesDate, // 영업일자
            perfrmStartTime: element.perfrmStartTime, // 공연시작시간
            perfrmStartTimeOrg: element.perfrmStartTimeOrg, // 공연시작시간 (조회 시점의 perfrmStartTime 값)
            perfrmStatusCd: element.perfrmStatusCd, // 공연상태
          })
        })
        this.dataSetChangedData = CRUData
      })
    },
    onClose() {
      this.closePagePopup('Close')
    },
  },
}
</script>
<style scoped>
</style>
