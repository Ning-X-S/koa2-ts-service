'use strict';

class ServiceError extends Error {
  public message: string;
  public status?: number;
  public code?: number;
  public response?: object;
  public constructor(options: {
    message?: string;
    response?: object;
    status?: number;
    code?: number;
  }) {
    super()
    const { message, response = {}, status, code } = options;
    this.message = message || '请求失败';
    this.status = status || 200;
    this.code = code || -1;
    // 返回数据使用
    this.response = response;
  }
}

export default ServiceError
