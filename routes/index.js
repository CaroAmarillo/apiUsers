var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    condition: true,
    anyArray: [1, 2, 3]
  });
});

let users = [];

router.get('/user/list', function (req, res, next) {
  console.log('GET ->', req.query);
  res.render('userForm', {queryString: req.query})
})

router.get('/user/form', function (req, res, next) {
  res.render('userForm')
})

router.post('/user/list', urlencodedParser, function (req, res, next) {
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
  res.render('userList', {user: users});
})

router.get('/ping', function (req, res, next) {
  res.render('ping', {pong: 'pong'})
})

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
