<template>
  <div>
    <div class="comm_popup_wrap_medium">
      <div class="comm_title_wrap">
        <h4>{{ $t("MSG_TXT_MAX_LGHT_WITH_DIV").replace('{0}','30') }} </h4>
      </div>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_RGST_MSG_RESO')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <textarea
              ref="textField"
              v-model="textField"
              rows="10"
              maxlength="1000"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onClickCancel"
      >
        {{ $t("MSG_BTN_CANCEL") }}
      </sui-button>
      <sui-button
        type="button"
        class="comm_btn_solid"
        @click="onClickCheck"
      >
        {{ $t("MSG_BTN_VRFC") }}
      </sui-button>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMU_00003_P01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  data() {
    return {
      pageName: this.$t('MSG_TXT_MSG_RESO_BK_RGST'),
      textField: '',
    };
  },
  computed: {
    // 계산된 속성, property로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
    count() {
    },
  },
  mounted() {
    // DOM이 document에 append된 상태, 실제 element에 접근 가능 (this.$el or this.$refs)
    // 주로 데이터 패치 등을 함
  },
  methods: {
    /**
     * 검증
     */
    onClickCheck() {
      if (utils.trim(this.textField).length == 0) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_IS_RGST'), this.$t('MSG_TXT_RGST_MSG_RESO')));
        return false;
      }
      this.$emit('onClickCheck', this.textField);
    },
    /**
     * 닫기
     */
    onClickCancel() {
      this.$emit('onClickCancel');
    },
  },
};
</script>
<style scoped>
</style>
