import * as Koa from 'koa'
import ServiceError from '../utils/service-error'
import { NetWork } from '../model'
import ErrorList from '../utils/error_code'
import { Op } from 'sequelize'
import { formatTime, machineList } from '../utils/util'
import { NetWorkInter, ChartItemInter, ResponseInter } from '../utils/inter'


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
      const successData: ResponseInter = {
        error_code: 0,
        data: res.get(),
        message: '创建成功'
      }
      return successData
    } else {
      const failData: ResponseInter = {
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
    const { id = '', fluctua_num = 0, machine_name = "", time_interval = 60, record_start_time = '', record_end_time = '', p = 1, size: limit  = 0 } = ctx.params
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queryObj: any = {
      attributes: [ 'id', 'fluctua_num', 'machine_name', 'time_interval', 'record_start_time', 'record_end_time', 'created_at', 'updated_at'],
      where: {
        time_interval: time_interval
      },
      order: [
        // 根据时间倒叙查询
        ['record_start_time', 'desc']
      ]
    };
    // 不传size默认取该时间段全部数据
    if (limit > 10) {
      queryObj.offset = limit * (p - 1)
      queryObj.limit = parseInt(limit)
    } else {
      if (!record_start_time) {
        throw new ServiceError({...ErrorList.NulError, ...{ message: '至少输入时间范围' }})
      }
      if (!record_end_time) {
        throw new ServiceError({...ErrorList.NulError, ...{ message: '至少输入时间范围' }})
      }
    }
    if (id) {
      queryObj.where.id = id.split(',');
    }
    if (fluctua_num) {
      queryObj.where.fluctua_num = {
        [Op.gte]: fluctua_num
      };
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
      const successData: ResponseInter = {
        error_code: 0,
        data: {
          list,
          total: res.count
        },
        message: '获取列表成功'
      }
      if (limit > 10) {
        successData.data.p = p
        successData.data.size = limit
      }
      return successData
    } else {
      const failData: ResponseInter = {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getListChart(ctx: Koa.Context, next: Koa.Next): Promise<object> {
  try {
    const { fluctua_num = 1, machine_type = "1", time_interval = 60, record_start_time = '', record_end_time = '' } = ctx.params
    const machine_name: string = machineList[machine_type]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queryObj: any = {
      attributes: [ 'fluctua_num', 'machine_name', 'time_interval', 'record_start_time', 'record_end_time'],
      where: {
        time_interval: time_interval
      },
      order: [
        // 根据时间倒叙查询
        // ['record_start_time', 'desc']
      ]
    };
    // 不传size默认取该时间段全部数据
    if (!record_start_time) {
      throw new ServiceError({...ErrorList.NulError, ...{ message: '缺少时间范围，查询失败' }})
    }
    if (!record_end_time) {
      throw new ServiceError({...ErrorList.NulError, ...{ message: '缺少时间范围，查询失败' }})
    }
    if (fluctua_num) {
      queryObj.where.fluctua_num = {
        [Op.gte]: fluctua_num
      };
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
    const list = formatTime(record_start_time, record_end_time, machine_name)
    const res = await NetWork.findAndCountAll(queryObj)
    if (res !== null) {
      res.rows.forEach((item) => {
        const obj = item.get() as NetWorkInter
        const itemTimeStr = new Date(obj.record_start_time)
        for (let i = 0; i < list.length; i++) {
          const objList = list[i] as ChartItemInter
          if (itemTimeStr >= new Date(objList.start_time) && itemTimeStr <= new Date(objList.end_time)) {
            objList.fluctua_num += obj.fluctua_num
            return
          }
          list[i] = objList
        }
      })
      const successData: ResponseInter = {
        error_code: 0,
        data: {
          list,
          total: list.length
        },
        message: '获取列表成功'
      }
      return successData
    } else {
      const failData: ResponseInter = {
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
  getList,
  getListChart
}
