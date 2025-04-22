<template>
  <sui-page>
    <!-- Page Header -->
    <sui-page-header :pageId="this.$options.name" />

    <!-- Page Contents -->
    <sui-page-contents>

      <div>
          <div class="image-preview" v-if="imageData.length > 0">
              <img class="preview" id="imgPreview"  @click="toggleImgSize" style="cursor: pointer" @load="onImgLoad" :src="imageData">
          </div>
      </div>

    </sui-page-contents>

    <!-- Page Footer -->
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onSelect"
        >
          {{ this.$t('MSG_BTN_CFRM') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
  export default {
    name: 'PGE_CMZ_00014', // eslint-disable-line vue/name-property-casing
    props: {
      closePagePopup : {
        type: Function,
      },
      pageInitialData: {
        file : {}
      }
    },
    data() {
      return {
        imageData:"",
        imgPreviewRate: "100%",
      }
    },
    mounted() {
      if (this.pageInitialData.file) {
          // 이미지를 읽고 bse64 포맷으로 변환하기 위해 새로운 파일리더를 생성
          var reader = new FileReader();
          // 파일읽기 완료 이벤트 핸들러
          reader.onload = (e) => {
              this.imageData = e.target.result; // e.target 은 reader(FileReader)
          }
          reader.onabort = () => {
            console.log(reader.error);
          };

          // 데이터 URL로 파일읽기(base64 포맷으로 읽는다)
          reader.readAsDataURL(this.pageInitialData.file);
      }
    },

    methods: {
      // 이미지 사이즈를 original 과 미리보기 사이즈 사이에서 toggle
      toggleImgSize(e){
        let _img = e.srcElement;
        if( _img.getAttribute("width")){
          _img.removeAttribute("width");
          _img.removeAttribute("height");
        }
        else{
          _img.setAttribute("width", this.imgPreviewRate);
          _img.setAttribute("height", this.imgPreviewRate);
        }
      },
      onImgLoad(e) {
        let _img = e.srcElement;
        _img.setAttribute("width", this.imgPreviewRate);
        _img.setAttribute("height", this.imgPreviewRate);
      },
      onCancel() {
        this.closePagePopup('');
      },
      onSelect(){
        this.closePagePopup('');
      },
    },
  };
</script>

<style scoped>
</style>
