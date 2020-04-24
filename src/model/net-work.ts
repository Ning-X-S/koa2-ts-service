
import { DataTypes, Model } from 'sequelize'
import { sequelize } from './config'


class NetWork extends Model {
  id?: number;
  fluctua_num?: number;
  machine_name?: string;
  time_interval?: number;
  record_start_time?: Date;
  record_end_time?: Date;
  created_at?: Date;
  updated_at?: Date;
}

NetWork.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fluctua_num: DataTypes.INTEGER,
  machine_name: DataTypes.STRING,
  time_interval: DataTypes.INTEGER,
  record_start_time: DataTypes.DATE,
  record_end_time: DataTypes.DATE,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, {
  sequelize,
  tableName: 't_net_work',
  timestamps: false
})

export default NetWork
