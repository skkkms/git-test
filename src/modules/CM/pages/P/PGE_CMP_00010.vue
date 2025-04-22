<template>
    <div class="PS_bg">
        <div class="PS_main">
            <div class="PS_header_tit">
                {{$t("MSG_TXT_PORTL_STDO")}}
            </div>
            <div class="PS_sement_wrapper">
                <ur-segment-wrapper ref="stSeg" solid="solid" primary="primary" v-model="cardToggleNum">
                    <ur-segment-button value="1" @click="getPortalList(1)">In Use</ur-segment-button>
                    <ur-segment-button value="2" @click="getPortalList(2)">Unused</ur-segment-button>
                    <ur-segment-button value="3" @click="getPortalList(3)">Deleted</ur-segment-button>
                </ur-segment-wrapper>
            </div>            
            <ul class="PS_cards">
                <li class="PS_cards__item">
                    <div class="PS_card blue">
                        <div class="PS_card__content"
                            @click="newPopupOpenOrClose">
                            <div class="icon_wrap">
                                <i class="icon icon-blue"></i>
                            </div>
                            <div class="PS_card__detail">
                                <button class="btn txt">
                                    {{$t('MSG_TXT_ADD_PORTL')}}
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
                <sui-portal-studio-card
                    v-for="portal in portalList"
                    :key="portal.portalId"
                    :portalObject="portal"
                    @onClickPreview="goPreview(portal.portalId, portal.portalBaseUrl)"
                    @onClickDetail="detailPopupOpenOrClose(portal.portalId)"
                    @onClickPSCard="goPSMenu(portal.portalId, portal.portalName)"
                />
            </ul>
        </div>
        <sui-popup
            v-model="isShownPopupDetail"
            :title="$t('MSG_TXT_PORTL_INFO')"
        >
            <p01
            :pageId="contextPageId"
            :portalId="portalId"
            @close="detailPopupOpenOrClose"
            @research="research"
            />
        </sui-popup>
        <sui-popup
            v-model="isShownPopupNew"
            :title="$t('MSG_TXT_NEW_PORTL')"
        >
            <p02
            :pageId="contextPageId"
            :deviceApplyYn="deviceApplyYn"
            @close="newPopupOpenOrClose"
            @research="research"
            />
        </sui-popup>        
    </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import p01 from './components/PGE_CMP_00010_P01';
import p02 from './components/PGE_CMP_00010_P02';

  /*global http*/
  export default {
    name: 'PGE_CMP_00010',
    components: {
        p01,
        p02,
    },
    extends: BasePage,   
    data() {
      return {
        portalId: '',
        portalList: [],
        isShownPopupDetail: false,
        isShownPopupNew: false,
        deviceApplyYn: utils.getConfigurationValue('CFG_CMZ_DVC_TYPE_APPY_YN') === 'Y',
        cardToggleNum:'1',
      };
    },
    mounted() {
        this.$nextTick(() => {
            this.onLoad();
        });        
    },
    methods: {
        onLoad() {
            this.getPortalList('1');
        },
        research() {
            this.getPortalList(this.cardToggleNum.toString());
        },
        getPortalList(statusCd) {
            return new Promise((resolve, reject) => {
                this.portalList = [];
                http.request(this.$options.name, 'DTS_CMP_00152', {
                    query:{
                        statusCode: statusCd,
                    },
                })
                .then(res => {
                    this.portalList = res.data;
                    resolve();
                })
                .catch(error => {
                    console.log(error);
                    reject();
                });
            });
        },
        detailPopupOpenOrClose(sPortalId) {
            this.portalId = sPortalId;
            this.isShownPopupDetail = !this.isShownPopupDetail;
        },      
        newPopupOpenOrClose() {
            this.isShownPopupNew = !this.isShownPopupNew;
        },
        goPSMenu(sPortalId, sPortalName) {
            const portalStatus = this.getPortalActivated(sPortalId);
            if(portalStatus > 1){
                utils.messageBox('warning', this.$t('MSG_ALT_PORTL_STDO_STAT_ERR'));
                return false;
            }
            utils.goPage('PGE_CMP_00017', {
                portalId: sPortalId,
                portalName: sPortalName,
            });
        },
        goPreview(sPortalId, sPortalBaseUrl){
            const portalStatus = this.getPortalActivated(sPortalId);
            if(portalStatus > 1){
                utils.messageBox('warning', this.$t('MSG_ALT_PORTL_STDO_STAT_ERR'));
                return false;
            }            
            const baseURL = utils.isEmpty(sPortalBaseUrl)?window.location.origin:sPortalBaseUrl;
            //let url = utils.getConfigurationValue('CFG_CMP_LOGIN_URL')
            let url = "/certification/{portal-id}/simpleLogin.html"
            
            url = utils.replace(url, "{portal-id}", sPortalId);
            
            utils.messageBox('confirm', this.$t('MSG_ALT_GO_PORTL'), null, () => {
                http.request(this.$options.name, 'DTS_CMP_00044', {
                    query:{
                        portalId: sPortalId,
                    }
                }).then(() => {
                    //window.open(baseURL+url, '_blank', null);
                    window.location.replace(baseURL+url);
                }).catch(err => {
                    console.error(err);
                });
            });
        },
        getPortalActivated(sPortalId){
            let status = "1";
            utils.forEach(this.portalList, portal => {
                if(portal.portalId == sPortalId){
                    if(portal.deleteYn == "Y"){
                        status = "3";
                    }else if(portal.useYn == "N"){
                        status = "2";
                    }
                }
            });
            return status;
        }
    }
  };
</script>



