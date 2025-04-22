<!-- eslint-disable vue/valid-template-root -->
<template #left-info>
  <div style="display: flex;">
    <div class="ur-data-grid__info-item">
      <span class="ur-data-grid__info__total">
        Total <b>{{ totalCount }}</b> <!-- Grid Total Count -->
      </span>
    </div>
    <div class="ur-data-grid__info-item">
      <ur-dropdown
        v-model="rowsPerPage"
        :items="pageSizeItems"
        class="ur-data-grid__info__per-page"
      />
    </div>
  </div>
</template>
<script>

export default {
  name: 'CmpUrDataGridLeftInfo',
  props: {
    totalCount: {
      type: Number,
      required: true,
      default: 0,
    },
    pageSize: {
      type: Number,
      required: true,
      default: 10,
    },
    pageSizeItems: {
      type: Array,
      required: false,
      default: () => [
        { value: 10, text: '10 per page' },
        { value: 15, text: '15 per page' },
        { value: 30, text: '30 per page' },
      ],
    },
  },
  data() {
    return {
      rowsPerPage: null,
    }
  },
  watch: {
    pageSize: {
      immediate: true,
      handler(value) {
        this.rowsPerPage = value
      },
    },
    rowsPerPage: {
      handler(value) {
        this.$emit('changePageSize', value)
      },
    },
  },
}
</script>
