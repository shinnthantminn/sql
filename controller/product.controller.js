const DB = require("../model/product.model");
const { fMsg } = require("terry-helper");
const userDB = require("../model/user.model");

const add = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    const Product = await DB.create(req.body);
    fMsg(res, true, 200, "Add complete", Product);
  } catch (e) {
    next(new Error(e.message));
  }
};

const all = async (req, res, next) => {
  try {
    const Product = await DB.findAll({include:"user"});
    fMsg(res, true, 200, "All Product complete", Product);
  } catch (e) {
    next(new Error(e.message));
  }
};

const getById = async (req, res, next) => {
  try {
    const Product = await DB.findOne({
      where: {
        id: req.params.id,
      },
    });
    fMsg(res, true, 200, "get by id", Product);
  } catch (e) {
    next(new Error(e.message));
  }
};

const drop = async (req, res, next) => {
  try {
    const Product = await DB.destroy({
      where: {
        id: req.params.id,
      },
    });
    fMsg(res, true, 204, "delete complete");
  } catch (e) {
    next(new Error(e.message));
  }
};

const update = async (req, res, next) => {
  try {
    await DB.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const Product = await DB.findOne({
      where: {
        id: req.params.id,
      },
    });

    fMsg(res, true, 200, "update complete", Product);
  } catch (e) {
    next(new Error(e.message));
  }
};

module.exports = {
  add,
  all,
  getById,
  drop,
  update,
};
