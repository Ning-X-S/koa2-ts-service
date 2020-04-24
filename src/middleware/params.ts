'use strict';
import * as Koa from "koa"


// 将 ctx.request.body 和 ctx.request.query 统一到 ctx.params
export = () => {
  return async function paramHandler(ctx: Koa.Context, next: Koa.Next): (Promise<void>) {
    // GET 请求以 ctx.request.query 的字段为主，其余以 ctx.request.body 为主
    if (/GET/i.test(ctx.request.method)) {
      ctx.params = Object.assign({}, ctx.request.body, ctx.request.query);
    } else {
      ctx.params = Object.assign({}, ctx.request.query, ctx.request.body);
    }
    await next();
  };
};
