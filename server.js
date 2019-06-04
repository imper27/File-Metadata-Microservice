'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer=require("multer");
var upload = multer();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), (request, response) => {
  let file = request.file;
  if (!file) {
    response.json({problem: 'Please upload a file'});
  } else {
    let name = file.originalname;
    let type = file.mimetype;
    let size = file.size;
    response.json({name, type, size});
  }
  
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
