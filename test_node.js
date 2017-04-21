"use strict"

var request = require('request');

var options = {
  // url: 'http://requestb.in/19qhfq01',
  // url: 'http://localhost:8080/test',
  // url: 'http://localhost:23939/test',
  // url: 'http://136.179.6.56:8080/test',
  // url: 'http://172.16.3.51:23939/test',
  url: 'http://172.16.3.51:8080/test',
  // url: 'http://google.com/',
  headers: {
    'Content-Type': 'request',
    'Access-Control-Allow-Origin': '*'
  },
  qs: {
    root: root
  }
};

// let instance = axios.create({
//   baseURL: 'http://localhost:8080/test',
//   timeout: 1000,
//   headers: {
//     'Content-Type': 'request',
//     'Access-Control-Allow-Origin': '*'
//     }
// });

// axios.get(`http://www.reddit.com/r/EarthPorn/`)
// .then(res => {
//   const files = res.data.data.children.map(obj => obj.data);
//   this.setState({ files });
// })
// .catch(err => {
//   // Something went wrong. Save the error in state and re-render.
//   console.log('axios error: ', err);
// });;

// console.log('line before the request');
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

request(options, (err, res, body) => {
  console.log('request made res: ', res);
  if (!err && res.statusCode === 200) {
    var json = JSON.parse(body);
    console.log("body: " + body)
    this.setState ({
      root: root,
      files: json.files
    });

    console.log(json.root + " root");
    console.log(json.files + " files");
  } else {
    console.log('error: ', err);
  }
});
