import formatDate from '@ppzp/stupid/format-date'
import { dateTimeMsType1, dateTimeMsType2, dateTimeMsType3, dateTimeType, dateType, timeType } from './type'

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
    case dateTimeMsType1:
      return result.slice(0, 21)
    case dateTimeMsType2:
      return result.slice(0, 22)
    case dateTimeMsType3:
      return result.slice(0, 23)
    case timeType:
      return result.slice(11, 19)
    default:
      console.error('未识别的日期类型', ppzType)
      return result
  }
}