interface ErrorInter {
  message: string;
  code: number;
  status: number;
  response: object;
}

const NotError: ErrorInter = {
  message: '错误',
  code:  -4000404,
  response: {},
  status: 404
}

const ServerError: ErrorInter = {
  message: '错误',
  code:  -4000503,
  response: {},
  status: 503
}

const NulError: ErrorInter = {
  message: '参数不能为空',
  code:  4000562,
  response: {},
  status: 200
}

const MethodError: ErrorInter = {
  message: '不支持的请求类型',
  code:  4000262,
  response: {},
  status: 200
}

export default {
  NotError,
  ServerError,
  NulError,
  MethodError
}