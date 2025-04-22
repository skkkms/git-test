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
          동물 사랑단
        </ur-form-item>
        <ur-form-item
          label="활동일"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          2016-06-27
        </ur-form-item>
        <ur-form-item
          label="활동제목"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          ★6월27일동물사진★
        </ur-form-item>
        <ur-form-item
          label="멤버십"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          키즈동물사랑단
        </ur-form-item>
        <ur-form-item
          label="오픈여부"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          오픈
        </ur-form-item>
        <ur-form-item
          label="레벨"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          키즈반
        </ur-form-item>
        <ur-form-item
          label="프로젝트"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          아니오
        </ur-form-item>
        <ur-form-item
          label="활동반가입년도"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          2016
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
            v-model="valueD1"
            :items="itemsD1"
            style="width:350px;"
            class="pr10"
          />
        </div>
      </div>
      <ur-data-grid
        ref="grid"
        :headers="columnsT1"
        :data-source="listT1"
        :options="opts"
        :data-set-options="{id: 'id'}"
      />
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
                수정
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
  name: 'PGE_AAZ_00057', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      opts: { // 토탈 x 전체선택X 셀선택 o
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },

      // 드롭다운
      valueD1: 1,

      columnsT1: [
        {
          text: 'No.',
          value: 'value1',
        },
        {
          text: '파일명',
          value: 'value2',
        },
        {
          text: '오픈여부',
          value: 'value3',
        },
      ],
      listT1: [
        {
          value1: '1', value2: '동물사랑단_초급반_사진_1.jpg', value3: '오픈',
        },

      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '클래스(반)' })
      rtn.push({ value: '2', text: '사하라' })
      rtn.push({ value: '3', text: '정글' })
      rtn.push({ value: '4', text: '와일드' })
      rtn.push({ value: '5', text: '아마존' })
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
