<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
      <sui-page-contents>
      <div>
        <!-- [일별큐레이션] 일괄등록 -->
        <template slot="title">
          <div class="modal-title mb45">
            {{ $t('MSG_TIT_IAA_C12') }}
          </div>
        </template>
        <template>
          <div class="modal-body">
            <ur-form-box toggleable>
              <!-- [검색조건] 기준일자 -->
              <ur-form-item
                :label="$t('MSG_TXT_STNDR_DT')"
                :label-align="'right'"
                required
                style="width: 100%; height: auto;"
              >
                <ur-date-picker
                  v-model="params.salesDate"
                  input-type="YYYY-MM-DD"
                  model-type="YYYYMMDD"
                  init="today"
                  :confirm-label="$t('MSG_BTN_SELT')"
                  :today-label="$t('MSG_BTN_TODAY')"
                />
              </ur-form-item>
              <!-- [검색조건] 퍼소나유형 -->
              <ur-form-item
                :label="$t('MSG_TIT_PERSON_TYPE_T')"
                :label-align="'right'"
                required
                style="width: 100%; height: auto;"
                class="flex_wrap"
              >
                <ur-text-field
                  v-model="params.personaSelect"
                  :readonly="true"
                  style="width: 50%;"
                />
                <ur-icon-button
                  icon="search"
                  icon-type="line"
                  color="primary"
                  @click="openPersonaPopup"
                />
              </ur-form-item>
              <!-- [검색조건] 생성일자 -->
              <ur-form-item
                :label="$t('MSG_TXT_CRT_DATE')"
                :label-align="'right'"
                required
                style="width: 100%; height: auto;"
              >
                <ur-range-picker
                  v-model="params.createDate"
                  input-type="YYYY-MM-DD"
                  model-type="YYYYMMDD"
                  :confirm-label="$t('MSG_BTN_SELT')"
                  :clear-label="$t('MSG_BTN_RESET')"
                  clearable
                />
              </ur-form-item>
            </ur-form-box>
            <span class="subscript_txt">*기준일자에 적용되어 있는 큐레이션 정보가 선택한 생성일자로 동일하게 생성됩니다.</span>
          </div>
        </template>
        <template>
          <div class="comm_btn_wrap">
            <div class="right_box">
              <ur-button @click="closeModal">
                {{ $t('MSG_BTN_CLOSE') }}
              </ur-button>
              <ur-button color="violet" @click="onSave">
                {{ $t('MSG_BTN_SVE') }}
              </ur-button>
            </div>
          </div>
        </template>
      </div>
    </sui-page-contents>
  </sui-page>
</template>

<script>
export default {
  name: 'PGE_AAB_00050', // eslint-disable-line vue/name-property-casing
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
      paramsList: [],
      params: {
        personaId: '',
        personaSelect: '',
        salesDate: '',
        createDate: '',
        parkKindCd: '',
      },
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
    this.params.parkKindCd = this.pageInitialData.parkKindCd;
  },
  methods: {
    onSave() {
      this.paramsList.forEach((sItem) => {
        sItem.createStartDate = this.params.createDate[0]
        sItem.createEndDate = this.params.createDate[1]
        sItem.salesDate = this.params.salesDate
      })

      // 유호성 체크
      if (utils.isEmpty(this.params.salesDate)) {
        utils.messageBox('warning', this.$t('MSG_TXT_START_DT_NO')) // 기준일자가 선택되지 않았습니다.
        return
      }
      if (utils.isEmpty(this.params.personaSelect)) {
        utils.messageBox('warning', this.$t('MSG_TXT_NOT_SELECTED_PERSON')) // 퍼소나가 등록되지 않았습니다.
        return
      }
      if (utils.isEmpty(this.params.createDate[0]) || utils.isEmpty(this.params.createDate[1])) {
        utils.messageBox('warning', this.$t('MSG_TXT_CRT_NO')) // 생성일자가 선택되지 않았습니다.
        return
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_IS_SAV_DATA'), null, () => { // 저장하시겠습니까?
        http.request(this.$options.name, 'DTS_AAC_00025', {
          query: {},
          path: {},
          data: this.paramsList,
        }).then(res => {
          if (res.data.resultCode === '1') {
            utils.messageBox('warning', res.data.msg);
            this.closePagePopup('NEED_REFRESH');
          } else {
            utils.messageBox('warning', this.$t('MSG_TXT_DY_PERSON_EMPTY')); // 지정한 기준일자에 해당 퍼소나 유형은 반영할 정보가 없습니다.
          }
        }).catch(error => {
          console.log(error);
        });
      });
    },
    setPesonaId(selected) {
      this.paramsList = []
      this.params.personaSelect = ''

      if (!utils.isEmpty(selected)) {
        if (selected instanceof Array) {
          selected.forEach((sItem) => {
            let tempItem = {}
            tempItem.personaId = sItem.personaId
            tempItem.personaSelect = sItem.companaionNm + "," + sItem.playTypeNm
            tempItem.createStartDate = this.params.createDate[0]
            tempItem.createEndDate = this.params.createDate[1]
            tempItem.parkKindCd = this.pageInitialData.parkKindCd
            tempItem.salesDate = this.params.salesDate

            this.paramsList.push(tempItem)

            this.params.personaSelect += (tempItem.personaSelect + ';')
          })
        } else {
          let tempItem = {}
          tempItem.personaId = selected.personaId
          tempItem.personaSelect = selected.companaionNm + "," + selected.playTypeNm
          tempItem.createStartDate = this.params.createDate[0]
          tempItem.createEndDate = this.params.createDate[1]
          tempItem.parkKindCd = this.pageInitialData.parkKindCd
          tempItem.salesDate = this.params.salesDate

          this.paramList.push(tempItem)

          this.params.personaSelect = tempItem.personaSelect
        }
      }
    },
    openPersonaPopup() {
      utils.openLayerPopup('PGE_AAB_00044', this.setPesonaId, {
        pageInitialData: {
          parkKindCd: this.pageInitialData.parkKindCd,
          multiSelect: true,
        },
      });
    },
    closeModal() {
      this.closePagePopup('Close');
    },
  },
}
</script>
<style scoped>
</style>
