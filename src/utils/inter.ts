// 错误码接口
export interface ErrorInter {
  message: string;
  code: number;
  status: number;
  response: object;
}

// 返回数据接口
export interface ResponseInter {
  readonly error_code: number;
  readonly message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly data: any;
}

// NetWork-查询结果item接口
export interface NetWorkInter {
  id?: number;
  fluctua_num: number;
  machine_name?: string;
  time_interval?: number;
  record_start_time: Date;
  record_end_time?: Date;
}

// 图表数组接口
export interface ChartItemInter {
  start_time: string;
  end_time: string;
  machine_name: string;
  fluctua_num: number;
  [key: string]: string | number;
}