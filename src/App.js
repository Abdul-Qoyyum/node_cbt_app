import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import "tailwindcss/dist/base.css";
import "./styles/globalStyles.css";
// eslint-disable-next-line
import { css } from "styled-components/macro";

import {
        Route,
        Switch,
        Redirect
       } from 'react-router-dom';

//import StyledContentLoader from 'styled-content-loader';
import { Grid } from 'react-awesome-spinners'


import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import "@fortawesome/free-solid-svg-icons";

import { verifyToken } from './actions';

import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";
//import ExamLayout from "./layouts/Exam";
import ExamView from './views/ExamView';
import ProtectedRoute from "./layouts/ProtectedRoute";
import 'react-notifications/lib/notifications.css';
import ExamSessionView2 from "./views/ExamSessionView2";
import Landing from './views/Landing';
import ExamInfo from "./views/ExamInfo";
import './App.css';

 class App extends Component {

   componentDidMount(){
    //verify token on first start
    let { verifyToken, history } = this.props;
      verifyToken(history);
   }

    render(){
       const { isLoading, _subject }= this.props;
        return (
            <>
            {
              isLoading ? (
                  <div className={"d-flex align-items-center justify-content-center"} style={{height : '100vh'}}>
                    <Grid />
                  </div>
              ) : (

           <Switch>
               <ProtectedRoute
                  path="/admin"
                  component={AdminLayout}
               />
               <Route path="/auth" render={props => <AuthLayout {...props} />}/>
               <Route path={"/info"} render={props => <ExamInfo {...props} />}/>
               {/* exam session route depends on _subject id, redirect to exam route if _subject id is not set */}
               <Route path={"/exam/session"}  render={props => _.isEmpty(_subject) ? <Redirect to={"/exam"} /> : <ExamSessionView2  { ...props} /> } />
              <ProtectedRoute
                path={"/exam"}
                component={ExamView}
              />
              <Route path="/" render={props => <Landing {...props} />}/>
              <Redirect from="*" to="/"/>
            </Switch>)
           }
           </>
        )
      }
}

const mapStateToProps = state => {
  const { isLoading } = state.authStore;
  const { _subject } = state.questionStore;
  return { isLoading , _subject };
}

export default compose(
         withRouter,
         connect(mapStateToProps,{
         verifyToken }))(App);

//export default connect(mapStateToProps,{verifyToken })(App);
