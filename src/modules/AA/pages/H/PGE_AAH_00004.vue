<template v-on:scroll.native="handleScroll"> 
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div>
  <div class="ur-scheduler" ref="self">
    <!--  Calendar   -->
    <div class="ur-scheduler__calendar-wrapper">
      <calendar-view
        do-emit-item-mouse-events
        :events="dumpItems"
        :show-date="showDate"
        :selected-date="selectedDate"
        :holiday="holiday"
        @click-date="clickDate"
        @click-item="clickItem"
        @item-mouseenter="onMouseEnterItem"
				@item-mouseleave="onMouseLeaveItem"
      >
        <template #header="{headerProps}">
          <ur-scheduler-header
            :header-props="headerProps"
            :show-date="showDate"
            @input="changeMonth"
            @today="setShowDate"
          ></ur-scheduler-header>
        </template>
      </calendar-view>
    </div>
  </div>
      </div>
      
      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <!--
            <ur-button>
              목록
            </ur-button>
            -->
          </div>
          <div class="right_box">
            <ur-button v-permission:create="this.$options.name" color="violet" @click="insertForm">
              {{ $t("MSG_BTN_RGST_NEW") }}
            </ur-button>
          </div>
         
          <div id="mouse_over_layer" style="position:absolute; width:200px; height:100px; left:0px; top:0px; z-index:1; background:#ffffff; border:1px solid #909090; font-size:0.9em; line-height:1.5em; padding:10px 10px; display:none">
              <div style="">
                  <strong id="slot_nm"></strong><br><br>
                  <span id="slot_start_day"></span> <br>
                  <span id="slot_end_day"></span> <br>
              </div>
          </div>
    
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import CalendarView from '@uidev/components/external/urScheduler/CalendarView'
import UrSchedulerHeader from '@uidev/components/external/urScheduler//urSchedulerHeader'
import CalendarMathMixin from '@uidev/components/external/urScheduler//CalendarMathMixin'
export default {
  name: 'PGE_AAH_00004', // eslint-disable-line vue/name-property-casing
  components: {
    CalendarView,
    UrSchedulerHeader,
  },
  mixins:[CalendarMathMixin],
  data() {
    return {
      // 드롭다운
      valueD1: 1,
      // 스케줄
      items: [],
      selectDate: '',
      prevDate: '',

      showDate: new Date(),
      selectedDate: new Date(),
      editTargetItem: {},
      dumpItems: [],
      holiday: [],
      propertyName: [0, 0]
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
     
  },
  mounted() {    
    this.prevDate = this.dateFormat(this.showDate);
    this.selectDate = this.dateFormat(this.showDate);
  },    
  methods: {
  
    insertForm() {
      utils.goPage('PGE_AAH_00005', {slotStartDay: this.selectDate, showDate:this.showDate});
    },

    dateFormat(date) {
        let month = date.getMonth() + 1;
        month = month >= 10 ? month : '0' + month;
        
        return date.getFullYear() + '-' + month;
    },

    dateFormatMouseOver(date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        
        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;
       
        return date.getFullYear() + '-' + month + '-' + day;
    },


    buildDumpItem(){
      if (!!this.value) {
        this.value.forEach((item, idx) => {
          this.dumpItems.push(item);
        });
      }
    },
    setSelectedDate(d) {
      this.selectedDate = d
    },
    checkValidDate(d) {
      let year = d.getFullYear();
      if(year < 1900) return new Date(1900,0,1);
      if(year > 9999) return new Date(9999, 11, 1);
      return d;
    },

    setShowDate(d) {
      if(!this.$refs.self) return;

      let _d = this.checkValidDate(d);
      
      let prevSelected = 'd' + this.isoYearMonthDay(this.selectedDate);
      let prevDom = this.$refs.self.getElementsByClassName(prevSelected);
      if(!!prevDom){
        prevDom[0].classList.remove('selected')
      }
      
      this.showDate = _d;
      this.setSelectedDate(_d);
      this.changeMonth(d);
    },
    changeMonth(d) {
      const _selectedym = this.isoYearMonth(this.selectedDate);
      const _changedym = this.isoYearMonth(d);
      if(_selectedym !== _changedym) {
        this.setShowDate(d);
      }

        this.selectDate = this.dateFormat(d);
       
        if (this.selectDate !== this.prevDate) {
          this.dumpItems = [];
          this.prevDate = this.selectDate;
          
          const param = {
            slotStartDay: this.selectDate
          };
          
          /*
          if (this.$route.params.slotStartDay) {
            param.slotStartDay = this.$route.params.slotStartDay;
            this.showDate = this.$route.params.showDate;
            this.setShowDate(this.$route.params.showDate);
            this.$route.params.slotStartDay = '';
          }
          */
            
          http.request(this.$options.name, 'DTS_AAH_00010', {
            query: param,
          }).then(res => {
            
            for (let i=0; i<res.data.length; i++) {

              this.items.push({
                startDate: res.data[i].slotStartDay, endDate: res.data[i].slotEndDay, title: res.data[i].subject, classes: 'violet-color', slotSeq: res.data[i].slotSeq 
              });

              this.applyItem('add', this.items[0]);
              this.items = [];
            }

            this.$route.params.slotStartDay = '';
            
          }).catch(error => {
            console.log(error);
          });
        }
    },
    clickDate(date){
      let prevSelected = 'd' + this.isoYearMonthDay(this.selectedDate);
      let nextSelected = 'd' + this.isoYearMonthDay(date);
      let prevDom =  this.$refs.self.getElementsByClassName(prevSelected);
      if(!!prevDom){
        prevDom[0].classList.remove('selected')
      }
      this.showDate = date;
      this.setSelectedDate(date);
      if( this.$refs.self.getElementsByClassName(nextSelected)[0].classList.contains("outsideOfMonth")){
        this.setShowDate(date);
      }
    },
    clickItem(item){
      this.editTargetItem = item;
      utils.goPage('PGE_AAH_00006', {slotSeq: item.originalEvent.slotSeq});
    },
    onMouseEnterItem(item, event) {
      //this.view(true, item, event);      
    },
    onMouseLeaveItem(item, event) {
      //this.view(false, item, event);      
    },
    applyItem(mode, item){
      if(mode === 'delete' || mode === 'edit'){
        this.dumpItems.splice(this.dumpItems.indexOf(this.editTargetItem.originalEvent), 1);
      }
      if(mode === 'add' || mode === 'edit'){
        this.dumpItems.push(item);
      }
    },

    view(opt, item, e) {

      var obj = document.getElementById('mouse_over_layer');

      var sWidth = window.innerWidth;
      var sHeight = window.innerHeight;

      var oWidth = obj.clientWidth;
      var oHeight = obj.clientHeight;

      // 레이어가 나타날 위치를 셋팅한다.
      var divLeft = e.clientX - 250;
      var divTop = e.clientY - 150;

      // 레이어가 화면 크기를 벗어나면 위치를 바꾸어 배치한다.
      if( divLeft + oWidth > sWidth ) divLeft -= oWidth;
      if( divTop + oHeight > sHeight ) divTop -= oHeight;

      // 레이어 위치를 바꾸었더니 상단기준점(0,0) 밖으로 벗어난다면 상단기준점(0,0)에 배치하자.
      if( divLeft < 0 ) divLeft = 0;
      if( divTop < 0 ) divTop = 0;

      if (opt) {
          document.getElementById('slot_nm').innerText= item.title;
          document.getElementById('slot_start_day').innerText = this.$t('MSG_TXT_START_DATE')+' : '+this.dateFormatMouseOver(item.startDate);
          document.getElementById('slot_end_day').innerText = this.$t('MSG_TXT_END_DATE')+' : '+this.dateFormatMouseOver(item.endDate);
          obj.style.top = divTop+"px";
          obj.style.left = divLeft+"px";
          obj.style.display = "block";
      }
      else {
          obj.style.display = "none";
      }
    },

  },
}
</script>
<style scoped>
</style>
