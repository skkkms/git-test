<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>
          앱버전 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="OS 구분"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          required
        >
          <ur-radio
            v-model="R1"
            value="Radio 01"
            sm
          >
            Android
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio 02"
            sm
          >
            iOS
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="버전"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%;"
          />
        </ur-form-item>
        <ur-form-item
          label="강제 업데이트 여부"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          required
        >
          <ur-radio
            v-model="R2"
            value="Radio 01"
            sm
          >
            Y
          </ur-radio>
          <ur-radio
            v-model="R2"
            value="Radio 02"
            sm
          >
            N
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          label="비고"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%;"
          />
        </ur-form-item>
        <ur-form-item
          label="등록자"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          7323577
        </ur-form-item>
        <ur-form-item
          label="등록일시"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          2018-05-18 10:00:39
        </ur-form-item>
        <ur-form-item
          label="수정자"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          7323577
        </ur-form-item>
        <ur-form-item
          label="수정일시"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          2018-05-18 10:00:39
        </ur-form-item>
      </ur-form-box>
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
  name: 'PGE_AAZ_00109', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 라디오 버튼
      R1: null,
      R2: 'Radio 01',
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
  mounted() {
  },
  methods: {
  },
}
</script>
<style scoped>
</style>
