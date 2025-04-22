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
            <th class="col-xs-48">{{ $t('MSG_TXT_APPLICATION_ID') }}</th>
            <th class="col-xs-52">{{ $t('MSG_TXT_APPLICATION_NM') }}</th>
          </tr>
        </thead>
        <tbody>
          <draggable
              v-model="appList"
              :disabled="!enabled"
              ghost-class="ghost"
              @start="onDragStart"
              @end="onDragEnd">
            <tr v-for="(item, index) in appList" :key="item.applicationId" @click="selIndex = index">
              <td class="col-xs-50" :class="{ orderselect: selIndex === index }">{{ item.applicationId }}</td>
              <td class="col-xs-50" :class="{ orderselect: selIndex === index }">{{ item.applicationName }}</td>
            </tr>
          </draggable>
        </tbody>
      </table>
    </div>
    <div class="comm_btn_wrap mrL30">
     <sui-button type="button" class="comm_btn_border" @click="onCancelClick">{{ $t('MSG_BTN_CANCEL') }}</sui-button>
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
  name: 'PGE_CMP_00011_P01', // eslint-disable-line vue/name-property-casing
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
  },
  data() {
    return {
      enabled: true,
      dragging: false,
      appList: [],
      selIndex: -1,
    };
  },
  computed: {
    totalCnt() {
      return utils.strFormat(this.$t('MSG_TXT_LST_CNT'), utils.size(this.appList)); // 총 {0}개
    },
  },
  watch: {},
  mounted() {
    const queryParams = {
      portalId: this.portalId,
    };
    http.request(this.pageId, 'DTS_CMP_00005', {
      query: queryParams,
    }).then(res => {
      this.appList = res.data;

      utils.forEach(this.appList, item => {
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
      utils.forEach(this.appList, (item, index) => {
        item.arrayOrder = index;
      });
    },
    onCancelClick() {
      this.$emit('app-reorder-cancel');
    },
    onSaveClick() {
      this.reOrdering();
      const dataParams = this.appList;
      utils.messageBox('confirm', this.$t('MSG_ALT_IS_SAV_DATA'), null,
        (/* ok */) => {
          http.request(this.pageId, 'DTS_CMP_00011', {
            data: dataParams,
          }).then(() => {
            this.$emit('app-reorder-save');
          });
        },
        (/* cancel */) => {});
    },
    onMoveTop() {
      if (this.selIndex > 0 && this.selIndex < this.appList.length) {
        const tmp = this.appList.splice(this.selIndex, 1)[0];
        this.appList.unshift(tmp);
        this.selIndex = 0;
      }
    },
    onMoveUp() {
      if (this.selIndex > 0 && this.selIndex < this.appList.length) {
        const newIndex = this.selIndex - 1;
        const tmp = this.appList.splice(this.selIndex, 1)[0];
        this.appList.splice(newIndex, 0, tmp);
        this.selIndex = newIndex;
      }
    },
    onMoveDown() {
      if (this.selIndex > -1 && this.selIndex < this.appList.length - 1) {
        const newIndex = this.selIndex < this.appList.length - 1 ? this.selIndex + 1 : this.appList.length - 1;
        const tmp = this.appList.splice(this.selIndex, 1)[0];
        this.appList.splice(newIndex, 0, tmp);
        this.selIndex = newIndex;
      }
    },
    onMoveBottom() {
      if (this.selIndex > -1 && this.selIndex < this.appList.length) {
        const tmp = this.appList.splice(this.selIndex, 1)[0];
        this.appList.push(tmp);
        this.selIndex = this.appList.length - 1;
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
