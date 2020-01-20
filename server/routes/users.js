var express = require('express');
var router = express.Router();
const { login, users, newUser } = require('../db/api/login');
const crypto = require('crypto')

/* GET users listing. */
router.get ('/', function(req, res, next) {
      users()
      .then(users => res.status(200).json({users}))
      .catch(error => res.status(500).json({error: error.message}))
  })  

router.post('/login', function (req, res, next) {

  const token = crypto.pbkdf2Sync(req.body.password, 'realtorrocks', 100000, 64, 'sha512');
  const userPasswordHashed = token.toString('base64');
  console.log('very important',req.body.email, req.body.password)
  login(req.body.email, userPasswordHashed)
    .then((user) => {
      // console.log('user: ', user);
      res.cookie("user", JSON.stringify(user), { maxAge: 1000 * 60 * 60 * 24 });
      res.status(200).json(user)
    })
    .catch(error => res.status(500).json({ error: error.message }))
})

router.post('/signup', async (req, res) => {
  const userDetails = req.body;
  console.log("userDetails", userDetails)
  userDetails.password = crypto.pbkdf2Sync(req.body.password, 'realtorrocks', 100000, 64, 'sha512');
  
  let results, user;
  try {
    results = await newUser(userDetails);
    user = await login(userDetails.email, userDetails.password);
    user = {...user[0]};
    console.log('user',user);
    if (user){
      res.cookie("user", user, { maxAge: 1000 * 60 * 60 * 24}).status(200).send(user);
    } else{
      res.status(401).json({ status: 401, message: "Invalid user. Check your db"})
    }
  } catch (error) {
    res.status(409).json({ status: 409, message: error });
    console.log('Failed: ', error)
  }
})

// router.post('/login', function (req, res, next){
//   // const userDetails = req.body;
//   console.log('req.body', req.body)
//   console.log('userDetails', req.body.email)
//   // userDetails.password = crypto.pbkdf2Sync(req.body.password, 'realtorrocks', 100000, 64, 'sha512');
  
//   let results, user;
//   login(req.body.email, req.body.password)
//   .then(user => res.status(200).json(user))
//   .catch(error => res.status(500).json({ error: error.message}))
// })
module.exports = router;
