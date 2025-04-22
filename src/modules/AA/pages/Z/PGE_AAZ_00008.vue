<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- ::S 온라인 관리 -->
      <div class="comm_title_wrap">
        <h4>
          온라인 관리
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="시설 카테고리"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD1"
            :items="items1"
          />
        </ur-form-item>
        <ur-form-item
          label="Zone 구분"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD2"
            :items="items2"
          />
        </ur-form-item>
        <ur-form-item
          label="게시 여부"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="R1"
            value="Radio 01"
            sm
          >
            Y
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio 02"
            sm
          >
            N
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="게시 위치"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-checkbox
            v-model="valueC1"
            sm
          >
            App
          </ur-checkbox>
          <ur-checkbox
            v-model="valueC2"
            sm
          >
            모바일웹
          </ur-checkbox>
          <ur-checkbox
            v-model="valueC3"
            sm
          >
            PC
          </ur-checkbox>
        </ur-form-item>
        <ur-form-item
          label="노출 순서"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="시설명 (국문)"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="시설명 (영문)"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="시설 설명 (국문)"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <textarea
            rows="1"
            placeholder=""
            style="text-align: center;"
          />
        </ur-form-item>
        <ur-form-item
          label="시설 설명 (영문)"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <textarea
            rows="1"
            placeholder=""
            style="text-align: center;"
          />
        </ur-form-item>
        <ur-form-item
          label="이용조건 설명 (국문)"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="이용조건 설명 (영문)"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="보호자 탑승 유무"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="R2"
            value="Radio 01"
            sm
          >
            Y
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio 02"
            sm
          >
            N
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="신장 제한"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <!-- START : 신장 제한 input 숫자만-->
          <ur-text-field
            mask="number"
            value=""
            style="width:25%; height: auto;"
            class="pr10"
          />cm 이상 ~
          <ur-text-field
            mask="number"
            value=""
            style="width:25%; height: auto;"
            class="pr10"
          />cm 이하
        </ur-form-item>
        <ur-form-item
          label="체중제한"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="시설수심"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="사용 구분"
          class="flex_wrap"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-checkbox
            v-model="valueC5"
            sm
          /><span
            class="check_label"
          >기프트 카드</span>
        </ur-form-item>
        <!-- S:: ALT태그 추가 -->
        <ur-form-item
          label="썸네일 이미지"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="compo_col_wrap"
        >
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <ur-text-field
                value=""
                style="width: 88%; height: auto;"
                disabled
                placeholder="메가스톰_썸네일_이미지.jpg"
              />
              <ur-button color="violet">
                파일 찾기
              </ur-button>
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <span class="guid_txt">
              * 이미지 : 160 x 160 / 파일 규격 : 15MB 미만 jpg, png, gif
            </span>
          </div>
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <img
                src="images/food/food_0.png"
                style="width: fit-content; height: 150px;"
              >
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <ur-text-field
                value=""
                style="width: 100%; height: auto;"
                placeholder="ALT 태그를 입력하세요"
              />
            </div>
          </div>
        </ur-form-item>
        <!-- E:: ALT태그 추가 -->
      </ur-form-box>
      <!-- ::E 온라인 관리 -->

      <!-- ::S 제한사항 아이콘 관리 -->
      <div class="comm_title_wrap mt20">
        <h4>
          제한사항 아이콘 관리
        </h4>
        <div class="title_compo pl16">
          <ur-button color="violet">
            추가
          </ur-button>
          <ur-button color="violet">
            삭제
          </ur-button>
          <ur-button color="violet">
            초기화
          </ur-button>
          <span class="guid_txt">
            * 이미지 : 72 x 72 / 파일 규격 : 15MB 미만 jpg, png, gif
          </span>
        </div>
      </div>
      <ur-data-grid
        ref="grid01"
        :headers="columns01"
        :data-source="list01"
        :data-set-options="{id: 'id'}"
        :options="options"
        height="300"
      />
      <!-- ::E 제한사항 아이콘 관리 -->

      <!-- ::S 키워드 관리 -->
      <div class="comm_title_wrap mt20">
        <h4>
          키워드 관리
        </h4>
        <div class="title_compo pl16">
          <ur-button color="violet">
            추가
          </ur-button>
          <ur-button color="violet">
            삭제
          </ur-button>
          <ur-button color="violet">
            초기화
          </ur-button>
        </div>
      </div>
      <ur-data-grid
        ref="grid02"
        :headers="columns02"
        :data-source="list02"
        :data-set-options="{id: 'id'}"
        :options="opts"
        height="300"
      />
      <!-- ::E 키워드 관리 -->

      <!-- ::S 이용 안내 -->
      <div class="comm_title_wrap mt20">
        <h4>
          이용 안내
        </h4>
        <div class="title_compo pl16">
          <ur-button color="violet">
            추가
          </ur-button>
          <ur-button color="violet">
            삭제
          </ur-button>
          <ur-button color="violet">
            초기화
          </ur-button>
        </div>
      </div>
      <ur-data-grid
        ref="grid03"
        :headers="columns03"
        :data-source="list03"
        :data-set-options="{id: 'id'}"
        :options="opts"
        height="300"
      />
      <!-- ::E 이용 안내 -->
      <!-- S:: 시설 카테고리 '레스토랑' 선택시 대표 메뉴 노출 -->
      <!-- S::대표 메뉴 -->
      <div class="comm_title_wrap mt45">
        <h4 class="pr10">
          대표 메뉴
        </h4>
        <ur-button color="violet">
          추가
        </ur-button>
        <ur-button color="violet">
          삭제
        </ur-button>
        <ur-button color="violet">
          초기화
        </ur-button>
        <span class="guid_txt">
          * 이미지 : 160 x 160 / 파일 규격 : 15MB 미만 jpg, png, gif
        </span>
      </div>
      <ur-data-grid
        ref="grid04"
        :headers="columns12"
        :data-source="list12"
        :data-set-options="{id: 'id'}"
        :options="options"
      />
      <!-- E::대표 메뉴 -->
      <!-- E:: 시설 카테고리 '레스토랑' 대표 메뉴 노출 -->

      <!-- ::S 연관 콘텐츠 관리 -->
      <div class="comm_title_wrap mt20">
        <h4>
          연관 콘텐츠 관리
        </h4>
        <div class="title_compo pl16">
          <ur-button color="violet">
            추가
          </ur-button>
          <ur-button color="violet">
            삭제
          </ur-button>
          <ur-button color="violet">
            초기화
          </ur-button>
          <span class="guid_txt">
            * 이미지 : 480 x 320 / 파일 규격 : 15MB 미만 jpg, png, gif
          </span>
        </div>
      </div>
      <ur-data-grid
        ref="grid05"
        :headers="columns04"
        :data-source="list04"
        :data-set-options="{id: 'id'}"
        :options="options"
        height="300"
      />
      <!-- ::E 연관 콘텐츠 관리 -->

      <!-- ::S 연관 상품 관리 -->
      <div class="comm_title_wrap mt20">
        <h4>
          연관 상품 관리
        </h4>
        <div class="title_compo pl16">
          <ur-button color="violet">
            추가
          </ur-button>
          <ur-button color="violet">
            삭제
          </ur-button>
          <ur-button color="violet">
            초기화
          </ur-button>
          <span class="guid_txt">
            * 이미지 : 480 x 320 / 파일 규격 : 15MB 미만 jpg, png, gif
          </span>
        </div>
      </div>
      <ur-data-grid
        ref="grid06"
        :headers="columns05"
        :data-source="list05"
        :data-set-options="{id: 'id'}"
        :options="options"
        height="300"
      />
      <!-- ::E 연관 상품 관리 -->

      <!-- ::S 유의 사항 -->
      <div class="comm_title_wrap mt20">
        <h4>
          유의 사항
        </h4>
        <div class="title_compo pl16">
          <ur-button color="violet">
            추가
          </ur-button>
          <ur-button color="violet">
            삭제
          </ur-button>
          <ur-button color="violet">
            초기화
          </ur-button>
        </div>
      </div>
      <ur-data-grid
        ref="grid07"
        :headers="columns06"
        :data-source="list06"
        :data-set-options="{id: 'id'}"
        :options="opts"
        height="300"
      />
      <!-- ::E 유의 사항 -->

      <!-- ::S 배너 이미지 관리 -->
      <div class="comm_title_wrap mt20">
        <h4>
          배너 이미지 관리
        </h4>
        <div class="title_compo pl16">
          <ur-button color="violet">
            추가
          </ur-button>
          <ur-button color="violet">
            삭제
          </ur-button>
          <ur-button color="violet">
            초기화
          </ur-button>
          <span class="guid_txt">
            * 이미지 : 720 x 720 / 파일 규격 : 15MB 미만 jpg, png, gif
          </span>
        </div>
      </div>
      <ur-data-grid
        ref="grid08"
        :headers="columns07"
        :data-source="list07"
        :data-set-options="{id: 'id'}"
        :options="options"
        height="300"
      />
      <!-- ::E 배너 이미지 관리 -->

      <!-- ::S 위치 관리 -->
      <div class="comm_btn_wrap mt45 ">
        <div class="left_box">
          <div class="comm_title_wrap">
            <h4 class="pr10">
              위치 관리
            </h4>
            <ur-button color="violet">
              추가
            </ur-button>
            <ur-button color="violet">
              삭제
            </ur-button>
            <ur-button color="violet">
              초기화
            </ur-button>
          </div>
        </div>
        <div class="right_box">
          <span class="subscript_txt">
            * 실내 시설의 경우 ‘위/경도’는 길찾기, ‘X/Y좌표’는 지도 위치 표기에 사용됩니다.
          </span>
        </div>
      </div>

      <ur-data-grid
        ref="grid09"
        :headers="columns08"
        :data-source="list08"
        :data-set-options="{id: 'id'}"
        :options="opts"
        height="300"
        required
      />
      <!-- ::S 위치 관리 테이블 내 모달팝업버튼 개발완료시 삭제 요함 -->
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="openModalP01">
            위치 보기 팝업
          </ur-button>
        </div>
      </div>
      <!-- ::E 위치 관리 테이블 내 모달팝업버튼 개발완료시 삭제 요함 -->
      <ur-modal
        ref="modalP01"
        class="modal-b1c6"
        title="위치보기"
        medium
        dragable
        @closed="closed"
      >
        <P01
          :page-id="contextPageId"
        />
      </ur-modal>
      <!-- ::E 위치 관리 -->
      <!-- S::오프라인 관리 -->
      <div class="comm_title_wrap mt45">
        <h4>오프라인 관리</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="가상대기여부"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-radio-wrapper
            v-model="valueR1"
            :items="itemsR1"
            sm
          />
        </ur-form-item>
        <ur-form-item
          label="가상대기그룹"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="value5"
            :items="items5"
            style="width: 50%;"
          />
        </ur-form-item>
        <ur-form-item
          label="공연 입장 가능"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            value=""
            disabled
          />분 전부터 입장 가능   <span>※ 수정 시, 익일 반영됩니다.</span>
        </ur-form-item>
        <ur-form-item
          label="입장 유효 간격"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          입장 시작
          <ur-text-field
            value="15"
          />분 전부터
          입장종료
          <ur-text-field
            value="15"
          />분 후까지
        </ur-form-item>
        <ur-form-item
          label="가상대기 설정 값"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="compo_col_wrap"
        >
          <div class="col_item_txt pr10 pb4">
            <div class="col_item_txtL">
              <span>사전 알림 기분 (탑승시간확정)</span>
            </div>
            <div class="col_item_txtR">
              <ur-text-field
                value="50"
                style="width: 100%;"
              />
              분
            </div>
          </div>
          <div class="col_item_txt pr10 pb4">
            <div class="col_item_txtL">
              탑승시간간격
            </div>
            <div class="col_item_txtR">
              <ur-text-field
                value="60"
                style="width: 100%;"
              />
              분
            </div>
          </div>
          <div class="col_item_txt pr10 pb4">
            <div class="col_item_txtL">
              기준 OHRC
            </div>
            <div class="col_item_txtR">
              <ur-text-field
                value="70"
                style="width: 100%;"
              />
              명
            </div>
          </div>
        </ur-form-item>
        <ur-form-item
          label="키오스크 페이지"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value="12"
            style="width: 100%;"
          />
        </ur-form-item>
        <ur-form-item
          label="키오스크 스캔코드"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value="5"
            style="width: 100%;"
          />
        </ur-form-item>

        <ur-form-item
          label="D/S 노출 여부"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
        >
          <ur-radio
            v-model="v7"
            value="Radio 01"
            sm
          >
            Y
          </ur-radio>
          <ur-radio
            v-model="v7"
            value="Radio 02"
            sm
          >
            N
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="대기시단 POPS 시설"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          시설코드
          <ur-text-field
            value="C100V490101"
            readonly
            class="pl16"
          />
          <ur-icon-button
            icon="search"
            icon-type="line"
            color="primary"
            @click="openModalP02"
          />
          <!-- S:: POS 정보 검색 MODAL -->
          <ur-modal
            ref="modalP02"
            title="POS 정보 검색"
            large
            dragable
            @closed="closedmodalP02"
          >
            <P02
              :page-id="contextPageId"
            />
          </ur-modal>
          <!-- E:: POS 정보 검색 MODAL -->

          시설명
          <ur-text-field
            value="로스트밸리 매출-01"
            readonly
          />
        </ur-form-item>
        <ur-form-item
          label="Q-PASS 전광판 시설"
          :label-align="'right'"
          style="width: 100%; height: auto; "
          class="flex_wrap"
        >
          시설코드
          <ur-text-field
            value="C100V970421"
            readonly
            class="pl16"
          />
          <ur-icon-button
            icon="search"
            icon-type="line"
            color="primary"
            @click="openModalP02"
          />
          시설명
          <ur-text-field
            value="원내시설 매출(로밸)"
            readonly
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E::오프라인 관리 -->
      <!-- S::시설 사용 POS 관리 -->
      <div class="comm_title_wrap mt45">
        <h4 class="pr10">
          시설 사용 POS 관리
        </h4>
        <ur-button color="violet">
          추가
        </ur-button>
        <ur-button color="violet">
          삭제
        </ur-button>
      </div>
      <ur-data-grid
        ref="grid10"
        :headers="columns6"
        :data-source="list6"
        :data-set-options="{id: 'id'}"
        :options="opts"
      />
      <!-- ::S 시설 사용 POS 관리 내 모달팝업버튼 개발완료시 삭제 요함 -->
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="openModalP02">
            POS 정보검색 팝업
          </ur-button>
        </div>
      </div>
      <!-- ::E 시설 사용 POS 관리 내 모달팝업버튼 개발완료시 삭제 요함 -->

      <!-- E::시설 사용 POS 관리 -->
      <!-- S:: POS 시설 코드 관리 -->
      <div class="comm_title_wrap mt45">
        <h4 class="pr10">
          POS 시설 코드 관리
        </h4>
        <ur-button color="violet">
          추가
        </ur-button>
        <ur-button color="violet">
          삭제
        </ur-button>
        <ur-button color="violet">
          초기화
        </ur-button>
      </div>
      <ur-data-grid
        ref="grid11"
        :headers="columns13"
        :data-source="list13"
        :data-set-options="{id: 'id'}"
        :options="opts"
      />
      <!-- ::S POS 시설 코드 관리 내 모달팝업버튼 개발완료시 삭제 요함 -->
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="openModalP03">
            시설명/코드조회팝업
            <ur-modal
              ref="modalP03"
              title="시설명/코드 조회"
              large
              dragable
              @closed="closed"
            >
              <P03
                :page-id="contextPageId"
              />
            </ur-modal>
          </ur-button>
        </div>
      </div>
      <!-- ::E POS 시설 코드 관리 내 모달팝업버튼 개발완료시 삭제 요함 -->

      <!-- E::POS 시설 코드 관리 -->

      <div class="bt1 mt45">
        <sui-page-footer class="comm_btn_wrap">
          <div class="btn_wrap">
            <div class="left_box">
              <ur-button>
                목록
              </ur-button>
            </div>
            <div class="right_box">
              <ur-button
                color="violet"
              >
                저장
              </ur-button>
            </div>
          </div>
        </sui-page-footer>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import P01 from './components/PGE_AAZ_00008_P01.vue'
import P02 from './components/PGE_AAZ_00004_P01.vue'
import P03 from './components/PGE_AAZ_00004_P02.vue'

export default {
  name: 'PGE_AAZ_00008', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
    P02,
    P03,
  },
  data() {
    return {
      // 라디오 warpper
      valueR1: '',

      // 셀렉트박스
      value5: null,

      // 라디오버튼
      R1: 'Radio 01',
      R2: 'Radio 01',
      R3: 'Radio 01',
      R4: null,

      // 오프라인 라디오버튼
      v7: null,

      // 체크박스
      valueC1: ['App'],
      valueC2: ['모바일웹'],
      valueC3: ['PC'],
      valueC5: '',

      // 드롭다운
      valueD1: '1',
      valueD2: '1',
      valueD3: '1',
      valueD4: '1',

      // 테이블 옵션
      options: { // 토탈x 체크o
        noInfo: true,
        selectCheck: true,
        rowHeight: 'auto',
      },
      opts: {
        // height:,
        noInfo: true,
        multiSelect: false,
        selectCheck: true,
      },

      // 유튜브 콘텐츠 관리
      columns01:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '업로드 구분',
            width: 250,
            component: {
              template: '<div><ur-radio v-model="R3" value="Radio 01" sm> 선택 업로드 </ur-radio><ur-radio v-model="R3" value="Radio 02" sm> 직접 업로드 </ur-radio></div>',
            },
          },
          {
            value: 'value3',
            text: '제한 사항',
            component: {
              template: '<div><ur-dropdown v-model="valueD3" :items="items3" class="pr10" style="width:200px;"/><ur-dropdown v-model="valueD4" :items="items4" style="width:200px;"/></div>',
            },
          },
          {
            value: 'value4',
            text: '제한 사항',
            component: {
              template: '<div class="pdCol10" style="flex-direction: column;"><div style="display: flex; flex-direction: row; align-items: center;"><ur-text-field class="pr10"/><ur-button color="violet">파일 찾기</ur-button></div><img class="pdCol10" src="images/food/food_0.png" style="width: fit-content; height: 150px;"><ur-text-field value="ALT 태그를 입력하세요"/></div>',
            },
          },
          {
            value: 'value5',
            text: '아이콘 미리보기',
            component: {
              template: '<div><ur-icon medium>emoticon</ur-icon></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list01:
        [
          {
            value1: '1', value2: '', value3: '', value4: '', value5: '',
          },
        ],

      // 키워드 관리
      columns02:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '키워드 (국문)',
            component: {
              template: '<div><ur-text-field value="" style="width: 100%; height: auto; padding-right: 16px;"/></div>',
            },
          },
          {
            value: 'value3',
            text: '키워드 (영문)',
            component: {
              template: '<div><ur-text-field value="" style="width: 100%; height: auto; padding-right: 16px;"/></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list02:
        [
          { value1: '1', value2: '', value3: '' },
          // { value1: '2', value2: '', value3: '' },
        ],

      // 이용 안내
      columns03:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '이용 안내 (국문)',
            component: {
              template: '<div><ur-text-field value="" style="width: 100%; padding-right: 16px; height: auto;"/></div>',
            },
          },
          {
            value: 'value3',
            text: '이용 안내 (영문)',
            component: {
              template: '<div><ur-text-field value="" style="width: 100%; padding-right: 16px; height: auto;"/></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list03:
        [
          { value1: '1', value2: '', value3: '' },
          // { value1: '2', value2: '', value3: '' },
        ],
      // S:: 시설 카테고리 '레스토랑' 선택시 대표 메뉴 노출
      // 대표 메뉴
      columns12:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '메뉴 명 (국문)',
            component: {
              template: '<div><ur-text-field style="width: auto;" placeholder=""/></div>',
            },
          },
          {
            value: 'value3',
            text: '메뉴 명 (영문)',
            component: {
              template: '<div><ur-text-field style="width: auto;" placeholder=""/></div>',
            },
          },
          {
            value: 'value4',
            text: '메뉴 가격',
            component: {
              template: '<div style="align-items: center;"><ur-text-field placeholder=""/><span>원</span></div>',
            },
          },
          {
            value: 'value5',
            text: '메뉴 이미지',
            component: {
              template: '<div class="pdCol10" style="flex-direction: column;"><div style="display: flex; flex-direction: row; align-items: center;"><ur-text-field class="pr10"/><ur-button color="violet">파일 찾기</ur-button></div><img class="pdCol10" src="images/food/food_0.png" style="width: fit-content; height: 150px;"><ur-text-field value="ALT 태그를 입력하세요"/></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list12:
        [
          {
            value1: '1', value2: '', value3: '', value4: '', value5: '',
          },
        ],
      // E:: 시설 카테고리 '레스토랑' 선택시 대표 메뉴 노출

      // 연관 콘텐츠 관리
      columns04:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '제목 (국문)',
            component: {
              template: '<div><ur-text-field value="" style="width: 100%; padding-right: 16px; height: auto;"/></div>',
            },
          },
          {
            value: 'value3',
            text: '제목 (영문)',
            component: {
              template: '<div><ur-text-field value="" style="width: 100%; padding-right: 16px; height: auto;"/></div>',
            },
          },
          {
            value: 'value4',
            text: '콘텐츠 URL',
            component: {
              template: '<div><ur-text-field value="" style="width: 100%; padding-right: 16px; height: auto;"/></div>',
            },
          },
          {
            value: 'value5',
            text: '연관 콘텐츠 썸네일 이미지',
            disabled: true,
            component: {
              template: '<div class="pdCol10" style="flex-direction: column;"><div style="display: flex; flex-direction: row; align-items: center;"><ur-text-field class="pr10"/><ur-button color="violet">파일 찾기</ur-button></div><img class="pdCol10" src="images/food/food_0.png" style="width: fit-content; height: 150px;"><ur-text-field value="ALT 태그를 입력하세요"/></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list04:
        [
          {
            value1: '1', value2: '', value3: '', value4: '', value5: '',
          },
          // { value1: '2', value2: '', value3: '' },
        ],

      // 연관 상품 관리
      columns05:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '제목 (국문)',
            component: {
              template: '<div><ur-text-field value="" style="width: 100%; padding-right: 16px; height: auto;"/></div>',
            },
          },
          {
            value: 'value3',
            text: '제목 (영문)',
            component: {
              template: '<div><ur-text-field value="" style="width: 100%; padding-right: 16px; height: auto;"/></div>',
            },
          },
          {
            value: 'value4',
            text: '콘텐츠 URL',
            component: {
              template: '<div><ur-text-field value="" style="width: 100%; padding-right: 16px; height: auto;"/></div>',
            },
          },
          {
            value: 'value5',
            text: '연관 상품 썸네일 이미지',
            disabled: true,
            component: {
              template: '<div class="pdCol10" style="flex-direction: column;"><div style="display: flex; flex-direction: row; align-items: center;"><ur-text-field class="pr10"/><ur-button color="violet">파일 찾기</ur-button></div><img class="pdCol10" src="images/food/food_0.png" style="width: fit-content; height: 150px;"><ur-text-field value="ALT 태그를 입력하세요"/></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list05:
        [
          {
            value1: '1', value2: '', value3: '', value4: '', value5: '',
          },
          // { value1: '2', value2: '', value3: '' },
        ],

      // 유의 사항
      columns06:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '유의 사항 (국문)',
            component: {
              template: '<div><ur-text-field value="" style="width: 100%; padding-right: 16px; height: auto; "/></div>',
            },
          },
          {
            value: 'value3',
            text: '유의 사항 (영문)',
            component: {
              template: '<div><ur-text-field value="" style="width: 100%; padding-right: 16px; height: auto; "/></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list06:
        [
          { value1: '1', value2: '', value3: '' },
          // { value1: '2', value2: '', value3: '' },
        ],

      // 배너 이미지 관리
      columns07:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '배너 이미지',
            disabled: true,
            component: {
              template: '<div class="pdCol10" style="flex-direction: column;"><div style="display: flex; flex-direction: row; align-items: center;"><ur-text-field class="pr10"/><ur-button color="violet">파일 찾기</ur-button></div><img class="pdCol10" src="images/food/food_0.png" style="width: fit-content; height: 150px;"><ur-text-field value="ALT 태그를 입력하세요"/></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list07:
        [
          {
            value1: '1', value2: '',
          },
          // { value1: '2', value2: '', value3: '' },
        ],

      // 위치 관리
      columns08:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '실내/외 구분',
            component: {
              template: '<div><ur-dropdown v-model="valueD3" :items="items3" style="width:100%; padding-right: 16px;"/></div>',
            },
          },
          {
            value: 'value3',
            text: '실내 층수',
            component: {
              template: '<div><ur-dropdown v-model="valueD3" :items="items3" style="width:100%; padding-right: 16px;"/></div>',
            },
          },
          {
            value: 'value4',
            text: '위도',
            component: {
              template: '<div><ur-text-field style="width:100%; min-width: 30%; padding-right: 16px;" placeholder=""></div>',
            },
          },
          {
            value: 'value5',
            text: '경도',
            component: {
              template: '<div><ur-text-field style="width:100%; min-width: 30%; padding-right: 16px;" placeholder=""></div>',
            },
          },
          {
            value: 'value6',
            text: 'X 좌표',
            component: {
              template: '<div><ur-text-field style="width:100%; min-width: 30%; padding-right: 16px;" placeholder=""></div>',
            },
          },
          {
            value: 'value7',
            text: 'Y 좌표',
            component: {
              template: '<div><ur-text-field style="width:100%; min-width: 30%; padding-right: 16px;" placeholder=""></div>',
            },
          },
          {
            value: 'value8',
            text: '비고',
            disabled: true,
            component: {
              template: '<div><ur-text-field style="min-width: 30%; padding-right: 16px;" placeholder=""/><ur-button color="violet" @click="openModalP01">위치 보기</ur-button></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list08:
        [
          {
            value1: '1', value2: '', value3: '', value4: '', value5: '', value6: '', value7: '', value8: '',
          },
        ],

      // 시설 사용 POS 관리
      columns6:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '시설 사용 POS ID',
            component: {
              template: '<div><ur-text-field class="pr10" style="width: auto;" placeholder="C100V980108"/><ur-icon-button icon="search" icon-type="line" color="primary"></div>',
            },
          },
          {
            value: 'value3',
            text: '시설 사용 POS 명',
            component: {
              template: '<div><ur-text-field style="width: auto;" placeholder=""/></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list6:
        [
          { value1: '1', value2: '', value3: '' },
        ],

      // POS 시설 코드 관리
      columns13:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: 'POS 시설 코드',
            component: {
              template: '<div><ur-text-field class="pr10" style="width: auto;" /><ur-icon-button icon="search" icon-type="line" color="primary"></div>',
            },
          },
          {
            value: 'value3',
            text: 'POS 시설 코드 명',
            component: {
              template: '<div><ur-text-field style="width: auto;" placeholder=""/></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list13:
        [
          { value1: '1', value2: '', value3: '' },
        ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // 라디오 warpper
    itemsR1() {
      const rtn = []
      rtn.push({ value: '1', text: '미지정' })
      rtn.push({ value: '2', text: '일반형' })
      rtn.push({ value: '3', text: '회차형' })
      rtn.push({ value: '4', text: '추첨형' })
      return rtn
    },

    // 시설 카테고리
    items1() {
      const rtn = []
      rtn.push({ value: '1', text: '어트랙션' })
      rtn.push({ value: '2', text: '레스토랑' })
      rtn.push({ value: '3', text: '빌리지' })
      rtn.push({ value: '4', text: '비치체어' })
      rtn.push({ value: '5', text: '렌탈/편의시설' })
      rtn.push({ value: '6', text: '기프트샵' })
      return rtn
    },

    // Zone 구분
    items2() {
      const rtn = []
      rtn.push({ value: '1', text: '선택' })
      rtn.push({ value: '2', text: '씨 웨이브' })
      rtn.push({ value: '3', text: '베이 슬라이드' })
      rtn.push({ value: '4', text: '포트리스' })
      rtn.push({ value: '5', text: '와일드 리버' })
      rtn.push({ value: '6', text: '아쿠아틱 센터' })
      return rtn
    },

    // 제한사항 아이콘 관리 > 선택 업로드 > 제한사항 1차 분류
    items3() {
      const rtn = []
      rtn.push({ value: '1', text: '선택' })
      rtn.push({ value: '2', text: '이용제한' })
      rtn.push({ value: '3', text: '지시 표시' })
      rtn.push({ value: '4', text: '경고/주의 표시' })
      rtn.push({ value: '5', text: '금지 표시' })
      return rtn
    },

    // 제한사항 아이콘 관리 > 선택 업로드 > 제한사항 2차 분류 > 이용제한 선택 시
    items4() {
      const rtn = []
      rtn.push({ value: '1', text: '보호자 동반이 필요한 시설' })
      rtn.push({ value: '2', text: '노약자 이용금지' })
      rtn.push({ value: '3', text: '임산부 이용금지' })
      rtn.push({ value: '4', text: '음주차 이용금지' })
      rtn.push({ value: '5', text: '심혈관계질환자,간질환자 이용금지' })
      rtn.push({ value: '6', text: '목, 허리 디스크 환자 이용금지' })
      rtn.push({ value: '7', text: '피부 질환자 이용금지' })
      rtn.push({ value: '8', text: '시계,경,썬글라스 착용금지' })
      rtn.push({ value: '9', text: '귀걸이,목걸이 등 악세서리 착용금지' })
      return rtn
    },
    // 오프라인 관리
    items5() {
      const rtn = []
      rtn.push({ value: '1', text: 'A' })
      rtn.push({ value: '2', text: 'B' })
      rtn.push({ value: '3', text: 'C' })
      rtn.push({ value: '4', text: 'D' })
      rtn.push({ value: '5', text: 'E' })
      return rtn
    },

    // modalPopUp
    modalP01() {
      return this.$refs.modalP01
    },
    modalP02() {
      return this.$refs.modalP02
    },
    modalP03() {
      return this.$refs.modalP03
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
    openModalP01() { this.modalP01.open() },
    closeModal() { this.modalP01.close() },
    openModalP02() { this.modalP02.open() },
    closeModalP02() { this.modalP02.close() },
    openModalP03() { this.modalP03.open() },
    closed() {},
  },
}
</script>
<style scoped>
</style>
