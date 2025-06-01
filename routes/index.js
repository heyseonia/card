var express = require('express');
var router = express.Router();

// home
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', pageName: 'auth/login.ejs' });
});

// list
router.get('/list', function(req,res,next){
  const userId = req.query.id
  if(!userId){return res.redirect('/')}
  res.render('index',{title: 'list', pageName: 'pages/list.ejs', userId: userId})
});

// maker
router.get('/maker', function(req,res,next){
  const userId = req.query.id
  if(!userId){return res.redirect('/')}
  res.render('index',{title: 'Maker', pageName: 'pages/maker.ejs', userId: userId})
});

// view
router.get('/view', function(req,res,next){
  const userId = req.query.id
  if(!userId){return res.redirect('/')}
  res.render('index',{title: 'View', pageName: 'pages/view.ejs', userId: userId})
});

module.exports = router;
