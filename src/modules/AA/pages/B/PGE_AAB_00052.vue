<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div> 
        <template slot="title">
          <!-- [콘텐츠 관리] 시설 -->
          <div class="modal-title mb45">
            {{ $t('MSG_TIT_IAA_C05') }}
          </div>
        </template>
        <template>
          <div class="modal-body">
            <!-- [검색조건] 시설 카테고리 --> 
            <ur-form-box toggleable>
              <ur-form-item
                :label="$t('MSG_TXT_FACILT_CATEGORY')"
                :label-align="'right'"
                style="width: 50%; height: auto;"
                class="flex_wrap"
              >
                <ur-dropdown
                  v-model="saveFacilt.faciltCateKindCd"
                  :items="COD_IA_FACILT_CATE_KIND" 
                  no-select="no-select"
                  :msg-no-select="$t('MSG_TXT_ALL')"
                />
              </ur-form-item>
              <!-- [검색조건] 시설명-->
              <ur-form-item
                :label="$t('MSG_TXT_FACILT_NAME')"
                :label-align="'right'"
                style="width: 50%; height: auto;"
                class="flex_wrap"
              >
                <ur-text-field
                  v-model="saveFacilt.faciltName"
                  @keyup.enter="onSearch"
                  style="width: 100%;"
                  maxlength="100"
                />
              </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
              <div class="right_box">
                <!-- [벼튼] 초기화 -->
                <ur-button @click="onReset">
                  {{ $t('MSG_BTN_RESET') }}
                </ur-button>
                <!-- [벼튼] 검색 -->
                <ur-button color="violet" @click="onSearch">
                  {{ $t('MSG_BTN_SEARCH') }}
                </ur-button>
              </div>
            </div>
          </div>
        </template>
        <template>
          <ur-data-grid
            ref="grid"
            :headers="columnsP2T1"
            :data-source="mData"
            :options="opts"
            :data-set-options="{id: 'id'}"
            @grid:row-dbl-click = "fnGridRowDblClick"
          />
        </template>
        <template>
          <div class="comm_btn_wrap bt1">
            <div class="right_box mt10">
              <!-- [벼튼] 닫기 -->
              <ur-button @click="closeModalP02">
                {{ $t('MSG_BTN_CLOSE') }}
              </ur-button>
              <!-- [벼튼] 선택 -->
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
  name: 'PGE_AAB_00052', // eslint-disable-line vue/name-property-casing
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
      CODE_KEYS: ['COD_IA_EL_FACILT_CATE_KIND', 'COD_IA_EL_ZONE_KIND','COD_IA_CB_FACILT_CATE_KIND', 'COD_IA_CB_ZONE_KIND'],
      codes: {
        COD_IA_EL_FACILT_CATE_KIND: [],
        COD_IA_EL_ZONE_KIND: [],
        COD_IA_CB_FACILT_CATE_KIND: [],
        COD_IA_CB_ZONE_KIND: [],
      },
      saveFacilt: {
        faciltCateKindCd: '', // 시설 카테고리
        faciltName: '', // 시설명
      },
      gridList: [],
      localdata0: [],
      mData: new urDataSet(),

      valueP2D1: '1',
      opts: { // 토탈 
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
        height: 280,
        resizableColumn: true, 
      },
      columnsP2T1: [
        {value: '__idx', text: 'No.', width: 100, customValue: (v) => v+1}, 
        { text: this.$t('MSG_TXT_FACILT_NAME'), value: 'faciltName', customValue:(v)=>v?v:'-', },
        { text: this.$t('MSG_TXT_FACILT_CATEGORY'), value: 'faciltCateKindNms' },
        { text: this.$t('MSG_TXT_ZONE_GB'), value: 'zoneKindNm', customValue:(v)=>v?v:'-', },
        { text: this.$t('MSG_TXT_PUBLCT_YN'), value: 'exposrYn', customValue:(v)=>v?v:'-', },

      ], 
    }
  },
  computed: { 
    // 계산된 속성, date pickproperty로 사용가능
    COD_IA_FACILT_CATE_KIND() {
      if (this.pageInitialData.parkKindCd === '02') return this.codes.COD_IA_CB_FACILT_CATE_KIND
      return this.codes.COD_IA_EL_FACILT_CATE_KIND
    },
    COD_IA_ZONE_KIND() { 
      if (this.pageInitialData.parkKindCd === '02') return this.codes.COD_IA_CB_ZONE_KIND
      return this.codes.COD_IA_EL_ZONE_KIND
    },
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
        this.saveFacilt.faciltCateKindCd = '';
        this.saveFacilt.faciltName = '';
    },
    onSearch() {
      const queryParams = {
        faciltName: '', 
        faciltCateKindCd: '', 
        parkKindCd: '',
      }
      queryParams.faciltCateKindCd = this.saveFacilt.faciltCateKindCd;
      queryParams.faciltName = encodeURI(this.saveFacilt.faciltName);
      queryParams.parkKindCd = this.pageInitialData.parkKindCd;

      http.request(this.$options.name, 'DTS_AAC_00007', {
        query: queryParams,
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
      }
    },
    
    closeModalP02() {
      this.closePagePopup('Close');
    },
  },
}
</script>
<style scoped>
</style>
