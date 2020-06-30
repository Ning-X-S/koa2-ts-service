import * as Koa from 'koa'
import NetWorkService from '../service/network-service'

abstract class NetWorkContollerAbstract {
  public name = '1';
  public constructor() {
    console.log('init-------abstract')
  }
  public abstract createNetwork(ctx: Koa.ParameterizedContext, next: Koa.Next): void;
  public abstract getList(ctx: Koa.Context, next: Koa.Next): void;
  public abstract getListChart(ctx: Koa.Context, next: Koa.Next): void;
}

class NetWorkContoller extends NetWorkContollerAbstract {
  public constructor () {
    super()
  }
  // public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
  // private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
  // protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
  /**
   * name: createNetwork
   * @param { ctx } Koa.ParameterizedContext Koa.Context extends Koa.ParameterizedContext
   * @param { next } Koa.Next
   */
  public async createNetwork(ctx: Koa.ParameterizedContext, next: Koa.Next): Promise<void> {
    const res: object = await NetWorkService.createNetwork(ctx, next)
    ctx.body = res
  }
  /**
   * name: getList
   * @param { ctx } Koa.Context Koa.Context extends Koa.ParameterizedContext
   * @param { next } Koa.Next
   */
  public async getList(ctx: Koa.Context, next: Koa.Next): Promise<void> {
    const res: object = await NetWorkService.getList(ctx, next)
    ctx.body = res
  }
  /**
   * name: getListChart
   * @param { ctx } Koa.Context Koa.Context extends Koa.ParameterizedContext
   * @param { next } Koa.Next
   */
  public async getListChart(ctx: Koa.Context, next: Koa.Next): Promise<void> {
    const res: object = await NetWorkService.getListChart(ctx, next)
    ctx.body = res
  }
}

export default new NetWorkContoller()
