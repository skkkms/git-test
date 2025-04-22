<template>
  <div>
    <sui-button type="button" value="" :class="btnClass" @click="onSelectFile">
      {{ btnLabel }}
    </sui-button>
    <input type="file" name="inputFileType" ref="inputFile" v-show="isShow" :accept="acceptExt" @change="onFileChange" />
</div>
</template>
<script>
import utils from '../util';

export default {
  props: {
    btnLabel: {
      type: String,
      required: false,
      default(){
        return "파일첨부"
      }
    },
    btnClass: {
      type: String,
      required: false,
      default(){
        return ""
      }
    },
    acceptExt: {
      type: String,
      required: false,
      default(){
        return ""
      }
    },

  },
  computed: {
  },
  data() {
    return {
      isShow: false,
      inputFileValue: "",
    };
  },
  methods: {
    onSelectFile(){
      this.$refs.inputFile.click();
    },
    onFileChange(e){
      this.$emit('change', e.srcElement.files);
      this.deleteAttachedFile();
    },
    /*
    onInput(e){
      this.$emit('change', e.srcElement.files);
    },
    */
    deleteAttachedFile(){
      let files = document.getElementsByName('inputFileType');
      utils.forEach(files, (file) => {
        file.type = '';
        file.type = 'file';
      });
      this.$refs.inputFile.type = '';
      this.$refs.inputFile.type = 'file';
    }
  }
};

</script>

<style>

</style>
