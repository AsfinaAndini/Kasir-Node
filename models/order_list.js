'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_list extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.order_detail, {
        foreignKey: `order_id`, as: "order_detail"
    })
    }
  }
  order_list.init({
    nama_customer: DataTypes.STRING,
    nomor_meja: DataTypes.STRING,
    order_date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'order_list',
  });
  return order_list;
};