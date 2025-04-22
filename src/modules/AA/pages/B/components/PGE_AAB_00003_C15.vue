<template>
  <div>
    <!-- POS 시설 코드 관리 -->
    <div class="comm_title_wrap mt35">
      <h4 class="pr10">
        POS 시설 코드 관리
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
  name: 'PGE_AAB_00003_C15', // eslint-disable-line vue/name-property-casing
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
          value: 'facil2Cd', text: 'POS 시설 코드', customValue: (v) => v ? v : '-'
        },
        {
          value: 'facil2Nm', text: 'POS 시설 코드명', customValue: (v) => v ? v : '-'
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
