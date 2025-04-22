<script>
import utils from '../util';
export default {
  props: {
    dataset: {
      type: String,
      default: null,
    },
  },
  mounted() {
    this.$nextTick(() => { this.bindDataset(); });
    // this.bindDataset();
  },
  beforeDestroy() {
    this.unbindDataset();
  },
  methods: {
    bindDataset() {
      const dataset = utils.findDataset(this.dataset, this);
      if (dataset) {
        this.$dataset = dataset;
        this.$datasetField = this.dataset.split('.')[1];
        dataset.$on(dataset.EVENTS.SELECTION_CHANGED, this.datasetSelectionChanged);
      }
    },
    unbindDataset() {
      if (this.$dataset) {
        this.$dataset.$off(this.$dataset, this.datasetSelectionChanged);
        this.$dataset = null;
      }
    },
    _handleChanged() {
      const selectedRow = utils.getSelectedRow(this.$dataset);
      if (selectedRow && this.onDatasetSelectionChanged) {
        this.onDatasetSelectionChanged(selectedRow[this.$datasetField], selectedRow);
      }
    },
    datasetSelectionChanged() {
      this._handleChanged();
    },
    datasetSourceChanged() {
      this._handleChanged();
    },
    datasetDataChanged() {
      this._handleChanged();
    },
  },
};
</script>
