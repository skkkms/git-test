<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>
          공지 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="사랑단 분류"
          :label-align="'right'"
          style="width: 50%; height: auto;"
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
          label="멤버십"
          :label-align="'right'"
          style="width: 50%; height: auto;"
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
          class="flex_wrap"
          label="레벨"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD3"
            :items="itemsD3"
          />
        </ur-form-item>
        <ur-form-item
          label="노출 여부"
          class="flex_wrap"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="R2"
            value="Radio01"
            sm
          >
            Y
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio02"
            sm
          >
            N
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="앱 노출 기간"
          class="flex_wrap"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-date-time-range-picker
            v-model="dateValue1"
            init="today"
          />
        </ur-form-item>
        <ur-form-item
          label="기간 표시 정보"
          class="flex_wrap"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-range-picker
            v-model="dateValue1"
            auto-confirm
          />
        </ur-form-item>
      </ur-form-box>
      <!-- S :: 공지 상세 정보 -->
      <div class="comm_title_wrap mt20">
        <h4>
          공지 상세 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="제목"
          required
          class="flex_wrap"
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
          required
          style="width: 100%; height: auto;"
        >
          <sui-web-editor
            ref="approvalWebEditor"
            :is-viewer="isEditorViewerMode"
            :initialized-callback="editorInitCallback"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 공지 상세 정보 -->
      <div class="bt1 mt10">
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

export default {
  name: 'PGE_AAZ_00062', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 라디오 버튼
      R1: null,
      R2: null,
      // 드롭다운
      valueD1: 1,
      valueD2: 1,
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
      rtn.push({ value: '2', text: '초급반' })
      rtn.push({ value: '3', text: '고급반' })
      rtn.push({ value: '4', text: '전문반' })
      rtn.push({ value: '4', text: '키즈반' })
      rtn.push({ value: '4', text: '일요일반' })
      rtn.push({ value: '4', text: '토요일반' })
      rtn.push({ value: '4', text: '주니어 초급' })
      rtn.push({ value: '4', text: '주니어 고급' })
      rtn.push({ value: '4', text: '키즈' })
      rtn.push({ value: '4', text: '주니어스타' })
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
  },
}
</script>
<style scoped>
</style>
