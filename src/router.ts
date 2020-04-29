
import Router from 'koa-router'
import ServiceError from './utils/service-error'
import ErrorList from './utils/error_code'
import NetWorkController from './controller/network-contoller'


const router = new Router()
 
router.get('/test', async (ctx, next) => {
  const isFlag = false
  if (isFlag) {
    throw new ServiceError(ErrorList.ServerError);
  } else {
    console.log('http://localhost:7033/')
    ctx.body = {
      error_code: 0,
      data: {},
      message: 'test'
    }
  }
  await next()
})

// NetWork网络状况统计相关
router.post('/create_net', NetWorkController.createNetwork)
router.get('/create_net', () => {
  throw new ServiceError(ErrorList.MethodError)
})
router.get('/net_list', NetWorkController.getList)
router.get('/chart_net_list', NetWorkController.getListChart)

export default router