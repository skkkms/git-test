<template>
    <div class="PS_bg">
        <div class="PS_main">
          <div class="PS_header">
            <div class="title_wrap">
                <div class="PS_logo">
                    <p>{{$t("MSG_TXT_PORTL_STDO")}}</p>
                </div>
                <div class="divider"></div>
                <div class="PS_tit">
                    <p>{{portalName}}</p>
                </div>
            </div>
            <div class="btn_wrap">
                <div class="simpleCircle">
                    <button :alt="$t('MSG_BTN_BACK')" :title="$t('MSG_BTN_BACK')"
                        @click="onClickGoBack">
                        <i class="pi pi-arrow-left"></i>
                    </button> 
                    <button :alt="$t('MSG_TIT_HOME')" :title="$t('MSG_TIT_HOME')"
                        @click="onClickGoHome">
                        <i class="pi pi-home"></i>
                    </button>                     
                </div>
            </div>
        </div>
            <ul class="PS_cards">
                <li class="PS_cards__item2">
                    <div class="PS_card">
                        <div class="PS_card__content2"
                            @click="onClickMenuCard(1)">
                            <div class="icon_wrap">                                                        
                                <i class="pi pi-clone"/>
                            </div>
                            <div class="PS_card__title">{{this.menuList[0].menuName}}</div>                        
                        </div>
                    </div>
                </li>
                <li class="PS_cards__item2">
                    <div class="PS_card">
                        <div class="PS_card__content2"
                            @click="onClickMenuCard(2)">
                            <div class="icon_wrap">                            
                                <i class="pi pi-bars"/>
                            </div>
                            <div class="PS_card__title">{{this.menuList[1].menuName}}</div>                          

                        </div>
                    </div>
                </li>
                <li class="PS_cards__item2">
                    <div class="PS_card">
                        <div class="PS_card__content2"
                            @click="onClickMenuCard(3)">
                            <div class="icon_wrap">
                                <i class="pi pi-users"/>                               
                            </div>
                            <div class="PS_card__title">{{this.menuList[2].menuName}}</div>                      
                        </div>
                    </div>
                </li>
                <li class="PS_cards__item2">
                    <div class="PS_card">
                        <div class="PS_card__content2"
                            @click="onClickMenuCard(4)">
                            <div class="icon_wrap">                               
                                <i class="pi pi-lock-open"/>
                            </div>
                            <div class="PS_card__title">{{this.menuList[3].menuName}}</div>                          
                        </div>
                    </div>
                </li>
                <li class="PS_cards__item2">
                    <div class="PS_card">
                        <div class="PS_card__content2"
                            @click="onClickMenuCard(5)">
                            <div class="icon_wrap">                               
                                <i class="pi pi-cog"/>
                            </div>
                            <div class="PS_card__title">{{this.menuList[4].menuName}}</div>                          
                        </div>
                    </div>
                </li>                
                <li class="PS_cards__item2">
                    <div class="PS_card">
                        <div class="PS_card__content2"
                            @click="onClickMenuCard(6)">
                            <div class="icon_wrap">                                
                                <i class="pi pi-list"/>
                            </div>
                            <div class="PS_card__title">{{this.menuList[5].menuName}}</div>
                        </div>
                    </div>
                </li>
                <li class="PS_cards__item2">
                    <div class="PS_card">
                        <div class="PS_card__content2"
                            @click="onClickMenuCard(7)">
                            <div class="icon_wrap">                                
                                <i class="pi pi-th-large"/>
                            </div>
                            <div class="PS_card__title">{{this.menuList[6].menuName}}</div>
                        </div>
                    </div>
                </li>
                <li class="PS_cards__item2">
                    <div class="PS_card">
                        <div class="PS_card__content2"
                            @click="onClickMenuCard(8)">
                            <div class="icon_wrap">                                
                                <i class="pi pi-external-link"/>
                            </div>
                            <div class="PS_card__title">{{this.menuList[7].menuName}}</div>
                        </div>
                    </div>
                </li>
                <li class="PS_cards__item2">
                    <div class="PS_card">
                        <div class="PS_card__content2"
                            @click="onClickMenuCard(9)">
                            <div class="icon_wrap">
                                <i class="pi pi-lock"/>                               
                            </div>
                            <div class="PS_card__title">{{this.menuList[8].menuName}}</div>                           
                        </div>
                    </div>
                </li>
                <li class="PS_cards__item2">
                    <div class="PS_card">
                        <div class="PS_card__content2"
                            @click="onClickMenuCard(10)">
                            <div class="icon_wrap">
                                <i class="pi pi-check-square"/>                               
                            </div>
                            <div class="PS_card__title">{{this.menuList[9].menuName}}</div>                           
                        </div>
                    </div>
                </li>                
            </ul>
        </div>
    </div>
</template>
<script>
  /*global http*/
  export default {
    name: 'PGE_CMP_00017',
    data() {
      return {
        portalId: '',
        portalName: '',
        menuList:[
            {menuName:this.$t('MSG_TXT_PS_APP'),pageId:'PGE_CMP_00011'},
            {menuName:this.$t('MSG_TXT_PS_MENU'),pageId:'PGE_CMP_00009'},
            {menuName:this.$t('MSG_TXT_PS_USER_GRP'),pageId:'PGE_CMA_00003'},
            {menuName:this.$t('MSG_TXT_PORTL_ACS'),pageId:'PGE_CMP_00032'},
            {menuName:this.$t('MSG_TXT_PORTL_CNFG'),pageId:'PGE_CMZ_00056'},
            {menuName:this.$t('MSG_TXT_PS_NTC'),pageId:'PGE_CMZ_00022'},
            {menuName:this.$t('MSG_TXT_PS_HCARD'),pageId:'PGE_CMP_00008'},
            {menuName:this.$t('MSG_TXT_PS_QLINK'),pageId:'PGE_CMP_00015'},
            {menuName:this.$t('MSG_TXT_PS_PERS_INFO_PROC_POLI_SRCH'),pageId:'PGE_CMP_00004'},
            {menuName:this.$t('MSG_TXT_PS_TERMS_SERV_SRCH'),pageId:'PGE_CMP_00005'},
        ], 
      };
    },
    mounted() {
        this.$nextTick(() => {
            this.portalId = utils.getParameter(this, 'portalId');
            this.portalName = utils.getParameter(this, 'portalName');
            this.loadSubPageMeta();
        });        
    },    
    methods: {
        onClickGoBack(){
            utils.goPage('PGE_CMP_00010', {});
        },
        onClickGoHome(){
            utils.goPage('PGE_CMP_00010', {});
        },
        onClickMenuCard(iMenuNum){
            utils.goPage('PGE_CMP_00021', {
                portalId: this.portalId,
                portalName: this.portalName,
                initMenuNum: iMenuNum,
            });
        },
        loadSubPageMeta(){
            utils.forEach(this.menuList, menu => {
                utils.loadPageMeta(menu.pageId).then(meta=> {
                }).catch(error => {
                })
            });
        },        
    },
  };
</script>



