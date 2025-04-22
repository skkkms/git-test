<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div> 
        <template slot="title">
          <!-- [ 콘텐츠 관리] 코스 -->
          <div class="modal-title mb45">
            <h4>{{ $t('MSG_TIT_IAA_C04') }}</h4>
          </div>
        </template>
        <template>
          <div class="modal-body">
            <!-- [검색조건] 동반인 -->
            <ur-form-box toggleable>
              <ur-form-item
                :label="$t('MSG_TXT_COMPANAION')"
                :label-align="'right'"
                style="width: 50%; height: auto;"
                class="flex_wrap"
              >
                <ur-dropdown
                  v-model="frame0.companaionCd"
                  :items="COD_IA_COMPANAION"
                  no-select="no-select"
                  :msg-no-select="$t('MSG_TXT_ALL')"
                />
              </ur-form-item>
              <!-- [검색조건] 놀이유형 -->
              <ur-form-item
                :label="$t('MSG_TXT_PLAY_TYPE')"
                :label-align="'right'"
                style="width: 50%; height: auto;"
                class="flex_wrap"
              >
                <ur-dropdown
                  v-model="frame0.playTypeCd"
                  :items="COD_IA_PLAY_TYPE"
                  no-select="no-select"
                  :msg-no-select="$t('MSG_TXT_ALL')"
                />
              </ur-form-item>
              <!-- [검색조건] 코스ID/코스명 -->
              <ur-form-item
                class="flex_wrap"
                :label="$t('MSG_TXT_COS_ID')"
                :label-align="'right'"
                style="width: 100%; height: auto;"
              >
                <ur-radio
                  v-model="frame0.courseType"
                  value="courseId"
                  sm
                >
                   {{ $t('MSG_TXT_COS_ID') }}
                </ur-radio>
                <ur-radio
                  v-model="frame0.courseType"
                  value="courseNm"
                  sm
                >
                   {{ $t('MSG_TXT_COS_NM') }}
                </ur-radio>
                <ur-text-field
                  v-model="frame0.courseValue"
                  @keyup.enter="onSearch"
                  style="width: 70%;"
                  maxlength="100"
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
              :headers="columnsP1T1"
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
              <ur-button @click="closeModal">
                 {{ $t('MSG_BTN_CLOSE') }}
              </ur-button>
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
  name: 'PGE_AAB_00045', // eslint-disable-line vue/name-property-casing
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
      CODE_KEYS: ['COD_IA_COMPANAION_EL', 'COD_IA_COMPANAION_CBN', 'COD_IA_PLAY_TYPE_EL', 'COD_IA_PLAY_TYPE_CB'],
      codes: {
        COD_IA_COMPANAION_EL: [],
        COD_IA_PLAY_TYPE_EL: [],
        COD_IA_COMPANAION_CBN: [],
        COD_IA_PLAY_TYPE_CB: [],
      },
      frame0: {
          parkKindCd: '',
          companaionCd: '',
          playTypeCd:'',
          courseType:'courseId',
          courseValue: '',
      },
      mData: new urDataSet(),

      opts: { // 토탈 O
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
        height: 280,
        resizableColumn: true, 
      },

      columnsP1T1: [
        {value: '__idx', text: 'No.', width: 40, customValue: v => v+1}, 
        { text: this.$t('MSG_TXT_COS_NM'), value: 'courseName' },
        { text: this.$t('MSG_TXT_COS_ID'), value: 'courseId', width: 170 },
        { text: this.$t('MSG_TXT_COMPANAION'), value: 'companaionNm', width: 100 },
        { text: this.$t('MSG_TXT_PLAY_TYPE'), value: 'playTypeNm', width: 170},
        {
          text: this.$t('MSG_TXT_FACILT_CNTN'),
          value: 'faciltNms', 
          customValue: faciltNms => {
            let faciltNmsList = []
            if (!utils.isEmpty(faciltNms)) {
              faciltNmsList = faciltNms.split(',')
            }
            let newFaciltNms = ''
            if (faciltNmsList.length > 3) {
              faciltNmsList = faciltNmsList.slice(0,3)
              newFaciltNms = faciltNmsList.toString() + '...'
            } else {
              newFaciltNms = faciltNms
            }
            return newFaciltNms
          },
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    COD_IA_COMPANAION() {
      if (this.pageInitialData.parkKindCd === '02') return this.codes.COD_IA_COMPANAION_CBN
      return this.codes.COD_IA_COMPANAION_EL
    },
    COD_IA_PLAY_TYPE() { 
      if (this.pageInitialData.parkKindCd === '02') return this.codes.COD_IA_PLAY_TYPE_CB
      return this.codes.COD_IA_PLAY_TYPE_EL
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
     http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes);
     this.onReset();
  },
  methods: {
    onReset() {
        this.frame0.companaionCd = '';
        this.frame0.playTypeCd = '';
        this.frame0.courseType = 'courseId';
        this.frame0.courseValue = ''; 
    },

    onSearch() {
      const queryParams = {
        companaionCd: '',
      }
      queryParams.companaionCd = this.frame0.companaionCd;
      queryParams.playTypeCd = this.frame0.playTypeCd;
      queryParams.parkKindCd = this.pageInitialData.parkKindCd;

      if (this.frame0.courseType == 'courseId') {
        queryParams.courseId = encodeURI(this.frame0.courseValue);
      } else if (this.frame0.courseType == 'courseNm') {
        queryParams.courseName = encodeURI(this.frame0.courseValue);
      }

      // [검색]
      http.request(this.$options.name, 'DTS_AAC_00006', {
        query: queryParams,
      }).then(res => {
        this.mData.setData(res.data);
      }).catch(error => {
         console.log(error);
      });
    },

    selectiModal() {
      const row = this.$refs.grid.getSelected()
      if (row) {
        if (row.exposrYn === 'Y') {
          this.closePagePopup(row)
        } else {
          utils.messageBox('confirm', this.$t('해당 코스는 비노출 상태입니다.'), null, () => { // 해당 코스는 비노출 상태입니다.
            this.closePagePopup(row)
          })
        }
      } else {
        utils.messageBox("warning", this.$t('MSG_ALT_NOT_SEL_ITEM')); //선택된 항목이 없습니다.
      }
    },

    fnGridRowDblClick(row, event) {
      if (row) {
        if (row.exposrYn === 'Y') {
          this.closePagePopup(row)
        } else {
          utils.messageBox('confirm', this.$t('해당 코스는 비노출 상태입니다.'), null, () => { // 해당 코스는 비노출 상태입니다.
            this.closePagePopup(row)
          })
        }
      } else {
        utils.messageBox("warning", this.$t('MSG_ALT_NOT_SEL_ITEM')); //선택된 항목이 없습니다.
      }
    },
    
    closeModal() {
      this.closePagePopup('Close');
    },
  },
}
</script>
<style scoped>
</style>
