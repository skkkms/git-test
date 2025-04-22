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
            :items="codes.COD_IA_LOVGRP_KIND"
            sm
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
            id="activityDate"
            v-model="inputData.activityDate"
            input-type="YYYY-MM-DD"
            model-type="YYYYMMDD"
            :max-date="activityMaxDate"
            :confirm-label="$t('MSG_TXT_SEL')"
            :today-label="$t('MSG_BTN_TODAY')"
            :disabled="isActivityDateDisabled"
          />
          <ur-tooltip
            v-show="isActivityDateDisabled"
            target-id="activityDate"
            shape="label"
            mouse-over
            bottom
          >
            <p v-text="$t('MSG_ALT_CANNOT_CHANGE_ACTIVITY_DATE')" />
          </ur-tooltip>
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
            maxlength="25"
            :rules="$rules.getRules('max_len(25)')"
            fixed-message
            style="width: 100%;"
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
            v-model="inputData.memshpClassCd"
            :items="codes.COD_IA_LOVGRP_MEMSHP_CD"
            no-select
            :msg-no-select="msgNoSelect"
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
            :items="codes.COD_IAA_LOVGRP_OPEN_YN"
            sm
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
            v-model="inputData.lvlCd"
            :items="codes.COD_IA_LOVGRP_LV_CD"
            :no-select="noSelect"
            :msg-no-select="msgNoSelect"
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
            :items="codes.COD_LOVGRP_PRJ_YN"
            sm
          />
        </ur-form-item>


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
            :confirm-label="this.$t('MSG_TXT_SELT')"
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
          <!-- 클래스 반 -->
          <ur-dropdown
            ref="classGrp"
            v-model="classGrpId"
            :items="inputChips"
            :disabled="!showClassGrp"
            no-select
            :msg-no-select="$t('MSG_TXT_SEL')"
            class="pr10"
            style="width:150px;"
            @input="inputClassGrpId()"
          />

          <!-- 클래스(반) 설정 -->
          <ur-button
            v-permission:create="this.$options.name"
            color="violet"
            :disabled="!showClassGrp"
            @click="classBanPopOpen"
          >
            {{ $t('MSG_BTN_LOV_CLASS_BAN') }}
          </ur-button>

          <span class="guid_txt pl16">
            <!-- * 클래스(반)설정 후 사용해주세요. -->
            <div class="guid_sub">{{ $t("MSG_TXT_LOV_CLASS_BAN_GUIED") }} </div>
            <!--* 이미지 : 720 x 720 / 파일 규격 : 15MB 미만 jpg, png, gif -->
            {{ $t("MSG_TXT_IMG_FILE_LIMIT") }}
          </span>
        </div>

        <div
          v-show="showFindFile"
          class="right_box"
        >
          <!-- 파일찾기 -->
          <ur-button
            color="violet"
            @click="onClickSearchFile"
          >
            {{ $t("MSG_BTN_SCH_FILE") }}
          </ur-button>
          <!-- 삭제 -->
          <ur-button
            color="violet"
            @click="onClickDelete"
          >
            {{ $t("MSG_BTN_DEL") }}
          </ur-button>
          <!-- 초기화 -->
          <ur-button
            color="violet"
            @click="onClickReset"
          >
            {{ $t("MSG_BTN_INTL") }}
          </ur-button>
          <!-- 파일명 정렬 -->
          <ur-button
            @click="clickFileOrder"
          >
            {{ $t("MSG_BTN_FILENM_ORDER") }}
          </ur-button>
        </div>
      </div>

      <input
        v-show="false"
        ref="inputFile"
        type="file"
        multiple
        @change="onChangeFile"
      >

      <ur-data-grid
        ref="grid"
        :headers="columns"
        :data-source="dsFileList"
        :options="opts"
        :data-set-options="{id: 'id'}"
      />

      <div class="bt1 mt45">
        <sui-page-footer class="comm_btn_wrap">
          <div class="btn_wrap">
            <!-- 목록 -->
            <div class="left_box">
              <ur-button
                v-permission:read="this.$options.name"
                @click="onClickList"
              >
                {{ $t("MSG_BTN_LIST") }}
              </ur-button>
            </div>

            <!-- 저장 -->
            <div class="right_box">
              <ur-button
                v-permission:update="this.$options.name"
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
  name: 'PGE_AAE_00043', // eslint-disable-line vue/name-property-casing
  data() {
    return {
      // 공통코드
      codeKeyList: [
        'COD_IA_LOVGRP_KIND',
        'COD_IAA_LOVGRP_OPEN_YN',
        'COD_LOVGRP_PRJ_YN',
      ],
      codes: {
        COD_IA_LOVGRP_KIND: [],
        COD_IA_LOVGRP_MEMSHP_CD: [],
        COD_IA_LOVGRP_LV_CD: [],
        COD_IAA_LOVGRP_OPEN_YN: [],
        COD_LOVGRP_PRJ_YN: [],
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
      noSelect: true,
      msgNoSelect: this.$t('MSG_TXT_SELT'),
      msgNoSelectAll: this.$t('MSG_TXT_ALL'),

      activityId: '',
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
      activityDateOld: '',
      dsFileList: new urDataSet(), // eslint-disable-line new-cap
      classGrpId: '',
      classGrpBan: new urDataSet(), // eslint-disable-line new-cap
      columns: [],
      accepts: 'jpg,png,gif',
      opts: { // 토탈 x 전체선택X 셀선택 o
        noInfo: true,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        height: 300,
        // ALT 태그 추가시 테이블 옵션에 rowHeight: 'auto'추가
        rowHeight: 'auto',
        msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
        defaultPageSize: 10,
      },
      inputChips: [], // 전체
      sord: [{ value: 'fileName', __sortOrder: 'A' }], // 파일명 정렬
      cnt: 0,
    }
  },
  computed: {
    activityMaxDate() {
      return utils.now('YYYY-MM-DD')
    },
    isActivityDateDisabled() {
      return this.dsFileList.totalSize > 0
    },
    // 등록모드 인지 수정모드인지
    insertMode() {
      return _.isEmpty(this.activityId)
    },
    // 클래스(반) 설정버튼 활성화 여부
    // 사랑단 분류, 멤버십, 레벨의 값을 정했을 경우만 선택 가능함.
    showClassGrp() {
      if (this.inputData.lovgrpKindCd !== '' && this.inputData.memshpClassCd !== '' && this.inputData.lvlCd !== '') {
        return true
      }
      return false
    },
    showFindFile() {
      return !((utils.isEmpty(this.inputData.activityDate) || this.inputChips.length === 0))
    },
  },
  watch: {
    'inputData.activityDate': {
      handler(newValue, oldValue) {
        this.activityDateOld = oldValue
        if (utils.compareTo(utils.now('YYYYMMDD'), newValue) === -1) {
          // 미래일자는 선택할 수 없습니다.
          utils.messageBox('warning', this.$t('MSG_TXT_NO_AFTER_DATE'), null, () => {
            this.inputData.activityDate = this.activityDateOld
          })
        }
      },
    },
  },
  created() {
    const that = this

    // 파라미터 셋팅
    const params = utils.getParameter(this, 'params')
    this.activityId = params.activityId

    // 년도 셋팅
    const dt = new Date()
    this.inputData.activityGrpJoinYy = dt.getFullYear().toString()

    // 공통코드 셋팅 및 초기화
    http.mergeCodeList(this.$options.name, this.codeKeyList, this.codes).then(() => {
      this.columns = [
        {
          text: 'No.',
          value: 'rowNum',
          width: 50,
        },
        {
          text: this.$t('MSG_TXT_FILE_NM'),
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `<div class="pdCol10" style="flex-direction: column;">
                          <div style="display: flex; flex-direction: row; align-items: center;">
                            <cmp-single-file-uploader  ref="fileUpload" preview-mode="BELOW" mode="SELECT" v-model="row.fileImagUrl" @input="inputFileImagUrl" :page-id="pageId" accepts="jpg,png,gif" pixels="176*176" text-field-width="calc(100% - 96px)"/>
                          </div>
                        </div>`,
            computed: {
              pageId() {
                return that.$options.name
              },
            },
            methods: {
              inputFileImagUrl(val) {
                that.dsFileList.setRowValue(this.row, 'fileImagUrl', val)
                if (this.insertMode) {
                  that.dsFileList.setRowValue(this.row, 'fileName', this.$refs.fileUpload.getFileName())
                } else {
                  that.dsFileList.setRowValue(this.row, 'fileName', this.row.fileName)
                }
              },
            },
          },
        },
        {
          text: '',
          value: 'altTag',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-text-field v-model="row.altTag" :placeholder="$t(\'MSG_TXT_ALT_TAG_INPUT\')" @input="inputAltTag" maxlength="100" /></div>',
            methods: {
              inputAltTag(value) {
                that.dsFileList.setRowValue(this.row, 'altTag', value)
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_OPEN_YN'),
          value: 'exposrYn',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-radio-wrapper sm :items="COD_IAA_LOVGRP_OPEN_YN" v-model="row.exposrYn" @input="inputExposrYn" /></div>',
            computed: {
              COD_IAA_LOVGRP_OPEN_YN() {
                return that.codes.COD_IAA_LOVGRP_OPEN_YN
              },
            },
            methods: {
              inputExposrYn(value) {
                that.dsFileList.setRowValue(this.row, 'exposrYn', value)
              },
            },
          },
        },
        { hide: true, value: 'fileName' }, // 파일명
        { hide: true, value: 'exposrOrder' }, // 노출순서
        { hide: true, value: 'classGrpId' }, // 클래스(반)
      ]
    }).catch(() => {})
  },
  mounted() {
    this.inputLovgrpKindCd('001') // 멤버십 초기화
    if (!this.insertMode) {
      this.onSearch()
    }
  },
  methods: {

    // 클래스(반) 관리 팝업 오픈
    classBanPopOpen() {
      utils.openLayerPopup('PGE_AAE_00045', this.onCondInfoSettngCallback, {
        pageInitialData: {
          lovgrpKindCd: this.inputData.lovgrpKindCd,
          memshpClassCd: this.inputData.memshpClassCd,
          lvlCd: this.inputData.lvlCd,
          chips: this.inputChips,
        },
        size: 'lg',
      })
    },

    // 클래스(반) 콜백
    onCondInfoSettngCallback(chips) {
      if (chips === null || chips === 'Close') return

      this.inputChips = []
      if (chips.length > 0) {
        for (let i = 0; i < chips.length; i += 1) {
          this.inputChips.push({ text: chips[i].classGrpName, value: chips[i].classGrpId })
          if (i === 0) {
            this.classGrpId = chips[i].classGrpId
          }
        }
        this.setGridFilter() // 그리드 필터 적용
      }
    },

    // 클래스(반) 변경 시
    inputClassGrpId() {
      this.setGridFilter() // 그리드 필터 적용
      this.$refs.grid.resetSelect()// select초기화
    },

    /** *************************************
     * 그리드 필터 적용
    *************************************** */
    setGridFilter() {
      this.$refs.grid.filter({ classGrpId: this.classGrpId })
      this.setViewRowNum()
    },

    // 보여지는 rowNum 셋팅
    setViewRowNum() {
      if (this.$refs.grid.getViewData().length > 0) {
        const maxRowNum = this.$refs.grid.getViewData().reduce((prev, value) => {
          const result = prev.rowNum >= value.rowNum ? prev.rowNum : value.rowNum
          return result
        })
        this.cnt = maxRowNum
      } else {
        this.cnt = 0
      }
    },


    /** *************************************
     * 파일명 정렬
     *************************************** */
    clickFileOrder() {
      const newDs = this.$refs.grid.getData()
      newDs.sort((a, b) => {
        const tempA = (a.classGrpId === this.classGrpId) ? a.fileName : ''
        const tempB = (b.classGrpId === this.classGrpId) ? b.fileName : ''
        return tempA.localeCompare(tempB, 'kn', { numeric: true }) || tempA - tempB
      })
      this.$refs.grid.setData(newDs)
    },


    /** *************************************
    * 상세조회
    *************************************** */
    onSearch() {
      http.request(this.$options.name, 'DTS_AAE_00014', {
        path: {
          'activity-id': this.activityId,
        },
      }).then(res => {
        this.inputLovgrpKindCd(res.data.lovgrpKindCd) // 사랑단분류 셋팅
        this.inputMemshpClassCd(res.data.memshpClassCd) // 멤버쉽코드 셋팅

        this.inputData = res.data
        this.activityDateOld = res.data.activityDate
        this.$refs.grid.setData(res.data.selectImgList)
        this.makeInputChip(res.data.classBanInfoList) // 클래스(반) 셋팅
      }).catch(error => {
        console.log(error)
      })
    },


    // 파람데이터 만들기
    getParam() {
      const inputParam = this.inputData
      // 클래스(반) 데이터 정비
      if (this.inputChips.length > 0) {
        const chipList = []
        this.inputChips.forEach(obj => {
          chipList.push(obj.value)
        })
        inputParam.classGrp = chipList.join(',')
      }
      // 그리드데이터 정비
      if (this.insertMode) {
        // 등록
        const insertDs = this.$refs.grid.getData()
        // 노출순서 조정
        for (let i = 0; i < insertDs.length; i += 1) {
          insertDs[i].exposrOrder = _.toString(i + 1)
        }
        inputParam.insertImgList = insertDs
      } else {
        // 수정
        // 노출순서 조정
        const viewDs = this.$refs.grid.getData()
        for (let i = 0; i < viewDs.length; i += 1) {
          viewDs[i].exposrOrder = _.toString(i + 1)
        }
        const { removed } = this.dsFileList.getChanged()
        const insertList = viewDs.filter(item => utils.isEmpty(item.activityId))
        const deleteList = removed.filter(item => !utils.isEmpty(item.activityId))
        // 노출순서 때문에 모든 리스트를 저장 할 필요가 있음.
        const updateList = viewDs.filter(item => {
          const map = deleteList.map(d => d.activitySeqNo)
          return !map.includes(item.activitySeqNo)
        })

        inputParam.insertImgList = insertList
        inputParam.deleteImgList = deleteList
        inputParam.updateImgList = updateList
      }
      return inputParam
    },


    /** *************************************
     * 저장
     *************************************** */
    async onClickSave() {
      // 유효성 체크
      if (this.isValidation()) {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => { // 저장하시겠습니까?
          if (!this.insertMode) {
            // 수정시..
            http.request(this.$options.name, 'DTS_AAE_00015', {
              data: this.getParam(),
            }).then(() => {
              utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
              this.onClickList() // 목록으로 이동..
            })
          } else {
            // 등록시..
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

    /** *************************************
     * 파일찾기 버튼 관련
     *************************************** */
    // 파일찾기
    onClickSearchFile() {
      this.$refs.inputFile.value = null
      this.$refs.inputFile.click()
    },

    // 파일받기
    async onChangeFile(event) {
      const { files } = event.target
      if (files !== null && files.length > 0) {
        const fileList = []
        for (let i = 0; i < files.length; i += 1) {
          if (this.isValidFile(files[i])) {
            const row = await this.upload(files[i]) // eslint-disable-line no-await-in-loop
            fileList.push(row)
          }
        }
        fileList.forEach(row => {
          this.$refs.grid.addRow(row, 'TOP')
        })
      }
    },

    // 파일 업로드
    upload(files) {
      const that = this
      this.cnt += 1
      return new Promise(resolve => {
        const formData = new FormData()
        formData.append('uploadTarget', 'LUV001')
        formData.append('file', files)
        formData.append('uploadDate', that.inputData.activityDate)

        http.request(that.$options.name, 'DTS_AAX_00001', {
          data: formData,
        }).then(res => {
          const newRow = {
            rowNum: that.cnt,
            activitySeqNo: 0,
            fileImagUrl: res.data.fileUrl,
            fileName: res.data.fileName.slice(0, -4),
            altTag: '',
            exposrYn: 'Y',
            exposrOrder: 0, // 입력 시점에서 최종 노출순서를 셋팅
            classGrpId: that.classGrpId, // 클래스(반)
          }
          resolve(newRow)
        })
      })
    },

    // 파일 확장자 체크
    isValidExts(exts) {
      if (!this.accepts) return true
      if (!exts) return false

      return !utils.isEmpty(this.accepts.split(',').filter(item => item.toLowerCase() === exts.toLowerCase()))
    },

    // 파일 사이즈 체크
    isValidSize(size) {
      let result = true
      if (!this.$_maxSize) return true
      if (size > this.$_maxSize) {
        result = false
      }
      return result
    },

    // 파일 유효성 체크
    isValidFile(file) {
      const fileName = file.name
      const exts = fileName.slice(fileName.lastIndexOf('.') + 1)
      if (!this.isValidExts(exts)) { // 확장자 확인
        // 허용 가능한 확장자("{0}")의 파일을 추가하시기 바랍니다.
        utils.messageBox('warning',
          utils.strFormat(this.$t('MSG_ALT_ADD_NCELL_EXTS_FILE'), this.accepts.toLowerCase()))
        return false
      }

      const fileSize = file.size
      if (!this.isValidSize(fileSize)) { // 용량초과 확인
        utils.messageBox('warning', this.$t('MSG_ALT_FILE_MAX_SIZE_EXCEEDED'))
        return false
      }

      return true
    },

    // 파일크기 체크
    isValidPixel(file) {
      const reader = new FileReader()
      return new Promise(resolve => {
        reader.onload = event => {
          const img = new Image()
          img.src = event.target.result
          img.onload = () => {
            const width = String(img.width)
            const height = String(img.height)
            if ((this.wPixel === 'auto' || width === '720')
                && (this.hPixel === 'auto' || height === '720')) {
              resolve(true)
            }
            resolve(false)
          }
          img.onerror = () => { resolve(false) }
        }
        reader.readAsDataURL(file)
      })
    },


    // 유효성 체크
    isValidation() {
      // rule 체크
      if (!this.$rules.validate(this)) {
        return false
      }

      // 활동일
      if (utils.isEmpty(this.inputData.activityDate)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_ACTIVITY_DATE')) // 활동일은(는) 필수 항목입니다.
        utils.messageBox('warning', msg)
        return false
      }

      // 활동제목
      if (utils.isEmpty(this.inputData.activitySubject)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_ACTIVITY_TITLE')) // 활동제목은(는) 필수 항목입니다.
        utils.messageBox('warning', msg)
        return false
      }

      // 멤버십
      if (utils.isEmpty(this.inputData.memshpClassCd)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_MEM_SHP')) // 멤버십은(는) 필수 항목입니다.
        utils.messageBox('warning', msg)
        return false
      }

      // 오픈여부
      if (utils.isEmpty(this.inputData.openYn)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_OPEN_YN')) // 오픈여부은(는) 필수 항목입니다.
        utils.messageBox('warning', msg)
        return false
      }

      // 레벨
      if (utils.isEmpty(this.inputData.lvlCd)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_LEVEL')) // 레벨은(는) 필수 항목입니다.
        utils.messageBox('warning', msg)
        return false
      }

      // 프로젝트
      if (utils.isEmpty(this.inputData.pjtYn)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_LOV_PROJECT')) // 프로젝트은(는) 필수 항목입니다.
        utils.messageBox('warning', msg)
        return false
      }

      // 활동반가입년도
      if (utils.isEmpty(this.inputData.activityGrpJoinYy)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_LOV_ACTIVITY_YYYY')) // 활동반가입년도은(는) 필수 항목입니다.
        utils.messageBox('warning', msg)
        return false
      }
      return true
    },


    /** *************************************
     * 삭제(이미지 삭제)
     *************************************** */
    onClickDelete() {
      const rows = this.$refs.grid.getSelected()
      if (rows.length < 1) {
        utils.messageBox('alert', this.$t('MSG_ALT_DEL_NO_IMG')) // 삭제할 이미지를 선택해주세요.
        return
      }
      // 삭제된 이미지는 다시 복구할 수 없습니다. 삭제하시겠습니까?
      utils.messageBox('confirm', this.$t('MSG_ALT_DEL_IMG'), null, () => {
        rows.forEach(row => {
          this.$refs.grid.removeRow(row, false)
        })
        this.setGridFilter() // 그리드 필터 적용
      })
    },


    /** *************************************
     * Chips 관련
     *************************************** */
    makeInputChip(bansList) {
      if (bansList !== null && bansList.length > 0) {
        bansList.forEach(ban => {
          this.inputChips.push({ text: ban.classGrpName, value: ban.classGrpId })
        })
      }
      this.classGrpId = this.inputChips.length === 0 ? '' : this.inputChips[0].value
      this.setGridFilter() // 그리드 필터 적용
    },


    /** *************************************
     * INPUT 이벤트
     *************************************** */
    // 사랑단 분류 변경 시 멤버십 값 셋팅을 위한 함수
    inputLovgrpKindCd(data) {
      this.inputData.memshpClassCd = ''
      this.inputData.lvlCd = ''
      this.noSelect = true
      this.codes.COD_IA_LOVGRP_LV_CD = []

      const promise = http.loadChildCode(this.pageId, 'COD_IA_LOVGRP_MEMSHP_CD', data)
      promise.then(res => {
        this.codes.COD_IA_LOVGRP_MEMSHP_CD = res.data
      })
    },
    // 멤버십코드 변경시 레벨 셋팅을 위한 함수
    inputMemshpClassCd(data) {
      this.inputData.lvlCd = ''
      if (!_.isEmpty(data)) {
        const promise = http.loadChildCode(this.pageId, 'COD_IA_LOVGRP_LV_CD', data)
        promise.then(res => {
          this.codes.COD_IA_LOVGRP_LV_CD = res.data
          if (res.data.length === 1) {
            this.noSelect = false
            this.inputData.lvlCd = this.codes.COD_IA_LOVGRP_LV_CD[0].codeId
          } else {
            this.noSelect = true
          }
        })
      } else {
        this.codes.COD_IA_LOVGRP_LV_CD = []
      }
    },


    /** *************************************
     * 초기화
     *************************************** */
    onClickReset() {
      utils.messageBox('confirm', this.$t('MSG_ALT_CHK_IMG_CLEAR'), null, () => { // 등록한 이미지를 모두 초기화 시키겠습니까?
        const delRows = this.$refs.grid.getViewData()
        delRows.forEach(row => {
          this.$refs.grid.removeRow(row, false)
        })
        this.setGridFilter() // 그리드 필터 적용
      })
    },

    /** *************************************
     * 사랑단 이미지 관리 목록으로 이동
     *************************************** */
    onClickList() {
      const params = utils.getParameter(this, 'params')
      delete params.activityId
      utils.goPage('PGE_AAE_00042', { params })
    },
  },
}
</script>
<style scoped>
</style>
