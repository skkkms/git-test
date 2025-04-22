import moment from 'moment';

const FORMAT_STR_SERVER = 'YYYYMMDDHHmmss';
const FORMAT_STR_GRID = 'YYYY-MM-DD HH:mm:ss';

class DateFormatter {
  formatToGridData(data) {
    return moment(data, FORMAT_STR_SERVER).format(FORMAT_STR_GRID);
  }

  formatToRowData(data) {
    return moment(data, FORMAT_STR_GRID).format(FORMAT_STR_SERVER);
  }

  formatStringToDate(objectArray, dateFields) {
    _.forEach(objectArray, data => {
      _.forEach(data, (value, key) => {
        if (dateFields.indexOf(key) >= 0) {
          data[key] = moment(value, FORMAT_STR_SERVER).format(FORMAT_STR_GRID);
        }
      });
    });
  }

  formatDateToString(objectArray, dateFields) {
    _.forEach(objectArray, data => {
      _.forEach(data, (value, key) => {
        if (dateFields.indexOf(key) >= 0) {
          data[key] = moment(value, FORMAT_STR_SERVER).format(FORMAT_STR_GRID);
        }
      });
    });
  }
}

export default new DateFormatter();
