<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 노출 정보 -->
      <div class="comm_title_wrap">
        <h4>
          노출 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="게시판 분류"
          :label-align="'right'"
          style="width: 100%; height: auto; border: 0;"
          required="true"
        >
          <ur-dropdown
            v-model="valueD1"
            :items="itemsD1"
            style="width:40%"
          />
        </ur-form-item>
        <ur-form-item
          label="노출 여부"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          required="true"
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
      </ur-form-box>
      <!-- E :: 노출 정보 -->

      <!-- S :: 게시 상세 정보 -->
      <div class="comm_title_wrap mt20">
        <h4>
          게시 상세 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="제목"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          required="true"
        >
          <ur-text-field
            style="width:100%; height:auto;"
            value="콘텐츠 기획 Assistant 모집"
          />
        </ur-form-item>
        <ur-form-item
          label="언어 구분"
          :label-align="'right'"
          required="true"
          style="width: 100%; height: auto;"
        >
          <ur-radio
            v-model="R2"
            value="Radio 01"
            sm
          >
            국문
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio 02"
            sm
          >
            영문
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="내용"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          required="true"
        >
          <sui-web-editor
            ref="approvalWebEditor"
            :is-viewer="isEditorViewerMode"
            :initialized-callback="editorInitCallback"
          />
        </ur-form-item>
        <ur-form-item
          label="URL 설정"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
          required="true"
        >
          https://www.everland.com/editorspick/
          <ur-text-field
            value="Assistant"
            style="width:70%; height:auto"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 게시 상세 정보 -->

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

export default {
  name: 'PGE_AAZ_00042', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 게시판 분류 드랍다운
      valueD1: '10',

      // 노출 여부 라디오
      R1: 'Radio 01',
      R2: 'Radio 01',

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // 드랍다운 (게시판 분류)
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: "Editor's Pick" })
      rtn.push({ value: '2', text: 'FAQ' })
      rtn.push({ value: '3', text: '개인정보 처리방침' })
      rtn.push({ value: '4', text: '영상정보 처리기기' })
      rtn.push({ value: '5', text: '방침 개정 안내' })
      rtn.push({ value: '6', text: '이용약관' })
      rtn.push({ value: '7', text: '입찰공고' })
      rtn.push({ value: '8', text: '에버랜드 테마뮤직' })
      rtn.push({ value: '9', text: 'EVER-UNIVERSE' })
      rtn.push({ value: '10', text: '기타' })
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
