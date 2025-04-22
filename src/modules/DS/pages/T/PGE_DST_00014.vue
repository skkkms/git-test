<template>
  <sui-page>
   <sui-page-header :pageId="this.$options.name"/>
    <sui-page-contents>
    <div class="mrR30"></div>

       <div class="inbox brdG01 pd20" style="height:250px;overflow-y:auto">
          <ur-tree
            ref="tree"
            v-model="defaultFdpTreeData.data"
            :noDots="true"
            :wholeRow="true"
            :editable="false"
             style="width: 100%; height:450px; overflow:auto;"
            hideAdd
            @select-node="onItem"
          />
       </div>

      <div class="mrT30"></div>
      <div class="inbox">
       <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_UPP_DOM_CLS')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field max-length="100" v-model="upperDomainClassId" :disabled="true" placeholder=""/>
            <div class="comp_spacing"></div>
            <sui-text-field max-length="100" v-model="upperDomainClassName" :disabled="true" placeholder=""/>
          </div>
       
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DOM_CLSF_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field max-length="100" v-model="domainClassName" :disabled="true" placeholder=""/>
            <div class="comp_spacing"></div>
         </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DOM_CLSF_ID')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field max-length="100" v-model="domainClassId" :disabled="true" placeholder=""/>
            <div class="comp_spacing"></div>
          </div>
        
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DOM_PHSC_NM')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field max-length="100" v-model="domainId" :disabled="true" placeholder=""/>
            <div class="comp_spacing"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DOMAIN_NAME')" :vertical="false" />
          </div>
          <div class="col-xs-5">
            <sui-text-field max-length="100" v-model="domainName" :disabled="true" placeholder=""/>
            <div class="comp_spacing"></div>
          </div>
          <div class="col-xs-1"/>
          <div class="col-xs-5"/>
        </div>
        </div>
       </div>
        <div class="comm_btn_wrap">
		      <sui-button type="button" class="comm_btn_border" @click="onCancel">{{$t('MSG_BTN_CANCEL')}}</sui-button>
		      <sui-button type="button" class="comm_btn_solid"  @click="onClickSelectWord">{{$t('MSG_BTN_SELT')}}</sui-button>
		    </div>
  </sui-page-contents>

</sui-page>
</template>
<script>
 export default {
    name: 'PGE_DST_00014',
    props: {
      closePagePopup: {
        type: Function,
      },
    },
    data() {
       return {
         selectedCodeValue: {
            COD_MDLE: {
              label: '',
              key: ''
          }
        },
        upperDomainClassId : '',
        upperDomainClassName : '',
        domainClassName: '',
        domainClassId: '',
        selectedWord: '',
        domainName: '',
        domainId:'',
        dataStandardId:'',
        dataStandardName: '',
        dataStandardParentId: '',
        domainTreeLevel: '',
      defaultFdpTreeData: {
        data: [],
      },

        localdata0: [
          ['word name', 'word name(EN)', 'word content'],
          ['word name', 'word name(EN)', 'word content'],
          ['word name', 'word name(EN)', 'word content'],
          ['word name', 'word name(EN)', 'word content'],
          ['word name', 'word name(EN)', 'word content']
          ],
        gridColumns0: [{
          text: this.$t('MSG_TXT_WRD_NM'),
          datafield: 'datafield0'
        }, {
          text: this.$t('MSG_TXT_WRD_EN_NM'),
          datafield: 'datafield1'
        }, {
          text: this.$t('MSG_TXT_WRD_DSCR'),
          datafield: 'datafield2'
        }],
      };
    },
    computed: {},
    watch: {},
    mounted() {
      http.request('PGE_DST_00014', 'DTS_DST_00015',{
      }).then((res) => {
        const myTreeData= res.data;
        this.setTreeData(res.data);
        
        this.defaultFdpTreeData.data.forEach(child => {
          child.children.forEach(item_lv1 => {
            item_lv1.opened = false;
          })
        });
      })
      .catch((error) => {
      console.log(error);

      });
    },
    methods: {

      setTreeData(data) {
      const rootNode = this.getMakeUrTreeData({
        id: 'dataStandardId',
        parentId: 'dataStandardParentId',
        level: 'domainTreeLevel',
        value: 'dataStandardName',
        text: '{{dataStandardName}} ({{dataStandardId}})',
        parentKey: 'dataStandardParentId',
      }, data, true);
      this.defaultFdpTreeData = { data: rootNode };
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
          // const arr = keyMap.text.match(/(?<=\{\{)([\s\S]+?)(?=\}\})/gi);
          const arr = keyMap.text.match(/{{([\s\S]+?)}}/g);
          for (const i in arr) {
            const a = arr[i].replace('{{', '').replace('}}', '');
            // tmpParam[arr[i].trim()] = item[arr[i].trim()];
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

      utils.forEach(treeMap, (value, key) => {
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
       onClickSelectWord() {
           this.closePagePopup(this.selectedWord)
           //this.onPopupCancelClicked();
       },

      onCancel(){
        this.closePagePopup(false);
      },
      onPopupCancelClick() {
        this.$emit('exit',true);
      },
      onItem(e) {
          this.selectedWord = e;
          this.upperDomainClassName = e.upperDomainClassificationName;
          this.upperDomainClassId = e.upperDomainClassificationID;
          this.domainClassName = e.domainClassificationName;
          this.domainClassId = e.domainClassificationID;
          this.domainClassLevel = e.domainClassificationLevel;
          this.domainName = e.domainName;
          this.domainId = e.domainId;
          this.dataStandardId = e.dataStandardId;
          this.dataStandardName = e.dataStandardName;
          this.dataStandardParentId = e.dataStandardParentId;
          this.domainTreeLevel = e.domainTreeLevel;
      },
    },

    datasets: [{
      id: 'dataset0',
      type: 'local',
      data: 'localdata0',
      datafields: [ {
        name: 'datafield0',
        type: 'string',
        map: '0'
      }, {
        name: 'datafield1',
        type: 'string',
        map: '1'
      }, {
        name: 'datafield2',
        type: 'string',
        map: '2'
       }]
    }],
  };
</script>
<style scoped>
</style>