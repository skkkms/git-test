<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S::온라인 관리 {{params.parkKindCd}}-->
      <div class="comm_title_wrap">
        <h4>
          {{ $t('MSG_TXT_FACILT_ONLINE_MANAGER') }}
        </h4>
      </div>
      <ur-form-box id="_ONLINE_" toggleable>
        <template v-if="IS_EL_ON">
          <!-- ITEM::시설카테고리 (1) EL용 -->
          <ur-form-item
            :label="$t('MSG_TXT_FACILT_CATEGORY_1')"
            :label-align="'right'"
            required
            style="width: 50%; height: 70px;"
            class="flex_wrap"
          >
            <ur-dropdown
              v-model="params.faciltCateKindCdOne"
              :items="COD_IA_FACILT_CATE_KIND"
              :placeholder="$t('MSG_TXT_SEL')"
              :rules="$rules.getRules('not_null')"
              @input="onChangeFaciltCateKindCdOne"
            />
          </ur-form-item>
          <!-- ITEM::시설카테고리 (2) EL용 -->
          <ur-form-item
            :label="$t('MSG_TXT_FACILT_CATEGORY_2')"
            :label-align="'right'"
            style="width: 50%; height: auto;"
            class="flex_wrap"
          >
            <ur-dropdown
              v-if="IS_ATTRACTION_ON || IS_CONCERT_ON"
              v-model="params.faciltCateKindCdTwo"
              :items="COD_IA_EL_FACILT_CATE_KIND_ZOOTOPIA_ONLY"
              no-select="no-select"
              :msg-no-select="$t('MSG_TXT_SEL')"
              @input="onChangeFaciltCateKindCdTwo"
            />
            <ur-dropdown
              v-if="!IS_ATTRACTION_ON && !IS_CONCERT_ON"
              v-model="params.faciltCateKindCdTwo"
              :items="COD_IA_EL_FACILT_CATE_KIND_ZOOTOPIA_ONLY"
              no-select="no-select"
              :msg-no-select="$t('MSG_TXT_SEL')"
              disabled
            />
          </ur-form-item>
        </template>
        <template v-if="IS_CB_ON">
          <!-- ITEM::시설카테고리 CB용 -->
          <ur-form-item
            :label="$t('MSG_TXT_FACILT_CATEGORY')"
            :label-align="'right'"
            required
            style="width: 100%; height: 70px;"
            class="flex_wrap"
          >
            <ur-dropdown
              v-model="params.faciltCateKindCdOne"
              :items="COD_IA_FACILT_CATE_KIND"
              :rules="$rules.getRules('not_null')"
              :placeholder="$t('MSG_TXT_SEL')"
              style="width: 100%;"
              @input="onChangeFaciltCateKindCdOne"
            />
          </ur-form-item>
        </template>
        <!-- ITEM::Zone 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_FACILT_ZONE_KIND')"
          :label-align="'right'"
          required
          style="width: 50%; height: 70px;"
          class="flex_wrap"
        >
          <ur-dropdown
            v-model="params.zoneKindCd"
            :items="COD_IA_ZONE_KIND"
            :placeholder="$t('MSG_TXT_SEL')"
            :rules="$rules.getRules('not_null')"
          />
        </ur-form-item>
        <!-- ITEM::게시 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_YN')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-radio-wrapper
            v-model="params.exposrYn"
            :items="[{value: 'Y', text: 'Y'},{value: 'N', text: 'N'}]"
          />
        </ur-form-item>
        <!-- ITEM::게시 위치 -->
        <ur-form-item
          :label="$t('MSG_TXT_PUBCT_TARGET')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-checkbox-wrapper
            v-model="exposrAppMobilePcKindList"
            sm
            :rules="ruleAtleastOne"
          >
            <ur-checkbox value="app">APP</ur-checkbox>
            <ur-checkbox value="mobile">
              {{ $t('MSG_ALT_MOBILE_WEB') }}
            </ur-checkbox>
            <ur-checkbox value="pc">PC</ur-checkbox>
          </ur-checkbox-wrapper>
        </ur-form-item>
        <!-- ITEM::노출 순서-->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_ORDER')"
          class="flex_wrap"
          :label-align="'right'"
          required
          style="width: 50%; height: 70px;"
        >
          <ur-text-field
            v-model="params.exposrOrder"
            :rules="$rules.getRules('not_null')"
            mask="number"
            maxlength="4"
            @keyup="params.exposrOrder = parseInt(params.exposrOrder, 10)"
            style="width: 100%;"
          />
        </ur-form-item>
        <!-- ITEM::시설명 (국문) -->
        <ur-form-item
          :label="$t('MSG_TXT_FACILT_NAME_KO')"
          class="flex_wrap"
          :label-align="'right'"
          required
          style="width: 50%; height: 70px;"
        >
          <ur-text-field
            v-model.trim="params.faciltName"
            :rules="$rules.getRules('not_null')"
            maxlength="300"
            style="width: 100%"
          />
        </ur-form-item>
        <!-- ITEM::시설명 (영문) -->
        <ur-form-item
          :label="$t('MSG_TXT_FACILT_NAME_EN')"
          class="flex_wrap"
          :label-align="'right'"
          required
          style="width: 50%; height: 70px;"
        >
          <ur-text-field
            v-model.trim="params.faciltNameEng"
            :rules="$rules.getRules('not_null')"
            maxlength="300"
            style="width: 100%;"
          />
        </ur-form-item>
        <!-- ITEM::시설 설명 (국문) , 20종 150여 머리 동물 친구들이함께 살아가는 대자연 로스트 밸리! -->
        <ur-form-item
          :label="$t('MSG_TXT_FACILT_DESCRIPTION_KO')"
          class="flex_wrap"
          :label-align="'right'"
          required
          style="width: 50%; height: 120px;"
        >
          <ur-text-area
            v-model.trim="params.faciltDescrt"
            :rules="$rules.getRules('not_null')"
            rows="3"
            style="width: 100%;text-align: center;"
            placeholder=""
          />
        </ur-form-item>
        <!-- ITEM::시설 설명 (영문) , Mother Nature Lost Valley, where 150 animals with 20 kinds of hair live together! -->
        <ur-form-item
          :label="$t('MSG_TXT_FACILT_DESCRIPTION_EN')"
          class="flex_wrap"
          :label-align="'right'"
          required
          style="width: 50%; height: 120px;"
        >
          <ur-text-area
            v-model.trim="params.faciltDescrtEng"
            :rules="$rules.getRules('not_null')"
            rows="3"
            style="width: 100%;text-align: center;"
            placeholder=""
          />
        </ur-form-item>
        <!-- S:: 시설 카테고리 '공연' 선택시 관람 소요 시간 노출 -->
        <!-- ITEM::관람 소요 시간 -->
        <ur-form-item
          v-if="IS_CONCERT_ON"
          :label="$t('관람 소요 시간')"
          :label-align="'right'"
          required
          style="width: 100%; height: 70px;"
          class="flex_wrap"
        >
          <div>
            <ur-text-field
              v-model="params.perfrmPlayMm"
              mask="number"
              maxlength="3"
              :rules="$rules.getRules('not_null','only_numeric')"
            />분
          </div>
        </ur-form-item>
        <!-- E:: 시설 카테고리 '공연' 선택시 관람 소요 시간 노출 -->
        <!-- ITEM::사용 구분-->
        <ur-form-item
          v-if="IS_RESTAURANT_CB_ON || IS_GIFTSHOP_EL_ON || IS_GIFTSHOP_CB_ON"
          :label="$t('사용 구분')"
          class="flex_wrap"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-checkbox-wrapper
            v-model="foodUseKindList"
            :items="COD_IA_FACILT_FOOD_USE_KIND_GIFTCARD_AND_SOM_ONLY"
            sm
          /><div v-if="false">{{ foodUseKindList }}/{{ params.foodUseKindCds }}</div>
        </ur-form-item>

        <template v-if="IS_RESTAURANT_ON">
          <!-- S:: 시설 카테고리 '레스토랑' 선택시 사용 구분 노출 -->
          <ur-form-item
            :label="$t('사용 구분')"
            class="flex_wrap"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            <ur-checkbox-wrapper
              v-model="foodUseKindList"
              :items="codes.COD_IA_FACILT_FOOD_USE_KIND"
              sm
            /><div v-if="false">{{ foodUseKindList }}/{{ params.foodUseKindCds }}</div>
          </ur-form-item>
          <!-- E:: 시설 카테고리 '레스토랑' 선택시 사용 구분 노출 -->
          <!-- S:: 시설 카테고리 '레스토랑' 선택시 음식 종류 노출 -->
          <!-- ITEM::음식종류 -->
          <ur-form-item
            :label="$t('음식종류')"
            class="flex_wrap"
            :label-align="'right'"
            required
            style="width: 50%; height: auto;"
          >
            <ur-checkbox-wrapper
              v-model="foodTypeList"
              :items="codes.COD_IA_FACILT_FOOD_TYPE"
              sm
            /><div v-if="false">{{ foodTypeList }}/{{ params.foodTypeCds }}</div>
          </ur-form-item>
          <!-- E:: 시설 카테고리 '레스토랑' 선택시 음식 종류 노출 -->
        </template>

        <template v-if="IS_AMENITY_ON || IS_AMENITY_CB_ON || IS_PHOTOZONE_EL_ON">
          <!-- S:: 시설 카테고리 '편의시설' 선택시 스마트 예약 여부 노출 -->
          <!-- ITEM::스마트 예약 여부 -->
          <ur-form-item
            :label="$t('MSG_TXT_SMART_RESERVATION_YN')"
            :label-align="'right'"
            required
            style="width: 50%; height: auto;"
          >
            <ur-radio-wrapper
              ref="reservYn"
              v-model="params.reservYn"
              sm
              :rules="ruleAtleastOne"
            >
              <ur-radio value="Y">Y</ur-radio>
              <ur-radio value="N">N</ur-radio>
            </ur-radio-wrapper>
          </ur-form-item>
          <!-- E:: 시설 카테고리 '편의시설' 선택시 스마트 예약 여부 노출 -->
          <!-- S:: 시설 카테고리 '편의시설' 선택시 연결 URL 노출 -->
          <!-- ITEM::연결 URL -->
          <ur-form-item
            :label="$t('연결 URL')"
            :label-align="'right'"
            required
            style="width: 50%; height: auto;"
            class="flex_wrap"
          >
            <ur-text-field
              v-if="params.reservYn ==='Y'"
              v-model.trim="params.reservConnUrl"
              value=""
              style="width: 100%;"
            />
            <ur-text-field
              v-if="params.reservYn !=='Y'"
              v-model.trim="params.reservConnUrl"
              value=""
              disabled
              style="width: 100%;"
            />
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
          class="flex_wrap"
        >
          <ur-dropdown
            v-model="params.expedncyFaciltKindCd"
            :items="COD_IA_EXPEDNCY_FACILT_KIND"
            placeholder="선택"
            style="width: 50%;"
          />
        </ur-form-item>
        <!-- E:: 시설 카테고리 '편의시설' 선택시 편의시설 구분 노출 -->

        <template v-if="IS_ATTRACTION_ON || IS_ATTRACTION_CB_ON">
          <!-- ITEM::이용조건 설명 (국문) -->
          <ur-form-item
            :label="$t('이용조건 설명 (국문)')"
            :label-align="'right'"
            style="width: 50%; height: auto;"
            class="flex_wrap"
          >
            <ur-text-field
              v-model.trim="params.useCondDescrt"
              style="width: 100%;"
            />
          </ur-form-item>
          <!-- ITEM::이용조건 설명 (영문) -->
          <ur-form-item
            :label="$t('이용조건 설명 (영문)')"
            :label-align="'right'"
            style="width: 50%; height: auto;"
            class="flex_wrap"
          >
            <ur-text-field
              v-model.trim="params.useCondDescrtEng"
              style="width: 100%;"
            />
          </ur-form-item>
          <!-- ITEM::보호자 탑승 유무 -->
          <ur-form-item
            :label="$t('보호자 탑승 유무')"
            :label-align="'right'"
            required
            style="width: 50%; height: auto;"
          >
            <ur-radio-wrapper
              v-model="params.guardRidingYn"
              :items="[{value: 'Y', text: 'Y'},{value: 'N', text: 'N'}]"
            />
          </ur-form-item>
          <!-- ITEM::신장제한 -->
          <ur-form-item
            :label="$t('신장제한')"
            :label-align="'right'"
            style="width: 50%; height: auto;"
            class="flex_wrap"
          >
            <ur-text-field
              v-model="params.heightLimitStartRange"
              maxlength="3"
              style="width: 34%; height: auto;"
              value="130"
              mask="number"
              :rules="$rules.getRules('only_numeric')"
              @keyup="params.heightLimitStartRange = parseInt(params.heightLimitStartRange, 10)"
            /><div class="pdRow10">
              cm 이상
            </div>
            <div class="pdRow10">
              ~
            </div>
            <ur-text-field
              v-model="params.heightLimitEndRange"
              maxlength="3"
              style="width: 34%; height: auto;"
              value="190"
              mask="number"
              :rules="$rules.getRules('only_numeric')"
              @keyup="params.heightLimitEndRange = parseInt(params.heightLimitEndRange, 10)"
            />
            <div class="pdRow10">
              cm 이하
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
            <ur-text-field
              v-model="params.weightLimitRange"
              style="width: 100%;"
              maxlength="14"
            />
          </ur-form-item>
          <!-- ITEM::시설수심 -->
          <ur-form-item
            v-if="IS_CB_ON"
            :label="$t('시설수심')"
            :label-align="'right'"
            style="width: 50%; height: auto;"
            class="flex_wrap"
          >
            <ur-text-field
              v-model="params.depthLimitRange"
              style="width: 100%;"
              maxlength="14"
            />
          </ur-form-item>
        </template>

        <!-- ITEM::썸네일 이미지-->
        <ur-form-item
          :label="$t('MSG_TXT_THUMBNAIL_IMAG')"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <cmp-single-file-uploader
            v-model="params.thumbImagUrl"
            mode="UPLOAD"
            upload-target="FAC000"
            accepts="jpg,png,gif,JPG,PNG,GIF"
            pixels="160*160"
            preview-mode="BELOW"
            show-guidance
            :page-id="this.$options.name"
            :rules="$rules.getRules('not_null')"
          >
            <!--template>
              <div class="col_img_wrap">
                <div class="col_item_img">
                  <ur-text-field
                    v-model="params.thumbnailImagAltDesc"
                    style="width: 100%; height: auto;"
                    maxlength="100"
                    :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"
                  />
                </div>
              </div>
            </template-->
          </cmp-single-file-uploader><div v-if="false">{{ params.thumbImagUrl }}</div>
          <!--
          썸네일 이미지 160x160 jpg, png, gif 15MB
          제한사항 아이콘 72x72 jpg, png, gif 15MB
          연관 콘텐츠 480x320 jpg, png, gif 15MB
          연관 상품 480x320 jpg, png, gif 15MB
          배너 이미지 720x720 jpg, png, gif 15MB
          동물 이미지 624x320 jpg, png, gif 15MB
          메뉴 이미지 160x160 jpg, png, gif 15MB
          <cmp-single-file-uploader
            ref="fileUpload"
            preview-mode="BELOW"
            mode="SELECT"
            v-model="params.thumbImagUrl"
            :page-id="pageId"
            :accepts=accepts
            pixels="176*176"
            show-guidance
            text-field-width="calc(100% - 96px)"
          />
          -->
        </ur-form-item>
      </ur-form-box>
      <!-- E::온라인 관리 -->

      <!-- S::시설 카테고리 관리 -->
      <C12 v-if="false" title="시설 카테고리 관리" :items="COD_IA_FACILT_CATE_KIND" :list="params.faciltCateKindList" @update="onUpdateFaciltCateKindList" />
      <div v-if="false">{{ params.faciltCateKindList }}/{{ params.faciltCateKindCdOne }}/{{ params.faciltCateKindCdTwo }}</div>
      <!-- E::시설 카테고리 관리 {{params.faciltCateKindList}}-->
      <!-- S::제한사항 아이콘 관리 -->
      <C01 title="제한사항 아이콘 관리" ref="C01" :page-id="contextPageId" :list="params.iconList" @update="onUpdateIconList" v-if="IS_ATTRACTION_ON" />
      <C01CB title="제한사항 아이콘 관리" ref="C01CB" :page-id="contextPageId" :list="params.iconList" @update="onUpdateIconList" v-if="IS_ATTRACTION_CB_ON" />
      <div v-if="false">{{ params.iconList }}</div>
      <!-- E::제한사항 아이콘 관리 {{params.iconList}}-->

      <!-- S::키워드 관리 -->
      <C02 title="키워드 관리" ref="C02" :list="params.keywordList" @update="onUpdateKeywordList" />
      <div v-if="false">{{ params.keywordList }}</div>
      <!-- E::키워드 관리 {{params.keywordList}}-->

      <template
        v-if="IS_ATTRACTION_ON || IS_CONCERT_ON || IS_ZOOTOPIA_ON || IS_RESTAURANT_ON || IS_GIFTSHOP_EL_ON
          || IS_ATTRACTION_CB_ON || IS_RESTAURANT_CB_ON || IS_GIFTSHOP_CB_ON"
      >
        <!--template v-if="!IS_AMENITY_ON && !IS_AMENITY_CB_ON && !IS_PHOTOZONE_EL_ON && !IS_VILLAGE_ON && !IS_BEACHCHAIR_ON"-->
        <!-- S::이용 안내 -->
        <C03 title="이용 안내" ref="C03" :list="params.useGuidDescrtList" @update="onUpdateUseGuidDescrtList" />
        <div v-if="false">{{ params.useGuidDescrtList }}</div>
        <!-- E::이용 안내 {{params.useGuidDescrtList}}-->

        <!-- S:: 시설 카테고리 '주토피아' 선택시 동물 관리 노출 -->
        <!-- S::동물 관리 -->
        <template v-if="IS_ZOOTOPIA_ON">
          <C09 title="동물 관리" ref="C09" :page-id="contextPageId" :list="params.animlList" @update="onUpdateAnimlList" />
          <div v-if="false">{{ params.animlList }}</div>
        </template>
        <!-- E::동물 관리 {{params.animlList}}-->
        <!-- E:: 시설 카테고리 '주토피아' 선택시 동물 관리 노출 -->

        <!-- S:: 시설 카테고리 '레스토랑' 선택시 대표 메뉴 노출 -->
        <!-- S::대표 메뉴 -->
        <template v-if="IS_RESTAURANT_ON || IS_RESTAURANT_CB_ON">
          <C10 title="대표 메뉴" ref="C10" :page-id="contextPageId" :list="params.menuList" @update="onUpdateMenuList" />
          <div v-if="false">{{ params.menuList }}</div>
        </template>
        <!-- E::대표 메뉴 {{params.menuList}}-->
        <!-- E:: 시설 카테고리 '레스토랑' 대표 메뉴 노출 -->

        <!-- S::연관 콘텐츠 관리 -->
        <C04 title="연관 콘텐츠 관리" ref="C04" :page-id="contextPageId" :list="params.contentList" @update="onUpdateContentList" />
        <div v-if="false">{{ params.contentList }}</div>
        <!-- E::연관 콘텐츠 관리 {{params.contentList}}-->
        <!-- S::연관 상품 관리 -->
        <C05 title="연관 상품 관리" ref="C05" :page-id="contextPageId" :list="params.productList" @update="onUpdateProductList" />
        <div v-if="false">{{ params.productList }}</div>
        <!-- E::연관 상품 관리 {{params.productList}}-->
        <!-- S::유의사항 -->
        <C06 title="유의사항" ref="C06" :list="params.noticeList" @update="onUpdateNoticeList" />
        <div v-if="false">{{ params.noticeList }}</div>
        <!-- E::유의사항 {{params.noticeList}}-->
      </template>

      <!-- 20231110 배너이미지는 모든 카테고리에서 필수 입력 사항으로 변경 됨 -->
      <!-- S::배너 이미지 관리 -->
      <C07 title="배너 이미지 관리" ref="C07" :page-id="contextPageId" :list="params.bannerList" @update="onUpdateBannerList" />
      <div v-if="false">{{ params.bannerList }}</div>
      <!-- E::배너 이미지 관리 {{params.bannerList}}-->

      <!-- S::위치 관리 -->
      <C08 title="위치 관리" ref="C08" :list="params.positionList" @update="onUpdatePositionList" v-if="IS_EL_ON" />
      <C08CB title="위치 관리" ref="C08CB" :list="params.positionList" @update="onUpdatePositionList" v-if="IS_CB_ON" />
      <div v-if="false">{{ params.positionList }}</div>
      <!-- E::위치 관리 {{params.positionList}}-->

      <!-- S::오프라인 관리 -->
      <div
        v-if="IS_EL_ON || IS_ATTRACTION_CB_ON"
        class="comm_title_wrap mt45"
      >
        <h4> {{ $t('MSG_TXT_FACILT_OFFLINE_MANAGER') }} </h4>
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
            <ur-radio-wrapper
              v-model="params.vlineWaitYn"
              :items="codes.COD_IA_VLINE_WAIT_YN"
              sm
              :rules="ruleAtleastOne"
              @input="onChangeVlineWaitYn"
            />
          </ur-form-item>
          <!-- ITEM::가상대기그룹-->
          <ur-form-item
            :label="$t('가상대기그룹')"
            :label-align="'right'"
            required
            style="width: 50%; height: 70px;"
            class="flex_wrap"
          >
            <ur-dropdown
              ref="vlineWaitGrpCd"
              v-model="params.vlineWaitGrpCd"
              :items="codes.COD_IA_VLINE_WAIT_GRP"
              placeholder="선택"
              style="width: 100%;"
              :rules="$rules.getRules('not_null')"
              :disabled="VLINE_WAIT_YN_IS_N()"
            />
          </ur-form-item>
          <!-- ITEM::공연 입장 가능-->
          <ur-form-item
            :label="$t('공연 입장 가능')"
            :label-align="'right'"
            style="width: 100%; height: 70px;"
          >
            <ur-text-field
              v-if="IS_CONCERT_ON"
              v-model="params.entrAvailMm"
              mask="number"
              maxlength="3"
              :rules="$rules.getRules('only_numeric')"
            />
            <ur-text-field
              v-if="!IS_CONCERT_ON"
              v-model="params.entrAvailMm"
              mask="number"
              maxlength="3"
              disabled
            />
            {{ $t('분 전부터 입장 가능') }} <span> {{ $t('※ 수정 시, 익일 반영됩니다.') }} </span>
          </ur-form-item>
          <!-- ITEM::입장 유효 간격-->
          <ur-form-item
            :label="$t('입장 유효 간격')"
            :label-align="'right'"
            style="width: 100%; height: 70px;"
          >
            {{ $t('입장 시작') }}
            <ur-text-field
              v-model="params.entrValidStartMm"
              mask="number"
              maxlength="3"
              :rules="$rules.getRules('only_numeric')"
            /> {{ $t('분 전부터') }} {{ $t('입장종료') }}
            <ur-text-field
              v-model="params.entrValidEndMm"
              mask="number"
              maxlength="3"
              :rules="$rules.getRules('only_numeric')"
            /> {{ $t('분 후까지') }}
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
                <span> {{ $t('사전 알림 기준 (탑승시간확정)') }} </span>
              </div>
              <div class="col_item_txtR">
                <!-- 사전 알림 기준 (탑승시간확정) : vlineWaitSettngInfrmBaseMm -->
                <ur-text-field
                  v-model="params.vlineWaitSettngInfrmBaseMm"
                  mask="number"
                  maxlength="3"
                  style="width: 100%;"
                  :rules="$rules.getRules('only_numeric')"
                />
                {{ $t('분') }}
              </div>
            </div>
            <div class="col_item_txt pr10 pb4">
              <div class="col_item_txtL">
                {{ $t('탑승시간간격') }}
              </div>
              <div class="col_item_txtR">
                <!-- 탑승시간간격 : vlineWaitSettngRidingDistaMm -->
                <ur-text-field
                  v-model="params.vlineWaitSettngRidingDistaMm"
                  mask="number"
                  maxlength="3"
                  style="width: 100%;"
                  :rules="$rules.getRules('only_numeric')"
                />
                {{ $t('분') }}
              </div>
            </div>
            <div class="col_item_txt pr10 pb4">
              <div class="col_item_txtL">
                {{ $t('기준 OHRC') }}
              </div>
              <div class="col_item_txtR">
                <!-- 기준 OHRC : vlineWaitSettngBaseOhrc -->
                <ur-text-field
                  v-model="params.vlineWaitSettngBaseOhrc"
                  mask="number"
                  maxlength="5"
                  style="width: 100%;"
                  :rules="$rules.getRules('only_numeric','not_null')"
                />
                {{ $t('명') }}
              </div>
            </div>
            <div class="mb20">
              <!-- 기준 OHRC validation 표시가 짤리는 문제를 해결하기 위해 추가함! div.mb20 지우지 말 것! -->
            </div>
          </ur-form-item>
          <!-- ITEM::키오스크 페이지 -->
          <ur-form-item
            class="flex_wrap"
            :label="$t('키오스크 페이지')"
            required
            :label-align="'right'"
            style="width: 50%; height: 70px;"
          >
            <ur-text-field
              ref="kioskPageNo"
              v-model="params.kioskPageNo"
              mask="number"
              maxlength="2"
              style="width: 100%;"
              :rules="ruleMaxValue12"
              :disabled="VLINE_WAIT_YN_IS_N()"
              @keyup="params.kioskPageNo = parseInt(params.kioskPageNo, 10)"
            />
          </ur-form-item>
          <!-- ITEM::키오스크 스캔코드 -->
          <ur-form-item
            class="flex_wrap"
            :label="$t('키오스크 스캔코드')"
            required
            :label-align="'right'"
            style="width: 50%; height: 70px;"
          >
            <ur-text-field
              ref="kioskScanCode"
              v-model="params.kioskScanCode"
              mask="number"
              maxlength="2"
              style="width: 100%;"
              :rules="ruleMaxValue12"
              :disabled="VLINE_WAIT_YN_IS_N()"
              @keyup="params.kioskScanCode = parseInt(params.kioskScanCode, 10)"
            />
          </ur-form-item>
        </template>
        <!-- ITEM::D/S 노출 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_DS_EXPOSR_YN')"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
        >
          <ur-radio-wrapper
            v-model="params.dsExposrYn"
            :items="[{value: 'Y', text: 'Y'},{value: 'N', text: 'N'}]"
          />
        </ur-form-item>
        <!-- ITEM::대기시간 POPS 시설 -->
        <ur-form-item
          :label="$t('MSG_TXT_WAIT_TIME_POPS_FACILT')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          {{ $t('MSG_TXT_FACIL_CD') }}
          <ur-text-field
            v-model="params.waitTimeFaciltCd"
            readonly
          />
          <ur-icon-button
            icon="search"
            icon-type="line"
            color="primary"
            @click="openFaciltNameCodePopupPOPS"
          />
          {{ $t('MSG_TXT_FACILT_NAME') }}
          <ur-text-field
            v-model="params.waitTimeFaciltName"
            readonly
          />
        </ur-form-item>
        <!-- ITEM::Q-PASS 전광판 시설 -->
        <ur-form-item
          :label="$t('MSG_TXT_QPASS_FACILT')"
          :label-align="'right'"
          style="width: 100%; height: auto; "
        >
          {{ $t('MSG_TXT_FACIL_CD') }}
          <ur-text-field
            v-model="params.qpassDsFaciltCd"
            readonly
          />
          <ur-icon-button
            icon="search"
            icon-type="line"
            color="primary"
            @click="openFaciltNameCodePopupQPASS"
          />
          {{ $t('MSG_TXT_FACILT_NAME') }}
          <ur-text-field
            v-model="params.qpassDsFaciltName"
            readonly
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E::오프라인 관리 -->

      <!-- S::시설 사용 POS 관리 -->
      <C11
        v-if="IS_EL_ON || IS_ATTRACTION_CB_ON"
        ref="C11"
        title="시설 사용 POS 관리"
        :page-id="contextPageId"
        :list="params.posList"
        :park-kind-cd="params.parkKindCd"
        @update="onUpdatePosList"
      />
      <div v-if="false">{{ params.posList }}</div>
      <!-- E::시설 사용 POS 관리 {{params.posList}}-->

      <!-- S::POS 시설 코드 관리 -->
      <C15
        v-if="IS_EL_ON || IS_ATTRACTION_CB_ON"
        ref="C15"
        title="POS 시설 코드 관리"
        :page-id="contextPageId"
        :list="params.facilList"
        @update="onUpdateFacilList"
      />
      <div v-if="false">{{ params.facilList }}</div>
      <!-- E::POS 시설 코드  {{params.facilList}}-->

      <!-- S:: 시설명/코드 조회 POPUP -->
      <FACIL_POPUP
        ref="faciltNameCodePopup"
        :page-id="contextPageId"
        @update="onUpdateFaciltNameCode"
      />
      <!-- E:: 시설명/코드 조회 POPUP -->

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
              v-permission:create="$options.name"
              color="violet"
              @click="onSave"
            >
              {{ $t('MSG_BTN_SAVE') }}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

import BasePage from '~cm/components/BasePage'
import C01 from './components/PGE_AAB_00002_C01.vue' // 제한사항 아이콘 관리
import C01CB from './components/PGE_AAB_00002_C14.vue' // 제한사항 아이콘 관리 CB
import C02 from './components/PGE_AAB_00002_C02.vue' // 키워드 관리
import C03 from './components/PGE_AAB_00002_C03.vue' // 이용 안내
import C04 from './components/PGE_AAB_00002_C04.vue' // 연관 콘텐츠 관리
import C05 from './components/PGE_AAB_00002_C05.vue' // 연관 상품 관리
import C06 from './components/PGE_AAB_00002_C06.vue' // 유의사항
import C07 from './components/PGE_AAB_00002_C07.vue' // 배너 이미지 관리
import C08 from './components/PGE_AAB_00002_C08.vue' // 위치 관리
import C08CB from './components/PGE_AAB_00002_C13.vue' // 위치 관리 CB
import C09 from './components/PGE_AAB_00002_C09.vue' // 동물 관리
import C10 from './components/PGE_AAB_00002_C10.vue' // 대표 메뉴
import C11 from './components/PGE_AAB_00002_C11.vue' // 시설 사용 POS 관리
import C15 from './components/PGE_AAB_00002_C15.vue' // POS 시설 코드 관리
import C12 from './components/PGE_AAB_00002_C12.vue' // 시설 카테고리 관리
import FACIL_POPUP from './components/PGE_AAB_00002_P02.vue' // 시설명/코드 조회 팝업

export default {
  name: 'PGE_AAB_00002', // eslint-disable-line vue/name-property-casing
  components: {
    FACIL_POPUP,
    C01,
    C01CB,
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
    C15,
    C12,
  }, // eslint-disable-line vue/name-property-casing
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
        COD_IA_EXPEDNCY_FACILT_KIND: [],
        COD_IA_CB_EXPEDNCY_FACILT_KIND: [],
        COD_IA_LIMIT1_ITEM: [],
        COD_IA_LIMIT2_ITEM: [],
      },
      foodUseKindList: [], // 사용구분 (only for 시설카테고리 레스토랑)
      foodTypeList: [], // 음식종류 (only for 시설카테고리 레스토랑)
      exposrAppMobilePcKindList: ['app', 'mobile', 'pc'], // APP Mobile PC 의 게시위치 YN을 한번에 표시하기 위한 임시 값 (화면에서만 사용)
      params: {
        // ONLINE
        faciltCateKindCdOne: '',
        faciltCateKindCdTwo: '',
        parkKindCd: '01', // 파크구분, '01' 에버랜드
        zoneKindCd: '', // '01',
        exposrOrder: null, // '1',
        faciltName: '', // '2',
        faciltNameEng: '', // '3',
        faciltDescrt: '', // '4',
        faciltDescrtEng: '', // '5',
        useCondDescrt: '',
        useCondDescrtEng: '',
        perfrmPlayMm: null, // 공연 소요 시간
        exposrYn: 'Y', // 게시여부
        appExposrYn: 'Y', // 게시위치 APP
        mobileExposrYn: 'Y', // 게시위치 Mobile
        pcExposrYn: 'Y', // 게시위치 PC
        foodUseKindCds: '', // foodUseKindList 의 csv 값 ( '01,02' )
        foodTypeCds: '', // foodTypeList 의 csv 값 ( '01,02,03' )
        reservYn: '',
        guardRidingYn: 'Y',
        thumbImagUrl: '',
        // OFFLINE
        vlineWaitYn: 'N',
        vlineWaitGrpCd: '', // 'A',
        entrAvailMm: 0,
        entrValidStartMm: 0,
        entrValidEndMm: 0,
        vlineWaitSettngInfrmBaseMm: 0,
        vlineWaitSettngRidingDistaMm: 0,
        vlineWaitSettngBaseOhrc: 0,
        kioskPageNo: '', // '6',
        kioskScanCode: '', // '7',
        dsExposrYn: 'Y',
        waitTimeFaciltCd: '',
        waitTimeFaciltName: '',
        qpassDsFaciltCd: '',
        qpassDsFaciltName: '',
        // ETC
        faciltCateKindList: [
          /*
          EL
          { faciltCateKindCd: '01' }, // 어트랙션
          { faciltCateKindCd: '02' }, // 공연
          { faciltCateKindCd: '03' }, // 주토피아
          { faciltCateKindCd: '04' }, // 레스토랑
          { faciltCateKindCd: '05' }, // 편의시설
          { faciltCateKindCd: '06' }, // 기프트샾
          { faciltCateKindCd: '07' }, // 포토존

          CB
          { faciltCateKindCd: '01' }, // 어트랙션
          { faciltCateKindCd: '02' }, // 레스토랑
          { faciltCateKindCd: '03' }, // 빌리지
          { faciltCateKindCd: '04' }, // 비치체어
          { faciltCateKindCd: '05' }, // 렌탈/편의시설
          { faciltCateKindCd: '06' }, // 기프트샾
          */
        ],
        iconList: [
          // { uploadKindCd: '01', limitItem1Cd: '03', limitItem2Cd: '03', iconImagUrl: '' },
          // { uploadKindCd: '02', limitItem1Cd: '', limitItem2Cd: '', iconImagUrl: 'iiu' },
        ],
        keywordList: [
          // { keywordDescrt: 'K1', keywordDescrtEng: 'K2' },
          // { keywordDescrt: 'K3', keywordDescrtEng: 'K4' },
        ],
        useGuidDescrtList: [
          // { useGuidDescrt: 'U1', useGuidDescrtEng: 'U2' },
          // { useGuidDescrt: 'U3', useGuidDescrtEng: 'U4' },
        ],
        contentList: [
          // { subjectDescrt: 'C1', subjectDescrtEng: 'C2', contentUrl: 'C3', thumbImagFilename: 'C4' },
          // { subjectDescrt: 'C5', subjectDescrtEng: 'C6', contentUrl: 'C7', thumbImagFilename: 'C8' },
        ],
        productList: [
          // { subjectDescrt: 'P1', subjectDescrtEng: 'P2', contentUrl: 'P3', thumbImagFilename: 'P4' },
          // { subjectDescrt: 'P5', subjectDescrtEng: 'P6', contentUrl: 'P7', thumbImagFilename: 'P8' },
        ],
        noticeList: [
          // { noticeDescrt: 'N1', noticeDescrtEng: 'N2' },
          // { noticeDescrt: 'N3', noticeDescrtEng: 'N4' },
        ],
        bannerList: [
          // { bannerImagFilename: 'B1', bannerImagUrl: 'B2' },
          // { bannerImagFilename: 'B3', bannerImagUrl: 'B4' },
        ],
        positionList: [
          // { latud: 'Position1', lgtud: 'Position2', memoDescrt: 'Position2' },
          // { latud: 'Position4', lgtud: 'Position5', memoDescrt: 'Position6' },
        ],
        animlList: [
          // { animlDescrt: 'A1', animlDescrtEng: 'A2' },
          // { animlDescrt: 'A3', animlDescrtEng: 'A4' },
        ],
        menuList: [
          // { menuDescrt: 'M1', menuDescrtEng: 'M2', menuPrice: 'M3', menuImagFilename: 'M4', menuImagUrl: 'M5' },
          // { menuDescrt: 'M6', menuDescrtEng: 'M6', menuPrice: 'M7', menuImagFilename: 'M8', menuImagUrl: 'M9' },
        ],
        posList: [
          // { posId: 'POS1', posName: 'POS2' },
          // { posId: 'POS3', posName: 'POS4' },
        ],
        facilList: [
          // { facilCd: 'FACIL1', facilNm: 'FACIL2' },
          // { facilCd: 'FACIL3', facilNm: 'FACIL4' },
        ],
      },

      // [체크박스 - 필수항목선택]
      ruleAtleastOne: [
        v => !!v || '',
        v => v.length > 0 || '',
      ],
      ruleMaxValue12: [
        v => !!v || '필수 입력 항목입니다.',
        v => v < 13 || '입력 가능한 최대치 12를 초과하였습니다.',
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    COD_IA_FACILT_FOOD_USE_KIND_GIFTCARD_AND_SOM_ONLY() {
      const GIFTCARD_AND_SOM_ONLY = []
      if (this.codes.COD_IA_FACILT_FOOD_USE_KIND.length > 0) {
        const giftcard = this.codes.COD_IA_FACILT_FOOD_USE_KIND.find(v => v.codeId === '02') // '01' 모바일 , '02' 기프트카드 , '03' 기프트카드
        if (!utils.isEmpty(giftcard)) {
          GIFTCARD_AND_SOM_ONLY.push(giftcard)
        }
        const som = this.codes.COD_IA_FACILT_FOOD_USE_KIND.find(v => v.codeId === '03') // '01' 모바일 , '02' 기프트카드 , '03' 기프트카드
        if (!utils.isEmpty(som)) {
          GIFTCARD_AND_SOM_ONLY.push(som)
        }
      }
      return GIFTCARD_AND_SOM_ONLY
    },
    COD_IA_EL_FACILT_CATE_KIND_ZOOTOPIA_ONLY() {
      const ZOOTOPIA_ONLY = []
      if (this.codes.COD_IA_EL_FACILT_CATE_KIND.length > 0) {
        const zootopia = this.codes.COD_IA_EL_FACILT_CATE_KIND.find(v => v.codeId === '03') // '03' 주토피아
        if (!utils.isEmpty(zootopia)) {
          ZOOTOPIA_ONLY.push(zootopia)
        }
      }
      return ZOOTOPIA_ONLY
    },
    COD_IA_FACILT_CATE_KIND() {
      if (this.params.parkKindCd === '02') return this.codes.COD_IA_CB_FACILT_CATE_KIND
      return this.codes.COD_IA_EL_FACILT_CATE_KIND
    },
    COD_IA_ZONE_KIND() {
      if (this.params.parkKindCd === '02') return this.codes.COD_IA_CB_ZONE_KIND // '02' 캐리비안베이
      return this.codes.COD_IA_EL_ZONE_KIND // 파크 구분 '01' 에버랜드
    },
    COD_IA_EXPEDNCY_FACILT_KIND() {
      if (this.params.parkKindCd === '02') return this.codes.COD_IA_CB_EXPEDNCY_FACILT_KIND // '02' 캐리비안베이
      return this.codes.COD_IA_EXPEDNCY_FACILT_KIND // 파크 구분 '01' 에버랜드
    },
    IS_ATTRACTION_ON() {
      return (this.params.faciltCateKindList.filter(v => v.faciltCateKindCd === '01').length > 0 && this.params.parkKindCd === '01')
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
    IS_AMENITY_ON() {
      return (this.params.faciltCateKindList.filter(v => v.faciltCateKindCd === '05').length > 0 && this.params.parkKindCd === '01')
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
    IS_ATTRACTION_CB_ON() {
      return (this.params.faciltCateKindList.filter(v => v.faciltCateKindCd === '01').length > 0 && this.params.parkKindCd === '02')
      // 어트랙션: EL '01' , CB '01'
    },
    IS_RESTAURANT_CB_ON() {
      return (this.params.faciltCateKindList.filter(v => v.faciltCateKindCd === '02').length > 0 && this.params.parkKindCd === '02')
      // RESTAURANT: EL '04' , CB '02'
    },
    IS_VILLAGE_ON() {
      return (this.params.faciltCateKindList.filter(v => v.faciltCateKindCd === '03').length > 0 && this.params.parkKindCd === '02')
      // 빌리지: CB '03'
    },
    IS_BEACHCHAIR_ON() {
      return (this.params.faciltCateKindList.filter(v => v.faciltCateKindCd === '04').length > 0 && this.params.parkKindCd === '02')
      // 비치제어: CB '04'
    },
    IS_AMENITY_CB_ON() {
      return (this.params.faciltCateKindList.filter(v => v.faciltCateKindCd === '05').length > 0 && this.params.parkKindCd === '02')
      // 편의시설: EL '05' , CB '05'
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
    faciltNameCodePopup() {
      return this.$refs.faciltNameCodePopup
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
    params() {
      console.log('watch params', this.params)

      if (!this.params.faciltCateKindList) {
        this.params.faciltCateKindList = []
      }

      // 시설 카테고리 1,2
      if (this.params.faciltCateKindList && this.params.faciltCateKindList.length > 0) {
        this.params.faciltCateKindCdOne = this.params.faciltCateKindList[0].faciltCateKindCd
        this.params.faciltCateKindCdTwo = ''
      }
      if (this.params.faciltCateKindList && this.params.faciltCateKindList.length > 1) {
        this.params.faciltCateKindCdTwo = this.params.faciltCateKindList[1].faciltCateKindCd
      }

      // 사용구분
      if (!utils.isEmpty(this.params.foodUseKindCds)) {
        this.foodUseKindList = this.params.foodUseKindCds.split(',')
      } else {
        this.foodUseKindList = []
      }

      if (!utils.isEmpty(this.params.foodTypeCds)) {
        this.foodTypeList = this.params.foodTypeCds.split(',')
      } else {
        this.foodTypeList = []
      }

      this.$nextTick(() => {
      // 그리드형 컴포넌트 업데이트
        if (!utils.isEmpty(this.$refs.C01)) {
          this.$refs.C01.update(this.params.iconList)
        }
        if (!utils.isEmpty(this.$refs.C01CB)) {
          this.$refs.C01CB.update(this.params.iconList)
        }
        if (!utils.isEmpty(this.$refs.C02)) {
          this.$refs.C02.update(this.params.keywordList)
        }
        if (!utils.isEmpty(this.$refs.C03)) {
          this.$refs.C03.update(this.params.useGuidDescrtList)
        }
        if (!utils.isEmpty(this.$refs.C04)) {
          this.$refs.C04.update(this.params.contentList)
        }
        if (!utils.isEmpty(this.$refs.C05)) {
          this.$refs.C05.update(this.params.productList)
        }
        if (!utils.isEmpty(this.$refs.C05)) {
          this.$refs.C06.update(this.params.noticeList)
        }
        if (!utils.isEmpty(this.$refs.C05)) {
          this.$refs.C07.update(this.params.bannerList)
        }
        if (!utils.isEmpty(this.$refs.C08)) {
          this.$refs.C08.update(this.params.positionList)
        }
        if (!utils.isEmpty(this.$refs.C08CB)) {
          this.$refs.C08CB.update(this.params.positionList)
        }
        if (!utils.isEmpty(this.$refs.C09)) {
          this.$refs.C09.update(this.params.animlList)
        }
        if (!utils.isEmpty(this.$refs.C10)) {
          this.$refs.C10.update(this.params.menuList)
        }
        if (!utils.isEmpty(this.$refs.C11)) {
          this.$refs.C11.update(this.params.posList)
        }
        if (!utils.isEmpty(this.$refs.C15)) {
          this.$refs.C15.update(this.params.facilList)
        }
      })
    },
  },
  created() {
    http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)

    // console.log(this.$options.name, 'created, $route.query:', this.$route.query)
    // const query = { ...this.$route.query }
    console.log(this.$options.name, 'created, utils.getParameter:', utils.getParameter(this, 'params'))
    const query = { ...utils.getParameter(this, 'params') }

    this.params.parkKindCd = query.parkKindCd

    if (this.$options.name === 'PGE_AAB_00004') {
      if (utils.isEmpty(query)) {
        utils.messageBox('warning', this.$t('상세정보를 조회 할 수 없습니다.'))
        return
      }

      if (utils.isEmpty(query.currentFaciltId)) {
        utils.messageBox('warning', this.$t('상세정보를 조회 할 수 없습니다.'))
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

        // 위치관리 조회 시 xCoordinate 와 yCoordinate 가 xcoordinate 와 ycoordinate 로 조회 됨..
        // 서버 VO에는 이상 없으나 카멜케이스-처리가 취소 되어 내려옴.. 이유 모름.. 없으면 강제로 만들어 준다.
        if (!utils.isEmpty(params.positionList)) {
          params.positionList.forEach(el => {
            if (utils.isEmpty(el.xCoordinate) && !utils.isEmpty(el.xcoordinate)) {
              el.xCoordinate = el.xcoordinate
            }
            if (utils.isEmpty(el.yCoordinate) && !utils.isEmpty(el.ycoordinate)) {
              el.yCoordinate = el.ycoordinate
            }
          })
        }

        // 게시위치 표시
        this.exposrAppMobilePcKindList = []
        if (params.appExposrYn === 'Y') {
          this.exposrAppMobilePcKindList.push('app')
        }
        if (params.mobileExposrYn === 'Y') {
          this.exposrAppMobilePcKindList.push('mobile')
        }
        if (params.pcExposrYn === 'Y') {
          this.exposrAppMobilePcKindList.push('pc')
        }

        this.params = params
      }).catch(error => {
        console.log(error)
      })
      console.log('REQ END')
    } else if (this.$options.name === 'PGE_AAB_00002') {
      this.params.faciltCateKindList = [
        { faciltCateKindCd: '01' }, // 어트랙션
      ]
      this.params = { ...this.params }
    }
  },
  mounted() {
    console.log('mounted', this.params, this.codes)
    if (utils.isEmpty(this.params.parkKindCd)) {
      utils.messageBox('warning', this.$t('파크구분(EL,CB) 정보가 없습니다. 목록으로 이동 합니다.'))
      this.goToList()
    }
  },
  methods: {
    openFaciltNameCodePopupPOPS() { this.faciltNameCodePopup.open({ caller: 'POPS' }) },
    openFaciltNameCodePopupQPASS() { this.faciltNameCodePopup.open({ caller: 'QPASS' }) },
    closed() {},
    validated() {
      // 파크구분 정보
      if (this.params.parkKindCd !== '01' && this.params.parkKindCd !== '02') {
        utils.messageBox('warning', this.$t('파크구분 정보가 없습니다. (EL,CB)'))
        return false
      }

      // 필수항목
      if (!this.$rules.validate(this)) {
        utils.messageBox('warning', this.$t('필수 항목이 입력되지 않았습니다.'))
        return false
      }

      // 온라인 관리
      if (this.params.appExposrYn === 'N' && this.params.mobileExposrYn === 'N' && this.params.pcExposrYn === 'N') {
        utils.messageBox('warning', this.$t('게시위치는 최소 한 개 이상 선택해야 합니다.'))
        return false
      }

      /*
      if (utils.isEmpty(this.params.faciltDescrt)) {
        utils.messageBox('warning', this.$t('시설설명 (국문)을 입력해 주세요.'))
        return false
      }

      if (utils.isEmpty(this.params.faciltDescrtEng)) {
        utils.messageBox('warning', this.$t('시설설명 (영문)을 입력해 주세요.'))
        return false
      }
      */

      let RegExpHasKo = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/ // 정규식 구문
      let RegExpHasEn = /[a-zA-Z]/ // 정규식 구문

      // 시설명
      let KO = this.params.faciltName
      let EN = this.params.faciltNameEng
      /* 20230712 시설명을 제한없이 자유롭게 입력할 수 있도록 수정
      if (!utils.isEmpty(KO) && !RegExpHasKo.test(KO)) {
        utils.messageBox('warning', this.$t('시설명(국문)에 한글이 포함되어 있지 않습니다.'))
        return false
      }
      if (!utils.isEmpty(EN) && !RegExpHasEn.test(EN)) {
        utils.messageBox('warning', this.$t('시설명(영문)에 영문이 포함되어 있지 않습니다.'))
        return false
      }
      */
      // 시설 설명
      KO = this.params.faciltDescrt
      EN = this.params.faciltDescrtEng
      /* 20230712 시설 설명을 제한없이 자유롭게 입력할 수 있도록 수정
      if (!utils.isEmpty(KO) && !RegExpHasKo.test(KO)) {
        utils.messageBox('warning', this.$t('시설 설명(국문)에 한글이 포함되어 있지 않습니다.'))
        return false
      }
      if (!utils.isEmpty(EN) && !RegExpHasEn.test(EN)) {
        utils.messageBox('warning', this.$t('시설 설명(영문)에 영문이 포함되어 있지 않습니다.'))
        return false
      }
      */
      // 이용조건
      KO = this.params.useCondDescrt
      EN = this.params.useCondDescrtEng
      /* 20230712 이용조건을 제한없이 자유롭게 입력할 수 있도록 수정
      if (!utils.isEmpty(KO) && !RegExpHasKo.test(KO)) {
        utils.messageBox('warning', this.$t('이용조건(국문)에 한글이 포함되어 있지 않습니다.'))
        return false
      }
      if (!utils.isEmpty(EN) && !RegExpHasEn.test(EN)) {
        utils.messageBox('warning', this.$t('이용조건(영문)에 영문이 포함되어 있지 않습니다.'))
        return false
      }
      */

      if (this.IS_ATTRACTION_ON || this.IS_ATTRACTION_CB_ON) {
        if (!utils.isEmpty(this.params.heightLimitStartRange)
          && !utils.isEmpty(this.params.heightLimitEndRange)
          && parseInt(this.params.heightLimitStartRange, 10) > parseInt(this.params.heightLimitEndRange, 10)
        ) {
          utils.messageBox('warning', this.$t('신장 제한 입력값이 올바르지 않습니다.'))
          return false
        }
      }

      if (this.IS_CONCERT_ON && utils.isEmpty(this.params.perfrmPlayMm)) {
        utils.messageBox('warning', this.$t('관람소요 시간을 입력해 주세요.'))
        return false
      }

      if (this.IS_RESTAURANT_ON && this.foodTypeList.length === 0) {
        utils.messageBox('warning', this.$t('음식종류를 최소한 한 개 이상 선택해 주세요.'))
        return false
      }

      if (this.IS_AMENITY_ON || this.IS_AMENITY_CB_ON || this.IS_PHOTOZONE_EL_ON) {
        if (utils.isEmpty(this.params.reservYn)) {
          utils.messageBox('warning', this.$t('스마트 예약 여부를 선택해 주세요.'))
          return false
        }
        if (this.params.reservYn === 'Y' && utils.isEmpty(this.params.reservConnUrl)) {
          utils.messageBox('warning', this.$t('연결 URL을 입력해 주세요.'))
          return false
        }
      }

      if (this.IS_AMENITY_ON || this.IS_AMENITY_CB_ON) {
        if (utils.isEmpty(this.params.expedncyFaciltKindCd)) {
          utils.messageBox('warning', this.$t('편의시설 구분을 선택해 주세요.'))
          return false
        }
      }

      // [필수처리] 카테고리 관리
      if (this.params.faciltCateKindList.length === 0) {
        utils.messageBox('warning', this.$t('시설 카테고리를 선택해 주세요'))
        return false
      }

      if (this.IS_ATTRACTION_ON || this.IS_ATTRACTION_CB_ON) {
        // [필수처리] 제한사항 아이콘 관리
        /* 필수제외 요청 받음 , 20230912
        if (this.params.iconList.length === 0) {
          utils.messageBox('warning', this.$t('제한사항 아이콘을 추가해 주세요'))
          return false
        }
        */
        // [제한사항 아이콘] 값이 선택되지 않은 제한사항 아이콘 관리 항목 체크
        if (this.params.iconList.filter(element => {
          if (element.uploadKindCd === '01') {
            if (utils.isEmpty(element.limitItem1Cd) || utils.isEmpty(element.limitItem2Cd)) {
              return true
            }
          }
          return false
        }).length > 0) {
          utils.messageBox('warning', this.$t('값이 선택되지 않은 제한사항 아이콘 관리 항목이 있습니다.'))
          return false
        }
      }

      // [필수처리] 키워드 관리
      if (this.params.keywordList.length === 0) {
        utils.messageBox('warning', this.$t('키워드를 추가해 주세요'))
        return false
      }
      // [키워드] 값이 입력되지 않은 키워드 항목 체크
      if (this.params.keywordList.filter(element => {
        if (utils.isEmpty(element.keywordDescrt) && utils.isEmpty(element.keywordDescrtEng)) {
          return true
        }
        return false
      }).length > 0) {
        utils.messageBox('warning', this.$t('키워드 국문 또는 영문 중 반드시 한 개는 입력되어야 합니다.'))
        return false
      }
      // [키워드] 숫자만 포함하고 있는지 체크
      if (this.params.keywordList.filter(el => {
        let RegExp = /^[0-9]+$/ // 정규식 구문

        let KO = el.keywordDescrt
        if (!utils.isEmpty(KO)) {
          KO = KO.replaceAll(' ', '')
        }
        if (RegExp.test(KO)) {
          return true
        }
        let EN = el.keywordDescrtEng
        if (!utils.isEmpty(EN)) {
          EN = EN.replaceAll(' ', '')
        }
        if (RegExp.test(EN)) {
          return true
        }
        return false
      }).length > 0) {
        utils.messageBox('warning', this.$t('숫자만으로 입력된 키워드가 있습니다.'))
        return false
      }
      // [키워드] 한글 키워드에 한글없는 키워드를 입력했는지 체크
      if (this.params.keywordList.filter(el => {
        let RegExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/ // 정규식 구문

        const KO = el.keywordDescrt
        if (!utils.isEmpty(KO) && !RegExp.test(KO)) {
          return true
        }

        return false
      }).length > 0) {
        utils.messageBox('warning', this.$t('한글이 포함되지 않은 국문 키워드가 있습니다.'))
        return false
      }
      // [키워드] 영문 키워드에 영문없는 키워드를 입력했는지 체크
      if (this.params.keywordList.filter(el => {
        let RegExp = /[a-zA-Z]/ // 정규식 구문

        const EN = el.keywordDescrtEng
        if (!utils.isEmpty(EN) && !RegExp.test(EN)) {
          return true
        }

        return false
      }).length > 0) {
        utils.messageBox('warning', this.$t('영문이 포함되지 않은 영문 키워드가 있습니다.'))
        return false
      }
      // [키워드] 중복 데이터 확인
      if (this.params.keywordList.filter(element => {
        const KWKO = element.keywordDescrt
        const KWEN = element.keywordDescrtEng

        if (!utils.isEmpty(KWKO)) {
          if (this.params.keywordList.filter(el => {
            if (el.keywordDescrt === KWKO) {
              return true
            }
            return false
          }).length > 1) {
            return true
          }
        }

        if (!utils.isEmpty(KWEN)) {
          if (this.params.keywordList.filter(el => {
            if (el.keywordDescrtEng === KWEN) {
              return true
            }
            return false
          }).length > 1) {
            return true
          }
        }

        return false
      }).length > 0) {
        utils.messageBox('warning', this.$t('키워드가 중복 입력되었습니다.'))
        return false
      }

      // START:: 편의시설(EL,CB) 포토존(EL) 빌리지(CB) 비치체어(CB) 의 상세 관리 사항 대부분을
      //         설정하지 않도록 되어 있으므로 validation 도 필요 없다.
      if (!this.IS_AMENITY_ON && !this.IS_AMENITY_CB_ON && !this.IS_PHOTOZONE_EL_ON && !this.IS_VILLAGE_ON && !this.IS_BEACHCHAIR_ON) {
        // [이용안내] 값이 입력되지 않은 이용안내 항목 체크
        if (this.params.useGuidDescrtList.filter(element => {
          if (utils.isEmpty(element.useGuidDescrt) && utils.isEmpty(element.useGuidDescrtEng)) {
            return true
          }
          return false
        }).length > 0) {
          utils.messageBox('warning', this.$t('이용안내 국문 또는 영문 중 반드시 한 개는 입력되어야 합니다.'))
          return false
        }
        // [이용안내] 숫자만 포함하고 있는지 체크
        if (this.params.useGuidDescrtList.filter(el => {
          let RegExp = /^[0-9]+$/ // 정규식 구문

          let KO = el.useGuidDescrt
          if (!utils.isEmpty(KO)) {
            KO = KO.replaceAll(' ', '')
          }
          if (RegExp.test(KO)) {
            return true
          }
          let EN = el.useGuidDescrtEng
          if (!utils.isEmpty(EN)) {
            EN = EN.replaceAll(' ', '')
          }
          if (RegExp.test(EN)) {
            return true
          }

          return false
        }).length > 0) {
          utils.messageBox('warning', this.$t('이용안내(국문 또는 영문)에 숫자만으로 입력된 항목이 있습니다.'))
          return false
        }
        // [이용안내] 한글 이용안내에 한글이 없는지 체크
        if (this.params.useGuidDescrtList.filter(el => {
          let RegExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/ // 정규식 구문

          const KO = el.useGuidDescrt
          if (!utils.isEmpty(KO) && !RegExp.test(KO)) {
            return true
          }

          return false
        }).length > 0) {
          utils.messageBox('warning', this.$t('한글이 포함되지 않은 이용안내(국문)이 있습니다.'))
          return false
        }
        // [이용안내] 영문 이용안내에 영문이 없는지 체크
        if (this.params.useGuidDescrtList.filter(el => {
          let RegExp = /[a-zA-Z]/ // 정규식 구문

          const EN = el.useGuidDescrtEng
          if (!utils.isEmpty(EN) && !RegExp.test(EN)) {
            return true
          }

          return false
        }).length > 0) {
          utils.messageBox('warning', this.$t('영문이 포함되지 않은 이용안내(영문)이 있습니다.'))
          return false
        }

        if (this.IS_ZOOTOPIA_ON) {
          // [동물관리] 값이 입력되지 않은 동물 관리 항목 체크
          if (this.params.animlList.filter(element => {
            if (utils.isEmpty(element.animlDescrt) && utils.isEmpty(element.animlDescrtEng)) {
              return true
            }
            return false
          }).length > 0) {
            utils.messageBox('warning', this.$t('동물명 국문 또는 영문 중 반드시 한 개는 입력되어야 합니다.'))
            return false
          }
          // [동물관리] 숫자만 포함하고 있는지 체크
          if (this.params.animlList.filter(el => {
            let RegExp = /^[0-9]+$/ // 정규식 구문

            let KO = el.animlDescrt
            if (!utils.isEmpty(KO)) {
              KO = KO.replaceAll(' ', '')
            }
            if (RegExp.test(KO)) {
              return true
            }
            let EN = el.animlDescrtEng
            if (!utils.isEmpty(EN)) {
              EN = EN.replaceAll(' ', '')
            }
            if (RegExp.test(EN)) {
              return true
            }

            return false
          }).length > 0) {
            utils.messageBox('warning', this.$t('동물명(국문 또는 영문)에 숫자만으로 입력된 항목이 있습니다.'))
            return false
          }
          // [동물관리] 한글 동물명에 한글이 없는지 체크
          if (this.params.animlList.filter(el => {
            let RegExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/ // 정규식 구문

            const KO = el.animlDescrt
            if (!utils.isEmpty(KO) && !RegExp.test(KO)) {
              return true
            }

            return false
          }).length > 0) {
            utils.messageBox('warning', this.$t('한글이 포함되지 않은 동물명(국문)이 있습니다.'))
            return false
          }
          // [동물관리] 영문 동물명에 영문이 없는지 체크
          if (this.params.animlList.filter(el => {
            let RegExp = /[a-zA-Z]/ // 정규식 구문

            const EN = el.animlDescrtEng
            if (!utils.isEmpty(EN) && !RegExp.test(EN)) {
              return true
            }

            return false
          }).length > 0) {
            utils.messageBox('warning', this.$t('영문이 포함되지 않은 동물명(영문)이 있습니다.'))
            return false
          }
        }

        if (this.IS_RESTAURANT_ON || this.IS_RESTAURANT_CB_ON) {
          // [대표메뉴] 값이 입력되지 않은 대표 메뉴 항목 체크
          if (this.params.menuList.filter(element => {
            if (utils.isEmpty(element.menuDescrt) && utils.isEmpty(element.menuDescrtEng)) {
              return true
            }
            if (utils.isEmpty(element.menuPrice)) {
              element.menuPrice = null // 메뉴가격은 DB에서 숫자로 저장되므로 오류가 발생하지 않도록 널스트링 '' 은 null 로 바꿔준다
            }
            return false
          }).length > 0) {
            utils.messageBox('warning', this.$t('대표 메뉴의 메뉴명(국문 또는 영문)은 반드시 입력되어야 합니다.'))
            return false
          }
          // [대표메뉴] 숫자만 포함하고 있는지 체크
          if (this.params.menuList.filter(el => {
            let RegExp = /^[0-9]+$/ // 정규식 구문

            let KO = el.menuDescrt
            if (!utils.isEmpty(KO)) {
              KO = KO.replaceAll(' ', '')
            }
            if (RegExp.test(KO)) {
              return true
            }
            let EN = el.menuDescrtEng
            if (!utils.isEmpty(EN)) {
              EN = EN.replaceAll(' ', '')
            }
            if (RegExp.test(EN)) {
              return true
            }

            return false
          }).length > 0) {
            utils.messageBox('warning', this.$t('메뉴명(국문 또는 영문)에 숫자만으로 입력된 대표 메뉴가 있습니다.'))
            return false
          }
          // [대표메뉴] 한글 메뉴명에 한글이 없는지 체크
          if (this.params.menuList.filter(el => {
            let RegExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/ // 정규식 구문

            const KO = el.menuDescrt
            if (!utils.isEmpty(KO) && !RegExp.test(KO)) {
              return true
            }

            return false
          }).length > 0) {
            utils.messageBox('warning', this.$t('한글이 포함되지 않은 메뉴명(국문)이 있습니다.'))
            return false
          }
          // [대표메뉴] 영문 메뉴명에 영문이 없는지 체크
          if (this.params.menuList.filter(el => {
            let RegExp = /[a-zA-Z]/ // 정규식 구문

            const EN = el.menuDescrtEng
            if (!utils.isEmpty(EN) && !RegExp.test(EN)) {
              return true
            }

            return false
          }).length > 0) {
            utils.messageBox('warning', this.$t('영문이 포함되지 않은 메뉴명(영문)이 있습니다.'))
            return false
          }
        }

        // <!-- E::연관 콘텐츠 관리 {{params.contentList}}-->
        if (this.params.contentList.filter(element => {
          if (utils.isEmpty(element.subjectDescrt) && utils.isEmpty(element.subjectDescrtEng)) {
            return true
          }
          if (utils.isEmpty(element.contentUrl)) {
            return true
          }
          return false
        }).length > 0) {
          utils.messageBox('warning', this.$t('연관 콘텐츠 제목(국문) 또는 제목(영문) 중 한 개와 콘텐츠URL은 반드시 입력되어야 합니다.'))
          return false
        }
        // [연관 콘텐츠] 숫자만 포함하고 있는지 체크
        if (this.params.contentList.filter(el => {
          let RegExp = /^[0-9]+$/ // 정규식 구문

          let SUBKO = el.subjectDescrt
          if (!utils.isEmpty(SUBKO)) {
            SUBKO = SUBKO.replaceAll(' ', '')
          }
          if (RegExp.test(SUBKO)) {
            return true
          }
          let SUBEN = el.subjectDescrtEng
          if (!utils.isEmpty(SUBEN)) {
            SUBEN = SUBEN.replaceAll(' ', '')
          }
          if (RegExp.test(SUBEN)) {
            return true
          }
          let URL = el.contentUrl
          if (!utils.isEmpty(URL)) {
            URL = URL.replaceAll(' ', '')
          }
          if (RegExp.test(URL)) {
            return true
          }
          return false
        }).length > 0) {
          utils.messageBox('warning', this.$t('제목 또는 URL에 숫자만으로 입력된 연관 콘텐츠가 있습니다.'))
          return false
        }
        // [연관 콘텐츠] 한글 제목에 한글이 없는지 체크
        if (this.params.contentList.filter(el => {
          let RegExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/ // 정규식 구문

          const KO = el.subjectDescrt
          if (!utils.isEmpty(KO) && !RegExp.test(KO)) {
            return true
          }

          return false
        }).length > 0) {
          utils.messageBox('warning', this.$t('한글이 포함되지 않은 연관 콘텐츠 제목(국문)이 있습니다.'))
          return false
        }
        // [연관 콘텐츠] 영문 제목에 영문이 없는지 체크
        if (this.params.contentList.filter(el => {
          let RegExp = /[a-zA-Z]/ // 정규식 구문

          const EN = el.subjectDescrtEng
          if (!utils.isEmpty(EN) && !RegExp.test(EN)) {
            return true
          }

          return false
        }).length > 0) {
          utils.messageBox('warning', this.$t('영문이 포함되지 않은 연관 콘텐츠 제목(영문)이 있습니다.'))
          return false
        }
        // [연관 콘텐츠] 썸네일 체크
        if (this.params.contentList.filter(element => {
          if (utils.isEmpty(element.thumbImagUrl)) {
            return true
          }
          return false
        }).length > 0) {
          utils.messageBox('warning', this.$t('연관 콘텐츠 썸네일 이미지가 지정되지 않은 항목이 있습니다.'))
          return false
        }
        // <!-- E::연관 상품 관리 {{params.productList}}-->
        if (this.params.productList.filter(element => {
          if (utils.isEmpty(element.subjectDescrt) && utils.isEmpty(element.subjectDescrtEng)) {
            return true
          }
          if (utils.isEmpty(element.contentUrl)) {
            return true
          }
          return false
        }).length > 0) {
          utils.messageBox('warning', this.$t('연관 상품 제목(국문) 또는 제목(영문) 중 한 개와 콘텐츠URL은 반드시 입력되어야 합니다.'))
          return false
        }
        // [연관 상품] 숫자만 포함하고 있는지 체크
        if (this.params.productList.filter(el => {
          let RegExp = /^[0-9]+$/ // 정규식 구문

          let SUBKO = el.subjectDescrt
          if (!utils.isEmpty(SUBKO)) {
            SUBKO = SUBKO.replaceAll(' ', '')
          }
          if (RegExp.test(SUBKO)) {
            return true
          }
          let SUBEN = el.subjectDescrtEng
          if (!utils.isEmpty(SUBEN)) {
            SUBEN = SUBEN.replaceAll(' ', '')
          }
          if (RegExp.test(SUBEN)) {
            return true
          }
          let URL = el.contentUrl
          if (!utils.isEmpty(URL)) {
            URL = URL.replaceAll(' ', '')
          }
          if (RegExp.test(URL)) {
            return true
          }
          return false
        }).length > 0) {
          utils.messageBox('warning', this.$t('제목 또는 URL에 숫자만으로 입력된 연관 상품이 있습니다.'))
          return false
        }
        // [연관 상품] 한글 제목에 한글이 없는지 체크
        if (this.params.productList.filter(el => {
          let RegExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/ // 정규식 구문

          const KO = el.subjectDescrt
          if (!utils.isEmpty(KO) && !RegExp.test(KO)) {
            return true
          }

          return false
        }).length > 0) {
          utils.messageBox('warning', this.$t('한글이 포함되지 않은 연관 상품 제목(국문)이 있습니다.'))
          return false
        }
        // [연관 상품] 영문 제목에 영문이 없는지 체크
        if (this.params.productList.filter(el => {
          let RegExp = /[a-zA-Z]/ // 정규식 구문

          const EN = el.subjectDescrtEng
          if (!utils.isEmpty(EN) && !RegExp.test(EN)) {
            return true
          }

          return false
        }).length > 0) {
          utils.messageBox('warning', this.$t('영문이 포함되지 않은 연관 상품 제목(영문)이 있습니다.'))
          return false
        }
        // [연관 상품] 썸네일 체크
        if (this.params.productList.filter(element => {
          if (utils.isEmpty(element.thumbImagUrl)) {
            return true
          }
          return false
        }).length > 0) {
          utils.messageBox('warning', this.$t('연관 상품 썸네일 이미지가 지정되지 않은 항목이 있습니다.'))
          return false
        }

        // [유의사항] 값이 입력되지 않은 유의사항 항목 체크
        if (this.params.noticeList.filter(element => {
          if (utils.isEmpty(element.noticeDescrt) && utils.isEmpty(element.noticeDescrtEng)) {
            return true
          }
          return false
        }).length > 0) {
          utils.messageBox('warning', this.$t('유의사항 국문 또는 영문 중 반드시 한 개는 입력되어야 합니다.'))
          return false
        }
      }
      // END:: 편의시설(EL,CB) 포토존(EL) 빌리지(CB) 비치체어(CB) 의 상세 관리 사항 대부분을
      //       설정하지 않도록 되어 있으므로 validation 도 필요 없다.

      // 20231110 배너이미지는 모든 카테고리에서 필수 입력 사항으로 변경 됨
      // [필수처리] 배너이미지 관리 // 이미지가 입력되지 않은 배너관리 항목 체크
      if (this.params.bannerList.length === 0) {
        utils.messageBox('warning', this.$t('배너 이미지를 추가해 주세요.'))
        return false
      }

      // [위치] 위도 경도가 입력되지 않은 위치관리 항목 체크
      if (this.params.positionList.filter(element => {
        if (utils.isEmpty(element.latud) || utils.isEmpty(element.lgtud)) {
          return true
        }
        return false
      }).length > 0) {
        utils.messageBox('warning', this.$t('위치 등록 시 위도 및 경도는 반드시 입력되어야 합니다.'))
        return false
      }
      // [위치CB] 실내외구분, 실내층수가 입력되지 않은 위치관리 항목 체크
      if (this.IS_CB_ON) {
        // [위치] 실내외 구분이 입력되지 않은 위치관리 항목 체크
        if (this.params.positionList.filter(element => {
          if (utils.isEmpty(element.insideYn)) {
            return true
          }
          return false
        }).length > 0) {
          utils.messageBox('warning', this.$t('실내외 구분이 선택되지 않은 항목이 있습니다.'))
          return false
        }
        // [위치] 실내층수가 입력되지 않은 위치관리 항목 체크
        if (this.params.positionList.filter(element => {
          if (element.insideYn === 'Y' && utils.isEmpty(element.insideFloor)) {
            return true
          }
          return false
        }).length > 0) {
          utils.messageBox('warning', this.$t('실내층수가 입력되지 않은 항목이 있습니다.'))
          return false
        }
      }

      // 오프라인 관리

      // 시설사용 POS 관리 및 POS 시설 코드 관리
      if (this.IS_EL_ON || this.IS_ATTRACTION_CB_ON) {
        // [시설POS] POS가 지정되지 않은 시설POS 항목 체크
        if (this.params.posList.filter(element => {
          if (utils.isEmpty(element.posId)) {
            return true
          }
          return false
        }).length > 0) {
          utils.messageBox('warning', this.$t('시설사용 POS ID가 선택되지 않은 항목이 있습니다.'))
          return false
        }
        // [POS시설코드] POS시설이 지정되지 않은 POS코드 항목 체크
        if (this.params.facilList.filter(element => {
          if (utils.isEmpty(element.facilCd)) {
            return true
          }
          return false
        }).length > 0) {
          utils.messageBox('warning', this.$t('POS 시설 코드가 선택되지 않은 항목이 있습니다.'))
          return false
        }
      }

      return true
    },
    async onSave() {
      // console.log('onSave::params', this.params)

      // 사용구분 리스트 csv 처리
      let list = this.foodUseKindList
      if (!utils.isEmpty(list)) {
        this.params.foodUseKindCds = list.join(',')
      } else {
        this.params.foodUseKindCds = ''
      }
      // 음식종류 리스트 csv 처리
      list = this.foodTypeList
      if (!utils.isEmpty(list)) {
        this.params.foodTypeCds = list.join(',')
      } else {
        this.params.foodTypeCds = ''
      }

      // 게시위치 리스트 개별필드로 맵핑 (DB상 별개 필드)
      if (!utils.isEmpty(this.exposrAppMobilePcKindList.find(v => v === 'app'))) {
        this.params.appExposrYn = 'Y'
      } else {
        this.params.appExposrYn = 'N'
      }
      if (!utils.isEmpty(this.exposrAppMobilePcKindList.find(v => v === 'mobile'))) {
        this.params.mobileExposrYn = 'Y'
      } else {
        this.params.mobileExposrYn = 'N'
      }
      if (!utils.isEmpty(this.exposrAppMobilePcKindList.find(v => v === 'pc'))) {
        this.params.pcExposrYn = 'Y'
      } else {
        this.params.pcExposrYn = 'N'
      }

      // 정수형 값 '' -> null 처리
      /*
        , ''::int            , exposr_order
        , ''::int            , perfrm_play_mm
        , NULL::int            , height_limit_start_range
        , NULL::int            , height_limit_end_range
        , ''::int            , entr_avail_mm
        , ''::int            , entr_valid_start_mm
        , ''::int            , entr_valid_end_mm
        , ''::int            , vline_wait_settng_infrm_base_mm
        , ''::int            , vline_wait_settng_riding_dista_mm
        , ''::int            , vline_wait_settng_base_ohrc
      */
      if (utils.isEmpty(this.params.exposrOrder)) {
        this.params.exposrOrder = null
      }
      if (utils.isEmpty(this.params.perfrmPlayMm)) {
        this.params.perfrmPlayMm = null
      }
      if (utils.isEmpty(this.params.heightLimitStartRange)) {
        this.params.heightLimitStartRange = null
      }
      if (utils.isEmpty(this.params.heightLimitEndRange)) {
        this.params.heightLimitEndRange = null
      }
      if (utils.isEmpty(this.params.entrAvailMm)) {
        this.params.entrAvailMm = null
      }
      if (utils.isEmpty(this.params.entrValidStartMm)) {
        this.params.entrValidStartMm = null
      }
      if (utils.isEmpty(this.params.entrValidEndMm)) {
        this.params.entrValidEndMm = null
      }
      if (utils.isEmpty(this.params.vlineWaitSettngInfrmBaseMm)) {
        this.params.vlineWaitSettngInfrmBaseMm = null
      }
      if (utils.isEmpty(this.params.vlineWaitSettngRidingDistaMm)) {
        this.params.vlineWaitSettngRidingDistaMm = null
      }
      if (utils.isEmpty(this.params.vlineWaitSettngBaseOhrc)) {
        this.params.vlineWaitSettngBaseOhrc = null
      }

      if (this.params.kioskPageNo === 0) {
        this.params.kioskPageNo = null
      }
      if (this.params.kioskScanCode === 0) {
        this.params.kioskScanCode = null
      }

      if (this.validated()) {
        utils.messageBox('confirm', this.$t('저장하시겠습니까?'), null, () => { // 저장하시겠습니까?
          console.log('REQ DATA:', this.params)
          const serviceName = 'DTS_AAB_00002'
          http.request(this.contextPageId, serviceName, {
            query: {},
            path: {},
            data: this.params,
          }).then(res => {
            console.log('RES', res.data)
            if (res.data.resultCode === '0') {
              utils.messageBox('warning', res.data.msg)
            } else {
              utils.messageBox('info', this.$t('저장하였습니다.'), null, () => { // 저장하시겠습니까?
                this.goToList()
              })
            }
          }).catch(error => {
            console.log(error)
          })
          console.log('REQ END')
        })
      }
    },
    goToList() {
      // delete params.vocId
      // this.$router.push({ path: '/PGE_AAB_00001', query: this.$route.query })
      const params = utils.getParameter(this, 'params')
      console.log('goToList', params)
      const pageId = params.returnPageId ?? 'PGE_AAB_00001'
      utils.goPage(pageId, { params })
    },
    onUpdateFaciltCateKindList(data) {
      this.params.faciltCateKindList = data.view
      this.params.faciltCateKindListCreated = data.created
      this.params.faciltCateKindListUpdated = data.updated
      this.params.faciltCateKindListRemoved = data.removed
    },
    onUpdateIconList(data) {
      this.params.iconList = data.view
      this.params.iconListCreated = data.created
      this.params.iconListUpdated = data.updated
      this.params.iconListRemoved = data.removed
    },
    onUpdateKeywordList(data) {
      this.params.keywordList = data.view
      this.params.keywordListCreated = data.created
      this.params.keywordListUpdated = data.updated
      this.params.keywordListRemoved = data.removed
    },
    onUpdateUseGuidDescrtList(data) {
      this.params.useGuidDescrtList = data.view
      this.params.useGuidDescrtListCreated = data.created
      this.params.useGuidDescrtListUpdated = data.updated
      this.params.useGuidDescrtListRemoved = data.removed
    },
    onUpdateContentList(data) {
      this.params.contentList = data.view
      this.params.contentListCreated = data.created
      this.params.contentListUpdated = data.updated
      this.params.contentListRemoved = data.removed
    },
    onUpdateProductList(data) {
      this.params.productList = data.view
      this.params.productListCreated = data.created
      this.params.productListUpdated = data.updated
      this.params.productListRemoved = data.removed
    },
    onUpdateNoticeList(data) {
      this.params.noticeList = data.view
      this.params.noticeListCreated = data.created
      this.params.noticeListUpdated = data.updated
      this.params.noticeListRemoved = data.removed
    },
    onUpdateBannerList(data) {
      this.params.bannerList = data.view
      this.params.bannerListCreated = data.created
      this.params.bannerListUpdated = data.updated
      this.params.bannerListRemoved = data.removed
    },
    onUpdatePositionList(data) {
      this.params.positionList = data.view
      this.params.positionListCreated = data.created
      this.params.positionListUpdated = data.updated
      this.params.positionListRemoved = data.removed
    },
    onUpdateAnimlList(data) {
      this.params.animlList = data.view
      this.params.animlListCreated = data.created
      this.params.animlListUpdated = data.updated
      this.params.animlListRemoved = data.removed
    },
    onUpdateMenuList(data) {
      this.params.menuList = data.view
      this.params.menuListCreated = data.created
      this.params.menuListUpdated = data.updated
      this.params.menuListRemoved = data.removed
    },
    onUpdatePosList(data) {
      this.params.posList = data.view
      this.params.posListCreated = data.created
      this.params.posListUpdated = data.updated
      this.params.posListRemoved = data.removed
    },
    onUpdateFacilList(data) {
      this.params.facilList = data.view
      this.params.facilListCreated = data.created
      this.params.facilListUpdated = data.updated
      this.params.facilListRemoved = data.removed
    },
    onUpdateFaciltNameCode(val) {
      if (val.caller === 'POPS') {
        this.params.waitTimeFaciltCd = val.facilCd
        this.params.waitTimeFaciltName = val.facilNm
      } else if (val.caller === 'QPASS') {
        this.params.qpassDsFaciltCd = val.facilCd
        this.params.qpassDsFaciltName = val.facilNm
      }
    },
    onChangeFaciltCateKindCdOne() {
      const faciltCateKindList = []
      if (!utils.isEmpty(this.params.faciltCateKindCdOne)) {
        faciltCateKindList.push({
          seqNo: 1, faciltCateKindCd: this.params.faciltCateKindCdOne,
        })
      }
      // 시설카테고리 변경 시 두번째 카테고리는 초기화 한다!
      this.params.faciltCateKindCdTwo = ''

      /* 시설카테고리 변경 시 온라인 관리에서 카테고리별 가변 부분 전체를 미입력 상태로 초기화 한다! */
      // EL 어트랙션
      this.params.useCondDescrt = '' // 이용조건 설명 (국문)
      this.params.useCondDescrtEng = '' // 이용조건 설명 (영문)
      this.params.guardRidingYn = null // 보호자 탑승 유무
      this.params.heightLimitStartRange = null // 신장제한 From
      this.params.heightLimitEndRange = null // 신장제한 To
      // EL 공연
      this.params.perfrmPlayMm = null // 공연 소요 시간
      // EL 주토피아
      // EL 레스토랑
      this.foodUseKindList = []// 사용구분
      this.foodTypeList = []// 음식종류
      // EL 편의시설
      this.params.reservYn = null // 스마트 예약 여부
      this.params.reservConnUrl = '' // 연결 URL
      // this.params.expedncyFaciltKindCd = null // 편의시설 구분 , 초기화하면 dropbox 가 망가짐.. 일단 주석처리
      // EL 기프트샾
      this.foodUseKindList = [] // 사용구분
      // EL 포토존
      this.params.reservYn = null // 스마트 예약 여부
      this.params.reservConnUrl = '' // 연결 URL

      /* CB 어트랙션 */
      this.params.useCondDescrt = '' // 이용조건 설명 (국문)
      this.params.useCondDescrtEng = '' // 이용조건 설명 (영문)
      this.params.guardRidingYn = null // 보호자 탑승 유무
      this.params.heightLimitStartRange = null // 신장제한 From
      this.params.heightLimitEndRange = null // 신장제한 To
      this.params.weightLimitRange = '' // 체중제한
      this.params.depthLimitRange = '' // 시설수심
      // CB 레스토랑
      this.foodUseKindList = [] // 사용구분
      // CB 빌리지
      // CB 비치체어
      // CB 렌탈/편의시설
      this.params.reservYn = null // 스마트 예약 여부
      this.params.reservConnUrl = '' // 연결 URL
      // this.params.expedncyFaciltKindCd = '' // 편의시설 구분 , 초기화하면 dropbox 가 망가짐.. 일단 주석처리
      // CB 기프트샾
      this.foodUseKindList = [] // 사용구분

      /* 시설카테고리 변경 시 오프라인 관리에서 가상대기 부분 전체를 '미지정'으로 초기화 한다! */
      this.params.vlineWaitYn = 'N'
      this.onChangeVlineWaitYn()

      if ((this.params.parkKindCd === '01' && this.params.faciltCateKindCdOne !== '01' && this.params.faciltCateKindCdOne !== '02')
          || (this.params.parkKindCd === '02' && this.params.faciltCateKindCdOne !== '01')) {
        this.params.entrAvailMm = null // 공연입장가능 , 분
        this.params.entrValidStartMm = null // 입장유효간격 from , 분
        this.params.entrValidEndMm = null // 입장유효간격 to , 분
        this.params.vlineWaitSettngInfrmBaseMm = null // 사전 알림 기분 (탑승시간확정) , 분
        this.params.vlineWaitSettngRidingDistaMm = null // 탑승시간간격 , 분
        this.params.vlineWaitSettngBaseOhrc = 0 // 기준 OHRC , 분
      }

      /* 필요한 경우 카테고리별로 초기값을 잡아준다. */
      if (this.params.faciltCateKindCdOne === '01') { // 파크 EL , CB 모두 어트랙션이 선택된 경우 '보호자 탑승 여부'는 초기값 Y로 세팅해 준다.
        this.params.guardRidingYn = 'Y'
      }

      this.params.faciltCateKindList = faciltCateKindList
    },
    onChangeFaciltCateKindCdTwo() {
      const faciltCateKindList = []
      if (!utils.isEmpty(this.params.faciltCateKindCdOne)) {
        faciltCateKindList.push({
          seqNo: 1, faciltCateKindCd: this.params.faciltCateKindCdOne,
        })
      }
      if (!utils.isEmpty(this.params.faciltCateKindCdTwo)) {
        faciltCateKindList.push({
          seqNo: 2, faciltCateKindCd: this.params.faciltCateKindCdTwo,
        })
      }

      this.params.faciltCateKindList = faciltCateKindList

      /* 시설카테고리 (2) 변경 시에는 가상대기와 무관한 '주토피아'만 추가/해제 되는 것이므로 가상대기 부분을 초기화 할 필요가 없다! */
    },
    onChangeVlineWaitYn() {
      console.log('onChangeVlineWaitYn')
      // 가상대기 관련 입력정보 리셋
      this.params.vlineWaitGrpCd = ''
      // this.params.entrAvailMm = 0 // 공연입장가능 , 분
      // this.params.entrValidStartMm = 0 // 입장유효간격 from , 분
      // this.params.entrValidEndMm = 0   // 입장유효간격 to , 분
      // this.params.vlineWaitSettngInfrmBaseMm = 0   // 사전 알림 기분 (탑승시간확정) , 분
      // this.params.vlineWaitSettngRidingDistaMm = 0 // 탑승시간간격 , 분
      // this.params.vlineWaitSettngBaseOhrc = 0      // 기준 OHRC , 분
      this.params.kioskPageNo = null
      this.params.kioskScanCode = null
      // validation 표시 리셋
      if (this.$refs.vlineWaitGrpCd) this.$refs.vlineWaitGrpCd.clearValidation()
      if (this.$refs.kioskPageNo) this.$refs.kioskPageNo.clearValidation()
      if (this.$refs.kioskScanCode) this.$refs.kioskScanCode.clearValidation()
    },
    VLINE_WAIT_YN_IS_N() {
      if (this.params.vlineWaitYn === 'N') {
        return true
      }
      return false
    },
  },
}
</script>
<style scoped>
</style>
