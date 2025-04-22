<template>
  <div class="mr15">
    <div class="comm_btn_wrap">

      <!-- <sui-tooltip-popper placement="left-start" click>
        <template slot="activator">
          <sui-input-label :label="uploadedFileListSummary" class="-tooltip-popper-page__activator" />
        </template>
        <template>
          <div style="width: 350px; padding: 10px;">
            <h1>text Tooltip text Tooltip</h1>
            <h3>content content content content content content content content content content content content content content </h3>
            <h3>content content content content content content content content content content content content content content </h3>
          </div>
        </template>
      </sui-tooltip-popper> -->

        <sui-input-label :label="uploadedFileListSummary" :title="fileListTooltip" />
        <input type="file" ref="inputFile" multiple v-show="false" :accept="acceptExt" @change="onFilesChange($event.target.files)" />
        <sui-button type="button" class="comm_btn_border" @click="onSelectFile" title= " ">
          {{ this.$t('MSG_TXT_FILE_ATTH') }}
        </sui-button>
        <sui-button type="button" class="comm_btn_border" @click="deleteAllFiles()" title= " ">
          {{ this.$t('MSG_BTN_DEL_ALL') }}
        </sui-button>
    </div>
   </div>
</template>

<script>

export default {
  name: 'CmpFileAttacherTwoBtn',
  props: {
    // 이 컴포넌트를 사용하는 페이지ID, 데이터서비스 호출시 사용
    pageId: {
      type: String,
      required: true,
      default(){
          return '';
      }
    },
    disabled: {
      type: Boolean,
      required: false,
      default(){
        return false;
      }
    },
    acceptExt: {
      type: String,
      required: false,
      default(){
        return "*";
      }
    },
  },
  computed: {
  },
  data() {
    return {
      uploadedFileListSummary: "",
      fileListTooltip:"",
      uploadedFileList: [],
    }
  },
  mounted() {
  },
  beforeDestroy() {
    // 이벤트 핸들러 및 사용한 서드 파티 라이브러리 자원 반환
  },
  watch: {
  },
  methods: {
    reset() {
    },
    replaceUploadedFileList( objList){
        this.uploadedFileList = objList;
    },
    /**
     * 첨부된 파일 목록을 요약
     * @function summaryUploadFiles
     * @returns {none}
     */
    summaryUploadFiles(){
        this.uploadedFileListSummary = "";
        this.fileListTooltip = "";

        if( this.uploadedFileList.length > 0){
            this.uploadedFileListSummary = this.uploadedFileList[0].fileName + "(" + this.uploadedFileList.length + "개)";

            let _fileList = "";
            this.uploadedFileList.forEach( (itm)=>{
                _fileList = _fileList + "\n" + itm.fileName;
            });
            this.fileListTooltip = _fileList;
        }
    },
        /**
     * 모든 파일들을 삭제한다.
     *
     * @function deleteAllFiles
     * @return  none
     */
    deleteAllFiles(){
      this.uploadedFileList = [];
      this.$emit("uploaded", this.getAttachedFileInfo());
      this.summaryUploadFiles();
    },   

    /**
     * input type file의 click 이벤트를 발생시켜 file browser 창을 연다.
     *
     * @function onSelectFile
     * @return  none
     */
    onSelectFile(){
      this.$refs.inputFile.click();
    },
    /**
     * input type file의 change 이벤트 핸들러
     * file browser 에서 파일을 선택한 순간 해당 파일 정보를 기존 파일 목록에 추가한다.
     * 파일전송까지 한번에 처리
     *
     * @function onFilesChange
     * @param  {Array} fileList : 선택한 파일(들)
     * @return  {String}
     */
    onFilesChange(fileList) {
      let that = this;
      // handle file changes
      for( let j = 0; j < fileList.length; j++){

        let bDup = false;
        let _file = fileList[j];
        let _re = /^.+\.(\w*$)/;
        let _ext = _re.exec(_file.name);

        // local 파일 정보와 파일 브라우저에서 선택한 파일정보 비교
        for( let i = 0; i < that.uploadedFileList.length; i++){
          if( _file.name == that.uploadedFileList[i].fileName){
            bDup = true;
            that.uploadedFileList[i].fileName = _file.name;
            that.uploadedFileList[i].fileSize = _file.size;
            that.uploadedFileList[i].fileExtensionName = _ext.length > 1 ? _ext[1]: "";
            that.uploadedFileList[i].arrayalOrder = "autoNumberingColumn";
            that.uploadedFileList[i].file = _file;
            that.uploadedFileList[i].realityFilePath = ""; // 명이 동일한 파일을 선택한 경우에 다시 올린다.

            break;
          }
        }

        if( !bDup){
          let emptyDataFieldsObj = that.getEmptyDataFieldsJson();
          emptyDataFieldsObj.checked = false;
          emptyDataFieldsObj.fileName = _file.name;
          emptyDataFieldsObj.fileSize = _file.size;
          emptyDataFieldsObj.fmtSize = utils.numberFormat( _file.size*1/1024, 2);
          emptyDataFieldsObj.fileExtensionName = _ext.length > 1 ? _ext[1]: "";
          emptyDataFieldsObj.arrayalOrder = "autoNumberingColumn";
          emptyDataFieldsObj.file = _file;

          that.uploadedFileList.push(emptyDataFieldsObj);
        }
      }

      // 파일 선택하자마자 바로 전송
      this.uploadFiles();

      // 동일한 파일을 연속 선택시 change 이벤트가 발생하지 않는 문제 해결
      document.querySelector("input[type='file']").value = "";
    },

    /**
     * 파일 업로드 실행
     * 이미 올라간 파일을 제외하고 아직 올라가지 않은 파일을 전송해야 함
     * @function uploadFiles
     * @return {Object} Promise? TODO:
     */
    uploadFiles(){

      let _allFiles = this.uploadedFileList;
      // 업로드 대상 파일 배열
      let _targetFiles = [];
      _allFiles.forEach( curFile => {
        if( utils.isEmpty(curFile.realityFilePath)){
            _targetFiles.push( utils.cloneDeep( curFile));
        }
      });

      if( _targetFiles.length === 0){
        // "업로드 대상 파일이 없습니다."
        utils.messageBox("alert",null,this.$t('MSG_TXT_NO_UPLOAD_FILE'));
        return false;
      }

      // handle file changes
      const formData = new FormData();
      let formDatas = [];
      _targetFiles.forEach( function( fileInfo, index){

        formData.append('files', fileInfo.file);

      });

      let params = {
        path: {
          'target-path': 'temp' // 임시 디렉토리로 파일전송
        },
        data: formData
      };

      // upload data to the server

      http.request( this.pageId, 'DTS_CMZ_00041', params ).then((res) => {
        
        // realityFilePath 맵핑
        res.data.forEach( (rtnFile)=>{
            _allFiles.forEach( (curFile)=>{
              if( rtnFile.originalFileName == curFile.fileName){
                  curFile.realityFilePath = rtnFile.serverFileName;
              }
            });
        });
        console.log( "전송파일정보:", res.data);
        this.$emit("uploaded", this.getAttachedFileInfo());
        this.summaryUploadFiles();

        // TODO: 메시지리소스 등록해야 함
      }).catch(err => {
        // 파일전송 실패
        // 대상 파일들 삭제
        for( let i = _allFiles.length - 1; i >= 0; i--){
            _allFiles.splice( i, 1);
        }
        util.openOKConfirm( err.message, this.$t('MSG_BTN_CFRM'),
        ()=>{
          //this.$refs.fileList.$refs.grid.updateGrid();
        });
      });
    },

    /**
     * 현재 파일목록 정보를 반환한다.
     * @function getAttachedFileInfo
     * @returns {Array} : 파일 정보 목록의 Object Array
     */
    getAttachedFileInfo(){
      let _tmpFileListInfo = utils.cloneDeep(this.uploadedFileList);
      _tmpFileListInfo.forEach( (itm, index)=>{
        itm.arrayalOrder = index + 1;
      });
      return _tmpFileListInfo;
    },

    /**
     * 비어있는 하나의 json object를 리턴한다.
     * dataFields 에 정의된 칼럼 정보 사용
     * @function getEmptyDataFieldsJson
     * @return {Object}
     */
    getEmptyDataFieldsJson(){
      return { 
        'checked':'',
        'arrayalOrder':'',
        'fileName':'',
        'fileSize':'',
        'file':'',
        'fmtSize':'',
        'realityFilePath':'',
        'fileExtensionName':'',
        'fileUid':'',
        'attachDocumentId':'',
        'attachGroupId':'',
        'attachItemId':'',
        'attachDocumentTypeCode':'',
        'moduleCode':'',
        'attachExcludeYn':'',
        'attachItemContent':'',
        'representativeImageYn':''
        };
    },
  },
};

</script>

<style scoped>
/* .-fdp-tooltip-popper__popper {
    background-color: #fff;
    width: auto;
    color: #212121;
    text-align: center;
    padding: 2px;
    display: inline-block;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 400;
    border: 1px solid #ebebeb;
    z-index: 200000 !important; 
}
.-fdp-tooltip-popper__popper, .popper__arrow:after {
    position: absolute;
    box-shadow: 1px 1px 10px 0 rgba(0,0,0,.3);
} */
</style>
