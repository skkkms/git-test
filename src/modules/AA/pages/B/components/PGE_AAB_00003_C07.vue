<template>
  <div>
    <!-- 배너 이미지 관리 -->
    <div class="comm_title_wrap mt35">
      <h4 class="pr10">
        배너 이미지 관리
      </h4>
    </div>
    <!-- GRID -->
    <ur-data-grid
      ref="grid"
      :headers="columns"
      :data-source="list"
      :options="opts"
      height="300"
    />
  </div>
</template>
<script>
export default {
  name: 'PGE_AAB_00003_C07', // eslint-disable-line vue/name-property-casing
  components: {
  },
  props: {
    list: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      // 그리드
      opts: {
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
        rowHeight: 'auto', // 첨부가 포함된 그리드에 해당 옵션을 추가해주지 않으면 row가 상하로 늘어나지 않습니다.
      },
      columns: [
        {
          value: '__idx', text: 'No.', width: 100, customValue: (v) => v+1
        },
        {
          value: 'bannerImagUrl',
          text: '첨부파일',
          component: {
            props: ['row', 'value', 'text', 'me'], // provided by grid
            template: `<div class="pdCol10">
              <cmp-single-file-uploader
                v-if="false"
                v-model="value"
                mode="SELECT"
                preview-mode="BELOW"
                page-id="null"
              />
              <img :src="value"/>
            </div>`,
          },
        },
      ],
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
  },
}
</script>
<style scoped>
</style>
