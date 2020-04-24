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

export default {
  NotError,
  ServerError,
  NulError
}