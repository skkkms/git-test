<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-tab-box
        default-idx="1"
        class="mt35"
      >
        <ur-tab-content
          idx="1"
          label="에버랜드"
        >
          <ur-form-box toggleable>
            <ur-form-item
              label="영업일자"
              :label-align="'right'"
              style="width:50%; height:auto;"
              class="flex-wrap"
            >
              <ur-date-picker
                auto-confirm
                input-type="YYYY-MM-DD"
                init="day+30"
              />
            </ur-form-item>
            <ur-form-item
              label="시설명"
              :label-align="'right'"
              style="width:50%; height:auto;"
            >
              <ur-text-field
                value=""
                style="width: 100%;"
              />
            </ur-form-item>
            <ur-form-item
              label="시설 카테고리"
              :label-align="'right'"
              style="width:50%; height:auto;"
            >
              <ur-dropdown
                v-model="value1"
                :items="items1"
              />
            </ur-form-item>
            <ur-form-item
              label="Zone 구분"
              :label-align="'right'"
              style="width:50%; height:auto;"
            >
              <ur-dropdown
                v-model="value2"
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
          <template>
            <ur-data-grid
              ref="grid"
              :headers="columns"
              :data-source="list"
              :data-set-options="{id: 'id'}"
              :options="opts"
              class="custom_grid_pgeNav_None mt35"
            >
              <template
                #right-info
              >
                <ur-dropdown
                  v-model="value3"
                  :items="items3"
                  style="width:150px;"
                  class="pr10"
                />
                <ur-button
                  color="violet"
                >
                  운영상태 일괄변경
                </ur-button>
                <ur-button
                  color="violet"
                >
                  기초정보 가져오기
                </ur-button>
                <ur-button
                  color="violet"
                  @click="openModalP01"
                >
                  일자별 Q-PASS Tier 관리
                </ur-button>
                <ur-modal
                  ref="modalP01"
                  class="modal-b1c6"
                  xlarge
                  title="일자별 Q-PASS Tier 관리"
                  draggable
                  @closed="closed"
                >
                  <P01 />
                </ur-modal>
                <ur-button
                  color="violet"
                  @click="openModalP02"
                >
                  일괄 생성
                </ur-button>
                <ur-modal
                  ref="modalP02"
                  class="modal-b1c6"
                  xlarge
                  title="일별 시설 일괄 생성"
                  draggable
                  @closed="closed"
                >
                  <P02 />
                </ur-modal>
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
              <template #header>
                <ur-data-grid-header-row>
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell
                    colspan="4"
                    text="가상대기 설정"
                    align="center"
                  />
                  <ur-data-grid-header-cell
                    colspan="3"
                    text="예약 설정"
                    align="center"
                  />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                  <ur-data-grid-header-cell rowspan="2" />
                </ur-data-grid-header-row>
                <ur-data-grid-header-row>
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                  <ur-data-grid-header-cell :expand-resizer="2" />
                </ur-data-grid-header-row>
              </template>
            </ur-data-grid>
          </template>
          <div class="btn_wrap mt10">
            <div class="right_box">
              <!-- 2023-02-16 공연시간 검색 모달팝업버튼 개발완료시 삭제 요함 -->
              <ur-button
                color="violet"
                @click="openModalP03"
              >
                <ur-modal
                  ref="modalP03"
                  class="modal-b1c6"
                  xlarge
                  title="공연시간"
                  @closed="closed"
                >
                  <P03 />
                </ur-modal>
                공연시간 검색팝업
              </ur-button>
              <!-- 2023-02-16 공연시간 검색 모달팝업버튼 개발완료시 삭제 요함 -->

              <!-- 2023-02-16 대기시간(분) 검색 모달팝업버튼 개발완료시 삭제 요함 -->
              <ur-button
                color="violet"
                @click="openModalP04"
              >
                <ur-modal
                  ref="modalP04"
                  class="modal-b1c6"
                  xlarge
                  title="대기 시간 이력 조회"
                  @closed="closed"
                >
                  <P04 />
                </ur-modal>
                대기시간(분) 검색팝업
              </ur-button>
              <!-- 2023-02-16 대기시간(분) 검색 모달팝업버튼 개발완료시 삭제 요함 -->
            </div>
          </div>
        </ur-tab-content>
        <ur-tab-content
          idx="2"
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

import P01 from './components/PGE_AAZ_00011_P01.vue'
import P02 from './components/PGE_AAZ_00011_P02.vue'
import P03 from './components/PGE_AAZ_00011_P03.vue'
import P04 from './components/PGE_AAZ_00011_P04.vue'

export default {
  name: 'PGE_AAZ_00011', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
    P02,
    P03,
    P04,
  },
  data() {
    return {
      textArea: ' ',
      value1: '1',
      value2: '1',
      value3: '3',

      // 영업일자 날짜 데이터
      dateValue1: '2022-10-13',

      // 테이블 내 드랍다운
      T1D1: null,
      T1D2: null,
      T1D3: null,
      T1D4: null,

      dataSet: new this.$ur.grid.DataSet(),
      opts: {
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: true,
      },
      list: [
        {
          str1: '2022-10-13', str2: '랩터레인저', str3: '어트랙션, 공연', str4: '어트랙션,공연', str5: '', str6: '', str7: '', str8: '', str9: '', str10: '', str11: '', str12: 'N', str13: '0', str14: '0', str15: '0', str16: '1000', str17: '2', str18: '0', str19: '-', str20: '', str21: '2022-10-13 15:35:35', str22: 'BJ123', str23: '2022-10-13 15:35:35', str24: 'BJ123',
        },
        {
          str1: '2022-10-13', str2: '팝콘 카트', str3: '레스토랑', str4: '글로벌페어', str5: '', str6: '', str7: '', str8: '', str9: '', str10: '', str11: '', str12: 'N', str13: '0', str14: '0', str15: '0', str16: '1000', str17: '2', str18: '0', str19: '-', str20: '', str21: '2022-10-13 15:35:35', str22: 'BJ123', str23: '2022-10-13 15:35:35', str24: 'BJ123',
        },
        {
          str1: '2022-10-13', str2: '크레이지 좀비 헌트', str3: '어트랙션', str4: '글로벌페어', str5: '', str6: '', str7: '', str8: '', str9: '', str10: '', str11: '', str12: 'Y', str13: '0', str14: '0', str15: '0', str16: '1000', str17: '2', str18: '0', str19: 'A 그룹', str20: '', str21: '2022-10-13 15:35:35', str22: 'BJ123', str23: '2022-10-13 15:35:35', str24: 'BJ123',
        },
        {
          str1: '2022-10-13', str2: '크레이지 좀비 헌트', str3: '어트랙션', str4: '유러피안 어드벤처', str5: '', str6: '', str7: '', str8: '', str9: '', str10: '', str11: '', str12: 'Y', str13: '0', str14: '0', str15: '0', str16: '1000', str17: '2', str18: '0', str19: 'A 그룹', str20: '', str21: '2022-10-13 15:35:35', str22: 'BJ123', str23: '2022-10-13 15:35:35', str24: 'BJ123',
        }, {
          str1: '2022-10-13', str2: '팝콘 카트', str3: '어트랙션', str4: '유러피안 어드벤처', str5: '', str6: '', str7: '', str8: '', str9: '', str10: '', str11: '', str12: 'N', str13: '0', str14: '0', str15: '0', str16: '1000', str17: '2', str18: '0', str19: 'A 그룹', str20: '', str21: '2022-10-13 15:35:35', str22: 'BJ123', str23: '2022-10-13 15:35:35', str24: 'BJ123',
        },
      ],
      columns: [
        { value: 'str1', text: '영업일자', width: 100 },
        {
          value: 'str2', text: '시설명', width: 180, required: true,
        },
        { value: 'str3', text: '시설 카테고리', width: 130 },
        { value: 'str4', text: 'Zone 구분', width: 150 },
        {
          value: 'str5',
          text: '오픈 시간',
          width: 120,
          component: {
            template: '<div><ur-text-field mask="time" style="width:90%; height:auto;" value="10:00"/></div>',
          },
        },
        {
          value: 'str6',
          text: '종료 시간',
          width: 120,
          component: {
            template: '<div><ur-text-field mask="time" style="width:90%; height:auto;" value="21:00"/></div>',
          },
        },
        {
          value: 'str7',
          text: '공연 시간',
          width: 280,
          component: {
            template: '<div><ur-text-field style="width:75%; height:auto; padding-right:10px;" value="10:00 / 14:00" disabled/><ur-icon-button icon="search" icon-type="line" color="primary"/></div>',
          },
        },
        {
          value: 'str8',
          text: '운영 상태',
          width: 150,
          required: true,
          component: {
            template: '<div><ur-dropdown v-model="T1D1" :items="itemsT1D1" style="width:80%;"/></div>',
          },
        },
        {
          value: 'str9',
          text: '대기시간(분)',
          width: 200,
          component: {
            template: '<div><ur-text-field style="width:70%; height:auto; padding-right:10px;" value="10"/><ur-icon-button icon="search" icon-type="line" color="primary"/></div>',
          },
        },
        {
          value: 'str10',
          text: '대기시간 표기방법',
          width: 150,
          component: {
            template: '<div><ur-dropdown v-model="T1D2" :items="itemsT1D2" style="width:80%;"/></div>',
          },
        },
        {
          value: 'str11',
          text: '대기 문구',
          width: 150,
          component: {
            template: '<div><ur-dropdown v-model="T1D3" :items="itemsT1D3" style="width:80%;"/></div>',
          },
        },
        {
          value: 'str12', text: 'Y/N', width: 100, align: 'center',
        },
        {
          value: 'str13', text: '탑승시간 간격', width: 100, align: 'center',
        },
        {
          value: 'str14', text: '사전알림', width: 100, align: 'center',
        },
        {
          value: 'str15', text: '기준 OHRC', width: 100, align: 'center',
        },
        {
          value: 'str16', text: 'THRC', width: 100, align: 'center',
        },
        {
          value: 'str17', text: '이용간격수', width: 100, align: 'center',
        },
        {
          value: 'str18', text: 'Q-PASS건수', width: 100, align: 'center',
        },
        {
          value: 'str19', text: '가상대기 그룹', width: 120, align: 'center',
        },
        {
          value: 'str20',
          text: 'Q-PASS 그룹',
          width: 120,
          component: {
            template: '<div><ur-dropdown v-model="T1D4" :items="itemsT1D4" style="width:100%;"/></div>',
          },
        },
        { value: 'str21', text: '등록일시', width: 150 },
        { value: 'str22', text: '등록자', width: 100 },
        { value: 'str23', text: '수정일시', width: 150 },
        { value: 'str24', text: '수정자', width: 100 },
      ],

    }
  },
  computed: {
    modalP01() {
      return this.$refs.modalP01
    },
    modalP02() {
      return this.$refs.modalP02
    },
    modalP03() {
      return this.$refs.modalP03
    },
    modalP04() {
      return this.$refs.modalP04
    },
    // 계산된 속성, date pickproperty로 사용가능

    // 시설 카테고리 드랍다운 데이터
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

    // Zone 구분 드랍다운 데이터
    items2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '글로벌페어' })
      rtn.push({ value: '3', text: '아메리칸 어드벤처' })
      rtn.push({ value: '4', text: '매직랜드' })
      rtn.push({ value: '5', text: '유러피안 어드벤처' })
      rtn.push({ value: '6', text: '쥬토피아' })
      return rtn
    },

    // 일별시설운영관리 테이블 외 운영상태 드랍다운 데이터
    items3() {
      const rtn = []
      rtn.push({ value: '1', text: 'OPEN' })
      rtn.push({ value: '2', text: 'CLOSED' })
      rtn.push({ value: '3', text: '준비중' })
      rtn.push({ value: '4', text: 'PM 점검' })
      rtn.push({ value: '5', text: '점검중' })
      rtn.push({ value: '6', text: '금일종료' })
      rtn.push({ value: '7', text: '대기중' })
      rtn.push({ value: '8', text: '우천대기' })
      rtn.push({ value: '9', text: '하계운휴' })
      rtn.push({ value: '10', text: '동계운휴' })
      rtn.push({ value: '11', text: '공사운휴' })
      rtn.push({ value: '12', text: '대관운휴' })
      rtn.push({ value: '13', text: '강설대기' })
      rtn.push({ value: '14', text: '강풍대기' })
      rtn.push({ value: '15', text: '취소' })
      rtn.push({ value: '16', text: '예약가능' })
      rtn.push({ value: '17', text: '예약마감' })
      rtn.push({ value: '18', text: '낙뢰대기' })
      return rtn
    },

    // 일별시설운영관리 테이블 내 운영상태 드랍다운 데이터
    itemsT1D1() {
      const rtn = []
      rtn.push({ value: '1', text: 'OPEN' })
      rtn.push({ value: '2', text: 'CLOSED' })
      rtn.push({ value: '3', text: '준비중' })
      rtn.push({ value: '4', text: 'PM 점검' })
      rtn.push({ value: '5', text: '점검중' })
      rtn.push({ value: '6', text: '금일종료' })
      rtn.push({ value: '7', text: '대기중' })
      rtn.push({ value: '8', text: '우천대기' })
      rtn.push({ value: '9', text: '하계운휴' })
      rtn.push({ value: '10', text: '동계운휴' })
      rtn.push({ value: '11', text: '공사운휴' })
      rtn.push({ value: '12', text: '대관운휴' })
      rtn.push({ value: '13', text: '강설대기' })
      rtn.push({ value: '14', text: '강풍대기' })
      rtn.push({ value: '15', text: '취소' })
      rtn.push({ value: '16', text: '예약가능' })
      rtn.push({ value: '17', text: '예약마감' })
      rtn.push({ value: '18', text: '낙뢰대기' })
      return rtn
    },

    // 일별시설운영관리 테이블 내 대기시간 표기방법 드랍다운 데이터
    itemsT1D2() {
      const rtn = []
      rtn.push({ value: '1', text: '시간' })
      rtn.push({ value: '2', text: '문구' })
      rtn.push({ value: '3', text: '자동입력' })
      return rtn
    },

    // 일별시설운영관리 테이블 내 대기문구 드랍다운 데이터
    itemsT1D3() {
      const rtn = []
      rtn.push({ value: '1', text: '회차별 운영' })
      rtn.push({ value: '2', text: '상시 운영' })
      rtn.push({ value: '3', text: '전면예약제 운영' })
      rtn.push({ value: '4', text: '추첨예약제 운영' })
      return rtn
    },

    // 일별시설운영관리 테이블 내 Q-PASS그룹 드랍다운 데이터
    itemsT1D4() {
      const rtn = []
      rtn.push({ value: '1', text: '미사용' })
      rtn.push({ value: '2', text: 'Tier 1' })
      rtn.push({ value: '3', text: 'Tier 2' })
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
    openModalP01() { this.modalP01.open() },
    openModalP02() { this.modalP02.open() },
    openModalP03() { this.modalP03.open() },
    openModalP04() { this.modalP04.open() },
    closeModalP01() { this.modalP01.close() },
    closeModalP02() { this.modalP02.close() },
    closeModalP03() { this.modalP03.close() },
    closeModalP04() { this.modalP04.close() },
  },
}
</script>
<style scoped>
</style>
