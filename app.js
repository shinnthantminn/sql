require("dotenv").config();
require("./model/modelConnection");
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(fileUpload());

const productRouter = require("./router/product.router");
const userRouter = require("./router/user.router");

app.use("/api/v1/product", productRouter);
app.use("/api/v1/user", userRouter);

app.use((error, req, res, next) => {
  res.status(500).json({
    con: false,
    msg: error.message,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server was running in http://localhost:${process.env.PORT} `);
});
