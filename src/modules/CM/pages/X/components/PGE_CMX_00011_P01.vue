<template>
<div>
  <div class="comm_popup_wrap_small">
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
            <th class="col-xs-48">{{ $t('MSG_TXT_CATG_ID') }}</th>
            <th class="col-xs-52">{{ $t('MSG_TXT_CATG_NM') }}</th>
          </tr>
        </thead>
        <tbody>
          <draggable
              v-model="mobileAppCategoryList"
              :disabled="!enabled"
              ghost-class="ghost"
              @start="onDragStart"
              @end="onDragEnd">
            <tr v-for="(item, index) in mobileAppCategoryList" :key="item.mobileApplicationCategoryId" @click="selIndex = index">
              <td class="col-xs-50" :class="{ orderselect: selIndex === index }">{{ item.mobileApplicationCategoryId }}</td>
              <td class="col-xs-50" :class="{ orderselect: selIndex === index }">{{ item.mobileApplicationCategoryName }}</td>
            </tr>
          </draggable>
        </tbody>
      </table>
    </div>
    <div class="comm_btn_wrap mrL30">
     <sui-button type="button" class="comm_btn_border" @click="onCancelClick">{{ $t('MSG_BTN_CANCEL') }}</sui-button>
     <sui-button
         v-permission:update="contextPageId"
         type="button"
         class="comm_btn_solid"
         @click="onSaveClick">{{ $t('MSG_BTN_SAVE') }}</sui-button>
    </div>
  </div>
 </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import draggable from 'vuedraggable';

export default {
  name: 'PGE_CMX_00011_P01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  components: {
    draggable,
  },
  props: {    
  },
  data() {
    return {
      enabled: true,
      dragging: false,
      mobileAppCategoryList: [],
      selIndex: -1,
    };
  },
  computed: {
    totalCnt() {
      return utils.strFormat(this.$t('MSG_TXT_LST_CNT'), utils.size(this.mobileAppCategoryList)); 
    },
  },
  watch: {},
  mounted() {
    const queryParams = {
      useYn: 'Y',
      deleteYn: 'N'
    };
      http.request(this.contextPageId, 'DTS_CMX_00003', {
        query: queryParams,
    }).then(res => {
      this.mobileAppCategoryList = res.data;

      utils.forEach(this.mobileAppCategoryList, item => {
        item.class = '';
      });
    }).catch(error => {
      console.log(error);
    });
  },
  methods: {
    onDragStart() {
      this.dragging = true;
    },
    onDragEnd(e) {
      this.dragging = false;
      this.selIndex = e.newIndex;
    },
    reOrdering() {
      utils.forEach(this.mobileAppCategoryList, (item, index) => {
        item.arrayalOrder = index;
      });
    },
    onCancelClick() {
      this.$emit('app-reorder-cancel');
    },
    onSaveClick() {
      this.reOrdering();
      const dataParams = this.mobileAppCategoryList;
      utils.messageBox('confirm', this.$t('MSG_ALT_IS_SAV_DATA'), null,
        (/* ok */) => {
            http.request(this.contextPageId, 'DTS_CMX_00011', {
            data: dataParams,
          }).then(() => {
            this.$emit('app-reorder-save');
          });
        },
        (/* cancel */) => {});
    },
    onMoveTop() {
      if (this.selIndex > 0 && this.selIndex < this.mobileAppCategoryList.length) {
        const tmp = this.mobileAppCategoryList.splice(this.selIndex, 1)[0];
        this.mobileAppCategoryList.unshift(tmp);
        this.selIndex = 0;
      }
    },
    onMoveUp() {
      if (this.selIndex > 0 && this.selIndex < this.mobileAppCategoryList.length) {
        const newIndex = this.selIndex - 1;
        const tmp = this.mobileAppCategoryList.splice(this.selIndex, 1)[0];
        this.mobileAppCategoryList.splice(newIndex, 0, tmp);
        this.selIndex = newIndex;
      }
    },
    onMoveDown() {
      if (this.selIndex > -1 && this.selIndex < this.mobileAppCategoryList.length - 1) {
        const newIndex = this.selIndex < this.mobileAppCategoryList.length - 1 ? this.selIndex + 1 : this.mobileAppCategoryList.length - 1;
        const tmp = this.mobileAppCategoryList.splice(this.selIndex, 1)[0];
        this.mobileAppCategoryList.splice(newIndex, 0, tmp);
        this.selIndex = newIndex;
      }
    },
    onMoveBottom() {
      if (this.selIndex > -1 && this.selIndex < this.mobileAppCategoryList.length) {
        const tmp = this.mobileAppCategoryList.splice(this.selIndex, 1)[0];
        this.mobileAppCategoryList.push(tmp);
        this.selIndex = this.mobileAppCategoryList.length - 1;
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
