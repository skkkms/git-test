import Dataset from './Dataset';

const DatasetMixin = {
  // data() {
  //   return {
  //     datasets: {}
  //   }
  // },  
  beforeCreate() {
    const datasetOptions = this.$options.__proto__.datasets;
    if (datasetOptions) {
      let computed = this.$options.__proto__.computed || this.$options.computed;
      if (!computed) {
        computed = {};
        this.$options.computed = computed;
      }

      this.tempDatasets = {};
      // A dummy to prevent API reference bugs when datasets are not exists.
      const dummy = new Dataset();
      dummy.init();
      dummy.selectedrow = dummy.getSelectedRow() || {};
      dummy.selectedrows = dummy.getSelectedRows();

      datasetOptions.forEach(option => {
        this.tempDatasets[option.id] = new Dataset();

        computed[option.id] = () => {
          let datasetObj = (this.datasets && this.datasets[option.id]) ? this.datasets[option.id] : this.tempDatasets ? this.tempDatasets[option.id] : null;
          if (datasetObj) {
            datasetObj.selectedrow = datasetObj.getSelectedRow() || {};
            datasetObj.selectedrows = datasetObj.getSelectedRows();
          } else {
            // defence code.
            // This can happen if the user deletes the dataset from the datasets.
            datasetObj = dummy;
            console.error('dataset is removed', option.id);
          }

          return datasetObj;
        };
      });
    }
  },
  created() {
    this.datasets = {};
  },
  mounted() {
    const datasetOptions = this.$options.__proto__.datasets;
    if (datasetOptions) {
      this.datasets = this.tempDatasets;
      Object.keys(this.datasets).forEach(datasetKey => {
        const dataset = this.datasets[datasetKey];
        dataset.init(this);
      });

      datasetOptions.forEach(option => {
        const dataset = this.tempDatasets[option.id];
        if (dataset) {
          dataset.initDataset(option);
          const refreshDatasets = event => {
            this.datasets = { ...this.datasets };
          };

          const events = dataset.EVENTS;
          Object.keys(events).forEach(event => {
            dataset.$on(events[event], refreshDatasets);
          });
        }
      });

      delete this.tempDatasets;
    }
  },
  methods: {
    $getDataset(datasetId) {
      if (this.datasets) {
        const dataset = (this.tempDatasets && this.tempDatasets[datasetId]) || this.datasets[datasetId];
        if (dataset) {
          return dataset;
        } else if (this.$parent) {
          // Search the dataset by traversing the parent
          return this.$parent.$getDataset(datasetId);
        }
      }
      return null;
    },
    $clearDatasets() {
      _.forEach(this.datasets, ds => {
        ds.clear();
      });
      this.datasets = {};
    },
  },
  beforeDestroy() {
    _.forEach(this.datasets, dataset => {
      if (dataset && dataset.destroy) {
        dataset.destroy();
      }      
    });
  }
}

export default DatasetMixin;

  
