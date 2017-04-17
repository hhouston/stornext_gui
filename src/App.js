var request = require('request');

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
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

    this.fetchFiles(newRoot);
  }

  clickForwards(newRoot) {
    if (this.state.root != "/") {
      newRoot = this.state.root + "/" + newRoot;
    } else {
      newRoot = this.state.root + newRoot;
    }

    this.fetchFiles(newRoot);
  }

  fetchFiles(root) {
    var options = {
      url: 'http://172.16.3.51:8080/test',
      headers: {
        'Content-Type': 'request'
      }
      // qs: {
      //   root: root
      // }
    };

    console.log('line before the request');
    request(options, (err, res, body) => {
      console.log('request made');
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
        console.log('res: ', res);
        console.log("body: " + body)
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
