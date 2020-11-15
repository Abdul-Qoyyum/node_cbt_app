import React ,{ Component } from 'react';
import { connect } from 'react-redux';
//import { compose } from 'redux';
//import { withRouter } from 'react-router-dom';

import {
        Route,
        Switch,
        Redirect
       } from 'react-router-dom';

import StyledContentLoader from 'styled-content-loader';

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";


import { verifyToken } from './actions';
/*
import "assets/css/nucleo-svg.css";
import "assets/css/nucleo-icons.css";
*/
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import ExamLayout from "./layouts/Exam";
import ProtectedRoute from "./layouts/ProtectedRoute";


import './App.css';
import 'react-notifications/lib/notifications.css';

 class App extends Component {

   componentDidMount(){
    //verify token on first start
    let { isLoading, verifyToken } = this.props;
    if(isLoading){
      verifyToken();
     }
   }

    render(){
        return (
         <StyledContentLoader isLoading={false}>
                <Switch>
                     <ProtectedRoute
                       path="/admin"
                       component={AdminLayout}
                      />
                    <Route path="/auth" render={props => <AuthLayout {...props} />} />
                    <ProtectedRoute
                        path={"/exam"}
                        component={ExamLayout}
                    />
{/*                    <Redirect from="*" to="/auth/login" /> */}
                </Switch>
         </StyledContentLoader>
        );
      }
}

const mapStateToProps = state => {
  const { isLoading } = state.authStore;
  return { isLoading };
}
/*
export default compose(
         withRouter,
         connect(mapStateToProps,{
         verifyToken }))(App);
*/
export default connect(mapStateToProps,{verifyToken })(App);
