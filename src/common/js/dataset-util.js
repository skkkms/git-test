export default {
  /**
   * 전달받은 datasetId로 된 dataset 을 찾는다.
   * 현재 컴포넌트에 없으면 부모 컴포넌트에서 datasetId로 된 dataset을 찾는다.
   *
   * @function findDataset
   * @param  {string} datasetId
   * @param  {Component} component
   */
  findDataset: (datasetId, component) => {
    let dataset = null;
    if (!datasetId) {
      return dataset;
    }
    const id = datasetId.split('.').length === 2 ? datasetId.split('.')[0] : datasetId;
    let currentComponent = component;

    while (currentComponent && !dataset && typeof dataset !== 'string') {
      console.log(currentComponent);
      dataset = currentComponent[id];
      if (dataset && typeof dataset !== 'string') {
        return dataset;
      }
      currentComponent = currentComponent.$parent;
    }
    return null;
  },

  /**
   * dataset의 선택된 row의 데이터를 JSON 타입으로 변환하여 리턴
   *
   * @function getSelectedRow
   * @param  {Object} dataset dataset
   * @returns {Object} dataField 이름을 키로 매핑한 JSON 리턴
   */
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

  /**
   * dataFields를 generate 해주는 유틸
   *
   * @function printDatasetFieldsFromObject
   * @param  {Object} object
   */
  printDatasetFieldsFromObject: (object) => {
    const values = [];
    let text = 'datafields: [\n';
    _.forEach(object, (value, key) => {
      text += `  { type: 'string', name: '${key}', map: '${key}' },\n`;
      values.push(value);
    });
    text += ']';
    console.log(text);
  },
}
