<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_EMPL_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              <sui-input-label
                :label="userData.userName"
                :vertical="false"
              />
            </div>
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DEPT')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ userData.departmentName }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_ACC_STATUS')"
              :vertical="false"
              required
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="selectACO"
              :selected="selectedCode.ACO"
              :pageId="contextPageId"
              codeId="COD_USR_ACO_STT"
              :defaultOption="'select'"
              :initialSelectedIndex="0"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_NUM_FMT')"
              :vertical="false"
              required
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="selectNFM"
              :selected="selectedCode.NFM"
              :pageId="contextPageId"
              codeId="COD_DGR_TYPE"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_LANG')"
              :vertical="false"
              required
            />
          </div>
          <div class="col-xs-5">
            <sui-lang-select
              ref="selectLNG"
              :selected="selectedCode.LNG"
              :pageId="contextPageId"
              codeId="COD_PAGE_UE"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TZONE_AREA')"
              :vertical="false"
              required
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="selectDIV"
              :selected="selectedCode.DIV"
              :pageId="contextPageId"
              codeId="COD_TZONE_DIV"
              @loaded="timezoneLoaded"
              @list-clicked="onTimezoneSelect"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TZONE_GMT')"
              :vertical="false"
              required
            />
          </div>
          <div class="col-xs-5">
            <sui-custom-select
              ref="selectTMZ"
              :selected="selectedCode.TMZ"
              :optionList="timezoneGMTList"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_DISP_LNG')"
              :vertical="false"
              required
            />
          </div>
          <div class="col-xs-5">
            <sui-lang-select
              ref="selectDPL"
              :selected="selectedCode.DPL"
              :pageId="contextPageId"
              codeId="COD_PAGE_UE"
            />
          </div>
        </div>
      </div>
      <div class="mrB30" />
      <div class="comm_title_wrap">
        <h4 class="comm_tit02">
          {{ $t('MSG_TXT_PSS_AUTH_LIST') }}
        </h4>
      </div>
      <sui-s-grid
        ref="grdPssAuth"
        :headers="columnsUserExtends"
        :data-source="dsPassAuth"
        :options="options"
      >
        <template #left-info>
          <sui-button
            v-permission:update="contextPageId"
            type="button"
            class="comm_btn_gridTop"
            @click="onAddItem"
          >
            {{ $t('MSG_BTN_ADD') }}
          </sui-button>
          <sui-button
            v-permission:delete="contextPageId"
            type="button"
            class="comm_btn_gridTop"
            @click="onDeleteItem"
          >
            {{ $t('MSG_BTN_DEL') }}
          </sui-button>  
        </template>
      </sui-s-grid>
      <div class="mrB30" />
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onCancelClick"
        >
          {{ $t("MSG_BTN_CANCEL") }}
        </sui-button>
        <sui-button
          v-permission:create="contextPageId"
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
// eslint-disable-next-line import/extensions
import {urDataSet} from 'uidev-component/index.js';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMP_00019_P02', // eslint-disable-line vue/name-property-casing
  components: {
  },
  extends: BasePage,
  props: {
    userId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dsPassAuth: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },
      userData: {},
      isExistPerson: 0,
      selectedCode: {
        NFM: { key: '', label: '' },
        LNG: { key: '', label: '' },
        DIV: { key: '', label: '' },
        TMZ: { key: '', label: '' },
        DPL: { key: '', label: '' },
        ACO: { key: '', label: '' },
      },
      timezoneGMTList: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.columnsUserExtends = [
      {
        text: this.$t('MSG_TXT_USR_GRP_CATG'),
        value: 'userGroupCategoryName',
      }, {
        text: this.$t('MSG_TXT_PORTL'),
        value: 'portalId',
      }, {
        text: this.$t('MSG_TXT_USER_GRP_NAME'),
        value: 'userGroupName',
        component: {
          props: ['row', 'value'],
          template:
            `<sui-button
              :title="row.userGroupName"
              type="button"
              class="link"
              @click.stop="onSelectUserGroup(row)"
            >
              {{row.userGroupName}}
            </sui-button>`,
          methods: {
            onSelectUserGroup(dataRow) {
              utils.openLayerPopup('PGE_CMA_00015', null, {
                pageInitialData: {
                  userGroupId: dataRow.userGroupId,
                },
                size: 'lg',
              });
            },
          },
        },
      },
      {
        text: this.$t('MSG_TXT_VALID_PERIOD'),
        value: 'validFinishDT',
        width: '120',
        customValue: function(value, row) {
          return utils.dateformatToClient(value, 'S')
        },
      }];
    this.localdata1 = [];
  },
  mounted() {
    this.$nextTick(() => {
      if (!utils.isEmpty(this.userId)) {
        this.onLoad();
      }
    });
  },

  methods: {
    timezoneLoaded(list) {
      const [first] = list;
      this.timezoneGMTListLoad(first.key);
    },
    onTimezoneSelect() {
      const code = this.selectedCode.DIV.key;
      this.timezoneGMTList = [];
      this.selectedCode.TMZ.key = '';
      this.timezoneGMTListLoad(code);
    },
    /**
     * 사용자 그룹 팝업
     * */
    onAddItem() {
      utils.openLayerPopup('PGE_CMA_00014', this.onUserGroupPopupCallback, {
        // pageInitialData: { iptUserName: iptUserName, userPopupMode: userPopupMode },
        pageInitialData: { userPopupMode: true },
        size: 'lg',
      });
    },
    onUserGroupPopupCallback(nodeData) {
      if (utils.size(nodeData) < 1) return;

      if (nodeData.length > 0) {
        utils.forEach(nodeData, data => {
          const objDept = [{
            userGroupCategoryCode: data.userGroupCategoryCode,
            userGroupCategoryName: data.userGroupCategoryName,
            userGroupId: data.userGroupId,
            userGroupName: data.userGroupName,
            portalId: data.portalId,
            validFinishDT: '99991231',
            isNewData: true,
            check: 'N',
          }];
          const findDup = this.dsPassAuth.data.find(auth => auth.userGroupId === data.userGroupId);
          if (!findDup) {
            this.dsPassAuth.appendData(objDept);
          }
        });
      }
    },
    onDeleteItem() {
      if (this.dsPassAuth != null) {
        const selectedItems = this.dsPassAuth.getSelected();
        utils.forEach(selectedItems, item => {
          this.dsPassAuth.removeRow(item, false);
        });
        this.$refs.grdPssAuth.resetSelect();
      }
    },
    onSaveClick() {
      const saveList = [];
      const { userId } = this.userData;

      utils.forEach(this.selectedCode, (value, key) => {
        if (!utils.isEqual(key, 'DIV')) {
          saveList.push({
            userId,
            personalizationTypeCode: key,
            personalizationValue: value.key,
          });
        }
      });

      // 권한 신청 부분
      const dsData = [];

      // 중복신청 체크
      const unique = [];
      const duplicates = this.dsPassAuth.data.filter(item => {
        if (unique.find(i => i.userGroupId === item.userGroupId)) {
          return true;
        }
        unique.push(item);
        return false;
      });
      if (duplicates.length > 0) {
        utils.messageBox('warning', this.$t('MSG_ALT_DUPLICATE_EXISTS'));
        return;
      }
      utils.forEach(this.dsPassAuth.data, item => {
        if (item.authRequestStatusCode !== 'S') {
          dsData.push(
            {
              userGroupId: utils.trim(item.userGroupId),
              userGroupCategoryCode: utils.trim(item.userGroupCategoryCode),
              validFinishDT: utils.trim(item.validFinishDT),
              userId,
              deleteYn: 'N',
            },
          );
        }
      });
      const paramList = {
        epId: userId,
        existPerson: this.isExistPerson,
        userGrpList: dsData,
        personalizationList: saveList,
      };
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        http.request(this.contextPageId, 'DTS_CMY_00035', {
          data: paramList,
        }).then(() => {
          this.retentionInfo(userId);
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, this.research);

        }).catch(error => {
          console.log(error);
        });
      });
    },
    onLoad() {
      http.request(this.contextPageId, 'DTS_CMP_00072', {
        path: {
          'user-id': this.userId,
        },
      }).then(res => {
        this.userData = utils.clone(res.data);
        this.personalizationLoad(this.userData.userId);
        this.retentionInfo(this.userData.userId);
      }).catch(error => {
        console.log(error);
      });
    },
    personalizationLoad(userId) {
      http.request(this.contextPageId, 'DTS_CMP_00001', {
        path: {
          'user-id': userId,
        },
      }).then(res => {
        this.isExistPerson = 1;
        utils.forEach(res.data, value => {
          this.selectedCode[value.personalizationTypeCode] = { key: value.personalizationValue };
          if (utils.isEqual(value.personalizationTypeCode, 'TMZ')) {
            this.selectedCode.DIV = { key: value.timezoneDivCode };
            this.timezoneGMTListLoad(value.timezoneDivCode);
          }
        });
      }).catch(error => {
        console.log(error);
      });
    },
    timezoneGMTListLoad(timezoneDivCode) {
      http.request(this.contextPageId, 'DTS_CMZ_00078', {
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
        this.timezoneGMTList = timezoneList;
      }).catch(error => {
        console.log(error);
      });
    },
    retentionInfo(userId) {
      http.request(this.contextPageId, 'DTS_CMP_00150', {
        path: {
          'user-id': userId || '',
        },
      }).then(res => {
        if (res.data.length > 0) {
          const passAuth = [];
          utils.forEach(res.data, item => {
            passAuth.push({
              check: item.authRequestStatusCode === 'S' ? 'O' : 'N',
              userGroupCategoryCode: item.userGroupCategoryCode,
              userGroupCategoryName: item.userGroupCategoryName,
              userGroupId: item.userGroupId,
              userGroupName: item.userGroupName,
              authRequestStatusCode: item.authRequestStatusCode,
              authRequestStatusName: item.authRequestStatusName,
              validFinishDT: item.validFinishDT,
              portalId: item.portalId,
            });
          });
          //this.dsPassAuth.setRawData(passAuth);
          this.dsPassAuth.setData(passAuth);
        } else {
          this.dsPassAuth.setData(res.data);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    onCancelClick() {
      this.$emit('close');
    },
    research() {
      this.$emit('research',this.userData.userId);
    },
  },
};
</script>
<style scoped>
</style>
