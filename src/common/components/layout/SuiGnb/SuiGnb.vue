<template>
  <div class="gnb_header">
    <!-- 유틸영역 -->
    <div class="Topwrap01">
      <div class="logo">
        <p>
          <a @click="onLogoClicked">{{ systemTitle }}</a>
        </p>
      </div>
      <gnb-menu v-if="!showMultiline"
        ref="menu"
        :menuItems="menuItems"
        @menu-selected="onMenuSelected"
      />
      <!-- <gnb-menu ref="menu" :menuItems="menuItems" @menu-selected="select" /> -->
      <div class="Util">
        <h2 class="ir">
          유틸영역
        </h2>
        <ul>
          <li>
            <p class="time">
              {{ $store.getters.userInfo.timezone }}
            </p>
          </li>
          <!-- <li>
            <a
              v-if="$store.getters.userInfo.portalId == 'GEHS'"
              style="cursor: pointer"
              @click="onVocClicked"
            >
              IT-VOC
            </a>
          </li> 
          <li>
            <sui-custom-select
              class="-gnb-select-box"
              :selected="selectedSite"
              :option-list="siteOptions"
              :use-popup="false"
              @list-clicked="onSiteSelected"
            />
          </li> -->
          <!--
          <li>
            <sui-custom-select
              class="-gnb-select-box"
              :selected="selectedLang"
              :option-list="langOptions"
              :use-popup="false"
              @list-clicked="onLangSelected"
            />
          </li>
          -->
         
          <!-- <li>
            <div class="gnb_line_div" />
          </li> -->
          <li>
            <p class="user_info">
              {{ userInfo.userName }}
            </p>
          </li>
           <!-- <li>
             <a
              href="#"
              class="btn_contact"
              :title="tooltipContactUs"
              @click="onClickContactUs"
            >컨택트어스</a>
            <a href="#" class="btn_sitemap">사이트맵</a>            
          </li> -->
          <li>
            <!--
             <a
              href="#"
              class="btn_set"
              :title="tooltipPersonalize"
              @click="onClickPersonalize"
            >설정</a>
            -->
            <a
              v-if="showLogoutBtn"
              href="#"
              class="btn_logout"
              :title="tooltipLogOut"
              @click="onClickLogOut"
            >로그아웃</a>
          </li>
          <li class="Confidential">
            <p>
              Confidential
            </p>
          </li>
          <li>
            <a
              class="btn_quicklink"
              :title="tooltipQlink"
              style="cursor: pointer"
              @click="onQuicklinkClicked"
            >quicklink</a>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="showMultiline" class="Topwrap02">
      <gnb-menu
        ref="menu"
        :menuItems="menuItems"
        @menu-selected="onMenuSelected"
      />
    </div>


    <slot />
  </div>
</template>

<script>

import gnbMenu from '../SuiGnbMenu/SuiGnbMenu';

export default {
  name: 'SuiGnb',
  components: {
    gnbMenu,
  },
  props: {
    menuItems: {
      type: Array,
      default() {
        return [];
      },
    },
    showMultiline: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      selectedItem: null,
      langList: [],
      siteList: [],
      langOptions: [],
      siteOptions: [],
      selectedLang: {},
      selectedSite: {},
      // tooltipContactUs: this.$t('MSG_TIT_CONTACT'),
      tooltipPersonalize: this.$t('MSG_TIT_USR_PRSNZ'),
      tooltipLogOut: this.$t('MSG_TXT_LOGOUT'),
      tooltipQlink: this.$t('MSG_TXT_QLINK'),
    };
  },
  computed: {
    activePage() {
      return this.$store.state.activePage;
    },
    userInfo() {
      return this.$store.getters.userInfo;
    },
    applicationId() {
      return this.$store.getters.applicationId;
    },
    systemTitle() {
      let systemTitle = utils.getConfigurationValue('CFG_CMP_SYSTEM_TITLE');
      return systemTitle;
    },
    showLogoutBtn() {
      let showBtn = utils.getConfigurationValue('CFG_CMP_LOGOUT_YN');
      return showBtn;
    },
  },
  watch: {
    activePage(val) {
      if (val && val !== this.$router.history.current) {
        this.$router.push(val);
      } else {
        this.$router.push('/');
      }
    },
  },
  mounted() {
    // this.selectedSite.key = this.$store.getters.userInfo.siteId;
    this.selectedLang.key = this.$store.getters.userInfo.langId;
    // this.getSiteList();
    this.getLangList();
  },
  methods: {
    select(item) {
      this.$refs.menu.select(item);
    },
    onMenuSelected(item) {
      this.$emit('menu-selected', item);
    },
    // onLangChanged(e) {
    //   http.request('GNB', 'DTS_CMP_00026', {
    //     path: {
    //       'language-id': e.srcElement.value,
    //     },
    //   }).then(() => {
    //   }).catch(err => {
    //     console.log(err);
    //   });
    // },
    getLangList() {
      http.request('GNB', 'DTS_CMZ_00039').then(res => {
        this.langList = res.data;
        const langOptions = [];
        this.langList.forEach(lang => {
          langOptions.push({
            key: lang.langId,
            label: lang.langName,
          });
        });
        this.langOptions = langOptions;
      }).catch(err => {
        console.log(err);
      });
    },
    // onSiteChanged(e) {
    //   http.request('GNB', 'DTS_CMP_00027', {
    //     path: {
    //       'site-id': e.srcElement.value,
    //     },
    //   }).then(() => {
    //   }).catch(err => {
    //     console.log(err);
    //   });
    // },
    getSiteList() {
      http.request('GNB', 'DTS_CMP_00056').then(res => {
        this.siteList = res.data;
        const siteOptions = [];
        this.siteList.forEach(site => {
          siteOptions.push({
            key: site.siteId,
            label: site.siteAbbreviationName,
          });
        });
        this.siteOptions = siteOptions;
      }).catch(err => {
        console.log(err);
      });
    },
    onLangSelected() {
      utils.messageBox('info', this.$t('MSG_ALT_LNG_LOGOUT'), null, () => {
        http.request('GNB', 'DTS_CMP_00026', {
          path: {
            'language-id': this.selectedLang.key,
          },
        }).then(() => {
        }).catch(err => {
          console.log(err);
        });
      });      
    },
    onSiteSelected() {
      http.request('GNB', 'DTS_CMP_00027', {
        path: {
          'site-id': this.selectedSite.key,
        },
      }).then(() => {
      }).catch(err => {
        console.log(err);
      });
    },
    // onClickUserInfo() {
    //   http.request('GNB', 'DTS_CMY_00061', {}).then(res => {
    //     if (res.data > 0) {
    //       this.restoreUserRoleInfo();
    //     }
    //   });
    // },
    // onClickContactUs() {
    //   let contactUsPageId = '';
    //   let layerSize = 'lg';
    //   contactUsPageId = utils.getConfigurationValue(`CFG_CMP_CONTACT_US_PAGE_ID_${this.$store.getters.userInfo.portalId}`);

    //   if(utils.isEmpty(contactUsPageId)){
    //     contactUsPageId = utils.getConfigurationValue('CFG_CMP_CONTACT_US_PAGE_ID');
    //   }

    //   utils.openLayerPopup(contactUsPageId, res => res, {
    //     pageInitialData: {
    //     },
    //     size: layerSize,
    //   });
    // },
    onClickPersonalize() {
      utils.openLayerPopup('PGE_CMP_00003', this.onPersonalizePopClose, {
        pageInitialData: {
        },
        size: 'lg',
      });
    },
    onClickLogOut() {
      utils.messageBox('confirm', this.$t('MSG_ALT_LOG_OUT'), null, () => {
        http.request('GNB', 'DTS_CMP_00044', {}).then(() => {
        }).then(() => {
        }).catch(err => {
          console.error(err);
        });
      });
    },
    restoreUserRoleInfo() {
      utils.messageBox('confirm', this.$t('MSG_ALT_IS_AUTH_RESTORE'), null, () => {
        http.request('GNB', 'DTS_CMY_00063', {}).then(() => {
          this.logoOff();
        });
      });
    },
    onPersonalizePopClose(nodeData){
      if(nodeData ==='success'){
        window.location.reload();
      }
    },
    logoOff() {
      http.request('GNB', 'DTS_CMP_00027', {
        path: {
          'site-id': this.$store.getters.userInfo.siteId,
        },
      }).then(() => {
      });
    },
    onLogoClicked() {
      utils.goHome();
      this.$store.commit('setCurrentApplication', null);
    },
    onVocClicked() {
      window.open(utils.getConfigurationValue('CFG_CMP_IT_VOC_URL'));
    },
    onQuicklinkClicked(event) {
      const top = event.currentTarget.getBoundingClientRect().bottom;
      http.getQuickLinks().then(res => {
        if (!this.quicklinkPortal) {          
          this.quicklinkPortal = utils.createPortalComponent('sui-quick-link', {});
          this.quicklinkPortal.$on('close', () => {
            this.quicklinkPortal.deactivate();
            utils.hideEventBlocker();
          });
          this.quicklinkPortal.$on('selected', (item) => {
            window.open(item.quickLinkUrl);
          });
          this.quicklinkPortal.$el.style.right = 0;
          this.quicklinkPortal.$el.style.top = top;
        }
        this.quicklinkPortal.activate(res, this.applicationId);
        utils.showEventBlocker(() => {this.quicklinkPortal.deactivate()});
      });
    }
  },
};
</script>

<style scoped>
</style>
