var express = require('express');
var router = express.Router();

// home
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', pageName: 'auth/login.ejs' });
});

// maker
router.get('/maker', function(req,res,next){
  const email = req.query.email
  if(!email){return res.redirect('/')}
  res.render('index',{title: 'Maker', pageName: 'pages/maker.ejs', email: email})
  console.log('라우터' +email);
});

// view
router.get('/view', function(req,res,next){
  const email = req.query.email
  if(!email){return res.redirect('/')}
  res.render('index',{title: 'Maker', pageName: 'pages/view.ejs', email: email})
});

module.exports = router;
