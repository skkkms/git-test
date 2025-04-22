<template>
  <div class="portlet_form"  @click="onOpenPage">
    <div class="portlet_tit">
      <div style="display:inline-flex;width:100%">
      <h3 class="tt_tit" :title="todoItem.todoDetailClassificationName">{{ todoItem.todoDetailClassificationName }}</h3>
      <span v-if="todoItem.todoStateCode === 'A'" class="status">{{ $t('MSG_TXT_APRV_ONGI') }}</span>
      </div>
      <span class="sub_txt">{{ todoItem.todoName }}</span>
    </div>
    <div class="portlet_content">
      <div v-if="deadlineDtCheck(todoItem.todoProcessDeadlineDT)" class="progBar_wrap">
        <div :class="checkDelayJob ? 'progBar_legend_ing' : 'progBar_legend_delay'">
          <span class="tit">{{ checkDelayJob ? $t('MSG_TXT_TODO_INPRGS'): $t('MSG_TXT_TODO_DELAY') }}</span>
          <span class="term">
            {{ todoItem.firstRegistrationDTM | dateFormat }} ~ {{ todoItem.todoProcessDeadlineDT | dateFormat }}
          </span>
        </div>
        <div :class="checkDelayJob ? 'progBar_ing' : 'progBar_delay'">
          <span class="fill" :style="{width: jobProcessGraph+'%'}"></span>
        </div>
      </div>
      <div :class="deadlineDtCheck(todoItem.todoProcessDeadlineDT) ? 'list_tb' : 'list_tb2'">
        <table width="100%" border="0">
          <colgroup>
            <col width="100px"/>
            <col width=""/>
          </colgroup>
          <tr v-for="detailTodo in todoItem.detailList" :key="detailTodo.todoUid+detailTodo.todoDetailOrder">
            <th>{{ detailTodo.todoDetailTitle }}</th>
            <td class="text-ellipsis">{{ detailTodo.todoDetailContent }}</td>
          </tr>
       </table>
      </div>
    </div>
    <div class="portlet_bottom">
      <div class="left">
        <sui-button type="button" class="btn_txt_GR_arrow" @click="onOpenPage">{{ $t('MSG_TXT_SHOW_DETAIL') }}</sui-button>
      </div>
      <div class="right">
        <span class="ico_todo">{{ todoItem.todoClassificationName }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default { // todo's 카드형
  name: 'PGE_CMZ_00050', // eslint-disable-line vue/name-property-casing
  props: {
    pageItem: {
      type: Object,
      default: () => {},
    },
  },
  filters: {
    dateFormat(date) {
      return date ? utils.toStringByFormat(date, 'YYYY-MM-DD') : '';
    },
  },
  data() {
    return {
      todoItem: {},
      popupWindow: null,
    };
  },
  computed: {
    checkDelayJob() {
      return utils.getDayOffset(this.todoItem.todoProcessDeadlineDT, utils.now()) > -1;
    },
    jobProcessGraph() {
      const totalDays = utils.getDayOffset(this.todoItem.todoProcessDeadlineDT, this.todoItem.firstRegistrationDTM);
      const ingDays = utils.getDayOffset(utils.now(), this.todoItem.firstRegistrationDTM);
      const processPercent = Math.round(ingDays * 100 / totalDays);
      return processPercent > 100 ? 100 : processPercent;
    },
  },
  beforeDestroy() {
    if (this.popupWindow) {
      this.popupWindow.onunload = null;
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    deadlineDtCheck(date) {
      return utils.trim(date) !== '';
    },
    getData() {
      const pathParams = {
        'todo-uid': this.$props.pageItem.todoUid,
      };
      http.request(this.$options.name, 'DTS_CMZ_00126', {
        path: pathParams,
      }).then(res => {
        this.todoItem = res.data;
      }).catch(error => {
        console.log(error);
      });
    },
    onOpenPage() {
      const target = 'PGE_CMZ_00030';

      // if (this.todoItem.todoClassificationCode === 'ZZ') {
      //   utils.openLayerPopup(target, () => {}, {
      //     pageInitialData: this.todoItem,
      //     size: 'lg',
      //   });
      // } else {
      //   this.popupWindow = utils.openWindowPopup(this.todoItem.pageId, this.todoItem.todoProcessParamValue, null, { resizable: 'yes' });
      //   this.popupWindow.onload = this.onChildWindowLoad;
      // }

      if (this.todoItem.pageId) {
        this.popupWindow = utils.openWindowPopup(this.todoItem.pageId, this.todoItem.todoProcessParamValue, null, { resizable: 'yes' });
        // this.popupWindow.onload = this.onChildWindowLoad;
        this.popupWindow.addEventListener('beforeunload', this.onChildWindowLoad);
      } else {
        utils.openLayerPopup(target, () => {}, {
          pageInitialData: this.todoItem,
          size: 'lg',
          title: this.$t('MSG_TIT_TODO_PROC'),
        });
      }


    },
    onChildWindowLoad() {
      this.popupWindow.onunload = this.onChildWindowUnload;
    },
    onChildWindowUnload() {
      this.popupWindow = null;
      // refresh 처리
      // this.$parent.$parent.$parent.onLoad('test');
      this.$emit('onHomeRefresh');
    },
  },
};
</script>

<style scoped>
.portlet_form { width:312px; height:300px;padding-top:18px}
.portlet_tit {}
.portlet_tit .tt_tit {
  margin:0 28px 0 28px;
  font-size:16px;
  color: #333;
  font-weight:500;
  line-height:24px;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.portlet_tit .sub_txt {
  margin:10px 28px;
  font-size:12px;
  color: #959595;
  line-height:24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 85%;
  display: inline-block;
}
.portlet_tit .status{
  justify-content: flex-end;
  margin-left:auto;
  margin-right:28px;
  font-size:12px;
  color:#0045ff;
  text-align:center;
  min-width: 52px;
  height:20px;
  line-height: 20px;
  border-radius: 20px;
  border: solid 1px #CDDBFF;
  background-color: #f7f4ff;
  padding-left: 10px;
  padding-right: 10px;
}
.portlet_content .list_tb{
  margin:15px 0;
  padding:10px 28px;
  border-top:1px solid #eaeaea;
  border-bottom:1px solid #eaeaea;
  background-color:#fbfcfd;
  /*height: 112px;*/
  height: 100px;
}
.portlet_content .list_tb table th{
  font-size:12px;
  text-align:left;
  color:#666;
  white-space:nowrap;
}
.portlet_content .list_tb table td{
  font-size:12px;
  text-align:left;
  color:#333;
  white-space:nowrap;
}
/* add */
.portlet_content .list_tb2 {
  margin:0;
  padding:10px 28px;
  border-top:1px solid #eaeaea;
  border-bottom:1px solid #eaeaea;
  background-color:#fbfcfd;
  height: 160px;
}
.portlet_content .list_tb2 table th{
  font-size:12px;
  text-align:left;
  color:#666;
  white-space:nowrap;
}
.portlet_content .list_tb2 table td{
  font-size:12px;
  text-align:left;
  color:#333;
  white-space:nowrap;
}

/***********portlet bottom *******************/
.portlet_bottom {display:inline-flex;width:100%;position: absolute; bottom:12px;}
.portlet_bottom .left{justify-content: flex-start;  margin-left:28px;}
.portlet_bottom .right {justify-content: flex-end;margin-left:auto;margin-right:28px}
.btn_txt_GR_arrow  {
  font-size: 12px;
  color:#333;
  font-weight:normal;
  padding:3px;
  padding-right:10px;
  background:url('../../../../assets/images/ic_hyperling_blue_disable.png') no-repeat right 7px}
.portlet_bottom .right .ico_todo {
  font-size:10px;
  color:#a5a5a5;
  padding-right:20px;
  width:16px;
  height:16px;
  background:url('../../../../assets/images/ic_todo_tag_off.png') no-repeat 98% 2px;
}
.portlet_bottom .right .ico_dashboard {
  font-size:10px;
  color:#a5a5a5;
  padding-right:20px;
  width:16px;
  height:16px;
  background:url('../../../../assets/images/ic_dashboard_tag_off.png') no-repeat 98% 2px;
}

/**************  progress bar ************************/
.progBar_wrap {display:inline-flex;width:256px;margin:0px 28px 0 28px;flex-direction:column; }
.progBar_legend_ing, .progBar_legend_delay {display:inline-flex;width:100%;margin-bottom:10px}
.progBar_legend_ing .tit {
  justify-content:flex-start;
  font-size: 16px;
  color: #336aff;
}
.progBar_legend_delay .tit {
  justify-content:flex-start;
  font-size: 16px;
  color:#ee9022;
}
.progBar_legend_ing .term, .progBar_legend_delay .term {
  justify-content:flex-end;
  margin-left:auto;
  margin-top: 7px;
  font-size: 10px;
  color:#333
}
/* .progBar {width:100%} */
.progBar_ing, .progBar_delay {
  width: 100%;
  background-color: #eaeaea;
}
.progBar_ing .fill {
  display: block;
  height:10px;
  background-color: #336aff;
}
.progBar_delay .fill {
  display: block;
  height:10px;
  background-color:#ffb63a;
}
.text-ellipsis {
  text-overflow:ellipsis;
  white-space:nowrap;
  word-wrap:normal;
  width:156px;
  overflow:hidden;
}

</style>
