<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div>
        <div class="right_box">
          <ur-button
              v-permission:read="this.$options.name"
              @click="read()"
          >
            조회
          </ur-button>
          <ur-button
              color="violet"
              v-permission:create="this.$options.name"
          >
            신규
          </ur-button>

          <ur-button
              color="violet"
              v-permission:update="this.$options.name"
          >
            저장
          </ur-button>

          <ur-button
              color="violet"
              v-permission:delete="this.$options.name"
          >
            삭제
          </ur-button>
          <ur-button
              color="violet"
              v-permission:print="this.$options.name"
          >
            출력
          </ur-button>

          <ur-button
              color="violet"
              v-permission:excel="this.$options.name"
          >
            엑셀
          </ur-button>

          <ur-button
              color="violet"
              v-permission:download="this.$options.name"
          >
            다운로드
          </ur-button>

          <ur-button
              color="violet"
              v-permission:test="this.$options.name"
          >
            테스트
          </ur-button>
        </div>
      </div>
    </sui-page-contents>
  </sui-page>

</template>

<script>
export default {
  name: 'PGE_AAA_00004', // eslint-disable-line vue/name-property-casing

  methods: {
    read() {
      http.request(this.$options.name, 'DTS_AAA_00007', {
      }).then(res => {
        if (res.data) {
          alert(JSON.stringify(res.data))
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // bug() {
    //   const a = 1
    //   if (a === 0) {
    //     alert(0)
    //   } if(a === 1) {
    //     alert(1)
    //   } if(a === 2) {
    //     alert(2)
    //   }
    // },
  },
}
</script>

<style scoped>

</style>