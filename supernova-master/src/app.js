/**
 * Created by MagicAntler on 10/14/15.
 */
import React, { Component } from "react";
import 'whatwg-fetch'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import configureStore from './store/store';
// import reducer from './reducers/index.js';
import { render } from 'react-dom'

import colorPulse from './lib/color'
import Photo from './components/photo/photo'
import Video from './components/video/video'
import About from './components/about/about'
import Resume from './components/resume/resume'
import Nav from './components/nav/nav'
import initAnalytics from './analytics'
initAnalytics()
import styles from './app.scss';

import { fetchFiles } from './actions/files_actions';
import { asArray } from './reducers/selectors';

class Main extends Component{
  constructor(props) {
    super(props);
    this.state = {
      routeID: 'about',
      loadingIDs: [],
      files: []
    }
    this.setRouteID = this.setRouteID.bind(this)
    this.pushLoading = this.pushLoading.bind(this)
    this.removeLoading = this.removeLoading.bind(this)
    this.animateBG = this.animateBG.bind(this)
  }
  animateBG(backgroundPosition) {
    requestAnimationFrame(() => {
      let bgPos = backgroundPosition + 0.3
      this.setState({
        backgroundPosition: bgPos
      })
      this.animateBG(bgPos)
    })
  }
  pushLoading(id) {
    this.setState({
      loadingIDs: [...this.state.loadingIDs.slice(), id]
    })
  }
  removeLoading(id) {
    this.setState({
      loadingIDs: this.state.loadingIDs.filter(lID => lID != id)
    })
  }
  componentWillMount() {
    // let resp = fetchFiles('/');
    // console.log(JSON.parse(resp));
    // this.setState({resp: resp})
    // let files = JSON.parse(resp.responseText);
    // console.log('000000000000000', files);
  }
  componentWillUpdate(nextProps, nextState) {
  }
  componentDidMount() {
    this.props.fetchFiles('/');

    requestAnimationFrame(() => this.animateBG(0))
    if(window.location.hash) {
      const routeStartIndex = window.location.href.indexOf('/#/') + 3
      const hash = window.location.href.substring(routeStartIndex)
      this.setRouteID(hash.toLowerCase())
    }
    if(window.location.hash == '' || window.location.hash == '#/') {
      window.location.hash = '/about'
    }
    window.addEventListener('hashchange', () => {
      if(window.location.hash.substring(2) != this.state.routeID) {
        this.setRouteID(window.location.hash.substring(2))
      }
    })
  }
  setRouteID(id) {
    this.setState({
      routeID: id.toLowerCase(),
      loadingIDs: []
    })
    console.log('ID ' + id)
    window.location.hash = '/' + id.toLowerCase()
  }
  render(){
    let rightContentStyles = {
      backgroundImage:`url(${require('./public/images/star2.png')})`,
      backgroundPosition:`center ${this.state.backgroundPosition}px`
    }
    // console.log('state====================', this.props.files);
    return(
      <div className={styles.main}>
        <ul>
          {
            this.props.files.map((file, i) => (
              <li key={`error-${i}`} onClick={() => this.clickForwards(file)}>
                {file}
              </li>
            ))
          }
        </ul>;
        <Nav onRouteClick={(routeID) => {
            this.setRouteID(routeID)
          }}
          routeID={this.state.routeID}
          isLoading={this.state.loadingIDs.length > 0}
        />
        <div className={styles.rightContent}
          style={rightContentStyles}
        >
          {
            (() => {
              switch(this.state.routeID) {
                case 'photo':
                  return <Photo removeLoading={this.removeLoading} pushLoading={this.pushLoading}/>
                case 'video':
                  return <Video removeLoading={this.removeLoading} pushLoading={this.pushLoading}/>
                case 'about':
                  return <About/>
                case '':
                  return <About />
                case 'resume':
                  return <Resume removeLoading={this.removeLoading} pushLoading={this.pushLoading} />
                default:
                  return null
              }
            })()
          }
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return ({
    files: asArray(state.files)
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchFiles: () => dispatch(fetchFiles())
});

const MainContainer =
  connect(mapStateToProps,
   mapDispatchToProps)(Main);

render(<Provider store={configureStore()}>
  <MainContainer />
</Provider>, document.getElementById('root'));
