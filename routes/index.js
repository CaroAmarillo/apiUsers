/** Express router providing user related routes
 * @module routes/users
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require('express');

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace usersRouter
 */

const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

/** Array to storage all of our users */
let users = [];

/**
 * Route serving HomePage.
 * @name /
 * @function
 * @memberof module:routes/users~usersRouter
 * @inner
 * @param {string} path - index
 * @param {callback} middleware - Express middleware.
 */
// Home route
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/**
 * Route serving userForm to create user.
 * @name /user/form
 * @function
 * @memberof module:routes/users~usersRouter
 * @inner
 * @param {string} path - userForm
 * @param {callback} middleware - Express middleware.
 */

router.get('/user/form', function(req, res, next) {
  res.render('userForm', { title: 'Create user' });
});

/**
 * Route pushing to users[] and render listUser.
 * @name /user
 * @function
 * @memberof module:routes/users~usersRouter
 * @inner
 * @param {string} path - user
 * @param {callback} middleware - Express middleware.
 */

router.post('/user', urlencodedParser, function(req, res, next) {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const phone = req.body.phone;
  const email = req.body.email;

  const userData = {
    name: name,
    lastname: lastname,
    phone: phone,
    email: email
  };

  //Validation
  /**
   * Regex for Phone
   * @const
   */
  const regexPhone = new RegExp(/^[0-9]{10}$/);
  /**
   * Regex for Email
   * @const
   */
  const regexEmail = new RegExp(/^([a-z\d\._ ]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/);

  if (name.length <= 30 && lastname.length <= 30 && regexEmail.test(email) && regexPhone.test(phone)) {
    users.push(userData);
    console.log(users);
  } else {
    console.log('user invalid');
  }

  console.log('POST ->', req.body);
  console.log('POST ->', users);
  res.redirect('/user/list');
});

// User list route
/**
 * Route to list all users.
 * @name /user/list
 * @function
 * @memberof module:routes/users~usersRouter
 * @inner
 * @param {string} path - user/list
 * @param {callback} middleware - Express middleware.
 */

router.get('/user/list', function(req, res, next) {
  res.render('userList', {
    user: users,
    title: 'List'
  });
});

// Go to ping and render Pong =P
/**
 * Route to render the string pong.
 * @name /ping
 * @function
 * @memberof module:routes/users~usersRouter
 * @inner
 * @param {string} path - ping
 * @param {callback} middleware - Express middleware.
 */
router.get('/ping', function(req, res, next) {
  res.render('ping', {
    title: 'Pong',
    pong: 'pong'
  });
});

// Delete user
router.delete('/delete:id', function(req, res, next) {
  users = users.filter(function(todo) {
    return todo.user.replace(/ /g, '-') !== req.params.id;
  });
  res.render('userList', { user: users });
});

module.exports = router;
