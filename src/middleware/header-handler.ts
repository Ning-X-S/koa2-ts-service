import * as Koa from 'koa'
export = function () {
  return async (ctx: Koa.Context, next: Koa.Next): (Promise<void>) => {
    const origin = ctx.header.origin || '*'
    ctx.set('Access-Control-Allow-Origin', origin)
    ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')
    ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type')

    // Content-Type表示具体请求中的媒体类型信息
    ctx.set('Content-Type', 'application/json;charset=utf-8')

    // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
    // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
    if (origin !== '*') {
      ctx.set('Access-Control-Allow-Credentials', 'true')
    }

    // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
    // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
    // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
    ctx.set('Access-Control-Max-Age', '300')

    await next()
  }
}