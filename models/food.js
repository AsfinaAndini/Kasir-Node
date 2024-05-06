'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class food extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.order_detail, {
        foreignKey: `food_id`, as: "order_detail"
    })
  }
}
  food.init({
    name: DataTypes.STRING,
    spicy_level: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'food',
  });
  return food;
};