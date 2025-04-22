<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <!-- :: 블리스 등급관리 등록/수정 -->
    <sui-page-contents>
      <!-- S :: 노출 정보 -->
      <div class="comm_title_wrap">
        <h4>
          {{ $t('MSG_TXT_EXPOSR_INFO') }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <!-- 블리스 명 -->
        <ur-form-item
          :label="$t('MSG_TXT_BLISS_NAME')"
          required
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            ref="blissName"
            v-model="blissData.blissName"
            maxlength="150"
            style="width:100%; height:auto;"
            :rules="$rules.getRules('not_null')"
            fixed-message
          />
        </ur-form-item>

        <!-- 이벤트 기간 -->
        <ur-form-item
          :label="$t('MSG_TXT_EVENT_PERIOD')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
          required
        >
          <ur-date-time-range-picker
            ref="eventDtm"
            v-model="eventPeriods"
            :confirm-label="$t('MSG_TXT_SELT')"
            :clear-label="$t('MSG_BTN_RESET')"
            :rules="dtmRule"
            fixed-message
            @input="inputEventDtm"
          />
        </ur-form-item>
      </ur-form-box>

      <!-- 블리스 정보 (등급) -->
      <div class="comm_btn_wrap mt35">
        <div class="comm_title_wrap">
          <h4>
            {{ $t('MSG_TXT_BLISS_GRD_INFO') }}
          </h4>
        </div>
        <div class="left_box pl16">
          <!-- 추가 -->
          <ur-button
            color="violet"
            @click="onClickRowAdd"
          >
            {{ $t("MSG_BTN_ADD") }}
          </ur-button>
          <!-- 삭제 -->
          <ur-button
            color="violet"
            @click="onClickRowDelete"
          >
            {{ $t("MSG_BTN_DEL") }}
          </ur-button>
          <!-- 초기화 -->
          <ur-button
            color="violet"
            @click="onClickReset"
          >
            {{ $t("MSG_BTN_INTL") }}
          </ur-button>
          <span class="guid_txt">
            {{ $t("MSG_TXT_IMG_FILE_LIMIT_224") }}
          </span>
        </div>
      </div>

      <ur-data-grid
        ref="grid"
        class="custom_grid_pgeNav_None"
        :headers="columns"
        :data-source="blissGrdDataList"
        :options="opts"
        :data-set-options="{id: 'id'}"
      />

      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <!-- 목록 -->
          <div class="left_box">
            <ur-button
              v-permission:read="this.$options.name"
              @click="onClickList"
            >
              {{ $t("MSG_BTN_LIST") }}
            </ur-button>
          </div>
          <!-- 저장 -->
          <div class="right_box">
            <ur-button
              v-permission:update="this.$options.name"
              color="violet"
              @click="onClickSave"
            >
              {{ $t("MSG_BTN_SAVE") }}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component'

export default {
  name: 'PGE_AAG_00052', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 공통코드
      codeKeyList: ['COD_IA_BLISS_GRD_BASE'],
      codes: { COD_IA_BLISS_GRD_BASE: [] },

      // 테이블 옵션
      columns: [],
      opts: {
        noInfo: true,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        resizableColumn: true,
        rowHeight: 'auto',
        msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
      },
      // 입력데이터
      blissId: '',
      blissData: {
        blissId: '',
        blissName: '',
        eventStartDtm: '',
        eventEndDtm: '',
      },
      eventPeriods: [],
      eventPeriodsOld: [],
      blissGrdDataList: new urDataSet(), // eslint-disable-line new-cap
      blissGrdData: {
        blissGrdSeq: '',
        blissGrdNo: '',
        blissGrdName: '',
        blissGrdImagUrl: '',
        blissGrdImagAltDesc: '',
        blissGrdBaseScnt: '',
        blissGrdBaseCd: '',
      },

      componentsShow: '', // 컴포넌트 조작을 위해사용
      dtmRule: [
        v => {
          const rule = !!v && Array.isArray(v) && v.length === 2 && !!v[0] && !!v[1]
          return rule || this.$t('MSG_ALT_RULES_NOT_NULL')
        },
      ],
    }
  },
  computed: {
    compShow() {
      return this.componentsShow
    },
  },
  watch: {
  },
  created() {
    const that = this
    // 공통코드 셋팅 및 초기화
    http.mergeCodeList(this.$options.name, this.codeKeyList, this.codes).then(() => {
      this.columns = [
        // 등급
        {
          text: this.$t('MSG_TXT_GRD'),
          value: 'blissGrdNo',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-text-field v-model="row.blissGrdNo" style="width: 100%;" mask="####" @input="inputValue(row.blissGrdNo)" /></div>',
            methods: {
              inputValue(val) {
                that.blissGrdDataList.setRowValue(this.row, 'blissGrdNo', val)
              },
            },
          },
        },
        // 블리스 등급 명
        {
          text: this.$t('MSG_TXT_BLISS_GRD_NAME'),
          value: 'blissGrdName',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-text-field v-model="row.blissGrdName" maxlength="30" style="width: 100%;"  @input="inputValue" /></div>',
            methods: {
              inputValue(val) {
                that.blissGrdDataList.setRowValue(this.row, 'blissGrdName', val)
              },
            },
          },
        },
        // 블리스 등급 이미지
        {
          text: this.$t('MSG_TXT_BLISS_GRD_IMAG'),
          value: 'blissGrdImagUrl',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `<div class="pdCol10" style="flex-direction: column;">
                        <div style="display: flex; flex-direction: row; align-items: center;">
                          <cmp-single-file-uploader v-model="row.blissGrdImagUrl" preview-mode="BELOW" upload-target="EVT003" accepts="jpg,png,gif" pixels="224*224" :page-id="pageId" @input="inputValue">
                            <template>
                              <ur-text-field v-model="row.blissGrdImagAltDesc" maxlength="100" :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')" @input="inputBlissGrdImagAltDesc"/>
                            </template>
                          </cmp-single-file-uploader>
                        </div>
                      </div>`,
            computed: {
              pageId() {
                return that.$options.name
              },
            },
            methods: {
              inputValue(val) {
                that.blissGrdDataList.setRowValue(this.row, 'blissGrdImagUrl', val)
              },
              inputBlissGrdImagAltDesc(val) {
                that.blissGrdDataList.setRowValue(this.row, 'blissGrdImagAltDesc', val)
              },
            },
          },
        },
        // 등급 점수
        {
          text: this.$t('MSG_TXT_GRD_DCNT'),
          value: 'blissGrdBaseScnt',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `<div style="align-items: center;">
                        <ur-text-field class="pr10" v-model="row.blissGrdBaseScnt" style="width: 100%;" maxlength="3" mask="###" @input="inputValue"/>
                        <ur-dropdown v-model="row.blissGrdBaseCd" :items="COD_IA_BLISS_GRD_BASE" @input="inputBlissGrdBaseCd(row.blissGrdBaseCd)" no-select="no-select" :msg-no-select="$t('MSG_TXT_SEL')"/>
                      </div>`,
            computed: {
              COD_IA_BLISS_GRD_BASE() {
                return that.codes.COD_IA_BLISS_GRD_BASE
              },
            },
            methods: {
              inputValue(val) {
                that.blissGrdDataList.setRowValue(this.row, 'blissGrdBaseScnt', val)
              },
              inputBlissGrdBaseCd(val) {
                that.blissGrdDataList.setRowValue(this.row, 'blissGrdBaseCd', val)
              },
            },
          },
        },
      ]
    }).catch(() => {})
  },
  mounted() {
    const params = utils.getParameter(this, 'params')
    if (!utils.isEmpty(params.blissId)) {
      this.blissId = params.blissId
      this.onSearch()
    } else {
      this.blissData.eventStartDtm = utils.now('YYYY-MM-DD 09:00')
      this.eventPeriods = [this.blissData.eventStartDtm, this.blissData.eventEndDtm]
      this.$refs.grid.setData()
      this.onClickRowAdd()
    }
  },
  methods: {
    // row 추가
    onClickRowAdd() {
      const newRow = this.blissGrdData
      this.blissGrdDataList.addRow(newRow)
    },
    // row 삭제
    onClickRowDelete() {
      const delRows = this.$refs.grid.getSelected()
      if (delRows === null || delRows.length < 1) {
        utils.messageBox('alert', this.$t('MSG_ALT_DEL_NO_DATA')) // 삭제할 데이터를 선택하세요.
        return
      }
      for (let i = 0; i < delRows.length; i += 1) {
        this.$refs.grid.removeRow(delRows[i], false)
      }
    },
    /**
     * 초기화
     */
    onClickReset() {
      if (utils.isEmpty(this.blissId)) {
        // INSERT
        this.blissGrdDataList = new urDataSet() // eslint-disable-line new-cap
        this.onClickRowAdd()
      } else {
        // UPDATE
        const delRows = this.$refs.grid.getData()
        for (let i = 0; i < delRows.length; i += 1) {
          this.$refs.grid.removeRow(delRows[i], false)
        }
      }
    },

    /**
     * 검색
     */
    onSearch() {
      // 검색조건
      http.request(this.$options.name, 'DTS_AAG_00053', {
        path: {
          'bliss-id': this.blissId,
        },
      }).then(res => {
        this.blissData = res.data
        this.eventPeriods = [
          utils.toStringByFormat(this.blissData.eventStartDtm.substring(0, 12), 'YYYY-MM-DD HH:mm'),
          utils.toStringByFormat(this.blissData.eventEndDtm.substring(0, 12), 'YYYY-MM-DD HH:mm'),
        ]
        this.eventPeriodsOld = this.eventPeriods // 수정시 날짜 비교를 위해
        res.data.blissGrdList.forEach(obj => {
          // eslint-disable-next-line no-param-reassign
          obj.blissGrdNo = utils.toCharNum(obj.blissGrdNo)
          // eslint-disable-next-line no-param-reassign
          obj.blissGrdBaseScnt = utils.toCharNum(obj.blissGrdBaseScnt)
        })
        this.$refs.grid.setData(res.data.blissGrdList)
      }).catch(error => {
        console.log(error)
      })
    },

    getUpdateParam() {
      const { data } = this.blissGrdDataList
      const { updated, removed } = this.blissGrdDataList.getChanged()
      const insertList = data.filter(item => utils.isEmpty(item.blissId))
      const deleteList = removed.filter(item => !utils.isEmpty(item.blissId))
      const updateList = updated.filter(item => {
        const map = deleteList.map(d => d.blissGrdSeq)
        return !map.includes(item.blissGrdSeq)
      })

      const saveData = this.blissData
      saveData.insertBlissGrdList = insertList
      saveData.deleteBlissGrdList = deleteList
      saveData.updateBlissGrdList = updateList
      return saveData
    },
    /**
     * 저장
     */
    async onClickSave() {
      // 이벤트 기간 중복체크
      if (!utils.isEmpty(this.eventPeriods) && await this.chkSameEventDtm()) {
        return
      }

      if (this.isValidation()) {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => { // 저장하시겠습니까?
          // 수정시..
          if (this.blissId) {
            http.request(this.$options.name, 'DTS_AAG_00054', {
              data: this.getUpdateParam(),
            }).then(res => {
              if (res.data > 0) {
                utils.messageBox(
                  'success',
                  this.$t('MSG_ALT_SAVE_DATA'), // 저장되었습니다.
                  null,
                  () => this.onClickList(), // 목록으로 이동..
                )
              }
            })
          } else {
            // 등록시..
            const insertData = this.blissData
            insertData.insertBlissGrdList = this.blissGrdDataList.data

            http.request(this.$options.name, 'DTS_AAG_00052', {
              data: insertData,
            }).then(res => {
              if (res.data > 0) {
                utils.messageBox(
                  'success',
                  this.$t('MSG_ALT_SAVE_DATA'), // 저장되었습니다.
                  null,
                  () => this.onClickList(), // 목록으로 이동..
                )
              }
            })
          }
        })
      }
    },
    // 이벤트 기간이 중복되는지 체크
    chkSameEventDtm() {
      const that = this
      return new Promise(resolve => {
        const queryParams = {
          eventStartDtm: that.blissData.eventStartDtm,
          eventEndDtm: that.blissData.eventEndDtm,
          blissId: that.blissId,
        }

        http.request(that.$options.name, 'DTS_AAG_00065', {
          query: queryParams,
        }).then(res => {
          if (res.data > 0) {
            const msg = utils.strFormat(that.$t('MSG_ALT_DUP_NCELL'), that.$t('MSG_TXT_EVENT_PERIOD')) // {이벤트 기간}이(가) 중복됩니다.
            utils.messageBox('warning', msg)
            resolve(true)
          } else {
            resolve(false)
          }
        })
      })
    },

    // 유효성 체크
    isValidation() {
      // 블리스 명
      if (utils.isEmpty(this.blissData.blissName)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_BLISS_NAME')) // 블리스 명은(는) 필수 항목입니다.
        utils.messageBox('warning', msg)
        return false
      }
      // 이벤트 기간
      if (!this.isValidationEventDtm()) {
        return false
      }
      // 블리스 등급정보
      const blissGrdDataList = this.blissGrdDataList.data
      if (blissGrdDataList.length < 1) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_BLISS_GRD_INFO')) // {블리스 정보(등급)} 을(를) 입력하세요.
        utils.messageBox('warning', msg)
        return false
      }
      // 블리스 등급 유효성 체크
      if (!this.isValidationBlissGrd(blissGrdDataList)) {
        return false
      }

      return true
    },
    // 이벤트 기간 유효성 체크
    isValidationEventDtm() {
      // 이벤트 기간
      if (utils.isEmpty(this.blissData.eventStartDtm)
       || utils.isEmpty(this.blissData.eventEndDtm)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EVENT_PERIOD')) // {이벤트 기간}은(는) 필수 항목입니다.
        utils.messageBox('warning', msg)
        return false
      }
      if (utils.isEmpty(this.blissData.blissId)
       && utils.compareTo(utils.toDate(this.blissData.eventStartDtm), utils.now()) === -1) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_EVENT_PERIOD')) // 이벤트 기간의 과거일자는 선택할 수 없습니다.
        utils.messageBox('warning', msg)
        return false
      }
      if (!utils.isEmpty(this.blissId)
        && utils.getDayOffset(this.eventPeriodsOld[0], this.eventPeriods[0]) !== 0
        && utils.compareTo(utils.toDate(this.blissData.eventStartDtm), utils.now()) === -1) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_EVENT_PERIOD')) // 이벤트 기간의 과거일자는 선택할 수 없습니다.
        utils.messageBox('warning', msg)
        return false
      }
      if (!utils.isEmpty(this.blissId)
        && utils.getDayOffset(this.eventPeriodsOld[1], this.eventPeriods[1]) !== 0
        && utils.compareTo(utils.toDate(this.blissData.eventEndDtm), utils.now()) === -1
      ) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_EVENT_PERIOD')) // 이벤트 기간의 과거일자는 선택할 수 없습니다.
        utils.messageBox('warning', msg)
        return false
      }
      return true
    },

    // 블리스 등급 유효성 체크
    isValidationBlissGrd(blissGrdDataList) {
      for (let i = 0; i < blissGrdDataList.length; i += 1) {
        if (utils.isEmpty(blissGrdDataList[i].blissGrdNo)) {
          const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_GRD')) // {등급}은(는) 필수 항목입니다.
          utils.messageBox('warning', msg)
          return false
        }
        for (let j = 0; j < blissGrdDataList.length; j += 1) {
          if (i !== j) {
            if (blissGrdDataList[i].blissGrdNo === blissGrdDataList[j].blissGrdNo) {
              const msg = utils.strFormat(this.$t('MSG_ALT_DUP_NCELL'), this.$t('MSG_TXT_GRD')) // {등급}이(가) 중복됩니다.
              utils.messageBox('warning', msg)
              return false
            }
          }
        }
        if (utils.isEmpty(blissGrdDataList[i].blissGrdName)) {
          const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_BLISS_GRD_NAME')) // {블리스 등급 명}은(는) 필수 항목입니다.
          utils.messageBox('warning', msg)
          return false
        }
        if (utils.isEmpty(blissGrdDataList[i].blissGrdImagUrl)) {
          const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_BLISS_GRD_IMAG')) // {블리스 등급 이미지}은(는) 필수 항목입니다.
          utils.messageBox('warning', msg)
          return false
        }
        if (utils.isEmpty(blissGrdDataList[i].blissGrdBaseScnt)
         || utils.isEmpty(blissGrdDataList[i].blissGrdBaseCd)) {
          const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_GRD_DCNT')) // {등급점수}은(는) 필수 항목입니다.
          utils.messageBox('warning', msg)
          return false
        }
      }
      return true
    },

    // 이벤트 기간 입력 시 값 셋팅
    inputEventDtm(val) {
      // 종료일시의 시분(HHmm)이 0000일 경우 2359로 대체한다.
      if (val.at(1) && val.at(1).slice(-5) === '00:00') {
        this.eventPeriods = [val.at(0), val.at(1).substring(0, 11).concat('23:59')]
        return // [this.blissData.eventStartDtm]값 변경으로 [inputEventDtm]이 다시 호출되므로 현재 호출은 return한다.
      }
      this.blissData.eventStartDtm = _.isEmpty(val[0]) ? null : utils.dateformatToServer(val[0].concat('00'))
      this.blissData.eventEndDtm = _.isEmpty(val[1]) ? null : utils.dateformatToServer(val[1].concat('59'))
    },

    // 블리스 등급관리 목록으로 이동
    onClickList() {
      const params = utils.getParameter(this, 'params')
      delete params.blissId
      utils.goPage('PGE_AAG_00051', { params })
    },

  },
}
</script>
<style scoped>
</style>
