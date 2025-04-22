<template>
  <div>
    <!-- 시설 카테고리 관리 -->
    <div class="comm_title_wrap mt35">
      <h4 class="pr10">
        시설 카테고리 관리
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
  name: 'PGE_AAB_00003_C12', // eslint-disable-line vue/name-property-casing
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
      CODE_KEYS: ['COD_IA_EL_FACILT_CATE_KIND', 'COD_IA_CB_FACILT_CATE_KIND'],
      codes: {
        COD_IA_EL_FACILT_CATE_KIND: [],
        COD_IA_CB_FACILT_CATE_KIND: [],
      },
      columns: [
        {
          value: '__idx', text: 'No.', width: 100, customValue: (v) => v+1
        },
        {
          value: 'faciltCateKindNm', text: '시설 카테고리',
          customValue: (v,r) => {
            let codeId = r.faciltCateKindCd;
            let code = this.codes.COD_IA_EL_FACILT_CATE_KIND.find((v) => v.codeId==codeId);
            let val = code ? code.codeName : '';
            return val ? val : '-';
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
    http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
  },
  mounted() {
  },
  methods: {
  },
}
</script>
<style scoped>
</style>
