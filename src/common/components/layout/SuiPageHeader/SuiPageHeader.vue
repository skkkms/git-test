<template>
  <div class="-page-header">
    <div
      v-show="isShownPageTitle"
      class="-page-header-title__wrapper"
    >
      <div class="-page-header-title-main__wrapper">
        <button
          type="button"
          :class="['-page-header-title-main__shortcut-favorite', classesShortcutFavorite]"
          :disabled="getConfigValue('CFG_CMP_TIT_FAVORITE_USE_YN') != 'Y'"
          :title="tooltipBookMark"
          @click="onClickShortcutFavorite"
        />
        <h1 class="-page-header-title-main__title">
          {{ pageTitle }}
          <P
            v-if="getConfigValue('CFG_CMU_PAGE_ID_DISP_YN') === 'Y'"
            style="color:transparent"
          >
            &nbsp;&nbsp;{{ `  ${pageId}` }}
          </P>
        </h1>
      </div>

      <div class="-page-header-title-locations-and-shortcuts__wrapper">
        <ul>
          <li
            v-if="getConfigValue('CFG_CMP_MENU_PATH_YN') === 'Y'"
          >
            <div class="-page-header-title-locations__wrapper">
              <div
                v-for="(item, index) in locationList"
                :key="index"
                :title="locationList.join(' > ')"
              >
                <ul>
                  <li
                    :class="['-page-header-title-locations__item', {
                      '-page-header-title-locations__item-current': index === (locationList.length-1)
                    }]"
                    :label="item"
                  >
                    {{ item }}
                  </li>
                  <li
                    v-if="locationList.length > 0 && index !== (locationList.length-1)"
                    class="-page-header-title-location__seperator"
                  />
                </ul>
              </div>
              <button
                type="button"
                class="-page-header-title-location__shortcut-copy"
                :title="tooltipCopyLocations"
                @click="onClickShortcutCopyLocations"
              />
            </div>
          </li>
          <li
            v-if="getConfigValue('CFG_CMP_MENU_PATH_YN') === 'Y'"
            class="-page-header-title-locations__divider"
          />
          <li>
            <div class="-page-header-title-shortcuts__wrapper">
              <!-- 매뉴얼 조회 -->
              <button
                type="button"
                class="-page-header-title-shortcut__information"
                :title="tooltipManual"
                @click="onClickShortcutInformation"
              />
              <div
                v-if="false"
                style="width:5px"
              />
              <!-- 새창으로 보기 -->
              <button
                v-if="false"
                type="button"
                class="-page-header-title-shortcut__newwindow"
                :title="tooltipNewWindow"
                @click="onClickShortcutNewWindow"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

const PAGE_ROOT_CLASS_NAME = '-page-root-container'
const COMPONENT_TAG_NAME_PAGE = 'sui-page'

export default {
  name: 'SuiPageHeader',
  props: {
    pageId: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // Page title
      pageTitle: this.title ? this.title : '',

      // Page Name
      pageName: '',

      // Page locations
      locationList: [],

      // Page title visibility. If true, page-title was shown.
      isShownPageTitle: false,

      // Favorite Page.
      isFavorites: false,

      // Process Tab Items.
      pTab: null,
      pTabItems: [],
      pTabDefaultIndex: 0,

      // page component
      pageComponent: null,
      realPageId: this.pageId,

      tooltipBookMark: this.$t('MSG_TIT_BKMK'),
      tooltipCopyLocations: this.$t('MSG_TXT_COPY'),
      tooltipManual: this.$t('MSG_TIT_MANU_SRCH'),
      tooltipNewWindow: this.$t('MSG_TXT_NEW_WINDOW'),
      unsubscribe: null,
    }
  },

  computed: {
    classesShortcutFavorite() {
      return [
        { '-page-header-title-main__shortcut-favorite-on': this.isFavorites },
        { '-page-header-title-main__shortcut-favorite-off': !this.isFavorites },
      ]
    },
  },
  mounted() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setMenuPath') {
        const meta = this.$store.getters.getPageMeta(this.realPageId)
        if (meta) {
          this.generateLocations(meta.pageInfo)
        }
      }
    })

    // page component
    this.pageComponent = this._findComponent()
    this.$nextTick(() => {
      // Page title visibility.
      if (this.isPageRoot(this.pageComponent.$el)
        || (this.pageComponent.$el.parentElement && this.pageComponent.$el.parentElement.tagName === 'DIV' && this.isPageRoot(this.pageComponent.$el.parentElement)) // page를 div로 감싼경우에 대한 처리
      ) {
        this.isShownPageTitle = true
        this.pageComponent.toggleTitle(this.isShownPageTitle)
      }
    })
    let linkPageId = null
    if (this.pageComponent.$parent._props._params) { // link page인 경우 sourcePageId를 사용
      linkPageId = this.pageComponent.$parent._props._params.routerOriginPageId
    }

    if (linkPageId) {
      this.realPageId = linkPageId
      this.linkPageId = linkPageId
    }
    if (this.realPageId) {
      const originMeta = this.$store.getters.getPageMeta(this.pageId)
      const meta = this.$store.getters.getPageMeta(this.realPageId)
      if (meta) {
        this.pageTitle = utils.startsWith(meta.pageInfo.pageTitleMessageResourceId, 'MSG_', 0) ? this.$t(meta.pageInfo.pageTitleMessageResourceId) : meta.pageInfo.pageTitleMessageResourceId
        this.generateLocations(meta.pageInfo)
        this.isFavorites = (meta.bookmarkPageYn === 'Y')
        this.pageName = meta.pageInfo.pageName
      }
      if (originMeta) {
        // this.pageTitle = this.$t(originMeta.pageInfo.pageTitleMessageResourceId);
      }
    } else {
      // FIXME: For Samples
      this.locationList.push(this.title)
    }
    this.$root.$on('favorite-changed', this.updateFavorite)
  },
  beforeDestroy() {
    this.$root.$off('favorite-changed', this.updateFavorite)
    this.unsubscribe()
  },
  methods: {
    getPage() {
      if (this.pageComponent) {
        return this.pageComponent.$parent
      }
      return null
    },
    onClickShortcutCopyLocations() {
      // utils.copyToClipboard(document.getElementById('pageHeaderTitleLocations').innerText.replace(/\n/g, ' > '));
      utils.copyToClipboard(this.locationList.join(' > '))
      // 클립보드에 복사하였습니다.
      utils.toast(this.$t('MSG_ALT_COPY_TO_CLIPBOARD'))
    },
    updateFavorite(result) {
      if (result.pageId === this.realPageId) {
        this.isFavorites = result.state
      }
    },
    onClickShortcutFavorite() {
      http.toggleFavorites(this.realPageId).then(res => {
        // this.isFavorites = res;
        this.$root.$emit('favorite-changed', res)
      }).catch(() => {

      })

      // let _dts = '';
      // let _param = {};

      // if (this.isFavorites) {
      //   // delete bookmark
      //   _dts = 'DTS_CMP_00022'; // eslint-disable-line vue/name-property-casing
      //   _param = {
      //     query: {
      //       pageId: this.pageId,
      //     },
      //   };
      // }
      // else{
      //   // add bookmark
      //   _dts = 'DTS_CMP_00021';
      //   _param = {
      //     data: {
      //       bookmarkName: this.pageName,
      //       pageId: this.pageId,
      //     }
      //   };
      // }
      // http.request(this.pageId, _dts, _param).then(res => {
      //   this.isFavorites = !this.isFavorites;
      //   this.$root.$emit("favorite-changed");
      // }).catch(err => {
      //   console.log(err);
      // });
    },
    onClickShortcutNewWindow() {
      const page = this.getPage()
      if (page) {
        const pageId = this.linkPageId ? this.linkPageId : page.$options.name
        const { query } = page.$route
        utils.openWindowPopup(pageId, query, null, { resizable: 'yes' })
      }
    },
    onClickShortcutInformation() {
      utils.openLayerPopup('PGE_CMU_00013', res => res, {
        pageInitialData: {
          type: 'page',
          pageId: this.linkPageId ? this.linkPageId : this.pageId,
        },
        size: 'lg',
      })
    },
    _findComponent() {
      let currentComponent = this
      while (currentComponent) {
        if (currentComponent.$options._componentTag === COMPONENT_TAG_NAME_PAGE) {
          return currentComponent
        }
        currentComponent = currentComponent.$parent
      }
      return null
    },
    isPageRoot(element) {
      if (!element) {
        return false
      }
      return _.some(element.classList, className => {
        if (className === PAGE_ROOT_CLASS_NAME) {
          return true
        }
        return false
      })
    },
    generateLocations(pageInfo) {
      // FIXME: 브라우저 주소창에 pageId를 입력하고 띄웠을 때와 구분하는 로직이 들어가야 함
      const menuPath = this.$store.state.menu_path
      this.locationList = []
      if (!utils.isEmpty(menuPath) /* && (menuPath[menuPath.length-1].pageId == pageInfo.pageId
      || menuPath[menuPath.length-1].pageId == pageInfo.fromPageId) */) {
        this.locationList.push(this.$store.getters.applicationName)
        for (let i = 0; i < menuPath.length - 1; i++) {
          this.locationList.push(menuPath[i].menuName)
        }
      }
      this.locationList.push(this.pageTitle)
      // this.$store.commit('setMenuPath', []);
    },
    getConfigValue(cfgId) {
      return utils.getConfigurationValue(cfgId)
    },
  },
}
</script>

<style scoped>
</style>
