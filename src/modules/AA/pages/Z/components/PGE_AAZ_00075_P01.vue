<template>
  <div>
    <template slot="title">
      <div class="modal-title mb45">
        다운로드 사유
      </div>
    </template>
    <template>
      <div class="modal-body">
        <!-- ::S 콘텐츠1 -->
        <ur-form-box toggleable>
          <ur-form-item
            label="등록자"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            BJ123
          </ur-form-item>
          <ur-form-item
            label="등록일시"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            2022-10-13 15:35:35
          </ur-form-item>
          <ur-form-item
            label="내용"
            :label-align="'right'"
            required
            style="width: 100%; height: auto;"
            class="flex_wrap"
          >
            <div>
              <textarea
                rows="4"
              />
              <span class="subscript_txt ">
                상세 정보가 포함된 엑셀의 다운로드 사유를 작성해주세요.
              </span>
            </div>
          </ur-form-item>
        </ur-form-box>


        <!-- ::E 콘텐츠1 -->
        <!-- ::S 콘텐츠2 -->

        <!-- ::E 콘텐츠2 -->
      </div>
    </template>
    <template>
      <div class="comm_btn_wrap bt1">
        <div class="right_box mt10">
          <ur-button @click="closeModalP01">
            닫기
          </ur-button>
          <ur-button color="violet">
            저장
          </ur-button>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'PGE_AAZ_00075_P01', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
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
  },
  methods: {
    closeModalP01() { this.modal.close() },
    closed() {},
  },
}
</script>
  <style scoped />
