'use strict';

//just the essentials
var express = require('express');
var cors = require('cors');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var body = require('body-parser');


var app = express();
app.use(body.json());
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });
app.get("/upload", function(req, res){
  res.json({greetings: "Hello, API"});
});

//begin post
app.post('/upload', upload.single("upfile"), (req, res, next)=>{
  let obj = {
    "File Name": req.file.originalname,
    "File Type": req.file.mimetype,
    "Size": req.file.size
  };
  
  return res.json(obj);
} )


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
