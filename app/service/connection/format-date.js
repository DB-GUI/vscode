import formatDate from '@ppzp/stupid/format-date'
import {
  dateTimeType, dateTimeMsType1, dateTimeMsType2, dateTimeMsType3,
  dateType, smallDateTimeType,
  timeType0, timeType1, timeType2, timeType3
} from './type'

/**
 * 格式化 Date 类型
 * @param {Date} date
 * @returns {string}
 */
export default
function(date, ppzType) {
  const result = formatDate(date, true)
  switch(ppzType) {
    case dateType:
      return result.slice(0, 10)
    case dateTimeType:
      return result.slice(0, 19)
    case smallDateTimeType:
      return result.slice(0, 16)
    case dateTimeMsType1:
      return result.slice(0, 21)
    case dateTimeMsType2:
      return result.slice(0, 22)
    case dateTimeMsType3:
      return result.slice(0, 23)
    case timeType0:
      return result.slice(11, 19)
    case timeType1:
      return result.slice(11, 21)
    case timeType2:
      return result.slice(11, 22)
    case timeType3:
      return result.slice(11, 23)
    default:
      console.error('未识别的日期类型', ppzType)
      return result
  }
}