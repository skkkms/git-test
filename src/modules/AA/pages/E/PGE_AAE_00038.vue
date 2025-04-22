<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
  <div>
    <template slot="title">
      <div class="modal-title mb45">
        {{$t('MSG_TXT_IAA_H04')}}
      </div>
    </template>
    <template>
      <div class="modal-body">
        <!-- ::S 콘텐츠1 -->

        <ur-form-box toggleable>
          <ur-form-item
            :label="$t('MSG_TXT_ID_NAME')"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <ur-text-field
              v-model="searchIdName"
              value=""
              style="width: 300px; height: auto;"
              v-on:keyup.enter="search"
            />
          </ur-form-item>
        </ur-form-box>
        <div class="btn_wrap mt10">
          <div class="right_box">
            <ur-button color="violet" @click="search">
              {{$t('MSG_BTN_SEARCH')}}
            </ur-button>
          </div>
        </div>
        <br><br>
        <!-- ::E 콘텐츠1 -->
        <!-- ::S 콘텐츠2 -->
        <ur-data-grid
          ref="userSearchGrid"
          :headers="columns"
          :data-source="list"
          :options="options"
          :data-set-options="{id: 'id'}"
          @grid:row-dbl-click="dblClickUserSelect"
        />
        <!-- ::E 콘텐츠2 -->       
        </div>
        <div class="btn_wrap mt10">
          <div class="right_box">
            <ur-button
              @click="closeModal"
            >
              {{$t('MSG_BTN_CLOSE')}}
            </ur-button>
            <ur-button
              color="violet"
              @click="userSelect"
            >
              {{$t('MSG_BTN_SELT')}}
            </ur-button> 
          </div>
        </div>
    </template>
    <template
      slot="action"
    >
    </template>
  </div>
     </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: 'PGE_AAE_00038', // eslint-disable-line vue/name-property-casing
  components: {
  },
  props: {
    closePagePopup: {
      type: Function,
    },
  },
  data() {
    return {
      list: new this.$ur.grid.DataSet(),
      searchIdName : '',
      // 테이블 옵션
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
        height: 350,
        selectCheckOnly: false,
        resizableColumn: true
      },
      // 사용자검색팝업테이블
      columns: [
        { text: this.$t('MSG_TXT_EPNO'), value: 'empId'},
        { text: this.$t('MSG_TXT_EMPL_NM'), value: 'userNm' },
        { text: this.$t('MSG_TXT_SINGLE_ID'), value: 'singleId' },
        { text: this.$t('MSG_TXT_DEPT'), value: 'departMent' },
        { text: this.$t('MSG_TXT_GRADE'), value: 'epgradeName' },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
    //document.getElementsByClassName('ur-modal').style = '';
    console.dir("aa : "+document.getElementsByClassName('ur-modal'));
  },
  methods: {
    closeModal() { this.closePagePopup(''); },
    
    search() {
      const param = {
        searchIdName: this.searchIdName
      };
      
      //http.request(this.$options.name, 'DTS_AAE_00006', {
      http.request(this.$options.name, 'DTS_AAE_00006', {
        query: param,
      }).then(res => {
        this.list.setData(res.data);
      }).catch(error => {
        console.log(error);
      });      
    },

    userSelect() {
      this.closePagePopup(this.list.getSelected());
    },

    dblClickUserSelect(row) {
      this.closePagePopup(row);
    },
  },
}
</script>
<style scoped />