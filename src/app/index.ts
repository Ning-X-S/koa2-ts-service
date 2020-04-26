import Koa from 'koa'
import koaBody from 'koa-body'
import router from '../router'
import headerHandler from '../middleware/header-handler'
import errorCollector from '../middleware/error-collector'
import globalConfig from '../middleware/global-injector'
import params from '../middleware/params'


const app = new Koa()

app
  .use(headerHandler())
  .use(errorCollector())
  .use(globalConfig.globalConfigInjector())
  .use(koaBody())
  .use(params())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async (ctx: Koa.Context, next: Koa.Next) => {
    try {
      await next()
      if (ctx.status === 404) {
        ctx.body = '404'
      }
    } catch (err) {
      // handle error
    }
  })
app.listen(7033)