var MongoClient = require('mongodb').MongoClient;
var express = require('express');
 var router = express.Router();
var url = "mongodb://localhost:27017/";
var multer=require('multer');

 
var upload = multer({ dest: 'dist/uploads/'});

let response = {
     status : 200,
     message : null,
     data : null
 }

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6dHJ1ZX0.iy8az1ZDe-_hS8GLDKsQKgPHvWpHl0zkQBqy1QIPOkA';

  router.post('/authenticate',(req,res)=>{

    if("gpk@comparelaptop.in"==req.body.email&&"iloveu"==req.body.password){
      response.data=token;
      res.json(response);
    }
  

});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var  dbo = db.db("Laptops");

  

  router.get('/retrieve',(req,res)=>{
    
  dbo.collection("Apple").find({}).toArray(function(err, laptops) {
    if (err) throw err;
    response.data = laptops;
    
    res.json(response);
  });
});


  router.get('/productInfo/:productbrand/:productname',(req,res)=>{
  
    var query={name:req.params.productname};
    console.log(query);
    var brand=req.params.productbrand;
    console.log(brand);
    dbo.collection(brand).find(query).toArray(function(err, laptops) {
    if (err) throw err;
    response.data = laptops;
    res.json(response);
    
      });

     
});

  
  router.get('/brandproducts/:item',(req,res)=>{
  
    var name =req.params.item;
  dbo.collection(name).find({}).toArray(function(err, laptops) {
    if (err) throw err;
    response.data = laptops;
    
    res.json(response);
  });
});

  router.get('/collections',(req,res)=>{
    
  dbo.listCollections().toArray((function(err, brands) {
    if (err) throw err;
    response.data = brands;
    res.json(response);
  }));
});

  router.post('/insert',upload.single('image'),(req,res)=>{
  
  var myobj = { 
                brand:req.body.brand,
                name:req.body.name,
                price:req.body.price,
                asin:req.body.asin,
                flip:req.body.flip,
                image: req.file.filename,
                description:req.body.description,
              };

    
  dbo.collection(myobj.brand).insertOne(myobj, function(err, res) {
    if (err) throw err;
    
    
  });

  });
  
router.get('/addproduct/:item',(req,res)=>{
  
  
  var myobj = { 
                brand:req.params.item.brand,
                name:req.params.item.title,
                price:req.params.item.price,
                asin:req.params.item.asin,
                os:req.params.item.os,
                pageURL: req.params.item.pageURL,
                features:req.params.item.features,
              };

    console.log(myobj.brand);
 dbo.collection(myobj.brand).insertOne(myobj, function(err, res) {
   if (err) throw err;
    
    
  });

  response.message="1 document inserted";
  res.send(response.message);
  });



    router.get('/deleteproduct/:productid',(req,res)=>{

    
    dbo.collection("Dell").deleteOne({"name":req.params.productid}, function(err, obj) {
        if (err) throw err;
        
    response.message="1 document deleted";
    res.send(response);
        
    });
    });


});

module.exports = router;