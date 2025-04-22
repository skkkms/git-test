<template>
  <sui-page>
    <!-- Page Header -->
    <sui-page-header :pageId="this.$options.name" />

    <!-- Page Contents -->
    <sui-page-contents>
      <!-- Search Box -->
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_EMPL_NM')" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ session.userName }}
            </div>
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DEPT_NM')" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ session.departmentName }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_LANG')"
              :required="true"
            />
          </div>
          <div class="col-xs-5">
            <sui-lang-select
              ref="selectLNG"
              :selected="selectedCodeValue.LNG"
              :pageId="this.$options.name"
              @loaded="langLoaded"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DISP_LNG')"
              :required="true"
            />
          </div>
          <div class="col-xs-5">
            <sui-lang-select
              ref="selectDispLNG"
              :selected="selectedCodeValue.DPL"
              :pageId="this.$options.name"
              @loaded="langLoaded"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TZONE_AREA')"
              :required="true"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="selectDIV"
              :selected="selectedCodeValue.DIV"
              :pageId="this.$options.name"
              codeId="COD_TZONE_DIV"
              @list-clicked="onTimezoneSelect"
              @loaded="timezoneCodeLoaded"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TZONE_GMT')"
              :required="true"
            />
          </div>
          <div class="col-xs-5">
            <sui-custom-select
              ref="selectTMZ"
              :selected="selectedCodeValue.TMZ"
              :optionList="timezoneGMTList"
            />
          </div>
        </div>
        <!-- <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DISP_LNG')"
              :required="true"
            />
          </div>
          <div class="col-xs-3">
            <sui-lang-select
              ref="selectLNG"
              :selected="selectedCodeValue.DPL"
              :pageId="this.$options.name"
              codeId="COD_PAGE_UE"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_LOW_SPEC_YN')"
              :required="true"
            />
          </div>
          <div class="col-xs-7">
            <sui-radio
              v-model="selectedCodeValue.LSP.key"
              value="Y"
            >
              Yes
            </sui-radio>
            <sui-radio
              v-model="selectedCodeValue.LSP.key"
              value="N"
            >
              No
            </sui-radio>
          </div>
        </div> -->
        <div class="row">
          <!-- <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_CPNY_NM')" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ session.companyName }}
            </div>
          </div> -->
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_NUM_FMT')"
              :required="true"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="selectNFM"
              :selected="selectedCodeValue.NFM"
              :pageId="this.$options.name"
              codeId="COD_DGR_TYPE"
              @loaded="numberFormatLoaded"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DT_DISP')"
              :required="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ todayDateFormat}}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TENANT')"
              :required="true"
            />
          </div>
          <div class="col-xs-5">
            <sui-custom-select
              ref="selectTenant"
              :selected="selectedCodeValue.TNT"
              :optionList="tenantList"
            />
          </div>
          <div class="col-xs-1 nodata"/>
          <div class="col-xs-5 nodata" />
        </div>
      </div>
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:read="this.$options.name"
          type="button"
          class="comm_btn_border"
          @click="dtlPopupOpenOrClose"
        >
          {{ this.$t('MSG_BTN_PW_CHG') }}
        </sui-button>
        <sui-button
          v-permission:read="this.$options.name"
          type="button"
          class="comm_btn_border"
          @click="onCancelClick"
        >
          {{ this.$t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button
          v-permission:update="this.$options.name"
          type="button"
          class="comm_btn_solid"
          @click="onSaveClick"
        >
          {{ $t('MSG_BTN_SAVE') }}
        </sui-button>
      </div>
      <sui-popup
        v-model="isShownPopupDtl"
        :title="isTitle"
      >
        <p01
          :pageId="this.$options.name"
          @close="dtlPopupOpenOrClose"
        />
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>

<script>
import BasePage from '~cm/components/BasePage';
import p01 from './components/PGE_CMP_00003_P01';

export default {
  name: 'PGE_CMP_00003', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  components: {
    p01,
  },
  props: {
    closePagePopup: {
      type: Function,
      default: null,
    },
    pageInitialData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      selectedCodeValue: {
        NFM: {
          key: '#,###.##',
          label: '',
        },
        LNG: {
          key: 'ko',
          label: '',
        },
        DIV: {
          key: 'ASI',
          label: '',
        },
        TMZ: {
          key: 'TMZ_0018',
          label: '',
        },
        DPL: {
          key: 'ko',
          label: '',
        },
        LSP: {
          key: 'N',
          label: '',
        },
        TNT: {
          key: '',
          label: '',
        },
      },
      timezoneGMTList: [],
      tenantList: [],
      updateFlag: false,
      optionsLoadFlag: {
        NFM: false,
        LNG: false,
        DIV: false,
        TMZ: false,
      },
      todayDateFormat: '',
      isTitle: '',
      isShownPopupDtl: false,
    };
  },
  computed: {
    session() {
      return this.$store.getters.userInfo;
    },
    bDataLoad() {
      return this.optionsLoadFlag.NFM
          && this.optionsLoadFlag.LNG && this.optionsLoadFlag.DIV && this.optionsLoadFlag.TMZ;
    },
  },
  watch: {
    timezoneGMTList() {
      if (this.timezoneGMTList.length === 0) {
        this.$refs.selectTMZ.currentSelected = { key: '', label: '' };
      }
    },
  },
  mounted() {
    this.getAvaliableTenant();
  },
  methods: {
    afterLoaded(type) {
      this.optionsLoadFlag[type] = true;
      if (this.bDataLoad) {
        this.onPersonalizationLoad();
      }
    },
    onPersonalizationLoad() {
      const self = this;
      http.request(this.$options.name, 'DTS_CMP_00001', {
        path: {
          'user-id': this.session.userId,
        },
      }).then(res => {
        self.todayDateFormat = utils.now(this.session.dateFormat);
        utils.forEach(res.data, value => {
          self.selectedCodeValue[value.personalizationTypeCode] = { key: value.personalizationValue };
          if (utils.isEqual(value.personalizationTypeCode, 'TMZ')
            && !utils.isEqual(value.timezoneDivCode, self.selectedCodeValue.DIV.key)) {
            self.selectedCodeValue.DIV = { key: value.timezoneDivCode };
            self.timezoneGMTListLoad(value.timezoneDivCode);
          }
        });
      }).catch(error => {
        console.log(error);
      });
    },
    timezoneCodeLoaded(list) {
      this.afterLoaded('DIV');
      const [first] = list;
      //this.timezoneGMTListLoad(first.key, true);
      this.timezoneGMTListLoad(this.selectedCodeValue.DIV.key, true);
      
    },
    onTimezoneSelect(selected) {
      const code = selected.key;
      this.timezoneGMTList = [];
      this.selectedCodeValue.TMZ.key = '';
      this.timezoneGMTListLoad(code);
    },
    timezoneGMTListLoad(timezoneDivCode, loaded = false) {
      const self = this;
      http.request(this.$options.name, 'DTS_CMZ_00078', {
        path: {
          'timezone-div-code': timezoneDivCode,
        },
      }).then(res => {
        const timezoneList = [];
        utils.forEach(res.data, timezone => {
          timezoneList.push({
            key: timezone.timezoneId,
            label: timezone.timezoneName,
          });
        });
        self.timezoneGMTList = timezoneList;
        if (loaded) {
          this.afterLoaded('TMZ');
        }
      }).catch(error => {
        console.log(error);
      });
    },
    getAvaliableTenant() {
      http.request(this.$options.name, 'DTS_CMP_00151', {
      }).then(res => {
        utils.forEach(res.data, tenant => {
          this.tenantList.push({
            key: tenant.tenantId,
            label: tenant.tenantName,
          });
        });
        this.selectedCodeValue.TNT = {
          key: this.session.tenantId,
          label: '',
        };
      });
    },
    numberFormatLoaded() {
      this.afterLoaded('NFM');
    },
    langLoaded() {
      this.afterLoaded('LNG');
    },
    validation(list) {
      let validFlag = true;
      let unselected = '';
      utils.forEach(list, data => {
        if (utils.isEmpty(data.personalizationValue)) {
          validFlag = false;
          switch (data.personalizationTypeCode) {
            case 'NFM':
              unselected = this.$t('MSG_TXT_NUM_FMT');
              break;
            case 'LNG':
              unselected = this.$t('MSG_TXT_LANG');
              break;
            case 'TMZ':
              unselected = this.$t('MSG_TXT_TZONE_GMT');
              break;
            case 'DPL':
              unselected = this.$t('MSG_TXT_DISP_LNG');
              break;
            default:
              break;
          }
        }
      });
      return { validFlag, unselected };
    },
    onSaveClick() {
      const saveList = [];
      const { userId } = this.session;
      utils.forEach(this.selectedCodeValue, (value, key) => {
        if (!utils.isEqual(key, 'DIV')) {
          saveList.push({
            userId,
            personalizationTypeCode: key,
            personalizationValue: value.key,
          });
        }
      });
      const result = this.validation(saveList);
      if (result.validFlag) {
        http.request(this.$options.name, 'DTS_CMP_00003', {
          path: {
            'user-id': userId,
          },
          data: saveList,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, this.onSuccessClose);
        }).catch(error => {
          console.log(error);
        });
      } else {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), result.unselected));
      }
    },
    onSuccessClose() {
      this.closePagePopup('success');
    },
    onCancelClick() {
      this.closePagePopup('');
    },
    dtlPopupOpenOrClose() {
      this.isTitle = this.$t('MSG_BTN_PW_CHG'); // 비밀번호 변경
      this.isShownPopupDtl = !this.isShownPopupDtl;
      return true;
    }
  },
};
</script>

<style scoped>
</style>
