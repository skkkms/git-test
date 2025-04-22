<template>
  <div>
    <ur-form-box toggleable>
      <!-- 회원번호 -->
      <ur-form-item
        :label="this.$t('MSG_TXT_MEM_NUM')"
        label-align="right"
        class="flex_wrap"
        style="width:50%; height:auto;"
      >
        <ur-text-field
          v-model="searchParams.memshpUid"
          style="width: 100%; height: auto;"
          maxlength="10"
          mask="##########"
          @keydown.enter="onClickSearchButton"
        />
      </ur-form-item>
      <!-- 아이디 -->
      <ur-form-item
        :label="this.$t('MSG_TXT_IAM_ID')"
        label-align="right"
        class="flex_wrap"
        style="width:50%; height:auto;"
      >
        <ur-text-field
          v-model="searchParams.id"
          style="width: 100%; height: auto;"
          maxlength="20"
          @keydown.enter="onClickSearchButton"
        />
      </ur-form-item>
      <!-- 이름 -->
      <ur-form-item
        :label="this.$t('MSG_TXT_NAME')"
        label-align="right"
        class="flex_wrap"
        style="width:50%; height:auto;"
      >
        <ur-text-field
          v-model="searchParams.name"
          style="width: 100%; height: auto;"
          maxlength="10"
          @keydown.enter="onClickSearchButton"
        />
      </ur-form-item>
      <!-- 휴대폰 번호 -->
      <ur-form-item
        :label="this.$t('MSG_TXT_PHONE_NUM')"
        label-align="right"
        class="flex_wrap"
        style="width:50%; height:auto;"
      >
        <ur-text-field
          v-model="searchParams.mobileTel"
          style="width: 100%; height: auto;"
          mask="phone"
          @keydown.enter="onClickSearchButton"
        />
      </ur-form-item>
    </ur-form-box>
    <div class="btn_wrap mt10">
      <div class="right_box">
        <ur-button @click="onClickInitButton">
          {{ this.$t('MSG_BTN_RESET') }}
        </ur-button>
        <ur-button
          v-permission:read="contextPageId"
          color="violet"
          @click="onClickSearchButton"
        >
          {{ this.$t('MSG_BTN_SEARCH') }}
        </ur-button>
      </div>
    </div>
    <ur-data-grid
      ref="grid"
      :headers="gridColumn"
      :data-source="memberGrid.dataSource"
      :item-size="memberGrid.itemSize"
      :data-set-options="{id: 'id'}"
      :options="memberGrid.opts"
      class="custom_grid_type1 mt35"
    >
      <template #empty-view>
        <div
          class="empty_box"
          style="background-color: transparent"
        >
          {{ $t('MSG_TXT_EMPTY_DATA') }}
        </div>
      </template>
    </ur-data-grid>
  </div>
</template>
<script>

import { urDataSet } from 'uidev-component'

export default {
  name: 'PGE_AAG_00001_T02', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      params: {},
      searchParams: {
        memshpUid: '',
        name: '',
        mobileTel: '',
        id: '',
      },
      memberGrid: {
        dataSource: new urDataSet(), // eslint-disable-line new-cap
        itemSize: 0,
        opts: {
          height: 530,
          resizableColumn: true,
          pagination: true,
          internalPaging: true,
          multiSelect: false,
          selectCheck: false,
        },
      },
    }
  },
  computed: {
    contextPageId() {
      return this.$attrs['page-id']
    },
    gridColumn() {
      const column = [
        {
          value: 'memshpUid',
          text: this.$t('MSG_TXT_MEM_NUM'),
          customStyle: () => ({ 'text-decoration': 'underline' }),
          click: value => {
            const params = {}
            params[`${this.$options.name}`] = this.params // 검색조건
            params.memshpUid = value
            params.tabIndex = '2'
            utils.goPage('PGE_AAG_00003', { params })
          },
        },
        { value: 'id', text: this.$t('MSG_TXT_IAM_ID') },
        { value: 'name', text: this.$t('MSG_TXT_NAME') },
        { value: 'mobileTel', text: this.$t('MSG_TXT_PHONE_NUM') },
        { value: 'grdCd', text: this.$t('MSG_TXT_IAA_MEMBER_GRADE') },
        {
          value: 'joinDate',
          text: this.$t('MSG_TXT_REG_DATE'),
          customValue: v => {
            const customValue = moment(v, 'YYYYMMDD').format('YYYY-MM-DD')
            return customValue
          },
        },
      ]
      return column
    },
  },
  watch: {
  },
  created() {
  },
  mounted() {
    this.initializeSearchParams()
  },
  methods: {
    initializeSearchParams() {
      const searchParams = utils.getParameter(this, 'params')[`${this.$options.name}`]
      if (!utils.isEmpty(searchParams)) {
        this.searchParams = searchParams
        this.$refs.eventPublctGrid.mx_pager.rowsPerPage = this.searchParams.rowsPerPage
      } else {
        this.onClickInitButton()
        this.memberGrid.opts.height += 40
      }
    },
    onClickInitButton() {
      this.searchParams.memshpUid = ''
      this.searchParams.name = ''
      this.searchParams.mobileTel = ''
      this.searchParams.id = ''
    },
    onClickSearchButton() {
      if (_.isEmpty(this.searchParams.memshpUid)
          && _.isEmpty(this.searchParams.name)
          && _.isEmpty(this.searchParams.mobileTel)
          && _.isEmpty(this.searchParams.id)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NCSR_SEARCH_COND'))
        return
      }

      http.request(this.contextPageId, 'DTS_AAG_00061', {
        query: {
          memshpUid: encodeURI(this.searchParams.memshpUid),
          name: encodeURI(this.searchParams.name),
          mobileTel: encodeURI(this.searchParams.mobileTel),
          id: encodeURI(this.searchParams.id),
        },
      }).then(res => {
        this.memberGrid.dataSource = res.data.list
        this.memberGrid.itemSize = res.data.list.length
      })
      this.params = utils.cloneDeep(this.searchParams)
    },
  },
}
</script>
<style scoped>
</style>
