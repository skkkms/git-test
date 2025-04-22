<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S:: 등록 -->
      <div class="comm_title_wrap">
        <h4>
          영상 슬롯 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="프리셋 구분"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label=""
          :label-align="'right'"
          style="width: 100%; height: auto; background-color: #F3F3F3;} "
          class="flex_wrap_end"
        >
          <ur-button>
            프리셋 저장
          </ur-button>
          <ur-button>
            프리셋 수정
          </ur-button>
          <ur-button>
            프리셋 삭제
          </ur-button>
        </ur-form-item>
        <ur-form-item
          label="슬롯명"
          required
          :label-align="'right'"
          style="width: 100%; height: 57px;"
        >
          <div
            class="flex_wrap_col pr10"
            style="width: 50%; margin-bottom: auto;"
          >
            <ur-text-field
              value=""
              style="width: 100%; "
            />
            <span class="subscript_txt" />
          </div>
          <div
            class="flex_wrap_col"
            style="width: 50%;"
          >
            <ur-text-field
              value=""
              style="width: 100%;"
            />
            <span class="subscript_txt">
              이벤트코드로 구분할때 변경해 주세요.
            </span>
          </div>
        </ur-form-item>
        <ur-form-item
          label="상영시작일"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-date-picker
            auto-confirm
            input-type="YYYY-MM-DD"
            init="day+30"
          />
        </ur-form-item>
        <ur-form-item
          label="상영종료일"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-date-picker
            auto-confirm
            input-type="YYYY-MM-DD"
            init="day+30"
          />
        </ur-form-item>
        <ur-form-item
          label="참여시작일"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-date-picker
            auto-confirm
            input-type="YYYY-MM-DD"
            init="day+30"
          />
        </ur-form-item>
        <ur-form-item
          label="참여종료일"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-date-picker
            auto-confirm
            input-type="YYYY-MM-DD"
            init="day+30"
          />
        </ur-form-item>
        <ur-form-item
          label="타임슬롯1"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <div
            class="flex_wrap_col"
            style="width: 100%;"
          >
            <ur-text-field
              value=""
              style="width: 100%;"
            />
            <span class="subscript_txt">
              예) 1건 09:30~11:40, 2건 이상: 09:30~11:40, 15:30~17:00
            </span>
          </div>
        </ur-form-item>
        <ur-form-item
          label="CAPA"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <div
            class="flex_wrap_col"
            style="width: 100%;"
          >
            <ur-text-field
              value=""
              style="width: 100%;"
            />
            <span class="subscript_txt">
              CAPA: 숫자만 입력해 주세요.
            </span>
          </div>
        </ur-form-item>
        <ur-form-item
          label=""
          :label-align="'right'"
          style="width: 100%; height: auto; background-color: #F3F3F3;} "
          class="flex_wrap_end"
        >
          <ur-button>
            타임 슬롯 추가
          </ur-button>
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 등록 -->

      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button>
              목록
            </ur-button>
          </div>
          <div class="right_box">
            <ur-button>
              삭제
            </ur-button>
            <ur-button color="violet">
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
  name: 'PGE_AAZ_00096', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
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
