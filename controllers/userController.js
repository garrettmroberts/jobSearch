const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.User.find({})
      .then(dbModel => {res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  },

  createUser: (req, res) => {
    console.log("CONTROLLER DATA: ", req.body)
    db.User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};