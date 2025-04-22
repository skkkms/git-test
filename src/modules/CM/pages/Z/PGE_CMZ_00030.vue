<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TODO_NM')"
              :vertical="false"
              required
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="todoName"
              v-model.trim="todoData.todoName"
              maxlength="250"
              :disabled="false"
              :readonly="false"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TODO_CLSF')"
              :vertical="false"
              required
            />
          </div>
          <div class="col-xs-5">
            <cmp-todo-clsf-select
              ref="todoClsfSelect"
              :pageId="this.$options.name"
              :selectedClsf="todoData.selectedCodeValue.todoClassificationCode"
              :selectedDclsf="todoData.selectedCodeValue.todoDetailClassificationCode"
              defaultClsfOption="select"
              defaultDclsfOption="select"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_STT')"
              :vertical="false"
              required
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="todoStateCode"
              :selected="todoData.selectedCodeValue.todoStateCode"
              :pageId="this.$options.name"
              codeId="COD_TODO_STT"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DDLN_DT')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <ur-date-picker
              ref="dp"
              v-model.trim="todoData.todoProcessDeadlineDT"
              :min-date="minDate"
              init="today"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_CNTN')"
              :vertical="false"
            />
          </div>
          <div
            class="col-xs-11"
            style="height:400px"
          >
            <textarea
              v-model.trim="todoData.todoContent"
              maxlength="1000"
            />
          </div>
        </div>
      </div>
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:read="this.$options.name"
          type="button"
          class="comm_btn_border"
          @click="onCancelClick"
        >
          {{ $t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button
          v-permission:create="this.$options.name"
          type="button"
          class="comm_btn_solid"
          @click="onSaveClick"
        >
          {{ $t('MSG_BTN_SAVE') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMZ_00030', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageInitialData: {
      type: Object,
      default() {
        return {};
      },
    },
    closePagePopup: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      todoData: {
        selectedCodeValue: {
          todoStateCode: {
            key: '',
            label: '',
          },
          todoClassificationCode: {
            key: '',
            label: '',
          },
          todoDetailClassificationCode: {
            key: '',
            label: '',
          },
        },
        todoUid: '',
        todoProcessDeadlineDT: '',
        todoName: '',
        todoContent: '',
        moduleCode: 'CM',
        subModuleCode: 'CMZ',
      },
      validMessage: '',
      optionList: {
        COD_TODO_DTL_CLSF: [],
        COD_DCLSF: [],
        BQ: [],
        FL: [],
        ZZ: [],
      },
      // disabledDatePicker: `${'9999-12-31'}~${moment().format('YYYY-MM-DD')}`,
      minDate: utils.now('YYYY-MM-DD'),
    };
  },
  computed: {
    updateFlag() {
      return !utils.isEmpty(this.todoData.todoUid);
    },
  },
  watch: {},
  datasets: [],
  mounted() {
    const { uid } = this.$route.query;
    const todoUid = uid || this.pageInitialData.todoUid;
    if (!utils.isEmpty(todoUid)) {
      this.onTodoDataLoad(todoUid);
    }
  },

  methods: {
    onCancelClick() {
      this.closePagePopup(false);
    },
    onTodoDataLoad(todoUid) {
      http.request(this.$options.name, 'DTS_CMZ_00126', {
        path: {
          'todo-uid': todoUid,
        },
      }).then(res => {
        this.setTodoData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    setTodoData(selected) {
      utils.forEach(this.todoData, (value, key) => {
        if (utils.isEqual(key, 'selectedCodeValue')) {
          const { todoStateCode, todoClassificationCode, todoDetailClassificationCode } = selected;
          this.todoData.selectedCodeValue.todoStateCode.key = todoStateCode;
          this.$refs.todoClsfSelect.selectClsfDclsf(todoClassificationCode, todoDetailClassificationCode);
        } else if (utils.has(selected, key)) {
          if (utils.isEqual(key, 'todoProcessDeadlineDT')) {
            this.todoData[key] = utils.dateformatToClient(selected[key], 'S');
          } else if (utils.isEqual(key, 'todoContent')) {
            this.todoData[key] = selected.detailList[0].todoDetailContent;
          } else {
            this.todoData[key] = selected[key];
          }
        }
      });
    },
    getSaveData() {
      const data = {};
      utils.forEach(this.todoData, (value, key) => {
        if (utils.isEqual(key, 'selectedCodeValue')) {
          utils.forEach(value, (codeValue, codekey) => {
            data[codekey] = utils.trim(codeValue.key);
          });
        } else if (utils.isEqual(key, 'todoProcessDeadlineDT')) {
          if (utils.isEmpty(value)) {
            data[key] = null;
          } else {
            data[key] = utils.toStringByFormat(value, 'YYYYMMDD');
          }
        } else {
          data[key] = value;
        }
      });
      return data;
    },
    onSaveClick() {
      const saveData = this.getSaveData();
      const result = this.validation(saveData);
      if (result.valid) {
        this.saveAction(saveData);
      } else {
        utils.messageBox('warning', result.message, null, () => {
          if (!utils.isEmpty(result.focus.name)) {
            const param = result.focus.param || null;
            this.$refs[result.focus.name].setFocus(param);
          }
        });
      }
    },
    validation(data) {
      const result = {
        valid: true,
        message: '',
        focus: {
          name: '',
          param: null,
        },
      };
      if (utils.isEmpty(data.todoName)) {
        result.valid = false;
        result.message = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_TODO_NM'));
        result.focus.name = 'todoName';
        return result;
      }
      if (utils.isEmpty(data.todoStateCode)) {
        result.valid = false;
        result.message = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_STT'));
        result.focus.name = 'todoStateCode';
        return result;
      }
      if (utils.isEmpty(data.todoClassificationCode)) {
        result.valid = false;
        result.message = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_TODO_CLSF'));
        result.focus.name = 'todoClsfSelect';
        result.focus.param = 'clsf';
        return result;
      }
      if (utils.isEmpty(data.todoDetailClassificationCode)) {
        result.valid = false;
        result.message = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_DTL_CLSF'));
        result.focus.name = 'todoClsfSelect';
        result.focus.param = 'dclsf';
        return result;
      }
      if (!this.$refs.dp.isValid()) {
        result.valid = false;
        result.message = this.$t('MSG_ALT_CHK_DT');
        return result;
      }
      return result;
    },
    saveAction(saveData) {
      const dataServiceId = this.updateFlag ? 'DTS_CMZ_00106' : 'DTS_CMZ_00105';
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        http.request(this.$options.name, dataServiceId, {
          path: {
            'todo-uid': saveData.todoUid,
          },
          data: saveData,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
            this.closePagePopup(true);
          });
        }).catch(error => {
          console.log(error);
        });
      });
    },

  },
};
</script>
<style scoped>
</style>
