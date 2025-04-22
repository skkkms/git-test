<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          label="사랑단 분류"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-radio
            v-model="R1"
            value="Radio01"
            sm
          >
            동물사랑단
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio02"
            sm
          >
            식물사랑단
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="멤버십 구분"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <!-- 동물사랑단 -->
          <ur-dropdown
            v-model="valueD1"
            :items="itemsD1"
          />
          <!-- 식물사랑단 -->
          <ur-dropdown
            v-model="valueD2"
            :items="itemsD2"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button>
            초기화
          </ur-button>
          <ur-button
            color="violet"
          >
            검색
          </ur-button>
        </div>
      </div>

      <ur-data-grid
        ref="grid"
        class="mt35"
        :headers="columnsT1"
        :data-source="listT1"
        :options="opts"
        :data-set-options="{id: 'id'}"
      >
        <template #right-info>
          <ur-button>
            <ur-icon
              icon="download"
              icon-type="line"
              size="small"
              spacing
            />
            엑셀다운로드
          </ur-button>
        </template>
      </ur-data-grid>
      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="right_box">
          <ur-button>
            삭제
          </ur-button>
          <ur-button
            color="violet"
          >
            신규 등록
          </ur-button>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAZ_00055', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 드롭다운
      valueD1: 1,
      valueD2: 1,


      opts: { // 토탈 x 전체선택X 셀선택 o
        noInfo: false,
        pagination: true,
        multiSelect: false,
        selectCheck: true,
        height: 300,
      },

      columnsT1: [
        {
          text: 'No.',
          value: 'value1',

        },
        {
          text: '사랑단 분류',
          value: 'value2',
        },
        {
          text: '멤버십',
          value: 'value3',
        },
        { text: '레벨', value: 'value4' },
        {
          text: '제목',
          value: 'value5',
          component: {
            template: '<div><ur-button shape="hyperlink">★6월27일 동물사진★</ur-button></div>',
          },
        },
        { text: '활동일', value: 'value6' },
        { text: '활동사진', value: 'value7' },
        { text: '오픈여부', value: 'value8' },
      ],
      listT1: [
        {
          value1: '3000', value2: '동물사랑단', value3: '동물사랑단', value4: '키즈반', value5: '', value6: '2016-06-27', value7: '활동사진', value8: '오픈',
        },

      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // 드랍다운
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '동물사랑단' })
      rtn.push({ value: '3', text: '키즈 동물사랑단' })
      rtn.push({ value: '4', text: '야생동물탐험대' })
      return rtn
    },
    itemsD2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '식물 사랑단' })
      rtn.push({ value: '3', text: '키즈 식물사랑단' })
      rtn.push({ value: '4', text: '야생동물탐험대' })
      rtn.push({ value: '5', text: '식물사랑단 주니어스타' })
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
