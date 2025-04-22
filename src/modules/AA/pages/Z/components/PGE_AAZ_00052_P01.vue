<template>
  <div>
    <template slot="title">
      <div class="modal-title">
        노출 조건 정보 설정
      </div>
    </template>
    <template>
      <div class="modal-body">
        <div class="comm_title_wrap">
          <h4 class="pr16">
            조건 정보
          </h4>
          <div class="title_compo">
            <ur-button color="violet">
              추가
            </ur-button>
            <ur-button color="violet">
              삭제
            </ur-button>
            <ur-button color="violet">
              초기화
            </ur-button>
          </div>
        </div>

        <ur-data-grid
          ref="grid01"
          :headers="columnsP1T1"
          :options="opts1"
          :data-source="listP1T1"
          :data-set-options="{id: 'id'}"
        />
        <!-- ::S 필터 검색 내 모달팝업버튼 개발완료시 삭제 요함 -->
        <div class="btn_wrap">
          <div class="right_box">
            <ur-button
              color="violet"
              @click="openModalP01"
            >
              <ur-modal
                ref="modalP01"
                class="modal-b1c6"
                xlarge
                title="필터 검색"
                @closed="closed"
              >
                <P01 />
                <!-- :page-id="contextPageId" -->
              </ur-modal>
              필터 검색팝업
            </ur-button>
          </div>
        </div>
        <!-- ::E 필터 검색 내 모달팝업버튼 개발완료시 삭제 요함 -->
        <ur-data-grid
          ref="grid02"
          :headers="columnsP1T2"
          :options="opts1"
          :data-source="listP1T2"
          :data-set-options="{id: 'id'}"
        />
        <ur-data-grid
          ref="grid03"
          :headers="columnsP1T3"
          :options="opts1"
          :data-source="listP1T3"
          :data-set-options="{id: 'id'}"
        />
        <ur-data-grid
          ref="grid04"
          :headers="columnsP1T4"
          :options="opts1"
          :data-source="listP1T4"
          :data-set-options="{id: 'id'}"
        />
        <ur-data-grid
          ref="grid05"
          :headers="columnsP1T5"
          :options="opts1"
          :data-source="listP1T5"
          :data-set-options="{id: 'id'}"
        />
      </div>
    </template>
    <template>
      <div class="bt1 mt45">
        <sui-page-footer class="comm_btn_wrap">
          <div class="btn_wrap">
            <div class="right_box">
              <ur-button
                color="violet"
                @click="closeModalP01"
              >
                닫기
              </ur-button>
              <ur-button
                color="violet"
                solid
              >
                저장
              </ur-button>
            </div>
          </div>
        </sui-page-footer>
      </div>
    </template>
  </div>
</template>

<script>
import P01 from './PGE_AAZ_00052_P02.vue'

export default {
  name: 'PGE_AAZ_00052_P01', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
  },
  data() {
    return {
      // 테이블 옵션
      opts1: {
        noInfo: true,
        multiSelect: false,
        selectCheck: true,
      },

      // 조건 정보 테이블
      columnsP1T1: [
        {
          text: 'No.', value: 'value1', width: 80,
        },
        {
          required: true,
          text: '분류',
          value: 'value2',
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-radio-wrapper v-model="valueP1R1" :items="me.itemsP1R1" sm/></div>',
            data() {
              return {
                valueP1R1: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '항목',
          value: 'value3',
          component: {
            template: '<div><ur-text-field style="width:90%" value="" /><ur-icon-button class="ml16" icon="search" icon-type="line" color="primary" @click="" /></div>',
          },
        },
        {
          required: true,
          text: '선택 값',
          value: 'value4',
          // component: {
          //   props: ['row', 'value', 'text'],
          //   template: '<div><ur-text-field v-model="text1" style="width:90%" /></div>',
          //   data() {
          //     return {
          //       text1: this.value,
          //     }
          //   },
          // },
        },
      ],
      listP1T1: [
        {
          value1: 1,
          value2: '1',
          value3: '1',
          value4: '-',
        },
      ],
      columnsP1T2: [
        {
          text: '', value: 'value1', width: 80,
        },
        {
          text: '',
          value: 'value2',
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-radio-wrapper v-model="valueP1R1" :items="me.itemsP1R1" sm/></div>',
            data() {
              return {
                valueP1R1: this.value,
              }
            },
          },
        },
        {
          text: '',
          value: 'value3',
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="valueT1D1" :items="me.itemsT1D1"/></div>',
            data() {
              return {
                valueT1D1: this.value,
              }
            },
          },
        },
        {
          text: '',
          value: 'value4',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-radio-wrapper v-model="valueP1R2" :items="me.itemsP1R2" sm/></div>',
            data() {
              return {
                valueP1R2: this.value,
              }
            },
          },
        },
      ],
      listP1T2: [
        {
          value1: 2,
          value2: '2',
          value3: '',
          value4: '',
        },
      ],
      columnsP1T3: [
        {
          text: '', value: 'value1', width: 80,
        },
        {
          text: '',
          value: 'value2',
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-radio-wrapper v-model="valueP1R1" :items="me.itemsP1R1" sm/></div>',
            data() {
              return {
                valueP1R1: this.value,
              }
            },
          },
        },
        {
          text: '',
          value: 'value3',
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="valueT1D1" :items="me.itemsT1D1"/></div>',
            data() {
              return {
                valueT1D1: this.value,
              }
            },
          },
        },
        {
          text: '',
          value: 'value4',
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown style="width: 255px" v-model="valueT1D2" :items="me.itemsT1D2"/></div>',
            data() {
              return {
                valueT1D2: this.value,
              }
            },
          },
        },
      ],
      listP1T3: [
        {
          value1: 3,
          value2: '2',
          value3: '1',
          value4: '',
        },
      ],
      columnsP1T4: [
        {
          text: '', value: 'value1', width: 80,
        },
        {
          text: '',
          value: 'value2',
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-radio-wrapper v-model="valueP1R1" :items="me.itemsP1R1" sm/></div>',
            data() {
              return {
                valueP1R1: this.value,
              }
            },
          },
        },
        {
          text: '',
          value: 'value3',
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="valueT1D1" :items="me.itemsT1D1"/></div>',
            data() {
              return {
                valueT1D1: this.value,
              }
            },
          },
        },
        {
          text: '',
          value: 'value4',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-radio-wrapper v-model="valueP1R3" :items="me.itemsP1R3" sm/></div>',
            data() {
              return {
                valueP1R3: this.value,
              }
            },
          },
        },
      ],
      listP1T4: [
        {
          value1: 4,
          value2: '2',
          value3: '2',
          value4: '',
        },
      ],
      columnsP1T5: [
        {
          text: '', value: 'value1', width: 80,
        },
        {
          text: '',
          value: 'value2',
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-radio-wrapper v-model="valueP1R1" :items="me.itemsP1R1" sm/></div>',
            data() {
              return {
                valueP1R1: this.value,
              }
            },
          },
        },
        {
          text: '',
          value: 'value3',
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="valueT1D1" :items="me.itemsT1D1"/></div>',
            data() {
              return {
                valueT1D1: this.value,
              }
            },
          },
        },
        {
          text: '',
          value: 'value4',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-radio-wrapper v-model="valueP1R4" :items="me.itemsP1R4" sm/></div>',
            data() {
              return {
                valueP1R4: this.value,
              }
            },
          },
        },
      ],
      listP1T5: [
        {
          value1: 5,
          value2: '2',
          value3: '7',
          value4: '',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    modalP01() {
      return this.$refs.modalP01
    },
    // 라디오 warpper
    itemsP1R1() {
      const rtn = []
      rtn.push({ value: '1', text: '필터' })
      rtn.push({ value: '2', text: '추가기준' })
      return rtn
    },
    itemsP1R2() {
      const rtn = []
      rtn.push({ value: '1', text: 'Y' })
      rtn.push({ value: '2', text: 'N' })
      return rtn
    },
    itemsP1R3() {
      const rtn = []
      rtn.push({ value: '1', text: '어트랙션' })
      rtn.push({ value: '2', text: '공연' })
      return rtn
    },
    itemsP1R4() {
      const rtn = []
      rtn.push({ value: '1', text: '신규 쿠폰' })
      rtn.push({ value: '2', text: '쿠폰 사용일 마감 임박' })
      return rtn
    },
    // 코스팝업 드랍다운
    itemsT1D1() {
      const rtn = []
      rtn.push({ value: '1', text: '날씨' })
      rtn.push({ value: '2', text: '시설 운영시간' })
      rtn.push({ value: '3', text: '스마트줄서기 여부' })
      rtn.push({ value: '4', text: '마케팅 수신동의 여부' })
      rtn.push({ value: '5', text: '정기권 여부' })
      rtn.push({ value: '6', text: '유효이용권 등록 여부' })
      rtn.push({ value: '7', text: '쿠폰 사용' })
      return rtn
    },
    itemsT1D2() {
      const rtn = []
      rtn.push({ value: '1', text: '맑음' })
      rtn.push({ value: '2', text: '흐림' })
      rtn.push({ value: '3', text: '비' })
      rtn.push({ value: '4', text: '눈' })
      rtn.push({ value: '5', text: '천둥번개' })
      rtn.push({ value: '6', text: '회오리/태풍' })
      return rtn
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
  },
  methods: {
    closeModalP01() {},
    openModalP01() { this.modalP01.open() },
    closeModal() {},
    closed() {},

    onToggle(isShown) {
      if (!isShown) {
        console.log(this.$refs.dropdown.getSelectedItem())
      }
    },
  },
}
</script>
<style scoped>
</style>
