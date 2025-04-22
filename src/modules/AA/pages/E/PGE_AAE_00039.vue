<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_LOVGRP_KIND_CD')"
          :label-align="'right'"
          style="width: 50%; height: auto; border: 0;"
        >
          <ur-radio-wrapper
            v-model="searchParams.lovgrpKindCd"
            :items="codes.COD_IA_LOVGRP_KIND"
            @input="selectLovgrpKindCd"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TIT_TTL')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="searchParams.publctSubject"
            style="width: 100%;"
            maxlength="150"
            @keyup.enter="onClickSearch"
          />
        </ur-form-item>
        <!-- 멤버십 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_MEMSHP_CD')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
        <ur-dropdown v-model="searchParams.memshpClsCd" :items="searchCodes.COD_IA_LOVGRP_MEMSHP_CD" no-select :msg-no-select="$t('MSG_TXT_ALL')" @input="selectMemshpClsCd"/>
        </ur-form-item>

        <!-- 레벨 -->
        <ur-form-item
          :label="$t('MSG_TXT_LEVEL')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-dropdown v-model="searchParams.lvlCd" :items="searchCodes.COD_IA_LOVGRP_LV_CD" no-select :msg-no-select="$t('MSG_TXT_ALL')" />
        </ur-form-item>
        <ur-form-item
            :label="$t('MSG_TXT_APP_EXPOSR_PERIOD')"
            :label-align="'right'"
            style="width: 50%; height: auto;"
            class="flex_wrap"
        >
          <ur-range-picker
              v-model="searchParams.appExposrPeriodDtm"
              input-type="YYYY-MM-DD"
              :confirm-label="$t('MSG_TXT_SELT')"
          />
        </ur-form-item>
        <ur-form-item
            :label="$t('MSG_TXT_EXPOSR_YN')"
            :label-align="'right'"
            style="width: 50%; height: auto;"
            class="flex_wrap"
        >
          <ur-checkbox-wrapper
              v-model="searchParams.exposrYn"
              :items="codes.COD_IA_EXPOSR_YN"
              sm
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="init">
            {{ $t('MSG_BTN_INTL' ) }}
          </ur-button>
          <ur-button
            color="violet"
            @click="onClickSearch"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </ur-button>
        </div>
      </div>

      <ur-data-grid
        ref="grid"
        class="custom_grid_pgeNav_None mt35"
        :headers="columns"
        :data-source="list"
        :options="opts"
        :data-set-options="{id: 'id'}"
        :item-size="listSize"
        @grid:paging="pagingChange"
        @grid:scroll-bottom="onBottom"
      >
        <template #left-info>
          <cmp-ur-data-grid-left-info
              :total-count="listSize"
              :page-size="searchParams.rowsPerPage"
              @changePageSize="onChangePageSize"
          />
        </template>
      </ur-data-grid>





      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button
            v-permission:delete="$options.name"
            @click="deleteSelected"
          >
            {{ $t('MSG_TXT_DEL') }}
          </ur-button>
          <ur-button
            v-permission:create="$options.name"
            color="violet"
            @click="createNew"
          >
            {{ $t('MSG_BTN_RGST_NEW') }}
          </ur-button>
        </div>
      </div>

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

import moment from "moment/moment";

export default {
  name: 'PGE_AAE_00039', // eslint-disable-line vue/name-property-casing
  components: {
  },
  filters: {
    dateFormat(date) {
      if (!date) return ''
      return utils.dateformatToClient(date)
    },
  }, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      CODE_KEYS: ['COD_IA_EXPOSR_YN', 'COD_IA_LOVGRP_KIND', 'COD_IA_LOVGRP_MEMSHP_CD', 'COD_IA_LOVGRP_LV_CD'],
      codes: {
        COD_IA_LOVGRP_KIND: [],
        COD_IA_EXPOSR_YN: [],
        COD_IA_LOVGRP_MEMSHP_CD: [],
        COD_IA_LOVGRP_LV_CD: [],
      },
      searchCodes:{
        COD_IA_LOVGRP_MEMSHP_CD: [],
        COD_IA_LOVGRP_LV_CD: [],
        COD_IA_LOVGRP_LV_CD_ANIML: [],
        COD_IA_LOVGRP_LV_CD_PLANT: [],
      },
      listSize: 0,
      list: new this.$ur.grid.DataSet(),
      searchParams: {
        lovgrpKindCd: '001',
        memshpClsCd : '',
        lvlCd: '',
        publctSubject: '',
        exposrYn: ['Y', 'N'],
        appExposrPeriodDtm: [moment(utils.now('YYYY-MM-DD')).format('YYYY-MM-DD'), moment(utils.now('YYYY-MM-DD')).add(14, 'days').format('YYYY-MM-DD')],
        offset: 0,
        rowsPerPage: 30,
      },
      initSearchParam: {
        lovgrpKindCd: '001',
        memshpClsCd : '',
        lvlCd: '',
        publctSubject: '',
        exposrYn: ['Y', 'N'],
        appExposrPeriodDtm: [moment(utils.now('YYYY-MM-DD')).format('YYYY-MM-DD'), moment(utils.now('YYYY-MM-DD')).add(14, 'days').format('YYYY-MM-DD')],
        offset: 0,
        rowsPerPage: 30,
      },
      // 테이블
      opts: { // 토탈o
        height: 520,
        infinityScroll: true,
        pagination: true,
        noInfo: false,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        defaultPageSize: 10,
        resizableColumn: true,
      },
      disableNotiTypeCd: false,
      squery: {},
    }
  },
  computed: {
    columns() {
      const that = this
      const columns = [
        {
          text: this.$t('MSG_TXT_LOVGRP_KIND_CD'),
          value: 'lovgrpKindCd',
          width: 100,
          type: 'code',
          domain: this.codes.COD_IA_LOVGRP_KIND,
        },
        {
          text: this.$t('MSG_TXT_MEM_SHP'),
          value: 'memshpClsCd',
          width: 80,
          type: 'code',
          domain: this.codes.COD_IA_LOVGRP_MEMSHP_CD,
        },
        {
          text: this.$t('MSG_TXT_LEVEL'),
          value: 'lvlCd',
          width: 80,
          type: 'code',
          domain: this.codes.COD_IA_LOVGRP_LV_CD,
        },
        {
          text: this.$t('MSG_TXT_SUBJT'),
          width: 400,
          value: 'publctSubject',
          component: {
            props: ['row', 'value', 'text'],
            template: '<div ><ur-button shape="hyperlink" @click.stop="clickCheck(row)">{{text}}</ur-button></div>',
            methods: {
              clickCheck(row) {
                that.onRowClickEvent(row)
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_EXPOSR_YN'),
          value: 'exposrYn',
          width: 80,
          type: 'string',
          headerAlign: 'center',
          align : 'center'
        },
        {
          text: this.$t('MSG_TXT_APP_EXPOSR_PERIOD'),
          width: 260,
          component: {
            props: ['row', 'value', 'text'],
            template: '<div>{{publctTarget}}</div>',
            computed: {
              publctTarget() {
                const startDtm = utils.dateformatToClient(this.row.appExposrPeriodStartDtm).substring(0, 16)
                const endDtm = utils.dateformatToClient(this.row.appExposrPeriodEndDtm).substring(0, 16)
                return `${startDtm} ~ ${endDtm}`
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_FST_RGST_DTM'),
          width: 150,
          component: {
            props: ['row', 'value', 'text'],
            template: '<div>{{fstRgstDtm}}</div>',
            computed: {
              fstRgstDtm() {
                return utils.dateformatToClient(this.row.fstRgstDtm)
              },
            },
          },
        },
        { text: this.$t('MSG_TXT_FST_RGST_USR'), value: 'fstRgstUsrId', width: 100 },
        {
          text: this.$t('MSG_TXT_MDFC_DTM'),
          width: 150,
          component: {
            props: ['row', 'value', 'text'],
            template: '<div>{{fnlMdfcDtm}}</div>',
            computed: {
              fnlMdfcDtm() {
                return utils.dateformatToClient(this.row.fnlMdfcDtm)
              },
            },
          },
        },
        { text: this.$t('MSG_TIT_MDFC_USR'), value: 'fnlMdfcUsrId' },
      ]
      return columns
    },
  },
  watch: {
  },
  created() {
    this.selectCode()
  },
  mounted() {
  },
  methods: {
    async selectCode() {
      const params = utils.getParameter(this, 'params')
      http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes).then(
        () => {
          this.searchCodes.COD_IA_LOVGRP_LV_CD_ANIML = this.codes.COD_IA_LOVGRP_LV_CD.slice(0,6);// 시작 ~ 6개
          this.searchCodes.COD_IA_LOVGRP_LV_CD_PLANT = this.codes.COD_IA_LOVGRP_LV_CD.slice(6);// 6번째
          this.codes.COD_IA_LOVGRP_MEMSHP_CD.push({
            codeId: '000', codeName: this.$t('MSG_TXT_ALL'), text: this.$t('MSG_TXT_ALL'), value: '000', key: '000', label: this.$t('MSG_TXT_ALL'),
          })
          this.codes.COD_IA_LOVGRP_LV_CD.push({
            codeId: '000', codeName: this.$t('MSG_TXT_ALL'), text: this.$t('MSG_TXT_ALL'), value: '000', key: '000', label: this.$t('MSG_TXT_ALL'),
          })
          if (params) {
            if (!_.isEmpty(params.lovgrpKindCd)) {
              this.selectLovgrpKindCd(params.lovgrpKindCd) // 사랑단분류 셋팅
            }
            if (!_.isEmpty(params.memshpClsCd)) {
              this.selectMemshpClsCd(params.memshpClsCd) // 멤버십 셋팅
            }
            this.searchParams = params
          }
          else{
            this.selectLovgrpKindCd(this.searchParams.lovgrpKindCd) // 사랑단분류 셋팅
          }
          this.onClickSearch()
        },
      )
    },
    init() {
      this.searchParams = JSON.parse(JSON.stringify(this.initSearchParam))
      this.selectLovgrpKindCd(this.searchParams.lovgrpKindCd);
    },
    getSearchParam() {
      const params = {
        lovgrpKindCd: this.searchParams.lovgrpKindCd,
        memshpClsCd: this.searchParams.memshpClsCd,
        lvlCd: this.searchParams.lvlCd,
        publctSubject: encodeURI(this.searchParams.publctSubject),
        exposrYn: this.searchParams.exposrYn.join(','),
        appExposrPeriodStartDtm: this.searchParams.appExposrPeriodDtm[0],
        appExposrPeriodEndDtm: this.searchParams.appExposrPeriodDtm[1],
        rowsPerPage: this.searchParams.rowsPerPage,
        offset: this.list.totalSize,
      }
      return params
    },
    onClickSearch() {
      this.listSize = 0
      this.list = new this.$ur.grid.DataSet()
      this.search()
    },
    search() {
      if (_.isEmpty(this.searchParams.lovgrpKindCd)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_ID'), this.$t('MSG_TXT_LOVGRP_KIND_CD')))
        return
      }
      this.squery = this.getSearchParam()
      http.request(this.$options.name, 'DTS_AAE_00007', {
        query: this.squery,
      }).then(res => {
        if (res.data) {
          this.list.appendData(res.data.list)
          this.listSize = res.data.count
        }
      }).catch(error => {
        console.log(error)
      })
    },
    deleteSelected() {
      const rows = this.$refs.grid.getSelected()
      if (!rows || rows.length < 1) {
        utils.messageBox('alert', this.$t('MSG_ALT_DEL_NO_DATA')) // 삭제할 데이터를 선택하세요.
        return
      }
      const pathData = []
      _.forEach(rows, row => {
        pathData.push(row.publctId)
      })

      // 삭제 하시겠습니까?
      utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
        http.request(this.$options.name, 'DTS_AAE_00011', {
          path: {
            'publct-id': pathData.join(','),
          },
        }).then(res => {
          if (res.data) {
            utils.messageBox('alert', this.$t('MSG_ALT_DELETED')) // 삭제 되었습니다.
            this.onClickSearch()
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    createNew() {
      const params = {
        ...this.searchParams,
      }
      utils.goPage('PGE_AAE_00041', { params })
    },
    onRowClickEvent(row) {
      const params = {
        ...this.searchParams,
        publctId: row.publctId,
      }
      utils.goPage('PGE_AAE_00040', { params })
    },
    onBottom() {
      this.squery.offset = this.list.totalSize

      const totalSize = this.listSize
      const currentSize = this.list.totalSize

      if (totalSize > currentSize) {
        this.search()
      }
    },
    pagingChange(paging) {
      this.searchParams.rowsPerPage = paging.rowsPerPage
    },
    selectLovgrpKindCd(data) {
      console.lof
      this.searchParams.memshpClsCd = ''
      this.searchParams.lvlCd = ''
      this.searchCodes.COD_IA_LOVGRP_LV_CD = []
      const promise = http.loadChildCode(this.pageId, 'COD_IA_LOVGRP_MEMSHP_CD', data)
      promise.then(res => {
        this.searchCodes.COD_IA_LOVGRP_MEMSHP_CD = res.data
        if(data === '002'){
          this.searchCodes.COD_IA_LOVGRP_LV_CD = this.searchCodes.COD_IA_LOVGRP_LV_CD_PLANT;
        }else{
          this.searchCodes.COD_IA_LOVGRP_LV_CD = this.searchCodes.COD_IA_LOVGRP_LV_CD_ANIML;
        }
      })
    },
    selectMemshpClsCd(data) {
      this.searchParams.lvlCd = ''
      if (!_.isEmpty(data)) {
        const promise = http.loadChildCode(this.pageId, 'COD_IA_LOVGRP_LV_CD', data)
        promise.then(res => {
          this.searchCodes.COD_IA_LOVGRP_LV_CD = res.data
          if (res.data.length === 1) {
            this.searchParams.lvlCd = this.searchCodes.COD_IA_LOVGRP_LV_CD[0].codeId
          }
        })
      } else {
        if(this.searchParams.lovgrpKindCd === '002'){
          this.searchCodes.COD_IA_LOVGRP_LV_CD = this.searchCodes.COD_IA_LOVGRP_LV_CD_PLANT;
        }else{
          this.searchCodes.COD_IA_LOVGRP_LV_CD = this.searchCodes.COD_IA_LOVGRP_LV_CD_ANIML;
        }
      }
    },
    onChangePageSize(pageSize) {
      this.searchParams.rowsPerPage = pageSize
    },
  },
}
</script>
<style scoped>
</style>
