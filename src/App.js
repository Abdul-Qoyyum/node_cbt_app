import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import "tailwindcss/dist/base.css";
import "./styles/globalStyles.css";
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

import Landing from './views/Landing';
import './App.css';

 class App extends Component {

   componentDidMount(){
    //verify token on first start
    let { verifyToken, history } = this.props;
      verifyToken(history);
   }

    render(){
       const { isLoading }= this.props;
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
{/*
              <ProtectedRoute
                path={"/exam"}
                component={ExamLayout}
              />
*/}
              <ProtectedRoute
                path={"/exam"}
                component={ExamView}
              />
{/*              <Route path="/auth" render={props => <AuthLayout {...props} />}/> */}
              <Route path="/" render={props => <Landing {...props} />}/>
{/*              <Redirect from="*" to="/auth/login"/>*/}
              <Redirect from="*" to="/"/>
            </Switch>)
           }
           </>
        )
      }
}

const mapStateToProps = state => {
  const { isLoading } = state.authStore;
  return { isLoading };
}

export default compose(
         withRouter,
         connect(mapStateToProps,{
         verifyToken }))(App);

//export default connect(mapStateToProps,{verifyToken })(App);
