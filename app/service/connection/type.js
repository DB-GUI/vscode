export
const Type = {
  is(target) {
    return target.isPrototypeOf(this)
  },
  isnot(target) {
    return !this.is(target)
  }
}

export
const DateType = Object.create(Type)

export
const DateTimeMsType = Object.create(DateType)
export
const dateTimeMsType1 = Object.create(DateType)
export
const dateTimeMsType2 = Object.create(DateType)
export
const dateTimeMsType3 = Object.create(DateType) // js 的 Date 类型就支持到 3
export
const dateTimeType = Object.create(DateType)
export // 专用于 mssql，精确到分钟，参考：https://learn.microsoft.com/en-us/sql/t-sql/data-types/smalldatetime-transact-sql?view=sql-server-ver16
const smallDateTimeType = Object.create(DateType)
export
const dateType = Object.create(DateType)

export
const TimeType = Object.create(DateType)
export
const timeType0 = Object.create(TimeType)
export
const timeType1 = Object.create(TimeType)
export
const timeType2 = Object.create(TimeType)
export
const timeType3 = Object.create(TimeType)

export
const stringType = Object.create(Type)

export
const otherType = Object.create(Type)
