var express = require('express');
var app = express();
var fs = require("fs");
var cors = require('cors');

app.use(cors());

 

var corsOptions = {

  origin: 'http://192.168.56.1:4200',

  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

}

app.get('/api/service', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       //console.log( data );
       res.end( data );
   });
})

var server = app.listen(3030, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
