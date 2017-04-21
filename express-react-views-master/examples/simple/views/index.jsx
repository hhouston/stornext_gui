'use strict'

var React = require('react');
var Layout = require('./layout');
var request = require('request');
import axios from 'axios';


// Contrived example to show how one might use Flow type annotations
function countTo(n:number):string {
  // var a = [];
  // for (var i = 0; i < n; i++ ) {
  //   a.push(i + 1);
  // }
  // return a.join(', ');

  let root = "/";

  // 'http://172.16.3.51:8080/test',

  let instance = axios.create({
    baseURL: 'http://172.16.3.51:8080/test',
    timeout: 1000,
    headers: {
      'Content-Type': 'request',
      'Access-Control-Allow-Origin': '*'
      }
  });

  let return_files;

  instance.get(`http://172.16.3.51:8080/test?root=%2Fstornext`)
  .then(res => {
    console.log('data------------', res.data);
    const files = res.data.files;

    return_files = files;
    console.log('type: ', typeof return_files);
    console.log(return_files);
    return 'hi';
    // this.setState({ files });
  })
  .catch(err => {
    // Something went wrong. Save the error in state and re-render.
    console.log('axios error: ', err);
    return 'error'
  });
  return 'hey';
}

class Index extends React.Component {
  render() {
    return (
      <Layout title={this.props.title}>
        <h1>{this.props.title}</h1>
        <p>Welcome to {this.props.title}</p>
        <p>
          I can count to 10:
          {countTo(10)}
        </p>
      </Layout>
    );
  }
}

Index.propTypes = {
  title: React.PropTypes.string
};

module.exports = Index;
