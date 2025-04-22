<template>
  <div>
    <div class="comm_popup_wrap_small">
      <div class="mrB20" />
      <div class="comm_gridTop_wrap">
        <div class="btn_wrapL">
          <div class="totalList">
            {{ totalCnt }}
          </div>
          <div class="comm_line_div" />
          <sui-button
            type="button"
            class="comm_btn_sort_top"
            @click="onMoveTop"
          >
            Top
          </sui-button>
          <sui-button
            type="button"
            class="comm_btn_sort_up"
            @click="onMoveUp"
          >
            Up
          </sui-button>
          <sui-button
            type="button"
            class="comm_btn_sort_down"
            @click="onMoveDown"
          >
            Down
          </sui-button>
          <sui-button
            type="button"
            class="comm_btn_sort_bottom"
            @click="onMoveBottom"
          >
            Bottom
          </sui-button>
        </div>
      </div>

      <div class="container">
        <table class="table table-fixed">
          <thead>
            <tr>
              <th class="col-xs-48">
                {{ $t('MSG_TXT_CNFG_ID') }}
              </th>
              <th class="col-xs-52">
                {{ $t('MSG_TXT_CNFG_NM') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <draggable
              v-model="configList"
              :disabled="!enabled"
              ghost-class="ghost"
              @start="onDragStart"
              @end="onDragEnd"
            >
              <tr
                v-for="(item, index) in configList"
                :key="item.configurationId"
                @click="selIndex = index"
              >
                <td
                  class="col-xs-50"
                  :class="{ orderselect: selIndex === index }"
                >
                  {{ item.configurationId }}
                </td>
                <td
                  class="col-xs-50"
                  :class="{ orderselect: selIndex === index }"
                >
                  {{ item.configurationName }}
                </td>
              </tr>
            </draggable>
          </tbody>
        </table>
      </div>
      <div class="comm_btn_wrap mrL30">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onCancelClick"
        >
          {{ $t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button
          v-permission:update="contextPageId"
          type="button"
          class="comm_btn_solid"
          @click="onSaveClick"
        >
          {{ $t('MSG_BTN_SAVE') }}
        </sui-button>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable';

export default {
  name: 'PGE_CMZ_00078_P02', // eslint-disable-line vue/name-property-casing
  components: {
    draggable,
  },
  props: {
    arrangeTarget: {
      type: String,
      required: true,
      default() {
        return ''; // 'CONFIG_GROUP' or 'CONFIG_ITEM'
      },
    },
    contextPageId: {
      type: String,
      required: true,
      default() {
        return '';
      },
    },
    selectedGridRowDataGroup: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      enabled: true,
      dragging: false,
      configList: [],
      selIndex: -1,
    };
  },
  computed: {
    totalCnt() {
      return utils.strFormat(this.$t('MSG_TXT_LST_CNT'), utils.size(this.configList)); // 총 {0}개
    },
  },
  watch: {},
  mounted() {
    this.loadConfigList();
  },
  methods: {
    onCancelClick() {
      this.$emit('cancel-config-arrange');
    },
    onDragEnd(e) {
      this.dragging = false;
      this.selIndex = e.newIndex;
    },
    onDragStart() {
      this.dragging = true;
    },
    onMoveBottom() {
      if (this.selIndex > -1 && this.selIndex < this.configList.length) {
        const tmp = this.configList.splice(this.selIndex, 1)[0];
        this.configList.push(tmp);
        this.selIndex = this.configList.length - 1;
      }
    },
    onMoveDown() {
      if (this.selIndex > -1 && this.selIndex < this.configList.length - 1) {
        const newIndex = this.selIndex < this.configList.length - 1 ? this.selIndex + 1 : this.configList.length - 1;
        const tmp = this.configList.splice(this.selIndex, 1)[0];
        this.configList.splice(newIndex, 0, tmp);
        this.selIndex = newIndex;
      }
    },
    onMoveTop() {
      if (this.selIndex > 0 && this.selIndex < this.configList.length) {
        const tmp = this.configList.splice(this.selIndex, 1)[0];
        this.configList.unshift(tmp);
        this.selIndex = 0;
      }
    },
    onMoveUp() {
      if (this.selIndex > 0 && this.selIndex < this.configList.length) {
        const newIndex = this.selIndex - 1;
        const tmp = this.configList.splice(this.selIndex, 1)[0];
        this.configList.splice(newIndex, 0, tmp);
        this.selIndex = newIndex;
      }
    },
    onSaveClick() {
      this.reArrange();
      const dataParams = this.configList;
      utils.messageBox('confirm', this.$t('MSG_ALT_IS_SAV_DATA'), null,
        (/* ok */) => {
          http.request(this.contextPageId, 'DTS_CMP_00094', {
            data: dataParams,
          }).then(() => {
            this.$emit('saved-config-arrange');
          });
        },
        (/* cancel */) => {});
    },
    loadConfigList() {
      const paramData = this.arrangeTarget === 'CONFIG_GROUP' ? {} : {
        path: {
          'parent-configuration-id': this.selectedGridRowDataGroup.configurationId,
        },
      };
      http.request(this.contextPageId, this.arrangeTarget === 'CONFIG_GROUP' ? 'DTS_CMP_00093' : 'DTS_CMP_00095', paramData).then(res => {
        this.configList = res.data;
        utils.forEach(this.configList, item => {
          item.class = '';
        });
      }).catch(error => {
        console.log(error);
      });
    },
    reArrange() {
      utils.forEach(this.configList, (item, index) => {
        item.arrayalOrder = index;
      });
    },
  },
};
</script>

<style scoped>
  .orderselect {
    background-color: #e9ecf7;
  }
</style>
