import _ from 'lodash';

export default {
  findDataset: (datasetId, component) => {
    let dataset = null;
    if (!datasetId) {
      return dataset;
    }
    const id = datasetId.split('.').length === 2 ? datasetId.split('.')[0] : datasetId;
    let currentComponent = component;

    while (currentComponent && !dataset && typeof dataset !== 'string') {
      dataset = currentComponent[id];
      if (dataset && typeof dataset !== 'string') {
        return dataset;
      }
      currentComponent = currentComponent.$parent;
    }
    return null;
  },
  getSelectedRow: (dataset) => {
    if (dataset && dataset.getSelectedIndexes().length > 0) {
      const selectedRow = dataset.data[dataset.getSelectedIndexes()[0]];
      const dataFields = dataset.getDatafields();
      const selectedData = {};
      _.forEach(dataFields, field => {
        selectedData[field.name] = selectedRow[field.map];
      });
      return selectedData;
    }
  },
  printDatasetFieldsFromObject: (obj) => {
    const values = [];
    let text = 'datafields: [\n';
    _.forEach(obj, (value, key) => {
      text += `  { type: 'string', name: '${key}', map: '${key}' },\n`;
      values.push(value);
    });
    text += ']';
    console.log(text);
  },
}
