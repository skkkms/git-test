<template>
  <div>
    <!-- 제한사항 아이콘 관리 -->
    <div class="comm_title_wrap mt35">
      <h4 class="pr10">
        {{ $t('MSG_TXT_FACILT_LIMIT_ICON_MNG') }}
      </h4>
    </div>
    <!-- GRID -->
    <ur-data-grid
      ref="grid"
      :headers="columns"
      :data-source="list"
      :options="opts"
      height="300"
    />
  </div>
</template>
<script>
export default {
  name: 'PGE_AAB_00003_C01', // eslint-disable-line vue/name-property-casing
  components: {
  },
  props: {
    list: {
      type: Array,
      required: false,
    },
    parkKindCd: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      CODE_KEYS: [
        'COD_IA_UPLOAD_KIND',
        'COD_IA_LIMIT_ITEM',
        'COD_IA_LIMIT_INHIBITION_ITEM',
        'COD_IA_LIMIT_CAUTION_ITEM',
        'COD_IA_LIMIT_INSTRUCTION_ITEM',
        'COD_IA_LIMIT_DISABLED_ITEM',
        'COD_IA_CB_LIMIT_ITEM',
        'COD_IA_CB_LIMIT_INHIBITION_ITEM',
        'COD_IA_CB_LIMIT_CAUTION_ITEM',
        'COD_IA_CB_LIMIT_INSTRUCTION_ITEM',
        'COD_IA_CB_LIMIT_DISABLED_ITEM',
      ],
      codes: {
        COD_IA_UPLOAD_KIND: [],
        COD_IA_LIMIT_ITEM: [],
        COD_IA_LIMIT_INHIBITION_ITEM: [],
        COD_IA_LIMIT_CAUTION_ITEM: [],
        COD_IA_LIMIT_INSTRUCTION_ITEM: [],
        COD_IA_LIMIT_DISABLED_ITEM: [],
        COD_IA_CB_LIMIT_ITEM: [],
        COD_IA_CB_LIMIT_INHIBITION_ITEM: [],
        COD_IA_CB_LIMIT_CAUTION_ITEM: [],
        COD_IA_CB_LIMIT_INSTRUCTION_ITEM: [],
        COD_IA_CB_LIMIT_DISABLED_ITEM: [],
      },
      // 그리드
      opts: {
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
        rowHeight: 'auto',
      },
      columns: [],
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
  },
  mounted() {
    const that = this
    this.columns = [
      {
        value: '__idx', text: 'No.', width: 100, customValue: v => v + 1,
      },
      {
        value: 'uploadKindNm',
        text: this.$t('MSG_TXT_UPLOAD_KIND'), // 업로드 구분
        customValue: (v, r) => {
          const codeId = r.uploadKindCd
          const code = this.codes.COD_IA_UPLOAD_KIND.find(el => el.codeId === codeId)
          const val = code ? code.codeName : ''
          return val || '-'
        },
      },
      {
        value: 'limitItemName',
        text: this.$t('MSG_TXT_FACILT_LIMIT'), // 제한사항
        hide: true,
        customValue: (v, r) => {
          let val = ''
          if (r.uploadKindCd === '01') {
            // [제한사항1] 파크구분에 따라 코드 리스트 선택
            const limitItems = this.getLimitItems(this.parkKindCd)
            // 선택된 코드 리스트에서 코드명 조회
            let code = limitItems.find(el => el.codeId === r.limitItem1Cd)
            let limitItem1Nm = code && code.text

            let limitItem2Nm = '-'
            if (r.limitItem1Cd === '01') { /* 금지사항 */
              // [제한사항2] 파크구분에 따라 코드 리스트 선택
              const inhibitionItems = this.getInhibitionItems(this.parkKindCd)
              // 선택된 코드 리스트에서 코드명 조회
              code = inhibitionItems.find(el => el.codeId === r.limitItem2Cd)
              limitItem2Nm = code && code.text
            } else if (r.limitItem1Cd === '02') { /* 주의/경고 사항 */
              // [제한사항2] 파크구분에 따라 코드 리스트 선택
              const cautionItems = this.getCautionItems(this.parkKindCd)
              // 선택된 코드 리스트에서 코드명 조회
              code = cautionItems.find(el => el.codeId === r.limitItem2Cd)
              limitItem2Nm = code && code.text
            } else if (r.limitItem1Cd === '03') { /* 지시 사항 */
              // [제한사항2] 파크구분에 따라 코드 리스트 선택
              const instructionItems = this.getInstructionItems(this.parkKindCd)
              // 선택된 코드 리스트에서 코드명 조회
              code = instructionItems.find(el => el.codeId === r.limitItem2Cd)
              limitItem2Nm = code && code.text
            } else if (r.limitItem1Cd === '04') {
              // [제한사항2] 파크구분에 따라 코드 리스트 선택
              const disabledItems = this.getDisabledItems(this.parkKindCd)
              // 선택된 코드 리스트에서 코드명 조회
              code = disabledItems.find(el => el.codeId === r.limitItem2Cd)
              limitItem2Nm = code && code.text
            }

            if (utils.isEmpty(limitItem1Nm)) {
              limitItem1Nm = '-'
            }
            if (utils.isEmpty(limitItem2Nm)) {
              limitItem2Nm = '-'
            }
            val = val.concat(limitItem1Nm, ' / ', limitItem2Nm)
          } else if (r.uploadKindCd === '02') {
            val = r.iconImagUrl
          }

          return val || '-'
        },
      },
      {
        value: 'limitItemNameOrFileName',
        text: this.$t('MSG_TXT_FACILT_LIMIT'), // 제한사항
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div v-if="this.row.uploadKindCd==='01'">
            {{ getLimitItemName() }}
          </div>
          <div v-else>
            <div v-if="row.iconImagUrl==='' || row.iconImagUrl===null || row.iconImagUrl===undefined">-</div>
            <div v-else>
              <cmp-single-file-uploader
                v-if="false"
                :value="row.iconImagUrl"
                mode="SELECT"
                page-id="null"
              />
              <img :src="row.iconImagUrl"/>
            </div>
          </div>`,
          methods: {
            getLimitItemName() {
              // [제한사항1] 파크구분에 따라 코드 리스트 선택
              const limitItems = that.getLimitItems(that.parkKindCd)
              // 선택된 코드 리스트에서 코드명 조회
              let code = limitItems.find(el => el.codeId === this.row.limitItem1Cd)
              let limitItem1Nm = code && code.text

              let limitItem2Nm = '-'
              if (this.row.limitItem1Cd === '01') { /* 금지사항 */
                // [제한사항2] 파크구분에 따라 코드 리스트 선택
                const inhibitionItems = that.getInhibitionItems(that.parkKindCd)
                // 선택된 코드 리스트에서 코드명 조회
                code = inhibitionItems.find(el => el.codeId === this.row.limitItem2Cd)
                limitItem2Nm = code && code.text
              } else if (this.row.limitItem1Cd === '02') { /* 주의/경고 사항 */
                // [제한사항2] 파크구분에 따라 코드 리스트 선택
                const cautionItems = that.getCautionItems(that.parkKindCd)
                // 선택된 코드 리스트에서 코드명 조회
                code = cautionItems.find(el => el.codeId === this.row.limitItem2Cd)
                limitItem2Nm = code && code.text
              } else if (this.row.limitItem1Cd === '03') { /* 지시 사항 */
                // [제한사항2] 파크구분에 따라 코드 리스트 선택
                const instructionItems = that.getInstructionItems(that.parkKindCd)
                // 선택된 코드 리스트에서 코드명 조회
                code = instructionItems.find(el => el.codeId === this.row.limitItem2Cd)
                limitItem2Nm = code && code.text
              } else if (this.row.limitItem1Cd === '04') {
                // [제한사항2] 파크구분에 따라 코드 리스트 선택
                const disabledItems = that.getDisabledItems(that.parkKindCd)
                // 선택된 코드 리스트에서 코드명 조회
                code = disabledItems.find(el => el.codeId === this.row.limitItem2Cd)
                limitItem2Nm = code && code.text
              }

              if (utils.isEmpty(limitItem1Nm)) {
                limitItem1Nm = '-'
              }
              if (utils.isEmpty(limitItem2Nm)) {
                limitItem2Nm = '-'
              }

              return limitItem1Nm.concat(' / ', limitItem2Nm)
            },
          },
        },
      },
      {
        value: 'limitIconImagUrl',
        text: this.$t('MSG_TXT_ICON_PREVIEW'), // 아이콘 미리보기
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div class="pdCol10">
            <div v-if="this.row.uploadKindCd==='01'">
              <div v-if="row.iconImagUrl==='' || row.iconImagUrl===null || row.iconImagUrl===undefined">-</div>
              <div v-else>
                <cmp-single-file-uploader
                  v-if="false"
                  v-model="row.iconImagUrl"
                  mode="SELECT"
                  preview-mode="BELOW"
                  page-id="PGE_AAB_00003"
                />
                <img :src="row.iconImagUrl"/>
              </div>
            </div>
            <div v-else>
              -
            </div>
          </div>`,
          computed: {
            pageId() {
              return that.$options.name
            },
          },
        },
      },
    ]
  },
  methods: {
    getLimitItems(parkKindCd) {
      let limitItems = []
      if (parkKindCd === '01') {
        limitItems = this.codes.COD_IA_LIMIT_ITEM
      } else if (parkKindCd === '02') {
        limitItems = this.codes.COD_IA_CB_LIMIT_ITEM
      }
      return limitItems
    },
    getInhibitionItems(parkKindCd) {
      let inhibitionItems = []
      if (parkKindCd === '01') {
        inhibitionItems = this.codes.COD_IA_LIMIT_INHIBITION_ITEM
      } else if (parkKindCd === '02') {
        inhibitionItems = this.codes.COD_IA_CB_LIMIT_INHIBITION_ITEM
      }
      return inhibitionItems
    },
    getCautionItems(parkKindCd) {
      let cautionItems = []
      if (parkKindCd === '01') {
        cautionItems = this.codes.COD_IA_LIMIT_CAUTION_ITEM
      } else if (parkKindCd === '02') {
        cautionItems = this.codes.COD_IA_CB_LIMIT_CAUTION_ITEM
      }
      return cautionItems
    },
    getInstructionItems(parkKindCd) {
      let instructionItems = []
      if (parkKindCd === '01') {
        instructionItems = this.codes.COD_IA_LIMIT_INSTRUCTION_ITEM
      } else if (parkKindCd === '02') {
        instructionItems = this.codes.COD_IA_CB_LIMIT_INSTRUCTION_ITEM
      }
      return instructionItems
    },
    getDisabledItems(parkKindCd) {
      let disabledItems = []
      if (parkKindCd === '01') {
        disabledItems = this.codes.COD_IA_LIMIT_DISABLED_ITEM
      } else if (parkKindCd === '02') {
        disabledItems = this.codes.COD_IA_CB_LIMIT_DISABLED_ITEM
      }
      return disabledItems
    },
  },
}
</script>
<style scoped>
</style>
