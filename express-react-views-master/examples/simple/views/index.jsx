var React = require('react');
var Layout = require('./layout');
var request = require('request');


// Contrived example to show how one might use Flow type annotations
function countTo(n:number):string {
  // var a = [];
  // for (var i = 0; i < n; i++ ) {
  //   a.push(i + 1);
  // }
  // return a.join(', ');

  let root = "/";

  var options = {
    url: 'http://172.16.3.51:8080/test',
    // url: 'http://localhost:8080/test',
    headers: {
      'Content-Type': 'request',
      'Access-Control-Allow-Origin': '*'
    },
    qs: {
      root: root
    }
  };

  let return_res;
  let return_body;

  request(options, (err, res, body) => {
    return_res = res;
    console.log('request made res: ', res);
    if (!err && res.statusCode === 200) {
      var json = JSON.parse(body);
      console.log("body: " + body)

      console.log(json.root + " root");
      console.log(json.files + " files");
    } else {
      console.log('error: ', err);
    }
  });

  return 'test';
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
