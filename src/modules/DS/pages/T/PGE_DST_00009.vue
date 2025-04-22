<!-- eslint-disable eqeqeq -->
<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_PRHB_WRD')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              id="nameId"
              v-model.trim="forbiddenWord"
              placeholder=""
              maxlength="100"
              @keyup.enter="onSearchProhibitedWords"
            />
          </div>
          <div class="btn_wrap">
            <sui-button
              type="button"
              class="comm_btn_Reset"
              @click="resetFields"
            >
              {{ $t('MSG_BTN_RESET') }}
            </sui-button>
            <sui-button
              v-permission:read="'PGE_DST_00009'"
              type="button"
              class="comm_btn_Scr"
              @click="onSearchProhibitedWords()"
            >
              {{ $t('MSG_BTN_SEARCH') }}
            </sui-button>
          </div>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="grid"
        :headers="gridColumns0"
        :data-source="dataset0"
        :showRowsPerPageControl="false"
        :initialRowsPerPage="10"
        width="100%"
        @grid:selected="onSelectRow"
      >
        <template #right-info>
          <div class="btn_wrapR">
            <ur-button
              v-permission:download="'PGE_DST_00009'"
              type="button"
              class="comm_btn_gridTop comm_ico_excel"
              small
              @click="onDownloadExcel"
            >
              {{ $t(' MSG_BTN_EXCEL_DOWN') }}
            </ur-button>
          </div>
        </template>
      </sui-s-grid>
      <div class="mrB30" />
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :required="true"
              :label="$t('MSG_TXT_PRHB_WRD')"
              :vertical="false"
            />
          </div>

          <div class="col-xs-5">
            <sui-text-field
              v-model.trim="forbiddenWordText"
              placeholder=""
              default
              value
              :disabled="isProhibFieldDisabled"
              :clearable="true"
              :readonly="false"
              required
            />

            <div class="comp_spacing" />
            <sui-button
              type="button"
              class="comm_btn_duplicate"
              :disabled="isDupcheckEnabled"
              @click="onCheckDuplication"
            />
          </div>
          <div class="col-xs-1 nodata" />
          <div class="col-xs-5" />
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :required="true"
              :label="$t('MSG_TXT_DESC')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            <textarea
              v-model.trim="content"
              required
            />
          </div>
        </div>
      </div>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onNewWordConfirm()"
        >
          {{ $t('MSG_BTN_NEW') }}
        </sui-button>
        <sui-button
          v-permission:delete="'PGE_DST_00009'"
          type="button"
          class="comm_btn_border"
          :disabled="isDeleteDisabled"
          @click="onDeleteData()"
        >
          {{ $t('MSG_BTN_DEL') }}
        </sui-button>
        <sui-button
          v-permission:update="'PGE_DST_00009'"
          type="button"
          class="comm_btn_solid"
          :disabled="isNewClick"
          @click="onSaveConfirm"
        >
          {{ $t('MSG_BTN_SAVE') }}
        </sui-button>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index';

export default {
  // eslint-disable-next-line vue/name-property-casing
  name: 'PGE_DST_00009',
  data() {
    return {
      // eslint-disable-next-line new-cap
      dataset0: new urDataSet(),
      forbiddenWord: '',
      content: '',
      forbiddenWordText: '',
      isProhibFieldDisabled: true,
      isRowSelect: true,
      duplicateCheckFlag: 100,
      deleteForbidden: '',
      isNewClick: true,
      isDupcheckEnabled: true,
      noRegisteredData: false,
      isduplicateCheck: true,
      isDeleteDisabled: true,
      isNewButtonClicked: false,
      selectedCodeValue: {
        COD_MDLE: {
          label: '',
          key: '',
        },
      },
      localdata0: [],
      gridColumns0: [
        {
          text: this.$t('MSG_TXT_PRHB_WRD'),
          value: 'prohibitionWordName',
          width: 350,
        },
        {
          text: this.$t('MSG_TXT_DESC'),
          value: 'prohibitionWordContent',
        },
      ],
    };
  },
  computed: {},
  watch: {},
  mounted() {},

  methods: {

    /* @Description: This function reset the field value
     */
    resetFields() {
      this.forbiddenWord = '';
      const emptyArray = [];
      this.dataset0.setData(emptyArray);
    },

    /* @description: This function search the value based on prohibited word
     */
    onSearchProhibitedWords() {
      if (utils.isExistSpecialChar(this.forbiddenWord) == true) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
        return;
      }
      let queryParams;
      // eslint-disable-next-line prefer-const
      queryParams = { prohibitionWordName: this.forbiddenWord.trim() };
      http.request(this.$options.name, 'DTS_DST_00057', {
        query: queryParams,
      })
        .then(res => {
          this.dataset0.setData(res.data);
          this.localdata0 = res.data;
          this.gridColumns0.localdata0 = [];
          this.dataset0.setData(this.localdata0);
          this.isNewClick = true;
          this.isDeleteDisabled = true;
          this.isDupcheckEnabled = true;
          this.isduplicateCheck = true;
          this.isProhibFieldDisabled = true;
          this.forbiddenWordText = '';
          this.content = '';
        });
    },

    /* @Description : This function download the excel file
     */
    onDownloadExcel() {
      const queryParams = { prohibitionWord: this.forbiddenWord.trim() };
      http.request('PGE_DST_00009', 'DTS_DST_00058', {
        path: {
          'page-id': 'PGE_DST_00009',
        },
        query: queryParams,
        responseType: 'arraybuffer',
      })
        .then(res => {
          const fileName = 'export-excel.xlsx';
          utils.downloadBlob(res, fileName);
        });
    },

    /* @description: This function selected the row and populated the data inside the grid below
     */
    onSelectRow(rowselected) {
      if (rowselected == undefined) return;
      this.isNewClick = false;
      this.isDeleteDisabled = false;
      this.isNewButtonClicked = false;
      this.isDupcheckEnabled = true;
      this.isProhibFieldDisabled = true;

      if (rowselected.rowindex != -1) {
        this.forbiddenWordText = rowselected.prohibitionWordName;
        this.content = rowselected.prohibitionWordContent;
        this.deleteForbidden = rowselected.prohibitionWordName;
      }
    },

    /* @Description: This function Checks for the duplicate change functionality
     */
    onCheckDuplication() {

      if (utils.isExistSpecialChar(this.forbiddenWordText) == true) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
        return;
      }
      if (!this.forbiddenWordText) {
        const msg = utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_PRHB_WRD'));
        utils.messageBox('error', msg);
      } else {
        this.isduplicateCheck = true;
        const pathParams = {
          'word-name': this.forbiddenWordText.trim(),
        };
        http.request(this.$options.name, 'DTS_DST_00080', {
          path: pathParams,
        })
          .then(res => {

            if (res.data.resultCode == 0) {
              this.duplicateCheckFlag = 300;
              const msg = utils.strFormat(this.$t('MSG_ALT_BE_RGST_OK'), this.$t('MSG_TXT_PRHB_WRD'));
              utils.messageBox('information', msg, null, null);
              this.isduplicateCheck = false;
            } else {
              this.duplicateCheckFlag = 200;
              utils.messageBox(
                'information',
                this.$t('MSG_ALT_IS_EXISTS'),
                null,
                null,
              );
            }
          });
      }
    },
    /* @description: This Function Restrict the field value for underscore and spaces
     */
    onKeyUpInput() {
      const wsRegex = /[\s+_]/g;
      this.forbiddenWordText = this.forbiddenWordText.replace(wsRegex, '');

      if (utils.isExistSpecialChar(this.forbiddenWordText) == true
      || utils.isExistSpecialChar(this.content) == true) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
      }
    },

    /* @Description: This function Reset the field value
     */
    onNewWordConfirm() {
      this.$refs.grid.resetSelect();
      this.isNewButtonClicked = true;
      this.isNewClick = false;
      this.isDeleteDisabled = true;
      this.isDupcheckEnabled = false;
      this.isProhibFieldDisabled = false;
      this.forbiddenWordText = '';
      this.content = '';
    },

    /* @Description: This function Save the data based on condition
     */
    onSaveConfirm() {
      if (!this.forbiddenWordText) {
        const msg = utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_PRHB_WRD'));
        utils.messageBox('error', msg);
        return;
      } 
      if (!this.content) {
        const msg = utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_DESC'));
        utils.messageBox('error', msg);
        return;
      }
      if (this.isNewButtonClicked) {
        if (this.isduplicateCheck) {
          utils.messageBox('information', this.$t('MSG_ALT_SELT_DPCT_CHK'), null, null);
        } else {
          // eslint-disable-next-line max-len

          utils.messageBox('confirm', this.$t('MSG_ALT_RGST'), null, this.onNewDataClicked);
        }
      } else {
        utils.messageBox('confirm', this.$t('MSG_ALT_MDFC'), null, this.onModifyClicked);
      }
    },
    /* @description: This function helps to enter new data
     */
    onNewDataClicked() {
      const queryParams = {
        'prohibition-word-name': this.forbiddenWordText.trim(),
        'prohibition-content': this.content,
      };
      http
        .request('PGE_DST_00009', 'DTS_DST_00059', {
          query: queryParams,
        })
        .then(res => {
          this.duplicateCheckFlag = 100;
          // eslint-disable-next-line eqeqeq
          if (res.data.resultCode == 0) {
            utils.messageBox('information', this.$t('MSG_ALT_USE_PSBL'), null, null);
          // eslint-disable-next-line eqeqeq
          } else if (res.data.resultCode == 1) {
            utils.messageBox('information', this.$t('MSG_ALT_PRGS_OK'), null, null);
          }
          this.onSearchProhibitedWords();
          this.forbiddenWordText = '';
          this.content = '';
        })
        .catch(error => {
          console.log('new word error', error);
        });
    },
    /* @Description: This function Delete the selected row from fields
     */
    onDeleteData() {

      utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), null, this.onDeletion);
    },
    onDeletion() {
      const pathParams = {
        'word-id': this.deleteForbidden,
      };
      http
        .request('PGE_DST_00009', 'DTS_DST_00061', {
          path: pathParams,
        })
        .then(res => {
          if (res.data.resultCode == 0) {
            utils.messageBox('information', this.$t('MSG_ALT_NO_INFO_SRCH'), null, null);
          // eslint-disable-next-line eqeqeq
          } else if (res.data.resultCode == 1) {
            utils.messageBox('information', this.$t('MSG_ALT_PRGS_OK'), null, null);
            this.onSearchProhibitedWords();
            this.forbiddenWordText = '';
            this.content = '';
          }
        })
        .catch(error => {
          console.log('deletion error change', error);
        });
    },
    /* @Description: This function modify the data that user enter
     */
    onModifyClicked() {
      const queryParams = {
        'word-id': this.forbiddenWordText.trim(),
        'word-content': this.content,
      };

      http
        .request(this.$options.name, 'DTS_DST_00060', {
          query: queryParams,
        })
        .then(res => {
          // eslint-disable-next-line eqeqeq
          if (res.data.resultCode == 0) {
            utils.messageBox('information', this.$t('MSG_ALT_NO_INFO_SRCH'), null, null);
          // eslint-disable-next-line eqeqeq
          } else if (res.data.resultCode == 1) {
            utils.messageBox('information', this.$t('MSG_ALT_PRGS_OK'), null, null);
          }
          this.onSearchProhibitedWords();
          this.forbiddenWordText = '';
          this.content = '';
        });
    },
  },


};
</script>
  <style scoped>
</style>
