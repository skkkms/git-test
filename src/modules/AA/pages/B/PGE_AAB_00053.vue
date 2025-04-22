<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div>
        <template slot="title">
          <div class="modal-title mb45">
            일자별 Q-PASS Tier 관리
          </div>
        </template>
        <template>
          <div class="modal-body">
            <!-- ::S 콘텐츠1 -->
            <ur-form-box toggleable>
              <ur-form-item
                label="시설명"
                :label-align="'right'"
                style="width: 100%; height: auto;"
                required
                class="flex_wrap"
              >
                <ur-auto-dropdown
                  v-model="params.faciltId"
                  :items="FACILT_LIST"
                  style="width: 100%;"
                  no-select="no-select"
                  msg-no-select=""
                  :placeholder="$t('MSG_TXT_SEL')"
                  @keydown.enter="onSearch"
                  @input="onSearch"
                />
              </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
              <div class="right_box">
                <ur-button @click="onReset">
                  초기화
                </ur-button>
                <ur-button
                  color="violet"
                  @click="onSearch"
                >
                  검색
                </ur-button>
              </div>
            </div>
            <!-- ::E 콘텐츠1 -->
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
                  v-permission:update="contextPageId"
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
  name: 'PGE_AAB_00053', // eslint-disable-line vue/name-property-casing
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
        'COD_IA_QPASS_GRP',
      ],
      codes: {
        COD_RS_PARK_KIND: [],
        COD_IA_QPASS_GRP: [],
      },
      // 일자별 Q-PASS Tier 관리 시설 명 드랍다운 데이터
      FACILT_LIST: [],
      params: {
        faciltId: '',
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
        { value: 'salesStartDate', text: 'salesStartDate', width: 100, customValue: v => v ? v : '-' },
        { value: 'salesStartDateOrg', text: 'salesStartDateOrg', width: 100, customValue: v => v ? v : '-' },
        { value: 'salesEndDate', text: 'salesEndDate', width: 100, customValue: v => v ? v : '-' },
        { value: 'qpassGrpCd', text: 'qpassGrpCd', width: 100, customValue: v => v ? v : '-' },
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
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
    http.mergeCodeList(this.contextPageId, this.CODE_KEYS, this.codes)
    console.log('CODES:', this.codes)

    this.getFaciltList()

    const THAT = this
    this.columns = [
      {
        text: '시작날짜',
        value: 'salesStartDate',
        width: 350,
        required: true,
        component: {
          props: ['row', 'value', 'text', 'me'],
          template: `<div>
            <ur-date-picker 
              style="padding-right:20px; width:50% !important;"
              :value="value"
              input-type="YYYY-MM-DD"
              model-type="YYYYMMDD"
              :confirm-label="$t('선택')"
              :today-label="$t('오늘')"
              :rules="$rules.getRules('not_null')"
              @input="onInput"
            />
            <div v-if="false">/ {{row.__dirty}}</div>
          </div>`,
          methods: {
            onInput(v) {
              console.log('onInput', v)
              if (this.value !== v) THAT.dataSet.setRowValue(this.row, 'salesStartDate', v)
              THAT.fetchData()
            },
          },
        },
      },
      {
        text: '종료날짜',
        value: 'salesEndDate',
        required: true,
        width: 350,
        component: {
          props: ['row', 'value', 'text', 'me'],
          template: `<div>
            <ur-date-picker
              style="padding-right:20px; width:50% !important;"
              :value="value"
              input-type="YYYY-MM-DD"
              model-type="YYYYMMDD"
              :confirm-label="$t('선택')"
              :today-label="$t('오늘')"
              :rules="$rules.getRules('not_null')"
              @input="onInput"
            />
          </div>`,
          methods: {
            onInput(v) {
              console.log('onInput', v)
              if (this.value !== v) THAT.dataSet.setRowValue(this.row, 'salesEndDate', v)
              THAT.fetchData()
            },
          },
        },
      },
      {
        text: 'Q-PASS 그룹',
        value: 'qpassGrpCd',
        required: true,
        component: {
          props: ['row', 'value', 'text', 'me'],
          computed: {
            COD_IA_QPASS_GRP() {
              return THAT.codes.COD_IA_QPASS_GRP
            },
          },
          template: `<div>
            <ur-dropdown
              style="width:70%;"
              :value="value"
              :items="COD_IA_QPASS_GRP"
              no-select="no-select"
              :msg-no-select="$t('미선택')"
              :rules="$rules.getRules('not_null')"
              @input="onInput"
            />
          </div>`,
          methods: {
            onInput(v) {
              console.log('onInput', v)
              if (this.value !== v) THAT.dataSet.setRowValue(this.row, 'qpassGrpCd', v)
              THAT.fetchData()
            },
          },
        },
      },
    ]
  },
  methods: {
    getFaciltList() {
      console.log('getFaciltList')

      console.log('REQ DATA:', {})
      const serviceName = 'DTS_AAB_00018'
      http.request(this.contextPageId, serviceName, {
        query: {
          parkKindCd: this.pageInitialData.parkKindCd,
        },
        path: {},
        data: {},
      }).then(res => {
        console.log('RES', res.data)
        if (res.data && res.data.length > 0) {
          // utils.messageBox('warning', `신규로 등록 가능한 시설이 ${res.data.length}개 조회 되었습니다.`)
          this.FACILT_LIST = res.data
        } else {
          utils.messageBox('warning', this.$t('조회 가능한 시설이 없습니다.'))
        }
      }).catch(error => {
        console.log(error)
      })
      console.log('REQ END')
    },
    onReset() {
      console.log('onReset')
      this.params = {
        faciltId: '',
      }
      this.clearGrid()
    },
    clearGrid() {
      console.log('clearGrid')
      this.dataSet.setData([])
      this.dataSetRawData = []
    },
    onResetGrid() {
      console.log('onResetGrid')
      const d = this.grid.getData()
      if (!!d) {
        d.forEach(r => {
          this.grid.setRow(r.__id, {
            salesStartDate: '', // 시작날짜
            salesEndDate: '', // 종료날짜
            qpassGrpCd: '', // Q-PASS 그룹
          })
        })
      }
    },
    onSearch() {
      console.log('onSearch')

      if (utils.isEmpty(this.params.faciltId)) {
        utils.messageBox('warning', this.$t('시설이 선택되지 않았습니다.'))
        return
      }

      console.log('REQ DATA:', this.params)
      const serviceName = 'DTS_AAB_00020'
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

      if (utils.isEmpty(this.params.faciltId)) {
        utils.messageBox('warning', this.$t('시설이 선택되지 않았습니다.'));
        return
      }

      this.addNewRow()
      this.fetchData()
    },
    addNewRow() {
      this.add({
        faciltId: this.params.faciltId, // 시설ID
        salesStartDate: '', // 시작날짜
        salesEndDate: '', // 종료날짜
        qpassGrpCd: '', // Q-PASS 그룹
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
            const serviceName = 'DTS_AAB_00019'
            http.request(this.contextPageId, serviceName, {
              query: {},
              path: {},
              data: {
                faciltId: this.params.faciltId,
                qPassTierListCreated: [...ch.created],
                qPassTierListUpdated: [...ch.updated],
                qPassTierListRemoved: [...ch.removed],
              },
            }).then(res => {
              console.log('RES', res.data)
              if (res.data.resultCode === '-1') { // -1 이면 서버 메시지를 그대로 표시한다.
                utils.messageBox('warning', res.data.msg)
              } else if (res.data.resultCode === '0') {
                utils.messageBox('warning', this.$t('일자별 Q-PASS Tier 정보를 변경하는데 실패하였습니다.'))
              } else {
                utils.messageBox('warning', this.$t('일자별 Q-PASS Tier 정보가 변경 되었습니다.'))
                //this.onSearch()
                this.onClose()
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

      const CR = [...updated, ...created]
      // 수정항목 입력값 salesStartDate, salesEndDate 비교확인
      const found = CR.find(v => {
        if (v.salesEndDate < v.salesStartDate) return true
        return false
      })
      if (!utils.isEmpty(found)) {
        const dt = found.salesStartDate
        const yyyy = dt.slice(0, 4)
        const mm = dt.slice(4, 6)
        const dd = dt.slice(6)
        utils.messageBox('warning', this.$t(`시작날짜(${yyyy}-${mm}-${dd})가 종료날짜 보다 늦은 항목이 있습니다.`))
        return false
      }

      const chk = this.periodOverlapCheck()
      if (chk.IS_OVERLAPPED) {
        utils.messageBox('warning', this.$t(`시작날짜 ${chk.OVERLAPPED_START_DATE}의 기간은 날짜가 중복 됩니다.`))
        return false
      }

      return true
    },
    periodOverlapCheck() {
      console.log('periodOverlapCheck')
      const VD = this.dataSet.getViewData()
      for (let i = 0; i < VD.length; i++) {
        for (let j = 0; j < VD.length; j++) {
          if (i == j) {
            continue
          }
          if ((VD[i].salesStartDate <= VD[j].salesStartDate && VD[i].salesEndDate >= VD[j].salesStartDate)
            || (VD[i].salesStartDate <= VD[j].salesEndDate && VD[i].salesEndDate >= VD[j].salesEndDate)) {
            const dt = VD[j].salesStartDate
            const yyyy = dt.slice(0, 4)
            const mm = dt.slice(4, 6)
            const dd = dt.slice(6)
            return {
              IS_OVERLAPPED: true,
              OVERLAPPED_START_DATE: `${yyyy}-${mm}-${dd}`,
            }
          }
        }
      }

      return {
        IS_OVERLAPPED: false,
      }
    },
    fetchData() {
      console.log('fetchData')
      this.$nextTick(() => {
        /*
        const ch = Object.assign({}, this.dataSet.getChanged())
        const rawData = this.dataSetRawData
        const CRUData = []

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
        */
        const CRUData = []
        const ch = this.getGridChangedData()
        ch.created.forEach(element => {
          CRUData.push({
            seqNo: element.__idx+1,
            __dirty: element.__dirty,
            __id: element.__id,

            faciltId: element.faciltId, // 시설ID
            salesStartDate: element.salesStartDate, // 시작날짜
            salesStartDateOrg: element.salesStartDateOrg, // 시작날짜 (조회 시점의 salesStartDate 값)
            salesEndDate: element.salesEndDate, // 종료날짜
            qpassGrpCd: element.qpassGrpCd, // Q-PASS 그룹
          })
        })
        ch.removed.forEach(element => {
          CRUData.push({
            seqNo: element.__idx+1,
            __dirty: element.__dirty,
            __id: element.__id,

            faciltId: element.faciltId, // 시설ID
            salesStartDate: element.salesStartDate, // 시작날짜
            salesStartDateOrg: element.salesStartDateOrg, // 시작날짜 (조회 시점의 salesStartDate 값)
            salesEndDate: element.salesEndDate, // 종료날짜
            qpassGrpCd: element.qpassGrpCd, // Q-PASS 그룹
          })
        })
        ch.updated.forEach(element => {
          CRUData.push({
            seqNo: element.__idx+1,
            __dirty: element.__dirty,
            __id: element.__id,

            faciltId: element.faciltId, // 시설ID
            salesStartDate: element.salesStartDate, // 시작날짜
            salesStartDateOrg: element.salesStartDateOrg, // 시작날짜 (조회 시점의 salesStartDate 값)
            salesEndDate: element.salesEndDate, // 종료날짜
            qpassGrpCd: element.qpassGrpCd, // Q-PASS 그룹
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
