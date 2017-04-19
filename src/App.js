var request = require('request');

// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var xhr = new XMLHttpRequest();

import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      root: "/stornext/snfs1",
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
    var options = {
      // url: 'http://requestb.in/1m3h8fe1',
      url: 'http://localhost:8080/test',
      // url: 'http://136.179.6.56:8080/test',
      // url: 'http://172.16.3.51:23939/test',
      // url: 'http://172.16.3.51:8080/test',
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
  }

  componentWillMount() {
    this.fetchFiles(this.state.root);
  }

  render() {
    let files
    if (this.state.files) {
      files =
              <ul>
                {
                  this.state.files.map((file, i) => (
                    <li key={`error-${i}`} onClick={() => this.clickForwards(file)}>
                      {file}
                    </li>
                  ))
                }
              </ul>;
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>StorNext GUI</h2>
        </div>
        <div className="App-intro">
          <button onClick={() => this.fetchFiles('/')}>Root</button>
          <button onClick={() => this.clickBackwards(this.state.root)}>Back</button>
          <h2>CWD: {this.state.root}</h2>
          {files}
        </div>
      </div>
    );
  }
}

export default App;








//'host': '172.16.3.51:8080',
//'accept': '*/*',
//'user-agent': 'curl/7.19.7 (x86_64-redhat-linux-gnu) libcurl/7.19.7 NSS/3.21 Basic Ecc zlib/1.2.3 libidn/1.18 libssh2/1.4.2'
