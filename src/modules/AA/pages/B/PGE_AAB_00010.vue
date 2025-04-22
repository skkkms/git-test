<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 시설 정보 탭 메뉴-->
      <div class="comm_title_wrap">
        <h4>
          시설 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="영업일자"
          :label-align="'right'"
          style="width:50%; height:auto;"
          class="flex_wrap"
        >
          {{ params.salesDateFmt }}
        </ur-form-item>
        <ur-form-item
          label="시설명"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          {{ params.faciltName }}
        </ur-form-item>
        <ur-form-item
          label="시설 카테고리"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          {{ params.faciltCateKindNms }}
        </ur-form-item>
        <ur-form-item
          label="Zone 구분"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          {{ params.zoneKindNm }}
        </ur-form-item>
        <ur-form-item
          label="가상대기 여부"
          :label-align="'right'"
          style="width:100%; height:auto;"
        >
          {{ params.vlineWaitYnNm }}
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box" />
      </div>
      <!-- E :: 시설 정보 탭 메뉴-->

      <!-- S :: 세부 예약 현황 테이블-->
      <div class="comm_title_wrap mt20">
        <h4>
          세부 예약 현황
        </h4>
        <div class="left_box pl16">
          <ur-button
            color="violet"
            @click="openVlineWaitCancelPopup"
          >
            대기라인 관리
          </ur-button>
          <ur-modal
            ref="modalP01"
            class="modal-b1c6"
            xlarge
            title="가상대기 취소"
            draggable
          />
        </div>
      </div>
      <template>
        <ur-data-grid
          ref="grid"
          :headers="columns"
          :data-source="dataSet"
          :options="opts"
          class="custom_grid_pgeNav_None"
        >
          <template #right-info>
            <!-- 검색조건EL : 조회-->
            <ur-button @click="onSearch">
              {{ $t('MSG_TXT_SRCH') }}
            </ur-button>
            <ur-button @click="onExcelDnLoad">
              <ur-icon
                icon="download"
                icon-type="line"
                size="small"
                spacing
              />
              {{ $t('엑셀다운로드') }}
            </ur-button>
          </template>
        </ur-data-grid>
      </template>
      <!-- E :: 세부 예약 현황 테이블-->

      <sui-page-footer class="comm_btn_wrap">
        <div>
          <div class="left_box">
            <ur-button @click="goToList">
              {{ $t('MSG_BTN_LIST') }}
            </ur-button>
          </div>
          <div class="right_box" />
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAB_00010', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      codeKeys: [
        'COD_RS_PARK_KIND',
        'COD_IA_EL_ZONE_KIND',
        'COD_IA_CB_ZONE_KIND',
        'COD_IA_EL_FACILT_CATE_KIND',
        'COD_IA_CB_FACILT_CATE_KIND',
        'COD_IA_VLINE_WAIT_YN',
        'COD_IA_VLINE_WAIT_CAPA_SLOT_STATUS',
        'COD_IAA_RESRV_STATUS',
      ],
      codes: {
        COD_RS_PARK_KIND: [],
        COD_IA_EL_ZONE_KIND: [],
        COD_IA_CB_ZONE_KIND: [],
        COD_IA_EL_FACILT_CATE_KIND: [],
        COD_IA_CB_FACILT_CATE_KIND: [],
        COD_IA_VLINE_WAIT_YN: [],
        COD_IA_VLINE_WAIT_CAPA_SLOT_STATUS: [],
        COD_IAA_RESRV_STATUS: [],
      },
      dataSet: new this.$ur.grid.DataSet(),
      opts: {
        infinityScroll: true,
        pagination: false,
        height: 450,
        resizableColumn: true,
        resizeFullWidth: true,
      },
      params: {},
      columns: [
        {
          value: '__idx', text: 'No.', width: 50, customValue: v => v + 1,
        },
        {
          value: 'reservReqNo',
          text: '예약번호',
          customValue: (v, r) => (v || r.drawWaitReqId),
        },
        { value: 'fnlMdfcDtm', text: '변경시간', width: 80 },
        { value: 'fstRgstDtm', text: '신청시간', width: 80 },
        { value: 'reservType', text: '예약구분', width: 80 },
        {
          value: 'useStartTime',
          text: '최초예약 탑승시간',
          width: 120,
        },
        {
          value: 'totalHeadCnt',
          text: '대기인원',
          width: 80,
        },
        {
          value: 'hcnt',
          text: '슬롯인원',
          width: 80,
        },
        {
          value: 'currWaitSeq',
          text: '대기순서',
          width: 80,
        },
        {
          value: 'vlineWaitRidingTimeConfirmYn',
          text: '확정여부',
          width: 80,
        },
        {
          value: 'vlineWaitPushSndgYn',
          text: 'PUSH 여부',
          width: 80,
        },
        {
          value: 'ridingStartTime',
          text: '확정예약 탑승시간',
          width: 120,
        },
        {
          value: 'reservReqMemshpUid', text: '맴버십UID', width: 120,
        },
        {
          value: 'reservQrCd', text: 'QR CD',
        },
        {
          value: 'pticketId', text: '개인 Ticket',
        },
        {
          value: 'procStatusNm', text: '예약상태', width: 120,
        },
        {
          value: 'fnlMdfcUsrId',
          text: '수정자',
          customValue: v => (v || '-'),
        },
      ],
    }
  },
  computed: {
    contextPageId() {
      return this.$options.name
    },
  },
  created() {
    http.mergeCodeList(this.contextPageId, this.codeKeys, this.codes)
  },
  mounted() {
    const query = { ...utils.getParameter(this, 'params') }

    if (utils.isEmpty(query)) {
      utils.messageBox('warning', this.$t('상세정보를 조회 할 수 없습니다.'))
      this.goToList()
      return
    }

    if (utils.isEmpty(query.current)) {
      utils.messageBox('warning', this.$t('상세정보를 조회 할 수 없습니다.'))
      this.goToList()
      return
    }

    if (utils.isEmpty(query.current.faciltId)) {
      utils.messageBox('warning', this.$t('상세정보를 조회 할 수 없습니다.'))
      this.goToList()
      return
    }

    if (utils.isEmpty(query.current.salesDate)) {
      utils.messageBox('warning', this.$t('상세정보를 조회 할 수 없습니다.'))
      this.goToList()
      return
    }

    this.params = {
      faciltId: query.current.faciltId,
      salesDate: query.current.salesDate,
      salesDateFmt: utils.dateformatToClient(query.current.salesDate),
      faciltName: query.current.faciltName,
      faciltCateKindNms: query.current.faciltCateKindNms,
      zoneKindNm: query.current.zoneKindNm,
      vlineWaitYnNm: query.current.vlineWaitYnNm,
      vlineWaitYn: query.current.vlineWaitYn,
    }

    this.onSearch()
  },
  methods: {
    onSearch() {
      const query = Object.assign({}, {
        faciltId: this.params.faciltId,
        salesDate: this.params.salesDate,
      }, this.paging)

      const serviceName = 'DTS_AAB_00039'
      http.request(this.contextPageId, serviceName, {
        query,
        path: {},
        data: {},
      }).then(res => {
        this.dataSet.setData(res.data)
      }).catch(error => {
        console.log(error)
      })
    },
    goToList() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAB_00009', { params })
    },
    openVlineWaitCancelPopup() {
      utils.openLayerPopup('PGE_AAB_00060', this.onOpenVlineWaitCancelPopupClosed, {
        size: 'xlg',
        pageInitialData: {
          faciltId: this.params.faciltId,
          salesDate: this.params.salesDate,
        },
      })
    },
    onOpenVlineWaitCancelPopupClosed(closeFlag) {
      if (closeFlag === 'REFRESH') {
        this.onSearch()
      }
    },
    onExcelDnLoad() {
      const viewData = this.dataSet.getViewData()

      const excelDataSet = new this.$ur.grid.DataSet()
      excelDataSet.setData(viewData)

      const sPageId = this.contextPageId
      const objGridColumns = this.columns
      const objGridDataset = excelDataSet
      const sToday = utils.now('YYYYMMDDHHmmss')
      const sExcelName = `${this.$t('가상대기 예약관리(세부현황) 상세')}_${sToday}.xlsx`
      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {})
    },
    openModalP01() { this.$refs.modalP01.open() },
    closeModalP01() { this.$refs.modalP01.close() },
  },
}
</script>
<style scoped>
</style>
