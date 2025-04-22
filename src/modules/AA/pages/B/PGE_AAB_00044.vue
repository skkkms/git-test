<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div>
        <!-- [퍼소나유형 팝업] -->
        <template slot="title">
          <div class="modal-title">
            <h4>{{ $t('MSG_TXT_PERSON_TYPE') }}</h4>
          </div>
        </template>
        <template>
          <div class="modal-body">
            <ur-form-box>
              <!-- [검색조건] 동반인 -->
              <ur-form-item
                :label="$t('MSG_TXT_COMPANAION')"
                label-align="right"
                style="width: 50%; height: auto;"
                class="flex_wrap"
              >
                <ur-dropdown
                  v-model="frame0.companaionCd"
                  :items="COD_IA_COMPANAION"
                  no-select="no-select"
                  :msg-no-select="$t('MSG_TXT_ALL')"
                />
              </ur-form-item>
              <!-- [검색조건] 방문유형 -->
              <ur-form-item
                :label="$t('MSG_TXT_UPCMNG_TYPE')"
                label-align="right"
                style="width: 50%; height: auto; border-top: 0;"
                class="flex_wrap"
              >
                <ur-checkbox
                  v-model="valuePC1"
                  sm
                /><span class="check_label">{{ $t('MSG_TXT_FIRST_VIVIT') }}</span>
                <ur-checkbox
                  v-model="valuePC2"
                  sm
                /><span class="check_label">{{ $t('MSG_TXT_REVISIT') }}</span>
              </ur-form-item>
              <!-- [검색조건] 놀이유형 -->
              <ur-form-item
                :label="$t('MSG_TXT_PLAY_TYPE')"
                label-align="right"
                style="width: 50%; height: auto;"
                class="flex_wrap"
              >
                <ur-dropdown
                  v-model="frame0.playTypeCd"
                  :items="COD_IA_PLAY_TYPE"
                  no-select="no-select"
                  :msg-no-select="$t('MSG_TXT_ALL')"
                />
              </ur-form-item>
              <!-- [검색조건] 퍼소나코드 -->
              <ur-form-item
                :label="$t('MSG_TXT_PERSON_CD')"
                label-align="right"
                style="width: 50%; height: auto;"
                class="flex_wrap"
              >
                <ur-text-field
                  v-model="frame0.personaId"
                  mask="##"
                  style="width: 100%;"
                  @keyup.enter="onSearchClick1"
                />
              </ur-form-item>
            </ur-form-box>
            <!-- [버튼] 초기화 -->
            <div class="btn_wrap mt10">
              <div class="right_box">
                <ur-button
                  @click="onReset"
                >
                  {{ $t("MSG_BTN_RESET") }}
                </ur-button>
                <!-- [버튼] 검색 -->
                <ur-button
                  color="violet"
                  @click="onSearchClick1"
                >
                  {{ $t("MSG_BTN_SEARCH") }}
                </ur-button>
              </div>
            </div>
            <ur-data-grid
              ref="grid"
              :data-source="dataSource"
              :options="options"
              :headers="headers"
              :data-set-options="{id: 'id'}"
              @grid:row-dbl-click="onRowDblClick"
              @grid:row-click="onRowClick"
            />
          </div>
        </template>
        <template>
          <div class="comm_btn_wrap bt1">
            <div class="right_box mt10">
              <!-- [버튼] 닫기 -->
              <ur-button
                @click="closeModal"
              >
                {{ $t("MSG_BTN_CLOSE") }}
              </ur-button>
              <!-- [버튼] 선택 -->
              <ur-button
                color="violet"
                @click="onClickSelect(null)"
              >
                {{ $t("MSG_BTN_SELT ") }}
              </ur-button>
            </div>
          </div>
        </template>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component'

export default {
  name: 'PGE_AAB_00044', // eslint-disable-line vue/name-property-casing
  props: {
    pageInitialData: {
      type: Object,
      required: false,
      default() {
        return {
          parkKindCd: null, // EL(01), CB(02)
          caller: null,
          multiSelect: false,
        }
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
      codeKeys: [
        'COD_IA_COMPANAION_EL',
        'COD_IA_COMPANAION_CBN',
        'COD_IA_PLAY_TYPE_EL',
        'COD_IA_PLAY_TYPE_CB',
      ],
      codes: {
        COD_IA_COMPANAION_EL: [],
        COD_IA_COMPANAION_CBN: [],
        COD_IA_PLAY_TYPE_EL: [],
        COD_IA_PLAY_TYPE_CB: [],
      },
      frame0: {
        companaionCd: '',
        playTypeCd: '',
        personaId: '',
      },
      valuePC1: true,
      valuePC2: true,

      dataSource: new urDataSet(), // eslint-disable-line new-cap
      options: {},
      headers: [],
      singleSelectedRow:{}
    }
  },
  computed: {
    COD_IA_COMPANAION() {
      if (this.pageInitialData.parkKindCd === '02') {
        return this.codes.COD_IA_COMPANAION_CBN
      }
      return this.codes.COD_IA_COMPANAION_EL
    },
    COD_IA_PLAY_TYPE() {
      if (this.pageInitialData.parkKindCd === '02') {
        return this.codes.COD_IA_PLAY_TYPE_CB
      }
      return this.codes.COD_IA_PLAY_TYPE_EL
    },
  },
  created() {
    http.mergeCodeList(this.$options.name, this.codeKeys, this.codes)
    this.initializeOptions() // initialize grid options
    this.initializeHeaders() // initialize grid headers
  },
  mounted() {
    this.onReset()
  },
  methods: {
    initializeOptions() {
      this.options = {
        infinityScroll: true,
        pagination: false,
        noInfo: false,
        height: 280,
        resizableColumn: true,
        blockSelectToggle: true,
      }
    },
    initializeHeaders() {
      const that = this
      this.headers = [
        {
          hide: !this.pageInitialData.multiSelect, // depends on props
          resizable: false,
          text: '',
          value: 'checked',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-checkbox
                  v-model="row.checked"
                  sm
                  @input="onInputChecked"
                />
              </div>`,
            methods: {
              onInputChecked(value) {
                const selectedRows = that.dataSource.data.filter(item => item.checked)
                const index = selectedRows.findIndex(item => item.personaId === this.row.personaId)
                if (value) {
                  if (index > -1) {
                    that.dataSource.setRowValue(this.row, 'checked', false)
                    utils.messageBox('warning', that.$t('MSG_ALT_CANNOT_SELECT_SAME_PERSONA_CD')) // 퍼소나 코드가 동일한 항목은 동시에 선택할 수 없습니다.
                    return
                  }
                }
                that.dataSource.setRowValue(this.row, 'checked', value)
              },
            },
          },
          width: 34,
        },
        {
          text: 'No.', // No.
          value: '__idx',
          width: 40,
          customValue: v => v + 1,
        },
        {
          text: this.$t('MSG_TXT_UPCMNG_TYPE'), // 방문 유형
          value: 'visitTypeNm',
          width: 80,
        },
        {
          text: this.$t('MSG_TXT_COMPANAION'), // 동반인
          value: 'companaionNm',
          width: 80,
        },
        {
          text: this.$t('MSG_TXT_PLAY_TYPE'), // 놀이 유형
          value: 'playTypeNm',
          width: 240,
        },
        {
          text: this.$t('MSG_TXT_PERSON_TYPE'), // 퍼소나 유형
          value: 'personaName',
        },
        {
          text: this.$t('MSG_TXT_PERSON_CD'), // 퍼소나 코드
          value: 'personaId',
        },
      ]
    },
    onReset() {
      this.frame0.companaionCd = ''
      this.frame0.playTypeCd = ''
      this.valuePC1 = true
      this.valuePC2 = true
      this.personaId = ''
    },
    onSearchClick1() {
      const queryParams = {
        companaionCd: '',
        visitTypeCd: '',
        playTypeCd: '',
        parkKindCd: '',
        personaId: '',
      }

      queryParams.companaionCd = this.frame0.companaionCd

      if (this.valuePC1 && !this.valuePC2) {
        queryParams.visitTypeCd = 'A'
      } else if (!this.valuePC1 && this.valuePC2) {
        queryParams.visitTypeCd = 'B'
      }

      queryParams.playTypeCd = this.frame0.playTypeCd
      queryParams.parkKindCd = this.pageInitialData.parkKindCd
      queryParams.personaId = this.frame0.personaId

      http.request(this.$options.name, 'DTS_AAC_00001', {
        query: queryParams,
      }).then(res => {
        const mData = res.data
        const mDataSort = mData.sort((prev, cur) => { // 오름차순
          if (prev.personaTypeCd > cur.personaTypeCd) return 1
          if (prev.personaTypeCd < cur.personaTypeCd) return -1
          return 0
        })

        let mDataFilter = mDataSort

        if (!this.valuePC1 && !this.valuePC2) {
          mDataFilter = mDataSort.filter(el => {
            if (el.reVisitYn === '0') return true
            return false
          })
        }
        this.dataSource.setData(mDataFilter)
      }).catch(error => {
        console.log(error)
      })
    },
    onClickSelect(row = null) {
      // Multiselect Mode 여부에 따라
      // selected의 type은 Object({...}) / List([...])가 된다.
      let selected = []

      if (this.pageInitialData.multiSelect) {
        selected =
          row || this.dataSource.data.filter((item) => item.checked)
      } else {
        selected =
          row || this.singleSelectedRow
      }

      if (utils.isEmpty(selected)) {
        utils.messageBox("warning", this.$t("MSG_ALT_NOT_SEL_ITEM")) // 선택된 항목이 없습니다.
        return
      }

      let resultData = null

      if (selected instanceof Array) {
        resultData = []

        selected.forEach((sItem) => {
          const findIndex = resultData.findIndex(
            (rItem) => rItem.personaId === sItem.personaId
          )

          if (findIndex === -1) {
            resultData.push(sItem)
          }
        })
      } else {
        resultData = selected
      }

      this.closePagePopup(resultData)
    },
    onRowDblClick(row) {
      // Grid가 Multiselect Mode일 경우에는 동작하지 않는다.
      if (this.pageInitialData.multiSelect) {
        return
      }
      this.onClickSelect(row)
    },
    closeModal() {
      this.closePagePopup()
    },
    onRowClick(row) {
        this.singleSelectedRow = row
    },
  },
}
</script>
