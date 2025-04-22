import moment from 'moment';
import store from '~system/vuex'; // eslint-disable-line import/no-unresolved

const FORMAT_STR_SERVER = 'YYYYMMDDHHmmss';
const FORMAT_STR_CLIENT = 'YYYY-MM-DD HH:mm:ss'; // ISO 8601
const FORMAT_STR_SERVER_SHORT = 'YYYYMMDD';
const FORMAT_STR_CLIENT_SHORT = 'YYYY-MM-DD'

/**
 * 사용자가 설정한 포맷으로 변환.
  *
 * @function dateformatToUserPrsnz
 * @param  {string} data
 */
 function dateformatToUserPrsnz(data) {
  const FORMAT_STR_PRSNZ_SHORT = store.getters.userInfo.dateFormat;
  if(!utils.isEmpty(FORMAT_STR_PRSNZ_SHORT)){
    const FORMAT_STR_PRSNZ = FORMAT_STR_PRSNZ_SHORT+' HH:mm:ss';
    if(data.length < 14) {
  	  return FORMAT_STR_PRSNZ_SHORT;
    }else{
      return FORMAT_STR_PRSNZ;
    }
  }else{
    if(data.length < 14) {
  	  return FORMAT_STR_CLIENT_SHORT;
    }else{
      return FORMAT_STR_CLIENT;
    }    
  }
 }
/**
 * data를 Date()에서 알아볼 수 있는 데이터로 변환.
 * FIXME: 이전 함수명 - formatToGridData
 *
 * @function dateformatToClient
 * @param  {string} data
 */
 function dateformatToClient(data, dateOpt) {
  if(!utils.isEmpty(data)) {
		if(dateOpt == 'S') {
      data = data.slice(0,8);
			return moment(data, FORMAT_STR_SERVER_SHORT).format(dateformatToUserPrsnz(data));
		}
		else {
      return moment(data, FORMAT_STR_SERVER).format(dateformatToUserPrsnz(data));
		}    
  }
  return '';
}

/**
 * Grid 데이터를 서버에서 알아볼 수 있는 데이터로 변환.
 * FIXME: 이전 함수명 - formatToRowData
 *
 * @function dateformatToServer
 * @param  {string} data
 */
 function dateformatToServer(data, dateOpt) {
	if(!utils.isEmpty(data)) {
		if(dateOpt == 'S') {
			return moment(data, dateformatToUserPrsnz(data)).format(FORMAT_STR_SERVER_SHORT);
		}
		else {
			return moment(data, dateformatToUserPrsnz(data)).format(FORMAT_STR_SERVER);
		}
	}
	return '';
}

/**
 * objectArray에서 dateFields에 명시된 dateField 항목만 Date() 에서 알아볼 수 있는 date 형식으로 변환한다.
 * FIXME: 이전 함수명 - formatStringToDate
 *
 * @function dateformatToClientInArray
 * @param  {Object[]} objectArray
 * @param  {string[]} dateFields
 */
function dateformatToClientInArray(objectArray, dateFields) {
  _.forEach(objectArray, data => {
    _.forEach(data, (value, key) => {
      if (dateFields.indexOf(key) >= 0 && !utils.isEmpty(value)) { 
        data[key] = moment(value, FORMAT_STR_SERVER).format(dateformatToUserPrsnz(value));
      }
    });
  });
}

/**
 * objectArray에서 dateFields에 명시된 dateField 항목만 서버가 알아볼 수 있는 date 형식으로 변환한다.
 * FIXME: 이전 함수명 - formatDateToString
 *
 * @function dateformatToServerInArray
 * @param  {Object[]} objectArray
 * @param  {string[]} dateFields
 */
function dateformatToServerInArray(objectArray, dateFields) {
  _.forEach(objectArray, data => {
    _.forEach(data, (value, key) => {
      if (dateFields.indexOf(key) >= 0 && !utils.isEmpty(value)) {
        data[key] = moment(value, dateformatToUserPrsnz(value)).format(FORMAT_STR_SERVER);
      }
    });
  });
}

/**
 * date를 지정한 format에 맞는 문자열로 변환
 */
function toStringByFormat(date, dateFormat) {
  return moment(date, FORMAT_STR_SERVER).isValid() ? moment(date, FORMAT_STR_SERVER).format(dateFormat) : '';
}



export default {
  dateformatToClient,
  dateformatToServer,
  dateformatToClientInArray,
  dateformatToServerInArray,
  toStringByFormat,
};
