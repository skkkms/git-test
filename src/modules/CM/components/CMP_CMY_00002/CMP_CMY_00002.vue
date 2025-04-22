<template>
  <div class="comm_scrInput_wrap">
    <div>
      <sui-text-field
        ref="knoxUserName"
        v-model="knox.userName"
        style="width:100%;"
        :disabled="disabled"
        :fixedIcon="fixedIcon"
        :maxlength="maxlength"
        @clear-input="reset"
        @focus="focus"
        @keyup.enter="onEmpClick"
      />
    </div>
    <sui-button
      type="button"
      class="comm_btn_InputScr"
      :disabled="disabled"
      @click="onEmpClick"
    />
  </div>
</template>
<script>
export default {
  name: 'CmpEmpSelect',
  props: {
    selectedKnoxUser: {
      type: Object,
      default() {
        return {
          userName: '',
          epId: '',
          epNo: '',
          knoxId: '',
          email: '',
          cpnyCd: '',
          cpnyNm: '',
          cpnyEnNm: '',
          deptId: '',
          deptNm: '',
          deptEnNm: '',
          crlvCd: '',
          title: '',
          titlename: '',
          cp: '',
          pbLcIdYn: '',
          usrRealUseYn: '',
          usrTypeCd: '',
          irsdSttCd: '',
          dsplLngId: '',
          extrSysUsrYn: '',
          extrCompId: '',
          usrCntn: '',
          delYn: '',
          usrNm: '',
          usrGlblNm: '',
        };
      },
    },
    checkboxMode: {
      type: Boolean,
      default() {
        return false;
      },
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      },
    },
    fixedIcon: {
      type: Boolean,
      default() {
        return false;
      },
    },
    maxlength: {
      type: String,
      default: '100',
    },
  },
  data() {
    return {
      knox: this.selectedKnoxUser,
      mode: this.checkboxMode,
    };
  },
  methods: {
    onEmpClick() {
      const knoxPopupMode = this.checkboxMode;
      let iptKnoxUserName = '';
      if (this.knox.userName !== '') {
        iptKnoxUserName = this.knox.userName;
      }

      utils.openLayerPopup('PGE_CMY_00002', this.onEmpPopupCallback, {
        // pageInitialData: { iptKnoxUserName : iptKnoxUserName, knoxPopupMode:knoxPopupMode },
        pageInitialData: { iptKnoxUserName, knoxPopupMode },
        size: 'lg',
      });
    },
    onEmpPopupCallback(nodeData) {
      if (nodeData && nodeData.length === 1) {
        this.knox.userName = nodeData[0].cn;
        this.knox.epId = nodeData[0].epid;
        this.knox.epNo = nodeData[0].employeenumber;
        this.knox.knoxId = nodeData[0].userid;
        this.knox.email = nodeData[0].mail;
        this.knox.cpnyCd = nodeData[0].eporganizationnumber;
        this.knox.cpnyNm = nodeData[0].o;
        this.knox.cpnyEnNm = nodeData[0].epenorganizationname;
        this.knox.deptId = nodeData[0].departmentnumber;
        this.knox.deptNm = nodeData[0].department;
        this.knox.deptEnNm = nodeData[0].ependepartment;
        this.knox.crlvCd = nodeData[0].eptitlenumber;
        this.knox.title = nodeData[0].title;
        this.knox.titlename = nodeData[0].eptitlename;
        this.knox.cp = nodeData[0].mobile;
        this.knox.pbLcIdYn = nodeData[0].epuserclassify;
        this.knox.usrRealUseYn = 'Y';
        this.knox.usrTypeCd = nodeData[0].employeetype;
        this.knox.irsdSttCd = 'A';
        this.knox.dsplLngId = nodeData[0].eppreferredlanguage;
        this.knox.extrSysUsrYn = '';
        this.knox.extrCompId = '';
        this.knox.usrCntn = nodeData[0].description;
        this.knox.delYn = 'N';
        this.knox.usrGlblNm = nodeData[0].epencn;
        this.$emit('selected', this.knox);
      }
    },
    focus() {
      this.$refs.knoxUserName.setFocus();
    },
    reset() {
      this.knox.userName = '';
      this.knox.epId = '';
      this.knox.epNo = '';
      this.knox.knoxId = '';
      this.knox.email = '';
      this.knox.cpnyCd = '';
      this.knox.cpnyNm = '';
      this.knox.cpnyEnNm = '';
      this.knox.deptId = '';
      this.knox.deptNm = '';
      this.knox.deptEnNm = '';
      this.knox.crlvCd = '';
      this.knox.title = '';
      this.knox.titlename = '';
      this.knox.cp = '';
      this.knox.pbLcIdYn = '';
      this.knox.usrRealUseYn = '';
      this.knox.usrTypeCd = '';
      this.knox.irsdSttCd = '';
      this.knox.dsplLngId = '';
      this.knox.extrSysUsrYn = '';
      this.knox.extrCompId = '';
      this.knox.usrCntn = '';
      this.knox.delYn = '';
      this.knox.usrGlblNm = '';
      this.$emit('selected', this.knox);
    },
  },
};
</script>
<style scoped>
</style>
