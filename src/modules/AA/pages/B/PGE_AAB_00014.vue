<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- [기본 정보] -->
      <div class="comm_title_wrap mt45">
        <h4>{{ $t("MSG_TXT_DEFAULT_INFO") }}</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_TIT_CNT_NAME')"
          label-align="right"
          style="width: 50%; height: auto;"
        >
          {{ resData.contentsName }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          label-align="right"
          style="width: 50%; height: auto;"
        >
          {{ resData.exposrYn }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_ORDER')"
          label-align="right"
          style="width: 50%; height: auto;"
        >
          {{ resData.exposrOrder | numberFormat }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_LCT')"
          label-align="right"
          style="width: 50%; height: auto;"
        >
          {{ resData.exposrLocNm }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_LANG_DIV')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{ resData.langKindNm }}
        </ur-form-item>
        <ur-form-item
          :label="$t('사용여부')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{ resData.useYn }}
        </ur-form-item>
      </ur-form-box>

      <!-- [대상자 제어] -->
      <div class="comm_title_wrap mt45">
        <h4>{{ $t("MSG_TXT_OBJ_CNTL") }}</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_GV_CNT')"
          label-align="right"
          style="width: 50%; height: auto;"
        >
          {{ resData.visitCntTypeNm }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_VST_STTS')"
          label-align="right"
          style="width: 50%; height: auto;"
        >
          {{ resData.visitStatTypeNm }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_MEMSHP_T')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{ resData.tearTypeNm }}
        </ur-form-item>
      </ur-form-box>

      <!-- [콘텐츠 관리] -->
      <div class="comm_title_wrap mt45">
        <h4>{{ $t("MSG_TIT_CNTN_MGMT") }}</h4>
        <div class="title_compo">
          <ur-radio-wrapper
            v-model="resData.contentKindCd"
            disabled
          >
            <!-- eslint-disable -->
            <ur-radio value="01" sm>{{ $t('MSG_TXT_COURSE') }}</ur-radio>
            <ur-radio value="02" sm>{{ $t('MSG_TXT_FACILITY') }}</ur-radio>
            <ur-radio value="03" sm>{{ $t('MSG_TXT_SMART_RSV') }}</ur-radio>
            <ur-radio value="04" sm>{{ $t('MSG_TXT_EVNT') }}</ur-radio>
            <ur-radio value="05" sm>{{ $t('MSG_TXT_ANNM') }}</ur-radio>
            <ur-radio value="06" sm>{{ $t('MSG_TXT_URL') }}</ur-radio>
            <!-- eslint-enable -->
          </ur-radio-wrapper>
        </div>
      </div>

      <!-- [코스] -->
      <ur-data-grid
        v-if="resData.contentKindCd=='01'?true:false"
        ref="gridP01"
        :headers="columnsT1"
        :options="options"
        :data-source="listT1"
        :data-set-options="{id: 'id'}"
      />
      <!-- [시설] -->
      <ur-data-grid
        v-if="resData.contentKindCd=='02'?true:false"
        ref="gridP02"
        :headers="columnsT2"
        :options="options"
        :data-source="listT2"
        :data-set-options="{id: 'id'}"
      />
      <!-- [스마트예약] -->
      <ur-data-grid
        v-if="resData.contentKindCd=='03'?true:false"
        ref="gridP03"
        :headers="columnsT3"
        :options="options"
        :data-source="listT3"
        :data-set-options="{id: 'id'}"
      />
      <!-- [이벤트] -->
      <ur-data-grid
        v-if="resData.contentKindCd=='04'?true:false"
        ref="gridP04"
        :headers="columnsT4"
        :options="options"
        :data-source="listT4"
        :data-set-options="{id: 'id'}"
      />
      <!-- [공지] -->
      <ur-data-grid
        v-if="resData.contentKindCd=='05'?true:false"
        ref="gridP05"
        :headers="columnsT5"
        :options="options"
        :data-source="listT5"
        :data-set-options="{id: 'id'}"
      />
      <!-- [URL] -->
      <ur-data-grid
        v-if="resData.contentKindCd=='06'?true:false"
        ref="gridP06"
        :headers="columnsT6"
        :options="options"
        :data-source="listT6"
        :data-set-options="{id: 'id'}"
      />
      <!-- [퍼소나 등록] -->
      <div class="comm_title_wrap mt45">
        <h4>{{ $t("MSG_TXT_PERSON_RGST") }}</h4>
      </div>
      <ur-data-grid
        ref="grid07"
        :headers="columnsT7"
        :options="opts1"
        :data-source="dataSet7"
        :data-set-options="{id: 'id'}"
      />
      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <!-- [버튼] 목록 -->
            <ur-button
              @click="goToList"
            >
              {{ $t("MSG_BTN_LIST") }}
            </ur-button>
          </div>
          <div class="right_box">
            <!-- [버튼] 수정 -->
            <ur-button
              color="violet"
              v-permission:update="$options.name"
              @click="onChangeFacilt"
            >
              {{ $t("MSG_BTN_MDFC") }}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAB_00014', // eslint-disable-line vue/name-property-casing
  filters: {
    numberFormat(value) {
      return value ? utils.numberFormat(value) : null
    },
  },
  data() {
    return {
      resData: {},
      // [테이블 옵션]
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
        selectCheckOnly: true,
      },
      opts1: { // 토탈 x 전체선택X 셀선택 o
        noInfo: true,
        multiSelect: false,
        selectCheck: true,
        selectCheckOnly: true,
      },

      // [코스]
      columnsT1: [
        { value: 'rownum', text: this.$t('MSG_TXT_NUM_SHORT'), width: 100 },
        { value: 'courseIdName', text: this.$t('MSG_TXT_EXPOSR_CNTN') },
        {
          value: 'thumbImagUrl',
          text: this.$t('MSG_TXT_THUMBNAIL'),
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'], // provided by grid
            template: `<div>
              <cmp-single-file-uploader
                :value="value"
                mode="SELECT"
                page-id="PGE_AAB_00014"  
              />
              </div>`,
          },
        },
      ],
      listT1: [],
      // [시설]
      columnsT2: [
        { value: 'rownum', text: this.$t('MSG_TXT_NUM_SHORT'), width: 100 },
        { value: 'faciltName', text: this.$t('MSG_TXT_EXPOSR_CNTN') },
      ],
      listT2: [],
      // [스마트예약]
      columnsT3: [
        { value: 'rownum', text: this.$t('MSG_TXT_NUM_SHORT'), width: 100 },
        { value: 'prodNm', text: this.$t('MSG_TXT_EXPOSR_CNTN') },
        {
          value: 'thumbImagUrl',
          text: this.$t('MSG_TXT_THUMBNAIL'),
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'], // provided by grid
            template: `<div>
              <cmp-single-file-uploader
                :value="value"
                mode="SELECT"
                page-id="PGE_AAB_00014"
              />
              </div>`,
          },
        },
      ],
      listT3: [],
      // [이벤트]
      columnsT4: [
        { value: 'rownum', text: this.$t('MSG_TXT_NUM_SHORT'), width: 100 },
        { value: 'eventName', text: this.$t('MSG_TXT_EXPOSR_CNTN') },
        {
          value: 'thumbImagUrl',
          text: this.$t('MSG_TXT_THUMBNAIL'),
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'], // provided by grid
            template: `<div>
              <cmp-single-file-uploader
                :value="value"
                mode="SELECT"
                page-id="PGE_AAB_00014"  
              />
              </div>`,
          },
        },
      ],
      listT4: [],
      // [공지]
      columnsT5: [
        { value: 'rownum', text: this.$t('MSG_TXT_NUM_SHORT'), width: 100 },
        { value: 'publctSubject', text: this.$t('MSG_TXT_EXPOSR_CNTN') },
        {
          value: 'thumbImagUrl',
          text: this.$t('MSG_TXT_THUMBNAIL'),
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'], // provided by grid
            template: `<div>
              <cmp-single-file-uploader
                :value="value"
                mode="SELECT"
                page-id="PGE_AAB_00014"  
              />
              </div>`,
          },
        },
      ],
      listT5: [],
      // [URL]
      columnsT6: [
        { value: 'rownum', text: this.$t('MSG_TXT_NUM_SHORT'), width: 100 },
        { value: 'exposrContentName', text: this.$t('MSG_TXT_EXPOSR_CNTN') },
        {
          value: 'thumbImagUrl',
          text: this.$t('MSG_TXT_THUMBNAIL'),
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'], // provided by grid
            template: `<div>
              <cmp-single-file-uploader
                :value="value"
                mode="SELECT"
                page-id="PGE_AAB_00014"
              />
              </div>`,
          },
        },
      ],
      listT6: [],


      // [퍼소나테이블]
      columnsT7: [
        {
          value: '__idx',
          text: this.$t('MSG_TXT_NUM_SHORT'),
          width: 100,
          customValue: v => v + 1,
        },
        { value: 'personaName', text: this.$t('MSG_TXT_PERSON_TYPE') },
        { value: 'companaionNm', text: this.$t('MSG_TXT_COMPANAION01') },
        { value: 'playTypeNm', text: this.$t('MSG_TXT_PLAY_TYPE') },
        { value: 'personaId', text: this.$t('MSG_TXT_PERSON_CD') },
        // width:num, type:'number','code'
      ],
      dataSet7: new this.$ur.grid.DataSet(),
    }
  },
  computed: {
    exposrOrder() {
      return utils.numberFormat(this.resData.exposrOrder)
    },
  },
  mounted() {
    const params = utils.getParameter(this, 'params')
    const { curationId } = params
    const that = this

    // [조회]
    http.request(this.$options.name, 'DTS_AAC_00003', {
      query: {},
      path: { 'curation-id': curationId },
      data: {},
    }).then(res => {
      that.resData = res.data

      if (that.resData.curationContentDVOList.length > 0) {
        const { contentId } = that.resData.curationContentDVOList[0] // meunu_id
        let { contentNm } = that.resData.curationContentDVOList[0] // prod_nm
        const { thumbImagUrl } = that.resData.curationContentDVOList[0] // thumbImagUrl
        const { exposrContentName } = that.resData.curationContentDVOList[0] // exposrContentName
        let { faciltNms } = that.resData.curationContentDVOList[0]

        let faciltNmsList = []
        if (!utils.isEmpty(faciltNms)) {
          faciltNmsList = faciltNms.split(',')
        }
        if (faciltNmsList.length > 3) {
          faciltNmsList = faciltNmsList.slice(0, 3)
          faciltNms = `${faciltNmsList.toString()}...`
        }

        let courseIdName = ''
        if (!utils.isEmpty(contentId)) {
          if (utils.isEmpty(contentNm)) {
            contentNm = ''
          }
          if (utils.isEmpty(faciltNms)) {
            faciltNms = ''
          }
          courseIdName = `${contentId} / ${contentNm} / ${faciltNms}`
        }
        that.listT1 = [
          {
            rownum: '1',
            courseId: contentId,
            courseName: contentNm,
            courseIdName: courseIdName, // eslint-disable-line object-shorthand
            thumbImagUrl: thumbImagUrl, // eslint-disable-line object-shorthand
          },
        ]
        that.listT2 = [
          {
            rownum: '1',
            faciltId: contentId,
            faciltName: contentNm,
          },
        ]
        that.listT3 = [
          {
            rownum: '1',
            menuId: contentId,
            prodNm: contentNm,
            thumbImagUrl: thumbImagUrl, // eslint-disable-line object-shorthand
          },
        ]
        that.listT4 = [
          {
            rownum: '1',
            eventName: contentNm,
            thumbImagUrl: thumbImagUrl, // eslint-disable-line object-shorthand
          },
        ]
        that.listT5 = [
          {
            rownum: '1',
            publctSubject: contentNm,
            thumbImagUrl: thumbImagUrl, // eslint-disable-line object-shorthand
          },
        ]
        that.listT6 = [
          {
            rownum: '1',
            exposrContentName: exposrContentName, // eslint-disable-line object-shorthand
            thumbImagUrl: thumbImagUrl, // eslint-disable-line object-shorthand
          },
        ]
      }
      // [큐레이션]
      that.dataSet7.setData(this.resData.curationPersonaDVOList)
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    // [버튼] 이전 페이지 이동
    goToList() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAB_00012', { params })
    },

    // [버튼] 수정 페이지 이동
    onChangeFacilt() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAB_00015', { params })
    },
  },
}
</script>
<style scoped>
</style>
