/** server 收到的原始数据 */
export
interface Received<Post> {
  /** 请求 id，用于标记请求和响应 */
  request_id: string
  /** 请求的 handler 的名字，类似于 http 请求中的 method + path（如 Get /user/123） */
  handler_key: string
  /** 传给 handler 的数据，类似于 http 请求体（body）中的 json 数据 */
  post: Post
}

/** server 响应的原始数据 */
export
interface Result<Data, Err_msg> {
  /** 请求 id */
  request_id: string
  /** 响应码：0 为成功，否则是失败 */
  code: number
  /** 正常响应的 data */
  data?: Data
  /** 异常响应的 msg，一般是字符串 */
  msg?: Err_msg
}

/** 处理请求时抛出的异常 */
export
class Error_handler<Err_msg> {
  constructor(
    public msg: Err_msg,
    public code: number = 999,
  ) {}
}
