<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
    <div>
      <template slot="title">
        <!-- [검색조건] 콘텐츠 관리 - 스마트예약 -->
        <div class="modal-title mb45">
           {{ $t('MSG_TIT_IAA_C06') }}
        </div>
      </template>
      <template>
        <div class="modal-body">
          <!-- [검색조건] 파크 구분,상품 유형 -->
          <ur-form-box toggleable>
            <ur-form-item
              :label="$t('MSG_TXT_PARK_FG')"
              :label-align="'right'"
              style="width: 50%; height: auto;"
            >
              <ur-dropdown
                v-model="params.parkKindCd"
                :items="codes.COD_IA_PARK_FG"
                no-select="no-select"
                :msg-no-select="$t('전체')"
              />
            </ur-form-item>
            <ur-form-item
              :label="$t('MSG_TXT_PRDT_TYPE')"
              :label-align="'right'"
              style="width: 50%; height: auto;"
            >
              <ur-dropdown
                v-model="params.menuId"
                :items="RSWEB_MENU_TYPE_CODE"
                no-select="no-select"
                :msg-no-select="$t('전체')"
              />
            </ur-form-item> 
             <!-- [검색조건] 기간, 상품 명 -->
            <ur-form-item
            :label="$t('MSG_TXT_PRD')"
            :label-align="'right'"
            style="width: 50%; height: auto;"
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
            <ur-form-item
              :label="$t('MSG_TXT_PRDT_NM')"
              :label-align="'right'"
              style="width: 50%; height: auto;"
            >
              <ur-text-field
                v-model="params.prodNm"
                @keyup.enter="onSearch"
                style="width: 100%;"
                maxlength="100"
              />
            </ur-form-item>
          </ur-form-box>
          <div class="btn_wrap mt10">
            <div class="right_box">
              <!-- [초기화] -->
              <ur-button @click="onReset">
                {{ $t('MSG_BTN_RESET') }}
              </ur-button>
              <!-- [검색] -->
              <ur-button color="violet" @click="onSearch">
                {{ $t('MSG_BTN_SRCH') }}
              </ur-button>
            </div>
          </div>
          <ur-data-grid
            ref="grid"
            :headers="columnsP3T1"
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
            <!-- [닫기] -->
            <ur-button @click="closeModalP03">
              {{ $t('MSG_BTN_CLOSE') }}
            </ur-button>
            <!-- [선택] -->
            <ur-button color="violet"  @click="selectiModal">
              {{ $t('MSG_BTN_SELT') }}
            </ur-button>
          </div>
        </div>
      </template>
    </div>
   </sui-page-contents>
  </sui-page>
</template>
</template>

<script>
import { urDataSet } from 'uidev-component/index.js'
export default {
  name: 'PGE_AAB_00062', // eslint-disable-line vue/name-property-casing
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
      CODE_KEYS: [ 'COD_IA_PARK_FG' ],
      codes: {
        COD_IA_PARK_FG: [],
      },
      RSWEB_MENU_TYPE_CODE: [],
      params: {
        menuId: '', 
        prodNm: '', 
        parkKindCd: '',
        salesDate: [moment(utils.now('YYYY-MM-DD')).add(-1, 'months').format('YYYY-MM-DD'), utils.now('YYYY-MM-DD')],
      },
      mData: new urDataSet(),

      opts: { // 토탈 
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
        height: 280,
        resizableColumn: true,
      },

      columnsP3T1: [
        {value: '__idx', text: 'No.', width: 40, customValue: (v) => v+1}, 
        {
          text: this.$t('MSG_TXT_PARK_FG') ,
          value: 'parkKindNm',
          width: 100,
          customValue: (value, row) => {
            const codeId = row.parkKindCd
            const code = this.codes.COD_IA_PARK_FG.find(v => v.codeId === codeId)
            const val = code ? code.codeName : ''
            return val ?? '-'
          },
        },
        { text: this.$t('MSG_TXT_PRDT_TYPE') , value: 'menuNm', width: 100,
          component: {
            props: ['row', 'value', 'text'],
            template: '<div v-html="value"/>',
          },
        },
        { text: this.$t('MSG_TXT_PRDT_NM') , value: 'prodNm' },
        { text: this.$t('MSG_TXT_PRD') , value: 'period', customValue: (v,r) => {
            return utils.dateformatToClient(r.startDtm) + ' ~ ' + utils.dateformatToClient(r.endDtm);
          }
        },
      ],

      listP3T1: [
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

    http.request(this.$options.name, 'DTS_AAC_00008', {
      query: {},
    }).then(res => {
      console.log('MENU TYPE - RES', res.data)
      this.RSWEB_MENU_TYPE_CODE = res.data
    }).catch(error => {
    });

    this.onReset();
  },
  methods: {
    onReset() {
      this.params = {
        menuId: '',
        prodNm: '',
        parkKindCd: this.pageInitialData.parkKindCd,
        salesDate: ['',''],
      }
    },
    // [검색 버튼]
    onSearch() {
     let query = {
      menuId: this.params.menuId,
      prodNm: encodeURI(this.params.prodNm),
      parkKindCd: this.params.parkKindCd,
      startDtm: this.params.salesDate[0],
      endDtm: this.params.salesDate[1],
     }

      query = Object.assign(query, this.paging)
      console.log('REQ', query)
      http.request(this.$options.name, 'DTS_AAC_00009', {
        query: query,
      }).then(res => {
        console.log('RES', res.data)
        this.mData.setData(res.data);
      }).catch(error => {
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
          utils.messageBox("alert", this.$t('MSG_ALT_NOT_SEL_ITEM')); //선택된 항목이 없습니다.       
      }
    },

    closeModalP03() {
      this.closePagePopup('Close');
    },
  },
}
</script>
<style scoped>
</style>
