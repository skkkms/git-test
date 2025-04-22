import moment from 'moment';

const FORMAT_STR_SERVER = 'YYYYMMDDHHmmss';
const FORMAT_STR_CLIENT = 'YYYY-MM-DD HH:mm:ss'; // ISO 8601

/**
 * 날짜형식인지 체크
 * @param str
 */
function isDate(str) {
  return moment(str).isValid();
}

/**
 * 날짜 타입으로 변환
 */
function toDate(str) {
  return moment(str, FORMAT_STR_SERVER).toDate();
}

/**
 * 날짜의 선후관계 비교 (이전: -1, 같음: 0, 이후: 1)
 */
function compareTo(targetDate, compareDate) {
  const date1 = moment(targetDate, FORMAT_STR_SERVER);
  const date2 = moment(compareDate, FORMAT_STR_SERVER);

  let ret = 0;

  if(date1.isBefore(date2))       ret = -1;
  else if (date1.isSame(date2))   ret = 0;
  else if (date1.isAfter(date2))  ret = 1;

  return ret;
}

/**
 * 두 날짜가 같은지 판단
 * @param date
 * @param otherDate
 * @returns {boolean | *}
 */
function isEqualDate(date, otherDate) {
  return date.isSame(otherDate);
}

/**
 * 입력받은 날짜와의 월 차이를 리턴
 */
function getMonthOffset(targetDate, diffDate) {
  const a = moment(diffDate, 'YYYYMMDD');
  const b = moment(targetDate, 'YYYYMMDD');
  return b.diff(a, 'months');
}

/**
 * 입력받은 날짜와의 일 차이를 리턴
 */
function getDayOffset(targetDate, diffDate) {
  const a = moment(diffDate, 'YYYYMMDD');
  const b = moment(targetDate, 'YYYYMMDD');
  return b.diff(a, 'days');
}

/**
 * 입력받은 날짜와의 년 차이를 리턴
 */
function getYearOffset(targetDate, diffDate) {
  const a = moment(diffDate, 'YYYYMMDD');
  const b = moment(targetDate, 'YYYYMMDD');
  return b.diff(a, 'years');
}

/**
 * 일 추가
 */
function addDay(date, offset) {
  return moment(date).add(offset, 'days').format(FORMAT_STR_SERVER);
}

/**
 * 월 추가
 */
function addMonth(date, offset) {
  return moment(date).add(offset, 'months').format(FORMAT_STR_SERVER);
}
/**
 * 년 추가
 */
function addYear(date, offset) {
  return moment(date).add(offset, 'years').format(FORMAT_STR_SERVER);
}

/**
 * 월의 마지막 일자
 */
function getLastDateOfMonth(year, month) {
  return moment([year, month]).endOf('month').format('DD');
}

/**
 * 윤년 여부 판단
 */
function isLeapYear(year) {
  return moment(year).isLeapYear();
}

/**
 * 현재 시간을 반환
 */
function now(format = 'YYYYMMDD') {
  return moment().format(format);
}

export default {
  isDate,
  toDate,
  compareTo,
  getMonthOffset,
  getDayOffset,
  getYearOffset,
  addDay,
  addMonth,
  addYear,
  getLastDateOfMonth,
  isLeapYear,
  now,
};
