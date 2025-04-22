<template>
  <div>
    <div class="comm_popup_wrap_large">
      <div class="mrB10"/>
      <div class="comm_shut_wrap">
        <div class="inbox" style="flex:2;">
          <div class="comm_tree_wrap">
            <ur-tree
              v-model="treeData.data"
              hideAdd
              @select-node="onSelected"
            />
          </div>
        </div>
        <div class="emptybox"/>
        <div class="inbox" style="flex:3;">
          <div class="comm_view_wrap">
            <div class="row">
              <div class="col-xs-2">
                <sui-input-label :label="$t('MSG_TXT_UPP_DOM_CLS')"/>
              </div>
              <div class="col-xs-10">
                <div class="comm_label">{{this.upperDomainClassId}}</div>
                <div class="comp_spacing"/>
                <div class="comm_label">{{this.upperDomainClassName}}</div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-2">
                <sui-input-label :label="$t('MSG_TXT_DOM_CLSF_NM')"/>
              </div>
              <div class="col-xs-10">
                <div class="comm_label">{{this.domainClassName}}</div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-2">
                <sui-input-label :label="$t('MSG_TXT_DOM_CLSF_ID')"/>
              </div>
              <div class="col-xs-10">
                <div class="comm_label">{{this.domainClassId}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button type="button" class="comm_btn_border" @click="onCancel">{{$t('MSG_BTN_CANCEL')}}</sui-button>
      <sui-button type="button" class="comm_btn_solid" @click="onClickSelectWord" v-permission:read="'PGE_DST_00007'">{{$t('MSG_BTN_SELT')}}</sui-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PGE_DST_00007_P02', // eslint-disable-line vue/name-property-casing
  props: {
    pageId: {
      type: String,
      default: 'PGE_DST_00007'
    },
    biddingInformationParam: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      upperDomainClassId: '',
      upperDomainClassName: '',
      domainClassEnglishName: '',
      domainClassName: '',
      domainClassId: '',
      wordId: '',
      selectedWord: '',
      isOpen: false,
      clickedReadNode: {},
      codeEnable: false,
      showRetrievePopup: true,
      treeData: {
        data: [],
      },
    };
  },
  computed: {
    dataFolder() {
      return this.item.children &&
        this.item.children.length
    },
  },
  watch: {},
  mounted() {
    const queryParams = {domainClassificationLevel: '1'};       
    http.request(this.pageId, 'DTS_DST_00048',{
      query: queryParams,
    }).then(res => {
      this.setTreeData(res.data);
      //this.response= response.data.domainClassificationID;
    })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    setTreeData(data) {
      const rootNode = {
        id: 'root',
        parentId: null,
        level: 0,
        folderYn: 'Y',
        value: this.$t('MSG_TXT_ITGR_CLSF'),
        text: this.$t('MSG_TXT_ITGR_CLSF'),
        opened: true,
        contents: {},
        treeInfo: {
          name: 'Integrated Category',
          depth: 0,
          searched: false,
          selected: false,
          checked: false,
          hasChild: true,
          expanded: true,
          inlineEdit: false,
          draggable: false,
        },
        children: [],
      };
      rootNode.children = utils.getMakeUrTreeData({
        id: 'domainClassificationID',
        parentId: 'upperDomainClassificationID',
        level: 'hierarchyLevel',
        value: 'domainClassificationName ',
        text: '{{domainClassificationName}} ({{domainClassificationID}})',
        wrdId: 'wordId',
      }, data, true);
      this.treeData = { data: [rootNode] };
    },
    onClickSelectWord() {
      console.log('TEST ' + this.selectedWord.domainClassificationName) ;
      console.log('TEST ' + this.selectedWord.domainClassificationID) ;
      this.$emit('upDomClsf',this.selectedWord);
      this.onPopupUpDomCancelClicked()
    },
    onSelected(node) {
      this.setTreeData.data = node;
      this.onItem(this.setTreeData);
    },
    onItem(e) {
      this.selectedWord = e.data;
      if (e.data.domainClassificationLevel > 1 ) {
        this.domainClassEnglishName = e.data.domainClassificationEnglishName;
        this.upperDomainClassId = e.data.upperDomainClassificationID;
        this.upperDomainClassName = e.data.upperDomainClassificationName;
        this.domainClassName = e.data.domainClassificationName;
        this.domainClassId = e.data.domainClassificationID;
        this.domainClassLevel = e.data.domainClassificationLevel;
        this.wordId = e.data.wrdId;
      }
      else if (e.data.domainClassificationLevel == 0 || e.data.domainClassificationLevel == undefined) {
        console.log('test 1111'  + e.data.domainClassificationLevel);
        this.domainClassEnglishName = '';
        this.upperDomainClassId = 0;
        this.upperDomainClassName = ''; 
        this.domainClassName = this.$t('MSG_TXT_ITGR_CLSF');
        this.domainClassId = 0;
        this.domainClassLevel = e.data.domainClassificationLevel;
        this.wordId = '';

        this.selectedWord.domainClassificationName = this.domainClassName ; 
        this.selectedWord.domainClassificationID = this.domainClassId ; 
      }
      else {
        console.log('test '  + e.data.domainClassificationLevel);
        this.domainClassEnglishName = this.$t('MSG_TXT_ITGR_CLSF');
        this.upperDomainClassId = 0;
        this.upperDomainClassName = this.$t('MSG_TXT_ITGR_CLSF');
        this.domainClassName = e.data.domainClassificationName;
        this.domainClassId = e.data.domainClassificationID;
        this.domainClassLevel = e.data.domainClassificationLevel;
        this.wordId = e.data.wrdId;
      }
    },
    onPopupUpDomCancelClicked() {
      this.$emit('exit',true);
    },
    onCancel() {
      this.onPopupUpDomCancelClicked();
    },
    onPopupSaveClicked() {
      console.log('data  saved');
    },
  },
};
</script>
<style scoped>
</style>
