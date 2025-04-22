<template>
  <div
    class="app-frame-root"
    :class="frameRootClass"
  >
    <sui-gnb
      v-if="!hideMenus && isGnbShowed"
      ref="gnb"
      :menuItems="menuItems"
      class="header-container"
      :showMultiline="gnbExtended"
      @menu-selected="onGnbSelected"
    />
    <div
      class="body-container"
      :class="lnbStateClass"
    >
      <div
        v-show="!hideMenus && lnbShowed"
        class="left-container"
      >
        <sui-lnb
          :collapsed="lnbCollapsed"
          :menuItems="lnbItems"
          class="lnb-area"
        />
      </div>
      <div
        ref="contentsContainer"
        class="right-container"
      >
        <keep-alive
          :include="keepAlivePages"
        >
          <router-view
            :key="$route.fullPath"
            class="-page-root-container"
          />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import menuConfig from '~config/menu.js';
import SuiGnb from '../SuiGnb/SuiGnb';
import SuiLnb from '../SuiLnb/SuiLnb';

export default {
  components: {
    'sui-gnb': SuiGnb,
    'sui-lnb': SuiLnb,
  },
  props: {
    hideMenus: {
      type: Boolean,
      default: false,
    },
    useServerMenu: {
      type: Boolean,
      default: false,
    },
    showAllPages: {
      type: Boolean,
      default: false,
    },
    staticMenuItems: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      keepAlivePages: utils.getConfigurationValue('CFG_CMU_KEEP_ALIVE_PAGE') || 'dummy',
      menuItems: [],
      lnbItems: [],
      contentsSize: {
        width: 0,
        height: 0,
      }
    };
  },
  created() {
    if (this.hideMenus) {
      this.$store.commit('hideGNB');
      this.$store.commit('hideLNB');
    }
  },
  watch: {
    lnbShowed() {
      this.checkContentsSize(true);
    },
    lnbCollapsed() {
      this.checkContentsSize(true);
    },
  },
  computed: {
    activePage() {
      return this.$store.state.activePage;
    },
    userInfo() {
      return this.$store.getters.userInfo;
    },
    isGnbShowed() {
      return this.$store.getters.isGnbShowed;
    },
    lnbShowed() {
      return this.$store.getters.lnbShowed;
    },
    lnbCollapsed() {
      return this.$store.getters.lnbCollapsed;
    },
    lnbExtended() {
      return this.$store.getters.lnbExtended;
    },
    lnbStateClass() {
      return [
        {
          '-lnb--collapse': this.lnbShowed && this.lnbCollapsed,
          '-lnb--expand': this.lnbShowed && !this.lnbCollapsed,
          '-lnb--show': this.lnbShowed,
          '-lnb--hide': !this.lnbShowed,
          '-lnb--extend': this.lnbShowed && !this.lnbCollapsed && this.lnbExtended,
        },
      ];
    },
    frameRootClass() {
      return [
        this.hideMenus? 'app-frame-root__popup' : '',
        this.isGnbShowed? '-gnb--show' : '-gnb--hide',
        this.gnbExtended? '-gnb--extend' : '',
        this.lnbShowed? '-lnb--show' : '-lnb--hide',
      ];
    },
    gnbExtended() {
      return this.menuItems.length > (utils.getConfigurationValue('CFG_CMP_TOP_SIGL_LINE_APP_LIMIT') * 1 || 2);
    }
  },
  mounted() {
    this.loadInitData().then(() => {
      this.$nextTick(() => {
        this.checkContentsSize();
      });
    });
    this.funcResize = _.debounce(this.checkContentsSize, 200);
    window.addEventListener('resize', this.funcResize);
  },
  methods: {
    checkContentsSize(fromLNB) {
      this.$nextTick(() => {
        let changed = false;
        if (!this.$refs.contentsContainer) {
          return;
        }
        if (this.contentsSize.width !== this.$refs.contentsContainer.getBoundingClientRect().width) {
          this.contentsSize.width = this.$refs.contentsContainer.getBoundingClientRect().width;
          changed = true;
        }
        if (this.contentsSize.height !== this.$refs.contentsContainer.getBoundingClientRect().height) {
          this.contentsSize.height = this.$refs.contentsContainer.getBoundingClientRect().height;
          changed = true;
        }
        if (changed) {
          this.$root.$emit('frame-resize', this.contentsSize);
          if (fromLNB === true) {
            this.$root.$emit('lnb-resize', this.contentsSize);
          }
        }
      });
    },
    generateMenuItems(pageList) {
      const menus = {};
      const submenus = {};
      _.forEach(pageList, page => {
        const md = page.moduleCode;
        const smd = page.subModuleCode;
        const pageId = page.pageId;
        const pageName = page.pageName;
        const component = utils.getPageComponentById(pageId);
        if (!submenus[smd]) {
          submenus[smd] = {
            text: smd,
            menuName: smd,
            children: [],
          }
        }
        const child = {
          text: pageName,
          menuName: pageName,
          menuUid: pageName,
          pageId: pageId ,
          invalid: component ? false: true,
          menuTypeCode: 'P',
        };
        child.data = {...child};
        child.state = {};
        submenus[smd].children.push(child);
      });

      _.forEach(submenus, (value, key) => {
        const smd = key;
        const md = smd.substr(0, 2);
        if (!menus[md]) {
          menus[md] = {
            text: md,
            menuName: md,
            children: [],
          }
        }
        menus[md].children.push(value);
      });

      return menus;
    },
    loadInitData() {
      return new Promise((resolve, reject) => {
        if (this.useServerMenu) {
          http.getGnbMenus().then(res => {
            this.menuItems = res;
            this.$store.commit('setApplications', res);
            resolve();
          }).catch(error => {
            reject(error);
          });
        } else {
          const menuQueue = [...menuConfig]; // 하위 호환 코드
          while (menuQueue.length) {
            const menu = menuQueue.shift();
            if (menu.subItems) {
              menu.children = menu.subItems;
              menu.subItems.forEach(item => { menuQueue.push(item); });
            }
            menu.menuUid = menu.text;
            menu.menuName = menu.text;
            menu.data = { ...menu };
          }

          if (this.showAllPages) {
            http.getAllPageList().then(res => {
              const menus = this.generateMenuItems(res.data);
              _.forEachRight(menus, menu => {
                menuConfig.splice(0, 0, menu);
              });
              this.$store.commit('setMenuData', menuConfig);
              this.menuItems = menuConfig;
              resolve();
            }).catch(error => { reject(error); });
          } else {
            this.$store.commit('setMenuData', menuConfig);
            this.menuItems = menuConfig;
            resolve();
          }
        }
      });
    },
    setMenuState(application, menuItems) {
      const menuUseYn = application.applicationMenuUseYn === 'Y'? true: false;
      const menuFoldYn = application.applicationMenuFoldYn === 'Y'? true: false;
      const menuItemFoldYn = application.applicationFolderFoldYn === 'Y'? true: false;
      // console.log(application);
      // console.log(`menuUseYn: ${menuUseYn}, menuFoldYn: ${menuFoldYn}, menuItemFoldYn: ${menuItemFoldYn}`);
      menuUseYn? this.$store.commit('showLNB'):this.$store.commit('hideLNB');
      menuFoldYn? this.$store.commit('collapseLNB'):this.$store.commit('expandLNB');
      menuItemFoldYn? this.$store.commit('collapseLNBItems'):this.$store.commit('expandLNBItems');
      this.$store.commit('showLnbDefaultMenu');
      
      const queue = [...menuItems];
      const defaultPage = application.applicationBasicsPageId;
      const defaultPageYn = !utils.isEmpty(defaultPage) && defaultPage.trim() !== '';
      let initPage = '';
      let initMenu = {};

      while (queue.length) {
        const menu = queue.shift();
        if (!menu.state) {
          menu.state = {};
        }
        if (menuItemFoldYn) {
          menu.state.expanded = false;
        } else {
          menu.state.expanded = true;
        }
        if(!defaultPageYn && utils.isEmpty(initPage) && menu.folderYn ==='N'){
          initPage = utils.startsWith(menu.pageId,'PGE_')?menu.pageId:menu.linkId;
          initMenu = menu;
        }
        //_.forEach(menu.children, child => queue.unshift(child));
        menu.children.reduceRight((_, child) => queue.unshift(child),null);
      }

      if (defaultPage && defaultPage.trim() !== '') {
        utils.goPage(defaultPage);
      }else if(utils.startsWith(initPage,'PGE_')){
        const path = `/${initMenu.pageId}`;

        if (initMenu.pagePopupYn === 'Y') {
          utils.goEmpty();
        } else {
          this.$router.push({ path });
        }
      }else if(utils.startsWith(initPage,'LNK_')) {
        http.getLinks(initMenu.linkId).then(res => {
          if(res.data){
            const url = res.data.linkUrl;
            if(res.data.linkTypeCode === 'I'){
              if(res.data.linkUsePopupYn === 'N'){
                this.$router.push({path: '/Redirect',query: { pageId: url },});
              }else{
                utils.goEmpty();
              }
            }else{
              utils.goEmpty();
            }
          }
        });
      }else{
        utils.goEmpty();
      }
    },
    onGnbSelected(item) {
      if (item.applicationId && this.$store.getters.applicationId === item.applicationId) {
        return;
      }
      this.$store.commit('setCurrentApplication', item);
      if (this.useServerMenu) {
        http.getLnbMenu(item.applicationId).then(res => {
          this.lnbItems = res;
          this.setMenuState(item, res);
        });
      } else {
        _.forEach(item.children, menu => {
          menu.state = { expanded: true };
        });
        this.$store.commit('expandLNB');
        this.$store.commit('showLNB');
        this.lnbItems = item.children;
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.funcResize);
  }
};
</script>

<style scoped>
</style>

