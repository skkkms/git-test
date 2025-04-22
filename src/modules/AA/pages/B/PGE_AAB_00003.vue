<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S::온라인 관리 -->
      <div class="comm_title_wrap">
        <h4>온라인 관리</h4>
      </div>
      <ur-form-box
        id="_ONLINE_"
        toggleable
      >
        <template v-if="IS_EL_ON">
          <!-- ITEM::시설카테고리 (1) -->
          <ur-form-item
            :label="$t('시설카테고리 (1)')"
            :label-align="'right'"
            required
            style="width: 50%;"
          >
            {{ faciltCateKindNameOne }}
          </ur-form-item>
          <!-- ITEM::시설카테고리 (2) -->
          <ur-form-item
            :label="$t('시설카테고리 (2)')"
            :label-align="'right'"
            required
            style="width: 50%;"
          >
            {{ faciltCateKindNameTwo }}
          </ur-form-item>
        </template>
        <template v-if="IS_CB_ON">
          <!-- ITEM::시설카테고리 -->
          <ur-form-item
            :label="$t('시설카테고리')"
            :label-align="'right'"
            required
            style="width: 100%;"
          >
            {{ faciltCateKindNameOne }}
          </ur-form-item>
        </template>
        <!-- ITEM::Zone 구분 -->
        <ur-form-item
          :label="$t('Zone 구분')"
          :label-align="'right'"
          required
          style="width: 50%;"
        >
          {{ getZoneKindName(params.zoneKindCd) }}
        </ur-form-item>
        <!-- ITEM::게시 여부 -->
        <ur-form-item
          :label="$t('게시 여부')"
          :label-align="'right'"
          required
          style="width: 50%;"
        >
          {{ params.exposrYn }}
        </ur-form-item>
        <!-- ITEM::게시 위치 -->
        <ur-form-item
          :label="$t('게시 위치')"
          class="flex_wrap"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          {{ exposrPosition }}
        </ur-form-item>
        <!-- ITEM::노출 순서-->
        <ur-form-item
          :label="$t('노출 순서')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          {{ params.exposrOrder | numberFormat }}
        </ur-form-item>
        <!-- ITEM::시설명 (국문) -->
        <ur-form-item
          :label="$t('시설명 (국문)')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          {{ params.faciltName }}
        </ur-form-item>
        <!-- ITEM::시설명 (영문) -->
        <ur-form-item
          :label="$t('시설명 (영문)')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          {{ params.faciltNameEng }}
        </ur-form-item>
        <!-- ITEM::시설 설명 (국문) -->
        <ur-form-item
          :label="$t('MSG_TXT_FACILT_DESCRIPTION_KO')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <span
            v-for="s in convEnt2Br(params.faciltDescrt)"
            class="subscript_txt"
          >
            {{ s }}<br>
          </span>
        </ur-form-item>
        <!-- ITEM::시설 설명 (영문) -->
        <ur-form-item
          :label="$t('MSG_TXT_FACILT_DESCRIPTION_EN')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <span
            v-for="s in convEnt2Br(params.faciltDescrtEng)"
            class="subscript_txt"
          >
            {{ s }}<br>
          </span>
        </ur-form-item>
        <!-- S:: 시설 카테고리 '공연' 선택시 관람 소요 시간 노출 -->
        <!-- ITEM::관람 소요 시간 -->
        <ur-form-item
          v-if="IS_CONCERT_ON"
          :label="$t('관람 소요 시간')"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
        >
          <div>
            {{ params.perfrmPlayMm }} 분
          </div>
        </ur-form-item>
        <!-- E:: 시설 카테고리 '공연' 선택시 관람 소요 시간 노출 -->

        <!-- S:: 시설 카테고리 '레스토랑_CB' '기프트샾' 선택시 사용 구분 노출 -->
        <!-- ITEM::사용 구분-->
        <ur-form-item
          v-if="IS_RESTAURANT_CB_ON || IS_GIFTSHOP_EL_ON || IS_GIFTSHOP_CB_ON"
          :label="$t('사용 구분')"
          class="flex_wrap"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          {{ getFoodUseKindNms(params.foodUseKindCds) }}
        </ur-form-item>
        <!-- E:: 시설 카테고리 '레스토랑' 선택시 사용 구분 노출 -->

        <template v-if="IS_RESTAURANT_ON">
          <!-- S:: 시설 카테고리 '레스토랑 EL' 선택시 음식 종류 노출 -->
          <!-- ITEM::사용 구분-->
          <ur-form-item
            :label="$t('사용 구분')"
            class="flex_wrap"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            {{ getFoodUseKindNms(params.foodUseKindCds) }}
          </ur-form-item>
          <!-- ITEM::음식종류 -->
          <ur-form-item
            :label="$t('음식종류')"
            class="flex_wrap"
            :label-align="'right'"
            required
            style="width: 50%; height: auto;"
          >
            {{ getFoodTypeNms(params.foodTypeCds) }}
          </ur-form-item>
          <!-- E:: 시설 카테고리 '레스토랑' 선택시 음식 종류 노출 -->
        </template>

        <template v-if="IS_AMENITY_ON || IS_AMENITY_CB_ON || IS_PHOTOZONE_EL_ON">
          <!-- S:: 시설 카테고리 '편의시설' 선택시 스마트 예약 여부 노출 -->
          <!-- ITEM::스마트 예약 여부 -->
          <ur-form-item
            :label="$t('스마트 예약 여부')"
            :label-align="'right'"
            required
            style="width: 50%; height: auto;"
          >
            {{ params.reservYn }}
          </ur-form-item>
          <!-- E:: 시설 카테고리 '편의시설' 선택시 스마트 예약 여부 노출 -->
          <!-- S:: 시설 카테고리 '편의시설' 선택시 연결 URL 노출 -->
          <!-- ITEM::연결 URL -->
          <ur-form-item
            :label="$t('연결 URL')"
            :label-align="'right'"
            required
            style="width: 50%; height: auto;"
          >
            {{ params.reservConnUrl }}
          </ur-form-item>
          <!-- E:: 시설 카테고리 '편의시설' 선택시 연결 URL 노출 -->
        </template>

        <!-- S:: 시설 카테고리 '편의시설' 선택시 편의시설 구분 노출 -->
        <!-- ITEM::편의시설 구분 -->
        <ur-form-item
          v-if="IS_AMENITY_ON || IS_AMENITY_CB_ON"
          :label="$t('편의시설 구분')"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
        >
          {{ getExpedncyFaciltKindName(params.expedncyFaciltKindCd) }}
        </ur-form-item>
        <!-- E:: 시설 카테고리 '편의시설' 선택시 편의시설 구분 노출 -->

        <template v-if="IS_ATTRACTION_ON || IS_ATTRACTION_CB_ON">
          <!-- ITEM::이용조건 설명 (국문) -->
          <ur-form-item
            :label="$t('이용조건 설명 (국문)')"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            {{ params.useCondDescrt }}
          </ur-form-item>
          <!-- ITEM::이용조건 설명 (영문) -->
          <ur-form-item
            :label="$t('이용조건 설명 (영문)')"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            {{ params.useCondDescrtEng }}
          </ur-form-item>
          <!-- ITEM::보호자 탑승 유무 -->
          <ur-form-item
            :label="$t('보호자 탑승 유무')"
            :label-align="'right'"
            required
            style="width: 50%; height: auto;"
          >
            {{ params.guardRidingYn }}
          </ur-form-item>
          <!-- ITEM::신장제한 -->
          <ur-form-item
            :label="$t('신장제한')"
            :label-align="'right'"
            style="width: 50%; height: auto;"
            class="flex_wrap"
          >
            {{ params.heightLimitStartRange }}
            <div class="pdRow10">
              {{ $t('cm 이상') }}
            </div>
            <div class="pdRow10">
              ~
            </div>
            {{ params.heightLimitEndRange }}
            <div class="pdRow10">
              {{ $t('cm 이하') }}
            </div>
          </ur-form-item>
        </template>

        <template v-if="IS_ATTRACTION_CB_ON">
          <!-- ITEM::체중제한 -->
          <ur-form-item
            v-if="IS_CB_ON"
            :label="$t('체중제한')"
            :label-align="'right'"
            style="width: 50%; height: auto;"
            class="flex_wrap"
          >
            {{ params.weightLimitRange }}
          </ur-form-item>
          <!-- ITEM::시설수심 -->
          <ur-form-item
            v-if="IS_CB_ON"
            :label="$t('시설수심')"
            :label-align="'right'"
            style="width: 50%; height: auto;"
            class="flex_wrap"
          >
            {{ params.depthLimitRange }}
          </ur-form-item>
        </template>

        <!-- ITEM::썸네일 이미지-->
        <ur-form-item
          :label="$t('썸네일 이미지')"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <cmp-single-file-uploader
            v-model="params.thumbImagUrl"
            mode="SELECT"
            preview-mode="BELOW"
            :page-id="this.$options.name"
            :rules="$rules.getRules('not_null')"
          />
          <div v-if="false">
            {{ params.thumbImagUrl }}
          </div>
        </ur-form-item>
      </ur-form-box>
      <!-- E::온라인 관리 -->
      <!-- S::시설 카테고리 관리 -->
      <C12
        v-if="false"
        :list="params.faciltCateKindList"
      />
      <div v-if="false">
        {{ params.faciltCateKindList }} ({{ params.faciltCateKindList && params.faciltCateKindList.length }})
      </div>
      <!-- E::시설 카테고리 관리 -->
      <!-- S::제한사항 아이콘 관리 -->
      <template v-if="IS_ATTRACTION_ON || IS_ATTRACTION_CB_ON">
        <C01
          :list="params.iconList"
          :park-kind-cd="params.parkKindCd"
        />
        <div v-if="false">
          {{ params.iconList }} ({{ params.iconList && params.iconList.length }})
        </div>
      </template>
      <!-- E::제한사항 아이콘 관리 -->
      <!-- S::키워드 관리 -->
      <C02 :list="params.keywordList" />
      <!-- E::키워드 관리 -->

      <template
        v-if="IS_ATTRACTION_ON || IS_CONCERT_ON || IS_ZOOTOPIA_ON || IS_RESTAURANT_ON || IS_GIFTSHOP_EL_ON
          || IS_ATTRACTION_CB_ON || IS_RESTAURANT_CB_ON || IS_GIFTSHOP_CB_ON"
      >
        <!-- S::이용 안내 -->
        <C03 :list="params.useGuidDescrtList" />
        <!-- E::이용 안내 -->

        <!-- S:: 시설 카테고리 '주토피아' 선택시 동물 관리 노출 -->
        <!-- S::동물 관리 -->
        <template v-if="IS_ZOOTOPIA_ON">
          <C09 :list="params.animlList" />
          <div v-if="false">
            {{ params.animlList }} ({{ params.iconList && params.iconList.length }})
          </div>
        </template>
        <!-- E::동물 관리 -->
        <!-- E:: 시설 카테고리 '주토피아' 선택시 동물 관리 노출 -->
        <!-- S:: 시설 카테고리 '레스토랑' 선택시 대표 메뉴 노출 -->
        <!-- S::대표 메뉴 -->
        <template v-if="IS_RESTAURANT_ON || IS_RESTAURANT_CB_ON">
          <C10 :list="params.menuList" />
          <div v-if="false">
            {{ params.menuList }} ({{ params.iconList && params.iconList.length }})
          </div>
        </template>
        <!-- E::대표 메뉴 -->
        <!-- E:: 시설 카테고리 '레스토랑' 대표 메뉴 노출 -->

        <!-- S::연관 콘텐츠 관리 -->
        <C04 :list="params.contentList" />
        <!-- E::연관 콘텐츠 관리 -->
        <!-- S::연관 상품 관리 -->
        <C05 :list="params.productList" />
        <!-- E::연관 상품 관리 -->
        <!-- S::유의사항 -->
        <C06 :list="params.noticeList" />
        <!-- E::유의사항 -->
      </template>

      <!-- S::배너 이미지 관리 -->
      <C07 :list="params.bannerList" />
      <!-- E::배너 이미지 관리 -->

      <!-- S::위치 관리 -->
      <C08
        v-if="IS_EL_ON"
        :list="params.positionList"
      />
      <C08CB
        v-if="IS_CB_ON"
        :list="params.positionList"
      />
      <!-- E::위치 관리 -->

      <!-- S::오프라인 관리 -->
      <div
        v-if="IS_EL_ON || IS_ATTRACTION_CB_ON"
        class="comm_title_wrap mt45"
      >
        <h4>오프라인 관리</h4>
      </div>
      <ur-form-box
        v-if="IS_EL_ON || IS_ATTRACTION_CB_ON"
        id="_OFFLINE_"
        toggleable
      >
        <!-- ITEM::오프라인 관리 -->
        <template v-if="IS_ATTRACTION_ON || IS_ATTRACTION_CB_ON || IS_CONCERT_ON">
          <ur-form-item
            :label="$t('가상대기여부')"
            :label-align="'right'"
            required
            style="width: 50%; height: auto;"
          >
            {{ getVlineWaitName(params.vlineWaitYn) }}
          </ur-form-item>
          <!-- ITEM::가상대기그룹-->
          <ur-form-item
            :label="$t('가상대기그룹')"
            :label-align="'right'"
            required
            style="width: 50%; height: auto;"
          >
            {{ getVlineWaitGrpName(params.vlineWaitGrpCd) }}
          </ur-form-item>
          <!-- ITEM::공연 입장 가능-->
          <ur-form-item
            :label="$t('공연 입장 가능')"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <span style="padding-left:46px">{{ params.entrAvailMm }}</span> {{ $t('분 전부터 입장 가능') }} <span style="padding-left:16px"> {{ $t('※ 수정 시, 익일 반영됩니다.') }} </span>
          </ur-form-item>
          <!-- ITEM::입장 유효 간격-->
          <ur-form-item
            :label="$t('입장 유효 간격')"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            {{ $t('입장 시작') }} <span style="padding-left:38px">{{ params.entrValidStartMm }}</span> {{ $t('분 전부터') }}
            <div style="padding-left:20px">
              {{ $t('입장종료') }} <span style="padding-left:38px">{{ params.entrValidEndMm }}</span> {{ $t('분 후까지') }}
            </div>
          </ur-form-item>
          <!-- ITEM::가상대기 설정 값-->
          <ur-form-item
            :label="$t('가상대기 설정 값')"
            :label-align="'right'"
            style="width: 100%; height: auto;"
            class="compo_col_wrap"
          >
            <div class="col_item_txt pr10 pb4">
              <div class="col_item_txtL">
                {{ $t('사전 알림 기준 (탑승시간확정)') }}
              </div>
              <div class="col_item_txtL">
                {{ params.vlineWaitSettngInfrmBaseMm }} {{ $t('분') }}
              </div>
            </div>
            <div class="col_item_txt pr10 pb4">
              <div class="col_item_txtL">
                {{ $t('탑승시간간격') }}
              </div>
              <div class="col_item_txtL">
                {{ params.vlineWaitSettngRidingDistaMm }} {{ $t('분') }}
              </div>
            </div>
            <div class="col_item_txt pr10 pb4">
              <div class="col_item_txtL">
                {{ $t('기준 OHRC') }}
              </div>
              <div class="col_item_txtL">
                {{ params.vlineWaitSettngBaseOhrc }} 명
              </div>
            </div>
          </ur-form-item>
          <!-- ITEM::키오스크 페이지 -->
          <ur-form-item
            :label="$t('키오스크 페이지')"
            :label-align="'right'"
            required
            style="width: 50%; height: auto;"
          >
            {{ params.kioskPageNo }}
          </ur-form-item>
          <!-- ITEM::키오스크 스캔코드 -->
          <ur-form-item
            :label="$t('키오스크 스캔코드')"
            :label-align="'right'"
            required
            style="width: 50%; height: auto;"
          >
            {{ params.kioskScanCode }}
          </ur-form-item>
        </template>
        <!-- ITEM::D/S 노출 여부 -->
        <ur-form-item
          :label="$t('D/S 노출 여부')"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
        >
          {{ params.dsExposrYn }}
        </ur-form-item>
        <!-- ITEM::대기시간 POPS 시설 -->
        <ur-form-item
          :label="$t('대기시간 POPS 시설')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="compo_col_wrap"
        >
          <div class="col_item_txt pr10">
            <div class="pr10">
              {{ $t('시설코드') }}
            </div>
            <div class="col_item_txtL">
              {{ params.waitTimeFaciltCd }}
            </div>
            <div class="pr10">
              {{ $t('시설명') }}
            </div>
            <div class="col_item_txtL">
              {{ params.waitTimeFaciltName }}
            </div>
          </div>
        </ur-form-item>
        <!-- ITEM::Q-PASS 전광판 시설 -->
        <ur-form-item
          :label="$t('Q-PASS 전광판 시설')"
          :label-align="'right'"
          style="width: 100%; height: auto; "
          class="compo_col_wrap"
        >
          <div class="col_item_txt pr10">
            <div class="pr10">
              {{ $t('시설코드') }}
            </div>
            <div class="col_item_txtL">
              {{ params.qpassDsFaciltCd }}
            </div>
            <div class="pr10">
              {{ $t('시설명') }}
            </div>
            <div class="col_item_txtL">
              {{ params.qpassDsFaciltName }}
            </div>
          </div>
        </ur-form-item>
      </ur-form-box>
      <!-- E::오프라인 관리 -->

      <!-- S::시설 사용 POS 관리 -->
      <C11
        v-if="IS_EL_ON || IS_ATTRACTION_CB_ON"
        :list="params.posList"
      />
      <!-- E::시설 사용 POS 관리 -->

      <!-- S::POS 시설 코드 관리 -->
      <C15
        v-if="IS_EL_ON || IS_ATTRACTION_CB_ON"
        :list="params.facilList"
      />
      <!-- E::POS 시설 코드 관리 -->

      <!-- ALERT 모달 -->
      <ALERT ref="modalAlert" />

      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button @click="goToList">
              {{ $t('MSG_BTN_LIST') }}
            </ur-button>
          </div>
          <div class="right_box">
            <ur-button
              color="violet"
              @click="onChangeFacilt"
            >
              {{ $t('MSG_BTN_MDFC') }}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

import BasePage from '~cm/components/BasePage'
import C01 from './components/PGE_AAB_00003_C01.vue' // 제한사항 아이콘 관리
import C02 from './components/PGE_AAB_00003_C02.vue' // 키워드 관리
import C03 from './components/PGE_AAB_00003_C03.vue' // 이용 안내
import C04 from './components/PGE_AAB_00003_C04.vue' // 연관 콘텐츠 관리
import C05 from './components/PGE_AAB_00003_C05.vue' // 연관 상품 관리
import C06 from './components/PGE_AAB_00003_C06.vue' // 유의사항
import C07 from './components/PGE_AAB_00003_C07.vue' // 배너 이미지 관리
import C08 from './components/PGE_AAB_00003_C08.vue' // 위치 관리
import C08CB from './components/PGE_AAB_00003_C13.vue' // 위치 관리 CB
import C09 from './components/PGE_AAB_00003_C09.vue' // 동물 관리
import C10 from './components/PGE_AAB_00003_C10.vue' // 대표 메뉴
import C11 from './components/PGE_AAB_00003_C11.vue' // 시설 사용 POS 관리
import C12 from './components/PGE_AAB_00003_C12.vue' // 시설 카테고리 관리
import C15 from './components/PGE_AAB_00003_C15.vue' // POS 시설 코드 관리
import ALERT from './components/PGE_AAB_00001_P01.vue'

export default {
  name: 'PGE_AAB_00003', // eslint-disable-line vue/name-property-casing
  components: {
    ALERT,
    C01,
    C02,
    C03,
    C04,
    C05,
    C06,
    C07,
    C08,
    C08CB,
    C09,
    C10,
    C11,
    C12,
    C15,
  }, // eslint-disable-line vue/name-property-casing
  filters: {
    numberFormat(value) {
      return value ? utils.numberFormat(value) : null
    },
  },
  extends: BasePage,
  data() {
    return {
      CODE_KEYS: [
        'COD_RS_PARK_KIND',
        'COD_IA_EL_ZONE_KIND',
        'COD_IA_CB_ZONE_KIND',
        'COD_IA_EL_FACILT_CATE_KIND',
        'COD_IA_CB_FACILT_CATE_KIND',
        'COD_IA_VLINE_WAIT_YN',
        'COD_IA_VLINE_WAIT_GRP',
        'COD_IA_FACILT_FOOD_USE_KIND',
        'COD_IA_FACILT_FOOD_TYPE',
        'COD_IA_AMENITY',
        'COD_IA_EXPEDNCY_FACILT_KIND',
        'COD_IA_CB_EXPEDNCY_FACILT_KIND',
        'COD_IA_LIMIT1_ITEM',
        'COD_IA_LIMIT2_ITEM',
      ],
      codes: {
        COD_RS_PARK_KIND: [],
        COD_IA_EL_ZONE_KIND: [],
        COD_IA_CB_ZONE_KIND: [],
        COD_IA_EL_FACILT_CATE_KIND: [],
        COD_IA_CB_FACILT_CATE_KIND: [],
        COD_IA_VLINE_WAIT_YN: [],
        COD_IA_VLINE_WAIT_GRP: [],
        COD_IA_FACILT_FOOD_USE_KIND: [],
        COD_IA_FACILT_FOOD_TYPE: [],
        COD_IA_AMENITY: [],
        COD_IA_EXPEDNCY_FACILT_KIND: [],
        COD_IA_CB_EXPEDNCY_FACILT_KIND: [],
        COD_IA_LIMIT1_ITEM: [],
        COD_IA_LIMIT2_ITEM: [],
      },
      params: {
        // ONLINE
        parkKindCd: '01', // 파크구분, '01' 에버랜드
        zoneKindCd: '',
        faciltName: '',
        exposrYn: 'Y', // 게시여부
        appExposrYn: 'Y', // 게시위치 APP
        mobileExposrYn: 'Y', // 게시위치 Mobile
        pcExposrYn: 'Y', // 게시위치 PC
        foodUseKindCds: ['01', '02'], // 사용구분 (only for 시설카테고리 레스토랑)
        foodTypeCds: ['01', '02', '03', '04', '05', '06', '07'], // 음식종류 (only for 시설카테고리 레스토랑)
        reservYn: 'Y',
        guardRidingYn: 'Y',
        // OFFLINE
        vlineWaitYn: 'Y',
        vlineWaitGrpCd: '',
        entrAvailMm: 0,
        entrValidStartMm: 0,
        entrValidEndMm: 0,
        vlineWaitSettngInfrmBaseMm: 0,
        vlineWaitSettngRidingDistaMm: 0,
        vlineWaitSettngBaseOhrc: 0,
        dsExposrYn: 'Y',
        // ETC
        faciltCateKindList: [],
        iconList: [],
        keywordList: [],
        useGuideDescrtList: [],
        contentList: [],
        productList: [],
        noticeList: [],
        bannerList: [],
        positionList: [],
        animlList: [],
        menuList: [],
        posList: [],
      },
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    COD_IA_EL_FACILT_CATE_KIND_EXTEND() {
      let COD_IA_EL_FACILT_CATE_KIND_EXTEND = [...this.codes.COD_IA_EL_FACILT_CATE_KIND]
      if (COD_IA_EL_FACILT_CATE_KIND_EXTEND.length > 0) {
        const attraction = this.codes.COD_IA_EL_FACILT_CATE_KIND.find(v => v.codeId == '01')
        const concert = this.codes.COD_IA_EL_FACILT_CATE_KIND.find(v => v.codeId == '02')
        const zootopia = this.codes.COD_IA_EL_FACILT_CATE_KIND.find(v => v.codeId == '03')
        // 어트랙션+주토피아 만들기
        if (attraction && zootopia) {
          COD_IA_EL_FACILT_CATE_KIND_EXTEND.push({
            value: attraction.value + ',' + zootopia.value,
            text: attraction.text + '+' + zootopia.text,
          })
        }
        // 공연연+주토피아 만들기
        if (attraction && zootopia) {
          COD_IA_EL_FACILT_CATE_KIND_EXTEND.push({
            value: concert.value + ',' + zootopia.value,
            text: concert.text + '+' + zootopia.text,
          })
        }
      }
      return COD_IA_EL_FACILT_CATE_KIND_EXTEND
    },
    COD_IA_FACILT_CATE_KIND_EXTEND() {
      if (this.params.parkKindCd == '01') return this.COD_IA_EL_FACILT_CATE_KIND_EXTEND
      else if (this.params.parkKindCd == '02') return this.codes.COD_IA_CB_FACILT_CATE_KIND
    },
    COD_IA_FACILT_CATE_KIND() {
      if (this.params.parkKindCd == '01') return this.codes.COD_IA_EL_FACILT_CATE_KIND
      else if (this.params.parkKindCd == '02') return this.codes.COD_IA_CB_FACILT_CATE_KIND
    },
    COD_IA_ZONE_KIND() {
      if (this.params.parkKindCd == '01') return this.codes.COD_IA_EL_ZONE_KIND
      else if (this.params.parkKindCd == '02') return this.codes.COD_IA_CB_ZONE_KIND
    },
    COD_IA_EXPEDNCY_FACILT_KIND() {
      if (this.params.parkKindCd === '02') return this.codes.COD_IA_CB_EXPEDNCY_FACILT_KIND // '02' 캐리비안베이
      return this.codes.COD_IA_EXPEDNCY_FACILT_KIND // 파크 구분 '01' 에버랜드
    },
    IS_ATTRACTION_ON() {
      return (this.params.faciltCateKindList.filter(v => v.faciltCateKindCd === '01').length > 0 && this.params.parkKindCd === '01')
    },
    IS_ATTRACTION_CB_ON() {
      return (this.params.faciltCateKindList.filter(v => v.faciltCateKindCd === '01').length > 0 && this.params.parkKindCd === '02')
    },
    IS_CONCERT_ON() {
      return (this.params.faciltCateKindList.filter(v => v.faciltCateKindCd === '02').length > 0 && this.params.parkKindCd === '01')
    },
    IS_ZOOTOPIA_ON() {
      return (this.params.faciltCateKindList.filter(v => v.faciltCateKindCd === '03').length > 0 && this.params.parkKindCd === '01')
    },
    IS_RESTAURANT_ON() {
      return (this.params.faciltCateKindList.filter(v => v.faciltCateKindCd === '04').length > 0 && this.params.parkKindCd === '01')
      // RESTAURANT: EL '04' , CB '02'
    },
    IS_RESTAURANT_CB_ON() {
      return (this.params.faciltCateKindList.filter(v => v.faciltCateKindCd === '02').length > 0 && this.params.parkKindCd === '02')
      // RESTAURANT: EL '04' , CB '02'
    },
    IS_AMENITY_ON() {
      return (this.params.faciltCateKindList.filter(v => v.faciltCateKindCd === '05').length > 0 && this.params.parkKindCd === '01')
      // 편의시설: EL '05' , CB '05'
    },
    IS_AMENITY_CB_ON() {
      return (this.params.faciltCateKindList.filter(v => v.faciltCateKindCd === '05').length > 0 && this.params.parkKindCd === '02')
      // 편의시설: EL '05' , CB '05'
    },
    IS_GIFTSHOP_EL_ON() {
      return (this.params.faciltCateKindList.filter(v => v.faciltCateKindCd === '06').length > 0 && this.params.parkKindCd === '01')
      // 기프트샵: EL '06' , CB '06'
    },
    IS_GIFTSHOP_CB_ON() {
      return (this.params.faciltCateKindList.filter(v => v.faciltCateKindCd === '06').length > 0 && this.params.parkKindCd === '02')
      // 기프트샵: EL '06' , CB '06'
    },
    IS_PHOTOZONE_EL_ON() {
      return (this.params.faciltCateKindList.filter(v => v.faciltCateKindCd === '07').length > 0 && this.params.parkKindCd === '01')
      // 포토존: EL '07'
    },
    IS_EL_ON() {
      return (this.params.parkKindCd === '01')
    },
    IS_CB_ON() {
      return (this.params.parkKindCd === '02')
    },
    REF() {
      return this.$refs
    },
    // modalPopUp
    modal() {
      return this.$refs.modal
    },
    modalFaciltSearch() {
      return this.$refs.modalFaciltSearch
    },
    modalPosSearch() {
      return this.$refs.modalPosSearch
    },
    exposrPosition() {
      const app = this.params.appExposrYn === 'Y' ? 'App' : ''
      const mobile = this.params.mobileExposrYn === 'Y' ? '모바일웹' : ''
      const pc = this.params.pcExposrYn === 'Y' ? 'PC' : ''
      const val = [app, mobile, pc].filter(v => v !== '').join(',')
      return val !== '' ? val : '-'
    },
    faciltCateKindNameOne() {
      if (this.params.faciltCateKindList && this.params.faciltCateKindList.length > 0) {
        const codeId = this.params.faciltCateKindList[0].faciltCateKindCd
        const code = this.COD_IA_FACILT_CATE_KIND.find(v => v.codeId == codeId)
        const val = code ? code.codeName : ''
        return val || '-'
      }
      return '-'
    },
    faciltCateKindNameTwo() {
      if (this.params.faciltCateKindList && this.params.faciltCateKindList.length > 1) {
        const codeId = this.params.faciltCateKindList[1].faciltCateKindCd
        const code = this.COD_IA_FACILT_CATE_KIND.find(v => v.codeId == codeId)
        const val = code ? code.codeName : ''
        return val || '-'
      }
      return '-'
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
  },
  mounted() {
    // console.log(this.$options.name, 'mounted, $route.query:', this.$route.query)
    // const query = { ...this.$route.query }
    console.log(this.$options.name, 'mounted, utils.getParameter:', utils.getParameter(this, 'params'))
    const query = { ...utils.getParameter(this, 'params') }

    if (utils.isEmpty(query)) {
      this.alert('상세정보를 조회 할 수 없습니다.')
      this.goToList()
      return
    }

    if (utils.isEmpty(query.currentFaciltId)) {
      this.alert('상세정보를 조회 할 수 없습니다.')
      this.goToList()
      return
    }

    console.log('REQ PATH facilt-id:', query.currentFaciltId)
    const serviceName = 'DTS_AAB_00003' // 시설관리 상세
    http.request(this.$options.name, serviceName, {
      query: {},
      path: {
        'facilt-id': query.currentFaciltId, // "H100V05094"
      },
      data: {},
    }).then(res => {
      console.log('RES', res.data)
      const params = res.data
      // 편의시설 코드 변수명 예외처리.. 나중에 정리하자.. hc9.jung
      params.amenityCd = this.params.expedncyFaciltKindCd
      if (!params.faciltCateKindList) {
        console.log('RES faciltCateKindList reset!')
        params.faciltCateKindList = []
      }
      // 위치관리 조회 시 xCoordinate 와 yCoordinate 가 xcoordinate 와 ycoordinate 로 조회 됨..
      // 서버 VO에는 이상 없으나 카멜케이스-처리가 취소 되어 내려옴.. 이유 모름.. 없으면 강제로 만들어 준다.
      if (!utils.isEmpty(params.positionList)) {
        params.positionList.forEach(el => {
          if (utils.isEmpty(el.xCoordinate) && !utils.isEmpty(el.xcoordinate)) {
            el.xCoordinate = el.xcoordinate // eslint-disable-line no-param-reassign
          }
          if (utils.isEmpty(el.yCoordinate) && !utils.isEmpty(el.ycoordinate)) {
            el.yCoordinate = el.ycoordinate // eslint-disable-line no-param-reassign
          }
        })
      }
      this.params = params
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    openModalFaciltSearch() { this.modalFaciltSearch.open() },
    openModalPosSearch() { this.modalPosSearch.open() },
    closed() {},
    onChangeFacilt() {
      // this.$router.push({ path: '/PGE_AAB_00004', query: this.$route.query })
      const params = utils.getParameter(this, 'params')
      console.log('goToList', params)
      utils.goPage('PGE_AAB_00004', { params })
    },
    goToList() {
      // this.$router.push({ path: '/PGE_AAB_00001', query: this.$route.query })
      const params = utils.getParameter(this, 'params')
      console.log('goToList', params)
      const pageId = params.returnPageId ?? 'PGE_AAB_00001'
      utils.goPage(pageId, { params })
    },
    onUpdateFaciltCateKindList(val) {
      this.params.faciltCateKindList = val
    },
    onUpdateIconList(val) {
      this.params.iconList = val
    },
    onUpdateKeywordList(val) {
      this.params.keywordList = val
    },
    onUpdateUseGuideDescrtList(val) {
      this.params.useGuideDescrtList = val
    },
    onUpdateContentList(val) {
      this.params.contentList = val
    },
    onUpdateProductList(val) {
      this.params.productList = val
    },
    onUpdateNoticeList(val) {
      this.params.noticeList = val
    },
    onUpdateBannerList(val) {
      this.params.bannerList = val
    },
    onUpdatePositionList(val) {
      this.params.positionList = val
    },
    onUpdateAnimlList(val) {
      this.params.animlList = val
    },
    onUpdateMenuList(val) {
      this.params.menuList = val
    },
    onUpdatePosList(val) {
      this.params.posList = val
    },
    alert(msg) {
      this.$refs.modalAlert.open(msg)
    },
    getZoneKindName(codeValue) {
      const CODE = this.COD_IA_ZONE_KIND.filter(v => v.value === codeValue)
      if (CODE.length > 0) {
        return CODE[0].text
      }
      return ''
    },
    getAmenityName(codeValue) {
      const CODE = this.codes.COD_IA_AMENITY.filter(v => v.value === codeValue)
      if (CODE.length > 0) {
        return CODE[0].text
      }
      return ''
    },
    getExpedncyFaciltKindName(codeValue) {
      const CODE = this.COD_IA_EXPEDNCY_FACILT_KIND.filter(v => v.value === codeValue)
      if (CODE.length > 0) {
        return CODE[0].text
      }
      return ''
    },
    getVlineWaitGrpName(codeValue) {
      const CODE = this.codes.COD_IA_VLINE_WAIT_GRP.filter(v => v.value === codeValue)
      if (CODE.length > 0) {
        return CODE[0].text
      }
      return ''
    },
    getFaciltCateKindName(codeId) {
      const code = this.COD_IA_FACILT_CATE_KIND.find(v => v.codeId === codeId)
      return code ? code.codeName : ''
    },
    getVlineWaitName(codeId) {
      const code = this.codes.COD_IA_VLINE_WAIT_YN.find(v => v.codeId === codeId)
      return code ? code.codeName : ''
    },
    getFoodUseKindNms(foodUseKindCds) {
      const foodUseKindNms = []
      if (!utils.isEmpty(foodUseKindCds)) {
        const arr = foodUseKindCds.split(',')
        arr.forEach(codeId => {
          const CODE = this.codes.COD_IA_FACILT_FOOD_USE_KIND.find(v => v.codeId === codeId)
          const NAME = CODE ? CODE.codeName : ''
          foodUseKindNms.push(NAME)
        })
      }
      return foodUseKindNms.join(', ')
    },
    getFoodTypeNms(foodTypeCds) {
      const foodTypeNms = []
      if (!utils.isEmpty(foodTypeCds)) {
        const arr = foodTypeCds.split(',')
        arr.forEach(codeId => {
          const CODE = this.codes.COD_IA_FACILT_FOOD_TYPE.find(v => v.codeId === codeId)
          const NAME = CODE ? CODE.codeName : ''
          foodTypeNms.push(NAME)
        })
      }
      return foodTypeNms.join(', ')
    },
    convEnt2Br(s) {
      // return <br/> + s + <br/>
      const str = s ?? ''
      const arr = str.replace(/(?:\r\n|\r|\n)/g, '[LINE-BREAK]').split('[LINE-BREAK]')
      return arr
    },
  },
}
</script>
<style scoped>
</style>
