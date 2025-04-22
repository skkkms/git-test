<template>
  <div>
    <!-- 퍼소나 그리드 영역 -->
    <div class="comm_title_wrap mt35">
      <h4 class="-grid__column__header__root-required pr10">
        {{ title }}
      </h4>
      <ur-button
        color="violet"
        @click="onClickAdd"
      >
        {{ $t('MSG_TXT_BTN_ADD') }} <!-- 추가 -->
      </ur-button>
      <ur-button
        color="violet"
        @click="onClickDelete"
      >
        {{ $t('MSG_TXT_BTN_DEL') }} <!-- 삭제 -->
      </ur-button>
    </div>
    <ur-data-grid
      ref="grid"
      :headers="columns"
      :data-source="dataSet"
      :options="opts"
      height="300"
    />
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component'

export default {
  name: 'PGE_AAB_00013_C01', // eslint-disable-line vue/name-property-casing
  components: {
  },
  props: {
    title: {
      type: String,
      required: false,
    },
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
      // 그리드
      opts: {
        noInfo: true,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        resizableColumn: true,
      },
      columns: [],
      dataSet: new urDataSet(), // eslint-disable-line new-cap

      // 모달 메시지
      modalMsg: '',
    }
  },
  computed: {
    contextPageId() {
      return this.$attrs['page-id']
    },
    modal() {
      return this.$refs.modal
    },
    grid() {
      return this.$refs.grid
    },
    personaPosPopup() {
      return this.$refs.personaPosPopup
    },
  },
  mounted() {
    const that = this
    this.columns = [
      {
        text: 'No.',
        value: '__idx',
        width: 100,
        customValue: v => v + 1,
      },
      {
        text: this.$t('MSG_TIT_PERSON_TYPE_T'), // 퍼소나 유형
        value: 'personaName',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `
            <div>
              <ur-text-field
                v-model="row.personaName"
                readonly
                style="width: 100%"
              />
              <ur-icon-button
                icon="search"
                icon-type="line"
                color="primary"
                class="ml16"
                style="margin-left: 10px"
                @click="onClickPersonaPopup"
              />
            </div>`,
          methods: {
            onClickPersonaPopup() {
              utils.openLayerPopup('PGE_AAB_00044', this.onClosePersonaUpdatePopup, {
                size: 'xlg',
                pageInitialData: {
                  parkKindCd: that.parkKindCd,
                  multiSelect: false,
                },
              })
            },
            onClosePersonaUpdatePopup(data = null) {
              if (!utils.isEmpty(data)) {
                if (that.dataSet.getViewData()) {
                  // eslint-disable-next-line max-len
                  const duplicateList = that.dataSet.getViewData().find(item => item.personaId === data.personaId)
                  if (!utils.isEmpty(duplicateList)) {
                    utils.messageBox('warning', that.$t('동일한 퍼소나 유형이 이미 존재합니다.')) // 동일한 퍼소나 유형이 이미 존재합니다.
                    return
                  }
                }

                that.dataSet.setRowValue(this.row, 'personaId', data.personaId)
                that.dataSet.setRowValue(this.row, 'personaName', data.personaName)
                that.dataSet.setRowValue(this.row, 'companaionNm', data.companaionNm)
                that.dataSet.setRowValue(this.row, 'playTypeNm', data.playTypeNm)
                that.$nextTick(() => that.fetchData())
              }
            },
          },
        },
      },
      {
        text: this.$t('MSG_TXT_COMPANAION01'), // 동반자
        value: 'companaionNm',
      },
      {
        text: this.$t('MSG_TXT_PLAY_TYPE'), // 놀이유형
        value: 'playTypeNm',
      },
      {
        text: this.$t('MSG_TXT_PERSON_CD'), // 퍼소나 코드
        value: 'personaId',
      },
    ]
    // 그리드 초기 값 세팅
    this.update(this.list)
  },
  methods: {
    update(list) {
      this.dataSet.setData(list)
    },
    onClickAdd() {
      utils.openLayerPopup('PGE_AAB_00044', this.onClosePersonaAddPopup, {
        size: 'xlg',
        pageInitialData: {
          parkKindCd: this.parkKindCd,
          multiSelect: true,
        },
      })
    },
    onClosePersonaAddPopup(data = null) {
      if (!utils.isEmpty(data)) {
        let addList = null
        // 그리드  추가 전 중복 제거
        if (this.dataSet.getViewData()) {
          const personaIds = this.dataSet.getViewData().map(item => item.personaId)
          addList = data.filter(item => !personaIds.includes(item.personaId))
        }

        addList.forEach(item => {
          this.dataSet.addRow({
            personaId: item.personaId,
            personaName: item.personaName,
            companaionNm: item.companaionNm,
            playTypeNm: item.playTypeNm,
          })
        })

        const addCnt = addList.length
        const dupCnt = data.length - addList.length
        if (data.length !== addList.length) {
          // {0}개의 항목이 추가되었습니다.(퍼소나 코드가 중복되는 {1}개의 항목은 제외되었습니다.)
          utils.messageBox('alert', utils.strFormat(this.$t('MSG_ALT_ADD_PERSONA_WITHOUT_DUPLICATE'), addCnt, dupCnt))
        }

        this.$nextTick(() => this.fetchData())
      }
    },
    onClickDelete() {
      const selected = this.grid.getSelected()
      if (selected) {
        selected.forEach(row => {
          this.$refs.grid.removeRow(row, false)
        })
      } else {
        this.openModal('선택된 항목이 없습니다.')
      }

      this.$nextTick(() => this.fetchData())
    },

    // [버튼] 초기화
    onReset() {
      const value = []
      if (this.dataSet.getViewData()) {
        this.dataSet.getViewData().forEach(() => {
          const val = {
            personaId: '',
            personaName: '',
            companaionNm: '',
            playTypeNm: '',
          }
          value.push(val)
        })
      }
      this.dataSet.setData(value)
      this.$emit('create', value)
      this.$emit('update', this.$refs.grid.getChanged())
    },

    fetchData() {
      const value = []
      if (this.dataSet.getViewData()) {
        this.dataSet.getViewData().forEach(element => {
          const val = {
            personaId: element.personaId,
            personaName: element.personaName,
            companaionNm: element.companaionNm,
            playTypeNm: element.playTypeNm,
          }
          value.push(val)
        })
      }
      this.$emit('create', value)
      this.$emit('update', { created: value })
    },
  },
}
</script>
