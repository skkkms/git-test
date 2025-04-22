<template>
  <div class="lnb">
    <div
      v-show="!collapsed"
      class="lnb__expand__root"
    >
      <div class="menutab_wrap">
        <div
          :class="menuClass"
          @click="onclickMenu"
        >
          <div
            class="txt"
            :title="menuText"
          >
            {{ menuText }}
          </div>
        </div>
        <div
          :class="favoriteClass"
          @click="onClickFavorite"
        >
          <div
            class="txt"
            :title="favoriteText "
          >
            {{ favoriteText }}
          </div>
        </div>
        <div class="lnb-trigger">
          <button
            name="trigger"
            type="button"
            class="close"
            :title="hide"
            @click="onLnbHideBtnClicked"
          />
          <button
            v-if="getConfigValue('CFG_CMP_MENU_EXPAND_YN') === 'Y'"
            name=""
            type="button"
            class="lnb__button__extend"
            :title="extendButtonTooltip"
            @click="onLnbExtendBtnClicked"
          />
        </div>
      </div>
      <div
        v-show="lnbMenuActivated"
        class="scr_wrap"
      >
        <sui-text-field
          v-model="treeFilter"
          :clearable="true"
          fixed-icon
          :placeholder="lnbSearchPlaceholder"
        />
        <button
          type="button"
          :title="collapseButtonTooltip"
          :class="expandAllBtnClass"
          @click="onExpandAll"
        />
      </div>
      <!--
      <lnbMenu
        v-show="true"
        :menuItems="menuItems"
        class="menu_list"
        style="transform: translateX(300px)"
      />
      -->
      <sui-filter-treeview
        v-show="lnbMenuActivated"
        v-if="menuItems.length"
        ref="treeview"
        :data="menuItems"
        :options="treeOptions"
        :filter="treeFilter"
        class="menu_list"
        @node:clicked="onSelected"
      />
      <sui-filter-treeview
        v-show="!lnbMenuActivated"
        ref="treeview-custom"
        :data="mymenuItems"
        :options="treeOptions"
        class="menu_list mymenu_list"
        @node:selected="onFavoriteSelected"
        @usericon-click="onEditClick"
      />
      
      <div class="copyright">
        <div style="text-align: center;width: 100%">ⓒSAMSUNG C&T</div>

<!--        <div class="comm_line_div" /> &ndash;&gt;-->
<!--        <a-->
<!--          class="-lnb__privacy-policy"-->
<!--          :title="privacyPolicyText"-->
<!--          @click="onPrivacyPolicyClicked"-->
<!--        >{{ $t("MSG_TXT_PERS_INFO_PROC_POLI") }}</a>-->
<!--        <div class="-lnb__privacy-policy-divider"></div>-->
<!--        <a-->
<!--          class="-lnb__privacy-policy"-->
<!--          :title="termsServiceText"-->
<!--          @click="onTermsConditionClicked"-->
<!--        >{{ $t("MSG_TXT_TERMS_SERV") }}</a>-->
      </div>

    </div>
    <div
      v-show="collapsed"
      class="lnb-state-closed"
    >
      <button
        name=""
        type="button"
        class="open"
        :title="show"
        @click="onLnbShowBtnClicked()"
      />
      <button
        name=""
        type="button"
        class="menu"
        :title="menuText"
        @click="onLnbShowBtnClicked('menu')"
      />
      <button
        name=""
        type="button"
        class="myMenu"
        :title="favoriteText"
        @click="onLnbShowBtnClicked('myMenu')"
      />
    </div>   
  </div>
</template>

<script>

import lnbMenu from '../SuiLnbMenu/SuiLnbMenu';

export default {
  name: 'SuiLnb',
  components: {
    lnbMenu,
  },
  props: {
    menuItems: {
      type: Array,
      default() {
        return [];
      },
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      items: [],
      treeOptions: {
        multiple: false,
        // filter: {
        //   plainList: true
        // }
      },
      treeFilter: '',
      mymenuItems: [],
      tooltipMenuList: [
        { key: 'favorites', label: this.$t('MSG_TIT_BKMK') },
        { key: 'menual', label: this.$t('MSG_TIT_MANU_SRCH') },
        { key: 'new-window', label: this.$t('MSG_TXT_NEW_WINDOW') },
      ],
      lnbSearchPlaceholder: utils.getMessageById('MSG_TXT_INPUT_MENU_NM'),
      menuText: utils.getMessageById('MSG_TXT_MENU'),
      favoriteText: utils.getMessageById('MSG_TXT_FAVORITE'),
      privacyPolicyText: utils.getMessageById('MSG_TXT_PERS_INFO_PROC_POLI'),
      termsServiceText: utils.getMessageById('MSG_TXT_TERMS_SERV'),
      hide: utils.getMessageById('MSG_TXT_HIDE'),
      show: utils.getMessageById('MSG_TXT_SHOW'),
      wide: utils.getMessageById('MSG_TXT_WIDE'),
      narrow: utils.getMessageById('MSG_TXT_NARROW'),
      collapse: utils.getMessageById('MSG_TXT_COLLAPSE'),
      expand: utils.getMessageById('MSG_TXT_EXPAND'),
    };
  },
  computed: {
    collapseButtonTooltip() {
      if (!this.$store.getters.lnbItemsCollapsed) {
        return utils.getMessageById('MSG_TXT_COLLAPSE');
      }
      return utils.getMessageById('MSG_TXT_EXPAND');
    },
    extendButtonTooltip() {
      if (this.$store.getters.lnbExtended) {
        return utils.getMessageById('MSG_TXT_NARROW');
      }
      return utils.getMessageById('MSG_TXT_WIDE');
    },
    lnbItemsCollapsed() {
      return this.$store.getters.lnbItemsCollapsed;
    },
    lnbExtended() {
      return this.$store.getters.lnbExtended;
    },
    expandAllBtnClass() {
      if (this.lnbItemsCollapsed) {
        return 'btn_menu_open';
      }
      return 'btn_menu_close';
    },
    lnbMenuActivated() {
      return this.$store.getters.lnbMenuActivated;
    },
    menuClass() {
      if (this.lnbMenuActivated) {
        return 'menutab_on';
      }
      return 'menutab_off';
    },
    favoriteClass() {
      if (!this.lnbMenuActivated) {
        return 'mymenutab_on';
      }
      return 'mymenutab_off';
    },
  },
  watch: {
    lnbItemsCollapsed(value) {
      if (value) {
        this.collapseAll();
      } else {
        this.expandAll();
      }
    },
    menuItems() {
      this.treeFilter = '';
    },
  },
  mounted() {
    // this.updateMyMenu();
    this.$root.$on('favorite-changed', this.updateMyMenu);
  },
  beforeDestroy() {
    if (this.portal) {
      if (this.portal.$el.parentNode) {
        this.portal.$el.parentNode.removeChild(this.portal.$el);
      }
      this.portal.$destroy();
      this.portal = null;
    }
    this.$root.$off('favorite-changed', this.updateMyMenu);
  },
  methods: {
    updateMyMenu() {
      http.getFavoriteMenu().then(bookMark => {
        http.getRecentelyUsedMenu().then(receltylUsed => {
          this.mymenuItems = [receltylUsed, bookMark];
          this.$refs['treeview-custom'].expandAll();
        }).catch(e => {});
      }).catch(e => {});
    },
    showMenu() {
      this.$store.commit('showLNB');
    },
    hideMenu() {
      this.$store.commit('hideLNB');
    },
    // lnbClicked(item) {
    //   if (item.pageId) {
    //     this.selectedLnb = item;
    //     this.openPage(item.pageId);
    //   }
    // },
    // openPage(pageId) {
    //   this.$router.push({path: `/${pageId}`});
    // },
    lnbItemClass(item) {
      if (!item.hasOwnProperty('invalid')) {
        const component = utils.getPageComponentById(item.pageId);
        item.invalid = true;
        if (component) {
          item.invalid = false;
        }
      }
      if (item.invalid) {
        return ['no-link'];
      }
    },
    getDisplayName(item) {
      if (item.pageId && item.pageId.split('PGE').length === 2) {
        return `${item.text}(${item.pageId.substr(9, 5)})`;
      }
      return `${item.text}`;
    },
    onClickFavorite() {
      this.$store.commit('showLnbFavoriteMenu');
      this.updateMyMenu();
    },
    onEditClick() {
      utils.openLayerPopup('PGE_CMP_00001', result => {
        // 즐겨찾기 관리 수정 시 리로드
        if (result) {
          http.getFavoriteMenu().then(bookMark => {
            http.getRecentelyUsedMenu().then(receltylUsed => {
              this.mymenuItems = [receltylUsed, bookMark];
              this.$refs['treeview-custom'].expandAll();
            });
          });
        }
      }, {
        pageInitialData: {
        },
        size: 'md',
      });
    },
    onclickMenu() {
      this.$store.commit('showLnbDefaultMenu');
    },
    onLnbHideBtnClicked() {
      this.$store.commit('collapseLNB');
    },
    onLnbShowBtnClicked(item) {
      if (item === 'menu') {
        this.$store.commit('showLnbDefaultMenu');
      } else if (item === 'myMenu') {
        this.$store.commit('showLnbFavoriteMenu');
        this.updateMyMenu();
      }
      this.$store.commit('expandLNB');
    },
    onLnbExtendBtnClicked() {
      if (this.lnbExtended) {
        this.$store.commit('shrinkLNB');
      } else {
        this.$store.commit('extendLNB');
      }
    },
    onExpandAll() {
      if (this.lnbItemsCollapsed) {
        this.$store.commit('expandLNBItems');
      } else {
        this.$store.commit('collapseLNBItems');
      }
    },
    updateRecentlyUsedMenu(data) {
      const newMenuItem = {
        text: data.text,
        pageId: data.pageId,
        data: { ...data },
      };
      if (this.mymenuItems.length) {
        const newMenuItems = this.mymenuItems;
        const recentlyMenu = newMenuItems[0].children;
        const index = _.findIndex(recentlyMenu, menu => menu.pageId === data.pageId);
        if (index >= 0) {
          const item = _.clone(recentlyMenu[index]);
          recentlyMenu.splice(index, 1);
          recentlyMenu.splice(0, 0, item);
        } else {
          recentlyMenu.splice(0, 1);
          recentlyMenu.push(newMenuItem);
        }
        if (this.$refs['treeview-custom']) {
          this.$refs['treeview-custom'].setModel(newMenuItems);
        }
      }
    },
    onFavoriteSelected(node) {
      if (node.data.folderYn !== 'Y') {
        this.onSelected(node);
        this.updateRecentlyUsedMenu(node.data);
      }
    },
    onSelected(node) {
      const forceRedirect = utils.getConfigurationValue('CFG_CMP_MENU_CLICK_RELOAD_YN') === 'Y';

      if (node.data.menuTypeCode === 'L') {
        http.getLinks(node.data.linkId).then(res => {
          if(res.data){
            const url = res.data.linkUrl;
            if(res.data.linkTypeCode === 'I'){
              if(res.data.linkUsePopupYn === 'N'){
                this.$router.push({path: '/Redirect',query: { pageId: url },});
              }else{
                const popupOptions = res.data.linkPopupOptionValue ? JSON.parse(res.data.linkPopupOptionValue) : {};                
                let wnd = null;
                wnd = utils.openWindowPopup(url, null, null, popupOptions);
              }
            }else{
              window.open(url, '_blank', res.data.linkPopupOptionValue);
            }
          }
        });
      } else {
        // if (!node.data.pageId || node.data.pageId.trim() === '' || !node.data.pageId.startsWith('PGE')) return;
        if (!node.data.pageId || node.data.pageId.trim() === '') return;

        const path = `/${node.data.pageId}`;
        if (_.has(node, 'data') && node.data.pagePopupYn === 'Y') {
          const popupOptions = node.data.pagePopupOptionValue ? JSON.parse(node.data.pagePopupOptionValue) : {};
          let wnd = null;
          wnd = utils.openWindowPopup(node.data.pageId, null, null, popupOptions);
          if (['PGE_CML_00007'].indexOf(node.data.pageId) >= 0) {
            wnd.addEventListener('beforeunload', e => {
              if (wnd.CLOSE_SILIENTLY) {
                // the absence of a returnValue property on the event will guarantee the browser unload happens
                delete e.returnValue;
                this.$router.push({ path: `/${wnd.TARGET_PAGEID}`, query: { refresh: true } });
              } else {
                // 닫기 방지
                e.preventDefault();
                e.returnValue = 'do not close siliently';
              }
            });
          }
        } else if (forceRedirect) {
          this.$router.push({
            path: '/Redirect',
            query: { pageId: node.data.pageId, t: Date.now() },
          });
        } else {
          this.$router.push({ path });
        }
      }

      this.$store.commit('setMenuPath', []);
      if (node.data.applicationId) { // local menu인 경우에는 skip
        this.addMenuLog(node);
        this.saveMenuPath(node);
      }
    },
    onPrivacyPolicyClicked() {
      utils.openLayerPopup('PGE_CMP_00006', () => {}, { pageInitialData: {}, size: 'xlg' });
    },
    onTermsConditionClicked() {
      utils.openLayerPopup('PGE_CMP_00007', () => {}, { pageInitialData: {}, size: 'xlg' });
    },
    collapseAll() {
      if (this.$refs.treeview) {
        this.$refs.treeview.collapseAll();
      }
    },
    expandAll() {
      if (this.$refs.treeview) {
        this.$refs.treeview.expandAll();
      }
    },
    addMenuLog(node) {
      http.request('LNBTree', 'DTS_CMP_00030', {
        data: {
          menuLogTypeCode: 'MENU',
          menuLogObjectId: node.data.menuUid,
          menuName: node.data.menuName,
          pageId: node.data.pageId,
          appId: node.data.applicationId,
        },
      }).then(res => {
        if (!this.lnbMenuActivated) {
          this.updateMyMenu();
        }
      }).catch(err => {
        console.log(err);
      });
    },
    saveMenuPath(node) {
      const menuPath = [];
      menuPath.push({
        menuName: node.data.menuName,
        menuUid: node.data.menuUid,
        applicationId: node.data.applicationId,
        portalId: node.data.portalId,
        pageId: node.data.pageId,
      });
      let parent = node.parent || null;
      while (parent) {
        menuPath.splice(0, 0, {
          menuName: parent.data.menuName,
          menuUid: parent.data.menuUid,
          applicationId: parent.data.applicationId,
          portalId: parent.data.portalId,
          pageId: '',
        });
        parent = parent.parent || null;
      }
      this.$store.commit('setMenuPath', menuPath);
    },
    getConfigValue(cfgId) {
      return utils.getConfigurationValue(cfgId);
    },    
  },
};
</script>

<style scoped>
</style>
