<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap mt45">
        <h4 class="-grid__column__header__root-required">
          {{ $t("MSG_TXT_DEFAULT_INFO") }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <!-- [기존정보] 콘텐츠 명 -->
        <ur-form-item
          :label="$t('MSG_TXT_TIT_CNT_NAME')"
          :label-align="'right'"
          required
          style="width: 50%;"
          class="flex_wrap"
        >
          <div
            class="flex_wrap_col"
            style="width: 100%;"
          >
            <ur-text-field
              v-model="saveParams.contentsName"
              style="width: 100%;"
              class="mb4"
              :rules="$rules.getRules('not_null')"
              maxlength="100"
            />
            <span class="subscript_txt">
              {{ $t('MSG_TXT_ADMIN_LIST_FMT') }}
            </span>
          </div>
        </ur-form-item>
        <!-- [기존정보]  노출 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="saveParams.exposrYn"
            value="Y"
            sm
          >
            {{ $t("MSG_TXT_EXPOSR_YN01") }}
          </ur-radio>
          <ur-radio
            v-model="saveParams.exposrYn"
            value="N"
            sm
          >
            {{ $t("MSG_TXT_EXPOSR_YN02") }}
          </ur-radio>
        </ur-form-item>
        <!-- [기존정보] 노출 순서 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_ORDER')"
          :label-align="'right'"
          required
          style="width: 50%;"
          class="flex_wrap"
        >
          <ur-text-field
            v-model="saveParams.exposrOrder"
            style="width: 100%;"
            class="mb4"
            :rules="$rules.getRules('not_null', 'only_numeric')"
            mask="number"
            maxlength="4"
            @keyup="saveParams.exposrOrder = parseInt(saveParams.exposrOrder, 10)"
          />
        </ur-form-item>
        <!-- [기존정보] 노출 위치 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_LCT')"
          :label-align="'right'"
          required
          style="width: 50%;"
          class="flex_wrap"
        >
          <ur-dropdown
            v-model="saveParams.exposrLocCd"
            :items="COD_IA_CURATION_EXPOSR_LOC"
            no-select="no-select"
            :msg-no-select="$t('MSG_BTN_SELT')"
            :rules="$rules.getRules('not_null')"
            @input="()=>imageChanged=false"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_LANG_DIV')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-radio-wrapper
            ref="LANGKIND"
            v-model="saveParams.langKindCd"
            :items="codes.COD_RS_LANG_KIND"
            :rules="validateRuleAtleastOne"
            sm
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('사용여부')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="saveParams.useYn"
            value="Y"
            sm
          >
            {{ $t("MSG_TXT_EXPOSR_YN01") }}
          </ur-radio>
          <ur-radio
            v-model="saveParams.useYn"
            value="N"
            sm
          >
            {{ $t("MSG_TXT_EXPOSR_YN02") }}
          </ur-radio>
        </ur-form-item>
      </ur-form-box>
      <div class="comm_title_wrap mt45">
        <h4 class="-grid__column__header__root-required">
          {{ $t("MSG_TXT_OBJ_CNTL") }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <!-- [대상자 제어] 방문횟수 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_GV_CNT')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-checkbox-wrapper
            ref="visitCntCheckbox"
            v-model="saveParams.visitCntCd"
            :items="codes.COD_IA_VISIT_CNT"
            :rules="validateRuleAtleastOne"
            sm
          />
        </ur-form-item>
        <!-- [대상자 제어] 방문상태 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_VST_STTS')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto;"
        >
          <ur-checkbox-wrapper
            ref="visitStatTypeCheckbox"
            v-model="saveParams.visitStatTypeCd"
            :items="codes.COD_IA_VISIT_STATUS"
            sm
            :rules="validateRuleAtleastOne"
          />
        </ur-form-item>
        <!-- [대상자 제어] 티어 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_MEMSHP_T')"
          :label-align="'right'"
          required
          style="width: 100%; height: auto;"
        >
          <ur-checkbox-wrapper
            ref="tearTypeCheckbox"
            v-model="saveParams.tearTypeCd"
            :items="codes.COD_IA_TEAR"
            sm
            :rules="validateRuleAtleastOne"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="comm_title_wrap mt45">
        <h4 class="-grid__column__header__root-required">
          {{ $t("MSG_TIT_CNTN_MGMT") }}
        </h4>
        <div class="title_compo">
          <ur-radio-wrapper
            v-model="saveParams.contentKindCd"
            :items="codes.COD_IA_CURATION_CONTENT_KIND"
            sm
          />
        </div>
      </div>
      <!-- [콘텐츠 관리] 코스 -->
      <ur-data-grid
        v-if="saveParams.contentKindCd=='01'?true:false"
        ref="gridP01"
        :headers="columnsT1"
        :options="options"
        :data-source="listT1"
      />
      <ur-modal
        ref="modalP01"
        xlarge
        dragable
        :title="$t('MSG_TXT_COURSE')"
        :page-id="contextPageId"
        @set-course-id="setCourseId"
      />
      <!-- [콘텐츠 관리] 시설 -->
      <ur-data-grid
        v-if="saveParams.contentKindCd=='02'?true:false"
        ref="gridP02"
        :headers="columnsT2"
        :options="options"
        :data-source="listT2"
      />
      <ur-modal
        ref="modalP02"
        class="modal-b1c6"
        xlarge
        dragable
        :title="$t('MSG_TXT_FACILITY')"
        :page-id="contextPageId"
        @set-facilt-id="setFaciltId"
        @closed="closed"
      />
      <!-- [콘텐츠 관리] 스마트 예약 -->
      <ur-data-grid
        v-if="saveParams.contentKindCd=='03'?true:false"
        ref="gridP03"
        :headers="columnsT3"
        :options="options"
        :data-source="listT3"
      />
      <ur-modal
        ref="modalP03"
        class="modal-b1c6"
        xlarge
        dragable
        :title="$t('MSG_TXT_SMART_RSV')"
        :page-id="contextPageId"
        @set-menu-id="setMenuId"
        @closed="closed"
      />
      <!-- [콘텐츠 관리] 이벤트 -->
      <ur-data-grid
        v-if="saveParams.contentKindCd=='04'?true:false"
        ref="gridP04"
        :headers="columnsT4"
        :options="options"
        :data-source="listT4"
        :data-set-options="{id: 'id'}"
      />
      <ur-modal
        ref="modalP04"
        class="modal-b1c6"
        xlarge
        dragable
        :title="$t('MSG_TXT_EVNT')"
        :page-id="contextPageId"
        @set-event-id="setEventId"
        @closed="closed"
      />
      <!-- [콘텐츠 관리] 공지 -->
      <ur-data-grid
        v-if="saveParams.contentKindCd=='05'?true:false"
        ref="gridP05"
        :headers="columnsT5"
        :options="options"
        :data-source="listT5"
        :data-set-options="{id: 'id'}"
      />
      <ur-modal
        ref="modalP05"
        class="modal-b1c6"
        xlarge
        dragable
        :title="$t('MSG_TXT_ANNM')"
        :page-id="contextPageId"
        @set-publctSubject-id="setpublctId"
        @closed="closed"
      />
      <!-- [콘텐츠 관리-입력 조건] URL -->
      <ur-data-grid
        v-if="saveParams.contentKindCd=='06'?true:false"
        ref="gridP06"
        :headers="columnsT6"
        :options="options"
        :data-source="listT6"
        :data-set-options="{id: 'id'}"
      />
      <!-- [콘텐츠 관리-입력 조건] URL END -->
      <!-- [퍼소나 등록]  -->
      <C01
        ref="personaCom"
        :page-id="contextPageId"
        :title="$t('MSG_TXT_PERSON_RGST')"
        :list="listT7"
        :park-kind-cd="saveParams.parkKindCd"
        @update="onUpdatePosList"
      />

      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <!-- [버튼] 목록 -->
            <ur-button
              color="violet"
              @click="goToList"
            >
              {{ $t("MSG_BTN_LIST") }}
            </ur-button>
          </div>
          <div class="right_box">
            <!-- [버튼] 저장 -->
            <ur-button
              color="violet"
              @click="onSave"
            >
              {{ $t("저장") }}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

import C01 from './components/PGE_AAB_00013_C01.vue'
import BasePage from '~cm/components/BasePage'

export default {
  name: 'PGE_AAB_00015', // eslint-disable-line vue/name-property-casing
  components: {
    C01,
  },
  extends: BasePage,
  data() {
    return {
      CODE_KEYS: [
        'COD_RS_LANG_KIND',
        'COD_IA_VISIT_CNT',
        'COD_IA_VISIT_STATUS',
        'COD_IA_TEAR',
        'COD_IA_CURATION_CONTENT_KIND',
        'COD_IA_EL_CURATION_EXPOSR_LOC',
        'COD_IA_CB_CURATION_EXPOSR_LOC',
      ],
      codes: {
        COD_IA_VISIT_CNT: [],
        COD_IA_VISIT_STATUS: [],
        COD_IA_TEAR: [],
        COD_IA_CURATION_CONTENT_KIND: [],
        COD_RS_LANG_KIND: [],
        COD_IA_EL_CURATION_EXPOSR_LOC: [],
        COD_IA_CB_CURATION_EXPOSR_LOC: [],
      },
      oldExposrLocCd: '',
      saveParams: {
        parkKindCd: '',
        exposrLocCd: '',
        contentsName: '',
        exposrOrder: '',
        exposrYn: 'N',
        useYn: 'Y',
        langKindCd: '1',
        visitCntCd: ['NON', 'A', 'B', 'C'],
        visitStatTypeCd: ['NON', 'A', 'B', 'C'],
        tearTypeCd: ['NON', 'T1', 'T2', 'T3', 'T4', 'T5'],
        visitCntType0Yn: 'N',
        visitCntType1Yn: 'N',
        visitCntType2Yn: 'N',
        visitCntType3Yn: 'N',
        visitStatType0Yn: 'N',
        visitStatType1Yn: 'N',
        visitStatType2Yn: 'N',
        visitStatType3Yn: 'N',
        tearType0Yn: 'N',
        tearType1Yn: 'N',
        tearType2Yn: 'N',
        tearType3Yn: 'N',
        tearType4Yn: 'N',
        tearType5Yn: 'N',
        curationContentCourseDVOList: [],
        curationContentFaciltDVOList: [],
        curationContentReserveDVOList: [],
        curationContentEventDVOList: [],
        curationContentPublctDVOList: [],
        curationContentDVOList: [],
        curationPersonaDVOList: [],
        contentKindCd: '01',
        oldContentKindCd: '01',

        dummy: '',
      },
      imageChanged: false,
      // [테이블 옵션]
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
        rowHeight: 'auto',
      },
      // [테이블 옵션]
      opts: { // 토탈 O
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
      },
      opts1: { // 토탈 x 전체선택X 셀선택 o
        noInfo: true,
        multiSelect: false,
        selectCheck: true,
        showMoveControl: true,
        rowHeight: 'auto',
      },

      // [코스 테이블]
      columnsT1: [],
      listT1: [],

      // [시설테이블]
      columnsT2: [],
      listT2: [],

      // [스마트 예약]
      columnsT3: [],
      listT3: [],

      // [이벤트]
      columnsT4: [],
      listT4: [],

      // [공지]
      columnsT5: [],
      listT5: [],

      // [URL테이블]
      columnsT6: [
      ],
      listT6: [
        { value1: '1', value2: '', value3: '' },
      ],

      // [퍼소나테이블]
      columnsT7: [],
      listT7: [],
      listT7Insert: [],
      listT7Update: [],
      listT7Delete: [],

      // [체크박스]
      validateRuleAtleastOne: [
        v => !!v || '',
        v => v.length > 0 || '',
      ],
      thumbImagUrlOld: '',
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    COD_IA_CURATION_EXPOSR_LOC() {
      if (this.saveParams.parkKindCd === '02') return this.codes.COD_IA_CB_CURATION_EXPOSR_LOC
      return this.codes.COD_IA_EL_CURATION_EXPOSR_LOC
    },

    // [modalPopUp]
    modalP01() {
      return this.$refs.modalP01
    },
    modalP02() {
      return this.$refs.modalP02
    },
    modalP03() {
      return this.$refs.modalP03
    },
    modalP04() {
      return this.$refs.modalP04
    },
    modalP05() {
      return this.$refs.modalP05
    },
    modalP07() {
      return this.$refs.modalP07
    },
    IS_NEW() {
      return this.$options.name === 'PGE_AAB_00013'
    },
    IS_UPDATE() {
      let isUpdate = false
      if (this.$options.name === 'PGE_AAB_00015') {
        isUpdate = true
      }
      return isUpdate
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
    listT7() {
      this.$refs.personaCom.update(this.listT7)
    },
  },
  created() {

  },
  mounted() {
    console.log('mounted')
    // [코드 조회]
    http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)

    const params = utils.getParameter(this, 'params')
    this.saveParams.parkKindCd = params.parkKindCd

    const that = this
    // [코스]
    this.columnsT1 = [
      { value: 'rownum', text: this.$t('MSG_TXT_NUM_SHORT'), width: 100 },
      {
        value: 'courseIdName',
        text: this.$t('MSG_TXT_EXPOSR_CNTN'),
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div><ur-text-field style="width:350px;" v-model="value" readonly/><ur-icon-button class="ml16" icon="search" icon-type="line" color="primary" @click.stop="clickCheck()"/>
                      <ur-modal ref="modal_CM" xlarge draggable title="노출 콘탠츠"></ur-modal></div>`,
          methods: {
            clickCheck() {
              utils.openLayerPopup('PGE_AAB_00045', that.setCourseId, {
                size: 'xlg',
                pageInitialData: {
                  parkKindCd: that.saveParams.parkKindCd,
                },
              })
            },
          },
        },
      },
      {
        value: 'thumbImagUrl',
        text: this.$t('MSG_TXT_THUMBNAIL'),
        required: true,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `
              <div class="pdCol10" style="flex-direction: column;"> 
                <div style="display: flex; flex-direction: row; align-items: center;">
                  <cmp-single-file-uploader
                  v-if="pixels()"
                  v-model="row.thumbImagUrl"
                  mode="UPLOAD"
                  page-id="PGE_AAB_00013"
                  upload-target="CUR000"
                  accepts="jpg,png,gif"
                  pixels="624*792"
                  preview-mode="BELOW" 
                  :rules="$rules.getRules('not_null')"
                  @input="onInput" 
                  show-guidance
                /> 
                <cmp-single-file-uploader
                  v-else
                  v-model="row.thumbImagUrl"
                  mode="UPLOAD"
                  page-id="PGE_AAB_00013"
                  upload-target="CUR000"
                  accepts="jpg,png,gif"
                  pixels="300*404"
                  preview-mode="BELOW" 
                  :rules="$rules.getRules('not_null')"
                  @input="onInput" 
                  show-guidance
                /> 
              </div>
            </div>`,
          methods: {
            onInput(v) {
              if (v !== that.thumbImagUrlOld) {
                that.imageChanged = true
              }
              that.oldExposrLocCd = that.saveParams.exposrLocCd
              that.listT1[0].thumbImagUrl = v
            },
            pixels() {
              if (that.saveParams.parkKindCd === '01' && (that.saveParams.exposrLocCd === '01' || that.saveParams.exposrLocCd === '02' || that.saveParams.exposrLocCd === '06')) return true
              if (that.saveParams.parkKindCd === '02' && (that.saveParams.exposrLocCd === '01' || that.saveParams.exposrLocCd === '05')) return true

              return false
            },
          },
        },
      },
    ]
    const listT1 = [
      {
        rownum: '1', courseId: '', courseName: '', courseIdName: '',
      },
    ]
    this.listT1 = listT1

    // [시설]
    this.columnsT2 = [
      { value: 'rownum', text: 'No.', width: 100 },
      {
        value: 'faciltName',
        text: this.$t('MSG_TXT_EXPOSR_CNTN'),
        required: true,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `
              <div class="pdCol10" style="flex-direction: column;"> 
                <div style="display: flex; flex-direction: row; align-items: center;">
                  <ur-text-field
                    style="width:350px;" 
                    v-model="value" readonly
                  />
                  <ur-icon-button
                    class="ml16" 
                    icon="search" 
                    icon-type="line" 
                    color="primary"
                    @click.stop="clickCheck(row, me)"
                  />
                  <ur-modal 
                    ref="modal_CM"
                    xlarge 
                    draggable 
                    text: title="노출 콘탠츠">
                  </ur-modal>
                </div>
              </div>`,
          methods: {
            clickCheck() {
              utils.openLayerPopup('PGE_AAB_00052', that.setFaciltId, {
                size: 'xlg',
                pageInitialData: {
                  parkKindCd: that.saveParams.parkKindCd,
                },
              })
            },
          },
        },
      },
    ]
    const listT2 = [
      { rownum: '1', faciltId: '', faciltName: '' },
    ]
    this.listT2 = listT2

    // [스마트 예약]
    this.columnsT3 = [
      { value: 'rownum', text: 'No.', width: 100 },
      {
        value: 'prodNm',
        text: this.$t('MSG_TXT_EXPOSR_CNTN'),
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `
            <div><ur-text-field style="width:350px;" v-model="value" readonly /><ur-icon-button class="ml16" icon="search" icon-type="line" color="primary" @click.stop="clickCheck(row, me)"/>
            <ur-modal ref="modal_CM" xlarge draggable title="노출 콘탠츠"></ur-modal></div>`,
          methods: {
            clickCheck() {
              utils.openLayerPopup('PGE_AAB_00047', that.setMenuId, {
                size: 'xlg',
                pageInitialData: {
                  parkKindCd: that.saveParams.parkKindCd,
                },
              })
            },
          },
        },
      },
      {
        value: 'thumbImagUrl',
        text: this.$t('MSG_TXT_THUMBNAIL'),
        required: true,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `
              <div class="pdCol10" style="flex-direction: column;"> 
                <div style="display: flex; flex-direction: row; align-items: center;">
                  <cmp-single-file-uploader
                  v-if="pixels()"
                  v-model="row.thumbImagUrl"
                  mode="UPLOAD"
                  page-id="PGE_AAB_00013"
                  upload-target="CUR000"
                  accepts="jpg,png,gif"
                  pixels="624*792"
                  preview-mode="BELOW" 
                  :rules="$rules.getRules('not_null')"
                  @input="onInput" 
                  show-guidance
                /> 
                <cmp-single-file-uploader
                  v-else
                  v-model="row.thumbImagUrl"
                  mode="UPLOAD"
                  page-id="PGE_AAB_00013"
                  upload-target="CUR000"
                  accepts="jpg,png,gif"
                  pixels="300*404"
                  preview-mode="BELOW" 
                  :rules="$rules.getRules('not_null')"
                  @input="onInput" 
                  show-guidance
                /> 
              </div>
            </div>`,
          methods: {
            onInput(v) {
              if (v !== that.thumbImagUrlOld) {
                that.imageChanged = true
              }
              that.oldExposrLocCd = that.saveParams.exposrLocCd
              that.listT3[0].thumbImagUrl = v
            },
            pixels() {
              if (that.saveParams.parkKindCd === '01' && (that.saveParams.exposrLocCd === '01' || that.saveParams.exposrLocCd === '02' || that.saveParams.exposrLocCd === '06')) return true
              if (that.saveParams.parkKindCd === '02' && (that.saveParams.exposrLocCd === '01' || that.saveParams.exposrLocCd === '05')) return true
              return false
            },
          },
        },
      },
    ]
    const listT3 = [
      {
        rownum: '1', menuId: '', menuNm: '', prodCd: '', prodNm: '',
      },
    ]
    this.listT3 = listT3

    // [이벤트]
    this.columnsT4 = [
      { value: 'rownum', text: 'No.', width: 100 },
      {
        value: 'eventName',
        text: this.$t('MSG_TXT_EXPOSR_CNTN'),
        component: {
          // components: {P04,},
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `
            <div><ur-text-field style="width:350px;" v-model="value" readonly/><ur-icon-button class="ml16" icon="search" icon-type="line" color="primary" @click.stop="clickCheck(row, me)"/>
            <ur-modal ref="modal_CM" xlarge draggable title="이벤트"></ur-modal></div>`,
          methods: {
            clickCheck() {
              utils.openLayerPopup('PGE_AAB_00048', that.setEventId, {
                size: 'xlg',
                pageInitialData: {
                  parkKindCd: that.saveParams.parkKindCd,
                },
              })
            },
          },
        },
      },
      {
        value: 'thumbImagUrl',
        text: this.$t('MSG_TXT_THUMBNAIL'),
        required: true,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `
            <div class="pdCol10" style="flex-direction: column;"> 
              <div style="display: flex; flex-direction: row; align-items: center;">
                <cmp-single-file-uploader
                v-if="pixels()"
                v-model="row.thumbImagUrl"
                mode="UPLOAD"
                page-id="PGE_AAB_00013"
                upload-target="CUR000"
                accepts="jpg,png,gif"
                pixels="624*792"
                preview-mode="BELOW" 
                :rules="$rules.getRules('not_null')"
                @input="onInput" 
                show-guidance
              /> 
              <cmp-single-file-uploader
                v-else
                v-model="row.thumbImagUrl"
                mode="UPLOAD"
                page-id="PGE_AAB_00013"
                upload-target="CUR000"
                accepts="jpg,png,gif"
                pixels="300*404"
                preview-mode="BELOW" 
                :rules="$rules.getRules('not_null')"
                @input="onInput" 
                show-guidance
              /> 
              </div>
            </div>`,
          methods: {
            onInput(v) {
              if (v !== that.thumbImagUrlOld) {
                that.imageChanged = true
              }
              that.oldExposrLocCd = that.saveParams.exposrLocCd
              that.listT4[0].thumbImagUrl = v
            },
            pixels() {
              if (that.saveParams.parkKindCd === '01' && (that.saveParams.exposrLocCd === '01' || that.saveParams.exposrLocCd === '02' || that.saveParams.exposrLocCd === '06')) return true
              if (that.saveParams.parkKindCd === '02' && (that.saveParams.exposrLocCd === '01' || that.saveParams.exposrLocCd === '05')) return true
              return false
            },
          },
        },
      },
    ]
    const listT4 = [
      {
        rownum: '1', courseId: '', eventId: '', eventName: '',
      },
    ]
    this.listT4 = listT4

    // [공지]
    this.columnsT5 = [
      { value: 'rownum', text: 'No.', width: 100 },
      {
        value: 'publctSubject',
        text: this.$t('MSG_TXT_EXPOSR_CNTN'),
        component: {
          props: ['row', 'value', 'text', 'me'],
          template: `
            <div><ur-text-field style="width:350px;" v-model="value" readonly/><ur-icon-button class="ml16" icon="search" icon-type="line" color="primary" @click.stop="clickCheck(row, me)"/>
            <ur-modal ref="modal_CM" xlarge draggable title="공지"></ur-modal></div>`,
          methods: {
            clickCheck() {
              utils.openLayerPopup('PGE_AAB_00049', that.setpublctId, {
                size: 'xlg',
                pageInitialData: {
                  parkKindCd: that.saveParams.parkKindCd,
                },
              })
            },
          },
        },
      },
      {
        value: 'thumbImagUrl',
        text: this.$t('MSG_TXT_EXPOSR_CNTN'),
        required: true,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `
            <div class="pdCol10" style="flex-direction: column;"> 
              <div style="display: flex; flex-direction: row; align-items: center;">
                <cmp-single-file-uploader
                v-if="pixels()"
                v-model="row.thumbImagUrl"
                mode="UPLOAD"
                page-id="PGE_AAB_00013"
                upload-target="CUR000"
                accepts="jpg,png,gif"
                pixels="624*792"
                preview-mode="BELOW" 
                :rules="$rules.getRules('not_null')"
                @input="onInput" 
                show-guidance
              /> 
              <cmp-single-file-uploader
                v-else
                v-model="row.thumbImagUrl"
                mode="UPLOAD"
                page-id="PGE_AAB_00013"
                upload-target="CUR000"
                accepts="jpg,png,gif"
                pixels="300*404"
                preview-mode="BELOW" 
                :rules="$rules.getRules('not_null')"
                @input="onInput" 
                show-guidance
              />
              </div>
            </div>`,
          methods: {
            onInput(v) {
              if (v !== that.thumbImagUrlOld) {
                that.imageChanged = true
              }
              that.oldExposrLocCd = that.saveParams.exposrLocCd
              that.listT5[0].thumbImagUrl = v
            },
            pixels() {
              if (that.saveParams.parkKindCd === '01' && (that.saveParams.exposrLocCd === '01' || that.saveParams.exposrLocCd === '02' || that.saveParams.exposrLocCd === '06')) return true
              if (that.saveParams.parkKindCd === '02' && (that.saveParams.exposrLocCd === '01' || that.saveParams.exposrLocCd === '05')) return true
              return false
            },
          },
        },
      },
    ]
    const listT5 = [
      {
        rownum: '1', publctId: '', publctSubject: '',
      },
    ]
    this.listT5 = listT5

    // [URL테이블]
    this.columnsT6 = [
      { value: 'value1', text: 'No.', width: 100 },
      {
        value: 'exposrContentName',
        text: this.$t('MSG_TXT_EXPOSR_CNTN'),
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: '<div><ur-text-field style="width:350px;" :value="value" maxlength="300" placeholder="" @input="onInput" /></div>',
          methods: {
            onInput(v) {
              that.listT6[0].exposrContentName = v
            },
          },
        },
      },
      {
        value: 'thumbImagUrl',
        text: this.$t('MSG_TXT_THUMBNAIL'),
        required: true,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `
            <div class="pdCol10" style="flex-direction: column;"> 
              <div style="display: flex; flex-direction: row; align-items: center;">
                <cmp-single-file-uploader
                v-if="pixels()"
                v-model="row.thumbImagUrl"
                mode="UPLOAD"
                page-id="PGE_AAB_00013"
                upload-target="CUR000"
                accepts="jpg,png,gif"
                pixels="624*792"
                preview-mode="BELOW" 
                :rules="$rules.getRules('not_null')"
                @input="onInput" 
                show-guidance
              /> 
              <cmp-single-file-uploader
                v-else
                v-model="row.thumbImagUrl"
                mode="UPLOAD"
                page-id="PGE_AAB_00013"
                upload-target="CUR000"
                accepts="jpg,png,gif"
                pixels="300*404"
                preview-mode="BELOW" 
                :rules="$rules.getRules('not_null')"
                @input="onInput" 
                show-guidance
              /> 
              </div>
            </div>`,
          methods: {
            onInput(v) {
              if (v !== that.thumbImagUrlOld) {
                that.imageChanged = true
              }
              that.oldExposrLocCd = that.saveParams.exposrLocCd
              that.listT6[0].thumbImagUrl = v
            },
            pixels() {
              if (that.saveParams.parkKindCd === '01' && (that.saveParams.exposrLocCd === '01' || that.saveParams.exposrLocCd === '02' || that.saveParams.exposrLocCd === '06')) return true
              if (that.saveParams.parkKindCd === '02' && (that.saveParams.exposrLocCd === '01' || that.saveParams.exposrLocCd === '05')) return true
              return false
            },
          },
        },
      },
    ]
    const listT6 = [
      { value1: '1', value2: '', value3: '' },
    ]
    this.listT6 = listT6

    // [퍼소나테이블]
    this.listT7 = []
    const { curationId } = params
    const path = {
      'curation-id': curationId,
    }

    // [조회]
    http.request(this.$options.name, 'DTS_AAC_00003', {
      query: {},
      path,
      data: {},
    }).then(res => {
      this.setSaveParamsVisitCntCd(res.data)
      this.setSaveParamsVisitStatTypeCd(res.data)
      this.setSaveParamsTearTypeCd(res.data)
      this.saveParams.curationId = res.data.curationId
      this.saveParams.contentsName = res.data.contentsName
      this.saveParams.exposrOrder = res.data.exposrOrder
      this.saveParams.exposrLocCd = res.data.exposrLocCd
      this.oldExposrLocCd = res.data.exposrLocCd
      this.saveParams.exposrYn = res.data.exposrYn
      this.saveParams.langKindCd = res.data.langKindCd
      this.saveParams.useYn = res.data.useYn

      // [콘텐츠 관리 초기화]
      this.saveParams.curationContentDVOList = res.data.curationContentDVOList
      this.saveParams.contentKindCd = res.data.contentKindCd
      this.saveParams.oldContentKindCd = res.data.contentKindCd
      if (this.saveParams.curationContentDVOList.length > 0) {
        const { contentId } = this.saveParams.curationContentDVOList[0]
        const { contentNm } = this.saveParams.curationContentDVOList[0]
        const { thumbImagUrl } = this.saveParams.curationContentDVOList[0] // thumbImagUrl
        const { realContentId } = this.saveParams.curationContentDVOList[0]

        this.thumbImagUrlOld = thumbImagUrl

        const { exposrContentName } = this.saveParams.curationContentDVOList[0] // exposrContentName
        const { faciltNms } = that.saveParams.curationContentDVOList[0]

        //  스마트예약 전용
        const { prodCd } = that.saveParams.curationContentDVOList[0]
        const { topMenuId } = that.saveParams.curationContentDVOList[0]

        if (this.saveParams.contentKindCd === '01') {
          // eslint-disable-next-line no-underscore-dangle
          let _courseIdName = ''
          if (!utils.isEmpty(contentId)) {
            _courseIdName = `${contentId} / ${contentNm}`

            if (!utils.isEmpty(faciltNms)) {
              _courseIdName = `${_courseIdName} / ${faciltNms}`
            }
          }
          this.listT1 = [
            {
              rownum: '1',
              courseId: contentId,
              oldCourseId: contentId,
              courseName: contentNm,
              courseIdName: _courseIdName,
              thumbImagUrl,
              realContentId,
            },
          ]
        }
        if (this.saveParams.contentKindCd === '02') {
          this.listT2 = [
            {
              rownum: '1',
              faciltId: contentId,
              oldFaciltId: contentId,
              faciltName: contentNm,
              realContentId,
            },
          ]
        }
        if (this.saveParams.contentKindCd === '03') {
          const menuId = contentId
          const prodNm = contentNm
          this.listT3 = [
            {
              rownum: '1',
              menuId,
              oldMenuId: menuId,
              prodNm,
              prodCd,
              topMenuId,
              thumbImagUrl,
              realContentId,
            },
          ]
        }
        if (this.saveParams.contentKindCd === '04') {
          this.listT4 = [
            {
              rownum: '1',
              eventId: contentId,
              oldEventId: contentId,
              eventName: contentNm,
              thumbImagUrl,
              realContentId,
            },
          ]
        }
        if (this.saveParams.contentKindCd === '05') {
          this.listT5 = [
            {
              rownum: '1',
              publctId: contentId,
              oldPublctId: contentId,
              publctSubject: contentNm,
              thumbImagUrl,
              realContentId,
            },
          ]
        }
        if (this.saveParams.contentKindCd === '06') {
          this.listT6 = [
            {
              rownum: '1',
              publctId: contentId,
              oldPublctId: contentId,
              exposrContentName,
              thumbImagUrl,
              realContentId,
            },
          ]
        }
      }
      // [퍼소나 수정 초기화]
      this.saveParams.curationPersonaDVOList = res.data.curationPersonaDVOList
      this.listT7 = this.saveParams.curationPersonaDVOList
      this.listT7Insert = this.listT7

      console.log('RES END')
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    // [코스]
    openModalP01() { this.modalP01.open() },
    openModalP02() { this.modalP02.open() },
    openModalP03() { this.modalP03.open() },
    openModalP04() { this.modalP04.open() },
    openModalP05() { this.modalP05.open() },
    openModalP07() { this.modalP07.open() },
    closeModal() { this.modal.close() },
    closed() {},

    // [버튼 - 목록 이전페이지 이동]
    goToList() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAB_00012', { params })
    },

    // [코스ciltId]
    setCourseId(row) {
      if (!utils.isEmpty(row)) {
        let courseIdName = ''
        if (!utils.isEmpty(row.courseId)) {
          courseIdName = `${row.courseId} / ${row.courseName}`
        }

        const listT1 = [
          {
            rownum: '1',
            courseId: row.courseId,
            oldCourseId: this.listT1[0].oldCourseId,
            courseName: row.courseName,
            courseIdName,
          },
        ]
        this.listT1 = listT1
      }
    },

    // [시설]
    setFaciltId(row) {
      if (!utils.isEmpty(row)) {
        const listT2 = [
          {
            rownum: '1',
            faciltId: row.faciltId,
            oldFaciltId: this.listT2[0].oldFaciltId,
            faciltName: row.faciltName,
          },
        ]
        this.listT2 = listT2
      }
    },

    // [스마트 예약]
    setMenuId(row) {
      if (!utils.isEmpty(row)) {
        const listT3 = [
          {
            rownum: '1',
            prodCd: row.prodCd,
            prodNm: row.prodNm,
            menuId: row.menuId,
            menuNm: row.menuNm,
            topMenuId: row.topMenuId,
            oldMenuId: this.listT3[0].oldMenuId,
            startDtm: row.startDtm,
            endDtm: row.endDtm,
          },
        ]
        this.listT3 = listT3
      }
    },

    // [이벤트]
    setEventId(row) {
      if (!utils.isEmpty(row)) {
        const listT4 = [
          {
            rownum: '1',
            eventName: row.eventName,
            oldEventId: this.listT4[0].oldEventId,
            eventId: row.eventId,
          },
        ]
        this.listT4 = listT4
      }
    },
    // [공지]
    setpublctId(row) {
      if (!utils.isEmpty(row)) {
        const listT5 = [
          {
            rownum: '1',
            publctId: row.publctId,
            oldPublctId: this.listT5[0].oldPublctId,
            publctSubject: row.publctSubject,
          },
        ]
        this.listT5 = listT5
      }
    },

    onSave() {
      // 유호성 체크
      if (!this.isValidation()) { return }

      // 수정하시겠습니까?
      utils.messageBox('confirm', this.$t('수정하시겠습니까?'), null, () => { // 수정하시겠습니까?
        // [방문횟수, 방문상태, 티어]
        this.saveParams.visitCntCd.forEach(v => {
          if (v === 'NON') this.saveParams.visitCntType0Yn = 'Y'
          else if (v === 'A') this.saveParams.visitCntType1Yn = 'Y'
          else if (v === 'B') this.saveParams.visitCntType2Yn = 'Y'
          else if (v === 'C') this.saveParams.visitCntType3Yn = 'Y'
        })

        this.saveParams.visitStatTypeCd.forEach(v => {
          if (v === 'NON') this.saveParams.visitStatType0Yn = 'Y'
          else if (v === 'A') this.saveParams.visitStatType1Yn = 'Y'
          else if (v === 'B') this.saveParams.visitStatType2Yn = 'Y'
          else if (v === 'C') this.saveParams.visitStatType3Yn = 'Y'
        })

        this.saveParams.tearTypeCd.forEach(v => {
          if (v === 'NON') this.saveParams.tearType0Yn = 'Y'
          else if (v === 'T1') this.saveParams.tearType1Yn = 'Y'
          else if (v === 'T2') this.saveParams.tearType2Yn = 'Y'
          else if (v === 'T3') this.saveParams.tearType3Yn = 'Y'
          else if (v === 'T4') this.saveParams.tearType4Yn = 'Y'
          else if (v === 'T5') this.saveParams.tearType5Yn = 'Y'
        })

        // [콘텐츠 관리 - 코스, 시설, 예약, 이벤트, 공지,  URL] - 코스 수정함.
        if (this.saveParams.contentKindCd === this.saveParams.oldContentKindCd) {
          if (this.saveParams.contentKindCd === '01') {
            this.saveParams.curationContentCourseDVOUpdateList = this.listT1
            this.saveParams.curationContentCourseDVOUpdateList[0].newCourseId = this.listT1[0].courseId
            this.saveParams.curationContentCourseDVOUpdateList[0].courseId = this.listT1[0].oldCourseId
            this.saveParams.curationContentCourseDVOUpdateList[0].thumbImagUrl = this.listT1[0].thumbImagUrl
          }

          if (this.saveParams.contentKindCd === '02') {
            this.saveParams.curationContentFaciltDVOUpdateList = this.listT2
            this.saveParams.curationContentFaciltDVOUpdateList[0].newFaciltId = this.listT2[0].faciltId
            this.saveParams.curationContentFaciltDVOUpdateList[0].faciltId = this.listT2[0].oldFaciltId
          }

          if (this.saveParams.contentKindCd === '03') {
            this.saveParams.curationContentReserveDVOUpdateList = this.listT3
            this.saveParams.curationContentReserveDVOUpdateList[0].newMenuId = this.listT3[0].menuId
            this.saveParams.curationContentReserveDVOUpdateList[0].menuId = this.listT3[0].oldMenuId
            this.saveParams.curationContentReserveDVOUpdateList[0].prodNm = this.listT3[0].prodNm
            this.saveParams.curationContentReserveDVOUpdateList[0].prodCd = this.listT3[0].prodCd
            this.saveParams.curationContentReserveDVOUpdateList[0].topMenuId = this.listT3[0].topMenuId
            this.saveParams.curationContentReserveDVOUpdateList[0].thumbImagUrl = this.listT3[0].thumbImagUrl
          }

          if (this.saveParams.contentKindCd === '04') {
            this.saveParams.curationContentEventDVOUpdateList = this.listT4
            this.saveParams.curationContentEventDVOUpdateList[0].newEventId = this.listT4[0].eventId
            this.saveParams.curationContentEventDVOUpdateList[0].eventId = this.listT4[0].oldEventId
            this.saveParams.curationContentEventDVOUpdateList[0].thumbImagUrl = this.listT4[0].thumbImagUrl
            this.saveParams.curationContentEventDVOUpdateList[0].parkKindCd = this.saveParams.parkKindCd
          }

          if (this.saveParams.contentKindCd === '05') {
            this.saveParams.curationContentPublctDVOUpdateList = this.listT5
            this.saveParams.curationContentPublctDVOUpdateList[0].newPublctId = this.listT5[0].publctId
            this.saveParams.curationContentPublctDVOUpdateList[0].publctId = this.listT5[0].oldPublctId
            this.saveParams.curationContentPublctDVOUpdateList[0].thumbImagUrl = this.listT5[0].thumbImagUrl
          }

          if (this.saveParams.contentKindCd === '06') {
            this.saveParams.curationContentDVOUpdateList = this.listT6
            this.saveParams.curationContentDVOUpdateList[0].exposrContentName = this.listT6[0].exposrContentName
            this.saveParams.curationContentDVOUpdateList[0].thumbImagUrl = this.listT6[0].thumbImagUrl
          }
        } else {
          this.saveParams.curationContentCourseDVOUpdateList = []
          this.saveParams.curationContentFaciltDVOUpdateList = []
          this.saveParams.curationContentReserveDVOUpdateList = []
          this.saveParams.curationContentEventDVOUpdateList = []
          this.saveParams.curationContentPublctDVOUpdateList = []
          this.saveParams.curationContentDVOUpdateList = []

          if (this.saveParams.oldContentKindCd === '01') {
            this.saveParams.curationContentCourseDVODeleteList = this.listT1
            this.saveParams.curationContentCourseDVODeleteList[0].newCourseId = this.listT1[0].courseId
            this.saveParams.curationContentCourseDVODeleteList[0].courseId = this.listT2[0].oldCourseId
            this.saveParams.curationContentCourseDVODeleteList[0].thumbImagUrl = this.listT1[0].thumbImagUrl
          }
          if (this.saveParams.oldContentKindCd === '02') {
            this.saveParams.curationContentFaciltDVODeleteList = this.listT2
            this.saveParams.curationContentFaciltDVODeleteList[0].newFaciltId = this.listT2[0].faciltId
            this.saveParams.curationContentFaciltDVODeleteList[0].faciltId = this.listT2[0].oldFaciltId
          }

          if (this.saveParams.oldContentKindCd === '03') {
            this.saveParams.curationContentReserveDVODeleteList = this.listT3
            this.saveParams.curationContentReserveDVODeleteList[0].newMenuId = this.listT3[0].menuId
            this.saveParams.curationContentReserveDVODeleteList[0].menuId = this.listT3[0].oldMenuId
            this.saveParams.curationContentReserveDVODeleteList[0].prodNm = this.listT3[0].prodNm
            this.saveParams.curationContentReserveDVODeleteList[0].prodCd = this.listT3[0].prodCd
            this.saveParams.curationContentReserveDVODeleteList[0].topMenuId = this.listT3[0].topMenuId
            this.saveParams.curationContentReserveDVODeleteList[0].thumbImagUrl = this.listT3[0].thumbImagUrl
          }

          if (this.saveParams.oldContentKindCd === '04') {
            this.saveParams.curationContentEventDVODeleteList = this.listT4
            this.saveParams.curationContentEventDVODeleteList[0].newEventId = this.listT4[0].eventId
            this.saveParams.curationContentEventDVODeleteList[0].eventId = this.listT4[0].oldEventId
            this.saveParams.curationContentEventDVODeleteList[0].thumbImagUrl = this.listT4[0].thumbImagUrl
          }
          if (this.saveParams.oldContentKindCd === '05') {
            this.saveParams.curationContentPublctDVODeleteList = this.listT5
            this.saveParams.curationContentPublctDVODeleteList[0].newPublctId = this.listT5[0].publctId
            this.saveParams.curationContentPublctDVODeleteList[0].publctId = this.listT5[0].oldPublctId
            this.saveParams.curationContentPublctDVODeleteList[0].thumbImagUrl = this.listT5[0].thumbImagUrl
          }
          if (this.saveParams.oldContentKindCd === '06') {
            this.saveParams.curationContentDVODeleteList = this.listT6
            this.saveParams.curationContentDVODeleteList[0].exposrContentName = this.listT6[0].exposrContentName
            this.saveParams.curationContentDVODeleteList[0].thumbImagUrl = this.listT6[0].thumbImagUrl
          }


          if (this.saveParams.contentKindCd === '01') {
            this.saveParams.curationContentCourseDVOInsertList = this.listT1
            // this.saveParams.curationContentCourseDVOInsertList[0].newCourseId = this.listT1[0].courseId;
            // this.saveParams.curationContentCourseDVOInsertList[0].courseId = this.listT2[0].oldCourseId;
            // this.saveParams.curationContentCourseDVOInsertList[0].thumbImagUrl = this.listT1[0].thumbImagUrl;
          }

          if (this.saveParams.contentKindCd === '02') {
            this.saveParams.curationContentFaciltDVOInsertList = this.listT2
            // this.saveParams.curationContentFaciltDVOInsertList[0].newFaciltId = this.listT2[0].faciltId;
            // this.saveParams.curationContentFaciltDVOInsertList[0].faciltId = this.listT2[0].oldFaciltId;
          }

          if (this.saveParams.contentKindCd === '03') {
            this.saveParams.curationContentReserveDVOInsertList = this.listT3
            // this.saveParams.curationContentReserveDVOInsertList[0].newMenuId = this.listT3[0].menuId;
            // this.saveParams.curationContentReserveDVOInsertList[0].menuId = this.listT3[0].oldMenuId;
            // this.saveParams.curationContentReserveDVOInsertList[0].prodNm = this.listT3[0].prodNm;
            // this.saveParams.curationContentReserveDVOInsertList[0].prodCd = this.listT3[0].prodCd;
            // this.saveParams.curationContentReserveDVOInsertList[0].topMenuId = this.listT3[0].topMenuId;
            // this.saveParams.curationContentReserveDVOInsertList[0].thumbImagUrl = this.listT3[0].thumbImagUrl;
          }
          if (this.saveParams.contentKindCd === '04') {
            this.saveParams.curationContentEventDVOInsertList = this.listT4
            // this.saveParams.curationContentEventDVOInsertList[0].newEventId = this.listT4[0].eventId;
            // this.saveParams.curationContentEventDVOInsertList[0].eventId = this.listT4[0].oldEventId;
            // this.saveParams.curationContentEventDVOInsertList[0].thumbImagUrl = this.listT4[0].thumbImagUrl;
          }

          if (this.saveParams.contentKindCd === '05') {
            this.saveParams.curationContentPublctDVOInsertList = this.listT5
            // this.saveParams.curationContentPublctDVOInsertList[0].newPublctId = this.listT5[0].publctId;
            // this.saveParams.curationContentPublctDVOInsertList[0].publctId = this.listT5[0].oldPublctId;
            // this.saveParams.curationContentPublctDVOInsertList[0].thumbImagUrl = this.listT5[0].thumbImagUrl;
          }

          if (this.saveParams.contentKindCd === '06') {
            this.saveParams.curationContentDVOInsertList = this.listT6
            // this.saveParams.curationContentDVOInsertList[0].exposrContentName = this.listT6[0].exposrContentName;
            // this.saveParams.curationContentDVOInsertList[0].thumbImagUrl = this.listT6[0].thumbImagUrl;
          }
        }

        // [퍼소나 등록]
        this.saveParams.curationPersonaDVOInsertList = this.listT7Insert


        console.log(this.saveParams)

        http.request(this.$options.name, 'DTS_AAC_00004', {
          query: {},
          path: {},
          data: this.saveParams,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_APP_CATG_SAVED_DONE')) // 저장되었습니다. MSG_ALT_SAVE_DATA
          this.goToList()
        }).catch(error => {
          console.log(error)
        })
      })
    },

    pixels(exposrLocCd) {
      if (this.saveParams.parkKindCd === '01' && (exposrLocCd === '01' || exposrLocCd === '02' || exposrLocCd === '06')) return true
      if (this.saveParams.parkKindCd === '02' && (exposrLocCd === '01' || exposrLocCd === '05')) return true
      return false
    },

    isValidation() {
      // [//유효성 체크 - 콘텐츠명, 노출순서, 노출위치, 노출여부, 방문횟수, 방문상태, 티어]
      if (!this.$rules.validate(this)) {
        utils.messageBox('warning', this.$t('MSG_ALT_RULES_NOT_NULL'), null, () => {
        })
        return false
      }

      this.thumbImagUrlOld
      if (this.oldExposrLocCd !== this.saveParams.exposrLocCd) {
        if (this.saveParams.contentKindCd !== '02' && !this.imageChanged && this.pixels(this.oldExposrLocCd) !== this.pixels(this.saveParams.exposrLocCd)) {
          utils.messageBox('warning', this.$t('MSG_TXT_THUMNAIL_IMG_SIZE_CHK'), null)
          return false
        }
      }

      if (!this.$refs.LANGKIND.validate()) {
        utils.messageBox('warning', this.$t('MSG_ALT_RULES_NOT_NULL'), null, () => {
        })
        return false
      }
      if (!this.$refs.visitCntCheckbox.validate()) {
        utils.messageBox('warning', this.$t('MSG_ALT_RULES_NOT_NULL'), null, () => {
        })
        return false
      }
      if (!this.$refs.visitStatTypeCheckbox.validate()) {
        utils.messageBox('warning', this.$t('MSG_ALT_RULES_NOT_NULL'), null, () => {
        })
        return false
      }
      if (!this.$refs.tearTypeCheckbox.validate()) {
        utils.messageBox('warning', this.$t('MSG_ALT_RULES_NOT_NULL'), null, () => {
        })
        return false
      }
      // [유호성 체크 - 콘텐츠 관리]
      if (this.saveParams.contentKindCd === '02') {
        if (utils.isEmpty(this.listT2[0].faciltId)) {
          utils.messageBox('warning', this.$t('MSG_ALT_FACILITY_RGST'), null, null)
          return false
        }
      }

      // [유호성 체크 - 퍼소나]
      if (this.listT7Insert.length === 0) {
        utils.messageBox('warning', this.$t('MSG_TXT_NOT_SELECTED_PERSON'))
        return false
      }
      const found = this.listT7Insert.find(row => {
        if (utils.isEmpty(row.personaId)) {
          return true
        }
        return false
      })
      if (!utils.isEmpty(found)) {
        utils.messageBox('warning', this.$t('MSG_TXT_NOT_SELECTED_PERSON_NO'))
        return false
      }
      return true
    },

    onUpdatePosList(v) {
      console.log('onUpdatePosList', v)
      this.listT7Insert = v.created
      this.listT7Update = v.updated
      this.listT7Delete = v.removed
    },
    onInput() {
      this.listT1 = [{
        rownum: '1', courseId: '', courseName: '', courseIdName: '',
      }]
      this.listT3 = [{
        rownum: '1', menuId: '', menuNm: '', prodCd: '', prodNm: '',
      }]
      this.listT4 = [{
        rownum: '1', courseId: '', eventId: '', eventName: '',
      }]
      this.listT5 = [{
        rownum: '1', publctId: '', publctSubject: '',
      }]
      this.listT6 = [{
        value1: '1', value2: '', value3: '',
      }]
    },
    setSaveParamsVisitCntCd(data) {
      this.saveParams.visitCntCd = []
      if (data) {
        if (data.visitCntType0Yn === 'Y') this.saveParams.visitCntCd.push('NON')
        if (data.visitCntType1Yn === 'Y') this.saveParams.visitCntCd.push('A')
        if (data.visitCntType2Yn === 'Y') this.saveParams.visitCntCd.push('B')
        if (data.visitCntType3Yn === 'Y') this.saveParams.visitCntCd.push('C')
      }
    },
    setSaveParamsVisitStatTypeCd(data) {
      this.saveParams.visitStatTypeCd = []
      if (data) {
        if (data.visitStatType0Yn === 'Y') this.saveParams.visitStatTypeCd.push('NON')
        if (data.visitStatType1Yn === 'Y') this.saveParams.visitStatTypeCd.push('A')
        if (data.visitStatType2Yn === 'Y') this.saveParams.visitStatTypeCd.push('B')
        if (data.visitStatType3Yn === 'Y') this.saveParams.visitStatTypeCd.push('C')
      }
    },
    setSaveParamsTearTypeCd(data) {
      this.saveParams.tearTypeCd = []
      if (data) {
        if (data.tearType0Yn === 'Y') this.saveParams.tearTypeCd.push('NON')
        if (data.tearType1Yn === 'Y') this.saveParams.tearTypeCd.push('T1')
        if (data.tearType2Yn === 'Y') this.saveParams.tearTypeCd.push('T2')
        if (data.tearType3Yn === 'Y') this.saveParams.tearTypeCd.push('T3')
        if (data.tearType4Yn === 'Y') this.saveParams.tearTypeCd.push('T4')
        if (data.tearType5Yn === 'Y') this.saveParams.tearTypeCd.push('T5')
      }
    },
  },
}
</script>
<style scoped>
</style>
