import DateFormmaterUtil from './date-formatter-util';
import DateUtil from './date-util';

export default {
  dateformatToClient: DateFormmaterUtil.dateformatToClient,
  dateformatToServer: DateFormmaterUtil.dateformatToServer,
  dateformatToClientInArray: DateFormmaterUtil.dateformatToClientInArray,
  dateformatToServerInArray: DateFormmaterUtil.dateformatToServerInArray,
  toStringByFormat: DateFormmaterUtil.toStringByFormat,

  isDate: DateUtil.isDate,
  toDate: DateUtil.toDate,
  compareTo: DateUtil.compareTo,
  getMonthOffset: DateUtil.getMonthOffset,
  getDayOffset: DateUtil.getDayOffset,
  getYearOffset: DateUtil.getYearOffset,
  addDay: DateUtil.addDay,
  addMonth: DateUtil.addMonth,
  addYear: DateUtil.addYear,
  getLastDateOfMonth: DateUtil.getLastDateOfMonth,
  isLeapYear: DateUtil.isLeapYear,
  now: DateUtil.now,
};
