const router = require("express").Router();
const { user } = require("../middleware/joiValidator");
const { validateBody, validateUnique } = require("../middleware/validator");
const controller = require("../controller/user.controller");
const userDB = require("../model/user.model");

router.post(
  "/register",
  validateBody(user.body),
  validateUnique(userDB, "email"),
  controller.register
);

router.post("/", validateBody(user.login), controller.login);

module.exports = router;
