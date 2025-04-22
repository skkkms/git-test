<template>
  <div>
    <!-- POS 시설 코드 관리 -->
    <div class="comm_title_wrap mt35">
      <!--h4 class="-grid__column__header__root-required pr10"-->
      <h4 class="pr10">
        {{title}}
      </h4>
      <ur-button color="violet" @click="onAdd">
        추가
      </ur-button>
      <ur-button color="violet" @click="onDelete">
        삭제
      </ur-button>
      <ur-button color="violet" @click="onReset">
        초기화
      </ur-button>
      <!--
      <ur-button color="violet" @click="fetchData">
        업데이트
      </ur-button>
      -->
    </div>
    <!-- GRID -->
    <ur-data-grid
      ref="grid"
      :headers="columns"
      :data-source="dataSet"
      :options="opts"
      height="300"
    />

    <FACIL_CD_POPUP
      ref="facilCdPopup"
      :page-id="contextPageId"
      @update="onUpdateFaciltPos"
    />
    <!-- 모달 : Alert -->
    <ALERT ref="alert" />
  </div>
</template>
<script>

import ALERT from './PGE_AAB_00001_P01.vue' // ALERT 팝업
import FACIL_CD_POPUP from './PGE_AAB_00002_P02.vue' // 시설명/코드 조회 팝업

export default {
  name: 'PGE_AAB_00002_C15', // eslint-disable-line vue/name-property-casing
  components: {
    ALERT,
    FACIL_CD_POPUP,
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
  },
  data() {
    return {
      // 그리드
      opts: {
        noInfo: true,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },
      columns: [],
      dataSet: new this.$ur.grid.DataSet(),
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
    facilCdPopup() {
      return this.$refs.facilCdPopup
    },
  },
  watch: {
  },
  created() {
  },
  mounted() {
    const that = this
    this.columns = [
      {
        value: '__idx', text: 'No.', width: 100, customValue: (v) => v+1
      },
      {
        value: 'facil2Cd',
        text: 'POS 시설 코드',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          components: {
          },
          template: `<div>
            <ur-text-field style="width: auto;" placeholder="" v-model="value" readonly />
            <ur-icon-button class="ml16" icon="search" icon-type="line" color="primary" @click="onOpenFaciltPosPopup"/>
          </div>`,
          methods: {
            onOpenFaciltPosPopup(v) {
              console.log('onOpenFaciltPosPopup', v)
              that.$refs.facilCdPopup.open({ caller: this.row })
            },
          },
        },
      },
      {
        value: 'facil2Nm',
        text: 'POS 시설 코드명',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: '<div><ur-text-field style="width: auto;" placeholder="" v-model="value" readonly /></div>',
          methods: {
          },
        },
      },
      //{ value: 'padding', text: '' },
    ]
    // 그리드 초기 값 세팅
    this.update(this.list)
  },
  methods: {
    closed() {},
    update(list) {
      // 그리드 업데이트
      /*
      if (!utils.isEmpty(list)) {
        list.forEach(element => {
          this.add(element)
        })
      }
      */
      this.dataSet.setData(list)
    },
    onAdd() {
      this.dataSet.addRow({
        facilCd: '', // 대표코드
        facilNm: '',
        facil2Cd: '', // 상세코드
        facil2Nm: '',
      })
      this.$nextTick(() => this.fetchData())
    },
    add(row) {
      this.dataSet.addRow(row)
      this.$nextTick(() => this.fetchData())
    },
    onDelete() {
      const s = this.grid.getSelected()
      if (utils.isEmpty(s)) {
        utils.messageBox('warning', this.$t('선택 된 항목이 없습니다.'))
        return
      }
      utils.messageBox('confirm', this.$t('삭제하시겠습니까?'), null, () => { // 삭제하시겠습니까?
        if (!!s) {
          if(s.length === 1) this.grid.removeRow(s[0].__id, false) // 2nd arg : select next row
          else this.grid.removeRow(s)
        } else {
          this.alert('선택된 항목이 없습니다.')
        }
        this.$nextTick(() => this.fetchData())
      })
    },
    onReset() {
      let value = []
      if(this.dataSet.getViewData()) {
        this.dataSet.getViewData().forEach(element => {
          let val = {
            facilCd: '', // 대표코드
            facilNm: '',
            facil2Cd: '', // 상세코드
            facil2Nm: '',
          }
          value.push(val)
        });
      }
      this.dataSet.setData(value)
      const data = {
        view: value,
        created: [],
        updated: [],
        removed: [],
      }
      this.$emit('update', data)
    },
    fetchData() {
      const data = Object.assign({}, this.dataSet.getChanged())
      let value = []
      if(this.dataSet.getViewData()) {
        this.dataSet.getViewData().forEach(element => {
          let val = {
            seqNo: element.__idx+1,
            facilCd: element.facilCd, // 대표코드
            facilNm: element.facilNm,
            facil2Cd: element.facil2Cd, // 상세코드
            facil2Nm: element.facil2Nm,
          }
          value.push(val)
        })
      }
      data.view = value
      this.$emit('update', data)
    },
    alert(msg) {
      this.$refs.alert.open(msg)
    },
    onUpdateFaciltPos(v) {
      console.log('onUpdateFaciltPos', v)
      const found = this.dataSet.getViewData().find(el => el.facil2Cd === v.facilCd)
      if (utils.isEmpty(found)) {
        this.dataSet.setRowValue(v.caller, 'facil2Cd', v.facilCd) // 상세코드
        this.dataSet.setRowValue(v.caller, 'facil2Nm', v.facilNm)
        this.dataSet.setRowValue(v.caller, 'facilCd', v.facilCd2) // 대표코드
        this.dataSet.setRowValue(v.caller, 'facilNm', v.facilNm2)
        this.$nextTick(() => this.fetchData())
      } else {
        utils.messageBox('warning', this.$t('이미 동일한 POS 시설 코드가 등록되어 있습니다.'))
      }
    },
  },
}
</script>
<style scoped>
</style>
