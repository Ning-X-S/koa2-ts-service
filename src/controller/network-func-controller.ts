import * as Koa from 'koa'
import NetWorkService from '../service/network-service'

async function createNetwork(ctx: Koa.Context, next: Koa.Next): Promise<void> {
  const res: object = await NetWorkService.createNetwork(ctx, next)
  ctx.body = res
}

async function getList(ctx: Koa.Context, next: Koa.Next): Promise<void> {
  const res: object = await NetWorkService.getList(ctx, next)
  ctx.body = res
}

async function getListChart(ctx: Koa.Context, next: Koa.Next): Promise<void> {
  const res: object = await NetWorkService.getListChart(ctx, next)
  ctx.body = res
}

export default {
  createNetwork,
  getList,
  getListChart
}