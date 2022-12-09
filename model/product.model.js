const { DataTypes } = require("sequelize");
const model = require("./modelConnection");
// const userDB = require("./user.model");

const product = model.define(
  "product",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);

product
  .sync()
  .then((e) => {
    console.log("ok par");
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = product;
