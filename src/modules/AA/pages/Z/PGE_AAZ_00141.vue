<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <!-- 사랑단 이미지 관리 등록/수정 -->
    <sui-page-contents>
      <!-- 사랑단 이미지 정보 -->
      <div class="comm_title_wrap">
        <h4>
          {{ $t('MSG_TXT_LOV_IMG_INFO') }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <!-- 사랑단 분류 -->
        <ur-form-item
          :label="$t('MSG_TXT_LOVGRP_KIND_CD')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-radio-wrapper
            v-model="inputData.lovgrpKindCd"
            sm
            :items="codes.COD_IA_LOVGRP_KIND"
            @input="inputLovgrpKindCd"
          />
        </ur-form-item>

        <!-- 활동일 -->
        <ur-form-item
          :label="$t('MSG_TXT_ACTIVITY_DATE')"
          class="flex_wrap"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-date-picker
            v-model="inputData.activityDate"
            input-type="YYYY-MM-DD"
            model-type="YYYYMMDD"
            init="day+30"
            :rules="$rules.getRules('not_empty')"
            fixed-message
          />
        </ur-form-item>

        <!-- 활동제목 -->
        <ur-form-item
          :label="$t('MSG_TXT_ACTIVITY_TITLE')"
          class="flex_wrap"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="inputData.activitySubject"
            style="width: 100%;"
            maxlength="300"
            :rules="$rules.getRules('max_len(300)')"
            fixed-message
          />
        </ur-form-item>

        <!-- 멤버십-->
        <ur-form-item
          :label="$t('MSG_TXT_MEM_SHP')"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-dropdown
            v-if="showMemshp == '001'"
            v-model="inputData.memshpClassCd"
            :items="COD_IA_LOVGRP_MEMSHP_CD_ANIML"
            no-select="no-select"
            :msg-no-select="$t('MSG_TXT_ALL')"
            @input="inputMemshpClassCd"
          />
          <ur-dropdown
            v-if="showMemshp == '002'"
            v-model="inputData.memshpClassCd"
            :items="COD_IA_LOVGRP_MEMSHP_CD_PLANT"
            no-select="no-select"
            :msg-no-select="$t('MSG_TXT_ALL')"
            @input="inputMemshpClassCd"
          />
        </ur-form-item>

        <!-- 오픈여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_OPEN_YN')"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-radio-wrapper
            v-model="inputData.openYn"
            sm
            :items="codes.COD_IAA_LOVGRP_OPEN_YN"
          />
        </ur-form-item>

        <!-- 레벨 -->
        <ur-form-item
          :label="$t('MSG_TXT_LEVEL')"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-dropdown
            v-if="showLvl == ''"
            v-model="inputData.lvlCd"
            :items="codes.COD_IA_LOVGRP_LV_CD"
            no-select="no-select"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
          <ur-dropdown
            v-if="showLvl == '001'"
            v-model="inputData.lvlCd"
            :items="codesLvl.COD_IA_LOVGRP_LV_CD_001"
            no-select="no-select"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
          <ur-dropdown
            v-if="showLvl == '002'"
            v-model="inputData.lvlCd"
            :items="codesLvl.COD_IA_LOVGRP_LV_CD_002"
            no-select="no-select"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
          <ur-dropdown
            v-if="showLvl == '003'"
            v-model="inputData.lvlCd"
            :items="codesLvl.COD_IA_LOVGRP_LV_CD_003"
            no-select="no-select"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
          <ur-dropdown
            v-if="showLvl == '011'"
            v-model="inputData.lvlCd"
            :items="codesLvl.COD_IA_LOVGRP_LV_CD_011"
            no-select="no-select"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
          <ur-dropdown
            v-if="showLvl == '012'"
            v-model="inputData.lvlCd"
            :items="codesLvl.COD_IA_LOVGRP_LV_CD_012"
            no-select="no-select"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
          <ur-dropdown
            v-if="showLvl == '013'"
            v-model="inputData.lvlCd"
            :items="codesLvl.COD_IA_LOVGRP_LV_CD_013"
            no-select="no-select"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
          <ur-dropdown
            v-if="showLvl == '014'"
            v-model="inputData.lvlCd"
            :items="codesLvl.COD_IA_LOVGRP_LV_CD_014"
            no-select="no-select"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>

        <!-- 프로젝트 -->
        <ur-form-item
          :label="$t('MSG_TXT_LOV_PROJECT')"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-radio-wrapper
            v-model="inputData.pjtYn"
            sm
            :items="codes.COD_LOVGRP_PRJ_YN"
            :rules="$rules.getRules('not_empty')"
            fixed-message
          />
        </ur-form-item>
        <!-- ::S 05/03 chip 퍼블 수정 -->
        <!-- 클래스(반) -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_LOV_CLASS')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <div
            class="chip-wrapper"
            style="width: 100%;"
          >
            <div
              class="border_box"
            >
              <ur-input-chip
                v-for="(chip,i) in inputChips"
                :key="i"
                size="small"
                class="ur-chip-wrapper__item"
                :item="chip"
                @click-delete="onDeleteClick"
              >
                {{ chip.value }}
              </ur-input-chip>
            </div>
            <ur-text-field
              v-model="inputData.classGrp"
              style="width: 100%;"
              @enter="addInputChip"
            />
            <span class="subscript_txt pr16">
              클래스 입력 후 엔터를 쳐서 키워드를 등록해주세요.
            </span>
            <!-- 클래스 입력 후 엔터를 쳐서 키워드를 등록해주세요. -->
          </div>
        </ur-form-item>
        <!-- ::E 05/03 chip 퍼블 수정 -->

        <!-- 활동반가입년도 -->
        <ur-form-item
          :label="$t('MSG_TXT_LOV_ACTIVITY_YYYY')"
          class="flex_wrap"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-year-picker
            v-model="inputData.activityGrpJoinYy"
            clearable
            :confirm-label="this.$t('MSG_TXT_SELT')"
            :rules="$rules.getRules('not_empty')"
            fixed-message
          />
        </ur-form-item>
      </ur-form-box>


      <!-- 활동 사진 -->
      <div class="comm_btn_wrap mt35">
        <div class="comm_title_wrap">
          <h4>
            {{ $t('MSG_TXT_ACTIVITY_PHOTO') }}
          </h4>
        </div>

        <div class="left_box pl16">
          <!-- 파일찾기 -->
          <ur-button
            color="violet"
            @click="onClickFileOpen"
          >
            {{ $t("MSG_BTN_SCH_FILE") }}
          </ur-button>

          <!-- 삭제 -->
          <ur-button color="violet">
            {{ $t("MSG_BTN_DEL") }}
          </ur-button>

          <!-- 초기화 -->
          <ur-button color="violet">
            {{ $t("MSG_BTN_INTL") }}
          </ur-button>
        </div>
        <div class="right_box">
          <!-- 파일명 정렬 -->
          <ur-button>
            {{ $t("MSG_BTN_FILENM_ORDER") }}
          </ur-button>
        </div>
      </div>

      <ur-data-grid
        ref="grid"
        :headers="columns"
        :data-source="fileList"
        :options="opts"
        :data-set-options="{id: 'id'}"
      />
      <div class="bt1 mt45">
        <sui-page-footer class="comm_btn_wrap">
          <div class="btn_wrap">
            <!-- 목록 -->
            <div class="left_box">
              <ur-button @click="onClickList">
                {{ $t("MSG_BTN_LIST") }}
              </ur-button>
            </div>

            <!-- 저장 -->
            <div class="right_box">
              <ur-button
                color="violet"
                @click="onClickSave"
              >
                {{ $t("MSG_BTN_SAVE") }}
              </ur-button>
            </div>
          </div>
        </sui-page-footer>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component'
import utils from '@/common/js/utils'

export default {
  name: 'PGEAAZ00141',
  components: {
  },
  data() {
    return {
      // 공통코드
      codeKeyList: ['COD_IA_LOVGRP_KIND', 'COD_IA_LOVGRP_MEMSHP_CD', 'COD_IA_LOVGRP_LV_CD', 'COD_IAA_LOVGRP_OPEN_YN', 'COD_LOVGRP_PRJ_YN'],
      codes: {
        COD_IA_LOVGRP_KIND: [], COD_IA_LOVGRP_MEMSHP_CD: [], COD_IA_LOVGRP_LV_CD: [], COD_IAA_LOVGRP_OPEN_YN: [], COD_LOVGRP_PRJ_YN: [],
      },
      COD_IA_LOVGRP_MEMSHP_CD_ANIML: [],
      COD_IA_LOVGRP_MEMSHP_CD_PLANT: [],
      codesLvl: {
        COD_IA_LOVGRP_LV_CD_001: [],
        COD_IA_LOVGRP_LV_CD_002: [],
        COD_IA_LOVGRP_LV_CD_003: [],
        COD_IA_LOVGRP_LV_CD_011: [],
        COD_IA_LOVGRP_LV_CD_012: [],
        COD_IA_LOVGRP_LV_CD_013: [],
        COD_IA_LOVGRP_LV_CD_014: [],
      },

      inputData: {
        activityId: '',
        lovgrpKindCd: '001',
        activityDate: '',
        activitySubject: '',
        memshpClassCd: '',
        openYn: '',
        lvlCd: '',
        pjtYn: '',
        classGrp: '',
        activityGrpJoinYy: '',
      },
      columns: [],
      fileList: new urDataSet(),

      opts: { // 토탈 x 전체선택X 셀선택 o
        noInfo: true,
        multiSelect: false,
        selectCheck: true,
        height: 300,
        // ALT 태그 추가시 테이블 옵션에 rowHeight: 'auto'추가
        rowHeight: 'auto',
      },
      inputChips: [],
    }
  },
  computed: {
    showMemshp() {
      return this.inputData.lovgrpKindCd
    },
    showLvl() {
      return this.inputData.memshpClassCd
    },
  },
  watch: {
  },
  created() {
    const that = this

    // 년도 셋팅
    const dt = new Date()
    this.inputData.activityGrpJoinYy = dt.getFullYear().toString()

    // 공통코드 셋팅 및 초기화
    http.mergeCodeList(this.$options.name, this.codeKeyList, this.codes).then(() => {
      this.COD_IA_LOVGRP_MEMSHP_CD_ANIML = this.codes.COD_IA_LOVGRP_MEMSHP_CD.slice(0, 3)// 시작 ~ 3개
      this.COD_IA_LOVGRP_MEMSHP_CD_PLANT = this.codes.COD_IA_LOVGRP_MEMSHP_CD.slice(3)// 3번째부터 ~4개

      this.codesLvl.COD_IA_LOVGRP_LV_CD_001 = this.codes.COD_IA_LOVGRP_LV_CD.slice(0, 3)// 시작 ~ 3개
      this.codesLvl.COD_IA_LOVGRP_LV_CD_002 = this.codes.COD_IA_LOVGRP_LV_CD.slice(3, 4)// 3번째 ~ 1개
      this.codesLvl.COD_IA_LOVGRP_LV_CD_003 = this.codes.COD_IA_LOVGRP_LV_CD.slice(4, 6)// 4번째 ~ 2개
      this.codesLvl.COD_IA_LOVGRP_LV_CD_011 = this.codes.COD_IA_LOVGRP_LV_CD.slice(6, 8)// 3번째 ~ 2개
      this.codesLvl.COD_IA_LOVGRP_LV_CD_012 = this.codes.COD_IA_LOVGRP_LV_CD.slice(8, 9)// 3번째 ~ 1개
      this.codesLvl.COD_IA_LOVGRP_LV_CD_013 = this.codes.COD_IA_LOVGRP_LV_CD.slice(4, 6)// 3번째 ~ 2개
      this.codesLvl.COD_IA_LOVGRP_LV_CD_014 = this.codes.COD_IA_LOVGRP_LV_CD.slice(-1)// 끝에서 1개

      this.columns = [
        {
          text: 'No.',
          value: 'activitySeqNo',
          width: 50,
        },
        {
          text: this.$t('MSG_TXT_FILE_NM'),
          value: 'fileImagUrl',
          component: {
            // ALT 태그 추가시 최상위 div에 class="pdCol10" style="flex-direction: column;" 추가
            template: '<div class="pdCol10" style="flex-direction: column;"><div style="display: flex; flex-direction: row; align-items: center;"><p class="pr10">동물사랑단_초급반_사진_1.jpg</p></div><img class="pdCol10" src="images/food/food_0.png" style="width: fit-content; height: 150px;"></div>',
          },
        },
        {
          text: '',
          value: 'altTag',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-text-field :placeholder="$t(\'MSG_TXT_PARKNG_NAME\')" /></div>',
          },
        },
        {
          text: this.$t('MSG_TXT_OPEN_YN'),
          value: 'exposrYn',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-radio-wrapper sm :items="codes.COD_LOVGRP_PRJ_YN" v-model="row.exposrYn" /></div>',
          },
        },
      ]
    }).catch(() => {})
  },
  mounted() {
  },
  methods: {

    /** *************************************
     * 파일찾기
     *************************************** */
    onClickFileOpen() {

    },

    // 파람데이터 만들기
    getParam() {
      const inputParam = this.inputData
      return inputParam
    },

    /** *************************************
     * 저장
     *************************************** */
    async onClickSave() {
      // 유효성 체크
      if (this.isValidation()) {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => { // 저장하시겠습니까?
          // 수정시..
          if (this.activityId) {
            http.request(this.$options.name, 'DTS_AAE_00015', {
              data: this.getParam(),
            }).then(() => {
              utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
              this.onClickList() // 목록으로 이동..
            })
          }
          // 등록시..
          else {
            http.request(this.$options.name, 'DTS_AAE_00013', {
              data: this.getParam(),
            }).then(() => {
              utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
              this.onClickList() // 목록으로 이동..
            })
          }
        })
      }
    },

    // 유효성 체크
    isValidation() {
      return true
    },

    addInputChip(val) {
      this.inputChips.push({ value: val })
      this.inputData.classGrp = ''
    },

    onDeleteClick(item) {
      if (item && this.inputChips.indexOf(item) > -1) {
        this.inputChips.splice(this.inputChips.indexOf(item), 1)
      }
    },

    inputLovgrpKindCd() {
      this.inputData.memshpClassCd = ''
      this.inputData.lvlCd = ''
    },

    inputMemshpClassCd() {
      this.inputData.lvlCd = ''
    },

    // 사랑단 이미지 관리 목록으로 이동
    onClickList() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAE_00042', { params })
    },
  },
}
</script>
<style scoped>
</style>
