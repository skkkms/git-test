<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>
          공통코드 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="공통코드 구분"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          required
        >
          <ur-text-field
            style="width: 100%; height: auto;"
            value="M0001"
          />
        </ur-form-item>
        <ur-form-item
          label="공통코드 구분명"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          required
        >
          <ur-text-field
            style="width: 100%; height: auto;"
            value="통합티켓구분"
          />
        </ur-form-item>
        <ur-form-item
          label="사용여부"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          required
        >
          <ur-radio
            v-model="R1"
            value="Radio 01"
            sm
          >
            사용
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio 02"
            sm
          >
            미사용
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="코드설명"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            style="width: 100%; height: auto;"
            value="통합티켓ID의 분류구분"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="comm_title_wrap mt20">
        <h4>
          하위 공통코드 정보
        </h4>
      </div>
      <ur-data-grid
        ref="grid"
        :headers="columnsT1"
        :data-source="listT1"
        :options="options"
        :data-set-options="{id: 'id'}"
      >
        <template
          #left-info
        >
          <ur-button color="violet">
            추가
          </ur-button>
          <ur-button color="violet">
            삭제
          </ur-button>
          <ur-button color="violet">
            초기화
          </ur-button>
        </template>
        <div class="bt1 mt10" />
        <sui-page-footer class="comm_btn_wrap">
          <div class="btn_wrap">
            <div class="right_box">
              <ur-button>
                삭제
              </ur-button>
              <ur-button
                color="violet"
              >
                신규등록
              </ur-button>
            </div>
          </div>
        </sui-page-footer>
      </ur-data-grid>
      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="right_box">
            <ur-button
              color="violet"
            >
              저장
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAZ_00112', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 라디오 버튼
      R1: 'Radio 01',

      // 하위 공통코드 정보 테이블 드롭다운
      T1D1: null,
      T1d2: null,

      // 테이블
      options: { // 토탈o
        // msgTotal: false,
        noInfo: false,
        multiSelect: false,
        selectCheck: true,
        noBaseInfo: false,
      },

      columnsT1: [
        {
          text: 'No.',
          value: 'value1',
          width: 60,
        },
        {
          text: '공통코드',
          value: 'value2',
          required: true,
          width: 120,
        },
        {
          text: '공통코드명',
          required: true,
          width: 200,
          value: 'value3',
          component: {
            template: '<div><ur-text-field style="width:90%; height:auto;" value="스마트예약"/></div>',
          },
        },
        {
          text: '언어코드',
          value: 'value4',
          width: 120,
          required: true,
          component: {
            template: '<div><ur-dropdown v-model="T1D1" :items="itemT1D1" style="width:90%;"/></div>',
          },
        },
        {
          text: '사용여부',
          value: 'value5',
          width: 120,
          required: true,
          component: {
            template: '<div><ur-dropdown v-model="T1D2" :items="itemT1D2" style="width:90%;"/></div>',
          },
        },
        {
          text: '정렬순서',
          value: 'value6',
          width: 150,
          required: true,
          component: {
            template: '<div><ur-text-field style="width:90%; height:auto;" value="1"/></div>',
          },
        },
        {
          text: '코드설명',
          value: 'value7',
          width: 180,
          component: {
            template: '<div><ur-text-field style="width:100%; height:auto;" value="EXAPI -> POPS"/></div>',
          },
        },
        {
          text: '속성1',
          value: 'value8',
          width: 120,
          component: {
            template: '<div><ur-text-field style="width:100%; height:auto;" value=""/></div>',
          },
        },
        {
          text: '속성2',
          value: 'value9',
          width: 120,
          component: {
            template: '<div><ur-text-field style="width:100%; height:auto;" value=""/></div>',
          },
        },
        {
          text: '속성3',
          value: 'value10',
          width: 120,
          component: {
            template: '<div><ur-text-field style="width:100%; height:auto;" value=""/></div>',
          },
        },
        {
          text: '속성4',
          value: 'value11',
          width: 120,
          component: {
            template: '<div><ur-text-field style="width:100%; height:auto;" value=""/></div>',
          },
        },
        {
          text: '속성5',
          value: 'value12',
          width: 120,
          component: {
            template: '<div><ur-text-field style="width:100%; height:auto;" value=""/></div>',
          },
        },
      ],
      listT1: [
        {
          value1: '1', value2: '1', value3: '스마트예약', value4: '', value5: '', value6: '1', value7: 'EXAPI -> POPS', value8: '', value9: '', value10: '', value11: '', value12: '',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    itemT1D1() {
      const rtn = []
      rtn.push({ value: '1', text: '국문' })
      rtn.push({ value: '2', text: '영문' })
      rtn.push({ value: '3', text: '중문(간체)' })
      rtn.push({ value: '4', text: '중문(번체)' })
      return rtn
    },

    itemT1D2() {
      const rtn = []
      rtn.push({ value: '1', text: '사용' })
      rtn.push({ value: '2', text: '미사용' })
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
  },
}
</script>
<style scoped>
</style>
