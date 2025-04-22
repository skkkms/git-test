<template>
<div>
  <div class="comm_popup_wrap_medium">
     <div class="comm_scr_wrap">
       <div class="row">
         <div class="col-xs-1">
           <sui-input-label :label="$t('MSG_TXT_PORTL')" :vertical="false" :required="true" />
         </div>
         <div class="col-xs-4">
           <sui-custom-select ref="selPortals"
                          :selected="fromPsYn?psInitPortal:frame3.frm.portalId"
                          :option-list="selectPortalList"
                          :defaultOption="'select'"
                          @list-clicked="onPortalSelectClick"
                          :disabled="fromPsYn"
           />
         </div>
         <div class="col-xs-2">
           <sui-input-label :label="$t('MSG_TXT_APPLICATION')" :vertical="false" :required="true" />
         </div>
         <div class="col-xs-5">
           <sui-custom-select ref="selApps"
                          :selected="fromPsYn?selectedApp:frame3.frm.applicationId"
                          :option-list="selectAppList"
                          :defaultOption="'select'"
                          :disabled="fromPsYn"
           />
         </div>
         <!-- <div class="btn_wrap">
           <sui-button type="button" class="comm_btn_Reset">초기화</sui-button>
           <sui-button
               v-permission:read="pageId"
               type="button"
               class="comm_btn_Scr"
               @click="onSearchClick">{{ $t('MSG_BTN_SEARCH') }}</sui-button>
         </div> -->
       </div>
     </div>
   <div class="mrB20"></div>
    <div class="comm_gridTop_wrap">
      <div class="btn_wrapL">
        <div class="totalList">{{ totalCnt }}</div>
        <div class="comm_line_div"/>
          <sui-button type="button" class="comm_btn_sort_top" @click="onMoveTop">Top</sui-button>
          <sui-button type="button" class="comm_btn_sort_up" @click="onMoveUp">Up</sui-button>
          <sui-button type="button" class="comm_btn_sort_down" @click="onMoveDown">Down</sui-button>
          <sui-button type="button" class="comm_btn_sort_bottom" @click="onMoveBottom">Bottom</sui-button>
      </div>
    </div>

    <div class="container">
      <table class="table table-fixed">
        <thead>
          <tr>
            <th class="col-xs-100">{{ $t('MSG_TXT_QLINK_NM') }}</th>
          </tr>
        </thead>
        <tbody>
          <draggable
              v-model="qLinkList"
              :disabled="!enabled"
              ghost-class="ghost"
              @start="onDragStart"
              @end="onDragEnd">
            <tr v-for="(item, index) in qLinkList" :key="item.quickLinkUid" @click="selIndex = index">
              <td class="col-xs-100" :class="{ orderselect: selIndex === index }">{{ item.quickLinkName }}</td>
            </tr>
          </draggable>
        </tbody>
      </table>
    </div>
    <div class="comm_btn_wrap mrL30">
     <sui-button
         type="button"
         class="comm_btn_border"
         @click="onCancelClick">{{ $t('MSG_BTN_CANCEL') }}</sui-button>
     <sui-button
         v-permission:update="pageId"
         type="button"
         class="comm_btn_solid"
         @click="onSaveClick">{{ $t('MSG_BTN_SAVE') }}</sui-button>
    </div>
  </div>
 </div>
</template>
<script>
import draggable from 'vuedraggable';

export default {
  name: 'PGE_CMP_00015_P01', // eslint-disable-line vue/name-property-casing
  components: {
    draggable,
  },
  props: {
    pageId: {
      type: String,
      required: true,
      default() {
        return '';
      },
    },
    portalId: {
      type: String,
      required: true,
      default() {
        return '';
      },
    },
    psInitPortal: {
      type: Object,
      default() {
        return {};
      }
    },
    fromPsYn: {
      type: Boolean,
      default: false,      
    },
    selectedApp: {
      type: Object,
      default() {
        return {};
      }
    },            
    selectPortalList: {
      type: Array,
      default() {
        return [];
      }
    },
    selectAppList: {
      type: Array,
      default() {
        return [];
      }
    },        
  },
  data() {
    return {
      enabled: true,
      dragging: false,
      selIndex: -1,
      qLinkList: [],
      disableSelectApps: true,
      frame3: {
        frm: {
          portalId: { key: '', label: '' },
          portalName: '',
          applicationId: { key: '', label: '' },
          applicationName: '',
          arrayalOrder: '',
          quickLinkEnglishUrl: '',
          quickLinkMultiLanguageId: '',
          quickLinkMultiLanguageName: '',
          quickLinkName: '',
          quickLinkUid: '',
          quickLinkUrl: '',
          //
          // finalModificationDTM: '',
          // finalModificationUserId: '',
          // firstRegistrationDTM: '',
          // firstRegistrationUserId: '',
          //
          // r_dsplLngId: '',
          // r_knoxId: '',
          // r_userName: '',
          // r_userGlobalName: '',
          // r_departmentName: '',
          // r_departmentEnglishName: '',
          // m_dsplLngId: '',
          // m_knoxId: '',
          // m_userName: '',
          // m_userGlobalName: '',
          // m_departmentName: '',
          // m_departmentEnglishName: '',
        },
        selectPortalList: [],
        selectAppList: [],
      },
    };
  },
  computed: {
    totalCnt() {
      return utils.strFormat(this.$t('MSG_TXT_LST_CNT'), utils.size(this.frame3.qLinkList)); // 총 {0}개
    },
  },
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.onSearchClick();
    });    
  },
  methods: {
    getPortalList() {
      return new Promise((resolve, reject) => {
        http.request(this.pageId, 'DTS_CMP_00004')
          .then(res => {
            utils.forEach(res.data, obj => {
              this.frame3.selectPortalList.push({
                key: obj.portalId,
                label: obj.portalName,
              });
            });
            resolve();
          }).catch(error => {
            console.log(error);
            reject(error);
          });
      });
    },
    getApplicationList(vPortal) {
      // Application list
      return new Promise((resolve, reject) => {
        http.request(this.pageId, 'DTS_CMP_00005', {
          query: {
            portalId: utils.trim(vPortal.key),
            deviceTypeValue: this.$store.getters.userInfo.deviceTypeBit,
          },
        }).then(res => {
          this.frame3.selectAppList.splice(0);
          utils.forEach(res.data, obj => {
            this.frame3.selectAppList.push({
              key: obj.applicationId,
              label: obj.applicationName,
            });
          });
          this.$refs.selApps.reset();
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        });
      });

    },
    onPortalSelectClick() {
      this.getApplicationList(this.frame3.frm.portalId);
      this.disableSelectApps = utils.trim(this.frame3.frm.portalId.key) === '';
    },
    // onLoadPortalSelect(portalId) {
    //   this.getApplicationList(portalId.key);
    // },
    onSearchClick() {
      if(this.fromPsYn){
          this.frame3.frm.portalId=this.psInitPortal;
          this.frame3.frm.applicationId=this.selectedApp;
        }
      const searchValue = this.frame3.frm;
      const queryParams = {
        portalId: utils.trim(searchValue.portalId.key) || '',
        applicationId: utils.trim(searchValue.applicationId.key) || '',
      };

      // form validataion
      if (!this.formValidate(queryParams)) return false;

      http.request(this.pageId, 'DTS_CMP_00045', {
        query: queryParams,
      }).then(res => {
        this.qLinkList = res.data;
        // utils.forEach(this.frame3.qLinkList, item => {
        //   item.class = '';
        // });
      }).catch(error => {
        console.log(error);
      });
    },
    formValidate(formData) {
      if (!utils.trim(formData.portalId)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PORTL'));
        utils.messageBox('warning', msg);

        return false;
      }
      if (!utils.trim(formData.applicationId)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_APPLICATION'));
        utils.messageBox('warning', msg);

        return false;
      }
      return true;
    },
    onDragStart() {
      this.dragging = true;
    },
    onDragEnd(e) {
      this.dragging = false;
      this.selIndex = e.newIndex;
    },
    reOrdering() {
      utils.forEach(this.qLinkList, (qitem, index) => {
        qitem.arrayalOrder = index;
      });
    },
    onCancelClick() {
      this.$emit('reorder-cancel');
    },
    onSaveClick() {
      this.reOrdering();
      const dataParams = this.qLinkList;
      utils.messageBox('confirm', this.$t('MSG_ALT_IS_SAV_DATA'), null,
        (/* ok */) => {
          http.request(this.pageId, 'DTS_CMP_00049', {
            data: dataParams,
          }).then(() => {
            this.$emit('reorder-save');
          });
        },
        (/* cancel */) => {});
    },
    onMoveTop() {
      if (this.selIndex > 0 && this.selIndex < this.qLinkList.length) {
        const tmp = this.qLinkList.splice(this.selIndex, 1)[0];
        this.qLinkList.unshift(tmp);
        this.selIndex = 0;
      }
    },
    onMoveUp() {
      if (this.selIndex > 0 && this.selIndex < this.qLinkList.length) {
        const newIndex = this.selIndex - 1;
        const tmp = this.qLinkList.splice(this.selIndex, 1)[0];
        this.qLinkList.splice(newIndex, 0, tmp);
        this.selIndex = newIndex;
      }
    },
    onMoveDown() {
      if (this.selIndex > -1 && this.selIndex < this.qLinkList.length - 1) {
        const newIndex = this.selIndex < this.qLinkList.length - 1 ? this.selIndex + 1 : this.qLinkList.length - 1;
        const tmp = this.qLinkList.splice(this.selIndex, 1)[0];
        this.qLinkList.splice(newIndex, 0, tmp);
        this.selIndex = newIndex;
      }
    },
    onMoveBottom() {
      if (this.selIndex > -1 && this.selIndex < this.qLinkList.length) {
        const tmp = this.qLinkList.splice(this.selIndex, 1)[0];
        this.qLinkList.push(tmp);
        this.selIndex = this.qLinkList.length - 1;
      }
    },
  },
};
</script>

<style scoped>
  .orderselect {
    background-color: #e9ecf7;
  }
</style>
