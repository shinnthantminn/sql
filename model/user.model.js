const model = require("./modelConnection");
const { DataTypes } = require("sequelize");

const user = model.define(
  "user",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);

user
  .sync()
  .then((e) => {
    console.log("user table created");
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = user;
