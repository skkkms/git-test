<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- tab -->
      <ur-tab-box class="mt35">
        <ur-tab-content
          :idx="1"
          label="에버랜드"
        >
          <template>
            <ur-form-box toggleable>
              <ur-form-item
                label="시설 ID"
                :label-align="'right'"
                style="width: 50%; height: auto;"
              >
                <ur-text-field
                  value=""
                  style="width: 100%;"
                />
              </ur-form-item>
              <ur-form-item
                label="시설명"
                :label-align="'right'"
                style="width: 50%; height: auto;"
              >
                <ur-text-field
                  value=""
                  style="width: 100%;"
                />
              </ur-form-item>
              <ur-form-item
                label="시설 카테고리"
                :label-align="'right'"
                style="width: 50%; height: auto;"
              >
                <ur-dropdown
                  v-model="value1"
                  :items="items1"
                />
              </ur-form-item>
              <ur-form-item
                label="Zone 구분"
                :label-align="'right'"
                style="width: 50%; height: auto;"
              >
                <ur-dropdown
                  v-model="value1"
                  :items="items2"
                />
              </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
              <div class="right_box">
                <ur-button>
                  초기화
                </ur-button>
                <ur-button color="violet">
                  검색
                </ur-button>
              </div>
            </div>
          </template>
          <template>
            <ur-data-grid
              ref="grid"
              class="custom_grid_pgeNav_None mt35"
              :headers="columns"
              :data-source="list"
              :data-set-options="{id: 'id'}"
              :options="opts"
            >
              <template #right-info>
                <ur-button
                  color="violet"
                  @click="openModal"
                >
                  가상대기 키오스크 정보 조회
                </ur-button>
                <ur-modal
                  ref="modal"
                  xlarge
                  title="가상대기 키오스크 정보 조회"
                  draggable
                  @closed="closed"
                >
                  <P01 />
                </ur-modal>
              </template>
            </ur-data-grid>
          </template>
        </ur-tab-content>
        <ur-tab-content
          :idx="2"
          label="캐리비안베이"
        >
          <h4>캐리비안베이</h4>
        </ur-tab-content>
      </ur-tab-box>
      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

import P01 from './components/PGE_AAZ_00003_P01.vue'

export default {
  name: 'PGE_AAZ_00003', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
  },
  data() {
    return {
      textArea: ' ',
      value1: '1',
      value2: '1',
      dataSet: new this.$ur.grid.DataSet(),
      opts: {
        pagination: true,
        multiSelect: false,
        selectCheck: true,
        noInfo: false,
      },
      list: [
        {
          str1: 'H100V0112', str2: '', str3: '어트랙션', str4: '유러피언 어드벤처', str5: 'Y', str6: '1000', str7: 'App,모바일웹,PC', str8: '미지정', str9: '그룹A', str10: '2022-12-06 03:22:38', str11: 'B151147', str12: '2019-04-21 03:22:38', str13: 'B151147',
        },
        {
          str1: 'H100V0112', str2: '', str3: '어트랙션', str4: '유러피언 어드벤처', str5: 'Y', str6: '1000', str7: 'App,모바일웹,PC', str8: '일반형', str9: '그룹A', str10: '2022-12-06 03:22:38', str11: 'B151147', str12: '2019-04-21 03:22:38', str13: 'B151147',
        },
        {
          str1: 'H100V0112', str2: '', str3: '어트랙션', str4: '유러피언 어드벤처', str5: 'Y', str6: '1000', str7: 'App,모바일웹,PC', str8: '추첨형', str9: '그룹A', str10: '2022-12-06 03:22:38', str11: 'B151147', str12: '2019-04-21 03:22:38', str13: 'B151147',
        },
        {
          str1: 'H100V0112', str2: '', str3: '어트랙션', str4: '유러피언 어드벤처', str5: 'Y', str6: '1000', str7: 'App,모바일웹,PC', str8: '회차형', str9: '그룹A', str10: '2022-12-06 03:22:38', str11: 'B151147', str12: '2019-04-21 03:22:38', str13: 'B151147',
        },
        {
          str1: 'H100V0112', str2: '', str3: '어트랙션', str4: '유러피언 어드벤처', str5: 'Y', str6: '1000', str7: 'App,모바일웹,PC', str8: '미지정 ', str9: '그룹A', str10: '2022-12-06 03:22:38', str11: 'B151147', str12: '2019-04-21 03:22:38', str13: 'B151147',
        },
      ],
      columns: [
        { value: 'str1', text: '시설ID', width: 80 },
        {
          value: 'str2',
          text: '시설명',
          width: 150,
          component: {
            template: '<div><ur-button hyperlink small style="padding: 0;" >T익스프레스</ur-button></div>',
          },

        },
        { value: 'str3', text: '시설 카테고리' },
        { value: 'str4', text: 'Zone 구분', width: 150 },
        { value: 'str5', text: '게시여부', width: 70 },
        { value: 'str6', text: '노출 순서', width: 70 },
        { value: 'str7', text: '게시 위치', width: 120 },
        { value: 'str8', text: '가상대기 여부', width: 100 },
        { value: 'str9', text: '가상대기 그룹', width: 100 },
        { value: 'str10', text: '등록일시', width: 140 },
        { value: 'str11', text: '등록자', width: 80 },
        { value: 'str12', text: '수정일시', width: 140 },
        { value: 'str13', text: '수정자', width: 80 },
      ],

    }
  },
  computed: {
    modal() {
      return this.$refs.modal
    },
    // 계산된 속성, date pickproperty로 사용가능
    items1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '어트렉션' })
      rtn.push({ value: '3', text: '공연' })
      rtn.push({ value: '4', text: '주토피아' })
      rtn.push({ value: '5', text: '레스토랑' })
      rtn.push({ value: '6', text: '편의시설' })
      rtn.push({ value: '7', text: '기프트샵' })
      rtn.push({ value: '8', text: '포토존' })
      return rtn
    },
    items2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '글로벌페어' })
      rtn.push({ value: '3', text: '아메리칸 어드벤처' })
      rtn.push({ value: '4', text: '매직랜드' })
      rtn.push({ value: '5', text: '유러피언 어드벤처' })
      rtn.push({ value: '6', text: '쥬토피아' })
      return rtn
    },

  },

  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() { },
  methods: {
    openModal() { this.modal.open() },
    closeModal() { this.modal.close() },
    closed() {},
  },
}
</script>
<style scoped>
</style>
