var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/find', function (req, res) {
  res.send('find')
});

router.post('/post', function (req, res) {
  res.send('Post')
});

router.put('/update', function (req, res) {
  res.send('update')
});

router.delete('/delete', function (req, res) {
  res.send('delete')
});




module.exports = router;
