<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name"></sui-page-header>
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>{{$t('MSG_TXT_PERF_LOG')}}</h4>
      </div>
      <div class="module_msg_box">
        <textarea name="name" rows="15" readonly="true">{{consoleLog}}</textarea>
      </div>
      <div class="comm_btn_wrap">
          <sui-file-uploader :btnLabel="$t('MSG_BTN_IMPORT')" btnClass="comm_btn_solid" @change="onCtsUploadClick" />
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
  export default {
    name: 'PGE_CMZ_00026', // eslint-disable-line vue/name-property-casing
    data() {
      return {
        consoleLog : ""
      };
    },
    computed: {},
    watch: {},
    mounted() {  },
    methods: {
      onCtsUploadClick(file) {
        if (file[0]) {
          utils.messageBox('confirm', this.$t('MSG_ALT_IS_SAV_DATA'), null,
            (/* ok */) => {
              const formData = new FormData();
              formData.append('file', file[0]);

              http.request(this.$options.name, 'DTS_CMU_00053', {
                data: formData,
              }).then((result) => {
                this.consoleLog = result.data.msg;
                utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
              });
            },
            (/* cancel */) => {});
        }
      },
    }
  };
</script>
<style scoped>
</style>
