'use strict';
import * as Koa from "koa"

export = function () {
  return async (ctx: Koa.Context, next: Koa.Next ): (Promise<void>) => {
    try {
      await next()
    } catch (err) {
      // Raven.captureException(err, {
      //   level: env === 'development' ? 'warning' : 'error'
      // })
      const { message, code, status } = err
      ctx.status = status || 400
      ctx.body = {
        'error_code': code || 4000004,
        'message': message || '请求出错',
        'data': {}
      }
    }
  }
}
