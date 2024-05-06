'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.order_detail, {
        foreignKey: `food_id`, as: "order_detail"
    })
  }
}
  food.init({
    nama: DataTypes.STRING,
    spicy_level: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    gambar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'food',
  });
  return food;
};