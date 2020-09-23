var express = require('express');
var router = express.Router();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)

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

module.exports = router;
