const helper = require("../middleware/helper");
const { fMsg } = require("terry-helper");
const DB = require("../model/user.model");

const register = async (req, res, next) => {
  try {
    req.body.password = helper.encode(req.body.password);
    const user = await DB.create(req.body);
    fMsg(res, true, 201, "user resgister complete", user);
  } catch (e) {
    next(new Error(e));
  }
};

const login = async (req, res, next) => {
  try {
    const finder = await DB.findOne({ where: { email: req.body.email } });
    if (finder) {
      if (helper.compare(req.body.password, finder.password)) {
        console.log(finder.id);
        const tokenization = helper.token({ id: finder.id });
        const user = { ...finder.dataValues };
        delete user.password;
        user.token = tokenization;
        fMsg(res, true, 200, "login complete", user);
      } else {
        fMsg(res, false, 404, "email or password credential error");
      }
    } else {
      fMsg(res, false, 404, "email or password credential error");
    }
  } catch (e) {
    next(new Error(e));
  }
};

module.exports = {
  register,
  login,
};
