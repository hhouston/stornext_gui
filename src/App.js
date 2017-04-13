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
  }

  fetchFiles(root) {
    console.log('fetch files');
    var options = {
      url: 'http://127.0.0.1:8080/test',
      headers: {
        'Content-Type': 'request'
      },
      qs: {
        root: root
      }
    };

    request(options, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        var json = JSON.parse(body);
        console.log('SET FILES: ', json.files);

        this.setState ({
          root: json.root,
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
                    <li key={`error-${i}`}>
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
          <p>hey hey hey</p>
          {files}
        </div>
      </div>
    );
  }
}

export default App;
