/**
 * classnames
 * 类似这个 https://github.com/JedWatson/classnames#readme
 */
export
const cns = (...args: any[]) => //  
  args
    .filter(item => item)
    .map(item =>
      typeof item == 'string'
        ? item
        : Object.entries(item)
          .filter(([key, value]) => value)
          .map(([key, value]) => value)
          .join(' ')
    )
    .join(' ')
