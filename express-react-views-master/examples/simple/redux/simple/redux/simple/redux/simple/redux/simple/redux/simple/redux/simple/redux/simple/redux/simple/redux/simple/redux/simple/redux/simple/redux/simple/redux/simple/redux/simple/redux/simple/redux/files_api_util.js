var request = require('request');

export const fetchFiles = (root) => {
  var options = {
    url: 'http://localhost:8080/test',
    // url: 'http://172.16.3.51:8080/test',
    headers: {
      'Content-Type': 'request',
      'Access-Control-Allow-Origin': '*'
    },
    qs: {
      root: root
    }
  };

  return request(options, (err, res, body) => {
    // console.log('request made res: ', res);
    if (!err && res.statusCode === 200) {
      var json = JSON.parse(body);
      // console.log("body: " + body)

      console.log("files in request", json.files);
      return json.files

      // console.log(json.root + " root");
      // console.log(json.files + " files");
    } else {
      console.log('error: ', err);
      return 'error';
    }
  });
};
