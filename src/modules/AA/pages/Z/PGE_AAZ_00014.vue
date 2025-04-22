<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-tab-box
        default-idx="2"
        class="mt35"
      >
        <ur-tab-content
          idx="1"
          label="에버랜드"
        >
          <h4>에버랜드</h4>
        </ur-tab-content>
        <ur-tab-content
          idx="2"
          label="캐리비안베이"
        >
          <!-- 일별 시설 운영 통계 제목 -->
          <div class="comm_btn_wrap mt45">
            <div class="left_box">
              <div class="comm_title_wrap">
                <h4>
                  일별 시설 운영 통계
                </h4>
              </div>
            </div>
            <div class="right_box">
              <span class="subscript_txt mr16">
                *엑셀다운로드 시 전체 데이터가 하나의 엑셀로 다운로드 됩니다.
              </span>
              <ur-button>
                <ur-icon
                  icon="download"
                  icon-type="line"
                  size="small"
                  spacing
                />
                엑셀다운로드
              </ur-button>
            </div>
          </div>

          <!-- 일별 시설 운영 통계 Table-->
          <ur-data-grid
            id="fgrid-sample9-1"
            ref="grid"
            :headers="columns01"
            :data-source="list01"
            :data-set-options="{id: 'id'}"
            :options="opts1"
            class="custom_grid_pgeNav_None"
          />

          <!-- 일별 시설 운영 정보 제목-->
          <div class="comm_btn_wrap mt45">
            <div class="left_box">
              <div class="comm_title_wrap">
                <h4>
                  일별 시설 운영 정보
                </h4>
              </div>
            </div>
          </div>

          <!-- 일별 시설 운영 정보 Table-->
          <table class="date_table mb45">
            <!-- ********** 테이블 구조 파악 : tr 태그를 기준으로 접어서 구조 파악하기 권장 드립니다. **********-->

            <!-- S :: 일별 시설 운영 정보 테이블 헤더 영역-->
            <thead>
              <!-- 테이블 제목 1행 (요일,날짜)-->
              <tr>
                <th rowspan="3">
                  시설명
                </th>
                <th><span class="day">일</span> <span class="date">11.20</span></th>
                <th><span class="day">월</span> <span class="date">11.21</span></th>
                <th><span class="day">화</span> <span class="date">11.22</span></th>
                <th><span class="day">수</span> <span class="date">11.23</span></th>
                <th><span class="day">목</span> <span class="date">11.24</span></th>
                <th><span class="day">금</span> <span class="date">11.25</span></th>
                <th><span class="day">토</span> <span class="date">11.26</span></th>
              </tr>

              <!-- 테이블 제목 2행 (실내 시간)-->
              <tr>
                <th>실내 <span class="start">10 : 00</span> ~ <span class="end">21 : 00</span></th>
                <th>실내 <span class="start">10 : 00</span> ~ <span class="end">21 : 00</span></th>
                <th>실내 <span class="start">10 : 00</span> ~ <span class="end">21 : 00</span></th>
                <th>실내 <span class="start">10 : 00</span> ~ <span class="end">21 : 00</span></th>
                <th>실내 <span class="start">10 : 00</span> ~ <span class="end">21 : 00</span></th>
                <th>실내 <span class="start">10 : 00</span> ~ <span class="end">21 : 00</span></th>
                <th>실내 <span class="start">10 : 00</span> ~ <span class="end">21 : 00</span></th>
              </tr>

              <!-- 테이블 제목 3행 (실외 시간)-->
              <tr>
                <th>실외 <span class="start">10 : 00</span> ~ <span class="end">21 : 00</span></th>
                <th>실외 <span class="start">10 : 00</span> ~ <span class="end">21 : 00</span></th>
                <th>실외 휴장</th>
                <th>실외 휴장</th>
                <th>실외 휴장</th>
                <th>실외 휴장</th>
                <th>실외 휴장</th>
              </tr>
            </thead>
            <!-- E :: 일별 시설 운영 정보 테이블 헤더 영역-->

            <tbody>
              <!-- 실외 파도풀 -->
              <tr>
                <th>실외 파도풀</th>
                <!-- 실외 파도풀 1,2,3,4,5,6,7번째 셀 영역 ([운휴])-->
                <td
                  colspan="7"
                >
                  <div class="bg-purple">
                    <div>[운휴]</div>
                  </div>
                </td>
              </tr>

              <!-- 실외 다이빙풀 -->
              <tr>
                <th>실외 다이빙풀</th>
                <!-- 실외 다이빙풀 1,2,3,4,5,6,7번째 셀 영역 ([운휴])-->
                <td
                  colspan="7"
                >
                  <div class="bg-purple">
                    <div>[운휴]</div>
                  </div>
                </td>
              </tr>

              <!-- 메가스톰 -->
              <tr>
                <th>메가스톰</th>
                <td />
                <td />
                <td />
                <!-- 메가스톰 4,5,6,7번째 셀 영역 ([운휴])-->
                <td
                  colspan="4"
                >
                  <div class="bg-purple">
                    <div>[PM 점검]</div>
                  </div>
                </td>
              </tr>

              <!-- 튜브 라이드 -->
              <tr>
                <th>튜브 라이드</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>

              <!-- 워터 봅슬레이 -->
              <tr>
                <th>워터 봅슬레이</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <!-- 워터 봅슬레이 7번째 셀 영역 ([오전 점검] 13:00 ~)-->
                <td>
                  <div class="bg-purple">
                    <div>[오전 점검] 13:00 ~</div>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody>
              <!-- 실외 유수풀 -->
              <tr>
                <th>실외 유수풀</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>

              <!-- 어드벤처풀 -->
              <tr>
                <th>어드벤처풀</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>

              <!-- 미라클 스파 -->
              <tr>
                <th>미라클 스파</th>
                <td />
                <td />
                <td />
                <td />
                <!-- 미라클 스파 5번째 셀 영역 ([오전 점검] 13:00 ~)-->
                <td>
                  <div class="bg-primary-01">
                    <div>[오전 점검] 13:00 ~</div>
                  </div>
                </td>
                <td />
                <td />
              </tr>

              <!-- 서핑라이드 -->
              <tr>
                <th>서핑라이드</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <!-- 서핑라이드 6번째 셀 영역 ([오전 점검] 13:00 ~)-->
                <td>
                  <div class="bg-primary-01">
                    <div>[오전 점검] 13:00 ~</div>
                  </div>
                </td>
                <td />
              </tr>
            </tbody>
            <tbody>
              <!-- 와일드 리버 풀 -->
              <tr>
                <th>와일드 리버 풀</th>
                <td />
                <td />
                <td />
                <td />
                <!-- 와일드 리버 풀 5번째 셀 영역 ([오전 점검] 13:00 ~)-->
                <td>
                  <div class="bg-warning">
                    <div>[오전 점검] 13:00 ~</div>
                  </div>
                </td>
                <td />
                <td />
              </tr>

              <!-- 실외 키디풀 -->
              <tr>
                <th>실외 키디풀</th>
                <!-- 실외 키디풀 1,2,3,4,5,6,7번째 셀 영역 ([내용 없음]) -->
                <td
                  colspan="7"
                >
                  <div class="bg-warning">
                    <div>[내용 없음]</div>
                  </div>
                </td>
              </tr>

              <!-- 타워 부메랑고 -->
              <tr>
                <th>타워 부메랑고</th>
                <td />
                <td />
                <td />
                <!-- 타워 부메랑고 4번째 셀 영역 ([오전 점검] 13:00) -->
                <td>
                  <div class="bg-warning">
                    <div>[오전 점검] 13:00 ~</div>
                  </div>
                </td>
                <td />
                <td />
                <td />
              </tr>

              <!-- 타워 래프트 -->
              <tr>
                <th>타워 래프트</th>
                <!-- 타워 래프트 1,2,3,4,5,6,7번째 셀 영역 ([B조 오픈] 12:00 ~ 17:00) -->
                <td
                  colspan="7"
                >
                  <div class="bg-warning">
                    <div>[B조 오픈] 12:00 ~ 17:00</div>
                  </div>
                </td>
              </tr>

              <!-- 아쿠아 루프 -->
              <tr>
                <th>아쿠아 루프</th>
                <!-- 아쿠아 루프 2,3,4번째 셀 영역 ([일부 변경] 10:00 ~ 22:00) -->
                <td />
                <td
                  colspan="3"
                >
                  <div class="bg-warning">
                    <div>[일부 변경] 10:00 ~ 22:00</div>
                  </div>
                </td>
                <td />
                <td />
                <td />
              </tr>

              <!-- 와일드 블라스터 -->
              <tr>
                <th>와일드 블라스터</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
            </tbody>
            <tbody>
              <!-- 바데풀 (실외) -->
              <tr>
                <th>바데풀 (실외)</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>

              <!-- 실내 유수풀 -->
              <tr>
                <th>실내 유수풀</th>
                <td />
                <td />
                <td />
                <td />
                <!-- 실내 유수풀 5,6,7번째 셀 영역 ([일부 변경] 10:00 ~ 22:00) -->
                <td
                  colspan="3"
                >
                  <div class="bg-danger">
                    <div>[일부 변경] 10:00 ~ 20:00</div>
                  </div>
                </td>
              </tr>

              <!-- 샌디풀 -->
              <tr>
                <th>샌디풀</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>

              <!-- 실내 어드벤처풀 -->
              <tr>
                <th>실내 어드벤처풀</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>

              <!-- 실내 다이빙풀 -->
              <tr>
                <th>실내 다이빙풀</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <!-- 실내 다이빙풀 7번째 셀 영역 ([오전 점검] 13:00 ~) -->
                <td>
                  <div class="bg-danger">
                    <div>[오전 점검] 13:00 ~</div>
                  </div>
                </td>
              </tr>

              <!-- 실내 파도풀 -->
              <tr>
                <th>실내 파도풀</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>

              <!-- 유아풀 -->
              <tr>
                <th>유아풀</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <!-- 유아풀 6번째 셀 영역 ([오전 점검] 13:00 ~) -->
                <td>
                  <div class="bg-danger">
                    <div>[오전 점검] 13:00 ~</div>
                  </div>
                </td>
                <td />
              </tr>

              <!-- 실내 카디풀 -->
              <tr>
                <th>실내 카디풀</th>
                <td />
                <td />
                <td />
                <!-- 실내 카디풀 4번째 셀 영역 ([오전 점검] 13:00 ~) -->
                <td>
                  <div class="bg-danger">
                    <div>[오전 점검] 13:00~</div>
                  </div>
                </td>
                <td />
                <td />
                <td />
              </tr>

              <!-- 스파 -->
              <tr>
                <th>스파</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>

              <!-- 사우나 -->
              <tr>
                <th>사우나</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>

              <!-- 풀사이드 슬라이드 -->
              <tr>
                <th>풀사이드 슬라이드</th>
                <!-- 풀사이드 슬라이드 1,2,3,4.5,6,7번째 셀 영역 ([일부 변경] 10:00 ~ 18:00) -->
                <td
                  colspan="7"
                >
                  <div class="bg-danger">
                    <div>[일부 변경] 10:00 ~ 18:00</div>
                  </div>
                </td>
              </tr>

              <!-- 퀵 라이드 -->
              <tr>
                <th>퀵 라이드</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
            </tbody>
          </table>
        </ur-tab-content>
      </ur-tab-box>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAZ_00014', // eslint-disable-line vue/name-property-casing
  components: {

  },
  data() {
    return {

      // 일별 시설 운영 통계 테이블 옵션
      opts1: {
        height: 233,
        pagination: true,
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
        styleBordered: true,
      },


      // 일별 시설 운영 통계 테이블
      columns01: [
        {
          text: '구분',
          value: 'value1',
          width: 170,
          headerAlign: 'center',
        },
        {
          text: '일 11.20',
          value: 'value2',
          headerAlign: 'center',
        },
        {
          text: '월 11.21',
          value: 'value3',
          headerAlign: 'center',
        },
        {
          text: '화 11.22',
          value: 'value4',
          headerAlign: 'center',
        },
        {
          text: '수 11.23',
          value: 'value5',
          headerAlign: 'center',
        },
        {
          text: '목 11.24',
          value: 'value6',
          headerAlign: 'center',
        },
        {
          text: '금 11.25',
          value: 'value7',
          headerAlign: 'center',
        },
        {
          text: '토 11.26',
          value: 'value8',
          headerAlign: 'center',
        },
      ],

      // 일별 시설 운영 통계 DATA
      list01: [
        {
          value1: 'PM 점검', value2: '0', value3: '0', value4: '0', value5: '2', value6: '2', value7: '2', value8: '2',
        },
        {
          value1: '동계/공사/대관 운휴', value2: '1', value3: '1', value4: '1', value5: '1', value6: '1', value7: '1', value8: '1',
        },
        {
          value1: 'CLOSED', value2: '3', value3: '3', value4: '3', value5: '3', value6: '3', value7: '3', value8: '3',
        },
        {
          value1: '가동 率', value2: '89.5%', value3: '89.5%', value4: '89.5%', value5: '84.2%', value6: '84.2%', value7: '84.2%', value8: '84.2%',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

  },

  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {

  },
  mounted() { },
  methods: {

  },
}
</script>
<style scoped>
</style>
