<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S:: 등록 -->
      <div class="comm_title_wrap">
        <h4>
          {{ $t("MSG_TIT_MODIFY") }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_PRESET_KIND')"
          label-align="right"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-dropdown
            v-model="presetValue"
            :items="items"
            @input="presetChange"
          />
        </ur-form-item>
        <ur-form-item
          label=""
          label-align="right"
          style="width: 100%; height: auto; background-color: #F3F3F3;} "
          class="flex_wrap_end"
        >
          <ur-button
            v-permission:create="this.$options.name"
            @click="presetSave"
          >
            {{ $t("MSG_BTN_PRESET_SAVE") }}
          </ur-button>
          <ur-button
            v-permission:update="this.$options.name"
            @click="presetUpdate"
          >
            {{ $t("MSG_BTN_PRESET_MODIFY") }}
          </ur-button>
          <ur-button
            v-permission:delete="this.$options.name"
            @click="presetDelete"
          >
            {{ $t("MSG_BTN_PRESET_DELETE") }}
          </ur-button>
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_SLOT_NM')"
          required
          label-align="right"
          style="width: 100%; height: 57px;"
        >
          <div
            class="flex_wrap_col pr10"
            style="width: 50%; margin-bottom: auto;"
          >
            <ur-text-field
              ref="subject"
              v-model="subject"
              value=""
              style="width: 100%; "
              :rules="$rules.getRules('not_empty')"
              maxlength="50"
            />
            <span class="subscript_txt" />
          </div>
          <div
            class="flex_wrap_col"
            style="width: 50%;"
          >
            <ur-text-field
              v-model="eventCode"
              value=""
              style="width: 100%;"
            />
            <span class="subscript_txt">
              {{ $t("MSG_TXT_EVENT_KIND_MODIFY") }}
            </span>
          </div>
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_STRE_START_DAY')"
          required
          label-align="right"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-date-picker
            ref="slotStartDay"
            v-model="slotStartDay"
            :confirm-label="$t('MSG_TXT_SEL')"
            :today-label="$t('MSG_BTN_TODAY')"
            input-type="YYYY-MM-DD"
            init="day+0"
            :rules="$rules.getRules('not_empty')"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_STRE_END_DAY')"
          required
          label-align="right"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-date-picker
            ref="slotEndDay"
            v-model="slotEndDay"
            :confirm-label="$t('MSG_TXT_SEL')"
            :today-label="$t('MSG_BTN_TODAY')"
            input-type="YYYY-MM-DD"
            init="day+0"
            :rules="$rules.getRules('not_empty')"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_PARTCP_START_DAY')"
          required
          label-align="right"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-date-picker
            ref="partcpStartDay"
            v-model="partcpStartDay"
            :confirm-label="$t('MSG_TXT_SEL')"
            :today-label="$t('MSG_BTN_TODAY')"
            input-type="YYYY-MM-DD"
            init="day+0"
            :rules="$rules.getRules('not_empty')"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_PARTCP_END_DAY')"
          required
          label-align="right"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-date-picker
            ref="partcpEndDay"
            v-model="partcpEndDay"
            :confirm-label="$t('MSG_TXT_SEL')"
            :today-label="$t('MSG_BTN_TODAY')"
            input-type="YYYY-MM-DD"
            init="day+0"
            :rules="$rules.getRules('not_empty')"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_TIME_SLOT')+1"
          required
          label-align="right"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <div
            class="flex_wrap_col"
            style="width: 100%;"
          >
            <ur-text-field
              ref="timeSlot"
              v-model="timeSettngValueArr[0]"
              style="width: 100%;"
              :rules="$rules.getRules('not_empty')"
              maxlength="300"
            />
            <span class="subscript_txt">
              {{ $t("MSG_TXT_SUBSCRIPT_TXT") }}
            </span>
          </div>
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_CAPA')+1"
          required
          label-align="right"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <div
            class="flex_wrap_col"
            style="width: 100%;"
          >
            <ur-text-field
              ref="timeCapa"
              v-model="timeCapaCntArr[0]"
              style="width: 100%;"
              :rules="$rules.getRules('not_empty')"
              mask="##########"
              maxlength="10"
            />
            <span class="subscript_txt">
              {{ $t("MSG_TXT_CAPA_SUBSCRIPT_TXT") }}
            </span>
          </div>
        </ur-form-item>
        <template v-for="(item, index) in timeSlotRows">
          <ur-form-item
            :key="index"
            :label="$t('MSG_TXT_TIME_SLOT')+(index+2)"
            required
            label-align="right"
            style="width: 50%; height: auto;"
            class="flex_wrap"
          >
            <div
              class="flex_wrap_col"
              style="width: 100%;"
            >
              <ur-text-field
                :ref="`timeSlot${index+2}`"
                v-model.trim="timeSettngValueArr[index+1]"
                style="width: 100%;"
                maxlength="300"
                :rules="$rules.getRules('not_empty')"
              />
              <span class="subscript_txt">
                {{ $t("MSG_TXT_SUBSCRIPT_TXT") }}
              </span>
            </div>
          </ur-form-item>
          <ur-form-item
            :key="index+'1'"
            :label="$t('MSG_TXT_CAPA')+(index+2)"
            required
            label-align="right"
            style="width: 50%; height: auto;"
            class="flex_wrap"
          >
            <div
              class="flex_wrap_col"
              style="width: 100%;"
            >
              <ur-text-field
                :ref="`timeCapa${index+2}`"
                v-model.trim="timeCapaCntArr[index+1]"
                style="width: 100%;"
                mask="##########"
                :rules="$rules.getRules('not_empty')"
                maxlength="10"
              />
              <span class="subscript_txt">
                {{ $t("MSG_TXT_CAPA_SUBSCRIPT_TXT") }}
              </span>
            </div>
          </ur-form-item>
        </template>

        <ur-form-item
          label=""
          label-align="right"
          style="width: 100%; height: auto; background-color: #F3F3F3;} "
          class="flex_wrap_end"
        >
          <ur-button @click="slotRemove">
            {{ $t("타임슬롯 삭제") }}
          </ur-button>
          <ur-button @click="slotAdd">
            {{ $t("MSG_BTN_TIME_SLOT_ADD") }}
          </ur-button>
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 등록 -->

      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button
              @click="list"
            >
              {{ $t("MSG_BTN_LIST") }} <!-- 목록 -->
            </ur-button>
          </div>
          <div class="right_box">
            <ur-button
              v-permission:delete="this.$options.name"
              @click="remove"
            >
              {{ $t("MSG_BTN_DEL") }} <!-- 삭제 -->
            </ur-button>
            <ur-button
              v-permission:update="this.$options.name"
              color="violet"
              @click="save"
            >
              {{ $t("MSG_BTN_SAVE") }} <!-- 저장 -->
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import VideoSlotMixin from '~aa/pages/H/mixins/VideoSlotMixin'
export default {
  name: 'PGE_AAH_00007', // eslint-disable-line vue/name-property-casing
  mixins: [VideoSlotMixin],
  data() {
    return {
      // 드롭다운
      slotSeq: '',
      presetValue: '0',
      presetId: '',
      subject: '',
      eventCode: 'COMMON2021',
      slotStartDay: '',
      slotEndDay: '',
      partcpStartDay: '',
      partcpEndDay: '',
      picUsrId: '',
      timeSeqArrOld: [],
      statusArr: [],
      timeSettngValueArr: [],
      timeCapaCntArr: [],
      timeSlotRows: [],
      tmSetStr: '',
      items: [],
      deleteCount: 0,
      presetSaveYn: 'N',
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    this.items.push({ value: '0', text: this.$t('MSG_TXT_PRESET_SEL') })

    http.request(this.$options.name, 'DTS_AAH_00019').then(res => {
      for (let i = 0; i < res.data.length; i += 1) {
        this.items.push({ value: res.data[i].presetId, text: res.data[i].presetName })
      }
    }).catch(error => {
      console.log(error)
    })

    // this.timeSlotRows.push({});
  },
  mounted() {
    const param = {
      slotSeq: this.$route.params.slotSeq,
    }

    // 상세
    http.request(this.$options.name, 'DTS_AAH_00011', {
      query: param,
    }).then(res => {
      this.slotSeq = res.data.slotSeq
      this.subject = res.data.subject
      this.eventCode = res.data.eventCode
      this.slotStartDay = res.data.slotStartDay
      this.slotEndDay = res.data.slotEndDay
      this.partcpStartDay = res.data.partcpStartDay
      this.partcpEndDay = res.data.partcpEndDay
    }).catch(error => {
      console.log('error : ', error)
    })

    // 타임 슬롯 리스트
    http.request(this.$options.name, 'DTS_AAH_00021', {
      query: param,
    }).then(res => {
      this.timeSlotRows = []

      for (let i = 0; i < res.data.length; i += 1) {
        if (i !== 0) {
          this.timeSlotRows.push({})
          this.timeSeqArrOld.push(res.data[i].timeSeq)
          this.statusArr.push('U,0,')
          this.timeSettngValueArr.push(res.data[i].timeSettngValue)
          this.timeCapaCntArr.push(`${res.data[i].timeCapaCnt}`)
        } else {
          this.timeSeqArrOld.push(res.data[i].timeSeq)
          this.statusArr.push('U,0,')
          this.timeSettngValueArr.push(res.data[i].timeSettngValue)
          this.timeCapaCntArr.push(`${res.data[i].timeCapaCnt}`)
        }
      }

      this.deleteCount = this.timeSlotRows.length
    }).catch(error => {
      console.log('error : ', error)
    })
  },
  methods: {

    slotAdd() {
      if (this.timeSlotRows.length > 8) {
        utils.messageBox('warning', this.$t('MSG_ALT_MAX10_LENGTH'))
        return
      }

      this.timeSlotRows.push({})

      this.timeSeqArrOld[this.timeSeqArrOld.length] = 0
      this.statusArr[++this.deleteCount] = 'I,0,'
      this.timeSettngValueArr[this.timeSlotRows.length] = ''
      this.timeCapaCntArr[this.timeSlotRows.length] = ''
    },

    slotRemove() {
      if (this.timeSlotRows.length > 0) {
        this.statusArr[this.deleteCount] = `D,${this.timeSeqArrOld[this.timeSeqArrOld.length - 1]},`
        this.timeSlotRows.pop()
        // this.timeSettngValueArr.pop();
        // this.timeCapaCntArr.pop();
        this.timeSeqArrOld.pop()
        this.deleteCount -= 1
      }
    },

    save() {
      if (!this.$rules.validate(this.$refs.subject)) {
        return
      }

      if (!this.$rules.validate(this.$refs.slotStartDay)) {
        return
      }

      if (!this.$rules.validate(this.$refs.slotEndDay)) {
        return
      }

      if (!this.$rules.validate(this.$refs.partcpStartDay)) {
        return
      }

      if (!this.$rules.validate(this.$refs.partcpEndDay)) {
        return
      }

      const slotStartDay = this.slotStartDay.replaceAll('-', '')
      const slotEndDay = this.slotEndDay.replaceAll('-', '')

      if (slotStartDay > slotEndDay) {
        utils.messageBox('alert', this.$t('MSG_ALT_SLOT_DATE'))
        return
      }

      const partcpStartDay = this.partcpStartDay.replaceAll('-', '')
      const partcpEndDay = this.partcpEndDay.replaceAll('-', '')

      if (partcpStartDay > partcpEndDay) {
        utils.messageBox('alert', this.$t('MSG_ALT_PARTCP_DATE'))
        return
      }

      // function of VideoSlotMixin
      if (!this.isValidTimeSlotAndCapa(this)) {
        return
      }

      const regx = /^(((0|1)[0-9]|2[0-3]):[0-5][0-9]~((0|1)[0-9]|2[0-3]):[0-5][0-9])(,?(((0|1)[0-9]|2[0-3]):[0-5][0-9]~((0|1)[0-9]|2[0-3]):[0-5][0-9]))*$/
      const regxdigit = /^[0-9]{1,}$/

      for (let i = 0; i < this.timeSettngValueArr.length; i += 1) {
        if (this.timeSettngValueArr[i] !== '') {
          if (!regx.test(this.timeSettngValueArr[i])) {
            utils.messageBox('warning', `${this.$t('MSG_TXT_SLOT') + (i + 1) + this.$t('MSG_TXT_CNFG_VAL')}[${this.timeSettngValueArr[i]}]${this.$t('MSG_TXT_NOT_INPUT')}`)
            return
          }
        } else {
          this.timeSettngValueArr.pop()
        }

        if (this.timeCapaCntArr[i] !== '') {
          if (!regxdigit.test(this.timeCapaCntArr[i])) {
            utils.messageBox('warning', this.$t('MSG_TXT_CAPA_NUM_ONLY'))
            return
          }
        } else {
          this.timeCapaCntArr.pop()
        }
      }

      const param = {
        slotSeq: this.slotSeq,
        subject: this.subject,
        eventCode: this.eventCode,
        slotStartDay: this.slotStartDay,
        slotEndDay: this.slotEndDay,
        partcpStartDay: this.partcpStartDay,
        partcpEndDay: this.partcpEndDay,
        picUsrId: this.$store.getters.userInfo.userId,
        timeSettngValueArr: this.timeSettngValueArr,
        timeCapaCntArr: this.timeCapaCntArr,
        timeSeqArrOld: this.timeSeqArrOld,
        statusArr: this.statusArr,
        presetSaveYn: this.presetSaveYn,
      }

      http.request(this.$options.name, 'DTS_AAH_00013', {
        data: param,
      }).then(() => {
        utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
        utils.goPage('PGE_AAH_00004', {})
      }).catch(error => {
        console.log(error)
      })
    },

    remove() {
      const param = {
        slotSeq: this.slotSeq,
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
        http.request(this.$options.name, 'DTS_AAH_00015', {
          query: param,
        }).then(res => {
          if (res.data.count > 0) {
            utils.messageBox('alert', this.$t('MSG_ALT_DELETED'))
            utils.goPage('PGE_AAH_00004', {})
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },

    presetSave() {
      if (!this.$rules.validate(this.$refs.subject)) {
        utils.messageBox('warning', this.$t('MSG_ALT_SLOT_INPUT'))
        return
      }

      for (let i = 0; i < this.items.length; i += 1) {
        if (this.items[i].text === this.subject) {
          utils.messageBox('warning', this.$t('MSG_ALT_PRESET_NAME_ERR'))
          return
        }
      }

      if (!this.$rules.validate(this.$refs.subject)) {
        return
      }

      if (!this.$rules.validate(this.$refs.slotStartDay)) {
        return
      }

      if (!this.$rules.validate(this.$refs.slotEndDay)) {
        return
      }

      if (!this.$rules.validate(this.$refs.partcpStartDay)) {
        return
      }

      if (!this.$rules.validate(this.$refs.partcpEndDay)) {
        return
      }

      const slotStartDay = this.slotStartDay.replaceAll('-', '')
      const slotEndDay = this.slotEndDay.replaceAll('-', '')

      if (slotStartDay > slotEndDay) {
        utils.messageBox('alert', this.$t('MSG_ALT_SLOT_DATE'))
        return
      }

      const partcpStartDay = this.partcpStartDay.replaceAll('-', '')
      const partcpEndDay = this.partcpEndDay.replaceAll('-', '')

      if (partcpStartDay > partcpEndDay) {
        utils.messageBox('alert', this.$t('MSG_ALT_PARTCP_DATE'))
        return
      }

      // function of VideoSlotMixin
      if (!this.isValidTimeSlotAndCapa(this)) {
        return
      }

      const regx = /^(((0|1)[0-9]|2[0-3]):[0-5][0-9]~((0|1)[0-9]|2[0-3]):[0-5][0-9])(,?(((0|1)[0-9]|2[0-3]):[0-5][0-9]~((0|1)[0-9]|2[0-3]):[0-5][0-9]))*$/
      const regxdigit = /^[0-9]{1,}$/

      this.tmSetStr = ''
      for (let i = 0; i < this.timeSettngValueArr.length; i += 1) {
        if ((i + 1) === this.timeSettngValueArr.length) {
          this.tmSetStr += `${this.timeSettngValueArr[i]}|${this.timeCapaCntArr[i]}`
        } else {
          this.tmSetStr += `${this.timeSettngValueArr[i]}|${this.timeCapaCntArr[i]}+`
        }

        if (!regx.test(this.timeSettngValueArr[i])) {
          utils.messageBox('warning', `${this.$t('MSG_TXT_SLOT') + (i + 1) + this.$t('MSG_TXT_CNFG_VAL')}[${this.timeSettngValueArr[i]}]${this.$t('MSG_TXT_NOT_INPUT')}`)
          return
        }

        if (!regxdigit.test(this.timeCapaCntArr[i])) {
          utils.messageBox('warning', this.$t('MSG_TXT_CAPA_NUM_ONLY'))
          return
        }
      }

      const param = {
        presetName: this.subject,
        eventCode: this.eventCode,
        presetStartDay: this.slotStartDay,
        presetEndDay: this.slotEndDay,
        partcpStartDay: this.partcpStartDay,
        partcpEndDay: this.partcpEndDay,
        tmSetStr: this.tmSetStr,
      }

      utils.messageBox('confirm', `${this.$t('MSG_TXT_PRESET')}[${this.subject}]${this.$t('MSG_TXT_PRESET_SAVE')}`, null, () => {
        http.request(this.$options.name, 'DTS_AAH_00016', {
          data: param,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))

          this.items = []
          this.items.push({ value: '0', text: this.$t('MSG_TXT_PRESET_SEL') })

          http.request(this.$options.name, 'DTS_AAH_00019').then(res => {
            for (let i = 0; i < res.data.length; i += 1) {
              this.items.push({ value: res.data[i].presetId, text: res.data[i].presetName })
            }
          }).catch(error => {
            console.log(error)
          })
        }).catch(error => {
          console.log(error)
        })
      })
    },

    presetUpdate() {
      if (this.presetValue === '0') {
        utils.messageBox('warning', this.$t('MSG_ALT_PRESET_SEL_NOT_UPDATE'))
        return
      }

      if (!this.$rules.validate(this.$refs.subject)) {
        return
      }

      if (!this.$rules.validate(this.$refs.slotStartDay)) {
        return
      }

      if (!this.$rules.validate(this.$refs.slotEndDay)) {
        return
      }

      if (!this.$rules.validate(this.$refs.partcpStartDay)) {
        return
      }

      if (!this.$rules.validate(this.$refs.partcpEndDay)) {
        return
      }

      const slotStartDay = this.slotStartDay.replaceAll('-', '')
      const slotEndDay = this.slotEndDay.replaceAll('-', '')

      if (slotStartDay > slotEndDay) {
        utils.messageBox('alert', this.$t('MSG_ALT_SLOT_DATE'))
        return
      }

      const partcpStartDay = this.partcpStartDay.replaceAll('-', '')
      const partcpEndDay = this.partcpEndDay.replaceAll('-', '')

      if (partcpStartDay > partcpEndDay) {
        utils.messageBox('alert', this.$t('MSG_ALT_PARTCP_DATE'))
        return
      }

      // function of VideoSlotMixin
      if (!this.isValidTimeSlotAndCapa(this)) {
        return
      }

      const regx = /^(((0|1)[0-9]|2[0-3]):[0-5][0-9]~((0|1)[0-9]|2[0-3]):[0-5][0-9])(,?(((0|1)[0-9]|2[0-3]):[0-5][0-9]~((0|1)[0-9]|2[0-3]):[0-5][0-9]))*$/
      const regxdigit = /^[0-9]{1,}$/

      this.tmSetStr = ''
      for (let i = 0; i < this.timeSettngValueArr.length; i += 1) {
        if ((i + 1) === this.timeSettngValueArr.length) {
          this.tmSetStr += `${this.timeSettngValueArr[i]}|${this.timeCapaCntArr[i]}`
        } else {
          this.tmSetStr += `${this.timeSettngValueArr[i]}|${this.timeCapaCntArr[i]}+`
        }

        if (!regx.test(this.timeSettngValueArr[i])) {
          utils.messageBox('warning', `${this.$t('MSG_TXT_SLOT') + (i + 1) + this.$t('MSG_TXT_CNFG_VAL')}[${this.timeSettngValueArr[i]}]${this.$t('MSG_TXT_NOT_INPUT')}`)
          return
        }

        if (!regxdigit.test(this.timeCapaCntArr[i])) {
          utils.messageBox('warning', this.$t('MSG_TXT_CAPA_NUM_ONLY'))
          return
        }
      }

      const param = {
        presetId: this.presetValue,
        presetName: this.subject,
        eventCode: this.eventCode,
        presetStartDay: this.slotStartDay,
        presetEndDay: this.slotEndDay,
        partcpStartDay: this.partcpStartDay,
        partcpEndDay: this.partcpEndDay,
        tmSetStr: this.tmSetStr,
      }

      utils.messageBox('confirm', `${this.$t('MSG_TXT_PRESET')}[${this.subject}]${this.$t('MSG_TXT_PRESET_UPDATE')}`, null, () => {
        http.request(this.$options.name, 'DTS_AAH_00017', {
          data: param,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
          // utils.goPage('PGE_AAH_00004', {});
          this.items = []
          this.items.push({ value: '0', text: this.$t('MSG_TXT_PRESET_SEL') })

          http.request(this.$options.name, 'DTS_AAH_00019').then(res => {
            for (let i = 0; i < res.data.length; i += 1) {
              this.items.push({ value: res.data[i].presetId, text: res.data[i].presetName })
            }
          }).catch(error => {
            console.log(error)
          })
        }).catch(error => {
          console.log(error)
        })
      })
    },

    presetDelete() {
      if (this.presetValue === '0') {
        utils.messageBox('warning', this.$t('MSG_ALT_PRESET_SEL_NOT_DELETE'))
        return
      }

      const param = {
        presetId: this.presetValue,
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_SEL_PRESET_DELETE'), null, () => {
        http.request(this.$options.name, 'DTS_AAH_00018', {
          data: param,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_DELETED'))

          this.items = []
          this.items.push({ value: '0', text: this.$t('MSG_TXT_PRESET_SEL') })

          http.request(this.$options.name, 'DTS_AAH_00019').then(res => {
            for (let i = 0; i < res.data.length; i += 1) {
              this.items.push({ value: res.data[i].presetId, text: res.data[i].presetName })
            }
          }).catch(error => {
            console.log(error)
          })

          this.presetValue = '0'
        }).catch(error => {
          console.log(error)
        })
      })
    },
    presetChange(item) {
      utils.messageBox('confirm', this.$t('MSG_ALT_SEL_PRESET_SETTING'), null, () => {
        if (item === '0') {
          this.subject = ''
          this.slotStartDay = ''
          this.slotEndDay = ''
          this.partcpStartDay = ''
          this.partcpEndDay = ''
          this.eventCode = ''
          this.timeSlotRows = []
          this.timeSettngValueArr = []
          this.timeCapaCntArr = []
          // this.timeSlotRows.push({});
          this.presetSaveYn = 'N'

          return
        }

        const param = {
          presetId: item,
        }

        http.request(this.$options.name, 'DTS_AAH_00020', {
          query: param,
        }).then(res => {
          this.subject = res.data.presetName
          this.slotStartDay = res.data.presetStartDay
          this.slotEndDay = res.data.presetEndDay
          this.partcpStartDay = res.data.partcpStartDay
          this.partcpEndDay = res.data.partcpEndDay
          this.eventCode = res.data.eventCode

          const tempSlotArr = res.data.tmSetStr.split('+')
          this.timeSlotRows = []
          let slotArr = ''
          let idx = 0
          let idxx = 0
          for (let i = 0; i < tempSlotArr.length; i += 1) {
            this.timeSlotRows.push({})

            this.timeSettngValueArr[tempSlotArr.length] = ''
            this.timeCapaCntArr[tempSlotArr.length] = ''

            slotArr = tempSlotArr[i].split('|')

            for (let i = 0; i < slotArr.length; i += 1) {
              if (i % 2 === 0) {
                this.timeSettngValueArr[idx] = slotArr[i]
                idx += 1
              } else {
                this.timeCapaCntArr[idxx] = slotArr[i]
                idxx += 1
              }
            }
          }

          this.presetSaveYn = 'Y'

          console.log(`res.data.tmSetStr : ${res.data.tmSetStr}`)
          console.log(`slotArr : ${slotArr}`)
        }).catch(error => {
          console.log(error)
        })
      })
    },

    list() {
      utils.goPage('PGE_AAH_00004', {})
    },


  },
}
</script>

<style scoped>
</style>
