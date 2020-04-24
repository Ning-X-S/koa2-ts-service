// export = function (globalConfig = {}) {
//   return async (ctx: any, next: any) => {
//     // 注入 server.js 中定义的全局配置到 ctx.state 中
//     ctx.state = Object.assign(ctx, globalConfig)
//     await next()
//   }
// }‘
'use strict';
import * as Koa from 'koa'

export default {
  globalConfigInjector: function(globalConfig = {}) {
    return async (ctx: Koa.Context, next: Koa.Next): (Promise<void>) => {
      // 注入 server.js 中定义的全局配置到 ctx.state 中
      ctx.state = Object.assign(ctx, globalConfig)
      await next()
    }
  }
}
