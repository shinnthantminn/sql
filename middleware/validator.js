const { fMsg } = require("terry-helper");
const { compare, encode, token, verify } = require("../middleware/helper");
const userDB = require("../model/user.model");

const objectConvector = (x, name) => {
  const data = { ...x };
  delete data[name];
  return data;
};

module.exports = {
  validateBody: (schema) => {
    return async (req, res, next) => {
      const result = await schema.validate(req.body);
      if (result.error) {
        fMsg(res, false, 422, result.error.details[0].message);
      } else next();
    };
  },
  validateUnique: (db, ...name) => {
    return async (req, res, next) => {
      const num = [];
      for (const x of name) {
        const obj = {};
        obj[x] = req.body[x];
        const finder = await db.findOne({ where: obj });
        console.log(finder);
        num.push(x);
        if (finder) {
          console.log("hello", x);
          next(new Error(`this ${x} was existing in our server`));
        } else if (num.length === name.length) {
          next();
        }
      }
    };
  },
  validateToken: () => {
    return async (req, res, next) => {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
          try {
            const decode = verify(token);
            const finder = await userDB.findOne({ where: { id: decode.id } });
            if (finder) {
              const user = objectConvector(finder.dataValues, "password");
              req.user = user;
              next();
            } else {
              fMsg(res, false, 498, "Tokenization Error");
            }
          } catch (e) {
            fMsg(res, false, 401, e.message);
          }
        }
      } else {
        fMsg(res, false, 498, "Tokenization Error");
      }
    };
  },
};
