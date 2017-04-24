var request = require('request');
var request_promise = require('request-promise');
var $ = require('jquery');
import Request from 'react-http-request';
import React, { Component } from 'react';
// var configureStore = require('../redux/store');
// var reducer = require('../redux/root_reducer');
// var Provider = require('react-redux');

require('import-export');

var Layout = require('./layout');

import axios from 'axios';

class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      root: "/",
      files: []
    };

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

  render() {

    return (

        <Request
          url='http://localhost:8080/test?root=%2F'
          method='get'
          accept='application/json'
          verbose={true}
        >
          {
            ({error, result, loading}) => {
              if (loading) {
                return <div>loading...</div>;
              } else {
                return <div>{ JSON.stringify(result) }</div>;
              }
            }
          }
        </Request>
    );
  }
}

export default Index;
