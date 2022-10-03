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
export
const dateType = Object.create(DateType)
export
const timeType = Object.create(DateType)

export
const stringType = Object.create(Type)

export
const otherType = Object.create(Type)
