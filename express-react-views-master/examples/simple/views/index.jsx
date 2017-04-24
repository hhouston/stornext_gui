var request = require('request');
var request_promise = require('request-promise');

import React, { Component } from 'react';
// var configureStore = require('../redux/store');
// var reducer = require('../redux/root_reducer');
// var Provider = require('react-redux');

var Layout = require('./layout');

import axios from 'axios';

class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      root: "/",
      files: []
    };

    this.fetchFiles = this.fetchFiles.bind(this);
    this.clickBackwards = this.clickBackwards.bind(this);
    this.clickForwards = this.clickForwards.bind(this);
  }

  clickBackwards(root) {
    let newRoot = root.match(/^(.*)\/[^/]*$/)[1];
    if (newRoot === "") {
      newRoot = "/"
    }
    this.fetchFiles(newRoot);
  }

  clickForwards(newRoot) {
    if (this.state.root !== "/") {
      newRoot = this.state.root + "/" + newRoot;
    } else {
      newRoot = this.state.root + newRoot;
    }

    this.fetchFiles(newRoot);
  }

  fetchFiles(root) {
    console.log('---------------------');
    var options = {
      // url: 'http://requestb.in/19qhfq01',
      url: 'http://localhost:8080/test',
      // url: 'http://localhost:23939/test',
      // url: 'http://136.179.6.56:8080/test',
      // url: 'http://172.16.3.51:23939/test',
      // url: 'http://172.16.3.51:8080/test',
      // url: 'http://google.com/',
      headers: {
        'Content-Type': 'request',
        'Access-Control-Allow-Origin': '*'
      },
      qs: {
        root: root
      }
    };

    let instance = axios.create({
      baseURL: 'http://localhost:8080/test',
      timeout: 1000,
      headers: {
        'Content-Type': 'request',
        'Access-Control-Allow-Origin': '*'
        }
    });

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
    let _res;

    request(options, (err, res, body) => {
          console.log('request made res: ', res);
          if (!err && res.statusCode === 200) {
            var json = JSON.parse(body);
            _res = json.files;
            // console.log("body: " + body)

            // console.log("files in request", json.files);
            // return json.files

            // console.log(json.root + " root");
            // console.log(json.files + " files");
          } else {
            console.log('error: ', err);
            // return 'error';
          }
    });


    setTimeout(() => {
      console.log('hit me res: ', _res);
      return _res;
    }, 5000);


  // return $.ajax({
  //     method: "GET",
  //     url: "http://localhost:8080/test",
  //     headers: {
  //       'Content-Type': 'request',
  //       'Access-Control-Allow-Origin': '*'
  //     },
  //     qs: {
  //       root: root
  //     }
  //   })


    // con sole.log('after request called');
  }
  //
  // componentWillMount() {
  //   this.fetchFiles(this.state.root);
  //   console.log(this.state.files);
  // }

  componentWillMount() {
    // let response = this.fetchFiles('/')
    // setTimeout(() => this.setState({files: response}), 10000);
    var options = {
      // url: 'http://requestb.in/19qhfq01',
      url: 'http://localhost:8080/test',
      // url: 'http://localhost:23939/test',
      // url: 'http://136.179.6.56:8080/test',
      // url: 'http://172.16.3.51:23939/test',
      // url: 'http://172.16.3.51:8080/test',
      // url: 'http://google.com/',
      headers: {
        'Content-Type': 'request',
        'Access-Control-Allow-Origin': '*'
      },
      qs: {
        root: '/'
      }
    };

    request(options, (err, res, body) => {
          console.log('request made res: ', res);
          if (!err && res.statusCode === 200) {
            var json = JSON.parse(body);
            this.setState({files: json.files});
            // console.log("body: " + body)

            // console.log("files in request", json.files);
            // return json.files

            // console.log(json.root + " root");
            // console.log(json.files + " files");
          } else {
            console.log('error: ', err);
            // return 'error';
          }
    });
  }

  render() {



        // console.log('files in render: ', files);

        let  files_comp =
                  <ul>
                    {
                      this.state.files.map((file, i) => (
                        <li key={`error-${i}`} onClick={() => this.clickForwards(file)}>
                          {file}
                        </li>
                      ))
                    }
                  </ul>;


        return (
            <div className="App">
              <div className="App-header">
                <h2>StorNext GUI</h2>
              </div>
              <div className="App-intro">
                <button onClick={() => this.fetchFiles('/')}>Root</button>
                <button onClick={() => this.clickBackwards(this.state.root)}>Back</button>
                <h2>CWD: {this.state.root}</h2>
                {files_comp}
              </div>
            </div>
        );
  }
}

export default Index;
