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

/* GET form */
router.get('/new', function(req, res, next) {
  res.render('form');
});

/* POST toilet data */
router.post('/add', function(req, res, next) {
  const toilet = {
    city: req.body.city
  }

  db.get('toilets')
  .push(toilet)
  .write()

  const all = db.get('posts')
  .find()
  .value()
  res.json(toilet);
});

/* GET all */
router.get('/all', function(req, res, next) {
  const all = db.get('toilets')
  .value()
  console.log(db.get('toilets').value())
  res.json(all)
});

module.exports = router;
