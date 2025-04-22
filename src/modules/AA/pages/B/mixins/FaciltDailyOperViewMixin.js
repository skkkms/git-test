const FaciltDailyOperViewMixin = {
  props: {
    pageId: {
      type: String,
      required: false,
      default: null,
    },
    parkKindCd: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      faciltDailyReportDaysList: [],
      faciltDailyReportDaysListCBOut: [{}, {}, {}, {}, {}, {}, {}],
      faciltDailyReportInfoList: [],
      faciltDailyReportStatList: [],

      CODE_KEYS: [
        'COD_RS_PARK_KIND',
        'COD_IA_EL_ZONE_KIND',
        'COD_IA_CB_ZONE_KIND',
        'COD_IA_EL_FACILT_CATE_KIND',
        'COD_IA_CB_FACILT_CATE_KIND',
      ],
      codes: {
        COD_RS_PARK_KIND: [],
        COD_IA_EL_ZONE_KIND: [],
        COD_IA_CB_ZONE_KIND: [],
        COD_IA_EL_FACILT_CATE_KIND: [],
        COD_IA_CB_FACILT_CATE_KIND: [],
      },

      // 일별 시설 운영 통계 테이블 옵션
      opts1: {
        height: 233,
        pagination: true,
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
        styleBordered: true,
      },
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    days() {
      return this.faciltDailyReportDaysList
    },
    stat() {
      return this.faciltDailyReportStatList
    },
    info() {
      return this.faciltDailyReportInfoList
    },
    COD_IA_FACILT_CATE_KIND() {
      if (this.parkKindCd === '02') return this.codes.COD_IA_CB_FACILT_CATE_KIND
      return this.codes.COD_IA_EL_FACILT_CATE_KIND
    },
    COD_IA_ZONE_KIND() {
      if (this.parkKindCd === '02') return this.codes.COD_IA_CB_ZONE_KIND // '02' 캐리비안베이
      return this.codes.COD_IA_EL_ZONE_KIND // 파크 구분 '01' 에버랜드
    },
    IS_EL_ON() {
      return (this.parkKindCd === '01')
    },
    IS_CB_ON() {
      return (this.parkKindCd === '02')
    },
  },
  mounted() {
    http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
    this.onSearch()
  },
  methods: {
    onSearch() {
      console.log('onSearch')
      const query = Object.assign({}, {
        parkKindCd: this.parkKindCd,
      })
      console.log('REQ', query)
      const serviceName = 'DTS_AAB_00044'
      http.request(this.pageId, serviceName, {
        query,
        path: {},
        data: {},
      }).then(res => {
        console.log('RES', res.data)
        this.faciltDailyReportDaysList = res.data.faciltDailyReportDaysList
        this.faciltDailyReportDaysList = this.faciltDailyReportDaysList ?? []
        // oprDsCd: "A", "I", "O"
        if (this.parkKindCd === '02') {
          this.faciltDailyReportDaysListCBOut = this.faciltDailyReportDaysList.filter(el => el.oprDsCd === 'O')
          this.faciltDailyReportDaysList = this.faciltDailyReportDaysList.filter(el => el.oprDsCd === 'I')
          console.log('RES-DAYS', this.faciltDailyReportDaysList, this.faciltDailyReportDaysListCBOut)
          console.log('RES-DAYS-CBOUT', this.faciltDailyReportDaysListCBOut)
        } else {
          this.faciltDailyReportDaysList = res.data.faciltDailyReportDaysList.filter(el => el.oprDsCd === 'A')
          console.log('RES-DAYS', this.faciltDailyReportDaysList)
        }

        this.faciltDailyReportStatList = res.data.faciltDailyReportStatList
        this.faciltDailyReportInfoList = res.data.faciltDailyReportInfoList
        console.log('RES-STAT', this.faciltDailyReportStatList)
        console.log('RES-INFO', this.faciltDailyReportInfoList)
      }).catch(error => {
        console.log('ERR', error)
      })
    },
    // [엑셀다운로드]
    onExcelDnLoad() {
      console.log('onExcelDnLoad')
      const columns = [
        // { value: '__idx', text: '' },
        { value: 'v0', text: '' },
        { value: 'v1', text: '' },
        { value: 'v2', text: '' },
        { value: 'v3', text: '' },
        { value: 'v4', text: '' },
        { value: 'v5', text: '' },
        { value: 'v6', text: '' },
        { value: 'v7', text: '' },
      ]

      const excelColumns = columns

      const excelData = []

      // 상단 통계
      excelData.push({
        v0: '일별시설 운영통계',
        v1: '',
        v2: '',
        v3: '',
        v4: '',
        v5: '',
        v6: '',
        v7: '',
      })
      excelData.push({
        v0: '구분',
        v1: `${this.getDays1Day()} ${this.getDays1Date()}`,
        v2: `${this.getDays2Day()} ${this.getDays2Date()}`,
        v3: `${this.getDays3Day()} ${this.getDays3Date()}`,
        v4: `${this.getDays4Day()} ${this.getDays4Date()}`,
        v5: `${this.getDays5Day()} ${this.getDays5Date()}`,
        v6: `${this.getDays6Day()} ${this.getDays6Date()}`,
        v7: `${this.getDays7Day()} ${this.getDays7Date()}`,
      })
      excelData.push({
        v0: 'PM 점검',
        v1: `${this.getStat1Check()}`,
        v2: `${this.getStat2Check()}`,
        v3: `${this.getStat3Check()}`,
        v4: `${this.getStat4Check()}`,
        v5: `${this.getStat5Check()}`,
        v6: `${this.getStat6Check()}`,
        v7: `${this.getStat7Check()}`,
      })
      excelData.push({
        v0: '동계/공사/대관 운휴',
        v1: `${this.getStat1Break()}`,
        v2: `${this.getStat2Break()}`,
        v3: `${this.getStat3Break()}`,
        v4: `${this.getStat4Break()}`,
        v5: `${this.getStat5Break()}`,
        v6: `${this.getStat6Break()}`,
        v7: `${this.getStat7Break()}`,
      })
      excelData.push({
        v0: 'CLOSED',
        v1: `${this.getStat1Close()}`,
        v2: `${this.getStat2Close()}`,
        v3: `${this.getStat3Close()}`,
        v4: `${this.getStat4Close()}`,
        v5: `${this.getStat5Close()}`,
        v6: `${this.getStat6Close()}`,
        v7: `${this.getStat7Close()}`,
      })
      excelData.push({
        v0: '가동 率',
        v1: `${this.getStat1Rate()}`,
        v2: `${this.getStat2Rate()}`,
        v3: `${this.getStat3Rate()}`,
        v4: `${this.getStat4Rate()}`,
        v5: `${this.getStat5Rate()}`,
        v6: `${this.getStat6Rate()}`,
        v7: `${this.getStat7Rate()}`,
      })
      excelData.push({
        v0: '',
        v1: '',
        v2: '',
        v3: '',
        v4: '',
        v5: '',
        v6: '',
        v7: '',
      })

      // 하단 정보
      excelData.push({
        v0: '일별시설 운영 정보',
        v1: '',
        v2: '',
        v3: '',
        v4: '',
        v5: '',
        v6: '',
        v7: '',
      })
      excelData.push({
        v0: '',
        v1: `${this.getDays1Day()} ${this.getDays1Date()}`,
        v2: `${this.getDays2Day()} ${this.getDays2Date()}`,
        v3: `${this.getDays3Day()} ${this.getDays3Date()}`,
        v4: `${this.getDays4Day()} ${this.getDays4Date()}`,
        v5: `${this.getDays5Day()} ${this.getDays5Date()}`,
        v6: `${this.getDays6Day()} ${this.getDays6Date()}`,
        v7: `${this.getDays7Day()} ${this.getDays7Date()}`,
      })
      if (this.IS_CB_ON) {
        excelData.push({
          v0: '',
          v1: `실내 ${this.getDays1OpenTime()} ~ ${this.getDays1CloseTime()}`,
          v2: `실내 ${this.getDays2OpenTime()} ~ ${this.getDays2CloseTime()}`,
          v3: `실내 ${this.getDays3OpenTime()} ~ ${this.getDays3CloseTime()}`,
          v4: `실내 ${this.getDays4OpenTime()} ~ ${this.getDays4CloseTime()}`,
          v5: `실내 ${this.getDays5OpenTime()} ~ ${this.getDays5CloseTime()}`,
          v6: `실내 ${this.getDays6OpenTime()} ~ ${this.getDays6CloseTime()}`,
          v7: `실내 ${this.getDays7OpenTime()} ~ ${this.getDays7CloseTime()}`,
        })
        excelData.push({
          v0: '시설명',
          v1: `실외 ${this.getDays1OpenTimeCBOut()} ~ ${this.getDays1CloseTimeCBOut()}`,
          v2: `실외 ${this.getDays2OpenTimeCBOut()} ~ ${this.getDays2CloseTimeCBOut()}`,
          v3: `실외 ${this.getDays3OpenTimeCBOut()} ~ ${this.getDays3CloseTimeCBOut()}`,
          v4: `실외 ${this.getDays4OpenTimeCBOut()} ~ ${this.getDays4CloseTimeCBOut()}`,
          v5: `실외 ${this.getDays5OpenTimeCBOut()} ~ ${this.getDays5CloseTimeCBOut()}`,
          v6: `실외 ${this.getDays6OpenTimeCBOut()} ~ ${this.getDays6CloseTimeCBOut()}`,
          v7: `실외 ${this.getDays7OpenTimeCBOut()} ~ ${this.getDays7CloseTimeCBOut()}`,
          parkKindCd: '02', // CB 에서만 추가되는 라인이므로 파크구분을 명시하는 예외 코드를 강제로 삽입한다.. 서버에서 엑셀 파일을 생성할 때 사용함..
        })
      } else {
        excelData.push({
          v0: '시설명',
          v1: `${this.getDays1OpenTime()} ~ ${this.getDays1CloseTime()}`,
          v2: `${this.getDays2OpenTime()} ~ ${this.getDays2CloseTime()}`,
          v3: `${this.getDays3OpenTime()} ~ ${this.getDays3CloseTime()}`,
          v4: `${this.getDays4OpenTime()} ~ ${this.getDays4CloseTime()}`,
          v5: `${this.getDays5OpenTime()} ~ ${this.getDays5CloseTime()}`,
          v6: `${this.getDays6OpenTime()} ~ ${this.getDays6CloseTime()}`,
          v7: `${this.getDays7OpenTime()} ~ ${this.getDays7CloseTime()}`,
        })
      }

      let faciltList = []
      this.COD_IA_FACILT_CATE_KIND.forEach(code => {
        /*
        faciltList = [
          ...faciltList,
          ...this.getCategoryFaciltList(code.value),
        ]
        */
        faciltList = this.getCategoryFaciltList(code.value)
        faciltList.forEach(facilt => {
          const fullDays = [
            {
              salesDate: facilt.salesDate1,
              operStatusCd: facilt.operStatusCd1,
              operStatusNm: facilt.operStatusNm1,
              openTime: facilt.openTime1,
              closeTime: facilt.closeTime1,
            },
            {
              salesDate: facilt.salesDate2,
              operStatusCd: facilt.operStatusCd2,
              operStatusNm: facilt.operStatusNm2,
              openTime: facilt.openTime2,
              closeTime: facilt.closeTime2,
            },
            {
              salesDate: facilt.salesDate3,
              operStatusCd: facilt.operStatusCd3,
              operStatusNm: facilt.operStatusNm3,
              openTime: facilt.openTime3,
              closeTime: facilt.closeTime3,
            },
            {
              salesDate: facilt.salesDate4,
              operStatusCd: facilt.operStatusCd4,
              operStatusNm: facilt.operStatusNm4,
              openTime: facilt.openTime4,
              closeTime: facilt.closeTime4,
            },
            {
              salesDate: facilt.salesDate5,
              operStatusCd: facilt.operStatusCd5,
              operStatusNm: facilt.operStatusNm5,
              openTime: facilt.openTime5,
              closeTime: facilt.closeTime5,
            },
            {
              salesDate: facilt.salesDate6,
              operStatusCd: facilt.operStatusCd6,
              operStatusNm: facilt.operStatusNm6,
              openTime: facilt.openTime6,
              closeTime: facilt.closeTime6,
            },
            {
              salesDate: facilt.salesDate7,
              operStatusCd: facilt.operStatusCd7,
              operStatusNm: facilt.operStatusNm7,
              openTime: facilt.openTime7,
              closeTime: facilt.closeTime7,
            },
          ]

          const day1 = fullDays[0]
          const day2 = fullDays[1]
          const day3 = fullDays[2]
          const day4 = fullDays[3]
          const day5 = fullDays[4]
          const day6 = fullDays[5]
          const day7 = fullDays[6]

          excelData.push({
            v0: facilt.faciltName,
            v1: `${this.getDayOperInfo(day1)}`,
            v2: `${this.getDayOperInfo(day2)}`,
            v3: `${this.getDayOperInfo(day3)}`,
            v4: `${this.getDayOperInfo(day4)}`,
            v5: `${this.getDayOperInfo(day5)}`,
            v6: `${this.getDayOperInfo(day6)}`,
            v7: `${this.getDayOperInfo(day7)}`,
            cateKindCd: code.value,
            parkKindCd: this.parkKindCd,
          })
        })
      })

      const excelDataSet = new this.$ur.grid.DataSet()
      excelDataSet.setData(excelData)

      const sPageId = this.pageId
      const objGridColumns = excelColumns
      const objGridDataset = excelDataSet
      // const objGridDataset = excelData
      const sToday = utils.now('YYYYMMDDHHmmss')
      const sExcelName = `${this.$t('일별시설운영조회')}_${sToday}.xlsx`
      // utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {})
      this.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {})
    },
    getFaciltCateKindCdList() {
      return this.COD_IA_FACILT_CATE_KIND
    },
    getCategoryFaciltList(cateCd) {
      return this.faciltDailyReportInfoList.filter(el => {
        if (!utils.isEmpty(el.faciltCateKindCds)) {
          const arr = el.faciltCateKindCds.split(',')
          if (arr.length > 0 && arr[0] === cateCd) {
            return true
          }
        }
        return false
      })
    },
    getColorClass(cateCd) {
      let colorclass = ''
      switch (cateCd) {
      case '01':
        colorclass = 'bg-success-01'
        break
      case '02':
        colorclass = 'bg-purple'
        break
      case '03':
        colorclass = 'bg-primary-01'
        break
      case '04':
        colorclass = 'bg-warning'
        break
      case '05':
        colorclass = 'bg-danger'
        break
      case '06':
        colorclass = 'bg-success-02'
        break
      case '07':
        colorclass = 'bg-pink'
        break
      default:
        colorclass = 'bg-primary-02'
        break
      }
      return colorclass
    },
    getDayOperInfo(day) {
      const operStatusNm = this.getOperStatusNmForExcel(day.operStatusCd)
      if (utils.isEmpty(operStatusNm)) return ''

      return `${operStatusNm} ${this.getTimeFmt(day.openTime)} ${this.getDelimeter(day)} ${this.getTimeFmt(day.closeTime)}`
    },
    getOperStatusNmFmt(operStatusNm) {
      return utils.isEmpty(operStatusNm) ? operStatusNm : `[${operStatusNm}]`
    },
    isNoOperStatus(operStatusCd) {
      return utils.isEmpty(operStatusCd)
    },
    isNormalOpen(day) {
      return day.operStatusCd === 'OPEN' && day.openTime === day.parkOpenTime && day.closeTime === day.parkCloseTime
    },
    getOperStatusNmForExcel(operStatusCd) {
      let statusNm = ''
      switch (operStatusCd) {
      case 'PMCH':
        statusNm = 'PM 점검'
        break
      case 'WNTR':
      case 'CONR':
      case 'RNTR':
        statusNm = '운휴'
        break
      case 'CLOS':
        statusNm = 'CLOSED'
        break
      default:
        statusNm = operStatusCd
        break
      }
      return utils.isEmpty(statusNm) ? statusNm : `[${statusNm}]`
    },
    getDelimeter(day) {
      if (!utils.isEmpty(day) && !utils.isEmpty(day.openTime) && !utils.isEmpty(day.closeTime)) return '~'

      return ''
    },
    getFaciltDayList(facilt) {
      const fullDays = [
        {
          salesDate: facilt.salesDate1,
          operStatusCd: facilt.operStatusCd1,
          operStatusNm: facilt.operStatusNm1,
          openTime: facilt.openTime1,
          closeTime: facilt.closeTime1,
          parkOpenTime: this.day1Days().parkOpenTime,
          parkCloseTime: this.day1Days().parkCloseTime,
        },
        {
          salesDate: facilt.salesDate2,
          operStatusCd: facilt.operStatusCd2,
          operStatusNm: facilt.operStatusNm2,
          openTime: facilt.openTime2,
          closeTime: facilt.closeTime2,
          parkOpenTime: this.day2Days().parkOpenTime,
          parkCloseTime: this.day2Days().parkCloseTime,
        },
        {
          salesDate: facilt.salesDate3,
          operStatusCd: facilt.operStatusCd3,
          operStatusNm: facilt.operStatusNm3,
          openTime: facilt.openTime3,
          closeTime: facilt.closeTime3,
          parkOpenTime: this.day3Days().parkOpenTime,
          parkCloseTime: this.day3Days().parkCloseTime,
        },
        {
          salesDate: facilt.salesDate4,
          operStatusCd: facilt.operStatusCd4,
          operStatusNm: facilt.operStatusNm4,
          openTime: facilt.openTime4,
          closeTime: facilt.closeTime4,
          parkOpenTime: this.day4Days().parkOpenTime,
          parkCloseTime: this.day4Days().parkCloseTime,
        },
        {
          salesDate: facilt.salesDate5,
          operStatusCd: facilt.operStatusCd5,
          operStatusNm: facilt.operStatusNm5,
          openTime: facilt.openTime5,
          closeTime: facilt.closeTime5,
          parkOpenTime: this.day5Days().parkOpenTime,
          parkCloseTime: this.day5Days().parkCloseTime,
        },
        {
          salesDate: facilt.salesDate6,
          operStatusCd: facilt.operStatusCd6,
          operStatusNm: facilt.operStatusNm6,
          openTime: facilt.openTime6,
          closeTime: facilt.closeTime6,
          parkOpenTime: this.day6Days().parkOpenTime,
          parkCloseTime: this.day6Days().parkCloseTime,
        },
        {
          salesDate: facilt.salesDate7,
          operStatusCd: facilt.operStatusCd7,
          operStatusNm: facilt.operStatusNm7,
          openTime: facilt.openTime7,
          closeTime: facilt.closeTime7,
          parkOpenTime: this.day7Days().parkOpenTime,
          parkCloseTime: this.day7Days().parkCloseTime,
        },
      ]
      const days = []
      days.push({
        ...fullDays[0],
        colspan: 1,
      })
      // if (facilt.faciltName === '테스트') console.log(facilt.faciltName, 1, days.length, 1)
      for (let i = 1; i < 7; i += 1) {
        /*
        if (fullDays[i].operStatusCd === 'PMCH'
            || fullDays[i].operStatusCd === 'WNTR'
            || fullDays[i].operStatusCd === 'CONR'
            || fullDays[i].operStatusCd === 'RNTR') {
          if (fullDays[i].operStatusCd === fullDays[i - 1].operStatusCd) {
            days[days.length - 1].colspan = days[days.length - 1].colspan + 1
            console.log(i, days[days.length - 1].colspan)
          } else {
            days.push({
              ...fullDays[i],
              colspan: 1,
            })
          }
        } else {
          days.push({
            ...fullDays[i],
            colspan: 1,
          })
        }
        */
        if (fullDays[i].operStatusCd === fullDays[i - 1].operStatusCd
            && fullDays[i].openTime === fullDays[i - 1].openTime
            && fullDays[i].closeTime === fullDays[i - 1].closeTime) {
          days[days.length - 1].colspan = days[days.length - 1].colspan + 1
        } else {
          days.push({
            ...fullDays[i],
            colspan: 1,
          })
        }
      }
      return days
    },
    day1Stat() { return this.stat[0] ?? {} },
    day2Stat() { return this.stat[1] ?? {} },
    day3Stat() { return this.stat[2] ?? {} },
    day4Stat() { return this.stat[3] ?? {} },
    day5Stat() { return this.stat[4] ?? {} },
    day6Stat() { return this.stat[5] ?? {} },
    day7Stat() { return this.stat[6] ?? {} },
    getMMDDOnly(YYYYMMDD) {
      const MM = YYYYMMDD.substr(4, 2)
      const DD = YYYYMMDD.substr(6, 2)
      return `${MM}.${DD}`
    },
    getStat1Date() { return this.day1Stat().salesDate ? this.getMMDDOnly(this.day1Stat().salesDate) : '-' },
    getStat2Date() { return this.day2Stat().salesDate ? this.getMMDDOnly(this.day2Stat().salesDate) : '-' },
    getStat3Date() { return this.day3Stat().salesDate ? this.getMMDDOnly(this.day3Stat().salesDate) : '-' },
    getStat4Date() { return this.day4Stat().salesDate ? this.getMMDDOnly(this.day4Stat().salesDate) : '-' },
    getStat5Date() { return this.day5Stat().salesDate ? this.getMMDDOnly(this.day5Stat().salesDate) : '-' },
    getStat6Date() { return this.day6Stat().salesDate ? this.getMMDDOnly(this.day6Stat().salesDate) : '-' },
    getStat7Date() { return this.day7Stat().salesDate ? this.getMMDDOnly(this.day7Stat().salesDate) : '-' },
    getStat1Check() { return this.day1Stat().checkCnt ?? '-' },
    getStat2Check() { return this.day2Stat().checkCnt ?? '-' },
    getStat3Check() { return this.day3Stat().checkCnt ?? '-' },
    getStat4Check() { return this.day4Stat().checkCnt ?? '-' },
    getStat5Check() { return this.day5Stat().checkCnt ?? '-' },
    getStat6Check() { return this.day6Stat().checkCnt ?? '-' },
    getStat7Check() { return this.day7Stat().checkCnt ?? '-' },
    getStat1Break() { return this.day1Stat().breakCnt ?? '-' },
    getStat2Break() { return this.day2Stat().breakCnt ?? '-' },
    getStat3Break() { return this.day3Stat().breakCnt ?? '-' },
    getStat4Break() { return this.day4Stat().breakCnt ?? '-' },
    getStat5Break() { return this.day5Stat().breakCnt ?? '-' },
    getStat6Break() { return this.day6Stat().breakCnt ?? '-' },
    getStat7Break() { return this.day7Stat().breakCnt ?? '-' },
    getStat1Close() { return this.day1Stat().closeCnt ?? '-' },
    getStat2Close() { return this.day2Stat().closeCnt ?? '-' },
    getStat3Close() { return this.day3Stat().closeCnt ?? '-' },
    getStat4Close() { return this.day4Stat().closeCnt ?? '-' },
    getStat5Close() { return this.day5Stat().closeCnt ?? '-' },
    getStat6Close() { return this.day6Stat().closeCnt ?? '-' },
    getStat7Close() { return this.day7Stat().closeCnt ?? '-' },
    getStat1Rate() { return this.day1Stat().operRate ? `${this.day1Stat().operRate}%` : '-' },
    getStat2Rate() { return this.day2Stat().operRate ? `${this.day2Stat().operRate}%` : '-' },
    getStat3Rate() { return this.day3Stat().operRate ? `${this.day3Stat().operRate}%` : '-' },
    getStat4Rate() { return this.day4Stat().operRate ? `${this.day4Stat().operRate}%` : '-' },
    getStat5Rate() { return this.day5Stat().operRate ? `${this.day5Stat().operRate}%` : '-' },
    getStat6Rate() { return this.day6Stat().operRate ? `${this.day6Stat().operRate}%` : '-' },
    getStat7Rate() { return this.day7Stat().operRate ? `${this.day7Stat().operRate}%` : '-' },
    day1Days() { return this.days[0] ?? {} },
    day2Days() { return this.days[1] ?? {} },
    day3Days() { return this.days[2] ?? {} },
    day4Days() { return this.days[3] ?? {} },
    day5Days() { return this.days[4] ?? {} },
    day6Days() { return this.days[5] ?? {} },
    day7Days() { return this.days[6] ?? {} },
    getDays1Date() { return this.day1Days().salesDate ? this.getMMDDOnly(this.day1Days().salesDate) : '-' },
    getDays2Date() { return this.day2Days().salesDate ? this.getMMDDOnly(this.day2Days().salesDate) : '-' },
    getDays3Date() { return this.day3Days().salesDate ? this.getMMDDOnly(this.day3Days().salesDate) : '-' },
    getDays4Date() { return this.day4Days().salesDate ? this.getMMDDOnly(this.day4Days().salesDate) : '-' },
    getDays5Date() { return this.day5Days().salesDate ? this.getMMDDOnly(this.day5Days().salesDate) : '-' },
    getDays6Date() { return this.day6Days().salesDate ? this.getMMDDOnly(this.day6Days().salesDate) : '-' },
    getDays7Date() { return this.day7Days().salesDate ? this.getMMDDOnly(this.day7Days().salesDate) : '-' },
    getDays1Day() { return this.day1Days().dayNm ?? '-' },
    getDays2Day() { return this.day2Days().dayNm ?? '-' },
    getDays3Day() { return this.day3Days().dayNm ?? '-' },
    getDays4Day() { return this.day4Days().dayNm ?? '-' },
    getDays5Day() { return this.day5Days().dayNm ?? '-' },
    getDays6Day() { return this.day6Days().dayNm ?? '-' },
    getDays7Day() { return this.day7Days().dayNm ?? '-' },
    getTimeFmt(HHMM) {
      if (utils.isEmpty(HHMM)) return ''

      const HH = HHMM.substr(0, 2)
      const MM = HHMM.substr(2, 2)

      return utils.isEmpty(HH) || utils.isEmpty(MM) ? '' : `${HH}:${MM}`
    },
    getDays1OpenTime() { return this.day1Days().parkOpenTime ? this.getTimeFmt(this.day1Days().parkOpenTime) : '-' },
    getDays2OpenTime() { return this.day2Days().parkOpenTime ? this.getTimeFmt(this.day2Days().parkOpenTime) : '-' },
    getDays3OpenTime() { return this.day3Days().parkOpenTime ? this.getTimeFmt(this.day3Days().parkOpenTime) : '-' },
    getDays4OpenTime() { return this.day4Days().parkOpenTime ? this.getTimeFmt(this.day4Days().parkOpenTime) : '-' },
    getDays5OpenTime() { return this.day5Days().parkOpenTime ? this.getTimeFmt(this.day5Days().parkOpenTime) : '-' },
    getDays6OpenTime() { return this.day6Days().parkOpenTime ? this.getTimeFmt(this.day6Days().parkOpenTime) : '-' },
    getDays7OpenTime() { return this.day7Days().parkOpenTime ? this.getTimeFmt(this.day7Days().parkOpenTime) : '-' },
    getDays1CloseTime() { return this.day1Days().parkCloseTime ? this.getTimeFmt(this.day1Days().parkCloseTime) : '-' },
    getDays2CloseTime() { return this.day2Days().parkCloseTime ? this.getTimeFmt(this.day2Days().parkCloseTime) : '-' },
    getDays3CloseTime() { return this.day3Days().parkCloseTime ? this.getTimeFmt(this.day3Days().parkCloseTime) : '-' },
    getDays4CloseTime() { return this.day4Days().parkCloseTime ? this.getTimeFmt(this.day4Days().parkCloseTime) : '-' },
    getDays5CloseTime() { return this.day5Days().parkCloseTime ? this.getTimeFmt(this.day5Days().parkCloseTime) : '-' },
    getDays6CloseTime() { return this.day6Days().parkCloseTime ? this.getTimeFmt(this.day6Days().parkCloseTime) : '-' },
    getDays7CloseTime() { return this.day7Days().parkCloseTime ? this.getTimeFmt(this.day7Days().parkCloseTime) : '-' },
    getDays1OpenTimeCBOut() { return this.faciltDailyReportDaysListCBOut[0].parkOpenTime ? this.getTimeFmt(this.faciltDailyReportDaysListCBOut[0].parkOpenTime) : '-' },
    getDays2OpenTimeCBOut() { return this.faciltDailyReportDaysListCBOut[1].parkOpenTime ? this.getTimeFmt(this.faciltDailyReportDaysListCBOut[1].parkOpenTime) : '-' },
    getDays3OpenTimeCBOut() { return this.faciltDailyReportDaysListCBOut[2].parkOpenTime ? this.getTimeFmt(this.faciltDailyReportDaysListCBOut[2].parkOpenTime) : '-' },
    getDays4OpenTimeCBOut() { return this.faciltDailyReportDaysListCBOut[3].parkOpenTime ? this.getTimeFmt(this.faciltDailyReportDaysListCBOut[3].parkOpenTime) : '-' },
    getDays5OpenTimeCBOut() { return this.faciltDailyReportDaysListCBOut[4].parkOpenTime ? this.getTimeFmt(this.faciltDailyReportDaysListCBOut[4].parkOpenTime) : '-' },
    getDays6OpenTimeCBOut() { return this.faciltDailyReportDaysListCBOut[5].parkOpenTime ? this.getTimeFmt(this.faciltDailyReportDaysListCBOut[5].parkOpenTime) : '-' },
    getDays7OpenTimeCBOut() { return this.faciltDailyReportDaysListCBOut[6].parkOpenTime ? this.getTimeFmt(this.faciltDailyReportDaysListCBOut[6].parkOpenTime) : '-' },
    getDays1CloseTimeCBOut() { return this.faciltDailyReportDaysListCBOut[0].parkCloseTime ? this.getTimeFmt(this.faciltDailyReportDaysListCBOut[0].parkCloseTime) : '-' },
    getDays2CloseTimeCBOut() { return this.faciltDailyReportDaysListCBOut[1].parkCloseTime ? this.getTimeFmt(this.faciltDailyReportDaysListCBOut[1].parkCloseTime) : '-' },
    getDays3CloseTimeCBOut() { return this.faciltDailyReportDaysListCBOut[2].parkCloseTime ? this.getTimeFmt(this.faciltDailyReportDaysListCBOut[2].parkCloseTime) : '-' },
    getDays4CloseTimeCBOut() { return this.faciltDailyReportDaysListCBOut[3].parkCloseTime ? this.getTimeFmt(this.faciltDailyReportDaysListCBOut[3].parkCloseTime) : '-' },
    getDays5CloseTimeCBOut() { return this.faciltDailyReportDaysListCBOut[4].parkCloseTime ? this.getTimeFmt(this.faciltDailyReportDaysListCBOut[4].parkCloseTime) : '-' },
    getDays6CloseTimeCBOut() { return this.faciltDailyReportDaysListCBOut[5].parkCloseTime ? this.getTimeFmt(this.faciltDailyReportDaysListCBOut[5].parkCloseTime) : '-' },
    getDays7CloseTimeCBOut() { return this.faciltDailyReportDaysListCBOut[6].parkCloseTime ? this.getTimeFmt(this.faciltDailyReportDaysListCBOut[6].parkCloseTime) : '-' },
    downloadBlob(res, fileName) {
      const blob = new Blob([res.data], { type: res.headers['content-type'] })
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, fileName)
      } else {
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.target = '_blank'
        if (fileName) link.download = fileName
        link.click()
      }
    },
    downloadGridToExcel(pageNm, columnObj, datasetObj, excelFileNm, metaObj) {
      // const grid = this.$refs.detailGrid;
      // const fileName = "excel-export.xlsx";
      // this.fileName = fileName;
      let meta = {}
      if (metaObj) {
        meta = metaObj
      }
      if (!meta.headerTitle) {
        meta.headerTitle = {}
        utils.forEach(columnObj, item => {
          if (item.datafield) { // jqx grid
            meta.headerTitle[item.datafield] = item.text
          } else { // uidev gird
            meta.headerTitle[item.value] = item.text
          }
        })
      }
      const data = datasetObj.getRawData()
      const dtmColumns = []
      const exportUserNameColumns = []
      columnObj.forEach(column => {
        if (column.datafield) {
          if (/(DTM|DT|DateTime)$/.test(column.datafield)) {
            dtmColumns.push(column.datafield)
          }
        } else if (column.value) {
          if (/(DTM|DT|DateTime)$/.test(column.value)) {
            dtmColumns.push(column.value)
          }
        }
        if (column.excelExportUserName) {
          // excelExportUserName에 Display값을 넣어 보냄. 1:Name, 2:Name/Department
          exportUserNameColumns.push({
            datafield: column.excelExportUserName.datafield,
            displayType: column.excelExportUserName.displayType,
          })
        }
      })
      data.forEach(item => {
        dtmColumns.forEach(dtmColumn => {
          if (dtmColumn && dtmColumn.length === 8) {
            // eslint-disable-next-line no-param-reassign
            item[dtmColumn] = utils.dateformatToClient(item[dtmColumn], 'S')
          } else {
            // eslint-disable-next-line no-param-reassign
            item[dtmColumn] = utils.dateformatToClient(item[dtmColumn])
          }
        })

        // finalModificationDisplayLangId
        // finalModificationUserId
        // finalModificationKnoxId
        // finalModificationLoginId
        // finalModificationUserName
        // finalModificationUserGlobalName
        // finalModificationDepartmentName
        // finalModificationDepartmentEnglishName
        exportUserNameColumns.forEach(exportData => {
          const userName = `finalModificationUser${this.$store.getters.userInfo.langId === 'en' ? 'Global' : ''}Name`
          const departmentName = `finalModificationDepartment${this.$store.getters.userInfo.langId === 'en' ? 'English' : ''}Name`

          // eslint-disable-next-line no-param-reassign
          item[exportData.datafield] = (item[userName] !== null ? item[userName] : '')
            + (item[userName] !== null && exportData.displayType === 2 ? ' / ' : '')
            + (exportData.displayType === 2 ? item[departmentName] : '')
        })
      })

      const dataParams = {
        data,
        meta,
      }

      console.log('REQ-EXCEL-DOWNLOAD', dataParams)
      // http.request(pageNm, 'DTS_CMZ_00042', {
      http.request(this.pageId, 'DTS_AAB_00046', {
        data: dataParams,
        responseType: 'arraybuffer',
      }).then(res => {
        console.log('RES-EXCEL-DOWNLOAD', res)
        this.downloadBlob(res, excelFileNm)
        // let blob = new Blob([res.data], {type: res.headers['content-type']});
        // if(window.navigator.msSaveOrOpenBlob) {
        //   window.navigator.msSaveOrOpenBlob(blob, excelFileNm);
        // }
        // else {
        //   let link = document.createElement('a');
        //   link.href = window.URL.createObjectURL(blob);
        //   link.target = '_blank';
        //   if(excelFileNm) link.download = excelFileNm;
        //   link.click();
        // }
      }).catch(error => {
        console.log('ERR', error)
      })
    },
    onTest() {
    },
  },
}

export default FaciltDailyOperViewMixin
