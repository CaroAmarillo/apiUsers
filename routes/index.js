const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended: false})
let users = [];

// Home
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    condition: true,
    anyArray: [1, 2, 3]
  });
});

// Create user
router.get('/user/form', function (req, res, next) {
  res.render('userForm')
})

// User list
router.get('/user/list', function (req, res, next) {

  res.render('userList', {user: users})

})

// Create user and list
router.post('/user/create', urlencodedParser, function (req, res, next) {
  let name = req.body.name;
  let lastname = req.body.lastname;
  let phone = req.body.phone;
  let email = req.body.email;

  let userData = {
    name: name,
    lastname: lastname,
    phone: phone,
    email: email
  }

  users.push(userData);
  console.log('POST ->', req.body);
  console.log('POST ->', users);
  res.render('userForm', {user: users});
})

// Go to ping and render Pong =P
router.get('/ping', function (req, res, next) {
  res.render('ping', {pong: 'pong'})
})

// Delete user
router.get('/delete', function (req, res, next) {

  users = users.filter(function (todo) {
    return todo
      .user
      .replace(/ /g, '-') !== req.params.user
  })
  console.log('DELETE', users);
  res.render(JSON.stringify(users));
})

module.exports = router;
