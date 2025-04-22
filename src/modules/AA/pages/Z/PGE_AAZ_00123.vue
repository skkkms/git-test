<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-tab-box
        default-idx="2"
        class="mt35"
      >
        <ur-tab-content
          idx="1"
          label="이벤트 참여 현황"
        >
          <h4>이벤트 참여 현황</h4>
        </ur-tab-content>
        <ur-tab-content
          idx="2"
          label="사용자 참여 현황"
        >
          <ur-form-box toggleable>
            <ur-form-item
              label="회원번호"
              :label-align="'right'"
              style="width:50%; height:auto;"
              class="flex-wrap"
            >
              <ur-text-field
                value=""
                style="width: 100%; height: auto;"
              />
            </ur-form-item>
            <ur-form-item
              label="아이디"
              :label-align="'right'"
              style="width:50%; height:auto;"
            >
              <ur-text-field
                value=""
                style="width: 100%; height: auto;"
              />
            </ur-form-item>
            <ur-form-item
              label="이름"
              :label-align="'right'"
              style="width:50%; height:auto;"
            >
              <ur-text-field
                value=""
                style="width: 100%; height: auto;"
              />
            </ur-form-item>
            <ur-form-item
              label="휴대폰 번호"
              :label-align="'right'"
              style="width:50%; height:auto;"
            >
              <ur-text-field
                value=""
                style="width: 100%; height: auto;"
              />
            </ur-form-item>
          </ur-form-box>
          <div class="btn_wrap mt10">
            <div class="right_box">
              <ur-button>
                초기화
              </ur-button>
              <ur-button color="violet">
                검색
              </ur-button>
            </div>
          </div>

          <ur-data-grid
            ref="grid"
            class="custom_grid_type1 mt35"
            :headers="columnsT1"
            :data-source="listT1"
            :options="opts"
          >
            <template #empty-view>
              <div class="empty_box">
                *등록된 데이터가 없습니다.
              </div>
            </template>
          </ur-data-grid>
        </ur-tab-content>
      </ur-tab-box>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAZ_00123', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      opts: {
        height: 400,
        multiSelect: false,
        selectCheck: false,
        pagination: true,
      },

      columnsT1: [
        {
          value: 'str1',
          text: '회원번호',
          component: {
            template: '<div><ur-button hyperlink small style="padding: 0;" >abcd12345678901</ur-button></div>',
          },
        },
        { value: 'str2', text: '아이디' },
        { value: 'str3', text: '이름' },
        { value: 'str4', text: '휴대폰 번호' },
        { value: 'str5', text: '회원등급' },
        { value: 'str6', text: '가입일' },
      ],
      // listT1: [
      //   {
      //     str1: '', str2: 'qwer***', str3: '이*비', str4: '010-****-5678', str5: 'T1', str6: '2022-10-13',
      //   },
      //   {
      //     str1: '', str2: 'qwer***', str3: '이*비', str4: '010-****-5678', str5: 'T1', str6: '2022-10-13',
      //   },
      //   {
      //     str1: '', str2: 'qwer***', str3: '이*비', str4: '010-****-5678', str5: 'T1', str6: '2022-10-13',
      //   },
      //   {
      //     str1: '', str2: 'qwer***', str3: '이*비', str4: '010-****-5678', str5: 'T1', str6: '2022-10-13',
      //   },
      //   {
      //     str1: '', str2: 'qwer***', str3: '이*비', str4: '010-****-5678', str5: 'T1', str6: '2022-10-13',
      //   },
      //   {
      //     str1: '', str2: 'qwer***', str3: '이*비', str4: '010-****-5678', str5: 'T1', str6: '2022-10-13',
      //   },
      // ],

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
  },

  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() { },
  methods: {
  },
}
</script>
<style scoped>
</style>
