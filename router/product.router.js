const router = require("express").Router();
const controller = require("../controller/product.controller");
const { product } = require("../middleware/joiValidator");
const { validateBody, validateToken } = require("../middleware/validator");

router.post(
  "/add",
  validateToken(),
  validateBody(product.body.add),
  controller.add
);

router.get("/", controller.all);

router.get("/get/:id", controller.getById);

router.delete("/delete/:id", controller.drop);

router.patch("/update/:id", controller.update);

module.exports = router;
