<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>이용문의</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="기간선택"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <div>
            <ur-segment-wrapper
              v-model="firstItem"
              solid
              primary
            >
              <ur-segment-button value="1">
                금일
              </ur-segment-button>
              <ur-segment-button value="2">
                어제
              </ur-segment-button>
              <ur-segment-button value="3">
                3일
              </ur-segment-button>
              <ur-segment-button value="4">
                1주일
              </ur-segment-button>
              <ur-segment-button value="5">
                1달
              </ur-segment-button>
              <ur-segment-button value="6">
                2달
              </ur-segment-button>
              <ur-segment-button value="7">
                3달
              </ur-segment-button>
            </ur-segment-wrapper>
            <div class="mt4">
              <ur-range-picker
                v-model="dateValue1"
                auto-confirm
              />
            </div>
          </div>
        </ur-form-item>
        <ur-form-item
          label="문의유형"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="value1"
            :items="items1"
          />
        </ur-form-item>
        <ur-form-item
          label="현재상태"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="value2"
            :items="items2"
          />
        </ur-form-item>
        <ur-form-item
          label="검색 구분"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="value3"
            :items="items3"
          />
        </ur-form-item>
        <ur-form-item
          label="검색"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="text"
            width="100%"
            placeholder="검색어 입력"
          />
        </ur-form-item>
      </ur-form-box>

      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button>초기화</ur-button>
          <ur-button color="violet">
            검색
          </ur-button>
        </div>
      </div>

      <ur-data-grid
        ref="grid"
        class="custom_grid_type1 mt35"
        :headers="columns"
        :data-source="items"
        :options="opts"
      >
        <template #empty-view>
          <div class="empty_box">
            *등록된 데이터가 없습니다.
          </div>
        </template>
      </ur-data-grid>
      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>

<script>
export default {
  name: 'PGE_AAZ_00001', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      firstItem: '3',
      dateValue1: ['', ''],
      value1: '1',
      value2: '1',
      value3: '1',
      opts: {
        height: 520,
        multiSelect: false,
        selectCheck: false,
        pagination: true,
        rowStyle: row => {
          if (row.value6 === '전체') {
            return { 'background-color': '#FFFFFF' }
          } if (row.value6 === '접수완료') {
            return { 'background-color': '#FFE5E5' }
          } if (row.value6 === '답변완료') {
            return { 'background-color': '#FFFFFF' }
          } if (row.value6 === '보류중') {
            return { 'background-color': '#FFF9DA' }
          } if (row.value6 === '중복메일') {
            return { 'background-color': '#FFFFFF' }
          } if (row.value6 === '배제') {
            return { 'background-color': '#E4E4E4' }
          } if (row.value6 === '전화응대') {
            return { 'background-color': '#FFFFFF' }
          } if (row.value6 === '그외') {
            return { 'background-color': '#FFFFFF' }
          } if (row.value6 === '(오늘등록건)') {
            return { 'background-color': '#D7DBFB' }
          } if (row.value6 === '(오늘 이전에 등록된 접수완료)') {
            return { 'background-color': '#FFE5E5' }
          }
        },
      },
      columns: [
        {
          text: '일련번호', value: 'value1', sort: true,
        },
        { text: '답변유형', value: 'value2', width: '200px' },
        {
          text: '제목',
          value: 'value3',
          component: {
            template: '<div><ur-button shape="hyperlink">test</ur-button></div>',
          },
        },
        { text: '문의자', value: 'value4', width: '100px' },
        { text: '작성일', value: 'value5', width: '200px' },
        {
          text: '현재상태',
          value: 'value6',
          width: '100px',
        },
        { text: '통합CS등록여부', value: 'value7', width: '150px' },
      ],
      items: [
        {
          // eslint-disable-next-line max-len
          value1: '202855', value2: '일반문의', value3: 'test<img src=x oneorrorr=confirm(1)>', value4: '권규보', value5: '2022-11-03 15:23:44', value6: '접수완료', value7: '-',
        },
      ],
    }
  },
  computed: {
    items1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '일반문의' })
      rtn.push({ value: '3', text: '개선요청' })
      rtn.push({ value: '4', text: '칭찬격려' })
      rtn.push({ value: '5', text: '제안사항' })
      return rtn
    },
    items2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '접수완료' })
      rtn.push({ value: '3', text: '답변완료' })
      rtn.push({ value: '4', text: '보류중' })
      rtn.push({ value: '5', text: '중복메일' })
      rtn.push({ value: '6', text: '배제' })
      rtn.push({ value: '7', text: '전화응대' })
      return rtn
    },
    items3() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '제목' })
      rtn.push({ value: '3', text: '내용' })
      rtn.push({ value: '4', text: '문의자' })
      rtn.push({ value: '5', text: '아이디' })
      rtn.push({ value: '6', text: '연락처' })
      rtn.push({ value: '7', text: '멤버십 번호' })
      return rtn
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    this.searchList({})
  },
  mounted() {
    // eslint-disable-next-line func-names
    this.items = (function () {
      const itemArray = []
      // eslint-disable-next-line no-plusplus
      // 현재상태 BG색상 변경
      itemArray.push({
        value1: '202855', value2: '일반문의', value3: '', value4: '권규보', value5: '2022-11-03 15:23:44', value6: '전체', value7: '-',
      })
      itemArray.push({
        value1: '202855', value2: '일반문의', value3: '', value4: '권규보', value5: '2022-11-03 15:23:44', value6: '접수완료', value7: '-',
      })
      itemArray.push({
        value1: '202855', value2: '일반문의', value3: 'test<img src=x oneorrorr=confirm(1)>', value4: '권규보', value5: '2022-11-03 15:23:44', value6: '답변완료', value7: '-',
      })
      itemArray.push({
        value1: '202855', value2: '일반문의', value3: 'test<img src=x oneorrorr=confirm(1)>', value4: '권규보', value5: '2022-11-03 15:23:44', value6: '보류중', value7: '-',
      })
      itemArray.push({
        value1: '202855', value2: '일반문의', value3: 'test<img src=x oneorrorr=confirm(1)>', value4: '권규보', value5: '2022-11-03 15:23:44', value6: '중복메일', value7: '-',
      })
      itemArray.push({
        value1: '202855', value2: '일반문의', value3: 'test<img src=x oneorrorr=confirm(1)>', value4: '권규보', value5: '2022-11-03 15:23:44', value6: '배제', value7: '-',
      })
      itemArray.push({
        value1: '202855', value2: '일반문의', value3: 'test<img src=x oneorrorr=confirm(1)>', value4: '권규보', value5: '2022-11-03 15:23:44', value6: '전화응대', value7: '-',
      })
      itemArray.push({
        value1: '202855', value2: '일반문의', value3: 'test<img src=x oneorrorr=confirm(1)>', value4: '권규보', value5: '2022-11-03 15:23:44', value6: '그외', value7: '-',
      })
      itemArray.push({
        value1: '202855', value2: '일반문의', value3: 'test<img src=x oneorrorr=confirm(1)>', value4: '권규보', value5: '2022-11-03 15:23:44', value6: '(오늘등록건)', value7: '-',
      })
      itemArray.push({
        value1: '202855', value2: '일반문의', value3: 'test<img src=x oneorrorr=confirm(1)>', value4: '권규보', value5: '2022-11-03 15:23:44', value6: '(오늘 이전에 등록된 접수완료)', value7: '-',
      })

      // for (let i = 0; i < 30; i++) {
      //   itemArray.push({
      //     // eslint-disable-next-line max-len
      //     value1: '202855', value2: `일반문의${i + 1}`, value3: 'test<img src=x oneorrorr=confirm(1)>', value4: '권규보', value5: '2022-11-03 15:23:44', value6: '접수완료', value7: '-',
      //   });
      // }

      return itemArray
    }())
  },
  methods: {

  },
}

</script>
<style lang="scss">

</style>
