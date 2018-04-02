const express = require('express');
const codeforces = require('./routes/codeforces_scrapper');
const codechef = require('./routes/codechef_scrapper');

var app = express();

const port = process.env.PORT || 3000;

app.get('/',function(req,res){
  var username = req.query.handle;
  codeforces.codeforcesFunc(username,function(err,data){
    if(err){
      console.log(err);
      return err;
    }else{
      res.send(data);
    }
  });
});

app.get('/codechef',function(req,res){
  var username = req.query.handle;
  codechef.codechefFunc(username,function(err,data){
    if(err){
      console.log(err);
      return err;
    }else{
      res.send(data);
    }
  })
});


app.listen(port,function(){
  console.log("Running on port "+port);
});
