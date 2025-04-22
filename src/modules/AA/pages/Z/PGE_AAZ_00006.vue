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
          class="flex_wrap"
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
          class="flex_wrap"
          label="시설 카테고리 (2)"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="value2"
            :items="items1"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="Zone 구분"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="value3"
            :items="items3"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="게시 여부"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-radio-wrapper
            v-model="valueR2"
            :items="itemsR2"
            sm
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="게시 위치"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-checkbox-wrapper
            v-model="valueC1"
            :items="itemsC1"
            sm
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
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
          class="flex_wrap"
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
          class="flex_wrap"
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
          class="flex_wrap"
          label="시설 설명 (국문)"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <textarea
            rows="1"
            style="text-align: center;"
            placeholder="20종 150여 머리 동물 친구들이함께 살아가는 대자연 로스트 밸리!"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
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
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
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
          class="flex_wrap"
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
          class="flex_wrap"
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
          135cm~이상 195cm이하 동반
        </ur-form-item>
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
                placeholder="T 익스프레스_배너 이미지_01.png"
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
        <ur-button color="violet">
          초기화
        </ur-button>
        <span class="guid_txt">
          * 이미지 : 72 x 72 / 파일 규격 : 15MB 미만 jpg, png, gif
        </span>
      </div>
      <ur-data-grid
        ref="grid01"
        :headers="columnsT1"
        :data-source="listT1"
        :data-set-options="{id: 'id'}"
        :options="opts"
      />
      <ur-data-grid
        ref="grid02"
        :headers="columnsT1_1"
        :data-source="listT1_1"
        :data-set-options="{id: 'id'}"
        :options="opts"
      />
      <!-- E::제한사항 아이콘 관리 -->
      <!-- S::키워드 관리 -->
      <div class="comm_title_wrap mt35">
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
        :headers="columnsT2"
        :data-source="listT2"
        :data-set-options="{id: 'id'}"
        :options="options"
      />
      <!-- E::키워드 관리 -->
      <!-- S::이용 안내 -->
      <div class="comm_title_wrap mt35">
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
        :headers="columnsT3"
        :data-source="listT3"
        :data-set-options="{id: 'id'}"
        :options="options"
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
        :headers="columnsT4"
        :data-source="listT4"
        :data-set-options="{id: 'id'}"
        :options="opts"
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
        :headers="columnsT5"
        :data-source="listT5"
        :data-set-options="{id: 'id'}"
        :options="opts"
      />
      <!-- E::연관 상품 관리 -->
      <!-- S::유의 사항 -->
      <div class="comm_title_wrap mt35">
        <h4 class="pr10">
          유의 사항
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
        :headers="columnsT6"
        :data-source="listT6"
        :data-set-options="{id: 'id'}"
        :options="options"
      />
      <!-- E::유의 사항 -->


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
        :headers="columnsT7"
        :data-source="listT7"
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
        :headers="columnsT8"
        :data-source="listT8"
        :data-set-options="{id: 'id'}"
        :options="options"
      />
      <!-- E::위치 관리 -->


      <!-- S::오프라인 관리 -->
      <div class="comm_title_wrap mt45">
        <h4>오프라인 관리</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="가상대기여부"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-radio-wrapper
            v-model="valueR1"
            :items="itemsR1"
            sm
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="가상대기그룹"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="value6"
            :items="items5"
            style="width: 50%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="공연 입장 가능"
          :label-align="'right'"
          style="width: 100%;"
        >
          <ur-text-field
            value="15"
          />분 전부터 입장 가능   <span>※ 수정 시, 익일 반영됩니다.</span>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="입장 유효 간격"
          :label-align="'right'"
          style="width: 100%;"
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
          class="flex_wrap"
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
          class="flex_wrap"
          label="키오스크 스캔코드"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value="5"
            style="width: 100%;"
          />
        </ur-form-item>

        <ur-form-item
          class="flex_wrap"
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
          label="대기시간 POPS 시설"
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
            ref="modal"
            class="modal-b1c6"
            large
            dragable
            @closed="closed"
          >
            <template slot="title">
              <div class="modal-title">
                POS 정보 검색
              </div>
            </template>
            <template>
              <div class="modal-body">
                <ur-form-box toggleable>
                  <ur-form-item
                    class="flex_wrap"
                    label="파크 구분"
                    :label-align="'right'"
                    required
                    style="width: 100%; height: auto;"
                  >
                    <ur-dropdown
                      v-model="valueP1"
                      :items="itemsP1"
                    />
                  </ur-form-item>
                  <ur-form-item
                    class="flex_wrap"
                    label="POS 구분"
                    :label-align="'right'"
                    required
                    style="width: 100%; height: auto;"
                  >
                    <ur-dropdown
                      v-model="valueP2"
                      :items="itemsP2"
                    />
                  </ur-form-item>
                  <ur-form-item
                    class="flex_wrap"
                    label="부문 구분"
                    :label-align="'right'"
                    required
                    style="width: 100%; height: auto;"
                  >
                    <ur-dropdown
                      v-model="valueP3"
                      :items="itemsP3"
                    />
                  </ur-form-item>
                  <ur-form-item
                    class="flex_wrap"
                    label="시설코드/위치"
                    :label-align="'right'"
                    required
                    style="width: 100%; height: auto;"
                  >
                    <ur-text-field
                      value=""
                      readonly
                    />
                    <ur-icon-button
                      icon="search"
                      icon-type="line"
                      color="primary"
                      @click="openModalP02"
                    />
                    <!-- S:: 시설명/코드 조회  popup modal-->
                    <ur-modal
                      ref="modalP02"
                      class="modal-b1c6"
                      large
                      dragable
                      @closed="closed"
                    >
                      <template slot="title">
                        <div class="modal-title">
                          시설명/코드 조회
                        </div>
                      </template>
                      <template>
                        <div class="modal-body">
                          <ur-form-box toggleable>
                            <ur-form-item
                              class="flex_wrap"
                              label="시설코드"
                              :label-align="'right'"
                              style="width: 50%; height: auto;"
                            >
                              <ur-text-field
                                value=""
                              />
                            </ur-form-item>
                            <ur-form-item
                              class="flex_wrap"
                              label="시설명"
                              :label-align="'right'"
                              style="width: 50%; height: auto;"
                            >
                              <ur-text-field
                                value=""
                              />
                            </ur-form-item>
                          </ur-form-box>
                          <div class="btn_wrap mt10">
                            <div class="right_box">
                              <ur-button>
                                초기화
                              </ur-button>
                              <ur-button
                                color="violet"
                              >
                                검색
                              </ur-button>
                            </div>
                          </div>

                          <ur-data-grid
                            ref="grid10"
                            :headers="columnsP2"
                            :options="opts1"
                            :data-source="listP2"
                            :data-set-options="{id: 'id'}"
                          />
                        </div>
                      </template>
                      <template slot="action">
                        <ur-button
                          @click="closeModal"
                        >
                          닫기
                        </ur-button>
                        <ur-button
                          color="violet"
                        >
                          선택
                        </ur-button>
                      </template>
                    </ur-modal>
                    <!-- E:: 시설명/코드 조회  popup modal-->
                  </ur-form-item>
                  <ur-form-item
                    class="flex_wrap"
                    label="POS 종별"
                    :label-align="'right'"
                    required
                    style="width: 100%; height: auto;"
                  >
                    <ur-dropdown
                      v-model="valueP4"
                      :items="itemsP4"
                    />
                  </ur-form-item>
                </ur-form-box>
                <div class="btn_wrap mt10">
                  <div class="right_box">
                    <ur-button>
                      초기화
                    </ur-button>
                    <ur-button
                      color="violet"
                    >
                      검색
                    </ur-button>
                  </div>
                </div>

                <ur-data-grid
                  ref="grid11"
                  :headers="columnsP1"
                  :options="opts1"
                  :data-source="listP1"
                  :data-set-options="{id: 'id'}"
                />
              </div>
            </template>
            <template slot="action">
              <ur-button
                @click="closeModal"
              >
                닫기
              </ur-button>
              <ur-button
                color="violet"
              >
                선택
              </ur-button>
            </template>
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
          style="width: 100%; height: auto;"
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
      <div class="comm_title_wrap mt35">
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
        :headers="columnsT9"
        :data-source="listT9"
        :data-set-options="{id: 'id'}"
        :options="options"
      />
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="openModalP01">
            POS 정보검색 팝업
          </ur-button>
        </div>
      </div>

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
        :options="options"
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
import P02 from './components/PGE_AAZ_00004_P02.vue'


export default {
  name: 'PGEAAB00004',
  components: {
    P02,
  }, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      // 체크박스
      valueC1: '',

      // 셀렉트박스
      value1: '2',
      value2: '4',
      value3: '7',
      value4: '13',
      value5: '15',
      value6: '1',
      value7: '1',
      // 라디오 warpper
      valueR1: '',
      valueR2: '',
      // 2디오 버튼
      v1: 'true',
      v2: 'false',
      v3: null,
      v4: null,
      v5: null,
      v6: null,
      v7: null,
      // 테이블
      opts: {
        noInfo: true,
        multiSelect: false,
        selectCheck: true,
        rowHeight: 'auto',
      },
      options: { // 토탈 x 전체선택X 셀선택 o
        noInfo: true,
        multiSelect: false,
        selectCheck: true,
      },
      valueC4: '',
      valueC5: '',

      // 연관 콘텐츠 관리
      columnsT4:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '제목 (국문)',
            component: {
              template: '<div><ur-text-field style=" padding-right: 16px;" placeholder=""/></div>',
            },
          },
          {
            value: 'value3',
            text: '제목 (영문)',
            component: {
              template: '<div><ur-text-field style=" padding-right: 16px;" placeholder=""/></div>',
            },
          },
          {
            value: 'value4',
            text: '콘텐츠 URL',
            component: {
              template: '<div><ur-text-field style=" padding-right: 16px;" placeholder="www.youtube.everland.com"/></div>',
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
      listT4:
        [
          {
            value1: '1', value2: '', value3: '', value4: '', value5: '',
          },
        ],
      // 연관 상품 관리
      columnsT5:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '제목 (국문)',
            component: {
              template: '<div><ur-text-field style=" padding-right: 16px;" placeholder=""/></div>',
            },
          },
          {
            value: 'value3',
            text: '제목 (영문)',
            component: {
              template: '<div><ur-text-field style=" padding-right: 16px;" placeholder=""/></div>',
            },
          },
          {
            value: 'value4',
            text: '콘텐츠 URL',
            component: {
              template: '<div><ur-text-field style=" padding-right: 16px;" placeholder="www.youtube.everland.com"/></div>',
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
      listT5:
        [
          {
            value1: '1', value2: '', value3: '', value4: '', value5: '',
          },
        ],
      // 유의사항
      columnsT6:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '유의사항 (국문)',
            component: {
              template: '<div><ur-text-field style=" padding-right: 16px;" placeholder=""/></div>',
            },
          },
          {
            value: 'value3',
            text: '유의사항 (영문)',
            component: {
              template: '<div><ur-text-field style=" padding-right: 16px;" placeholder=""/></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      listT6:
        [
          {
            value1: '1', value2: '', value3: '',
          },
        ],


      // 배너 이미지 관리
      columnsT7:
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
      listT7:
        [
          { value1: '1', value2: '' },
        ],

      // 위치관리
      columnsT8:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '위도',
            component: {
              template: '<div><ur-text-field placeholder="127.20373"/></div>',
            },
          },
          {
            value: 'value3',
            text: '경도',
            component: {
              template: '<div><ur-text-field placeholder="127.20373"/></div>',
            },
          },
          {
            value: 'value4',
            text: '비고',
            component: {
              template: '<div><ur-text-field placeholder=""/></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      listT8:
        [
          {
            value1: '1', value2: '', value3: '', value4: '',
          },
        ],

      // 제한사항 아이콘 관리
      columnsT1:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '업로드 구분',
            component: {
              template: '<div><ur-radio v-model="v4" value="Radio 01" sm >선택 업로드</ur-radio><ur-radio v-model="v4" value="Radio 02" sm >직접 업로드</ur-radio></div>',
            },
          },
          {
            value: 'value3',
            text: '제한사항',
            component: {
              template: '<div><ur-dropdown style="width:350px;" v-model="value1" :items="items1"/><ur-dropdown style="width:350px;" v-model="value2" :items="items2"/></div>',
            },
          },
          {
            value: 'value3',
            text: '아이콘 미리보기',
            component: {
              template: '<div><ur-icon medium>emoticon</ur-icon></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      listT1:
        [
          { value1: '1', value2: '', value3: '' },
        ],
      // 제한사항 아이콘 관리
      columnsT1_1:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '업로드 구분',
            component: {
              template: '<div><ur-radio v-model="v4" value="Radio 01" sm >선택 업로드</ur-radio><ur-radio v-model="v4" value="Radio 02" sm >직접 업로드</ur-radio></div>',
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
            value: 'value3',
            text: '아이콘 미리보기',
            component: {
              template: '<div><ur-icon medium>emoticon</ur-icon></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      listT1_1:
        [
          { value1: '1', value2: '', value3: '' },
        ],
      // 키워드 관리
      columnsT2:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '키워드 (국문)',
            component: {
              template: '<div><ur-text-field value="#귀여운,#동물체험" /></div>',
            },
          },
          {
            value: 'value3',
            text: '키워드 (영문)',
            component: {
              template: '<div><ur-text-field value="#Cute" /></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      listT2:
      [
        { value1: '1', value2: '', value3: '' },
      ],
      // 이용 안내
      columnsT3:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '이용 안내 (국문)',
            component: {
              template: '<div><ur-text-field value="" /></div>',
            },
          },
          {
            value: 'value3',
            text: '이용 안내 (영문)',
            component: {
              template: '<div><ur-text-field value="" /></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      listT3:
      [
        { value1: '1', value2: '', value3: '' },
      ],
      // 시설 사용 POS 관리
      columnsT9:
        [
          { value: 'value1', text: 'No.', width: 100 },
          {
            value: 'value2',
            text: '시설 사용 POS ID',
            component: {
              template: '<div><ur-text-field class="pr10" style="width:350px;" placeholder="C100V980108"/><ur-icon-button icon="search" icon-type="line" color="primary"></div>',
            },
          },
          {
            value: 'value3',
            text: '시설 사용 POS 명',
            component: {
              template: '<div><ur-text-field class="pr10" style="width:350px;" placeholder=""/></div>',
            },
          },

          // width:num, type:'number','code'
        ],
      listT9:
        [
          { value1: '1', value2: '', value3: '[Q]유모차 매출-01' },
          { value1: '2', value2: '', value3: '원내시설 매출(로밸)' },

        ],
      // POS 정보 검색 MODAL POP-UP
      columnsP1: [
        { text: 'No.', value: 'id', width: 80 },
        { text: 'POS번호', value: 'str1', width: 150 },
        { text: 'POS 명', value: 'str2' },
      ],
      listP1: [
        { id: '1', str1: 'C100A180101', str2: '게임 어드벤처-01' },
        { id: '2', str1: 'C100A180101', str2: '게임 어드벤처-02' },

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
    itemsR2() {
      const rtn = []
      rtn.push({ value: '1', text: 'Y' })
      rtn.push({ value: '2', text: 'N' })
      return rtn
    },
    // 체크박스 Wrapper 아이템 test
    itemsC1() {
      const rtn = []
      rtn.push({ value: '1', text: 'App' })
      rtn.push({ value: '2', text: '모바일웹' })
      rtn.push({ value: '3', text: 'PC' })
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
      rtn.push({ value: '7', text: '굿즈샵' })
      rtn.push({ value: '8', text: '장소' })
      return rtn
    },
    items3() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '글로벌페어' })
      rtn.push({ value: '3', text: '아메리칸 어드벤처' })
      rtn.push({ value: '4', text: '매직랜드' })
      rtn.push({ value: '5', text: '이솝빌리지' })
      rtn.push({ value: '6', text: '유러피언 어드벤처' })
      rtn.push({ value: '7', text: '쥬토피아' })
      return rtn
    },
    items4() {
      const rtn = []
      rtn.push({ value: '1', text: '1' })
      rtn.push({ value: '2', text: '2' })
      rtn.push({ value: '3', text: '3' })
      rtn.push({ value: '4', text: '4' })
      rtn.push({ value: '5', text: '5' })
      rtn.push({ value: '6', text: '6' })
      rtn.push({ value: '7', text: '7' })
      rtn.push({ value: '8', text: '8' })
      rtn.push({ value: '9', text: '9' })
      rtn.push({ value: '10', text: '10' })
      rtn.push({ value: '11', text: '11' })
      rtn.push({ value: '12', text: '12' })
      rtn.push({ value: '13', text: '13' })
      rtn.push({ value: '14', text: '14' })
      rtn.push({ value: '15', text: '15' })
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
    // modalPopUp
    modalP01() {
      return this.$refs.modal
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
