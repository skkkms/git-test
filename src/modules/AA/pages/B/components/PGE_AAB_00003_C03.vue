<template>
  <div>
    <!-- 이용 안내 -->
    <div class="comm_title_wrap mt35">
      <h4 class="pr10">
        이용 안내
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
  name: 'PGE_AAB_00003_C03', // eslint-disable-line vue/name-property-casing
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
      },
      columns: [
        {
          value: '__idx', text: 'No.', width: 100, customValue: (v) => v+1
        },
        {
          value: 'useGuidDescrt', text: '이용안내 (국문)', customValue: (v) => v ? v : '-'
        },
        {
          value: 'useGuidDescrtEng', text: '이용안내 (영문)', customValue: (v) => v ? v : '-'
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
