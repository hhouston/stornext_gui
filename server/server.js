var express = require('express');
var app = express();
var fs = require("fs");
var path = require("path");

var ip = "127.0.0.1";
var port = 8080

var server = app.listen(port, ip, () => {
  console.log('server listening at http://%s:%s', ip, port);
});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

    next();
});

app.get('/test', function(req, res) {
  const root = req.query.root
  fs.readdir(root, (err, files) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      files.forEach((file, idx) => {
        // console.log(idx + ":" + file);
      });
    }

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });

    var json = JSON.stringify({
      root,
      files
    });
    res.end(json);
  })
});

app.get('/dirs', function(req, res) {
  const root = './';
  fs.stat(root, (err, stats) => {
      console.log(stats.isDirectory());
  });

});

exports = module.exports = app;
