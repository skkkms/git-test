<template>
    <!-- <div class="bg_ani"> <div class="full-screen"> <div class="logo_big">
    </div> </div> </div> -->
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

            <ur-tab-box navigation class="ps" ref="tabBox">
                <ur-tab-label :idx="1">{{this.menuList[1].menuName}}</ur-tab-label>
                <ur-tab-label :idx="2">{{this.menuList[2].menuName}}</ur-tab-label>
                <ur-tab-label :idx="3">{{this.menuList[3].menuName}}</ur-tab-label>
                <ur-tab-label :idx="4">{{this.menuList[4].menuName}}</ur-tab-label>
                <ur-tab-label :idx="5">{{this.menuList[5].menuName}}</ur-tab-label>
                <ur-tab-label :idx="6">{{this.menuList[6].menuName}}</ur-tab-label>
                <ur-tab-label :idx="7">{{this.menuList[7].menuName}}</ur-tab-label>
                <ur-tab-label :idx="8">{{this.menuList[8].menuName}}</ur-tab-label>
                <ur-tab-label :idx="9">{{this.menuList[9].menuName}}</ur-tab-label>
                <ur-tab-label :idx="10">{{this.menuList[10].menuName}}</ur-tab-label>
                <ur-tab-content :idx="1">
                    <tab01 :psInitData="this.psInitData"/>
                </ur-tab-content>
                <ur-tab-content :idx="2">
                    <tab02 :psInitData="this.psInitData"/>
                </ur-tab-content>
                <ur-tab-content :idx="3">
                    <tab03 :psInitData="this.psInitData"/>
                </ur-tab-content>
                <ur-tab-content :idx="4">
                    <tab04 :psInitData="this.psInitData"/>
                </ur-tab-content>
                <ur-tab-content :idx="5">
                    <tab05 :psInitData="this.psInitData"/>
                </ur-tab-content>
                <ur-tab-content :idx="6">
                    <tab06 :psInitData="this.psInitData"/>
                </ur-tab-content>
                <ur-tab-content :idx="7">
                    <tab07 :psInitData="this.psInitData"/>
                </ur-tab-content>
                <ur-tab-content :idx="8">
                    <tab08 :psInitData="this.psInitData"/>
                </ur-tab-content>                
                <ur-tab-content :idx="9">
                    <tab09 psPolicyTypeCode="P" :psInitData="this.psInitData"/>
                </ur-tab-content>
                <ur-tab-content :idx="10">
                    <tab10 psPolicyTypeCode="T" :psInitData="this.psInitData"/>
                </ur-tab-content>                
            </ur-tab-box>
        </div>
    </div>
</template>
<script>
  import tab01 from './PGE_CMP_00011';
  import tab02 from './PGE_CMP_00009';
  import tab03 from '../A/PGE_CMA_00003';
  import tab04 from './PGE_CMP_00032';
  import tab05 from '../Z/PGE_CMZ_00079';
  import tab06 from '../Z/PGE_CMZ_00022';
  import tab07 from './PGE_CMP_00008';
  import tab08 from './PGE_CMP_00015';
  import tab09 from './PGE_CMP_00004';
  import tab10 from './PGE_CMP_00004';
  export default {
    name: 'PGE_CMP_00021',
    components: {
        tab01,
        tab02,
        tab03,
        tab04,
        tab05,
        tab06,
        tab07,
        tab08,
        tab09,
        tab10,
    },    
    data() {
      return {
        portalId: '',
        portalName: '',
        initMenuNum: '1',
        menuList:[
            {menuName:'',pageId:''},
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
        psInitData: {
            portalId: utils.getParameter(this, 'portalId'),
            module: 'CM',
            subModue: 'CMP',
        },
      };
    },
    mounted() {
        this.$nextTick(() => {
            this.portalId = utils.getParameter(this, 'portalId');
            this.portalName = utils.getParameter(this, 'portalName');
            this.initMenuNum = utils.getParameter(this, 'initMenuNum');
            this.$refs.tabBox.setIdx(this.initMenuNum);
        });        
    },    
    methods: {
        onClickGoBack(){
            utils.goPage('PGE_CMP_00017', {
                portalId: this.portalId,
                portalName: this.portalName,                
            });
        },
        onClickGoHome(){
            utils.goPage('PGE_CMP_00010', {});
        },
    },
  };
</script>



