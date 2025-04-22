<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
      <div class="comm_shut_wrap">
        <div class="inbox">
          <sui-page-tab-box-type
            ref="tab"
            :tabItems="tabItems"
            :defaultTabIndex="defaultTabIndex"
            :setCurrentTabComponent="onSetCurrentTabComponent"
            @change-tab-idx="onChangeTabIdx"
          >
            <container
              :is="currentTabComponent"
              @itemChecked="itemChecked"
            />
          </sui-page-tab-box-type>
        </div>
        <div class="mrB30"></div>
          <div class="btnbox">
            <ul style="margin-top:250px;">
              <li>
                <sui-button type="button" class="comm_btn_shut_right" @click="onSendRight" :disabled="btnStatus.node">
                오른쪽보내기
                </sui-button>
              </li>
              <li>
                <sui-button type="button" class="comm_btn_shut_left" @click="onSendLeft" :disabled="btnStatus.node">
                  왼쪽보내기
                </sui-button>
              </li>
            </ul>
          </div>
          <div class="inbox">
            <div class="comm_gridTop_wrap">
              <div class="btn_wrapL" style="height:24px;">
                <div class="totalList">{{ totalCntMenu }}</div>
                <div class="comm_line_div"/>
                <sui-button
                    type="button"
                    class="comm_btn_sort_top"
                    @click="onMoveTree('top')"
                    :disabled="btnStatus.node">Top</sui-button>
                <sui-button
                    type="button"
                    class="comm_btn_sort_up"
                    @click="onMoveTree('up')"
                    :disabled="btnStatus.node">Up</sui-button>
                <sui-button
                    type="button"
                    class="comm_btn_sort_down"
                    @click="onMoveTree('down')"
                    :disabled="btnStatus.node">Down</sui-button>
                <sui-button
                    type="button"
                    class="comm_btn_sort_bottom"
                    @click="onMoveTree('bottom')"
                    :disabled="btnStatus.node">Bottom</sui-button>
                <sui-button
                    v-permission:delete="contextPageId"
                    type="button"
                    class="comm_btn_gridTop"
                    @click="onRemoveNodeClick"
                    :disabled="btnStatus.node">{{ $t('MSG_BTN_DEL') }}</sui-button>
              </div>
              <div class="btn_wrapR">
                <sui-button
                    v-permission:create="contextPageId"
                    type="button"
                    class="comm_btn_gridTop"
                    @click="onNewFolderClick"
                    :disabled="btnStatus.addFolder">{{ $t('MSG_BTN_FLDR_NEW') }}</sui-button>
                <sui-button
                    v-permission:update="contextPageId"
                    type="button"
                    class="comm_btn_gridTop"
                    @click="onRenameClick"
                    :disabled="btnStatus.rename">{{ $t('MSG_BTN_RENAME') }}</sui-button>
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
    </div>
    <div class="comm_btn_wrap" style="margin-right:30px;">
      <sui-button
          v-permission:delete="contextPageId"
          type="button"
          class="comm_btn_border"
          @click="onCancelClick"
          :disabled="btnStatus.cancel">{{ $t('MSG_BTN_CANCEL') }}</sui-button>
      <sui-button
          v-permission:update="contextPageId"
          type="button"
          class="comm_btn_border"
          @click="onSaveClick"
          :disabled="btnStatus.save">{{ $t('MSG_BTN_SAVE') }}</sui-button>
      <sui-button
          v-permission:update="contextPageId"
          type="button"
          class="comm_btn_solid"
          @click="onApplyClick"
          :disabled="btnStatus.apply">{{ $t('MSG_BTN_APPLY') }}</sui-button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import BasePage from '~cm/components/BasePage';
import draggable from 'vuedraggable';
import tab03 from './PGE_CMP_00011_T03.vue';
//import tab04 from './PGE_CMP_00011_T04.vue';
import tab05 from './PGE_CMP_00011_T05.vue';

export const eventBus = new Vue();

export default {
  name: 'PGE_CMP_00011_P02', // eslint-disable-line vue/name-property-casing
  components: {
    tab03,
    //tab04,
    tab05,
    draggable,
  },
  extends: BasePage,
  props: {
    portalId: {
      type: String,
      required: true,
      default() {
        return '';
      },
    },
    applicationId: {
      type: String,
      required: true,
      default() {
        return '';
      },
    },
    deviceType: {
      type: Number,
      required: false,
      default() {
        return 1;
      },
    },
  },
  data() {
    return {
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_PAGE'),
          component: tab03,
        },
        // {
        //   tabTitle: this.$t('MSG_TXT_LINK'),
        //   component: tab04,
        // },
        {
          tabTitle: this.$t('MSG_TXT_DASHBOARD'),
          component: tab05,
        },
      ],
      currentTabComponent: 'tab03',
      defaultTabIndex: 0,
      sysLangList: [],
      btnStatus: {
        node: true,
        addFolder: true,
        rename: true,
        save: true,
        cancel: true,
        apply: true,
      },
      rootTmpl: {
        text: this.$t('MSG_TXT_MENU'),
        // id: '',
        menuUid: '',
        linkUid: '',
        menuTypeCode: '',
        menuLevel: -1,
        icon: '',
        children: [],
        folderYn: 'Y',
        opened: true,
        dragDisabled: true,
        disabled: true,
      },
      // buff: {},
      buff: [],
      editingItem: {},
      editingNode: null,
      flatdata: [],
      treedata: [{ children: [] }],
      currTreePortalId: '',
      currTreeApplicationId: '',
      enabled: true,
      dragging: false,
      selIndex: -1,
      // Codes
      codes: CommonConstants.selectOptions(),
      localdata0: [],
      localdata1: [],
      readonlyMenu: false,
    };
  },
  computed: {
    totalCntMenu() {
      this.flatdata = [];
      this.makeFlatData(this.treedata[0], this.flatdata);
      return utils.strFormat(this.$t('MSG_TXT_LST_CNT'), utils.size(this.flatdata)); // 총 {0}개
    },
  },
  watch: {},
  mounted() {
    this.treedata = [];
    this.treedata.push(utils.cloneDeep(this.rootTmpl));

    // 시스템 언어 목록
    http.request(this.contextPageId, 'DTS_CMY_00001')
      .then(res => {
        this.sysLangList = res.data;
      })
      .catch(error => {
        console.log(error);
      });

    // tree
    this.onMenuSearchClick();
  },

  methods: {
    onMenuSearchClick() {
      const queryParams = {
        portalId: this.portalId,
        applicationId: this.applicationId,
      };
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
          this.btnStatus = {
            node: true,
            addFolder: true,
            rename: true,
            save: true,
            cancel: true,
            apply: true,
          };
        } else if (utils.size(this.localdata1) > 0) {
          this.readonlyMenu = false;
          // 버튼 활성화 여부
          // this.btnStatus.cancel = false;
          this.btnStatus.save = false;
          if (this.localdata1[0].workUserId) {
            this.btnStatus.apply = false;
            this.btnStatus.cancel = false;
          } else {
            this.btnStatus.apply = true;
            this.btnStatus.cancel = true;
          }
        } else {
          this.readonlyMenu = false;
        }
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
          this.btnStatus.cancel = true;
          this.btnStatus.save = true;
          this.btnStatus.apply = true;

          this.treedata = [utils.cloneDeep(this.rootTmpl)];

          const wUserId = res.data.workUserName || '';
          // const wUserName = res.data.workUserId || '';
          const wUserName = res.data.knoxId || '';

          const msg = utils.strFormat(this.$t('MSG_ALT_PRGS_EDIT'), wUserId, wUserName) + '\n' +
            this.$t('MSG_ALT_PRGS_EDIT_DEL');
          utils.messageBox('confirm', null, msg,
            (/* ok */) => {
              // 작업 중인 내용을 삭제하고 편집가능 하도록
              this.rewriteMenu(portalId, appId);
            },
            (/* cancel */) => {
              // 조회만 가능하도록
              callbackFnc(portalId, appId, true); // readonly
            });
          //return false;
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
          // id: utils.trim(item.menuUid),
          // parentId: utils.trim(item.parentId),
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
          linkUid: item.linkUid,
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
            pageId: '00000', // DB2 FIX
            order: this.editingItem.order,
            arrayalOrder: this.editingItem.arrayalOrder,
            menuLevel: this.editingItem.menuLevel + 1,
            defaultYn: 'N',
            menuName: newFolderName,
            menuMultiLanguageId: newMultiLangId,
          };

          this.editingItem.addChild(tmpObj);

          this.btnStatus.cancel = false;
          this.btnStatus.save = false;
        }).catch(error => {
          console.log(error);
        });
      }
    },
    onRenameClick() {
      if (this.editingItem.menuUid === undefined) {
        utils.messageBox('warning', this.$t('MSG_ALT_RENAME_SEL'));
        return false;
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
          const newName = ret[0].multiLanguageContent;
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
                // 적용 버튼 비활성화
                this.btnStatus.cancel = true;
                this.btnStatus.apply = true;
              }).catch(error => {
                console.log(error);
              });
            } else {
              utils.messageBox('warning', this.$t('MSG_ALT_NO_APPLY_MENU_DATA'));
              // 적용 버튼 비활성화
              this.btnStatus.cancel = true;
              this.btnStatus.apply = true;
              return false;
            }
          }).catch(error => {
            console.log(error);
          });
        },
        (/* cancel */) => {});
    },
    onSaveClick() {
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
          linkUid: item.linkUid,
          dashBoardId: item.dashboardId !== null && item.dashboardId !== undefined ? item.dashboardId : item.dashBoardId,
        });
      });

      http.request(this.contextPageId, 'DTS_CMP_00135', {
        path: {
          'portal-id': this.portalId,
          'application-id': this.applicationId,
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
                'portal-id': this.portalId,
                'application-id': this.applicationId,
              },
              data: dataParams,
            }).then(res => {
              if (res.data.resultCode === '1') {
                utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
                this.btnStatus.save = false;
                this.btnStatus.apply = false;
                this.btnStatus.cancel = false;
              } else {
                utils.messageBox('error', this.$t('MSG_ALT_PRGS_EDIT_USR'));
                this.btnStatus.save = true;
                this.btnStatus.apply = true;
                this.btnStatus.apply = true;
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
                // cancel, save 비활성화
                this.btnStatus.cancel = true;
                this.btnStatus.save = true;
              }).catch(error => {
                console.log(error);
              });
            } else {
              utils.messageBox('warning', this.$t('MSG_ALT_NO_CANCEL_MENU_DATA'));
              // return false;
              this.onMenuSearchClick();
              // cancel, save 비활성화
              this.btnStatus.cancel = true;
              this.btnStatus.save = true;
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
      if (!this.readonlyMenu) {
        // button disabled status
        this.btnStatus.node = item.menuUid === '';
        this.btnStatus.rename = item.menuUid === '';
        this.btnStatus.addFolder = item.folderYn !== 'Y';

        if ((this.deviceType & 2) > 0) {
          if (item.menuLevel < 0 && item.folderYn === 'Y') {
            this.btnStatus.addFolder = false;
          } else {
            this.btnStatus.addFolder = true;
          }
        }
      }
      this.editingNode = node;
      this.editingItem = node.model;
    },
    itemDropBefore(node, item, draggedItem, e) {
      if (this.readonlyMenu) return false;

      this.dragging = false;

      if (!draggedItem) {
        // this.$refs.pageDrag._sortable._onDrop(); // 강제로 draggable dragEnd 이벤트 호출

        // this._insertMenu(node, item);
        eventBus.$emit('uncheckAllPages');
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
      }
    },
    onSendRight() {
      if (this.editingItem.menuUid === undefined) {
        utils.messageBox('warning', this.$t('MSG_ALT_MOVE_ITEM_POS_SEL'));
        return false;
      } else {
        this.buff = utils.filter(this.localdata0, { check: true });

        this._insertMenu(this.editingNode, this.editingItem);

        const menuType = this.buff[0].menuTypeCode;
        if(menuType === 'P') {
          eventBus.$emit('uncheckAllPages');
        } else {
          eventBus.$emit('uncheckAllLinks');
        }
        this.buff = [];
      }
    },
    onSendLeft() {
      this.onRemoveNodeClick();
    },
    _insertMenu(targetNode, targetItem) {
      const objs = this.buff;

      utils.forEach(objs, obj => {
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
          // cancel, save 활성화
          this.btnStatus.cancel = false;
          this.btnStatus.save = false;
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
        linkUid: obj.linkUid,
        linkUrl: obj.linkUrl,
        dashboardId: obj.dashboardId,
        menuTypeCode: obj.menuTypeCode,
        order: 0,
        arrayalOrder: 0,
        menuLevel: item.folderYn === 'Y' ? item.menuLevel + 1 : item.menuLevel,
        defaultYn: 'N',
        menuName: obj.menuTypeCode === 'P' ? obj.pageName : obj.menuTypeCode === 'L' ? obj.linkName : obj.dashboardName,
        // multiLanguageId: obj.pageTitleMessageResourceId,
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
      const page = 'PGE_CMP_00011_P02';
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].component;
    },
    itemChecked(data) {
      this.localdata0 = [];
      this.localdata0 = data;
    },
  },
};
</script>
<style scoped>
  .menutree {
    height: 674px;
    overflow: auto;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
</style>
