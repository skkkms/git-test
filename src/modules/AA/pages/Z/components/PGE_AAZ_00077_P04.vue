<template>
  <div>
    <template slot="title">
      <div class="modal-title">
        달성 조건 정보 설정
      </div>
    </template>
    <template>
      <div class="modal-body">
        <div class="comm_title_wrap">
          <h4 class="pr16">
            조건 정보
          </h4>
          <div class="title_compo">
            <ur-button color="violet">
              초기화
            </ur-button>
          </div>
        </div>
        <!-- ::S 입장인경우 테이블 -->
        <ur-data-grid
          ref="grid01"
          :headers="columnsT1D1"
          :options="opts1"
          :data-source="listT1D1"
          :data-set-options="{id: 'id'}"
        />
        <!-- ::E 입장인경우 테이블 -->
        <!-- ::S 퇴장인경우 테이블 -->
        <ur-data-grid
          ref="grid02"
          :headers="columnsT2D1"
          :options="opts1"
          :data-source="listT2D1"
          :data-set-options="{id: 'id'}"
        />
        <!-- ::E 퇴장인경우 테이블 -->
        <!-- ::S 구매(수정)인경우 테이블 -->
        <ur-data-grid
          ref="grid03"
          :headers="columnsT3D1"
          :options="opts1"
          :data-source="listT3D1"
          :data-set-options="{id: 'id'}"
        />
        <!-- ::E 구매(수정)인경우 테이블 -->
        <div class="btn_wrap mt10">
          <div class="right_box">
            <!-- ::S 품목 검색-상품 팝업 버튼 개발완료시 삭제 요함 -->
            <ur-button
              color="violet"
              @click="openModalP01"
            >
              <ur-modal
                ref="modalP01"
                class="modal-b1c6"
                xlarge
                title="품목 검색-상품 팝업"
                @closed="closed"
              >
                <P01 />
              <!-- :page-id="contextPageId" -->
              </ur-modal>
              품목 검색-상품 팝업
            </ur-button>
          <!-- ::E 품목 검색-상품 팝업 버튼 개발완료시 삭제 요함 -->
          </div>
        </div>
        <!-- ::S 구매(수정)인경우 테이블 -->
        <ur-data-grid
          ref="grid04"
          :headers="columnsT3D1"
          :options="opts1"
          :data-source="listT3D2"
          :data-set-options="{id: 'id'}"
        />
        <!-- ::E 구매(수정)인경우 테이블 -->
        <div class="btn_wrap mt10">
          <div class="right_box">
            <!-- ::S POS 상세 팝업 버튼 개발완료시 삭제 요함 -->
            <ur-button
              color="violet"
              @click="openModalP02"
            >
              <ur-modal
                ref="modalP02"
                class="modal-b1c6"
                xlarge
                title="POS정보 검색"
                @closed="closed"
              >
                <P02 />
              <!-- :page-id="contextPageId" -->
              </ur-modal>
              POS 상세 팝업
            </ur-button>
          <!-- ::E POS 상세 팝업 버튼 개발완료시 삭제 요함 -->
          </div>
        </div>
        <!-- ::S 이용인경우 테이블 -->
        <ur-data-grid
          ref="grid05"
          :headers="columnsT4D1"
          :options="opts1"
          :data-source="listT4D1"
          :data-set-options="{id: 'id'}"
        />
        <!-- ::E 이용인경우 테이블 -->
        <!-- ::S 코스인경우 테이블 -->
        <ur-data-grid
          ref="grid06"
          :headers="columnsT5D1"
          :options="opts1"
          :data-source="listT5D1"
          :data-set-options="{id: 'id'}"
        />
        <!-- ::E 코스인경우 테이블 -->
        <!-- ::S 걸음수인경우 테이블 -->
        <ur-data-grid
          ref="grid07"
          :headers="columnsT6D1"
          :options="opts1"
          :data-source="listT6D1"
          :data-set-options="{id: 'id'}"
        />
        <!-- ::E 걸음수인경우 테이블 -->
        <!-- ::S 날씨인경우 테이블 -->
        <ur-data-grid
          ref="grid08"
          :headers="columnsT7D1"
          :options="opts1"
          :data-source="listT7D1"
          :data-set-options="{id: 'id'}"
        />
        <!-- ::E 날씨인경우 테이블 -->
        <!-- ::S 마케팅수신동의인경우 테이블 -->
        <ur-data-grid
          ref="grid09"
          :headers="columnsT8D1"
          :options="opts1"
          :data-source="listT8D1"
          :data-set-options="{id: 'id'}"
        />
        <!-- ::E 마케팅수신동의인경우 테이블 -->
      </div>
    </template>
    <template>
      <div class="btn_wrap">
        <div class="right_box">
          <ur-button
            color="violet"
            @click="closeModalP04"
          >
            닫기
          </ur-button>
          <ur-button
            color="violet"
            solid
          >
            저장
          </ur-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import P01 from '../PGE_AAZ_00133.vue'
import P02 from '../PGE_AAZ_00135.vue'

export default {
  name: 'PGE_AAZ_00077_P04', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
    P02,
  },
  data() {
    return {
      // 달성 조건 정보 테이블(입장)
      itemsT1D1: [
        { value: '1', text: '입장' },
        { value: '2', text: '퇴장' },
        { value: '3', text: '구매(수정)' },
        { value: '4', text: '이용' },
        { value: '5', text: '코스' },
        { value: '6', text: '걸음' },
        { value: '7', text: '날씨' },
        { value: '8', text: '마케팅 수신동의 여부' },
      ],
      itemsT1D2: [
        { value: '1', text: '입장시간' },
        { value: '2', text: '이벤트 기간내 입장 횟수' },
        { value: '3', text: '정기권 여부' },
      ],
      itemsT1R1: [
        { value: '1', text: 'Y' },
        { value: '2', text: 'N' },
      ],
      // 달성 조건 정보 테이블(퇴장)
      itemsT2D2: [
        { value: '1', text: '퇴장확인 채널' },
      ],
      itemsT2D3: [
        { value: '1', text: '이상' },
        { value: '2', text: '횟수' },
        { value: '3', text: '총합' },
      ],
      itemsT2C1: [
        { value: '1', text: '위치정보' },
        { value: '2', text: 'OR' },
        { value: '3', text: '자체퇴장처리' },
      ],
      // 달성 조건 정보 테이블(구매(수정))
      itemsT3D2: [
        { value: '1', text: '결제수단/결제횟수' },
        { value: '2', text: '결제수단/결제금액' },
        { value: '3', text: '결제수단/결제총계' },
        { value: '4', text: '상품명/결제횟수' },
        { value: '5', text: '이용채널/결제총계' },
        { value: '6', text: 'POS분류/결제총계' },
        { value: '7', text: 'POS상세/결제총계' },
      ],
      itemsT3D3: [
        { value: '1', text: '멤버십 포인트' },
        { value: '2', text: 'PLCC카드' },
        { value: '3', text: '베이코인' },
        { value: '4', text: '스마트 예약' },
        { value: '5', text: '티켓' },
      ],
      itemsT3D4: [
        { value: '1', text: '횟수' },
        { value: '2', text: '이상' },
        { value: '3', text: '총합' },
      ],
      itemsT3C1: [
        { value: '1', text: '위치정보' },
        { value: '2', text: 'OR' },
        { value: '3', text: '자체퇴장처리' },
      ],
      // 달성 조건 정보 테이블(이용)
      itemsT4D2: [
        { value: '1', text: '내가 누른 좋아요 수' },
        { value: '2', text: '코스 등록 수' },
        { value: '3', text: '내가 등록한 코스의 좋아요 수' },
      ],
      itemsT4D3: [
        { value: '1', text: '전체(모든시설)' },
      ],
      itemsT4D4: [
        { value: '1', text: '횟수' },
        { value: '2', text: '이상' },
        { value: '3', text: '총합' },
      ],
      // 달성 조건 정보 테이블(코스)
      itemsT5D2: [
        { value: '1', text: '시설명' },
      ],
      itemsT5D3: [
        { value: '1', text: '전체(모든시설)' },
      ],
      itemsT5D4: [
        { value: '1', text: '횟수' },
        { value: '2', text: '이상' },
        { value: '3', text: '총합' },
      ],
      // 달성 조건 정보 테이블(걸음수)
      itemsT6D2: [
        { value: '1', text: '걸음 수' },
      ],
      itemsT6D3: [
        { value: '1', text: '전체(모든시설)' },
      ],
      itemsT6D4: [
        { value: '1', text: '횟수' },
        { value: '2', text: '이상' },
        { value: '3', text: '총합' },
      ],
      // 달성 조건 정보 테이블(날씨)
      itemsT7D2: [
        { value: '1', text: '이벤트 기간 내 날씨' },
        { value: '2', text: '날씨 별 입장 수' },
      ],
      itemsT7D3: [
        { value: '1', text: '비' },
      ],
      itemsT7D4: [
        { value: '1', text: '횟수' },
        { value: '2', text: '이상' },
        { value: '3', text: '총합' },
      ],
      // 달성 조건 정보 테이블(마케팅 수신 동의)
      itemsT8D2: [
        { value: '1', text: '마케팅수신동의여부' },
      ],
      itemsT8R1: [
        { value: '1', text: 'Y' },
        { value: '2', text: 'N' },
      ],

      // 테이블 옵션
      opts1: { // 토탈 x 전체선택X 셀선택 o
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },

      // 달성 조건 정보 테이블(입장)
      columnsT1D1: [
        {
          required: true,
          text: '분류',
          value: 'value1',
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code1" :items="me.itemsT1D1"/></div>',
            data() {
              return {
                code1: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '항목1',
          value: 'value2',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code2" :items="me.itemsT1D2"/></div>',
            data() {
              return {
                code2: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '항목2',
          value: 'value3',
          component: {
            props: ['row', 'value', 'text'],
            template: '<div><ur-text-field v-model="text1" style="width:90%" /></div>',
            data() {
              return {
                text1: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '설정 값',
          value: 'value4',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code3" :items="me.itemsT1D3"/></div>',
            data() {
              return {
                code3: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '입력 값',
          value: 'value5',
          component: {
            props: ['row', 'value', 'text'],
            template: '<div><ur-time-picker v-model="text5" mode="text" /></div>',
            data() {
              return {
                text5: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '입력 값',
          value: 'value6',
          component: {
            props: ['row', 'value', 'text'],
            template: '<div><ur-text-field v-model="text2" /></div>',
            data() {
              return {
                text2: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '입력 값',
          value: 'value7',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-radio-wrapper v-model="valueT1R1" :items="me.itemsT1R1" sm/></div>',
            data() {
              return {
                valueT1R1: this.value,
              }
            },
          },
        },
      ],
      listT1D1: [
        {
          value1: '1',
          value2: '1',
          value3: '',
          value4: '1',
          value5: '',
        },
        {
          value1: '1',
          value2: '1',
          value3: '',
          value4: '1',
          value6: 4,
        },
        {
          value1: '1',
          value2: '1',
          value3: '',
          value4: '1',
          value7: '',
        },
      ],
      // 달성 조건 정보 테이블(퇴장)
      columnsT2D1: [
        {
          required: true,
          text: '분류',
          value: 'value1',
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code1" :items="me.itemsT1D1"/></div>',
            data() {
              return {
                code1: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '항목1',
          value: 'value2',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code2" :items="me.itemsT2D2"/></div>',
            data() {
              return {
                code2: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '항목2',
          value: 'value3',
          component: {
            props: ['row', 'value', 'text'],
            template: '<div><ur-text-field v-model="text1" style="width:90%" /></div>',
            data() {
              return {
                text1: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '설정 값',
          value: 'value4',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code3" :items="me.itemsT2D3" disabled /></div>',
            data() {
              return {
                code3: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '입력 값',
          value: 'value5',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-checkbox-wrapper v-model="valueP1C1" :items="me.itemsT2C1" sm /><ur-check-wrapper /></div>',
            data() {
              return {
                valueP1C1: this.value,
              }
            },
          },
        },
      ],
      listT2D1: [
        {
          value1: '2',
          value2: '1',
          value3: '',
          value4: '',
          value5: '',
        },
      ],
      // 달성 조건 정보 테이블(구매(수정))
      columnsT3D1: [
        {
          required: true,
          text: '분류',
          value: 'value1',
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code1" :items="me.itemsT1D1"/></div>',
            data() {
              return {
                code1: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '항목1',
          value: 'value2',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code2" :items="me.itemsT3D2"/></div>',
            data() {
              return {
                code2: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '항목2',
          value: 'value4',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code3" :items="me.itemsT3D3" /></div>',
            data() {
              return {
                code3: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '항목2',
          value: 'value5',
          component: {
            props: ['row', 'value', 'text'],
            template: '<div><ur-text-field v-model="text1" style="width:90%" /><ur-icon-button class="ml16" icon="search" icon-type="line" color="primary" @click="" /></div>',
            data() {
              return {
                text1: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '설정 값',
          value: 'value6',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code4" :items="me.itemsT3D4" /></div>',
            data() {
              return {
                code4: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '입력 값',
          value: 'value7',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-text-field v-model="text2" style="width:90%" /></div>',
            data() {
              return {
                text2: this.value,
              }
            },
          },
        },
      ],
      listT3D1: [
        {
          value1: '3',
          value2: '4',
          value3: '',
          value4: '',
          value5: '',
          value6: '',
          value7: '',
        },
      ],
      listT3D2: [
        {
          value1: '3',
          value2: '7',
          value3: '',
          value4: '',
          value5: '',
          value6: '',
          value7: '',
        },
      ],
      // 달성 조건 정보 테이블(코스)
      columnsT4D1: [
        {
          required: true,
          text: '분류',
          value: 'value1',
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code1" :items="me.itemsT1D1"/></div>',
            data() {
              return {
                code1: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '항목1',
          value: 'value2',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code2" :items="me.itemsT4D2"/></div>',
            data() {
              return {
                code2: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '항목2',
          value: 'value3',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code3" :items="me.itemsT4D3" /></div>',
            data() {
              return {
                code3: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '설정 값',
          value: 'value4',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code4" :items="me.itemsT3D4" /></div>',
            data() {
              return {
                code4: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '입력 값',
          value: 'value5',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-text-field v-model="text2" style="width:90%" /></div>',
            data() {
              return {
                text2: this.value,
              }
            },
          },
        },
      ],
      listT4D1: [
        {
          value1: '4',
          value2: '1',
          value3: '1',
          value4: '1',
          value5: '4',
        },
      ],
      // 달성 조건 정보 테이블(코스)
      columnsT5D1: [
        {
          required: true,
          text: '분류',
          value: 'value1',
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code1" :items="me.itemsT1D1"/></div>',
            data() {
              return {
                code1: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '항목1',
          value: 'value2',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code2" :items="me.itemsT5D2"/></div>',
            data() {
              return {
                code2: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '항목2',
          value: 'value3',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-text-field v-model="text1" style="width:90%" /></div>',
            data() {
              return {
                text1: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '설정 값',
          value: 'value4',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code4" :items="me.itemsT5D4" /></div>',
            data() {
              return {
                code4: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '입력 값',
          value: 'value5',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-text-field v-model="text2" style="width:90%" /></div>',
            data() {
              return {
                text2: this.value,
              }
            },
          },
        },
      ],
      listT5D1: [
        {
          value1: '5',
          value2: '1',
          value3: '',
          value4: '3',
          value5: '31',
        },
      ],
      // 달성 조건 정보 테이블(걸음)
      columnsT6D1: [
        {
          required: true,
          text: '분류',
          value: 'value1',
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code1" :items="me.itemsT1D1"/></div>',
            data() {
              return {
                code1: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '항목1',
          value: 'value2',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code2" :items="me.itemsT6D2"/></div>',
            data() {
              return {
                code2: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '항목2',
          value: 'value3',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-text-field v-model="text1" style="width:90%" /></div>',
            data() {
              return {
                text1: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '설정 값',
          value: 'value4',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code4" :items="me.itemsT6D4" /></div>',
            data() {
              return {
                code4: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '입력 값',
          value: 'value5',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-text-field v-model="text2" style="width:90%" /></div>',
            data() {
              return {
                text2: this.value,
              }
            },
          },
        },
      ],
      listT6D1: [
        {
          value1: '6',
          value2: '1',
          value3: '',
          value4: '2',
          value5: '8,000',
        },
      ],
      // 달성 조건 정보 테이블(날씨)
      columnsT7D1: [
        {
          required: true,
          text: '분류',
          value: 'value1',
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code1" :items="me.itemsT1D1"/></div>',
            data() {
              return {
                code1: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '항목1',
          value: 'value2',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code2" :items="me.itemsT7D2"/></div>',
            data() {
              return {
                code2: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '항목2',
          value: 'value3',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code3" :items="me.itemsT7D3"/></div>',
            data() {
              return {
                code3: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '설정 값',
          value: 'value4',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code4" :items="me.itemsT7D4" /></div>',
            data() {
              return {
                code4: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '입력 값',
          value: 'value5',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-text-field v-model="text2" style="width:90%" /></div>',
            data() {
              return {
                text2: this.value,
              }
            },
          },
        },
      ],
      listT7D1: [
        {
          value1: '7',
          value2: '2',
          value3: '1',
          value4: '1',
          value5: '2',
        },
      ],
      // 달성 조건 정보 테이블(마케팅 수신 동의)
      columnsT8D1: [
        {
          required: true,
          text: '분류',
          value: 'value1',
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code1" :items="me.itemsT1D1"/></div>',
            data() {
              return {
                code1: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '항목1',
          value: 'value2',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code2" :items="me.itemsT8D2"/></div>',
            data() {
              return {
                code2: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '항목2',
          value: 'value3',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-text-field v-model="text1" style="width:90%" /></div>',
            data() {
              return {
                text1: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '설정 값',
          value: 'value4',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-text-field v-model="text2" style="width:90%" /></div>',
            data() {
              return {
                text2: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '입력 값',
          value: 'value5',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-radio-wrapper v-model="valueT8R1" :items="me.itemsT8R1" sm/></div>',
            data() {
              return {
                valueT8R1: this.value,
              }
            },
          },
        },
      ],
      listT8D1: [
        {
          value1: '8',
          value2: '1',
          value3: '',
          value4: '',
          value5: '',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

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
    // 품목검색상품 팝업
    openModalP01() { this.modalP01.open() },
    openModalP02() { this.modalP02.open() },
    closeModal() { this.modal.close() },
    closed() {},

    closeModalP04() {},

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
