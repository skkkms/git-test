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
            value=""
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
            value=""
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
            value=""
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
        height="300"
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
      R1: null,

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
          text: '공통코드',
          value: 'value1',
          required: true,
          width: 150,
          component: {
            template: '<div><ur-text-field style="width:90%; height:auto;" value=""/></div>',
          },
        },
        {
          text: '공통코드명',
          required: true,
          width: 200,
          value: 'value2',
          component: {
            template: '<div><ur-text-field style="width:90%; height:auto;" value=""/></div>',
          },
        },
        {
          text: '언어코드',
          value: 'value3',
          width: 120,
          required: true,
          component: {
            template: '<div><ur-dropdown v-model="T1D1" :items="itemT1D1" style="width:90%;"/></div>',
          },
        },
        {
          text: '사용여부',
          value: 'value4',
          width: 120,
          required: true,
          component: {
            template: '<div><ur-dropdown v-model="T1D2" :items="itemT1D2" style="width:90%;"/></div>',
          },
        },
        {
          text: '정렬순서',
          value: 'value5',
          width: 200,
          required: true,
          component: {
            template: '<div><ur-text-field style="width:90%; height:auto;" value=""/></div>',
          },
        },
        {
          text: '코드설명',
          value: 'value6',
          component: {
            template: '<div><ur-text-field style="width:90%; height:auto;" value=""/></div>',
          },
        },
        {
          text: '속성1',
          value: 'value7',
          component: {
            template: '<div><ur-text-field style="width:90%; height:auto;" value=""/></div>',
          },
        },
        {
          text: '속성2',
          value: 'value8',
          component: {
            template: '<div><ur-text-field style="width:90%; height:auto;" value=""/></div>',
          },
        },
      ],
      listT1: [
        {
          value1: '존구분(CB)', value2: '사용', value3: '-', value4: '',
        },
        {
          value1: 'EP 발생구분', value2: '사용', value3: 'EP의 발생 구분',
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
