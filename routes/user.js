var express = require('express');
var router = express.Router();
const userHelper= require('../helpers/user-helper')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user/home')
});

router.get('/complaint',(req,res)=>{ 
  res.render('user/complaint')
})
router.get('/check',(req,res)=>{ 
  res.render('user/status')
})

router.post('/submit',(req,res)=>{
  userHelper.doSubmit(req.body).then((response)=>{             //submit complaint
    console.log("response")
    res.redirect('/')
  })
})

router.post('/check',(req,res)=>{
  userHelper.doCheck(req.body).then((response)=>{
    if (response.status){
    //console.log(response)
    res.render('user/view-history',{data:response.user})
  }
  else{
    let err=true
    res.render('user/status',{err})
  }
  })
})



module.exports = router;
