var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

mongoose.set('strictQuery', false);
//   name: {         
//     type: String,
//   },
//   numberStudent: {
//     type: Number,
//   },
// });

// let Lop = mongoose.model('Lop', lopSchema);

// /* GET home page. */    
// router.get('/', function(req, res, next) {  
//   Lop.find({}, (error, data) =>{
//     console.log('danh sach lop', data)
//     res.render('index', {Lop:data})
//   })
// });

// module.exports = router;
mongoose.connect('mongodb://127.0.0.1:27017/Node2', {
  useNewUrlParser: true, 
   useUnifiedTopology: true 
});

//SCHEMA
let lopSchema = mongoose.Schema({
  name : {
    type: String,
  },
  numberStudent: {
    type: Number,
  },
  },{ collection :"StudyNode2"  
});


let Lop = mongoose.model('Lop', lopSchema);
 router.get('/', function(req, res, next) {  
   Lop.find({}, (error, data) =>{
     console.log('danh sach lop', data)
     res.render('index', {lops:data})
   })
 });

 router.get('/form-add', function(req, res, next) {  
  res.render('form-add', {})
 })
 router.post('/add', function(req, res, next) {
  Lop.create(req.body)
  res.redirect('/')
 })
 router.get('/form-update/:id', function(req, res, next) {
  Lop.findById(req.params.id,(error, data) =>{
    res.render('form-update', {lop:data});
  })
 })

 router.post('/update', function(req, res, next){
  Lop.findByIdAndUpdate(req.body.id, req.body,(error, data)=>{
    res.redirect('/')
  })
 })
 router.get('/form-delete/:id', function(req, res, next) {
  Lop.findByIdAndDelete(req.params.id,(error, data) =>{ 
    res.redirect('/')
  })
 })

//MODEL

module.exports = router;