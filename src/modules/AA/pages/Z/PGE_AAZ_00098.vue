<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S:: 영상 슬롯 관리 -->
      <div class="comm_title_wrap">
        <h4>
          영상 슬롯 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="프리셋 구분(선택)"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD1"
            :items="itemsD1"
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
          style="width: 100%; height: auto;"
        >
          <div
            class="flex_wrap_col pr10"
            style="width: 50%;"
          >
            <ur-text-field
              value="가나다라마바"
              style="width: 100%; "
            />
          </div>
          <div
            class="flex_wrap_col"
            style="width: 50%;"
          >
            <ur-text-field
              value="COMMON2021"
              style="width: 100%;"
            />
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
          <ur-text-field
            value="09:30~11:40, 15:30~17:00"
            style="width: 100%;"
          />
        </ur-form-item>
        <ur-form-item
          label="CAPA1"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            value="1"
            style="width: 100%;"
          />
        </ur-form-item>
        <ur-form-item
          label="타임슬롯2"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            value="09:30~11:40, 15:30~17:00"
            style="width: 100%;"
          />
        </ur-form-item>
        <ur-form-item
          label="CAPA2"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            value="1"
            style="width: 100%;"
          />
        </ur-form-item>
        <ur-form-item
          label="타임슬롯3"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            value="09:30~11:40, 15:30~17:00"
            style="width: 100%;"
          />
        </ur-form-item>
        <ur-form-item
          label="CAPA3"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            value="1"
            style="width: 100%;"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 영상 슬롯 관리 -->

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
  name: 'PGE_AAZ_00098', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 드롭다운
      valueD1: 1,
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // 드랍다운
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '프리셋선택' })
      rtn.push({ value: '2', text: 'text' })
      rtn.push({ value: '3', text: '가나다라마바' })
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
