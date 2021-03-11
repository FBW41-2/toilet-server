var express = require('express');
var router = express.Router();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const cors = require('cors')
 
const adapter = new FileSync('db.json')
const db = low(adapter)

const users = [{
  name: "Maxim",
  password: "1234"
},{
  name: "Flo",
  password: "1234"
}]

db.defaults({ toilets: [] })
  .write()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/table', function(req, res, next) {
  res.render('table');
});

/* GET form */
router.get('/new', function(req, res, next) {
  res.render('form');
});

/* POST toilet data */
router.post('/add', function(req, res, next) {
  const toilet = {
    city: req.body.city,
    zip: req.body.zip,
    street: req.body.street,
    streetnr: req.body.streetnr,
    name: req.body.name,
    'feat-mirror': req.body['feat-mirror'],
    'feat-papertowels': req.body['feat-papertowels'],
    'feat-perfume': req.body['feat-perfume'],
    'feat-access': req.body['feat-access'],
    'feat-soap': req.body['feat-soap'],
    'feat-baby': req.body['feat-baby'],
    stalls: req.body.stalls,
    rating: req.body.rating
  }

  db.get('toilets')
  .push(toilet)
  .write()

  const all = db.get('posts')
  .find()
  .value()
  res.redirect('https://need2pee.de');
});

/* GET all */
router.get('/all', function(req, res, next) {
  const all = db.get('toilets')
  .value()
  console.log(db.get('toilets').value())
  res.json(all)
});

/* POST Login test */
router.post('/login', (req, res) => {
  // find user
  const user = users.find(item => item.name == req.body.user)
  console.log("user", user)
  if(user && user.password === req.body.password){
    res.json({status: "success", name: user.name})
  } else {
    res.json({status: "error", message: "Wrong username or password"})
  }
})

module.exports = router;
