/* eslint-disable guard-for-in */
<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <!-- <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DEPT_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model="frame0.deptNmSearchText"
              maxlength="20"
              class="width100"
              @keyup.enter="onSearchClick"
              @keyup="onKeyUpInput"
            />
          </div>
          <div class="btn_wrap">
            <sui-button
              type="button"
              class="comm_btn_Reset"
              @click="onResetClick"
            >
              {{ $t("MSG_BTN_RESET") }}
            </sui-button>
            <sui-button
              v-permission:read="'PGE_CMY_00051'"
              type="button"
              class="comm_btn_Scr"
              @click="onSearchClick"
            >
              {{ $t("MSG_BTN_SEARCH") }}
            </sui-button>
          </div>
        </div>
      </div> -->
      <div class="mrB30" />
      <div class="comm_title_wrap">
        <h4>{{ $t("MSG_TXT_DEPT_LIST") }}</h4>
      </div>
      <div class="comm_shut_wrap">
        <div class="inbox">
          <div class="comm_gridTop_wrap">
            <!-- <div class="btn_wrapL">
              <sui-button
                type="button"
                :class="expandAll ? 'comm_btn_treeOpen' : 'comm_btn_treeClose'"
                @click="onTreeGridCollapseToggle"
              />
            </div> -->
            <div class="btn_wrapR">
              <sui-button
                v-permission:delete="this.$options.name"
                type="button"
                class="comm_btn_gridTop"
                @click="onDelDept"
              >
                {{ $t("MSG_BTN_DEL") }}
              </sui-button>
              <sui-button
                v-permission:create="'PGE_CMY_00051'"
                type="button"
                class="comm_btn_gridTop"
                @click="onNewDept"
              >
                {{ $t("MSG_BTN_ADD_NEW") }}
              </sui-button>
              <sui-button
                v-permission:create="'PGE_CMY_00051'"
                type="button"
                class="comm_btn_gridTop"
                @click="onNew1stDept"
              >
                {{ $t("MSG_TXT_ADD_1ST_LV") }}
              </sui-button>               
            </div>
          </div>
          <ur-tree
            ref="deptTree"
            v-model="fTreeData.data"
            class="brdG01 pd20"
            style="height:450px; overflow:auto; width: 100%;"
            :editable="false"
            hideAdd
            filter
            @select-node="onItemClick"
          />
        </div>
        <div class="btnbox" />
        <div class="inbox">
          <sui-page-tab-box-type
            ref="tab"
            :tabItems="tabItems"
            :defaultTabIndex="defaultTabIndex"
            :setCurrentTabComponent="setCurrentTabComponent"
            @change-tab-idx="onChangeTabIdx"
          >
            <container
              :is="currentTabComponent"
              :pageId="this.$options.name"
              :selectedTreeData="selectedTreeData"
              :multiLanguageId="multiLanguageId"
              @onSearchClick="onTabSearch"
              @page-deactivate="handleChildDeactivated"
              @page-activate="handleChildActivated"
            />
          </sui-page-tab-box-type>
        </div>
      </div>
      <sui-popup
        v-model="isShownPopupNew"
        :title="$t('MSG_TIT_DEPT_RGST')"
      >
        <p01
          :departmentId="frame0.departmentId"
          :departmentLevel="frame0.departmentLevel"
          @close="popNewClose"
        />
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>
<script>
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';
import t01 from './components/PGE_CMY_00051_T01';
import p01 from './components/PGE_CMY_00051_P01';

export default {
  name: 'PGE_CMY_00051', // eslint-disable-line vue/name-property-casing
  components: {
    t01,
    p01,
  },
  extends: BasePage,
  data() {
    return {
      frame0: {},
      isShownPopupNew: false,
      treeData: {
        data: [],
      },
      fTreeData: {
        data: [],
      },
      selectedTreeData: {},
      defaultTabIndex: 0,
      tabItems: [
        {
          tabTitle: this.$t('MSG_TXT_DTL_CNTN'),
          component: t01,
        },
      ],
      multiLanguageId: '',
      currentTabComponent: t01,
      searchFieldOldText: '',
      deptNmSearchText:'',
      savedId:'',
    };
  },

  computed: {
  },

  mounted() {
    this.onSearchClick();
  },

  methods: {
    filteredTreeData() {
      const origin = _.cloneDeep(this.treeData.data);
      if (this.deptNmSearchText === '') this.treeData.data = origin;
      function containKey(obj, key) {
        let valid = false;
        if (obj.children && obj.children.length > 0) {
          const result = obj.children.filter(node => containKey(node, key));
          if (result.length > 0) {
            valid = true;
            // eslint-disable-next-line no-param-reassign
            obj.children = result;
          }
        }
        if (valid) return true;
        // eslint-disable-next-line no-param-reassign
        obj.children = [];

        return obj.treeInfo.name.includes(key);
      }

      const fValue = origin.filter(node => containKey(node, this.deptNmSearchText));
      this.fTreeData.data = fValue;
    },
    onSearchClick() {
      http.request(this.$options.name, 'DTS_CMY_00009', {
      }).then(res => {
        this.setTreeData(res.data);
      }).then(() => {
        this.selectedTreeData = {};
        if(!utils.isEmpty(this.savedId)){
          this.$refs.deptTree.setSelect(true,this.savedId);
          this.selectedTreeData = this.$refs.deptTree.getSelected().selectedNode;
          this.savedId = '';
        }   
      }).catch(error => {
        console.log(error);
      });
    },
    getMakeUrTreeData(keyMap, data, useTemplate = false) {
      const treeMap = {};
      const rootNode = [];
      let compiled;

      if (useTemplate) {
        _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
        compiled = _.template(keyMap.text);
      }

      _.forEach(data, item => {
        let tmpText = '';

        if (useTemplate) {
          const tmpParam = {};
          const arr = keyMap.text.match(/{{([\s\S]+?)}}/g);
          for (const i in arr) {
            const a = arr[i].replace('{{', '').replace('}}', '');
            tmpParam[a.trim()] = item[a.trim()];
          }
          tmpText = compiled(tmpParam);
        } else {
          tmpText = (item[keyMap.text] || 'text');
        }

        const treeNode = {
          id: item[keyMap.id] || 'id',
          parentId: item[keyMap.parentId] || 'parentId',
          folderYn: item[keyMap.folderYn] || 'folderYn',
          level: item[keyMap.level] || 'level',
          value: item[keyMap.value] || 'value',
          text: tmpText,
          opened: true,
          contents: {},
          treeInfo: {
            name: tmpText,
            depth: item[keyMap.level - 1] || 'depth',
            key: item[keyMap.id] || 'id',
            parentKey: item[keyMap.parentId] || 'parentKey',
            searched: false,
            selected: false,
            checked: false,
            hasChild: false,
            expanded: true,
            inlineEdit: false,
            draggable: false,
          },
          children: [],
        };

        treeMap[treeNode.id] = _.assign(treeNode, item);
      });

      // eslint-disable-next-line no-unused-vars
      utils.forEach(treeMap, (value, _key) => {
        const treeNode = value;
        if (treeMap[treeNode.parentId]) {
          treeMap[treeNode.parentId].children.push(treeNode);
          treeMap[treeNode.parentId].treeInfo.hasChild = true;
        } else {
          rootNode.push(treeNode);
        }
      });

      return rootNode;
    },
    setTreeData(data) {
      const rootNode = this.getMakeUrTreeData({
        id: 'departmentId',
        parentId: 'upDepartmentId',
        level: 'departmentLevel',
        value: 'departmentName',
        text: '{{departmentName}}',
        parentKey: 'upDepartmentId',
      }, data, true);
      this.treeData = { data: rootNode };
      this.fTreeData = { data: rootNode };
      //this.onKeyUpInput();
    },
    getDescendantDepts(node) {
      const thisVue = this;
      const descendants = [];

      if (node != null) {
        if (node.children.length > 0) {
          node.children.forEach(child => {
            descendants.push(child);
            const descendantChildren = thisVue.getDescendantDepts(child);
            descendantChildren.forEach(descendantChild => {
              descendants.push(descendantChild);
            });
          });
        }
      }

      return descendants;
    },
    setCurrentTabComponent(component) {
      this.currentTabComponent = component;
    },
    onChangeTabIdx(idx) {
      this.currentTabComponent = this.tabItems[idx].component;
    },
    onResetClick() {
      this.deptNmSearchText = '';
      //this.onKeyUpInput();
    },
    onItemClick(node) {
      this.selectedTreeData = node;
    },
    treeSearch(node, decendantChildIds) {
      decendantChildIds.push(node.id);
      node.children.forEach(child => {
        if (child.children.length === 0) {
          decendantChildIds.push(child.id);
        } else {
          this.treeSearch(child, decendantChildIds);
        }
      });
    },
    onDelDept() {
      if (Object.keys(this.selectedTreeData).length === 0) {
        // utils.messageBox('warning', this.$t('MSG_ALT_DEL_DATA_SELT'));
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return;
      }

      const deleteDeptIds = [];
      this.treeSearch(this.selectedTreeData, deleteDeptIds);

      utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), null, () => {
        http.request(this.$options.name, 'DTS_CMY_00094', {
          data: deleteDeptIds,
        }).then(() => {
          // debugger;
          utils.messageBox('success', this.$t('MSG_ALT_DEL_DATA'), null, this.onSearchClick);
          this.$refs.deptTree.resetSelect();
        }).catch(error => {
          console.log(error);
        });
      });
    },
    onNewDept() {
      const deptIdLength = Object.keys(this.selectedTreeData).length;
      if (deptIdLength === 0) {
        this.frame0.departmentId = '';
        this.frame0.departmentLevel = '';
      } else if (deptIdLength > 0) {
        this.frame0.departmentId = this.selectedTreeData.departmentId;
        this.frame0.departmentLevel = utils.toCharNum(this.selectedTreeData.departmentLevel);
      }

      this.isShownPopupNew = !this.isShownPopupNew;
    },
    onNew1stDept(){
      this.frame0.departmentId = '';
      this.frame0.departmentLevel = '';
      this.isShownPopupNew = !this.isShownPopupNew;
    },
    onTabSearch(selectedDeptId) {
      this.savedId = selectedDeptId;
      this.onSearchClick(selectedDeptId);
    },
    popNewClose(newDeptId) {
      this.isShownPopupNew = !this.isShownPopupNew;
      this.onSearchClick(newDeptId);
    },
    onKeyUpInput() {
      const searchFieldNewText = this.deptNmSearchText;
      this.filteredTreeData();
      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          this.conFirm('error', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
          this.deptNmSearchText = this.searchFieldOldText;
        } else {
          this.searchFieldOldText = searchFieldNewText;
        }
      }   
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
  },
};
</script>
<style scoped>
</style>
