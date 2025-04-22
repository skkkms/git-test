<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S::온라인 관리 -->
      <div class="comm_title_wrap">
        <h4>온라인 관리</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="시설 카테고리 (1)"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="value1"
            :items="items1"
          />
        </ur-form-item>
        <ur-form-item
          label="시설 카테고리 (2)"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="value2"
            :items="items2"
          />
        </ur-form-item>
        <ur-form-item
          label="Zone 구분"
          :label-align="'right'"
          required
          style="width: 50%;"
        >
          <ur-dropdown
            v-model="value3"
            :items="items3"
          />
        </ur-form-item>
        <ur-form-item
          label="게시 여부"
          :label-align="'right'"
          required
          style="width: 50%;"
        >
          <ur-radio
            v-model="v1"
            value="Radio01"
            sm
          >
            Y
          </ur-radio>
          <ur-radio
            v-model="v1"
            value="Radio02"
            sm
          >
            N
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="게시 위치"
          class="flex_wrap"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-checkbox
            v-model="valueC1"
            sm
          /><span
            class="check_label"
          >App</span><ur-checkbox
            v-model="valueC2"
            sm
          /><span
            class="check_label"
          >모바일웹</span><ur-checkbox
            v-model="valueC3"
            sm
          /><span
            class="check_label"
          >PC</span>
        </ur-form-item>
        <ur-form-item
          label="노출 순서"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%;"
          />
        </ur-form-item>
        <ur-form-item
          label="시설명 (국문)"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value="로스트밸리"
            style="width: 100%;"
          />
        </ur-form-item>
        <ur-form-item
          label="시설명 (영문)"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value="Lost Valley"
            style="width: 100%;"
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
            style="text-align: center;"
            placeholder="20종 150여 머리 동물 친구들이함께 살아가는 대자연 로스트 밸리!"
          /><span class="subscript_txt">
            Guide text
          </span>
        </ur-form-item>
        <ur-form-item
          label="시설 설명 (영문)"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <textarea
            rows="1"
            style="text-align: center;"
            placeholder="Mother Nature Lost Valley, where 150 animals with 20 kinds of hair live together!"
          />
          <span class="subscript_txt">
            Guide text
          </span>
        </ur-form-item>
        <!-- S:: 시설 카테고리 '공연' 선택시 관람 소요 시간 노출 -->
        <ur-form-item
          label="관람 소요 시간"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
        >
          <div>
            <ur-text-field
              value="110"
            />분
          </div>
        </ur-form-item>
        <!-- E:: 시설 카테고리 '공연' 선택시 관람 소요 시간 노출 -->
        <!-- S:: 시설 카테고리 '레스토랑' 선택시 사용 구분 노출 -->
        <ur-form-item
          label="사용 구분"
          class="flex_wrap"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-checkbox
            v-model="valueC4"
            sm
          /><span
            class="check_label"
          >모바일 오더</span><ur-checkbox
            v-model="valueC5"
            sm
          /><span
            class="check_label"
          >기프트 카드</span>
        </ur-form-item>
        <!-- E:: 시설 카테고리 '레스토랑' 선택시 사용 구분 노출 -->
        <!-- S:: 시설 카테고리 '레스토랑' 선택시 음식 종류 노출 -->
        <ur-form-item
          label="음식종류"
          class="flex_wrap"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
        >
          <ur-checkbox
            v-model="valueC6"
            sm
          />
          <span class="check_label">한식</span>
          <ur-checkbox
            v-model="valueC7"
            sm
          />
          <span class="check_label">중식</span>
          <ur-checkbox
            v-model="valueC8"
            sm
          />
          <span class="check_label">양식</span>
          <ur-checkbox
            v-model="valueC9"
            sm
          />
          <span class="check_label">패스트푸드</span>
          <ur-checkbox
            v-model="valueC10"
            sm
          />
          <span class="check_label">스낵</span>
          <ur-checkbox
            v-model="valueC11"
            sm
          />
          <span class="check_label">카페</span>
          <ur-checkbox
            v-model="valueC12"
            sm
          />
          <span class="check_label">기타</span>
        </ur-form-item>
        <!-- E:: 시설 카테고리 '레스토랑' 선택시 음식 종류 노출 -->
        <!-- S:: 시설 카테고리 '편의시설' 선택시 스마트 예약 여부 노출 -->
        <ur-form-item
          label="스마트 예약 여부"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="v8"
            value="Radio 01"
            sm
          >
            Y
          </ur-radio>
          <ur-radio
            v-model="v8"
            value="Radio 02"
            sm
          >
            N
          </ur-radio>
        </ur-form-item>
        <!-- E:: 시설 카테고리 '편의시설' 선택시 스마트 예약 여부 노출 -->
        <!-- S:: 시설 카테고리 '편의시설' 선택시 연결 URL 노출 -->
        <ur-form-item
          label="연결 URL"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%;"
          />
        </ur-form-item>
        <!-- E:: 시설 카테고리 '편의시설' 선택시 연결 URL 노출 -->
        <!-- S:: 시설 카테고리 '편의시설' 선택시 편의시설 구분 노출 -->
        <ur-form-item
          label="편의시설 구분"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="value6"
            :items="items6"
            style="width: 50%;"
          />
        </ur-form-item>
        <!-- E:: 시설 카테고리 '편의시설' 선택시 편의시설 구분 노출 -->

        <ur-form-item
          label="이용조건 설명 (국문)"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value="100cm이하 손님은 보호자 동반"
            style="width: 100%;"
          />
        </ur-form-item>
        <ur-form-item
          label="이용조건 설명 (영문)"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value="Guests under 100cm are accompanied by a guardian"
            style="width: 100%;"
          />
        </ur-form-item>
        <ur-form-item
          label="보호자 탑승 유무"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="v4"
            value="Radio 01"
            sm
          >
            Y
          </ur-radio>
          <ur-radio
            v-model="v4"
            value="Radio 02"
            sm
          >
            N
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="신장제한"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            style="width: 34%;"
            value="130"
          /><div class="pdRow10">
            cm 이상
          </div>
          <ur-text-field
            style="width: 34%;"
            value="190"
          />
          <div class="pdRow10">
            cm 이하
          </div>
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
      <!-- E::온라인 관리 -->
      <!-- S::제한사항 아이콘 관리 -->
      <div class="comm_title_wrap mt35">
        <h4 class="-grid__column__header__root-required pr10">
          제한사항 아이콘 관리
        </h4>
        <ur-button color="violet">
          추가
        </ur-button>
        <ur-button color="violet">
          삭제
        </ur-button>
        <span class="guid_txt">
          * 이미지 : 72 x 72 / 파일 규격 : 15MB 미만 jpg, png, gif
        </span>
      </div>
      <!-- 선택 업로드시 -->
      <ur-data-grid
        ref="grid01"
        :headers="columns5"
        :data-source="list5"
        :data-set-options="{id: 'id'}"
        :options="opts"
        height="300"
      />
      <!-- 직접 업로드시 -->
      <ur-data-grid
        ref="grid02"
        :headers="columns5_1"
        :data-source="list5_1"
        :data-set-options="{id: 'id'}"
        :options="opts"
        height="300"
      />
      <!-- E::제한사항 아이콘 관리 -->
      <!-- S::키워드 관리 -->
      <div class="comm_title_wrap mt45">
        <h4 class="-grid__column__header__root-required pr10">
          키워드 관리
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
        ref="grid03"
        :headers="columns7"
        :data-source="list7"
        :data-set-options="{id: 'id'}"
        :options="opts2"
      />
      <!-- E::키워드 관리 -->
      <!-- S::이용 안내 -->
      <div class="comm_title_wrap mt45">
        <h4 class="pr10">
          이용 안내
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
        ref="grid04"
        :headers="columns8"
        :data-source="list8"
        :data-set-options="{id: 'id'}"
        :options="opts2"
      />
      <!-- E::이용 안내 -->
      <!-- S::연관 콘텐츠 관리 -->
      <div class="comm_title_wrap mt35">
        <h4 class="pr10">
          연관 콘텐츠 관리
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
          * 이미지 : 480 x 320 / 파일 규격 : 15MB 미만 jpg, png, gif
        </span>
      </div>
      <ur-data-grid
        ref="grid05"
        :headers="columns1"
        :data-source="list1"
        :data-set-options="{id: 'id'}"
        :options="opts"
        height="300"
      />
      <!-- E::연관 콘텐츠 관리 -->
      <!-- S::연관 상품 관리 -->
      <div class="comm_title_wrap mt35">
        <h4 class="pr10">
          연관 상품 관리
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
          * 이미지 : 480 x 320 / 파일 규격 : 15MB 미만 jpg, png, gif
        </span>
      </div>
      <ur-data-grid
        ref="grid06"
        :headers="columns9"
        :data-source="list9"
        :data-set-options="{id: 'id'}"
        :options="opts"
        height="300"
      />
      <!-- E::연관 상품 관리 -->
      <!-- S::유의사항 -->
      <div class="comm_title_wrap mt45">
        <h4 class="pr10">
          유의사항
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
        ref="grid07"
        :headers="columns10"
        :data-source="list10"
        :data-set-options="{id: 'id'}"
        :options="opts2"
      />
      <!-- E::유의사항 -->
      <!-- S::배너 이미지 관리 -->
      <div class="comm_title_wrap mt35">
        <h4 class="-grid__column__header__root-required pr10">
          배너 이미지 관리
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
          * 이미지 : 720 x 720 / 파일 규격 : 15MB 미만 jpg, png, gif
        </span>
      </div>
      <ur-data-grid
        ref="grid08"
        :headers="columns3"
        :data-source="list3"
        :data-set-options="{id: 'id'}"
        :options="opts"
      />
      <!-- E::배너 이미지 관리 -->
      <!-- S::위치 관리 -->
      <div class="comm_title_wrap mt45">
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
      <ur-data-grid
        ref="grid09"
        :headers="columns4"
        :data-source="list4"
        :data-set-options="{id: 'id'}"
        :options="opts2"
      />
      <!-- E::위치 관리 -->
      <!-- S:: 시설 카테고리 '주토피아' 선택시 동물 관리 노출 -->
      <!-- S::동물 관리 -->
      <div class="comm_title_wrap mt45">
        <h4 class="pr10">
          동물 관리
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
          * 이미지 : 624 x 320 / 파일 규격 : 15MB 미만 jpg, png, gif
        </span>
      </div>
      <ur-data-grid
        ref="grid10"
        :headers="columns11"
        :data-source="list11"
        :data-set-options="{id: 'id'}"
        :options="opts"
      />
      <!-- E::동물 관리 -->
      <!-- E:: 시설 카테고리 '주토피아' 선택시 동물 관리 노출 -->
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
        ref="grid11"
        :headers="columns12"
        :data-source="list12"
        :data-set-options="{id: 'id'}"
        :options="opts"
      />
      <!-- E::대표 메뉴 -->
      <!-- E:: 시설 카테고리 '레스토랑' 대표 메뉴 노출 -->


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
          class="flex_wrap"
          label="대기시단 POPS 시설"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          시설코드
          <ur-text-field
            value="C100V490101"
            readonly
          />
          <ur-icon-button
            icon="search"
            icon-type="line"
            color="primary"
            @click="openModalP01"
          />
          <!-- S:: POS 정보 검색 MODAL -->
          <ur-modal
            ref="modalP01"
            title="POS 정보 검색"
            large
            dragable
            @closed="closed"
          >
            <P01
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
          class="flex_wrap"
          label="Q-PASS 전광판 시설"
          :label-align="'right'"
          style="width: 100%; height: auto; "
        >
          시설코드
          <ur-text-field
            value="C100V970421"
            readonly
          />
          <ur-icon-button
            icon="search"
            icon-type="line"
            color="primary"
            @click="openModalP01"
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
        <ur-button color="violet">
          초기화
        </ur-button>
      </div>
      <ur-data-grid
        ref="grid12"
        :headers="columns6"
        :data-source="list6"
        :data-set-options="{id: 'id'}"
        :options="opts2"
      />
      <!-- ::S 시설 사용 POS 관리 내 모달팝업버튼 개발완료시 삭제 요함 -->
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="openModalP01">
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
        ref="grid13"
        :headers="columns13"
        :data-source="list13"
        :data-set-options="{id: 'id'}"
        :options="opts2"
      />
      <!-- ::S POS 시설 코드 관리 내 모달팝업버튼 개발완료시 삭제 요함 -->
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="openModalP02">
            시설명/코드조회팝업
            <ur-modal
              ref="modalP02"
              title="시설명/코드 조회"
              large
              dragable
              @closed="closed"
            >
              <P02
                :page-id="contextPageId"
              />
            </ur-modal>
          </ur-button>
        </div>
      </div>
      <!-- ::E POS 시설 코드 관리 내 모달팝업버튼 개발완료시 삭제 요함 -->

      <!-- E::POS 시설 코드 관리 -->
      <div class="bt1 mt45" />
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
    </sui-page-contents>
  </sui-page>
</template>
<script>
import P01 from './components/PGE_AAZ_00004_P01.vue'
import P02 from './components/PGE_AAZ_00004_P02.vue'

export default {
  name: 'PGE_AAZ_00004', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
    P02,
  }, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      // 라디오 warpper
      valueR1: '',

      // 셀렉트박스
      value1: '',
      value2: '',
      value3: '1',
      value5: null,
      value6: null,
      value7: '1',

      // 체크박스
      valueC1: ['App'],
      valueC2: ['모바일웹'],
      valueC3: ['PC'],
      valueC4: ['모바일 오더'],
      valueC5: ['기프트 카드'],
      valueC6: ['한식'],
      valueC7: ['중식'],
      valueC8: ['양식'],
      valueC9: ['패스트푸드'],
      valueC10: ['스낵'],
      valueC11: ['카페'],
      valueC12: ['기타'],

      // 라디오 버튼
      v1: null,
      v2: null,
      v4: null,
      v6: null,
      v7: null,
      v8: null,

      // 테이블
      options: {
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      opts: {
        // height:,
        noInfo: true,
        multiSelect: false,
        selectCheck: true,
        rowHeight: 'auto',
      },
      opts1: {
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      opts2: {
        noInfo: true,
        multiSelect: false,
        selectCheck: true,
      },


      // 연관 콘텐츠 관리
      columns1:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '제목 (국문)',
            component: {
              template: '<div><ur-text-field placeholder=""/></div>',
            },
          },
          {
            value: 'value3',
            text: '제목 (영문)',
            component: {
              template: '<div><ur-text-field placeholder=""/></div>',
            },
          },
          {
            value: 'value4',
            text: '콘텐츠 URL',
            component: {
              template: '<div><ur-text-field placeholder="www.youtube.everland.com"/></div>',
            },
          },
          {
            value: 'value5',
            text: '연관 콘텐츠 썸네일 이미지',
            component: {
              template: '<div class="pdCol10" style="flex-direction: column;"><div style="display: flex; flex-direction: row; align-items: center;"><ur-text-field class="pr10"/><ur-button color="violet">파일 찾기</ur-button></div><img class="pdCol10" src="images/food/food_0.png" style="width: fit-content; height: 150px;"><ur-text-field value="ALT 태그를 입력하세요"/></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list1:
        [
          {
            value1: '1', value2: '', value3: '', value4: '', value5: '',
          },
          {
            value1: '1', value2: '', value3: '', value4: '', value5: '',
          },
        ],


      // 배너 이미지 관리
      columns3:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '첨부 파일',
            component: {
              template: '<div class="pdCol10" style="flex-direction: column;"><div style="display: flex; flex-direction: row; align-items: center;"><ur-text-field class="pr10"/><ur-button color="violet">파일 찾기</ur-button></div><img class="pdCol10" src="images/food/food_0.png" style="width: fit-content; height: 150px;"><ur-text-field value="ALT 태그를 입력하세요"/></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list3:
        [
          { value1: '1', value2: '', value3: '' },
          { value1: '2', value2: '', value3: '' },
        ],

      // 위치관리
      columns4:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '위도',
            component: {
              template: '<div><ur-text-field style="width: auto;" placeholder="127.20373"/></div>',
            },
          },
          {
            value: 'value3',
            text: '경도',
            component: {
              template: '<div><ur-text-field style="width: auto;" placeholder="127.20373"/></div>',
            },
          },
          {
            value: 'value4',
            text: '비고',
            component: {
              template: '<div><ur-text-field style="width: auto;" placeholder=""/></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list4:
        [
          {
            value1: '1', value2: '', value3: '', value4: '',
          },
        ],

      // 제한사항 아이콘 관리 (선택 업로드)
      columns5:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '업로드 구분',
            component: {
              template: '<div><ur-radio v-model="R1" value="Radio 01" checkedIcon sm>선택 업로드</ur-radio><ur-radio v-model="R1" value="Radio 01" sm>직접 업로드</ur-radio></div>',
            },
          },
          {
            value: 'value3',
            text: '제한사항',
            component: {
              template: '<div><ur-dropdown v-model="value1" :items="items1"/><ur-dropdown v-model="value1" :items="items1"/></div>',
            },
          },
          {
            value: 'value4',
            text: '아이콘 미리보기',
            component: {
              template: '<div><ur-icon medium>emoticon</ur-icon></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list5:
        [
          {
            value1: '1', value2: '', value3: '', value4: '',
          },
        ],
      // 제한사항 아이콘 관리 (직접 업로드)
      columns5_1:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '업로드 구분',
            component: {
              template: '<div><ur-radio v-model="R1" value="Radio 01" checkedIcon sm>선택 업로드</ur-radio><ur-radio v-model="R1" value="Radio 01" sm>직접 업로드</ur-radio></div>',
            },
          },
          {
            value: 'value3',
            text: '제한사항',
            component: {
              template: '<div class="pdCol10" style="flex-direction: column;"><div style="display: flex; flex-direction: row; align-items: center;"><ur-text-field class="pr10"/><ur-button color="violet">파일 찾기</ur-button></div><img class="pdCol10" src="images/food/food_0.png" style="width: fit-content; height: 150px;"><ur-text-field value="ALT 태그를 입력하세요"/></div>',
            },
          },
          {
            value: 'value4',
            text: '아이콘 미리보기',
            component: {
              template: '<div><ur-icon medium>emoticon</ur-icon></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list5_1:
        [
          {
            value1: '1', value2: '', value3: '', value4: '',
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

      // 키워드관리
      columns7:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '키워드 (국문)',
            component: {
              template: '<div><ur-text-field style="width: auto;" placeholder=""/></div>',
            },
          },
          {
            value: 'value3',
            text: '키워드 (영문)',
            component: {
              template: '<div><ur-text-field style="width: auto;" placeholder=""/></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list7:
        [
          { value1: '1', value2: '', value3: '' },
          { value1: '2', value2: '', value3: '' },
        ],
      // 이용안내
      columns8:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '이용 안내 (국문)',
            component: {
              template: '<div><ur-text-field style="width: auto;" placeholder=""/></div>',
            },
          },
          {
            value: 'value3',
            text: '이용 안내 (영문)',
            component: {
              template: '<div><ur-text-field style="width: auto;" placeholder=""/></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list8:
        [
          { value1: '1', value2: '', value3: '' },
          { value1: '2', value2: '', value3: '' },
        ],

      // 연관 상품 관리
      columns9:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '제목 (국문)',
            component: {
              template: '<div><ur-text-field placeholder=""/></div>',
            },
          },
          {
            value: 'value3',
            text: '제목 (영문)',
            component: {
              template: '<div><ur-text-field placeholder=""/></div>',
            },
          },
          {
            value: 'value4',
            text: '콘텐츠 URL',
            component: {
              template: '<div><ur-text-field placeholder="www.youtube.everland.com"/></div>',
            },
          },
          {
            value: 'value5',
            text: '연관 상품 썸네일 이미지',
            component: {
              template: '<div class="pdCol10" style="flex-direction: column;"><div style="display: flex; flex-direction: row; align-items: center;"><ur-text-field class="pr10"/><ur-button color="violet">파일 찾기</ur-button></div><img class="pdCol10" src="images/food/food_0.png" style="width: fit-content; height: 150px;"><ur-text-field value="ALT 태그를 입력하세요"/></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list9:
        [
          {
            value1: '1', value2: '', value3: '', value4: '', value5: '',
          },
          {
            value1: '1', value2: '', value3: '', value4: '', value5: '',
          },
        ],
      // 유의사항
      columns10:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '유의사항 (국문)',
            component: {
              template: '<div><ur-text-field style="width: auto;" placeholder=""/></div>',
            },
          },
          {
            value: 'value3',
            text: '유의사항 (영문)',
            component: {
              template: '<div><ur-text-field style="width: auto;" placeholder=""/></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list10:
        [
          { value1: '1', value2: '', value3: '' },
        ],
      // S:: 시설 카테고리 '주토피아' 선택시 동물 관리 노출
      // 동물관리
      columns11:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '동물 명 (국문)',
            component: {
              template: '<div><ur-text-field style="width: auto;" placeholder=""/></div>',
            },
          },
          {
            value: 'value3',
            text: '동물 명 (영문)',
            component: {
              template: '<div><ur-text-field style="width: auto;" placeholder=""/></div>',
            },
          },
          {
            value: 'value4',
            text: '동물 이미지',
            component: {
              template: '<div class="pdCol10" style="flex-direction: column;"><div style="display: flex; flex-direction: row; align-items: center;"><ur-text-field class="pr10"/><ur-button color="violet">파일 찾기</ur-button></div><img class="pdCol10" src="images/food/food_0.png" style="width: fit-content; height: 150px;"><ur-text-field value="ALT 태그를 입력하세요"/></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      list11:
        [
          {
            value1: '1', value2: '', value3: '', value4: '',
          },
        ],
      // E:: 시설 카테고리 '주토피아' 선택시 동물 관리 노출
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


      // POS 정보 검색 MODAL POP-UP
      columnsP1: [
        { text: 'No.', value: 'id', width: 80 },
        { text: 'POS번호', value: 'str1', width: 150 },
        { text: 'POS 명', value: 'str2' },
      ],
      listP1: [
        { id: '1', str1: 'C100A180101', str2: '게임 어드벤처-01' },
        { id: '2', str1: 'C100A180101', str2: '게임 어드벤처-02' },
        { id: '3', str1: 'C100A180101', str2: '게임 어드벤처-03' },
        { id: '4', str1: 'C100A180101', str2: '게임 어드벤처-04' },
        { id: '5', str1: 'C100A180101', str2: '게임 어드벤처-05' },
        { id: '6', str1: 'C100A180101', str2: '게임 어드벤처-06' },
        { id: '7', str1: 'C100A180101', str2: '게임 어드벤처-07' },
        { id: '8', str1: 'C100A180101', str2: '게임 어드벤처-08' },
        { id: '9', str1: 'C100A180101', str2: '게임 어드벤처-09' },
        { id: '10', str1: 'C100A180101', str2: '게임 어드벤처-10' },
      ],
      // 시설명 코드 조회 MODAL POP-UP
      columnsP2: [
        { text: '시설코드', value: 'id', width: 80 },
        { text: '시설명', value: 'str1', width: 150 },
        { text: '대표 시설코드', value: 'str2' },
        { text: '대표 시설명', value: 'str3' },
      ],
      listP2: [
        {
          id: 'CV100V89', str1: '원내시설 매출(슈팅고스트)', str2: 'C100V89', str3: '원내시설 매출(슈팅고스트)',
        },
        {
          id: 'CV100V89', str1: '원내시설 매출(로테이팅)', str2: 'C100V90', str3: '원내시설 매출(로테이팅)',
        },
        {
          id: 'CV100V89', str1: '원내시설 매출(아마존)', str2: 'C100V63', str3: '원내시설 매출(아마존)',
        },
        {
          id: 'CV100V89', str1: '동물사랑단 매출(원내)', str2: 'C100V55', str3: '원내시설 매출(원내)',
        },
        {
          id: 'CV100V89', str1: '알프스샵 매출', str2: 'C100V21', str3: '원내시설 매출(알프스샵 매출)',
        },
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

    // selectBox
    items1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '어트랙션' })
      rtn.push({ value: '3', text: '공연' })
      rtn.push({ value: '4', text: '쥬토피아' })
      rtn.push({ value: '5', text: '레스토랑' })
      rtn.push({ value: '6', text: '편의시설' })
      rtn.push({ value: '7', text: '기프트샵' })
      rtn.push({ value: '8', text: '포토존' })
      return rtn
    },
    items2() {
      const rtn = []
      rtn.push({ value: '1', text: '쥬토피아' })
      return rtn
    },
    items3() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '글로벌페어' })
      rtn.push({ value: '3', text: '아메리칸 어드벤처' })
      rtn.push({ value: '4', text: '매직랜드' })
      rtn.push({ value: '5', text: '유러피언 어드벤처' })
      rtn.push({ value: '6', text: '쥬토피아' })
      return rtn
    },
    items5() {
      const rtn = []
      rtn.push({ value: '1', text: 'A' })
      rtn.push({ value: '2', text: 'B' })
      rtn.push({ value: '3', text: 'C' })
      rtn.push({ value: '4', text: 'D' })
      rtn.push({ value: '5', text: 'E' })
      return rtn
    },
    items6() {
      const rtn = []
      rtn.push({ value: '1', text: '화장실' })
      rtn.push({ value: '2', text: '안내/티켓' })
      rtn.push({ value: '3', text: '베이비케어' })
      rtn.push({ value: '4', text: '유모차대여' })
      rtn.push({ value: '5', text: '의무실' })
      rtn.push({ value: '6', text: 'AED' })
      rtn.push({ value: '7', text: '보관함' })
      rtn.push({ value: '8', text: '휴대폰충전' })
      rtn.push({ value: '9', text: '현금인출기' })
      rtn.push({ value: '10', text: '미아/분실물' })
      rtn.push({ value: '11', text: '피크닉' })
      rtn.push({ value: '12', text: '흡연구역' })
      rtn.push({ value: '13', text: '휠체어대여' })
      return rtn
    },
    // modalPopUp
    modalP01() {
      return this.$refs.modalP01
    },
    modalP02() {
      return this.$refs.modalP02
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
    openModalP02() { this.modalP02.open() },
    closeModal() { this.modal.close() },
    closed() {},
  },
}
</script>
<style scoped>
</style>
