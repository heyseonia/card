var express = require('express');
var router = express.Router();

// home
router.get('/', function(req, res, next) {
  const userId = req.query.id
  console.log(userId);
  if(!userId){
    return res.render('index', { title: 'Express', pageName: 'auth/login.ejs'});
  }else{
    res.render('index', { title: 'Express', pageName: 'pages/list.ejs'});
  }
});

// list
router.get('/list', function(req,res,next){
  res.render('index',{title: 'list', pageName: 'pages/list.ejs'})
});

// maker
router.get('/maker', function(req,res,next){
  res.render('index',{title: 'Maker', pageName: 'pages/maker.ejs'})
});

// view
router.get('/view', function(req,res,next){
  res.render('index',{title: 'View', pageName: 'pages/view.ejs'})
});

module.exports = router;
