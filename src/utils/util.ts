import { ChartItemInter } from './inter'

export const formatTime = function (start_time: string, end_time: string, machine_name: string): object[] {
  const result: object[] = []
  const start = new Date(start_time)
  const end = new Date(end_time)
  // 计算相差小时
  const diffHours: number = parseInt(((end.getTime()/ 1000 - start.getTime()/ 1000) / 60 / 60).toString() + 1)
  for (let i = 0; i < diffHours + 1 ; i++) {
    // const dayNum = parseInt(String(i / 24))
    const timeStr = new Date(start.getTime() + i  * 60 * 60 * 1000)
    const resultItem: ChartItemInter = {
      start_time: `${timeStr.getFullYear()}-${String(timeStr.getMonth() + 1).padStart(2, '0')}-${String(timeStr.getDate()).padStart(2, '0')} ${String(timeStr.getHours()).padStart(2, '0')}` + ':00:00',
      end_time: `${timeStr.getFullYear()}-${String(timeStr.getMonth() + 1).padStart(2, '0')}-${String(timeStr.getDate()).padStart(2, '0')} ${String(timeStr.getHours()).padStart(2, '0')}` + ':59:59',
      machine_name: machine_name,
      fluctua_num: 0
    }
    result.push(resultItem)
  }
  return result 
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const machineList: {[key: string]: string} = {
  '1': '测试店铺'
}