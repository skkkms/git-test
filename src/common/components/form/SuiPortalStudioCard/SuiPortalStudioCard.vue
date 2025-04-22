<template>
  <li class="PS_cards__item">
    <div class="PS_card">
        <div class="PS_card__content">
            <div class="PS_card__title"
              @click="onClickPSCard">{{ portalObject.portalName }}</div>
            <p class="PS_card__text"
              @click="onClickPSCard">{{ portalObject.portalContent }}
            </p>
            <div class="PS_card__detail">
                <button
                    class="btn btn-iconed"
                    @click="onClickPreview"> 
                      <i class="pi pi-eye" style="color:#3f71df"/>                                 
                    <span class="spn">{{ $t('MSG_TXT_GO_PORTL') }}</span>
                </button>
                <button class="btn btn-iconed"
                    @click="onClickDetailView">
                    <i class="pi pi-clone" style="color:#3f71df"/>
                    <span class="spn">{{ $t('MSG_TXT_DETAIL_INFO') }}</span>
                </button>
            </div>
        </div>
      </div>
  </li>
</template>

<script>
import systemConfig from '../../../../config/config';
export default {
  name: 'SuiPortalStudioCard',
  props: {
    portalObject: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      currentComponent: null,
      params: {},
    };
  },
  mounted() {

  },
  methods: {
    onClickPreview(e){
      this.$emit('onClickPreview', e);
    },
    onClickDetailView(e){
      this.$emit('onClickDetail', e);
    },
    onClickPSCard(e){
      this.$emit('onClickPSCard', e);
    },    
  },
};
</script>

<style scoped>
</style>
