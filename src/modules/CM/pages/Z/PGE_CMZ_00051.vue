<template>
  <div class="portlet_form">
    <div class="portlet_tit">
      <h3 class="tt_tit" :title="pageItem.todoDetailClassificationName">{{ pageItem.todoDetailClassificationName }}</h3>
      <span class="case">{{ todoCount }}</span>
    </div>
    <div class="portlet_content">
      <div></div>
      <div ref="listBox" class="list_tb">
        <ul>
          <!--<li><i class="ing"></i>1캠퍼스 관류보일러 계속 사용검토</li>-->
          <!--<li><i class="delay"></i>구SDI 외조기 주간점검</li>-->
          <!--<li><i class="delay"></i>배수펌프 작동점검</li>-->
          <!--<li><i class="ing"></i>분전반 절면저항측정</li>-->
          <!--<li><i class="ing"></i>계전기 특성 및 연동시험</li>-->
          <!--<li><i class="ing"></i>154kV-3.3kV호흡기 실리카겔 교체</li>-->
          <li v-for="todo in todoList" :key="todo.todoUid" @click="onOpenPage(todo)">
            <i :class="checkDelay(todo) ? 'ing' : 'delay'"></i>
            <span v-if="todo.todoStateCode === 'A'" class="status">{{ $t('MSG_TXT_APRV_ONGI') }}</span>
            {{ todo.todoName }}
          </li>
        </ul>
      </div>
    </div>
    <div class="portlet_bottom">
      <div class="left">
        <sui-button type="button" class="btn_txt_GR_arrow" @click="addList" :disabled="loadData.length <= 0">{{ $t('MSG_TXT_SHOW_MORE') }}</sui-button>
      </div>
      <div class="right">
        <span class="ico_todo">{{ pageItem.moduleName }}</span>
      </div>
    </div>

  </div>
</template>
<script>
export default { // todo's 목록형
  name: 'PGE_CMZ_00051', // eslint-disable-line vue/name-property-casing
  props: {
    pageItem: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      addCount: 3, // 더보기 추가 갯수
      initListCount: 6, // 최초 추가 갯수
      loadData: [],
      todoList: [],
      popupWindow: null,
    };
  },
  computed: {
    todoCount() {
      return utils.size(this.loadData) + utils.size(this.todoList);
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    checkDelay(todoItem) {
      return utils.getDayOffset(todoItem.todoProcessDeadlineDT, utils.now()) > -1;
    },
    getData() {
      const queryParams = {
        // moduleCode: this.$props.pageItem.moduleCode,
        todoClassificationCode: this.$props.pageItem.todoClassificationCode,
        todoDetailClassificationCode: this.$props.pageItem.todoDetailClassificationCode,
      };
      http.request(this.$options.name, 'DTS_CMP_00041', {
        query: queryParams,
      }).then(res => {
        // this.loadData = utils.filter(res.data, { todoStateCode: 'P' }); // 'A' 추가에 따른 삭제
        this.loadData = res.data;
        this.addList(true);
      }).catch(error => {
        console.log(error);
      });
    },
    addList(init = false) {
      const data = this.loadData;
      const addSize = init ? this.initListCount : this.addCount;
      const cnt = addSize > utils.size(data) ? utils.size(data) : addSize;
      for (let i=0; i<cnt; i++) {
        this.todoList.push(data.shift());
      }
      // scroll move to bottom
      this.$nextTick(() => {
        const { listBox } = this.$refs;
        listBox.scrollTop = listBox.scrollHeight;
      });
    },
    onOpenPage(todoItem) {
      const target = 'PGE_CMZ_00030';
      // if (todoItem.todoClassificationCode === 'ZZ') {
      //   utils.openWindowPopup(target, { uid: todoItem.todoUid });
      // } else {
      //   utils.openLayerPopup(target, () => {}, {
      //     pageInitialData: todoItem,
      //     size: 'lg',
      //   });
      // }

      // if (todoItem.todoClassificationCode === 'ZZ') {
      //   utils.openLayerPopup(target, () => {}, {
      //     pageInitialData: todoItem,
      //     size: 'lg',
      //   });
      // } else {
      //   this.popupWindow = utils.openWindowPopup(todoItem.pageId, todoItem.todoProcessParamValue);
      //   this.popupWindow.onload = this.onChildWindowLoad;
      // }

      if (todoItem.pageId) {
        this.popupWindow = utils.openWindowPopup(todoItem.pageId, todoItem.todoProcessParamValue);
        // this.popupWindow.onload = this.onChildWindowLoad;
        this.popupWindow.addEventListener('beforeunload', this.onChildWindowLoad);
      } else {
        utils.openLayerPopup(target, () => {}, {
          pageInitialData: todoItem,
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
.portlet_tit {display:inline-flex;width:100%}
.portlet_tit .tt_tit {
  justify-content: flex-start;
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
.portlet_tit .case{
  justify-content: flex-end;
  margin-left:auto;
  margin-right:28px;
  font-size:12px;
  color:#2949b3;
  text-align:center;
  width: 52px;
  height: 22px;
  line-height: 22px;
  border-radius: 20px;
  border: solid 1px #d5dce9;
  background-color: #f8f9ff;
}
.portlet_content .list_tb{
  margin:15px 0;
  padding:10px 28px;
  border-top:1px solid #eaeaea;
  border-bottom:1px solid #eaeaea;
  background-color:#fbfcfd;
  overflow: auto;
  height: 191px;
}
.portlet_content .list_tb .status{
  padding:0 5px;
  margin-right:10px;
  font-size:10px;
  color:#0045ff;
  text-align:center;
  width: 52px;
  height:16px;
  border-radius: 20px;
  border: solid 1px #CDDBFF;
  background-color: #f7f4ff;
}
.portlet_content .list_tb ul li {
  font-size:12px;
  color:#333;
  line-height:28px;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.portlet_content .list_tb ul li i{
  display:inline-block;
  margin-right: 8px;
  margin-bottom: 1px;
}
.portlet_content .list_tb ul li i.ing {width: 7px;
  height: 7px;
  border-radius:50%;
  background-color: #336aff;}
.portlet_content .list_tb ul li i.delay {
  width: 7px;
  height: 7px;
  border-radius:50%;
  background-color: #ffb63a;
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
</style>
