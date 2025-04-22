<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_shut_wrap">
        <div class="inbox" style="max-width: calc(50% - 30px);">
          <sui-page-tab-box-type
            ref="tab"
            :tabItems="tabItems"
            :defaultTabIndex="defaultTabIndex"
            :setCurrentTabComponent="onSetCurrentTabComponent"
            @change-tab-idx="onChangeTabIdx"
          >
            <container
              :is="currentTabComponent"
              @itemChecked="onTabGridItemChecked"
            />
          </sui-page-tab-box-type>
        </div>
        <div class="btnbox">
          <ul style="margin-top:250px;">
            <li>
              <sui-button
                type="button"
                class="comm_btn_shut_right"
                :disabled="btnStatus.sendRight"
                @click="onSendRight"
              >
                오른쪽보내기
              </sui-button>
            </li>
            <li>
              <sui-button
                type="button"
                class="comm_btn_shut_left"
                :disabled="btnStatus.sendLeft"
                @click="onSendLeft"
              >
                왼쪽보내기
              </sui-button>
            </li>
          </ul>
        </div>
        <div class="inbox" style="max-width: calc(50% - 30px);">
          <div class="comm_title_wrap">
            <h4>{{ $t('MSG_TXT_MENU') }}</h4>
          </div>
          <div class="comm_scr_wrap">
            <div class="row">
              <div class="col-xs-2">
                <sui-input-label
                  :label="$t('MSG_TXT_PORTL')"
                  :required="false"
                  :vertical="false"
                />
              </div>
              <div class="col-xs-10">
                <sui-custom-select
                  ref="comboPortals"
                  :selected="fromPsYn?psInitPortal:frame0.menuData.selPortal"
                  :option-list="frame0.selectPortalList"
                  @selection-changed="onLoadPortalSelect"
                  @list-clicked="onPortalSelectClick"
                  :disabled="fromPsYn"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-2">
                <sui-input-label
                  :label="$t('MSG_TXT_APPLICATION')"
                  :required="true"
                  :vertical="false"
                />
              </div>
              <div class="col-xs-10">
                <sui-custom-select
                  ref="comboApps"
                  :selected="frame0.menuData.selApp"
                  :option-list="frame0.selectAppList"
                  :initialSelectedIndex="0"
                  :defaultOption="'select'"
                />
              </div>
            </div>
            <div class="btn_wrap">
              <sui-button
                type="button"
                class="comm_btn_Reset"
                @click="onClickReset"
              >
                {{ $t('MSG_BTN_RESET') }}
              </sui-button>
              <sui-button
                v-permission:read="contextPageId"
                type="button"
                class="comm_btn_Scr"
                @click="onMenuSearchClick"
              >
                {{ $t('MSG_BTN_SEARCH') }}
              </sui-button>
            </div>
          </div>
          <div class="mrB30" />
          <div class="comm_gridTop_wrap">
            <div
              class="btn_wrapL"
              style="height:24px;"
            >
              <div class="totalList">
                {{ totalCntMenu }}
              </div>
              <div class="comp_spacing2" />
              <sui-button
                type="button"
                class="comm_btn_sort_top"
                :disabled="btnStatus.node"
                @click="onMoveTree('top')"
              >
                Top
              </sui-button>
              <sui-button
                type="button"
                class="comm_btn_sort_up"
                :disabled="btnStatus.node"
                @click="onMoveTree('up')"
              >
                Up
              </sui-button>
              <sui-button
                type="button"
                class="comm_btn_sort_down"
                :disabled="btnStatus.node"
                @click="onMoveTree('down')"
              >
                Down
              </sui-button>
              <sui-button
                type="button"
                class="comm_btn_sort_bottom"
                :disabled="btnStatus.node"
                @click="onMoveTree('bottom')"
              >
                Bottom
              </sui-button>
              <div class="comp_spacing2" />
              <sui-button
                v-permission:delete="contextPageId"
                type="button"
                class="comm_btn_gridTop"
                :disabled="btnStatus.node"
                @click="onRemoveNodeClick"
              >
                {{ $t('MSG_BTN_DEL') }}
              </sui-button>
            </div>
            <div class="btn_wrapR">
              <sui-button
                v-permission:create="contextPageId"
                type="button"
                class="comm_btn_gridTop"
                :disabled="btnStatus.addFolder"
                @click="onNewFolderClick"
              >
                {{ $t('MSG_BTN_FLDR_NEW') }}
              </sui-button>
              <sui-button
                v-permission:update="contextPageId"
                type="button"
                class="comm_btn_gridTop"
                :disabled="btnStatus.rename"
                @click="onRenameClick"
              >
                {{ $t('MSG_BTN_RENAME') }}
              </sui-button>
            </div>
          </div>
          <div class="menutree">
            <sui-menu-tree
              ref="menuTree"
              :data="treedata"
              :draggable="!readonlyMenu"
              @item-click="itemClick"
              @item-drop-before="itemDropBefore"
              @item-drop="itemDrop"
            />
          </div>
        </div>
      </div>
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:delete="contextPageId"
          type="button"
          class="comm_btn_border"
          :disabled="btnStatus.cancel"
          @click="onCancelClick"
        >
          {{ $t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button
          v-permission:update="contextPageId"
          type="button"
          class="comm_btn_border"
          :disabled="btnStatus.save"
          @click="onSaveClick"
        >
          {{ $t('MSG_BTN_SAVE') }}
        </sui-button>
        <sui-button
          v-permission:update="contextPageId"
          type="button"
          class="comm_btn_solid"
          :disabled="btnStatus.apply"
          @click="onApplyClick"
        >
          {{ $t('MSG_BTN_APPLY') }}
        </sui-button>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable no-bitwise */

import Vue from 'vue';
import BasePage from '~cm/components/BasePage';
import tab01 from './components/PGE_CMP_00009_T01.vue';
import tab02 from './components/PGE_CMP_00009_T02.vue';
// import tab03 from './components/PGE_CMP_00009_T03.vue';

export const eventBus = new Vue();

export default {
  name: 'PGE_CMP_00009', // eslint-disable-line vue/name-property-casing
  components: {
    tab01,
    tab02,
    // tab03,
  },
  extends: BasePage,
  props: {
    psInitData: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  data() {
    return {
      tabItems: [
        {
          tabId: 'tab01',
          tabTitle: this.$t('MSG_TXT_PAGE'),
          component: tab01,
        },
        {
          tabId: 'tab02',
          tabTitle: this.$t('MSG_TXT_LINK'),
          component: tab02,
        },
        // {
        //   tabId: 'tab03',
        //   tabTitle: this.$t('MSG_TXT_DASHBOARD'),
        //   component: tab03,
        // },
      ],
      currentTabComponent: 'tab01',
      defaultTabIndex: 0,
      sysLangList: [],
      btnStatus: {
        sendRight: true,
        sendLeft: true,
        node: true,
        addFolder: true,
        rename: true,
        save: true,
        cancel: true,
        apply: true,
      },
      rootTmpl: {
        text: this.$t('MSG_TXT_MENU'),
        menuUid: '',
        linkId: '',
        menuTypeCode: '',
        menuLevel: -1,
        icon: '',
        children: [],
        folderYn: 'Y',
        opened: true,
        dragDisabled: true,
        disabled: true,
      },
      editingItem: {},
      editingNode: null,
      flatdata: [],
      treedata: [{ children: [] }],
      currTreePortalId: '',
      currTreeApplicationId: '',
      enabled: true,
      dragging: false,
      frame0: {
        menuData: {
          selPortal: {},
          selApp: {},
        },
        selectPortalList: [],
        selectAppList: [],
        selAppDevType: 0,
      },
      localdata0: [],
      itemCheckedPages: [],
      itemCheckedDsboards: [],
      itemCheckedLinks: [],
      currentItemChecked: [],
      currentMenuTypeCode: '', // 'P', 'D', 'L'
      localdata1: [],
      readonlyMenu: false,
      fromPsYn: utils.isEmpty(this.psInitData)?false:true,
      psInitPortal: {key:this.psInitData.portalId, value:''},
    };
  },
  computed: {
    totalCntMenu() {
      this.flatdata = [];
      this.makeFlatData(this.treedata[0], this.flatdata);
      return utils.strFormat(this.$t('MSG_TXT_LST_CNT'), utils.size(this.flatdata)); // 총 {0}개
    },
  },
  watch: {
    currentItemChecked() {
      this.updateButtonStatus();
    },
    editingItem() {
      this.updateButtonStatus();
    },
    localdata1() {
      this.updateButtonStatus();
    },
  },
  mounted() {
    const hideTabIds = utils.getParameter(this, 'hideTabIds');
    if (!utils.isEmpty(hideTabIds)) {
      const arr = JSON.parse(hideTabIds);
      utils.forEach(arr, arrItm => {
        utils.remove(this.tabItems, tabItm => tabItm.tabId == arrItm);
      });
    }
    this.currentTabComponent = this.tabItems[0].tabId;

    this.treedata = [];
    this.treedata.push(utils.cloneDeep(this.rootTmpl));
    // portal list
    http.request(this.contextPageId, 'DTS_CMP_00004')
      .then(res => {
        this.frame0.selectPortalList = [];
        utils.forEach(res.data, obj => {
          this.frame0.selectPortalList.push({
            key: obj.portalId,
            label: obj.portalName,
          });
        });
      })
      .catch(error => {
        console.log(error);
      });

    // 시스템 언어 목록
    http.request(this.contextPageId, 'DTS_CMY_00001')
      .then(res => {
        this.sysLangList = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    /**
     * 왼쪽/오른쪽 이동 버튼, 최상/상/하/최하 이동 버튼, '삭제', '새 폴더', '명칭 변경' 버튼 disabled 제어
     */
    updateButtonStatus() {
      // 초기화
      utils.forIn(this.btnStatus, (value, key) => {
        this.btnStatus[key] = true;
      });

      if (!this.readonlyMenu) {
        // right arrow button
        if (!utils.isEmpty(this.currentItemChecked) && !utils.isEmpty(this.editingItem) && this.editingItem.folderYn === 'Y') {
          this.btnStatus.sendRight = false;
        }

        // left arrow button
        // up / down, delete, rename
        if (!utils.isEmpty(this.editingItem)) {
          if (this.editingItem.menuLevel === -1) {
            // this.btnStatus.addFolder = false;
          } else {
            this.btnStatus.sendLeft = false;
            this.btnStatus.node = false;
            this.btnStatus.rename = false;
          }
        }

        // cancel, apply, save
        if (utils.size(this.localdata1) > 0) {
          this.btnStatus.save = false;

          if (this.localdata1[0].workUserId) {
            this.btnStatus.apply = false;
            this.btnStatus.cancel = false;
          }
        } else if (utils.size(this.localdata1) === 0 && utils.size(this.treedata) > 0) {
          // 새로 생성한 application 에서 최초 메뉴를 만들 때
          this.btnStatus.save = false;
        }

        // addFolder
        // PC only
        if (this.frame0.selAppDevType === 1 && this.editingItem.folderYn === 'Y') {
          this.btnStatus.addFolder = false;
        } // Mobile or PC/Mobile
        else if ((this.frame0.selAppDevType & 2) > 0 && this.editingItem.menuLevel < 0 && this.editingItem.folderYn === 'Y') {
          this.btnStatus.addFolder = false;
        }
      }
    },
    onPortalSelectClick() {
      if(this.fromPsYn){
        this.getApplicationList(this.psInitPortal);
      }else{
        this.getApplicationList(this.frame0.menuData.selPortal);
      }
    },
    onLoadPortalSelect() {
      if(this.fromPsYn){
        this.getApplicationList(this.psInitPortal);
      }else{
        this.getApplicationList(this.frame0.menuData.selPortal);
      }
    },
    getApplicationList(vPortal) {
      // Application list
      http.request(this.contextPageId, 'DTS_CMP_00005', {
        query: {
          portalId: vPortal.key,
        },
      })
        .then(res => {
          this.frame0.selectAppList = [];
          utils.forEach(res.data, obj => {
            if (obj.deleteYn === 'N') {
              this.frame0.selectAppList.push({
                key: obj.applicationId,
                label: obj.applicationName,
                deviceType: obj.deviceTypeValue,
              });
            }
          });
          this.$nextTick(() => {
            this.$refs.comboApps.select(0);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    onClickReset() {
      if(!this.fromPsYn){
        this.$refs.comboPortals.reset();
      }
      this.$refs.comboApps.reset();

      this.currTreePortalId = '';
      this.currTreeApplicationId = '';
      this.editingItem = {};
      this.localdata1 = [];

      // menu init
      this.treedata = [];
      this.treedata.push(utils.cloneDeep(this.rootTmpl));
    },
    onMenuSearchClick() {
      const frm = this.frame0.menuData;
      if(this.fromPsYn){
        frm.selPortal.key = this.psInitPortal.key;
      }
      const queryParams = {
        portalId: utils.trim(frm.selPortal.key) || '',
        applicationId: utils.trim(frm.selApp.key) || '',
      };
      utils.forEach(this.frame0.selectAppList, app => {
        if (app.key === this.frame0.menuData.selApp.key) {
          this.frame0.selAppDevType = app.deviceType;
        }
      });

      if (!queryParams.portalId || !queryParams.applicationId) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_APPLICATION'));
        utils.messageBox('warning', msg);
        return false;
      }

      this.editingItem = {};
      this.isWork(queryParams.portalId, queryParams.applicationId, this.getMenuList);
    },
    getMenuList(portalId, appId, readOnly = false) {
      http.request(this.contextPageId, 'DTS_CMP_00012', {
        path: {
          'portal-id': portalId,
          'application-id': appId,
        },
        query: {
          readonly: readOnly,
        },
      }).then(res => {
        this.currTreePortalId = portalId;
        this.currTreeApplicationId = appId;
        this.localdata1 = res.data;

        if (readOnly) {
          this.readonlyMenu = true;
        } else {
          this.readonlyMenu = false;
        }
        this.updateButtonStatus();
        this.setTreeData(this.localdata1);
      }).catch(error => {
        console.log(error);
      });
    },
    isWork(portalId, appId, callbackFnc) {
      http.request(this.contextPageId, 'DTS_CMP_00019', {
        path: {
          'portal-id': portalId,
          'application-id': appId,
        },
      }).then(res => {
        const sessionUserId = this.$store.getters.userInfo.userId;
        if (res.data.workUserId && res.data.workUserId !== sessionUserId) {
          // button disabled
          this.updateButtonStatus();
          this.treedata = [utils.cloneDeep(this.rootTmpl)];

          const wUserId = res.data.workUserId

          const msg = `${utils.strFormat(this.$t('MSG_ALT_PRGS_EDIT'), wUserId)}\n${
            this.$t('MSG_ALT_PRGS_EDIT_DEL')}`;
          utils.messageBox('confirm', null, msg,
            (/* ok */) => {
              // 작업 중인 내용을 삭제하고 편집가능 하도록
              this.rewriteMenu(portalId, appId);
            },
            (/* cancel */) => {
              // 조회만 가능하도록
              callbackFnc(portalId, appId, true); // readonly
            });
          // return false;
        } else { // temp에 없으면
          callbackFnc(portalId, appId);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    rewriteMenu(portalId, appId) {
      http.request(this.contextPageId, 'DTS_CMP_00036', { // Menu List APPLY
        path: {
          'portal-id': portalId || '',
          'application-id': appId || '',
        },
      }).then(res => {
        this.getMenuList(portalId, appId);
      }).catch(error => {
        console.log(error);
      });
    },
    setTreeData(data) {
      const treeMap = {};
      const rootNode = utils.cloneDeep(this.rootTmpl);
      rootNode.disabled = false;
      utils.forEach(data, item => {
        const treeNode = {
          text: item.folderYn === 'N' ? (item.menuTypeCode === 'P' ? `${item.menuName}(${item.pageId})` : item.menuTypeCode === 'L' ? `${item.menuName}(${item.linkUrl})` : `${item.menuName}(${item.dashBoardId})`) : `${item.menuName}`,
          children: [],
          parentId: item.parentsMenuUid,
          order: item.arrayalOrder,
          level: item.menuLevel,
          icon: item.folderYn === 'N' ? 'fa fa-file icon-state-default' : '',
          opened: item.folderYn === 'Y',

          menuUid: item.menuUid,
          portalId: item.portalId,
          applicationId: item.applicationId,
          pageId: item.pageId,
          pageUsePeriodYn: item.pageUsePeriodYn,
          pageUsePeriodStartDatetime: item.pageUsePeriodStartDatetime,
          pageUsePeriodFinishDatetime: item.pageUsePeriodFinishDatetime,
          pagePopupYn: item.pagePopupYn,
          pagePopupOptionValue: item.pagePopupOptionValue,
          menuLevel: item.menuLevel,
          arrayalOrder: item.arrayalOrder,
          parentsMenuUid: item.parentsMenuUid,
          folderYn: item.folderYn,
          menuMultiLanguageId: item.menuMultiLanguageId,
          menuName: item.menuName,
          pageName: item.pageName,
          defaultYn: item.defaultYn,
          workUserId: item.workUserId,
          menuTypeCode: item.menuTypeCode,
          linkId: item.linkId,
          linkUrl: item.linkUrl,
          dashBoardId: item.dashBoardId,
          dashBoardName: item.dashBoardName,
          deviceTypeName: item.deviceTypeName,
        };

        treeMap[treeNode.menuUid] = treeNode;
      });

      utils.forEach(treeMap, (value, key) => {
        const treeNode = value;
        if (treeMap[treeNode.parentsMenuUid]) {
          treeMap[treeNode.parentsMenuUid].children.push(treeNode);
        } else {
          rootNode.children.push(treeNode);
        }
      });

      this.treedata = [rootNode];

      // tree data로 변환
      this.$refs.menuTree.initializeData(this.treedata);
    },
    // tree function
    onNewFolderClick() {
      if (this.editingItem.menuUid === undefined) {
        utils.messageBox('warning', this.$t('MSG_ALT_FLDL_SEL_POS'));
      } else if (this.editingItem.folderYn !== 'Y') {
        utils.messageBox('warning', this.$t('MSG_ALT_FLDL_SEL'));
      } else {
        const newMultiLangId = utils.guid('MNU');

        // 메뉴 명 다국어 입력
        const newFolderName = this.$t('MSG_TXT_FLDR_NEW'); // 새 폴더
        const langList = [];
        utils.forEach(this.sysLangList, langItem => {
          langList.push({
            multiLanguageId: newMultiLangId,
            langId: langItem.langId,
            langName: langItem.langName,
            multiLanguageTypeCode: 'MENU',
            multiLanguageTypeName: '',
            multiLanguageContent: newFolderName,
            multiLanguageAbbreviationContent: '',
          });
        });

        http.request(this.contextPageId, 'DTS_CMZ_00025', {
          path: {
            'multi-languages-id': newMultiLangId,
          },
          data: langList,
        }).then(() => {
          const tmpObj = {
            text: newFolderName,
            value: newFolderName,
            folderYn: 'Y',
            icon: '',
            menuUid: newMultiLangId,
            parentsMenuUid: this.editingItem.menuUid,
            portalId: this.currTreePortalId,
            applicationId: this.currTreeApplicationId,
            // pageId: '00000', // DB2 FIX
            order: this.editingItem.order,
            arrayalOrder: this.editingItem.arrayalOrder,
            menuLevel: this.editingItem.menuLevel + 1,
            defaultYn: 'N',
            menuName: newFolderName,
            menuMultiLanguageId: newMultiLangId,
          };

          this.editingItem.addChild(tmpObj);

          this.updateButtonStatus();
        }).catch(error => {
          console.log(error);
        });
      }
    },
    onRenameClick() {
      if (this.editingItem.menuUid === undefined) {
        utils.messageBox('warning', this.$t('MSG_ALT_RENAME_SEL'));
        return;
      }
      let tmpDashboardId = '';
      utils.openLayerPopup('PGE_CMZ_00008', ret => {
        console.log(this.editingItem);
        if (this.editingItem.dashboardId !== undefined) {
          tmpDashboardId = this.editingItem.dashboardId;
        } else {
          tmpDashboardId = this.editingItem.dashBoardId;
        }

        if (ret) {
          let newName = '';
          const userLangId = this.$store.getters.userInfo.langId;
          const foundMultiLanguageInfo = ret.find(item => item.langId === userLangId);
          if (foundMultiLanguageInfo == null) {
            newName = ret[0].multiLanguageContent;
          } else {
            newName = foundMultiLanguageInfo.multiLanguageContent;
          }
          this.editingItem.menuName = newName;
          if (this.editingItem.folderYn === 'Y') {
            this.editingItem.text = newName;
          } else if (this.editingItem.menuTypeCode === 'P') {
            this.editingItem.text = `${newName}(${this.editingItem.pageId})`;
          } else if (this.editingItem.menuTypeCode === 'L') {
            this.editingItem.text = `${newName}(${this.editingItem.linkUrl})`;
          } else {
            this.editingItem.text = `${newName}(${tmpDashboardId})`;
          }
        }
      }, {
        pageInitialData: {
          multiLanguageId: this.editingItem.menuMultiLanguageId,
          multiLanguageType: 'MENU',
          maxlength: 100,
        },
        size: 'lg',
      });
    },
    onApplyClick() {
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_APPLY_MENU'), null,
        (/* ok */) => {
          http.request(this.contextPageId, 'DTS_CMP_00019', {
            path: {
              'portal-id': this.currTreePortalId || '',
              'application-id': this.currTreeApplicationId || '',
            },
          }).then(res => {
            const sessionUserId = this.$store.getters.userInfo.userId;
            if (res.data.workUserId && res.data.workUserId === sessionUserId) {
              http.request(this.contextPageId, 'DTS_CMP_00018', { // Menu List APPLY
                path: {
                  'portal-id': this.currTreePortalId || '',
                  'application-id': this.currTreeApplicationId || '',
                },
              }).then(res => {
                utils.messageBox('success', this.$t('MSG_ALT_APPLY_DATA'));
                this.updateButtonStatus();
              }).catch(error => {
                console.log(error);
              });
            } else {
              utils.messageBox('warning', this.$t('MSG_ALT_NO_APPLY_MENU_DATA'));
              this.updateButtonStatus();
              return false;
            }
          }).catch(error => {
            console.log(error);
          });
        },
        (/* cancel */) => {});
    },
    async onSaveClick() {
      // 메뉴명 중복 확인
      this.flatdata = [];
      this.makeFlatData(this.treedata[0], this.flatdata);
      const dataParams = [];
      utils.forEach(this.flatdata, item => {
        dataParams.push({
          menuUid: item.menuUid,
          portalId: item.portalId,
          applicationId: item.applicationId,
          pageId: item.pageId,
          menuLevel: item.menuLevel,
          arrayalOrder: item.arrayalOrder,
          parentsMenuUid: item.parentsMenuUid,
          folderYn: item.folderYn,
          defaultYn: item.defaultYn,
          menuMultiLanguageId: item.menuMultiLanguageId,
          workUserId: item.workUserId,
          menuTypeCode: item.menuTypeCode,
          linkId: item.linkId,
          dashBoardId: item.dashboardId !== null && item.dashboardId !== undefined ? item.dashboardId : item.dashBoardId,
        });
      });
      const frm = this.frame0.menuData;

      http.request(this.contextPageId, 'DTS_CMP_00135', {
        path: {
          'portal-id': utils.trim(frm.selPortal.key) || '',
          'application-id': utils.trim(frm.selApp.key) || '',
        },
        data: dataParams,
      }).then(checkRes => {
        let confirmMessage = this.$t('MSG_ALT_IS_SAV_DATA');
        if (checkRes.data) {
          confirmMessage = this.$t('MSG_ALT_DUP_NM_ITEM_SAVE');
        }

        utils.messageBox('confirm', confirmMessage, null,
          (/* ok */) => {
            http.request(this.contextPageId, 'DTS_CMP_00017', { // Menu List insert
              path: {
                'portal-id': utils.trim(frm.selPortal.key) || '',
                'application-id': utils.trim(frm.selApp.key) || '',
              },
              data: dataParams,
            }).then(res => {
              if (res.data.resultCode === '1') {
                utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
                this.onMenuSearchClick();
              } else {
                utils.messageBox('error', this.$t('MSG_ALT_PRGS_EDIT_USR'));
                this.updateButtonStatus();
              }
            }).catch(error => {
              console.log(error);
            });
          },
          (/* cancel */) => {
          });

      });
    },
    onCancelClick() {
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_CANCEL_MENU'), null,
        (/* ok */) => {
          http.request(this.contextPageId, 'DTS_CMP_00019', {
            path: {
              'portal-id': this.currTreePortalId || '',
              'application-id': this.currTreeApplicationId || '',
            },
          }).then(res => {
            const sessionUserId = this.$store.getters.userInfo.userId;
            if (res.data.workUserId && res.data.workUserId === sessionUserId) {
              http.request(this.contextPageId, 'DTS_CMP_00036', { // Menu List APPLY
                path: {
                  'portal-id': this.currTreePortalId || '',
                  'application-id': this.currTreeApplicationId || '',
                },
              }).then(res => {
                utils.messageBox('success', this.$t('MSG_ALT_CANCEL_MENU'));
                this.onMenuSearchClick();
              }).catch(error => {
                console.log(error);
              });
            } else {
              utils.messageBox('warning', this.$t('MSG_ALT_NO_CANCEL_MENU_DATA'));
              // return false;
              this.onMenuSearchClick();
            }
          }).catch(error => {
            console.log(error);
          });
        },
        (/* cancel */) => {});
    },
    onMoveTree(move) {
      if (this.readonlyMenu) return false;

      if (!this.editingNode) {
        utils.messageBox('warning', this.$t('MSG_ALT_MOVE_ITEM_SEL'));
        return false;
      }
      if (this.editingItem.menuUid === '') return false;

      const { parentItem } = this.editingNode;
      const idx = parentItem.indexOf(this.editingItem);

      switch (move) {
        case 'top':
          if (idx > 0 && idx < parentItem.length) {
            const tmp = parentItem.splice(idx, 1)[0];
            parentItem.unshift(tmp);
          }
          break;
        case 'up':
          if (idx > 0 && idx < parentItem.length) {
            const newIndex = idx - 1;
            const tmp = parentItem.splice(idx, 1)[0];
            parentItem.splice(newIndex, 0, tmp);
          }
          break;
        case 'down':
          if (idx > -1 && idx < parentItem.length - 1) {
            const newIndex = idx < parentItem.length - 1 ? idx + 1 : parentItem.length - 1;
            const tmp = parentItem.splice(idx, 1)[0];
            parentItem.splice(newIndex, 0, tmp);
          }
          break;
        case 'bottom':
          if (idx > -1 && idx < parentItem.length) {
            const tmp = parentItem.splice(idx, 1)[0];
            parentItem.push(tmp);
          }
          break;
        default:
          break;
      }

      this._reordering(parentItem);
    },
    // Tree function
    itemClick(node, item, e) {
      // if (!this.readonlyMenu) {
      //   // button disabled status
      //   this.btnStatus.node = item.menuUid === '';
      //   this.btnStatus.rename = item.menuUid === '';
      //   this.btnStatus.addFolder = item.folderYn !== 'Y';

      //   if ((this.frame0.selAppDevType & 2) > 0) {
      //     if (item.menuLevel < 0 && item.folderYn === 'Y') {
      //       this.btnStatus.addFolder = false;
      //     } else {
      //       this.btnStatus.addFolder = true;
      //     }
      //   }
      // }
      this.editingNode = node;
      this.editingItem = node.model;
      this.updateButtonStatus();
    },
    itemDropBefore(node, item, draggedItem, e) {
      if (this.readonlyMenu) return false;

      this.dragging = false;

      if (!draggedItem) {
        eventBus.$emit('uncheckAllPages');
        eventBus.$emit('uncheckAllDashboards');
        eventBus.$emit('uncheckAllLinks');
      }
    },
    itemDrop(node, item, draggedItem, e) {
      if (this.readonlyMenu) return false;

      this.dragging = false;

      draggedItem = utils.assign(draggedItem, {
        parentsMenuUid: item.folderYn === 'Y' ? item.menuUid : item.parentsMenuUid,
      });

      this._reordering(node.parentItem);

      this.$refs.menuTree.handleRecursionNodeChildren(draggedItem, childrenItem => {
        childrenItem.selected = item.selected;
      });
    },
    _reordering(itemArr) {
      utils.forEach(itemArr, (item, index) => {
        item.order = index;
        item.arrayalOrder = index;
      });
    },
    onRemoveNodeClick() {
      if (this.editingItem.menuUid !== undefined) {
        const index = this.editingNode.parentItem.indexOf(this.editingItem);
        this.editingNode.parentItem.splice(index, 1);
        this.editingItem = {};
      }
    },
    onSendRight() {
      if (this.editingItem.menuUid === undefined) {
        utils.messageBox('warning', this.$t('MSG_ALT_MOVE_ITEM_POS_SEL'));
        return false;
      }

      let targetCheckedItems = null;
      switch (this.currentTabComponent) {
        case 'tab01': // page
          targetCheckedItems = this.itemCheckedPages;
          break;
        case 'tab02': // link
          targetCheckedItems = this.itemCheckedLinks;
          break;
        case 'tab03': // dashboard
          targetCheckedItems = this.itemCheckedDsboards;
          break;
        default:
      }

      if (utils.isEmpty(targetCheckedItems)) {
        return false;
      }

      this._insertMenu(this.editingNode, this.editingItem);
      const menuType = targetCheckedItems[0].menuTypeCode;
      if (menuType === 'P') {
        eventBus.$emit('uncheckAllPages');
      } else if (menuType === 'D') {
        eventBus.$emit('uncheckAllDashbaords');
      } else {
        eventBus.$emit('uncheckAllLinks');
      }
    },
    onSendLeft() {
      this.onRemoveNodeClick();
    },
    _insertMenu(targetNode, targetItem) {
      utils.forEach(this.currentItemChecked, obj => {
        const nodeObj = this._getMoveItem(obj, targetItem);
        // 메뉴 이름 다국어 등록
        const langList = [];
        utils.forEach(this.sysLangList, langItem => {
          langList.push({
            multiLanguageId: nodeObj.menuMultiLanguageId,
            langId: langItem.langId,
            langName: langItem.langName,
            multiLanguageTypeCode: 'MENU',
            multiLanguageTypeName: '',
            multiLanguageContent: nodeObj.menuName,
            multiLanguageAbbreviationContent: '',
          });
        });

        http.request(this.contextPageId, 'DTS_CMZ_00025', {
          path: {
            'multi-languages-id': nodeObj.menuMultiLanguageId,
          },
          data: langList,
        }).then(() => {
          if (targetItem.folderYn === 'Y') {
            targetItem.addChild(nodeObj);
          } else {
            targetItem.addAfter(nodeObj, targetNode);
          }
          this._reordering(targetNode.parentItem);
        }).catch(error => {
          console.log(error);
        });
      });
    },
    _getMoveItem(obj, item) {
      const newMenuUid = utils.guid('MNU');
      const tmp = {
        text: obj.menuTypeCode === 'P' ? `${obj.pageName}(${obj.pageId})` : obj.menuTypeCode === 'L' ? `${obj.linkName}(${obj.linkUrl})` : `${obj.dashboardName}(${obj.dashboardId})`,
        value: obj.menuTypeCode === 'P' ? obj.pageId : obj.dashboardId,
        folderYn: 'N',
        icon: 'fa fa-file icon-state-default',
        menuUid: newMenuUid,
        parentsMenuUid: item.folderYn === 'Y' ? item.menuUid : item.parentsMenuUid,
        portalId: this.currTreePortalId,
        applicationId: this.currTreeApplicationId,
        pageId: obj.pageId,
        linkId: obj.linkId,
        linkUrl: obj.linkUrl,
        dashboardId: obj.dashboardId,
        menuTypeCode: obj.menuTypeCode,
        order: 0,
        arrayalOrder: 0,
        menuLevel: item.folderYn === 'Y' ? item.menuLevel + 1 : item.menuLevel,
        defaultYn: 'N',
        menuName: obj.menuTypeCode === 'P' ? obj.pageName : obj.menuTypeCode === 'L' ? obj.linkName : obj.dashboardName,
        menuMultiLanguageId: newMenuUid,
      };
      return tmp;
    },
    makeFlatData(sourceData, targetData) { // 계층구조 데이터 => 목록구조 데이터
      utils.forEach(sourceData.children, (item, index) => {
        if (item.menuUid) {
          // 데이터 보정
          item = utils.assign(item, {
            order: index,
            arrayalOrder: index,
            menuLevel: sourceData.menuLevel + 1,
          });
          targetData.push(item);
        }
        if (item.children) {
          this.makeFlatData(item, targetData);
        }
      });
    },
    onSetCurrentTabComponent(component) {
      const page = 'PGE_CMP_00009';
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].tabId;
    },
    onTabGridItemChecked(data) {
      this.currentMenuTypeCode = data.menuTypeCode;
      this.currentItemChecked = data.itemChecked;
      switch (data.menuTypeCode) {
        case 'P':
          this.itemCheckedPages = data.itemChecked;
          break;
        case 'D':
          this.itemCheckedDsboards = data.itemChecked;
          break;
        case 'L':
          this.itemCheckedLinks = data.itemChecked;
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style>
.menutree {
  height: 440px;
  overflow: auto;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

/* .comm_title_wrap {margin-top:0 !important} */

.tree-anchor {
  max-width: 85%;
}
</style>
