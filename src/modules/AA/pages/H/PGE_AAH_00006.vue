<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S:: 영상 슬롯 정보 -->
      <div class="comm_title_wrap">
        <h4>
          {{$t("MSG_TIT_VIDEO_SLOT_INFO")}}
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_SLOT_NM')"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <span class="subscript_txt pr16">
            {{subject}}
          </span>
          <ur-text-field
            v-model="eventCode"
            value=""
            style="width: 50%; padding-left:20px;"
            :readonly="true"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_STRE_START_DAY')"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{slotStartDay}}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_STRE_END_DAY')"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          {{slotEndDay}}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_PARTCP_START_DAY')"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          {{partcpStartDay}}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_PARTCP_END_DAY')"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          {{partcpEndDay}}
        </ur-form-item>
        <template v-for="(item, index) in timeSettngValueArr">
          <ur-form-item :key="index"
            :label="$t('MSG_TXT_TIME_SLOT')+(index+1)"
            required
            :label-align="'right'"
            style="width: 50%; height: auto;"
            class="flex_wrap"
          >
            {{timeSettngValueArr[index]}}
          </ur-form-item>
          <ur-form-item
            :label="$t('MSG_TXT_CAPA')+(index+1)" :key="index+'1'"
            required
            :label-align="'right'"
            style="width: 50%; height: auto;"
            class="flex_wrap"
          >
            {{timeCapaCntArr[index]}}
          </ur-form-item>
        </template>
      </ur-form-box>
      <!-- E:: 영상 슬롯 정보 -->

      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button v-permission:read="this.$options.name" @click="list">
              {{$t('MSG_BTN_LIST')}}
            </ur-button>
          </div>
          <div class="right_box">
            <ur-button v-permission:update="this.$options.name" color="violet" @click="modifyForm">
              {{$t('MSG_BTN_MOD')}}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: 'PGE_AAH_00006', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      slotSeq: '',
      subject: '',
      eventCode: '',
      slotStartDay: '',
      slotEndDay: '',
      partcpStartDay: '',
      partcpEndDay: '',
      timeSettngValueArr: [],
      timeCapaCntArr: [],
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
    const param = {          
      slotSeq: this.$route.params.slotSeq,
    };

    // 상세
    http.request(this.$options.name, 'DTS_AAH_00011', {
      query: param,
    }).then(res => {
      this.slotSeq = res.data.slotSeq;
      this.subject = res.data.subject;
      this.eventCode = res.data.eventCode;
      this.slotStartDay = res.data.slotStartDay;
      this.slotEndDay = res.data.slotEndDay;
      this.partcpStartDay = res.data.partcpStartDay;
      this.partcpEndDay = res.data.partcpEndDay;     
    }).catch(error => {
      console.log('error : ',error);
    });

    // 타임 슬롯 리스트
    http.request(this.$options.name, 'DTS_AAH_00021', {
      query: param,
    }).then(res => {

      for (let i=0; i<res.data.length; i++) {
        this.timeSettngValueArr.push(res.data[i].timeSettngValue);
        this.timeCapaCntArr.push(res.data[i].timeCapaCnt);
      }

    }).catch(error => {
      console.log('error : ',error);
    });
  },
  methods: {
    
    modifyForm() {
      utils.goPage('PGE_AAH_00007', {slotSeq: this.$route.params.slotSeq});
    },

    list() {
      utils.goPage('PGE_AAH_00004', {});
    }
  },
}
</script>
<style scoped>
</style>
