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
const DateTimeType = Object.create(DateType)
export
const dateTimeType0 = Object.create(DateTimeType)
export
const dateTimeType1 = Object.create(DateTimeType)
export
const dateTimeType2 = Object.create(DateTimeType)
export
const dateTimeType3 = Object.create(DateTimeType) // js 的 Date 类型就支持到 3

export // 年月日时分 专用于 mssql，精确到分钟，参考：https://learn.microsoft.com/en-us/sql/t-sql/data-types/smalldatetime-transact-sql?view=sql-server-ver16
const smallDateTimeType = Object.create(DateType)

export // 年月日
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
