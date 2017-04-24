var express = require('express');
var app = express();
var cors_app = express();

var fs = require("fs");
var path = require("path");
var cors = require('cors')

var ip = process.argv[2];
var port = process.argv[3]
var http = require('http');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type');
    next();
});

http.createServer(app).listen(port, ip, () => {
  console.log('server listening at http://%s:%s', ip, port);
});


app.get('/test', function(req, res) {
  let root = req.query.root;
  // let root = '/stornext/snfs1';
  console.log('root: ', root);
  console.log('root is of type: ', (typeof root));
  console.log('req headers: ', req.headers);

  fs.readdir(root, (err, files) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      files.forEach((file, idx) => {
        console.log(idx + ":" + file);
      });
    }

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });

    var json = JSON.stringify({
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
