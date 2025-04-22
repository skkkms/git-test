<template>
  <sui-page>
    <!-- Page Header -->
    <sui-page-header :pageId="this.$options.name" />

    <!-- Page Contents -->
    <sui-page-contents>
      <div class="comm_view_wrap">
        <div class="comm_ListTB">
          <table
            width="100%"
            border="0"
          >
            <colgroup>
              <col width="100px">
              <col width>
              <col width="70px">
              <!-- <col width>
              <col width="100px"> -->
              <col width="110px">
            </colgroup>
            <tbody>
              <tr>
                <th>{{ this.$t('MSG_TXT_LANG') }}</th>
                <th colspan="2">
                  {{ this.$t('MSG_TXT_MLNG_CNTN') }}
                </th>
                <!-- <th colspan="2">
                  {{ this.$t('MSG_TXT_MLNG_ABB_CNTN') }}
                </th> -->
                <th>{{ this.$t('MSG_TIT_BK_APPLY') }}</th>
              </tr>
              <tr
                v-for="(itm,index) in mlngList"
                :key="index"
              >
                <td>{{ itm.langName }}</td>
                <td>
                  <sui-text-field
                    v-model="itm.multiLanguageContent"
                    width="100px"
                    :disabled="disabled"
                    :readonly="readonly"
                    :maxlength="maxlength"
                  />
                </td>
                <td>
                  <sui-button
                    type="button"
                    class="comm_sbtn_border"
                    @click="onButtonMoreClick1(itm)"
                  >
                    {{ getButtonLabel() }}
                  </sui-button>
                </td>
                <!-- <td>
                  <sui-text-field
                    v-model="itm.multiLanguageAbbreviationContent"
                    :disabled="disabled"
                    :readonly="readonly"
                  />
                </td>
                <td>
                  <sui-button
                    type="button"
                    class="comm_sbtn_border"
                    @click="onButtonMoreClick2(itm)"
                  >
                    {{ getButtonLabel() }}
                  </sui-button>
                </td> -->
                <td>
                  <sui-button
                    v-if="itm.langId==globalLangId && readonly === false && disabled === false"
                    type="button"
                    class="comm_btn_border_Prime"
                    @click="onClickBkApplyBtn"
                  >
                    {{ $t('MSG_TIT_BK_APPLY') }}
                  </sui-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          v-if="disabled === false && readonly === false"
          type="button"
          class="comm_btn_border"
          @click="onCancel"
        >
          {{ $t("MSG_BTN_CANCEL") }}
        </sui-button>
        <sui-button
          v-permission:create="'PGE_CMZ_00008'"
          type="button"
          class="comm_btn_solid"
          @click="onSave"
        >
          {{ $t("MSG_BTN_SAVE") }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>

// import - libraries (node modules)
import Vue from 'vue';
// import - local files (js, vue, ...)
import Checkbox from '~common/components/form/SuiCheckbox/SuiCheckbox';
// 페이지 에서 사용하는 code 목록 기술
export default {
  name: 'PGE_CMZ_00008', // eslint-disable-line vue/name-property-casing
  props: {
    closePagePopup: {
      type: Function,
      required: true,
    },
    pageInitialData: {
      type: Object,
      default() {
        return {
          readonly: false,
          disabled: false,
        };
      },
    },
  },
  data() {
    return {
      // 로컬 언어 ID
      localLangId: {
        type: String,
        required: true,
        default() {
          return 'ko';
        },
      },
      // 글로벌 언어 ID
      globalLangId: {
        type: String,
        required: true,
        default() {
          return 'en';
        },
      },
      // 조회 모드( 편집 안됨)
      disabled: false,
      readonly: false,
      // 다국어 object array
      mlngList: [],
      savedData: [],
      oldData: [],
      maxlength: 1000,
    };
  },
  mounted() {
    // 로컬 언어 ID
    this.localLangId = this.$store.getters.userInfo.langId;
    // 글로벌 언어 ID
    this.globalLangId = this.$store.getters.userInfo.globalLangId;
    // 주로 데이터 패치 등을 함
    this.disabled = this.pageInitialData.disabled || false;
    this.readonly = this.pageInitialData.readonly || false;
    // field maxlength
    if (this.pageInitialData.maxlength) {
      this.maxlength = this.pageInitialData.maxlength;
    };
    this.loadData();
  },
  methods: {
    getButtonLabel() {
      let _label = this.$t('MSG_BTN_EDIT');
      if (this.pageInitialData.disabled || this.pageInitialData.readonly) {
        _label = this.$t('MSG_BTN_VIEW');
      }
      return _label;
    },
    /**
     * 다국어 값 변경 팝업
     */
    onButtonMoreClick1(itm) {
      const _disabled = this.pageInitialData.disabled || this.pageInitialData.readonly;
      utils.openTextAreaEditor(chgVal => {
        if (chgVal != null) {
          itm.multiLanguageContent = chgVal;
        }
      },
      {
        title: `${itm.langName}-${this.$t('MSG_TXT_MLNG_CNTN')}`,
        size: 'sm',
        pageInitialData: {
          value: itm.multiLanguageContent,
          maxlength: 1000,
          readonly: _disabled,
          positiveButtonText: this.$t('MSG_BTN_CFRM'),
          negativeButtonText: this.$t('MSG_BTN_CANCEL'),
        },
      });
    },
    /**
     * 다국어 약어 변경 팝업
     */
    onButtonMoreClick2(itm) {
      const _disabled = this.pageInitialData.disabled || this.pageInitialData.readonly;
      utils.openTextAreaEditor(chgVal => {
        if (chgVal != null) {
          itm.multiLanguageAbbreviationContent = chgVal;
        }
      },
      {
        title: `${itm.langName}-${this.$t('MSG_TXT_MLNG_ABB_CNTN')}`,
        size: 'sm',
        pageInitialData: {
          value: itm.multiLanguageAbbreviationContent,
          readonly: _disabled,
        },
      });
    },
    /**
     * 일괄적용버튼 click event handler
     * 다국어 값들 중 비어있는 값과 약어에 현재 Global 언어로 셋팅된 값을 일괄 복사
     * local 언어로 설정된 값은 복사대상이 아님
     * @function onClickBkApplyBtn
     * @returns {Array} : 다국어 Object Array
     */
    onClickBkApplyBtn() {
      // let _multiLanguageContent = '';
      // let _multiLanguageAbbreviationContent = '';
      // // Global 언어 값 가져오기
      // for (let i = 0; i < this.mlngList.length; i++) {
      //   if (this.mlngList[i].langId == this.globalLangId) {
      //     _multiLanguageContent = this.mlngList[i].multiLanguageContent;
      //     _multiLanguageAbbreviationContent = this.mlngList[i].multiLanguageAbbreviationContent;
      //     break;
      //   }
      // }
      //
      // // local 언어가 아닌 언어값이 비어있을 경우 Global 언어 값 쓰기
      // const that = this;
      // this.mlngList.forEach(curItm => {
      //   if (curItm.langId != that.globalLangId) {
      //     if (utils.isEmpty(curItm.multiLanguageContent)) {
      //       curItm.multiLanguageContent = _multiLanguageContent;
      //     }
      //     if (utils.isEmpty(curItm.multiLanguageAbbreviationContent)) {
      //       curItm.multiLanguageAbbreviationContent = _multiLanguageAbbreviationContent;
      //     }
      //   }
      // });

      const multiLangObj = utils.find(this.mlngList, { langId: this.globalLangId });
      utils.forEach(this.mlngList, item => {
        if (item.langId === this.localLangId) {
          if (utils.isEmpty(item.multiLanguageContent)) {
            item.multiLanguageContent = multiLangObj.multiLanguageContent;
          }
          if (utils.isEmpty(item.multiLanguageAbbreviationContent)) {
            item.multiLanguageAbbreviationContent = multiLangObj.multiLanguageAbbreviationContent;
          }
        } else {
          item.multiLanguageContent = multiLangObj.multiLanguageContent;
          item.multiLanguageAbbreviationContent = multiLangObj.multiLanguageAbbreviationContent;
        }
      });

    },
    loadData() {
      // get contents data, grid etc..
      http.request(this.$options.name, 'DTS_CMY_00001').then(res => {
        const langData = [];
        utils.forEach(res.data, item => {
          langData.push(
            {
              langName: item.langName,
              langId: item.langId,
              multiLanguageContent: '',
              multiLanguageAbbreviationContent: '',
              multiLanguageId: this.pageInitialData.multiLanguageId,
              multiLanguageTypeCode: this.pageInitialData.multiLanguageType,
              batchApply: false,
            },
          );
        });

        if (utils.isEmpty(this.pageInitialData.multiLanguageContent) === false) {
          const idx = utils.findIndex(langData, { langId: this.pageInitialData.langId });
          if (idx > -1) {
            langData[idx].multiLanguageContent = this.pageInitialData.multiLanguageContent;
          }
        }

        // this.dsData.setRawData(langData);
        this.mlngList = langData;

        if (utils.isEmpty(this.pageInitialData.multiLanguageContent) === true) {
          this.searchData();
        }
      }).catch(error => {
        console.log(error);
      });
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
    onClose() {
      console.log('onConfirm');
    },
    searchData() {
      const pathParams = {
        'multi-languages-id': this.pageInitialData.multiLanguageId,
      };

      http.request(this.$options.name, 'DTS_CMZ_00023', {
        path: pathParams,
        query: {
          tenantId: '',
        },        
      }).then(res => {
        if (res.data.length > 0) {
          const items = [];
          utils.forEach(this.mlngList, data => {
            items.push({
              langName: data.langName,
              langId: data.langId,
              multiLanguageContent: data.multiLanguageContent,
              multiLanguageAbbreviationContent: data.multiLanguageAbbreviationContent,
              multiLanguageId: data.multiLanguageId,
              multiLanguageTypeCode: data.multiLanguageType,
              batchApply: data.batchApply,
            });
          });

          utils.forEach(res.data, item => {
            const idx = utils.findIndex(items, { langId: item.langId });
            if (idx > -1) {
              items[idx].multiLanguageContent = item.multiLanguageContent;
              items[idx].multiLanguageAbbreviationContent = item.multiLanguageAbbreviationContent;
            }
          });

          //this.dsData.setRawData(items);
          this.mlngList = items;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    setBatchApply(checked, multiLanguageContent, multiLanguageAbbreviationContent) {
      if (checked === true) {
        this.oldData = [];
        utils.forEach(this.mlngList, data => {
          const dataInfo = {
            langName: data.langName,
            langId: data.langId,
            multiLanguageContent: data.multiLanguageContent,
            multiLanguageAbbreviationContent: data.multiLanguageAbbreviationContent,
            multiLanguageId: data.multiLanguageId,
            multiLanguageTypeCode: data.multiLanguageTypeCode,
            batchApply: data.batchApply,
          };
          this.oldData.push(dataInfo);
        });

        const items = [];
        utils.forEach(this.mlngList.data, data => {
          if (data.langId !== this.localLangId) {
            if (data.langId !== this.globalLangId) {
              if (utils.isEmpty(data.multiLanguageContent)
                  && utils.isEmpty(data.multiLanguageAbbreviationContent)) {
                items.push({
                  langName: data.langName,
                  langId: data.langId,
                  multiLanguageContent,
                  multiLanguageAbbreviationContent,
                  multiLanguageId: data.multiLanguageId,
                  multiLanguageTypeCode: data.multiLanguageTypeCode,
                  batchApply: true,
                });
              } else {
                items.push(data);
              }
            } else {
              items.push(data);
            }
          } else {
            items.push(data);
          }
        });

        //this.dsData.setRawData(items);
        this.mlngList = items;
      } else {
        // this.dsData.setRawData(this.oldData);
        this.mlngList = this.oldData;
      }
    },
    setParamList(data) {
      let dataParams = '';
      let multiLangId = '';
      let languageId = '';
      let languageName = '';
      let content = '';
      let abbContent = '';
      let typeCode = '';

      if (data.langName) {
        languageName = data.langName;
      }

      if (data.langId) {
        languageId = data.langId;
      }

      if (data.multiLanguageContent) {
        content = data.multiLanguageContent;
      }

      if (data.multiLanguageAbbreviationContent) {
        abbContent = data.multiLanguageAbbreviationContent;
      }

      if (data.multiLanguageId) {
        multiLangId = data.multiLanguageId;
      }

      if (data.multiLanguageTypeCode) {
        typeCode = data.multiLanguageTypeCode;
      }

      if ((content) || (abbContent)) {
        dataParams = {
          multiLanguageId: multiLangId || '',
          langId: languageId || '',
          langName: languageName || '',
          multiLanguageTypeCode: typeCode || '',
          multiLanguageTypeName: '',
          multiLanguageContent: content || '',
          multiLanguageAbbreviationContent: abbContent || '',
        };
      }
      return dataParams;
    },
    onSave() {
      const paramList = [];
      this.savedData = [];
      utils.forEach(this.mlngList, data => {
        const dataParams = this.setParamList(data);
        if (dataParams) {
          paramList.push(dataParams);
          this.savedData.push(dataParams);
        }
      });

      if (paramList.length > 0) {
        http.request(this.$options.name, 'DTS_CMZ_00025', {
          path: { 'multi-languages-id': this.pageInitialData.multiLanguageId },
          data: paramList,
        }).then(() => {
          this.closePagePopup(this.savedData);
        }).catch(error => {
          console.log(error);
        });
      } else {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_CONFIRM'), this.$t('MSG_TXT_MLNG_CNTN'));
        this.conFirm('error', msg, null);
      }
    },
    onCancel() {
      this.closePagePopup('');
    },
  },
};
</script>
<style scoped>
</style>
