<template>
  <ur-modal
    ref="modal"
    xlarge
    title="위치보기"
    draggable
    width="1265"
    no-foot
  >
    <template slot="title">
      <div class="modal-title mb45">
        위치 보기
      </div>
    </template>
    <template>
      <div class="modal-body">
        <div style="position: relative;">
          <div
            ref="mapIcon"
            style="position: absolute;"
          >
            <ur-icon
              icon="map"
              size="medium"
              icon-type="picto"
              :style="iconStyle"
            />
          </div>
          <img
            :src="imgSrc"
            style="width: 1200px;height: 1200px"
          >
        </div>
      </div>
      <div class="comm_btn_wrap bt1">
        <div class="right_box mt10">
          <ur-button
            color="violet"
            @click="close"
          >
            닫기
          </ur-button>
        </div>
      </div>
    </template>
  </ur-modal>
</template>
<script>
export default {
  name: 'PGE_AAB_00002_P03', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      caller: '',
      position: {
        insideYn: 'N',
        insideFloor: '05',
        latud: '',
        lgtud: '',
      },
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    modal() {
      return this.$refs.modal
    },
    imgSrc() {
      const outside = 'images/cbmap_fake_outside.png'
      const indoor3rd = 'images/map_3f.jpg'
      const indoor4th = 'images/map_4f.jpg'
      const indoor5th = 'images/map_5f.jpg'
      const indoor6th = 'images/map_6f.jpg'
      let map = outside
      if (this.position.insideYn === 'Y') {
        if (this.position.insideFloor === '3') {
          map = indoor3rd
        } else if (this.position.insideFloor === '4') {
          map = indoor4th
        } else if (this.position.insideFloor === '5') {
          map = indoor5th
        } else if (this.position.insideFloor === '6') {
          map = indoor6th
        }
      }
      return map
    },
    iconStyle() {
      const iconStyle = {}
      iconStyle.position = 'relative'
      iconStyle.top = '-37px'
      iconStyle.left = '-20px'
      iconStyle.color = 'red'
      return iconStyle
    },
  },
  created() {
    console.log('created')
  },
  mounted() {
    console.log('mounted')
  },
  methods: {
    open(params) {
      console.log('open')
      this.caller = params.caller
      this.position = {
        insideYn: this.caller.insideYn,
        insideFloor: this.caller.insideFloor,
        latud: this.caller.yCoordinate,
        lgtud: this.caller.xCoordinate,
      }
      this.modal.open()
      this.setIcon()
    },
    close() {
      console.log('close')
      this.modal.close()
    },
    opened() {
      console.log('opened')
      this.setIcon()
    },
    closed() {},
    setIcon() {
      let lat = this.position.latud
      let lgt = this.position.lgtud
      console.log('setIcon', lat, lgt)
      lat = utils.isEmpty(lat) ? '0' : lat
      lgt = utils.isEmpty(lgt) ? '0' : lgt
      lat += 'px'
      lgt += 'px'
      this.$refs.mapIcon.style.setProperty('top', lat)
      this.$refs.mapIcon.style.setProperty('left', lgt)
    },
  },
}
</script>
<style scoped>
</style>
