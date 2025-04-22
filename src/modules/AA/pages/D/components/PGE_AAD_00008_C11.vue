<template>
  <ur-form-box toggleable>
    <!-- 제목 -->
    <ur-form-item
      :label="$t('MSG_TXT_TTL')"
      :label-align="'right'"
      :required="editMode"
      style="width: 100%; height: auto;"
      class="flex_wrap"
    >
      <div v-if="!editMode">
        {{ inputData.subject }}
      </div>
      <ur-text-field
        v-else
        v-model="inputData.subject"
        style="width:100%; height:auto;"
        maxlength="100"
      />
    </ur-form-item>

    <!-- 내용 -->
    <ur-form-item
      :label="$t('MSG_TXT_CNTN')"
      class="flex_wrap"
      :label-align="'right'"
      style="width: 100%; height: auto;"
      :required="editMode"
    >
      <sui-web-editor
        ref="C11Editor"
        :is-viewer="!editMode"
      />
    </ur-form-item>
  </ur-form-box>
</template>


<script>
export default {
  name: 'PGEAAD00008C11',
  components: {
  },
  props: {
    inputType: {
      type: String,
    },
    inputData: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
    }
  },
  computed: {
    editMode() {
      return this.inputType !== 'detail'
    },
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    isConpValidation() {
      if (utils.isEmpty(this.inputData.subject)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_TTL')) // 제목은(는) 필수 항목입니다.
        utils.messageBox('warning', msg)
        return false
      }
      if (this.$refs.C11Editor.getContentSize() === 0) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_CNTN')) // 내용은(는) 필수 항목입니다.
        utils.messageBox('warning', msg)
        return false
      }
      if (!this.$refs.C11Editor.checkIframeSrc()) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_IAA_IFRAME_CHK')))
        return false
      }
      return true
    },
  },
}

</script>
<style scoped>
</style>
