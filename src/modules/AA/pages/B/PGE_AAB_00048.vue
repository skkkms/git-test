<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
      <sui-page-contents>
      <div>
        <template slot="title">
          <!-- [콘텐츠관리] 이벤트 -->
          <div class="modal-title mb45">
            {{ $t('MSG_TIT_IAA_C07') }}
          </div>
        </template>
        <template>
          <div class="modal-body">
            <!-- [검색조건] 이벤트 유형 -->
            <ur-form-box toggleable>
              <ur-form-item
                :label="$t('MSG_TXT_EVN_TYPE')"
                :label-align="'right'"
                style="width: 50%; height: auto;"
                class="flex_wrap"
              >
              <ur-dropdown
                v-model="params.eventClassCd"
                :items="codes.COD_IA_EVENT_CLASS" 
                no-select="no-select"
                class="mb4"
                :msg-no-select="$t('전체')"
              />
              </ur-form-item>
              <!-- [검색조건] 제목 -->
              <ur-form-item
                :label="$t('MSG_TXT_SITE_TTL')"
                :label-align="'right'"
                style="width: 50%; height: auto;"
                class="flex_wrap"
              >
              <ur-text-field
                v-model="params.eventName"
                @keyup.enter="onSearch"
                style="width: 100%;"
                maxlength="100"
              />
              </ur-form-item>
              <!-- [검색조건] 이벤트 기간 -->
              <ur-form-item
                :label="$t('MSG_TXT_EVENT_PERIOD')"
                :label-align="'right'"
                required
                style="width: 100%;"
              >
              <ur-range-picker
                v-model="params.salesDate"
                input-type="YYYY-MM-DD"
                model-type="YYYYMMDD"
                :confirm-label="$t('MSG_BTN_SELT')"
                :clear-label="$t('MSG_BTN_RESET')"
                clearable
                />
              </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
              <div class="right_box">
                <!-- [버튼] 초기화 -->
                <ur-button @click="onReset">
                  {{ $t('MSG_BTN_RESET') }}
                </ur-button>
                <!-- [버튼] 검색 -->
                <ur-button color="violet" @click="onSearch">
                  {{ $t('MSG_BTN_SRCH') }}
                </ur-button>
              </div>
            </div>
            <ur-data-grid
              ref="grid"
              :headers="columnsP4T1"
              :data-source="mData"
              :options="opts"
              :data-set-options="{id: 'id'}"
              @grid:row-dbl-click = "fnGridRowDblClick"
            />
          </div>
        </template>
        <template>
          <div class="comm_btn_wrap bt1">
            <div class="right_box mt10">
              <!-- [버튼] 닫기 -->
              <ur-button @click="closeModalP04">
                {{ $t('MSG_BTN_CLOSE') }}
              </ur-button>
              <!-- [버튼] 선택 -->
              <ur-button color="violet" @click="selectiModal">
                {{ $t('MSG_BTN_SELT') }}
              </ur-button>
            </div>
          </div>
        </template>
     </div>
   </sui-page-contents>
  </sui-page>
</template>

<script>
import { urDataSet } from 'uidev-component/index.js'
export default {
  name: 'PGE_AAB_00048', // eslint-disable-line vue/name-property-casing
  components: {
  },
  props: {
    closePagePopup: {
      type: Function,
      default: () => {},
    },
    pageInitialData: {
      type: Object,
      default() {
        return {};
      },
    },    
  },
  data() {
    return {
      CODE_KEYS: ['COD_IA_EVENT_CLASS'],

     codes: {
       COD_IA_EVENT_CLASS: [],
     },

     params: {
      parkKindCd: '', 
      eventClassCd:'',
      eventName: '',
      salesDate: [moment(utils.now('YYYY-MM-DD')).add(-1, 'months').format('YYYY-MM-DD'), utils.now('YYYY-MM-DD')],
     },
      mData: new urDataSet(),

      opts: { // 토탈 O
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
        height: 280,
        resizableColumn: true, 
      },
      columnsP4T1: [
        {value: '__idx', text: 'No.', width: 40, customValue: (v) => v+1}, 
        { text: this.$t('MSG_TXT_CODE_STRT_TYPE'), value: 'eventClassNm', width: 150 },
        { text: this.$t('MSG_TXT_EXPOSR_YN'), value: 'exposrYn', width: 100 },
        { text: this.$t('MSG_TXT_SITE_TTL') , value: 'eventName' },
      ],

      listP4T1: [
      ],
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
    http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
   
    this.onReset();
  },
  methods: {
    onReset() {
        this.params.eventClassCd = '';
        this.params.eventName = '';
        this.params.salesDate = ['', ''];
    },
    onSearch() {
      if (utils.isEmpty(this.params.salesDate[0]) || utils.isEmpty(this.params.salesDate[1])) {
        utils.messageBox('warning', this.$t('MSG_TXT_NO_EVNT')); // 기간이 입력되지 않았습니다.
        return
      }
      let query = {
        parkKindCd: this.pageInitialData.parkKindCd,
        eventClassCd: this.params.eventClassCd,
        eventName: encodeURI(this.params.eventName),
        eventStartDtm: this.params.salesDate[0],
        eventEndDtm: this.params.salesDate[1],
      }
      query = Object.assign(query, this.paging)
      http.request(this.$options.name, 'DTS_AAC_00010', {
        query: query,
      }).then(res => {
        this.mData.setData(res.data);
      }).catch(error => {
         console.log(error);
      });
    },
    selectiModal() {
      let row = this.$refs.grid.getSelected()
      if(row) {
          this.closePagePopup(row);
      } else {
        utils.messageBox("warning", this.$t('MSG_ALT_NOT_SEL_ITEM')); //선택된 항목이 없습니다.
      }
    },

    fnGridRowDblClick(row, evemt){
      if(row) {
          this.closePagePopup(row);
      } else {
          utils.messageBox("alert", this.$t('MSG_ALT_NOT_SEL_ITEM')); //선택된 항목이 없습니다. MSG_ALT_NOT_SEL_ITEM         
      }
    },

    closeModalP04() {
      this.closePagePopup('Close');
    },
  },
}
</script>
<style scoped>
</style>
