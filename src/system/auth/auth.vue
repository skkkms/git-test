<template>
  <div>
    <div class="content_text">      
      <span style="font-weight: bold; color: red"> {{ text }} </span>            
    </div>
  <textarea :value="epid" class="epid" style="width: 400px; height: 300px;">    
  </textarea>
  <div>
    <button class="saveBtn" @click="onSave">Save As</button>
    </div>
  </div>
</template>
<script>
  import AuthManager from '~system/auth/AuthManager';
  
  export default {
    data() {
      return {
        epid: 'loading',
        text: 'IE에서 접속하세요',
      }
    },
    mounted() {
      this.epid = `export default '${AuthManager.getAuthData()}'`;
      this.text = 'src/system/auth/epid.js 에 붙여 넣으세요';
    },
    methods: {
      onSave() {
        const ie = navigator.userAgent.match(/MSIE\s([\d.]+)/),
            ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/),
            ieEDGE = navigator.userAgent.match(/Edge/g),
            ieVer=(ie ? ie[1] : (ie11 ? 11 : (ieEDGE ? 12 : -1)));

            if (ie && ieVer<10) {
              console.log("No blobs on IE ver<10");
              return;
            }

          const textFileAsBlob = new Blob([this.epid], {
            type: 'text/plain'
          });

          window.navigator.msSaveBlob(textFileAsBlob, 'epid.js');
      }
    }
  };
</script>

<style scoped>
  .content_text {    
    font-size: 15px;
  }

  .saveBtn {
    margin-top: 20px;
    width: 100px;
    height: 30px;
    border-radius: 4px;
    background-color: blue;
    color:white;
  }
</style>