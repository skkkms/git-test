<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- [등록] 큐레이션 관리 -->
      <div class="comm_title_wrap mt45">
        <h4 class="-grid__column__header__root-required">
          {{ $t('MSG_TXT_DEFAULT_INFO') }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <!-- [기존정보] 콘텐츠 명 -->
        <ur-form-item
          :label="$t('MSG_TXT_TIT_CNT_NAME')"
          label-align="right"
          required
          style="width: 50%;"
        >
          <div
            class="flex_wrap_col"
            style="width: 100%;"
          >
            <ur-text-field
              v-model="saveParams.contentsName"
              style="width: 100%;"
              :rules="$rules.getRules('not_null')"
              maxlength="100"
            />
            <span class="subscript_txt">
              {{ $t('MSG_TXT_ADMIN_LIST_FMT') }}
            </span>
          </div>
        </ur-form-item>
        <!-- [기존정보] 노출 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          label-align="right"
          required
          style="width: 50%;"
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
          label-align="right"
          required
          style="width: 50%;"
          class="flex_wrap"
        >
          <ur-text-field
            v-model="saveParams.exposrOrder"
            style="width: 100%;"
            class="mb4"
            mask="number"
            maxlength="4"
            :rules="$rules.getRules('not_null')"
            @keyup="saveParams.exposrOrder = parseInt(saveParams.exposrOrder, 10)"
          />
        </ur-form-item>
        <!-- [기존정보] 노출 위치 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_LCT')"
          label-align="right"
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
          />
        </ur-form-item>
        <!-- [기존정보] 언어구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_LANG_DIV')"
          label-align="right"
          required
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="saveParams.langKindCd"
            value="1"
            sm
          >
            {{ $t("MSG_TXT_KO") }}
          </ur-radio>
          <ur-radio
            v-model="saveParams.langKindCd"
            value="2"
            sm
          >
            {{ $t("MSG_TXT_EN") }}
          </ur-radio>
        </ur-form-item>
        <!-- [기존정보] 사용여부 -->
        <ur-form-item
          :label="$t('사용여부')"
          label-align="right"
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
          {{ $t('대상자 제어') }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <!-- [대상자 제어] 방문횟수 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_GV_CNT')"
          label-align="right"
          required
          style="width: 50%;"
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
          label-align="right"
          required
          style="width: 50%;"
        >
          <ur-checkbox-wrapper
            ref="visitStatTypeCheckbox"
            v-model="saveParams.visitStatTypeCd"
            :items="codes.COD_IA_VISIT_STATUS"
            :rules="validateRuleAtleastOne"
            sm
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_MEMSHP_T')"
          label-align="right"
          required
          style="width: 100%;"
        >
          <ur-checkbox-wrapper
            ref="tearTypeCheckbox"
            v-model="saveParams.tearTypeCd"
            :items="codes.COD_IA_TEAR"
            :rules="validateRuleAtleastOne"
            sm
          />
        </ur-form-item>
      </ur-form-box>
      <div class="comm_title_wrap mt45">
        <h4 class="-grid__column__header__root-required">
          {{ $t('MSG_TIT_CNTN_MGMT') }}
        </h4>
        <div class="title_compo">
          <ur-radio-wrapper
            v-model="saveParams.contentKindCd"
            :items="codes.COD_IA_CURATION_CONTENT_KIND"
            sm
            @input="()=>imgExposrLocCd=''"
          />
        </div>
      </div>
      <!-- [콘텐츠 관리 코스 -->
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
        :options="options"
        @set-course-id="setCourseId"
      />
      <!-- [콘텐츠 관리-] 시설 -->
      <ur-data-grid
        v-if="saveParams.contentKindCd=='02'?true:false"
        ref="gridP02"
        :headers="columnsT2"
        :options="options"
        :data-source="listT2"
      />
      <ur-modal
        ref="modalP02"
        xlarge
        dragable
        :title="$t('MSG_TXT_FACILITY')"
        :page-id="contextPageId"
        @set-facilt-id="setFaciltId"
      />
      <!-- [콘텐츠 관리] 스마트 예약 -->
      <ur-data-grid
        v-if="saveParams.contentKindCd=='03'?true:false"
        ref="gridP03"
        :headers="columnsT3"
        :options="options"
        :data-source="listT3"
        :data-set-options="{id: 'id'}"
      />
      <ur-modal
        ref="modalP03"
        xlarge
        dragable
        :title="$t('MSG_TXT_SMART_RSV')"
        :page-id="contextPageId"
        @set-menu-id="setMenuId"
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
        xlarge
        dragable
        :title="$t('MSG_TXT_EVNT')"
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
        xlarge
        dragable
        :title="$t('MSG_TXT_ANNM')"
      />
      <!-- [콘텐츠 관리] URL -->
      <ur-data-grid
        v-if="saveParams.contentKindCd=='06'?true:false"
        ref="gridP06"
        :headers="columnsT6"
        :options="options"
        :data-source="listT6"
        :data-set-options="{id: 'id'}"
      />
      <!-- [콘텐츠 관리] URL END -->
      <!-- [퍼소나 등록]  -->
      <C01
        :page-id="contextPageId"
        :title="$t('MSG_TXT_PERSON_RGST')"
        :park-kind-cd="saveParams.parkKindCd"
        @create="onCreatePosList"
      />

      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <!-- [버튼] 목록 -->
            <ur-button
              @click="goToList"
            >
              {{ $t("MSG_BTN_LIST") }}
            </ur-button>
          </div>
          <div class="right_box">
            <!-- [버튼] 저장 -->
            <ur-button
              v-permission:create="$options.name"
              color="violet"
              @click="onSave"
            >
              {{ $t("MSG_BTN_SAVE") }}
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
  name: 'PGE_AAB_00013', // eslint-disable-line vue/name-property-casing
  components: {
    C01,
  },
  extends: BasePage,
  data() {
    return {
      CODE_KEYS: ['COD_IA_EL_CURATION_EXPOSR_LOC', 'COD_IA_CB_CURATION_EXPOSR_LOC', 'COD_IA_VISIT_CNT', 'COD_IA_VISIT_STATUS', 'COD_IA_TEAR', 'COD_IA_CURATION_CONTENT_KIND'],
      codes: {
        COD_IA_VISIT_CNT: [],
        COD_IA_VISIT_STATUS: [],
        COD_IA_TEAR: [],
        COD_IA_CURATION_CONTENT_KIND: [],
        COD_IA_EL_CURATION_EXPOSR_LOC: [],
        COD_IA_CB_CURATION_EXPOSR_LOC: [],
      },
      saveParams: {
        parkKindCd: '',
        exposrLocCd: '',
        contentsName: '',
        exposrOrder: '',
        exposrYn: 'N',
        useYn: 'Y',
        langKindCd: '1',
        visitCntCd: ['NON', 'A', 'B', 'C'],
        visitStatTypeCd: ['A', 'B', 'C'],
        tearTypeCd: ['T1', 'T2', 'T3', 'T4', 'T5'],
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
        dummy: '',

      },

      // [테이블 옵션]
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
        selectCheckOnly: true,
        rowHeight: 'auto',
      },
      columnsT1: [],
      listT1: [],

      columnsT2: [],
      listT2: [],

      columnsT3: [],
      listT3: [],

      columnsT4: [],
      listT4: [],

      columnsT5: [],
      listT5: [],

      columnsT6: [],
      listT6: [
        { value1: '1', value2: '', value3: '' },
      ],

      listT7: [],

      // [체크박스]
      validateRuleAtleastOne: [
        v => !!v || '',
        v => v.length > 0 || '',
      ],
      imgExposrLocCd: '',
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    COD_IA_CURATION_EXPOSR_LOC() {
      if (this.saveParams.parkKindCd === '02') return this.codes.COD_IA_CB_CURATION_EXPOSR_LOC
      return this.codes.COD_IA_EL_CURATION_EXPOSR_LOC
    },
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
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
    // [코드 조회]
    http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)

    const params = utils.getParameter(this, 'params')
    console.log('mounted', params)
    this.saveParams.parkKindCd = params.parkKindCd
    const that = this

    // [코스]
    this.columnsT1 = [
      { value: 'rownum', text: 'No.', width: 100 },
      {
        value: 'courseIdGrisName',
        text: this.$t('MSG_TXT_EXPOSR_CNTN'),
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div><ur-text-field style="width:350px;" v-model="value" readonly/><ur-icon-button class="ml16" icon="search" icon-type="line" color="primary" @click.stop="clickCheck()"/>
                      <ur-modal ref="modal_CM" xlarge draggable :title="$t('MSG_TXT_EXPOSR_CNTN')"></ur-modal></div>`,
          methods: {
            // 코스 팝업
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
              that.listT1[0].thumbImagUrl = v
              that.imgExposrLocCd = that.saveParams.exposrLocCd
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
        value: 'faciltGridName',
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
                  class="ml16" icon="search" 
                  icon-type="line" 
                  color="primary" 
                  @click.stop="clickCheck(row, me)"
                />
                <ur-modal 
                  ref="modal_CM" 
                  xlarge draggable :title="$t('MSG_TXT_EXPOSR_CNTN')">
                </ur-modal>
              </div>
            </div>`,
          methods: {
            // 시설 팝업
            clickCheck() {
              console.log('clickCheck !')
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
        value: 'prodNmTypePeriod',
        text: this.$t('MSG_TXT_EXPOSR_CNTN'),
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div><ur-text-field style="width:350px;" v-model="value" readonly/><ur-icon-button class="ml16" icon="search" icon-type="line" color="primary" @click.stop="clickCheck(row, me)"/>
                      <ur-modal ref="modal_CM" xlarge draggable :title="$t('MSG_TXT_EXPOSR_CNTN')"></ur-modal></div>`,
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
              that.listT3[0].thumbImagUrl = v
              that.imgExposrLocCd = that.saveParams.exposrLocCd
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
        value: 'eventGriName',
        text: this.$t('MSG_TXT_EXPOSR_CNTN'),
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div><ur-text-field style="width:350px;" v-model="value" readonly/><ur-icon-button class="ml16" icon="search" icon-type="line" color="primary" @click.stop="clickCheck(row, me)"/>
                        <ur-modal ref="modal_CM" xlarge draggable :title="$t('MSG_TXT_EXPOSR_CNTN')"></ur-modal></div>`,
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
              that.listT4[0].thumbImagUrl = v
              that.imgExposrLocCd = that.saveParams.exposrLocCd
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
      { rownum: '1', eventId: '', eventName: '' },
    ]
    this.listT4 = listT4

    // [공지]
    this.columnsT5 = [
      { value: 'rownum', text: 'No.', width: 100 },
      {
        value: 'publctSubjectName',
        text: this.$t('MSG_TXT_EXPOSR_CNTN'),
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div><ur-text-field style="width:350px;" v-model="value" readonly/><ur-icon-button class="ml16" icon="search" icon-type="line" color="primary" @click.stop="clickCheck(row, me)"/>
                      <ur-modal ref="modal_CM" xlarge draggable :title="$t('MSG_TXT_EXPOSR_CNTN')"></ur-modal></div>`,
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
              that.listT5[0].thumbImagUrl = v
              that.imgExposrLocCd = that.saveParams.exposrLocCd
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
      { rownum: '1', publctId: '', publctSubject: '' },
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
              that.listT6[0].thumbImagUrl = v
              that.imgExposrLocCd = that.saveParams.exposrLocCd
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
  },
  methods: {

    // [버튼] 이전
    goToList() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAB_00012', { params })
    },

    pixels(exposrLocCd) {
      if (this.saveParams.parkKindCd === '01' && (exposrLocCd === '01' || exposrLocCd === '02' || exposrLocCd === '06')) return true
      if (this.saveParams.parkKindCd === '02' && (exposrLocCd === '01' || exposrLocCd === '05')) return true
      return false
    },

    onSave() {
      // [유호성 체크 - 콘텐츠명, 노출순서, 노출위치, 노출여부, 방문횟수, 방문상태, 티어]
      if (!this.$rules.validate(this)) {
        utils.messageBox('warning', this.$t('MSG_ALT_RULES_NOT_NULL'), null, () => {
        })
        return false
      }

      if (this.imgExposrLocCd !== this.saveParams.exposrLocCd) {
        if (this.saveParams.contentKindCd !== '02' && this.pixels(this.imgExposrLocCd) !== this.pixels(this.saveParams.exposrLocCd)) {
          utils.messageBox('warning', this.$t('MSG_TXT_THUMNAIL_IMG_SIZE_CHK'), null)
          return false
        }
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
      // [유호성 체크 - 콘텐츠 관리] 시설 정보가 없습니다.
      if (this.saveParams.contentKindCd === '02') {
        if (utils.isEmpty(this.listT2[0].faciltId)) {
          utils.messageBox('warning', this.$t('MSG_ALT_FACILITY_RGST'), null, null)
          return false
        }
      }

      // [체크박스 - 방문횟수, 방문상태, 티어]
      this.saveParams.visitCntCd.forEach(v => {
        if (v === 'NON') this.saveParams.visitCntType0Yn = 'Y'
        else if (v === 'A') this.saveParams.visitCntType1Yn = 'Y'
        else if (v === 'B') this.saveParams.visitCntType2Yn = 'Y'
        else if (v === 'C') this.saveParams.visitCntType3Yn = 'Y'
      })

      this.saveParams.visitStatTypeCd.forEach(v => {
        if (v === 'A') this.saveParams.visitStatType1Yn = 'Y'
        else if (v === 'B') this.saveParams.visitStatType2Yn = 'Y'
        else if (v === 'C') this.saveParams.visitStatType3Yn = 'Y'
      })

      this.saveParams.tearTypeCd.forEach(v => {
        if (v === 'T1') this.saveParams.tearType1Yn = 'Y'
        else if (v === 'T2') this.saveParams.tearType2Yn = 'Y'
        else if (v === 'T3') this.saveParams.tearType3Yn = 'Y'
        else if (v === 'T4') this.saveParams.tearType4Yn = 'Y'
        else if (v === 'T5') this.saveParams.tearType5Yn = 'Y'
      })

      // [콘텐츠 관리 - 코스, 시설, 예약, 이벤트, 공지,  URL]
      this.saveParams.curationContentCourseDVOList = this.listT1
      this.saveParams.curationContentFaciltDVOList = this.listT2
      if (this.listT3.length > 0) {
        this.listT3[0].menuId = this.listT3[0].menuId
        this.listT3[0].menuName = this.listT3[0].menuNm
      }
      this.saveParams.curationContentReserveDVOList = this.listT3
      this.saveParams.curationContentEventDVOList = this.listT4
      this.saveParams.curationContentPublctDVOList = this.listT5
      this.saveParams.curationContentDVOList = this.listT6

      // 퍼소나 체크
      if (this.listT7.length === 0) {
        utils.messageBox('warning', this.$t('MSG_TXT_PERSON_NO_RGST'))
        return false
      }
      const found = this.listT7.find(row => {
        if (utils.isEmpty(row.personaId)) {
          return true
        }
        return false
      })
      if (!utils.isEmpty(found)) {
        utils.messageBox('warning', this.$t('MSG_TXT_NOT_SELECTED_PERSON'))
        return false
      }

      // [퍼소나 등록]
      this.saveParams.curationPersonaDVOList = this.listT7

      // 저장하시겠습니까?..
      utils.messageBox('confirm', this.$t('MSG_ALT_IS_SAV_DATA'), null, () => {
        console.log('REQ DATA saveParams-------:', this.saveParams)
        http.request(this.$options.name, 'DTS_AAC_00024', {
          query: {},
          path: {},
          data: this.saveParams,
        }).then(res => {
          if (res.data.resultCode === '0') {
            utils.messageBox('confirm', this.$t('MSG_TXT_DUP_CON_ITEM_SAVE'), null, () => { // 동일한 콘텐츠가 존재합ㄴ다. 계속 저장학시겠습니까?
              http.request(this.$options.name, 'DTS_AAC_00005', {
                query: {},
                path: {},
                data: this.saveParams,
              }).then(res => {
                if (res.data.resultCode === '1') {
                  utils.messageBox('success', this.$t('MSG_ALT_APP_CATG_SAVED_DONE'))
                  this.goToList()
                } else {
                  utils.messageBox('success', this.$t('MSG_ALT_IAM_GIFTCARD_PIN_RSLT_908'))
                }
              }).catch(error => {
                console.log(error)
              })
            })
          } else {
            http.request(this.$options.name, 'DTS_AAC_00005', {
              query: {},
              path: {},
              data: this.saveParams,
            }).then(res => {
              if (res.data.resultCode === '1') {
                utils.messageBox('success', this.$t('MSG_ALT_APP_CATG_SAVED_DONE'))
                this.goToList()
              } else {
                utils.messageBox('success', this.$t('MSG_ALT_IAM_GIFTCARD_PIN_RSLT_908'))
              }
            }).catch(error => {
              console.log(error)
            })
          }
        }).catch(error => {
          console.log(error)
        })
      })
      return null
    },

    // [코스]
    setCourseId(row) {
      if (!utils.isEmpty(row)) {
        let courseIdGrisName = ''
        const courseName = row.courseName ?? ''
        const faciltNms = row.faciltNms ?? ''
        if (!utils.isEmpty(row.courseId)) {
          courseIdGrisName = `${row.courseId} / ${courseName} / ${faciltNms}`
        }
        const listT1 = [
          {
            rownum: '1',
            courseId: row.courseId,
            courseName: row.courseName,
            faciltNms: row.faciltNms,
            courseIdGrisName,
          },
        ]
        this.listT1 = listT1
      }
    },

    // [시설]
    setFaciltId(row) {
      if (!utils.isEmpty(row)) {
        let faciltGridName = ''
        if (!utils.isEmpty(row.faciltName)) {
          faciltGridName = `${row.faciltName} / ${row.faciltCateKindNms} / ${row.zoneKindNm}`
        }
        const listT2 = [
          {
            rownum: '1',
            faciltId: row.faciltId,
            faciltName: row.faciltName,
            faciltCateKindNms: row.faciltCateKindNms,
            zoneKindNm: row.zoneKindNm,
            faciltGridName,
          },
        ]
        this.listT2 = listT2
      }
    },

    // [스마트 예약]
    setMenuId(row) {
      if (!utils.isEmpty(row)) {
        let prodNmTypePeriod = ''
        if (!utils.isEmpty(row.prodNm)) {
          prodNmTypePeriod = `${row.prodNm} / ${row.menuNm} / ${utils.dateformatToClient(row.startDtm)}~${utils.dateformatToClient(row.endDtm)}`
        }
        const listT3 = [
          {
            rownum: '1',
            prodCd: row.prodCd,
            prodNm: row.prodNm,
            menuId: row.menuId,
            menuNm: row.menuNm,
            topMenuId: row.topMenuId,
            startDtm: row.startDtm,
            endDtm: row.endDtm,
            prodNmTypePeriod,
          },
        ]
        this.listT3 = listT3
      }
    },

    // [이벤트]
    setEventId(row) {
      if (!utils.isEmpty(row)) {
        let eventGriName = ''
        if (!utils.isEmpty(row.eventClassNm)) {
          eventGriName = `${row.eventClassNm} / ${row.exposrYn} / ${row.eventName}`
        }
        const listT4 = [
          {
            rownum: '1',
            eventId: row.eventId,
            eventName: row.eventName,
            eventClassNm: row.eventClassNm,
            exposrYn: row.exposrYn,
            eventGriName,
          },
        ]
        this.listT4 = listT4
      }
    },
    // [공지]
    setpublctId(row) {
      if (!utils.isEmpty(row)) {
        let publctSubjectName = ''
        if (!utils.isEmpty(row.exposrYn)) {
          publctSubjectName = `${row.exposrYn} / ${row.publctSubject}`
        }
        const listT5 = [
          {
            rownum: '1',
            publctId: row.publctId,
            exposrYn: row.exposrYn,
            publctSubject: row.publctSubject,
            publctSubjectName,
          },
        ]
        this.listT5 = listT5
      }
    },

    // [퍼소나 등록]
    setPersonaId(row) {
      const listT7 = [
        {
          rownum: '1',
          personaId: row.personaId,
          personaName: row.personaName,
        },
      ]
      this.listT7 = listT7
    },

    // [퍼소나 등록]
    onCreatePosList(v) {
      this.listT7 = v
    },
  },
}
</script>
<style scoped>
</style>
