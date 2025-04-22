const EventGridColumnMixin = {
  computed: {
    COLUMN_REWRD_KIND() {
      const that = this
      return {
        text: this.$t('MSG_TXT_KIND'), // 구분
        value: 'rewrdKindCd',
        required: true,
        component: {
          props: ['row', 'value', 'text', 'me'],
          template: `
            <div>
              <ur-dropdown
                v-model="row.rewrdKindCd"
                :items="codes.COD_IA_EVENT_REWARD_KIND"
                :placeholder="$t('MSG_TXT_SEL')"
                @input="onInputRewrdKind"
              />
            </div>`,
          computed: {
            codes() {
              return that.codes
            },
          },
          methods: {
            onInputRewrdKind(value) {
              that.rewrdGrid.dataSource.setRowValue(this.row, 'rewrdKindCd', value)
              if (value !== '01') {
                that.rewrdGrid.dataSource.setRowValue(this.row, 'couponMasterId', null)
                that.rewrdGrid.dataSource.setRowValue(this.row, 'couponMasterNo', null)
                that.rewrdGrid.dataSource.setRowValue(this.row, 'couponIssueSeq', null)
                that.rewrdGrid.dataSource.setRowValue(this.row, 'couponName', null)
              }
            },
          },
        },
        width: 130,
      }
    },
    COLUMN_GVWY_NAME() {
      const that = this
      return {
        text: this.$t('MSG_TXT_GVWY_NAME'), // 경품 명
        required: true,
        component: {
          props: ['row', 'value', 'text', 'me'],
          template: `
            <div>
              <ur-text-field
                v-model="row.rewrdName"
                :disabled="disabled"
                style="width: 100%"
                maxlength="50"
                @input="onInputRewrdName"
              />
            </div>`,
          computed: {
            disabled() {
              return utils.isEmpty(this.row.rewrdKindCd) || this.row.rewrdKindCd === '99'
            },
          },
          methods: {
            onInputRewrdName(value) {
              that.rewrdGrid.dataSource.setRowValue(this.row, 'rewrdName', value)
            },
          },
        },
      }
    },
    COLUMN_PAYMNT_COUPON() {
      const that = this
      return {
        text: this.$t('MSG_TXT_PAYMNT_COUPON'), // 지급 쿠폰
        component: {
          props: ['row', 'value', 'text', 'me'],
          template: `
            <div>
              <ur-text-field
                v-model="row.couponName"
                :disabled="disabled"
                readonly
                style="width: 100%"
              />
              <ur-icon-button
                v-if="!disabled"
                :disabled="disabled"
                icon="search"
                icon-type="line"
                color="primary"
                style="margin-left: 10px"
                @click="onClickCouponSearch"
              />
            </div>`,
          computed: {
            disabled() {
              return this.row.rewrdKindCd !== '01'
            },
          },
          watch: {
            'row.couponMasterId': {
              immediate: true,
              async handler(value) {
                let coupon = null
                if (value) {
                  coupon = await that.selectCoupon({
                    masterId: this.row.couponMasterId,
                    couponMasterNo: this.row.couponMasterNo,
                    issueSeq: this.row.couponIssueSeq,
                  })
                }
                const validPeriodStartDate = coupon ? coupon.validPeriodStartDate : null
                const validPeriodEndDate = coupon ? coupon.validPeriodEndDate : null
                that.rewrdGrid.dataSource.setRowValue(this.row, 'validPeriodStartDate', validPeriodStartDate)
                that.rewrdGrid.dataSource.setRowValue(this.row, 'validPeriodEndDate', validPeriodEndDate)
              },
            },
          },
          methods: {
            onClickCouponSearch() {
              utils.openLayerPopup('PGE_AAX_00001', this.onCloseCouponPopup, { size: 'lg' })
            },
            onCloseCouponPopup(data = null) {
              if (data) {
                that.rewrdGrid.dataSource.setRowValue(this.row, 'couponMasterId', data.masterId)
                that.rewrdGrid.dataSource.setRowValue(this.row, 'couponMasterNo', data.couponMasterNo)
                that.rewrdGrid.dataSource.setRowValue(this.row, 'couponIssueSeq', data.issueSeq)
                that.rewrdGrid.dataSource.setRowValue(this.row, 'couponName', data.couponName)
              }
            },
          },
        },
      }
    },
    COLUMN_REWRD_QTY() {
      const that = this
      return {
        text: this.$t('MSG_TXT_QTY'), // 수량
        required: true,
        component: {
          props: ['row', 'value', 'text', 'me'],
          template: `
            <div
              style="align-items: center"
            >
              <ur-dropdown
                v-model="row.rewrdQtyLimitYn"
                :items="codes.COD_IA_QTY_LIMIT_YN"
                :placeholder="$t('MSG_TXT_SEL')"
                style="width: 100px"
                @input="onInputRewrdQtyLimitYn"
              />
              <ur-text-field
                v-model="row.rewrdQty"
                :disabled="disabled"
                style="width: 100px; margin-left: 10px"
                mask="number"
                maxlength="7"
                @keyup="row.rewrdQty = parseInt(row.rewrdQty, 10)"
                @input="onInputRewrdQty"
              /> <span style="margin-left: 5px">{{ $t('MSG_TXT_NUMBER_OF_COUNT') }}</span> <!-- 개 -->
            </div>`,
          computed: {
            codes() {
              return that.codes
            },
            disabled() {
              return this.row.rewrdQtyLimitYn === 'N'
            },
          },
          methods: {
            onInputRewrdQtyLimitYn(value) {
              that.rewrdGrid.dataSource.setRowValue(this.row, 'rewrdQtyLimitYn', value)
              if (value === 'N') {
                that.rewrdGrid.dataSource.setRowValue(this.row, 'rewrdQty', null)
              }
            },
            onInputRewrdQty(value) {
              that.rewrdGrid.dataSource.setRowValue(this.row, 'rewrdQty', value)
            },
          },
        },
        width: 250,
      }
    },
  },
}

export default EventGridColumnMixin
