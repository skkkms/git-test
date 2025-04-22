<template>
  <sui-page>
    <!-- Page Header -->
    <sui-page-header :pageId="this.$options.name" />

    <!-- Page Contents -->
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>{{ $t('MSG_TIT_PERS_INFO_PROC_POLI') }}</h4>
      </div>
      <div class="dp_inflex">
        <div class="info">
          {{ $t('MSG_TXT_DOC_VER') }}
        </div>
        <div class="comp_spacing2" />
        <sui-custom-select
          :selected="persInfoProcPolicyVer"
          :option-list="versionList"
          @list-clicked="onVersionSelect"
        />
        <div class="comp_spacing2" />
        <div class="comp_spacing2" />
        <div class="info">
          {{ $t('MSG_TXT_VALID_PERIOD') }} : {{ displayStartDT }} ~ {{ displayFinishDT }}
        </div>
      </div>
      <div class="mrB10" />
      <sui-web-editor
        ref="viewer"
        :isViewer="true"
        :initialValue="persInfoProcPolicyContent"
        class="width100"
        :height="300"
      />
      <!-- <div ref="viewer" /> -->
      <!-- {{ persInfoProcPolicyContent }} -->
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="closePagePopup"
        >
          {{ $t('MSG_BTN_CFRM') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMP_00006', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    closePagePopup: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      persInfoProcPolicyVer: {
        key: '',
        label: '',
      },
      versionList: [],
      persInfoProcPolicyList: [],
      persInfoProcPolicyContent: '',
      portalId: '',
      displayStartDT: '',
      displayFinishDT: '',
    };
  },
  computed: {},
  watch: {},
  datasets: [],
  mounted() {
    this.$nextTick(() => {
      this.onDataLoad();
    });
  },

  methods: {
    getSearchData() {
      return {
        portalId: this.$store.getters.userInfo.portalId,
        policyTypeCode: 'P',
      };
    },
    onDataLoad() {
      const searchData = this.getSearchData();
      http.request(this.$options.name, 'DTS_CMP_00013', {
        query: searchData,
      }).then(res => {
        this.persInfoProcPolicyList = res.data;
        this.setVersionList(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    getVersionTemplate(ver) {
      return {
        key: ver,
        label: ver,
      };
    },
    setVersionList(list) {
      this.persInfoProcPolicyVer = this.getVersionTemplate(list[0].persInfoProcPolicyVer);
      this.onVersionSelect(this.persInfoProcPolicyVer);
      utils.forEach(list, data => {
        this.versionList.push(this.getVersionTemplate(data.persInfoProcPolicyVer));
      });
    },
    onVersionSelect(value) {
      this.setPersInfoProcPolicyData(value.key);
    },
    setPersInfoProcPolicyData(ver) {
      const find = utils.find(this.persInfoProcPolicyList, { persInfoProcPolicyVer: ver });
      // this.persInfoProcPolicyContent = utils.escape(find.persInfoProcPolicyContent);
      this.persInfoProcPolicyContent = find.persInfoProcPolicyContent;
      this.$refs.viewer.setHtml(find.persInfoProcPolicyContent);
      // this.$refs.viewer.innerHTML = find.persInfoProcPolicyContent;
      this.displayStartDT = moment(find.displayStartDT).format('YYYY-MM-DD');
      this.displayFinishDT = moment(find.displayFinishDT).format('YYYY-MM-DD');
    },
  },
};
</script>

<style scoped>
</style>
