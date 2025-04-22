<template>
  <sui-page class="custom_page">
    <!-- Page Header -->
    <sui-page-header
      :page-id="this.$options.name"
    />
    <!-- Page Contents -->
    <sui-page-contents>
      <!-- <div class="mrB30" /> -->
      <!-- S::QnA 자세히 보기  -->
      <div class="comm_title_wrap">
        <h4>QnA 자세히 보기</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="문의유형1"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          개선요청
        </ur-form-item>
        <ur-form-item
          label="문의유형2"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          인적서비스
        </ur-form-item>
        <ur-form-item
          label="답변유형"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          접수완료
        </ur-form-item>
        <ur-form-item
          label="멤버십번호"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          12349838747268
        </ur-form-item>
        <ur-form-item
          label="아이디"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          KT##30008221258
        </ur-form-item>
        <ur-form-item
          label="문의자"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          이민호
        </ur-form-item>
        <ur-form-item
          label="이메일"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          soniw1@gmail.com
        </ur-form-item>
        <ur-form-item
          label="핸드폰번호"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          010-1234-5678
        </ur-form-item>
        <ur-form-item
          label="작성일"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          2022-10-27 11:26:41
        </ur-form-item>
        <ur-form-item
          label="제목"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          [Test] QA everland 제목
        </ur-form-item>
        <ur-form-item
          label="내용"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          [Test] QA everland 제목
        </ur-form-item>
        <ur-form-item
          label="방문일"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          2022-10-14
        </ur-form-item>
        <ur-form-item
          label="첨부파일"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-button
            hyperlink
            small
            style="padding: 0;"
          >
            3936ef9d-5a6f-4faa-b64a-226a9359898e.png
          </ur-button>
        </ur-form-item>
      </ur-form-box>

      <!-- E:: QnA 자세히 보기 -->

      <!-- S:: 내역변경 -->
      <div class="comm_title_wrap mt45">
        <h4>내역변경</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="문의유형1"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="value1"
            :items="items1"
          />
        </ur-form-item>
        <ur-form-item
          label="문의유형2"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="value1_1"
            :items="items1_1"
          />
          <!-- 문의유형1 개선요청,제안사항,칭찬격려 선택시 items1_1, 일반문의 선택시 items1_2 사용  -->
        </ur-form-item>
        <ur-form-item
          label="처리상태"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <div>
            <ur-dropdown
              v-model="value2"
              :items="items2"
            />
            <textarea
              rows="2"
              placeholder="yujin.jang ｜2023-03-16 12:15:34
사용자의 문의에 대한 처리 상태 변경"
              class="ml0"
              style="width: 100%;"
              readonly
            />
            <textarea
              rows="2"
              placeholder="yujin.jang ｜2023-03-16 12:15:34
사용자의 문의에 대한 처리 상태 변경"
              class="ml0"
              style="width: 100%;"
              readonly
            />
            <textarea
              rows="2"
              placeholder="yujin.jang ｜2023-03-16 12:15:34
사용자의 문의에 대한 처리 상태 변경"
              class="ml0"
              style="width: 100%;"
              readonly
            />
            <textarea
              rows="10"
              placeholder="yujin.jang ｜2023-03-16 12:15:34
사용자의 문의에 대한 처리 상태 변경
yujin.jang ｜2023-03-16 12:15:34
사용자의 문의에 대한 처리 상태 변경
yujin.jang ｜2023-03-16 12:15:34
사용자의 문의에 대한 처리 상태 변경
yujin.jang ｜2023-03-16 12:15:34
사용자의 문의에 대한 처리 상태 변경
yujin.jang ｜2023-03-16 12:15:34
사용자의 문의에 대한 처리 상태 변경"
              class="ml0"
              style="width: 100%;"
              readonly
            />
            <textarea
              rows="2"
              placeholder=""
              class="ml0"
              style="width: 100%;"
            />
          </div>
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button
            color="violet"
          >
            저장
          </ur-button>
        </div>
      </div>
      <!-- E:: 내역변경 -->
      <!-- S:: 답변하기 -->
      <div class="comm_title_wrap mt35">
        <h4>답변하기</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="제목"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%;"
          />
        </ur-form-item>
        <ur-form-item
          label="내용"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <textarea
            rows="4"
            class="text-focus-color"
            style="text-align: center;"
          />
        </ur-form-item>
        <!-- S::답변 및 내역 변경이 있는경우 -->
        <ur-form-item
          class="flex_wrap"
          label="mypage에 게시여부"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-radio-wrapper
            v-model="valueR1"
            :items="itemsR1"
            sm
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="메일발송여부"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-radio-wrapper
            v-model="valueR2"
            :items="itemsR2"
            sm
          />
        </ur-form-item>
        <!-- E::답변 및 내역 변경이 있는경우 -->
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button
            color="violet"
          >
            저장
          </ur-button>
        </div>
      </div>
      <!-- E:: 답변하기 -->

      <!-- S:: 이전답변 -->
      <div class="comm_title_wrap mt45">
        <h4>이전답변</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="답변자"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          jiwon4.choi
        </ur-form-item>
        <ur-form-item
          label="처리일시"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          2022-11-03 09:39:32
        </ur-form-item>
        <ur-form-item
          label="제목"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          -
        </ur-form-item>
        <ur-form-item
          label="내용"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          -
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 이전답변 -->

      <!-- S:: 이전답변 -->
      <div class="comm_title_wrap mt45">
        <h4>이전답변</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="답변자"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          jiwon4.choi
        </ur-form-item>
        <ur-form-item
          label="처리일시"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          2022-11-03 09:39:32
        </ur-form-item>
        <ur-form-item
          label="제목"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          Lorem
        </ur-form-item>
        <ur-form-item
          label="내용"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          Ipsum
        </ur-form-item>
      </ur-form-box>

      <!-- E:: 답변완료 -->

      <!-- <div class="mrB30" /> -->
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

export default {
  name: 'PGEAAZ00002',
  filters: {
    dateFormat(date) {
      if (!date) return ''
      return utils.dateformatToClient(date)
    },
  }, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      value1: '1',
      value1_1: '',
      value1_2: '',
      value2: '',
      // 라디오 warpper
      valueR1: '',
      valueR2: '',
    }
  },
  computed: {
    items1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '개선요청' })
      rtn.push({ value: '3', text: '제안사항' })
      rtn.push({ value: '4', text: '칭찬격려' })
      rtn.push({ value: '5', text: '일반문의' })
      return rtn
    },
    items1_1() {
      const rtn = []
      rtn.push({ value: '1', text: '인적서비스' })
      rtn.push({ value: '2', text: '규정 및 정책' })
      rtn.push({ value: '3', text: '이용안내' })
      rtn.push({ value: '4', text: '위생 및 안전 품질' })
      rtn.push({ value: '5', text: '기타' })
      return rtn
    },
    items1_2() {
      const rtn = []
      rtn.push({ value: '1', text: '시설/공연/동물원 이용안내' })
      rtn.push({ value: '2', text: '홈페이지 이용정보' })
      rtn.push({ value: '3', text: '어플리케이션 이용정보' })
      rtn.push({ value: '4', text: '연간이용 이용정보' })
      rtn.push({ value: '5', text: '프로모션 이용정보' })
      rtn.push({ value: '6', text: '주차장 관리' })
      rtn.push({ value: '7', text: '주문/결제' })
      rtn.push({ value: '8', text: '이용정보제공 기타(주변 교통상황)' })
      return rtn
    },
    items2() {
      const rtn = []
      rtn.push({ value: '1', text: '접수완료' })
      rtn.push({ value: '2', text: '답변완료' })
      rtn.push({ value: '3', text: '보류중' })
      rtn.push({ value: '4', text: '중복메일' })
      rtn.push({ value: '5', text: '배제' })
      rtn.push({ value: '6', text: '전화응대' })
      return rtn
    },

    // 라디오 warpper
    itemsR1() {
      const rtn = []
      rtn.push({ value: '1', text: '게시함' })
      rtn.push({ value: '2', text: '게시하지 않음' })
      return rtn
    },
    itemsR2() {
      const rtn = []
      rtn.push({ value: '1', text: '예' })
      rtn.push({ value: '2', text: '아니오' })
      return rtn
    },
  },
  watch: {},
  methods: {},
}
</script>
<style lang="scss" scoped>

</style>
