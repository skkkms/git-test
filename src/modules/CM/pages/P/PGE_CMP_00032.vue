<template>
    <sui-page>
      <!-- Page Header -->
      <sui-page-header :pageId="this.$options.name" />
      <!-- Page Contents -->
      <sui-page-contents>
        <div class="vert_box_wrap">
            <div class="vert_box">
                <ur-radio small="small" v-model="portalAccessUserCode" value="A">{{$t('MSG_TXT_ALL_USR')}}</ur-radio>
            </div>
            <div class="vert_box">
                <ur-radio small="small" v-model="portalAccessUserCode" value="U">{{$t('MSG_TXT_ANY_USR_GRP_USR')}}</ur-radio>
            </div>
            <div class="vert_box">
                <ur-radio small="small" v-model="portalAccessUserCode" value="S">{{$t('MSG_TXT_SELT_USR_GRP_USR')}}</ur-radio>
                <div class="mrB15"></div>

                <div class="comm_scr_wrap">
                    <div class="row">
                        <div class="col-xs-1">
                            <sui-input-label
                                :label="$t('MSG_TXT_USR_GRP_CATG')"
                            />
                        </div>
                        <div class="col-xs-5">
                            <sui-code-select
                                ref="userGroupCategory"
                                :selected="selectedValues.COD_USR_GRP_CATG"
                                codeId="COD_USR_GRP_CATG"
                                :initialSelectedIndex="0"
                                :defaultOption="'all'"
                                @loaded="onUserGroupCategoryLoaded"
                            />                             
                        </div>
                        <div class="col-xs-1">
                            <sui-input-label
                                :label="$t('MSG_TXT_SEARCH_COND')"
                            />
                        </div>
                        <div class="col-xs-5">
                            <sui-code-select
                                ref="condType"
                                :selected="selectedValues.COD_USER_GRP_SRCH_COND"
                                codeId="COD_USER_GRP_SRCH_COND"
                                :initialSelectedIndex="0"
                                :defaultOption="'all'"
                                @loaded="onCondTypeLoaded"
                            />
                            <div class="comp_spacing"/>
                            <sui-text-field
                                v-model="condContent"
                                default
                                value
                                maxlength="50"
                                @keyup.enter="onSearch"
                                @keyup="onKeyUpInput"
                            />
                        </div>
                    </div>
                    <div class="btn_wrap">
                        <sui-button
                            type="button"
                            class="comm_btn_Reset"
                            @click="onReset"
                        >
                            {{ $t('MSG_BTN_RESET') }}
                        </sui-button>
                        <sui-button
                            v-permission:read="'PGE_CMP_00032'"
                            type="button"
                            class="comm_btn_Scr"
                            :disabled="portalAccessUserCode!='S'"
                            @click="onSearch"
                        >
                            {{ $t('MSG_BTN_SEARCH') }}
                        </sui-button>
                    </div>
                </div>
                <div class="mrB30" />
                <div class="comm_shut_wrap">
                    <div class="inbox">
                    <sui-s-grid
                        ref="grid0"
                        :headers="gridColumns0"
                        :data-source="ds0"
                        :options="options"
                        :showRowsPerPageControl="false"
                        :multiselect="true"
                        @grid:selected="onSelectOriginGrid"
                    />
                    </div>
                    <div class="btnbox">
                    <ul>
                        <li>
                        <sui-button
                            v-permission:update="this.$options.name"
                            type="button"
                            class="comm_btn_shut_right"
                            :disabled="btnOrginStatus"
                            @click="onAddClick"
                        />
                        </li>
                        <li>
                        <sui-button
                            v-permission:update="this.$options.name"
                            type="button"
                            class="comm_btn_shut_left"
                            :disabled="btnTargetStatus"
                            @click="onDeleteClick"
                        />
                        </li>
                    </ul>
                    </div>
                    <div class="inbox">
                    <sui-s-grid
                        ref="grid1"
                        :headers="gridColumns1"
                        :data-source="ds1"
                        :options="options"
                        :showRowsPerPageControl="false"
                        :multiselect="true"
                        @grid:selected="onSelectTargetGrid"
                    />
                    </div>
                </div>                
            </div>
        </div>
        <div class="comm_btn_wrap">
            <sui-button
                type="button"
                class="comm_btn_solid"
                @click="onSaveClick"
            >
                {{ $t('MSG_BTN_SAVE') }}
            </sui-button>
        </div>   
      </sui-page-contents>
    </sui-page>
  </template>
<script>
  import BasePage from '~cm/components/BasePage';
  import {urDataSet} from 'uidev-component/index.js';
  export default {
    name: 'PGE_CMP_00032',
    props: {
        psInitData: {
            type: Object,
            default() {
                return {};
            }
        },
    },    
    extends: BasePage,    
    data() {
      return {
            portalAccessUserCode:'A',
            userGroupCategoryKey: '',
            condTypeKey: '',
            condContent: '',
            selectedValues: {
                COD_USER_GRP_SRCH_COND: { key: '', label: '' },
                COD_USR_GRP_CATG: { key: '', label: '' },
            },
            selectedPortal: {},
            ds0: new urDataSet(),
            ds1: new urDataSet(),
            options: {
                infinityScroll: true,
                noBaseInfo: false,
                internalPaging: false,
                multiSelect: true,
                selectCheck: true,
                selectCheckOnly: true,
            },
            btnOrginStatus: true,
            btnTargetStatus: true,            
            fromPsYn: utils.isEmpty(this.psInitData)?false:true,
            psInitPortal: {key:this.psInitData.portalId, value:''},                 
      };
    },
    mounted() {
        // portal list
        this.$nextTick(() => {
            this.loadPortalAccessList();
        });
    },    
    created(){
        this.gridColumns0 = [   
            {
                text: this.$t('MSG_TXT_USER_GRP_ID'),
                value: 'userGroupId',
                width: 100,
            },
            {
                text: this.$t('MSG_TXT_USER_GRP_NAME'),
                value: 'userGroupName',
            },
            {
                text: this.$t('MSG_TXT_USR_GRP_CATG'),
                value: 'userGroupCategoryName',
                width: 300,
            },
        ];
        this.gridColumns1 = [
            {
                text: this.$t('MSG_TXT_USER_GRP_ID'),
                value: 'userGroupId',
                width: 100,
            },
            {
                text: this.$t('MSG_TXT_USER_GRP_NAME'),
                value: 'userGroupName',
            },
        ];        
    },
    methods: {
        onChangeBizCodes(optList) {
            this.selectedBizCode = optList;
        },
        onCondTypeLoaded(optionsList) {
            this.condTypeKey = optionsList[0].key;
        },
        onUserGroupCategoryLoaded(optionsList) {
            this.userGroupCategoryKey = optionsList[0].key;
        },
        onKeyUpInput() {
            const searchFieldNewText = this.condContent;
            if (utils.isEmpty(searchFieldNewText) === false) {
                if (utils.isExistSpecialChar(searchFieldNewText) === true) {
                    this.conFirm('error', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
                    this.condContent = this.searchFieldOldText;
                } else {
                    this.searchFieldOldText = searchFieldNewText;
                }
            }
        },
        onReset() {
            this.$refs.condType.reset();
            this.$refs.userGroupCategory.reset();
            this.condContent = '';
        },        
        onSearch() {
            const condTypeCode = this.selectedValues.COD_USER_GRP_SRCH_COND.key;
            const userGroupCategoryCode = this.selectedValues.COD_USR_GRP_CATG.key;

            if(this.fromPsYn){
                this.selectedPortal = this.psInitPortal;
            }
            const portalId = this.selectedPortal.key === 'ALL' ? '' : this.selectedPortal.key;
            const queryParams = {
                userGroupCategoryCode: userGroupCategoryCode || '',
                portalId: portalId,
                basicAuthYn: '',
                searchCond: condTypeCode || '',
                searchWord: utils.trim(this.condContent) || '',
            };

            http.request(this.$options.name, 'DTS_CMA_00008', {
                query: queryParams,
            }).then(res => {
                if (res.data) {
                    if (res.data.length > 0) {
                        this.$refs.grid0.resetSelect();
                        this.ds0.setData(res.data);
                    } else {
                        this.$refs.grid0.resetSelect();
                        this.ds0.setData([]);
                    }
                }
            }).catch(error => {
                console.log(error);
            });
        },
        onSelectOriginGrid(row) {
            if (!utils.isEmpty(row)) {
                this.btnOrginStatus = false;
            } else {
                this.btnOrginStatus = true;
            }
        },
        onSelectTargetGrid(row) {
            if (!utils.isEmpty(row)) {
                this.btnTargetStatus = false;
            } else {
                this.btnTargetStatus = true;
            }
        },
        onAddClick() {
            const selected = this.ds0.getSelected();
            const added = this.ds1.getRawData();
            const newList = [];
            utils.forEach(selected, data => {
                if (utils.findIndex(added, { userGroupId: data.userGroupId }) === -1) {
                newList.push(data);
                }
            });
            this.$refs.grid0.resetSelect();
            this.ds1.appendData(newList);
        },
        onDeleteClick() {
            const selectedItems = this.ds1.getSelected();
            utils.forEach(selectedItems, item => {
                this.ds1.removeRow(item, false);
            });
            this.$refs.grid1.resetSelect();
        },
        onSaveClick(){
            if(this.fromPsYn){
                this.selectedPortal = this.psInitPortal;
            }
            const portalId = this.selectedPortal.key === 'ALL' ? '' : this.selectedPortal.key;
            const dataParam = {
                portalId : portalId,
                portalAccessUserCode : this.portalAccessUserCode,
                userGroupList: this.getSaveData(this.ds1.getRawData()),
            }
            http.request(this.$options.name, 'DTS_CMP_00154',{
                data: dataParam,
            }).then(() => {
                utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
                    this.loadPortalAccessList
                });                
            }).catch(error => {
                console.log(error);
            });
        },
        getSaveData(datasetList) {
            const list = [];
            if (datasetList.length > 0) {
                utils.forEach(datasetList, data => {
                    list.push({
                        userGroupId: data.userGroupId,
                        portalId: data.portalId,
                    });
                });
            } else {
                list.push({
                    userGroupId: '',
                });
            }
            return list;
        },
        loadPortalAccessList(){
            if(this.fromPsYn){
                this.selectedPortal = this.psInitPortal;
            }
            const portalId = this.selectedPortal.key === 'ALL' ? '' : this.selectedPortal.key;            
            http.request(this.$options.name, 'DTS_CMP_00153', {
                path: {
                'portal-id': portalId,
                }
            }).then(res => {
                this.portalAccessUserCode = res.data.portalAccessUserCode;
                this.ds1.setData(res.data.userGroupList);
            }).catch(error => {
                console.log(error);
            });            
        }
    }
  };
</script>

