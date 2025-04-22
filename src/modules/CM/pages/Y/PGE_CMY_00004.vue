<template>
  <sui-page>
    <sui-page-header :title="pageTitle" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DEPT_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-6">
            <sui-text-field
              v-model="frame0.deptNmSearchText"
              maxlength="100"
              class="width100"
              @keyup.enter="onSearchClick"
              @keyup="onKeyUpInput"
            />
          </div>
          <div class="btn_wrap">
            <sui-button
              v-permission:read="'PGE_CMY_00004'"
              type="button"
              class="comm_btn_Scr"
              @click="onSearchClick"
            >
              {{ $t("MSG_BTN_SEARCH") }}
            </sui-button>
          </div>
        </div>
      </div>
      <div class="mrB30" />
      <ur-tree
        ref="deptTree"
        v-model="filteredTreeData.data"
        hideAdd
        class="brdG01 pd20"
        style="height:450px; overflow:auto; width: 100%;"
        :editable="false"
      />
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onCancelClick"
        >
          {{ this.$t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onSelectClick"
        >
          {{ this.$t('MSG_BTN_SELT') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'PGE_CMY_00004', // eslint-disable-line vue/name-property-casing
  props: {
    closePagePopup: {
      type: Function,
      default: null,
    },
    pageInitialData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageTitle: this.$t('MSG_TIT_DEPT_SRCH'),
      treeData: {
        data: [],
      },
      filteredTreeData: {
        data: [],
      },
      frame0: {
        deptNmSearchText: '',
      },
      searchFieldOldText: '',
    };
  },

  computed: {
  },

  mounted() {
    this.onSearchClick();
  },

  methods: {
    onSearchClick() {
      http.request(this.$options.name, 'DTS_CMY_00096', {
      }).then(res => {
        this.setTreeData(res.data);
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
            depth: item[keyMap.level] - 1 || 'depth',
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
    getfilteredTreeData() {
      const origin = _.cloneDeep(this.treeData.data);
      if (this.frame0.deptNmSearchText === '') this.treeData.data = origin;
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

      const fValue = origin.filter(node => containKey(node, this.frame0.deptNmSearchText));

      this.filteredTreeData.data = fValue;
    },
    setTreeData(data) {
      const rootNode = this.getMakeUrTreeData({
        id: 'departmentId',
        parentId: 'upDepartmentId',
        level: 'departmentLevel',
        value: 'departmentName',
        text: '{{departmentName}}',
      }, data, true);
      this.treeData = { data: rootNode };
      this.getfilteredTreeData();
    },
    onCancelClick() {
      this.closePagePopup('');
    },
    onSelectClick() {
      const selectionList = this.$refs.deptTree.getSelected();

      if (selectionList) {
        const selectedDept = {
          id: selectionList.selectedNode.departmentId,
          value: selectionList.selectedNode.departmentName,
          enValue: selectionList.selectedNode.departmentEnglishName,
        };
        this.closePagePopup(selectedDept);
      } else {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    onKeyUpInput() {
      const searchFieldNewText = this.frame0.deptNmSearchText;
      this.getfilteredTreeData();
      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          this.conFirm('error', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
          this.frame0.deptNmSearchText = this.searchFieldOldText;
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
