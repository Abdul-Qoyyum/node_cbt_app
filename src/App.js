import React ,{ useEffect } from 'react';
import {Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import _  from 'lodash';

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

function App(props) {
    let history = useHistory();
    let { user, isAuthenticated, token, verifyToken } = props;
    useEffect(() => {
        console.log(`Props : ${JSON.stringify(props)}`);
        let emstoken = localStorage.getItem('emstoken');
        if (emstoken) verifyToken(emstoken);
        //Redirect if all credentials are complete
        if (!_.isEmpty(user) && isAuthenticated && token){
            history.push("/admin");
        }

    },[]);

        return (
                <Switch>
{/*                    <Route path="/admin" render={props => <AdminLayout {...props} />} /> */}
                    <ProtectedRoute
                      path="/admin"
                      component={AdminLayout}
                      isAuthenticated={props.isAuthenticated}
                    />
                    <Route path="/auth" render={props => <AuthLayout {...props} />} />
                    <ProtectedRoute
                        path={"/exam"}
                        component={ExamLayout}
                        isAuthenticated={props.isAuthenticated}
                    />

                    <Redirect from="*" to="/auth/login" />
                    {/*      <Redirect from="/" to="/admin/index" /> */}
                </Switch>
        );
}

const mapStateToProps = state => {
 const {
         isAuthenticated,
         user,
         token
       } = state.authStore;
 return { isAuthenticated, user, token };
}

export default connect(mapStateToProps,{ verifyToken })(App);
