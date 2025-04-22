<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S:: 노출정보 -->
      <div class="comm_title_wrap">
        <h4>
          노출 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="게시 구분"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-radio
            v-model="R1"
            value="Radio01"
            sm
          >
            공통
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio02"
            sm
          >
            에버랜드
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio03"
            sm
          >
            캐리비안베이
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="이벤트 구분"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-radio
            v-model="R2"
            value="Radio01"
            sm
          >
            온라인 이벤트
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio02"
            sm
          >
            파크 이벤트
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio03"
            sm
          >
            PICK 이벤트
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="이벤트 분류"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD1"
            :items="itemsD1"
          />
        </ur-form-item>
        <ur-form-item
          label="이벤트 명"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%;"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="이벤트 기간"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-date-time-range-picker
            v-model="dateValue1"
            init="today"
          />
        </ur-form-item>
        <ur-form-item
          label="노출 여부"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="R3"
            value="Radio01"
            sm
          >
            Y
          </ur-radio>
          <ur-radio
            v-model="R3"
            value="Radio02"
            sm
          >
            N
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="노출 순서"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%;"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 노출정보 -->

      <!-- S:: 조건정보 -->
      <div class="comm_title_wrap  mt45">
        <h4>
          조건 정보
        </h4>
        <span class="subscript_txt">
          * 참여 조건 미 설정 시, 전체 대상으로 설정됩니다.
        </span>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="참여 조건"
          :label-align="'right'"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 90%;"
          />
          <ur-icon-button
            icon="search"
            icon-type="line"
            color="primary"
            @click="openModalP01"
          />
          <ur-modal
            ref="modalP01"
            class="modal-b1c6"
            xlarge
            title="참여 조건 정보 설정"
            @closed="closed"
          >
            <P01 />
            <!-- :page-id="contextPageId" -->
          </ur-modal>
        </ur-form-item>
        <ur-form-item
          label="노출 조건"
          :label-align="'right'"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="R4"
            value="Radio01"
            sm
          >
            전체
          </ur-radio>
          <ur-radio
            v-model="R4"
            value="Radio02"
            sm
          >
            필터 대상
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="소진 솜"
          required
          :label-align="'right'"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%;"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="참여 기회"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD2"
            :items="itemsD2"
          />
          <ur-text-field
            value=""
            style="width: 50%;"
          />
          회
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 조건정보 -->

      <!-- S:: 이벤트 상세 정보 -->
      <!-- S:: 타이틀 버튼 양쪽 -->
      <div class="comm_btn_wrap">
        <div class="comm_title_wrap">
          <h4>
            이벤트 상세 정보
          </h4>
        </div>
        <div class="left_box pl16">
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
        <div class="right_box">
          <span class="guid_txt mr16">
            *파일 용량 : 5MB 미만
          </span>
          <ur-button>
            <ur-icon
              icon="download"
              icon-type="line"
              size="small"
              spacing
            />
            엑셀 양식 다운로드
          </ur-button>
          <ur-button>
            <ur-icon
              icon="upload"
              icon-type="line"
              size="small"
              spacing
            />
            엑셀업로드
          </ur-button>
        </div>
      </div>
      <!-- E:: 타이틀 버튼 양쪽 -->
      <ur-data-grid
        ref="grid01"
        :headers="columnsT1"
        :data-source="listT1"
        :options="opts1"
        :data-set-options="{id: 'id'}"
      />
      <!-- E:: 이벤트 상세 정보 -->
      <!-- S:: 스탬프 이벤트 상세 정보 -->
      <div class="comm_btn_wrap">
        <div class="comm_title_wrap">
          <h4>
            이벤트 상세 정보
          </h4>
        </div>
        <div class="left_box pl16">
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
        :headers="columnsT3"
        :data-source="listT3"
        :options="opts1"
        :data-set-options="{id: 'id'}"
      />
      <div class="btn_wrap mt10">
        <div class="right_box">
          <!-- ::S 스탬프 이벤트상세정보 내 모달팝업버튼 개발완료시 삭제 요함 -->
          <ur-button
            color="violet"
            @click="openModalP04"
          >
            <ur-modal
              ref="modalP04"
              class="modal-b1c6"
              xlarge
              title="달성 조건 정보 설정"
              @closed="closed"
            >
              <P04 />
              <!-- :page-id="contextPageId" -->
            </ur-modal>
            달성조건팝업
          </ur-button>
          <!-- ::E 스탬프 이벤트상세정보 내 모달팝업버튼 개발완료시 삭제 요함 -->
        </div>
      </div>
      <!-- E:: 스탬프 이벤트 상세 정보 -->

      <!-- S:: 이벤트 이미지 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          이벤트 이미지 정보
        </h4>
      </div>
      <ur-form-box toggleable>
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
                style="width: 50%;"
              />
              <ur-button color="violet">
                파일 찾기
              </ur-button>
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <span class="guid_txt">
              * 이미지 : 624 x 320 / 파일 규격 : 15MB 미만 jpg, png, gif
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
        <!-- S:: ALT태그 추가 -->
        <ur-form-item
          label="상세 배너 이미지"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="compo_col_wrap"
        >
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <ur-text-field
                value=""
                style="width: 50%;"
              />
              <ur-button color="violet">
                파일 찾기
              </ur-button>
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <span class="guid_txt">
              * 이미지 : 720 x 가변 / 파일 규격 : 15MB 미만 jpg, png, gif
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
        <!-- S:: ALT태그 추가 -->
        <ur-form-item
          label="상세 배경 이미지"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="compo_col_wrap"
        >
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <ur-text-field
                value=""
                style="width: 50%;"
              />
              <ur-button color="violet">
                파일 찾기
              </ur-button>
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <span class="guid_txt">
              * 이미지 : 720 x 가변 / 파일 규격 : 15MB 미만 jpg, png, gif
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
        <!-- S:: ALT태그 추가 -->
        <ur-form-item
          label="스탬프 배경 이미지"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="compo_col_wrap"
        >
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <ur-text-field
                value=""
                style="width: 50%;"
              />
              <ur-button color="violet">
                파일 찾기
              </ur-button>
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <span class="guid_txt">
              * 이미지 : 720 x 가변 / 파일 규격 : 15MB 미만 jpg, png, gif
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
        <!-- S:: ALT태그 추가 -->
        <ur-form-item
          label="스탬프 보상 이미지"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="compo_col_wrap"
        >
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <ur-text-field
                value=""
                style="width: 50%;"
              />
              <ur-button color="violet">
                파일 찾기
              </ur-button>
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <span class="guid_txt">
              * 이미지 : 192 x 192 / 파일 규격 : 15MB 미만 jpg, png, gif
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
        <!-- S:: ALT태그 추가 -->
        <ur-form-item
          label="스탬프 비활성화 이미지"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="compo_col_wrap"
        >
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <ur-text-field
                value=""
                style="width: 50%;"
              />
              <ur-button color="violet">
                파일 찾기
              </ur-button>
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <span class="guid_txt">
              * 이미지 : 192 x 192 / 파일 규격 : 15MB 미만 jpg, png, gif
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
        <!-- S:: ALT태그 추가 -->
        <ur-form-item
          label="스탬프 활성화 이미지"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="compo_col_wrap"
        >
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <ur-text-field
                value=""
                style="width: 50%;"
              />
              <ur-button color="violet">
                파일 찾기
              </ur-button>
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <span class="guid_txt">
              * 이미지 : 192 x 192 / 파일 규격 : 15MB 미만 jpg, png, gif
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
        <!-- S:: ALT태그 추가 -->
        <ur-form-item
          label="판넬 이미지"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="compo_col_wrap"
        >
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <ur-text-field
                value=""
                style="width: 50%;"
              />
              <ur-button color="violet">
                파일 찾기
              </ur-button>
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <span class="guid_txt">
              * 이미지 : 560 x 560 / 파일 규격 : 15MB 미만 jpg, png, gif
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
        <!-- S:: ALT태그 추가 -->
        <ur-form-item
          label="스페셜 스탬프 이미지"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="compo_col_wrap"
        >
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <ur-text-field
                value=""
                style="width: 50%;"
              />
              <ur-button color="violet">
                파일 찾기
              </ur-button>
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <span class="guid_txt">
              * 이미지 : 192 x 192 / 파일 규격 : 15MB 미만 jpg, png, gif
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
        <!-- S:: ALT태그 추가 -->
        <ur-form-item
          label="기준침 이미지"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="compo_col_wrap"
        >
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <ur-text-field
                value=""
                style="width: 50%;"
              />
              <ur-button color="violet">
                파일 찾기
              </ur-button>
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <span class="guid_txt">
              * 이미지 : 64 x 90 / 파일 규격 : 15MB 미만 jpg, png, gif
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
        <!-- S:: ALT태그 추가 -->
        <ur-form-item
          label="시작 버튼 이미지"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="compo_col_wrap"
        >
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <ur-text-field
                value=""
                style="width: 50%;"
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
      <!-- E:: 이벤트 이미지 정보 -->

      <!-- S:: 응모이벤트 이벤트 상세 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          이벤트 상세 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="신청 기간"
          required
          :label-align="'right'"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-range-picker
            auto-confirm
            input-type="YYYY-MM-DD"
            init="day+30"
          />
        </ur-form-item>
        <ur-form-item
          label="당첨자 발표일"
          required
          :label-align="'right'"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-range-picker
            auto-confirm
            input-type="YYYY-MM-DD"
            init="day+30"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="내용"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <sui-web-editor
            ref="approvalWebEditor"
            :is-viewer="isEditorViewerMode"
            :initialized-callback="editorInitCallback"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 응모이벤트 이벤트 상세 정보 -->
      <!-- S:: 기타이벤트 이벤트 상세 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          이벤트 상세 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="내용"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <sui-web-editor
            ref="approvalWebEditor"
            :is-viewer="isEditorViewerMode"
            :initialized-callback="editorInitCallback"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 기타이벤트 이벤트 상세 정보 -->

      <!-- S:: OX 보상 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          보상정보
        </h4>
      </div>
      <ur-data-grid
        ref="grid03"
        :headers="columnsT2"
        :data-source="listT2"
        :options="options"
        :data-set-options="{id: 'id'}"
      />

      <div class="btn_wrap mt10">
        <div class="right_box">
          <!-- ::S 발행쿠폰검색 내 모달팝업버튼 개발완료시 삭제 요함 -->
          <ur-button
            color="violet"
            @click="openModalP02"
          >
            <ur-modal
              ref="modalP02"
              class="modal-b1c6"
              xlarge
              title="발행쿠폰검색"
              @closed="closed"
            >
              <P02 />
              <!-- :page-id="contextPageId" -->
            </ur-modal>
            발행쿠폰검색팝업
          </ur-button>
          <!-- ::E 발행쿠폰검색 내 모달팝업버튼 개발완료시 삭제 요함 -->
        </div>
      </div>
      <!-- E:: OX 보상 정보 -->
      <!-- S:: 스탬프 보상 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          보상정보
        </h4>
        <div class="left_box pl16">
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
        ref="grid04"
        :headers="columnsT4"
        :data-source="listT4"
        :options="opts1"
        :data-set-options="{id: 'id'}"
      />

      <div class="btn_wrap mt10">
        <div class="right_box">
          <!-- ::S 발행쿠폰검색 내 모달팝업버튼 개발완료시 삭제 요함 -->
          <ur-button
            color="violet"
            @click="openModalP02"
          >
            <ur-modal
              ref="modalP02"
              class="modal-b1c6"
              xlarge
              title="발행쿠폰검색"
              @closed="closed"
            >
              <P02 />
              <!-- :page-id="contextPageId" -->
            </ur-modal>
            발행쿠폰검색팝업
          </ur-button>
          <!-- ::E 발행쿠폰검색 내 모달팝업버튼 개발완료시 삭제 요함 -->
        </div>
      </div>
      <!-- E:: 스탬프 보상 정보 -->
      <!-- S:: 룰렛 보상 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          보상정보
        </h4>
      </div>
      <ur-data-grid
        ref="grid05"
        :headers="columnsT5"
        :data-source="listT5"
        :options="options"
        :data-set-options="{id: 'id'}"
      />

      <div class="btn_wrap mt10">
        <div class="right_box">
          <!-- ::S 발행쿠폰검색 내 모달팝업버튼 개발완료시 삭제 요함 -->
          <ur-button
            color="violet"
            @click="openModalP02"
          >
            <ur-modal
              ref="modalP02"
              class="modal-b1c6"
              xlarge
              title="발행쿠폰검색"
              @closed="closed"
            >
              <P02 />
              <!-- :page-id="contextPageId" -->
            </ur-modal>
            발행쿠폰검색팝업
          </ur-button>
          <!-- ::E 발행쿠폰검색 내 모달팝업버튼 개발완료시 삭제 요함 -->
        </div>
      </div>
      <!-- E:: 룰렛 보상 정보 -->
      <!-- S:: 응모 보상 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          보상정보
        </h4>
        <div class="left_box pl16">
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
        ref="grid06"
        :headers="columnsT6"
        :data-source="listT6"
        :options="options"
        :data-set-options="{id: 'id'}"
      />

      <div class="btn_wrap mt10">
        <div class="right_box">
          <!-- ::S 발행쿠폰검색 내 모달팝업버튼 개발완료시 삭제 요함 -->
          <ur-button
            color="violet"
            @click="openModalP02"
          >
            <ur-modal
              ref="modalP02"
              class="modal-b1c6"
              xlarge
              title="발행쿠폰검색"
              @closed="closed"
            >
              <P02 />
              <!-- :page-id="contextPageId" -->
            </ur-modal>
            발행쿠폰검색팝업
          </ur-button>
          <!-- ::E 발행쿠폰검색 내 모달팝업버튼 개발완료시 삭제 요함 -->
        </div>
      </div>
      <!-- E:: 응모 보상 정보 -->


      <div class="bt1 mt10" />
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
import P01 from './components/PGE_AAZ_00077_P01.vue'
import P02 from './components/PGE_AAZ_00077_P02.vue'
import P04 from './components/PGE_AAZ_00077_P04.vue'

export default {
  name: 'PGE_AAZ_00077', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
    P02,
    P04,
  },
  data() {
    return {
      // 테이블 옵션
      opts1: { // 토탈 x 전체선택X 셀선택 o
        noInfo: true,
        rowHeight: 50,
        multiSelect: false,
        selectCheck: true,
        height: 300,
      },
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      // 테이블 드롭다운
      itemsT1D1: [
        { value: '1', text: '제한' },
        { value: '2', text: '무제한' },
      ],
      // 라디오 버튼
      R1: null,
      R2: null,
      R3: null,
      R4: null,
      // 드롭다운
      valueD1: null,
      valueD2: null,
      // OX 보상정보 테이블
      valueT2D1: null,
      // 스탬프 보상정보 테이블
      valueT4D1: null,
      // 룰렛 보상정보 테이블
      valueT5D1: null,
      // 응모 보상정보 테이블
      valueT6D1: null,

      // 이벤트 상세 정보 테이블
      columnsT1: [
        { text: 'No.', value: 'value1', width: 40 },
        {
          text: '문항',
          value: 'value2',
          required: true,
          component: {
            template: '<div><ur-text-field value="" style="width: 100%;" class="pr10"/></div>',
          },
        },
        {
          text: '정답',
          value: 'value3',
          required: true,
          component: {
            template: '<div><ur-radio v-model="T1R1" value="Radio01" sm> O </ur-radio> <ur-radio v-model="T1R1" value="Radio02" sm> X </ur-radio></div>',
          },
        },
        {
          text: '사용 여부',
          value: 'value4',
          required: true,
          component: {
            template: '<div><ur-radio v-model="T1R2" value="Radio01" sm> Y </ur-radio> <ur-radio v-model="T1R2" value="Radio02" sm> N </ur-radio></div>',
          },
        },
        {
          text: '사용 기간',
          value: 'value5',
          required: true,
          component: {
            template: '<div><ur-range-picker auto-confirm input-type="YYYY-MM-DD" init="day+30"/></div>',
          },
        },

      ],
      listT1: [
        {
          value1: '1', value2: '', value3: '', value4: '', value5: '',
        },
      ],
      // 스탬프 이벤트 상세 정보 테이블
      columnsT3: [
        { text: 'No.', value: 'value1', width: 40 },
        {
          text: '스페셜 스탬프 여부',
          value: 'value2',
          required: true,
          component: {
            template: '<div><ur-radio v-model="T1R1" value="Radio01" sm> Y </ur-radio> <ur-radio v-model="T1R1" value="Radio02" sm> N </ur-radio></div>',
          },
        },
        {
          text: '항목 명',
          value: 'value3',
          required: true,
          component: {
            template: '<div><ur-text-field value="" class="pr10" style="width: 100%;"/></div>',
          },
        },
        {
          text: '달성 조건',
          value: 'value4',
          required: true,
          component: {
            template: '<div><ur-text-field value="" style="width: 100%;"/><ur-icon-button icon="search" icon-type="line" color="primary" @click="openModalP02" /></div>',
          },
        },


      ],
      listT3: [
        {
          value1: '1', value2: '', value3: '', value4: '',
        },
      ],
      // OX 보상 정보 테이블
      columnsT2: [
        {
          text: '구분',
          value: 'value1',
          required: true,
          component: {
            template: '<div><ur-dropdown v-model="valueT2D1" class="pr10" style="width: 100%;" :items="itemsT2D1"/></div>',
          },
        },
        {
          text: '경품 명',
          value: 'value2',
          component: {
            template: '<div><ur-text-field value="" class="pr10" style="width: 100%;"/></div>',
          },
        },
        {
          text: '지급 쿠폰',
          value: 'value3',
          component: {
            template: '<div ><ur-text-field value="" style="width: 100%;"/><ur-icon-button icon="search" icon-type="line" color="primary" @click="openModalP02" /></div>',
          },
        },
        {
          text: '수량',
          value: 'value4',
          required: true,
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div style="align-items: center;"><ur-dropdown v-model="code1" class="pr10" :items="me.itemsT1D1"/><ur-text-field value="" style="width: 100%;"/><span>개</span></div>',
            data() {
              return {
                code1: this.value,
              }
            },
          },
        },
      ],
      listT2: [
        {
          value1: '', value2: '', value3: '', value4: '',
        },
      ],
      // 스탬프 보상 정보 테이블
      columnsT4: [
        { text: 'No.', value: 'value1', width: 40 },
        {
          text: '구분',
          value: 'value2',
          required: true,
          component: {
            template: '<div><ur-dropdown v-model="valueT4D1" class="pr10" :items="itemsT4D1"/></div>',
          },
        },
        {
          text: '경품 명',
          required: true,
          value: 'value3',
          component: {
            template: '<div><ur-text-field value="" class="pr10" style="width: 100%;"/></div>',
          },
        },
        {
          text: '지급 쿠폰',
          value: 'value4',
          component: {
            template: '<div><ur-text-field value="" style="width: 100%;"/><ur-icon-button icon="search" icon-type="line" color="primary" @click="openModalP02" /></div>',
          },
        },
        {
          text: '수량',
          value: 'value5',
          required: true,
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div style="align-items: center;"><ur-dropdown v-model="code1" class="pr10" :items="me.itemsT1D1"/><ur-text-field value="" style="width: 100%;"/><span>개</span></div>',
            data() {
              return {
                code1: this.value,
              }
            },
          },
        },
        {
          text: '보상 조건',
          value: 'value6',
          required: true,
          component: {
            template: '<div style="align-items: center;"><ur-text-field value="" style="width: 100%;"/><span>개 달성</span></div>',
          },
        },


      ],
      listT4: [
        {
          value1: '1', value2: '', value3: '', value4: '', value5: '', value6: '',
        },
      ],
      // 룰렛 보상 정보 테이블
      columnsT5: [
        { text: 'No.', value: 'value1', width: 40 },
        {
          text: '구분',
          value: 'value2',
          required: true,
          component: {
            template: '<div><ur-dropdown class="pr10" v-model="valueT5D1" :items="itemsT5D1"/></div>',
          },
        },
        {
          text: '경품 명',
          required: true,
          value: 'value3',
          component: {
            template: '<div><ur-text-field class="pr10" value="" style="width: 100%;"/></div>',
          },
        },
        {
          text: '지급 쿠폰',
          value: 'value4',
          component: {
            template: '<div><ur-text-field value="" style="width: 100%;"/><ur-icon-button icon="search" icon-type="line" color="primary" @click="openModalP02" /></div>',
          },
        },
        {
          text: '수량',
          value: 'value5',
          required: true,
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div style="align-items: center;"><ur-dropdown class="pr10" v-model="code1" :items="me.itemsT1D1"/><ur-text-field value="" style="width: 100%;"/><span>개</span></div>',
            data() {
              return {
                code1: this.value,
              }
            },
          },
        },
        {
          text: '확률',
          value: 'value6',
          required: true,
          component: {
            template: '<div style="align-items: center;"><ur-text-field value="" style="width: 100%;"/><span>%</span></div>',
          },
        },


      ],
      listT5: [
        {
          value1: '1', value2: '', value3: '', value4: '', value5: '', value6: '',
        },
      ],
      // 응모 보상 정보 테이블
      columnsT6: [
        { text: 'No.', value: 'value1', width: 40 },
        {
          text: '구분',
          value: 'value2',
          required: true,
          component: {
            template: '<div><ur-dropdown class="pr10" v-model="valueT6D1" :items="itemsT6D1"/></div>',
          },
        },
        {
          text: '경품 명',
          value: 'value3',
          required: true,
          component: {
            template: '<div><ur-text-field class="pr10" value="" style="width: 100%;"/></div>',
          },
        },
        {
          text: '지급 쿠폰',
          value: 'value4',
          component: {
            template: '<div><ur-text-field value="" style="width: 100%;"/><ur-icon-button icon="search" icon-type="line" color="primary" @click="openModalP02" /></div>',
          },
        },
        {
          text: '수량',
          value: 'value5',
          required: true,
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div style="align-items: center;"><ur-dropdown class="pr10" v-model="code1" :items="me.itemsT1D1"/><ur-text-field value="" style="width: 100%;"/><span>개</span></div>',
            data() {
              return {
                code1: this.value,
              }
            },
          },
        },


      ],
      listT6: [
        {
          value1: '1', value2: '', value3: '', value4: '', value5: '',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능+

    // modalPopUp
    modalP01() {
      return this.$refs.modalP01
    },
    modalP02() {
      return this.$refs.modalP02
    },
    modalP04() {
      return this.$refs.modalP04
    },

    // 드랍다운
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: 'OX 퀴즈' })
      rtn.push({ value: '2', text: '스탬프' })
      rtn.push({ value: '3', text: '룰렛' })
      rtn.push({ value: '4', text: '응모 이벤트' })
      rtn.push({ value: '5', text: '기타 이벤트' })
      return rtn
    },
    itemsD2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '일 단위' })
      rtn.push({ value: '3', text: '주 단위' })
      rtn.push({ value: '4', text: '월 단위' })
      return rtn
    },

    // OX 보상정보테이블 드랍다운
    itemsT2D1() {
      const rtn = []
      rtn.push({ value: '1', text: '쿠폰' })
      rtn.push({ value: '2', text: '실물 보상' })
      return rtn
    },
    // 스탬프 보상정보테이블 드랍다운
    itemsT4D1() {
      const rtn = []
      rtn.push({ value: '1', text: '쿠폰' })
      rtn.push({ value: '2', text: '실물 보상' })
      return rtn
    },
    // 룰렛 보상정보테이블 드랍다운
    itemsT5D1() {
      const rtn = []
      rtn.push({ value: '1', text: '쿠폰' })
      rtn.push({ value: '2', text: '실물 보상' })
      rtn.push({ value: '3', text: '꽝' })
      return rtn
    },
    // 응모 보상정보테이블 드랍다운
    itemsT6D1() {
      const rtn = []
      rtn.push({ value: '1', text: '쿠폰' })
      rtn.push({ value: '2', text: '실물 보상' })
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
    openModalP01() { this.modalP01.open() },
    openModalP02() { this.modalP02.open() },
    openModalP04() { this.modalP04.open() },
    closeModal() { this.modal.close() },
    closed() {},

    onToggle(isShown) {
      if (!isShown) {
        console.log(this.$refs.dropdown.getSelectedItem())
      }
    },
  },
}
</script>
<style scoped>
</style>
