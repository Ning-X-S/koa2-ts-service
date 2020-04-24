import { Sequelize, Options } from "sequelize"
import config = require('../config/index')
const mysql = config.mysql

const sequelizeConfig: Options = {
  dialect: 'mysql',
  host: mysql.host,
  port: mysql.port,
  pool: {
    max: 100, // 最大值
    idle: 5000, // 闲时超时
    acquire: 10000
  },
  dialectOptions: {
    dateStrings: true, // 日期字符串（配合类型转换使用）
    typeCast: true // 类型转换
  },
  timezone: '+08:00'
}

export const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, sequelizeConfig)
export const dataTypes = Sequelize