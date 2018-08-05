const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended: false})
let users = [];

// Home
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

// Create user
router.get('/user/form', function (req, res, next) {
  res.render('userForm', {title: 'UserForm'})
})

// User list
router.get('/user/list', function (req, res, next) {
  res.render('userList', {
    user: users,
    title: 'UserList'
  })
})

// Create user and list
router.post('/user', urlencodedParser, function (req, res, next) {
  let submitErrors;
  const name = req.body.name;
  const lastname = req.body.lastname;
  const phone = req.body.phone;
  const email = req.body.email;

  const userData = {
    name: name,
    lastname: lastname,
    phone: phone,
    email: email
  }

  //Validation
  const regex = new RegExp(/^([a-z\d\._ ]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/);

  if (name.length <= 30 && lastname.length <= 30 && regex.test(email)) {
    users.push(userData);
    //submitErrors = true
    console.log(users);
  } else {
    //submitErrors = false
    console.log('username invalid');
  }

  //users.push(userData);
  console.log('POST ->', req.body);
  console.log('POST ->', users);
  res.render('userForm', {
    user: users,
    errors: submitErrors
  });
})

// Go to ping and render Pong =P
router.get('/ping', function (req, res, next) {
  res.render('ping', {
    title: 'Pong',
    pong: 'pong'
  })
})

// Delete user
router.delete('/delete:id', function (req, res, next) {
  users = users.filter(function (todo) {
    return todo
      .user
      .replace(/ /g, '-') !== req.params.id
  })
  res.render('userList', {user: users})
})

module.exports = router;
