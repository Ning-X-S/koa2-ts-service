import * as Koa from 'koa'
import ServiceError from '../utils/service-error'
import { NetWork } from '../model'
import ErrorList from '../utils/error_code'
import { Op } from 'sequelize'

export interface ReturnData {
  readonly error_code: number;
  readonly message: string;
  readonly data: object;
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function createNetwork(ctx: Koa.Context, next: Koa.Next): Promise<object> {
  try {
    const { fluctua_num = 0, machine_name = "", time_interval = 60, record_start_time = '1000-01-01 00:00:00', record_end_time = '1000-01-01 00:00:00'  } = ctx.params
    if (!machine_name) {
      throw new ServiceError({...ErrorList.NulError, ...{ message: '机器名称不能为空' }})
    }
    const res = await NetWork.create({
      fluctua_num,
      machine_name,
      time_interval,
      record_start_time,
      record_end_time
    })
    if (res !== null) {
      const successData: ReturnData = {
        error_code: 0,
        data: res.get(),
        message: '创建成功'
      }
      return successData
    } else {
      const failData: ReturnData = {
        error_code: 0,
        message: '创建失败',
        data: {}
      }
      return failData
    }
  } catch (err) {
    throw new ServiceError({ message: err.message, code: err.code })
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getList(ctx: Koa.Context, next: Koa.Next): Promise<object> {
  try {
    const { id = '', fluctua_num = 0, machine_name = "", time_interval = 60, record_start_time = '', record_end_time = '', p = 1, size: limit  = 20 } = ctx.params
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queryObj: any = {
      attributes: [ 'id', 'fluctua_num', 'machine_name', 'time_interval', 'record_start_time', 'record_end_time', 'created_at', 'updated_at'],
      offset: limit * (p - 1),
      limit: parseInt(limit),
      where: {
        time_interval: time_interval
      },
      order: [
        // 根据时间倒叙查询
        ['record_start_time', 'desc']
      ]
    };
    if (id) {
      queryObj.where.id = id.split(',');
    }
    if (fluctua_num) {
      queryObj.where.fluctua_num = fluctua_num;
    }
    if (machine_name) {
      queryObj.where.machine_name = machine_name;
    }
    if (record_start_time) {
      queryObj.where.record_start_time = {
        // 时间段查询
        // [Op.gte]: record_start_time,
        // [Op.lte]: record_end_time,
        [Op.between]: [record_start_time, record_end_time]
      }
    }
    const res = await NetWork.findAndCountAll(queryObj)
    if (res !== null) {
      const list = res.rows.map((item) => {
        return item.get()
      })
      const successData: ReturnData = {
        error_code: 0,
        data: {
          list,
          total: res.count,
          p: p,
          size: limit
        },
        message: '获取列表成功'
      }
      return successData
    } else {
      const failData: ReturnData = {
        error_code: 0,
        message: '获取列表失败',
        data: {}
      }
      return failData
    }
  } catch (err) {
    throw new ServiceError({ message: err.message, code: err.code })
  }
}

export default {
  createNetwork,
  getList
}
