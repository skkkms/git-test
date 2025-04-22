<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>
          사랑단 이미지 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="사랑단 분류"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-radio
            v-model="R1"
            value="Radio01"
            sm
          >
            동물사랑단
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio02"
            sm
          >
            식물사랑단
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="활동일"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-date-picker
            auto-confirm
            input-type="YYYY-MM-DD"
            init="day+30"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="활동제목"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%;"
          />
        </ur-form-item>
        <ur-form-item
          label="멤버십"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <!-- 동물사랑단 -->
          <ur-dropdown
            v-model="valueD1"
            :items="itemsD1"
          />
          <!-- 식물사랑단 -->
          <ur-dropdown
            v-model="valueD2"
            :items="itemsD2"
          />
        </ur-form-item>
        <ur-form-item
          label="오픈여부"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="R2"
            value="Radio01"
            sm
          >
            오픈
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio02"
            sm
          >
            보류
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="레벨"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <!-- 동물사랑단 -->
          <ur-dropdown
            v-model="valueD3"
            :items="itemsD3"
          />
          <!-- 식물사랑단 -->
          <ur-dropdown
            v-model="valueD4"
            :items="itemsD4"
          />
        </ur-form-item>
        <ur-form-item
          label="프로젝트"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="R3"
            value="Radio01"
            sm
          >
            예
          </ur-radio>
          <ur-radio
            v-model="R3"
            value="Radio02"
            sm
          >
            아니오
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="활동반가입년도"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-year-picker
            v-model="y1"
            clearable
            @confirmed="onConfirmed"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="comm_btn_wrap mt35">
        <div class="comm_title_wrap">
          <h4>
            활동 사진
          </h4>
        </div>
        <div class="left_box pl16">
          <ur-dropdown
            v-model="valueD5"
            :items="itemsD5"
            style="width:150px;"
            class="pr10"
          />
          <ur-button
            color="violet"
            @click="openModalP01"
          >
            <ur-modal
              ref="modalP01"
              xlarge
              dragable
              title="클래스(반) 설정"
              @closed="closed"
            >
              <P01 />
            </ur-modal>
            클래스(반) 설정
          </ur-button>
          <span class="guid_txt pl16">
            <div class="guid_sub">* 클래스(반)설정 후 사용해주세요.</div>
            * 이미지 : 720 x 720 / 파일 규격 : 15MB 미만 jpg, png, gif
          </span>
        </div>
        <div class="right_box">
          <ur-button color="violet">
            파일찾기
          </ur-button>
          <ur-button color="violet">
            삭제
          </ur-button>
          <ur-button color="violet">
            초기화
          </ur-button>
          <ur-button>
            파일명 정렬
          </ur-button>
        </div>
      </div>
      <ur-data-grid
        ref="grid"
        :headers="columnsT1"
        :data-source="listT1"
        :options="opts"
        :data-set-options="{id: 'id'}"
      >
        <!-- <template #empty-view>
          <div class="custom_grid_type1">
            <div
              class="empty_box"
            >
              * 여러 파일을 선택하여 여기로 드래그 해주세요.
            </div>
          </div>
        </template> -->
      </ur-data-grid>
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
import P01 from './components/PGE_AAZ_00056_P01.vue'
export default {
  name: 'PGE_AAZ_00056', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
  },
  data() {
    return {

      // year-picker
      y1: '2023',

      // 드롭다운
      valueD1: 1,
      valueD2: 1,
      valueD3: 1,
      valueD4: 1,
      valueD5: 1,

      // 라디오 버튼
      R1: null,
      R2: null,
      R3: null,

      opts: { // 토탈 x 전체선택X 셀선택 o
        noInfo: true,
        multiSelect: false,
        selectCheck: true,
        height: 300,
        // ALT 태그 추가시 테이블 옵션에 rowHeight: 'auto'추가
        rowHeight: 'auto',
      },

      columnsT1: [
        {
          text: 'No.',
          value: 'value1',
          width: 50,
        },
        {
          text: '파일명',
          value: 'value2',
          component: {
            // ALT 태그 추가시 최상위 div에 class="pdCol10" style="flex-direction: column;" 추가
            template: '<div class="pdCol10" style="flex-direction: column;"><div style="display: flex; flex-direction: row; align-items: center;"><p class="pr10">동물사랑단_초급반_사진_1.jpg</p></div><img class="pdCol10" src="images/food/food_0.png" style="height: 150px; width:fit-content;"></div>',
          },
        },
        {
          text: ' ',
          value: 'value3',
          component: {
            template: '<div><ur-text-field value="ALT 태그를 입력하세요"/></div>',
          },
        },
        {
          text: '오픈여부',
          value: 'value4',
          component: {
            template: '<div><ur-radio v-model="T1R1" value="Radio01" sm>오픈</ur-radio><ur-radio v-model="T1R1" value="Radio02" sm>보류</ur-radio></div>',
          },
        },
      ],
      listT1: [
        {
          value1: '1', value2: '', value3: '', value4: '',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // 드랍다운
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '동물사랑단' })
      rtn.push({ value: '3', text: '키즈 동물사랑단' })
      rtn.push({ value: '4', text: '야생동물탐험대' })
      return rtn
    },
    itemsD2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '식물 사랑단' })
      rtn.push({ value: '3', text: '키즈 식물사랑단' })
      rtn.push({ value: '4', text: '야생동물탐험대' })
      rtn.push({ value: '5', text: '식물사랑단 주니어스타' })
      return rtn
    },
    itemsD3() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '동물사랑단(초급반,고급반,전문반)' })
      rtn.push({ value: '3', text: '키즈 동물사랑단(키즈반)' })
      rtn.push({ value: '4', text: '야생동물탐험대(일요일반,토요일반)' })
      return rtn
    },
    itemsD4() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '식물사랑단(주니어 초급,주니어 고급)' })
      rtn.push({ value: '3', text: '키즈 식물사랑단(키즈)' })
      rtn.push({ value: '4', text: '야생동물탐험대(토요일반,일요일반)' })
      rtn.push({ value: '5', text: '식물사랑단 주니어스타(주니어 스타)' })
      return rtn
    },
    itemsD5() {
      const rtn = []
      rtn.push({ value: '1', text: '클래스(반)' })
      rtn.push({ value: '2', text: '사하라' })
      rtn.push({ value: '3', text: '정글' })
      rtn.push({ value: '4', text: '와일드' })
      rtn.push({ value: '5', text: '아마존' })
      return rtn
    },

    // modalPopUp
    modalP01() {
      return this.$refs.modalP01
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
    closed() {},
    onConfirmed(value) {
      console.log(`[onConfirmed] value: ${value}`)
    },
  },
}
</script>
<style scoped>
</style>
