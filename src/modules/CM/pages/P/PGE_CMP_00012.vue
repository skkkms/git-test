<template>
    <div ref="listBlock" class="home_bg">      
      <!-- <div id="parent-circle">
        <div class="circle blue"></div>
        <div class="circle pink"></div>
        <div class="circle lime"></div>
        <div class="circle orange"></div>
        <div class="circle teal"></div>
      </div> -->
      <div class="home_frm">
        <div style="flex:1 auto">
        <div class="home_top">
          <div class="home_info">
            <div class="home_notice">
              <p>{{ welcomeMessage }}</P>
              <p v-html="worksMessage"></p>
            </div>
            <div class="home_time">
              <sui-button type="button" class="btn_ico_refresh" @click="onLoad">refresh</sui-button>
              <p>{{ loadTime }}</p>
            </div>
          </div>
        </div>
        <div class="home_filter">
          <div class="home_filter_L">
            <ul>
              <li class="btn_gr">
                <!-- 홈카드 필터 -->
                <sui-button
                    type="button"
                    v-for="item in dataList.filterHomeCard"
                    :key="item.id"
                    :class="homeCardFilterType[item.id] ? item.cls+'_on' : item.cls+'_off'"
                    @click="onHomeCardFilterToggleClick(item.id)"
                >
                  {{ item.name }} <span>{{ homeCardFilterCount[item.id] }}</span>
                </sui-button>
              </li>
              <!-- 할일 모듈별 필터 -->
              <li class="todo_filter_tit"><span style="pointer-events:none;">{{ $t('MSG_TXT_TODO_CLSF')}}</span></li>
              <li class="line"/>
              <li class="all">
                <sui-button type="button"
                        :class="moduleAllFlag ? 'all_on' : 'all_off'"
                        @click="onModuleAllClick()">
                  All
                </sui-button>
              </li>
              <li class="line"/>
              <template v-for="item in dataList.filterModule">
                <li
                   v-if="item.count > 0"
                   :key="item.id"
                   :class="moduleFilterType[item.id] ? 'on' : 'off'"
                   @click="onModuleFilterClick(item.id)">
                  {{ item.name }} <span class="str">{{ item.count }}</span>
                </li>
              </template>

              <li class="line"/>
            </ul>
          </div>
          <!-- 할일 카드/목록 보여주기 -->
          <div class="home_filter_R">
            <sui-button type="button"
                    :class="todoShowType === 'card' ? todoShowBtn.card+'_on' : todoShowBtn.card+'_off'"
                    @click="onTodoShowToggleClick('card')">
              detail
            </sui-button>
             <sui-button type="button"
                    :class="todoShowType === 'list' ? todoShowBtn.list+'_on' : todoShowBtn.list+'_off'"
                    @click="onTodoShowToggleClick('list')">
              list
            </sui-button>
            <span class="line"></span>
            <ur-drop-holder :items="items"  @input="onFilterSaveMenuClick">
              <ur-icon
                icon="setting"
                anchor
                small
                icon-type="picto"
                style="cursor: pointer;"
              />
            </ur-drop-holder>
            <!-- <sui-tooltip-menu
                :menu-list="settingMenuList"
                @input="onFilterSaveMenuClick">
              filter save menu
            </sui-tooltip-menu> -->
          </div>
        </div>
        <sui-page-card-container
            :pageList="pageList"
            @onHomeRefresh="onLoad"
        />
        <div class="btn_moreView">
          <p @click="onMoreClick" :class="totalListCount === 0 || pageListCount === totalListCount ? 'disabled' : ''">
            {{ $t('MSG_TXT_SHOW_MORE') }} ({{ pageListCount }}/{{ totalListCount }})
          </p>
        </div>
      </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'PGE_CMP_00012',
  data() {
    return {
      welcomeMessage: utils.strFormat(this.$t('MSG_TXT_HELLO'), this.$store.getters.userInfo.userName),
      worksMessage: '',
      loadTime: '',
      todoShowBtn: {
        card: 'btn_ico_detail',
        list: 'btn_ico_list',
      },
      // moduleFilterType: 'ALL', /* ALL:All, FL:FLMS, BQ:BQMS, PE:PEHS */
      moduleFilterType: {},
      homeCardFilterType: {
        D: false, /* Dashboard */
        N: false, /* Normal */
        T: false, /* Todos */
      },
      todoShowType: 'card', /* card, list */
      pageList: [],
      buffList: [],
      codes: {
        COD_MDLE: [],
        COD_HCARD_TYPE: [],
        COD_TODO_CLSF: [],
        COD_TODO_DTL_CLSF: [],
      },
      dataList: {
        filterModule: [],
        filterHomeCard: [],
        homeCard: [],
        todo: [],
      },
      pageTemplate: {
        // home: 'PGE_CMP_00016', // homecard
        card: 'PGE_CMZ_00050', // todos card
        list: 'PGE_CMZ_00051', // todos list
      },
      todoCount: {
        ing: 0,
        delay: 0,
      },
      homeCardFilterCount: {
        D: 0,
        N: 0,
        T: 0,
      },
      moduleAllFlag: false,
      filterStatusValue: '',
      filterStatusValueMode: 'update',
      settingMenuList: [
        { label: this.$t('MSG_TXT_CARD_SETUP_SAVE'), key: 'filterStateSave' },
        { label: this.$t('MSG_TXT_CARD_SETUP_INIT'), key: 'filterStateInit' },
      ],
      lowSpecYn: 'Y', /* 저사양PC */
    };
  },
  computed: {
    items() {
      const rtn = [];
      rtn.push({ value: 'filterStateSave', text: this.$t('MSG_TXT_CARD_SETUP_SAVE') });
      rtn.push({ value: 'filterStateInit', text: this.$t('MSG_TXT_CARD_SETUP_INIT') });
      return rtn;
    },
    pageListCount() {
      return utils.size(this.pageList);
    },
    totalListCount() {
      return utils.size(this.buffList) + utils.size(this.pageList);
    },
  },
  mounted() {
    const CODE_KEY = ['COD_MDLE', 'COD_HCARD_TYPE', 'COD_TODO_CLSF', 'COD_TODO_DTL_CLSF'];
    http.mergeCodeList(this.$options.name, CODE_KEY, this.codes)
      .then(() => {
        // 할일 코드 제거 시 대비
        if (utils.findIndex(this.codes.COD_HCARD_TYPE, { codeId: 'T' }) < 0) {
          this.codes.COD_HCARD_TYPE.push({
            codeId: 'T',
            codeName: 'Todo',
            key: 'T',
            label: 'Todo',
          });
        }
        this.onLoad();
      });
  },
  methods: {
    onLoad() {
      this.lowSpecYn = this.$store.getters.userInfo.lowSpecYn;
      Promise.all([
        this.getFilterStatusValue(),
        this.getHomeCardList(),
        this.getTodoList(),
      ])
        .then(() => {
          this._makeFilter();
          this._makeDelayTodoCount();
          this.setFilterStateValue(); // filter값 설정
          this.generateList();
          this.loadTime = utils.now('YYYY-MM-DD HH:mm:ss');
        });
    },
    setFilterStateValue() {
      // filter 상태값을 설정한다.
      // let flag = this.filterStatusValue || 'D,N,T^CM,FL,BQ,PE^list';
      const flag = this.filterStatusValue || this._makeFilterStateValue('init');

      if (flag) {
        const tmp = flag.split('^');
        const card = tmp[0].split(',');
        const todo = tmp[1].split(',');
        const todoShow = tmp[2] || 'card'; // card or list

        utils.forEach(card, value => {
          if (this.homeCardFilterType.hasOwnProperty(value)) {
            this.homeCardFilterType[value] = true;
          }
        });
        utils.forEach(todo, value => {
          if (this.moduleFilterType.hasOwnProperty(value)) {
            this.moduleFilterType[value] = true;
          }
        });
        this.todoShowType = todoShow;

        this._checkModuleAll();
      }
    },
    _makeFilterStateValue(mode) {
      const cardFlag = [];
      const moduleFlag = [];
      utils.forEach(this.homeCardFilterType, (value, key) => {
        if (mode === 'init') {
          cardFlag.push(key);
        } else if (value) cardFlag.push(key);
      });
      utils.forEach(this.moduleFilterType, (value, key) => {
        const module = utils.find(this.dataList.filterModule, { 'id': key });
        const cnt = module ? module.count : 0;
        if (mode === 'init' && cnt > 0) {
          moduleFlag.push(key);
        } else if (value && cnt > 0) {
          moduleFlag.push(key);
        }
      });

      // const resultValue = cardFlag.join(',') + '^' + moduleFlag.join(',');
      const resultValue = cardFlag.join(',') + '^' + moduleFlag.join(',') + '^';
      const todoShow = mode === 'init' ? 'card' : this.todoShowType;
      return resultValue + todoShow;
    },
    saveFilterStateValue() {
      // filter 상태값을 서버에 저장
      const cardFlag = [];
      const moduleFlag = [];
      utils.forEach(this.homeCardFilterType, (value, key) => {
        if (value) cardFlag.push(key);
      });
      utils.forEach(this.moduleFilterType, (value, key) => {
        if (value) moduleFlag.push(key);
      });

      const tmpValue = this._makeFilterStateValue();

      const dataParam = { personalizationValue: tmpValue };
      http.request(this.$options.name, 'DTS_CMP_00062', {
        data: dataParam,
      }).then(res => {
        utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
      }).catch(error => {
        console.log(error);
      });
    },
    initFilterStateValue() {
      // filter 상태값을 서버 삭제
      http.request(this.$options.name, 'DTS_CMP_00064', {})
        .then(res => {
          utils.messageBox('success', this.$t('MSG_ALT_RESET'), null, () => {
            this.onLoad();
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    getFilterStatusValue() {
      return new Promise((resolve, reject) => {
        http.request(this.$options.name, 'DTS_CMP_00061', {

        }).then(res => {
          this.filterStatusValue = utils.size(res.data) > 0 ? res.data[0].personalizationValue : '';
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        });
      });
    },
    getHomeCardList() {
      return new Promise((resolve, reject) => {
        http.request(this.$options.name, 'DTS_CMP_00040', {
        }).then(res => {
          this.dataList.homeCard.splice(0);
          this.dataList.homeCard = res.data;
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        });
      });
    },
    getTodoList() {
      return new Promise((resolve, reject) => {
        http.request(this.$options.name, 'DTS_CMP_00041', {
        }).then(res => {
          this.dataList.todo.splice(0);
          this.dataList.todo = res.data;
          resolve();
        }).catch(error => {
          console.log(error);
          reject(error);
        });
      });
    },
    onFilterSaveMenuClick(menuKey){
      switch (menuKey) {
        case 'filterStateSave':
          this.saveFilterStateValue();
          break;
        case 'filterStateInit':
          this.initFilterStateValue();
          break;
        default: break;
      }
    },
    onModuleAllClick() {
      this.moduleAllFlag = !this.moduleAllFlag;
      utils.forEach(this.moduleFilterType, (value, key) => {
        this.moduleFilterType[key] = this.moduleAllFlag;
      });
      this.generateList();
    },
    onTodoShowToggleClick(type) { // todos 보여주기 토글
      this.todoShowType = type;
      this.generateList();
    },
    _checkModuleAll() {
      let allFlag = true;
      utils.forEach(this.moduleFilterType, (value, key) => {
        // const cnt = utils.size(utils.filter(this.dataList.todo, { moduleCode: key }));
        const cnt = utils.find(this.dataList.filterModule, { id: key }).count;
        if (cnt > 0) {
          allFlag = allFlag && value;
        }
      });
      this.moduleAllFlag = allFlag;
    },
    onModuleFilterClick(moduleId) {
      this.moduleFilterType[moduleId] = !this.moduleFilterType[moduleId];
      this._checkModuleAll();

      this.generateList();
    },
    onHomeCardFilterToggleClick(hcardType) {
      this.homeCardFilterType[hcardType] = !this.homeCardFilterType[hcardType];
      this.generateList();
    },
    onMoreClick() {
      // 더보기
      this.addList(false, 'more');
    },
    generateList() { // pageList 생성
      this.pageList.splice(0);
      this.buffList.splice(0);

      // Dashboard
      // if (this.homeCardFilterType.D) {
      if (this.lowSpecYn !== 'Y' && this.homeCardFilterType.D) {
        const dashboard = utils.filter(this.dataList.homeCard, { homeCardTypeCode: 'D' });
        utils.forEach(dashboard, item => {
          this.buffList.push({
            id: item.homeCardId,
            pageId: item.pageId,
            pageItem: item,
            type: 'dashboard',
          });
        });
      }

      // Normal
      if (this.homeCardFilterType.N) {
        const normal = utils.filter(this.dataList.homeCard, { homeCardTypeCode: 'N' });
        utils.forEach(normal, item => {
          this.buffList.push({
            id: item.homeCardId,
            pageId: item.pageId,
            pageItem: item,
            type: 'normal',
          });
        });
      }

      // Todos
      if (this.homeCardFilterType.T) {
        if (this.todoShowType === 'card') {
          this._makeTodoCard();
        } else {
          this._makeTodoList();
        }
      }

      this.$nextTick(() => { // cache prevent
        this.addList(true);
      });
      // this.homeCardFilterCount.T = utils.size(utils.filter(this.pageList, { type: 'todo' })) +
      //   utils.size(utils.filter(this.buffList, { type: 'todo' }));

      this.homeCardFilterCount.T = 0;
      utils.forEach(this.moduleFilterType, (value, key) => {
        if (value) {
          this.homeCardFilterCount.T += utils.find(this.dataList.filterModule, { id: key }).count;
        }
      });
    },
    addList(init = false, actionType) {
      const data = this.buffList;
      const addSize = 8;
      const cnt = addSize > utils.size(data) ? utils.size(data) : addSize;
      for (let i=0; i<cnt; i++) {
        this.pageList.push(data.shift());
      }
      // scroll move to bottom
      this.$nextTick(() => {
        const { listBlock } = this.$refs;
        if (listBlock) {
          listBlock.scrollTop = actionType === 'more' ? listBlock.scrollHeight : 0;
        }
      });
    },
    _makeFilter() { // 상단 filter list 생성
      // todos filter
      this.dataList.filterModule = [];
      utils.forEach(this.codes.COD_MDLE, item => {
        // const todoCnt = utils.size(utils.filter(this.dataList.todo, { moduleCode: item.codeId }));
        const todoCnt = utils.size(utils.filter(this.dataList.todo, { todoClassificationCode: item.codeId }));
        this.dataList.filterModule.push({
          id: item.codeId,
          name: item.codeName,
          count: todoCnt,
        });
        this.moduleFilterType[item.codeId] = false; // Add for toggle
      });

      // homecard filter
      this.dataList.filterHomeCard = [];
      utils.forEach(this.codes.COD_HCARD_TYPE, item => {
        let className = 'dashboard';
        switch (item.codeId) {
          case 'D': className = 'dashboard'; break;
          case 'N': className = 'notice'; break;
          // case 'T': className = 'todo'; break;
          default: className = 'todo';
        }
        if (!(this.lowSpecYn === 'Y' && item.codeId === 'D')) { // 저사양PC일경우 Dashboard 제외
          this.dataList.filterHomeCard.push({
            id: item.codeId,
            name: item.codeName,
            cls: className,
          });
        }
      });
    },
    _makeDelayTodoCount() {
      this.todoCount = {
        ing: 0,
        delay: 0,
      };
      utils.forEach(this.dataList.todo, item => {
        const todoDeadlineTD = utils.trim(item.todoProcessDeadlineDT);
        if (!todoDeadlineTD) {
          this.todoCount.ing = this.todoCount.ing + 1;
        } else if (utils.getDayOffset(todoDeadlineTD, utils.now()) > -1) {
          this.todoCount.ing = this.todoCount.ing + 1;
        } else {
          this.todoCount.delay = this.todoCount.delay + 1;
        }
      });

      this.homeCardFilterCount.D = utils.size(utils.filter(this.dataList.homeCard, { homeCardTypeCode: 'D' }));
      this.homeCardFilterCount.N = utils.size(utils.filter(this.dataList.homeCard, { homeCardTypeCode: 'N' }));
      this.homeCardFilterCount.T = this.todoCount.ing + this.todoCount.delay;

      this.$nextTick(() => {
        const inProgressMsg = `<span class="bl" style="color:#336aff;font-weight:bold;">${utils.strFormat(this.$t('MSG_TXT_TASKS_CNT'), this.todoCount.ing)}</span>`;
        const delayMsg = `<span class="or" style="color:#ee9022;font-weight:bold;">${utils.strFormat(this.$t('MSG_TXT_TASKS_CNT'), this.todoCount.delay)}</span>`;
        this.worksMessage = utils.strFormat(this.$t('MSG_TXT_WORKS'), inProgressMsg, delayMsg);
      });
    },
    _makeTodoCard() {
      utils.forEach(this.dataList.todo, item => {
        // if (this.moduleFilterType[item.moduleCode]) { // true 이면
        if (this.moduleFilterType[item.todoClassificationCode]) { // true 이면
          this.buffList.push({
            id: item.todoUid,
            pageId: this.pageTemplate.card,
            pageItem: item,
            type: 'todo',
          });
        }
      });
    },
    _makeTodoList() {
      // const todoListInModule = utils.groupBy(this.dataList.todo, 'moduleCode');
      const todoListInModule = utils.groupBy(this.dataList.todo, 'todoClassificationCode');

      utils.forEach(todoListInModule, (moduleGroupItem, moduleKey) => {
        if (this.moduleFilterType[moduleKey]) {
          const todoListInClass = utils.groupBy(moduleGroupItem, 'todoDetailClassificationCode');
          utils.forEach(todoListInClass, (todoClassGroupItem, todoClassKey) => {
            this.buffList.push({
              id: `TODO-${moduleKey}-${todoClassKey}`,
              pageId: this.pageTemplate.list,
              pageItem: {
                moduleCode: moduleKey,
                moduleName: utils.filter(this.codes.COD_MDLE, { codeId: moduleKey })[0].codeName || '',
                todoClassificationCode: todoClassGroupItem.todoClassificationCode,
                todoDetailClassificationCode: todoClassKey,
                todoDetailClassificationName: utils.filter(this.codes.COD_TODO_DTL_CLSF,
                  { codeId: todoClassKey })[0].codeName || '',
                list: todoClassGroupItem,
              },
              type: 'todo',
            });
          });
        }
      });
    },
  },
};
</script>
<style scoped>
</style>