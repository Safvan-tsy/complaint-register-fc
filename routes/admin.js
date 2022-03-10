var express = require('express');
var router = express.Router();
const adminHelper= require('../helpers/admin-helper')


const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next()
  } else
    res.render('admin/admin-login')

}
 
router.get('/home', verifyLogin, function(req, res, next) {
  adminHelper.getAllComplaints().then((complaints)=>{
    res.render('admin/admin-home',{complaints});
  })
  //res.render('admin/admin-home')
  
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('home')
  } else
    res.render('admin/admin-login', { loginErr: req.session.loginErr })
  req.session.loginErr = false
})

router.post('/login', (req, res) => {
  adminHelper.doLogin(req.body).then((response) => {
    if (response.status) {                            //session 
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('home')
    }
    else {
      req.session.loginErr = "Invalid Username or Access code"
      res.redirect('login')
    }
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

router.post('/send',(req,res)=>{
  adminHelper.sendResponse(req.query.id,req.body).then(()=>{
    res.redirect('home')
  })
})

router.post('/submit',(req,res)=>{
  if(req.body.department =="show all"){
    adminHelper.getAllComplaints().then((complaints)=>{
      res.render('admin/admin-home',{complaints});
    })    
  }
  else{
    adminHelper.getComplaint(req.body).then((complaints)=>{
      res.render('admin/admin-home',{complaints})
    })
  }
  
})



module.exports = router;