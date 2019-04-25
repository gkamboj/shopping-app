const userRoute = require('express').Router();
const Users = require('../db').Users;

userRoute.get('/', async (req, res) => {
  const users = await Users.findAll()
  if (users.length == 0) {
    res.send({ message: 'No user registered', success: false })
  } else {
    res.send({ data: users, success: true })
  }
})

userRoute.post('/', async (req, res) => {
  try {
    name = req.body.name;
    email = req.body.email;
    const user = Users.findOne({
      where: {
        email: email
      }
    }).then((data) => {
      if (name == '' || name == null) {
        res.send({
          success: false,
          message: "Username can't be empty"
        })
      }
      else if (email == '' || email == null) {
        res.send({
          success: false,
          message: "Email can't be empty"
        })
      } else if (data != null) {
        if (data.dataValues.userName != name) {
          res.send({
            success: false,
            message: "username and email doesn't match.\nIf you want to login, please enter correct username.\nIf uou want to create new account, please enter new email"
          })
        } else {
          res.send({
            success: true,
            message: "Login successful",
            user: data.dataValues
          })
        }
      } else {
        const result = Users.create({
          userName: name,
          email: email
        })
        res.status(200);
        res.send({
          success: true,
          message: "New account created",
          user: {
            email: email,
            userName: name
          }
        })
      }
    })
  } catch (e) {
    res.send({
      success: false,
      message: e.message
    })
  }
})

userRoute.delete('/', async (req, res) => {
  const record = await Users.destroy({
    where: {
      id: parseInt(req.body.id)
    }
  })
  if (record == 0) {
    res.send({
      success: false,
      message: "error while deleting user"
    })
  } else {
    res.send({
      success: true,
      message: "user deleted successfully"
    })
  }
})

module.exports = userRoute;