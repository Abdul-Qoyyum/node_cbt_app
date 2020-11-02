import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import ExamLayout from "./layouts/Exam";
import ProtectedRoute from "./layouts/Protected";

import {
    verifyToken
} from "./actions";

import './App.css';

class App extends Component{

    componentDidMount(){
        let emstoken = localStorage.getItem('emstoken');
        if (emstoken){
           this.props.verifyToken(emstoken);
        }
    }

    render() {
        return (
                <Switch>
{/*                    <Route path="/admin" render={props => <AdminLayout {...props} />} /> */}
                    <ProtectedRoute
                      path="/admin"
                      component={AdminLayout}
                      isAuthenticated={this.props.isAuthenticated}
                    />
                    <Route path="/auth" render={props => <AuthLayout {...props} />} />
                    <ProtectedRoute
                        path={"/exam"}
                        component={ExamLayout}
                        isAuthenticated={this.props.isAuthenticated}
                    />

                    <Redirect from="/" to="/auth/login" />
                    {/*      <Redirect from="/" to="/admin/index" /> */}
                </Switch>
        )
    }
}

const mapStateToProps = state => {
 let { isAuthenticated } = state.authStore;
 return { isAuthenticated };
}

export default connect(mapStateToProps,{ verifyToken })(App);
