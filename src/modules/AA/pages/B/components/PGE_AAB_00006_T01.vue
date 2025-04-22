<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable max-len -->
<template>
  <div>
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
        <span class="subscript_txt mr16 ">
          *엑셀다운로드 시 전체 데이터가 하나의 엑셀로 다운로드 됩니다.
        </span>
        <ur-button @click="onExcelDnLoad">
          <ur-icon
            icon="download"
            icon-type="line"
            size="small"
            spacing
          />
          엑셀다운로드
        </ur-button>
        <!-- 검색조건EL : 조회-->
        <ur-button @click="onSearch">
          {{ $t('MSG_TXT_SRCH') }}
        </ur-button>
        <ur-button
          v-if="false"
          @click="onTest"
        >
          TEST
        </ur-button>
      </div>
    </div>

    <!-- 일별 시설 운영 통계 Table-->
    <table class="date_table mb45">
      <thead>
        <tr>
          <th>
            구분
          </th>
          <th><span class="day">{{ getDays1Day() }}</span> <span class="date">{{ getDays1Date() }}</span></th>
          <th><span class="day">{{ getDays2Day() }}</span> <span class="date">{{ getDays2Date() }}</span></th>
          <th><span class="day">{{ getDays3Day() }}</span> <span class="date">{{ getDays3Date() }}</span></th>
          <th><span class="day">{{ getDays4Day() }}</span> <span class="date">{{ getDays4Date() }}</span></th>
          <th><span class="day">{{ getDays5Day() }}</span> <span class="date">{{ getDays5Date() }}</span></th>
          <th><span class="day">{{ getDays6Day() }}</span> <span class="date">{{ getDays6Date() }}</span></th>
          <th><span class="day">{{ getDays7Day() }}</span> <span class="date">{{ getDays7Date() }}</span></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>PM 점검</th><!-- PM 점검 -->
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat1Check() }}</td>
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat2Check() }}</td>
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat3Check() }}</td>
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat4Check() }}</td>
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat5Check() }}</td>
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat6Check() }}</td>
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat7Check() }}</td>
        </tr>
        <tr>
          <th>동계/공사/대관 운휴</th><!-- 동계/공사/대관 운휴 -->
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat1Break() }}</td>
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat2Break() }}</td>
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat3Break() }}</td>
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat4Break() }}</td>
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat5Break() }}</td>
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat6Break() }}</td>
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat7Break() }}</td>
        </tr>
        <tr>
          <th>CLOSED</th><!-- CLOSED -->
          <td style="color: black; padding-right: 10px; text-align: right;">
            {{ getStat1Close() }}
          </td>
          <td style="color: black; padding-right: 10px; text-align: right;">
            {{ getStat2Close() }}
          </td>
          <td style="color: black; padding-right: 10px; text-align: right;">
            {{ getStat3Close() }}
          </td>
          <td style="color: black; padding-right: 10px; text-align: right;">
            {{ getStat4Close() }}
          </td>
          <td style="color: black; padding-right: 10px; text-align: right;">
            {{ getStat5Close() }}
          </td>
          <td style="color: black; padding-right: 10px; text-align: right;">
            {{ getStat6Close() }}
          </td>
          <td style="color: black; padding-right: 10px; text-align: right;">
            {{ getStat7Close() }}
          </td>
        </tr>
        <tr>
          <th>가동 率</th><!-- 가동 率 -->
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat1Rate() }}</td>
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat2Rate() }}</td>
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat3Rate() }}</td>
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat4Rate() }}</td>
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat5Rate() }}</td>
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat6Rate() }}</td>
          <td style="color: black; padding-right: 10px; text-align: right;">{{ getStat7Rate() }}</td>
        </tr>
      </tbody>
    </table>

    <div class="left_box">
      <div class="comm_title_wrap">
        <h4>
          일별 시설 운영 정보
        </h4>
      </div>
    </div>
    <!-- 일별 시설 운영 정보 Table-->
    <table class="date_table mb45">
      <!-- ********** 테이블 구조 파악 : tr 태그를 기준으로 접어서 구조 파악하기 권장 드립니다. **********-->

      <!-- S :: 일별 시설 운영 정보 테이블 헤더 영역-->
      <thead v-if="IS_EL_ON">
        <!-- 테이블 제목 1행 (요일,날짜)-->
        <tr>
          <!-- rowspan = "2" : 세로로 2칸 셀 병합 (테이블 목록 분류 : 시설명)-->
          <th rowspan="2">
            시설명
          </th>
          <th><span class="day">{{ getDays1Day() }}</span> <span class="date">{{ getDays1Date() }}</span></th>
          <th><span class="day">{{ getDays2Day() }}</span> <span class="date">{{ getDays2Date() }}</span></th>
          <th><span class="day">{{ getDays3Day() }}</span> <span class="date">{{ getDays3Date() }}</span></th>
          <th><span class="day">{{ getDays4Day() }}</span> <span class="date">{{ getDays4Date() }}</span></th>
          <th><span class="day">{{ getDays5Day() }}</span> <span class="date">{{ getDays5Date() }}</span></th>
          <th><span class="day">{{ getDays6Day() }}</span> <span class="date">{{ getDays6Date() }}</span></th>
          <th><span class="day">{{ getDays7Day() }}</span> <span class="date">{{ getDays7Date() }}</span></th>
        </tr>
        <!-- 테이블 제목 2행 (시간)-->
        <tr>
          <th><span class="start">{{ getDays1OpenTime() }}</span> ~ <span class="end">{{ getDays1CloseTime() }}</span></th>
          <th><span class="start">{{ getDays2OpenTime() }}</span> ~ <span class="end">{{ getDays2CloseTime() }}</span></th>
          <th><span class="start">{{ getDays3OpenTime() }}</span> ~ <span class="end">{{ getDays3CloseTime() }}</span></th>
          <th><span class="start">{{ getDays4OpenTime() }}</span> ~ <span class="end">{{ getDays4CloseTime() }}</span></th>
          <th><span class="start">{{ getDays5OpenTime() }}</span> ~ <span class="end">{{ getDays5CloseTime() }}</span></th>
          <th><span class="start">{{ getDays6OpenTime() }}</span> ~ <span class="end">{{ getDays6CloseTime() }}</span></th>
          <th><span class="start">{{ getDays7OpenTime() }}</span> ~ <span class="end">{{ getDays7CloseTime() }}</span></th>
        </tr>
      </thead>
      <thead v-if="IS_CB_ON">
        <!-- 테이블 제목 1행 (요일,날짜)-->
        <tr>
          <!-- rowspan = "2" : 세로로 2칸 셀 병합 (테이블 목록 분류 : 시설명)-->
          <th rowspan="3">
            시설명
          </th>
          <th><span class="day">{{ getDays1Day() }}</span> <span class="date">{{ getDays1Date() }}</span></th>
          <th><span class="day">{{ getDays2Day() }}</span> <span class="date">{{ getDays2Date() }}</span></th>
          <th><span class="day">{{ getDays3Day() }}</span> <span class="date">{{ getDays3Date() }}</span></th>
          <th><span class="day">{{ getDays4Day() }}</span> <span class="date">{{ getDays4Date() }}</span></th>
          <th><span class="day">{{ getDays5Day() }}</span> <span class="date">{{ getDays5Date() }}</span></th>
          <th><span class="day">{{ getDays6Day() }}</span> <span class="date">{{ getDays6Date() }}</span></th>
          <th><span class="day">{{ getDays7Day() }}</span> <span class="date">{{ getDays7Date() }}</span></th>
        </tr>
        <!-- 테이블 제목 2행 (시간)-->
        <tr>
          <th>{{ $t('MSG_TXT_INSIDE') }}<span class="start">{{ getDays1OpenTime() }}</span> ~ <span class="end">{{ getDays1CloseTime() }}</span></th>
          <th>{{ $t('MSG_TXT_INSIDE') }}<span class="start">{{ getDays2OpenTime() }}</span> ~ <span class="end">{{ getDays2CloseTime() }}</span></th>
          <th>{{ $t('MSG_TXT_INSIDE') }}<span class="start">{{ getDays3OpenTime() }}</span> ~ <span class="end">{{ getDays3CloseTime() }}</span></th>
          <th>{{ $t('MSG_TXT_INSIDE') }}<span class="start">{{ getDays4OpenTime() }}</span> ~ <span class="end">{{ getDays4CloseTime() }}</span></th>
          <th>{{ $t('MSG_TXT_INSIDE') }}<span class="start">{{ getDays5OpenTime() }}</span> ~ <span class="end">{{ getDays5CloseTime() }}</span></th>
          <th>{{ $t('MSG_TXT_INSIDE') }}<span class="start">{{ getDays6OpenTime() }}</span> ~ <span class="end">{{ getDays6CloseTime() }}</span></th>
          <th>{{ $t('MSG_TXT_INSIDE') }}<span class="start">{{ getDays7OpenTime() }}</span> ~ <span class="end">{{ getDays7CloseTime() }}</span></th>
        </tr>
        <tr>
          <th>{{ $t('MSG_TXT_OUTSIDE') }}<span class="start">{{ getDays1OpenTimeCBOut() }}</span> ~ <span class="end">{{ getDays1CloseTimeCBOut() }}</span></th>
          <th>{{ $t('MSG_TXT_OUTSIDE') }}<span class="start">{{ getDays2OpenTimeCBOut() }}</span> ~ <span class="end">{{ getDays2CloseTimeCBOut() }}</span></th>
          <th>{{ $t('MSG_TXT_OUTSIDE') }}<span class="start">{{ getDays3OpenTimeCBOut() }}</span> ~ <span class="end">{{ getDays3CloseTimeCBOut() }}</span></th>
          <th>{{ $t('MSG_TXT_OUTSIDE') }}<span class="start">{{ getDays4OpenTimeCBOut() }}</span> ~ <span class="end">{{ getDays4CloseTimeCBOut() }}</span></th>
          <th>{{ $t('MSG_TXT_OUTSIDE') }}<span class="start">{{ getDays5OpenTimeCBOut() }}</span> ~ <span class="end">{{ getDays5CloseTimeCBOut() }}</span></th>
          <th>{{ $t('MSG_TXT_OUTSIDE') }}<span class="start">{{ getDays6OpenTimeCBOut() }}</span> ~ <span class="end">{{ getDays6CloseTimeCBOut() }}</span></th>
          <th>{{ $t('MSG_TXT_OUTSIDE') }}<span class="start">{{ getDays7OpenTimeCBOut() }}</span> ~ <span class="end">{{ getDays7CloseTimeCBOut() }}</span></th>
        </tr>
      </thead>
      <!-- E :: 일별 시설 운영 정보 테이블 헤더 영역-->

      <tbody
        v-for="faciltCateKindCd in getFaciltCateKindCdList()"
        :key="faciltCateKindCd.value"
      >
        <tr
          v-for="facilt in getCategoryFaciltList(faciltCateKindCd.value)"
          :key="facilt.faciltId"
        >
          <th><span style="color:black;">{{ facilt.faciltName }}</span></th> <!-- 시설명 -->
          <td
            v-for="day in getFaciltDayList(facilt)"
            :key="day.seq"
            :colspan="day.colspan"
          >
            <!-- 표시할 상태명이 있다면 하이라이트를 준다 -->
            <div
              v-if="day.operStatusNm"
              :class="getColorClass(faciltCateKindCd.value)"
            >
              <div>
                {{ getOperStatusNmFmt(day.operStatusNm) }}
                <span style="color: transparent;">{{ getTimeFmt(day.openTime) }} {{ getDelimeter(day) }} {{ getTimeFmt(day.closeTime) }}</span>
                <span v-if="false">[{{ day.operStatusCd }}]</span>
              </div>
            </div>
            <div v-else-if="isNoOperStatus(day.operStatusCd)">
              <span style="color: red;">일별 운영정보 없음</span>
            </div>
            <!--
            <div v-else-if="isNormalOpen(day)">
              <span style="color: white;">정상</span>
            </div>
            -->
            <div
              v-else
              :class="getColorClass(faciltCateKindCd.value)"
            >
              <div>
                {{ getTimeFmt(day.openTime) }} {{ getDelimeter(day) }} {{ getTimeFmt(day.closeTime) }}
                <span style="color: transparent;">{{ day.operStatusCd }}</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import FaciltDailyOperViewMixin from '~aa/pages/B/mixins/FaciltDailyOperViewMixin'

export default {
  name: 'PGE_AA6_00006_T01', // eslint-disable-line vue/name-property-casing
  mixins: [FaciltDailyOperViewMixin],
}
</script>
