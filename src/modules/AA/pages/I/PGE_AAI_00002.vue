<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>
          {{ $t('MSG_TXT_IAA_SCHEDULE_INFO') }} <!-- 스케줄러 정보 -->
        </h4>
      </div>
      <ur-form-box toggleable>
        <!-- 스케줄명 -->
        <ur-form-item
          :label="$t('MSG_TXT_IA_SCHEDULE_NAME')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
          :required="insertMode"
        >
          <ur-text-field
            v-model="detail.scheduleName"
            style="width: 100%;"
            maxlength="50"
            :readonly="!insertMode"
          />
        </ur-form-item>
        <!-- 설명 -->
        <ur-form-item
          :label="$t('MSG_TXT_DTST_COL_CNTN')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
          required
        >
          <ur-text-field
            v-model="detail.descrtValue"
            style="width: 100%;"
            maxlength="50"
            :readonly="!insertMode"
          />
        </ur-form-item>
        <!-- Cron Exp -->
        <ur-form-item
          :label="$t('MSG_TXT_IAA_CRON_EXP')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
          required
        >
          <ur-text-field
            v-model="detail.cronExpressionValue"
            style="width: 100%;"
            maxlength="120"
          />
        </ur-form-item>
        <!-- 사용 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_USE_YN')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
          required
        >
          <ur-radio-wrapper
            v-model="detail.useYn"
            :items="codes.COD_IA_YN"
            small
          >
            <template v-for="item in codes.COD_IA_YN">
              <ur-radio
                :key="item.value"
                :value="item.value"
                sm
              >
                {{ item.text }}
              </ur-radio>
            </template>
          </ur-radio-wrapper>
        </ur-form-item>
        <!-- Trigger Name -->
        <ur-form-item
          :label="$t('MSG_TXT_IAA_TRIGGER_NAME')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
          :required="insertMode"
        >
          <ur-text-field
            v-model="detail.triggerName"
            style="width: 100%;"
            maxlength="100"
            :readonly="!insertMode"
          />
        </ur-form-item>
        <!-- Trigger Group -->
        <ur-form-item
          :label="$t('MSG_TXT_IAA_TRIGGER_GROUP_NAME')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
          :required="insertMode"
        >
          <ur-text-field
            v-model="detail.triggerGrpValue"
            style="width: 100%;"
            maxlength="100"
            :readonly="!insertMode"
          />
        </ur-form-item>
        <!-- Job Name -->
        <ur-form-item
          :label="$t('MSG_TXT_IAA_JOB_NAME')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
          :required="insertMode"
        >
          <ur-text-field
            v-model="detail.jobName"
            style="width: 100%;"
            maxlength="100"
            :readonly="!insertMode"
          />
        </ur-form-item>
        <!-- Job Group -->
        <ur-form-item
          :label="$t('MSG_TXT_IAA_JOB_GROUP_NAME')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
          :required="insertMode"
        >
          <ur-text-field
            v-model="detail.jobGrpValue"
            style="width: 100%;"
            maxlength="100"
            :readonly="!insertMode"
          />
        </ur-form-item>
        <!-- Class명 -->
        <ur-form-item
          :label="$t('MSG_TXT_IAA_CLASS_NAME')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
          :required="insertMode"
        >
          <ur-text-field
            v-model="detail.className"
            style="width: 100%;"
            maxlength="150"
            :readonly="!insertMode"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button
              v-permission:manualRun="'PGE_AAI_00002'"
              @click="manualRun"
          >
            {{ $t('MSG_TXT_MANUAL_RUN') }} <!-- 수동 실행 -->
          </ur-button>

          <ur-button
              color="violet"
              @click="save"
          >
            {{ $t('MSG_BTN_SAVE') }} <!-- 저장 -->
          </ur-button>
        </div>
      </div>

      <template v-if="!insertMode">
        <div class="comm_title_wrap mt45">
          <h4>{{ $t('MSG_TXT_SCHEDULER_RUN_HISTORY') }}</h4> <!-- 스케줄러 실행 이력 -->
        </div>

        <ur-form-box toggleable>
          <!-- 스케줄명 -->
          <ur-form-item
              :label="$t('MSG_TXT_IAA_START_TIME')"
              label-align="right"
              class="flex_wrap"
              style="width: 50%; height: auto;"
              :required="insertMode"
          >
            <ur-date-picker
              v-model="searchParams.searchDate"
              :max-date="maxDate"
              model-type="YYYYMMDD"
              :confirm-label="$t('MSG_TXT_SEL')"
              :today-label="$t('MSG_BTN_TODAY')"
            />
          </ur-form-item>
        </ur-form-box>
        <div class="btn_wrap mt10">
          <div class="right_box">
            <ur-button @click="onClickInitButton">
              {{ $t('MSG_BTN_INTL') }}
            </ur-button>
            <ur-button
                v-permission:read="'PGE_AAI_00002'"
                color="violet"
                @click="refresh"
            >
              {{ $t('MSG_BTN_SEARCH') }}
            </ur-button>
          </div>
        </div>
        <ur-data-grid
          ref="grid"
          :headers="columns"
          :options="opts"
          :data-source="list"
          :item-size="listSize"
          @grid:paging="pagingChange"
        >
        </ur-data-grid>
      </template>

      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button
              v-permission:create="'PGE_AAI_00002'"
              @click="goToList"
            >
              {{ $t('MSG_BTN_LIST') }} <!-- 목록 -->
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAI_00002', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      codeKeys: [],
      codes: {
        COD_IA_YN: [{ value: 'Y', text: 'Y' }, { value: 'N', text: 'N' }],
      },
      searchParams: {
        scheduleName: '',
        offset: 0,
        rowsPerPage: 10,
        searchDate: utils.now('YYYYMMDD'),
      },
      insertMode: false,
      listSize: 0,
      list: new this.$ur.grid.DataSet(),
      detail: {
        scheduleName: '',
        descrtValue: '',
        cronExpressionValue: '',
        useYn: '',
        triggerName: '',
        triggerGrpValue: '',
        jobName: '',
        jobGrpValue: '',
        className: '',
        executeHistory: [],
      },
      newdetail: {
        scheduleName: '',
        descrtValue: '',
        cronExpressionValue: '',
        useYn: '',
        triggerName: '',
        triggerGrpValue: '',
        jobName: '',
        jobGrpValue: '',
        className: '',
        executeHistory: [],
      },
      // newdetail: {
      //   scheduleName: 'CronTest',
      //   descrtValue: 'CronTest',
      //   cronExpressionValue: '0/1 * * * * ?',
      //   useYn: 'Y',
      //   triggerName: 'Trigger',
      //   triggerGrpValue: 'Default',
      //   jobName: 'Job',
      //   jobGrpValue: 'Default',
      //   className: 'com.samsung.everland.iab.job.test.TestJob',
      //   executeHistory: [],
      // },
      opts: { // 토탈o
        height: 525,
        infinityScroll: true,
        noInfo: false,
        defaultPageSize: 10,
        resizableColumn: true,
        pagination: true,
      },
      currentPage: 1,
      maxDate: '',
    }
  },
  computed: {
    columns() {
      const columns = [
        // {
        //   text: this.$t('MSG_TXT_NUMBER_ABBR'),
        //   value: 'no',
        //   width: 140,
        // },
        {
          text: this.$t('MSG_TXT_IAA_START_TIME'),
          width: 430,
          component: {
            props: ['row', 'value', 'text'],
            template: '<div>{{startDtm}}</div>',
            computed: {
              startDtm() {
                return utils.dateformatToClient(this.row.startDtm)
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_IAA_END_TIME'),
          width: 430,
          component: {
            props: ['row', 'value', 'text'],
            template: '<div>{{endDtm}}</div>',
            computed: {
              endDtm() {
                return utils.dateformatToClient(this.row.endDtm)
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_IAA_RUN_TIME'),
          value: 'runTime',
          width: 200,
        },
        {
          text: this.$t('MSG_TXT_IAA_SUCCESS_YN'),
          value: 'statusCd',
        },
      ]
      return columns
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    this.maxDate = utils.now('YYYY-MM-DD')

    const params = utils.getParameter(this, 'params')
    if (!params) {
      this.goToList()
    } else if (params.batchCd) {
      this.batchCd = params.batchCd
      this.selectDetail()
    } else {
      this.insertMode = true
      this.detail = JSON.parse(JSON.stringify(this.newdetail))
    }
  },
  mounted() {
  },
  methods: {
    goToList() {
      const params = utils.getParameter(this, 'params')
      if (params.batchCd) {
        delete params.batchCd
      }
      utils.goPage('PGE_AAI_00001', { params })
    },
    selectDetail() {
      http.request(this.$options.name, 'DTS_AAI_00026', {
        path: {
          'batch-cd': this.batchCd,
        },
      }).then(res => {
        if (res.data) {
          this.detail.batchCd = res.data.batchCd
          this.detail.scheduleName = res.data.scheduleName
          this.detail.descrtValue = res.data.descrtValue
          this.detail.cronExpressionValue = res.data.cronExpressionValue
          this.detail.useYn = res.data.useYn
          this.detail.triggerName = res.data.triggerName
          this.detail.triggerGrpValue = res.data.triggerGrpValue
          this.detail.jobName = res.data.jobName
          this.detail.jobGrpValue = res.data.jobGrpValue
          this.detail.className = res.data.className
        }
      }).catch(error => {
        console.log(error)
      })
      this.search()
    },
    save() {
      if (!this.validate()) {
        return
      }
      const param = {
        scheduleName: this.detail.scheduleName,
        descrtValue: this.detail.descrtValue,
        cronExpressionValue: this.detail.cronExpressionValue,
        useYn: this.detail.useYn,
        triggerName: this.detail.triggerName,
        triggerGrpValue: this.detail.triggerGrpValue,
        jobName: this.detail.jobName,
        jobGrpValue: this.detail.jobGrpValue,
        className: this.detail.className,
      }
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => { // 저장하시겠습니까?
        if (this.batchCd) {
          param.batchCd = this.batchCd
          this.update(param)
        } else {
          this.insert(param)
        }
      })
    },
    validate() {
      if (_.isEmpty(this.detail.scheduleName)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_IA_SCHEDULE_NAME')))
        return false
      }
      if (_.isEmpty(this.detail.descrtValue)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_DTST_COL_CNTN')))
        return false
      }
      if (_.isEmpty(this.detail.cronExpressionValue)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_IAA_CRON_EXP')))
        return false
      }
      // if (this.checkCronExpression(this.detail.cronExpressionValue) === false) {
      //   utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_TXT_INVALID_CRON_EXP')))
      //   return false
      // }
      if (_.isEmpty(this.detail.useYn)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_USE_YN')))
        return false
      }
      if (_.isEmpty(this.detail.triggerName)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_IAA_TRIGGER_NAME')))
        return false
      }
      if (_.isEmpty(this.detail.triggerGrpValue)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_IAA_TRIGGER_GROUP_NAME')))
        return false
      }
      if (_.isEmpty(this.detail.jobName)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_IAA_JOB_NAME')))
        return false
      }
      if (_.isEmpty(this.detail.jobGrpValue)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_IAA_JOB_GROUP_NAME')))
        return false
      }
      if (_.isEmpty(this.detail.className)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_IAA_CLASS_NAME')))
        return false
      }
      return true
    },
    insert(param) {
      http.request(this.$options.name, 'DTS_AAI_00027', {
        data: param,
      }).then(res => {
        if (res.data) {
          if (res.data === 1) {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
            this.goToList()
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    update(param) {
      http.request(this.$options.name, 'DTS_AAI_00028', {
        data: param,
      }).then(res => {
        if (res.data) {
          if (res.data === 1) {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
            this.goToList()
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    manualRun() {
      const param = {
        scheduleName: this.detail.scheduleName,
        descrtValue: this.detail.descrtValue,
        cronExpressionValue: this.detail.cronExpressionValue,
        useYn: this.detail.useYn,
        triggerName: this.detail.triggerName,
        triggerGrpValue: this.detail.triggerGrpValue,
        jobName: this.detail.jobName,
        jobGrpValue: this.detail.jobGrpValue,
        className: this.detail.className,
      }
      if (param.useYn !== 'Y') {
        utils.messageBox('alert', null, this.$t('MSG_TXT_MANUAL_RUN_NEEDS_USE'))
        return
      }

      this.searchParams.offset = this.list.totalSize
      http.request(this.$options.name, 'DTS_AAI_00037', {
        data: param,
      }).catch(error => {
        console.log(error)
      })
    },
    refresh() {
      this.currentPage = '1'
      this.searchParams.offset = 0
      this.list = new this.$ur.grid.DataSet()
      this.$refs.grid.setCurrentPage(1)
    },
    search() {
      if (utils.isEmpty(this.searchParams.searchDate)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_IAA_START_TIME'))) // {시작시간} 을(를) 입력하세요.
        return
      }

      if (this.currentPage) {
        this.searchParams.offset = (this.currentPage - 1) * this.searchParams.rowsPerPage
      } else {
        this.searchParams.offset = 0
      }
      // this.searchParams.offset = this.list.totalSize

      http.request(this.$options.name, 'DTS_AAI_00035', {
        path: {
          'batch-cd': this.batchCd,
        },
        query: {
          rowsPerPage: this.searchParams.rowsPerPage,
          offset: this.searchParams.offset,
          searchDate: this.searchParams.searchDate,
        },
      }).then(res => {
        if (res.data) {
          this.list.setData(res.data.batchActHistList)
          this.listSize = res.data.batchActHistListTotCnt
        }
      }).catch(error => {
        console.log(error)
      })
    },
    pagingChange(paging) {
      this.searchParams.rowsPerPage = paging.rowsPerPage
      this.currentPage = paging.currentPage

      this.search()
    },
    onBottom() {
      this.search()
    },
    onClickInitButton() {
      this.searchParams.searchDate = utils.now('YYYYMMDD')
    },
  },
}
</script>
<style scoped>
</style>
