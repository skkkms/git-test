<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
      <sui-page-contents>
      <div>
        <!-- 가상대기 여부 코드 관리 -->
        <template slot="title">
          <div class="modal-title mb45">
          </div>
        </template>
        <template>
          <!-- 검색조건 -->
          <ur-form-box toggleable>
            <ur-form-item
              :label="$t('MSG_TXT_MAP_CD')"
              :label-align="'right'"
              style="width: 50%; height: 50;"
              class="flex_wrap"
            >
              <ur-text-field
                ref="mappingCodeTF"
                v-model="params.mappingCode"
                style="width: 100%;"
                @input="onKeyUpInput"
                :rules="$rules.getRules('only_alphanumeric')"
                maxlength="5"
              />
            </ur-form-item>
          </ur-form-box>
          <div class="btn_wrap mt10">
            <div class="right_box">
              <!-- 검색조건EL : 조회 및 리셋 -->
              <ur-button @click="onReset">
                {{ $t('MSG_BTN_RESET') }}
              </ur-button>
              <ur-button
                color="violet"
                v-permission:read="$options.name"
                @click="onSearch"
              >
                {{ $t('MSG_BTN_SEARCH') }}
              </ur-button>
            </div>
          </div>
       </template>
    <template>
      <div v-if="false">{{dataSetRawData}}</div>
      <ur-table v-if="false" :items="dataSetRawData" :headers="columnsD" no-control title="RAW"/>
      <div v-if="false">{{dataSetChangedData}}</div>
      <ur-table v-if="false" :items="dataSetChangedData" :headers="columnsD" no-control title="CRU"/>

      <ur-data-grid
        ref="grid"
        class="custom_grid_pgeNav_None mt35"
        :headers="columns"
        :data-source="dataSet"
        :options="opts"
        :item-size="dataTotalCount"
        @grid:paging="pagingChange"
        @grid:data-changed="onDataChange"
        @grid:scroll-bottom="scrollBottom"
      >
      </ur-data-grid>
    </template>

    <!-- 그리드하단버튼EL : 삭제 & 신규등록 -->
    <div class="btn_wrap mt10">
      <div class="right_box">
        <ur-button
          @click="onDelete"
        >
          {{ $t('MSG_BTN_DEL') }}
        </ur-button>
        <ur-button
          color="violet"
          @click="onAdd"
        >
          {{ $t('MSG_BTN_FACILT_ADD') }}
        </ur-button>
        <ur-button
          color="violet"
          v-permission:create="$options.name"
          @click="onSave"
        >
          {{ $t('MSG_BTN_SAVE') }}
        </ur-button>
      </div>
    </div>
      </div>
    </sui-page-contents>
  </sui-page>
</template>

<script>

// const PARK_KIND_CD = '01' // '01' 에버랜드 , '02' 캐리비안베이

const RULES = {
  email       : /*NOSONAR*/(v) => !v || EMAIL_REGEX.test(v)                     || 'This value has to be e-mail form.',
  emailDomain : /*NOSONAR*/(v) => !v || !!EMAIL_DOMAIN.find(d => v.endsWith(d)) || 'The e-mail has wrong domain.',
  numEven     : /*NOSONAR*/(v) => !v || v%2 === 0                               || 'Number has to be even.',
  workDay     : /*NOSONAR*/(v) => !v || (1<=v.getDay() && v.getDay()<=5)        || 'The holiday is not allowed.',
  lessThan50  : /*NOSONAR*/(v) => !v || v>50                                    || 'Score has to greater than 50.',
  emailUserLength  : /*NOSONAR*/(v) => !v || v.split('@')[0].length < 20        || 'E-mail user has to less than 20.',
}

export default {
  name: 'PGE_AAB_00043', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      alertFlag: true,
      dataSet: new this.$ur.grid.DataSet(),
      dataSetRawData: [],
      dataSetChangedData: [],
      dataTotalCount: 0,
      opts: {
        styleBordered: false,
        resizableColumn: true,
        headerHeight: 36,
       // multiSelect: false,
        selectCheck: true,
        selectCheckOnly: true,
        resizeFullWidth: false,
        height: 470,
        defaultPageSize: 10,
        noInfo: true,
        pagination: false,
        rowEdit:true,
        
      },
      paging: {
        currentPage: '1',
        rowsPerPage: '10',
      },
      params: {
        mappingCode: '',
      },
      entrAvailYn: 'Y',
      operStatusCd: 'STND', // 운영상태 일괄변경 파라미터
      columns: [], // 그리드 헤드 초기화는 mounted 에서 해야 한다. that=this 연결 필요함!
      validateRule: [
        v => !!v || 'Required field!',
        v => v.length <= 10 || 'Maximum length is 10!',
      ],
      FACILT_DAILY_FREE_LIST: [],
      columnsD: [
        { value: 'seqNo', text: 'seqNo', width: 100, customValue: v => v ? v : '-' },
        { value: '__dirty', text: '__dirty', width: 100, customValue: v => v ? v : '-' },
        { value: '__id', text: '__id', width: 100, customValue: v => v ? v : '-' },
        { value: 'salesDate', text: 'salesDate', width: 100, customValue: v => v ? v : '-' },
        { value: 'faciltId', text: 'faciltId', width: 100, customValue: v => v ? v : '-' },
        { value: 'faciltCateKindCds', text: 'faciltCateKindCds', width: 100, customValue: v => v ? v : '-' },
        { value: 'openTime', text: 'openTime', width: 100, customValue: v => v ? v : '-' },
        { value: 'closeTime', text: 'closeTime', width: 100, customValue: v => v ? v : '-' },
        { value: 'perfrmTimes', text: 'perfrmTimes', width: 100, customValue: v => v ? v : '-' },
        { value: 'operStatusCd', text: 'operStatusCd', width: 100, customValue: v => v ? v : '-' },
        { value: 'waitTime', text: 'waitTime', width: 100, customValue: v => v ? v : '-' },
        { value: 'waitInfoApplyYn', text: 'waitInfoApplyYn', width: 100, customValue: v => v ? v : '-' },
        { value: 'qpassGrpCd', text: 'qpassGrpCd', width: 100, customValue: v => v ? v : '-' },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    contextPageId() {
      //return this.$attrs['page-id']
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
    //this.onReset()
    const that = this
    this.columns = [
      {
        text: this.$t('MSG_TXT_MAP_CD'), 
        value: 'mappingCode',
        required: true,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-text-field
              :rules="$rules.getRules('only_alphanumeric')"
              maxlength="5"
              :value="row.mappingCode"
              style="width:100%; height:auto;"
              @input="onInput"/>
          </div>`,
          methods: {
            onInput(v) {
              console.log('onInput')
              if(this.value !== v) {
                that.dataSet.setRowValue(this.row, 'mappingCode', v)
              } 
            },
          },
        },
      },
      {
        text: this.$t('MSG_TXT_FACILT_VLINE_WAIT_GRP'), 
        value: 'vlineWaitGrpYn',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
              <ur-checkbox v-model="row.vlineWaitAGrpYn" value="Y" sm @input="onInputA" /><span class="check_label" >A</span>
              <ur-checkbox v-model="row.vlineWaitBGrpYn" value="Y" sm @input="onInputB" /><span class="check_label ">B</span>
              <ur-checkbox v-model="row.vlineWaitCGrpYn" value="Y" sm @input="onInputC" /><span class="check_label" >C</span>
              <ur-checkbox v-model="row.vlineWaitDGrpYn" value="Y" sm @input="onInputD" /><span class="check_label" >D</span>
              <ur-checkbox v-model="row.vlineWaitEGrpYn" value="Y" sm @input="onInputE" /><span class="check_label" >E</span>
            </div>`,
          methods: {
            onInputA(v) {
              if(this.value !== v) that.dataSet.setRowValue(this.row, 'vlineWaitAGrpYn', v)
            },
            
            onInputB(v) {
              if(this.value !== v) that.dataSet.setRowValue(this.row, 'vlineWaitBGrpYn', v)
            },
            
            onInputC(v) {
              if(this.value !== v) that.dataSet.setRowValue(this.row, 'vlineWaitCGrpYn', v)
            },
            
            onInputD(v) {
              if(this.value !== v) that.dataSet.setRowValue(this.row, 'vlineWaitDGrpYn', v)
            },
            
            onInputE(v) {
              if(this.value !== v) that.dataSet.setRowValue(this.row, 'vlineWaitEGrpYn', v)
            },
          },
        },
      },
      { 
        text: this.$t('MSG_TXT_FST_RGST_DTM'), 
        value: 'firstRegistrationDTM', 
        width: 150,
          customValue: v => {
            v = utils.dateformatToClient(v)
            return v ? v : '-'
          }, 
        },
      { text: this.$t('MSG_TXT_FST_RGST_USR'),  value: 'firstRegistrationUserId', width: 100 },
      { 
        text: this.$t('MSG_TXT_MDFC_DTM'), 
        value: 'finalModificationDTM', 
        width: 150,
          customValue: v => {
            v = utils.dateformatToClient(v)
            return v ? v : '-'
          },
        },
      { text: this.$t('MSG_TIT_MDFC_USR'),  value: 'finalModificationUserId', width: 100 },
    ]
    
    // this.dataSet.setData(list)

    this.onSearch()
  },
  methods: {
    onReset() {
      console.log('onReset')

      this.params = {
        mappingCode: '',
      }
    },
    pagingChange(paging) {
      /**
       * [ Grid Pagination ]
       *  currentPage
       *  firstIndex
       *  oldPerPage
       *  rowsPerPage
       *  totalItems
       *  totalPages
       */
      this.paging = paging
      //this.onSearch()
    },
    scrollBottom() {
      this.search()
    },
    onSearch() {
      console.log('onSearch')
      this.dataSet.setData([])
      this.$nextTick(() => {
        this.search()
      })
    },
    search() {
      console.log('search')
      const query = Object.assign({}, this.params, this.paging, {
        infinityOffset: this.dataSet.getViewData().length
      })
      console.log('REQ', query)
      // const serviceName = 'DTS_AAB_00008'
      http.request(this.contextPageId, 'DTS_AAB_00014', {
        query: query,
        path: {},
        data: {},
      }).then(res => {
        console.log('RES', res.data)
        this.dataTotalCount = res.data.totalCount
        //this.dataSet.setData(res.data.list)
        this.dataSet.appendData(res.data.list)

        const rawData = []
        if (this.dataSet.getRawData()) {
          this.dataSet.getRawData().forEach(element => {
            rawData.push({
              seqNo: element.__idx+1,
              __dirty: element.__dirty,
              __id: element.__id,

              mappingId: element.mappingId,
              mappingCode: element.mappingCode,
              vlineWaitAGrpYn: element.vlineWaitAGrpYn,
              vlineWaitBGrpYn: element.vlineWaitBGrpYn,
              vlineWaitCGrpYn: element.vlineWaitCGrpYn,
              vlineWaitDGrpYn: element.vlineWaitDGrpYn,
              vlineWaitEGrpYn: element.vlineWaitEGrpYn,
            })
          })
        }
        this.dataSetRawData = rawData
        this.dataSetChangedData = []
      }).catch(error => {
        console.log('ERR', error)
      })
    },
    onDelete() {
      console.log('onDelete')
      const s = this.grid.getSelected()

      if (utils.isEmpty(s)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM')); // 선택된 항목이 없습니다.
        return
      }
 
      // 삭제하시겠습니까? (저장버튼을 클릭해야 삭제가 왼료 됩니다.)
      utils.messageBox('confirm', this.$t('MSG_TXT_WANT_DEL_BTN'), null, () => {
        if (!!s) {
          if (s.length === 1) this.grid.removeRow(s[0].__id, false) // 2nd arg : select next row
          else this.grid.removeRow(s)
  
          this.fetchData()
        } else {
          utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM')) // 선택된 항목이 없습니다.
        }
      });
    },
    onAdd() {
      console.log('onAdd')
      this.addNewRow()
    },
    addNewRow() {
      this.add({
        mappingCode: '',
        vlineWaitAGrpYn: 'N',
        vlineWaitBGrpYn: 'N',
        vlineWaitCGrpYn: 'N',
        vlineWaitDGrpYn: 'N',
        vlineWaitEGrpYn: 'N',
      })
    },
    add(row) {
      console.log('add')
      this.dataSet.addRow(row, this.dataSet.ADD_ROW_TOP)
    },
    onSave() {
      console.log('onSave')
      const changed = this.dataSet.getChanged()
      const rawData = this.dataSetRawData

      // changed.removed 중에서 오리지널 리스트에 존재하던 것만 추려낸다.
      const removed = []
      changed.removed.forEach(removedElement => {
        const foundFromRaw = rawData.find(el => el.__id === removedElement.__id)
        if (!utils.isEmpty(foundFromRaw)) {
          removed.push(foundFromRaw)
        }
      })

      // changed.created 중에서 changed.removed 에 존재하는 것은 제외한다.
      const created = []
      changed.created.forEach(createdElement => {
        const found = changed.removed.find(el => el.__id === createdElement.__id)
        if (utils.isEmpty(found)) {
          created.push(createdElement)
        }
      })

      // changed.updated 중에서 changed.removed 에 존재하는 것은 제외한다.
      const updated = []
      changed.updated.forEach(updatedElement => {
        const found = changed.removed.find(el => el.__id === updatedElement.__id)
        if (utils.isEmpty(found)) {
          updated.push(updatedElement)
        }
      })

      console.log('REMOVED', removed)
      console.log('CREATED', created)
      console.log('UPDATED', updated)
      if (this.validated(removed, created, updated)) {
        console.log('REQ DATA:', this.params)
        const serviceName = 'DTS_AAB_00016'
        utils.messageBox('confirm', this.$t('MSG_ALT_IS_SAV_DATA'), null, () => {
        http.request(this.contextPageId, serviceName, {
          query: {},
          path: {},
          data: {
            created: [...created],
            updated: [...updated],
            removed: [...removed],
          },
        }).then(res => {
          console.log('RES', res.data)
          if (res.data.resultCode === '0') {
            utils.messageBox('warning', res.data.msg)
          } else {
            utils.messageBox('success', this.$t('MSG_ALT_CHG_DATA')) // 변경되었습니다.
            this.onSearch()
          }
        }).catch(error => {
          console.log(error)
        })
        })
      }
    },
    validated(pRemoved, pCreated, pUpdated) {
      const removed = pRemoved ?? []
      const created = pCreated ?? []
      const updated = pUpdated ?? []

      if ((created.length + updated.length + removed.length) === 0) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_CHANGED_CNTN')) // 변경된 내용이 없습니다.
        return false
      }
       
      let f = created.find(el => utils.isEmpty(el.mappingCode))
      if(!utils.isEmpty(f)) {
        utils.messageBox('warning', this.$t('맴핑코드가 입력되지 않은 항목이 있습니다.'))
        return false
      }
      
      f = updated.find(el => utils.isEmpty(el.mappingCode))
      if(!utils.isEmpty(f)) {
        utils.messageBox('warning', this.$t('맴핑코드가 입력되지 않은 항목이 있습니다.'))
        return false
      }
       
      f = created.find(el => !utils.isEngNum_(el.mappingCode))
      if(!utils.isEmpty(f)) {
        utils.messageBox('warning', this.$t(`맵핑코드(${f.mappingCode})는 영문/숫자만 입력 가능합니다.`))
        return false
      }
      
      f = updated.find(el => !utils.isEngNum_(el.mappingCode))
      if(!utils.isEmpty(f)) {
        utils.messageBox('warning', this.$t(`맵핑코드(${f.mappingCode})는 영문/숫자만 입력 가능합니다.`))
        return false
      }
      /*
      f = created.find(el => el.vlineWaitAGrpYn !== 'Y' && el.vlineWaitBGrpYn !== 'Y' && el.vlineWaitCGrpYn !== 'Y' && el.vlineWaitDGrpYn !== 'Y' && el.vlineWaitEGrpYn !== 'Y' )
      if(!utils.isEmpty(f)) {
        utils.messageBox('warning', this.$t(`맵핑코드(${f.mappingCode})의 가상대기 그룹을 하나 이상 선택해야 합니다.`))
        return false
      }

      f = updated.find(el => el.vlineWaitAGrpYn !== 'Y' && el.vlineWaitBGrpYn !== 'Y' && el.vlineWaitCGrpYn !== 'Y' && el.vlineWaitDGrpYn !== 'Y' && el.vlineWaitEGrpYn !== 'Y' )
      if(!utils.isEmpty(f)) {
        utils.messageBox('warning', this.$t(`맵핑코드(${f.mappingCode})의 가상대기 그룹을 하나 이상 선택해야 합니다.`))
        return false
      }
      */

      return true
    }, 
    fetchData() {
      console.log('fetchData')
      this.$nextTick(() => {
        const ch = Object.assign({}, this.dataSet.getChanged())
        const CRUData = []
        ch.created.forEach(element => {
          CRUData.push({
            seqNo: element.__idx+1,
            dirty: element.__dirty,
            id: element.__id,

            mappingId: element.mappingId,
            mappingCode: element.mappingCode,
            vlineWaitAGrpYn: element.vlineWaitAGrpYn,
            vlineWaitBGrpYn: element.vlineWaitBGrpYn,
            vlineWaitCGrpYn: element.vlineWaitCGrpYn,
            vlineWaitDGrpYn: element.vlineWaitDGrpYn,
            vlineWaitEGrpYn: element.vlineWaitEGrpYn,
          })
        })
        ch.removed.forEach(element => {
          CRUData.push({
            seqNo: element.__idx+1,
            dirty: element.__dirty,
            id: element.__id,

            mappingId: element.mappingId,
            mappingCode: element.mappingCode,
            vlineWaitAGrpYn: element.vlineWaitAGrpYn,
            vlineWaitBGrpYn: element.vlineWaitBGrpYn,
            vlineWaitCGrpYn: element.vlineWaitCGrpYn,
            vlineWaitDGrpYn: element.vlineWaitDGrpYn,
            vlineWaitEGrpYn: element.vlineWaitEGrpYn,
          })
        })
        ch.updated.forEach(element => {
          CRUData.push({
            seqNo: element.__idx+1,
            dirty: element.__dirty,
            id: element.__id,

            mappingId: element.mappingId,
            mappingCode: element.mappingCode,
            vlineWaitAGrpYn: element.vlineWaitAGrpYn,
            vlineWaitBGrpYn: element.vlineWaitBGrpYn,
            vlineWaitCGrpYn: element.vlineWaitCGrpYn,
            vlineWaitDGrpYn: element.vlineWaitDGrpYn,
            vlineWaitEGrpYn: element.vlineWaitEGrpYn,
          })
        })

        this.dataSetChangedData = CRUData
      })
    },
    onResetOperStatus() {
      //const d = this.grid.getSelected()
      const d = this.grid.getData()
      if (!!d) {
        d.forEach(r => {
          this.grid.setRowValue(r.__id, 'operStatusCd', this.operStatusCd)
        })
      } else {
        this.$notify('Please click row')
      }
    },
    onDataChange() {
      console.log('onDataChange')
    },
    onTest() {
      console.log('onTest')
      this.openBatchMgr()
    },
    
    onKeyUpInput(value) { // 영문 / 숫자 입력제한
      const searchFieldNewText = value;

      if (utils.isEngNum_(searchFieldNewText) || utils.isEmpty(searchFieldNewText)) {
        this.searchFieldOldText = searchFieldNewText;
      } else if (this.alertFlag) {
        this.alertFlag = false;
        utils.messageBox('warning', this.$t('영문/숫자만 입력 가능합니다.'), null, () => {
          this.alertFlag = true;
          this.params.mappingCode = this.searchFieldOldText;
          this.$refs.mappingCodeTF.focus();
        });
      }
    },
  },
}
</script>
<style scoped>
</style>
